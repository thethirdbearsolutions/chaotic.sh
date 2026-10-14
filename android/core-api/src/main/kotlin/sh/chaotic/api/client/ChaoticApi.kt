package sh.chaotic.api.client

import io.ktor.client.HttpClientConfig
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.serialization.kotlinx.json.json
import kotlinx.serialization.json.Json

/**
 * Hand-written glue around the generated client in `sh.chaotic.api.apis`.
 *
 * The generated `ApiClient` installs Ktor's ContentNegotiation without a
 * converter when it is generated for kotlinx.serialization, so every API
 * class must be constructed with [clientConfig] (or a config that calls it)
 * to (de)serialize JSON at all:
 *
 * ```
 * val auth = AuthApi(baseUrl, engine, ChaoticApi.clientConfig)
 * auth.setBearerToken(token)
 * ```
 *
 * `baseUrl` is the server root (for example `https://chaotic.example.com`);
 * the generated paths already start with `/api`.
 */
object ChaoticApi {
    /**
     * Lenient where a newer server could break an older app: fields the app
     * does not know are ignored rather than failing the whole response.
     * Unknown enum values decode to each enum's `unknown_default_open_api`
     * entry (the generator's enumUnknownDefaultCase option).
     */
    val json: Json =
        Json {
            ignoreUnknownKeys = true
            explicitNulls = false
        }

    val clientConfig: (HttpClientConfig<*>) -> Unit = { config ->
        config.install(ContentNegotiation) {
            json(json)
        }
    }
}
