"""Tests for the objects.create()/bulk_create() defaults patch in app.oxyde_db.

Oxyde 0.7 serializes INSERT payloads with exclude_unset, so Pydantic
defaults never reach the DB unless supplied explicitly. The patch in
app/oxyde_db.py compensates. These tests pin every path:

- create(**kwargs) injects default_factory values (timestamps, uuid pks)
- create(**kwargs) injects plain non-None defaults (enums, booleans)
- create(**kwargs) does NOT stomp None-defaulted optional fields
- create(instance=...) does not raise ManagerError (the patch must not
  inject field kwargs alongside an instance) and still lands defaults
- bulk_create with dict payloads injects defaults
- bulk_create with instances lands defaults
"""
import pytest

from app.enums import ApprovalMode, RitualTrigger, InvitationStatus, TeamRole
from app.oxyde_models.ritual import OxydeRitual
from app.oxyde_models.team import OxydeTeamInvitation


pytestmark = pytest.mark.asyncio


async def _make_project(test_team):
    from app.oxyde_models.project import OxydeProject
    return await OxydeProject.objects.create(
        team_id=test_team.id, name="Defaults Proj", key="DEFP",
    )


async def test_create_kwargs_injects_enum_and_plain_defaults(db, test_team):
    """Enum defaults must come from the model, not SQL column defaults.

    rituals.approval_mode has SQL DEFAULT 'NONE' (no matching enum member);
    the model default is AUTO. Without the patch this create fails
    validating its own RETURNING row.
    """
    project = await _make_project(test_team)
    ritual = await OxydeRitual.objects.create(
        project_id=project.id, name="r1", prompt="p",
    )
    assert ritual.approval_mode == ApprovalMode.AUTO
    assert ritual.trigger == RitualTrigger.EVERY_SPRINT
    assert ritual.is_active is True
    assert ritual.weight == 1.0


async def test_create_kwargs_injects_default_factory_timestamps(db, test_team):
    project = await _make_project(test_team)
    ritual = await OxydeRitual.objects.create(
        project_id=project.id, name="r2", prompt="p",
    )
    assert ritual.id  # uuid default_factory
    assert ritual.created_at is not None
    assert ritual.created_at.tzinfo is not None  # DateTimeUTC coercion


async def test_create_kwargs_does_not_stomp_none_optionals(db, test_team):
    project = await _make_project(test_team)
    ritual = await OxydeRitual.objects.create(
        project_id=project.id, name="r3", prompt="p",
    )
    assert ritual.conditions is None
    assert ritual.percentage is None
    assert ritual.group_id is None


async def test_create_kwargs_explicit_value_wins_over_default(db, test_team):
    project = await _make_project(test_team)
    ritual = await OxydeRitual.objects.create(
        project_id=project.id, name="r4", prompt="p",
        approval_mode=ApprovalMode.GATE,
    )
    assert ritual.approval_mode == ApprovalMode.GATE


async def test_create_instance_does_not_raise_manager_error(db, test_team, test_user):
    """create(instance=...) forbids extra field kwargs; the patch must not
    inject any (oxyde raises ManagerError: 'either instance or field
    values, not both')."""
    import secrets
    from datetime import datetime, timedelta, timezone

    inv = OxydeTeamInvitation(
        team_id=test_team.id,
        email="instance-path@example.com",
        role=TeamRole.MEMBER,
        token=secrets.token_urlsafe(32),
        invited_by_id=test_user.id,
        expires_at=datetime.now(timezone.utc) + timedelta(days=7),
    )
    created = await OxydeTeamInvitation.objects.create(instance=inv)
    assert created.email == "instance-path@example.com"
    # Defaults landed despite exclude_unset INSERT serialization:
    assert created.status == InvitationStatus.PENDING
    assert created.created_at is not None
    assert created.created_at.tzinfo is not None


async def test_bulk_create_dict_payloads_inject_defaults(db, test_team):
    project = await _make_project(test_team)
    rituals = await OxydeRitual.objects.bulk_create([
        {"project_id": project.id, "name": "bulk-d1", "prompt": "p"},
        {"project_id": project.id, "name": "bulk-d2", "prompt": "p"},
    ])
    assert len(rituals) == 2
    fetched = await OxydeRitual.objects.filter(
        name__in=["bulk-d1", "bulk-d2"]
    ).all()
    assert len(fetched) == 2
    for r in fetched:
        assert r.approval_mode == ApprovalMode.AUTO
        assert r.trigger == RitualTrigger.EVERY_SPRINT
        assert r.created_at is not None


async def test_bulk_create_instances_land_defaults(db, test_team):
    project = await _make_project(test_team)
    await OxydeRitual.objects.bulk_create([
        OxydeRitual(project_id=project.id, name="bulk-i1", prompt="p"),
        OxydeRitual(project_id=project.id, name="bulk-i2", prompt="p"),
    ])
    fetched = await OxydeRitual.objects.filter(
        name__in=["bulk-i1", "bulk-i2"]
    ).all()
    assert len(fetched) == 2
    for r in fetched:
        assert r.approval_mode == ApprovalMode.AUTO
        assert r.is_active is True
        assert r.created_at is not None
