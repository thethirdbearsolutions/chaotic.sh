"""Epic progress (CHT-1902): progress toward goals, read off the data.

One pass over the scope's issues (no descriptions) assigns every issue to
its nearest epic ancestor, so a sub-task of a task under an epic counts
toward that epic, and an issue under no epic is "untracked". Sprints are
the clock: the project's budget transactions say what each recent sprint
closed, and so what it moved toward each goal.

Read-only, and a fixed number of queries however many epics there are:
the Epics view used to fetch sub-issues once per epic.
"""
from collections import defaultdict

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


def _placeholders(values) -> str:
    return ",".join("?" for _ in values)


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

    rows = await execute_raw(
        "SELECT id, identifier, title, status, priority, issue_type, parent_id, project_id, "
        "estimate, status_pinned, number FROM issues "
        f"WHERE project_id IN ({_placeholders(project_ids)})",
        list(project_ids),
    )
    issues = {r["id"]: r for r in rows}
    is_epic = {i: r["issue_type"] in (IssueType.EPIC.name, IssueType.EPIC.value) for i, r in issues.items()}

    # Nearest epic ancestor, memoised; a cycle or a parent outside the
    # scope ends the walk with no epic.
    owner: dict[str, str | None] = {}

    def nearest_epic(issue_id: str) -> str | None:
        path = []
        seen = set()
        current = issues[issue_id]["parent_id"]
        result = None
        while current is not None:
            if current in owner:
                result = owner[current] if not is_epic.get(current) else current
                break
            if current in seen or current not in issues:
                break
            seen.add(current)
            if is_epic[current]:
                result = current
                break
            path.append(current)
            current = issues[current]["parent_id"]
        for p in path:
            owner[p] = result
        owner[issue_id] = result
        return result

    for issue_id in issues:
        if issue_id not in owner:
            nearest_epic(issue_id)

    # Sprint windows: each project's most recent started sprints.
    sprint_rows = await execute_raw(
        "SELECT id, project_id, name, status, activated_at, closed_at FROM sprints "
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
        window[pid].sort(key=lambda s: (s["id"] == active.get(pid), s["activated_at"] or ""))
        window[pid] = window[pid][-sprint_window:]
    sprint_ids = [s["id"] for ss in window.values() for s in ss]

    # bucket -> sprint_id -> [closed, points]; bucket is an epic id, or
    # ("untracked", project_id).
    ticks: dict = defaultdict(lambda: defaultdict(lambda: [0, 0]))
    if sprint_ids:
        txns = await execute_raw(
            "SELECT sprint_id, issue_id, points FROM budget_transactions "
            f"WHERE sprint_id IN ({_placeholders(sprint_ids)}) AND issue_id IS NOT NULL",
            sprint_ids,
        )
        for t in txns:
            issue = issues.get(t["issue_id"])
            if issue is None:
                continue
            # An epic's own close counts toward itself.
            bucket = t["issue_id"] if is_epic[t["issue_id"]] else owner.get(t["issue_id"])
            if bucket is None:
                bucket = ("untracked", issue["project_id"])
            cell = ticks[bucket][t["sprint_id"]]
            cell[0] += 1
            cell[1] += t["points"] or 0

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
    for issue_id, r in issues.items():
        st = _status(r["status"])
        epic_id = owner.get(issue_id)
        if epic_id is None:
            if not is_epic[issue_id] and st in _OPEN:
                untracked_open[r["project_id"]] += 1
            continue
        c = counts[epic_id]
        c.total += 1
        if st is not None:
            setattr(c, _STATUS_FIELD[st], getattr(c, _STATUS_FIELD[st]) + 1)
        if st != IssueStatus.CANCELED:
            pts = r["estimate"] if r["estimate"] is not None else 1
            points[epic_id][0] += pts
            if st == IssueStatus.DONE:
                points[epic_id][1] += pts

    epics = []
    for issue_id, r in issues.items():
        if not is_epic[issue_id]:
            continue
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
