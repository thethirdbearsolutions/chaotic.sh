"""Tests for project config templates (CHT-1259).

Service-level: snapshot, create (incl. duplicate-name collision), apply
semantics (create-missing, update-with-approval, skip-without-approval,
never-delete, settings, idempotency, dry-run, forward-compat warnings).
API-level: the path-nested endpoints and their permission gates.
"""
import json

import pytest
import pytest_asyncio
from pydantic import ValidationError

from app.enums import (
    ApprovalMode,
    EstimateScale,
    RitualTrigger,
    TeamRole,
    UnestimatedHandling,
)
from app.schemas.ritual import RitualCreate
from app.schemas.template import (
    TemplateBody,
    TemplateCreate,
    TemplateSettings,
)
from app.services.ritual_service import RitualService
from app.services.template_service import TemplateService


def _simple_body(rituals=None, settings=None, extra_sections=None):
    sections = {}
    if rituals is not None:
        sections["rituals"] = rituals
    if settings is not None:
        sections["settings"] = settings
    if extra_sections:
        sections.update(extra_sections)
    return TemplateBody(version=1, sections=sections)


def _ritual_dict(name="write-tests", **overrides):
    d = {
        "name": name,
        "prompt": "Confirm new code has test coverage.",
        "trigger": "ticket_close",
        "approval_mode": "auto",
        "note_required": True,
        "is_active": True,
    }
    d.update(overrides)
    return d


@pytest_asyncio.fixture
async def member_user(db, test_team):
    """A plain (non-admin) member of test_team."""
    from app.oxyde_models.user import OxydeUser
    from app.oxyde_models.team import OxydeTeamMember
    from app.utils.security import get_password_hash

    user = await OxydeUser.objects.create(
        email="member@example.com",
        hashed_password=get_password_hash("testpassword123"),
        name="Member User",
    )
    await OxydeTeamMember.objects.create(
        team_id=test_team.id,
        user_id=user.id,
        role=TeamRole.MEMBER,
    )
    return user


@pytest_asyncio.fixture
async def member_headers(member_user):
    from app.utils.security import create_access_token

    token = create_access_token(data={"sub": member_user.id})
    return {"Authorization": f"Bearer {token}"}


# =========================================================================
# Body schema
# =========================================================================


def test_body_rejects_unsupported_version():
    with pytest.raises(ValidationError, match="version"):
        TemplateBody(version=2, sections={})


def test_body_rejects_non_list_rituals():
    with pytest.raises(ValidationError, match="rituals"):
        TemplateBody(version=1, sections={"rituals": {"not": "a list"}})


def test_body_rejects_non_dict_settings():
    with pytest.raises(ValidationError, match="settings"):
        TemplateBody(version=1, sections={"settings": ["not", "a", "dict"]})


def test_body_rejects_malformed_ritual():
    with pytest.raises(ValidationError):
        TemplateBody(version=1, sections={"rituals": [{"name": "x"}]})  # no prompt


def test_body_rejects_bad_ritual_name():
    with pytest.raises(ValidationError):
        TemplateBody(
            version=1, sections={"rituals": [_ritual_dict(name="-bad name-")]}
        )


def test_body_preserves_unknown_sections():
    body = _simple_body(
        rituals=[_ritual_dict()],
        extra_sections={"hooks": [{"event": "ticket_close", "command": "true"}]},
    )
    assert body.unknown_sections() == ["hooks"]
    # Round-trips through dump/validate untouched.
    body2 = TemplateBody.model_validate(body.model_dump(mode="json"))
    assert body2.sections["hooks"] == [{"event": "ticket_close", "command": "true"}]


def test_body_coerces_enum_names_and_values():
    body = _simple_body(
        rituals=[
            _ritual_dict(name="a", trigger="TICKET_CLOSE", approval_mode="REVIEW"),
            _ritual_dict(name="b", trigger="ticket_claim", approval_mode="gate"),
        ],
        settings={"estimate_scale": "LINEAR"},
    )
    rituals = body.rituals()
    assert rituals[0].trigger == RitualTrigger.TICKET_CLOSE
    assert rituals[0].approval_mode == ApprovalMode.REVIEW
    assert rituals[1].trigger == RitualTrigger.TICKET_CLAIM
    assert rituals[1].approval_mode == ApprovalMode.GATE
    assert body.settings().estimate_scale == EstimateScale.LINEAR


def test_template_name_validation():
    with pytest.raises(ValidationError):
        TemplateCreate(name="has spaces", body=_simple_body())
    with pytest.raises(ValidationError):
        TemplateCreate(name="-leading", body=_simple_body())
    ok = TemplateCreate(name="my-template_1", body=_simple_body())
    assert ok.name == "my-template_1"


# =========================================================================
# Service: snapshot + create
# =========================================================================


@pytest.mark.asyncio
async def test_snapshot_captures_rituals_and_settings(db, test_team, test_project):
    ritual_service = RitualService()
    await ritual_service.create(
        RitualCreate(
            name="write-tests",
            prompt="Confirm new code has test coverage.",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.REVIEW,
            note_required=True,
        ),
        test_project.id,
    )
    await ritual_service.create(
        RitualCreate(
            name="sprint-review",
            prompt="Summarize what shipped this sprint.",
            trigger=RitualTrigger.EVERY_SPRINT,
            approval_mode=ApprovalMode.GATE,
            note_required=False,
        ),
        test_project.id,
    )

    service = TemplateService()
    template_in = await service.snapshot_project("my-snapshot", test_project)

    rituals = {r.name: r for r in template_in.body.rituals()}
    assert set(rituals) == {"write-tests", "sprint-review"}
    assert rituals["write-tests"].trigger == RitualTrigger.TICKET_CLOSE
    assert rituals["write-tests"].approval_mode == ApprovalMode.REVIEW
    assert rituals["write-tests"].note_required is True
    assert rituals["sprint-review"].approval_mode == ApprovalMode.GATE
    assert rituals["sprint-review"].note_required is False

    settings = template_in.body.settings()
    assert settings.estimate_scale == EstimateScale.FIBONACCI
    assert settings.unestimated_handling == UnestimatedHandling.DEFAULT_ONE_POINT
    assert settings.human_rituals_required is False
    assert settings.require_estimate_on_claim is False


@pytest.mark.asyncio
async def test_create_and_get_by_name(db, test_team):
    service = TemplateService()
    template = await service.create(
        TemplateCreate(
            name="tpl", description="a template", body=_simple_body(rituals=[])
        ),
        test_team.id,
    )
    assert template.name == "tpl"
    fetched = await service.get_by_name(test_team.id, "tpl")
    assert fetched is not None
    assert fetched.id == template.id
    body = json.loads(fetched.body)
    assert body["version"] == 1


@pytest.mark.asyncio
async def test_create_duplicate_name_raises(db, test_team):
    service = TemplateService()
    await service.create(
        TemplateCreate(name="tpl", body=_simple_body()), test_team.id
    )
    with pytest.raises(ValueError, match="already exists"):
        await service.create(
            TemplateCreate(name="tpl", body=_simple_body()), test_team.id
        )


@pytest.mark.asyncio
async def test_same_name_ok_across_teams(db, test_team, test_user):
    from app.oxyde_models.team import OxydeTeam, OxydeTeamMember

    other_team = await OxydeTeam.objects.create(name="Other", key="OTHR")
    await OxydeTeamMember.objects.create(
        team_id=other_team.id, user_id=test_user.id, role=TeamRole.OWNER
    )
    service = TemplateService()
    await service.create(TemplateCreate(name="tpl", body=_simple_body()), test_team.id)
    # Same name in a different team must not collide.
    other = await service.create(
        TemplateCreate(name="tpl", body=_simple_body()), other_team.id
    )
    assert other.team_id == other_team.id


@pytest.mark.asyncio
async def test_list_by_team_sorted(db, test_team):
    service = TemplateService()
    await service.create(TemplateCreate(name="zeta", body=_simple_body()), test_team.id)
    await service.create(TemplateCreate(name="alpha", body=_simple_body()), test_team.id)
    names = [t.name for t in await service.list_by_team(test_team.id)]
    assert names == ["alpha", "zeta"]


@pytest.mark.asyncio
async def test_delete(db, test_team):
    service = TemplateService()
    template = await service.create(
        TemplateCreate(name="tpl", body=_simple_body()), test_team.id
    )
    await service.delete(template)
    assert await service.get_by_name(test_team.id, "tpl") is None


# =========================================================================
# Service: apply
# =========================================================================


async def _make_template(team_id, name="tpl", rituals=None, settings=None, extra=None):
    return await TemplateService().create(
        TemplateCreate(
            name=name,
            body=_simple_body(
                rituals=rituals if rituals is not None else [],
                settings=settings,
                extra_sections=extra,
            ),
        ),
        team_id,
    )


@pytest.mark.asyncio
async def test_apply_creates_missing_rituals(db, test_team, test_project):
    template = await _make_template(
        test_team.id,
        rituals=[_ritual_dict("write-tests"), _ritual_dict("link-to-epic")],
    )
    report = await TemplateService().apply(template, test_project)

    assert [c.action for c in report.rituals] == ["create", "create"]
    created = await RitualService().list_by_project(test_project.id)
    assert {r.name for r in created} == {"write-tests", "link-to-epic"}


@pytest.mark.asyncio
async def test_apply_is_idempotent(db, test_team, test_project):
    template = await _make_template(
        test_team.id,
        rituals=[_ritual_dict("write-tests")],
        settings={"estimate_scale": "linear", "default_sprint_budget": 10},
    )
    service = TemplateService()

    first = await service.apply(template, test_project, update_all=True)
    assert [c.action for c in first.rituals] == ["create"]
    assert {c.field: c.action for c in first.settings} == {
        "estimate_scale": "set",
        "default_sprint_budget": "set",
    }

    # Second run: everything unchanged, nothing written.
    from app.oxyde_models.project import OxydeProject

    project = await OxydeProject.objects.get(id=test_project.id)
    second = await service.apply(template, project, update_all=True)
    assert [c.action for c in second.rituals] == ["unchanged"]
    assert all(c.action == "unchanged" for c in second.settings)

    rituals = await RitualService().list_by_project(test_project.id)
    assert len(rituals) == 1  # no duplicate created


@pytest.mark.asyncio
async def test_apply_skips_conflicting_ritual_without_approval(
    db, test_team, test_project
):
    await RitualService().create(
        RitualCreate(
            name="write-tests",
            prompt="Old prompt.",
            trigger=RitualTrigger.TICKET_CLOSE,
        ),
        test_project.id,
    )
    template = await _make_template(
        test_team.id, rituals=[_ritual_dict("write-tests", prompt="New prompt.")]
    )
    report = await TemplateService().apply(template, test_project)

    assert report.rituals[0].action == "skipped"
    assert report.rituals[0].fields_changed == ["prompt"]
    # Existing ritual untouched.
    existing = await RitualService().get_by_name(test_project.id, "write-tests")
    assert existing.prompt == "Old prompt."


@pytest.mark.asyncio
async def test_apply_updates_with_update_all(db, test_team, test_project):
    await RitualService().create(
        RitualCreate(
            name="write-tests",
            prompt="Old prompt.",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.AUTO,
        ),
        test_project.id,
    )
    template = await _make_template(
        test_team.id,
        rituals=[
            _ritual_dict("write-tests", prompt="New prompt.", approval_mode="review")
        ],
    )
    report = await TemplateService().apply(template, test_project, update_all=True)

    assert report.rituals[0].action == "update"
    assert sorted(report.rituals[0].fields_changed) == ["approval_mode", "prompt"]
    updated = await RitualService().get_by_name(test_project.id, "write-tests")
    assert updated.prompt == "New prompt."
    assert updated.approval_mode == ApprovalMode.REVIEW


@pytest.mark.asyncio
async def test_apply_updates_with_per_name_approval(db, test_team, test_project):
    ritual_service = RitualService()
    await ritual_service.create(
        RitualCreate(name="a", prompt="Old A.", trigger=RitualTrigger.TICKET_CLOSE),
        test_project.id,
    )
    await ritual_service.create(
        RitualCreate(name="b", prompt="Old B.", trigger=RitualTrigger.TICKET_CLOSE),
        test_project.id,
    )
    template = await _make_template(
        test_team.id,
        rituals=[
            _ritual_dict("a", prompt="New A."),
            _ritual_dict("b", prompt="New B."),
        ],
    )
    report = await TemplateService().apply(
        template, test_project, update_rituals=["a"]
    )

    actions = {c.name: c.action for c in report.rituals}
    assert actions == {"a": "update", "b": "skipped"}
    assert (await ritual_service.get_by_name(test_project.id, "a")).prompt == "New A."
    assert (await ritual_service.get_by_name(test_project.id, "b")).prompt == "Old B."


@pytest.mark.asyncio
async def test_apply_never_deletes_extra_rituals(db, test_team, test_project):
    await RitualService().create(
        RitualCreate(
            name="project-local",
            prompt="Only in this project.",
            trigger=RitualTrigger.EVERY_SPRINT,
        ),
        test_project.id,
    )
    template = await _make_template(test_team.id, rituals=[_ritual_dict("write-tests")])
    report = await TemplateService().apply(template, test_project)

    names = {r.name for r in await RitualService().list_by_project(test_project.id)}
    assert names == {"project-local", "write-tests"}
    # The extra ritual doesn't even appear in the report.
    assert {c.name for c in report.rituals} == {"write-tests"}


@pytest.mark.asyncio
async def test_apply_settings_only_touches_pinned(db, test_team, test_project):
    template = await _make_template(
        test_team.id, settings={"default_sprint_budget": 20}
    )
    report = await TemplateService().apply(template, test_project)

    assert {c.field for c in report.settings} == {"default_sprint_budget"}
    from app.oxyde_models.project import OxydeProject

    project = await OxydeProject.objects.get(id=test_project.id)
    assert project.default_sprint_budget == 20
    # Unpinned settings untouched (still defaults).
    assert project.estimate_scale == EstimateScale.FIBONACCI


@pytest.mark.asyncio
async def test_apply_dry_run_writes_nothing(db, test_team, test_project):
    template = await _make_template(
        test_team.id,
        rituals=[_ritual_dict("write-tests")],
        settings={"estimate_scale": "linear"},
    )
    report = await TemplateService().apply(template, test_project, dry_run=True)

    assert report.dry_run is True
    assert [c.action for c in report.rituals] == ["create"]
    assert [c.action for c in report.settings] == ["set"]
    # Nothing actually written.
    assert await RitualService().list_by_project(test_project.id) == []
    from app.oxyde_models.project import OxydeProject

    project = await OxydeProject.objects.get(id=test_project.id)
    assert project.estimate_scale == EstimateScale.FIBONACCI


@pytest.mark.asyncio
async def test_apply_warns_on_unknown_section(db, test_team, test_project):
    template = await _make_template(
        test_team.id,
        rituals=[_ritual_dict("write-tests")],
        extra={"hooks": [{"event": "ticket_close"}]},
    )
    report = await TemplateService().apply(template, test_project)

    assert len(report.warnings) == 1
    assert "hooks" in report.warnings[0]
    # Known sections still applied.
    assert [c.action for c in report.rituals] == ["create"]


@pytest.mark.asyncio
async def test_apply_review_mode_ritual_created_with_mode(db, test_team, test_project):
    template = await _make_template(
        test_team.id,
        rituals=[
            _ritual_dict(
                "design-review",
                trigger="ticket_claim",
                approval_mode="review",
            )
        ],
    )
    await TemplateService().apply(template, test_project)
    ritual = await RitualService().get_by_name(test_project.id, "design-review")
    assert ritual.trigger == RitualTrigger.TICKET_CLAIM
    assert ritual.approval_mode == ApprovalMode.REVIEW


@pytest.mark.asyncio
async def test_snapshot_round_trips_through_apply(db, test_team, test_project):
    """snapshot -> create -> apply to a second project reproduces the
    rituals and settings; applying again is a no-op."""
    ritual_service = RitualService()
    await ritual_service.create(
        RitualCreate(
            name="write-tests",
            prompt="Confirm new code has test coverage.",
            trigger=RitualTrigger.TICKET_CLOSE,
            approval_mode=ApprovalMode.REVIEW,
        ),
        test_project.id,
    )
    from app.oxyde_models.project import OxydeProject

    other = await OxydeProject.objects.create(
        team_id=test_team.id, name="Other Project", key="OTHER"
    )

    service = TemplateService()
    template_in = await service.snapshot_project("snap", test_project)
    template = await service.create(template_in, test_team.id)

    first = await service.apply(template, other)
    assert [c.action for c in first.rituals] == ["create"]

    other = await OxydeProject.objects.get(id=other.id)
    second = await service.apply(template, other)
    assert [c.action for c in second.rituals] == ["unchanged"]
    assert all(c.action == "unchanged" for c in second.settings)


# =========================================================================
# API
# =========================================================================


@pytest.mark.asyncio
async def test_api_create_template(client, auth_headers, test_team):
    response = await client.post(
        f"/api/teams/{test_team.id}/templates",
        headers=auth_headers,
        json={
            "name": "my-template",
            "description": "test template",
            "body": {"version": 1, "sections": {"rituals": [_ritual_dict()]}},
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "my-template"
    assert data["team_id"] == test_team.id
    assert data["body"]["version"] == 1
    assert data["body"]["sections"]["rituals"][0]["name"] == "write-tests"


@pytest.mark.asyncio
async def test_api_create_duplicate_name_400(client, auth_headers, test_team):
    payload = {"name": "dup", "body": {"version": 1, "sections": {}}}
    r1 = await client.post(
        f"/api/teams/{test_team.id}/templates", headers=auth_headers, json=payload
    )
    assert r1.status_code == 201
    r2 = await client.post(
        f"/api/teams/{test_team.id}/templates", headers=auth_headers, json=payload
    )
    assert r2.status_code == 400
    assert "already exists" in r2.json()["detail"]


@pytest.mark.asyncio
async def test_api_create_bad_version_422(client, auth_headers, test_team):
    response = await client.post(
        f"/api/teams/{test_team.id}/templates",
        headers=auth_headers,
        json={"name": "bad", "body": {"version": 99, "sections": {}}},
    )
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_api_create_requires_admin(client, member_headers, test_team):
    response = await client.post(
        f"/api/teams/{test_team.id}/templates",
        headers=member_headers,
        json={"name": "nope", "body": {"version": 1, "sections": {}}},
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_api_create_not_member_403(client, auth_headers2, test_team):
    response = await client.post(
        f"/api/teams/{test_team.id}/templates",
        headers=auth_headers2,
        json={"name": "nope", "body": {"version": 1, "sections": {}}},
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_api_from_project(client, auth_headers, test_team, test_project):
    # Seed a ritual so the snapshot has content.
    await RitualService().create(
        RitualCreate(
            name="write-tests",
            prompt="Confirm new code has test coverage.",
            trigger=RitualTrigger.TICKET_CLOSE,
        ),
        test_project.id,
    )
    response = await client.post(
        f"/api/teams/{test_team.id}/templates/from-project",
        headers=auth_headers,
        json={"name": "snap", "project_id": test_project.id},
    )
    assert response.status_code == 201
    data = response.json()
    rituals = data["body"]["sections"]["rituals"]
    assert [r["name"] for r in rituals] == ["write-tests"]
    assert data["body"]["sections"]["settings"]["estimate_scale"] == "fibonacci"


@pytest.mark.asyncio
async def test_api_from_project_wrong_team_400(
    client, auth_headers, test_team, test_user, test_project
):
    from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
    from app.oxyde_models.project import OxydeProject

    other_team = await OxydeTeam.objects.create(name="Other", key="OTHR")
    await OxydeTeamMember.objects.create(
        team_id=other_team.id, user_id=test_user.id, role=TeamRole.OWNER
    )
    response = await client.post(
        f"/api/teams/{other_team.id}/templates/from-project",
        headers=auth_headers,
        json={"name": "snap", "project_id": test_project.id},
    )
    assert response.status_code == 400
    assert "different team" in response.json()["detail"]


@pytest.mark.asyncio
async def test_api_from_project_missing_project_404(
    client, auth_headers, test_team
):
    response = await client.post(
        f"/api/teams/{test_team.id}/templates/from-project",
        headers=auth_headers,
        json={"name": "snap", "project_id": "nonexistent"},
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_api_list_templates(client, auth_headers, test_team):
    await client.post(
        f"/api/teams/{test_team.id}/templates",
        headers=auth_headers,
        json={"name": "one", "body": {"version": 1, "sections": {}}},
    )
    response = await client.get(
        f"/api/teams/{test_team.id}/templates", headers=auth_headers
    )
    assert response.status_code == 200
    assert [t["name"] for t in response.json()] == ["one"]


@pytest.mark.asyncio
async def test_api_list_member_ok(client, member_headers, test_team):
    response = await client.get(
        f"/api/teams/{test_team.id}/templates", headers=member_headers
    )
    assert response.status_code == 200


@pytest.mark.asyncio
async def test_api_list_not_member_403(client, auth_headers2, test_team):
    response = await client.get(
        f"/api/teams/{test_team.id}/templates", headers=auth_headers2
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_api_get_and_delete(client, auth_headers, test_team):
    created = await client.post(
        f"/api/teams/{test_team.id}/templates",
        headers=auth_headers,
        json={"name": "tpl", "body": {"version": 1, "sections": {}}},
    )
    template_id = created.json()["id"]

    got = await client.get(f"/api/templates/{template_id}", headers=auth_headers)
    assert got.status_code == 200
    assert got.json()["name"] == "tpl"

    deleted = await client.delete(
        f"/api/templates/{template_id}", headers=auth_headers
    )
    assert deleted.status_code == 204

    gone = await client.get(f"/api/templates/{template_id}", headers=auth_headers)
    assert gone.status_code == 404


@pytest.mark.asyncio
async def test_api_delete_requires_admin(client, auth_headers, member_headers, test_team):
    created = await client.post(
        f"/api/teams/{test_team.id}/templates",
        headers=auth_headers,
        json={"name": "tpl", "body": {"version": 1, "sections": {}}},
    )
    template_id = created.json()["id"]
    response = await client.delete(
        f"/api/templates/{template_id}", headers=member_headers
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_api_get_404(client, auth_headers):
    response = await client.get("/api/templates/nonexistent", headers=auth_headers)
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_api_apply(client, auth_headers, test_team, test_project):
    created = await client.post(
        f"/api/teams/{test_team.id}/templates",
        headers=auth_headers,
        json={
            "name": "tpl",
            "body": {
                "version": 1,
                "sections": {
                    "rituals": [_ritual_dict()],
                    "settings": {"default_sprint_budget": 15},
                },
            },
        },
    )
    template_id = created.json()["id"]

    response = await client.post(
        f"/api/templates/{template_id}/apply",
        headers=auth_headers,
        json={"project_id": test_project.id},
    )
    assert response.status_code == 200
    report = response.json()
    assert report["project_key"] == test_project.key
    assert report["dry_run"] is False
    assert [c["action"] for c in report["rituals"]] == ["create"]
    assert [c["action"] for c in report["settings"]] == ["set"]

    # Apply again: no-op.
    response2 = await client.post(
        f"/api/templates/{template_id}/apply",
        headers=auth_headers,
        json={"project_id": test_project.id},
    )
    report2 = response2.json()
    assert [c["action"] for c in report2["rituals"]] == ["unchanged"]
    assert [c["action"] for c in report2["settings"]] == ["unchanged"]


@pytest.mark.asyncio
async def test_api_apply_dry_run(client, auth_headers, test_team, test_project):
    created = await client.post(
        f"/api/teams/{test_team.id}/templates",
        headers=auth_headers,
        json={
            "name": "tpl",
            "body": {"version": 1, "sections": {"rituals": [_ritual_dict()]}},
        },
    )
    template_id = created.json()["id"]
    response = await client.post(
        f"/api/templates/{template_id}/apply",
        headers=auth_headers,
        json={"project_id": test_project.id, "dry_run": True},
    )
    assert response.status_code == 200
    assert response.json()["dry_run"] is True
    assert await RitualService().list_by_project(test_project.id) == []


@pytest.mark.asyncio
async def test_api_apply_requires_admin(
    client, auth_headers, member_headers, test_team, test_project
):
    created = await client.post(
        f"/api/teams/{test_team.id}/templates",
        headers=auth_headers,
        json={"name": "tpl", "body": {"version": 1, "sections": {}}},
    )
    template_id = created.json()["id"]
    response = await client.post(
        f"/api/templates/{template_id}/apply",
        headers=member_headers,
        json={"project_id": test_project.id},
    )
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_api_apply_project_wrong_team_400(
    client, auth_headers, test_team, test_user
):
    from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
    from app.oxyde_models.project import OxydeProject

    other_team = await OxydeTeam.objects.create(name="Other", key="OTHR")
    await OxydeTeamMember.objects.create(
        team_id=other_team.id, user_id=test_user.id, role=TeamRole.OWNER
    )
    other_project = await OxydeProject.objects.create(
        team_id=other_team.id, name="Other Project", key="OP"
    )
    created = await client.post(
        f"/api/teams/{test_team.id}/templates",
        headers=auth_headers,
        json={"name": "tpl", "body": {"version": 1, "sections": {}}},
    )
    template_id = created.json()["id"]
    response = await client.post(
        f"/api/templates/{template_id}/apply",
        headers=auth_headers,
        json={"project_id": other_project.id},
    )
    assert response.status_code == 400
    assert "different team" in response.json()["detail"]
