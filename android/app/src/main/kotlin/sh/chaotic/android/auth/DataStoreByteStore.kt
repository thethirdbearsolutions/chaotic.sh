package sh.chaotic.android.auth

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.first
import sh.chaotic.auth.ByteStore
import java.util.Base64

private val Context.sessionDataStore: DataStore<Preferences> by preferencesDataStore(name = "session")

/**
 * The sealed session's bytes in DataStore. They are already encrypted
 * ([KeystoreSessionKey]); DataStore only keeps them, and
 * `data_extraction_rules.xml` keeps them out of backups and transfers.
 */
class DataStoreByteStore(context: Context) : ByteStore {
    private val store = context.applicationContext.sessionDataStore

    override suspend fun read(): ByteArray? {
        val encoded = store.data.first()[SEALED_SESSION] ?: return null
        return try {
            Base64.getDecoder().decode(encoded)
        } catch (_: IllegalArgumentException) {
            null
        }
    }

    override suspend fun write(bytes: ByteArray) {
        store.edit { it[SEALED_SESSION] = Base64.getEncoder().encodeToString(bytes) }
    }

    override suspend fun clear() {
        store.edit { it.remove(SEALED_SESSION) }
    }

    private companion object {
        val SEALED_SESSION = stringPreferencesKey("sealed_session")
    }
}
