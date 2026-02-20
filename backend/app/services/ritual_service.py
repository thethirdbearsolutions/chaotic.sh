"""Ritual service for managing rituals and attestations."""
import json
import logging
import random
from datetime import datetime, timezone

logger = logging.getLogger(__name__)
from app.enums import (
    ApprovalMode,
    RitualTrigger,
    SelectionMode,
)
from app.enums import IssueStatus, IssuePriority, IssueType, ActivityType
from app.enums import LimboType
from app.schemas.ritual import RitualCreate, RitualUpdate, RitualGroupCreate, RitualGroupUpdate
from app.services.sprint_service import SprintService
from app.oxyde_models.sprint import OxydeSprint
from app.oxyde_models.issue import OxydeIssue, OxydeIssueActivity
from app.oxyde_models.ritual import OxydeRitual, OxydeRitualGroup, OxydeRitualAttestation
from app.oxyde_models.issue import OxydeTicketLimbo


class RitualService:
    """Service for ritual operations."""

    def __init__(self, db=None):
        self.db = db  # Kept for API compat during transition; not used by Oxyde

    async def create(self, ritual_in: RitualCreate, project_id: str) -> OxydeRitual:
        """Create a new ritual for a project."""
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

        ritual = await OxydeRitual.objects.create(
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
        return ritual

    async def get_by_id(self, ritual_id: str, include_inactive: bool = False) -> OxydeRitual | None:
        """Get ritual by ID."""
        query = OxydeRitual.objects.join("group").filter(id=ritual_id)
        if not include_inactive:
            query = query.filter(is_active=True)
        ritual = await query.first()
        return ritual

    async def get_by_name(self, project_id: str, name: str, include_inactive: bool = False) -> OxydeRitual | None:
        """Get ritual by name within a project."""
        query = OxydeRitual.objects.join("group").filter(project_id=project_id, name=name)
        if not include_inactive:
            query = query.filter(is_active=True)
        ritual = await query.first()
        return ritual

    async def update(self, ritual: OxydeRitual, ritual_in: RitualUpdate) -> OxydeRitual:
        """Update a ritual."""
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

            new_weight = update_data.get("weight", ritual.weight)
            new_percentage = update_data.get("percentage", ritual.percentage)

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
        ritual.updated_at = datetime.now(timezone.utc)
        changed_fields = set(update_data.keys()) | {"updated_at"}
        await ritual.save(update_fields=changed_fields)

        # Reload to get fresh data
        return await self.get_by_id(ritual.id, include_inactive=True)

    async def delete(self, ritual: OxydeRitual) -> None:
        """Soft-delete a ritual by marking it inactive."""
        ritual.is_active = False
        await ritual.save(update_fields={"is_active"})

    async def list_by_project(self, project_id: str, include_inactive: bool = False) -> list[OxydeRitual]:
        """List all rituals for a project."""
        query = OxydeRitual.objects.join("group").filter(project_id=project_id)
        if not include_inactive:
            query = query.filter(is_active=True)
        query = query.order_by("created_at")
        rituals = await query.all()

        return rituals

    # =========================================================================
    # Ritual Group CRUD
    # =========================================================================

    async def create_group(self, group_in: RitualGroupCreate, project_id: str) -> OxydeRitualGroup:
        """Create a new ritual group."""
        existing = await self.get_group_by_name(project_id, group_in.name)
        if existing:
            raise ValueError(f"A ritual group named '{group_in.name}' already exists in this project")

        group = await OxydeRitualGroup.objects.create(
            project_id=project_id,
            name=group_in.name,
            selection_mode=group_in.selection_mode,
        )
        # Attach empty rituals list for response compat
        group.rituals = []
        return group

    async def get_group_by_id(self, group_id: str) -> OxydeRitualGroup | None:
        """Get ritual group by ID."""
        group = await OxydeRitualGroup.objects.get_or_none(id=group_id)
        if group:
            rituals = await OxydeRitual.objects.filter(group_id=group_id, is_active=True).all()
            group.rituals = rituals
        return group

    async def get_group_by_name(self, project_id: str, name: str) -> OxydeRitualGroup | None:
        """Get ritual group by name within a project."""
        group = await OxydeRitualGroup.objects.filter(project_id=project_id, name=name).first()
        if group:
            rituals = await OxydeRitual.objects.filter(group_id=group.id, is_active=True).all()
            group.rituals = rituals
        return group

    async def list_groups_by_project(self, project_id: str) -> list[OxydeRitualGroup]:
        """List all ritual groups for a project."""
        groups = await OxydeRitualGroup.objects.filter(
            project_id=project_id
        ).order_by("created_at").all()
        for group in groups:
            rituals = await OxydeRitual.objects.filter(group_id=group.id, is_active=True).all()
            group.rituals = rituals
        return groups

    async def update_group(self, group: OxydeRitualGroup, group_in: RitualGroupUpdate) -> OxydeRitualGroup:
        """Update a ritual group."""
        update_data = group_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(group, field, value)
        await group.save()
        return await self.get_group_by_id(group.id)

    async def delete_group(self, group: OxydeRitualGroup) -> None:
        """Delete a ritual group. Rituals get group_id=NULL via ON DELETE SET NULL."""
        await group.delete()

    # =========================================================================
    # Group Selection Logic
    # =========================================================================

    async def _apply_group_selection(
        self, rituals: list[OxydeRitual], sprint_id: str | None = None,
        advance_round_robin: bool = False
    ) -> list[OxydeRitual]:
        """Apply group selection logic to filter rituals."""
        if not rituals:
            return []

        ungrouped = [r for r in rituals if r.group_id is None]
        grouped = [r for r in rituals if r.group_id is not None]

        if not grouped:
            return ungrouped

        groups: dict[str, list[OxydeRitual]] = {}
        for ritual in grouped:
            if ritual.group_id not in groups:
                groups[ritual.group_id] = []
            groups[ritual.group_id].append(ritual)

        selected_from_groups = []
        for group_id, group_rituals in groups.items():
            group = await self.get_group_by_id(group_id)
            if not group:
                selected_from_groups.extend(group_rituals)
                continue

            active_rituals = [r for r in group_rituals if r.is_active]
            if not active_rituals:
                continue

            if group.selection_mode == SelectionMode.RANDOM_ONE:
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

    def _select_random_one(self, rituals: list[OxydeRitual], seed: str | None = None) -> OxydeRitual | None:
        """Select one ritual randomly, weighted by weight field."""
        if not rituals:
            return None

        weights = [r.weight for r in rituals]
        total_weight = sum(weights)
        if total_weight <= 0:
            return None

        if seed:
            rng = random.Random(seed)
            selected = rng.choices(rituals, weights=weights, k=1)
        else:
            selected = random.choices(rituals, weights=weights, k=1)
        return selected[0] if selected else None

    async def _select_round_robin(
        self, group: OxydeRitualGroup, rituals: list[OxydeRitual], sprint_id: str | None,
        advance: bool = False
    ) -> OxydeRitual | None:
        """Select next ritual in round-robin order."""
        if not rituals:
            return None

        sorted_rituals = sorted(rituals, key=lambda r: r.created_at)

        current_index = 0
        if group.last_selected_ritual_id:
            for i, r in enumerate(sorted_rituals):
                if r.id == group.last_selected_ritual_id:
                    current_index = (i + 1) % len(sorted_rituals)
                    break

        selected = sorted_rituals[current_index]

        if advance and group.last_selected_ritual_id != selected.id:
            group.last_selected_ritual_id = selected.id
            await group.save()

        return selected

    def _select_by_percentage(
        self, rituals: list[OxydeRitual], seed: str | None = None
    ) -> list[OxydeRitual]:
        """Select rituals based on their percentage chance."""
        selected = []
        for ritual in rituals:
            if ritual.percentage is not None and ritual.percentage > 0:
                if seed:
                    ritual_seed = f"{seed}:{ritual.id}"
                    rng = random.Random(ritual_seed)
                    if rng.random() * 100 < ritual.percentage:
                        selected.append(ritual)
                else:
                    if random.random() * 100 < ritual.percentage:
                        selected.append(ritual)
        return selected

    def _is_ritual_pending(self, ritual: OxydeRitual, attestation: OxydeRitualAttestation | None) -> bool:
        """Check if a ritual is still pending based on its attestation state."""
        if attestation is None:
            return True
        if ritual.approval_mode == ApprovalMode.REVIEW and attestation.approved_at is None:
            return True
        if ritual.approval_mode == ApprovalMode.GATE and attestation.approved_at is None:
            return True
        return False

    async def get_pending_rituals(
        self, project_id: str, sprint_id: str
    ) -> list[OxydeRitual]:
        """Get EVERY_SPRINT rituals that haven't been completed for a sprint."""
        rituals = await self.list_by_project(project_id)

        sprint_rituals = [r for r in rituals if r.trigger == RitualTrigger.EVERY_SPRINT]
        selected_rituals = await self._apply_group_selection(sprint_rituals, sprint_id)

        pending = []
        for ritual in selected_rituals:
            attestation = await self.get_attestation(ritual.id, sprint_id)
            if self._is_ritual_pending(ritual, attestation):
                pending.append(ritual)

        return pending

    CONDITION_FIELDS = {"estimate", "priority", "issue_type", "status", "labels"}
    CONDITION_OPERATORS = {"eq", "in", "gte", "lte", "contains", "isnull"}

    def _evaluate_conditions(self, ritual: OxydeRitual, issue: OxydeIssue) -> bool:
        """Evaluate ritual conditions against an issue."""
        if not ritual.conditions:
            return True

        try:
            conditions = json.loads(ritual.conditions)
        except json.JSONDecodeError:
            return False

        if not conditions:
            return True

        # Get label names — labels are loaded via prefetch or manual attachment
        labels = getattr(issue, 'labels', []) or []
        label_names = [label.name for label in labels]

        for key, expected_value in conditions.items():
            parts = key.split("__")
            if len(parts) != 2:
                return False

            field, operator = parts

            if field not in self.CONDITION_FIELDS:
                return False
            if operator not in self.CONDITION_OPERATORS:
                return False

            if field == "estimate":
                actual_value = issue.estimate
            elif field == "priority":
                pval = issue.priority
                # Oxyde stores enum NAMES; conditions use VALUES
                if isinstance(pval, IssuePriority):
                    actual_value = pval.value
                elif pval:
                    actual_value = IssuePriority[pval].value
                else:
                    actual_value = None
            elif field == "issue_type":
                tval = issue.issue_type
                if isinstance(tval, IssueType):
                    actual_value = tval.value
                elif tval:
                    actual_value = IssueType[tval].value
                else:
                    actual_value = None
            elif field == "status":
                sval = issue.status
                if isinstance(sval, IssueStatus):
                    actual_value = sval.value
                elif sval:
                    actual_value = IssueStatus[sval].value
                else:
                    actual_value = None
            elif field == "labels":
                actual_value = label_names
            else:
                return False

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
                if expected_value not in actual_value:
                    return False
            elif operator == "isnull":
                is_null = actual_value is None
                if is_null != expected_value:
                    return False

        return True

    async def get_pending_ticket_rituals(
        self, project_id: str, issue_id: str
    ) -> list[OxydeRitual]:
        """Get TICKET_CLOSE rituals that haven't been completed for an issue."""
        issue = await OxydeIssue.objects.prefetch("labels").filter(id=issue_id).first()
        if not issue:
            return []

        rituals = await self.list_by_project(project_id)

        ticket_rituals = []
        for ritual in rituals:
            if ritual.trigger != RitualTrigger.TICKET_CLOSE:
                continue
            if not self._evaluate_conditions(ritual, issue):
                continue
            ticket_rituals.append(ritual)

        selected_rituals = await self._apply_group_selection(ticket_rituals, issue_id)

        pending = []
        for ritual in selected_rituals:
            attestation = await self.get_issue_attestation(ritual.id, issue_id)
            if self._is_ritual_pending(ritual, attestation):
                pending.append(ritual)

        return pending

    async def get_pending_claim_rituals(
        self, project_id: str, issue_id: str
    ) -> list[OxydeRitual]:
        """Get TICKET_CLAIM rituals that haven't been completed for an issue."""
        issue = await OxydeIssue.objects.prefetch("labels").filter(id=issue_id).first()
        if not issue:
            return []

        rituals = await self.list_by_project(project_id)

        claim_rituals = []
        for ritual in rituals:
            if ritual.trigger != RitualTrigger.TICKET_CLAIM:
                continue
            if not self._evaluate_conditions(ritual, issue):
                continue
            claim_rituals.append(ritual)

        selected_rituals = await self._apply_group_selection(claim_rituals, issue_id)

        pending = []
        for ritual in selected_rituals:
            attestation = await self.get_issue_attestation(ritual.id, issue_id)
            if self._is_ritual_pending(ritual, attestation):
                pending.append(ritual)

        return pending

    async def get_issue_attestation(
        self, ritual_id: str, issue_id: str
    ) -> OxydeRitualAttestation | None:
        """Get attestation for a ritual/issue combo."""
        return await OxydeRitualAttestation.objects.filter(
            ritual_id=ritual_id, issue_id=issue_id,
        ).first()

    async def get_attestation(
        self, ritual_id: str, sprint_id: str
    ) -> OxydeRitualAttestation | None:
        """Get attestation for a ritual/sprint combo."""
        return await OxydeRitualAttestation.objects.filter(
            ritual_id=ritual_id, sprint_id=sprint_id,
        ).first()

    async def attest(
        self,
        ritual: OxydeRitual,
        sprint_id: str,
        user_id: str,
        note: str | None = None,
    ) -> OxydeRitualAttestation:
        """Attest to a ritual for a sprint."""
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

        ritual_id = ritual.id

        existing = await self.get_attestation(ritual_id, sprint_id)
        if existing:
            return existing

        data = dict(
            ritual_id=ritual_id,
            sprint_id=sprint_id,
            attested_by=user_id,
            note=note,
        )

        if ritual.approval_mode == ApprovalMode.AUTO:
            data["approved_by"] = user_id
            data["approved_at"] = datetime.now(timezone.utc)

        try:
            attestation = await OxydeRitualAttestation.objects.create(**data)
        except Exception:
            # Race condition — check if another request created it
            existing = await self.get_attestation(ritual_id, sprint_id)
            if existing:
                return existing
            raise

        # Check if this clears limbo
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
        ritual: OxydeRitual,
        issue_id: str,
        user_id: str,
        note: str | None = None,
    ) -> OxydeRitualAttestation:
        """Attest to a ticket ritual for an issue."""
        allowed_triggers = {RitualTrigger.TICKET_CLOSE, RitualTrigger.TICKET_CLAIM}
        if ritual.trigger not in allowed_triggers:
            raise ValueError(
                f"Ritual '{ritual.name}' is not a ticket-level ritual. "
                f"Only rituals with trigger=TICKET_CLOSE or TICKET_CLAIM can be attested for issues. "
                f"This ritual has trigger={ritual.trigger.value}."
            )

        issue = await OxydeIssue.objects.get_or_none(id=issue_id)
        if not issue:
            raise ValueError(f"Issue '{issue_id}' not found")
        if ritual.project_id != issue.project_id:
            raise ValueError(
                f"Ritual '{ritual.name}' does not belong to the same project as the issue"
            )

        issue_status_str = issue.status.value if issue.status else issue.status
        if ritual.trigger == RitualTrigger.TICKET_CLOSE:
            if issue_status_str in (IssueStatus.DONE.value, IssueStatus.CANCELED.value):
                raise ValueError(
                    f"Cannot attest '{ritual.name}' for issue {issue.identifier}: "
                    f"issue is already {issue_status_str}. "
                    "TICKET_CLOSE rituals are for issues being closed, not already closed."
                )
        elif ritual.trigger == RitualTrigger.TICKET_CLAIM:
            if issue_status_str not in (IssueStatus.BACKLOG.value, IssueStatus.TODO.value):
                raise ValueError(
                    f"Cannot attest '{ritual.name}' for issue {issue.identifier}: "
                    f"issue is {issue_status_str}. "
                    "TICKET_CLAIM rituals are only for unclaimed issues (backlog/todo)."
                )

        if ritual.approval_mode == ApprovalMode.GATE:
            raise ValueError(
                f"Ritual '{ritual.name}' requires human completion (gate mode). "
                "Use the web UI to complete this ritual."
            )

        ritual_id = ritual.id
        ritual_name = ritual.name

        existing = await self.get_issue_attestation(ritual_id, issue_id)
        if existing:
            return existing

        data = dict(
            ritual_id=ritual_id,
            issue_id=issue_id,
            attested_by=user_id,
            note=note,
        )

        if ritual.approval_mode == ApprovalMode.AUTO:
            data["approved_by"] = user_id
            data["approved_at"] = datetime.now(timezone.utc)

        try:
            attestation = await OxydeRitualAttestation.objects.create(**data)
            # Log activity
            await OxydeIssueActivity.objects.create(
                issue_id=issue_id,
                user_id=user_id,
                activity_type=ActivityType.RITUAL_ATTESTED,
                field_name=ritual_name,
                new_value=note,
            )
        except Exception:
            existing = await self.get_issue_attestation(ritual_id, issue_id)
            if existing:
                return existing
            raise

        return attestation

    async def complete_gate_ritual_for_issue(
        self,
        ritual: OxydeRitual,
        issue_id: str,
        user_id: str,
        note: str | None = None,
    ) -> OxydeRitualAttestation:
        """Complete a GATE mode ticket ritual — human-only."""
        allowed_triggers = {RitualTrigger.TICKET_CLOSE, RitualTrigger.TICKET_CLAIM}
        if ritual.trigger not in allowed_triggers:
            raise ValueError(
                f"Ritual '{ritual.name}' is not a ticket-level ritual. "
                f"Only rituals with trigger=TICKET_CLOSE or TICKET_CLAIM can be completed for issues. "
                f"This ritual has trigger={ritual.trigger.value}."
            )

        issue = await OxydeIssue.objects.get_or_none(id=issue_id)
        if not issue:
            raise ValueError(f"Issue '{issue_id}' not found")
        if ritual.project_id != issue.project_id:
            raise ValueError(
                f"Ritual '{ritual.name}' does not belong to the same project as the issue"
            )

        issue_status_str = issue.status.value if issue.status else issue.status
        if ritual.trigger == RitualTrigger.TICKET_CLOSE:
            if issue_status_str in (IssueStatus.DONE.value, IssueStatus.CANCELED.value):
                raise ValueError(
                    f"Cannot complete '{ritual.name}' for issue {issue.identifier}: "
                    f"issue is already {issue_status_str}. "
                    "TICKET_CLOSE rituals are for issues being closed, not already closed."
                )
        elif ritual.trigger == RitualTrigger.TICKET_CLAIM:
            if issue_status_str not in (IssueStatus.BACKLOG.value, IssueStatus.TODO.value):
                raise ValueError(
                    f"Cannot complete '{ritual.name}' for issue {issue.identifier}: "
                    f"issue is {issue_status_str}. "
                    "TICKET_CLAIM rituals are only for unclaimed issues (backlog/todo)."
                )

        ritual_id = ritual.id
        ritual_name = ritual.name

        existing = await self.get_issue_attestation(ritual_id, issue_id)
        if existing:
            return existing

        now = datetime.now(timezone.utc)
        try:
            attestation = await OxydeRitualAttestation.objects.create(
                ritual_id=ritual_id,
                issue_id=issue_id,
                attested_by=user_id,
                attested_at=now,
                approved_by=user_id,
                approved_at=now,
                note=note,
            )
            await OxydeIssueActivity.objects.create(
                issue_id=issue_id,
                user_id=user_id,
                activity_type=ActivityType.RITUAL_ATTESTED,
                field_name=ritual_name,
                new_value=note,
            )
        except Exception:
            existing = await self.get_issue_attestation(ritual_id, issue_id)
            if existing:
                return existing
            raise

        try:
            await self._clear_ticket_limbo(ritual_id, issue_id, user_id)
        except Exception:
            logger.exception(
                "Failed to clear ticket limbo for ritual=%s issue=%s",
                ritual_id, issue_id,
            )

        return attestation

    async def approve(
        self, attestation: OxydeRitualAttestation, approver_id: str
    ) -> OxydeRitualAttestation:
        """Approve a ritual attestation (for REVIEW/GATE modes)."""
        attestation.approved_by = approver_id
        attestation.approved_at = datetime.now(timezone.utc)
        await attestation.save(update_fields={"approved_by", "approved_at"})

        await self._maybe_clear_limbo(attestation.sprint_id)

        return attestation

    async def approve_for_issue(
        self, attestation: OxydeRitualAttestation, approver_id: str
    ) -> OxydeRitualAttestation:
        """Approve a ticket-close ritual attestation (for REVIEW mode)."""
        ritual_id = attestation.ritual_id
        issue_id = attestation.issue_id

        attestation.approved_by = approver_id
        attestation.approved_at = datetime.now(timezone.utc)
        await attestation.save(update_fields={"approved_by", "approved_at"})

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
        """Clear all limbo records for a ritual/issue combo."""
        limbo_records = await OxydeTicketLimbo.objects.filter(
            ritual_id=ritual_id,
            issue_id=issue_id,
            cleared_at=None,
        ).all()
        now = datetime.now(timezone.utc)
        for limbo in limbo_records:
            limbo.cleared_at = now
            limbo.cleared_by_id = cleared_by_id
            await limbo.save()

    async def _cleanup_orphaned_ticket_limbo(self, project_id: str) -> int:
        """Clear orphaned ticket limbo records where attestation already exists."""
        # Get all issues in this project
        issues = await OxydeIssue.objects.filter(project_id=project_id).all()
        issue_ids = {i.id for i in issues}

        if not issue_ids:
            return 0

        # Get uncleared limbo records for these issues
        all_limbo = []
        for issue_id in issue_ids:
            records = await OxydeTicketLimbo.objects.filter(
                issue_id=issue_id, cleared_at=None,
            ).all()
            all_limbo.extend(records)

        cleared_count = 0
        for limbo in all_limbo:
            attestation = await self.get_issue_attestation(
                limbo.ritual_id, limbo.issue_id
            )
            if attestation and attestation.approved_at is not None:
                limbo.cleared_at = datetime.now(timezone.utc)
                limbo.cleared_by_id = attestation.approved_by
                await limbo.save()
                cleared_count += 1

        if cleared_count:
            logger.info(
                "Cleaned up %d orphaned ticket limbo records for project=%s",
                cleared_count, project_id,
            )

        return cleared_count

    async def complete_gate_ritual(
        self,
        ritual: OxydeRitual,
        sprint_id: str,
        user_id: str,
        note: str | None = None,
    ) -> OxydeRitualAttestation:
        """Complete a GATE mode ritual (human-only)."""
        if ritual.trigger != RitualTrigger.EVERY_SPRINT:
            raise ValueError(
                f"Ritual '{ritual.name}' is not a sprint ritual. "
                f"Only rituals with trigger=EVERY_SPRINT can be completed for sprints. "
                f"This ritual has trigger={ritual.trigger.value}."
            )

        ritual_id = ritual.id

        existing = await self.get_attestation(ritual_id, sprint_id)
        if existing:
            return existing

        now = datetime.now(timezone.utc)
        try:
            attestation = await OxydeRitualAttestation.objects.create(
                ritual_id=ritual_id,
                sprint_id=sprint_id,
                attested_by=user_id,
                attested_at=now,
                approved_by=user_id,
                approved_at=now,
                note=note,
            )
        except Exception:
            existing = await self.get_attestation(ritual_id, sprint_id)
            if existing:
                return existing
            raise

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
        sprint = await OxydeSprint.objects.get_or_none(id=sprint_id)
        if not sprint or not sprint.limbo:
            return

        pending = await self.get_pending_rituals(sprint.project_id, sprint_id)
        if not pending:
            sprint_service = SprintService()
            await sprint_service.complete_limbo(sprint)

    async def maybe_clear_limbo_for_project(self, project_id: str) -> None:
        """Check if project's limbo should be cleared."""
        limbo_sprint = await OxydeSprint.objects.filter(
            project_id=project_id, limbo=True,
        ).first()
        if limbo_sprint:
            await self._maybe_clear_limbo(limbo_sprint.id)

    async def check_limbo(self, project_id: str) -> tuple[bool, OxydeSprint | None, list[OxydeRitual]]:
        """Check if project is in limbo and get pending rituals."""
        limbo_sprint = await OxydeSprint.objects.filter(
            project_id=project_id, limbo=True,
        ).first()

        if not limbo_sprint:
            return False, None, []

        pending = await self.get_pending_rituals(project_id, limbo_sprint.id)
        return True, limbo_sprint, pending

    async def enter_limbo(self, sprint) -> list[OxydeRitual]:
        """Put a sprint into limbo if it has EVERY_SPRINT rituals."""
        sprint_id = sprint.id if hasattr(sprint, 'id') else sprint
        project_id = sprint.project_id if hasattr(sprint, 'project_id') else None

        if project_id is None:
            s = await OxydeSprint.objects.get_or_none(id=sprint_id)
            if not s:
                return []
            project_id = s.project_id

        rituals = await self.list_by_project(project_id)
        sprint_rituals = [r for r in rituals if r.trigger == RitualTrigger.EVERY_SPRINT]

        selected_rituals = await self._apply_group_selection(
            sprint_rituals, sprint_id, advance_round_robin=True
        )

        if selected_rituals:
            # Update sprint limbo flag
            oxyde_sprint = await OxydeSprint.objects.get_or_none(id=sprint_id)
            if oxyde_sprint:
                oxyde_sprint.limbo = True
                await oxyde_sprint.save()
            return selected_rituals
        return []

    async def get_issues_with_pending_gates(self, project_id: str) -> list[dict]:
        """Get issues in limbo — waiting for GATE ritual approval."""
        from app.oxyde_models.project import OxydeProject
        project = await OxydeProject.objects.get_or_none(id=project_id)
        if not project:
            return []

        limbo_records = await self._get_pending_gate_limbo_records(project_id)
        if not limbo_records:
            return []

        issues_map: dict[str, dict] = {}
        for limbo, issue, ritual, requested_by in limbo_records:
            if issue.id not in issues_map:
                issues_map[issue.id] = {
                    "issue_id": issue.id,
                    "identifier": issue.identifier,
                    "title": issue.title,
                    "status": issue.status.value if issue.status else issue.status,
                    "project_id": project_id,
                    "project_name": project.name,
                    "pending_gates": [],
                }

            issues_map[issue.id]["pending_gates"].append({
                "ritual_id": ritual.id,
                "ritual_name": ritual.name,
                "ritual_prompt": ritual.prompt,
                "trigger": ritual.trigger.value,
                "limbo_type": self._resolve_limbo_type(limbo.limbo_type),
                "requested_by_name": requested_by.name if requested_by else "Unknown",
                "requested_at": limbo.requested_at.isoformat() if limbo.requested_at else None,
            })

        return list(issues_map.values())

    @staticmethod
    def _resolve_limbo_type(val) -> str | None:
        """Convert limbo_type to its value string, handling enum/name/value inputs."""
        if val is None:
            return None
        if isinstance(val, LimboType):
            return val.value
        # Try by name first (e.g. "CLOSE"), then by value (e.g. "close")
        try:
            return LimboType[val].value
        except KeyError:
            try:
                return LimboType(val).value
            except ValueError:
                return str(val)

    async def _get_pending_gate_limbo_records(self, project_id: str):
        """Get uncleared limbo records for a project."""
        try:
            await self._cleanup_orphaned_ticket_limbo(project_id)
        except Exception:
            logger.exception(
                "Failed to cleanup orphaned limbo records for project=%s",
                project_id,
            )

        from app.oxyde_models.user import OxydeUser

        # Get all issues in this project that aren't done/canceled
        done_statuses = {IssueStatus.DONE, IssueStatus.CANCELED}
        issues = await OxydeIssue.objects.filter(project_id=project_id).all()
        active_issues = {i.id: i for i in issues if i.status not in done_statuses}

        if not active_issues:
            return []

        # Get active rituals for this project
        active_rituals = {r.id: r for r in await OxydeRitual.objects.filter(
            project_id=project_id, is_active=True
        ).all()}

        # Get uncleared limbo records
        results = []
        for issue_id in active_issues:
            limbo_records = await OxydeTicketLimbo.objects.filter(
                issue_id=issue_id, cleared_at=None,
            ).all()
            for limbo in limbo_records:
                if limbo.ritual_id not in active_rituals:
                    continue
                issue = active_issues[issue_id]
                ritual = active_rituals[limbo.ritual_id]
                requested_by = await OxydeUser.objects.get_or_none(id=limbo.requested_by_id)
                results.append((limbo, issue, ritual, requested_by))

        return results

    async def get_issues_with_pending_approvals(self, project_id: str) -> list[dict]:
        """Get issues with any pending human action — GATE or REVIEW rituals."""
        from app.oxyde_models.project import OxydeProject
        from app.oxyde_models.user import OxydeUser

        project = await OxydeProject.objects.get_or_none(id=project_id)
        if not project:
            return []

        issues_map: dict[str, dict] = {}

        def _ensure_issue(issue_id, issue):
            if issue_id not in issues_map:
                issues_map[issue_id] = {
                    "issue_id": issue.id,
                    "identifier": issue.identifier,
                    "title": issue.title,
                    "status": issue.status.value if issue.status else issue.status,
                    "project_id": project_id,
                    "project_name": project.name,
                    "pending_approvals": [],
                }

        # 1. GATE rituals from TicketLimbo
        for limbo, issue, ritual, requested_by in await self._get_pending_gate_limbo_records(project_id):
            _ensure_issue(issue.id, issue)
            issues_map[issue.id]["pending_approvals"].append({
                "ritual_id": ritual.id,
                "ritual_name": ritual.name,
                "ritual_prompt": ritual.prompt,
                "trigger": ritual.trigger.value,
                "approval_mode": "gate",
                "limbo_type": self._resolve_limbo_type(limbo.limbo_type),
                "requested_by_name": requested_by.name if requested_by else "Unknown",
                "requested_at": limbo.requested_at.isoformat() if limbo.requested_at else None,
                "attestation_note": None,
            })

        # 2. REVIEW rituals from attestations (unapproved, for issues in this project)
        done_statuses = {IssueStatus.DONE, IssueStatus.CANCELED}
        review_rituals = await OxydeRitual.objects.filter(
            project_id=project_id,
            approval_mode=ApprovalMode.REVIEW.name,  # .name for filter
            is_active=True,
        ).all()

        for ritual in review_rituals:
            # Get unapproved attestations for this ritual with issue_id set
            attestations = await OxydeRitualAttestation.objects.filter(
                ritual_id=ritual.id, approved_at=None,
            ).all()
            for att in attestations:
                if not att.issue_id:
                    continue
                issue = await OxydeIssue.objects.get_or_none(id=att.issue_id)
                if not issue or issue.project_id != project_id:
                    continue
                if issue.status in done_statuses:
                    continue
                _ensure_issue(issue.id, issue)
                attester = await OxydeUser.objects.get_or_none(id=att.attested_by) if att.attested_by else None
                issues_map[issue.id]["pending_approvals"].append({
                    "ritual_id": ritual.id,
                    "ritual_name": ritual.name,
                    "ritual_prompt": ritual.prompt,
                    "trigger": ritual.trigger.value,
                    "approval_mode": "review",
                    "limbo_type": None,
                    "requested_by_name": attester.name if attester else "Unknown",
                    "requested_at": att.attested_at.isoformat() if att.attested_at else None,
                    "attestation_note": att.note,
                })

        return list(issues_map.values())

    async def list_attestation_history(
        self, project_id: str, skip: int = 0, limit: int = 50
    ) -> list[dict]:
        """List attestation history for a project, newest first.

        Returns dicts instead of ORM objects since the route needs
        to access related objects (ritual, sprint, issue, attester, approver).
        """
        from app.oxyde_models.user import OxydeUser

        # Get all ritual IDs for this project
        rituals = await OxydeRitual.objects.filter(project_id=project_id).all()
        ritual_map = {r.id: r for r in rituals}

        if not ritual_map:
            return []

        # Get attestations for these rituals with FK joins
        all_attestations = []
        for ritual_id in ritual_map:
            atts = await OxydeRitualAttestation.objects.join(
                "ritual", "sprint", "issue"
            ).filter(ritual_id=ritual_id).all()
            all_attestations.extend(atts)

        # Sort by attested_at descending
        all_attestations.sort(key=lambda a: a.attested_at or datetime.min.replace(tzinfo=timezone.utc), reverse=True)

        # Apply pagination
        paginated = all_attestations[skip:skip + limit]

        # Build rich response dicts — attester/approver are raw string IDs, load manually
        results = []
        for att in paginated:
            attester = await OxydeUser.objects.get_or_none(id=att.attested_by) if att.attested_by else None
            approver = await OxydeUser.objects.get_or_none(id=att.approved_by) if att.approved_by else None

            att.attester = attester
            att.approver = approver
            results.append(att)

        return results
