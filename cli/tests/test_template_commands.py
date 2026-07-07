"""Tests for template CLI commands (CHT-1259..1262).

Covers: template create/list/show/apply/delete, YAML export/import
round-trip (CHT-1260), bundled pack install + pack-content lint
(CHT-1261), and project create --template (CHT-1262).
"""
import json

import pytest
import yaml
from unittest.mock import patch, MagicMock


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


def _template(name="tpl", rituals=None, settings=None, description="a template"):
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


def _ritual(name="write-tests", **overrides):
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


def _report(rituals=None, settings=None, warnings=None, dry_run=False):
    return {
        "template": "tpl",
        "project_id": "test-project-123",
        "project_key": "PROJ",
        "dry_run": dry_run,
        "rituals": rituals or [],
        "settings": settings or [],
        "warnings": warnings or [],
    }


class TestTemplateCreate:
    def test_create_from_project(self, cli_runner):
        from cli.main import cli, client

        client.get_projects = MagicMock(return_value=[
            {"id": "proj-1", "key": "PROJ", "name": "Project"},
        ])
        client.create_template_from_project = MagicMock(
            return_value=_template("snap", rituals=[_ritual()])
        )

        result = cli_runner.invoke(cli, [
            'template', 'create', 'snap', '--from-project', 'PROJ',
        ])

        assert result.exit_code == 0
        assert 'snap' in result.output
        client.create_template_from_project.assert_called_once_with(
            'test-team-123', 'snap', 'proj-1', description=None,
        )

    def test_create_with_description(self, cli_runner):
        from cli.main import cli, client

        client.get_projects = MagicMock(return_value=[
            {"id": "proj-1", "key": "PROJ", "name": "Project"},
        ])
        client.create_template_from_project = MagicMock(
            return_value=_template("snap")
        )

        result = cli_runner.invoke(cli, [
            'template', 'create', 'snap', '--from-project', 'PROJ',
            '--description', 'house rules',
        ])

        assert result.exit_code == 0
        client.create_template_from_project.assert_called_once_with(
            'test-team-123', 'snap', 'proj-1', description='house rules',
        )

    def test_create_requires_from_project(self, cli_runner):
        from cli.main import cli

        result = cli_runner.invoke(cli, ['template', 'create', 'snap'])
        assert result.exit_code != 0

    def test_create_unknown_project(self, cli_runner):
        from cli.main import cli, client

        client.get_projects = MagicMock(return_value=[
            {"id": "proj-1", "key": "PROJ", "name": "Project"},
        ])

        result = cli_runner.invoke(cli, [
            'template', 'create', 'snap', '--from-project', 'NOPE',
        ])

        assert result.exit_code != 0
        assert 'not found' in result.output.lower()

    def test_create_json(self, cli_runner):
        from cli.main import cli, client

        client.get_projects = MagicMock(return_value=[
            {"id": "proj-1", "key": "PROJ", "name": "Project"},
        ])
        client.create_template_from_project = MagicMock(
            return_value=_template("snap")
        )

        result = cli_runner.invoke(cli, [
            'template', 'create', 'snap', '--from-project', 'PROJ', '--json',
        ])

        assert result.exit_code == 0
        data = json.loads(result.output)
        assert data["name"] == "snap"


class TestTemplateList:
    def test_list_shows_templates(self, cli_runner):
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[
            _template("rigor", rituals=[_ritual(), _ritual("link-to-epic")]),
        ])

        result = cli_runner.invoke(cli, ['template', 'list'])

        assert result.exit_code == 0
        assert 'rigor' in result.output
        assert '2' in result.output

    def test_list_empty(self, cli_runner):
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['template', 'list'])

        assert result.exit_code == 0
        assert 'No templates' in result.output

    def test_list_json(self, cli_runner):
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[_template("rigor")])

        result = cli_runner.invoke(cli, ['template', 'list', '--json'])

        assert result.exit_code == 0
        data = json.loads(result.output)
        assert data[0]["name"] == "rigor"


class TestTemplateShow:
    def test_show_details(self, cli_runner):
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[
            _template("tpl", rituals=[_ritual()], settings={"estimate_scale": "fibonacci"}),
        ])

        result = cli_runner.invoke(cli, ['template', 'show', 'tpl'])

        assert result.exit_code == 0
        assert 'write-tests' in result.output
        assert 'ticket-close' in result.output
        assert 'estimate_scale' in result.output

    def test_show_not_found(self, cli_runner):
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['template', 'show', 'nope'])

        assert result.exit_code == 1
        assert 'not found' in result.output.lower()

    def test_show_flags_unknown_sections(self, cli_runner):
        from cli.main import cli, client

        t = _template("tpl")
        t["body"]["sections"]["hooks"] = [{"event": "x"}]
        client.get_templates = MagicMock(return_value=[t])

        result = cli_runner.invoke(cli, ['template', 'show', 'tpl'])

        assert result.exit_code == 0
        assert 'hooks' in result.output

    def test_show_json(self, cli_runner):
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[_template("tpl")])

        result = cli_runner.invoke(cli, ['template', 'show', 'tpl', '--json'])

        assert result.exit_code == 0
        data = json.loads(result.output)
        assert data["name"] == "tpl"


class TestTemplateApply:
    def test_apply_no_conflicts(self, cli_runner):
        """Without --yes: dry-run first, then real apply with no approvals."""
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[_template("tpl")])
        dry = _report(rituals=[{"name": "write-tests", "action": "create", "fields_changed": []}], dry_run=True)
        real = _report(rituals=[{"name": "write-tests", "action": "create", "fields_changed": []}])
        client.apply_template = MagicMock(side_effect=[dry, real])

        result = cli_runner.invoke(cli, ['template', 'apply', 'tpl'])

        assert result.exit_code == 0
        assert 'created ritual' in result.output
        assert client.apply_template.call_count == 2
        # Dry-run pass:
        assert client.apply_template.call_args_list[0].kwargs == {
            "update_all": True, "dry_run": True,
        }
        # Real pass: nothing approved (no conflicts existed).
        assert client.apply_template.call_args_list[1].kwargs == {
            "update_rituals": [],
        }

    def test_apply_yes_updates_all(self, cli_runner):
        """--yes skips the dry run and applies with update_all."""
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[_template("tpl")])
        client.apply_template = MagicMock(return_value=_report(
            rituals=[{"name": "write-tests", "action": "update", "fields_changed": ["prompt"]}],
        ))

        result = cli_runner.invoke(cli, ['template', 'apply', 'tpl', '--yes'])

        assert result.exit_code == 0
        assert 'updated ritual' in result.output
        client.apply_template.assert_called_once_with(
            'tpl-uuid', 'test-project-123', update_all=True,
        )

    def test_apply_conflict_prompt_approve(self, cli_runner):
        """Answering y to the per-ritual prompt approves that update."""
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[_template("tpl")])
        dry = _report(
            rituals=[{"name": "write-tests", "action": "update", "fields_changed": ["prompt"]}],
            dry_run=True,
        )
        real = _report(
            rituals=[{"name": "write-tests", "action": "update", "fields_changed": ["prompt"]}],
        )
        client.apply_template = MagicMock(side_effect=[dry, real])

        result = cli_runner.invoke(cli, ['template', 'apply', 'tpl'], input='y\n')

        assert result.exit_code == 0
        assert client.apply_template.call_args_list[1].kwargs == {
            "update_rituals": ["write-tests"],
        }

    def test_apply_conflict_prompt_decline(self, cli_runner):
        """Answering n leaves the ritual out of the approved list."""
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[_template("tpl")])
        dry = _report(
            rituals=[{"name": "write-tests", "action": "update", "fields_changed": ["prompt"]}],
            dry_run=True,
        )
        real = _report(
            rituals=[{"name": "write-tests", "action": "skipped", "fields_changed": ["prompt"]}],
        )
        client.apply_template = MagicMock(side_effect=[dry, real])

        result = cli_runner.invoke(cli, ['template', 'apply', 'tpl'], input='n\n')

        assert result.exit_code == 0
        assert 'skipped' in result.output
        assert client.apply_template.call_args_list[1].kwargs == {
            "update_rituals": [],
        }

    def test_apply_json_without_yes_skips_conflicts(self, cli_runner):
        """--json without --yes never prompts; conflicts stay skipped."""
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[_template("tpl")])
        dry = _report(
            rituals=[{"name": "write-tests", "action": "update", "fields_changed": ["prompt"]}],
            dry_run=True,
        )
        real = _report(
            rituals=[{"name": "write-tests", "action": "skipped", "fields_changed": ["prompt"]}],
        )
        client.apply_template = MagicMock(side_effect=[dry, real])

        result = cli_runner.invoke(cli, ['template', 'apply', 'tpl', '--json'])

        assert result.exit_code == 0
        data = json.loads(result.output)
        assert data["rituals"][0]["action"] == "skipped"
        assert client.apply_template.call_args_list[1].kwargs == {
            "update_rituals": [],
        }

    def test_apply_json_with_yes(self, cli_runner):
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[_template("tpl")])
        client.apply_template = MagicMock(return_value=_report())

        result = cli_runner.invoke(cli, ['template', 'apply', 'tpl', '--yes', '--json'])

        assert result.exit_code == 0
        data = json.loads(result.output)
        assert data["template"] == "tpl"

    def test_apply_explicit_project(self, cli_runner):
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[_template("tpl")])
        client.get_projects = MagicMock(return_value=[
            {"id": "proj-other", "key": "OTHER", "name": "Other"},
        ])
        client.apply_template = MagicMock(return_value=_report())

        result = cli_runner.invoke(cli, [
            'template', 'apply', 'tpl', '--project', 'OTHER', '--yes',
        ])

        assert result.exit_code == 0
        client.apply_template.assert_called_once_with(
            'tpl-uuid', 'proj-other', update_all=True,
        )

    def test_apply_not_found(self, cli_runner):
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['template', 'apply', 'nope', '--yes'])

        assert result.exit_code == 1
        assert 'not found' in result.output.lower()

    def test_apply_not_found_json_error_shape(self, cli_runner):
        """PR #220 review finding 4: not-found under --json emits
        {"error": ...} on stdout, same contract as other failure paths."""
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['template', 'apply', 'nope', '--json'])

        assert result.exit_code == 1
        data = json.loads(result.stdout)
        assert 'not found' in data["error"]

    def test_apply_prints_warnings(self, cli_runner):
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[_template("tpl")])
        client.apply_template = MagicMock(return_value=_report(
            warnings=["Template contains section 'hooks' this server version doesn't understand; it was ignored. Upgrade to use it."],
        ))

        result = cli_runner.invoke(cli, ['template', 'apply', 'tpl', '--yes'])

        assert result.exit_code == 0
        assert 'hooks' in result.output


class TestTemplateDelete:
    def test_delete_with_yes(self, cli_runner):
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[_template("tpl")])
        client.delete_template = MagicMock()

        result = cli_runner.invoke(cli, ['template', 'delete', 'tpl', '--yes'])

        assert result.exit_code == 0
        assert 'deleted' in result.output.lower()
        client.delete_template.assert_called_once_with('tpl-uuid')

    def test_delete_prompt_decline(self, cli_runner):
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[_template("tpl")])
        client.delete_template = MagicMock()

        result = cli_runner.invoke(cli, ['template', 'delete', 'tpl'], input='n\n')

        assert result.exit_code == 0
        client.delete_template.assert_not_called()

    def test_delete_not_found(self, cli_runner):
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['template', 'delete', 'nope', '--yes'])

        assert result.exit_code == 1


class TestTemplateExportImport:
    """CHT-1260: YAML export/import, including the round trip."""

    def test_export_stdout(self, cli_runner):
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[
            _template("tpl", rituals=[_ritual()]),
        ])

        result = cli_runner.invoke(cli, ['template', 'export', 'tpl'])

        assert result.exit_code == 0
        doc = yaml.safe_load(result.output)
        assert doc["name"] == "tpl"
        assert doc["version"] == 1
        assert doc["sections"]["rituals"][0]["name"] == "write-tests"

    def test_export_to_file(self, cli_runner, tmp_path):
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[
            _template("tpl", rituals=[_ritual()]),
        ])
        out = tmp_path / "tpl.yml"

        result = cli_runner.invoke(cli, ['template', 'export', 'tpl', '-o', str(out)])

        assert result.exit_code == 0
        doc = yaml.safe_load(out.read_text())
        assert doc["name"] == "tpl"

    def test_export_multiline_prompt_is_literal_block(self, cli_runner):
        """Multiline prompts export as YAML literal blocks (human-reviewable)."""
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[
            _template("tpl", rituals=[_ritual(prompt="Line one.\nLine two.\n")]),
        ])

        result = cli_runner.invoke(cli, ['template', 'export', 'tpl'])

        assert result.exit_code == 0
        assert 'prompt: |' in result.output

    def test_export_not_found(self, cli_runner):
        from cli.main import cli, client

        client.get_templates = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ['template', 'export', 'nope'])

        assert result.exit_code == 1

    def test_import_file(self, cli_runner, tmp_path):
        from cli.main import cli, client

        doc = {
            "name": "imported",
            "description": "from a file",
            "version": 1,
            "sections": {"rituals": [_ritual()]},
        }
        f = tmp_path / "t.yml"
        f.write_text(yaml.safe_dump(doc))
        client.create_template = MagicMock(
            return_value=_template("imported", rituals=[_ritual()])
        )

        result = cli_runner.invoke(cli, ['template', 'import', str(f)])

        assert result.exit_code == 0
        client.create_template.assert_called_once_with(
            'test-team-123', 'imported',
            {"version": 1, "sections": {"rituals": [_ritual()]}},
            description='from a file',
        )

    def test_import_name_override(self, cli_runner, tmp_path):
        from cli.main import cli, client

        f = tmp_path / "t.yml"
        f.write_text(yaml.safe_dump({"name": "orig", "version": 1, "sections": {}}))
        client.create_template = MagicMock(return_value=_template("renamed"))

        result = cli_runner.invoke(cli, [
            'template', 'import', str(f), '--name', 'renamed',
        ])

        assert result.exit_code == 0
        assert client.create_template.call_args[0][1] == 'renamed'

    def test_import_missing_name_errors(self, cli_runner, tmp_path):
        from cli.main import cli

        f = tmp_path / "t.yml"
        f.write_text(yaml.safe_dump({"version": 1, "sections": {}}))

        result = cli_runner.invoke(cli, ['template', 'import', str(f)])

        assert result.exit_code != 0
        assert 'name' in result.output.lower()

    def test_import_malformed_yaml_errors(self, cli_runner, tmp_path):
        from cli.main import cli

        f = tmp_path / "t.yml"
        f.write_text("{unclosed: [")

        result = cli_runner.invoke(cli, ['template', 'import', str(f)])

        assert result.exit_code != 0

    def test_import_non_mapping_errors(self, cli_runner, tmp_path):
        from cli.main import cli

        f = tmp_path / "t.yml"
        f.write_text("- just\n- a\n- list\n")

        result = cli_runner.invoke(cli, ['template', 'import', str(f)])

        assert result.exit_code != 0

    def test_import_missing_file_errors(self, cli_runner):
        from cli.main import cli

        result = cli_runner.invoke(cli, ['template', 'import', '/no/such/file.yml'])

        assert result.exit_code != 0

    def test_import_non_json_scalar_fails_with_message(self, cli_runner, tmp_path):
        """PR #220 review finding 5: an unquoted YAML date parses to
        datetime.date, which JSON can't carry -- fail with a message, not
        a TypeError traceback."""
        from cli.main import cli

        f = tmp_path / "t.yml"
        f.write_text(
            "name: dated\nversion: 1\nsections:\n  notes:\n    when: 2026-01-01\n"
        )

        result = cli_runner.invoke(cli, ['template', 'import', str(f)])

        assert result.exit_code == 1
        assert 'JSON-representable' in result.output
        assert 'Traceback' not in result.output

    def test_round_trip_export_import(self, cli_runner, tmp_path):
        """Export then import reproduces the exact body, including
        multiline prompts and unknown sections."""
        from cli.main import cli, client

        original = _template(
            "round-trip",
            rituals=[
                _ritual(prompt="Line one.\nLine two.\n\n- a checklist item\n"),
                _ritual("design-review", trigger="ticket_claim", approval_mode="review"),
            ],
            settings={"estimate_scale": "fibonacci", "default_sprint_budget": 10},
        )
        original["body"]["sections"]["hooks"] = [{"event": "ticket_close", "command": "true"}]
        client.get_templates = MagicMock(return_value=[original])

        out = tmp_path / "rt.yml"
        result = cli_runner.invoke(cli, ['template', 'export', 'round-trip', '-o', str(out)])
        assert result.exit_code == 0

        client.create_template = MagicMock(return_value=original)
        result = cli_runner.invoke(cli, ['template', 'import', str(out)])
        assert result.exit_code == 0

        team, name, body = client.create_template.call_args[0]
        assert name == "round-trip"
        assert body == original["body"]
        assert client.create_template.call_args.kwargs["description"] == "a template"


class TestTemplateInstall:
    """CHT-1261: bundled starter packs."""

    def test_install_no_arg_lists_packs(self, cli_runner):
        from cli.main import cli

        result = cli_runner.invoke(cli, ['template', 'install'])

        assert result.exit_code == 0
        for pack in ("rigor", "consulting", "human-led", "solo-agent"):
            assert pack in result.output

    def test_install_no_arg_json(self, cli_runner):
        from cli.main import cli

        result = cli_runner.invoke(cli, ['template', 'install', '--json'])

        assert result.exit_code == 0
        data = json.loads(result.output)
        assert {p["name"] for p in data} == {"rigor", "consulting", "human-led", "solo-agent"}

    def test_install_pack(self, cli_runner):
        from cli.main import cli, client

        client.create_template = MagicMock(return_value=_template("rigor"))

        result = cli_runner.invoke(cli, ['template', 'install', 'rigor'])

        assert result.exit_code == 0
        assert 'rigor' in result.output
        team, name, body = client.create_template.call_args[0]
        assert team == 'test-team-123'
        assert name == 'rigor'
        assert body["version"] == 1
        ritual_names = [r["name"] for r in body["sections"]["rituals"]]
        assert ritual_names == [
            "write-tests", "link-to-epic", "design-review",
            "architecture-documentation",
        ]

    def test_install_pack_name_override(self, cli_runner):
        from cli.main import cli, client

        client.create_template = MagicMock(return_value=_template("my-rigor"))

        result = cli_runner.invoke(cli, [
            'template', 'install', 'rigor', '--name', 'my-rigor',
        ])

        assert result.exit_code == 0
        assert client.create_template.call_args[0][1] == 'my-rigor'

    def test_install_unknown_pack(self, cli_runner):
        from cli.main import cli

        result = cli_runner.invoke(cli, ['template', 'install', 'nope'])

        assert result.exit_code == 1
        assert 'Unknown pack' in result.output

    def test_install_unknown_pack_json_error_shape(self, cli_runner):
        """PR #220 review finding 4."""
        from cli.main import cli

        result = cli_runner.invoke(cli, ['template', 'install', 'nope', '--json'])

        assert result.exit_code == 1
        data = json.loads(result.stdout)
        assert 'Unknown pack' in data["error"]


class TestPackContentLint:
    """Every bundled pack must parse, be generic, and be applyable."""

    def _packs(self):
        from cli.commands.template_cmd import available_packs
        return available_packs()

    def test_all_four_packs_present(self):
        assert set(self._packs()) == {"rigor", "consulting", "human-led", "solo-agent"}

    def test_pack_shapes(self):
        for name, doc in self._packs().items():
            assert doc["version"] == 1, name
            assert doc.get("description"), name
            rituals = doc["sections"]["rituals"]
            assert rituals, name
            for r in rituals:
                assert set(r) == {
                    "name", "prompt", "trigger", "approval_mode",
                    "note_required", "is_active",
                }, (name, r["name"])
                assert r["trigger"] in ("every_sprint", "ticket_close", "ticket_claim")
                assert r["approval_mode"] in ("auto", "review", "gate")
                assert r["is_active"] is True
                assert isinstance(r["note_required"], bool)

    def test_pack_prompts_are_working_prompts(self):
        """Prompts are the policy: multi-line, substantial, not stubs."""
        for name, doc in self._packs().items():
            for r in doc["sections"]["rituals"]:
                lines = [l for l in r["prompt"].strip().splitlines() if l.strip()]
                assert len(lines) >= 5, (name, r["name"], len(lines))
                assert len(lines) <= 20, (name, r["name"], len(lines))

    def test_rigor_pack_structure(self):
        rigor = self._packs()["rigor"]
        rituals = {r["name"]: r for r in rigor["sections"]["rituals"]}
        assert rituals["write-tests"]["trigger"] == "ticket_close"
        assert rituals["link-to-epic"]["trigger"] == "ticket_close"
        assert rituals["design-review"]["trigger"] == "ticket_claim"
        assert rituals["design-review"]["approval_mode"] == "review"
        assert rituals["architecture-documentation"]["trigger"] == "every_sprint"

    def test_consulting_pack_structure(self):
        consulting = self._packs()["consulting"]
        rituals = {r["name"]: r for r in consulting["sections"]["rituals"]}
        assert rituals["orientation"]["trigger"] == "ticket_claim"
        assert rituals["silent-shortcut-audit"]["trigger"] == "ticket_close"
        assert rituals["reference-correctness"]["trigger"] == "ticket_close"
        assert rituals["pattern-drift-audit"]["trigger"] == "every_sprint"
        assert rituals["api-surface-review"]["trigger"] == "every_sprint"

    def test_human_led_pack_all_sprint_close_review(self):
        human_led = self._packs()["human-led"]
        rituals = human_led["sections"]["rituals"]
        assert {r["name"] for r in rituals} == {
            "sprint-review", "backlog-grooming", "docs-checkpoint",
        }
        for r in rituals:
            assert r["trigger"] == "every_sprint", r["name"]
            assert r["approval_mode"] == "review", r["name"]

    def test_solo_agent_pack_minimal(self):
        solo = self._packs()["solo-agent"]
        rituals = solo["sections"]["rituals"]
        assert len(rituals) == 1
        assert rituals[0]["name"] == "write-tests"
        assert rituals[0]["trigger"] == "ticket_close"
        assert rituals[0]["approval_mode"] == "auto"

    def test_packs_have_no_settings_section(self):
        """Packs configure rituals, not project settings -- applying one
        must never silently change estimate scales or budgets."""
        for name, doc in self._packs().items():
            assert "settings" not in doc["sections"], name
