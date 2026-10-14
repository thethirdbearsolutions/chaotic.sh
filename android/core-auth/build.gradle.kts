import org.jetbrains.kotlin.gradle.dsl.JvmTarget

// Sign-in and session handling for the Android app (CHT-1610): server URL
// normalisation, OAuth discovery, the token endpoint, the session and its
// single-flight refresh, the authenticating OkHttp interceptor and the /ws
// reconnect policy. Plain Kotlin/JVM with no Android dependency, so all of
// it unit-tests on any JVM; :app supplies only what needs Android (the
// Custom Tab, the Keystore key, DataStore).
plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.kotlin.serialization)
    alias(libs.plugins.android.lint)
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

dependencies {
    api(libs.okhttp)
    api(libs.kotlinx.coroutines.core)
    // ServerConfig and Session are @Serializable and part of this module's API.
    api(libs.kotlinx.serialization.json)

    testImplementation(libs.kotlin.test)
    testImplementation(libs.junit)
    testImplementation(libs.kotlinx.coroutines.test)
    testImplementation(libs.okhttp.mockwebserver)
}
