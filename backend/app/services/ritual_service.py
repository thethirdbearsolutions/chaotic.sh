"""Ritual service for managing rituals and attestations."""
import json
import logging
import random
from datetime import datetime, timezone

from oxyde import IntegrityError

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
from app.oxyde_models.user import OxydeUser


class RitualService:
    """Service for ritual operations."""

    def __init__(self, db=None):
        self.db = db  # Kept for API compat during transition; not used by Oxyde

    # ------------------------------------------------------------------
    # Service-layer validation helpers. These run regardless of caller
    # (HTTP API, internal task, future webhook) so the API layer is not
    # the only enforcement boundary.
    # ------------------------------------------------------------------

    @staticmethod
    def _validate_note(ritual: "OxydeRitual", note: str | None) -> None:
        """Reject empty/whitespace-only notes when the ritual requires one.
        Applies to all attestation/completion paths, not just attest.
        """
        if ritual.note_required and not (note and note.strip()):
            raise ValueError(
                f"Ritual '{ritual.name}' requires a note. "
                f"Prompt: {ritual.prompt}"
            )

    async def _validate_not_agent_for_gate(
        self, ritual: "OxydeRitual", user_id: str
    ) -> None:
        """GATE rituals can only be performed by humans. The is_agent
        check lives at the service layer so internal callers (background
        tasks, future webhooks) can't bypass the human-only invariant.
        """
        if ritual.approval_mode != ApprovalMode.GATE:
            return
        user = await OxydeUser.objects.get_or_none(id=user_id)
        if user is not None and user.is_agent:
            raise ValueError(
                f"Ritual '{ritual.name}' is GATE mode and requires a human. "
                f"Agents cannot attest or complete GATE rituals."
            )

    async def _validate_conditions_match(
        self, ritual: "OxydeRitual", issue: "OxydeIssue"
    ) -> None:
        """Re-evaluate ritual conditions against the issue at attest time.
        Listing-time selection is advisory; this is enforcement.
        """
        if not ritual.conditions:
            return
        # _evaluate_conditions is a sync method that returns bool; do NOT await.
        if not self._evaluate_conditions(ritual, issue):
            raise ValueError(
                f"Ritual '{ritual.name}' conditions do not match issue "
                f"{issue.identifier}; cannot attest."
            )

    async def _validate_group_selection(
        self, ritual: "OxydeRitual", issue_id: str
    ) -> None:
        """For RANDOM_ONE/ROUND_ROBIN groups, only the selected ritual
        may be attested.

        For RANDOM_ONE we recompute the selection here using the same
        per-issue seed that `_apply_group_selection` uses at listing
        time (the issue_id), so the validation is deterministic without
        depending on `last_selected_ritual_id` being persisted (which
        `_select_random_one` does NOT do).

        For ROUND_ROBIN we trust `last_selected_ritual_id`, which
        `_select_round_robin` persists when invoked with `advance=True`.
        """
        if not ritual.group_id:
            return
        group = await OxydeRitualGroup.objects.get_or_none(id=ritual.group_id)
        if group is None:
            return
        if group.selection_mode == SelectionMode.PERCENTAGE:
            # Independent rolls per ritual; selection is per-ritual, not per-group.
            return
        if group.selection_mode == SelectionMode.RANDOM_ONE:
            # Recompute the seed-determined pick across all active
            # rituals in the group. Mirrors the logic in
            # `_apply_group_selection`.
            siblings = await OxydeRitual.objects.filter(
                group=group, is_active=True,
            ).all()
            if not siblings:
                return
            picked = self._select_random_one(siblings, seed=issue_id)
            if picked is not None and picked.id != ritual.id:
                raise ValueError(
                    f"Ritual '{ritual.name}' is not the selected ritual in "
                    f"group '{group.name}' for this issue; choose '"
                    f"{picked.name}' instead."
                )
            return
        if group.selection_mode == SelectionMode.ROUND_ROBIN:
            selected_id = group.last_selected_ritual_id
            if selected_id and selected_id != ritual.id:
                raise ValueError(
                    f"Ritual '{ritual.name}' is not the selected ritual in "
                    f"group '{group.name}'; choose the selected ritual instead."
                )

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
        await group.save(update_fields=set(update_data.keys()))
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
            await group.save(update_fields={"last_selected_ritual_id"})

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

        await self._validate_not_agent_for_gate(ritual, user_id)
        if ritual.approval_mode == ApprovalMode.GATE:
            raise ValueError(
                f"Ritual '{ritual.name}' is GATE mode. "
                "Use complete_gate_ritual to perform it."
            )
        self._validate_note(ritual, note)

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
        except IntegrityError:
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

        # Broadcast sprint attest. Sprint-level events were silent before;
        # without this, frontends and the agent await primitive can't see
        # them.
        await self._broadcast_sprint_event(
            ritual, sprint_id, "ritual_attested",
            {"ritual_id": ritual.id, "ritual_name": ritual.name,
             "sprint_id": sprint_id, "attestation_id": attestation.id},
        )

        return attestation

    async def _broadcast_sprint_event(
        self, ritual: OxydeRitual, sprint_id: str,
        event_type: str, payload: dict,
    ) -> None:
        """Broadcast a sprint-level attestation event. Best-effort."""
        try:
            from app.oxyde_models.project import OxydeProject as _OP
            from app.websocket import broadcast_attestation_event
            project = await _OP.objects.get_or_none(id=ritual.project_id)
            if project is None:
                return
            await broadcast_attestation_event(
                project.team_id, event_type, payload,
            )
        except Exception:
            logger.exception(
                "Failed to broadcast sprint event %s for ritual=%s sprint=%s",
                event_type, ritual.id, sprint_id,
            )

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

        # Prefetch labels so _validate_conditions_match can evaluate
        # `labels__contains` / `labels__eq` rules without silently
        # treating issue.labels as empty.
        issue = await OxydeIssue.objects.prefetch("labels").filter(id=issue_id).first()
        if not issue:
            raise ValueError(f"Issue '{issue_id}' not found")
        if ritual.project_id != issue.project_id:
            raise ValueError(
                f"Ritual '{ritual.name}' does not belong to the same project as the issue"
            )

        # Attest is decoupled from the gate: the gate fires at the actual
        # status transition (in IssueService), so attestation is allowed
        # in any status — including retroactive record-keeping after the
        # transition already occurred. The trigger names express intent
        # (which rituals to list when), not enforcement at attest time.
        await self._validate_not_agent_for_gate(ritual, user_id)
        if ritual.approval_mode == ApprovalMode.GATE:
            # Humans use complete_gate_ritual_for_issue, which both attests
            # and approves in one step. Direct attest on a GATE ritual is
            # the wrong entry point — route the caller to the right path.
            raise ValueError(
                f"Ritual '{ritual.name}' is GATE mode. "
                "Use complete_gate_ritual_for_issue to perform it."
            )
        self._validate_note(ritual, note)
        await self._validate_conditions_match(ritual, issue)
        await self._validate_group_selection(ritual, issue_id)

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
        except IntegrityError:
            existing = await self.get_issue_attestation(ritual_id, issue_id)
            if existing:
                return existing
            raise

        # AUTO attestation is also approval — it clears limbo (and may fire
        # the one-step auto-transition if it's the last block). If there's
        # no existing limbo (standalone attest with no prior intent
        # expression), ensure one exists so the state-machine event has an
        # audit row, then clear it.
        if ritual.approval_mode == ApprovalMode.AUTO:
            try:
                await self._ensure_and_clear_limbo_for_attest(
                    ritual, issue_id, user_id,
                )
            except Exception:
                logger.exception(
                    "Failed to clear ticket limbo after AUTO attest "
                    "ritual=%s issue=%s", ritual_id, issue_id,
                )

        return attestation

    async def _ensure_and_clear_limbo_for_attest(
        self, ritual: OxydeRitual, issue_id: str, user_id: str,
    ) -> None:
        """For AUTO attestations: guarantee a blocker audit row exists
        for this (ritual, issue) under an intent of the right type,
        then resolve it. Covers both normal flow (intent opened by
        status update) and standalone attest (no prior intent — a
        single-blocker audit-only intent is created here).

        Standalone attest MUST NOT trigger the one-step auto-transition:
        the user never expressed intent. We detect "no prior intent"
        and pass fire_transition=False through `_clear_ticket_limbo`.
        """
        from app.oxyde_models.issue import OxydeTicketLimboBlocker

        if ritual.trigger == RitualTrigger.TICKET_CLAIM:
            limbo_type = LimboType.CLAIM
        elif ritual.trigger == RitualTrigger.TICKET_CLOSE:
            limbo_type = LimboType.CLOSE
        else:
            return

        # Is there an existing open intent of this type that already has
        # a blocker for our ritual? If so, we're in normal flow —
        # resolving that blocker should fire the transition.
        existing_intent = await OxydeTicketLimbo.objects.filter(
            issue_id=issue_id,
            limbo_type=limbo_type.name,
            cleared_at=None,
        ).first()

        had_prior_intent = False
        if existing_intent is not None:
            existing_blocker = await OxydeTicketLimboBlocker.objects.filter(
                limbo_id=existing_intent.id,
                ritual_id=ritual.id,
                resolved_at=None,
            ).first()
            had_prior_intent = existing_blocker is not None
            if existing_blocker is None:
                # Intent exists but for a different blocker set; add
                # ours so the audit log records this attestation.
                try:
                    await OxydeTicketLimboBlocker.objects.create(
                        limbo_id=existing_intent.id,
                        ritual_id=ritual.id,
                    )
                except IntegrityError:
                    pass
        else:
            # No open intent. Create an audit-only intent + blocker pair.
            try:
                audit_intent = await OxydeTicketLimbo.objects.create(
                    issue_id=issue_id,
                    limbo_type=limbo_type.name,
                    requested_by_id=user_id,
                )
                await OxydeTicketLimboBlocker.objects.create(
                    limbo_id=audit_intent.id,
                    ritual_id=ritual.id,
                )
            except IntegrityError:
                # Lost a race — another writer just opened the intent.
                # That writer has their own blockers; we don't know if
                # ours overlaps, so try to fall through with
                # fire_transition=False.
                pass

        await self._clear_ticket_limbo(
            ritual.id, issue_id, user_id, fire_transition=had_prior_intent,
        )

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

        # Prefetch labels (see attest_for_issue for rationale).
        issue = await OxydeIssue.objects.prefetch("labels").filter(id=issue_id).first()
        if not issue:
            raise ValueError(f"Issue '{issue_id}' not found")
        if ritual.project_id != issue.project_id:
            raise ValueError(
                f"Ritual '{ritual.name}' does not belong to the same project as the issue"
            )

        # Decoupled from the status gate (same reasoning as attest_for_issue).
        if ritual.approval_mode != ApprovalMode.GATE:
            raise ValueError(
                f"Ritual '{ritual.name}' is not a GATE ritual. "
                "Use attest_for_issue instead."
            )
        await self._validate_not_agent_for_gate(ritual, user_id)
        self._validate_note(ritual, note)
        await self._validate_conditions_match(ritual, issue)
        await self._validate_group_selection(ritual, issue_id)

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
        except IntegrityError:
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

    async def _validate_approve_mode_and_pending(
        self, attestation: OxydeRitualAttestation, expected_trigger: "RitualTrigger | None" = None,
    ) -> "OxydeRitual":
        """Service-layer guards for approve(): the attestation's ritual
        must be REVIEW mode (AUTO is auto-approved at write; GATE is
        approved-on-attestation), the attestation must not already be
        approved, and the trigger must match the call site (sprint vs
        issue).
        """
        if attestation.approved_at is not None:
            raise ValueError(
                "Attestation is already approved; cannot approve again."
            )
        ritual = await OxydeRitual.objects.get_or_none(id=attestation.ritual_id)
        if ritual is None:
            raise ValueError(
                f"Attestation references missing ritual {attestation.ritual_id}."
            )
        if ritual.approval_mode != ApprovalMode.REVIEW:
            raise ValueError(
                f"Ritual '{ritual.name}' is {ritual.approval_mode.value} mode; "
                "only REVIEW attestations require explicit approval."
            )
        if expected_trigger is not None and ritual.trigger != expected_trigger:
            raise ValueError(
                f"Ritual '{ritual.name}' has trigger={ritual.trigger.value}; "
                f"this approve path requires trigger={expected_trigger.value}."
            )
        return ritual

    async def approve(
        self, attestation: OxydeRitualAttestation, approver_id: str
    ) -> OxydeRitualAttestation:
        """Approve a sprint-level REVIEW ritual attestation."""
        ritual = await self._validate_approve_mode_and_pending(
            attestation, expected_trigger=RitualTrigger.EVERY_SPRINT,
        )

        attestation.approved_by = approver_id
        attestation.approved_at = datetime.now(timezone.utc)
        await attestation.save(update_fields={"approved_by", "approved_at"})

        await self._maybe_clear_limbo(attestation.sprint_id)

        await self._broadcast_sprint_event(
            ritual, attestation.sprint_id, "ritual_approved",
            {"ritual_id": ritual.id, "ritual_name": ritual.name,
             "sprint_id": attestation.sprint_id,
             "attestation_id": attestation.id},
        )

        return attestation

    async def approve_for_issue(
        self, attestation: OxydeRitualAttestation, approver_id: str
    ) -> OxydeRitualAttestation:
        """Approve a ticket-level REVIEW ritual attestation."""
        # Either ticket-level trigger is acceptable here; we allow both.
        ritual = await self._validate_approve_mode_and_pending(attestation)
        if ritual.trigger not in (
            RitualTrigger.TICKET_CLOSE, RitualTrigger.TICKET_CLAIM,
        ):
            raise ValueError(
                f"Ritual '{ritual.name}' has trigger={ritual.trigger.value}; "
                "ticket-level approve requires TICKET_CLOSE or TICKET_CLAIM."
            )

        ritual_id = attestation.ritual_id
        issue_id = attestation.issue_id

        attestation.approved_by = approver_id
        attestation.approved_at = datetime.now(timezone.utc)
        await attestation.save(update_fields={"approved_by", "approved_at"})

        # Emit RITUAL_APPROVED before clearing limbo: the approval is the
        # primary event; intent_cleared (if any) is downstream. The
        # ritual name goes in new_value, not field_name (field_name is
        # by convention an issue column name).
        try:
            await OxydeIssueActivity.objects.create(
                issue_id=issue_id,
                user_id=approver_id,
                activity_type=ActivityType.RITUAL_APPROVED,
                new_value=ritual.name,
            )
        except Exception:
            logger.exception(
                "Failed to write RITUAL_APPROVED activity for issue=%s",
                issue_id,
            )

        try:
            from app.websocket import broadcast_attestation_event
            issue = await OxydeIssue.objects.get_or_none(id=issue_id)
            project = None
            if issue is not None:
                from app.oxyde_models.project import OxydeProject as _OP
                project = await _OP.objects.get_or_none(id=issue.project_id)
            if project is not None:
                await broadcast_attestation_event(
                    project.team_id,
                    "ritual_approved",
                    {
                        "ritual_id": ritual_id,
                        "ritual_name": ritual.name,
                        "issue_id": issue_id,
                        "attestation_id": attestation.id,
                    },
                )
        except Exception:
            logger.exception(
                "Failed to broadcast ritual_approved for issue=%s", issue_id,
            )

        try:
            await self._clear_ticket_limbo(ritual_id, issue_id, approver_id)
        except Exception:
            logger.exception(
                "Failed to clear ticket limbo for ritual=%s issue=%s",
                ritual_id, issue_id,
            )

        return attestation

    async def _clear_ticket_limbo(
        self, ritual_id: str, issue_id: str, cleared_by_id: str,
        fire_transition: bool = True,
    ) -> None:
        """Resolve the blocker for a (ritual, issue) intent. If that was
        the last unresolved blocker on the parent intent, mark the
        intent cleared and fire the one-step auto-transition.

        fire_transition=False is used by callers that want pure
        blocker resolution without triggering the status update —
        notably the standalone-attest path where the user never
        expressed intent.
        """
        from app.oxyde_models.issue import OxydeTicketLimboBlocker

        # Find every unresolved blocker for this (ritual, issue) across
        # all open intents on the issue. In normal flow there's exactly
        # one, but multi-intent scenarios (e.g. CLOSE intent followed by
        # CLAIM intent on a re-opened ticket) could produce more.
        open_intents = await OxydeTicketLimbo.objects.filter(
            issue_id=issue_id, cleared_at=None,
        ).all()
        if not open_intents:
            return

        intent_ids = [i.id for i in open_intents]
        blockers = await OxydeTicketLimboBlocker.objects.filter(
            limbo_id__in=intent_ids,
            ritual_id=ritual_id,
            resolved_at=None,
        ).all()
        if not blockers:
            return

        now = datetime.now(timezone.utc)
        affected_intent_ids = set()
        for blocker in blockers:
            blocker.resolved_at = now
            blocker.resolved_by_id = cleared_by_id
            await blocker.save(update_fields={"resolved_at", "resolved_by_id"})
            affected_intent_ids.add(blocker.limbo_id)

        # For each intent we just touched a blocker on, check if any
        # blockers remain. If none, the intent is fully resolved.
        intents_by_id = {i.id: i for i in open_intents}
        for limbo_id in affected_intent_ids:
            remaining = await OxydeTicketLimboBlocker.objects.filter(
                limbo_id=limbo_id, resolved_at=None,
            ).all()
            if remaining:
                continue
            intent = intents_by_id[limbo_id]
            intent.cleared_at = now
            intent.cleared_by_id = cleared_by_id
            await intent.save(update_fields={"cleared_at", "cleared_by_id"})

            if not fire_transition:
                continue
            # Lazy import to avoid circular IssueService <-> RitualService.
            from app.services.issue_service import IssueService
            try:
                await IssueService().apply_intent_transition(
                    issue_id, intent.limbo_type, cleared_by_id,
                )
            except Exception:
                logger.exception(
                    "Auto-transition failed for issue=%s limbo_type=%s",
                    issue_id, intent.limbo_type,
                )

    async def _cleanup_orphaned_ticket_limbo(self, project_id: str) -> int:
        """Resolve orphaned blockers whose ritual is already attested
        and approved. Closes the parent intent if all blockers under it
        end up resolved. This recovers from cases where an attestation
        landed without going through `_clear_ticket_limbo` (e.g. a
        rollback or pre-refactor data).
        """
        from app.oxyde_models.issue import OxydeTicketLimboBlocker

        issues = await OxydeIssue.objects.filter(project_id=project_id).all()
        issue_ids = [i.id for i in issues]
        if not issue_ids:
            return 0

        open_intents = await OxydeTicketLimbo.objects.filter(
            issue_id__in=issue_ids, cleared_at=None,
        ).all()
        if not open_intents:
            return 0

        intent_ids = [i.id for i in open_intents]
        unresolved_blockers = await OxydeTicketLimboBlocker.objects.filter(
            limbo_id__in=intent_ids, resolved_at=None,
        ).all()
        if not unresolved_blockers:
            return 0

        intent_by_id = {i.id: i for i in open_intents}
        # For each unresolved blocker, look up an approved attestation
        # for that (ritual, issue) and resolve the blocker if found.
        ritual_ids = list({b.ritual_id for b in unresolved_blockers})
        issue_lookup = list({intent_by_id[b.limbo_id].issue_id for b in unresolved_blockers})
        attestations = await OxydeRitualAttestation.objects.filter(
            ritual_id__in=ritual_ids, issue_id__in=issue_lookup,
        ).all()
        att_map = {(a.ritual_id, a.issue_id): a for a in attestations}

        cleared_count = 0
        now = datetime.now(timezone.utc)
        affected_intents = set()
        for blocker in unresolved_blockers:
            intent = intent_by_id[blocker.limbo_id]
            attestation = att_map.get((blocker.ritual_id, intent.issue_id))
            if attestation and attestation.approved_at is not None:
                blocker.resolved_at = now
                blocker.resolved_by_id = attestation.approved_by
                await blocker.save(update_fields={"resolved_at", "resolved_by_id"})
                cleared_count += 1
                affected_intents.add(intent.id)

        # Close any intents whose blockers are now all resolved.
        for limbo_id in affected_intents:
            remaining = await OxydeTicketLimboBlocker.objects.filter(
                limbo_id=limbo_id, resolved_at=None,
            ).all()
            if remaining:
                continue
            intent = intent_by_id[limbo_id]
            intent.cleared_at = now
            intent.cleared_by_id = "system"
            await intent.save(update_fields={"cleared_at", "cleared_by_id"})

        if cleared_count:
            logger.info(
                "Cleaned up %d orphaned ticket limbo blockers for project=%s",
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
        if ritual.approval_mode != ApprovalMode.GATE:
            raise ValueError(
                f"Ritual '{ritual.name}' is not a GATE ritual. "
                "Use attest instead."
            )
        await self._validate_not_agent_for_gate(ritual, user_id)
        self._validate_note(ritual, note)

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
        except IntegrityError:
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

        await self._broadcast_sprint_event(
            ritual, sprint_id, "ritual_completed",
            {"ritual_id": ritual_id, "ritual_name": ritual.name,
             "sprint_id": sprint_id, "attestation_id": attestation.id},
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
                await oxyde_sprint.save(update_fields={"limbo"})
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

        # Get uncleared limbo records and their unresolved blockers.
        from app.oxyde_models.issue import OxydeTicketLimboBlocker

        results = []
        for issue_id in active_issues:
            limbo_records = await OxydeTicketLimbo.objects.filter(
                issue_id=issue_id, cleared_at=None,
            ).all()
            for limbo in limbo_records:
                # Each open intent may have multiple blocking rituals;
                # surface one tuple per (limbo, blocker_ritual) so
                # callers see every pending ritual.
                blockers = await OxydeTicketLimboBlocker.objects.filter(
                    limbo_id=limbo.id, resolved_at=None,
                ).all()
                for blocker in blockers:
                    if blocker.ritual_id not in active_rituals:
                        continue
                    issue = active_issues[issue_id]
                    ritual = active_rituals[blocker.ritual_id]
                    requested_by = await OxydeUser.objects.get_or_none(
                        id=limbo.requested_by_id
                    )
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
        ritual_ids = [r.id for r in rituals]

        if not ritual_ids:
            return []

        # Get all attestations for these rituals in one query with FK joins
        all_attestations = await OxydeRitualAttestation.objects.join(
            "ritual", "sprint", "issue"
        ).filter(ritual_id__in=ritual_ids).all()

        # Sort by attested_at descending
        all_attestations.sort(key=lambda a: a.attested_at or datetime.min.replace(tzinfo=timezone.utc), reverse=True)

        # Apply pagination
        paginated = all_attestations[skip:skip + limit]

        # Batch-fetch all attester/approver users in one query
        user_ids = set()
        for att in paginated:
            if att.attested_by:
                user_ids.add(att.attested_by)
            if att.approved_by:
                user_ids.add(att.approved_by)

        user_map = {}
        if user_ids:
            users = await OxydeUser.objects.filter(id__in=list(user_ids)).all()
            user_map = {u.id: u for u in users}

        results = []
        for att in paginated:
            att.attester = user_map.get(att.attested_by)
            att.approver = user_map.get(att.approved_by)
            results.append(att)

        return results
