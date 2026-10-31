"""Epic progress (CHT-1902): progress toward goals, read off the data.

A recursive query assigns every issue to its nearest epic ancestor and
counts them there, in SQL (CHT-1922), so a sub-task of a task under an epic counts
toward that epic, and an issue under no epic is "untracked". Sprints are
the clock: the project's budget transactions say what each recent sprint
closed, and so what it moved toward each goal.

Read-only, and a fixed number of queries however many epics there are:
the Epics view used to fetch sub-issues once per epic.
"""
from collections import defaultdict
from datetime import datetime, timezone

from oxyde import execute_raw

from app.enums import IssueStatus, IssueType, SprintStatus
from app.schemas.epic import (
    ChildCounts,
    EpicProgress,
    EpicProgressResponse,
    SprintTick,
    UntrackedProgress,
)

# How many of each project's most recent sprints (the active one
# included) the response carries.
DEFAULT_SPRINT_WINDOW = 8
MAX_SPRINT_WINDOW = 50

_STATUS_FIELD = {
    IssueStatus.BACKLOG: "backlog",
    IssueStatus.TODO: "todo",
    IssueStatus.IN_PROGRESS: "in_progress",
    IssueStatus.IN_REVIEW: "in_review",
    IssueStatus.DONE: "done",
    IssueStatus.CANCELED: "canceled",
}
_OPEN = {IssueStatus.BACKLOG, IssueStatus.TODO, IssueStatus.IN_PROGRESS, IssueStatus.IN_REVIEW}


_EPIC = (IssueType.EPIC.name, IssueType.EPIC.value)
# How far up a parent chain the walk goes; the API refuses a chain this
# deep (issue_service._PARENT_WALK_LIMIT), and it ends a cycle.
_WALK_LIMIT = 1000


def _owner_cte(scope: str, start: str) -> str:
    """``WITH RECURSIVE ... owners(issue_id, epic_id)``: for each issue
    matching ``start`` (a WHERE over issues), its nearest epic ancestor,
    or NULL. The walk climbs one parent per step and stops at the first
    epic, at a parent outside the scope (``scope`` is the project id
    placeholders), or at the depth bound, which also ends a cycle.

    Parameters, in order: ``start``'s, then the two epic spellings,
    then the scope's project ids."""
    return (
        "WITH RECURSIVE walk(issue_id, cur, depth, epic_id) AS ("
        f" SELECT id, parent_id, 0, NULL FROM issues WHERE {start}"
        " UNION ALL"
        " SELECT w.issue_id, p.parent_id, w.depth + 1,"
        " CASE WHEN p.issue_type IN (?, ?) THEN p.id END"
        " FROM walk w JOIN issues p ON p.id = w.cur"
        f" WHERE w.epic_id IS NULL AND w.depth < {_WALK_LIMIT} AND p.project_id IN ({scope})"
        "), owners(issue_id, epic_id) AS ("
        " SELECT issue_id, MAX(epic_id) FROM walk GROUP BY issue_id"
        ") "
    )


def _placeholders(values) -> str:
    return ",".join("?" for _ in values)


def _when(raw) -> datetime:
    """A stored timestamp as an aware datetime, for ordering; a missing or
    unreadable one sorts first."""
    if isinstance(raw, datetime):
        return raw if raw.tzinfo else raw.replace(tzinfo=timezone.utc)
    try:
        value = datetime.fromisoformat(str(raw).replace("Z", "+00:00"))
    except (TypeError, ValueError):
        return datetime.min.replace(tzinfo=timezone.utc)
    return value if value.tzinfo else value.replace(tzinfo=timezone.utc)


def _status(raw) -> IssueStatus | None:
    try:
        return IssueStatus[raw]
    except KeyError:
        try:
            return IssueStatus(raw)
        except ValueError:
            return None


async def epic_progress(
    project_ids: list[str], sprint_window: int = DEFAULT_SPRINT_WINDOW,
) -> EpicProgressResponse:
    """Every epic in ``project_ids`` with its progress, plus each
    project's untracked work. The caller has already decided the scope
    is visible."""
    sprint_window = max(1, min(sprint_window, MAX_SPRINT_WINDOW))
    if not project_ids:
        return EpicProgressResponse(epics=[], untracked=[], sprint_window=sprint_window)

    projects = {
        r["id"]: r["key"]
        for r in await execute_raw(
            f"SELECT id, key FROM projects WHERE id IN ({_placeholders(project_ids)})", list(project_ids),
        )
    }
    project_ids = [p for p in project_ids if p in projects]
    if not project_ids:
        return EpicProgressResponse(epics=[], untracked=[], sprint_window=sprint_window)

    scope = _placeholders(project_ids)
    epic_rows = await execute_raw(
        "SELECT id, identifier, title, status, priority, project_id, estimate, status_pinned, number "
        f"FROM issues WHERE project_id IN ({scope}) AND issue_type IN (?, ?)",
        [*project_ids, *_EPIC],
    )

    # Counts by nearest epic, computed in SQL so the rows that cross into
    # Python are one per (epic, status), not one per issue (CHT-1922).
    count_rows = await execute_raw(
        _owner_cte(scope, f"project_id IN ({scope})")
        + "SELECT o.epic_id, i.project_id, i.status, "
        "CASE WHEN i.issue_type IN (?, ?) THEN 1 ELSE 0 END AS is_epic, "
        "COUNT(*) AS n, SUM(COALESCE(i.estimate, 1)) AS pts "
        "FROM owners o JOIN issues i ON i.id = o.issue_id "
        "GROUP BY o.epic_id, i.project_id, i.status, is_epic",
        [*project_ids, *_EPIC, *project_ids, *_EPIC],
    )

    # Sprint windows: each project's most recent started sprints.
    sprint_rows = await execute_raw(
        "SELECT id, project_id, name, status, activated_at, closed_at, created_at FROM sprints "
        f"WHERE project_id IN ({_placeholders(project_ids)}) AND status IN (?, ?) "
        "ORDER BY activated_at DESC, created_at DESC",
        [*project_ids, SprintStatus.ACTIVE.name, SprintStatus.COMPLETED.name],
    )
    window: dict[str, list[dict]] = defaultdict(list)
    active: dict[str, str] = {}
    for s in sprint_rows:
        is_active = s["status"] in (SprintStatus.ACTIVE.name, SprintStatus.ACTIVE.value)
        if is_active:
            active[s["project_id"]] = s["id"]
        if len(window[s["project_id"]]) < sprint_window or is_active:
            window[s["project_id"]].append(s)
    for pid in window:
        # Oldest first; an active sprint is always last.
        # Migration 0016 nulled activated_at on sprints that ran before
        # it; those fall back to when they were made.
        window[pid].sort(key=lambda s: (
            s["id"] == active.get(pid), _when(s["activated_at"] or s["created_at"]), _when(s["created_at"]),
        ))
        window[pid] = window[pid][-sprint_window:]
    sprint_ids = [s["id"] for ss in window.values() for s in ss]

    # bucket -> sprint_id -> {issue_id: points}; bucket is an epic id, or
    # ("untracked", project_id). Keyed by issue, so a ticket closed,
    # reopened and closed again in one sprint counts once (its budget was
    # charged twice; progress was made once).
    closes: dict = defaultdict(lambda: defaultdict(dict))
    if sprint_ids:
        txns = await execute_raw(
            _owner_cte(
                scope,
                f"project_id IN ({scope}) AND id IN (SELECT issue_id FROM budget_transactions "
                f"WHERE sprint_id IN ({_placeholders(sprint_ids)}))",
            )
            + "SELECT t.sprint_id, t.issue_id, t.points, o.epic_id, i.project_id "
            "FROM budget_transactions t JOIN owners o ON o.issue_id = t.issue_id "
            "JOIN issues i ON i.id = t.issue_id "
            f"WHERE t.sprint_id IN ({_placeholders(sprint_ids)})",
            [*project_ids, *sprint_ids, *_EPIC, *project_ids, *sprint_ids],
        )
        for t in txns:
            # Ticks follow the same rule as the counts: a close counts
            # toward the issue's nearest epic ancestor, so a nested epic's
            # own close counts toward the epic above it.
            bucket = t["epic_id"] or ("untracked", t["project_id"])
            cell = closes[bucket][t["sprint_id"]]
            cell[t["issue_id"]] = max(cell.get(t["issue_id"], 0), t["points"] or 0)

    ticks: dict = {
        bucket: {sid: [len(cell), sum(cell.values())] for sid, cell in per_sprint.items()}
        for bucket, per_sprint in closes.items()
    }

    def sprint_ticks(bucket, project_id) -> list[SprintTick]:
        cells = ticks.get(bucket, {})
        return [
            SprintTick(
                sprint_id=s["id"], name=s["name"], status=s["status"],
                activated_at=s["activated_at"], closed_at=s["closed_at"],
                closed=cells.get(s["id"], [0, 0])[0], points=cells.get(s["id"], [0, 0])[1],
            )
            for s in window.get(project_id, [])
        ]

    counts: dict[str, ChildCounts] = defaultdict(ChildCounts)
    points: dict[str, list[int]] = defaultdict(lambda: [0, 0])
    untracked_open: dict[str, int] = defaultdict(int)
    for r in count_rows:
        st = _status(r["status"])
        n = r["n"]
        epic_id = r["epic_id"]
        if epic_id is None:
            if not r["is_epic"] and st in _OPEN:
                untracked_open[r["project_id"]] += n
            continue
        c = counts[epic_id]
        c.total += n
        if st is not None:
            setattr(c, _STATUS_FIELD[st], getattr(c, _STATUS_FIELD[st]) + n)
        if st != IssueStatus.CANCELED:
            points[epic_id][0] += r["pts"] or 0
            if st == IssueStatus.DONE:
                points[epic_id][1] += r["pts"] or 0

    epics = []
    for r in epic_rows:
        issue_id = r["id"]
        pid = r["project_id"]
        current = ticks.get(issue_id, {}).get(active.get(pid), [0, 0])
        c = counts.get(issue_id) or ChildCounts()
        epics.append((r["number"], pid, EpicProgress(
            id=issue_id, identifier=r["identifier"], title=r["title"], status=r["status"],
            status_pinned=bool(r["status_pinned"]), priority=r["priority"], estimate=r["estimate"],
            project_id=pid, project_key=projects[pid], children=c, open_children=c.open,
            points_total=points[issue_id][0], points_done=points[issue_id][1],
            closed_this_sprint=current[0], points_this_sprint=current[1],
            sprints=sprint_ticks(issue_id, pid),
        )))
    # Newest first within a project, projects in key order.
    epics.sort(key=lambda e: (projects[e[1]], -e[0]))

    untracked = []
    for pid in sorted(project_ids, key=lambda p: projects[p]):
        bucket = ("untracked", pid)
        current = ticks.get(bucket, {}).get(active.get(pid), [0, 0])
        untracked.append(UntrackedProgress(
            project_id=pid, project_key=projects[pid], open=untracked_open[pid],
            closed_this_sprint=current[0], points_this_sprint=current[1],
            sprints=sprint_ticks(bucket, pid),
        ))

    return EpicProgressResponse(
        epics=[e for _, _, e in epics], untracked=untracked, sprint_window=sprint_window,
    )
