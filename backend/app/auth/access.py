"""What an API function does, for the registrar rule (CHT-1561).

Every ``app/api`` function a request can reach, whether as a REST
route's endpoint or as the function an MCP tool calls in-process
(ADR-0005), is classified once, here, by a decorator:

* ``@reads``: reads. A registrar may call it.
* ``@writes``: writes. A registrar may not.
* ``@registers``: a write a registrar may call (``POST /agents/register``
  and nothing else).

REST (``deps.get_current_user``) looks up the matched route's endpoint,
and /mcp (``mcp_server.backend._translated``) looks up the API function
the tool's backend method declares it calls. Both apply
``refuse_registrar_write``. Before this, REST went by HTTP method and
/mcp by backend method name (``get_``/``list_``), and the two could
disagree.

Fail closed: an unclassified function is refused to a registrar. The
guard tests in ``tests/test_agent_register.py`` require every
authenticated route and every MCP backend method to be classified, so
that path is a backstop, not the rule.

A read here is what a registrar may call, not a promise of no side
effects. Some reads reconcile stored state lazily, as unattributed
bookkeeping a caller cannot direct; ``READS_WITH_BOOKKEEPING`` below
lists them, and tests/test_agent_register.py pins that list against the
service calls known to do it (a new mechanism must be added there). A register-only principal and a read-scoped OAuth token may trigger
them too; why is under ``READS_WITH_BOOKKEEPING`` (CHT-1568).

OAuth scopes (CHT-1562) attach to the same classification, at the same
two places: ``SCOPE_GRANTS`` says which markers each advertised scope
(``app.oauth.discovery.RESOURCE_SCOPES``) lets a principal call, and
``authorize`` applies the registrar rule and then the scope rule. API
keys and session JWTs carry ``ALL_SCOPES``, so the scope rule refuses
them nothing; it bites only once a narrower credential exists (OAuth
access tokens, CHT-1520).

``signup`` and ``login`` are classified too though no registrar rule
reaches them (they do not authenticate): every route carries a marker,
for completeness and for the scopes to come.
"""
from __future__ import annotations

import enum

from fastapi import HTTPException, status


class Access(str, enum.Enum):
    READ = "read"
    WRITE = "write"
    REGISTER = "register"


_ATTR = "chaotic_access"

# The wildcard scope: every scope there is. What an API key or a session
# JWT carries (``app.auth.credentials``). A narrower credential lists its
# scopes instead.
ALL = "*"
ALL_SCOPES: frozenset[str] = frozenset({ALL})


def _mark(access: Access):
    def decorate(fn):
        existing = getattr(fn, _ATTR, None)
        if existing is not None and existing is not access:
            raise TypeError(f"{fn.__qualname__} is already classified {existing.value}")
        setattr(fn, _ATTR, access)
        return fn
    return decorate


reads = _mark(Access.READ)
writes = _mark(Access.WRITE)
registers = _mark(Access.REGISTER)

# Reads that write as a side effect, by qualified name -> what they do.
# Each is unattributed reconciliation, triggered by any reader:
#   lease release (CHT-1246): an expired claim lease reverts the issue to
#     todo, unassigns it, records LEASE_EXPIRED and broadcasts;
#   limbo self-heal (CHT-1278): check_limbo completes a sprint's limbo
#     once nothing is pending;
#   orphan cleanup: a ticket-limbo record whose gate is gone is resolved
#     and its blockers cleared;
#   sprint materialization (CHT-1557): a project's first current/next
#     sprints are created.
#
# Policy (CHT-1568): any principal that may read the row may trigger its
# reconciliation, a read-scoped OAuth token and a registrar included
# (option (a) of the three in the ticket). That is safe because each one
#   * is reconciliation, not an action: it moves stored state to what it
#     already is by the rules (a lease that has expired, a limbo with
#     nothing pending, a gate that no longer exists, a project with no
#     sprint), the same result whoever reads first, or a sweeper would;
#   * takes nothing from the caller but which row is read: no field,
#     value or target the caller chooses is written;
#   * is never attributed to the reader: LEASE_EXPIRED is recorded
#     against the lapsed assignee, the rest record no actor at all
#     (tests/test_scope_enforcement.py pins the lease case for a
#     read-scoped principal).
# Gating it on a write scope (b) would make a read-only token see stale
# state: an expired claim still in progress, a sprint that does not
# exist, so reads would stop being useful and still not be pure. Moving
# it to a sweeper (c) is the clean end state, and nothing here prevents
# it, but it is not needed for read scopes to be safe. A new entry here
# must keep all three properties; one that writes caller-chosen data, or
# stamps the caller, is a write and must be classified ``@writes``.
_LEASE = "lease release (CHT-1246)"
READS_WITH_BOOKKEEPING: dict[str, str] = {
    "app.api.issues.get_issue": _LEASE,
    "app.api.issues.get_issue_by_identifier": _LEASE,
    "app.api.issues.list_issues": _LEASE,
    "app.api.issues.list_team_activities": _LEASE,
    "app.api.issues.list_ready_issues": _LEASE,
    "app.api.nested.list_project_ready_issues": _LEASE,
    "app.api.nested.list_team_ready_issues": _LEASE,
    "app.api.rituals.get_limbo_status": "limbo self-heal (CHT-1278)",
    "app.api.rituals.get_issues_with_pending_gates": "orphaned ticket-limbo cleanup",
    "app.api.rituals.get_issues_with_pending_approvals": "orphaned ticket-limbo cleanup",
    "app.api.sprints.get_current_sprint": "sprint materialization (CHT-1557)",
}

# What a registrar may call.
REGISTRAR_MAY = frozenset({Access.READ, Access.REGISTER})


def access_of(fn) -> Access | None:
    """``fn``'s classification, or None if it has none. An ``Access``
    stands for itself (an MCP method that calls no API function)."""
    if isinstance(fn, Access):
        return fn
    return getattr(fn, _ATTR, None)


# What each advertised resource scope (design doc §4.4: the policy names
# ``read``/``triage``/``worker``/``write`` as ``chaotic:<policy>``) lets a
# principal call, by marker. Must name exactly the scopes
# ``app.oauth.discovery.RESOURCE_SCOPES`` advertises (a test pins it).
#
# ``triage`` and ``worker`` are policies whose writes are a subset of
# ``write`` (some fields, some transitions). A marker cannot express a
# subset, so until the policy check in the services exists (RBAC,
# CHT-1435..1440) they grant reads only: fail closed. Consent cannot
# issue them before then either (design §2.3, greyed out).
#
# ``@registers`` is a write (it creates identities and mints keys), so it
# needs ``chaotic:write``; the registrar capability is checked
# separately, by the route. ``offline_access`` and anything unknown
# grant nothing.
SCOPE_GRANTS: dict[str, frozenset[Access]] = {
    "chaotic:write": frozenset({Access.READ, Access.WRITE, Access.REGISTER}),
    "chaotic:worker": frozenset({Access.READ}),
    "chaotic:triage": frozenset({Access.READ}),
    "chaotic:read": frozenset({Access.READ}),
}


def scopes_permit(scopes: frozenset[str], fn) -> bool:
    """May a principal holding ``scopes`` call ``fn`` (an API function or
    an ``Access``)? The wildcard permits everything, unclassified
    included, which is what every credential had before scopes. Anything
    narrower fails closed on an unclassified ``fn``."""
    if ALL in scopes:
        return True
    access = access_of(fn)
    return access is not None and any(access in SCOPE_GRANTS.get(s, ()) for s in scopes)


def scopes_granting(access: Access | None) -> list[str]:
    """The scopes that would permit ``access``, for the refusal message."""
    return [s for s, grants in SCOPE_GRANTS.items() if access in grants]


def refuse_out_of_scope(scopes: frozenset[str], fn) -> None:
    """403 ``policy_denied`` unless ``scopes`` permit ``fn``. Not the RFC
    6750 ``insufficient_scope`` step-up: the policy was chosen by a human
    at consent, and a client cannot escalate it (design §4.4), so it is a
    tool-level refusal, the same envelope as any other (ADR-0006)."""
    if scopes_permit(scopes, fn):
        return
    access = access_of(fn)
    needed = scopes_granting(access)
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail={
            "error_code": "policy_denied",
            "message": (
                f"This credential's scope does not allow a {access.value if access else 'unclassified'} call. "
                + (f"It needs one of: {', '.join(needed)}. " if needed else "")
                + "Reconnect with a broader policy to do this."
            ),
            "required_scopes": needed,
            "granted_scopes": sorted(scopes),
        },
    )


def authorize(principal, fn) -> None:
    """Every rule a resolved principal must pass to call ``fn``: the
    registrar rule, then the scope rule. REST (``deps.get_current_user``)
    and /mcp (``mcp_server.backend._translated``) both call this, with the
    same ``fn`` marker, so they cannot disagree."""
    refuse_registrar_write(principal.user, fn)
    refuse_out_of_scope(principal.scopes, fn)


def is_registrar(user) -> bool:
    """An agent with the registrar capability (CHT-1498)."""
    return bool(user.is_agent and user.can_register)


REGISTRAR_CANNOT_WRITE = {
    "error_code": "registrar_cannot_write",
    "message": (
        "This agent is a registrar: it may register session identities (POST /api/agents/register) "
        "and read, nothing else. Write with a registered identity's key instead."
    ),
}


def refuse_registrar_write(user, fn) -> None:
    """Registrars are register-only (CHT-1498, spec I8: fail closed). If
    registration fails, nothing may quietly fall back to writing as the
    shared harness identity, which is the collapse registration exists to
    end. A registrar may call what is classified ``@reads`` or
    ``@registers``; anything else, unclassified included, is 403."""
    if not is_registrar(user) or access_of(fn) in REGISTRAR_MAY:
        return
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=dict(REGISTRAR_CANNOT_WRITE))
