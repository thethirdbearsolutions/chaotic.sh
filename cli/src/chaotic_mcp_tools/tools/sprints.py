"""Sprint tools."""
from __future__ import annotations

from typing import Annotated

from pydantic import Field

from ..backend import Backend
from ..constants import SPRINT_STATUS_VALUES, TEAM_FIELD_DESC
from ..errors import BackendError, ToolInputError, backend_error_payload
from ..shapes import with_budget_state


async def sprint_current(
    backend: Backend,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name. Defaults to the current project.")
    ] = None,
    team: Annotated[str | None, Field(description=TEAM_FIELD_DESC)] = None,
) -> dict:
    """Show the active sprint: budget, points spent, limbo and arrears state.

    Call this when a write is refused with `sprint_in_arrears` or
    `sprint_in_limbo` -- it reports what's actually blocking, which
    nothing else on this surface does.

    Only closed tickets accrue budget: completing an issue charges the
    project's currently-active sprint (estimate points, or 1 point if
    unestimated), whichever sprint the ticket itself belonged to.
    Going over budget blocks moving any ticket to in_progress/done/
    canceled project-wide until the sprint is closed.
    """
    project_id, _ = await backend.resolve_project(project, team)
    return with_budget_state(await backend.get_current_sprint(project_id))


async def sprint_list(
    backend: Backend,
    status: Annotated[
        SPRINT_STATUS_VALUES | None,
        Field(description="Filter by sprint status.")
    ] = None,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name. Defaults to the current project.")
    ] = None,
    team: Annotated[str | None, Field(description=TEAM_FIELD_DESC)] = None,
) -> dict:
    """List a project's sprints, with each one's budget state."""
    project_id, _ = await backend.resolve_project(project, team)
    sprints = await backend.list_sprints(project_id, status)
    return {"sprints": [with_budget_state(s) for s in (sprints or [])]}


async def sprint_close(
    backend: Backend,
    sprint: Annotated[
        str | None,
        Field(description="Sprint name, id, or 'current'. Defaults to the active sprint.")
    ] = None,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name. Defaults to the current project.")
    ] = None,
    team: Annotated[str | None, Field(description=TEAM_FIELD_DESC)] = None,
) -> dict:
    """Close a sprint and rotate to the next planned one.

    This is the remedy for `sprint_in_arrears`: budget is only released
    by closing, not by editing tickets.

    If the project has per-sprint rituals, closing enters LIMBO instead
    of rotating -- the returned sprint has `limbo: true`, and the next
    step is ritual_pending / ritual_complete. Check `limbo` on the
    result rather than assuming the rotation happened.

    Rotating sprints is a project-wide state change that affects
    everyone's budget accounting, so prefer sprint_current first and
    close deliberately.
    """
    project_id, _ = await backend.resolve_project(project, team)
    sprint_id = await backend.resolve_sprint(sprint or "current", project_id)
    result = with_budget_state(await backend.close_sprint(sprint_id))
    result["entered_limbo"] = bool(result.get("limbo"))

    # Budget state on the CLOSED sprint is history: it stays in arrears
    # forever, because that is what it spent. What the caller actually
    # asked -- "am I unblocked now?" -- is a property of whatever sprint
    # is active AFTER the rotation, so report that separately rather than
    # leaving `in_arrears: true` on a successful close to be misread as
    # "still blocked" (CHT-1351).
    if not result["entered_limbo"]:
        active = await backend.get_current_sprint(project_id)
        result["now_active"] = with_budget_state(active) if active else None
    else:
        result["now_active"] = None
    return result


async def sprint_transactions(
    backend: Backend,
    sprint: Annotated[
        str | None,
        Field(description="Sprint name, id, or 'current'. Defaults to the active sprint.")
    ] = None,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name. Defaults to the current project.")
    ] = None,
    team: Annotated[str | None, Field(description=TEAM_FIELD_DESC)] = None,
) -> dict:
    """Show a sprint's budget transactions -- the audit trail behind points_spent.

    One row per ticket completion charged to this sprint. Use it to
    reconcile a points_spent number that looks wrong before assuming a
    bug: closing older work after a rotation charges the *new* active
    sprint by design.
    """
    project_id, _ = await backend.resolve_project(project, team)
    sprint_id = await backend.resolve_sprint(sprint or "current", project_id)
    return {"transactions": list(await backend.list_transactions(sprint_id) or [])}


async def _set_sprint_on_issues(backend: Backend, identifiers: list[str], sprint_id: str | None) -> dict:
    """Apply a sprint change per-issue, reporting partial success.

    Mirrors the CLI's own loop: the backend's batch-update endpoint
    deliberately excludes sprint_id (sprint moves need per-issue
    validation), so one bad identifier in a list shouldn't silently
    discard the rest -- collect failures and report both sides.
    """
    updated, failed = [], []
    for identifier in identifiers:
        try:
            iss = await backend.get_issue(identifier)
            await backend.update_issue(iss["id"], sprint_id=sprint_id)
            updated.append(identifier)
        except BackendError as e:
            failed.append({"identifier": identifier, "error": backend_error_payload(e)})
    # Name the target sprint, not just its UUID (CHT-1371); None on remove.
    sprint = None
    if sprint_id:
        # The writes above already happened; a failed name lookup must not
        # turn a successful batch into {"error": ...} (PR #268 review).
        try:
            s = await backend.get_sprint(sprint_id)
            sprint = {"id": s["id"], "name": s.get("name")}
        except BackendError:
            sprint = {"id": sprint_id, "name": None}
    return {"updated": updated, "failed": failed, "sprint_id": sprint_id, "sprint": sprint}


async def sprint_add(
    backend: Backend,
    identifiers: Annotated[
        list[str],
        Field(description="Issue identifiers to add, e.g. ['CHT-12', 'CHT-13'].")
    ],
    sprint: Annotated[
        str | None,
        Field(description="Sprint name, id, or 'current'. Defaults to the active sprint.")
    ] = None,
    project: Annotated[
        str | None,
        Field(description="Project id, key, or name. Defaults to the current project.")
    ] = None,
    team: Annotated[str | None, Field(description=TEAM_FIELD_DESC)] = None,
) -> dict:
    """Add issues to a sprint.

    Sprint membership does not by itself charge budget -- only closing a
    ticket does, and it charges whichever sprint is active at that
    moment.
    """
    if not identifiers:
        raise ToolInputError("Pass at least one issue identifier.")

    project_id, _ = await backend.resolve_project(project, team)
    sprint_id = await backend.resolve_sprint(sprint or "current", project_id)
    return await _set_sprint_on_issues(backend, identifiers, sprint_id)


async def sprint_remove(
    backend: Backend,
    identifiers: Annotated[
        list[str],
        Field(description="Issue identifiers to remove from their sprint.")
    ],
) -> dict:
    """Remove issues from whatever sprint they're in (leaves them unscheduled)."""
    if not identifiers:
        raise ToolInputError("Pass at least one issue identifier.")
    return await _set_sprint_on_issues(backend, identifiers, None)
