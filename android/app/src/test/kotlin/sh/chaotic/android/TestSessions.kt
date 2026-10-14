package sh.chaotic.android

import sh.chaotic.auth.InMemoryTokenStore
import sh.chaotic.auth.Person
import sh.chaotic.auth.ServerConfig
import sh.chaotic.auth.Session
import sh.chaotic.auth.SessionManager
import sh.chaotic.auth.SessionTokens
import sh.chaotic.sync.CacheSession

const val TEST_SERVER = "https://chaotic.test"

/** A session as a sign-in would produce it, for [person] on [TEST_SERVER]. */
fun testSession(person: Person) = Session(
    server = ServerConfig(
        baseUrl = TEST_SERVER,
        authorizationEndpoint = "$TEST_SERVER/oauth/authorize",
        tokenEndpoint = "$TEST_SERVER/oauth/token",
    ),
    person = person,
    accessToken = "at",
    refreshToken = "rt",
    accessTokenExpiresAtMillis = Long.MAX_VALUE,
)

val ADA = Person("ada", "Ada", "ada@example.com")
val GRACE = Person("grace", "Grace", "grace@example.com")

/** A [SessionManager] on an in-memory store whose token endpoint never refuses. */
fun testSessions(signedIn: Person? = null) = SessionManager(
    InMemoryTokenStore(signedIn?.let(::testSession)),
    object : SessionTokens {
        override suspend fun refresh(session: Session) = session

        override suspend fun revoke(server: ServerConfig, token: String) = true
    },
)

/** The owner key the app's CacheSession uses for [person] on [TEST_SERVER]. */
fun ownerOf(person: Person) = CacheSession.ownerKey(TEST_SERVER, person.id)
