"""Request-scoped actor context (CHT-1432; spec "Agent identities" §5.8).

Authentication used to resolve a credential and then discard it: the REST
dependency returned only the ``User``, the remote MCP transport kept its own
``User``-only ContextVar, and the facts that mattered for gating were
re-derived wherever they were needed (``not current_user.is_agent and
x_chaotic_interactive == "1"`` in two handlers). ``ActorContext`` is the one
descriptor computed at authentication time, by the REST dependency
(``app.api.deps.get_current_actor``) and by the HTTP MCP auth wrapper
(``app.mcp_server.auth``). stdio MCP talks to REST, so it gets the REST one.

It lives in a ContextVar so code below the API layer can read it without
threading an actor through every signature (option (c) of the CHT-1428 RBAC
spike). It lives here, outside ``app.api``, so services can import it
without importing FastAPI.

Lifetime: whoever sets it resets it by token when the request ends
(``actor_scope``). Tests drive the ASGI app in the test's own task, so a set
without a reset would leak one request's actor into the next.

Fields that later phases will back (grantee, holder_session_id,
scope_project_ids, policy, request_context) exist now with their "acting as
itself, unrestricted" defaults, so callers can be written against the final
shape. Nothing here enforces anything yet (CHT-1439).
"""
from __future__ import annotations

import contextlib
import contextvars
from dataclasses import dataclass, field
from types import MappingProxyType
from typing import TYPE_CHECKING, Any, Iterator, Literal, Mapping

if TYPE_CHECKING:  # pragma: no cover
    from app.oxyde_models.user import OxydeUser

# How the request proved who it is. "api_key": a `ck_...` key, sent as a
# bearer token or as the /mcp/<key> capability URL. "jwt": a session token
# from POST /auth/login (the web app, `chaotic login`).
Via = Literal["api_key", "jwt"]

# Which entry point resolved the actor. "rest": the FastAPI routes, which
# includes the CLI and the stdio MCP adapter (it calls REST, and is not
# distinguishable from the CLI there). "mcp_http": the remote /mcp
# transport, which calls app.api in-process.
Transport = Literal["rest", "mcp_http"]

def _empty_context() -> Mapping[str, Any]:
    return MappingProxyType({})


# eq=False: identity comparison and hashing. Field-wise equality would
# compare ORM rows, and there is no use for two equal-but-distinct actors.
@dataclass(frozen=True, eq=False)
class ActorContext:
    """Who is acting on this request, and through which credential."""

    # The principal acting: authorization, gates and attribution use it.
    # ``CurrentUser`` is this object.
    effective: "OxydeUser"
    via: Via
    transport: Transport
    # The api_keys row behind the proof (None for a JWT login session).
    credential_id: str | None = None
    credential_name: str | None = None
    # Client-asserted "a person is at a TTY / browser" (X-Chaotic-Interactive,
    # CHT-1302). Best-effort, not a security boundary. Always False on MCP.
    interactive: bool = False
    # Not yet backed (CHT-1442 grants, CHT-1447 holder sessions, CHT-1440
    # key scope, CHT-1435 policies, CHT-1444 request context).
    grantee: "OxydeUser | None" = None
    holder_session_id: str | None = None
    scope_project_ids: frozenset[str] | None = None
    policy: Any = None
    request_context: Mapping[str, Any] = field(default_factory=_empty_context)

    @property
    def is_agent(self) -> bool:
        return bool(self.effective.is_agent)

    @property
    def owner_id(self) -> str | None:
        """The human an agent belongs to (its ``parent_user_id``); None for a human."""
        return self.effective.parent_user_id if self.is_agent else None

    @property
    def is_human_request(self) -> bool:
        """CHT-1302 hybrid gate: the ritual/estimate exemption needs BOTH a
        human account AND an interactive caller. An agent, or a human
        account driven by a script or MCP, is gated."""
        return not self.is_agent and self.interactive


_current_actor: contextvars.ContextVar[ActorContext] = contextvars.ContextVar("chaotic_current_actor")


def get_current_actor() -> ActorContext:
    """The actor of the in-flight request.

    Raises LookupError outside a request that went through authentication:
    that is a wiring bug, not a client-facing auth failure.
    """
    return _current_actor.get()


def get_current_actor_or_none() -> ActorContext | None:
    return _current_actor.get(None)


@contextlib.contextmanager
def actor_scope(actor: ActorContext) -> Iterator[ActorContext]:
    """Make ``actor`` current for the body, then restore whatever was there.

    Reset is by token, so the previous value comes back even if something
    inside set the var again. Must exit in the context it entered (true for
    a ``with`` around an await, or a FastAPI async yield dependency).
    """
    token = _current_actor.set(actor)
    try:
        yield actor
    finally:
        _current_actor.reset(token)


def is_human_request_for(user: "OxydeUser") -> bool:
    """Whether the current request is a human-interactive one *for this user*.

    Fails closed (False, i.e. gated) when there is no actor, or when the
    actor is someone else -- an in-process caller passing a different
    ``current_user`` than the one that authenticated. That matches the old
    behaviour, where a caller that did not pass the interactive header was
    gated.
    """
    actor = get_current_actor_or_none()
    if actor is None or actor.effective.id != user.id:
        return False
    return actor.is_human_request
