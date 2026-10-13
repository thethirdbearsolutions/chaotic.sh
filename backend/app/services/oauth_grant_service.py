"""The token and revocation endpoints' logic (CHT-1520; design doc §2.4,
threats S1, S5, S11, invariants I15, I16).

``/oauth/token`` and ``/oauth/revoke`` (``app.api.oauth``) parse the
form-encoded body and hand the parameters here. This module:

* authenticates the client by its registered
  ``token_endpoint_auth_method``: ``none`` (a public client: the
  client_id names it, and PKCE is the proof) or ``client_secret_post``
  (the secret in the body, compared by digest). Nothing ambient is read:
  no cookie, no ``Authorization`` header (CHT-1564);
* redeems an authorization code (``authorization_code``): the code is
  spent first, then the client, the exact ``redirect_uri``, the PKCE S256
  verifier and the RFC 8707 resource are checked against what it was
  minted with. A failed check leaves the code spent and starts nothing,
  so an intercepted code is worth one guess. A second redemption revokes
  the session the first one started (``TokenService.redeem_single_use``);
* rotates a refresh token (``refresh_token``) through
  ``TokenService.refresh``: single use, reuse revokes the session, a
  30 s grace replay, and the scope may only narrow;
* revokes (RFC 7009) the holder session behind an access or refresh
  token, when that token was issued to the authenticated client.

Every grant failure is an RFC 6749 §5.2 error code; ``invalid_grant``
for anything wrong with a code or refresh token, as Claude requires.

The client is looked up, not re-fetched: a CIMD client authorized once
has its row, and an outbound fetch has no place on the token path's
latency budget. An admin's disable (``is_active``) still ends it here.
"""
from __future__ import annotations

import base64
import hashlib
import hmac
import json
import re
from dataclasses import dataclass

from app.config import get_settings
from app.enums import TokenKind
from app.oauth.clients import canonical_resource
from app.oxyde_models.oauth import OxydeAuthToken, OxydeHolderSession, OxydeOAuthClient
from app.oxyde_models.user import OxydeUser
from app.schemas.oauth import TokenAgent, TokenConnection, TokenResponse
from app.services.oauth_client_service import OAuthClientService, hash_client_secret
from app.services.token_service import (
    IssuedTokens,
    TokenError,
    TokenService,
    kind_of,
    token_digest,
)

GRANT_AUTHORIZATION_CODE = "authorization_code"
GRANT_REFRESH_TOKEN = "refresh_token"
REASON_CLIENT_REVOKED = "client_revoked"
# RFC 7636 §4.1: 43..128 characters of [A-Z a-z 0-9 - . _ ~].
_CODE_VERIFIER = re.compile(r"^[A-Za-z0-9._~-]{43,128}$")
# A user agent is kept only as a short digest (display-only holder metadata).
_UA_DIGEST_LENGTH = 16


class GrantError(Exception):
    """A token or revocation request that must fail: an RFC 6749 §5.2
    ``error`` code, a description, and the HTTP status (401 for
    ``invalid_client``, 400 otherwise)."""

    def __init__(self, error: str, description: str, status_code: int = 400):
        super().__init__(description)
        self.error = error
        self.description = description
        self.status_code = status_code


def _invalid_client(description: str) -> GrantError:
    return GrantError("invalid_client", description, 401)


def _from_token_error(exc: TokenError) -> GrantError:
    # temporarily_unavailable (OAuth off) never reaches here: the
    # endpoints 404 first. invalid_token is an access-token error; a
    # grant never raises it, but map it to invalid_grant if one did.
    error = exc.error if exc.error in ("invalid_grant", "invalid_scope") else "invalid_grant"
    return GrantError(error, exc.description)


def s256(verifier: str) -> str:
    """RFC 7636 §4.2: BASE64URL(SHA256(ASCII(code_verifier))), unpadded."""
    return base64.urlsafe_b64encode(hashlib.sha256(verifier.encode("ascii")).digest()).rstrip(b"=").decode()


@dataclass(frozen=True)
class TokenRequest:
    """The token endpoint's parameters, each present at most once."""

    grant_type: str | None
    client_id: str | None
    client_secret: str | None = None
    code: str | None = None
    redirect_uri: str | None = None
    code_verifier: str | None = None
    refresh_token: str | None = None
    scope: str | None = None
    resource: str | None = None
    user_agent: str | None = None


class OAuthGrantService:
    # --- client authentication ---------------------------------------------------

    async def authenticate_client(self, client_id: str | None, client_secret: str | None) -> OxydeOAuthClient:
        """The client, authenticated by its registered method. Raises
        ``invalid_client`` (401). A public client that sends a secret is
        refused rather than silently accepted: it is misconfigured, and a
        confidential client must never fall back to no authentication."""
        if not client_id:
            raise _invalid_client("client_id is required")
        client = await OxydeOAuthClient.objects.get_or_none(id=client_id)
        if client is None or not client.is_active:
            raise _invalid_client("unknown or disabled client")
        method = client.token_endpoint_auth_method
        if method == "none":
            if client_secret:
                raise _invalid_client("this client is public and must not send a client_secret")
            return client
        if method == "client_secret_post":
            if not client_secret or not client.client_secret_hash:
                raise _invalid_client("this client must authenticate with client_secret")
            if not hmac.compare_digest(hash_client_secret(client_secret), client.client_secret_hash):
                raise _invalid_client("client authentication failed")
            return client
        raise _invalid_client("this client's authentication method is not supported")  # pragma: no cover

    # --- /oauth/token ----------------------------------------------------------------

    async def token(self, request: TokenRequest) -> TokenResponse:
        if not request.grant_type:
            raise GrantError("invalid_request", "grant_type is required")
        if request.grant_type not in (GRANT_AUTHORIZATION_CODE, GRANT_REFRESH_TOKEN):
            raise GrantError("unsupported_grant_type", "grant_type must be authorization_code or refresh_token")
        client = await self.authenticate_client(request.client_id, request.client_secret)
        if request.grant_type == GRANT_AUTHORIZATION_CODE:
            issued = await self._exchange_code(client, request)
        else:
            issued = await self._refresh(client, request)
        return await self._response(issued)

    async def _exchange_code(self, client: OxydeOAuthClient, request: TokenRequest) -> IssuedTokens:
        if not request.code:
            raise GrantError("invalid_request", "code is required")
        if not request.redirect_uri:
            raise GrantError("invalid_request", "redirect_uri is required")
        if not request.code_verifier:
            raise GrantError("invalid_request", "code_verifier is required (PKCE)")
        if not _CODE_VERIFIER.match(request.code_verifier):
            raise GrantError("invalid_request", "code_verifier must be 43 to 128 unreserved characters")
        resource = self._resource(request.resource)
        service = TokenService()
        try:
            # Spent first: whatever is wrong below, this code is used up.
            redeemed = await service.redeem_single_use(request.code, TokenKind.AUTH_CODE)
        except TokenError as exc:
            raise _from_token_error(exc) from None
        # One description for every binding mismatch: which one failed is
        # of use only to someone guessing.
        mismatch = GrantError("invalid_grant", "the code was not issued for this client, redirect_uri or verifier")
        if redeemed.oauth_client_id != client.id:
            raise mismatch
        if redeemed.redirect_uri is None or not hmac.compare_digest(
            redeemed.redirect_uri.encode(), request.redirect_uri.encode(),
        ):
            raise mismatch
        if redeemed.code_challenge is None or not hmac.compare_digest(
            s256(request.code_verifier).encode(), redeemed.code_challenge.encode(),
        ):
            raise mismatch
        if resource is not None and resource != redeemed.resource:
            raise GrantError("invalid_target", "the resource is not the one this code was issued for")
        identity = OAuthClientService().identity(client)
        try:
            return await service.start_session_from(redeemed, holder=self._holder(identity.name, request.user_agent))
        except TokenError as exc:
            raise _from_token_error(exc) from None

    async def _refresh(self, client: OxydeOAuthClient, request: TokenRequest) -> IssuedTokens:
        if not request.refresh_token:
            raise GrantError("invalid_request", "refresh_token is required")
        resource = self._resource(request.resource)
        if resource is not None:
            # Every OAuth connection is for /mcp, but compare with the
            # token's own resource rather than assume it.
            row = await OxydeAuthToken.objects.get_or_none(token_hash=token_digest(request.refresh_token))
            if row is not None and row.kind == TokenKind.REFRESH and row.resource != resource:
                raise GrantError("invalid_target", "the resource is not the one this token was issued for")
        try:
            return await TokenService().refresh(
                request.refresh_token, oauth_client_id=client.id,
                scopes=request.scope or None,  # an empty scope narrows nothing
            )
        except TokenError as exc:
            raise _from_token_error(exc) from None

    @staticmethod
    def _resource(value: str | None) -> str | None:
        """The canonical RFC 8707 resource a request names, None if it
        names none. Either published identifier, with or without a
        trailing slash (CHT-1564), means ``<issuer>/mcp``."""
        if value is None:
            return None
        canonical = canonical_resource(value, get_settings().oauth_issuer)
        if canonical is None:
            raise GrantError("invalid_target", "resource must be this server's /mcp endpoint")
        return canonical

    @staticmethod
    def _holder(client_name: str, user_agent: str | None) -> dict:
        holder = {"client_name": client_name}
        if user_agent:
            holder["user_agent_sha256"] = hashlib.sha256(user_agent.encode()).hexdigest()[:_UA_DIGEST_LENGTH]
        return holder

    @staticmethod
    async def _response(issued: IssuedTokens) -> TokenResponse:
        session = await OxydeHolderSession.objects.get(id=issued.holder_session_id)
        agent = await OxydeUser.objects.get(id=session.principal_user_id)
        project_ids = json.loads(session.scope_project_ids) if session.scope_project_ids is not None else None
        # Built with only the fields it has, for the route's
        # response_model_exclude_unset: no refresh_token key at all without
        # offline_access, while project_ids stays present as null (the
        # whole team).
        refresh = {"refresh_token": issued.refresh_token} if issued.refresh_token else {}
        return TokenResponse(
            access_token=issued.access_token,
            token_type="Bearer",
            expires_in=issued.expires_in(),
            **refresh,
            scope=" ".join(issued.scopes),
            chaotic=TokenConnection(
                agent=TokenAgent(id=agent.id, name=agent.name, kind=agent.kind),
                team_id=session.team_id,
                project_ids=project_ids,
                holder_session_id=session.id,
            ),
        )

    # --- /oauth/revoke (RFC 7009) -----------------------------------------------------

    async def revoke(self, *, token: str | None, client_id: str | None, client_secret: str | None) -> None:
        """Revoke the holder session behind an access or refresh token
        issued to this client. The client must authenticate
        (``invalid_client`` otherwise); after that, every outcome is
        success (RFC 7009 §2.2): an unknown, expired, already revoked or
        another client's token is simply not revoked, and the answer says
        nothing about which."""
        if not token:
            raise GrantError("invalid_request", "token is required")
        client = await self.authenticate_client(client_id, client_secret)
        if kind_of(token) not in (TokenKind.ACCESS, TokenKind.REFRESH):
            return
        row = await OxydeAuthToken.objects.get_or_none(token_hash=token_digest(token))
        if (
            row is None
            or row.kind not in (TokenKind.ACCESS, TokenKind.REFRESH)
            or row.holder_session_id is None
            or row.oauth_client_id != client.id
        ):
            return
        await TokenService().revoke_session(row.holder_session_id, actor_id=None, reason=REASON_CLIENT_REVOKED)
