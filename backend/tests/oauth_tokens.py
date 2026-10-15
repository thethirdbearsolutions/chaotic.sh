"""Mint real OAuth access tokens for tests (CHT-1576), straight through
TokenService, the way the token endpoint and claim grants will: no
endpoint is involved, so these tests do not depend on /oauth/*."""
from app.config import get_settings
from app.enums import OAuthClientRegistration, TokenKind
from app.oxyde_models.oauth import OxydeOAuthClient
from app.oxyde_models.user import OxydeUser
from app.schemas.api_key import APIKeyCreate
from app.services import token_service as ts
from app.services.api_key_service import APIKeyService
from app.services.token_service import TokenService

BASE = "https://tracker.example.com"
MCP = BASE + "/mcp"
CLIENT = "https://claude.ai/oauth/claude-client-metadata"
REDIRECT = "https://claude.ai/api/mcp/auth_callback"


def enable_oauth(monkeypatch, enabled: bool = True) -> None:
    monkeypatch.setenv("OAUTH_ENABLED", "true" if enabled else "false")
    monkeypatch.setenv("APP_BASE_URL", BASE)
    get_settings.cache_clear()
    ts._reset_for_tests()


async def make_agent(team, creator, *, email="connector@example.com", project_id=None) -> OxydeUser:
    return await OxydeUser.objects.create(
        email=email, hashed_password="x", name="Claude (Test)", is_agent=True,
        parent_user_id=creator.id, agent_team_id=team.id, agent_project_id=project_id,
    )


async def connector_token(agent, team, holder, *, scopes=("chaotic:write", "offline_access"),
                          project_ids=None, team_id=None):
    """An OAuth connector connection (resource ``<base>/mcp``): code minted
    at consent, redeemed, session started from it. Returns IssuedTokens."""
    if await OxydeOAuthClient.objects.get_or_none(id=CLIENT) is None:
        await OxydeOAuthClient.objects.create(
            id=CLIENT, registration=OAuthClientRegistration.CIMD, redirect_uris=f'["{REDIRECT}"]',
        )
    service = TokenService()
    _row, code = await service.mint_single_use(
        TokenKind.AUTH_CODE, team_id=team_id or team.id, principal_user_id=agent.id, holder_user_id=holder.id,
        resource=MCP, scopes=scopes, scope_project_ids=project_ids, oauth_client_id=CLIENT,
        code_challenge="c", redirect_uri=REDIRECT,
    )
    return await service.start_session_from(await service.redeem_single_use(code, TokenKind.AUTH_CODE, client_id=CLIENT))


async def server_token(agent, team, holder, *, scopes=("chaotic:write",)):
    """A whole-server token (resource ``<base>``), as a claim grant mints:
    a grantee key held by ``holder`` claims ``agent``. Returns
    (IssuedTokens, the grantee key row)."""
    key, _raw = await APIKeyService().create(agent.id, APIKeyCreate(name="grantee"), holder_user_id=holder.id)
    issued = await TokenService().start_session(
        team_id=team.id, principal_user_id=agent.id, holder_user_id=holder.id,
        credential_id=key.id, resource=BASE, scopes=scopes, offline=False,
    )
    return issued, key


def bearer(issued) -> dict[str, str]:
    return {"Authorization": f"Bearer {issued.access_token}"}


# --- CHT-1564 helpers ---------------------------------------------------------

# Resource values that must never be taken for this server's: the
# comparison is exact after trimming one trailing slash, so any URL
# "normalisation" (case, default port, userinfo, dot segments, percent
# decoding) or looser matching (prefix, scheme) would wrongly accept one.
# Both client kinds refuse all of these; MCP and MCP + "/" are refused for
# the built-in app as well (NEAR_MISS_APP_RESOURCES).
NEAR_MISS_RESOURCES = (
    BASE + "//", MCP + "//", BASE + "/api", MCP + "/x",
    "http://tracker.example.com", "http://tracker.example.com/mcp",
    "HTTPS://TRACKER.EXAMPLE.COM/mcp", "https://TRACKER.example.com", BASE + "/MCP",
    MCP + "?x", MCP + "#", MCP + "#x", BASE + "#",
    "https://tracker.example.com:443/mcp", "https://tracker.example.com:443",
    "https://u@tracker.example.com/mcp", MCP + "%2F", MCP + "/.", BASE + "/./mcp",
    "https://other.example/mcp", "https://tracker.example.com.evil/mcp", "tracker.example.com/mcp",
)
NEAR_MISS_APP_RESOURCES = NEAR_MISS_RESOURCES + (MCP, MCP + "/")


def credential_tripwire(monkeypatch) -> list[str]:
    """Arm a tripwire on every way the app resolves a login: each one
    records its name in the returned list, then raises. Assert the list
    is empty after the request; the raise alone could be swallowed by an
    ``except Exception`` between the endpoint and the check (PR #402
    review, M1). Both ``decode_token`` bindings are patched: the one
    ``app.auth.credentials`` imported and the one ``is_web_login`` uses
    (review, L3)."""
    import app.auth.credentials as credentials
    import app.utils.security as security

    calls: list[str] = []

    def sync(name):
        def trip(*args, **kwargs):
            calls.append(name)
            raise AssertionError(f"a public OAuth endpoint consulted a credential: {name}")
        return trip

    def asynchronous(name):
        async def trip(*args, **kwargs):
            sync(name)()
        return trip

    monkeypatch.setattr(credentials, "decode_token", sync("credentials.decode_token"))
    monkeypatch.setattr(security, "decode_token", sync("security.decode_token"))
    monkeypatch.setattr(credentials.CredentialResolver, "resolve", asynchronous("CredentialResolver.resolve"))
    monkeypatch.setattr(APIKeyService, "validate_key", asynchronous("APIKeyService.validate_key"))
    monkeypatch.setattr(APIKeyService, "find_by_key", asynchronous("APIKeyService.find_by_key"))
    return calls
