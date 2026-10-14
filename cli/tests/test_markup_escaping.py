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

from cli.commands.shared import format_ritual_line
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
        line = format_ritual_line({
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
