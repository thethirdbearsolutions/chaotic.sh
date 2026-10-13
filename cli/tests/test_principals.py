"""The CLI says when an actor is an agent, and whose (CHT-1500)."""
import json
from unittest.mock import MagicMock, patch

import pytest

from cli.principals import principal_label

AGENT = {"id": "a1", "name": "Builder Bot", "is_agent": True, "owner_id": "u1", "owner_name": "Ada"}
PERSON = {"id": "u1", "name": "Ada", "is_agent": False, "owner_id": None, "owner_name": None}


class TestPrincipalLabel:
    def test_person(self):
        assert principal_label(PERSON, "fallback") == "Ada"

    def test_agent_with_owner(self):
        assert principal_label(AGENT) == "Builder Bot (agent of Ada)"

    def test_agent_without_owner(self):
        assert principal_label({**AGENT, "owner_id": None, "owner_name": None}) == "Builder Bot (agent)"

    @pytest.mark.parametrize("missing", [None, {}, "a1", {"is_agent": True}])
    def test_no_summary_falls_back(self, missing):
        """A backend older than the summary sends only the name."""
        assert principal_label(missing, "Builder Bot") == "Builder Bot"


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    yield


ISSUE = {
    "id": "issue-1", "identifier": "CHT-100", "title": "Fix it", "description": None,
    "status": "in_progress", "priority": "high", "issue_type": "bug", "estimate": 3,
    "project_id": "test-project-123", "assignee_id": "a1", "assignee_name": "Builder Bot",
    "assignee": AGENT, "creator_id": "u1", "creator_name": "Ada", "creator": PERSON,
}


class TestRendering:
    def _stub_issue(self, client, comments=(), completed=()):
        client.get_issue_by_identifier = MagicMock(return_value=dict(ISSUE))
        client.get_comments = MagicMock(return_value=list(comments))
        client.get_pending_issue_rituals = MagicMock(return_value={
            "pending_rituals": [], "completed_rituals": list(completed),
        })
        client.get_relations = MagicMock(return_value=[])
        client.get_issue_documents = MagicMock(return_value=[])
        client.get_sub_issues = MagicMock(return_value=[])

    def test_issue_show_names_the_agent_and_its_owner(self, cli_runner):
        from cli.main import cli, client

        self._stub_issue(
            client,
            comments=[{"content": "on it", "author_name": "Builder Bot", "author": AGENT,
                       "created_at": "2026-10-13T10:00:00"}],
            completed=[{"name": "tests", "attestation": {
                "note": "green", "attested_by_name": "Builder Bot", "attester": AGENT}}],
        )

        result = cli_runner.invoke(cli, ["issue", "show", "CHT-100"])

        assert result.exit_code == 0, result.output
        assert "Assignee: Builder Bot (agent of Ada)" in result.output
        assert "Creator: Ada" in result.output
        # the comment byline and the attestation both carry it
        assert result.output.count("Builder Bot (agent of Ada)") >= 3

    def test_json_output_carries_the_summary(self, cli_runner):
        from cli.main import cli, client

        self._stub_issue(client)
        result = cli_runner.invoke(cli, ["issue", "show", "CHT-100", "--json"])

        assert result.exit_code == 0, result.output
        assert json.loads(result.output)["assignee"] == AGENT

    def test_team_activity_by_column(self, cli_runner, monkeypatch):
        from cli.commands.shared import console
        from cli.main import cli, client

        monkeypatch.setattr(console._stdout_console, "width", 200)  # one table row per line

        client.get_team_activities = MagicMock(return_value=[{
            "id": "x", "issue_identifier": "CHT-1", "activity_type": "created",
            "user_id": "a1", "user_name": "Builder Bot", "user": AGENT,
            "created_at": "2026-10-13T10:00:00",
        }])
        result = cli_runner.invoke(cli, ["activity"])

        assert result.exit_code == 0, result.output
        assert "Builder Bot (agent of Ada)" in result.output


EVIL_AGENT = {"id": "a2", "name": "[link=https://evil.example]Bot[/link]", "is_agent": True,
              "owner_id": "u2", "owner_name": "Ada [/dim]"}
EVIL_PERSON = {"id": "u2", "name": "Ada [/dim]", "is_agent": False, "owner_id": None, "owner_name": None}


class TestMarkupEscaping:
    """Names are free text, and they land in Rich markup (PR #327 review,
    finding 2): a closing tag must not crash the render and a link tag
    must not become a hyperlink."""

    def test_principal_markup_escapes(self):
        from cli.principals import principal_markup

        assert principal_markup(EVIL_PERSON) == "Ada \\[/dim]"
        assert principal_markup(None, "[b]x") == "\\[b]x"
        assert principal_markup(None) is None

    def test_issue_show_renders_hostile_names_literally(self, cli_runner):
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={
            **ISSUE, "assignee": EVIL_AGENT, "assignee_name": EVIL_AGENT["name"],
            "creator": EVIL_PERSON, "creator_name": EVIL_PERSON["name"],
        })
        client.get_comments = MagicMock(return_value=[
            {"content": "x", "author_name": EVIL_AGENT["name"], "author": EVIL_AGENT,
             "created_at": "2026-10-13T10:00:00"},
            {"content": "y", "author_name": "Old [/dim] backend"},
        ])
        client.get_pending_issue_rituals = MagicMock(return_value={"pending_rituals": [], "completed_rituals": [
            {"name": "t", "attestation": {"note": "n", "attested_by_name": "Ada [/dim]", "attester": EVIL_PERSON}},
        ]})
        client.get_relations = MagicMock(return_value=[])
        client.get_issue_documents = MagicMock(return_value=[])
        client.get_sub_issues = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ["issue", "show", "CHT-100"])

        assert result.exit_code == 0, result.output
        assert result.exception is None
        assert "[link=https://evil.example]Bot[/link] (agent of Ada [/dim])" in result.output
        assert "Creator: Ada [/dim]" in result.output
        assert "Old [/dim] backend" in result.output

    def test_assigned_but_unresolved_is_not_unassigned(self, cli_runner):
        """review finding 3: an id with no summary and no name shows the id."""
        from cli.main import cli, client

        client.get_issue_by_identifier = MagicMock(return_value={
            **ISSUE, "assignee": None, "assignee_name": None, "assignee_id": "deadbeef-1234",
        })
        client.get_comments = MagicMock(return_value=[])
        client.get_pending_issue_rituals = MagicMock(return_value={"pending_rituals": [], "completed_rituals": []})
        client.get_relations = MagicMock(return_value=[])
        client.get_issue_documents = MagicMock(return_value=[])
        client.get_sub_issues = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ["issue", "show", "CHT-100"])

        assert result.exit_code == 0, result.output
        assert "Assignee: deadbeef..." in result.output
        assert "Unassigned" not in result.output

    def test_comment_table_cells(self, cli_runner, monkeypatch):
        from cli.commands.shared import console
        from cli.main import cli, client

        monkeypatch.setattr(console._stdout_console, "width", 200)
        client.get_team_comments = MagicMock(return_value=[{
            "source_type": "issue", "issue_identifier": "CHT-1", "content": "c",
            "author_name": EVIL_AGENT["name"], "author": EVIL_AGENT, "created_at": "2026-10-13T10:00:00",
        }])
        result = cli_runner.invoke(cli, ["comments"])

        assert result.exit_code == 0, result.output
        assert "[link=https://evil.example]Bot[/link] (agent of Ada [/dim])" in result.output

    def test_doc_show(self, cli_runner):
        from cli.main import cli, client

        client.get_documents = MagicMock(return_value=[])
        client.get_document = MagicMock(return_value={
            "id": "d1", "title": "Doc", "content": "body", "author_name": EVIL_AGENT["name"],
            "author": EVIL_AGENT, "updated_at": "2026-10-13T10:00:00", "created_at": "2026-10-13T10:00:00",
        })
        client.get_document_issues = MagicMock(return_value=[])
        client.get_document_comments = MagicMock(return_value=[
            {"content": "c", "author_name": "Ada [/dim]", "author": EVIL_PERSON, "created_at": "2026-10-13T10:00:00"},
        ])
        with patch("cli.main.resolve_document_id", return_value="d1"):
            result = cli_runner.invoke(cli, ["doc", "show", "d1"])

        assert result.exit_code == 0, result.output
        assert "(agent of Ada [/dim])" in result.output
        assert "Ada [/dim]" in result.output
