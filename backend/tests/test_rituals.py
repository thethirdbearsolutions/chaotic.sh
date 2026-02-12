"""Tests for ritual service and API endpoints."""
import pytest
from datetime import datetime, timezone
from pydantic import ValidationError

from app.models.ritual import Ritual, RitualTrigger, ApprovalMode, RitualAttestation
from app.models.sprint import Sprint, SprintStatus
from app.models.issue import Issue
from app.services.ritual_service import RitualService
from app.services.project_service import ProjectService
from app.schemas.ritual import RitualCreate, RitualUpdate


@pytest.mark.asyncio
class TestRitualService:
    """Tests for RitualService."""

    async def test_create_ritual(self, db_session, test_project):
        """Test creating a ritual."""
        service = RitualService(db_session)
        ritual_in = RitualCreate(
            name="test-ritual",
            prompt="Test prompt",
            trigger=RitualTrigger.EVERY_SPRINT,
            approval_mode=ApprovalMode.AUTO,
        )
        ritual = await service.create(ritual_in, test_project.id)

        assert ritual.name == "test-ritual"
        assert ritual.prompt == "Test prompt"
        assert ritual.trigger == RitualTrigger.EVERY_SPRINT
        assert ritual.approval_mode == ApprovalMode.AUTO
        assert ritual.is_active is True

    async def test_create_ritual_duplicate_name(self, db_session, test_project):
        """Test that duplicate ritual names are rejected."""
        service = RitualService(db_session)
        ritual_in = RitualCreate(
            name="duplicate-ritual",
            prompt="Test prompt",
        )
        await service.create(ritual_in, test_project.id)

        # Try to create another with the same name
        with pytest.raises(ValueError, match="already exists"):
            await service.create(ritual_in, test_project.id)

    async def test_get_by_id(self, db_session, test_project):
        """Test getting ritual by ID."""
        ritual = Ritual(
            project_id=test_project.id,
            name="get-by-id-ritual",
            prompt="Prompt",
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        result = await service.get_by_id(ritual.id)
        assert result is not None
        assert result.name == "get-by-id-ritual"

    async def test_get_by_id_inactive(self, db_session, test_project):
        """Test that inactive rituals are excluded by default."""
        ritual = Ritual(
            project_id=test_project.id,
            name="inactive-ritual",
            prompt="Prompt",
            is_active=False,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        result = await service.get_by_id(ritual.id)
        assert result is None

        # But should be found with include_inactive=True
        result = await service.get_by_id(ritual.id, include_inactive=True)
        assert result is not None

    async def test_update_ritual(self, db_session, test_project):
        """Test updating a ritual."""
        ritual = Ritual(
            project_id=test_project.id,
            name="update-ritual",
            prompt="Old prompt",
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        update = RitualUpdate(prompt="New prompt", approval_mode=ApprovalMode.REVIEW)
        updated = await service.update(ritual, update)

        assert updated.prompt == "New prompt"
        assert updated.approval_mode == ApprovalMode.REVIEW

    async def test_delete_ritual(self, db_session, test_project):
        """Test soft-deleting a ritual."""
        ritual = Ritual(
            project_id=test_project.id,
            name="delete-ritual",
            prompt="Prompt",
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        await service.delete(ritual)

        # Should not be found by default
        result = await service.get_by_id(ritual.id)
        assert result is None

        # But should still exist
        result = await service.get_by_id(ritual.id, include_inactive=True)
        assert result is not None
        assert result.is_active is False


@pytest.mark.asyncio
class TestRitualGroupServiceValidation:
    """Tests for ritual group validation in service layer."""

    async def test_create_ritual_in_nonexistent_group(self, db_session, test_project):
        """Test that creating a ritual in a nonexistent group fails."""
        service = RitualService(db_session)
        ritual_in = RitualCreate(
            name="test-ritual",
            prompt="Test prompt",
            group_id="nonexistent-group-id",
        )
        with pytest.raises(ValueError, match="not found"):
            await service.create(ritual_in, test_project.id)

    async def test_create_ritual_in_other_project_group(self, db_session, test_project, test_team):
        """Test that creating a ritual in a group from another project fails."""
        from app.models.project import Project
        from app.models.ritual import RitualGroup, SelectionMode

        # Create another project
        other_project = Project(team_id=test_team.id, name="Other", key="OTH")
        db_session.add(other_project)
        await db_session.commit()
        await db_session.refresh(other_project)

        # Create group in other project
        group = RitualGroup(
            project_id=other_project.id,
            name="other-group",
            selection_mode=SelectionMode.RANDOM_ONE,
        )
        db_session.add(group)
        await db_session.commit()
        await db_session.refresh(group)

        # Try to create ritual in test_project using other_project's group
        service = RitualService(db_session)
        ritual_in = RitualCreate(
            name="test-ritual",
            prompt="Test prompt",
            group_id=group.id,
            weight=1,
        )
        with pytest.raises(ValueError, match="different project"):
            await service.create(ritual_in, test_project.id)

    async def test_create_ritual_in_percentage_group_requires_percentage(self, db_session, test_project):
        """Test that rituals in PERCENTAGE groups must have percentage > 0."""
        from app.models.ritual import RitualGroup, SelectionMode

        group = RitualGroup(
            project_id=test_project.id,
            name="percentage-group",
            selection_mode=SelectionMode.PERCENTAGE,
        )
        db_session.add(group)
        await db_session.commit()
        await db_session.refresh(group)

        service = RitualService(db_session)
        # No percentage provided
        ritual_in = RitualCreate(
            name="test-ritual",
            prompt="Test prompt",
            group_id=group.id,
        )
        with pytest.raises(ValueError, match="percentage > 0"):
            await service.create(ritual_in, test_project.id)

        # Zero percentage
        ritual_in = RitualCreate(
            name="test-ritual",
            prompt="Test prompt",
            group_id=group.id,
            percentage=0,
        )
        with pytest.raises(ValueError, match="percentage > 0"):
            await service.create(ritual_in, test_project.id)

    async def test_create_ritual_in_random_group_requires_positive_weight(self, db_session, test_project):
        """Test that rituals in RANDOM_ONE groups must have weight > 0."""
        from app.models.ritual import RitualGroup, SelectionMode

        group = RitualGroup(
            project_id=test_project.id,
            name="random-group",
            selection_mode=SelectionMode.RANDOM_ONE,
        )
        db_session.add(group)
        await db_session.commit()
        await db_session.refresh(group)

        service = RitualService(db_session)
        # Zero weight
        ritual_in = RitualCreate(
            name="test-ritual",
            prompt="Test prompt",
            group_id=group.id,
            weight=0,
        )
        with pytest.raises(ValueError, match="weight > 0"):
            await service.create(ritual_in, test_project.id)

    async def test_create_ritual_in_round_robin_group_requires_positive_weight(self, db_session, test_project):
        """Test that rituals in ROUND_ROBIN groups must have weight > 0."""
        from app.models.ritual import RitualGroup, SelectionMode

        group = RitualGroup(
            project_id=test_project.id,
            name="rr-group",
            selection_mode=SelectionMode.ROUND_ROBIN,
        )
        db_session.add(group)
        await db_session.commit()
        await db_session.refresh(group)

        service = RitualService(db_session)
        ritual_in = RitualCreate(
            name="test-ritual",
            prompt="Test prompt",
            group_id=group.id,
            weight=0,
        )
        with pytest.raises(ValueError, match="weight > 0"):
            await service.create(ritual_in, test_project.id)

    async def test_update_ritual_to_nonexistent_group(self, db_session, test_project):
        """Test that updating a ritual to a nonexistent group fails."""
        ritual = Ritual(
            project_id=test_project.id,
            name="test-ritual",
            prompt="Test",
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        update = RitualUpdate(group_id="nonexistent-id")
        with pytest.raises(ValueError, match="not found"):
            await service.update(ritual, update)

    async def test_update_ritual_to_other_project_group(self, db_session, test_project, test_team):
        """Test that updating a ritual to a group from another project fails."""
        from app.models.project import Project
        from app.models.ritual import RitualGroup, SelectionMode

        other_project = Project(team_id=test_team.id, name="Other2", key="OT2")
        db_session.add(other_project)
        await db_session.commit()

        group = RitualGroup(
            project_id=other_project.id,
            name="other-group",
            selection_mode=SelectionMode.RANDOM_ONE,
        )
        db_session.add(group)

        ritual = Ritual(
            project_id=test_project.id,
            name="test-ritual",
            prompt="Test",
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(group)
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        update = RitualUpdate(group_id=group.id)
        with pytest.raises(ValueError, match="different project"):
            await service.update(ritual, update)

    async def test_update_ritual_remove_from_group(self, db_session, test_project):
        """Test that setting group_id to empty string removes from group."""
        from app.models.ritual import RitualGroup, SelectionMode

        group = RitualGroup(
            project_id=test_project.id,
            name="test-group",
            selection_mode=SelectionMode.RANDOM_ONE,
        )
        db_session.add(group)
        await db_session.commit()
        await db_session.refresh(group)

        ritual = Ritual(
            project_id=test_project.id,
            name="test-ritual",
            prompt="Test",
            group_id=group.id,
            weight=1,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)
        assert ritual.group_id == group.id

        service = RitualService(db_session)
        update = RitualUpdate(group_id="")
        updated = await service.update(ritual, update)
        assert updated.group_id is None


@pytest.mark.asyncio
class TestRitualGroupSelectionLogic:
    """Tests for ritual group selection algorithms."""

    async def test_apply_group_selection_ungrouped_always_included(self, db_session, test_project):
        """Test that ungrouped rituals are always included."""
        ritual1 = Ritual(
            project_id=test_project.id,
            name="ungrouped-1",
            prompt="Test",
            trigger=RitualTrigger.EVERY_SPRINT,
        )
        ritual2 = Ritual(
            project_id=test_project.id,
            name="ungrouped-2",
            prompt="Test",
            trigger=RitualTrigger.EVERY_SPRINT,
        )
        db_session.add_all([ritual1, ritual2])
        await db_session.commit()

        service = RitualService(db_session)
        selected = await service._apply_group_selection([ritual1, ritual2], sprint_id="test-sprint")
        assert len(selected) == 2

    async def test_random_one_selection_deterministic_with_seed(self, db_session, test_project):
        """Test that RANDOM_ONE selection is deterministic with same seed."""
        from app.models.ritual import RitualGroup, SelectionMode

        group = RitualGroup(
            project_id=test_project.id,
            name="random-group",
            selection_mode=SelectionMode.RANDOM_ONE,
        )
        db_session.add(group)
        await db_session.commit()
        await db_session.refresh(group)

        rituals = []
        for i in range(5):
            r = Ritual(
                project_id=test_project.id,
                name=f"ritual-{i}",
                prompt="Test",
                trigger=RitualTrigger.EVERY_SPRINT,
                group_id=group.id,
                weight=1,
            )
            db_session.add(r)
            rituals.append(r)
        await db_session.commit()

        service = RitualService(db_session)
        # Same seed should give same result
        result1 = await service._apply_group_selection(rituals, sprint_id="fixed-seed")
        result2 = await service._apply_group_selection(rituals, sprint_id="fixed-seed")
        assert len(result1) == 1
        assert len(result2) == 1
        assert result1[0].id == result2[0].id

        # Different seed may give different result (probabilistic)
        result3 = await service._apply_group_selection(rituals, sprint_id="different-seed")
        assert len(result3) == 1

    async def test_random_one_selection_respects_weights(self, db_session, test_project):
        """Test that RANDOM_ONE selection respects weights."""
        from app.models.ritual import RitualGroup, SelectionMode

        group = RitualGroup(
            project_id=test_project.id,
            name="weighted-group",
            selection_mode=SelectionMode.RANDOM_ONE,
        )
        db_session.add(group)
        await db_session.commit()
        await db_session.refresh(group)

        # One ritual with high weight, one with low
        high_weight = Ritual(
            project_id=test_project.id,
            name="high-weight",
            prompt="Test",
            trigger=RitualTrigger.EVERY_SPRINT,
            group_id=group.id,
            weight=100,
        )
        low_weight = Ritual(
            project_id=test_project.id,
            name="low-weight",
            prompt="Test",
            trigger=RitualTrigger.EVERY_SPRINT,
            group_id=group.id,
            weight=1,
        )
        db_session.add_all([high_weight, low_weight])
        await db_session.commit()

        service = RitualService(db_session)
        # Run multiple times - high weight should be selected more often
        high_count = 0
        for i in range(50):
            result = await service._apply_group_selection([high_weight, low_weight], sprint_id=f"seed-{i}")
            if result[0].name == "high-weight":
                high_count += 1
        # With 100:1 ratio, high weight should be selected ~99% of the time
        assert high_count > 40  # Allow some variance

    async def test_round_robin_advances_on_flag(self, db_session, test_project):
        """Test that ROUND_ROBIN advances state when advance flag is True."""
        from app.models.ritual import RitualGroup, SelectionMode

        group = RitualGroup(
            project_id=test_project.id,
            name="rr-group",
            selection_mode=SelectionMode.ROUND_ROBIN,
        )
        db_session.add(group)
        await db_session.commit()
        await db_session.refresh(group)

        rituals = []
        for i in range(3):
            r = Ritual(
                project_id=test_project.id,
                name=f"rr-ritual-{i}",
                prompt="Test",
                trigger=RitualTrigger.EVERY_SPRINT,
                group_id=group.id,
                weight=1,
            )
            db_session.add(r)
            rituals.append(r)
        await db_session.commit()
        for r in rituals:
            await db_session.refresh(r)

        service = RitualService(db_session)

        # First selection with advance
        result1 = await service._apply_group_selection(rituals, sprint_id="s1", advance_round_robin=True)
        assert len(result1) == 1
        first_selected = result1[0].id

        await db_session.refresh(group)
        assert group.last_selected_ritual_id == first_selected

        # Second selection with advance should get next ritual
        result2 = await service._apply_group_selection(rituals, sprint_id="s2", advance_round_robin=True)
        assert len(result2) == 1
        assert result2[0].id != first_selected

    async def test_percentage_selection_deterministic_with_seed(self, db_session, test_project):
        """Test that PERCENTAGE selection is deterministic with same seed."""
        from app.models.ritual import RitualGroup, SelectionMode

        group = RitualGroup(
            project_id=test_project.id,
            name="pct-group",
            selection_mode=SelectionMode.PERCENTAGE,
        )
        db_session.add(group)
        await db_session.commit()
        await db_session.refresh(group)

        ritual = Ritual(
            project_id=test_project.id,
            name="pct-ritual",
            prompt="Test",
            trigger=RitualTrigger.EVERY_SPRINT,
            group_id=group.id,
            percentage=50,
        )
        db_session.add(ritual)
        await db_session.commit()

        service = RitualService(db_session)
        # Same seed should give same result
        result1 = await service._apply_group_selection([ritual], sprint_id="fixed-seed")
        result2 = await service._apply_group_selection([ritual], sprint_id="fixed-seed")
        assert result1 == result2

    async def test_percentage_selection_respects_percentage(self, db_session, test_project):
        """Test that PERCENTAGE selection respects the percentage value."""
        from app.models.ritual import RitualGroup, SelectionMode

        group = RitualGroup(
            project_id=test_project.id,
            name="pct-group",
            selection_mode=SelectionMode.PERCENTAGE,
        )
        db_session.add(group)
        await db_session.commit()
        await db_session.refresh(group)

        # 100% should always be selected
        always_ritual = Ritual(
            project_id=test_project.id,
            name="always",
            prompt="Test",
            trigger=RitualTrigger.EVERY_SPRINT,
            group_id=group.id,
            percentage=100,
        )
        db_session.add(always_ritual)
        await db_session.commit()

        service = RitualService(db_session)
        for i in range(10):
            result = await service._apply_group_selection([always_ritual], sprint_id=f"seed-{i}")
            assert len(result) == 1

    async def test_group_selection_skips_inactive_rituals(self, db_session, test_project):
        """Test that inactive rituals are skipped in group selection."""
        from app.models.ritual import RitualGroup, SelectionMode

        group = RitualGroup(
            project_id=test_project.id,
            name="test-group",
            selection_mode=SelectionMode.RANDOM_ONE,
        )
        db_session.add(group)
        await db_session.commit()
        await db_session.refresh(group)

        active = Ritual(
            project_id=test_project.id,
            name="active",
            prompt="Test",
            trigger=RitualTrigger.EVERY_SPRINT,
            group_id=group.id,
            weight=1,
            is_active=True,
        )
        inactive = Ritual(
            project_id=test_project.id,
            name="inactive",
            prompt="Test",
            trigger=RitualTrigger.EVERY_SPRINT,
            group_id=group.id,
            weight=1,
            is_active=False,
        )
        db_session.add_all([active, inactive])
        await db_session.commit()

        service = RitualService(db_session)
        result = await service._apply_group_selection([active, inactive], sprint_id="test")
        assert len(result) == 1
        assert result[0].name == "active"

    async def test_group_selection_deleted_group_includes_all(self, db_session, test_project):
        """Test that rituals from deleted groups are all included."""
        from app.models.ritual import RitualGroup, SelectionMode

        group = RitualGroup(
            project_id=test_project.id,
            name="to-delete",
            selection_mode=SelectionMode.RANDOM_ONE,
        )
        db_session.add(group)
        await db_session.commit()
        await db_session.refresh(group)

        ritual1 = Ritual(
            project_id=test_project.id,
            name="ritual-1",
            prompt="Test",
            trigger=RitualTrigger.EVERY_SPRINT,
            group_id=group.id,
            weight=1,
        )
        ritual2 = Ritual(
            project_id=test_project.id,
            name="ritual-2",
            prompt="Test",
            trigger=RitualTrigger.EVERY_SPRINT,
            group_id=group.id,
            weight=1,
        )
        db_session.add_all([ritual1, ritual2])
        await db_session.commit()

        # Delete the group - rituals still have the group_id but group no longer exists
        await db_session.delete(group)
        await db_session.commit()

        service = RitualService(db_session)
        # Should include all rituals from deleted group
        result = await service._apply_group_selection([ritual1, ritual2], sprint_id="test")
        assert len(result) == 2

    async def test_select_random_one_empty_list(self, db_session, test_project):
        """Test _select_random_one with empty list returns None."""
        service = RitualService(db_session)
        result = service._select_random_one([])
        assert result is None

    async def test_select_random_one_zero_total_weight(self, db_session, test_project):
        """Test _select_random_one with zero total weight returns None."""
        ritual = Ritual(
            project_id=test_project.id,
            name="zero-weight",
            prompt="Test",
            weight=0,
        )
        db_session.add(ritual)
        await db_session.commit()

        service = RitualService(db_session)
        result = service._select_random_one([ritual])
        assert result is None

    async def test_select_by_percentage_zero_percentage(self, db_session, test_project):
        """Test _select_by_percentage with zero percentage never selects."""
        ritual = Ritual(
            project_id=test_project.id,
            name="zero-pct",
            prompt="Test",
            percentage=0,
        )
        db_session.add(ritual)
        await db_session.commit()

        service = RitualService(db_session)
        for i in range(20):
            result = service._select_by_percentage([ritual], seed=f"seed-{i}")
            assert len(result) == 0

    async def test_select_by_percentage_null_percentage(self, db_session, test_project):
        """Test _select_by_percentage with null percentage never selects."""
        ritual = Ritual(
            project_id=test_project.id,
            name="null-pct",
            prompt="Test",
            percentage=None,
        )
        db_session.add(ritual)
        await db_session.commit()

        service = RitualService(db_session)
        result = service._select_by_percentage([ritual], seed="test")
        assert len(result) == 0


@pytest.mark.asyncio
class TestRitualAttestation:
    """Tests for ritual attestation flow."""

    async def test_attest_auto_mode(self, db_session, test_project, test_user):
        """Test attestation with AUTO mode (auto-approved)."""
        # Create sprint in limbo
        sprint = Sprint(
            project_id=test_project.id,
            name="Test Sprint",
            status=SprintStatus.ACTIVE,
            limbo=True,
        )
        db_session.add(sprint)

        # Create AUTO mode ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="auto-ritual",
            prompt="Do something",
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(sprint)
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        attestation = await service.attest(ritual, sprint.id, test_user.id, note="Done")

        assert attestation.attested_by == test_user.id
        assert attestation.note == "Done"
        # AUTO mode should auto-approve
        assert attestation.approved_by == test_user.id
        assert attestation.approved_at is not None

    async def test_attest_review_mode(self, db_session, test_project, test_user):
        """Test attestation with REVIEW mode (pending approval)."""
        sprint = Sprint(
            project_id=test_project.id,
            name="Test Sprint",
            status=SprintStatus.ACTIVE,
            limbo=True,
        )
        db_session.add(sprint)

        ritual = Ritual(
            project_id=test_project.id,
            name="review-ritual",
            prompt="Do something",
            approval_mode=ApprovalMode.REVIEW,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(sprint)
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        attestation = await service.attest(ritual, sprint.id, test_user.id, note="Done")

        assert attestation.attested_by == test_user.id
        # REVIEW mode should NOT auto-approve
        assert attestation.approved_by is None
        assert attestation.approved_at is None

    async def test_attest_gate_mode_fails(self, db_session, test_project, test_user):
        """Test that GATE mode rituals cannot be attested (only completed)."""
        sprint = Sprint(
            project_id=test_project.id,
            name="Test Sprint",
            status=SprintStatus.ACTIVE,
            limbo=True,
        )
        db_session.add(sprint)

        ritual = Ritual(
            project_id=test_project.id,
            name="gate-ritual",
            prompt="Do something",
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(sprint)
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        with pytest.raises(ValueError, match="requires human completion"):
            await service.attest(ritual, sprint.id, test_user.id)

    async def test_approve_attestation(self, db_session, test_project, test_user, test_user2):
        """Test approving an attestation."""
        sprint = Sprint(
            project_id=test_project.id,
            name="Test Sprint",
            status=SprintStatus.ACTIVE,
            limbo=True,
        )
        db_session.add(sprint)

        ritual = Ritual(
            project_id=test_project.id,
            name="review-ritual",
            prompt="Do something",
            approval_mode=ApprovalMode.REVIEW,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(sprint)
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        attestation = await service.attest(ritual, sprint.id, test_user.id)

        # Approve by a different user
        approved = await service.approve(attestation, test_user2.id)

        assert approved.approved_by == test_user2.id
        assert approved.approved_at is not None

    async def test_complete_gate_ritual(self, db_session, test_project, test_user):
        """Test completing a GATE mode ritual (human-only)."""
        sprint = Sprint(
            project_id=test_project.id,
            name="Test Sprint",
            status=SprintStatus.ACTIVE,
            limbo=True,
        )
        db_session.add(sprint)

        ritual = Ritual(
            project_id=test_project.id,
            name="gate-ritual",
            prompt="Do something",
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(sprint)
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        attestation = await service.complete_gate_ritual(
            ritual, sprint.id, test_user.id, note="Completed by human"
        )

        # Both attested and approved
        assert attestation.attested_by == test_user.id
        assert attestation.approved_by == test_user.id
        assert attestation.approved_at is not None
        assert attestation.note == "Completed by human"

    async def test_attest_wrong_trigger_fails(self, db_session, test_project, test_user):
        """Test that attesting to a non-EVERY_SPRINT ritual fails."""
        sprint = Sprint(
            project_id=test_project.id,
            name="Test Sprint",
            status=SprintStatus.ACTIVE,
            limbo=True,
        )
        db_session.add(sprint)

        # Create TICKET_CLOSE ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="ticket-ritual",
            prompt="Ticket stuff",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(sprint)
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        with pytest.raises(ValueError, match="not a sprint ritual"):
            await service.attest(ritual, sprint.id, test_user.id)

    async def test_complete_gate_ritual_wrong_trigger_fails(self, db_session, test_project, test_user):
        """Test that completing a non-EVERY_SPRINT gate ritual fails."""
        sprint = Sprint(
            project_id=test_project.id,
            name="Test Sprint",
            status=SprintStatus.ACTIVE,
            limbo=True,
        )
        db_session.add(sprint)

        # Create TICKET_CLOSE gate ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="ticket-gate-ritual",
            prompt="Ticket gate",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(sprint)
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        with pytest.raises(ValueError, match="not a sprint ritual"):
            await service.complete_gate_ritual(ritual, sprint.id, test_user.id)


@pytest.mark.asyncio
class TestLimboFlow:
    """Tests for limbo entry and exit."""

    async def test_check_limbo_not_in_limbo(self, db_session, test_project):
        """Test check_limbo when project is not in limbo."""
        service = RitualService(db_session)
        in_limbo, sprint, pending = await service.check_limbo(test_project.id)

        assert in_limbo is False
        assert sprint is None
        assert pending == []

    async def test_check_limbo_in_limbo(self, db_session, test_project):
        """Test check_limbo when project is in limbo with pending rituals."""
        # Create limbo sprint
        sprint = Sprint(
            project_id=test_project.id,
            name="Test Sprint",
            status=SprintStatus.ACTIVE,
            limbo=True,
        )
        db_session.add(sprint)

        # Create ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="pending-ritual",
            prompt="Do something",
            trigger=RitualTrigger.EVERY_SPRINT,
        )
        db_session.add(ritual)
        await db_session.commit()

        service = RitualService(db_session)
        in_limbo, limbo_sprint, pending = await service.check_limbo(test_project.id)

        assert in_limbo is True
        assert limbo_sprint is not None
        assert len(pending) == 1
        assert pending[0].name == "pending-ritual"

    async def test_get_pending_rituals(self, db_session, test_project, test_user):
        """Test get_pending_rituals with mixed attestation states."""
        sprint = Sprint(
            project_id=test_project.id,
            name="Test Sprint",
            status=SprintStatus.ACTIVE,
            limbo=True,
        )
        db_session.add(sprint)

        # Create rituals with different states
        completed_ritual = Ritual(
            project_id=test_project.id,
            name="completed",
            prompt="Done",
            trigger=RitualTrigger.EVERY_SPRINT,
            approval_mode=ApprovalMode.AUTO,
        )
        pending_ritual = Ritual(
            project_id=test_project.id,
            name="pending",
            prompt="Not done",
            trigger=RitualTrigger.EVERY_SPRINT,
            approval_mode=ApprovalMode.AUTO,
        )
        ticket_ritual = Ritual(
            project_id=test_project.id,
            name="ticket-close",
            prompt="For tickets",
            trigger=RitualTrigger.TICKET_CLOSE,  # Should be excluded
        )
        db_session.add_all([completed_ritual, pending_ritual, ticket_ritual])
        await db_session.commit()
        await db_session.refresh(sprint)
        await db_session.refresh(completed_ritual)

        # Attest the completed ritual
        service = RitualService(db_session)
        await service.attest(completed_ritual, sprint.id, test_user.id)

        # Get pending rituals
        pending = await service.get_pending_rituals(test_project.id, sprint.id)

        # Should only have the pending ritual (not completed, not ticket-close)
        assert len(pending) == 1
        assert pending[0].name == "pending"

    async def test_maybe_clear_limbo_clears_when_complete(self, db_session, test_project, test_user):
        """Test that _maybe_clear_limbo clears limbo when all rituals complete."""
        # Create limbo sprint + next sprint
        sprint = Sprint(
            project_id=test_project.id,
            name="Current Sprint",
            status=SprintStatus.ACTIVE,
            limbo=True,
        )
        next_sprint = Sprint(
            project_id=test_project.id,
            name="Next Sprint",
            status=SprintStatus.PLANNED,
        )
        db_session.add_all([sprint, next_sprint])

        # Create single ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="only-ritual",
            prompt="Do it",
            trigger=RitualTrigger.EVERY_SPRINT,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(sprint)
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        # Attest the only ritual (AUTO mode auto-approves)
        await service.attest(ritual, sprint.id, test_user.id)

        # Refresh sprint to check limbo status
        await db_session.refresh(sprint)
        assert sprint.limbo is False
        assert sprint.status == SprintStatus.COMPLETED


@pytest.mark.asyncio
class TestTicketCloseRituals:
    """Tests for TICKET_CLOSE rituals."""

    async def test_get_pending_ticket_rituals_none(self, db_session, test_project, test_issue):
        """Test get_pending_ticket_rituals when no rituals exist."""
        service = RitualService(db_session)
        pending = await service.get_pending_ticket_rituals(test_project.id, test_issue.id)
        assert pending == []

    async def test_get_pending_ticket_rituals_with_pending(self, db_session, test_project, test_issue):
        """Test get_pending_ticket_rituals returns ticket-close rituals."""
        # Create TICKET_CLOSE ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="ticket-ritual",
            prompt="Check before closing",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()

        service = RitualService(db_session)
        pending = await service.get_pending_ticket_rituals(test_project.id, test_issue.id)

        assert len(pending) == 1
        assert pending[0].name == "ticket-ritual"

    async def test_get_pending_ticket_rituals_excludes_sprint_rituals(self, db_session, test_project, test_issue):
        """Test that EVERY_SPRINT rituals are excluded from ticket rituals."""
        # Create both types
        sprint_ritual = Ritual(
            project_id=test_project.id,
            name="sprint-ritual",
            prompt="Sprint stuff",
            trigger=RitualTrigger.EVERY_SPRINT,
        )
        ticket_ritual = Ritual(
            project_id=test_project.id,
            name="ticket-ritual",
            prompt="Ticket stuff",
            trigger=RitualTrigger.TICKET_CLOSE,
        )
        db_session.add_all([sprint_ritual, ticket_ritual])
        await db_session.commit()

        service = RitualService(db_session)
        pending = await service.get_pending_ticket_rituals(test_project.id, test_issue.id)

        assert len(pending) == 1
        assert pending[0].name == "ticket-ritual"

    async def test_attest_for_issue_auto_mode(self, db_session, test_project, test_issue, test_user):
        """Test attesting to a TICKET_CLOSE ritual in AUTO mode."""
        ritual = Ritual(
            project_id=test_project.id,
            name="auto-ticket-ritual",
            prompt="Check it",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        attestation = await service.attest_for_issue(ritual, test_issue.id, test_user.id, note="All good")

        assert attestation.attested_by == test_user.id
        assert attestation.note == "All good"
        assert attestation.approved_by == test_user.id  # AUTO mode auto-approves
        assert attestation.approved_at is not None

    async def test_attest_for_issue_review_mode(self, db_session, test_project, test_issue, test_user):
        """Test attesting to a TICKET_CLOSE ritual in REVIEW mode."""
        ritual = Ritual(
            project_id=test_project.id,
            name="review-ticket-ritual",
            prompt="Check it",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.REVIEW,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        attestation = await service.attest_for_issue(ritual, test_issue.id, test_user.id)

        assert attestation.attested_by == test_user.id
        assert attestation.approved_by is None  # Not auto-approved
        assert attestation.approved_at is None

    async def test_attest_for_issue_gate_mode_fails(self, db_session, test_project, test_issue, test_user):
        """Test that GATE mode ticket rituals cannot be attested."""
        ritual = Ritual(
            project_id=test_project.id,
            name="gate-ticket-ritual",
            prompt="Human only",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        with pytest.raises(ValueError, match="requires human completion"):
            await service.attest_for_issue(ritual, test_issue.id, test_user.id)

    async def test_complete_gate_ritual_for_issue(self, db_session, test_project, test_issue, test_user):
        """Test completing a GATE mode ticket ritual."""
        ritual = Ritual(
            project_id=test_project.id,
            name="gate-ticket-ritual",
            prompt="Human only",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        attestation = await service.complete_gate_ritual_for_issue(
            ritual, test_issue.id, test_user.id, note="Human completed"
        )

        assert attestation.attested_by == test_user.id
        assert attestation.approved_by == test_user.id
        assert attestation.approved_at is not None
        assert attestation.note == "Human completed"

    async def test_approve_for_issue(self, db_session, test_project, test_issue, test_user, test_user2):
        """Test approving a ticket-close ritual attestation."""
        ritual = Ritual(
            project_id=test_project.id,
            name="review-ritual",
            prompt="Check it",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.REVIEW,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        attestation = await service.attest_for_issue(ritual, test_issue.id, test_user.id)

        # Approve by different user
        approved = await service.approve_for_issue(attestation, test_user2.id)

        assert approved.approved_by == test_user2.id
        assert approved.approved_at is not None

    async def test_get_issue_attestation(self, db_session, test_project, test_issue, test_user):
        """Test getting an issue attestation."""
        ritual = Ritual(
            project_id=test_project.id,
            name="test-ritual",
            prompt="Test",
            trigger=RitualTrigger.TICKET_CLOSE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        service = RitualService(db_session)

        # No attestation yet
        result = await service.get_issue_attestation(ritual.id, test_issue.id)
        assert result is None

        # Create attestation
        await service.attest_for_issue(ritual, test_issue.id, test_user.id)

        # Now should find it
        result = await service.get_issue_attestation(ritual.id, test_issue.id)
        assert result is not None
        assert result.issue_id == test_issue.id

    async def test_attest_for_issue_idempotent(self, db_session, test_project, test_issue, test_user):
        """Test that attesting twice returns the same attestation."""
        ritual = Ritual(
            project_id=test_project.id,
            name="test-ritual",
            prompt="Test",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        service = RitualService(db_session)

        # First attestation
        first = await service.attest_for_issue(ritual, test_issue.id, test_user.id)

        # Second attestation should return existing
        second = await service.attest_for_issue(ritual, test_issue.id, test_user.id)

        assert first.id == second.id

    async def test_get_pending_ticket_rituals_handles_null_project(self, db_session, test_project, test_issue):
        """Test get_pending_ticket_rituals when issue's project has been deleted."""
        # Create a ritual for the project
        ritual = Ritual(
            project_id=test_project.id,
            name="test-ritual",
            prompt="Test",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()

        service = RitualService(db_session)

        # Verify ritual exists before deletion
        pending = await service.get_pending_ticket_rituals(test_project.id, test_issue.id)
        assert len(pending) == 1

        # Delete the project (set project_id to None on the issue to simulate orphaned issue)
        # This simulates the edge case where an issue references a deleted project
        test_issue.project_id = "non-existent-project-id"
        await db_session.commit()

        # get_pending_ticket_rituals should return empty list for non-existent project
        # Since the service queries by project_id, it will return no rituals
        pending = await service.get_pending_ticket_rituals("non-existent-project-id", test_issue.id)
        assert pending == []

    async def test_complete_gate_ritual_for_issue_idempotent(self, db_session, test_project, test_issue, test_user):
        """Test that completing a gate ritual twice returns the same attestation."""
        ritual = Ritual(
            project_id=test_project.id,
            name="gate-ritual",
            prompt="Test",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        service = RitualService(db_session)

        # First completion
        first = await service.complete_gate_ritual_for_issue(ritual, test_issue.id, test_user.id)

        # Second completion should return existing
        second = await service.complete_gate_ritual_for_issue(ritual, test_issue.id, test_user.id)

        assert first.id == second.id

    async def test_attest_for_issue_wrong_trigger_fails(self, db_session, test_project, test_issue, test_user):
        """Test that attesting to a non-TICKET_CLOSE ritual fails."""
        # Create EVERY_SPRINT ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="sprint-ritual",
            prompt="Sprint stuff",
            trigger=RitualTrigger.EVERY_SPRINT,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        with pytest.raises(ValueError, match="not a ticket-level ritual"):
            await service.attest_for_issue(ritual, test_issue.id, test_user.id)

    async def test_complete_gate_ritual_for_issue_wrong_trigger_fails(self, db_session, test_project, test_issue, test_user):
        """Test that completing a non-TICKET_CLOSE gate ritual fails."""
        # Create EVERY_SPRINT gate ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="sprint-gate-ritual",
            prompt="Sprint gate",
            trigger=RitualTrigger.EVERY_SPRINT,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        with pytest.raises(ValueError, match="not a ticket-level ritual"):
            await service.complete_gate_ritual_for_issue(ritual, test_issue.id, test_user.id)

    async def test_attest_for_issue_wrong_project_fails(self, db_session, test_project, test_issue, test_user, test_team):
        """Test that attesting to a ritual from a different project fails."""
        from app.models.project import Project

        # Create another project in the same team
        other_project = Project(team_id=test_team.id, name="Other Project", key="OTH")
        db_session.add(other_project)
        await db_session.commit()
        await db_session.refresh(other_project)

        # Create ritual in the other project
        ritual = Ritual(
            project_id=other_project.id,
            name="other-ritual",
            prompt="Other project ritual",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        # test_issue belongs to test_project, ritual belongs to other_project
        with pytest.raises(ValueError, match="does not belong to the same project"):
            await service.attest_for_issue(ritual, test_issue.id, test_user.id)

    async def test_complete_gate_ritual_for_issue_wrong_project_fails(self, db_session, test_project, test_issue, test_user, test_team):
        """Test that completing a GATE ritual from a different project fails."""
        from app.models.project import Project

        # Create another project in the same team
        other_project = Project(team_id=test_team.id, name="Other Project 2", key="OT2")
        db_session.add(other_project)
        await db_session.commit()
        await db_session.refresh(other_project)

        # Create GATE ritual in the other project
        ritual = Ritual(
            project_id=other_project.id,
            name="other-gate-ritual",
            prompt="Other project gate ritual",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        # test_issue belongs to test_project, ritual belongs to other_project
        with pytest.raises(ValueError, match="does not belong to the same project"):
            await service.complete_gate_ritual_for_issue(ritual, test_issue.id, test_user.id)

    async def test_attest_for_issue_nonexistent_issue_fails(self, db_session, test_project, test_user):
        """Test that attesting for a nonexistent issue fails."""
        ritual = Ritual(
            project_id=test_project.id,
            name="test-ritual",
            prompt="Test",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        with pytest.raises(ValueError, match="Issue .* not found"):
            await service.attest_for_issue(ritual, "nonexistent-id", test_user.id)

    async def test_complete_gate_ritual_for_issue_nonexistent_issue_fails(self, db_session, test_project, test_user):
        """Test that completing a GATE ritual for a nonexistent issue fails."""
        ritual = Ritual(
            project_id=test_project.id,
            name="test-gate-ritual",
            prompt="Test",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        with pytest.raises(ValueError, match="Issue .* not found"):
            await service.complete_gate_ritual_for_issue(ritual, "nonexistent-id", test_user.id)

    async def test_attest_ticket_close_on_done_issue_fails(self, db_session, test_project, test_user):
        """Test that TICKET_CLOSE attestation fails for already-done issues."""
        from app.models.issue import IssueStatus

        # Create an issue that's already done
        done_issue = Issue(
            project_id=test_project.id,
            identifier="TST-99",
            number=99,
            title="Already Done",
            status=IssueStatus.DONE,
            creator_id=test_user.id,
        )
        db_session.add(done_issue)

        ritual = Ritual(
            project_id=test_project.id,
            name="close-check",
            prompt="Check before close",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)
        await db_session.refresh(done_issue)

        service = RitualService(db_session)
        with pytest.raises(ValueError, match="issue is already done"):
            await service.attest_for_issue(ritual, done_issue.id, test_user.id)

    async def test_attest_ticket_close_on_canceled_issue_fails(self, db_session, test_project, test_user):
        """Test that TICKET_CLOSE attestation fails for canceled issues."""
        from app.models.issue import IssueStatus

        canceled_issue = Issue(
            project_id=test_project.id,
            identifier="TST-98",
            number=98,
            title="Canceled Issue",
            status=IssueStatus.CANCELED,
            creator_id=test_user.id,
        )
        db_session.add(canceled_issue)

        ritual = Ritual(
            project_id=test_project.id,
            name="close-check-2",
            prompt="Check before close",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)
        await db_session.refresh(canceled_issue)

        service = RitualService(db_session)
        with pytest.raises(ValueError, match="issue is already canceled"):
            await service.attest_for_issue(ritual, canceled_issue.id, test_user.id)

    async def test_attest_ticket_close_on_in_progress_works(self, db_session, test_project, test_user):
        """Test that TICKET_CLOSE attestation works for in-progress issues."""
        from app.models.issue import IssueStatus

        in_progress_issue = Issue(
            project_id=test_project.id,
            identifier="TST-97",
            number=97,
            title="In Progress Issue",
            status=IssueStatus.IN_PROGRESS,
            creator_id=test_user.id,
        )
        db_session.add(in_progress_issue)

        ritual = Ritual(
            project_id=test_project.id,
            name="close-check-3",
            prompt="Check before close",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)
        await db_session.refresh(in_progress_issue)

        service = RitualService(db_session)
        attestation = await service.attest_for_issue(ritual, in_progress_issue.id, test_user.id)
        assert attestation is not None
        assert attestation.issue_id == in_progress_issue.id

    async def test_attest_ticket_claim_on_in_progress_fails(self, db_session, test_project, test_user):
        """Test that TICKET_CLAIM attestation fails for in-progress issues."""
        from app.models.issue import IssueStatus

        in_progress_issue = Issue(
            project_id=test_project.id,
            identifier="TST-96",
            number=96,
            title="Already Claimed",
            status=IssueStatus.IN_PROGRESS,
            creator_id=test_user.id,
        )
        db_session.add(in_progress_issue)

        ritual = Ritual(
            project_id=test_project.id,
            name="claim-check",
            prompt="Check before claim",
            trigger=RitualTrigger.TICKET_CLAIM,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)
        await db_session.refresh(in_progress_issue)

        service = RitualService(db_session)
        with pytest.raises(ValueError, match="issue is in_progress.*only for unclaimed issues"):
            await service.attest_for_issue(ritual, in_progress_issue.id, test_user.id)

    async def test_attest_ticket_claim_on_done_fails(self, db_session, test_project, test_user):
        """Test that TICKET_CLAIM attestation fails for done issues."""
        from app.models.issue import IssueStatus

        done_issue = Issue(
            project_id=test_project.id,
            identifier="TST-95",
            number=95,
            title="Already Done",
            status=IssueStatus.DONE,
            creator_id=test_user.id,
        )
        db_session.add(done_issue)

        ritual = Ritual(
            project_id=test_project.id,
            name="claim-check-2",
            prompt="Check before claim",
            trigger=RitualTrigger.TICKET_CLAIM,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)
        await db_session.refresh(done_issue)

        service = RitualService(db_session)
        with pytest.raises(ValueError, match="issue is done.*only for unclaimed issues"):
            await service.attest_for_issue(ritual, done_issue.id, test_user.id)

    async def test_attest_ticket_claim_on_backlog_works(self, db_session, test_project, test_user):
        """Test that TICKET_CLAIM attestation works for backlog issues."""
        from app.models.issue import IssueStatus

        backlog_issue = Issue(
            project_id=test_project.id,
            identifier="TST-94",
            number=94,
            title="Backlog Issue",
            status=IssueStatus.BACKLOG,
            creator_id=test_user.id,
        )
        db_session.add(backlog_issue)

        ritual = Ritual(
            project_id=test_project.id,
            name="claim-check-3",
            prompt="Check before claim",
            trigger=RitualTrigger.TICKET_CLAIM,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)
        await db_session.refresh(backlog_issue)

        service = RitualService(db_session)
        attestation = await service.attest_for_issue(ritual, backlog_issue.id, test_user.id)
        assert attestation is not None
        assert attestation.issue_id == backlog_issue.id


@pytest.mark.asyncio
class TestRitualServiceMisc:
    """Additional ritual service tests for coverage."""

    async def test_list_by_project(self, db_session, test_project):
        """Test listing rituals by project."""
        # Create multiple rituals
        ritual1 = Ritual(
            project_id=test_project.id,
            name="ritual-1",
            prompt="First",
        )
        ritual2 = Ritual(
            project_id=test_project.id,
            name="ritual-2",
            prompt="Second",
        )
        db_session.add_all([ritual1, ritual2])
        await db_session.commit()

        service = RitualService(db_session)
        rituals = await service.list_by_project(test_project.id)

        assert len(rituals) == 2
        assert {r.name for r in rituals} == {"ritual-1", "ritual-2"}

    async def test_list_by_project_excludes_inactive(self, db_session, test_project):
        """Test that list_by_project excludes inactive rituals by default."""
        active_ritual = Ritual(
            project_id=test_project.id,
            name="active",
            prompt="Active",
            is_active=True,
        )
        inactive_ritual = Ritual(
            project_id=test_project.id,
            name="inactive",
            prompt="Inactive",
            is_active=False,
        )
        db_session.add_all([active_ritual, inactive_ritual])
        await db_session.commit()

        service = RitualService(db_session)
        rituals = await service.list_by_project(test_project.id)

        assert len(rituals) == 1
        assert rituals[0].name == "active"

        # With include_inactive=True
        all_rituals = await service.list_by_project(test_project.id, include_inactive=True)
        assert len(all_rituals) == 2

    async def test_get_by_name(self, db_session, test_project):
        """Test getting ritual by name."""
        ritual = Ritual(
            project_id=test_project.id,
            name="unique-name",
            prompt="Test",
        )
        db_session.add(ritual)
        await db_session.commit()

        service = RitualService(db_session)
        result = await service.get_by_name(test_project.id, "unique-name")

        assert result is not None
        assert result.name == "unique-name"

    async def test_get_by_name_not_found(self, db_session, test_project):
        """Test getting ritual by name when it doesn't exist."""
        service = RitualService(db_session)
        result = await service.get_by_name(test_project.id, "nonexistent")

        assert result is None

    async def test_update_ritual_rename_duplicate_fails(self, db_session, test_project):
        """Test that renaming to an existing name fails."""
        ritual1 = Ritual(
            project_id=test_project.id,
            name="ritual-1",
            prompt="First",
        )
        ritual2 = Ritual(
            project_id=test_project.id,
            name="ritual-2",
            prompt="Second",
        )
        db_session.add_all([ritual1, ritual2])
        await db_session.commit()
        await db_session.refresh(ritual1)

        service = RitualService(db_session)
        update = RitualUpdate(name="ritual-2")  # Try to rename to existing name

        with pytest.raises(ValueError, match="already exists"):
            await service.update(ritual1, update)

    async def test_enter_limbo(self, db_session, test_project):
        """Test entering limbo when sprint has rituals."""
        sprint = Sprint(
            project_id=test_project.id,
            name="Test Sprint",
            status=SprintStatus.ACTIVE,
            limbo=False,
        )
        db_session.add(sprint)

        # Create EVERY_SPRINT ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="sprint-ritual",
            prompt="Do it",
            trigger=RitualTrigger.EVERY_SPRINT,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(sprint)

        service = RitualService(db_session)
        rituals = await service.enter_limbo(sprint)

        # Refresh sprint to check limbo status
        await db_session.refresh(sprint)
        assert sprint.limbo is True
        assert len(rituals) == 1
        assert rituals[0].name == "sprint-ritual"

    async def test_enter_limbo_no_rituals(self, db_session, test_project):
        """Test entering limbo when no EVERY_SPRINT rituals exist."""
        sprint = Sprint(
            project_id=test_project.id,
            name="Test Sprint",
            status=SprintStatus.ACTIVE,
            limbo=False,
        )
        db_session.add(sprint)
        await db_session.commit()
        await db_session.refresh(sprint)

        service = RitualService(db_session)
        rituals = await service.enter_limbo(sprint)

        # Sprint should not enter limbo
        await db_session.refresh(sprint)
        assert sprint.limbo is False
        assert rituals == []

    async def test_maybe_clear_limbo_for_project(self, db_session, test_project):
        """Test maybe_clear_limbo_for_project when limbo exists."""
        # Create limbo sprint with no rituals
        sprint = Sprint(
            project_id=test_project.id,
            name="Limbo Sprint",
            status=SprintStatus.ACTIVE,
            limbo=True,
        )
        next_sprint = Sprint(
            project_id=test_project.id,
            name="Next Sprint",
            status=SprintStatus.PLANNED,
        )
        db_session.add_all([sprint, next_sprint])
        await db_session.commit()

        service = RitualService(db_session)
        await service.maybe_clear_limbo_for_project(test_project.id)

        # Should clear limbo since no rituals exist
        await db_session.refresh(sprint)
        assert sprint.limbo is False
        assert sprint.status == SprintStatus.COMPLETED

    async def test_attest_idempotent(self, db_session, test_project, test_user):
        """Test that attesting twice returns the same attestation."""
        sprint = Sprint(
            project_id=test_project.id,
            name="Test Sprint",
            status=SprintStatus.ACTIVE,
            limbo=True,
        )
        ritual = Ritual(
            project_id=test_project.id,
            name="test-ritual",
            prompt="Test",
            trigger=RitualTrigger.EVERY_SPRINT,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add_all([sprint, ritual])
        await db_session.commit()
        await db_session.refresh(sprint)
        await db_session.refresh(ritual)

        service = RitualService(db_session)

        # First attestation
        first = await service.attest(ritual, sprint.id, test_user.id)

        # Second attestation should return existing
        second = await service.attest(ritual, sprint.id, test_user.id)

        assert first.id == second.id

    async def test_complete_gate_ritual_idempotent(self, db_session, test_project, test_user):
        """Test that completing a gate ritual twice returns the same attestation."""
        sprint = Sprint(
            project_id=test_project.id,
            name="Test Sprint",
            status=SprintStatus.ACTIVE,
            limbo=True,
        )
        ritual = Ritual(
            project_id=test_project.id,
            name="gate-ritual",
            prompt="Test",
            trigger=RitualTrigger.EVERY_SPRINT,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add_all([sprint, ritual])
        await db_session.commit()
        await db_session.refresh(sprint)
        await db_session.refresh(ritual)

        service = RitualService(db_session)

        # First completion
        first = await service.complete_gate_ritual(ritual, sprint.id, test_user.id)

        # Second completion should return existing
        second = await service.complete_gate_ritual(ritual, sprint.id, test_user.id)

        assert first.id == second.id


class TestRitualNameValidation:
    """Tests for ritual name validation."""

    def test_valid_ritual_names(self):
        """Test that valid ritual names are accepted."""
        valid_names = [
            "test-ritual",
            "test_ritual",
            "TestRitual",
            "ritual123",
            "test-ritual_123",
            "a",
            "A-B_C-1",
        ]

        for name in valid_names:
            ritual = RitualCreate(
                name=name,
                prompt="Test prompt",
            )
            assert ritual.name == name

    def test_invalid_ritual_names(self):
        """Test that invalid ritual names are rejected."""
        invalid_names = [
            "test ritual",  # space
            "test.ritual",  # period
            "test@ritual",  # @
            "test!ritual",  # !
            "test/ritual",  # slash
            "test\\ritual",  # backslash
            "test,ritual",  # comma
            "test;ritual",  # semicolon
            "test:ritual",  # colon
            "test(ritual)",  # parentheses
            "test[ritual]",  # brackets
            "test{ritual}",  # braces
            "test'ritual",  # single quote
            'test"ritual',  # double quote
            "test\nritual",  # newline
            "test\tritual",  # tab
            "-test-ritual",  # leading hyphen (CRITICAL: breaks CLI parsing)
            "test-ritual-",  # trailing hyphen (CRITICAL: breaks CLI parsing)
            "-test",  # leading hyphen
            "test-",  # trailing hyphen
            "-",  # just hyphen
            "--",  # multiple hyphens
            "---",  # multiple hyphens
            "-a",  # single char with leading hyphen
            "a-",  # single char with trailing hyphen
        ]

        for name in invalid_names:
            with pytest.raises(ValidationError) as exc_info:
                RitualCreate(
                    name=name,
                    prompt="Test prompt",
                )
            # Check that the error message mentions the validation issue
            error_str = str(exc_info.value).lower()
            assert "start" in error_str or "alphanumeric" in error_str

    def test_ritual_update_valid_names(self):
        """Test that RitualUpdate accepts valid names."""
        update = RitualUpdate(name="valid-name_123")
        assert update.name == "valid-name_123"

    def test_ritual_update_invalid_names(self):
        """Test that RitualUpdate rejects invalid names."""
        invalid_names = [
            "invalid name with spaces",
            "-leading-hyphen",
            "trailing-hyphen-",
            "-",
            "--",
        ]
        for name in invalid_names:
            with pytest.raises(ValidationError) as exc_info:
                RitualUpdate(name=name)
            error_str = str(exc_info.value).lower()
            assert "start" in error_str or "alphanumeric" in error_str

    def test_ritual_update_none_name(self):
        """Test that RitualUpdate accepts None for name."""
        update = RitualUpdate(name=None)
        assert update.name is None

    def test_ritual_name_max_length(self):
        """Test that ritual names longer than 100 characters are rejected."""
        # Create a name with exactly 100 characters (should pass)
        valid_name = "a" * 100
        ritual = RitualCreate(name=valid_name, prompt="Test")
        assert len(ritual.name) == 100

        # Create a name with 101 characters (should fail)
        invalid_name = "a" * 101
        with pytest.raises(ValidationError) as exc_info:
            RitualCreate(name=invalid_name, prompt="Test")
        error_str = str(exc_info.value).lower()
        assert "100" in error_str or "characters" in error_str

    def test_ritual_update_name_max_length(self):
        """Test that RitualUpdate rejects names longer than 100 characters."""
        invalid_name = "a" * 101
        with pytest.raises(ValidationError) as exc_info:
            RitualUpdate(name=invalid_name)
        error_str = str(exc_info.value).lower()
        assert "100" in error_str or "characters" in error_str


@pytest.mark.asyncio
class TestRitualAPIEndpoints:
    """Tests for ritual API endpoints with edge cases."""

    async def test_get_pending_ticket_rituals_null_project(
        self, client, auth_headers, db_session, test_team, test_user
    ):
        """Test get_pending_ticket_rituals returns 404 when issue's project doesn't exist."""
        # Create an issue with a non-existent project_id
        # This simulates an orphaned issue scenario (e.g., race condition, data corruption)
        orphaned_issue = Issue(
            project_id="non-existent-project-id",
            identifier="ORPHAN-1",
            number=1,
            title="Orphaned Issue",
            status="backlog",
            priority="no_priority",
            creator_id=test_user.id,
        )
        db_session.add(orphaned_issue)
        await db_session.commit()
        await db_session.refresh(orphaned_issue)

        # Call the endpoint - should get 404 for project not found
        response = await client.get(
            f"/api/rituals/issue/{orphaned_issue.id}/pending",
            headers=auth_headers,
        )
        assert response.status_code == 404
        assert "Project not found" in response.json()["detail"]

    async def test_attest_ritual_for_issue_null_project(
        self, client, auth_headers, db_session, test_project, test_user
    ):
        """Test attest_ritual_for_issue returns 404 when issue's project doesn't exist."""
        # Create a ritual for a valid project
        ritual = Ritual(
            project_id=test_project.id,
            name="test-ritual",
            prompt="Test prompt",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)

        # Create an orphaned issue (references non-existent project)
        orphaned_issue = Issue(
            project_id="non-existent-project-id",
            identifier="ORPHAN-2",
            number=2,
            title="Orphaned Issue",
            status="backlog",
            priority="no_priority",
            creator_id=test_user.id,
        )
        db_session.add(orphaned_issue)
        await db_session.commit()
        await db_session.refresh(ritual)
        await db_session.refresh(orphaned_issue)

        # Try to attest - should get 404 for project not found
        response = await client.post(
            f"/api/rituals/{ritual.id}/attest-issue/{orphaned_issue.id}",
            headers=auth_headers,
            json={"note": "Test note"},
        )
        assert response.status_code == 404
        assert "Project not found" in response.json()["detail"]

    async def test_complete_gate_ritual_for_issue_null_project(
        self, client, auth_headers, db_session, test_project, test_user
    ):
        """Test complete_gate_ritual_for_issue returns 404 when issue's project doesn't exist."""
        # Create a GATE mode ritual for a valid project
        ritual = Ritual(
            project_id=test_project.id,
            name="gate-ritual",
            prompt="Test prompt",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)

        # Create an orphaned issue
        orphaned_issue = Issue(
            project_id="non-existent-project-id",
            identifier="ORPHAN-3",
            number=3,
            title="Orphaned Issue",
            status="backlog",
            priority="no_priority",
            creator_id=test_user.id,
        )
        db_session.add(orphaned_issue)
        await db_session.commit()
        await db_session.refresh(ritual)
        await db_session.refresh(orphaned_issue)

        # Try to complete - should get 404 for project not found
        response = await client.post(
            f"/api/rituals/{ritual.id}/complete-issue/{orphaned_issue.id}",
            headers=auth_headers,
            json={"note": "Test note"},
        )
        assert response.status_code == 404
        assert "Project not found" in response.json()["detail"]

    async def test_approve_issue_attestation_null_project(
        self, client, auth_headers, db_session, test_project, test_user
    ):
        """Test approve_issue_attestation returns 404 when issue's project doesn't exist."""
        # Create a REVIEW mode ritual for a valid project
        ritual = Ritual(
            project_id=test_project.id,
            name="review-ritual",
            prompt="Test prompt",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.REVIEW,
        )
        db_session.add(ritual)

        # Create an orphaned issue
        orphaned_issue = Issue(
            project_id="non-existent-project-id",
            identifier="ORPHAN-4",
            number=4,
            title="Orphaned Issue",
            status="backlog",
            priority="no_priority",
            creator_id=test_user.id,
        )
        db_session.add(orphaned_issue)
        await db_session.commit()
        await db_session.refresh(ritual)
        await db_session.refresh(orphaned_issue)

        # Try to approve - should get 404 for project not found
        response = await client.post(
            f"/api/rituals/{ritual.id}/approve-issue/{orphaned_issue.id}",
            headers=auth_headers,
        )
        assert response.status_code == 404
        assert "Project not found" in response.json()["detail"]


@pytest.mark.asyncio
class TestRitualConditions:
    """Tests for ritual condition evaluation (CHT-473)."""

    async def test_ritual_with_no_conditions_always_applies(self, db_session, test_project, test_user):
        """Test that rituals without conditions apply to all issues."""
        # Create issue
        issue = Issue(
            project_id=test_project.id,
            identifier="TEST-1",
            number=1,
            title="Test Issue",
            status="backlog",
            priority="medium",
            estimate=1,
            creator_id=test_user.id,
        )
        db_session.add(issue)

        # Create ritual without conditions
        ritual = Ritual(
            project_id=test_project.id,
            name="no-conditions",
            prompt="Always applies",
            trigger=RitualTrigger.TICKET_CLOSE,
            conditions=None,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(issue)

        service = RitualService(db_session)
        pending = await service.get_pending_ticket_rituals(test_project.id, issue.id)

        assert len(pending) == 1
        assert pending[0].name == "no-conditions"

    async def test_estimate_gte_condition_matches(self, db_session, test_project, test_user):
        """Test estimate__gte condition matches when estimate is >= threshold."""
        import json

        # Create issue with estimate = 5
        issue = Issue(
            project_id=test_project.id,
            identifier="TEST-2",
            number=2,
            title="Big Issue",
            status="backlog",
            priority="medium",
            estimate=5,
            creator_id=test_user.id,
        )
        db_session.add(issue)

        # Create ritual requiring estimate >= 3
        ritual = Ritual(
            project_id=test_project.id,
            name="big-ticket-ritual",
            prompt="Only for big tickets",
            trigger=RitualTrigger.TICKET_CLOSE,
            conditions=json.dumps({"estimate__gte": 3}),
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(issue)

        service = RitualService(db_session)
        pending = await service.get_pending_ticket_rituals(test_project.id, issue.id)

        assert len(pending) == 1
        assert pending[0].name == "big-ticket-ritual"

    async def test_estimate_gte_condition_no_match(self, db_session, test_project, test_user):
        """Test estimate__gte condition doesn't match when estimate is < threshold."""
        import json

        # Create issue with estimate = 1
        issue = Issue(
            project_id=test_project.id,
            identifier="TEST-3",
            number=3,
            title="Small Issue",
            status="backlog",
            priority="medium",
            estimate=1,
            creator_id=test_user.id,
        )
        db_session.add(issue)

        # Create ritual requiring estimate >= 3
        ritual = Ritual(
            project_id=test_project.id,
            name="big-ticket-only",
            prompt="Only for big tickets",
            trigger=RitualTrigger.TICKET_CLOSE,
            conditions=json.dumps({"estimate__gte": 3}),
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(issue)

        service = RitualService(db_session)
        pending = await service.get_pending_ticket_rituals(test_project.id, issue.id)

        # Should not include the ritual because estimate < 3
        assert len(pending) == 0

    async def test_priority_in_condition(self, db_session, test_project, test_user):
        """Test priority__in condition."""
        import json
        from app.models.issue import IssuePriority

        # Create high priority issue
        high_issue = Issue(
            project_id=test_project.id,
            identifier="TEST-4",
            number=4,
            title="High Priority Issue",
            status="backlog",
            priority=IssuePriority.HIGH,
            creator_id=test_user.id,
        )
        db_session.add(high_issue)

        # Create low priority issue
        low_issue = Issue(
            project_id=test_project.id,
            identifier="TEST-5",
            number=5,
            title="Low Priority Issue",
            status="backlog",
            priority=IssuePriority.LOW,
            creator_id=test_user.id,
        )
        db_session.add(low_issue)

        # Create ritual for urgent/high only
        ritual = Ritual(
            project_id=test_project.id,
            name="high-priority-ritual",
            prompt="Only for high priority",
            trigger=RitualTrigger.TICKET_CLOSE,
            conditions=json.dumps({"priority__in": ["urgent", "high"]}),
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(high_issue)
        await db_session.refresh(low_issue)

        service = RitualService(db_session)

        # High priority should match
        pending_high = await service.get_pending_ticket_rituals(test_project.id, high_issue.id)
        assert len(pending_high) == 1

        # Low priority should not match
        pending_low = await service.get_pending_ticket_rituals(test_project.id, low_issue.id)
        assert len(pending_low) == 0

    async def test_multiple_conditions_and_logic(self, db_session, test_project, test_user):
        """Test that multiple conditions use AND logic."""
        import json
        from app.models.issue import IssuePriority

        # Create issue that meets both conditions
        matching_issue = Issue(
            project_id=test_project.id,
            identifier="TEST-6",
            number=6,
            title="Big High Priority Issue",
            status="backlog",
            priority=IssuePriority.HIGH,
            estimate=5,
            creator_id=test_user.id,
        )
        db_session.add(matching_issue)

        # Create issue that only meets one condition
        partial_issue = Issue(
            project_id=test_project.id,
            identifier="TEST-7",
            number=7,
            title="Small High Priority Issue",
            status="backlog",
            priority=IssuePriority.HIGH,
            estimate=1,
            creator_id=test_user.id,
        )
        db_session.add(partial_issue)

        # Create ritual requiring both high priority AND estimate >= 3
        ritual = Ritual(
            project_id=test_project.id,
            name="complex-ritual",
            prompt="Complex conditions",
            trigger=RitualTrigger.TICKET_CLOSE,
            conditions=json.dumps({"priority__in": ["urgent", "high"], "estimate__gte": 3}),
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(matching_issue)
        await db_session.refresh(partial_issue)

        service = RitualService(db_session)

        # Should match - both conditions met
        pending_match = await service.get_pending_ticket_rituals(test_project.id, matching_issue.id)
        assert len(pending_match) == 1

        # Should not match - only one condition met
        pending_partial = await service.get_pending_ticket_rituals(test_project.id, partial_issue.id)
        assert len(pending_partial) == 0

    async def test_create_ritual_with_conditions(self, db_session, test_project):
        """Test creating a ritual with conditions via service."""
        service = RitualService(db_session)
        ritual_in = RitualCreate(
            name="conditional-ritual",
            prompt="Conditional prompt",
            trigger=RitualTrigger.TICKET_CLOSE,
            conditions={"estimate__gte": 3},
        )
        ritual = await service.create(ritual_in, test_project.id)

        assert ritual.conditions is not None
        # Conditions are stored as JSON string
        import json
        parsed = json.loads(ritual.conditions)
        assert parsed == {"estimate__gte": 3}

    async def test_update_ritual_conditions(self, db_session, test_project):
        """Test updating ritual conditions."""
        import json

        ritual = Ritual(
            project_id=test_project.id,
            name="update-conditions",
            prompt="Test",
            trigger=RitualTrigger.TICKET_CLOSE,
            conditions=json.dumps({"estimate__gte": 3}),
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        update = RitualUpdate(conditions={"estimate__gte": 5, "priority__in": ["urgent"]})
        updated = await service.update(ritual, update)

        parsed = json.loads(updated.conditions)
        assert parsed == {"estimate__gte": 5, "priority__in": ["urgent"]}

    async def test_unknown_field_fails_closed(self, db_session, test_project, test_user):
        """Test that unknown field in conditions causes ritual to NOT match (fail-closed)."""
        import json

        # Create issue
        issue = Issue(
            project_id=test_project.id,
            identifier="TEST-FC1",
            number=100,
            title="Fail Closed Test",
            status="backlog",
            priority="high",
            estimate=5,
            creator_id=test_user.id,
        )
        db_session.add(issue)

        # Create ritual with typo in field name (estiamte instead of estimate)
        ritual = Ritual(
            project_id=test_project.id,
            name="typo-ritual",
            prompt="Has a typo",
            trigger=RitualTrigger.TICKET_CLOSE,
            conditions=json.dumps({"estiamte__gte": 3}),  # Typo!
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(issue)

        service = RitualService(db_session)
        pending = await service.get_pending_ticket_rituals(test_project.id, issue.id)

        # Should NOT match due to unknown field (fail-closed)
        assert len(pending) == 0

    async def test_unknown_operator_fails_closed(self, db_session, test_project, test_user):
        """Test that unknown operator in conditions causes ritual to NOT match (fail-closed)."""
        import json

        issue = Issue(
            project_id=test_project.id,
            identifier="TEST-FC2",
            number=101,
            title="Fail Closed Test 2",
            status="backlog",
            priority="high",
            estimate=5,
            creator_id=test_user.id,
        )
        db_session.add(issue)

        # Create ritual with unknown operator
        ritual = Ritual(
            project_id=test_project.id,
            name="bad-operator-ritual",
            prompt="Has unknown operator",
            trigger=RitualTrigger.TICKET_CLOSE,
            conditions=json.dumps({"estimate__gt": 3}),  # gt not supported, should be gte
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(issue)

        service = RitualService(db_session)
        pending = await service.get_pending_ticket_rituals(test_project.id, issue.id)

        # Should NOT match due to unknown operator (fail-closed)
        assert len(pending) == 0

    async def test_malformed_json_fails_closed(self, db_session, test_project, test_user):
        """Test that malformed JSON conditions causes ritual to NOT match (fail-closed)."""
        issue = Issue(
            project_id=test_project.id,
            identifier="TEST-FC3",
            number=102,
            title="Fail Closed Test 3",
            status="backlog",
            priority="high",
            estimate=5,
            creator_id=test_user.id,
        )
        db_session.add(issue)

        # Create ritual with malformed JSON (stored directly, bypassing validation)
        ritual = Ritual(
            project_id=test_project.id,
            name="bad-json-ritual",
            prompt="Has malformed JSON",
            trigger=RitualTrigger.TICKET_CLOSE,
            conditions="not valid json {",
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(issue)

        service = RitualService(db_session)
        pending = await service.get_pending_ticket_rituals(test_project.id, issue.id)

        # Should NOT match due to malformed JSON (fail-closed)
        assert len(pending) == 0

    def test_create_ritual_with_invalid_field_rejected(self):
        """Test that creating a ritual with unknown field is rejected at schema level."""
        with pytest.raises(ValueError, match="Unknown field 'estiamte'"):
            RitualCreate(
                name="bad-ritual",
                prompt="Test",
                conditions={"estiamte__gte": 3},  # Typo
            )

    def test_create_ritual_with_invalid_operator_rejected(self):
        """Test that creating a ritual with unknown operator is rejected at schema level."""
        with pytest.raises(ValueError, match="Unknown operator 'gt'"):
            RitualCreate(
                name="bad-ritual",
                prompt="Test",
                conditions={"estimate__gt": 3},  # gt not supported
            )

    def test_create_ritual_with_malformed_key_rejected(self):
        """Test that creating a ritual with malformed condition key is rejected."""
        with pytest.raises(ValueError, match="Must be in format 'field__operator'"):
            RitualCreate(
                name="bad-ritual",
                prompt="Test",
                conditions={"estimate": 3},  # Missing operator
            )

    async def test_issue_type_eq_condition(self, db_session, test_project, test_user):
        """Test issue_type__eq condition."""
        import json
        from app.models.issue import IssueType

        # Create feature issue
        feature_issue = Issue(
            project_id=test_project.id,
            identifier="COND-1",
            number=101,
            title="Feature Issue",
            status="backlog",
            issue_type=IssueType.FEATURE,
            creator_id=test_user.id,
        )
        # Create bug issue
        bug_issue = Issue(
            project_id=test_project.id,
            identifier="COND-2",
            number=102,
            title="Bug Issue",
            status="backlog",
            issue_type=IssueType.BUG,
            creator_id=test_user.id,
        )
        db_session.add_all([feature_issue, bug_issue])

        # Create ritual for features only
        ritual = Ritual(
            project_id=test_project.id,
            name="feature-ritual",
            prompt="For features",
            trigger=RitualTrigger.TICKET_CLOSE,
            conditions=json.dumps({"issue_type__eq": "feature"}),
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(feature_issue)
        await db_session.refresh(bug_issue)

        service = RitualService(db_session)

        # Feature should match
        pending_feature = await service.get_pending_ticket_rituals(test_project.id, feature_issue.id)
        assert len(pending_feature) == 1

        # Bug should not match
        pending_bug = await service.get_pending_ticket_rituals(test_project.id, bug_issue.id)
        assert len(pending_bug) == 0

    async def test_status_in_condition(self, db_session, test_project, test_user):
        """Test status__in condition."""
        import json
        from app.models.issue import IssueStatus

        # Create in_progress issue
        progress_issue = Issue(
            project_id=test_project.id,
            identifier="COND-3",
            number=103,
            title="In Progress Issue",
            status=IssueStatus.IN_PROGRESS,
            creator_id=test_user.id,
        )
        # Create backlog issue
        backlog_issue = Issue(
            project_id=test_project.id,
            identifier="COND-4",
            number=104,
            title="Backlog Issue",
            status=IssueStatus.BACKLOG,
            creator_id=test_user.id,
        )
        db_session.add_all([progress_issue, backlog_issue])

        # Create ritual for active statuses only
        ritual = Ritual(
            project_id=test_project.id,
            name="active-status-ritual",
            prompt="For active issues",
            trigger=RitualTrigger.TICKET_CLOSE,
            conditions=json.dumps({"status__in": ["in_progress", "in_review"]}),
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(progress_issue)
        await db_session.refresh(backlog_issue)

        service = RitualService(db_session)

        # In progress should match
        pending_progress = await service.get_pending_ticket_rituals(test_project.id, progress_issue.id)
        assert len(pending_progress) == 1

        # Backlog should not match
        pending_backlog = await service.get_pending_ticket_rituals(test_project.id, backlog_issue.id)
        assert len(pending_backlog) == 0

    async def test_labels_contains_condition(self, db_session, test_project, test_user, test_team):
        """Test labels__contains condition."""
        import json
        from app.models.issue import Label

        # Create label
        needs_review = Label(
            team_id=test_team.id,
            name="needs-review",
            color="#FF0000",
        )
        db_session.add(needs_review)
        await db_session.commit()
        await db_session.refresh(needs_review)

        # Create issue with the label
        labeled_issue = Issue(
            project_id=test_project.id,
            identifier="COND-5",
            number=105,
            title="Labeled Issue",
            status="backlog",
            creator_id=test_user.id,
        )
        labeled_issue.labels = [needs_review]

        # Create issue without the label
        unlabeled_issue = Issue(
            project_id=test_project.id,
            identifier="COND-6",
            number=106,
            title="Unlabeled Issue",
            status="backlog",
            creator_id=test_user.id,
        )
        db_session.add_all([labeled_issue, unlabeled_issue])

        # Create ritual for labeled issues only
        ritual = Ritual(
            project_id=test_project.id,
            name="labeled-ritual",
            prompt="For issues needing review",
            trigger=RitualTrigger.TICKET_CLOSE,
            conditions=json.dumps({"labels__contains": "needs-review"}),
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(labeled_issue)
        await db_session.refresh(unlabeled_issue)

        service = RitualService(db_session)

        # Labeled should match
        pending_labeled = await service.get_pending_ticket_rituals(test_project.id, labeled_issue.id)
        assert len(pending_labeled) == 1

        # Unlabeled should not match
        pending_unlabeled = await service.get_pending_ticket_rituals(test_project.id, unlabeled_issue.id)
        assert len(pending_unlabeled) == 0

    async def test_estimate_lte_condition(self, db_session, test_project, test_user):
        """Test estimate__lte condition."""
        import json

        # Create issue with estimate = 2
        small_issue = Issue(
            project_id=test_project.id,
            identifier="COND-7",
            number=107,
            title="Small Issue",
            status="backlog",
            estimate=2,
            creator_id=test_user.id,
        )
        # Create issue with estimate = 5
        large_issue = Issue(
            project_id=test_project.id,
            identifier="COND-8",
            number=108,
            title="Large Issue",
            status="backlog",
            estimate=5,
            creator_id=test_user.id,
        )
        db_session.add_all([small_issue, large_issue])

        # Create ritual for small estimates only
        ritual = Ritual(
            project_id=test_project.id,
            name="small-ticket-ritual",
            prompt="For small tickets",
            trigger=RitualTrigger.TICKET_CLOSE,
            conditions=json.dumps({"estimate__lte": 3}),
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(small_issue)
        await db_session.refresh(large_issue)

        service = RitualService(db_session)

        # Small issue should match
        pending_small = await service.get_pending_ticket_rituals(test_project.id, small_issue.id)
        assert len(pending_small) == 1

        # Large issue should not match
        pending_large = await service.get_pending_ticket_rituals(test_project.id, large_issue.id)
        assert len(pending_large) == 0

    async def test_estimate_isnull_condition(self, db_session, test_project, test_user):
        """Test estimate__isnull condition."""
        import json

        # Create issue without estimate
        no_estimate = Issue(
            project_id=test_project.id,
            identifier="COND-9",
            number=109,
            title="No Estimate Issue",
            status="backlog",
            estimate=None,
            creator_id=test_user.id,
        )
        # Create issue with estimate
        has_estimate = Issue(
            project_id=test_project.id,
            identifier="COND-10",
            number=110,
            title="Estimated Issue",
            status="backlog",
            estimate=3,
            creator_id=test_user.id,
        )
        db_session.add_all([no_estimate, has_estimate])

        # Create ritual for unestimated issues only
        ritual = Ritual(
            project_id=test_project.id,
            name="unestimated-ritual",
            prompt="For unestimated tickets",
            trigger=RitualTrigger.TICKET_CLOSE,
            conditions=json.dumps({"estimate__isnull": True}),
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(no_estimate)
        await db_session.refresh(has_estimate)

        service = RitualService(db_session)

        # No estimate should match
        pending_no = await service.get_pending_ticket_rituals(test_project.id, no_estimate.id)
        assert len(pending_no) == 1

        # Has estimate should not match
        pending_has = await service.get_pending_ticket_rituals(test_project.id, has_estimate.id)
        assert len(pending_has) == 0

    async def test_estimate_isnull_false_condition(self, db_session, test_project, test_user):
        """Test estimate__isnull: False condition (require estimate exists)."""
        import json

        # Create issue without estimate
        no_estimate = Issue(
            project_id=test_project.id,
            identifier="COND-11",
            number=111,
            title="No Estimate Issue 2",
            status="backlog",
            estimate=None,
            creator_id=test_user.id,
        )
        # Create issue with estimate
        has_estimate = Issue(
            project_id=test_project.id,
            identifier="COND-12",
            number=112,
            title="Estimated Issue 2",
            status="backlog",
            estimate=3,
            creator_id=test_user.id,
        )
        db_session.add_all([no_estimate, has_estimate])

        # Create ritual for estimated issues only (isnull: False)
        ritual = Ritual(
            project_id=test_project.id,
            name="estimated-ritual",
            prompt="For estimated tickets only",
            trigger=RitualTrigger.TICKET_CLOSE,
            conditions=json.dumps({"estimate__isnull": False}),
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(no_estimate)
        await db_session.refresh(has_estimate)

        service = RitualService(db_session)

        # No estimate should NOT match
        pending_no = await service.get_pending_ticket_rituals(test_project.id, no_estimate.id)
        assert len(pending_no) == 0

        # Has estimate should match
        pending_has = await service.get_pending_ticket_rituals(test_project.id, has_estimate.id)
        assert len(pending_has) == 1

    async def test_estimate_lte_with_null_estimate(self, db_session, test_project, test_user):
        """Test estimate__lte condition with null estimate (should not match)."""
        import json

        # Create issue without estimate
        no_estimate = Issue(
            project_id=test_project.id,
            identifier="COND-13",
            number=113,
            title="No Estimate for LTE",
            status="backlog",
            estimate=None,
            creator_id=test_user.id,
        )
        db_session.add(no_estimate)

        # Create ritual with estimate__lte
        ritual = Ritual(
            project_id=test_project.id,
            name="lte-ritual",
            prompt="For small tickets",
            trigger=RitualTrigger.TICKET_CLOSE,
            conditions=json.dumps({"estimate__lte": 5}),
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(no_estimate)

        service = RitualService(db_session)

        # Null estimate should NOT match lte condition (fail-closed)
        pending = await service.get_pending_ticket_rituals(test_project.id, no_estimate.id)
        assert len(pending) == 0


@pytest.mark.asyncio
class TestTicketClaimRituals:
    """Tests for TICKET_CLAIM rituals (CHT-485)."""

    async def test_get_pending_claim_rituals_none(self, db_session, test_project, test_issue):
        """Test get_pending_claim_rituals when no claim rituals exist."""
        service = RitualService(db_session)
        pending = await service.get_pending_claim_rituals(test_project.id, test_issue.id)
        assert pending == []

    async def test_get_pending_claim_rituals_with_pending(self, db_session, test_project, test_issue):
        """Test get_pending_claim_rituals returns TICKET_CLAIM rituals."""
        # Create TICKET_CLAIM ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="claim-ritual",
            prompt="Check before claiming",
            trigger=RitualTrigger.TICKET_CLAIM,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()

        service = RitualService(db_session)
        pending = await service.get_pending_claim_rituals(test_project.id, test_issue.id)

        assert len(pending) == 1
        assert pending[0].name == "claim-ritual"

    async def test_get_pending_claim_rituals_excludes_other_triggers(
        self, db_session, test_project, test_issue
    ):
        """Test that EVERY_SPRINT and TICKET_CLOSE rituals are excluded from claim rituals."""
        # Create all three types
        sprint_ritual = Ritual(
            project_id=test_project.id,
            name="sprint-ritual",
            prompt="Sprint stuff",
            trigger=RitualTrigger.EVERY_SPRINT,
        )
        close_ritual = Ritual(
            project_id=test_project.id,
            name="close-ritual",
            prompt="Close stuff",
            trigger=RitualTrigger.TICKET_CLOSE,
        )
        claim_ritual = Ritual(
            project_id=test_project.id,
            name="claim-ritual",
            prompt="Claim stuff",
            trigger=RitualTrigger.TICKET_CLAIM,
        )
        db_session.add_all([sprint_ritual, close_ritual, claim_ritual])
        await db_session.commit()

        service = RitualService(db_session)
        pending = await service.get_pending_claim_rituals(test_project.id, test_issue.id)

        assert len(pending) == 1
        assert pending[0].name == "claim-ritual"

    async def test_claiming_issue_blocked_by_pending_claim_ritual(
        self, db_session, test_project, test_issue, test_user
    ):
        """Test that claiming an issue is blocked when there are pending claim rituals."""
        from app.services.issue_service import IssueService, ClaimRitualsError
        from app.schemas.issue import IssueUpdate
        from app.models.issue import IssueStatus

        # Create TICKET_CLAIM ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="design-review",
            prompt="Review design before starting",
            trigger=RitualTrigger.TICKET_CLAIM,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()

        issue_service = IssueService(db_session)
        update = IssueUpdate(status=IssueStatus.IN_PROGRESS)

        # Should raise ClaimRitualsError when trying to claim
        with pytest.raises(ClaimRitualsError) as exc_info:
            await issue_service.update(test_issue, update, test_user.id, is_human_request=False)

        assert "design-review" in str(exc_info.value)
        assert exc_info.value.issue_id == test_issue.identifier

    async def test_claiming_issue_allowed_after_ritual_completed(
        self, db_session, test_project, test_issue, test_user
    ):
        """Test that claiming is allowed after claim rituals are completed."""
        from app.services.issue_service import IssueService
        from app.schemas.issue import IssueUpdate
        from app.models.issue import IssueStatus

        # Create TICKET_CLAIM ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="design-review",
            prompt="Review design before starting",
            trigger=RitualTrigger.TICKET_CLAIM,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        # Complete the ritual attestation
        ritual_service = RitualService(db_session)
        await ritual_service.attest_for_issue(ritual, test_issue.id, test_user.id, note="Design reviewed")

        # Now claiming should succeed
        issue_service = IssueService(db_session)
        update = IssueUpdate(status=IssueStatus.IN_PROGRESS)
        updated_issue = await issue_service.update(test_issue, update, test_user.id, is_human_request=False)

        assert updated_issue.status == IssueStatus.IN_PROGRESS

    async def test_claim_ritual_conditions_evaluated(
        self, db_session, test_project, test_user
    ):
        """Test that TICKET_CLAIM rituals respect conditions."""
        import json

        # Create issue with high estimate
        high_estimate_issue = Issue(
            project_id=test_project.id,
            identifier="TEST-CLAIM-1",
            number=1000,
            title="Big Issue",
            status="backlog",
            priority="medium",
            estimate=5,
            creator_id=test_user.id,
        )
        db_session.add(high_estimate_issue)

        # Create issue with low estimate
        low_estimate_issue = Issue(
            project_id=test_project.id,
            identifier="TEST-CLAIM-2",
            number=1001,
            title="Small Issue",
            status="backlog",
            priority="medium",
            estimate=1,
            creator_id=test_user.id,
        )
        db_session.add(low_estimate_issue)

        # Create TICKET_CLAIM ritual that only applies to estimate >= 3
        ritual = Ritual(
            project_id=test_project.id,
            name="big-ticket-review",
            prompt="Review big tickets before claiming",
            trigger=RitualTrigger.TICKET_CLAIM,
            conditions=json.dumps({"estimate__gte": 3}),
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(high_estimate_issue)
        await db_session.refresh(low_estimate_issue)

        service = RitualService(db_session)

        # High estimate issue should have pending ritual
        pending_high = await service.get_pending_claim_rituals(test_project.id, high_estimate_issue.id)
        assert len(pending_high) == 1

        # Low estimate issue should NOT have pending ritual
        pending_low = await service.get_pending_claim_rituals(test_project.id, low_estimate_issue.id)
        assert len(pending_low) == 0

    async def test_human_can_skip_claim_rituals_when_not_required(
        self, db_session, test_project, test_issue, test_user
    ):
        """Test that humans can skip claim rituals when human_rituals_required is False."""
        from app.services.issue_service import IssueService
        from app.schemas.issue import IssueUpdate
        from app.models.issue import IssueStatus

        # Ensure project has human_rituals_required = False (default)
        assert test_project.human_rituals_required is False

        # Create TICKET_CLAIM ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="design-review",
            prompt="Review design before starting",
            trigger=RitualTrigger.TICKET_CLAIM,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()

        # Human request should succeed despite pending ritual
        issue_service = IssueService(db_session)
        update = IssueUpdate(status=IssueStatus.IN_PROGRESS)
        updated_issue = await issue_service.update(test_issue, update, test_user.id, is_human_request=True)

        assert updated_issue.status == IssueStatus.IN_PROGRESS

    async def test_human_blocked_when_rituals_required(
        self, db_session, test_project, test_issue, test_user
    ):
        """Test that humans are blocked by claim rituals when human_rituals_required is True."""
        from app.services.issue_service import IssueService, ClaimRitualsError
        from app.schemas.issue import IssueUpdate
        from app.models.issue import IssueStatus

        # Set project to require rituals for humans
        test_project.human_rituals_required = True
        await db_session.commit()

        # Create TICKET_CLAIM ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="design-review",
            prompt="Review design before starting",
            trigger=RitualTrigger.TICKET_CLAIM,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()

        # Human request should be blocked
        issue_service = IssueService(db_session)
        update = IssueUpdate(status=IssueStatus.IN_PROGRESS)
        with pytest.raises(ClaimRitualsError):
            await issue_service.update(test_issue, update, test_user.id, is_human_request=True)

    async def test_attest_for_issue_with_claim_trigger(
        self, db_session, test_project, test_issue, test_user
    ):
        """Test attesting to a TICKET_CLAIM ritual."""
        ritual = Ritual(
            project_id=test_project.id,
            name="claim-ritual",
            prompt="Check before claiming",
            trigger=RitualTrigger.TICKET_CLAIM,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        attestation = await service.attest_for_issue(ritual, test_issue.id, test_user.id, note="Ready to claim")

        assert attestation.attested_by == test_user.id
        assert attestation.note == "Ready to claim"
        assert attestation.approved_by == test_user.id  # AUTO mode auto-approves

    async def test_claim_ritual_review_mode_pending_approval(
        self, db_session, test_project, test_issue, test_user
    ):
        """Test TICKET_CLAIM ritual in REVIEW mode stays pending until approved."""
        from app.services.issue_service import IssueService, ClaimRitualsError
        from app.schemas.issue import IssueUpdate
        from app.models.issue import IssueStatus

        # Create TICKET_CLAIM ritual in REVIEW mode
        ritual = Ritual(
            project_id=test_project.id,
            name="design-review",
            prompt="Design must be approved",
            trigger=RitualTrigger.TICKET_CLAIM,
            approval_mode=ApprovalMode.REVIEW,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        # Attest but don't approve
        ritual_service = RitualService(db_session)
        await ritual_service.attest_for_issue(ritual, test_issue.id, test_user.id)

        # Ritual should still be pending (not approved)
        pending = await ritual_service.get_pending_claim_rituals(test_project.id, test_issue.id)
        assert len(pending) == 1

        # Claiming should still be blocked
        issue_service = IssueService(db_session)
        update = IssueUpdate(status=IssueStatus.IN_PROGRESS)
        with pytest.raises(ClaimRitualsError):
            await issue_service.update(test_issue, update, test_user.id, is_human_request=False)

    async def test_claim_ritual_gate_mode_agent_cannot_attest(
        self, db_session, test_project, test_issue, test_user
    ):
        """Test that agents cannot attest to GATE mode TICKET_CLAIM rituals."""
        # Create TICKET_CLAIM ritual in GATE mode
        ritual = Ritual(
            project_id=test_project.id,
            name="gate-design-review",
            prompt="Human must review design",
            trigger=RitualTrigger.TICKET_CLAIM,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        service = RitualService(db_session)
        with pytest.raises(ValueError, match="requires human completion"):
            await service.attest_for_issue(ritual, test_issue.id, test_user.id)

    async def test_claim_ritual_gate_mode_human_can_complete(
        self, db_session, test_project, test_issue, test_user
    ):
        """Test that humans can complete GATE mode TICKET_CLAIM rituals."""
        from app.services.issue_service import IssueService
        from app.schemas.issue import IssueUpdate
        from app.models.issue import IssueStatus

        # Create TICKET_CLAIM ritual in GATE mode
        ritual = Ritual(
            project_id=test_project.id,
            name="gate-design-review",
            prompt="Human must review design",
            trigger=RitualTrigger.TICKET_CLAIM,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        # Human completes the GATE ritual
        ritual_service = RitualService(db_session)
        attestation = await ritual_service.complete_gate_ritual_for_issue(
            ritual, test_issue.id, test_user.id, note="Design approved by human"
        )

        # Attestation should be both attested and approved
        assert attestation.attested_by == test_user.id
        assert attestation.approved_by == test_user.id
        assert attestation.approved_at is not None

        # Now agent should be able to claim the issue
        issue_service = IssueService(db_session)
        update = IssueUpdate(status=IssueStatus.IN_PROGRESS)
        updated_issue = await issue_service.update(test_issue, update, test_user.id, is_human_request=False)

        assert updated_issue.status == IssueStatus.IN_PROGRESS


@pytest.mark.asyncio
class TestGateRitualAgentBlocking:
    """Tests for agent blocking on GATE ritual completion (CHT-523, CHT-548).

    GATE rituals require human completion - agent users should be rejected
    with HTTP 403 at the API level.
    """

    async def test_agent_cannot_complete_gate_ritual_for_issue(
        self, client, db_session, test_project, test_team, test_user
    ):
        """Test that agent users get 403 when trying to complete GATE ritual for issue."""
        from app.models.user import User
        from app.utils.security import get_password_hash, create_access_token
        from app.models.team import TeamMember, TeamRole

        # Create an agent user
        agent = User(
            email="agent@agent.local",
            hashed_password=get_password_hash("agentpass"),
            name="Test Agent",
            is_agent=True,
            parent_user_id=test_user.id,
            agent_team_id=test_team.id,
        )
        db_session.add(agent)
        await db_session.commit()
        await db_session.refresh(agent)

        # Make agent an admin (so it would pass the admin check)
        agent_membership = TeamMember(
            team_id=test_team.id,
            user_id=agent.id,
            role=TeamRole.ADMIN,
        )
        db_session.add(agent_membership)

        # Create a GATE mode ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="gate-ritual",
            prompt="Test gate prompt",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)

        # Create a test issue
        issue = Issue(
            project_id=test_project.id,
            identifier="TEST-1",
            number=1,
            title="Test Issue",
            status="in_progress",
            priority="no_priority",
            creator_id=test_user.id,
        )
        db_session.add(issue)
        await db_session.commit()
        await db_session.refresh(ritual)
        await db_session.refresh(issue)

        # Get agent auth headers
        agent_token = create_access_token(data={"sub": agent.id})
        agent_headers = {"Authorization": f"Bearer {agent_token}"}

        # Agent tries to complete the GATE ritual - should get 403
        response = await client.post(
            f"/api/rituals/{ritual.id}/complete-issue/{issue.id}",
            headers=agent_headers,
            json={"note": "Agent trying to complete"},
        )
        assert response.status_code == 403
        assert "GATE rituals require human completion" in response.json()["detail"]

    async def test_human_can_complete_gate_ritual_for_issue(
        self, client, auth_headers, db_session, test_project, test_user
    ):
        """Test that human admin users can complete GATE ritual for issue."""
        # Create a GATE mode ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="gate-ritual",
            prompt="Test gate prompt",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)

        # Create a test issue
        issue = Issue(
            project_id=test_project.id,
            identifier="TEST-2",
            number=2,
            title="Test Issue",
            status="in_progress",
            priority="no_priority",
            creator_id=test_user.id,
        )
        db_session.add(issue)
        await db_session.commit()
        await db_session.refresh(ritual)
        await db_session.refresh(issue)

        # Human tries to complete the GATE ritual - should succeed
        response = await client.post(
            f"/api/rituals/{ritual.id}/complete-issue/{issue.id}",
            headers=auth_headers,
            json={"note": "Human completing gate ritual"},
        )
        assert response.status_code == 200
        data = response.json()
        assert data["ritual_id"] == ritual.id
        assert data["approved_at"] is not None  # GATE completion is immediately approved

    async def test_agent_cannot_complete_sprint_gate_ritual(
        self, client, db_session, test_project, test_team, test_user
    ):
        """Test that agent users get 403 when trying to complete sprint GATE ritual."""
        from app.models.user import User
        from app.utils.security import get_password_hash, create_access_token
        from app.models.team import TeamMember, TeamRole

        # Create an agent user
        agent = User(
            email="agent2@agent.local",
            hashed_password=get_password_hash("agentpass"),
            name="Test Agent 2",
            is_agent=True,
            parent_user_id=test_user.id,
            agent_team_id=test_team.id,
        )
        db_session.add(agent)
        await db_session.commit()
        await db_session.refresh(agent)

        # Make agent an admin
        agent_membership = TeamMember(
            team_id=test_team.id,
            user_id=agent.id,
            role=TeamRole.ADMIN,
        )
        db_session.add(agent_membership)

        # Create a GATE mode sprint ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="sprint-gate-ritual",
            prompt="Test sprint gate prompt",
            trigger=RitualTrigger.EVERY_SPRINT,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)

        # Create a sprint in limbo
        sprint = Sprint(
            project_id=test_project.id,
            name="Test Sprint",
            status=SprintStatus.ACTIVE,
            limbo=True,
        )
        db_session.add(sprint)
        await db_session.commit()
        await db_session.refresh(ritual)
        await db_session.refresh(sprint)

        # Get agent auth headers
        agent_token = create_access_token(data={"sub": agent.id})
        agent_headers = {"Authorization": f"Bearer {agent_token}"}

        # Agent tries to complete the GATE ritual - should get 403
        response = await client.post(
            f"/api/rituals/{ritual.id}/complete?project_id={test_project.id}",
            headers=agent_headers,
            json={"note": "Agent trying to complete sprint ritual"},
        )
        assert response.status_code == 403
        assert "GATE rituals require human completion" in response.json()["detail"]


@pytest.mark.asyncio
class TestTicketLimbo:
    """Tests for ticket limbo functionality (CHT-552).

    When a user tries to claim/close a ticket blocked by GATE rituals,
    a limbo record is created to track who's waiting for approval.
    """

    async def test_limbo_record_created_on_claim_blocked(
        self, db_session, test_project, test_issue, test_user
    ):
        """Test that a limbo record is created when claim is blocked by GATE ritual."""
        from app.services.issue_service import IssueService, ClaimRitualsError
        from app.schemas.issue import IssueUpdate
        from app.models.issue import IssueStatus
        from app.models.ticket_limbo import TicketLimbo, LimboType

        # Set project to require rituals for humans
        test_project.human_rituals_required = True
        await db_session.commit()

        # Create GATE mode TICKET_CLAIM ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="claim-gate",
            prompt="Requires approval before claiming",
            trigger=RitualTrigger.TICKET_CLAIM,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        # Try to claim - should fail and create limbo record
        issue_service = IssueService(db_session)
        update = IssueUpdate(status=IssueStatus.IN_PROGRESS)
        with pytest.raises(ClaimRitualsError):
            await issue_service.update(test_issue, update, test_user.id, is_human_request=True)

        # Check limbo record was created
        from sqlalchemy import select
        result = await db_session.execute(
            select(TicketLimbo).where(
                TicketLimbo.issue_id == test_issue.id,
                TicketLimbo.ritual_id == ritual.id,
            )
        )
        limbo = result.scalar_one_or_none()
        assert limbo is not None
        assert limbo.limbo_type == LimboType.CLAIM
        assert limbo.requested_by_id == test_user.id
        assert limbo.cleared_at is None

    async def test_limbo_record_created_on_close_blocked(
        self, db_session, test_project, test_user
    ):
        """Test that a limbo record is created when close is blocked by GATE ritual."""
        from app.services.issue_service import IssueService, TicketRitualsError
        from app.schemas.issue import IssueUpdate
        from app.models.issue import IssueStatus
        from app.models.ticket_limbo import TicketLimbo, LimboType

        # Set project to require rituals for humans
        test_project.human_rituals_required = True

        # Create issue in in_progress status
        issue = Issue(
            project_id=test_project.id,
            identifier="TEST-LIMBO-1",
            number=999,
            title="Limbo Test Issue",
            status=IssueStatus.IN_PROGRESS,
            priority="medium",
            creator_id=test_user.id,
        )
        db_session.add(issue)

        # Create GATE mode TICKET_CLOSE ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="close-gate",
            prompt="Requires approval before closing",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(issue)
        await db_session.refresh(ritual)

        # Try to close - should fail and create limbo record
        issue_service = IssueService(db_session)
        update = IssueUpdate(status=IssueStatus.DONE)
        with pytest.raises(TicketRitualsError):
            await issue_service.update(issue, update, test_user.id, is_human_request=True)

        # Check limbo record was created
        from sqlalchemy import select
        result = await db_session.execute(
            select(TicketLimbo).where(
                TicketLimbo.issue_id == issue.id,
                TicketLimbo.ritual_id == ritual.id,
            )
        )
        limbo = result.scalar_one_or_none()
        assert limbo is not None
        assert limbo.limbo_type == LimboType.CLOSE
        assert limbo.requested_by_id == test_user.id
        assert limbo.cleared_at is None

    async def test_limbo_cleared_when_gate_completed(
        self, db_session, test_project, test_user
    ):
        """Test that limbo records are cleared when GATE ritual is completed."""
        from app.services.ritual_service import RitualService
        from app.models.ticket_limbo import TicketLimbo, LimboType
        from datetime import datetime, timezone

        # Create issue
        issue = Issue(
            project_id=test_project.id,
            identifier="TEST-LIMBO-2",
            number=998,
            title="Limbo Clear Test",
            status="in_progress",
            priority="medium",
            creator_id=test_user.id,
        )
        db_session.add(issue)

        # Create GATE mode ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="close-gate-2",
            prompt="Requires approval",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(issue)
        await db_session.refresh(ritual)

        # Manually create a limbo record (simulating blocked close)
        limbo = TicketLimbo(
            issue_id=issue.id,
            ritual_id=ritual.id,
            limbo_type=LimboType.CLOSE,
            requested_by_id=test_user.id,
        )
        db_session.add(limbo)
        await db_session.commit()
        await db_session.refresh(limbo)
        limbo_id = limbo.id

        # Complete the GATE ritual
        ritual_service = RitualService(db_session)
        await ritual_service.complete_gate_ritual_for_issue(
            ritual, issue.id, test_user.id, note="Approved!"
        )

        # Check limbo was cleared
        from sqlalchemy import select
        result = await db_session.execute(
            select(TicketLimbo).where(TicketLimbo.id == limbo_id)
        )
        updated_limbo = result.scalar_one_or_none()
        assert updated_limbo is not None
        assert updated_limbo.cleared_at is not None
        assert updated_limbo.cleared_by_id == test_user.id

    async def test_get_issues_with_pending_gates_returns_limbo_only(
        self, db_session, test_project, test_user
    ):
        """Test that get_issues_with_pending_gates only returns issues in limbo."""
        from app.services.ritual_service import RitualService
        from app.models.ticket_limbo import TicketLimbo, LimboType
        from app.models.issue import IssueStatus

        # Create two issues in in_progress status
        issue_in_limbo = Issue(
            project_id=test_project.id,
            identifier="TEST-LIMBO-3",
            number=997,
            title="Issue In Limbo",
            status=IssueStatus.IN_PROGRESS,
            priority="medium",
            creator_id=test_user.id,
        )
        issue_not_in_limbo = Issue(
            project_id=test_project.id,
            identifier="TEST-LIMBO-4",
            number=996,
            title="Issue Not In Limbo",
            status=IssueStatus.IN_PROGRESS,
            priority="medium",
            creator_id=test_user.id,
        )
        db_session.add(issue_in_limbo)
        db_session.add(issue_not_in_limbo)

        # Create GATE mode ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="close-gate-3",
            prompt="Requires approval",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(issue_in_limbo)
        await db_session.refresh(issue_not_in_limbo)
        await db_session.refresh(ritual)

        # Create limbo record only for issue_in_limbo
        limbo = TicketLimbo(
            issue_id=issue_in_limbo.id,
            ritual_id=ritual.id,
            limbo_type=LimboType.CLOSE,
            requested_by_id=test_user.id,
        )
        db_session.add(limbo)
        await db_session.commit()

        # Get pending gates
        ritual_service = RitualService(db_session)
        pending = await ritual_service.get_issues_with_pending_gates(test_project.id)

        # Should only have the issue in limbo
        assert len(pending) == 1
        assert pending[0]["issue_id"] == issue_in_limbo.id
        assert pending[0]["pending_gates"][0]["requested_by_name"] == test_user.name

    async def test_auto_mode_ritual_does_not_create_limbo(
        self, db_session, test_project, test_issue, test_user
    ):
        """Test that AUTO mode rituals don't create limbo records (user can complete themselves)."""
        from app.services.issue_service import IssueService, ClaimRitualsError
        from app.schemas.issue import IssueUpdate
        from app.models.issue import IssueStatus
        from app.models.ticket_limbo import TicketLimbo

        # Set project to require rituals for humans
        test_project.human_rituals_required = True
        await db_session.commit()

        # Create AUTO mode TICKET_CLAIM ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="claim-auto",
            prompt="Self-service ritual",
            trigger=RitualTrigger.TICKET_CLAIM,
            approval_mode=ApprovalMode.AUTO,  # Not GATE
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        # Try to claim - should fail but NOT create limbo (AUTO mode)
        issue_service = IssueService(db_session)
        update = IssueUpdate(status=IssueStatus.IN_PROGRESS)
        with pytest.raises(ClaimRitualsError):
            await issue_service.update(test_issue, update, test_user.id, is_human_request=True)

        # Check NO limbo record was created
        from sqlalchemy import select
        result = await db_session.execute(
            select(TicketLimbo).where(TicketLimbo.issue_id == test_issue.id)
        )
        limbo = result.scalar_one_or_none()
        assert limbo is None  # No limbo for AUTO mode


# ============================================================================
# API-Level Tests for Ritual Endpoints
# ============================================================================


@pytest.mark.asyncio
class TestRitualAPIEndpoints:
    """Tests for ritual API endpoints (HTTP layer)."""

    async def test_create_ritual_api(self, client, auth_headers, test_project):
        """Test creating a ritual via API."""
        response = await client.post(
            f"/api/rituals?project_id={test_project.id}",
            headers=auth_headers,
            json={
                "name": "test-api-ritual",
                "prompt": "Did you test the API?",
                "trigger": "every_sprint",
                "approval_mode": "auto",
            },
        )
        assert response.status_code == 201
        data = response.json()
        assert data["name"] == "test-api-ritual"
        assert data["prompt"] == "Did you test the API?"
        assert data["trigger"] == "every_sprint"
        assert data["approval_mode"] == "auto"

    async def test_create_ritual_api_not_admin(self, client, auth_headers2, test_project, test_user2, db_session, test_team):
        """Test that non-admins cannot create rituals."""
        from app.models.team import TeamMember, TeamRole

        # Add user2 as a regular member (not admin)
        member = TeamMember(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        db_session.add(member)
        await db_session.commit()

        response = await client.post(
            f"/api/rituals?project_id={test_project.id}",
            headers=auth_headers2,
            json={
                "name": "unauthorized-ritual",
                "prompt": "Should fail",
            },
        )
        assert response.status_code == 403
        assert "Only admins" in response.json()["detail"]

    async def test_create_ritual_api_project_not_found(self, client, auth_headers):
        """Test creating ritual for non-existent project."""
        response = await client.post(
            "/api/rituals?project_id=nonexistent-id",
            headers=auth_headers,
            json={
                "name": "test-ritual",
                "prompt": "Test",
            },
        )
        assert response.status_code == 404
        assert "Project not found" in response.json()["detail"]

    async def test_create_ritual_api_duplicate_name(self, client, auth_headers, test_project):
        """Test that duplicate ritual names are rejected via API."""
        # Create first ritual
        response = await client.post(
            f"/api/rituals?project_id={test_project.id}",
            headers=auth_headers,
            json={"name": "dup-ritual", "prompt": "Test"},
        )
        assert response.status_code == 201

        # Try to create another with the same name
        response = await client.post(
            f"/api/rituals?project_id={test_project.id}",
            headers=auth_headers,
            json={"name": "dup-ritual", "prompt": "Test 2"},
        )
        assert response.status_code == 400
        assert "already exists" in response.json()["detail"]

    async def test_list_rituals_api(self, client, auth_headers, test_project, db_session):
        """Test listing rituals via API."""
        # Create some rituals directly
        ritual1 = Ritual(project_id=test_project.id, name="ritual-1", prompt="Prompt 1")
        ritual2 = Ritual(project_id=test_project.id, name="ritual-2", prompt="Prompt 2")
        db_session.add_all([ritual1, ritual2])
        await db_session.commit()

        response = await client.get(
            f"/api/rituals?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 2
        names = [r["name"] for r in data]
        assert "ritual-1" in names
        assert "ritual-2" in names

    async def test_list_rituals_api_project_not_found(self, client, auth_headers):
        """Test listing rituals for non-existent project."""
        response = await client.get(
            "/api/rituals?project_id=nonexistent-id",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_list_rituals_api_not_team_member(self, client, auth_headers2, test_project):
        """Test that non-team members cannot list rituals."""
        response = await client.get(
            f"/api/rituals?project_id={test_project.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403

    async def test_get_ritual_api(self, client, auth_headers, test_project, db_session):
        """Test getting a single ritual via API."""
        ritual = Ritual(project_id=test_project.id, name="get-ritual", prompt="Get test")
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.get(
            f"/api/rituals/{ritual.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "get-ritual"
        assert data["id"] == ritual.id

    async def test_get_ritual_api_not_found(self, client, auth_headers, test_project):
        """Test getting a non-existent ritual."""
        response = await client.get(
            "/api/rituals/nonexistent-id",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_update_ritual_api(self, client, auth_headers, test_project, db_session):
        """Test updating a ritual via API."""
        ritual = Ritual(project_id=test_project.id, name="update-ritual", prompt="Original")
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.patch(
            f"/api/rituals/{ritual.id}",
            headers=auth_headers,
            json={"prompt": "Updated prompt", "approval_mode": "review"},
        )
        assert response.status_code == 200
        data = response.json()
        assert data["prompt"] == "Updated prompt"
        assert data["approval_mode"] == "review"

    async def test_update_ritual_api_not_admin(self, client, auth_headers2, test_project, test_user2, db_session, test_team):
        """Test that non-admins cannot update rituals."""
        from app.models.team import TeamMember, TeamRole

        member = TeamMember(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        db_session.add(member)

        ritual = Ritual(project_id=test_project.id, name="no-update", prompt="No")
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.patch(
            f"/api/rituals/{ritual.id}",
            headers=auth_headers2,
            json={"prompt": "Hacked"},
        )
        assert response.status_code == 403

    async def test_delete_ritual_api(self, client, auth_headers, test_project, db_session):
        """Test deleting a ritual via API."""
        ritual = Ritual(project_id=test_project.id, name="delete-ritual", prompt="Delete me")
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.delete(
            f"/api/rituals/{ritual.id}",
            headers=auth_headers,
        )
        assert response.status_code == 204

        # Verify it's gone
        response = await client.get(
            f"/api/rituals/{ritual.id}",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_delete_ritual_api_not_admin(self, client, auth_headers2, test_project, test_user2, db_session, test_team):
        """Test that non-admins cannot delete rituals."""
        from app.models.team import TeamMember, TeamRole

        member = TeamMember(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        db_session.add(member)

        ritual = Ritual(project_id=test_project.id, name="no-delete", prompt="No")
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.delete(
            f"/api/rituals/{ritual.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403


@pytest.mark.asyncio
class TestLimboStatusAPI:
    """Tests for limbo status API endpoint."""

    async def test_get_limbo_status_not_in_limbo(self, client, auth_headers, test_project):
        """Test getting limbo status when not in limbo."""
        response = await client.get(
            f"/api/rituals/limbo?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data["in_limbo"] is False
        assert data["sprint_id"] is None
        assert data["pending_rituals"] == []

    async def test_get_limbo_status_in_limbo(self, client, auth_headers, test_project, db_session):
        """Test getting limbo status when in limbo."""
        # Create a ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="limbo-ritual",
            prompt="Limbo test",
            trigger=RitualTrigger.EVERY_SPRINT,
        )
        db_session.add(ritual)

        # Create sprint in limbo state
        limbo_sprint = Sprint(
            project_id=test_project.id,
            name="Sprint 1",
            status=SprintStatus.COMPLETED,
            limbo=True,
        )
        db_session.add(limbo_sprint)
        await db_session.commit()
        await db_session.refresh(limbo_sprint)

        response = await client.get(
            f"/api/rituals/limbo?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data["in_limbo"] is True
        assert data["sprint_id"] == limbo_sprint.id
        assert len(data["pending_rituals"]) == 1
        assert data["pending_rituals"][0]["name"] == "limbo-ritual"

    async def test_get_limbo_status_project_not_found(self, client, auth_headers):
        """Test getting limbo status for non-existent project."""
        response = await client.get(
            "/api/rituals/limbo?project_id=nonexistent",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_get_limbo_status_not_team_member(self, client, auth_headers2, test_project):
        """Test that non-team members cannot get limbo status."""
        response = await client.get(
            f"/api/rituals/limbo?project_id={test_project.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403


@pytest.mark.asyncio
class TestSprintRitualAttestationAPI:
    """Tests for sprint ritual attestation API endpoints."""

    async def test_attest_ritual_api(self, client, auth_headers, test_project, db_session):
        """Test attesting to a ritual via API."""
        # Setup: ritual and limbo state
        ritual = Ritual(
            project_id=test_project.id,
            name="attest-ritual",
            prompt="Test attestation",
            trigger=RitualTrigger.EVERY_SPRINT,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)

        limbo_sprint = Sprint(
            project_id=test_project.id,
            name="Sprint 1",
            status=SprintStatus.COMPLETED,
            limbo=True,
        )
        db_session.add(limbo_sprint)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/attest?project_id={test_project.id}",
            headers=auth_headers,
            json={"note": "Tests passed"},
        )
        assert response.status_code == 200
        data = response.json()
        assert data["note"] == "Tests passed"
        assert data["approved_at"] is not None  # AUTO mode approves immediately

    async def test_attest_ritual_api_not_in_limbo(self, client, auth_headers, test_project, db_session):
        """Test that attestation fails when not in limbo."""
        ritual = Ritual(
            project_id=test_project.id,
            name="no-limbo-ritual",
            prompt="No limbo",
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/attest?project_id={test_project.id}",
            headers=auth_headers,
            json={"note": "Should fail"},
        )
        assert response.status_code == 400
        assert "not in limbo" in response.json()["detail"]

    async def test_attest_ritual_api_gate_mode_rejected(self, client, auth_headers, test_project, db_session):
        """Test that GATE mode rituals cannot be attested via attest endpoint."""
        ritual = Ritual(
            project_id=test_project.id,
            name="gate-ritual",
            prompt="Gate mode",
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)

        limbo_sprint = Sprint(
            project_id=test_project.id,
            name="Sprint 1",
            status=SprintStatus.COMPLETED,
            limbo=True,
        )
        db_session.add(limbo_sprint)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/attest?project_id={test_project.id}",
            headers=auth_headers,
            json={"note": "Should fail"},
        )
        assert response.status_code == 403
        assert "gate mode" in response.json()["detail"].lower()

    async def test_attest_ritual_api_note_required(self, client, auth_headers, test_project, db_session):
        """Test that note is required when ritual has note_required=True."""
        ritual = Ritual(
            project_id=test_project.id,
            name="note-required",
            prompt="Provide details",
            note_required=True,
        )
        db_session.add(ritual)

        limbo_sprint = Sprint(
            project_id=test_project.id,
            name="Sprint 1",
            status=SprintStatus.COMPLETED,
            limbo=True,
        )
        db_session.add(limbo_sprint)
        await db_session.commit()
        await db_session.refresh(ritual)

        # Try without note
        response = await client.post(
            f"/api/rituals/{ritual.id}/attest?project_id={test_project.id}",
            headers=auth_headers,
            json={},
        )
        assert response.status_code == 400
        assert "requires a note" in response.json()["detail"]

    async def test_approve_attestation_api(self, client, auth_headers, test_project, db_session, test_user):
        """Test approving an attestation via API."""
        ritual = Ritual(
            project_id=test_project.id,
            name="review-ritual",
            prompt="Needs review",
            approval_mode=ApprovalMode.REVIEW,
        )
        db_session.add(ritual)

        limbo_sprint = Sprint(
            project_id=test_project.id,
            name="Sprint 1",
            status=SprintStatus.COMPLETED,
            limbo=True,
        )
        db_session.add(limbo_sprint)
        await db_session.commit()
        await db_session.refresh(ritual)
        await db_session.refresh(limbo_sprint)

        # First attest
        attestation = RitualAttestation(
            ritual_id=ritual.id,
            sprint_id=limbo_sprint.id,
            attested_by=test_user.id,
            note="Pending approval",
        )
        db_session.add(attestation)
        await db_session.commit()

        # Now approve
        response = await client.post(
            f"/api/rituals/{ritual.id}/approve?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data["approved_at"] is not None

    async def test_approve_attestation_api_not_in_limbo(self, client, auth_headers, test_project, db_session):
        """Test that approval fails when not in limbo."""
        ritual = Ritual(project_id=test_project.id, name="no-limbo", prompt="No")
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/approve?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 400
        assert "not in limbo" in response.json()["detail"]

    async def test_complete_gate_ritual_api(self, client, auth_headers, test_project, db_session):
        """Test completing a GATE ritual via API."""
        ritual = Ritual(
            project_id=test_project.id,
            name="gate-complete",
            prompt="Human only",
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)

        limbo_sprint = Sprint(
            project_id=test_project.id,
            name="Sprint 1",
            status=SprintStatus.COMPLETED,
            limbo=True,
        )
        db_session.add(limbo_sprint)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/complete?project_id={test_project.id}",
            headers=auth_headers,
            json={"note": "Human completed"},
        )
        assert response.status_code == 200
        data = response.json()
        assert data["approved_at"] is not None

    async def test_complete_gate_ritual_api_not_gate_mode(self, client, auth_headers, test_project, db_session):
        """Test that complete endpoint rejects non-GATE rituals."""
        ritual = Ritual(
            project_id=test_project.id,
            name="not-gate",
            prompt="Auto mode",
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)

        limbo_sprint = Sprint(
            project_id=test_project.id,
            name="Sprint 1",
            status=SprintStatus.COMPLETED,
            limbo=True,
        )
        db_session.add(limbo_sprint)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/complete?project_id={test_project.id}",
            headers=auth_headers,
            json={"note": "Should fail"},
        )
        assert response.status_code == 400
        assert "not a GATE mode ritual" in response.json()["detail"]


@pytest.mark.asyncio
class TestTicketRitualAPI:
    """Tests for ticket-level ritual API endpoints."""

    async def test_get_pending_ticket_rituals_api(self, client, auth_headers, test_project, test_issue, db_session):
        """Test getting pending ticket rituals via API."""
        ritual = Ritual(
            project_id=test_project.id,
            name="ticket-ritual",
            prompt="Ticket ritual",
            trigger=RitualTrigger.TICKET_CLOSE,
        )
        db_session.add(ritual)
        await db_session.commit()

        response = await client.get(
            f"/api/rituals/issue/{test_issue.id}/pending",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data["issue_id"] == test_issue.id
        assert len(data["pending_rituals"]) == 1
        assert data["pending_rituals"][0]["name"] == "ticket-ritual"

    async def test_get_pending_ticket_rituals_api_issue_not_found(self, client, auth_headers, test_project):
        """Test getting pending rituals for non-existent issue."""
        response = await client.get(
            "/api/rituals/issue/nonexistent/pending",
            headers=auth_headers,
        )
        assert response.status_code == 404
        assert "Issue not found" in response.json()["detail"]

    async def test_attest_ritual_for_issue_api(self, client, auth_headers, test_project, test_issue, db_session):
        """Test attesting to a ticket ritual via API."""
        ritual = Ritual(
            project_id=test_project.id,
            name="attest-ticket",
            prompt="Attest test",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/attest-issue/{test_issue.id}",
            headers=auth_headers,
            json={"note": "Ticket attested"},
        )
        assert response.status_code == 200
        data = response.json()
        assert data["approved_at"] is not None  # AUTO mode

    async def test_attest_ritual_for_issue_api_gate_mode_rejected(self, client, auth_headers, test_project, test_issue, db_session):
        """Test that GATE mode ticket rituals cannot be attested."""
        ritual = Ritual(
            project_id=test_project.id,
            name="gate-ticket",
            prompt="Gate mode",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/attest-issue/{test_issue.id}",
            headers=auth_headers,
            json={"note": "Should fail"},
        )
        assert response.status_code == 403
        assert "gate mode" in response.json()["detail"].lower()

    async def test_attest_ritual_for_issue_api_wrong_trigger(self, client, auth_headers, test_project, test_issue, db_session):
        """Test that sprint rituals cannot be attested for issues."""
        ritual = Ritual(
            project_id=test_project.id,
            name="sprint-ritual",
            prompt="Sprint only",
            trigger=RitualTrigger.EVERY_SPRINT,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/attest-issue/{test_issue.id}",
            headers=auth_headers,
            json={"note": "Should fail"},
        )
        assert response.status_code == 400
        assert "not a ticket-level ritual" in response.json()["detail"]

    async def test_complete_gate_ritual_for_issue_api(self, client, auth_headers, test_project, test_issue, db_session):
        """Test completing a GATE ticket ritual via API."""
        ritual = Ritual(
            project_id=test_project.id,
            name="gate-ticket-complete",
            prompt="Human only",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/complete-issue/{test_issue.id}",
            headers=auth_headers,
            json={"note": "Human completed"},
        )
        assert response.status_code == 200
        data = response.json()
        assert data["approved_at"] is not None

    async def test_approve_issue_attestation_api(self, client, auth_headers, test_project, test_issue, test_user, db_session):
        """Test approving a ticket attestation via API."""
        ritual = Ritual(
            project_id=test_project.id,
            name="review-ticket",
            prompt="Needs review",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.REVIEW,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        # Create pending attestation using issue_id field
        attestation = RitualAttestation(
            ritual_id=ritual.id,
            issue_id=test_issue.id,
            attested_by=test_user.id,
            note="Pending",
        )
        db_session.add(attestation)
        await db_session.commit()

        response = await client.post(
            f"/api/rituals/{ritual.id}/approve-issue/{test_issue.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data["approved_at"] is not None


@pytest.mark.asyncio
class TestForceClearLimboAPI:
    """Tests for force-clear limbo API endpoint."""

    async def test_force_clear_limbo_api(self, client, auth_headers, test_project, db_session):
        """Test force-clearing limbo via API."""
        # Setup limbo state
        ritual = Ritual(project_id=test_project.id, name="limbo-ritual", prompt="Limbo")
        limbo_sprint = Sprint(
            project_id=test_project.id,
            name="Sprint 1",
            status=SprintStatus.COMPLETED,
            limbo=True,
        )
        db_session.add_all([ritual, limbo_sprint])
        await db_session.commit()

        response = await client.post(
            f"/api/rituals/force-clear-limbo?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert "cleared" in data["message"].lower()

    async def test_force_clear_limbo_api_not_in_limbo(self, client, auth_headers, test_project):
        """Test that force-clear fails when not in limbo."""
        response = await client.post(
            f"/api/rituals/force-clear-limbo?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 400
        assert "not in limbo" in response.json()["detail"]

    async def test_force_clear_limbo_api_not_admin(self, client, auth_headers2, test_project, test_user2, db_session, test_team):
        """Test that non-admins cannot force-clear limbo."""
        from app.models.team import TeamMember, TeamRole

        member = TeamMember(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        db_session.add(member)

        ritual = Ritual(project_id=test_project.id, name="limbo", prompt="Limbo")
        limbo_sprint = Sprint(
            project_id=test_project.id,
            name="Sprint 1",
            status=SprintStatus.COMPLETED,
            limbo=True,
        )
        db_session.add_all([ritual, limbo_sprint])
        await db_session.commit()

        response = await client.post(
            f"/api/rituals/force-clear-limbo?project_id={test_project.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403


@pytest.mark.asyncio
class TestPendingGatesAPI:
    """Tests for pending gates API endpoint."""

    async def test_get_issues_with_pending_gates_api(self, client, auth_headers, test_project, test_issue, db_session, test_user):
        """Test getting issues with pending GATE rituals via API."""
        from app.models.ticket_limbo import TicketLimbo, LimboType

        # Create a GATE ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="gate-ritual",
            prompt="Human approval needed",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        # Create limbo for the issue
        limbo = TicketLimbo(
            issue_id=test_issue.id,
            ritual_id=ritual.id,
            limbo_type=LimboType.CLOSE,
            requested_by_id=test_user.id,
        )
        db_session.add(limbo)
        await db_session.commit()

        response = await client.get(
            f"/api/rituals/pending-gates?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 1
        issue_ids = [item["issue_id"] for item in data]
        assert test_issue.id in issue_ids

    async def test_get_issues_with_pending_gates_api_empty(self, client, auth_headers, test_project):
        """Test getting pending gates when none exist."""
        response = await client.get(
            f"/api/rituals/pending-gates?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data == []


@pytest.mark.asyncio
class TestRitualGroupsAPI:
    """Tests for ritual groups API endpoints."""

    async def test_create_ritual_group_api(self, client, auth_headers, test_project):
        """Test creating a ritual group via API."""
        response = await client.post(
            f"/api/rituals/groups?project_id={test_project.id}",
            headers=auth_headers,
            json={
                "name": "test-group",
                "description": "Test group description",
                "selection_mode": "random_one",
            },
        )
        assert response.status_code == 201
        data = response.json()
        assert data["name"] == "test-group"
        assert data["selection_mode"] == "random_one"

    async def test_create_ritual_group_api_not_admin(self, client, auth_headers2, test_project, test_user2, db_session, test_team):
        """Test that non-admins cannot create ritual groups."""
        from app.models.team import TeamMember, TeamRole

        member = TeamMember(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        db_session.add(member)
        await db_session.commit()

        response = await client.post(
            f"/api/rituals/groups?project_id={test_project.id}",
            headers=auth_headers2,
            json={"name": "test-group", "selection_mode": "random_one"},
        )
        assert response.status_code == 403

    async def test_list_ritual_groups_api(self, client, auth_headers, test_project, db_session):
        """Test listing ritual groups via API."""
        from app.models.ritual import RitualGroup, SelectionMode

        group1 = RitualGroup(
            project_id=test_project.id,
            name="group-1",
            selection_mode=SelectionMode.RANDOM_ONE,
        )
        group2 = RitualGroup(
            project_id=test_project.id,
            name="group-2",
            selection_mode=SelectionMode.ROUND_ROBIN,
        )
        db_session.add_all([group1, group2])
        await db_session.commit()

        response = await client.get(
            f"/api/rituals/groups?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 2
        names = [g["name"] for g in data]
        assert "group-1" in names
        assert "group-2" in names

    async def test_get_ritual_group_api(self, client, auth_headers, test_project, db_session):
        """Test getting a single ritual group via API."""
        from app.models.ritual import RitualGroup, SelectionMode

        group = RitualGroup(
            project_id=test_project.id,
            name="get-group",
            selection_mode=SelectionMode.RANDOM_ONE,
        )
        db_session.add(group)
        await db_session.commit()
        await db_session.refresh(group)

        response = await client.get(
            f"/api/rituals/groups/{group.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "get-group"

    async def test_get_ritual_group_api_not_found(self, client, auth_headers):
        """Test getting a non-existent ritual group."""
        response = await client.get(
            "/api/rituals/groups/nonexistent",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_update_ritual_group_api(self, client, auth_headers, test_project, db_session):
        """Test updating a ritual group via API."""
        from app.models.ritual import RitualGroup, SelectionMode

        group = RitualGroup(
            project_id=test_project.id,
            name="update-group",
            selection_mode=SelectionMode.RANDOM_ONE,
        )
        db_session.add(group)
        await db_session.commit()
        await db_session.refresh(group)

        response = await client.patch(
            f"/api/rituals/groups/{group.id}",
            headers=auth_headers,
            json={"name": "updated-group", "selection_mode": "round_robin"},
        )
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "updated-group"
        assert data["selection_mode"] == "round_robin"

    async def test_update_ritual_group_api_not_admin(self, client, auth_headers2, test_project, test_user2, db_session, test_team):
        """Test that non-admins cannot update ritual groups."""
        from app.models.team import TeamMember, TeamRole
        from app.models.ritual import RitualGroup, SelectionMode

        member = TeamMember(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        db_session.add(member)

        group = RitualGroup(
            project_id=test_project.id,
            name="no-update-group",
            selection_mode=SelectionMode.RANDOM_ONE,
        )
        db_session.add(group)
        await db_session.commit()
        await db_session.refresh(group)

        response = await client.patch(
            f"/api/rituals/groups/{group.id}",
            headers=auth_headers2,
            json={"name": "hacked"},
        )
        assert response.status_code == 403

    async def test_delete_ritual_group_api(self, client, auth_headers, test_project, db_session):
        """Test deleting a ritual group via API."""
        from app.models.ritual import RitualGroup, SelectionMode

        group = RitualGroup(
            project_id=test_project.id,
            name="delete-group",
            selection_mode=SelectionMode.RANDOM_ONE,
        )
        db_session.add(group)
        await db_session.commit()
        await db_session.refresh(group)

        response = await client.delete(
            f"/api/rituals/groups/{group.id}",
            headers=auth_headers,
        )
        assert response.status_code == 204

        # Verify it's gone
        response = await client.get(
            f"/api/rituals/groups/{group.id}",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_delete_ritual_group_api_not_admin(self, client, auth_headers2, test_project, test_user2, db_session, test_team):
        """Test that non-admins cannot delete ritual groups."""
        from app.models.team import TeamMember, TeamRole
        from app.models.ritual import RitualGroup, SelectionMode

        member = TeamMember(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        db_session.add(member)

        group = RitualGroup(
            project_id=test_project.id,
            name="no-delete-group",
            selection_mode=SelectionMode.RANDOM_ONE,
        )
        db_session.add(group)
        await db_session.commit()
        await db_session.refresh(group)

        response = await client.delete(
            f"/api/rituals/groups/{group.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403

    async def test_list_ritual_groups_api_project_not_found(self, client, auth_headers):
        """Test listing ritual groups for non-existent project."""
        response = await client.get(
            "/api/rituals/groups?project_id=nonexistent",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_list_ritual_groups_api_not_member(self, client, auth_headers2, test_project):
        """Test listing ritual groups when not a team member."""
        response = await client.get(
            f"/api/rituals/groups?project_id={test_project.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403

    async def test_create_ritual_group_api_project_not_found(self, client, auth_headers):
        """Test creating ritual group for non-existent project."""
        response = await client.post(
            "/api/rituals/groups?project_id=nonexistent",
            headers=auth_headers,
            json={"name": "test-group", "selection_mode": "random_one"},
        )
        assert response.status_code == 404

    async def test_get_ritual_group_api_not_member(self, client, auth_headers2, test_project, db_session):
        """Test getting ritual group when not a team member."""
        from app.models.ritual import RitualGroup, SelectionMode

        group = RitualGroup(
            project_id=test_project.id,
            name="private-group",
            selection_mode=SelectionMode.RANDOM_ONE,
        )
        db_session.add(group)
        await db_session.commit()
        await db_session.refresh(group)

        response = await client.get(
            f"/api/rituals/groups/{group.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403


# ============================================================================
# Additional Edge Case Tests for API Endpoints
# ============================================================================


@pytest.mark.asyncio
class TestRitualAPIEdgeCases:
    """Additional edge case tests for ritual API endpoints."""

    async def test_get_ritual_api_not_team_member(self, client, auth_headers2, test_project, db_session):
        """Test getting ritual when not a team member."""
        ritual = Ritual(project_id=test_project.id, name="private-ritual", prompt="Private")
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.get(
            f"/api/rituals/{ritual.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403
        assert "Not a member" in response.json()["detail"]

    async def test_update_ritual_api_not_found(self, client, auth_headers):
        """Test updating non-existent ritual."""
        response = await client.patch(
            "/api/rituals/nonexistent",
            headers=auth_headers,
            json={"prompt": "Updated"},
        )
        assert response.status_code == 404

    async def test_delete_ritual_api_not_found(self, client, auth_headers):
        """Test deleting non-existent ritual."""
        response = await client.delete(
            "/api/rituals/nonexistent",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_attest_ritual_api_ritual_not_found(self, client, auth_headers, test_project):
        """Test attesting to non-existent ritual."""
        response = await client.post(
            f"/api/rituals/nonexistent/attest?project_id={test_project.id}",
            headers=auth_headers,
            json={"note": "Test"},
        )
        assert response.status_code == 404

    async def test_attest_ritual_api_project_not_found(self, client, auth_headers, test_project, db_session):
        """Test attesting to ritual with non-existent project."""
        ritual = Ritual(project_id=test_project.id, name="test", prompt="Test")
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/attest?project_id=nonexistent",
            headers=auth_headers,
            json={"note": "Test"},
        )
        assert response.status_code == 404

    async def test_attest_ritual_api_not_team_member(self, client, auth_headers2, test_project, db_session):
        """Test attesting when not a team member."""
        ritual = Ritual(project_id=test_project.id, name="test", prompt="Test")
        limbo_sprint = Sprint(
            project_id=test_project.id,
            name="Sprint 1",
            status=SprintStatus.COMPLETED,
            limbo=True,
        )
        db_session.add_all([ritual, limbo_sprint])
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/attest?project_id={test_project.id}",
            headers=auth_headers2,
            json={"note": "Test"},
        )
        assert response.status_code == 403

    async def test_attest_ritual_api_wrong_project(self, client, auth_headers, test_project, db_session, test_team):
        """Test attesting when ritual belongs to different project."""
        from app.models.project import Project

        # Create another project
        other_project = Project(
            team_id=test_team.id,
            name="Other Project",
            key="OTH",
        )
        db_session.add(other_project)
        await db_session.commit()

        # Ritual belongs to other_project
        ritual = Ritual(project_id=other_project.id, name="test", prompt="Test")
        # But limbo is in test_project
        limbo_sprint = Sprint(
            project_id=test_project.id,
            name="Sprint 1",
            status=SprintStatus.COMPLETED,
            limbo=True,
        )
        db_session.add_all([ritual, limbo_sprint])
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/attest?project_id={test_project.id}",
            headers=auth_headers,
            json={"note": "Test"},
        )
        assert response.status_code == 400
        assert "does not belong to this project" in response.json()["detail"]

    async def test_approve_attestation_api_ritual_not_found(self, client, auth_headers, test_project):
        """Test approving attestation for non-existent ritual."""
        response = await client.post(
            f"/api/rituals/nonexistent/approve?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_approve_attestation_api_project_not_found(self, client, auth_headers, test_project, db_session):
        """Test approving attestation with non-existent project."""
        ritual = Ritual(project_id=test_project.id, name="test", prompt="Test")
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/approve?project_id=nonexistent",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_approve_attestation_api_not_admin(self, client, auth_headers2, test_project, test_user2, db_session, test_team):
        """Test that non-admins cannot approve attestations."""
        from app.models.team import TeamMember, TeamRole

        member = TeamMember(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        db_session.add(member)

        ritual = Ritual(project_id=test_project.id, name="test", prompt="Test", approval_mode=ApprovalMode.REVIEW)
        limbo_sprint = Sprint(
            project_id=test_project.id,
            name="Sprint 1",
            status=SprintStatus.COMPLETED,
            limbo=True,
        )
        db_session.add_all([ritual, limbo_sprint])
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/approve?project_id={test_project.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403
        assert "Only admins" in response.json()["detail"]

    async def test_approve_attestation_api_no_attestation(self, client, auth_headers, test_project, db_session):
        """Test approving when no attestation exists."""
        ritual = Ritual(project_id=test_project.id, name="test", prompt="Test", approval_mode=ApprovalMode.REVIEW)
        limbo_sprint = Sprint(
            project_id=test_project.id,
            name="Sprint 1",
            status=SprintStatus.COMPLETED,
            limbo=True,
        )
        db_session.add_all([ritual, limbo_sprint])
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/approve?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 404
        assert "No attestation found" in response.json()["detail"]

    async def test_approve_attestation_api_already_approved(self, client, auth_headers, test_project, test_user, db_session):
        """Test approving attestation that's already approved."""
        from datetime import datetime

        ritual = Ritual(project_id=test_project.id, name="test", prompt="Test", approval_mode=ApprovalMode.REVIEW)
        limbo_sprint = Sprint(
            project_id=test_project.id,
            name="Sprint 1",
            status=SprintStatus.COMPLETED,
            limbo=True,
        )
        db_session.add_all([ritual, limbo_sprint])
        await db_session.commit()
        await db_session.refresh(ritual)
        await db_session.refresh(limbo_sprint)

        # Create already-approved attestation
        attestation = RitualAttestation(
            ritual_id=ritual.id,
            sprint_id=limbo_sprint.id,
            attested_by=test_user.id,
            note="Already approved",
            approved_at=datetime.now(),
            approved_by=test_user.id,
        )
        db_session.add(attestation)
        await db_session.commit()

        response = await client.post(
            f"/api/rituals/{ritual.id}/approve?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 400
        assert "already approved" in response.json()["detail"]

    async def test_complete_gate_ritual_api_ritual_not_found(self, client, auth_headers, test_project):
        """Test completing non-existent GATE ritual."""
        response = await client.post(
            f"/api/rituals/nonexistent/complete?project_id={test_project.id}",
            headers=auth_headers,
            json={"note": "Test"},
        )
        assert response.status_code == 404

    async def test_complete_gate_ritual_api_project_not_found(self, client, auth_headers, test_project, db_session):
        """Test completing GATE ritual with non-existent project."""
        ritual = Ritual(project_id=test_project.id, name="test", prompt="Test", approval_mode=ApprovalMode.GATE)
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/complete?project_id=nonexistent",
            headers=auth_headers,
            json={"note": "Test"},
        )
        assert response.status_code == 404

    async def test_complete_gate_ritual_api_not_admin(self, client, auth_headers2, test_project, test_user2, db_session, test_team):
        """Test that non-admins cannot complete GATE rituals."""
        from app.models.team import TeamMember, TeamRole

        member = TeamMember(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        db_session.add(member)

        ritual = Ritual(project_id=test_project.id, name="test", prompt="Test", approval_mode=ApprovalMode.GATE)
        limbo_sprint = Sprint(
            project_id=test_project.id,
            name="Sprint 1",
            status=SprintStatus.COMPLETED,
            limbo=True,
        )
        db_session.add_all([ritual, limbo_sprint])
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/complete?project_id={test_project.id}",
            headers=auth_headers2,
            json={"note": "Test"},
        )
        assert response.status_code == 403
        assert "Only admins" in response.json()["detail"]

    async def test_complete_gate_ritual_api_not_in_limbo(self, client, auth_headers, test_project, db_session):
        """Test completing GATE ritual when not in limbo."""
        ritual = Ritual(project_id=test_project.id, name="test", prompt="Test", approval_mode=ApprovalMode.GATE)
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/complete?project_id={test_project.id}",
            headers=auth_headers,
            json={"note": "Test"},
        )
        assert response.status_code == 400
        assert "not in limbo" in response.json()["detail"]

    async def test_complete_gate_ritual_api_wrong_project(self, client, auth_headers, test_project, db_session, test_team):
        """Test completing GATE ritual that belongs to different project."""
        from app.models.project import Project

        other_project = Project(team_id=test_team.id, name="Other", key="OTH")
        db_session.add(other_project)
        await db_session.commit()

        ritual = Ritual(project_id=other_project.id, name="test", prompt="Test", approval_mode=ApprovalMode.GATE)
        limbo_sprint = Sprint(
            project_id=test_project.id,
            name="Sprint 1",
            status=SprintStatus.COMPLETED,
            limbo=True,
        )
        db_session.add_all([ritual, limbo_sprint])
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/complete?project_id={test_project.id}",
            headers=auth_headers,
            json={"note": "Test"},
        )
        assert response.status_code == 400
        assert "does not belong to this project" in response.json()["detail"]

    async def test_complete_gate_ritual_api_note_not_required(self, client, auth_headers, test_project, db_session):
        """Test completing GATE ritual succeeds without note (GATE mode skips note_required)."""
        ritual = Ritual(
            project_id=test_project.id,
            name="test",
            prompt="Test",
            approval_mode=ApprovalMode.GATE,
            note_required=True,  # This is ignored for GATE mode
        )
        limbo_sprint = Sprint(
            project_id=test_project.id,
            name="Sprint 1",
            status=SprintStatus.COMPLETED,
            limbo=True,
        )
        db_session.add_all([ritual, limbo_sprint])
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/complete?project_id={test_project.id}",
            headers=auth_headers,
            json={},
        )
        # GATE mode rituals don't require notes - human approval is the attestation
        assert response.status_code == 200


@pytest.mark.asyncio
class TestTicketRitualAPIEdgeCases:
    """Additional edge case tests for ticket-level ritual API endpoints."""

    async def test_get_pending_ticket_rituals_api_not_member(self, client, auth_headers2, test_issue):
        """Test getting pending ticket rituals when not a team member."""
        response = await client.get(
            f"/api/rituals/issue/{test_issue.id}/pending",
            headers=auth_headers2,
        )
        assert response.status_code == 403

    async def test_attest_ritual_for_issue_api_ritual_not_found(self, client, auth_headers, test_issue):
        """Test attesting to non-existent ticket ritual."""
        response = await client.post(
            f"/api/rituals/nonexistent/attest-issue/{test_issue.id}",
            headers=auth_headers,
            json={"note": "Test"},
        )
        assert response.status_code == 404

    async def test_attest_ritual_for_issue_api_issue_not_found(self, client, auth_headers, test_project, db_session):
        """Test attesting when issue doesn't exist."""
        ritual = Ritual(
            project_id=test_project.id,
            name="test",
            prompt="Test",
            trigger=RitualTrigger.TICKET_CLOSE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/attest-issue/nonexistent",
            headers=auth_headers,
            json={"note": "Test"},
        )
        assert response.status_code == 404

    async def test_attest_ritual_for_issue_api_not_member(self, client, auth_headers2, test_project, test_issue, db_session):
        """Test attesting when not a team member."""
        ritual = Ritual(
            project_id=test_project.id,
            name="test",
            prompt="Test",
            trigger=RitualTrigger.TICKET_CLOSE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/attest-issue/{test_issue.id}",
            headers=auth_headers2,
            json={"note": "Test"},
        )
        assert response.status_code == 403

    async def test_attest_ritual_for_issue_api_wrong_project(self, client, auth_headers, test_project, test_issue, db_session, test_team):
        """Test attesting when ritual belongs to different project."""
        from app.models.project import Project

        other_project = Project(team_id=test_team.id, name="Other", key="OTH")
        db_session.add(other_project)
        await db_session.commit()

        ritual = Ritual(
            project_id=other_project.id,
            name="test",
            prompt="Test",
            trigger=RitualTrigger.TICKET_CLOSE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/attest-issue/{test_issue.id}",
            headers=auth_headers,
            json={"note": "Test"},
        )
        assert response.status_code == 400
        assert "does not belong" in response.json()["detail"]

    async def test_attest_ritual_for_issue_api_note_required(self, client, auth_headers, test_project, test_issue, db_session):
        """Test attesting when note is required but not provided."""
        ritual = Ritual(
            project_id=test_project.id,
            name="test",
            prompt="Test",
            trigger=RitualTrigger.TICKET_CLOSE,
            note_required=True,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/attest-issue/{test_issue.id}",
            headers=auth_headers,
            json={},
        )
        assert response.status_code == 400
        assert "requires a note" in response.json()["detail"]

    async def test_complete_gate_ritual_for_issue_api_ritual_not_found(self, client, auth_headers, test_issue):
        """Test completing non-existent GATE ticket ritual."""
        response = await client.post(
            f"/api/rituals/nonexistent/complete-issue/{test_issue.id}",
            headers=auth_headers,
            json={"note": "Test"},
        )
        assert response.status_code == 404

    async def test_complete_gate_ritual_for_issue_api_issue_not_found(self, client, auth_headers, test_project, db_session):
        """Test completing GATE ritual when issue doesn't exist."""
        ritual = Ritual(
            project_id=test_project.id,
            name="test",
            prompt="Test",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/complete-issue/nonexistent",
            headers=auth_headers,
            json={"note": "Test"},
        )
        assert response.status_code == 404

    async def test_complete_gate_ritual_for_issue_api_not_admin(self, client, auth_headers2, test_project, test_issue, test_user2, db_session, test_team):
        """Test that non-admins cannot complete GATE ticket rituals."""
        from app.models.team import TeamMember, TeamRole

        member = TeamMember(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        db_session.add(member)

        ritual = Ritual(
            project_id=test_project.id,
            name="test",
            prompt="Test",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/complete-issue/{test_issue.id}",
            headers=auth_headers2,
            json={"note": "Test"},
        )
        assert response.status_code == 403
        assert "Only admins" in response.json()["detail"]

    async def test_complete_gate_ritual_for_issue_api_wrong_trigger(self, client, auth_headers, test_project, test_issue, db_session):
        """Test completing GATE ritual with wrong trigger type."""
        ritual = Ritual(
            project_id=test_project.id,
            name="test",
            prompt="Test",
            trigger=RitualTrigger.EVERY_SPRINT,  # Wrong trigger
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/complete-issue/{test_issue.id}",
            headers=auth_headers,
            json={"note": "Test"},
        )
        assert response.status_code == 400
        assert "not a ticket-level ritual" in response.json()["detail"]

    async def test_complete_gate_ritual_for_issue_api_wrong_project(self, client, auth_headers, test_project, test_issue, db_session, test_team):
        """Test completing GATE ritual that belongs to different project."""
        from app.models.project import Project

        other_project = Project(team_id=test_team.id, name="Other", key="OTH")
        db_session.add(other_project)
        await db_session.commit()

        ritual = Ritual(
            project_id=other_project.id,
            name="test",
            prompt="Test",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/complete-issue/{test_issue.id}",
            headers=auth_headers,
            json={"note": "Test"},
        )
        assert response.status_code == 400
        assert "does not belong" in response.json()["detail"]

    async def test_complete_gate_ritual_for_issue_api_not_gate_mode(self, client, auth_headers, test_project, test_issue, db_session):
        """Test completing ticket ritual that's not GATE mode."""
        ritual = Ritual(
            project_id=test_project.id,
            name="test",
            prompt="Test",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,  # Not GATE
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/complete-issue/{test_issue.id}",
            headers=auth_headers,
            json={"note": "Test"},
        )
        assert response.status_code == 400
        assert "not a GATE mode ritual" in response.json()["detail"]

    async def test_complete_gate_ritual_for_issue_api_note_not_required(self, client, auth_headers, test_project, test_issue, db_session):
        """Test completing GATE ticket ritual succeeds without note (GATE mode skips note_required)."""
        ritual = Ritual(
            project_id=test_project.id,
            name="test",
            prompt="Test",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
            note_required=True,  # This is ignored for GATE mode
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/complete-issue/{test_issue.id}",
            headers=auth_headers,
            json={},
        )
        # GATE mode rituals don't require notes - human approval is the attestation
        assert response.status_code == 200

    async def test_approve_issue_attestation_api_ritual_not_found(self, client, auth_headers, test_issue):
        """Test approving attestation for non-existent ritual."""
        response = await client.post(
            f"/api/rituals/nonexistent/approve-issue/{test_issue.id}",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_approve_issue_attestation_api_issue_not_found(self, client, auth_headers, test_project, db_session):
        """Test approving attestation when issue doesn't exist."""
        ritual = Ritual(
            project_id=test_project.id,
            name="test",
            prompt="Test",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.REVIEW,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/approve-issue/nonexistent",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_approve_issue_attestation_api_not_admin(self, client, auth_headers2, test_project, test_issue, test_user2, db_session, test_team):
        """Test that non-admins cannot approve ticket attestations."""
        from app.models.team import TeamMember, TeamRole

        member = TeamMember(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        db_session.add(member)

        ritual = Ritual(
            project_id=test_project.id,
            name="test",
            prompt="Test",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.REVIEW,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/approve-issue/{test_issue.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403
        assert "Only admins" in response.json()["detail"]

    async def test_approve_issue_attestation_api_wrong_project(self, client, auth_headers, test_project, test_issue, db_session, test_team):
        """Test approving attestation when ritual belongs to different project."""
        from app.models.project import Project

        other_project = Project(team_id=test_team.id, name="Other", key="OTH")
        db_session.add(other_project)
        await db_session.commit()

        ritual = Ritual(
            project_id=other_project.id,
            name="test",
            prompt="Test",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.REVIEW,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/approve-issue/{test_issue.id}",
            headers=auth_headers,
        )
        assert response.status_code == 400
        assert "does not belong" in response.json()["detail"]

    async def test_approve_issue_attestation_api_wrong_trigger(self, client, auth_headers, test_project, test_issue, db_session):
        """Test approving attestation when ritual has wrong trigger."""
        ritual = Ritual(
            project_id=test_project.id,
            name="test",
            prompt="Test",
            trigger=RitualTrigger.EVERY_SPRINT,  # Wrong trigger
            approval_mode=ApprovalMode.REVIEW,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/approve-issue/{test_issue.id}",
            headers=auth_headers,
        )
        assert response.status_code == 400
        assert "not a ticket-level ritual" in response.json()["detail"]

    async def test_approve_issue_attestation_api_not_review_mode(self, client, auth_headers, test_project, test_issue, db_session):
        """Test approving attestation when ritual is not REVIEW mode."""
        ritual = Ritual(
            project_id=test_project.id,
            name="test",
            prompt="Test",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,  # Not REVIEW
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/approve-issue/{test_issue.id}",
            headers=auth_headers,
        )
        assert response.status_code == 400
        assert "not a REVIEW mode ritual" in response.json()["detail"]

    async def test_approve_issue_attestation_api_no_attestation(self, client, auth_headers, test_project, test_issue, db_session):
        """Test approving when no attestation exists."""
        ritual = Ritual(
            project_id=test_project.id,
            name="test",
            prompt="Test",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.REVIEW,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        response = await client.post(
            f"/api/rituals/{ritual.id}/approve-issue/{test_issue.id}",
            headers=auth_headers,
        )
        assert response.status_code == 404
        assert "No attestation found" in response.json()["detail"]

    async def test_approve_issue_attestation_api_already_approved(self, client, auth_headers, test_project, test_issue, test_user, db_session):
        """Test approving attestation that's already approved."""
        from datetime import datetime

        ritual = Ritual(
            project_id=test_project.id,
            name="test",
            prompt="Test",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.REVIEW,
        )
        db_session.add(ritual)
        await db_session.commit()
        await db_session.refresh(ritual)

        attestation = RitualAttestation(
            ritual_id=ritual.id,
            issue_id=test_issue.id,
            attested_by=test_user.id,
            note="Already approved",
            approved_at=datetime.now(),
            approved_by=test_user.id,
        )
        db_session.add(attestation)
        await db_session.commit()

        response = await client.post(
            f"/api/rituals/{ritual.id}/approve-issue/{test_issue.id}",
            headers=auth_headers,
        )
        assert response.status_code == 400
        assert "already approved" in response.json()["detail"]


@pytest.mark.asyncio
class TestPendingGatesAPIEdgeCases:
    """Additional edge case tests for pending gates API endpoint."""

    async def test_get_issues_with_pending_gates_api_project_not_found(self, client, auth_headers):
        """Test getting pending gates for non-existent project."""
        response = await client.get(
            "/api/rituals/pending-gates?project_id=nonexistent",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_get_issues_with_pending_gates_api_not_member(self, client, auth_headers2, test_project):
        """Test getting pending gates when not a team member."""
        response = await client.get(
            f"/api/rituals/pending-gates?project_id={test_project.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403


@pytest.mark.asyncio
class TestForceClearLimboAPIEdgeCases:
    """Additional edge case tests for force-clear limbo API endpoint."""

    async def test_force_clear_limbo_api_project_not_found(self, client, auth_headers):
        """Test force-clearing limbo for non-existent project."""
        response = await client.post(
            "/api/rituals/force-clear-limbo?project_id=nonexistent",
            headers=auth_headers,
        )
        assert response.status_code == 404

    async def test_force_clear_limbo_api_success(
        self, client, auth_headers, test_project, db_session
    ):
        """Test successfully force-clearing limbo."""
        # Create limbo sprint and next sprint
        limbo_sprint = Sprint(
            project_id=test_project.id,
            name="Limbo Sprint",
            status=SprintStatus.ACTIVE,
            limbo=True,
        )
        next_sprint = Sprint(
            project_id=test_project.id,
            name="Next Sprint",
            status=SprintStatus.PLANNED,
        )
        db_session.add_all([limbo_sprint, next_sprint])
        await db_session.commit()

        response = await client.post(
            f"/api/rituals/force-clear-limbo?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "Limbo cleared successfully"
        assert data["next_sprint_name"] == "Next Sprint"

    async def test_force_clear_limbo_api_not_in_limbo(
        self, client, auth_headers, test_project, db_session
    ):
        """Test force-clearing when not in limbo."""
        # Create a non-limbo sprint
        sprint = Sprint(
            project_id=test_project.id,
            name="Active Sprint",
            status=SprintStatus.ACTIVE,
            limbo=False,
        )
        db_session.add(sprint)
        await db_session.commit()

        response = await client.post(
            f"/api/rituals/force-clear-limbo?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 400
        assert "not in limbo" in response.json()["detail"]

    async def test_force_clear_limbo_api_not_admin(
        self, client, auth_headers2, test_project, test_user2, test_team, db_session
    ):
        """Test that non-admins cannot force-clear limbo."""
        from app.models.team import TeamMember, TeamRole

        # Add user2 as member
        member = TeamMember(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        db_session.add(member)

        # Create limbo sprint
        limbo_sprint = Sprint(
            project_id=test_project.id,
            name="Limbo Sprint",
            status=SprintStatus.ACTIVE,
            limbo=True,
        )
        db_session.add(limbo_sprint)
        await db_session.commit()

        response = await client.post(
            f"/api/rituals/force-clear-limbo?project_id={test_project.id}",
            headers=auth_headers2,
        )
        assert response.status_code == 403
        assert "Only admins" in response.json()["detail"]


@pytest.mark.asyncio
class TestPendingTicketRitualsAPISuccessPaths:
    """Tests for pending ticket rituals API success paths."""

    async def test_get_pending_ticket_rituals_with_rituals(
        self, client, auth_headers, test_project, test_user, db_session
    ):
        """Test getting pending ticket rituals when rituals exist."""
        # Create a ticket-close ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="close-ritual",
            prompt="Did you close properly?",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
        )
        db_session.add(ritual)

        # Create an issue
        issue = Issue(
            project_id=test_project.id,
            identifier="TEST-PR1",
            number=1,
            title="Test Issue",
            status="in_progress",
            priority="medium",
            creator_id=test_user.id,
        )
        db_session.add(issue)
        await db_session.commit()
        await db_session.refresh(issue)

        response = await client.get(
            f"/api/rituals/issue/{issue.id}/pending",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data["issue_id"] == issue.id
        assert len(data["pending_rituals"]) == 1
        assert data["pending_rituals"][0]["name"] == "close-ritual"

    async def test_get_pending_ticket_rituals_empty(
        self, client, auth_headers, test_project, test_user, db_session
    ):
        """Test getting pending ticket rituals when none exist."""
        issue = Issue(
            project_id=test_project.id,
            identifier="TEST-PR2",
            number=2,
            title="Test Issue No Rituals",
            status="in_progress",
            priority="medium",
            creator_id=test_user.id,
        )
        db_session.add(issue)
        await db_session.commit()
        await db_session.refresh(issue)

        response = await client.get(
            f"/api/rituals/issue/{issue.id}/pending",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data["issue_id"] == issue.id
        assert len(data["pending_rituals"]) == 0

    async def test_get_pending_ticket_rituals_issue_not_found(
        self, client, auth_headers
    ):
        """Test getting pending ticket rituals for non-existent issue."""
        response = await client.get(
            "/api/rituals/issue/nonexistent/pending",
            headers=auth_headers,
        )
        assert response.status_code == 404
        assert "Issue not found" in response.json()["detail"]


@pytest.mark.asyncio
class TestPendingGatesAPISuccessPaths:
    """Tests for pending gates API success paths."""

    async def test_get_issues_with_pending_gates_success(
        self, client, auth_headers, test_project, test_user, db_session
    ):
        """Test getting issues with pending GATE rituals."""
        from app.models.ticket_limbo import TicketLimbo, LimboType

        # Create a GATE ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="gate-ritual",
            prompt="Requires human approval",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)

        # Create an issue
        issue = Issue(
            project_id=test_project.id,
            identifier="TEST-GATE1",
            number=10,
            title="Gated Issue",
            status="in_progress",
            priority="medium",
            creator_id=test_user.id,
        )
        db_session.add(issue)
        await db_session.commit()
        await db_session.refresh(ritual)
        await db_session.refresh(issue)

        # Create a ticket limbo record
        limbo = TicketLimbo(
            issue_id=issue.id,
            ritual_id=ritual.id,
            limbo_type=LimboType.CLOSE,
            requested_by_id=test_user.id,
        )
        db_session.add(limbo)
        await db_session.commit()

        response = await client.get(
            f"/api/rituals/pending-gates?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 1
        # Find our issue in the response
        issue_data = next((i for i in data if i["issue_id"] == issue.id), None)
        assert issue_data is not None
        assert issue_data["title"] == "Gated Issue"

    async def test_get_issues_with_pending_gates_empty(
        self, client, auth_headers, test_project
    ):
        """Test getting pending gates when none exist."""
        response = await client.get(
            f"/api/rituals/pending-gates?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)


@pytest.mark.asyncio
class TestOrphanedLimboCleanup:
    """Tests for orphaned ticket limbo cleanup (CHT-730)."""

    async def test_orphaned_limbo_cleared_on_pending_gates_query(
        self, client, auth_headers, test_project, test_user, db_session
    ):
        """Orphaned limbo records should be cleared when querying pending gates."""
        from app.models.ticket_limbo import TicketLimbo, LimboType
        from app.models.user import User
        from app.utils.security import get_password_hash

        # Create a separate approver user to verify cleared_by_id tracks approver
        approver = User(
            email="approver-orphan@test.local",
            hashed_password=get_password_hash("pass"),
            name="Approver User",
        )
        db_session.add(approver)

        # Create a GATE ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="gate-orphan-test",
            prompt="Requires approval",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)

        # Create an issue
        issue = Issue(
            project_id=test_project.id,
            identifier="TEST-ORPHAN1",
            number=20,
            title="Orphaned Limbo Issue",
            status="in_progress",
            priority="medium",
            creator_id=test_user.id,
        )
        db_session.add(issue)
        await db_session.commit()
        await db_session.refresh(ritual)
        await db_session.refresh(issue)
        await db_session.refresh(approver)

        # Create a limbo record (simulating a blocked close attempt)
        limbo = TicketLimbo(
            issue_id=issue.id,
            ritual_id=ritual.id,
            limbo_type=LimboType.CLOSE,
            requested_by_id=test_user.id,
        )
        db_session.add(limbo)
        await db_session.commit()
        await db_session.refresh(limbo)

        # Simulate an approved attestation existing (as if _clear_ticket_limbo failed)
        attestation = RitualAttestation(
            ritual_id=ritual.id,
            issue_id=issue.id,
            attested_by=test_user.id,
            approved_by=approver.id,
            approved_at=datetime.now(timezone.utc),
            note="Approved but limbo not cleared",
        )
        db_session.add(attestation)
        await db_session.commit()

        # Query pending gates - should trigger cleanup
        response = await client.get(
            f"/api/rituals/pending-gates?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()

        # The orphaned limbo record should have been cleaned up,
        # so this issue should NOT appear in pending gates
        issue_ids = [i["issue_id"] for i in data]
        assert issue.id not in issue_ids

        # Verify the limbo record was actually cleared in the database
        await db_session.refresh(limbo)
        assert limbo.cleared_at is not None
        # cleared_by_id should match the approver, not the requester
        assert limbo.cleared_by_id == approver.id

    async def test_non_orphaned_limbo_not_cleared(
        self, client, auth_headers, test_project, test_user, db_session
    ):
        """Limbo records without approved attestation should NOT be cleared."""
        from app.models.ticket_limbo import TicketLimbo, LimboType

        # Create a GATE ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="gate-pending-test",
            prompt="Requires approval",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)

        # Create an issue
        issue = Issue(
            project_id=test_project.id,
            identifier="TEST-PENDING1",
            number=21,
            title="Pending Limbo Issue",
            status="in_progress",
            priority="medium",
            creator_id=test_user.id,
        )
        db_session.add(issue)
        await db_session.commit()
        await db_session.refresh(ritual)
        await db_session.refresh(issue)

        # Create a limbo record
        limbo = TicketLimbo(
            issue_id=issue.id,
            ritual_id=ritual.id,
            limbo_type=LimboType.CLOSE,
            requested_by_id=test_user.id,
        )
        db_session.add(limbo)
        await db_session.commit()
        await db_session.refresh(limbo)

        # NO attestation exists - limbo should remain

        # Query pending gates
        response = await client.get(
            f"/api/rituals/pending-gates?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()

        # The issue SHOULD appear in pending gates
        issue_ids = [i["issue_id"] for i in data]
        assert issue.id in issue_ids

        # Verify the limbo record was NOT cleared
        await db_session.refresh(limbo)
        assert limbo.cleared_at is None

    async def test_unapproved_attestation_does_not_clear_limbo(
        self, client, auth_headers, test_project, test_user, db_session
    ):
        """Limbo records with unapproved attestation should NOT be cleared."""
        from app.models.ticket_limbo import TicketLimbo, LimboType

        # Create a REVIEW ritual
        ritual = Ritual(
            project_id=test_project.id,
            name="review-pending-test",
            prompt="Needs review",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.REVIEW,
        )
        db_session.add(ritual)

        issue = Issue(
            project_id=test_project.id,
            identifier="TEST-REVIEW1",
            number=22,
            title="Review Pending Issue",
            status="in_progress",
            priority="medium",
            creator_id=test_user.id,
        )
        db_session.add(issue)
        await db_session.commit()
        await db_session.refresh(ritual)
        await db_session.refresh(issue)

        limbo = TicketLimbo(
            issue_id=issue.id,
            ritual_id=ritual.id,
            limbo_type=LimboType.CLOSE,
            requested_by_id=test_user.id,
        )
        db_session.add(limbo)

        # Create an attestation that is NOT yet approved
        attestation = RitualAttestation(
            ritual_id=ritual.id,
            issue_id=issue.id,
            attested_by=test_user.id,
            approved_by=None,
            approved_at=None,
            note="Awaiting review",
        )
        db_session.add(attestation)
        await db_session.commit()
        await db_session.refresh(limbo)

        # Query pending gates
        response = await client.get(
            f"/api/rituals/pending-gates?project_id={test_project.id}",
            headers=auth_headers,
        )
        assert response.status_code == 200

        # Verify the limbo record was NOT cleared (attestation not approved)
        await db_session.refresh(limbo)
        assert limbo.cleared_at is None

    async def test_cleanup_failure_does_not_break_pending_gates(
        self, client, auth_headers, test_project, test_user, db_session
    ):
        """If cleanup fails, pending gates query should still return correct results."""
        from app.models.ticket_limbo import TicketLimbo, LimboType
        from unittest.mock import patch, AsyncMock

        # Create a GATE ritual and issue with limbo (no attestation = not orphaned)
        ritual = Ritual(
            project_id=test_project.id,
            name="gate-failure-test",
            prompt="Requires approval",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.GATE,
        )
        db_session.add(ritual)

        issue = Issue(
            project_id=test_project.id,
            identifier="TEST-FAIL1",
            number=23,
            title="Cleanup Failure Issue",
            status="in_progress",
            priority="medium",
            creator_id=test_user.id,
        )
        db_session.add(issue)
        await db_session.commit()
        await db_session.refresh(ritual)
        await db_session.refresh(issue)

        limbo = TicketLimbo(
            issue_id=issue.id,
            ritual_id=ritual.id,
            limbo_type=LimboType.CLOSE,
            requested_by_id=test_user.id,
        )
        db_session.add(limbo)
        await db_session.commit()

        # Mock cleanup to raise an exception
        with patch(
            "app.services.ritual_service.RitualService._cleanup_orphaned_ticket_limbo",
            new_callable=AsyncMock,
            side_effect=Exception("DB connection lost"),
        ):
            response = await client.get(
                f"/api/rituals/pending-gates?project_id={test_project.id}",
                headers=auth_headers,
            )

        assert response.status_code == 200
        data = response.json()

        # The issue should still appear in pending gates despite cleanup failure
        issue_ids = [i["issue_id"] for i in data]
        assert issue.id in issue_ids
