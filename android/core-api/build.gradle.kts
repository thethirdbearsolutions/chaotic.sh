import org.jetbrains.kotlin.gradle.dsl.JvmTarget

// The Chaotic HTTP API client: a plain Kotlin/JVM library with no Android
// dependency, so it builds and unit-tests on any JVM. Most of it is generated
// from the backend's OpenAPI schema into src/generated/kotlin by
// scripts/generate-api-client.sh (CI fails when that output is stale); the
// hand-written entry point lives in src/main/kotlin.
plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.kotlin.serialization)
}

java {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
}

kotlin {
    compilerOptions {
        jvmTarget.set(JvmTarget.JVM_17)
    }
}

sourceSets {
    main {
        kotlin.srcDir("src/generated/kotlin")
    }
}

dependencies {
    api(libs.ktor.client.core)
    api(libs.kotlinx.serialization.json)
    implementation(libs.ktor.client.content.negotiation)
    implementation(libs.ktor.serialization.kotlinx.json)

    testImplementation(libs.kotlin.test)
    testImplementation(libs.junit)
    testImplementation(libs.ktor.client.mock)
    testImplementation(libs.kotlinx.coroutines.test)
}
