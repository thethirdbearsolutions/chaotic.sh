"""Server text is printed as text, never parsed as Rich markup (CHT-1526).

Names, titles and error messages come from the server and from other
users. Printed as markup, a `[/bold]` raised MarkupError mid-print and a
`[red]` restyled everything after it. Each test feeds that string through
a real command (or the shared helpers) and expects it back verbatim.
"""
from unittest.mock import MagicMock, patch

import httpx
import pytest
from rich.console import Console

from cli.commands.shared import ritual_line_markup
from cli.markup import Markup, Table, esc, markup

EVIL = "[/bold]evil[red]"


def _render(renderable) -> str:
    console = Console(record=True, width=200, color_system=None)
    console.print(renderable)
    return console.export_text()


@pytest.fixture
def wide_console():
    """The CLI's console, wide enough that a table never wraps a cell."""
    from cli.commands import shared
    with patch.object(shared.console, "_stdout_console", Console(width=250)):
        yield


@pytest.fixture
def deps(patched_client, patched_auth, patched_project, wide_console):
    yield


class TestTable:
    def test_a_plain_cell_prints_literally(self):
        table = Table()
        table.add_column("Name")
        table.add_row(EVIL)
        assert EVIL in _render(table)

    def test_a_markup_cell_is_styled_and_none_stays_empty(self):
        table = Table()
        table.add_column("A")
        table.add_column("B")
        table.add_row(Markup(f"[bold]{esc(EVIL)}[/bold]"), markup(None))
        text = _render(table)
        assert EVIL in text and "[bold]" not in text and "None" not in text

    def test_esc_takes_any_value(self):
        assert esc(3) == "3" and esc(None) == "None"


class TestRitualLine:
    def test_name_and_labels_print_literally(self):
        line = ritual_line_markup({
            "name": EVIL, "approval_mode": "auto", "note_required": False,
            "group_name": EVIL, "is_active": False,
        })
        text = _render(line)
        # The labels used to vanish: `[deleted]` is a style tag to Rich.
        assert f"• {EVIL} (auto) [no note req] [group: {EVIL}] [deleted]" in text


class TestCommands:
    def _invoke(self, cli_runner, args):
        from cli.main import cli
        result = cli_runner.invoke(cli, args)
        assert result.exception is None or isinstance(result.exception, SystemExit), result.exception
        return result

    def test_issue_list(self, cli_runner, deps):
        from cli.main import client
        issue = {"id": "i1", "identifier": "CHT-1", "title": EVIL, "status": "todo", "priority": "high",
                 "issue_type": "task", "estimate": None, "sprint_id": "s1", "project_id": "p1"}
        with patch.object(client, "get_issues", MagicMock(return_value=[issue])), \
                patch.object(client, "get_sprints", MagicMock(return_value=[{"id": "s1", "name": EVIL}])):
            result = self._invoke(cli_runner, ["issue", "list"])
        assert result.exit_code == 0, result.output
        assert result.output.count(EVIL) == 2  # the title and the sprint

    def test_project_list(self, cli_runner, deps):
        from cli.main import client
        project = {"id": "p1", "key": "CHT", "name": EVIL, "issue_count": 1}
        with patch.object(client, "get_projects", MagicMock(return_value=[project])):
            result = self._invoke(cli_runner, ["project", "list"])
        assert result.exit_code == 0 and EVIL in result.output, result.output

    def test_label_list(self, cli_runner, deps):
        from cli.main import client
        with patch.object(client, "get_labels", MagicMock(return_value=[{"id": "l1-abcdef", "name": EVIL, "color": "#fff"}])):
            result = self._invoke(cli_runner, ["label", "list"])
        assert result.exit_code == 0 and EVIL in result.output, result.output

    def test_sprint_current_panel(self, cli_runner, deps):
        from cli.main import client
        sprint = {"id": "s1", "name": EVIL, "status": "active", "budget": 10, "points_spent": 3, "limbo": False}
        with patch.object(client, "get_current_sprint", MagicMock(return_value=sprint)):
            result = self._invoke(cli_runner, ["sprint", "current"])
        assert result.exit_code == 0 and EVIL in result.output, result.output

    def test_project_create_message(self, cli_runner, deps):
        from cli.main import client
        created = {"id": "p2", "key": "EV", "name": EVIL}
        with patch.object(client, "create_project", MagicMock(return_value=created)):
            result = self._invoke(cli_runner, ["project", "create", EVIL, "EV"])
        assert result.exit_code == 0 and EVIL in result.output, result.output

    @pytest.mark.parametrize("error", [
        httpx.ConnectError(EVIL),
        httpx.ReadError(EVIL),
    ])
    def test_error_text_from_the_network(self, cli_runner, deps, error):
        from cli.main import client
        with patch.object(client, "get_projects", MagicMock(side_effect=error)), \
                patch("cli.main.get_api_url", return_value=f"http://{EVIL}"):
            result = self._invoke(cli_runner, ["project", "list"])
        assert result.exit_code == 1 and EVIL in result.output, result.output

    def test_api_error_text(self, cli_runner, deps):
        from cli.main import APIError, client
        with patch.object(client, "get_projects", MagicMock(side_effect=APIError(f"Attested by {EVIL}"))):
            result = self._invoke(cli_runner, ["project", "list"])
        assert result.exit_code == 1 and f"Attested by {EVIL}" in result.output, result.output


# ── Show-style commands (review 7) ────────────────────────────────────────────

LINK = "[link=https://x]click[/link]"


def _person(name):
    return {"id": "u1", "name": name, "is_agent": False}


def _issue_show(client, payload):
    issue = {"id": "i1", "identifier": "CHT-1", "title": payload, "status": "todo", "priority": "high",
             "issue_type": "task", "estimate": None, "description": None,
             "assignee_id": "u1", "assignee": _person(payload), "assignee_name": payload,
             "creator": _person(payload), "creator_name": payload, "parent_id": None}
    client.get_issue_by_identifier.return_value = issue
    client.get_comments.return_value = [
        {"author": _person(payload), "author_name": payload, "created_at": "2026-10-14T10:00:00Z", "content": "hi"},
    ]
    client.get_sub_issues.return_value = []
    client.get_relations.return_value = [{
        "id": "rel-123456789", "relation_type": "blocks", "related_issue_identifier": "CHT-2",
        "related_issue_title": payload, "related_issue_status": "todo", "direction": "outgoing",
    }]
    client.get_pending_issue_rituals.return_value = {"completed_rituals": [{
        "name": payload, "attestation": {"note": payload, "attester": _person(payload),
                                         "attested_by_name": payload},
    }]}
    return ["issue", "show", "CHT-1"]


def _doc_show(client, payload):
    client.get_document.return_value = {"id": "d1", "title": payload, "icon": None, "content": "body",
                                        "author": _person(payload), "author_name": payload}
    client.get_document_issues.return_value = [{"identifier": "CHT-1", "title": payload, "status": "todo"}]
    client.get_document_comments.return_value = [
        {"author": _person(payload), "author_name": payload, "created_at": "2026-10-14T10:00:00Z", "content": "x"},
    ]
    return ["doc", "show", "d1"]


def _agent_list(client, payload):
    client.get_team_agents.return_value = [{
        "id": "a1-123456789", "name": payload, "kind": "agent", "is_active": False, "idle": True,
        "parent_user_name": payload, "created_at": "2026-10-14T10:00:00Z",
    }]
    return ["agent", "list"]


def _ritual_history(client, payload):
    client.get_ritual_history.return_value = [{
        "attested_at": "2026-10-14T10:00:00Z", "ritual_name": payload, "ritual_trigger": "ticket_close",
        "issue_identifier": "CHT-1", "attester": _person(payload), "attested_by_name": payload,
        "rejected_at": "2026-10-14T11:00:00Z", "rejecter": _person(payload), "rejected_by_name": payload,
        "rejection_note": "no",
    }]
    return ["ritual", "history"]


def _activity(client, payload):
    client.get_team_activities.return_value = [{
        "created_at": "2026-10-14T10:00:00Z", "issue_identifier": "CHT-1", "activity_type": "updated",
        "user": _person(payload), "user_name": payload,
        "field_name": "title", "old_value": payload, "new_value": payload,
    }]
    return ["activity"]


@pytest.mark.parametrize("payload", [EVIL, LINK], ids=["tags", "link"])
@pytest.mark.parametrize("setup", [_issue_show, _doc_show, _agent_list, _ritual_history, _activity],
                         ids=["issue show", "doc show", "agent list", "ritual history", "activity"])
def test_show_commands_print_server_text_verbatim(cli_runner, deps, setup, payload):
    from cli.main import cli
    fake = MagicMock()
    args = setup(fake, payload)
    with patch("cli.main.client", fake), \
            patch("cli.main.resolve_document_id", return_value="d1"):
        result = cli_runner.invoke(cli, args)
    assert result.exit_code == 0, (result.output, result.exception)
    assert payload in result.output, result.output
    # Escaped twice, a bracket would print with its backslash.
    assert "\\[" not in result.output, result.output


# ── Paths where escaping must NOT happen (review 1 and 2) ─────────────────────

def test_a_service_file_diff_prints_without_backslashes():
    """The diff is printed with markup=False: escaping it there printed the
    backslashes (`-ExecStart=/x \\[a] y`)."""
    from cli import system
    recording = Console(record=True, width=250, color_system=None)
    update = system.ServiceFileUpdate("updated", path="unit", backup="unit.bak",
                                      diff=["-ExecStart=/x [a] y", "+ExecStart=/x [b] y"])
    with patch.object(system, "console", recording):
        system._report_service_file_update(update)
    text = recording.export_text()
    assert "-ExecStart=/x [a] y" in text and "\\[" not in text


def test_a_restore_error_is_escaped_once(tmp_path):
    from cli import system
    backup = tmp_path / "chaotic.db.backup-20261013-000000"
    backup.write_bytes(b"")
    recording = Console(record=True, width=250, color_system=None)
    with patch.object(system, "stop_service", return_value=True), \
            patch.object(system, "wait_for_service_settled", return_value="inactive"), \
            patch.object(system, "checkout_version", return_value=(True, None)), \
            patch.object(system, "is_service_running", return_value=False), \
            patch.object(system, "is_port_in_use", return_value=False), \
            patch.object(system, "restore_backup", side_effect=OSError("bad [x] thing")), \
            patch.object(system, "resync_checkout", return_value=(True, "re-synced")), \
            patch.object(system, "start_service", return_value=True), \
            patch.object(system, "health_check", return_value=True), \
            patch.object(system, "console", recording):
        system._roll_back("19ae385deployed", backup, port=24267, host="127.0.0.1")
    text = recording.export_text()
    assert "OSError: bad [x] thing" in text and "\\[" not in text


def test_table_headers_and_footers_are_text_unless_markup():
    """CHT-1703: headers were the one Table string still parsed as markup."""
    table = Table(EVIL, show_footer=True)
    table.add_column(EVIL + "2", footer=EVIL + "3")
    table.add_column(header=Markup("[bold]ok[/bold]"))
    table.add_row("a", "b", "c")
    text = _render(table)
    assert all(f"{EVIL}{n}" in text for n in ("", "2", "3")) and "[bold]" not in text and "ok" in text


def test_table_title_and_caption_are_text_unless_markup():
    table = Table(title=EVIL, caption=Markup("[bold]ok[/bold]"))
    table.add_column("A column wider than the title")
    text = _render(table)
    assert EVIL in text and "[bold]" not in text and "ok" in text
