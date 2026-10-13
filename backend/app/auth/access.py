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
effects: ``get_current_sprint`` may create a project's first sprints
(``ensure_sprints_exist``, unattributed bookkeeping, CHT-1557). The same
classification is where OAuth scopes will attach (architecture review
e10bc055, finding 3).
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
