"""E2E contract tests: templates (CHT-1259..1262).

Real CLI Client against the real backend + migration 0013: snapshot,
apply idempotency, YAML-shaped round trip through create_template, and
the bundled packs applying cleanly to a scratch project.
"""
from contextlib import contextmanager
from unittest.mock import patch

import pytest

from app.utils.security import create_access_token
from cli.client import APIError, Client
from cli.commands.template_cmd import available_packs, _doc_to_body
from conftest import TEST_BASE_URL


@contextmanager
def _as_user(user):
    """A Client authenticated as `user`, scoped to this `with` block only.

    Same pattern as test_inbox.py: the api_client/api_client2 fixtures'
    get_token patches nest, so having both alive at once means the
    innermost silently wins for BOTH clients -- a tightly scoped patch
    is the only way to act as a second identity.
    """
    token = create_access_token(data={"sub": user.id})
    with patch('cli.client.get_api_url', return_value=TEST_BASE_URL), \
         patch('cli.client.get_token', return_value=token), \
         patch('cli.client.get_api_key', return_value=None):
        yield Client()


class TestTemplateCRUD:
    def test_create_from_project_and_get(self, api_client, test_team, test_project):
        api_client.create_ritual(
            test_project["id"], "write-tests", "Point to the tests.",
            trigger="ticket_close", approval_mode="auto",
        )
        template = api_client.create_template_from_project(
            test_team["id"], "house-rules", test_project["id"],
            description="our defaults",
        )
        assert template["name"] == "house-rules"
        assert template["description"] == "our defaults"
        rituals = template["body"]["sections"]["rituals"]
        assert [r["name"] for r in rituals] == ["write-tests"]
        settings = template["body"]["sections"]["settings"]
        assert settings["estimate_scale"] == "fibonacci"

        fetched = api_client.get_template(template["id"])
        assert fetched["body"] == template["body"]

    def test_list_templates(self, api_client, test_team):
        api_client.create_template(
            test_team["id"], "one", {"version": 1, "sections": {}},
        )
        api_client.create_template(
            test_team["id"], "two", {"version": 1, "sections": {}},
        )
        names = [t["name"] for t in api_client.get_templates(test_team["id"])]
        assert names == ["one", "two"]

    def test_duplicate_name_rejected(self, api_client, test_team):
        api_client.create_template(
            test_team["id"], "dup", {"version": 1, "sections": {}},
        )
        with pytest.raises(APIError, match="already exists"):
            api_client.create_template(
                test_team["id"], "dup", {"version": 1, "sections": {}},
            )

    def test_delete_template(self, api_client, test_team):
        template = api_client.create_template(
            test_team["id"], "goner", {"version": 1, "sections": {}},
        )
        api_client.delete_template(template["id"])
        assert api_client.get_templates(test_team["id"]) == []

    def test_bad_version_rejected(self, api_client, test_team):
        with pytest.raises(APIError, match="version"):
            api_client.create_template(
                test_team["id"], "future", {"version": 99, "sections": {}},
            )

    def test_duplicate_ritual_names_rejected(self, api_client, test_team):
        """PR #220 review finding 2, over the wire: 422 at create time."""
        ritual = {
            "name": "x", "prompt": "p", "trigger": "ticket_close",
            "approval_mode": "auto", "note_required": True, "is_active": True,
        }
        with pytest.raises(APIError, match="[Dd]uplicate"):
            api_client.create_template(
                test_team["id"], "dupes",
                {"version": 1, "sections": {"rituals": [ritual, dict(ritual)]}},
            )

    def test_null_setting_rejected_null_budget_pins_unlimited(
        self, api_client, test_team, test_project
    ):
        """PR #220 review finding 1, over the wire: a null non-budget
        setting 422s instead of vanishing; default_sprint_budget: null
        pins the project's budget to unlimited."""
        with pytest.raises(APIError, match="cannot be null"):
            api_client.create_template(
                test_team["id"], "nully",
                {"version": 1, "sections": {"settings": {"estimate_scale": None}}},
            )

        api_client.update_project(test_project["id"], default_sprint_budget=30)
        template = api_client.create_template(
            test_team["id"], "unlimited",
            {"version": 1, "sections": {"settings": {"default_sprint_budget": None}}},
        )
        report = api_client.apply_template(template["id"], test_project["id"])
        assert [c["action"] for c in report["settings"]] == ["set"]
        project = api_client.get_project(test_project["id"])
        assert project["default_sprint_budget"] is None


class TestTemplateApply:
    def test_apply_then_reapply_is_noop(self, api_client, test_team, test_project):
        """The apply-idempotency contract, end to end: run twice, the
        second run reports every line item unchanged and creates nothing."""
        body = {
            "version": 1,
            "sections": {
                "rituals": [{
                    "name": "write-tests",
                    "prompt": "Point to the tests.",
                    "trigger": "ticket_close",
                    "approval_mode": "auto",
                    "note_required": True,
                    "is_active": True,
                }],
                "settings": {"default_sprint_budget": 12},
            },
        }
        template = api_client.create_template(test_team["id"], "tpl", body)

        first = api_client.apply_template(template["id"], test_project["id"])
        assert [c["action"] for c in first["rituals"]] == ["create"]
        assert [c["action"] for c in first["settings"]] == ["set"]

        second = api_client.apply_template(template["id"], test_project["id"])
        assert [c["action"] for c in second["rituals"]] == ["unchanged"]
        assert [c["action"] for c in second["settings"]] == ["unchanged"]

        rituals = api_client.get_rituals(test_project["id"])
        assert len(rituals) == 1

        project = api_client.get_project(test_project["id"])
        assert project["default_sprint_budget"] == 12

    def test_apply_conflict_skipped_without_approval(
        self, api_client, test_team, test_project
    ):
        api_client.create_ritual(
            test_project["id"], "write-tests", "The local version.",
            trigger="ticket_close",
        )
        body = {
            "version": 1,
            "sections": {
                "rituals": [{
                    "name": "write-tests",
                    "prompt": "The template version.",
                    "trigger": "ticket_close",
                    "approval_mode": "auto",
                    "note_required": True,
                    "is_active": True,
                }],
            },
        }
        template = api_client.create_template(test_team["id"], "tpl", body)

        report = api_client.apply_template(template["id"], test_project["id"])
        assert report["rituals"][0]["action"] == "skipped"
        rituals = api_client.get_rituals(test_project["id"])
        assert rituals[0]["prompt"] == "The local version."

        # Approve the update by name.
        report = api_client.apply_template(
            template["id"], test_project["id"], update_rituals=["write-tests"],
        )
        assert report["rituals"][0]["action"] == "update"
        rituals = api_client.get_rituals(test_project["id"])
        assert rituals[0]["prompt"] == "The template version."

    def test_apply_never_deletes(self, api_client, test_team, test_project):
        api_client.create_ritual(
            test_project["id"], "project-local", "Only here.",
            trigger="every_sprint",
        )
        template = api_client.create_template(
            test_team["id"], "empty", {"version": 1, "sections": {"rituals": []}},
        )
        api_client.apply_template(template["id"], test_project["id"], update_all=True)
        names = [r["name"] for r in api_client.get_rituals(test_project["id"])]
        assert names == ["project-local"]

    def test_unknown_section_warns_not_crashes(
        self, api_client, test_team, test_project
    ):
        body = {
            "version": 1,
            "sections": {
                "rituals": [],
                "hooks": [{"event": "ticket_close", "command": "true"}],
            },
        }
        template = api_client.create_template(test_team["id"], "hooky", body)
        report = api_client.apply_template(template["id"], test_project["id"])
        assert len(report["warnings"]) == 1
        assert "hooks" in report["warnings"][0]
        # And the unknown section survived storage round trip.
        fetched = api_client.get_template(template["id"])
        assert fetched["body"]["sections"]["hooks"] == body["sections"]["hooks"]


class TestSnapshotRoundTrip:
    def test_snapshot_apply_to_second_project(
        self, api_client, test_team, test_project
    ):
        """Configure a project, snapshot it, apply to a fresh project:
        the fresh project ends up with the same rituals + settings."""
        api_client.create_ritual(
            test_project["id"], "write-tests", "Point to the tests.",
            trigger="ticket_close", approval_mode="review",
        )
        api_client.create_ritual(
            test_project["id"], "sprint-review", "Summarize the sprint.",
            trigger="every_sprint", approval_mode="gate", note_required=False,
        )
        api_client.update_project(test_project["id"], default_sprint_budget=8)

        template = api_client.create_template_from_project(
            test_team["id"], "snap", test_project["id"],
        )

        other = api_client.create_project(
            team_id=test_team["id"], name="Second Project", key="SEC",
        )
        report = api_client.apply_template(template["id"], other["id"])
        assert sorted(c["action"] for c in report["rituals"]) == ["create", "create"]

        rituals = {r["name"]: r for r in api_client.get_rituals(other["id"])}
        assert rituals["write-tests"]["approval_mode"] == "review"
        assert rituals["write-tests"]["trigger"] == "ticket_close"
        assert rituals["sprint-review"]["approval_mode"] == "gate"
        assert rituals["sprint-review"]["note_required"] is False

        other_fetched = api_client.get_project(other["id"])
        assert other_fetched["default_sprint_budget"] == 8

        # Idempotency on the second project too.
        second = api_client.apply_template(template["id"], other["id"])
        assert all(c["action"] == "unchanged" for c in second["rituals"])


class TestBundledPacks:
    """Every bundled pack must install and apply cleanly against a real
    scratch project -- the e2e half of the pack-content lint."""

    @pytest.mark.parametrize("pack_name", ["rigor", "consulting", "human-led", "solo-agent"])
    def test_pack_installs_and_applies(
        self, api_client, test_team, test_project, pack_name
    ):
        doc = available_packs()[pack_name]
        template = api_client.create_template(
            test_team["id"], doc["name"], _doc_to_body(doc),
            description=doc.get("description"),
        )

        report = api_client.apply_template(template["id"], test_project["id"])
        assert report["warnings"] == []
        assert all(c["action"] == "create" for c in report["rituals"])

        expected = [r["name"] for r in doc["sections"]["rituals"]]
        applied = {r["name"]: r for r in api_client.get_rituals(test_project["id"])}
        assert sorted(applied) == sorted(expected)
        for r_doc in doc["sections"]["rituals"]:
            r = applied[r_doc["name"]]
            assert r["trigger"] == r_doc["trigger"], r_doc["name"]
            assert r["approval_mode"] == r_doc["approval_mode"], r_doc["name"]
            assert r["prompt"] == r_doc["prompt"], r_doc["name"]

        # Re-apply: no-op.
        second = api_client.apply_template(template["id"], test_project["id"])
        assert all(c["action"] == "unchanged" for c in second["rituals"])


class TestTemplateAccessControl:
    def test_non_member_cannot_list(self, api_client, test_team, test_user2):
        api_client.create_template(
            test_team["id"], "secret", {"version": 1, "sections": {}},
        )
        with _as_user(test_user2) as outsider:
            with pytest.raises(APIError):
                outsider.get_templates(test_team["id"])

    def test_non_member_cannot_create(self, api_client, test_team, test_user2):
        with _as_user(test_user2) as outsider:
            with pytest.raises(APIError):
                outsider.create_template(
                    test_team["id"], "nope", {"version": 1, "sections": {}},
                )

    def test_non_member_cannot_apply(
        self, api_client, test_team, test_project, test_user2
    ):
        template = api_client.create_template(
            test_team["id"], "tpl", {"version": 1, "sections": {}},
        )
        with _as_user(test_user2) as outsider:
            with pytest.raises(APIError):
                outsider.apply_template(template["id"], test_project["id"])
