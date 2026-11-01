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


async def _anchor(backend: Backend, arguments: Mapping) -> list[tuple[str, str | None, str]]:
    """Where the tool will act, as ``(team_id, project_id, what)`` rows:
    one per issue for a tool given several. ``project_id`` None means the
    whole team. Follows the bodies' own precedence: an issue (or several,
    or a parent) settles both, then a document, then an explicit
    `project`, then the caller's default team."""
    if arguments.get("identifier"):
        rows = [arguments["identifier"]]
    elif arguments.get("identifiers"):
        rows = list(arguments["identifiers"])
    elif arguments.get("parent"):
        rows = [arguments["parent"]]
    else:
        rows = []
    if rows:
        out = []
        for identifier in rows:
            iss = await backend.get_issue(identifier)
            project_id = iss.get("project_id")
            out.append((await backend.team_for_project(project_id), project_id, f"issue {identifier}"))
        return out
    if arguments.get("document_id"):
        doc = await backend.get_document(await backend.resolve_document(arguments["document_id"]))
        return [(doc.get("team_id"), doc.get("project_id"), f"document {arguments['document_id']}")]
    if arguments.get("project"):
        project_id, _ = await backend.resolve_project(arguments["project"], arguments.get("team"))
        return [(await backend.team_for_project(project_id), project_id, f"project {arguments['project']}")]
    team_id = await backend.resolve_member_team(arguments.get("team"))
    return [(team_id, None, "the caller's team")]


async def scope_hint_refusal(name: str, backend: Backend, hints: Mapping, arguments: Mapping) -> dict | None:
    """None when every hint agrees with where `name` will act; otherwise
    the ``scope_mismatch`` envelope. Lookup failures (an unknown team, an
    issue that is not there) raise as usual and come back as their own
    envelopes from the error boundary."""
    team_hint, project_hint = hints.get("team"), hints.get("project")
    team_hint_id = await backend.resolve_named_team(team_hint) if team_hint else None
    for team_id, project_id, what in await _anchor(backend, arguments):
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
            continue
        hinted_project, _ = await backend.resolve_project(project_hint, team_id)
        if project_id is None:
            if name in TEAM_DIRECTORY_TOOLS and await backend.team_for_project(hinted_project) == team_id:
                continue
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
