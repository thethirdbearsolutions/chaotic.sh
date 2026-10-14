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

The redirect is the app's RFC 8252 §7.1 private-use scheme, its
application id (``sh.chaotic.android:/oauth2redirect``). The client is
public (``token_endpoint_auth_method`` ``none``): PKCE S256 is its proof,
as for every client here, and refresh tokens rotate with reuse detection
as for every connection (``TokenService.refresh``).

Residual risk (PR #361 review, M1): Android does not reserve a
private-use scheme for one app. Any app installed on the phone can
register ``sh.chaotic.android:``, start this flow itself (PKCE protects
a code from interception, not from an app that began the flow), and if
the person approves, receive a session that acts as them. The consent
page therefore does not claim the request comes from the official app,
and asks the person to continue only if they just started signing in
from it. The fix is an Android App Links redirect (an https URL on a
domain whose ``assetlinks.json`` names the release signing key), which
needs that key, so it is a follow-up: add the https URI to
``ANDROID_REDIRECT_URIS`` and, once every released build uses it, drop
the private-use one.
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
    # The platform's application id, which is also the redirect scheme.
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

# Every redirect the app may use, matched exactly. One line per URI: the
# Android App Links https redirect (module docstring, residual risk) is
# added here, and the private-use one removed once no released build
# needs it.
ANDROID_REDIRECT_URIS: tuple[str, ...] = (
    f"{ANDROID_APP_ID}:/oauth2redirect",  # RFC 8252 §7.1 private-use scheme
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
