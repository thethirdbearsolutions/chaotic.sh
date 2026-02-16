"""E2E contract tests: Rituals, ritual groups, limbo, and attestations."""
import pytest
from cli.client import APIError


class TestRitualCRUD:
    def test_create_ritual(self, api_client, test_project):
        ritual = api_client.create_ritual(
            test_project["id"], "standup", "What did you do today?",
            trigger="every_sprint", approval_mode="auto",
        )
        assert ritual["name"] == "standup"
        assert "id" in ritual

    def test_get_rituals(self, api_client, test_project):
        api_client.create_ritual(
            test_project["id"], "ritual-a", "Prompt A", trigger="every_sprint"
        )
        api_client.create_ritual(
            test_project["id"], "ritual-b", "Prompt B", trigger="every_sprint"
        )
        rituals = api_client.get_rituals(test_project["id"])
        assert isinstance(rituals, list)
        assert len(rituals) >= 2

    def test_get_rituals_include_inactive(self, api_client, test_project):
        ritual = api_client.create_ritual(
            test_project["id"], "deactivate-me", "Prompt", trigger="every_sprint"
        )
        api_client.delete_ritual(ritual["id"])
        rituals = api_client.get_rituals(test_project["id"], include_inactive=True)
        assert isinstance(rituals, list)

    def test_update_ritual(self, api_client, test_project):
        ritual = api_client.create_ritual(
            test_project["id"], "to-update", "Old prompt", trigger="every_sprint"
        )
        updated = api_client.update_ritual(ritual["id"], prompt="New prompt")
        assert updated["prompt"] == "New prompt"

    def test_delete_ritual(self, api_client, test_project):
        ritual = api_client.create_ritual(
            test_project["id"], "to-delete", "Delete me", trigger="every_sprint"
        )
        api_client.delete_ritual(ritual["id"])
        # After delete (deactivate), it shouldn't show in active list
        rituals = api_client.get_rituals(test_project["id"])
        assert not any(r["id"] == ritual["id"] for r in rituals)

    def test_get_rituals_unauthenticated(self, unauthenticated_client):
        with pytest.raises(APIError):
            unauthenticated_client.get_rituals("fake-project")


class TestRitualHistory:
    def test_get_ritual_history(self, api_client, test_project):
        history = api_client.get_ritual_history(test_project["id"])
        assert isinstance(history, list)

    def test_get_ritual_history_with_pagination(self, api_client, test_project):
        history = api_client.get_ritual_history(
            test_project["id"], skip=0, limit=10
        )
        assert isinstance(history, list)


class TestLimboAndGates:
    def test_get_limbo_status(self, api_client, test_project):
        status = api_client.get_limbo_status(test_project["id"])
        assert isinstance(status, dict)

    def test_get_pending_gates(self, api_client, test_project):
        gates = api_client.get_pending_gates(test_project["id"])
        assert isinstance(gates, list)

    def test_force_clear_limbo_not_in_limbo(self, api_client, test_project):
        # Should fail when project is not in limbo
        with pytest.raises(APIError):
            api_client.force_clear_limbo(test_project["id"])


class TestRitualAttestation:
    def test_attest_ritual(self, api_client, test_project):
        ritual = api_client.create_ritual(
            test_project["id"], "attest-me", "Attest this",
            trigger="every_sprint", approval_mode="auto",
        )
        # Close sprint to trigger limbo rituals
        current = api_client.get_current_sprint(test_project["id"])
        api_client.close_sprint(current["id"])
        result = api_client.attest_ritual(
            ritual["id"], test_project["id"], note="Done"
        )
        assert result is not None

    def test_get_pending_issue_rituals(self, api_client, test_project):
        issue = api_client.create_issue(test_project["id"], "Ritual Issue")
        pending = api_client.get_pending_issue_rituals(issue["id"])
        assert isinstance(pending, dict)


class TestRitualGroups:
    def test_create_ritual_group(self, api_client, test_project):
        group = api_client.create_ritual_group(
            test_project["id"], "Test Group"
        )
        assert group["name"] == "Test Group"
        assert "id" in group

    def test_get_ritual_groups(self, api_client, test_project):
        api_client.create_ritual_group(test_project["id"], "Group A")
        api_client.create_ritual_group(test_project["id"], "Group B")
        groups = api_client.get_ritual_groups(test_project["id"])
        assert isinstance(groups, list)
        assert len(groups) >= 2

    def test_get_ritual_group(self, api_client, test_project):
        group = api_client.create_ritual_group(test_project["id"], "Get Group")
        fetched = api_client.get_ritual_group(group["id"])
        assert fetched["id"] == group["id"]

    def test_update_ritual_group(self, api_client, test_project):
        group = api_client.create_ritual_group(test_project["id"], "Old Group")
        updated = api_client.update_ritual_group(group["id"], name="New Group")
        assert updated["name"] == "New Group"

    def test_delete_ritual_group(self, api_client, test_project):
        group = api_client.create_ritual_group(test_project["id"], "Del Group")
        api_client.delete_ritual_group(group["id"])
        groups = api_client.get_ritual_groups(test_project["id"])
        assert not any(g["id"] == group["id"] for g in groups)
