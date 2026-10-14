import org.jetbrains.kotlin.gradle.dsl.JvmTarget

// The app's offline cache logic (CHT-1611): the inbox sync loop over
// GET /api/inbox/sync, cursor and merge rules, poll scheduling, team
// pruning, issue and sprint refreshes, and the pure presentation rules the
// screens draw from. Plain Kotlin/JVM with no Android dependency, so every
// decision here unit-tests on any JVM; :app supplies the Room-backed
// CacheStore and the screens.
plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(libs.plugins.android.lint)
    // CacheStoreContract: the CacheStore rules every implementation must
    // pass, run here against InMemoryCacheStore and in :app against Room.
    `java-test-fixtures`
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
    api(project(":core-api"))
    // WsReconnectPolicy.retryAfterMillis reads Retry-After the same way for polling.
    implementation(project(":core-auth"))
    api(libs.kotlinx.coroutines.core)

    testFixturesApi(libs.kotlin.test)
    testFixturesApi(libs.junit)
    testFixturesApi(libs.kotlinx.coroutines.test)

    testImplementation(libs.kotlin.test)
    testImplementation(libs.junit)
    testImplementation(libs.kotlinx.coroutines.test)
    testImplementation(libs.ktor.client.mock)
    // WriteWireTest: a write through the app's real stack, OkHttp and AuthInterceptor.
    testImplementation(libs.ktor.client.okhttp)
    testImplementation(libs.okhttp.mockwebserver)
}
