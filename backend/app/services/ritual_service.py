"""Ritual service for managing rituals and attestations."""
import json
import logging
import random
from datetime import datetime, timezone

from oxyde import IntegrityError, atomic

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
        self, ritual: "OxydeRitual", issue_id: str, issue: "OxydeIssue | None" = None,
    ) -> None:
        """For RANDOM_ONE/ROUND_ROBIN groups, only the selected ritual
        may be attested.

        Mirrors the listing logic in `_apply_group_selection` exactly:
        same set of siblings (`group=ritual.group_id`, `is_active=True`,
        and — for the RANDOM_ONE path — the same `_evaluate_conditions`
        filter the listing applies). Without this mirroring, the seeded
        random pick can diverge between listing and validate, causing
        the service to reject the very ritual the listing offered.
        """
        if not ritual.group_id:
            return
        group = await OxydeRitualGroup.objects.get_or_none(id=ritual.group_id)
        if group is None:
            return
        if group.selection_mode == SelectionMode.PERCENTAGE:
            # Independent rolls per ritual; selection is per-ritual, not per-group.
            return

        siblings = await OxydeRitual.objects.filter(
            group_id=group.id, is_active=True,
        ).all()
        if not siblings:
            return

        if group.selection_mode == SelectionMode.RANDOM_ONE:
            # Listing filters by _evaluate_conditions. To match, fetch
            # the issue (with labels prefetched, since conditions can
            # reference labels) and apply the same filter here.
            if issue is None:
                issue = await OxydeIssue.objects.prefetch("labels").filter(
                    id=issue_id,
                ).first()
            if issue is not None:
                siblings = [s for s in siblings if self._evaluate_conditions(s, issue)]
            if not siblings:
                # Listing would have produced nothing — nothing to
                # validate against. Allow the attestation through to
                # avoid false rejection on a degenerate group.
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
            # Listing returns sorted_rituals[(i+1) % N] where i is the
            # index of last_selected_ritual_id (or 0 if unset). Mirror
            # that here so we accept the same ritual the listing
            # presented. Without this match, once a single advance has
            # fired (e.g. via a sprint-context call sharing the group),
            # validate rejects the very ritual the listing offers.
            sorted_rituals = sorted(siblings, key=lambda r: r.created_at)
            current_index = 0
            if group.last_selected_ritual_id:
                for i, r in enumerate(sorted_rituals):
                    if r.id == group.last_selected_ritual_id:
                        current_index = (i + 1) % len(sorted_rituals)
                        break
            picked = sorted_rituals[current_index]
            if picked.id != ritual.id:
                raise ValueError(
                    f"Ritual '{ritual.name}' is not the selected ritual in "
                    f"group '{group.name}'; choose '{picked.name}' instead."
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

    async def delete(self, ritual: OxydeRitual, deleted_by_id: str | None = None) -> None:
        """Soft-delete a ritual by marking it inactive.

        Open intents blocked by this ritual are explicitly released with
        an audit trail (INTENT_CANCELED), not silently orphaned: the
        deleted ritual would otherwise vanish from pending lists while
        the limbo row stayed open forever. Scrub semantics — no
        auto-transition fires; the user re-attempts.
        """
        from app.oxyde_models.issue import OxydeTicketLimbo, OxydeTicketLimboBlocker

        now = datetime.now(timezone.utc)
        # All-or-nothing: deactivation and blocker release commit together.
        # A crash between them would otherwise leave an inactive ritual
        # holding an open blocker that no pending list shows and that the
        # orphan cleanup (which requires an approved attestation) can
        # never recover.
        async with atomic():
            ritual.is_active = False
            await ritual.save(update_fields={"is_active"})

            blockers = await OxydeTicketLimboBlocker.objects.filter(
                ritual_id=ritual.id, resolved_at=None,
            ).all()
            for blocker in blockers:
                intent = await OxydeTicketLimbo.objects.get_or_none(id=blocker.limbo_id)
                if intent is None or intent.cleared_at is not None:
                    continue
                # Conditional update: a concurrent gate-complete/approve
                # resolving the same blocker wins; don't clobber its
                # attribution.
                resolved = await OxydeTicketLimboBlocker.objects.filter(
                    id=blocker.id, resolved_at=None,
                ).update(resolved_at=now, resolved_by_id=deleted_by_id)
                if not resolved:
                    continue

                remaining = await OxydeTicketLimboBlocker.objects.filter(
                    limbo_id=intent.id, resolved_at=None,
                ).all()
                if remaining:
                    continue
                intent.cleared_at = now
                intent.cleared_by_id = deleted_by_id
                await intent.save(update_fields={"cleared_at", "cleared_by_id"})
                await OxydeIssueActivity.objects.create(
                    issue_id=intent.issue_id,
                    user_id=deleted_by_id or intent.requested_by_id,
                    activity_type=ActivityType.INTENT_CANCELED,
                    new_value=f"ritual '{ritual.name}' deleted",
                )

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

        # Broadcast issue-level attest. Emitted here (not just at the API
        # layer) so internal callers are observable too — same doctrine as
        # the other intent-lifecycle events.
        try:
            from app.websocket import broadcast_attestation_event
            from app.oxyde_models.project import OxydeProject as _OP
            project = await _OP.objects.get_or_none(id=issue.project_id)
            if project is not None:
                await broadcast_attestation_event(
                    project.team_id,
                    "ritual_attested",
                    {
                        "ritual_id": ritual_id,
                        "ritual_name": ritual_name,
                        "issue_id": issue_id,
                        "attestation_id": attestation.id,
                    },
                )
        except Exception:
            logger.exception(
                "Failed to broadcast ritual_attested for issue=%s", issue_id,
            )

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

        # REVIEW mode: this attestation now needs an admin's approval --
        # fan out an inbox entry (CHT-1250). No email (CHT-1251 is
        # gate-requests + invitations only).
        if ritual.approval_mode == ApprovalMode.REVIEW:
            try:
                await self._notify_review_requested(ritual, issue, user_id)
            except Exception:
                logger.exception(
                    "Failed to write review-requested inbox entries for "
                    "ritual=%s issue=%s", ritual_id, issue_id,
                )

        return attestation

    async def _notify_review_requested(self, ritual: "OxydeRitual", issue: "OxydeIssue", attested_by_id: str) -> None:
        """CHT-1250: fan a review_requested inbox entry out to every team
        admin now that `ritual` has been attested on `issue`.
        """
        from app.oxyde_models.project import OxydeProject as _OP
        from app.services.inbox_service import InboxService
        from app.services.user_service import UserService

        project = await _OP.objects.get_or_none(id=issue.project_id)
        if project is None:
            return
        attester = await UserService().get_by_id(attested_by_id) if attested_by_id else None
        await InboxService().notify_review_requested(
            ritual=ritual, issue=issue, project=project,
            attested_by_name=attester.name if attester else "Someone",
        )

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

        Wrapped in `async with atomic():` so a concurrent claim/close
        attempt cannot steal the intent slot between our SELECT and
        INSERT. If a real intent appears mid-flight, the IntegrityError
        on our INSERT triggers an in-transaction re-check; we treat
        the resulting state as "had_prior_intent" so the caller's
        legitimate auto-transition can fire.
        """
        from app.oxyde_models.issue import OxydeTicketLimboBlocker

        if ritual.trigger == RitualTrigger.TICKET_CLAIM:
            limbo_type = LimboType.CLAIM
        elif ritual.trigger == RitualTrigger.TICKET_CLOSE:
            limbo_type = LimboType.CLOSE
        else:
            return

        # Decision rule for had_prior_intent:
        #   * had_prior_intent = True  iff a blocker for OUR ritual was
        #     already registered under an open intent at attest time.
        #     That's the only definitive signal that someone else
        #     EXPRESSED intent involving this ritual (via the
        #     status-update path in _open_intent_with_limbo).
        #   * had_prior_intent = False otherwise — including when an
        #     audit-only intent (or another user's intent for a
        #     different ritual) happens to be open. Standalone attests
        #     don't fire transitions through other people's intents.
        had_prior_intent = False

        # Whole audit lifecycle inside one atomic block: create the
        # audit intent, attach our blocker, immediately resolve and
        # close. By commit time the audit intent is already cleared and
        # invisible to any future SELECT … cleared_at IS NULL — so it
        # can't lock out a legitimate claim/close, and it can't be
        # mistaken for a real intent by a concurrent peer attest.
        now = datetime.now(timezone.utc)
        async with atomic():
            existing_intent = await OxydeTicketLimbo.objects.filter(
                issue_id=issue_id,
                limbo_type=limbo_type.name,
                cleared_at=None,
            ).first()

            if existing_intent is not None:
                # Real or peer-audit intent. Only flip
                # had_prior_intent if our ritual was already a blocker
                # under this intent — that proves an
                # _open_intent_with_limbo path put it there. Otherwise
                # treat as audit (peer's intent doesn't grant ours).
                existing_blocker = await OxydeTicketLimboBlocker.objects.filter(
                    limbo_id=existing_intent.id,
                    ritual_id=ritual.id,
                ).first()
                had_prior_intent = existing_blocker is not None and existing_blocker.resolved_at is None
                if existing_blocker is None:
                    try:
                        new_blocker = await OxydeTicketLimboBlocker.objects.create(
                            limbo_id=existing_intent.id,
                            ritual_id=ritual.id,
                        )
                        # If we joined a peer's intent, resolve our
                        # blocker right here so we don't leave the
                        # peer's intent dangling on our ritual.
                        new_blocker.resolved_at = now
                        new_blocker.resolved_by_id = user_id
                        await new_blocker.save(update_fields={"resolved_at", "resolved_by_id"})
                    except IntegrityError:
                        pass
                elif existing_blocker.resolved_at is None and not had_prior_intent:
                    # Existing blocker but already resolved? Shouldn't
                    # happen given the filter above, but defensive.
                    pass
            else:
                # No intent open. Create audit intent + blocker, both
                # immediately resolved/cleared so they never expose an
                # exclusive-lock window or mislead a peer.
                try:
                    audit_intent = await OxydeTicketLimbo.objects.create(
                        issue_id=issue_id,
                        limbo_type=limbo_type.name,
                        requested_by_id=user_id,
                    )
                    audit_blocker = await OxydeTicketLimboBlocker.objects.create(
                        limbo_id=audit_intent.id,
                        ritual_id=ritual.id,
                    )
                    audit_blocker.resolved_at = now
                    audit_blocker.resolved_by_id = user_id
                    await audit_blocker.save(update_fields={"resolved_at", "resolved_by_id"})
                    audit_intent.cleared_at = now
                    audit_intent.cleared_by_id = user_id
                    await audit_intent.save(update_fields={"cleared_at", "cleared_by_id"})
                except IntegrityError:
                    # A real claim/close just opened in another tx
                    # before our INSERT could land. Re-check inside
                    # this transaction — if its blocker for our
                    # ritual is already there, we've genuinely racing
                    # past a real intent and should fire.
                    rechecked = await OxydeTicketLimbo.objects.filter(
                        issue_id=issue_id,
                        limbo_type=limbo_type.name,
                        cleared_at=None,
                    ).first()
                    if rechecked is not None:
                        rechecked_blocker = await OxydeTicketLimboBlocker.objects.filter(
                            limbo_id=rechecked.id,
                            ritual_id=ritual.id,
                        ).first()
                        had_prior_intent = (
                            rechecked_blocker is not None
                            and rechecked_blocker.resolved_at is None
                        )

        # Outside the atomic: if a real prior intent existed, fire the
        # one-step auto-transition through _clear_ticket_limbo (which
        # may emit broadcasts via apply_intent_transition). The audit
        # path needs no further work — it's already closed.
        if had_prior_intent:
            await self._clear_ticket_limbo(
                ritual, issue_id, user_id, fire_transition=True,
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
            await self._clear_ticket_limbo(ritual, issue_id, user_id)
        except Exception:
            logger.exception(
                "Failed to clear ticket limbo for ritual=%s issue=%s",
                ritual_id, issue_id,
            )

        # CHT-1250: the gate just got completed -- no one is "awaiting" it
        # anymore, so resolve every admin's gate_pending inbox entry for it.
        try:
            from app.services.inbox_service import InboxService
            await InboxService().resolve_gate_or_review(ritual_id=ritual_id, issue_id=issue_id)
        except Exception:
            logger.exception(
                "Failed to resolve gate-pending inbox entries for ritual=%s issue=%s",
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

    @staticmethod
    async def _approve_atomic(
        attestation: OxydeRitualAttestation, approver_id: str
    ) -> None:
        """Compare-and-set approval: a single conditional UPDATE guarded
        by `approved_at IS NULL`. The instance-level check in
        `_validate_approve_mode_and_pending` is only a fast-path guard —
        two concurrent approvers both pass it, so the DB write must be
        the serializer. The loser matches zero rows and gets the same
        already-approved error.
        """
        now = datetime.now(timezone.utc)
        updated = await OxydeRitualAttestation.objects.filter(
            id=attestation.id, approved_at=None,
        ).update(approved_by=approver_id, approved_at=now)
        if not updated:
            raise ValueError(
                "Attestation is already approved; cannot approve again."
            )
        attestation.approved_by = approver_id
        attestation.approved_at = now

    async def approve(
        self, attestation: OxydeRitualAttestation, approver_id: str
    ) -> OxydeRitualAttestation:
        """Approve a sprint-level REVIEW ritual attestation."""
        ritual = await self._validate_approve_mode_and_pending(
            attestation, expected_trigger=RitualTrigger.EVERY_SPRINT,
        )

        await self._approve_atomic(attestation, approver_id)

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

        await self._approve_atomic(attestation, approver_id)

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
            await self._clear_ticket_limbo(ritual, issue_id, approver_id)
        except Exception:
            logger.exception(
                "Failed to clear ticket limbo for ritual=%s issue=%s",
                ritual_id, issue_id,
            )

        # CHT-1250: the review just got approved -- resolve every admin's
        # review_requested inbox entry for it.
        try:
            from app.services.inbox_service import InboxService
            await InboxService().resolve_gate_or_review(ritual_id=ritual_id, issue_id=issue_id)
        except Exception:
            logger.exception(
                "Failed to resolve review-requested inbox entries for ritual=%s issue=%s",
                ritual_id, issue_id,
            )

        return attestation

    async def _clear_ticket_limbo(
        self, ritual: "OxydeRitual", issue_id: str, cleared_by_id: str,
        fire_transition: bool = True,
    ) -> None:
        """Resolve the blocker for a (ritual, issue) intent. If that was
        the last unresolved blocker on the parent intent, mark the
        intent cleared and fire the one-step auto-transition.

        Takes the ritual object directly (callers always have it in
        scope) to avoid an extra DB round-trip and to surface
        post-deletion races as a logged warning rather than a silent
        no-op.

        Scoped by `ritual.trigger`: a TICKET_CLAIM ritual can only
        resolve blockers under CLAIM intents; a TICKET_CLOSE ritual can
        only resolve blockers under CLOSE intents. Without this scope,
        a single attest could collapse both a CLOSE and a CLAIM intent
        if they happened to share the gating ritual.

        fire_transition=False is used by callers that want pure
        blocker resolution without triggering the status update —
        notably the standalone-attest path where the user never
        expressed intent.
        """
        from app.oxyde_models.issue import OxydeTicketLimboBlocker

        if ritual is None:
            logger.warning(
                "_clear_ticket_limbo invoked with None ritual for issue=%s",
                issue_id,
            )
            return
        ritual_id = ritual.id

        if ritual.trigger == RitualTrigger.TICKET_CLAIM:
            expected_limbo_type = LimboType.CLAIM.name
        elif ritual.trigger == RitualTrigger.TICKET_CLOSE:
            expected_limbo_type = LimboType.CLOSE.name
        else:
            return

        # Find unresolved blockers for this ritual under open intents
        # of the matching type. Multi-intent scenarios on the same
        # issue (e.g. CLOSE intent followed by CLAIM intent on a
        # re-opened ticket) stay isolated because we filter by
        # `expected_limbo_type`.
        open_intents = await OxydeTicketLimbo.objects.filter(
            issue_id=issue_id,
            limbo_type=expected_limbo_type,
            cleared_at=None,
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
                # Blocker progress renews the intent's freshness stamp:
                # an initiator attesting a multi-ritual gate one call
                # at a time must not lose the intent to the
                # stale-intent TTL between attests (CHT-1326, PR #261
                # review finding 2).
                intent = intents_by_id[limbo_id]
                intent.requested_at = now
                await intent.save(update_fields={"requested_at"})
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
        affected_intents: dict[str, str | None] = {}
        for blocker in unresolved_blockers:
            intent = intent_by_id[blocker.limbo_id]
            attestation = att_map.get((blocker.ritual_id, intent.issue_id))
            if attestation and attestation.approved_at is not None:
                blocker.resolved_at = now
                blocker.resolved_by_id = attestation.approved_by
                await blocker.save(update_fields={"resolved_at", "resolved_by_id"})
                cleared_count += 1
                affected_intents[intent.id] = attestation.approved_by

        # Close any intents whose blockers are now all resolved.
        for limbo_id, approved_by in affected_intents.items():
            remaining = await OxydeTicketLimboBlocker.objects.filter(
                limbo_id=limbo_id, resolved_at=None,
            ).all()
            if remaining:
                continue
            intent = intent_by_id[limbo_id]
            intent.cleared_at = now
            # Best-effort attribution: the approver of a blocker this
            # sweep resolved for the intent (not necessarily the
            # historically-final one). A user id, unlike the old literal
            # "system" which violated the FK; NULL if unknown.
            intent.cleared_by_id = approved_by
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
        """Check if project is in limbo and get pending rituals.

        Self-heals a limbo with nothing to attest (CHT-1278): a sprint
        can be flagged limbo=True with zero pending EVERY_SPRINT rituals
        -- e.g. it entered limbo via the old has_rituals-counts-any-ritual
        bug (a project with only TICKET_CLOSE/TICKET_CLAIM rituals), or
        every sprint ritual was attested/approved without any caller
        happening to re-check afterward. Either way there is nothing
        left to gate on, so this read path clears it via the same
        `_maybe_clear_limbo` the attest/approve paths already call --
        reusing that rule rather than re-implementing it here. This
        means a stuck sprint recovers loudly on the very next status
        check (`GET /rituals/limbo`, `chaotic ritual pending`, etc.)
        instead of requiring force-clear-limbo.
        """
        limbo_sprint = await OxydeSprint.objects.filter(
            project_id=project_id, limbo=True,
        ).first()

        if not limbo_sprint:
            return False, None, []

        pending = await self.get_pending_rituals(project_id, limbo_sprint.id)
        if not pending:
            logger.warning(
                "Sprint %s (project %s) was in limbo with zero pending "
                "sprint rituals; self-healing by completing limbo "
                "(CHT-1278).",
                limbo_sprint.id, project_id,
            )
            try:
                await self._maybe_clear_limbo(limbo_sprint.id)
            except Exception:
                # Same wrap as the attest/gate-complete callers. If the
                # heal itself fails, report the real limbo state instead
                # of raising: every ritual endpoint (including
                # force-clear-limbo, the recovery path of last resort)
                # calls check_limbo first, and an unhandled error here
                # would 500 them all -- bricking the escape hatch behind
                # the very mutation that's failing (PR #223 review).
                logger.exception(
                    "Self-heal failed for limbo sprint=%s (project %s); "
                    "reporting limbo as-is so force-clear-limbo can still "
                    "reach complete_limbo directly.",
                    limbo_sprint.id, project_id,
                )
                return True, limbo_sprint, []
            return False, None, []

        return True, limbo_sprint, pending

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

        # Function name and caller (`get_issues_with_pending_approvals`,
        # which hardcodes `approval_mode: "gate"` on every emitted
        # payload) require GATE-only scoping. Pre-refactor only GATE
        # rituals created limbo rows so the filter was implicit;
        # post-refactor AUTO and REVIEW intents also create blockers,
        # so the filter must be explicit here to avoid mislabeling
        # REVIEW (and transient AUTO) blockers as GATE in the API.
        active_rituals = {r.id: r for r in await OxydeRitual.objects.filter(
            project_id=project_id,
            is_active=True,
            # DbEnum columns store .name; a raw enum member binds its
            # .value ('gate') and matches nothing.
            approval_mode=ApprovalMode.GATE.name,
        ).all()}

        # Get uncleared limbo records and their unresolved blockers,
        # batched to keep this O(constant) DB round-trips regardless of
        # the number of issues / blockers in the project.
        from app.oxyde_models.issue import OxydeTicketLimboBlocker

        all_intents = await OxydeTicketLimbo.objects.filter(
            issue_id__in=list(active_issues), cleared_at=None,
        ).all()
        if not all_intents:
            return []

        intent_ids = [i.id for i in all_intents]
        all_blockers = await OxydeTicketLimboBlocker.objects.filter(
            limbo_id__in=intent_ids, resolved_at=None,
        ).all()
        if not all_blockers:
            return []

        user_ids = list({i.requested_by_id for i in all_intents})
        users = {
            u.id: u
            for u in await OxydeUser.objects.filter(id__in=user_ids).all()
        }
        intent_by_id = {i.id: i for i in all_intents}

        results = []
        for blocker in all_blockers:
            if blocker.ritual_id not in active_rituals:
                continue
            intent = intent_by_id[blocker.limbo_id]
            issue = active_issues.get(intent.issue_id)
            if issue is None:
                continue
            ritual = active_rituals[blocker.ritual_id]
            requested_by = users.get(intent.requested_by_id)
            results.append((intent, issue, ritual, requested_by))

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
