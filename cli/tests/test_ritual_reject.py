"""`chaotic ritual reject` and `ritual approve --ticket` (CHT-1606)."""
from unittest.mock import MagicMock, patch

import pytest

# Bound at import, before the autouse fixture patches cli.client.Client.
from cli.client import Client as RealClient

TICKET_RITUAL = {"id": "rit-1", "name": "code-review", "trigger": "ticket_close", "approval_mode": "review"}
SPRINT_RITUAL = {"id": "rit-2", "name": "retro", "trigger": "every_sprint", "approval_mode": "review"}
ISSUE = {"id": "issue-1", "identifier": "CHT-100"}


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    yield


def _setup(client, rituals=(TICKET_RITUAL,)):
    client.get_rituals = MagicMock(return_value=list(rituals))
    client.get_issue_by_identifier = MagicMock(return_value=ISSUE)
    client.reject_ritual_for_issue = MagicMock(return_value={
        "id": "rej-1", "note": "Tests missing", "attested_by_name": "Bot",
        "attester": {"id": "a1", "name": "Bot", "is_agent": True, "owner_name": "Ethan"},
    })


class TestRitualReject:
    def test_rejects_with_the_reason(self, cli_runner):
        from cli.main import cli, client
        _setup(client)

        result = cli_runner.invoke(cli, [
            "ritual", "reject", "code-review", "--ticket", "CHT-100", "--note", "  Tests missing ",
        ])

        assert result.exit_code == 0, result.output
        client.reject_ritual_for_issue.assert_called_once_with("rit-1", "issue-1", "Tests missing")
        assert "rejected for CHT-100" in result.output
        assert "Bot" in result.output

    def test_reason_alias(self, cli_runner):
        from cli.main import cli, client
        _setup(client)
        result = cli_runner.invoke(cli, ["ritual", "reject", "code-review", "--ticket", "CHT-100", "--reason", "No"])
        assert result.exit_code == 0, result.output
        client.reject_ritual_for_issue.assert_called_once_with("rit-1", "issue-1", "No")

    @pytest.mark.parametrize("args", [
        ["--ticket", "CHT-100"],  # no reason
        ["--note", "why"],  # no ticket
    ])
    def test_reason_and_ticket_are_required(self, cli_runner, args):
        from cli.main import cli, client
        _setup(client)
        result = cli_runner.invoke(cli, ["ritual", "reject", "code-review", *args])
        assert result.exit_code == 2
        client.reject_ritual_for_issue.assert_not_called()

    def test_blank_reason_is_refused(self, cli_runner):
        from cli.main import cli, client
        _setup(client)
        result = cli_runner.invoke(cli, ["ritual", "reject", "code-review", "--ticket", "CHT-100", "--note", "   "])
        assert result.exit_code == 1
        assert "needs a reason" in result.output
        client.reject_ritual_for_issue.assert_not_called()

    def test_sprint_ritual_is_refused(self, cli_runner):
        from cli.main import cli, client
        _setup(client, rituals=(SPRINT_RITUAL,))
        result = cli_runner.invoke(cli, ["ritual", "reject", "retro", "--ticket", "CHT-100", "--note", "x"])
        assert result.exit_code == 1
        assert "not a ticket-level ritual" in result.output
        client.reject_ritual_for_issue.assert_not_called()

    def test_unknown_ritual(self, cli_runner):
        from cli.main import cli, client
        _setup(client)
        result = cli_runner.invoke(cli, ["ritual", "reject", "nope", "--ticket", "CHT-100", "--note", "x"])
        assert result.exit_code == 1
        assert "not found" in result.output


class TestRitualApproveTicket:
    def test_approve_ticket_review(self, cli_runner):
        from cli.main import cli, client
        _setup(client)
        client.approve_issue_attestation = MagicMock(return_value={})
        result = cli_runner.invoke(cli, ["ritual", "approve", "code-review", "--ticket", "CHT-100"])
        assert result.exit_code == 0, result.output
        client.approve_issue_attestation.assert_called_once_with("rit-1", "issue-1")
        assert "approved for CHT-100" in result.output

    def test_ticket_ritual_needs_ticket(self, cli_runner):
        from cli.main import cli, client
        _setup(client)
        client.approve_ritual = MagicMock()
        result = cli_runner.invoke(cli, ["ritual", "approve", "code-review"])
        assert result.exit_code == 1
        assert "--ticket" in result.output
        client.approve_ritual.assert_not_called()


class TestRejectionShown:
    def test_pending_shows_the_outstanding_rejection(self, cli_runner):
        from cli.main import cli, client
        client.get_issue_by_identifier = MagicMock(return_value=ISSUE)
        client.get_pending_issue_rituals = MagicMock(return_value={"pending_rituals": [{
            "id": "rit-1", "name": "code-review", "prompt": "Reviewed?", "approval_mode": "review",
            "attestation": None,
            "last_rejection": {"note": "Coverage dropped", "rejected_by_name": "Ethan", "superseded_at": None},
        }]})
        with patch("cli.main.get_current_project", return_value="p"):
            result = cli_runner.invoke(cli, ["ritual", "pending", "CHT-100"])
        assert "Rejected by Ethan" in result.output
        assert "Coverage dropped" in result.output

    def test_pending_hides_an_answered_rejection(self, cli_runner):
        from cli.main import cli, client
        client.get_issue_by_identifier = MagicMock(return_value=ISSUE)
        client.get_pending_issue_rituals = MagicMock(return_value={"pending_rituals": [{
            "id": "rit-1", "name": "code-review", "prompt": "Reviewed?", "approval_mode": "review",
            "attestation": None,
            "last_rejection": {"note": "old", "rejected_by_name": "Ethan", "superseded_at": "2026-10-13T00:00:00Z"},
        }]})
        with patch("cli.main.get_current_project", return_value="p"):
            result = cli_runner.invoke(cli, ["ritual", "pending", "CHT-100"])
        assert "Rejected" not in result.output

    def test_history_marks_rejections(self, cli_runner):
        from cli.main import cli, client
        client.get_ritual_history = MagicMock(return_value=[{
            "attested_at": "2026-10-13T00:00:00Z", "ritual_name": "code-review", "ritual_trigger": "ticket_close",
            "issue_identifier": "CHT-100", "attested_by_name": "Bot", "note": "first try",
            "rejected_at": "2026-10-13T01:00:00Z", "rejected_by_name": "Ethan", "rejection_note": "Coverage",
        }])
        result = cli_runner.invoke(cli, ["ritual", "history"])
        assert result.exit_code == 0, result.output
        assert "Rejected" in result.output
        assert "Coverage" in result.output


class TestClient:
    def test_reject_posts_the_note(self):
        c = RealClient()
        with patch.object(c, "_request", return_value={}) as req:
            c.reject_ritual_for_issue("r", "i", "why")
        req.assert_called_once_with("POST", "/rituals/r/reject-issue/i", {"note": "why"})

    def test_refusal_names_an_outstanding_rejection(self):
        msg = RealClient()._format_error({
            "issue_id": "CHT-100",
            "pending_rituals": [{
                "name": "signoff", "approval_mode": "gate", "attestation": None,
                "last_rejection": {"note": "Not this sprint", "rejected_by_name": "Ethan", "superseded_at": None},
            }],
        })
        assert "Rejected by Ethan: Not this sprint" in msg

    def test_already_resolved_409_message(self):
        msg = RealClient()._format_error({
            "error_code": "ritual_already_resolved", "message": "Already rejected by Ethan at 2026-10-13T00:00:00+00:00.",
            "resolution": "rejected", "resolved_by": "u1", "resolved_at": "2026-10-13T00:00:00+00:00",
        })
        assert msg.startswith("Already rejected by Ethan")
