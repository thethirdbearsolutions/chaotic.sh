package sh.chaotic.auth

/**
 * The app's side of the built-in OAuth client (CHT-1602,
 * `backend/app/oauth/builtin.py`).
 *
 * The redirect URI is deliberately not here: it is defined once, in
 * `app/build.gradle.kts`, which derives both the manifest's redirect
 * intent filter and `BuildConfig.OAUTH_REDIRECT_URI` from it, so the move
 * to an App Links https redirect (CHT-1649) is a one-line change there
 * (plus the server's `ANDROID_REDIRECT_URIS`).
 */
object ChaoticOAuth {
    /** Resolved by the server from code, never fetched: see builtin.py. */
    const val CLIENT_ID = "builtin:sh.chaotic.android"

    /**
     * What the app asks for. `chaotic:write` is the only policy a built-in
     * session can hold; `offline_access` gets the refresh token that keeps
     * the device signed in.
     */
    const val SCOPE = "chaotic:write offline_access"

    /**
     * Sent on the app's own write requests, as the web app does: the server
     * gives an interactive human its ritual and estimate exemptions only
     * with it (`backend/app/api/issues.py`, CHT-1302).
     */
    const val INTERACTIVE_HEADER = "X-Chaotic-Interactive"
}
