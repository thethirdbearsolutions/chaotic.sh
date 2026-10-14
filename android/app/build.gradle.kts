plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.kotlin.serialization)
    alias(libs.plugins.ksp)
    alias(libs.plugins.hilt)
}

android {
    namespace = "sh.chaotic.android"
    compileSdk = 37

    defaultConfig {
        applicationId = "sh.chaotic.android"
        minSdk = 29
        targetSdk = 37
        versionCode = 1
        versionName = "0.1.0"
    }

    // `foss` ships on F-Droid and must stay free of Google Play Services and
    // other non-free dependencies (`checkFossDependencies` enforces it in CI).
    // `play` is the Google Play build; it is where an FCM push distributor
    // would go if one is ever chosen. Today the two are identical.
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

    lint {
        warningsAsErrors = false
        abortOnError = true
        checkDependencies = true
    }
}

dependencies {
    implementation(project(":core-api"))

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
    implementation(libs.kotlinx.coroutines.core)

    testImplementation(libs.junit)
    testImplementation(libs.kotlin.test)
}

// The foss flavor is what F-Droid builds, so nothing non-free may reach its
// runtime classpath. Groups below are the usual offenders: Play Services,
// Firebase (FCM), and Google's proprietary analytics/ads SDKs.
val nonFreeGroups =
    listOf(
        "com.google.android.gms",
        "com.google.firebase",
        "com.google.android.play",
        "com.google.android.libraries.places",
        "com.google.mlkit",
    )

val checkFossDependencies by tasks.registering {
    group = "verification"
    description = "Fails if a non-free dependency reaches the foss flavor's runtime classpath."
    val runtime = configurations.named("fossReleaseRuntimeClasspath")
    val componentIds = runtime.flatMap { it.incoming.resolutionResult.rootComponent }
    // A local copy: the configuration cache cannot serialize a reference to
    // the build script object that a top-level val would capture.
    val groups = nonFreeGroups.toList()
    inputs.property("nonFreeGroups", groups)
    doLast {
        val modules = mutableSetOf<String>()
        fun walk(component: org.gradle.api.artifacts.result.ResolvedComponentResult) {
            component.dependencies
                .filterIsInstance<org.gradle.api.artifacts.result.ResolvedDependencyResult>()
                .forEach { dep ->
                    val id = dep.selected.moduleVersion ?: return@forEach
                    if (modules.add("${id.group}:${id.name}")) walk(dep.selected)
                }
        }
        walk(componentIds.get())
        val offenders = modules.filter { module -> groups.any { module.startsWith("$it:") } }
        check(offenders.isEmpty()) {
            "Non-free dependencies on the foss runtime classpath: ${offenders.sorted().joinToString()}"
        }
        logger.lifecycle("foss runtime classpath: ${modules.size} modules, none non-free.")
    }
}

tasks.named("check") { dependsOn(checkFossDependencies) }
