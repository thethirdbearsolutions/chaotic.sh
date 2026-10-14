"""OAuth endpoint schemas (CHT-1518, CHT-1519, CHT-1520)."""
from typing import Literal

from pydantic import BaseModel, Field

from app.enums import AgentKind
from app.utils import DateTimeUTC


class OAuthErrorResponse(BaseModel):
    """RFC 6749 §5.2 / RFC 7591 §3.2.2 error body."""

    error: str
    error_description: str | None = None


class ClientRegistrationResponse(BaseModel):
    """RFC 7591 §3.2.1. ``client_secret`` only for a confidential
    (``client_secret_post``) client; it is shown once and stored hashed."""

    client_id: str
    client_id_issued_at: int
    client_secret: str | None = None
    client_secret_expires_at: int | None = None
    client_name: str | None = None
    redirect_uris: list[str]
    token_endpoint_auth_method: str
    grant_types: list[str]
    response_types: list[str]
    scope: str | None = None


# --- consent (CHT-1519) ------------------------------------------------------


class ConsentClient(BaseModel):
    """How the consent page names the app asking (design §2.3)."""

    client_id: str
    name: str
    # "builtin" (a first-party app built into this server, CHT-1602),
    # "recognized" (a known client's metadata document), "cimd" (a
    # metadata document served from `host`), "unverified" (registered
    # dynamically: nothing about it is proven).
    trust: Literal["builtin", "recognized", "cimd", "unverified"]
    host: str | None = None
    registration: str


class ConsentPolicy(BaseModel):
    name: str
    requested: bool
    # Only `write` until RBAC policies exist (CHT-1435/CHT-1440).
    available: bool


class ConsentProject(BaseModel):
    id: str
    name: str
    key: str


class ConsentAgent(BaseModel):
    """An existing agent the viewer may connect as: one they manage
    (CHT-1508 rules) in this team."""

    id: str
    name: str
    agent_project_id: str | None = None
    # Whose agent it is: a team admin may choose another member's agent
    # (review N4/Q2), so the page says so.
    owner_name: str | None = None
    owned_by_viewer: bool = True
    # Live API keys the agent also has: connecting doesn't revoke them,
    # and revoking the connection won't either (review Q2).
    active_api_keys: int = 0


class ConsentTeam(BaseModel):
    id: str
    name: str
    key: str
    projects: list[ConsentProject]
    agents: list[ConsentAgent]


class AuthorizationRequestView(BaseModel):
    """GET /api/oauth/requests/{id}: what the consent page shows."""

    id: str
    expires_at: DateTimeUTC
    client: ConsentClient
    redirect_uri: str
    redirect_host: str
    loopback_redirect: bool
    requested_scopes: list[str]
    policies: list[ConsentPolicy]
    offline_access: bool
    refresh_idle_days: int
    refresh_absolute_days: int
    teams: list[ConsentTeam]
    default_agent_name: str
    # The team and agent this viewer last connected this client to, to
    # pre-select on a reconnect; None the first time.
    suggested_team_id: str | None = None
    suggested_agent_id: str | None = None
    # Who the connection will act as (CHT-1602): "agent" for every app
    # but a built-in first-party one, which signs in as the viewer
    # ("person"): the page then offers a team and nothing else, and
    # `teams[].agents` is empty.
    acts_as: Literal["agent", "person"] = "agent"


class AuthorizationApproval(BaseModel):
    """POST /api/oauth/requests/{id}/approve."""

    team_id: str
    # An existing agent the viewer manages; None creates a new one.
    agent_id: str | None = None
    agent_name: str | None = Field(default=None, min_length=1, max_length=255)
    # None (or empty): the whole team.
    project_ids: list[str] | None = Field(default=None, max_length=200)
    policy: str = "write"


class AuthorizationDecision(BaseModel):
    """Where the browser goes next: the client's redirect_uri with either
    `code` or `error`, plus `state` and `iss` (RFC 9207)."""

    redirect: str
    # The agent the connection acts as; None on deny and for a built-in
    # app, which acts as the person who approved.
    agent_id: str | None = None


# --- token endpoint (CHT-1520) -----------------------------------------------


class TokenAgent(BaseModel):
    """The agent a connection acts as."""

    id: str
    name: str
    kind: AgentKind | None = None


class TokenPerson(BaseModel):
    """The person a built-in app's session acts as (CHT-1602)."""

    id: str
    name: str
    email: str


class TokenConnection(BaseModel):
    """Who and where a connection's tokens act (design §2.4): not part of
    OAuth, so under its own key. ``project_ids`` None means the whole
    team. ``acts_as`` says which of ``agent`` (every connector) and
    ``person`` (a built-in first-party app, CHT-1602: its tokens act as
    the person who signed in, on REST and /ws) is set. For a person,
    ``team_id`` is the team they picked: the app's starting team, which
    the session ends with if they leave it; the tokens reach every team
    the person is in, as their web login does."""

    acts_as: Literal["agent", "person"] = "agent"
    agent: TokenAgent | None = None
    person: TokenPerson | None = None
    team_id: str
    project_ids: list[str] | None = None
    holder_session_id: str


class TokenResponse(BaseModel):
    """RFC 6749 §5.1 successful token response. ``refresh_token`` only
    when ``offline_access`` was granted."""

    access_token: str
    token_type: Literal["Bearer"] = "Bearer"
    expires_in: int
    refresh_token: str | None = None
    scope: str
    chaotic: TokenConnection


# --- connected apps (CHT-1523) -----------------------------------------------


class ConnectionResponse(BaseModel):
    """One of the caller's own OAuth connections (design §4.3, S7): an
    app they consented to, acting as an agent in a team. ``project_ids``
    None means the whole team. ``idle_expires_at`` is when it stops
    refreshing unless used; ``absolute_expires_at`` is when it ends
    regardless."""

    id: str
    # The app, named exactly as the consent screen named it: trust label
    # and host from OAuthClientService.identity(), never the bare
    # self-asserted client_name (CHT-1523 review).
    client: ConsentClient | None = None
    # "agent": a connector acting as `agent`. "person": a built-in app
    # signed in as the caller on one device (CHT-1602); `agent` is None
    # and `device_name` is what the app called the device, if anything.
    acts_as: Literal["agent", "person"] = "agent"
    device_name: str | None = None
    agent: TokenAgent | None = None
    team_id: str | None = None
    team_name: str | None = None
    project_ids: list[str] | None = None
    policy: str
    scopes: list[str]
    created_at: DateTimeUTC
    last_used_at: DateTimeUTC | None = None
    last_refreshed_at: DateTimeUTC | None = None
    idle_expires_at: DateTimeUTC
    absolute_expires_at: DateTimeUTC
