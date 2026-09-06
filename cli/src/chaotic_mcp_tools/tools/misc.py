"""Project and activity tools."""
from __future__ import annotations

from typing import Annotated

from pydantic import Field

from ..backend import Backend
from ..constants import TEAM_FIELD_DESC
from ..shapes import COMPACT_PROJECT_FIELDS, DETAIL_PROJECT_DESC, listing, preview


async def project_list(
    backend: Backend,
    team: Annotated[str | None, Field(description=TEAM_FIELD_DESC)] = None,
    detail: Annotated[bool, Field(description=DETAIL_PROJECT_DESC)] = False,
) -> dict:
    """List the projects in your team: key, name, issue count, and the
    budget/ritual settings that govern work in each.

    The one call that answers "what projects exist" -- every other tool
    takes a `project` filter but none enumerate them. Scoped to the
    current team (`chaotic status`); the HTTP transport adds a `team`
    parameter for API keys that can see more than one.
    """
    team_id = await backend.resolve_team(team)
    # limit=1001 (page of 1000 + the truncation probe): the API default of
    # 100 would make a real project silently unresolvable (CHT-1351).
    projects = await backend.list_projects(team_id, 1001)
    return listing("projects", projects, 1000, COMPACT_PROJECT_FIELDS, detail)


async def server_info(backend: Backend) -> dict:
    """Which server this surface is talking to: git commit, app version,
    MCP toolset fingerprint and tool count.

    Call it when a field looks stale or a tool is missing: a tracker can
    run a commit older than the repository you have checked out, and
    nothing else on this surface says so (CHT-1401). Compare `git_sha`
    with `git rev-parse origin/main`; `mcp_toolset_fingerprint` changes
    whenever the toolset's shape does.
    """
    info = await backend.server_info()
    return {
        key: info.get(key)
        for key in (
            "git_sha", "git_sha_short", "git_commit_time", "git_dirty",
            "app_version", "start_time", "mcp_toolset_fingerprint", "mcp_tool_count",
        )
    }


async def activity_recent(
    backend: Backend,
    limit: Annotated[int, Field(description="Maximum number of activity entries to return.", ge=1, le=200)] = 20,
    project: Annotated[
        str | None,
        Field(description="Restrict to one project (id, key, or name). Omit for team-wide activity.")
    ] = None,
    team: Annotated[str | None, Field(description=TEAM_FIELD_DESC)] = None,
) -> dict:
    """Show recent team activity: comments, status changes, assignments, etc.

    `old_value`/`new_value` are cut to a 200-char preview (an edited
    description would otherwise ship two full bodies per row); use
    issue_view for the current text. Includes `count` and `truncated`.
    """
    project_id = None
    if project:
        project_id, team_id = await backend.resolve_project(project, team)
    else:
        team_id = await backend.resolve_team(team)

    activities = list(await backend.list_activities(team_id, limit=limit + 1, project_id=project_id) or [])
    page = [dict(a) for a in activities[:limit]]
    for a in page:
        a["old_value"] = preview(a.get("old_value"))
        a["new_value"] = preview(a.get("new_value"))
    return {"activities": page, "count": len(page), "truncated": len(activities) > limit}
