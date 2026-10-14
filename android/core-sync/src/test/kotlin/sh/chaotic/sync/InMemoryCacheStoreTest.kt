package sh.chaotic.sync

class InMemoryCacheStoreTest : CacheStoreContract() {
    override fun createStore(): CacheStore = InMemoryCacheStore()
}
