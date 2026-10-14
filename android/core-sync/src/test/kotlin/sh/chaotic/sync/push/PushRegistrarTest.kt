package sh.chaotic.sync.push

import kotlinx.coroutines.test.runTest
import sh.chaotic.sync.OTHER_OWNER
import sh.chaotic.sync.OWNER
import sh.chaotic.sync.Remote
import java.io.IOException
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNotEquals
import kotlin.test.assertNull
import kotlin.test.assertTrue

class FakePushRemote : PushRemote {
    var vapid: Remote<VapidKey> = Remote.Ok(VapidKey("BKey1", "kid1"))
    val registerAnswers = ArrayDeque<Remote<Unit>>()
    val registered = mutableListOf<Pair<String, PushDevice>>()
    val unregistered = mutableListOf<String>()
    var onRegister: () -> Unit = {}

    override suspend fun vapidKey() = vapid

    override suspend fun register(installationId: String, device: PushDevice): Remote<Unit> {
        registered += installationId to device
        onRegister()
        return registerAnswers.removeFirstOrNull() ?: Remote.Ok(Unit)
    }

    override suspend fun unregister(installationId: String): Remote<Unit> {
        unregistered += installationId
        return Remote.Ok(Unit)
    }

    override suspend fun preferences(): Remote<Map<String, Boolean>> = Remote.Ok(emptyMap())
}

class FakeDistributor : PushDistributor {
    val calls = mutableListOf<String>()

    override fun register(vapidPublicKey: String) {
        calls += "register:$vapidPublicKey"
    }

    override fun unregister() {
        calls += "unregister"
    }
}

class PushRegistrarTest {
    private val remote = FakePushRemote()
    private val store = InMemoryPushStateStore()
    private val distributor = FakeDistributor()
    private var owner: String? = OWNER
    private var ids = 0
    private val registrar = PushRegistrar(remote, store, distributor, { owner }, { "Pixel" }, { "install-${++ids}" })

    @Test
    fun signedOutDoesNothing() = runTest {
        owner = null
        assertEquals(PushStatus.NOT_STARTED, registrar.start(distributorAvailable = true))
        assertTrue(distributor.calls.isEmpty())
    }

    @Test
    fun withoutADistributorThePollFallbackRuns() = runTest {
        assertEquals(PushStatus.NO_DISTRIBUTOR, registrar.start(distributorAvailable = false))
        assertTrue(distributor.calls.isEmpty())
        assertTrue(PushRegistrar.pollFallback(store.read(), OWNER))
    }

    @Test
    fun theNoDistributorNoticeIsShownOnce() = runTest {
        registrar.start(distributorAvailable = false)
        assertTrue(registrar.takeNoDistributorNotice())
        assertFalse(registrar.takeNoDistributorNotice())
        registrar.signedOut()
        registrar.start(distributorAvailable = false)
        assertFalse(registrar.takeNoDistributorNotice(), "not again after signing in again")
    }

    @Test
    fun startAsksTheDistributorUnderTheServersVapidKey() = runTest {
        assertEquals(PushStatus.REGISTERING, registrar.start(distributorAvailable = true))
        assertEquals(listOf("register:BKey1"), distributor.calls)
        assertEquals("install-1", store.read().installationId)
        assertEquals("kid1", store.read().vapidKeyId)
    }

    @Test
    fun anUnreachableServerLeavesThingsAsTheyWere() = runTest {
        remote.vapid = Remote.Unreachable(IOException("offline"))
        assertEquals(PushStatus.NOT_STARTED, registrar.start(distributorAvailable = true))
        assertTrue(distributor.calls.isEmpty())
    }

    @Test
    fun theEndpointIsRegisteredWithTheServer() = runTest {
        registrar.start(distributorAvailable = true)
        val result = registrar.onEndpoint("https://ntfy.example/up1", "p256", "auth")
        assertEquals(PushRegistrar.FlushResult.REGISTERED, result)
        assertEquals(listOf("install-1" to PushDevice("https://ntfy.example/up1", "p256", "auth", "Pixel")), remote.registered)
        val state = store.read()
        assertEquals(PushStatus.ACTIVE, state.status)
        assertEquals(OWNER, state.owner)
        assertNull(state.pending)
        assertFalse(PushRegistrar.pollFallback(state, OWNER))
    }

    @Test
    fun theNextStartKeepsPushActiveAndAsksAgain() = runTest {
        registrar.start(distributorAvailable = true)
        registrar.onEndpoint("https://ntfy.example/up1", "p256", "auth")
        assertEquals(PushStatus.ACTIVE, registrar.start(distributorAvailable = true))
        assertEquals(listOf("register:BKey1", "register:BKey1"), distributor.calls)
    }

    @Test
    fun aNewVapidKeyMeansANewSubscription() = runTest {
        registrar.start(distributorAvailable = true)
        registrar.onEndpoint("https://ntfy.example/up1", "p256", "auth")
        remote.vapid = Remote.Ok(VapidKey("BKey2", "kid2"))
        assertEquals(PushStatus.REGISTERING, registrar.start(distributorAvailable = true))
        assertEquals(listOf("register:BKey1", "unregister", "register:BKey2"), distributor.calls)
        assertTrue(PushRegistrar.pollFallback(store.read(), OWNER))
    }

    @Test
    fun aServerThatCannotBeReachedKeepsTheEndpointForLater() = runTest {
        remote.registerAnswers += Remote.Unreachable(IOException("offline"))
        remote.registerAnswers += Remote.HttpError(503)
        registrar.start(distributorAvailable = true)
        assertEquals(PushRegistrar.FlushResult.RETRY, registrar.onEndpoint("https://ntfy.example/up1", "p", "a"))
        assertEquals(PushRegistrar.FlushResult.RETRY, registrar.flushPending())
        assertEquals(PushStatus.REGISTERING, store.read().status)
        assertEquals(PushRegistrar.FlushResult.REGISTERED, registrar.flushPending())
        assertEquals(PushStatus.ACTIVE, store.read().status)
        assertEquals(PushRegistrar.FlushResult.NOTHING_PENDING, registrar.flushPending())
    }

    @Test
    fun tooManyRequestsIsRetriedButARefusalIsNot() = runTest {
        remote.registerAnswers += Remote.HttpError(429)
        remote.registerAnswers += Remote.HttpError(422, "push_endpoint_refused")
        registrar.start(distributorAvailable = true)
        assertEquals(PushRegistrar.FlushResult.RETRY, registrar.onEndpoint("https://ntfy.example/up1", "p", "a"))
        assertEquals(PushRegistrar.FlushResult.REFUSED, registrar.flushPending())
        assertEquals(PushStatus.FAILED, store.read().status)
        assertNull(store.read().pending)
    }

    @Test
    fun anAccountSwitchDuringThePutDoesNotRegisterTheNextPerson() = runTest {
        registrar.start(distributorAvailable = true)
        remote.onRegister = { owner = OTHER_OWNER }
        assertEquals(PushRegistrar.FlushResult.NOT_SIGNED_IN, registrar.onEndpoint("https://ntfy.example/up1", "p", "a"))
        assertNotEquals(PushStatus.ACTIVE, store.read().status)
        assertTrue(PushRegistrar.pollFallback(store.read(), OTHER_OWNER))
    }

    @Test
    fun pushRegisteredForSomeoneElseDoesNotCount() = runTest {
        registrar.start(distributorAvailable = true)
        registrar.onEndpoint("https://ntfy.example/up1", "p", "a")
        assertTrue(PushRegistrar.pollFallback(store.read(), OTHER_OWNER))
        assertFalse(PushRegistrar.pollFallback(store.read(), null), "signed out: no polling at all")
        owner = OTHER_OWNER
        assertEquals(PushStatus.REGISTERING, registrar.start(distributorAvailable = true))
    }

    @Test
    fun signingOutDropsTheSubscriptionAndTheInstallationId() = runTest {
        registrar.start(distributorAvailable = true)
        registrar.onEndpoint("https://ntfy.example/up1", "p", "a")
        registrar.signedOut()
        assertEquals("unregister", distributor.calls.last())
        assertEquals(PushState(), store.read())
        registrar.start(distributorAvailable = true)
        assertEquals("install-2", store.read().installationId)
    }

    @Test
    fun theDistributorsOtherAnswers() = runTest {
        registrar.start(distributorAvailable = true)
        registrar.onEndpoint("https://ntfy.example/up1", "p", "a")
        registrar.onTemporarilyUnavailable()
        assertEquals(PushStatus.TEMPORARILY_UNAVAILABLE, store.read().status)
        registrar.onEndpoint("https://fallback.example/up1", "p", "a")
        assertEquals(PushStatus.ACTIVE, store.read().status)
        registrar.onRegistrationFailed()
        assertEquals(PushStatus.FAILED, store.read().status)
        registrar.onUnregistered()
        assertEquals(listOf("install-1"), remote.unregistered)
        assertEquals(PushStatus.NOT_STARTED, store.read().status)
    }

    @Test
    fun endpointsAreNotPrintedInLogs() {
        assertFalse("ntfy" in PushDevice("https://ntfy.example/up1", "p", "a").toString())
        assertFalse("ntfy" in PendingEndpoint("https://ntfy.example/up1", "p", "a").toString())
    }
}
