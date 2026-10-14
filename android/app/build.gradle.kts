import org.gradle.api.artifacts.component.ModuleComponentIdentifier
import org.gradle.api.artifacts.component.ModuleComponentSelector
import org.gradle.api.artifacts.component.ProjectComponentIdentifier
import org.gradle.api.artifacts.result.ResolvedComponentResult
import org.gradle.api.artifacts.result.ResolvedDependencyResult
import org.gradle.api.artifacts.result.UnresolvedDependencyResult

plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.kotlin.serialization)
    alias(libs.plugins.ksp)
    alias(libs.plugins.room)
    alias(libs.plugins.hilt)
}

// The OAuth redirect URI, defined here and nowhere else in the app (CHT-1610).
// BuildConfig.OAUTH_REDIRECT_URI and the manifest's redirect intent filter
// (AppAuth's RedirectUriReceiverActivity, via appAuthRedirectScheme) both
// come from it. The server must list it too: ANDROID_REDIRECT_URIS in
// backend/app/oauth/builtin.py, which a backend test checks against this
// line, so keep it one literal. CHT-1649 moves it to an App Links https URL.
val oauthRedirectUri = "sh.chaotic.android:/oauth2redirect"

android {
    namespace = "sh.chaotic.android"
    compileSdk = 37

    defaultConfig {
        applicationId = "sh.chaotic.android"
        minSdk = 29
        targetSdk = 37
        versionCode = 1
        versionName = "0.1.0"

        buildConfigField("String", "OAUTH_REDIRECT_URI", "\"$oauthRedirectUri\"")
        manifestPlaceholders["appAuthRedirectScheme"] = oauthRedirectUri.substringBefore(':')
    }

    // `foss` ships on F-Droid and must stay free of Google Play Services and
    // other non-free dependencies (`checkFossDependencies` enforces it in CI).
    // `play` is the Google Play build; it is where an FCM push distributor
    // would go if one is ever chosen (CHT-1608). Today the two are identical:
    // both push through UnifiedPush (CHT-1612), which needs no Google code.
    flavorDimensions += "distribution"
    productFlavors {
        create("foss") {
            dimension = "distribution"
        }
        create("play") {
            dimension = "distribution"
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    buildFeatures {
        compose = true
        buildConfig = true
    }

    testOptions {
        // Robolectric (Room DAO and Compose UI tests) needs the merged resources and manifest.
        unitTests.isIncludeAndroidResources = true
    }

    lint {
        warningsAsErrors = false
        abortOnError = true
        checkDependencies = true
    }
}

// Room writes the cache's schema to app/schemas on every build. CI fails
// when it differs from the committed copy, and when a committed version's
// schema is edited, so a schema change cannot ship without a version bump.
// The Room plugin rather than a bare KSP argument: each variant's KSP run
// writes its own copy, where a shared directory had two variants' runs
// reading each other's half-written file.
room {
    schemaDirectory("$projectDir/schemas")
}

dependencies {
    implementation(project(":core-api"))
    implementation(project(":core-auth"))
    implementation(project(":core-sync"))

    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(libs.androidx.lifecycle.runtime.compose)
    implementation(libs.androidx.navigation.compose)
    implementation(libs.androidx.hilt.navigation.compose)
    implementation(platform(libs.compose.bom))
    implementation(libs.compose.ui)
    implementation(libs.compose.ui.tooling.preview)
    implementation(libs.compose.material3)
    debugImplementation(libs.compose.ui.tooling)

    implementation(libs.hilt.android)
    ksp(libs.hilt.compiler)

    implementation(libs.ktor.client.okhttp)
    implementation(libs.okhttp)
    implementation(libs.kotlinx.coroutines.core)
    implementation(libs.appauth)
    implementation(libs.androidx.datastore.preferences)
    implementation(libs.androidx.room.runtime)
    implementation(libs.androidx.room.ktx)
    ksp(libs.androidx.room.compiler)
    implementation(libs.androidx.work.runtime)
    // Push (CHT-1612). It brings Tink (Apache-2.0) for Web Push decryption.
    implementation(libs.unifiedpush.connector)

    testImplementation(libs.junit)
    testImplementation(libs.kotlin.test)
    testImplementation(libs.kotlinx.coroutines.test)
    testImplementation(libs.robolectric)
    testImplementation(libs.tink)
    testImplementation(libs.androidx.test.core)
    // CacheStoreContract, which the Room store must pass like the in-memory one.
    testImplementation(testFixtures(project(":core-sync")))
    testImplementation(platform(libs.compose.bom))
    testImplementation(libs.compose.ui.test.junit4)
    // The activity the Compose rule launches. Debug only, so the Compose UI
    // tests live in src/testDebug.
    debugImplementation(libs.compose.ui.test.manifest)
}

// The foss flavor is what F-Droid builds, so nothing non-free may reach its
// runtime classpath: no artifact from a vendor's proprietary SDK groups (each
// entry also covers its sub-groups, e.g. com.huawei.hms under com.huawei), and
// no local files()/.aar binaries, which F-Droid cannot build from source.
// The whole resolved graph is walked, so a transitive pull through another
// library or :core-api is caught too. Unresolved dependencies count by the
// group they asked for, so the check fails closed.
val nonFreeDependencyGroups =
    listOf(
        "com.google.android.gms", // Play Services
        "com.google.firebase", // Firebase, including FCM
        "com.google.android.play", // Play Core / Integrity / Review
        "com.android.billingclient", // Play Billing
        "com.google.android.libraries.identity", // Sign in with Google
        "com.google.android.ump", // User Messaging Platform
        "com.google.android.recaptcha",
        "com.google.android.instantapps",
        "com.google.ads",
        "com.google.android.libraries.places",
        "com.google.mlkit",
        "com.huawei", // HMS
    )

abstract class CheckFossDependencies : DefaultTask() {
    @get:Input
    abstract val nonFreeGroups: ListProperty<String>

    @get:Internal
    abstract val rootComponent: Property<ResolvedComponentResult>

    @get:Internal
    abstract val localFiles: ConfigurableFileCollection

    @TaskAction
    fun check() {
        val groups = nonFreeGroups.get()
        fun nonFree(group: String) = groups.any { group == it || group.startsWith("$it.") }

        val seen = mutableSetOf<String>()
        val offenders = sortedSetOf<String>()
        fun walk(component: ResolvedComponentResult) {
            for (dependency in component.dependencies) {
                when (dependency) {
                    is ResolvedDependencyResult -> {
                        val id = dependency.selected.moduleVersion ?: continue
                        val module = "${id.group}:${id.name}"
                        if (nonFree(id.group)) offenders += module
                        if (seen.add(module)) walk(dependency.selected)
                    }
                    is UnresolvedDependencyResult -> {
                        val requested = dependency.requested
                        if (requested is ModuleComponentSelector && nonFree(requested.group)) {
                            offenders += "${requested.group}:${requested.module} (unresolved)"
                        }
                    }
                }
            }
        }
        walk(rootComponent.get())
        val binaries = localFiles.files.map { "local file ${it.name}" }.sorted()

        val problems = offenders.toList() + binaries
        check(problems.isEmpty()) {
            "The foss flavor must stay free of non-free and prebuilt dependencies, but its runtime " +
                "classpath has: ${problems.joinToString()}"
        }
        logger.lifecycle("foss runtime classpath: ${seen.size} modules, none non-free, no local binaries.")
    }
}

val checkFossDependencies =
    tasks.register("checkFossDependencies", CheckFossDependencies::class) {
        group = "verification"
        description = "Fails if a non-free or local-binary dependency reaches the foss flavor's runtime classpath."
        val runtime = configurations.named("fossReleaseRuntimeClasspath")
        nonFreeGroups.set(nonFreeDependencyGroups)
        rootComponent.set(runtime.flatMap { it.incoming.resolutionResult.rootComponent })
        // Components that are neither a published module nor a project of this
        // build are local files: files(...) or a checked-in .aar, here or in
        // a project dependency.
        localFiles.from(
            runtime.map { configuration ->
                configuration.incoming
                    .artifactView {
                        isLenient = true
                        componentFilter { it !is ModuleComponentIdentifier && it !is ProjectComponentIdentifier }
                    }.files
            },
        )
    }

tasks.named("check") { dependsOn(checkFossDependencies) }

// CI's negative test for the check above (.github/workflows/ci.yml): with
// -Pchaotic.fossCanary it adds a Play Services module, an HMS module (a
// sub-group, and not resolvable from our repositories) and a local jar to the
// foss flavor, and CI asserts that checkFossDependencies then fails naming
// all three. Never set it for a real build.
if (providers.gradleProperty("chaotic.fossCanary").isPresent) {
    dependencies {
        "fossImplementation"("com.google.android.gms:play-services-base:18.5.0")
        "fossImplementation"("com.huawei.hms:push:6.12.0.300")
        "fossImplementation"(files("foss-canary/canary.jar"))
    }
}
