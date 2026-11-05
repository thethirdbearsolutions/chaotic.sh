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

from app.enums import ApprovalMode, IssueStatus, IssueType, SprintStatus
from app.schemas.epic import (
    AwaitingHuman,
    ChildCounts,
    EpicPerson,
    EpicTicket,
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

# How many of an epic's in-flight tickets the response names; the
# count of all of them comes with it (CHT-2043).
IN_FLIGHT_LIMIT = 5


def _spellings(*members) -> list[str]:
    """Each enum member as its stored name and its value, for an IN (...)
    over a column that may hold either (see _EPIC)."""
    return [x for m in members for x in (m.name, m.value)]


_IN_FLIGHT = _spellings(IssueStatus.IN_PROGRESS, IssueStatus.IN_REVIEW)
_DONE = _spellings(IssueStatus.DONE)
_CLOSED = _spellings(IssueStatus.DONE, IssueStatus.CANCELED)


def _owner_cte(scope: str, start: str) -> str:
    """``WITH RECURSIVE ... owners(issue_id, epic_id)``: for each issue
    matching ``start`` (a WHERE over issues) that has an epic ancestor,
    its nearest one; an issue with none has no row. The walk climbs one
    parent per step and stops at the first epic or at a parent outside
    the scope (``scope`` is the project id placeholders). ``UNION``, not
    ``UNION ALL``: a row repeats only on a cycle, so a corrupt cycle in
    old data ends after one lap instead of running to a depth bound for
    every issue on or under it.

    Parameters, in order: ``start``'s, then the two epic spellings,
    then the scope's project ids."""
    return (
        "WITH RECURSIVE walk(issue_id, cur, epic_id) AS ("
        f" SELECT id, parent_id, NULL FROM issues WHERE {start}"
        " UNION"
        " SELECT w.issue_id, p.parent_id,"
        " CASE WHEN p.issue_type IN (?, ?) THEN p.id END"
        " FROM walk w JOIN issues p ON p.id = w.cur"
        f" WHERE w.epic_id IS NULL AND p.project_id IN ({scope})"
        "), owners(issue_id, epic_id) AS ("
        " SELECT issue_id, MIN(epic_id) FROM walk WHERE epic_id IS NOT NULL GROUP BY issue_id"
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
        "SELECT e.id, e.identifier, e.title, e.status, e.priority, e.project_id, e.estimate, e.status_pinned, "
        "e.number, e.updated_at, e.completed_at, e.assignee_id, "
        "u.name AS assignee_name, u.is_agent AS assignee_is_agent "
        "FROM issues e LEFT JOIN users u ON u.id = e.assignee_id "
        f"WHERE e.project_id IN ({scope}) AND e.issue_type IN (?, ?)",
        [*project_ids, *_EPIC],
    )

    # Counts by nearest epic, computed in SQL so the rows that cross into
    # Python are one per (epic, status), not one per issue (CHT-1922).
    count_rows = await execute_raw(
        _owner_cte(scope, f"project_id IN ({scope})")
        + "SELECT o.epic_id, i.project_id, i.status, "
        "CASE WHEN i.issue_type IN (?, ?) THEN 1 ELSE 0 END AS is_epic, "
        "COUNT(*) AS n, SUM(COALESCE(i.estimate, 1)) AS pts, MAX(i.updated_at) AS last_updated "
        f"FROM issues i LEFT JOIN owners o ON o.issue_id = i.id WHERE i.project_id IN ({scope}) "
        "GROUP BY o.epic_id, i.project_id, i.status, is_epic",
        [*project_ids, *_EPIC, *project_ids, *_EPIC, *project_ids],
    )

    in_flight, in_flight_count, last_shipped, awaiting = await _epic_now(scope, project_ids)

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
            f"FROM budget_transactions t JOIN issues i ON i.id = t.issue_id AND i.project_id IN ({scope}) "
            "LEFT JOIN owners o ON o.issue_id = t.issue_id "
            f"WHERE t.sprint_id IN ({_placeholders(sprint_ids)})",
            [*project_ids, *sprint_ids, *_EPIC, *project_ids, *project_ids, *sprint_ids],
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
    last_activity: dict[str, datetime] = {}
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
        if r["last_updated"]:
            when = _when(r["last_updated"])
            if epic_id not in last_activity or when > last_activity[epic_id]:
                last_activity[epic_id] = when
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
        activity = [w for w in (last_activity.get(issue_id), r["updated_at"] and _when(r["updated_at"])) if w]
        epics.append((r["number"], pid, EpicProgress(
            id=issue_id, identifier=r["identifier"], title=r["title"], status=r["status"],
            status_pinned=bool(r["status_pinned"]), priority=r["priority"], estimate=r["estimate"],
            project_id=pid, project_key=projects[pid], children=c, open_children=c.open,
            points_total=points[issue_id][0], points_done=points[issue_id][1],
            closed_this_sprint=current[0], points_this_sprint=current[1],
            sprints=sprint_ticks(issue_id, pid),
            in_flight=in_flight.get(issue_id, []), in_flight_count=in_flight_count.get(issue_id, 0),
            last_shipped=last_shipped.get(issue_id), last_activity_at=max(activity) if activity else None,
            completed_at=r["completed_at"], awaiting_human=awaiting.get(issue_id, []),
            owner=_person(r),
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
            awaiting_human=awaiting.get(bucket, []),
        ))

    return EpicProgressResponse(
        epics=[e for _, _, e in epics], untracked=untracked, sprint_window=sprint_window,
    )


def _person(row) -> EpicPerson | None:
    if not row["assignee_id"] or row["assignee_name"] is None:
        return None
    return EpicPerson(id=row["assignee_id"], name=row["assignee_name"], is_agent=bool(row["assignee_is_agent"]))


async def _epic_now(scope: str, project_ids: list[str]):
    """What is happening under each epic now (CHT-2043), in three
    queries however many epics there are: its in-flight tickets with who
    holds them, the ticket that shipped last, and the ticket rituals
    only a person can clear. Each counts toward the issue's nearest
    epic, as the counts do; a ritual on an epic itself counts toward
    that epic. A ritual on work under no epic is keyed
    ``("untracked", project_id)``.

    Returns ``(in_flight, in_flight_count, last_shipped, awaiting)``,
    keyed by epic id."""
    assignee = (
        "u.id AS assignee_id, u.name AS assignee_name, u.is_agent AS assignee_is_agent "
    )
    flight_rows = await execute_raw(
        _owner_cte(scope, f"project_id IN ({scope}) AND status IN ({_placeholders(_IN_FLIGHT)})")
        + "SELECT o.epic_id, i.identifier, i.title, i.status, i.updated_at, " + assignee
        + "FROM issues i JOIN owners o ON o.issue_id = i.id LEFT JOIN users u ON u.id = i.assignee_id "
        f"WHERE i.project_id IN ({scope}) AND i.status IN ({_placeholders(_IN_FLIGHT)}) "
        "AND i.issue_type NOT IN (?, ?) "
        "ORDER BY i.updated_at DESC",
        [*project_ids, *_IN_FLIGHT, *_EPIC, *project_ids, *project_ids, *_IN_FLIGHT, *_EPIC],
    )
    in_flight: dict[str, list[EpicTicket]] = defaultdict(list)
    in_flight_count: dict[str, int] = defaultdict(int)
    for r in flight_rows:
        in_flight_count[r["epic_id"]] += 1
        if len(in_flight[r["epic_id"]]) < IN_FLIGHT_LIMIT:
            in_flight[r["epic_id"]].append(EpicTicket(
                identifier=r["identifier"], title=r["title"], status=r["status"],
                assignee=_person(r), updated_at=r["updated_at"],
            ))

    shipped_rows = await execute_raw(
        _owner_cte(
            scope,
            f"project_id IN ({scope}) AND status IN ({_placeholders(_DONE)}) "
            "AND completed_at IS NOT NULL AND issue_type NOT IN (?, ?)",
        )
        + "SELECT * FROM ("
        "SELECT o.epic_id, i.identifier, i.title, i.status, i.updated_at, i.completed_at, " + assignee + ", "
        "ROW_NUMBER() OVER (PARTITION BY o.epic_id ORDER BY i.completed_at DESC, i.number DESC) AS rn "
        "FROM issues i JOIN owners o ON o.issue_id = i.id LEFT JOIN users u ON u.id = i.assignee_id"
        ") WHERE rn = 1",
        [*project_ids, *_DONE, *_EPIC, *_EPIC, *project_ids],
    )
    last_shipped = {
        r["epic_id"]: EpicTicket(
            identifier=r["identifier"], title=r["title"], status=r["status"], assignee=_person(r),
            updated_at=r["updated_at"], completed_at=r["completed_at"],
        )
        for r in shipped_rows
    }

    # The approvals banner's set (RitualService.get_issues_with_pending_
    # approvals), for open tickets: a REVIEW attestation not yet approved,
    # and an open intent's unresolved GATE blocker, each on an active
    # ritual.
    pending = (
        "SELECT a.issue_id, r.name AS ritual_name, r.approval_mode, a.attested_at AS since, "
        "a.attested_by AS by_id, r.project_id AS ritual_project_id FROM ritual_attestations a JOIN rituals r ON r.id = a.ritual_id "
        f"WHERE a.issue_id IS NOT NULL AND a.approved_at IS NULL AND r.is_active AND r.project_id IN ({scope}) "
        f"AND r.approval_mode IN ({_placeholders(_spellings(ApprovalMode.REVIEW))}) "
        "UNION ALL "
        "SELECT l.issue_id, r.name, r.approval_mode, l.requested_at, l.requested_by_id, r.project_id "
        "FROM ticket_limbo l JOIN ticket_limbo_blockers b ON b.limbo_id = l.id JOIN rituals r ON r.id = b.ritual_id "
        f"WHERE l.cleared_at IS NULL AND b.resolved_at IS NULL AND r.is_active AND r.project_id IN ({scope}) "
        f"AND r.approval_mode IN ({_placeholders(_spellings(ApprovalMode.GATE))}) "
        # The banner first resolves a blocker whose ritual already has an
        # approved attestation on the ticket (_cleanup_orphaned_ticket_limbo);
        # this read leaves it as it is and skips it the same way.
        "AND NOT EXISTS (SELECT 1 FROM ritual_attestations a2 WHERE a2.ritual_id = b.ritual_id "
        "AND a2.issue_id = l.issue_id AND a2.approved_at IS NOT NULL)"
    )
    awaiting_rows = await execute_raw(
        _owner_cte(scope, f"project_id IN ({scope}) AND status NOT IN ({_placeholders(_CLOSED)})")
        + "SELECT p.ritual_name, p.approval_mode, p.since, i.identifier, i.title, i.project_id, "
        "CASE WHEN i.issue_type IN (?, ?) THEN i.id ELSE o.epic_id END AS epic_id, by_user.name AS by_name "
        f"FROM ({pending}) p JOIN issues i ON i.id = p.issue_id "
        "LEFT JOIN owners o ON o.issue_id = i.id LEFT JOIN users by_user ON by_user.id = p.by_id "
        f"WHERE i.project_id IN ({scope}) AND i.status NOT IN ({_placeholders(_CLOSED)}) "
        "AND p.ritual_project_id = i.project_id "
        "ORDER BY p.since",
        [
            *project_ids, *_CLOSED, *_EPIC, *project_ids,
            *_EPIC,
            *project_ids, *_spellings(ApprovalMode.REVIEW),
            *project_ids, *_spellings(ApprovalMode.GATE),
            *project_ids, *_CLOSED,
        ],
    )
    awaiting: dict = defaultdict(list)
    for r in awaiting_rows:
        bucket = r["epic_id"] or ("untracked", r["project_id"])
        awaiting[bucket].append(AwaitingHuman(
            ritual_name=r["ritual_name"], approval_mode=r["approval_mode"], identifier=r["identifier"],
            title=r["title"], since=r["since"], requested_by_name=r["by_name"],
        ))
    return in_flight, in_flight_count, last_shipped, awaiting
