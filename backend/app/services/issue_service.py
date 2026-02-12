"""Issue service for issue management."""
import random
from datetime import datetime, timezone
from sqlalchemy import select, func, case, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy.exc import IntegrityError
from app.models.issue import Issue, IssueComment, Label, IssueStatus, IssuePriority, IssueType, IssueActivity, ActivityType, IssueRelation, IssueRelationType, issue_labels
from app.models.project import Project, UnestimatedHandling
from app.models.sprint import Sprint, SprintStatus
from app.models.ticket_limbo import TicketLimbo, LimboType
from app.models.ritual import ApprovalMode
from app.models.budget_transaction import BudgetTransaction
from app.schemas.issue import (
    IssueCreate,
    IssueUpdate,
    IssueCommentCreate,
    IssueCommentUpdate,
    LabelCreate,
    LabelUpdate,
    IssueRelationCreate,
)


class SprintInArrearsError(Exception):
    """Raised when sprint is in arrears and budget-consuming operations are blocked."""

    def __init__(self, budget: int, points_spent: int):
        self.budget = budget
        self.points_spent = points_spent
        self.arrears_by = points_spent - budget
        super().__init__(
            f"Sprint is in arrears. Close the current sprint to continue. "
            f"(budget: {budget}, spent: {points_spent}, arrears by: {self.arrears_by})"
        )


class SprintInLimboError(Exception):
    """Raised when sprint is in limbo (pending rituals) and operations are blocked."""

    def __init__(self, sprint_id: str, pending_rituals: list[dict]):
        """
        Args:
            sprint_id: The sprint ID
            pending_rituals: List of dicts with 'name' and 'prompt' keys
        """
        self.sprint_id = sprint_id
        self.pending_rituals = pending_rituals
        ritual_names = [r.get("name", "unknown") for r in pending_rituals]
        super().__init__(
            f"Sprint is in limbo. Complete pending rituals to continue: {', '.join(ritual_names)}"
        )


class TicketRitualsError(Exception):
    """Raised when ticket has pending rituals and cannot be closed."""

    def __init__(self, issue_id: str, pending_rituals: list[dict]):
        """
        Args:
            issue_id: The issue identifier (e.g., CHT-123)
            pending_rituals: List of dicts with 'name' and 'prompt' keys
        """
        self.issue_id = issue_id
        self.pending_rituals = pending_rituals
        ritual_names = [r.get("name", "unknown") for r in pending_rituals]
        super().__init__(
            f"Ticket has pending rituals. Complete them before closing: {', '.join(ritual_names)}"
        )


class ClaimRitualsError(Exception):
    """Raised when ticket has pending claim rituals and cannot be claimed (moved to in_progress)."""

    def __init__(self, issue_id: str, pending_rituals: list[dict]):
        """
        Args:
            issue_id: The issue identifier (e.g., CHT-123)
            pending_rituals: List of dicts with 'name' and 'prompt' keys
        """
        self.issue_id = issue_id
        self.pending_rituals = pending_rituals
        ritual_names = [r.get("name", "unknown") for r in pending_rituals]
        super().__init__(
            f"Ticket has pending claim rituals. Complete them before claiming: {', '.join(ritual_names)}"
        )


class EstimateRequiredError(Exception):
    """Raised when estimate is required but missing."""

    def __init__(self, message: str):
        super().__init__(message)


class IssueService:
    """Service for issue operations."""

    # Semantic ordering for enums: lower number = higher urgency/earlier in workflow
    PRIORITY_ORDER = case(
        (Issue.priority == IssuePriority.URGENT, 0),
        (Issue.priority == IssuePriority.HIGH, 1),
        (Issue.priority == IssuePriority.MEDIUM, 2),
        (Issue.priority == IssuePriority.LOW, 3),
        (Issue.priority == IssuePriority.NO_PRIORITY, 4),
        else_=5,
    )
    STATUS_ORDER = case(
        (Issue.status == IssueStatus.IN_PROGRESS, 0),
        (Issue.status == IssueStatus.IN_REVIEW, 1),
        (Issue.status == IssueStatus.TODO, 2),
        (Issue.status == IssueStatus.BACKLOG, 3),
        (Issue.status == IssueStatus.DONE, 4),
        (Issue.status == IssueStatus.CANCELED, 5),
        else_=6,
    )
    SORT_FIELDS = {
        "created": Issue.created_at,
        "updated": Issue.updated_at,
        "priority": PRIORITY_ORDER,
        "status": STATUS_ORDER,
        "title": Issue.title,
        "estimate": Issue.estimate,
    }

    def __init__(self, db: AsyncSession):
        self.db = db

    def _apply_sort(self, query, sort_by: str | None = None, order: str | None = None, default_field=None):
        """Apply sorting to a query. Returns (query, needs_shuffle).

        If sort_by is "random", returns the query unsorted and needs_shuffle=True
        so the caller can shuffle the results in Python after execution.
        default_field overrides the fallback when sort_by is None/unrecognized.
        """
        if sort_by == "random":
            return query, True
        fallback = default_field or Issue.created_at
        col = self.SORT_FIELDS.get(sort_by, fallback)
        if order == "asc":
            return query.order_by(col.asc()), False
        return query.order_by(col.desc()), False

    async def _check_sprint_limbo(self, project_id: str) -> None:
        """Check if project has a sprint in limbo and raise error if so.

        Limbo = sprint is active but with limbo=True (pending ritual attestations).
        This blocks: completing issues, claiming issues (status → in_progress).

        Raises:
            SprintInLimboError: If a sprint is in limbo
        """
        from app.services.ritual_service import RitualService

        # Check for any sprint in limbo for this project
        sprint_result = await self.db.execute(
            select(Sprint).where(
                Sprint.project_id == project_id,
                Sprint.limbo == True,
            )
        )
        limbo_sprint = sprint_result.scalar_one_or_none()
        if not limbo_sprint:
            return  # No limbo sprint

        # Get actually pending rituals (not yet approved) with name and prompt
        ritual_service = RitualService(self.db)
        pending_rituals = await ritual_service.get_pending_rituals(project_id, limbo_sprint.id)
        pending_data = [{"name": r.name, "prompt": r.prompt} for r in pending_rituals]

        raise SprintInLimboError(limbo_sprint.id, pending_data)

    async def _check_sprint_arrears(self, project_id: str) -> None:
        """Check if the current sprint is in arrears and raise error if so.

        Arrears = points_spent > budget (when budget is set).
        This blocks: completing issues, claiming issues (status → in_progress).

        Raises:
            SprintInArrearsError: If sprint is in arrears
        """
        sprint_result = await self.db.execute(
            select(Sprint).where(
                Sprint.project_id == project_id,
                Sprint.status == SprintStatus.ACTIVE,
            )
        )
        current_sprint = sprint_result.scalar_one_or_none()
        if not current_sprint:
            return  # No active sprint, no budget constraints

        # Check if in arrears (budget is set and spent > budget)
        if current_sprint.budget is not None and current_sprint.points_spent > current_sprint.budget:
            raise SprintInArrearsError(current_sprint.budget, current_sprint.points_spent)

    async def _check_ticket_rituals(
        self, issue: Issue, user_id: str, is_human_request: bool = False
    ) -> None:
        """Check if ticket has pending rituals and raise error if so.

        This blocks completing tickets (status → done) when there are
        incomplete TICKET_CLOSE rituals. Canceled tickets skip this check.

        If is_human_request is True and the project's human_rituals_required is False,
        the ritual check is skipped (humans can close tickets without completing rituals).

        For GATE mode rituals, creates a TicketLimbo record to track that someone
        is waiting for approval.

        Raises:
            TicketRitualsError: If there are pending ticket-close rituals
        """
        from app.services.ritual_service import RitualService

        # Check if humans can skip rituals for this project
        if is_human_request:
            project = await self.db.execute(
                select(Project).where(Project.id == issue.project_id)
            )
            project = project.scalar_one_or_none()
            if project and not project.human_rituals_required:
                # Humans can skip rituals for this project
                return

        ritual_service = RitualService(self.db)
        pending_rituals = await ritual_service.get_pending_ticket_rituals(
            issue.project_id, issue.id
        )

        if pending_rituals:
            # Create limbo records for GATE rituals
            for ritual in pending_rituals:
                if ritual.approval_mode == ApprovalMode.GATE:
                    await self._create_limbo_record(
                        issue.id, ritual.id, LimboType.CLOSE, user_id
                    )

            pending_info = [{"name": r.name, "prompt": r.prompt} for r in pending_rituals]
            raise TicketRitualsError(issue.identifier, pending_info)

    async def _check_claim_rituals(
        self, issue: Issue, user_id: str, is_human_request: bool = False
    ) -> None:
        """Check if ticket has pending claim rituals and raise error if so.

        This blocks claiming tickets (status → in_progress) when there are
        incomplete TICKET_CLAIM rituals.

        If is_human_request is True and the project's human_rituals_required is False,
        the ritual check is skipped (humans can claim tickets without completing rituals).

        For GATE mode rituals, creates a TicketLimbo record to track that someone
        is waiting for approval.

        Raises:
            ClaimRitualsError: If there are pending ticket-claim rituals
        """
        from app.services.ritual_service import RitualService

        # Check if humans can skip rituals for this project
        if is_human_request:
            project = await self.db.execute(
                select(Project).where(Project.id == issue.project_id)
            )
            project = project.scalar_one_or_none()
            if project and not project.human_rituals_required:
                # Humans can skip rituals for this project
                return

        ritual_service = RitualService(self.db)
        pending_rituals = await ritual_service.get_pending_claim_rituals(
            issue.project_id, issue.id
        )

        if pending_rituals:
            # Create limbo records for GATE rituals
            for ritual in pending_rituals:
                if ritual.approval_mode == ApprovalMode.GATE:
                    await self._create_limbo_record(
                        issue.id, ritual.id, LimboType.CLAIM, user_id
                    )

            pending_info = [{"name": r.name, "prompt": r.prompt} for r in pending_rituals]
            raise ClaimRitualsError(issue.identifier, pending_info)

    async def _deduct_from_sprint_budget(self, issue: Issue, user_id: str | None = None) -> None:
        """Deduct issue estimate from the current sprint's budget.

        Called when an issue is marked as DONE. Gets the current (active) sprint
        for the project and increments its points_spent by the issue's estimate.

        Also creates a BudgetTransaction record for the audit trail (CHT-401).

        If the issue has no estimate, behavior depends on project's unestimated_handling:
        - DEFAULT_ONE_POINT: treat as 1 point
        - BLOCK_UNTIL_ESTIMATED: raise an error (handled by caller for CHT-66)
        """
        # Get the project to check unestimated_handling setting
        project = await self.db.execute(
            select(Project).where(Project.id == issue.project_id)
        )
        project = project.scalar_one_or_none()
        if not project:
            return

        # Get the current (active) sprint for this project
        sprint_result = await self.db.execute(
            select(Sprint).where(
                Sprint.project_id == issue.project_id,
                Sprint.status == SprintStatus.ACTIVE,
            )
        )
        current_sprint = sprint_result.scalar_one_or_none()
        if not current_sprint:
            return  # No active sprint, nothing to deduct from

        # Calculate points to deduct
        if issue.estimate is not None:
            points = issue.estimate
        elif project.unestimated_handling == UnestimatedHandling.DEFAULT_ONE_POINT:
            points = 1
        else:
            # BLOCK_UNTIL_ESTIMATED - block completion of unestimated issues
            raise EstimateRequiredError(
                f"Issue {issue.identifier} must be estimated before it can be completed. "
                f"Project '{project.name}' requires estimates on completion."
            )

        # Create a transaction record for the audit trail (CHT-401)
        transaction = BudgetTransaction(
            sprint_id=current_sprint.id,
            issue_id=issue.id,
            user_id=user_id,
            points=points,
            issue_identifier=issue.identifier,
            issue_title=issue.title,
            sprint_name=current_sprint.name,
        )
        self.db.add(transaction)

        # Atomically increment points_spent on the current sprint
        await self.db.execute(
            update(Sprint)
            .where(Sprint.id == current_sprint.id)
            .values(points_spent=Sprint.points_spent + points)
        )

    async def _create_limbo_record(
        self, issue_id: str, ritual_id: str, limbo_type: LimboType, user_id: str
    ) -> TicketLimbo:
        """Create a limbo record for a ticket blocked by a GATE ritual.

        If a limbo record already exists for this issue/ritual/type combo and is
        not yet cleared, returns the existing one without creating a duplicate.

        Uses try/except to handle race conditions - if concurrent requests both
        try to create limbo records, one will succeed and the other will find
        the existing record.
        """
        # Try to create new limbo record first (optimistic path)
        limbo = TicketLimbo(
            issue_id=issue_id,
            ritual_id=ritual_id,
            limbo_type=limbo_type,
            requested_by_id=user_id,
        )
        self.db.add(limbo)

        try:
            await self.db.commit()
            await self.db.refresh(limbo)
            return limbo
        except IntegrityError:
            # Race condition - another request created the record first
            await self.db.rollback()
            # Re-fetch the existing record
            existing = await self.db.execute(
                select(TicketLimbo).where(
                    TicketLimbo.issue_id == issue_id,
                    TicketLimbo.ritual_id == ritual_id,
                    TicketLimbo.limbo_type == limbo_type,
                    TicketLimbo.cleared_at.is_(None),
                )
            )
            return existing.scalar_one()

    async def _get_next_issue_number_for_key(self, project_key: str) -> int:
        """Get the next issue number for a project key by querying ALL issues with that prefix.

        Since identifiers like 'WEB-1' are globally unique, we need to find the max
        across ALL issues with that key prefix, not just within one project.
        """
        # Find max number from identifiers matching this key pattern
        pattern = f"{project_key}-%"
        result = await self.db.execute(
            select(func.coalesce(func.max(Issue.number), 0))
            .where(Issue.identifier.like(pattern))
        )
        max_number = result.scalar()
        return max_number + 1

    async def create(
        self, issue_in: IssueCreate, project: Project, creator_id: str,
        is_human_request: bool = True
    ) -> Issue:
        """Create a new issue.

        When creating with status=DONE or IN_PROGRESS, enforces the same checks
        as updating to those statuses (CHT-536):
        - Sprint limbo/arrears checks
        - Ticket-close/claim rituals (for agents)
        - Budget deduction (for DONE)
        - Estimate requirement (for IN_PROGRESS, agents only)
        """
        # Ensure project is attached to session before accessing attributes
        await self.db.refresh(project)
        project_id = project.id
        project_key = project.key

        # Check constraints for non-default statuses (CHT-536)
        if issue_in.status in {IssueStatus.DONE, IssueStatus.CANCELED, IssueStatus.IN_PROGRESS}:
            await self._check_sprint_limbo(project_id)
            await self._check_sprint_arrears(project_id)

        # For IN_PROGRESS, check claim rituals and estimate requirement
        if issue_in.status == IssueStatus.IN_PROGRESS:
            # Check estimate requirement for agents
            if project.require_estimate_on_claim and not is_human_request:
                if issue_in.estimate is None:
                    raise EstimateRequiredError(
                        "Estimate is required before claiming issues in this project"
                    )

            # For new issues we can't check attestations, so we block if ANY claim rituals exist (CHT-536)
            if not is_human_request:
                from app.services.ritual_service import RitualService
                from app.models.ritual import RitualTrigger
                ritual_service = RitualService(self.db)
                rituals = await ritual_service.list_by_project(project_id)
                claim_rituals = [r for r in rituals if r.trigger == RitualTrigger.TICKET_CLAIM and r.is_active]
                if claim_rituals:
                    pending_info = [{"name": r.name, "prompt": r.prompt} for r in claim_rituals]
                    raise ClaimRitualsError("NEW", pending_info)

        # For DONE, check if any ticket-close rituals exist (CHT-536)
        # For new issues we can't check attestations, so we block if ANY such rituals exist
        if issue_in.status == IssueStatus.DONE and not is_human_request:
            from app.services.ritual_service import RitualService
            from app.models.ritual import RitualTrigger
            ritual_service = RitualService(self.db)
            rituals = await ritual_service.list_by_project(project_id)
            close_rituals = [r for r in rituals if r.trigger == RitualTrigger.TICKET_CLOSE and r.is_active]
            if close_rituals:
                pending_info = [{"name": r.name, "prompt": r.prompt} for r in close_rituals]
                raise TicketRitualsError("NEW", pending_info)

        max_retries = 5
        last_error = None

        for attempt in range(max_retries):
            try:
                # Query for the next available issue number across ALL issues with this key
                # This handles the case where multiple projects share the same key
                issue_number = await self._get_next_issue_number_for_key(project_key)
                identifier = f"{project_key}-{issue_number}"

                issue = Issue(
                    project_id=project_id,
                    identifier=identifier,
                    number=issue_number,
                    title=issue_in.title,
                    description=issue_in.description,
                    status=issue_in.status,
                    priority=issue_in.priority,
                    issue_type=issue_in.issue_type,
                    estimate=issue_in.estimate,
                    assignee_id=issue_in.assignee_id,
                    creator_id=creator_id,
                    sprint_id=issue_in.sprint_id,
                    parent_id=issue_in.parent_id,
                    due_date=issue_in.due_date,
                    # Set completed_at if creating as DONE (CHT-536)
                    completed_at=datetime.now(timezone.utc) if issue_in.status == IssueStatus.DONE else None,
                )

                # Handle labels
                if issue_in.label_ids:
                    result = await self.db.execute(
                        select(Label).where(Label.id.in_(issue_in.label_ids))
                    )
                    labels = list(result.scalars().all())
                    issue.labels = labels

                self.db.add(issue)

                # Update project issue_count to stay in sync
                project.issue_count = issue_number
                self.db.add(project)

                # Flush to populate issue.id
                await self.db.flush()

                # Log creation activity
                self.db.add(IssueActivity(
                    issue_id=issue.id,
                    user_id=creator_id,
                    activity_type=ActivityType.CREATED,
                ))

                # Deduct from sprint budget if creating as DONE (CHT-536)
                if issue_in.status == IssueStatus.DONE:
                    await self._deduct_from_sprint_budget(issue, creator_id)

                await self.db.commit()

                # Reload with labels and creator eagerly loaded
                result = await self.db.execute(
                    select(Issue)
                    .options(selectinload(Issue.labels), selectinload(Issue.creator))
                    .where(Issue.id == issue.id)
                )
                return result.scalar_one()

            except IntegrityError as e:
                # Unique constraint violation - rollback and retry with next number
                await self.db.rollback()
                last_error = e
                if attempt < max_retries - 1:
                    # Small delay to avoid tight retry loop
                    import asyncio
                    await asyncio.sleep(0.01)
                    continue
                raise

        raise last_error

    async def get_by_id(self, issue_id: str) -> Issue | None:
        """Get issue by ID."""
        result = await self.db.execute(
            select(Issue)
            .options(
                selectinload(Issue.labels),
                selectinload(Issue.creator),
                selectinload(Issue.project),
            )
            .where(Issue.id == issue_id)
        )
        return result.scalar_one_or_none()

    async def get_by_identifier(self, identifier: str) -> Issue | None:
        """Get issue by identifier (e.g., PRJ-123)."""
        result = await self.db.execute(
            select(Issue)
            .options(
                selectinload(Issue.labels),
                selectinload(Issue.creator),
                selectinload(Issue.project),
            )
            .where(Issue.identifier == identifier.upper())
        )
        return result.scalar_one_or_none()

    async def update(
        self, issue: Issue, issue_in: IssueUpdate, user_id: str | None = None, is_human_request: bool = True
    ) -> Issue:
        """Update an issue and log activity."""
        update_data = issue_in.model_dump(exclude_unset=True, exclude={"label_ids"})
        activities = []

        # Track changes for activity log
        if user_id:
            for field, new_value in update_data.items():
                old_value = getattr(issue, field)
                if old_value != new_value:
                    activity_type = ActivityType.UPDATED
                    if field == "status":
                        activity_type = ActivityType.STATUS_CHANGED
                    elif field == "priority":
                        activity_type = ActivityType.PRIORITY_CHANGED
                    elif field == "assignee_id":
                        activity_type = (
                            ActivityType.ASSIGNED if new_value else ActivityType.UNASSIGNED
                        )
                    elif field == "sprint_id":
                        activity_type = (
                            ActivityType.MOVED_TO_SPRINT
                            if new_value
                            else ActivityType.REMOVED_FROM_SPRINT
                        )

                    activity = IssueActivity(
                        issue_id=issue.id,
                        user_id=user_id,
                        activity_type=activity_type,
                        field_name=field,
                        old_value=str(old_value) if old_value else None,
                        new_value=str(new_value) if new_value else None,
                    )
                    activities.append(activity)

        # Check if status change requires limbo/arrears/ticket ritual checks
        # Block completing, canceling, or claiming issues when sprint is in limbo or arrears
        if "status" in update_data:
            new_status = update_data["status"]
            blocked_statuses = {IssueStatus.DONE, IssueStatus.CANCELED, IssueStatus.IN_PROGRESS}
            if new_status in blocked_statuses and issue.status != new_status:
                await self._check_sprint_limbo(issue.project_id)
                await self._check_sprint_arrears(issue.project_id)

            if new_status == IssueStatus.IN_PROGRESS and issue.status != IssueStatus.IN_PROGRESS:
                project = await self.db.get(Project, issue.project_id)
                # Only enforce estimate requirement for agents, not humans.
                # When is_human_request is False (indicating an agent), and require_estimate_on_claim
                # is enabled, we block claiming tickets without an estimate.
                if project and project.require_estimate_on_claim and not is_human_request:
                    estimate_value = update_data.get("estimate", issue.estimate)
                    if estimate_value is None:
                        raise EstimateRequiredError(
                            "Estimate is required before claiming issues in this project"
                        )

            # Check ticket-claim rituals when claiming a ticket (→ in_progress)
            if new_status == IssueStatus.IN_PROGRESS and issue.status != IssueStatus.IN_PROGRESS:
                await self._check_claim_rituals(issue, user_id, is_human_request)

            # Check ticket-close rituals when completing a ticket (DONE only)
            # Canceled tickets skip ritual checks (CHT-171)
            if new_status == IssueStatus.DONE and issue.status != IssueStatus.DONE:
                await self._check_ticket_rituals(issue, user_id, is_human_request)

            # Handle completion - only deduct if transitioning TO done (not already done)
            if new_status == IssueStatus.DONE and issue.status != IssueStatus.DONE:
                update_data["completed_at"] = datetime.now(timezone.utc)
                # Deduct from current sprint's budget and record transaction (CHT-65, CHT-401)
                await self._deduct_from_sprint_budget(issue, user_id)
            elif issue.status == IssueStatus.DONE and new_status != IssueStatus.DONE:
                update_data["completed_at"] = None

        for field, value in update_data.items():
            setattr(issue, field, value)

        # Handle labels
        if issue_in.label_ids is not None:
            result = await self.db.execute(
                select(Label).where(Label.id.in_(issue_in.label_ids))
            )
            labels = list(result.scalars().all())
            issue.labels = labels

        # Add activity records
        for activity in activities:
            self.db.add(activity)

        await self.db.commit()

        # Reload with labels and creator eagerly loaded
        result = await self.db.execute(
            select(Issue)
            .options(selectinload(Issue.labels), selectinload(Issue.creator))
            .where(Issue.id == issue.id)
        )
        return result.scalar_one()

    async def list_activities(
        self, issue_id: str, skip: int = 0, limit: int = 50
    ) -> list[IssueActivity]:
        """List activities for an issue."""
        result = await self.db.execute(
            select(IssueActivity)
            .options(selectinload(IssueActivity.user))
            .where(IssueActivity.issue_id == issue_id)
            .order_by(IssueActivity.created_at.desc())
            .offset(skip)
            .limit(limit)
        )
        return list(result.scalars().all())

    async def list_team_activities(
        self, team_id: str, skip: int = 0, limit: int = 50
    ) -> list[IssueActivity]:
        """List recent activities for a team."""
        result = await self.db.execute(
            select(IssueActivity)
            .join(Issue)
            .join(Project, Issue.project_id == Project.id)
            .options(selectinload(IssueActivity.issue), selectinload(IssueActivity.user))
            .where(Project.team_id == team_id)
            .order_by(IssueActivity.created_at.desc())
            .offset(skip)
            .limit(limit)
        )
        return list(result.scalars().all())

    async def delete(self, issue: Issue) -> None:
        """Delete an issue."""
        await self.db.delete(issue)
        await self.db.commit()

    async def list_issues(
        self,
        project_id: str | None = None,
        team_id: str | None = None,
        skip: int = 0,
        limit: int = 100,
        statuses: list[IssueStatus] | None = None,
        priorities: list[IssuePriority] | None = None,
        issue_type: IssueType | None = None,
        sprint_id: str | None = None,
        parent_id: str | None = None,
        assignee_id: str | None = None,
        search: str | None = None,
        sort_by: str | None = None,
        order: str | None = None,
        label_names: list[str] | None = None,
    ) -> list[Issue]:
        """Unified issue listing with all filter options.

        Consolidates list_by_project and list_by_team into a single method
        to ensure all filters are consistently available regardless of
        whether filtering by project or team.

        Args:
            project_id: Filter to a specific project
            team_id: Filter to all projects in a team (requires join)
            statuses: Filter by issue status(es)
            priorities: Filter by priority(ies)
            issue_type: Filter by issue type
            sprint_id: Filter by sprint ("no_sprint" for unassigned)
            parent_id: Filter by parent issue (for sub-issues)
            assignee_id: Filter by assignee ("unassigned" for no assignee)
            search: Search in title, description, identifier
            sort_by: Sort field (created, updated, priority, status, title, random)
            order: Sort order (asc, desc)
            label_names: Filter by label name(s) - issues must have ALL specified labels

        Raises:
            ValueError: If neither project_id nor team_id is provided (defense-in-depth)
        """
        # Defense-in-depth: require scope even though API layer also validates
        if not project_id and not team_id:
            raise ValueError("Must provide either project_id or team_id")

        query = (
            select(Issue)
            .options(selectinload(Issue.labels), selectinload(Issue.creator))
        )

        # Scope by project or team
        if project_id:
            query = query.where(Issue.project_id == project_id)
        else:  # team_id is guaranteed by validation above
            query = query.join(Project, Issue.project_id == Project.id).where(
                Project.team_id == team_id
            )

        # Apply filters - all available regardless of project/team scope
        if statuses:
            query = query.where(Issue.status.in_(statuses))
        if priorities:
            query = query.where(Issue.priority.in_(priorities))
        if issue_type:
            query = query.where(Issue.issue_type == issue_type)
        if sprint_id:
            if sprint_id == "no_sprint":
                query = query.where(Issue.sprint_id.is_(None))
            else:
                query = query.where(Issue.sprint_id == sprint_id)
        if parent_id:
            query = query.where(Issue.parent_id == parent_id)
        if assignee_id:
            if assignee_id == "unassigned":
                query = query.where(Issue.assignee_id.is_(None))
            else:
                query = query.where(Issue.assignee_id == assignee_id)
        if search:
            search_pattern = f"%{search}%"
            query = query.where(
                (Issue.title.ilike(search_pattern)) |
                (Issue.description.ilike(search_pattern)) |
                (Issue.identifier.ilike(search_pattern))
            )
        if label_names:
            # Filter by labels - issues must have ALL specified labels (AND logic)
            # Use subquery for each label to ensure all are present
            for label_name in label_names:
                label_subquery = (
                    select(issue_labels.c.issue_id)
                    .join(Label, issue_labels.c.label_id == Label.id)
                    .where(func.lower(Label.name) == label_name.lower())
                )
                query = query.where(Issue.id.in_(label_subquery))

        # Default sort: updated_at for team queries (matches old behavior), created_at otherwise
        default_field = Issue.updated_at if team_id else None
        query, needs_shuffle = self._apply_sort(query, sort_by, order, default_field=default_field)
        query = query.offset(skip).limit(limit)

        result = await self.db.execute(query)
        issues = list(result.scalars().all())
        if needs_shuffle:
            random.shuffle(issues)
        return issues

    async def list_by_project(
        self,
        project_id: str,
        skip: int = 0,
        limit: int = 100,
        statuses: list[IssueStatus] | None = None,
        priorities: list[IssuePriority] | None = None,
        issue_type: IssueType | None = None,
        sprint_id: str | None = None,
        parent_id: str | None = None,
        assignee_id: str | None = None,
        search: str | None = None,
        sort_by: str | None = None,
        order: str | None = None,
    ) -> list[Issue]:
        """List issues for a project. DEPRECATED: Use list_issues() instead."""
        return await self.list_issues(
            project_id=project_id,
            skip=skip,
            limit=limit,
            statuses=statuses,
            priorities=priorities,
            issue_type=issue_type,
            sprint_id=sprint_id,
            parent_id=parent_id,
            assignee_id=assignee_id,
            search=search,
            sort_by=sort_by,
            order=order,
        )

    async def list_by_sprint(
        self, sprint_id: str, skip: int = 0, limit: int = 100,
        issue_type: IssueType | None = None,
        sort_by: str | None = None, order: str | None = None,
    ) -> list[Issue]:
        """List issues for a sprint."""
        query = (
            select(Issue)
            .options(selectinload(Issue.labels), selectinload(Issue.creator))
            .where(Issue.sprint_id == sprint_id)
        )
        if issue_type:
            query = query.where(Issue.issue_type == issue_type)
        query, needs_shuffle = self._apply_sort(query, sort_by, order)
        query = query.offset(skip).limit(limit)
        result = await self.db.execute(query)
        issues = list(result.scalars().all())
        if needs_shuffle:
            random.shuffle(issues)
        return issues

    async def list_by_assignee(
        self, user_id: str, skip: int = 0, limit: int = 100,
        statuses: list[IssueStatus] | None = None,
        priorities: list[IssuePriority] | None = None,
        issue_type: IssueType | None = None,
        team_ids: list[str] | None = None,
        sort_by: str | None = None, order: str | None = None,
    ) -> list[Issue]:
        """List issues assigned to a user, optionally scoped to specific teams."""
        from app.models.project import Project

        query = (
            select(Issue)
            .options(selectinload(Issue.labels), selectinload(Issue.creator))
            .where(Issue.assignee_id == user_id)
        )
        if team_ids:
            query = query.join(Project, Issue.project_id == Project.id).where(
                Project.team_id.in_(team_ids)
            )
        if statuses:
            query = query.where(Issue.status.in_(statuses))
        if priorities:
            query = query.where(Issue.priority.in_(priorities))
        if issue_type:
            query = query.where(Issue.issue_type == issue_type)
        query, needs_shuffle = self._apply_sort(query, sort_by, order)
        query = query.offset(skip).limit(limit)
        result = await self.db.execute(query)
        issues = list(result.scalars().all())
        if needs_shuffle:
            random.shuffle(issues)
        return issues

    async def list_by_team(
        self,
        team_id: str,
        skip: int = 0,
        limit: int = 100,
        statuses: list[IssueStatus] | None = None,
        priorities: list[IssuePriority] | None = None,
        issue_type: IssueType | None = None,
        assignee_id: str | None = None,
        sprint_id: str | None = None,
        search: str | None = None,
        sort_by: str | None = None,
        order: str | None = None,
    ) -> list[Issue]:
        """List all issues for a team. DEPRECATED: Use list_issues() instead."""
        return await self.list_issues(
            team_id=team_id,
            skip=skip,
            limit=limit,
            statuses=statuses,
            priorities=priorities,
            issue_type=issue_type,
            assignee_id=assignee_id,
            sprint_id=sprint_id,
            search=search,
            sort_by=sort_by,
            order=order,
        )

    async def search(
        self,
        team_id: str,
        query: str,
        skip: int = 0,
        limit: int = 50,
        project_id: str | None = None,
    ) -> list[Issue]:
        """Search issues by title, description, or identifier.

        If project_id is provided, only search within that project.
        Otherwise, search across all projects in the team.
        """
        from app.models.project import Project

        search_pattern = f"%{query}%"
        base_query = (
            select(Issue)
            .options(selectinload(Issue.labels), selectinload(Issue.creator))
            .join(Project, Issue.project_id == Project.id)
            .where(Project.team_id == team_id)
            .where(
                (Issue.title.ilike(search_pattern)) |
                (Issue.description.ilike(search_pattern)) |
                (Issue.identifier.ilike(search_pattern))
            )
        )

        # Filter by project if specified
        if project_id:
            base_query = base_query.where(Issue.project_id == project_id)

        result = await self.db.execute(
            base_query
            .order_by(Issue.updated_at.desc())
            .offset(skip)
            .limit(limit)
        )
        return list(result.scalars().all())

    # Comment operations
    async def create_comment(
        self, issue_id: str, comment_in: IssueCommentCreate, author_id: str
    ) -> IssueComment:
        """Create a comment on an issue."""
        comment = IssueComment(
            issue_id=issue_id,
            author_id=author_id,
            content=comment_in.content,
        )
        self.db.add(comment)
        self.db.add(IssueActivity(
            issue_id=issue_id,
            user_id=author_id,
            activity_type=ActivityType.COMMENTED,
            field_name="comment",
            new_value=comment_in.content,
        ))
        await self.db.commit()
        await self.db.refresh(comment)
        return comment

    async def get_comment_by_id(self, comment_id: str) -> IssueComment | None:
        """Get comment by ID."""
        result = await self.db.execute(
            select(IssueComment).where(IssueComment.id == comment_id)
        )
        return result.scalar_one_or_none()

    async def update_comment(
        self, comment: IssueComment, comment_in: IssueCommentUpdate
    ) -> IssueComment:
        """Update a comment."""
        comment.content = comment_in.content
        await self.db.commit()
        await self.db.refresh(comment)
        return comment

    async def delete_comment(self, comment: IssueComment) -> None:
        """Delete a comment."""
        await self.db.delete(comment)
        await self.db.commit()

    async def list_comments(
        self, issue_id: str, skip: int = 0, limit: int = 100
    ) -> list[IssueComment]:
        """List comments for an issue."""
        result = await self.db.execute(
            select(IssueComment)
            .options(selectinload(IssueComment.author))
            .where(IssueComment.issue_id == issue_id)
            .order_by(IssueComment.created_at.asc())
            .offset(skip)
            .limit(limit)
        )
        return list(result.scalars().all())

    async def list_sub_issues(
        self, parent_id: str, skip: int = 0, limit: int = 100
    ) -> list[Issue]:
        """List sub-issues for an issue."""
        result = await self.db.execute(
            select(Issue)
            .options(selectinload(Issue.labels), selectinload(Issue.creator))
            .where(Issue.parent_id == parent_id)
            .order_by(Issue.created_at.asc())
            .offset(skip)
            .limit(limit)
        )
        return list(result.scalars().all())

    # Label operations
    async def create_label(self, label_in: LabelCreate, team_id: str) -> Label:
        """Create a label."""
        label = Label(
            team_id=team_id,
            name=label_in.name,
            color=label_in.color,
            description=label_in.description,
        )
        self.db.add(label)
        await self.db.commit()
        await self.db.refresh(label)
        return label

    async def get_label_by_id(self, label_id: str) -> Label | None:
        """Get label by ID."""
        result = await self.db.execute(select(Label).where(Label.id == label_id))
        return result.scalar_one_or_none()

    async def update_label(self, label: Label, label_in: LabelUpdate) -> Label:
        """Update a label."""
        update_data = label_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(label, field, value)
        await self.db.commit()
        await self.db.refresh(label)
        return label

    async def delete_label(self, label: Label) -> None:
        """Delete a label."""
        await self.db.delete(label)
        await self.db.commit()

    async def list_labels(
        self, team_id: str, skip: int = 0, limit: int = 100
    ) -> list[Label]:
        """List labels for a team."""
        result = await self.db.execute(
            select(Label)
            .where(Label.team_id == team_id)
            .order_by(Label.name)
            .offset(skip)
            .limit(limit)
        )
        return list(result.scalars().all())

    # Issue Relations
    async def create_relation(
        self, issue_id: str, relation_in: IssueRelationCreate
    ) -> IssueRelation:
        """Create a relationship between two issues."""
        relation = IssueRelation(
            issue_id=issue_id,
            related_issue_id=relation_in.related_issue_id,
            relation_type=relation_in.relation_type,
        )
        self.db.add(relation)
        await self.db.commit()
        await self.db.refresh(relation)
        return relation

    async def get_relation_by_id(self, relation_id: str) -> IssueRelation | None:
        """Get relation by ID."""
        result = await self.db.execute(
            select(IssueRelation).where(IssueRelation.id == relation_id)
        )
        return result.scalar_one_or_none()

    async def delete_relation(self, relation: IssueRelation) -> None:
        """Delete a relation."""
        await self.db.delete(relation)
        await self.db.commit()

    async def list_relations(self, issue_id: str) -> list[dict]:
        """List all relations for an issue (both outgoing and incoming).

        Returns a list with relation info and the related issue details.
        """
        # Get outgoing relations (this issue blocks/relates to other issues)
        outgoing_result = await self.db.execute(
            select(IssueRelation, Issue)
            .join(Issue, IssueRelation.related_issue_id == Issue.id)
            .where(IssueRelation.issue_id == issue_id)
        )
        outgoing = outgoing_result.all()

        # Get incoming relations (other issues block/relate to this issue)
        incoming_result = await self.db.execute(
            select(IssueRelation, Issue)
            .join(Issue, IssueRelation.issue_id == Issue.id)
            .where(IssueRelation.related_issue_id == issue_id)
        )
        incoming = incoming_result.all()

        relations = []

        # Process outgoing relations
        for relation, related_issue in outgoing:
            relations.append({
                "id": relation.id,
                "issue_id": relation.issue_id,
                "related_issue_id": relation.related_issue_id,
                "relation_type": relation.relation_type.value,
                "direction": "outgoing",
                "created_at": relation.created_at,
                "related_issue_identifier": related_issue.identifier,
                "related_issue_title": related_issue.title,
                "related_issue_status": related_issue.status.value,
            })

        # Process incoming relations (reverse the relation type for display)
        for relation, source_issue in incoming:
            display_type = relation.relation_type.value
            if relation.relation_type == IssueRelationType.BLOCKS:
                display_type = "blocked_by"

            relations.append({
                "id": relation.id,
                "issue_id": relation.related_issue_id,  # This is the current issue
                "related_issue_id": relation.issue_id,  # The blocking/source issue
                "relation_type": display_type,
                "direction": "incoming",
                "created_at": relation.created_at,
                "related_issue_identifier": source_issue.identifier,
                "related_issue_title": source_issue.title,
                "related_issue_status": source_issue.status.value,
            })

        return relations

    async def add_label_to_issue(self, issue: Issue, label: Label) -> Issue:
        """Add a label to an issue without replacing existing labels."""
        # Refresh issue with labels eagerly loaded
        result = await self.db.execute(
            select(Issue)
            .options(selectinload(Issue.labels), selectinload(Issue.creator))
            .where(Issue.id == issue.id)
        )
        issue = result.scalar_one()
        if label not in issue.labels:
            issue.labels.append(label)
            await self.db.commit()
        # Reload for clean state
        result = await self.db.execute(
            select(Issue)
            .options(selectinload(Issue.labels), selectinload(Issue.creator))
            .where(Issue.id == issue.id)
        )
        return result.scalar_one()

    async def remove_label_from_issue(self, issue: Issue, label: Label) -> Issue:
        """Remove a label from an issue."""
        result = await self.db.execute(
            select(Issue)
            .options(selectinload(Issue.labels), selectinload(Issue.creator))
            .where(Issue.id == issue.id)
        )
        issue = result.scalar_one()
        if label in issue.labels:
            issue.labels.remove(label)
            await self.db.commit()
        result = await self.db.execute(
            select(Issue)
            .options(selectinload(Issue.labels), selectinload(Issue.creator))
            .where(Issue.id == issue.id)
        )
        return result.scalar_one()

    async def batch_update(
        self, issues: list[Issue], update_data: dict,
        label_ids: list[str] | None = None, add_label_ids: list[str] | None = None,
        team_id: str | None = None, user_id: str | None = None,
    ) -> list[Issue]:
        """Batch update multiple issues with safe fields only.

        Does NOT support status changes (which require sprint/ritual checks).
        Use the single-issue update() for status transitions.

        Args:
            issues: Pre-fetched Issue objects (with labels/creator loaded)
            update_data: Dict of safe field updates (priority, estimate)
            label_ids: Replace all labels on matched issues
            add_label_ids: Add labels without removing existing
            team_id: Team ID for cross-team label validation
            user_id: User performing the update (for activity logging)
        """
        issue_ids = [iss.id for iss in issues]

        # Fetch and validate labels if needed
        labels_to_add = []
        if add_label_ids:
            result = await self.db.execute(
                select(Label).where(Label.id.in_(add_label_ids))
            )
            labels_to_add = list(result.scalars().all())
            if len(labels_to_add) != len(add_label_ids):
                found = {l.id for l in labels_to_add}
                missing = set(add_label_ids) - found
                raise ValueError(f"Labels not found: {missing}")
            if team_id:
                for label in labels_to_add:
                    if label.team_id != team_id:
                        raise ValueError(f"Label {label.id} does not belong to this team")

        replace_labels = []
        if label_ids is not None:
            result = await self.db.execute(
                select(Label).where(Label.id.in_(label_ids))
            )
            replace_labels = list(result.scalars().all())
            if len(replace_labels) != len(label_ids):
                found = {l.id for l in replace_labels}
                missing = set(label_ids) - found
                raise ValueError(f"Labels not found: {missing}")
            if team_id:
                for label in replace_labels:
                    if label.team_id != team_id:
                        raise ValueError(f"Label {label.id} does not belong to this team")

        activities = []
        for issue in issues:
            # Log activity for field changes
            if user_id:
                for field, new_value in update_data.items():
                    old_value = getattr(issue, field)
                    if old_value != new_value:
                        activity_type = ActivityType.UPDATED
                        if field == "priority":
                            activity_type = ActivityType.PRIORITY_CHANGED
                        activities.append(IssueActivity(
                            issue_id=issue.id,
                            user_id=user_id,
                            activity_type=activity_type,
                            field_name=field,
                            old_value=str(old_value) if old_value else None,
                            new_value=str(new_value) if new_value else None,
                        ))

            # Apply field updates (safe fields only)
            for field, value in update_data.items():
                setattr(issue, field, value)
            # Replace labels if specified
            if label_ids is not None:
                issue.labels = replace_labels
            # Add labels if specified
            if labels_to_add:
                for label in labels_to_add:
                    if label not in issue.labels:
                        issue.labels.append(label)

        for activity in activities:
            self.db.add(activity)

        await self.db.commit()

        # Reload all issues
        result = await self.db.execute(
            select(Issue)
            .options(selectinload(Issue.labels), selectinload(Issue.creator))
            .where(Issue.id.in_(issue_ids))
        )
        return list(result.scalars().all())
