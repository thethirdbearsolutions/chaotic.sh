"""Ritual service for managing rituals and attestations."""
import json
import logging
import random
from datetime import datetime, timezone
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

logger = logging.getLogger(__name__)
from app.models.ritual import (
    Ritual,
    RitualAttestation,
    RitualGroup,
    ApprovalMode,
    RitualTrigger,
    SelectionMode,
)
from app.models.sprint import Sprint, SprintStatus
from app.models.issue import Issue, IssueStatus, IssueActivity, ActivityType
from app.models.ticket_limbo import TicketLimbo, LimboType
from app.schemas.ritual import RitualCreate, RitualUpdate, RitualGroupCreate, RitualGroupUpdate


class RitualService:
    """Service for ritual operations."""

    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, ritual_in: RitualCreate, project_id: str) -> Ritual:
        """Create a new ritual for a project.

        Raises:
            ValueError: If a ritual with this name already exists in the project,
                       or if group validation fails.
        """
        # Check for duplicate name
        existing = await self.get_by_name(project_id, ritual_in.name)
        if existing:
            raise ValueError(f"A ritual named '{ritual_in.name}' already exists in this project")

        # Validate group membership
        if ritual_in.group_id:
            group = await self.get_group_by_id(ritual_in.group_id)
            if not group:
                raise ValueError(f"Ritual group '{ritual_in.group_id}' not found")
            if group.project_id != project_id:
                raise ValueError("Ritual group belongs to a different project")

            # Validate based on selection mode
            if group.selection_mode == SelectionMode.PERCENTAGE:
                if ritual_in.percentage is None or ritual_in.percentage <= 0:
                    raise ValueError(
                        f"Rituals in a PERCENTAGE group must have percentage > 0. "
                        f"Got: {ritual_in.percentage}"
                    )
            elif group.selection_mode in (SelectionMode.RANDOM_ONE, SelectionMode.ROUND_ROBIN):
                if ritual_in.weight <= 0:
                    raise ValueError(
                        f"Rituals in a {group.selection_mode.value} group must have weight > 0. "
                        f"Got: {ritual_in.weight}"
                    )

        # Serialize conditions to JSON if provided
        conditions_json = None
        if ritual_in.conditions is not None:
            conditions_json = json.dumps(ritual_in.conditions)

        ritual = Ritual(
            project_id=project_id,
            name=ritual_in.name,
            prompt=ritual_in.prompt,
            trigger=ritual_in.trigger,
            approval_mode=ritual_in.approval_mode,
            note_required=ritual_in.note_required,
            conditions=conditions_json,
            group_id=ritual_in.group_id,
            weight=ritual_in.weight,
            percentage=ritual_in.percentage,
        )
        self.db.add(ritual)
        await self.db.commit()
        await self.db.refresh(ritual)
        return ritual

    async def get_by_id(self, ritual_id: str, include_inactive: bool = False) -> Ritual | None:
        """Get ritual by ID."""
        query = (
            select(Ritual)
            .options(selectinload(Ritual.group))
            .where(Ritual.id == ritual_id)
        )
        if not include_inactive:
            query = query.where(Ritual.is_active.is_(True))
        result = await self.db.execute(query)
        return result.scalar_one_or_none()

    async def get_by_name(self, project_id: str, name: str, include_inactive: bool = False) -> Ritual | None:
        """Get ritual by name within a project."""
        query = (
            select(Ritual)
            .options(selectinload(Ritual.group))
            .where(Ritual.project_id == project_id, Ritual.name == name)
        )
        if not include_inactive:
            query = query.where(Ritual.is_active.is_(True))
        result = await self.db.execute(query)
        return result.scalar_one_or_none()

    async def update(self, ritual: Ritual, ritual_in: RitualUpdate) -> Ritual:
        """Update a ritual.

        Raises:
            ValueError: If renaming to a name that already exists in the project,
                       or if group validation fails.
        """
        update_data = ritual_in.model_dump(exclude_unset=True)

        # Check for duplicate name if renaming
        if "name" in update_data and update_data["name"] != ritual.name:
            existing = await self.get_by_name(ritual.project_id, update_data["name"])
            if existing:
                raise ValueError(f"A ritual named '{update_data['name']}' already exists in this project")

        # Handle group_id="" as "remove from group"
        if "group_id" in update_data and update_data["group_id"] == "":
            update_data["group_id"] = None

        # Validate group membership
        new_group_id = update_data.get("group_id", ritual.group_id)
        if new_group_id:
            group = await self.get_group_by_id(new_group_id)
            if not group:
                raise ValueError(f"Ritual group '{new_group_id}' not found")
            if group.project_id != ritual.project_id:
                raise ValueError("Ritual group belongs to a different project")

            # Get effective weight/percentage after update
            new_weight = update_data.get("weight", ritual.weight)
            new_percentage = update_data.get("percentage", ritual.percentage)

            # Validate based on selection mode
            if group.selection_mode == SelectionMode.PERCENTAGE:
                if new_percentage is None or new_percentage <= 0:
                    raise ValueError(
                        f"Rituals in a PERCENTAGE group must have percentage > 0. "
                        f"Got: {new_percentage}"
                    )
            elif group.selection_mode in (SelectionMode.RANDOM_ONE, SelectionMode.ROUND_ROBIN):
                if new_weight <= 0:
                    raise ValueError(
                        f"Rituals in a {group.selection_mode.value} group must have weight > 0. "
                        f"Got: {new_weight}"
                    )

        # Serialize conditions to JSON if provided
        if "conditions" in update_data:
            if update_data["conditions"] is not None:
                update_data["conditions"] = json.dumps(update_data["conditions"])

        for field, value in update_data.items():
            setattr(ritual, field, value)
        await self.db.commit()
        await self.db.refresh(ritual)
        return ritual

    async def delete(self, ritual: Ritual) -> None:
        """Soft-delete a ritual by marking it inactive.

        This preserves attestation history while hiding the ritual from active lists.
        """
        ritual.is_active = False
        await self.db.commit()

    async def list_by_project(self, project_id: str, include_inactive: bool = False) -> list[Ritual]:
        """List all rituals for a project."""
        query = (
            select(Ritual)
            .options(selectinload(Ritual.group))
            .where(Ritual.project_id == project_id)
        )
        if not include_inactive:
            query = query.where(Ritual.is_active.is_(True))
        query = query.order_by(Ritual.created_at)
        result = await self.db.execute(query)
        return list(result.scalars().all())

    # =========================================================================
    # Ritual Group CRUD
    # =========================================================================

    async def create_group(self, group_in: RitualGroupCreate, project_id: str) -> RitualGroup:
        """Create a new ritual group.

        Raises:
            ValueError: If a group with this name already exists in the project.
        """
        # Check for duplicate name
        existing = await self.get_group_by_name(project_id, group_in.name)
        if existing:
            raise ValueError(f"A ritual group named '{group_in.name}' already exists in this project")

        group = RitualGroup(
            project_id=project_id,
            name=group_in.name,
            selection_mode=group_in.selection_mode,
        )
        self.db.add(group)
        await self.db.commit()
        await self.db.refresh(group)
        return group

    async def get_group_by_id(self, group_id: str) -> RitualGroup | None:
        """Get ritual group by ID."""
        result = await self.db.execute(
            select(RitualGroup)
            .options(selectinload(RitualGroup.rituals))
            .where(RitualGroup.id == group_id)
        )
        return result.scalar_one_or_none()

    async def get_group_by_name(self, project_id: str, name: str) -> RitualGroup | None:
        """Get ritual group by name within a project."""
        result = await self.db.execute(
            select(RitualGroup)
            .options(selectinload(RitualGroup.rituals))
            .where(RitualGroup.project_id == project_id, RitualGroup.name == name)
        )
        return result.scalar_one_or_none()

    async def list_groups_by_project(self, project_id: str) -> list[RitualGroup]:
        """List all ritual groups for a project."""
        result = await self.db.execute(
            select(RitualGroup)
            .options(selectinload(RitualGroup.rituals))
            .where(RitualGroup.project_id == project_id)
            .order_by(RitualGroup.created_at)
        )
        return list(result.scalars().all())

    async def update_group(self, group: RitualGroup, group_in: RitualGroupUpdate) -> RitualGroup:
        """Update a ritual group."""
        update_data = group_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(group, field, value)
        await self.db.commit()
        await self.db.refresh(group)
        return group

    async def delete_group(self, group: RitualGroup) -> None:
        """Delete a ritual group.

        Rituals in the group will have their group_id set to NULL (ON DELETE SET NULL).
        """
        await self.db.delete(group)
        await self.db.commit()

    # =========================================================================
    # Group Selection Logic
    # =========================================================================

    async def _apply_group_selection(
        self, rituals: list[Ritual], sprint_id: str | None = None,
        advance_round_robin: bool = False
    ) -> list[Ritual]:
        """Apply group selection logic to filter rituals.

        For rituals in groups, applies the group's selection_mode:
        - RANDOM_ONE: Pick one ritual randomly (weighted by weight field)
        - ROUND_ROBIN: Rotate through rituals per sprint
        - PERCENTAGE: Each ritual has independent X% chance

        Rituals not in a group are always included.

        Args:
            rituals: List of rituals to filter
            sprint_id: Sprint ID for deterministic selection
            advance_round_robin: If True, advances round-robin state (use for enter_limbo)
        """
        if not rituals:
            return []

        # Separate ungrouped rituals (always included) from grouped ones
        ungrouped = [r for r in rituals if r.group_id is None]
        grouped = [r for r in rituals if r.group_id is not None]

        if not grouped:
            return ungrouped

        # Group rituals by their group_id
        groups: dict[str, list[Ritual]] = {}
        for ritual in grouped:
            if ritual.group_id not in groups:
                groups[ritual.group_id] = []
            groups[ritual.group_id].append(ritual)

        # Apply selection logic to each group
        selected_from_groups = []
        for group_id, group_rituals in groups.items():
            group = await self.get_group_by_id(group_id)
            if not group:
                # Group was deleted, include all rituals from it
                selected_from_groups.extend(group_rituals)
                continue

            # Filter to only active rituals with valid weight/percentage
            active_rituals = [r for r in group_rituals if r.is_active]
            if not active_rituals:
                continue

            if group.selection_mode == SelectionMode.RANDOM_ONE:
                # Use sprint_id as seed for deterministic selection per sprint
                selected = self._select_random_one(active_rituals, seed=sprint_id)
                if selected:
                    selected_from_groups.append(selected)

            elif group.selection_mode == SelectionMode.ROUND_ROBIN:
                selected = await self._select_round_robin(
                    group, active_rituals, sprint_id, advance=advance_round_robin
                )
                if selected:
                    selected_from_groups.append(selected)

            elif group.selection_mode == SelectionMode.PERCENTAGE:
                selected = self._select_by_percentage(active_rituals, seed=sprint_id)
                selected_from_groups.extend(selected)

        return ungrouped + selected_from_groups

    def _select_random_one(self, rituals: list[Ritual], seed: str | None = None) -> Ritual | None:
        """Select one ritual randomly, weighted by weight field.

        If seed is provided (e.g., sprint_id), selection is deterministic.
        """
        if not rituals:
            return None

        weights = [r.weight for r in rituals]
        total_weight = sum(weights)
        if total_weight <= 0:
            return None

        # Use seed for deterministic selection per sprint
        if seed:
            rng = random.Random(seed)
            selected = rng.choices(rituals, weights=weights, k=1)
        else:
            selected = random.choices(rituals, weights=weights, k=1)
        return selected[0] if selected else None

    async def _select_round_robin(
        self, group: RitualGroup, rituals: list[Ritual], sprint_id: str | None,
        advance: bool = False
    ) -> Ritual | None:
        """Select next ritual in round-robin order.

        Args:
            group: The ritual group
            rituals: List of rituals in the group
            sprint_id: Sprint ID (for context)
            advance: If True, updates group.last_selected_ritual_id and commits

        Updates group.last_selected_ritual_id only when advance=True.
        """
        if not rituals:
            return None

        # Sort rituals by created_at for consistent ordering
        sorted_rituals = sorted(rituals, key=lambda r: r.created_at)

        # Find current position
        current_index = 0
        if group.last_selected_ritual_id:
            for i, r in enumerate(sorted_rituals):
                if r.id == group.last_selected_ritual_id:
                    current_index = (i + 1) % len(sorted_rituals)
                    break

        selected = sorted_rituals[current_index]

        # Only update state if advance=True (e.g., during enter_limbo)
        if advance and group.last_selected_ritual_id != selected.id:
            group.last_selected_ritual_id = selected.id
            await self.db.commit()

        return selected

    def _select_by_percentage(
        self, rituals: list[Ritual], seed: str | None = None
    ) -> list[Ritual]:
        """Select rituals based on their percentage chance.

        If seed is provided (e.g., sprint_id), selection is deterministic.
        Each ritual gets its own seed derived from the base seed + ritual ID
        to ensure independent but reproducible selection.
        """
        selected = []
        for ritual in rituals:
            if ritual.percentage is not None and ritual.percentage > 0:
                # Use deterministic random if seed provided
                if seed:
                    # Combine seed with ritual ID for independent selection per ritual
                    ritual_seed = f"{seed}:{ritual.id}"
                    rng = random.Random(ritual_seed)
                    if rng.random() * 100 < ritual.percentage:
                        selected.append(ritual)
                else:
                    if random.random() * 100 < ritual.percentage:
                        selected.append(ritual)
        return selected

    def _is_ritual_pending(self, ritual: Ritual, attestation: RitualAttestation | None) -> bool:
        """Check if a ritual is still pending based on its attestation state.

        A ritual is pending if:
        - No attestation exists, OR
        - Approval mode is REVIEW and not yet approved, OR
        - Approval mode is GATE and not yet completed (approved)
        """
        if attestation is None:
            return True
        if ritual.approval_mode == ApprovalMode.REVIEW and attestation.approved_at is None:
            return True
        if ritual.approval_mode == ApprovalMode.GATE and attestation.approved_at is None:
            return True
        return False

    async def get_pending_rituals(
        self, project_id: str, sprint_id: str
    ) -> list[Ritual]:
        """Get EVERY_SPRINT rituals that haven't been completed for a sprint.

        A ritual is pending if:
        1. No attestation exists, OR
        2. Attestation exists but approval_mode is REVIEW and not approved, OR
        3. Attestation exists but approval_mode is GATE (agent can't attest)

        Only considers EVERY_SPRINT trigger rituals.
        Applies group selection logic (random, round-robin, percentage) for grouped rituals.
        """
        # Get all rituals for the project
        rituals = await self.list_by_project(project_id)

        # Filter to only EVERY_SPRINT rituals
        sprint_rituals = [r for r in rituals if r.trigger == RitualTrigger.EVERY_SPRINT]

        # Apply group selection logic to determine which rituals are active for this sprint
        selected_rituals = await self._apply_group_selection(sprint_rituals, sprint_id)

        pending = []
        for ritual in selected_rituals:
            attestation = await self.get_attestation(ritual.id, sprint_id)
            if self._is_ritual_pending(ritual, attestation):
                pending.append(ritual)

        return pending

    # Supported condition fields and operators for validation
    CONDITION_FIELDS = {"estimate", "priority", "issue_type", "status", "labels"}
    CONDITION_OPERATORS = {"eq", "in", "gte", "lte", "contains", "isnull"}

    def _evaluate_conditions(self, ritual: Ritual, issue: Issue) -> bool:
        """Evaluate ritual conditions against an issue.

        Conditions use Django-style field lookups:
        - estimate__gte: 3  (estimate >= 3)
        - estimate__lte: 5  (estimate <= 5)
        - estimate__eq: 3   (estimate == 3)
        - priority__in: ["urgent", "high"]
        - priority__eq: "high"
        - issue_type__in: ["feature", "bug"]
        - issue_type__eq: "feature"
        - labels__contains: "needs-review"
        - status__in: ["in_progress", "in_review"]

        Returns True if all conditions match (AND logic), or if no conditions.
        Returns False (fail-closed) if conditions are malformed or unknown.
        """
        if not ritual.conditions:
            return True  # No conditions = always applies

        try:
            conditions = json.loads(ritual.conditions)
        except json.JSONDecodeError:
            # Fail-closed: malformed JSON means ritual doesn't apply
            return False

        if not conditions:
            return True

        # Get label names for labels__contains
        label_names = [label.name for label in (issue.labels or [])]

        for key, expected_value in conditions.items():
            # Parse field and operator
            parts = key.split("__")
            if len(parts) != 2:
                # Fail-closed: invalid format
                return False

            field, operator = parts

            # Fail-closed: unknown field
            if field not in self.CONDITION_FIELDS:
                return False

            # Fail-closed: unknown operator
            if operator not in self.CONDITION_OPERATORS:
                return False

            # Get actual value from issue
            if field == "estimate":
                actual_value = issue.estimate
            elif field == "priority":
                actual_value = issue.priority.value if issue.priority else None
            elif field == "issue_type":
                actual_value = issue.issue_type.value if issue.issue_type else None
            elif field == "status":
                actual_value = issue.status.value if issue.status else None
            elif field == "labels":
                actual_value = label_names
            else:
                # Should not reach here due to CONDITION_FIELDS check above
                return False

            # Evaluate operator
            if operator == "eq":
                if actual_value != expected_value:
                    return False
            elif operator == "gte":
                if actual_value is None or actual_value < expected_value:
                    return False
            elif operator == "lte":
                if actual_value is None or actual_value > expected_value:
                    return False
            elif operator == "in":
                if actual_value not in expected_value:
                    return False
            elif operator == "contains":
                # For labels__contains
                if expected_value not in actual_value:
                    return False
            elif operator == "isnull":
                is_null = actual_value is None
                if is_null != expected_value:
                    return False

        return True  # All conditions passed

    async def get_pending_ticket_rituals(
        self, project_id: str, issue_id: str
    ) -> list[Ritual]:
        """Get TICKET_CLOSE rituals that haven't been completed for an issue.

        A ritual is pending if:
        1. Conditions match the issue (or no conditions), AND
        2. No attestation exists for this issue, OR
        3. Attestation exists but approval_mode is REVIEW and not approved, OR
        4. Attestation exists but approval_mode is GATE (agent can't attest)

        Applies group selection logic (random, round-robin, percentage) for grouped rituals.
        Note: For ticket rituals, we use issue_id as the seed for deterministic selection.
        """
        # Fetch the issue with labels for condition evaluation
        result = await self.db.execute(
            select(Issue)
            .options(selectinload(Issue.labels))
            .where(Issue.id == issue_id)
        )
        issue = result.scalar_one_or_none()
        if not issue:
            return []

        # Get all rituals for the project
        rituals = await self.list_by_project(project_id)

        # Filter to TICKET_CLOSE rituals that match conditions
        ticket_rituals = []
        for ritual in rituals:
            if ritual.trigger != RitualTrigger.TICKET_CLOSE:
                continue
            if not self._evaluate_conditions(ritual, issue):
                continue
            ticket_rituals.append(ritual)

        # Apply group selection logic (use issue_id as seed for determinism)
        selected_rituals = await self._apply_group_selection(ticket_rituals, issue_id)

        pending = []
        for ritual in selected_rituals:
            attestation = await self.get_issue_attestation(ritual.id, issue_id)
            if self._is_ritual_pending(ritual, attestation):
                pending.append(ritual)

        return pending

    async def get_pending_claim_rituals(
        self, project_id: str, issue_id: str
    ) -> list[Ritual]:
        """Get TICKET_CLAIM rituals that haven't been completed for an issue.

        Called when a ticket is being claimed (moved to in_progress).

        A ritual is pending if:
        1. Conditions match the issue (or no conditions), AND
        2. No attestation exists for this issue, OR
        3. Attestation exists but approval_mode is REVIEW and not approved, OR
        4. Attestation exists but approval_mode is GATE (agent can't attest)

        Applies group selection logic (random, round-robin, percentage) for grouped rituals.
        Note: For ticket rituals, we use issue_id as the seed for deterministic selection.
        """
        # Fetch the issue with labels for condition evaluation
        result = await self.db.execute(
            select(Issue)
            .options(selectinload(Issue.labels))
            .where(Issue.id == issue_id)
        )
        issue = result.scalar_one_or_none()
        if not issue:
            return []

        # Get all rituals for the project
        rituals = await self.list_by_project(project_id)

        # Filter to TICKET_CLAIM rituals that match conditions
        claim_rituals = []
        for ritual in rituals:
            if ritual.trigger != RitualTrigger.TICKET_CLAIM:
                continue
            if not self._evaluate_conditions(ritual, issue):
                continue
            claim_rituals.append(ritual)

        # Apply group selection logic (use issue_id as seed for determinism)
        selected_rituals = await self._apply_group_selection(claim_rituals, issue_id)

        pending = []
        for ritual in selected_rituals:
            attestation = await self.get_issue_attestation(ritual.id, issue_id)
            if self._is_ritual_pending(ritual, attestation):
                pending.append(ritual)

        return pending

    async def get_issue_attestation(
        self, ritual_id: str, issue_id: str
    ) -> RitualAttestation | None:
        """Get attestation for a ritual/issue combo (for ticket-close rituals)."""
        result = await self.db.execute(
            select(RitualAttestation)
            .options(
                selectinload(RitualAttestation.attester),
                selectinload(RitualAttestation.approver),
            )
            .where(
                RitualAttestation.ritual_id == ritual_id,
                RitualAttestation.issue_id == issue_id,
            )
        )
        return result.scalar_one_or_none()

    async def get_attestation(
        self, ritual_id: str, sprint_id: str
    ) -> RitualAttestation | None:
        """Get attestation for a ritual/sprint combo."""
        result = await self.db.execute(
            select(RitualAttestation).where(
                RitualAttestation.ritual_id == ritual_id,
                RitualAttestation.sprint_id == sprint_id,
            )
        )
        return result.scalar_one_or_none()

    async def attest(
        self,
        ritual: Ritual,
        sprint_id: str,
        user_id: str,
        note: str | None = None,
    ) -> RitualAttestation:
        """Attest to a ritual for a sprint.

        For GATE mode rituals, this will fail - only approve() works.
        For REVIEW mode, creates attestation pending approval.
        For AUTO mode, creates attestation and clears immediately.

        Raises:
            ValueError: If ritual does not have EVERY_SPRINT trigger.
        """
        # Validate trigger type
        if ritual.trigger != RitualTrigger.EVERY_SPRINT:
            raise ValueError(
                f"Ritual '{ritual.name}' is not a sprint ritual. "
                f"Only rituals with trigger=EVERY_SPRINT can be attested for sprints. "
                f"This ritual has trigger={ritual.trigger.value}."
            )

        if ritual.approval_mode == ApprovalMode.GATE:
            raise ValueError(
                f"Ritual '{ritual.name}' requires human completion (gate mode). "
                "Use the web UI to complete this ritual."
            )

        # Cache ORM attributes before any transaction ops — after rollback,
        # the ORM object may be expired and accessing attributes could trigger
        # MissingGreenlet in async context (CHT-729)
        ritual_id = ritual.id

        # Check if already attested
        existing = await self.get_attestation(ritual_id, sprint_id)
        if existing:
            return existing  # Already attested, return existing

        attestation = RitualAttestation(
            ritual_id=ritual_id,
            sprint_id=sprint_id,
            attested_by=user_id,
            note=note,
        )

        # For AUTO mode, auto-approve
        if ritual.approval_mode == ApprovalMode.AUTO:
            attestation.approved_by = user_id
            attestation.approved_at = datetime.now(timezone.utc)

        try:
            self.db.add(attestation)
            await self.db.commit()
            await self.db.refresh(attestation)
        except IntegrityError:
            # Race condition - another request created the attestation
            await self.db.rollback()
            existing = await self.get_attestation(ritual_id, sprint_id)
            if existing:
                return existing
            raise  # Re-raise if we still can't find it

        # Check if this clears limbo (CHT-729: don't mask successful attestation)
        try:
            await self._maybe_clear_limbo(sprint_id)
        except Exception:
            logger.exception(
                "Failed to check/clear limbo for sprint=%s after attestation",
                sprint_id,
            )

        return attestation

    async def attest_for_issue(
        self,
        ritual: Ritual,
        issue_id: str,
        user_id: str,
        note: str | None = None,
    ) -> RitualAttestation:
        """Attest to a ticket ritual (TICKET_CLOSE or TICKET_CLAIM) for an issue.

        For GATE mode rituals, this will fail - only approve() works.
        For REVIEW mode, creates attestation pending approval.
        For AUTO mode, creates attestation and clears immediately.

        Raises:
            ValueError: If ritual does not have TICKET_CLOSE or TICKET_CLAIM trigger,
                       or if the ritual doesn't belong to the issue's project.
        """
        # Validate trigger type - must be a ticket-level ritual
        allowed_triggers = {RitualTrigger.TICKET_CLOSE, RitualTrigger.TICKET_CLAIM}
        if ritual.trigger not in allowed_triggers:
            raise ValueError(
                f"Ritual '{ritual.name}' is not a ticket-level ritual. "
                f"Only rituals with trigger=TICKET_CLOSE or TICKET_CLAIM can be attested for issues. "
                f"This ritual has trigger={ritual.trigger.value}."
            )

        # Validate project ownership (defense in depth)
        result = await self.db.execute(
            select(Issue).where(Issue.id == issue_id)
        )
        issue = result.scalar_one_or_none()
        if not issue:
            raise ValueError(f"Issue '{issue_id}' not found")
        if ritual.project_id != issue.project_id:
            raise ValueError(
                f"Ritual '{ritual.name}' does not belong to the same project as the issue"
            )

        # Validate issue status is appropriate for this ritual type
        if ritual.trigger == RitualTrigger.TICKET_CLOSE:
            if issue.status in (IssueStatus.DONE, IssueStatus.CANCELED):
                raise ValueError(
                    f"Cannot attest '{ritual.name}' for issue {issue.identifier}: "
                    f"issue is already {issue.status.value}. "
                    "TICKET_CLOSE rituals are for issues being closed, not already closed."
                )
        elif ritual.trigger == RitualTrigger.TICKET_CLAIM:
            if issue.status not in (IssueStatus.BACKLOG, IssueStatus.TODO):
                raise ValueError(
                    f"Cannot attest '{ritual.name}' for issue {issue.identifier}: "
                    f"issue is {issue.status.value}. "
                    "TICKET_CLAIM rituals are only for unclaimed issues (backlog/todo)."
                )

        if ritual.approval_mode == ApprovalMode.GATE:
            raise ValueError(
                f"Ritual '{ritual.name}' requires human completion (gate mode). "
                "Use the web UI to complete this ritual."
            )

        # Cache ORM attributes before any transaction ops — after rollback,
        # the ORM object may be expired and accessing attributes could trigger
        # MissingGreenlet in async context (CHT-729)
        ritual_id = ritual.id
        ritual_name = ritual.name

        # Check if already attested
        existing = await self.get_issue_attestation(ritual_id, issue_id)
        if existing:
            return existing  # Already attested, return existing

        attestation = RitualAttestation(
            ritual_id=ritual_id,
            issue_id=issue_id,
            attested_by=user_id,
            note=note,
        )

        # For AUTO mode, auto-approve
        if ritual.approval_mode == ApprovalMode.AUTO:
            attestation.approved_by = user_id
            attestation.approved_at = datetime.now(timezone.utc)

        # Log activity for the issue (CHT-673) - add before commit for atomicity
        activity = IssueActivity(
            issue_id=issue_id,
            user_id=user_id,
            activity_type=ActivityType.RITUAL_ATTESTED,
            field_name=ritual_name,
            new_value=note,
        )

        try:
            self.db.add(attestation)
            self.db.add(activity)
            await self.db.commit()
            await self.db.refresh(attestation)
        except IntegrityError:
            # Race condition - another request created the attestation
            await self.db.rollback()
            existing = await self.get_issue_attestation(ritual_id, issue_id)
            if existing:
                return existing
            raise  # Re-raise if we still can't find it

        return attestation

    async def complete_gate_ritual_for_issue(
        self,
        ritual: Ritual,
        issue_id: str,
        user_id: str,
        note: str | None = None,
    ) -> RitualAttestation:
        """Complete a GATE mode ticket ritual (TICKET_CLOSE or TICKET_CLAIM) - human-only.

        Raises:
            ValueError: If ritual does not have TICKET_CLOSE or TICKET_CLAIM trigger,
                       or if the ritual doesn't belong to the issue's project.
        """
        # Validate trigger type - must be a ticket-level ritual
        allowed_triggers = {RitualTrigger.TICKET_CLOSE, RitualTrigger.TICKET_CLAIM}
        if ritual.trigger not in allowed_triggers:
            raise ValueError(
                f"Ritual '{ritual.name}' is not a ticket-level ritual. "
                f"Only rituals with trigger=TICKET_CLOSE or TICKET_CLAIM can be completed for issues. "
                f"This ritual has trigger={ritual.trigger.value}."
            )

        # Validate project ownership (defense in depth)
        result = await self.db.execute(
            select(Issue).where(Issue.id == issue_id)
        )
        issue = result.scalar_one_or_none()
        if not issue:
            raise ValueError(f"Issue '{issue_id}' not found")
        if ritual.project_id != issue.project_id:
            raise ValueError(
                f"Ritual '{ritual.name}' does not belong to the same project as the issue"
            )

        # Validate issue status is appropriate for this ritual type
        if ritual.trigger == RitualTrigger.TICKET_CLOSE:
            if issue.status in (IssueStatus.DONE, IssueStatus.CANCELED):
                raise ValueError(
                    f"Cannot complete '{ritual.name}' for issue {issue.identifier}: "
                    f"issue is already {issue.status.value}. "
                    "TICKET_CLOSE rituals are for issues being closed, not already closed."
                )
        elif ritual.trigger == RitualTrigger.TICKET_CLAIM:
            if issue.status not in (IssueStatus.BACKLOG, IssueStatus.TODO):
                raise ValueError(
                    f"Cannot complete '{ritual.name}' for issue {issue.identifier}: "
                    f"issue is {issue.status.value}. "
                    "TICKET_CLAIM rituals are only for unclaimed issues (backlog/todo)."
                )

        # Cache ORM attributes before any transaction ops — after rollback,
        # the ORM object may be expired and accessing attributes could trigger
        # MissingGreenlet in async context (CHT-729)
        ritual_id = ritual.id
        ritual_name = ritual.name

        # Check if already completed
        existing = await self.get_issue_attestation(ritual_id, issue_id)
        if existing:
            return existing  # Already completed

        attestation = RitualAttestation(
            ritual_id=ritual_id,
            issue_id=issue_id,
            attested_by=user_id,
            attested_at=datetime.now(timezone.utc),
            approved_by=user_id,
            approved_at=datetime.now(timezone.utc),
            note=note,
        )

        # Log activity for the issue (CHT-673) - add before commit for atomicity
        activity = IssueActivity(
            issue_id=issue_id,
            user_id=user_id,
            activity_type=ActivityType.RITUAL_ATTESTED,
            field_name=ritual_name,
            new_value=note,
        )

        try:
            self.db.add(attestation)
            self.db.add(activity)
            await self.db.commit()
            await self.db.refresh(attestation)
        except IntegrityError:
            # Race condition - another request created the attestation
            await self.db.rollback()
            existing = await self.get_issue_attestation(ritual_id, issue_id)
            if existing:
                return existing
            raise  # Re-raise if we still can't find it

        # Clear any limbo records for this ritual/issue (CHT-729:
        # don't mask a successful attestation if limbo-clearing fails)
        try:
            await self._clear_ticket_limbo(ritual_id, issue_id, user_id)
        except Exception:
            logger.exception(
                "Failed to clear ticket limbo for ritual=%s issue=%s",
                ritual_id, issue_id,
            )

        return attestation

    async def approve(
        self, attestation: RitualAttestation, approver_id: str
    ) -> RitualAttestation:
        """Approve a ritual attestation (for REVIEW/GATE modes)."""
        attestation.approved_by = approver_id
        attestation.approved_at = datetime.now(timezone.utc)
        await self.db.commit()
        await self.db.refresh(attestation)

        # Check if this clears limbo
        await self._maybe_clear_limbo(attestation.sprint_id)

        return attestation

    async def approve_for_issue(
        self, attestation: RitualAttestation, approver_id: str
    ) -> RitualAttestation:
        """Approve a ticket-close ritual attestation (for REVIEW mode)."""
        # Cache IDs before transaction ops (CHT-729)
        ritual_id = attestation.ritual_id
        issue_id = attestation.issue_id

        attestation.approved_by = approver_id
        attestation.approved_at = datetime.now(timezone.utc)
        await self.db.commit()
        await self.db.refresh(attestation)

        # Clear any limbo records for this ritual/issue (CHT-729:
        # don't mask a successful approval if limbo-clearing fails)
        try:
            await self._clear_ticket_limbo(ritual_id, issue_id, approver_id)
        except Exception:
            logger.exception(
                "Failed to clear ticket limbo for ritual=%s issue=%s",
                ritual_id, issue_id,
            )

        return attestation

    async def _clear_ticket_limbo(
        self, ritual_id: str, issue_id: str, cleared_by_id: str
    ) -> None:
        """Clear all limbo records for a ritual/issue combo.

        Called when a GATE ritual is completed or approved.
        """
        result = await self.db.execute(
            select(TicketLimbo).where(
                TicketLimbo.ritual_id == ritual_id,
                TicketLimbo.issue_id == issue_id,
                TicketLimbo.cleared_at.is_(None),
            )
        )
        limbo_records = result.scalars().all()
        for limbo in limbo_records:
            limbo.cleared_at = datetime.now(timezone.utc)
            limbo.cleared_by_id = cleared_by_id
        if limbo_records:
            await self.db.commit()

    async def _cleanup_orphaned_ticket_limbo(self, project_id: str) -> int:
        """Clear orphaned ticket limbo records where attestation already exists.

        An orphaned limbo record is one where:
        - cleared_at IS NULL (not yet cleared)
        - But an approved attestation exists for the same ritual/issue combo

        This can happen when _clear_ticket_limbo fails after a successful
        attestation (CHT-729 defensive pattern). This method self-heals
        by finding and clearing such records.

        Returns the number of orphaned records cleared.
        """
        # Find uncleared limbo records for issues in this project
        result = await self.db.execute(
            select(TicketLimbo)
            .join(Issue, TicketLimbo.issue_id == Issue.id)
            .where(
                Issue.project_id == project_id,
                TicketLimbo.cleared_at.is_(None),
            )
        )
        limbo_records = list(result.scalars().all())

        cleared_count = 0
        for limbo in limbo_records:
            # Check if an approved attestation exists for this ritual/issue
            attestation = await self.get_issue_attestation(
                limbo.ritual_id, limbo.issue_id
            )
            if attestation and attestation.approved_at is not None:
                limbo.cleared_at = datetime.now(timezone.utc)
                limbo.cleared_by_id = attestation.approved_by
                cleared_count += 1

        if cleared_count:
            try:
                await self.db.commit()
            except Exception:
                await self.db.rollback()
                raise
            logger.info(
                "Cleaned up %d orphaned ticket limbo records for project=%s",
                cleared_count, project_id,
            )

        return cleared_count

    async def complete_gate_ritual(
        self,
        ritual: Ritual,
        sprint_id: str,
        user_id: str,
        note: str | None = None,
    ) -> RitualAttestation:
        """Complete a GATE mode ritual (human-only).

        Raises:
            ValueError: If ritual does not have EVERY_SPRINT trigger.
        """
        # Validate trigger type
        if ritual.trigger != RitualTrigger.EVERY_SPRINT:
            raise ValueError(
                f"Ritual '{ritual.name}' is not a sprint ritual. "
                f"Only rituals with trigger=EVERY_SPRINT can be completed for sprints. "
                f"This ritual has trigger={ritual.trigger.value}."
            )

        # Cache ORM attributes before any transaction ops — after rollback,
        # the ORM object may be expired and accessing attributes could trigger
        # MissingGreenlet in async context (CHT-729)
        ritual_id = ritual.id

        # Check if already completed
        existing = await self.get_attestation(ritual_id, sprint_id)
        if existing:
            return existing  # Already completed

        attestation = RitualAttestation(
            ritual_id=ritual_id,
            sprint_id=sprint_id,
            attested_by=user_id,
            attested_at=datetime.now(timezone.utc),
            approved_by=user_id,
            approved_at=datetime.now(timezone.utc),
            note=note,
        )
        try:
            self.db.add(attestation)
            await self.db.commit()
            await self.db.refresh(attestation)
        except IntegrityError:
            # Race condition - another request created the attestation
            await self.db.rollback()
            existing = await self.get_attestation(ritual_id, sprint_id)
            if existing:
                return existing
            raise  # Re-raise if we still can't find it

        # Check if this clears limbo (CHT-729: don't mask successful attestation)
        try:
            await self._maybe_clear_limbo(sprint_id)
        except Exception:
            logger.exception(
                "Failed to check/clear limbo for sprint=%s after gate completion",
                sprint_id,
            )

        return attestation

    async def _maybe_clear_limbo(self, sprint_id: str) -> None:
        """Clear limbo if all rituals are complete."""
        from app.services.sprint_service import SprintService

        result = await self.db.execute(
            select(Sprint).where(Sprint.id == sprint_id)
        )
        sprint = result.scalar_one_or_none()
        if not sprint or not sprint.limbo:
            return

        pending = await self.get_pending_rituals(sprint.project_id, sprint_id)
        if not pending:
            # All rituals complete - activate next sprint
            sprint_service = SprintService(self.db)
            await sprint_service.complete_limbo(sprint)

    async def maybe_clear_limbo_for_project(self, project_id: str) -> None:
        """Check if project's limbo should be cleared (e.g., after ritual deletion)."""
        # Find limbo sprint for this project
        result = await self.db.execute(
            select(Sprint).where(
                Sprint.project_id == project_id,
                Sprint.limbo == True,
            )
        )
        limbo_sprint = result.scalar_one_or_none()
        if limbo_sprint:
            await self._maybe_clear_limbo(limbo_sprint.id)

    async def check_limbo(self, project_id: str) -> tuple[bool, Sprint | None, list[Ritual]]:
        """Check if project is in limbo and get pending rituals.

        Returns: (in_limbo, sprint, pending_rituals)
        """
        # Get the completed sprint that might be in limbo
        result = await self.db.execute(
            select(Sprint).where(
                Sprint.project_id == project_id,
                Sprint.limbo == True,
            )
        )
        limbo_sprint = result.scalar_one_or_none()

        if not limbo_sprint:
            return False, None, []

        pending = await self.get_pending_rituals(project_id, limbo_sprint.id)
        return True, limbo_sprint, pending

    async def enter_limbo(self, sprint: Sprint) -> list[Ritual]:
        """Put a sprint into limbo if it has EVERY_SPRINT rituals.

        Returns the list of pending rituals (after group selection).
        Only considers EVERY_SPRINT trigger rituals (not TICKET_CLOSE).
        Applies group selection logic to determine which rituals are active.
        """
        rituals = await self.list_by_project(sprint.project_id)
        sprint_rituals = [r for r in rituals if r.trigger == RitualTrigger.EVERY_SPRINT]

        # Apply group selection to get the actual rituals for this sprint
        # Use advance_round_robin=True to update round-robin state for new sprint
        selected_rituals = await self._apply_group_selection(
            sprint_rituals, sprint.id, advance_round_robin=True
        )

        if selected_rituals:
            sprint.limbo = True
            await self.db.commit()
            return selected_rituals
        return []

    async def get_issues_with_pending_gates(self, project_id: str) -> list[dict]:
        """Get issues in limbo - waiting for GATE ritual approval.

        Only returns issues that have an active limbo record (someone tried to
        claim/close and was blocked). This provides an actionable list of issues
        that need human approval.

        Returns a list of dicts with:
            - issue_id, identifier, title, status, project_id, project_name
            - pending_gates: list of {ritual_id, ritual_name, ritual_prompt, trigger,
                                      requested_by_name, requested_at}
        """
        from app.models.project import Project

        project = await self.db.get(Project, project_id)
        if not project:
            return []

        limbo_records = await self._get_pending_gate_limbo_records(project_id)
        if not limbo_records:
            return []

        issues_map: dict[str, dict] = {}
        for limbo in limbo_records:
            issue = limbo.issue
            ritual = limbo.ritual
            requested_by = limbo.requested_by

            if issue.id not in issues_map:
                issues_map[issue.id] = {
                    "issue_id": issue.id,
                    "identifier": issue.identifier,
                    "title": issue.title,
                    "status": issue.status.value,
                    "project_id": project_id,
                    "project_name": project.name,
                    "pending_gates": [],
                }

            issues_map[issue.id]["pending_gates"].append({
                "ritual_id": ritual.id,
                "ritual_name": ritual.name,
                "ritual_prompt": ritual.prompt,
                "trigger": ritual.trigger.value,
                "limbo_type": limbo.limbo_type.value,
                "requested_by_name": requested_by.name if requested_by else "Unknown",
                "requested_at": limbo.requested_at.isoformat() if limbo.requested_at else None,
            })

        return list(issues_map.values())

    async def _get_pending_gate_limbo_records(self, project_id: str):
        """Get uncleared limbo records for a project (shared by gates and approvals queries)."""
        try:
            await self._cleanup_orphaned_ticket_limbo(project_id)
        except Exception:
            logger.exception(
                "Failed to cleanup orphaned limbo records for project=%s",
                project_id,
            )

        result = await self.db.execute(
            select(TicketLimbo)
            .join(Issue, TicketLimbo.issue_id == Issue.id)
            .join(Ritual, TicketLimbo.ritual_id == Ritual.id)
            .where(
                Issue.project_id == project_id,
                TicketLimbo.cleared_at.is_(None),
                Ritual.is_active == True,
                Issue.status.notin_([IssueStatus.DONE, IssueStatus.CANCELED]),
            )
            .options(
                selectinload(TicketLimbo.issue),
                selectinload(TicketLimbo.ritual),
                selectinload(TicketLimbo.requested_by),
            )
        )
        return list(result.scalars().all())

    async def get_issues_with_pending_approvals(self, project_id: str) -> list[dict]:
        """Get issues with any pending human action — GATE or REVIEW rituals.

        Combines:
        - GATE rituals: from TicketLimbo (shared query)
        - REVIEW rituals: from RitualAttestation where approved_at IS NULL

        Returns a list of dicts with:
            - issue_id, identifier, title, status, project_id, project_name
            - pending_approvals: list of {ritual_id, ritual_name, ritual_prompt, trigger,
                                          approval_mode, limbo_type, requested_by_name,
                                          requested_at, attestation_note}
        """
        from app.models.project import Project

        project = await self.db.get(Project, project_id)
        if not project:
            return []

        issues_map: dict[str, dict] = {}

        def _ensure_issue(issue_id, issue, list_key="pending_approvals"):
            if issue_id not in issues_map:
                issues_map[issue_id] = {
                    "issue_id": issue.id,
                    "identifier": issue.identifier,
                    "title": issue.title,
                    "status": issue.status.value,
                    "project_id": project_id,
                    "project_name": project.name,
                    list_key: [],
                }

        # 1. GATE rituals from TicketLimbo
        for limbo in await self._get_pending_gate_limbo_records(project_id):
            _ensure_issue(limbo.issue.id, limbo.issue)
            requested_by = limbo.requested_by
            issues_map[limbo.issue.id]["pending_approvals"].append({
                "ritual_id": limbo.ritual.id,
                "ritual_name": limbo.ritual.name,
                "ritual_prompt": limbo.ritual.prompt,
                "trigger": limbo.ritual.trigger.value,
                "approval_mode": "gate",
                "limbo_type": limbo.limbo_type.value,
                "requested_by_name": requested_by.name if requested_by else "Unknown",
                "requested_at": limbo.requested_at.isoformat() if limbo.requested_at else None,
                "attestation_note": None,
            })

        # 2. REVIEW rituals from RitualAttestation (unapproved)
        review_attestations = await self.db.execute(
            select(RitualAttestation)
            .join(Ritual, RitualAttestation.ritual_id == Ritual.id)
            .join(Issue, RitualAttestation.issue_id == Issue.id)
            .where(
                Issue.project_id == project_id,
                RitualAttestation.approved_at.is_(None),
                RitualAttestation.issue_id.isnot(None),
                Ritual.approval_mode == ApprovalMode.REVIEW,
                Ritual.is_active == True,
                Issue.status.notin_([IssueStatus.DONE, IssueStatus.CANCELED]),
            )
            .options(
                selectinload(RitualAttestation.issue),
                selectinload(RitualAttestation.ritual),
                selectinload(RitualAttestation.attester),
            )
        )
        for attestation in review_attestations.scalars().all():
            _ensure_issue(attestation.issue.id, attestation.issue)
            attester = attestation.attester
            issues_map[attestation.issue.id]["pending_approvals"].append({
                "ritual_id": attestation.ritual.id,
                "ritual_name": attestation.ritual.name,
                "ritual_prompt": attestation.ritual.prompt,
                "trigger": attestation.ritual.trigger.value,
                "approval_mode": "review",
                "limbo_type": None,
                "requested_by_name": attester.name if attester else "Unknown",
                "requested_at": attestation.attested_at.isoformat() if attestation.attested_at else None,
                "attestation_note": attestation.note,
            })

        return list(issues_map.values())
