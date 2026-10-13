"""OAuth endpoint schemas (CHT-1518, CHT-1519)."""
from typing import Literal

from pydantic import BaseModel, Field

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
    # "recognized" (a known client's metadata document), "cimd" (a
    # metadata document served from `host`), "unverified" (registered
    # dynamically: nothing about it is proven).
    trust: Literal["recognized", "cimd", "unverified"]
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
    agent_id: str | None = None
