"""Scope hints: a `team` or `project` passed to a tool that does not take
it (CHT-1951).

Agents pass `team`/`project` on calls "to be safe", the HTTP server's
instructions tell them to, and the stdio server never declared `team`
at all. The unknown-argument guard (``registry.UnknownArgumentGuard``)
lets these two through rather than refusing them, but a hint must never
be dropped in silence when it disagrees with where the tool acts:
`sprint_close(team="OPS")` on a stdio profile scoped to ENG would close
ENG's sprint, and `inbox_mark_all_read(project="B")` would mark the whole
team's inbox read. So a hint is checked against the scope the tool will
actually act on, and either agrees (and is dropped) or refuses the call
with ``error_code: scope_mismatch``, naming that scope. Nothing is done
on a refusal.

The guard hands the hints to the bound tool through a contextvar (the
SDK's argument model would drop them before the tool saw them); a tool
that declares `team`/`project` gets them as ordinary arguments and they
never become hints.
"""
from __future__ import annotations

import contextvars
from collections.abc import Mapping

from .backend import Backend
from .errors import error_envelope

SCOPE_HINTS = ("team", "project")

_hints: contextvars.ContextVar[Mapping[str, str] | None] = contextvars.ContextVar(
    "chaotic_mcp_scope_hints", default=None,
)

# Team-wide tools whose answer is the team's directory, the same whatever
# project in that team the caller has in mind; a `project` hint naming a
# project of that team agrees with them. Every other tool without a
# `project` parameter acts on rows that belong to projects (an inbox, an
# activity feed), so a `project` hint would read as a filter the tool
# does not apply, and is refused.
TEAM_DIRECTORY_TOOLS = frozenset({"label_list", "project_list"})


def set_hints(hints: Mapping[str, str] | None):
    return _hints.set(hints)


def reset_hints(token) -> None:
    _hints.reset(token)


def current_hints() -> Mapping[str, str] | None:
    return _hints.get()


def _mismatch(message: str, **acts_in) -> dict:
    return error_envelope(message, "scope_mismatch", acts_in=acts_in)



class IssueLookupReuse:
    """The backend as the tool sees it after a hint check: the issue rows
    the check fetched are handed to the tool's own first lookup of each
    identifier instead of being fetched again (an agent that passes
    `project` "to be safe" would otherwise pay twice on every issue_view).
    Each row is handed over once: a second lookup, after the tool may
    have written, fetches afresh. Everything else is the backend's."""

    def __init__(self, backend: Backend):
        self._backend = backend
        self._fetched: dict[str, dict] = {}

    def __getattr__(self, name):
        return getattr(self._backend, name)

    async def get_issue(self, identifier: str) -> dict:
        row = self._fetched.pop(identifier, None)
        if row is not None:
            return dict(row)
        return await self._backend.get_issue(identifier)

    async def fetch_for_check(self, identifier: str) -> dict:
        row = await self._backend.get_issue(identifier)
        self._fetched[identifier] = row
        return dict(row)


async def _get_issue(backend, identifier: str) -> dict:
    fetch = getattr(backend, "fetch_for_check", None)
    return await (fetch(identifier) if fetch else backend.get_issue(identifier))


async def _anchor(backend: Backend, arguments: Mapping, hints: Mapping) -> tuple[list[tuple], bool]:
    """Where the tool will act, as ``(team_id, project_id, what)`` rows,
    and whether a hint need agree with only one of them (an issue and a
    document linked together: a hint naming either describes the call)
    rather than all of them (several issues). ``project_id`` None means
    the whole team. Follows the bodies' own precedence: an issue (or
    several, or a parent) settles both, then a document, then an explicit
    `project`, then the caller's default team."""
    if arguments.get("identifier"):
        identifiers = [arguments["identifier"]]
    elif arguments.get("identifiers"):
        identifiers = list(arguments["identifiers"])
    elif arguments.get("parent"):
        identifiers = [arguments["parent"]]
    else:
        identifiers = []
    rows = []
    for identifier in identifiers:
        iss = await _get_issue(backend, identifier)
        project_id = iss.get("project_id")
        rows.append((await backend.team_for_project(project_id), project_id, f"issue {identifier}"))
    if arguments.get("document_id") and (not rows or arguments.get("identifier")):
        doc = await backend.get_document(await backend.resolve_document(arguments["document_id"]))
        rows.append((doc.get("team_id"), doc.get("project_id"), f"document {arguments['document_id']}"))
        return rows, len(rows) > 1
    if rows:
        return rows, False
    if arguments.get("project"):
        project_id, _ = await backend.resolve_project(arguments["project"], arguments.get("team"))
        return [(await backend.team_for_project(project_id), project_id, f"project {arguments['project']}")], False
    # The tool's own `team` when it takes one; else the hinted team, which
    # resolve_member_team checks is one the caller can see (a tool with no
    # scope of its own, like server_info, must not ask a caller in several
    # teams to "pass `team`" when they did). On stdio this is the
    # profile's team whatever is passed.
    team_id = await backend.resolve_member_team(arguments.get("team") or hints.get("team"))
    return [(team_id, None, "the caller's team")], False


async def _row_refusal(name, backend, row, team_hint, team_hint_id, project_hint) -> dict | None:
    team_id, project_id, what = row
    if team_hint and team_hint_id != team_id:
        where = (
            " (chaotic mcp acts in its profile's team; run it with a profile for that team)"
            if not backend.capabilities.team_param and what == "the caller's team" else ""
        )
        return _mismatch(
            f"{name} was given team '{team_hint}', but it acts on {what}, in team {team_id}{where}; "
            "nothing was done. Omit `team`, or pass the team it acts in.",
            team=team_id, project=project_id,
        )
    if not project_hint:
        return None
    hinted_project, _ = await backend.resolve_project(project_hint, team_id)
    if project_id is None:
        if name in TEAM_DIRECTORY_TOOLS and await backend.team_for_project(hinted_project) == team_id:
            return None
        return _mismatch(
            f"{name} acts on the whole of team {team_id}, not on project '{project_hint}'; "
            "nothing was done. Omit `project`.",
            team=team_id, project=None,
        )
    if hinted_project != project_id:
        return _mismatch(
            f"{name} was given project '{project_hint}', but it acts on {what}, in project "
            f"{project_id}; nothing was done. Omit `project`, or pass the project it acts in.",
            team=team_id, project=project_id,
        )
    return None


async def scope_hint_refusal(name: str, backend: Backend, hints: Mapping, arguments: Mapping) -> dict | None:
    """None when every hint agrees with where `name` will act; otherwise
    the ``scope_mismatch`` envelope. Lookup failures (an unknown team, an
    issue that is not there) raise as usual and come back as their own
    envelopes from the error boundary."""
    team_hint, project_hint = hints.get("team"), hints.get("project")
    team_hint_id = await backend.resolve_named_team(team_hint) if team_hint else None
    rows, any_of = await _anchor(backend, arguments, hints)
    refusals = [await _row_refusal(name, backend, row, team_hint, team_hint_id, project_hint) for row in rows]
    if any_of:
        return refusals[0] if all(refusals) else None
    return next((r for r in refusals if r), None)
