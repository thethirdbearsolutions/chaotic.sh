import dev.detekt.gradle.Detekt

// Plugins are declared here once (apply false) so every module shares one
// classloader for them; AGP 9's built-in Kotlin picks up the Kotlin Gradle
// plugin version the kotlin-* entries below put on the classpath.
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.android.lint) apply false
    alias(libs.plugins.kotlin.jvm) apply false
    alias(libs.plugins.kotlin.compose) apply false
    alias(libs.plugins.kotlin.serialization) apply false
    alias(libs.plugins.ksp) apply false
    alias(libs.plugins.hilt) apply false
    alias(libs.plugins.detekt)
}

// One detekt run over every module's hand-written Kotlin, with the ktlint
// rule set wrapped in, so style and static analysis are a single task that
// does not depend on the Android plugin. Generated code
// (core-api/src/generated) is excluded: it is rewritten by
// scripts/generate-api-client.sh, not by hand.
detekt {
    buildUponDefaultConfig = true
    config.setFrom(files("config/detekt/detekt.yml"))
    source.setFrom(
        files(
            "app/src",
            "core-api/src/main/kotlin",
            "core-api/src/test/kotlin",
        ),
    )
    basePath.set(layout.projectDirectory)
}

dependencies {
    detektPlugins(libs.detekt.ktlint.wrapper)
}

tasks.withType<Detekt>().configureEach {
    jvmTarget.set("17")
    exclude("**/build/**")
}
