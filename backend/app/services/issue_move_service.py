"""Move an issue, with its descendants, to another project (CHT-2106, CHT-2107).

A move renumbers each issue in the target project and keeps its old
identifier as an alias (``OxydeIssueAlias``): every lookup by the old
identifier reaches the moved issue, and the old project never hands
that number out again.

Everything keyed by the issue's id travels as is: comments, description
revisions, activity, relations (a relation to an issue that stays behind
becomes a cross-project relation), attachments, linked documents, labels
(team-wide, so no mapping is needed) and ritual attestations (history:
they name the old project's rituals, and the target's rituals are what
gate the issue from now on).

What does not fit the target is mapped, and every mapping is reported:

- sprint membership: the old project's sprint means nothing in the
  target, so the issue leaves it (REMOVED_FROM_SPRINT activity);
- the root's parent, when it stays behind: detached;
- open claim/close intents: their blockers are the old project's
  rituals, so they are canceled (INTENT_CANCELED activity);
- an estimate off the target's estimate scale: kept, with a warning.

``dry_run`` returns the same report and writes nothing. The write is one
transaction: a failed move changes nothing.
"""
from __future__ import annotations

import logging
from dataclasses import dataclass, field

from oxyde import IntegrityError, execute_raw

from app.db.transactions import atomic
from app.enums import ActivityType
from app.oxyde_models.inbox import OxydeInboxEntry
from app.oxyde_models.issue import OxydeIssue, OxydeIssueActivity, OxydeTicketLimbo
from app.oxyde_models.issue_alias import OxydeIssueAlias
from app.oxyde_models.project import OxydeProject

logger = logging.getLogger(__name__)

# A runaway tree is a data problem, not a move: refuse rather than walk it.
_MAX_MOVE = 2000
_MAX_RETRIES = 5


class IssueMoveError(Exception):
    """A move that cannot be made as asked; the message says why."""


@dataclass
class MovePlan:
    target_project_key: str
    dry_run: bool
    moved: list[dict] = field(default_factory=list)
    detached_parent: str | None = None
    removed_from_sprint: list[str] = field(default_factory=list)
    canceled_intents: list[str] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)

    def as_dict(self) -> dict:
        return {
            "target_project": self.target_project_key,
            "dry_run": self.dry_run,
            "moved": self.moved,
            "detached_parent": self.detached_parent,
            "removed_from_sprint": self.removed_from_sprint,
            "canceled_intents": self.canceled_intents,
            "warnings": self.warnings,
        }


async def next_free_number(project_id: str, project_key: str) -> int:
    """The next issue number for a project: past every issue it holds and
    every number it gave out to an issue that has since moved away."""
    rows = await execute_raw(
        "SELECT COALESCE(MAX(number), 0) AS n FROM issues WHERE identifier LIKE ?",
        [f"{project_key}-%"],
    )
    alias_rows = await execute_raw(
        "SELECT COALESCE(MAX(number), 0) AS n FROM issue_aliases WHERE project_id = ?",
        [project_id],
    )
    return max(rows[0]["n"], alias_rows[0]["n"]) + 1


async def _subtree(root: OxydeIssue) -> list[OxydeIssue]:
    """``root`` and every descendant, root first, then breadth-first."""
    ordered = [root]
    seen = {root.id}
    frontier = [root.id]
    while frontier:
        children = await OxydeIssue.objects.filter(parent_id__in=frontier).order_by("number").all()
        frontier = []
        for child in children:
            if child.id in seen:
                continue
            seen.add(child.id)
            ordered.append(child)
            frontier.append(child.id)
            if len(ordered) > _MAX_MOVE:
                raise IssueMoveError(f"{root.identifier} has more than {_MAX_MOVE} descendants.")
    return ordered


async def move_issue(
    issue: OxydeIssue,
    source: OxydeProject,
    target: OxydeProject,
    user_id: str,
    *,
    with_children: bool = False,
    dry_run: bool = False,
) -> MovePlan:
    """Move ``issue`` (and, with ``with_children``, its descendants) from
    ``source`` to ``target``. The caller has already checked that the
    user can see both projects."""
    from chaotic_mcp_tools.estimates import off_scale_warning

    if target.id == source.id:
        raise IssueMoveError(f"{issue.identifier} is already in {target.key}.")
    if target.team_id != source.team_id:
        raise IssueMoveError("Issues can only move between projects of the same team.")

    if with_children:
        issues = await _subtree(issue)
    else:
        has_children = await OxydeIssue.objects.filter(parent_id=issue.id).exists()
        if has_children:
            raise IssueMoveError(
                f"{issue.identifier} has sub-issues. Move them with it (with_children), "
                "or re-parent them first."
            )
        issues = [issue]

    plan = MovePlan(target_project_key=target.key, dry_run=dry_run)
    ids = {i.id for i in issues}
    old_parent_id = issue.parent_id if issue.parent_id and issue.parent_id not in ids else None
    if old_parent_id:
        parent = await OxydeIssue.objects.filter(id=old_parent_id).first()
        plan.detached_parent = parent.identifier if parent else old_parent_id

    open_intents = await OxydeTicketLimbo.objects.filter(
        issue_id__in=list(ids), cleared_at=None,
    ).all()
    intent_issue_ids = {li.issue_id for li in open_intents}

    scale = target.estimate_scale.value if target.estimate_scale is not None else None
    for i in issues:
        if i.sprint_id:
            plan.removed_from_sprint.append(i.identifier)
        if i.id in intent_issue_ids:
            plan.canceled_intents.append(i.identifier)
        warning = off_scale_warning(i.estimate, scale)
        if warning:
            plan.warnings.append(f"{i.identifier}: {warning}")

    for attempt in range(_MAX_RETRIES):
        start = await next_free_number(target.id, target.key)
        plan.moved = [
            {"id": i.id, "old": i.identifier, "new": f"{target.key}-{start + n}"}
            for n, i in enumerate(issues)
        ]
        if dry_run:
            return plan
        try:
            await _apply(issues, plan, source, target, start, old_parent_id, open_intents, user_id)
            break
        except IntegrityError:
            # Another create or move took the same numbers; take fresh ones.
            if attempt == _MAX_RETRIES - 1:
                raise
    else:  # pragma: no cover - the loop either breaks or raises
        raise IssueMoveError("Could not allocate identifiers in the target project.")

    from app.services.issue_service import IssueService

    service = IssueService()
    if old_parent_id:
        await service.rederive_parents([old_parent_id], user_id)
    # The moved root may itself be an epic whose status is derived.
    await service.rederive_parents([issue.id], user_id)
    for i in issues:
        try:
            moved = await service.get_by_id(i.id)
            if moved is not None:
                await service._broadcast_issue_updated(moved)
        except Exception:
            logger.exception("Failed to broadcast moved issue=%s", i.id)
    return plan


async def _apply(issues, plan, source, target, start, old_parent_id, open_intents, user_id):
    from app.services.issue_service import IssueService

    service = IssueService()
    async with atomic():
        for n, i in enumerate(issues):
            new_number = start + n
            new_identifier = f"{target.key}-{new_number}"
            old_identifier = i.identifier
            old_sprint_id = i.sprint_id

            await OxydeIssueAlias.objects.create(
                issue_id=i.id,
                identifier=old_identifier,
                project_id=source.id,
                number=i.number,
            )
            await OxydeIssue.objects.filter(id=i.id).update(
                project_id=target.id, identifier=new_identifier, number=new_number, sprint_id=None,
            )
            if i.id == issues[0].id and old_parent_id:
                await OxydeIssue.objects.filter(id=i.id).update(parent_id=None)

            await OxydeIssueActivity.objects.create(
                issue_id=i.id,
                user_id=user_id,
                activity_type=ActivityType.MOVED,
                field_name="project_id",
                old_value=old_identifier,
                new_value=new_identifier,
            )
            if old_sprint_id:
                await OxydeIssueActivity.objects.create(
                    issue_id=i.id,
                    user_id=user_id,
                    activity_type=ActivityType.REMOVED_FROM_SPRINT,
                    field_name="sprint_id",
                    old_value=old_sprint_id,
                )

        for intent in open_intents:
            await service._cancel_intent(intent, user_id)

        ids = [i.id for i in issues]
        await OxydeInboxEntry.objects.filter(issue_id__in=ids).update(project_id=target.id)

        last = start + len(issues) - 1
        if (target.issue_count or 0) < last:
            await OxydeProject.objects.filter(id=target.id).update(issue_count=last)
