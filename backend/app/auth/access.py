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
service calls known to do it (a new mechanism must be added there). Whether a register-only principal, or a
read-scoped OAuth token, should be able to trigger them is CHT-1568.
The same classification is where OAuth scopes will attach
(architecture review e10bc055, finding 3).

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
    """``fn``'s classification, or None if it has none."""
    return getattr(fn, _ATTR, None)


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
