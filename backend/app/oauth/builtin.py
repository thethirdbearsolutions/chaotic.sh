"""The OAuth clients built into this server: the first-party native apps
(CHT-1602).

A built-in client is resolved from the constant below, never by fetching
anything: a self-hosted or air-gapped server needs no egress to
chaotic.sh, and whoever controls that domain cannot change the redirect
URIs this server accepts for the app. Its ``client_id`` is not a URL (``builtin:<app
id>``), so no server, this one or an older one, ever reads it as a
Client ID Metadata Document. The same metadata is published at
``https://chaotic.sh/oauth/android-client.json`` for documentation only
(``website/oauth/android-client.json``; a test keeps the two equal); this
server never reads it.

A built-in client is the one exception to design decision D2 ("an OAuth
connection acts as an agent"): its sessions (``HolderVia.APP``) act as
the human who consented, and their tokens are for the whole server
(``<base>``: REST and /ws), never for /mcp. Every other client, CIMD or
DCR, still acts only as an agent, at /mcp only. What decides it is the
``client_id`` alone, never a redirect URI, a client name or anything a
client sends: a CIMD document or a dynamic registration may copy the
app's name or redirect and still gets an agent.

The redirect is an https URL on chaotic.sh,
``https://chaotic.sh/app/oauth2redirect``, meant to be verified for the
app through Android App Links (CHT-1649): once
``https://chaotic.sh/.well-known/assetlinks.json``
(``website/.well-known/assetlinks.json``) names the package and the
release signing key's certificate fingerprint, Android hands the
redirect only to the app signed with that key. Another app on the phone
can still start a sign-in with this ``client_id``, but the code goes to
the real app, which has no matching request and drops it. The URI is the
same for every server, so a self-hosted one needs nothing on its own
domain. The client is public (``token_endpoint_auth_method`` ``none``):
PKCE S256 is its proof, as for every client here, and refresh tokens
rotate with reuse detection as for every connection
(``TokenService.refresh``).

Residual risk until that file carries the release fingerprint and is
deployed (it ships as ``[]``; ``scripts/android-release.sh`` refuses to
publish a release before the live file names the key): nothing is
verified. Android 12+ then opens the redirect in the browser, on
chaotic.sh's explanatory page, which passes the code to nothing; on
Android 10 and 11 it offers a chooser that lists every app declaring
the same link, so an app that started the sign-in itself could be
picked and receive the session. Even when verified, the protection is
per phone: a device that could not fetch the file at install falls back
the same way. The consent page therefore still asks the person to
continue only if they just started signing in from the app.

The earlier RFC 8252 §7.1 private-use redirect,
``sh.chaotic.android:/oauth2redirect``, is gone and is refused, and no
other client may use the app's scheme or its ``/app/`` paths
(``clients.reserved_redirect_problem``): Android does not reserve a
private-use scheme for one app, so any installed app could register it
(PR #361 review, M1). No released build ever used it.
"""
from __future__ import annotations

import json
from dataclasses import dataclass

BUILTIN_PREFIX = "builtin:"


@dataclass(frozen=True)
class BuiltinClient:
    client_id: str
    # What the consent page and Connected apps call it.
    name: str
    # The platform's application id (the Android package name).
    app_id: str
    platform: str
    redirect_uris: tuple[str, ...]

    def metadata(self) -> dict:
        """The client's metadata, in RFC 7591 / CIMD field names: what is
        published at chaotic.sh for documentation."""
        return {
            "client_id": self.client_id,
            "client_name": self.name,
            "redirect_uris": list(self.redirect_uris),
            "grant_types": ["authorization_code", "refresh_token"],
            "response_types": ["code"],
            "token_endpoint_auth_method": "none",
            "scope": "chaotic:write offline_access",
            "code_challenge_methods": ["S256"],
            "application_type": "native",
        }

    def redirect_uris_json(self) -> str:
        return json.dumps(list(self.redirect_uris))


ANDROID_APP_ID = "sh.chaotic.android"

# The domain whose assetlinks.json verifies the app's redirect: the
# website (website/, deployed to chaotic.sh), not any Chaotic server.
ANDROID_APP_LINKS_HOST = "chaotic.sh"

# Every redirect the app may use, matched exactly: the Android App Links
# https redirect only (module docstring). android/app/build.gradle.kts
# defines the same URI, and a test keeps the two in step.
ANDROID_REDIRECT_URIS: tuple[str, ...] = (
    f"https://{ANDROID_APP_LINKS_HOST}/app/oauth2redirect",
)

ANDROID = BuiltinClient(
    client_id=BUILTIN_PREFIX + ANDROID_APP_ID,
    name="Chaotic for Android",
    app_id=ANDROID_APP_ID,
    platform="Android",
    redirect_uris=ANDROID_REDIRECT_URIS,
)

BUILTIN_CLIENTS: dict[str, BuiltinClient] = {c.client_id: c for c in (ANDROID,)}


def builtin_client(client_id: str | None) -> BuiltinClient | None:
    """The built-in client this exact ``client_id`` names, or None."""
    if not client_id:
        return None
    return BUILTIN_CLIENTS.get(client_id)


def is_builtin(client_id: str | None) -> bool:
    """Does this exact ``client_id`` name a built-in client? Only the
    ``builtin:`` namespace can: a CIMD client_id is a URL and a DCR one
    is ``dcr_...``, so no other client can take one of these ids."""
    return builtin_client(client_id) is not None


def builtin_of(client) -> BuiltinClient | None:
    """The built-in client an ``oauth_clients`` row is, or None. Both the
    id and the row's registration must say so."""
    from app.enums import OAuthClientRegistration

    if client is None or client.registration != OAuthClientRegistration.BUILTIN:
        return None
    return builtin_client(client.id)
