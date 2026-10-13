"""Oxyde ORM models for the token store (CHT-1515, migration 0024).

Design: the Chaotic doc "MCP OAuth and token service: design" §4.1.
Five additive tables; `api_keys` is unchanged.

- `holder_sessions`: the hub. One row per live hold on a principal: an
  OAuth connection, a claim-ticket holder, a grantee-credential holder.
- `auth_tokens`: every short-lived secret (authorization codes, access
  tokens, refresh tokens, claim tickets). Only a SHA-256 digest of each
  is stored, unique, and the lookup is by that digest (like `api_keys`
  since CHT-1534). The raw value exists only in the response that
  minted it.
- `oauth_clients`: OAuth clients, by client_id (CIMD URL, `dcr_...`,
  `builtin:...`).
- `oauth_authorization_requests`: validated /oauth/authorize requests
  waiting for consent (10 minutes, single use, bound to the first
  human who reads them).
- `revocation_events`: the audit trail of every revocation.

Identity follows ADR-0008: a session (and every token) names the user it
acts as (`principal_user_id`) and the human who answers for it
(`holder_user_id`: the consenting human for OAuth, the credential's
holder for a claim). Neither is ever self-asserted by the bearer.

Foreign keys: when a session's or token's principal, holder, team,
client or credential row is DELETED, the session or token is deleted
with it (CASCADE). That is all the schema does. Revoking or deactivating
those rows deletes nothing: `APIKeyService.revoke` sets `is_active`
false, deactivating a user sets `is_active` false, and neither touches a
session. Ending the sessions and tickets of a revoked key, a deactivated
or retired user, or a departed member is the RevocationService's job
(CHT-1449, CHT-1523), and until it does, the credential resolver
(CHT-1560) refuses a token whose principal is inactive or whose agent
principal's holder has left the team, as it does for keys. Every
revocation goes through `TokenService.revoke_session` (or its successor)
so that it writes a `revocation_events` row: validation caches are keyed
to the newest of those rows (see `OxydeRevocationEvent.seq`). A cascade
DELETE writes no event, so a cached validation of a deleted token can
outlive it by up to the cache window (30 s).

Attribution columns (`revoked_by_id`, `actor_id`) and the audit's
`team_id` are SET NULL, so the audit survives the user and the team.
`grant_id` (CHT-1442), `superseded_by_id`, `replaces_id` and
`auth_request_id` have no foreign key: the first has no table yet, and
the others name rows a GC may remove first.

A required reference is declared `X | None = Field(default=None,
db_nullable=False)`: the column is NOT NULL, but the model can be built
from the `<name>_id` alone, as every insert here does (a required relation
field would demand the related object).

JSON columns are strings, as `OxydeTemplate.body` (Oxyde has no JSON
column type here). Every index is declared in `Meta.indexes` under the
name 0024 creates it with (CHT-1410).
"""
import uuid
from datetime import datetime, timezone

from oxyde import Field, Index, Model

from app.enums import HolderVia, OAuthClientRegistration, RevocationTarget, TokenKind
from app.oxyde_models.api_key import OxydeAPIKey
from app.oxyde_models.enums import DbEnum
from app.oxyde_models.team import OxydeTeam
from app.oxyde_models.user import OxydeUser
from app.utils.datetimes import DateTimeUTC


def _now() -> datetime:
    return datetime.now(timezone.utc)


class OxydeOAuthClient(Model):
    """An OAuth client. CHT-1518 fills it; nothing here trusts it."""

    # The client_id itself: a CIMD URL, `dcr_<random>`, or `builtin:<name>`.
    # Sessions and tokens CASCADE from this row, so deleting it disconnects
    # every user of the client: a CIMD cache refresh must UPDATE the row in
    # place, and only never-authorized DCR rows may be garbage-collected.
    id: str = Field(db_pk=True)
    registration: DbEnum(OAuthClientRegistration) = Field()
    client_name: str | None = Field(default=None)
    redirect_uris: str = Field()  # JSON list of strings
    token_endpoint_auth_method: str = Field(default="none")
    # SHA-256 digest of a confidential DCR client's secret; NULL for
    # public clients.
    client_secret_hash: str | None = Field(default=None)
    metadata_json: str | None = Field(default=None)  # the CIMD document or DCR request, JSON
    fetched_at: DateTimeUTC | None = Field(default=None)
    cache_expires_at: DateTimeUTC | None = Field(default=None)
    registered_ip_hash: str | None = Field(default=None)
    created_at: DateTimeUTC = Field(default_factory=_now)
    last_authorized_at: DateTimeUTC | None = Field(default=None)
    is_active: bool = Field(default=True)

    class Meta:
        is_table = True
        table_name = "oauth_clients"
        indexes = [
            # DCR rate limits and the unused-client GC (CHT-1518).
            Index(("registration", "created_at"), name="ix_oauth_clients_registration_created_at"),
        ]


class OxydeOAuthAuthorizationRequest(Model):
    """A validated /oauth/authorize request awaiting consent (CHT-1519)."""

    # 128-bit random, used in the consent URL. Stored raw on purpose: it is
    # a capability only until its first authenticated read binds it to
    # that user, and approving it needs that user's web login.
    id: str = Field(db_pk=True)
    client: OxydeOAuthClient | None = Field(default=None, db_nullable=False, db_on_delete="CASCADE")
    redirect_uri: str = Field()
    state: str | None = Field(default=None)
    code_challenge: str = Field()
    resource: str | None = Field(default=None)
    scope: str | None = Field(default=None)  # space-separated, as requested
    # The first human who read it; anyone else then gets 404. CASCADE, not
    # SET NULL: an unbound request could be bound by someone else.
    bound_user: OxydeUser | None = Field(default=None, db_on_delete="CASCADE")
    created_at: DateTimeUTC = Field(default_factory=_now)
    expires_at: DateTimeUTC = Field()
    consumed_at: DateTimeUTC | None = Field(default=None)

    class Meta:
        is_table = True
        table_name = "oauth_authorization_requests"
        indexes = [
            Index(("expires_at",), name="ix_oauth_authorization_requests_expires_at"),
            Index(("client_id",), name="ix_oauth_authorization_requests_client_id"),
            Index(("bound_user_id",), name="ix_oauth_authorization_requests_bound_user_id"),
        ]


class OxydeHolderSession(Model):
    """One live hold on a principal (design §4.1)."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    # The team the principal acts in. Also the session's scope: the
    # session reaches at most this team, narrowed by scope_project_ids.
    # NULL only for an account-wide session (WEB_LOGIN, CHT-1524).
    team: OxydeTeam | None = Field(default=None, db_on_delete="CASCADE")
    # The user every request on this session acts as (ADR-0008).
    principal_user: OxydeUser | None = Field(default=None, db_nullable=False, db_on_delete="CASCADE")
    # The human who answers for it: the consenting human (OAUTH), or the
    # holder of the credential that claimed it. An agent principal's
    # session works only while this human is in the agent's team, as for
    # an agent key (CHT-1508/CHT-1510).
    holder_user: OxydeUser | None = Field(default=None, db_nullable=False, db_on_delete="CASCADE")
    via: DbEnum(HolderVia) = Field()
    oauth_client: OxydeOAuthClient | None = Field(default=None, db_on_delete="CASCADE")
    # The `api_keys` row a grantee-credential claim, or a claim ticket's
    # minter, used.
    credential: OxydeAPIKey | None = Field(default=None, db_on_delete="CASCADE")
    grant_id: str | None = Field(default=None)  # identity_grants, CHT-1442
    scope_project_ids: str | None = Field(default=None)  # JSON list; NULL = the whole team
    policy_name: str = Field(default="write")
    # RFC 8707 audience its tokens are issued for: `<base>/mcp` for an
    # OAuth connection, `<base>` for a claim holder.
    resource: str = Field()
    scopes: str = Field(default="")  # space-separated OAuth scopes granted
    holder: str | None = Field(default=None)  # JSON: label, runtime, client name. Display only.
    created_at: DateTimeUTC = Field(default_factory=_now)
    last_used_at: DateTimeUTC | None = Field(default=None)
    last_refreshed_at: DateTimeUTC | None = Field(default=None)
    idle_expires_at: DateTimeUTC = Field()
    absolute_expires_at: DateTimeUTC = Field()
    revoked_at: DateTimeUTC | None = Field(default=None)
    revoked_by: OxydeUser | None = Field(default=None, db_on_delete="SET NULL")
    revoked_reason: str | None = Field(default=None)
    superseded_by_id: str | None = Field(default=None)

    class Meta:
        is_table = True
        table_name = "holder_sessions"
        indexes = [
            Index(("team_id", "revoked_at"), name="ix_holder_sessions_team_id_revoked_at"),
            Index(("principal_user_id",), name="ix_holder_sessions_principal_user_id"),
            Index(("holder_user_id",), name="ix_holder_sessions_holder_user_id"),
            Index(("oauth_client_id",), name="ix_holder_sessions_oauth_client_id"),
            Index(("credential_id",), name="ix_holder_sessions_credential_id"),
            Index(("revoked_by_id",), name="ix_holder_sessions_revoked_by_id"),
        ]


class OxydeAuthToken(Model):
    """A short-lived secret, stored only as its SHA-256 digest."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    kind: DbEnum(TokenKind) = Field()
    token_hash: str = Field()  # hex SHA-256 of the whole token; unique
    display_prefix: str = Field()  # the first 8 characters, for display
    # The session the token belongs to. For an authorization code or a
    # claim ticket: NULL until redeemed, then the one session it started.
    # That link is the contract code-reuse revocation relies on (OAuth 2.1
    # §4.1.3), so an expiry GC must keep a spent code at least until its
    # session's absolute expiry.
    holder_session: OxydeHolderSession | None = Field(default=None, db_on_delete="CASCADE")
    # The session's team; NULL with it (account-wide WEB_LOGIN, CHT-1524).
    team: OxydeTeam | None = Field(default=None, db_on_delete="CASCADE")
    principal_user: OxydeUser | None = Field(default=None, db_nullable=False, db_on_delete="CASCADE")
    holder_user: OxydeUser | None = Field(default=None, db_nullable=False, db_on_delete="CASCADE")
    oauth_client: OxydeOAuthClient | None = Field(default=None, db_on_delete="CASCADE")
    minted_by_credential: OxydeAPIKey | None = Field(default=None, db_on_delete="CASCADE")
    resource: str = Field()
    scopes: str = Field(default="")
    policy_name: str = Field(default="write")
    scope_project_ids: str | None = Field(default=None)  # JSON list; NULL = the whole team
    # Authorization codes only (CHT-1520): PKCE S256 challenge and the
    # redirect_uri and consent request they are bound to.
    code_challenge: str | None = Field(default=None)
    redirect_uri: str | None = Field(default=None)
    auth_request_id: str | None = Field(default=None)
    # The rotation chain: a refresh token names the one it replaced.
    replaces_id: str | None = Field(default=None)
    created_at: DateTimeUTC = Field(default_factory=_now)
    expires_at: DateTimeUTC = Field()
    used_at: DateTimeUTC | None = Field(default=None)
    revoked_at: DateTimeUTC | None = Field(default=None)

    class Meta:
        is_table = True
        table_name = "auth_tokens"
        indexes = [
            # Every lookup is by digest, and a digest names one row.
            Index(("token_hash",), unique=True, name="ux_auth_tokens_token_hash"),
            # Expired-token GC.
            Index(("kind", "expires_at"), name="ix_auth_tokens_kind_expires_at"),
            Index(("holder_session_id",), name="ix_auth_tokens_holder_session_id"),
            # A refresh token's successor (rotation, reuse detection).
            Index(("replaces_id",), name="ix_auth_tokens_replaces_id"),
            Index(("principal_user_id",), name="ix_auth_tokens_principal_user_id"),
            Index(("minted_by_credential_id",), name="ix_auth_tokens_minted_by_credential_id"),
            Index(("oauth_client_id",), name="ix_auth_tokens_oauth_client_id"),
            Index(("holder_user_id",), name="ix_auth_tokens_holder_user_id"),
            Index(("team_id",), name="ix_auth_tokens_team_id"),
        ]


class OxydeRevocationEvent(Model):
    """One revocation, as it happened (agent identities spec §8 item 11)."""

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), db_pk=True)
    # Strictly increasing, assigned inside the revoking transaction (which
    # holds SQLite's write lock, so no two can take the same number). The
    # newest `seq` is the revocation epoch every validation cache compares
    # against, so a revocation in any process is seen by every other
    # process's next request. Rows are never deleted (team and actor are
    # SET NULL), which is what keeps MAX(seq) from going backwards: an
    # audit-retention GC, if one is ever written, must keep at least the
    # newest row, or stale caches would be trusted. Every writer computes
    # MAX(seq) + 1 inside its revoking transaction, after that
    # transaction's first write (so it holds the write lock); see
    # `TokenService._revoke_session_in_tx`, the only writer so far.
    seq: int = Field()
    team: OxydeTeam | None = Field(default=None, db_on_delete="SET NULL")
    # Who revoked: a user, or NULL for the system (refresh-token reuse,
    # expiry sweeps) and for a user since deleted.
    actor: OxydeUser | None = Field(default=None, db_on_delete="SET NULL")
    target_type: DbEnum(RevocationTarget) = Field()
    target_id: str | None = Field(default=None)
    filter: str | None = Field(default=None)  # JSON, for bulk revocations
    dry_run: bool = Field(default=False)
    cascade_counts: str | None = Field(default=None)  # JSON: {"holder_sessions": n, ...}
    reason: str | None = Field(default=None)
    created_at: DateTimeUTC = Field(default_factory=_now)

    class Meta:
        is_table = True
        table_name = "revocation_events"
        indexes = [
            Index(("seq",), unique=True, name="ux_revocation_events_seq"),
            Index(("team_id", "created_at"), name="ix_revocation_events_team_id_created_at"),
            Index(("target_type", "target_id"), name="ix_revocation_events_target"),
            Index(("actor_id",), name="ix_revocation_events_actor_id"),
        ]
