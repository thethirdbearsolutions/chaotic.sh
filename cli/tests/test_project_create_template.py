"""Tests for project create --template (CHT-1262).

Resolves saved templates first, then bundled packs (installing the pack
as a team template on first use), and applies after create. A bad
template name fails before the project is created.
"""
import json

import pytest
from unittest.mock import patch, MagicMock


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


def _template(name="tpl", rituals=None, settings=None, description="a template"):
    """Template API response shape (same helper as test_template_commands)."""
    return {
        "id": f"{name}-uuid",
        "team_id": "test-team-123",
        "name": name,
        "description": description,
        "body": {
            "version": 1,
            "sections": {
                "rituals": rituals if rituals is not None else [],
                "settings": settings if settings is not None else {},
            },
        },
        "created_at": "2026-07-06T00:00:00Z",
        "updated_at": "2026-07-06T00:00:00Z",
    }


class TestProjectCreateWithTemplate:
    """CHT-1262: project create --template <name-or-pack>."""

    def test_saved_template_applied(self, cli_runner):
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[_template("house-rules")])
        # Fresh mock: attributes set on the client singleton leak across
        # tests, and this test asserts create_template was NOT called.
        client.create_template = MagicMock()
        client.create_project = MagicMock(return_value={
            "id": "new-proj-id", "name": "New", "key": "NEW",
        })
        client.apply_template = MagicMock(return_value={
            "template": "house-rules", "project_id": "new-proj-id",
            "project_key": "NEW", "dry_run": False,
            "rituals": [{"name": "write-tests", "action": "create", "fields_changed": []}],
            "settings": [], "warnings": [],
        })

        with patch('cli.main.set_current_project'):
            result = cli_runner.invoke(cli, [
                'project', 'create', 'New', 'new', '--template', 'house-rules',
            ])

        assert result.exit_code == 0
        assert 'house-rules' in result.output
        assert '1 ritual(s) created' in result.output
        client.apply_template.assert_called_once_with(
            'house-rules-uuid', 'new-proj-id', update_all=True,
        )
        # Saved template used directly -- no pack install.
        client.create_template.assert_not_called()

    def test_pack_fallback_installs_then_applies(self, cli_runner):
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[])  # no saved templates
        client.create_template = MagicMock(return_value=_template("solo-agent"))
        client.create_project = MagicMock(return_value={
            "id": "new-proj-id", "name": "New", "key": "NEW",
        })
        client.apply_template = MagicMock(return_value={
            "template": "solo-agent", "project_id": "new-proj-id",
            "project_key": "NEW", "dry_run": False,
            "rituals": [{"name": "write-tests", "action": "create", "fields_changed": []}],
            "settings": [], "warnings": [],
        })

        with patch('cli.main.set_current_project'):
            result = cli_runner.invoke(cli, [
                'project', 'create', 'New', 'new', '--template', 'solo-agent',
            ])

        assert result.exit_code == 0
        # Pack installed as a team template first, then applied.
        assert client.create_template.call_args[0][1] == 'solo-agent'
        client.apply_template.assert_called_once_with(
            'solo-agent-uuid', 'new-proj-id', update_all=True,
        )

    def test_unknown_template_fails_before_creating_project(self, cli_runner):
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[])
        client.create_project = MagicMock()

        with patch('cli.main.set_current_project'):
            result = cli_runner.invoke(cli, [
                'project', 'create', 'New', 'new', '--template', 'nope',
            ])

        assert result.exit_code == 1
        assert 'nope' in result.output
        client.create_project.assert_not_called()

    def test_unknown_template_json_error_shape(self, cli_runner):
        """PR #220 review finding 4: {"error": ...} on stdout under --json."""
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[])
        client.create_project = MagicMock()

        with patch('cli.main.set_current_project'):
            result = cli_runner.invoke(cli, [
                'project', 'create', 'New', 'new', '--template', 'nope', '--json',
            ])

        assert result.exit_code == 1
        data = json.loads(result.stdout)
        assert 'nope' in data["error"]
        client.create_project.assert_not_called()

    def test_apply_failure_after_create_names_partial_state(self, cli_runner):
        """PR #220 review finding 9: if apply fails after the project was
        created, say so -- the project exists and is set current."""
        from cli.main import cli, client
        from cli.client import APIError

        client.get_templates = MagicMock(return_value=[_template("house-rules")])
        client.create_project = MagicMock(return_value={
            "id": "new-proj-id", "name": "New", "key": "NEW",
        })
        client.apply_template = MagicMock(side_effect=APIError("boom"))

        with patch('cli.main.set_current_project'):
            result = cli_runner.invoke(cli, [
                'project', 'create', 'New', 'new', '--template', 'house-rules',
            ])

        assert result.exit_code == 1
        assert 'was created' in result.output
        assert 'template apply house-rules' in result.output

    def test_without_template_unchanged(self, cli_runner):
        from cli.main import cli, client

        client.create_project = MagicMock(return_value={
            "id": "new-proj-id", "name": "New", "key": "NEW",
        })
        client.apply_template = MagicMock()

        with patch('cli.main.set_current_project'):
            result = cli_runner.invoke(cli, ['project', 'create', 'New', 'new'])

        assert result.exit_code == 0
        client.apply_template.assert_not_called()

    def test_json_includes_report(self, cli_runner):
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[_template("house-rules")])
        client.create_project = MagicMock(return_value={
            "id": "new-proj-id", "name": "New", "key": "NEW",
        })
        client.apply_template = MagicMock(return_value={
            "template": "house-rules", "project_id": "new-proj-id",
            "project_key": "NEW", "dry_run": False,
            "rituals": [], "settings": [], "warnings": [],
        })

        with patch('cli.main.set_current_project'):
            result = cli_runner.invoke(cli, [
                'project', 'create', 'New', 'new',
                '--template', 'house-rules', '--json',
            ])

        assert result.exit_code == 0
        data = json.loads(result.output)
        assert data["id"] == "new-proj-id"
        assert data["template_applied"]["template"] == "house-rules"
