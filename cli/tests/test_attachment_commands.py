"""Attachments from the CLI (CHT-1996): `issue attach`, `issue comment
--attach`, `issue attachments`, `attachment-download`,
`attachment-delete`, and what `issue view` shows."""
import json
from unittest.mock import MagicMock

import pytest

PNG = b"\x89PNG\r\n\x1a\n" + b"\x00" * 32
ISSUE = {"id": "issue-1", "identifier": "CHT-7", "title": "T", "status": "todo", "priority": "low",
         "project_id": "test-project-123"}


def _row(n, name="shot.png", kind="image/png"):
    return {"id": f"att-{n}", "issue_id": "issue-1", "filename": name, "content_type": kind, "size": 40,
            "url": f"/api/attachments/att-{n}/content"}


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    yield


def _error(message, status_code=400, detail=None):
    from cli.main import APIError
    error = APIError(message)
    error.status_code = status_code
    error.detail = detail
    return error


@pytest.fixture
def files(tmp_path):
    shot = tmp_path / "shot.png"
    shot.write_bytes(PNG)
    log = tmp_path / "run.log"
    log.write_text("green\n")
    return shot, log


@pytest.fixture
def client():
    from cli.main import client
    client.get_issue_by_identifier = MagicMock(return_value=dict(ISSUE))
    uploads = iter([_row(1), _row(2, "run.log", "text/plain")])
    client.upload_attachment = MagicMock(side_effect=lambda *a, **k: next(uploads))
    client.create_comment = MagicMock(side_effect=lambda issue_id, body: {"id": "c1", "content": body})
    client.delete_attachment = MagicMock(return_value=None)
    return client


class TestAttach:
    def test_attaches_and_prints_the_markdown(self, cli_runner, client, files):
        from cli.main import cli

        result = cli_runner.invoke(cli, ["issue", "attach", "CHT-7", str(files[0]), "--json"])

        assert result.exit_code == 0, result.output
        (body,) = json.loads(result.stdout)
        assert body["id"] == "att-1"
        assert body["markdown"] == "![shot.png](/api/attachments/att-1/content)"
        client.upload_attachment.assert_called_once_with("issue-1", PNG, filename="shot.png")

    def test_several_files_and_a_later_failure_names_what_stayed(self, cli_runner, client, files):
        from cli.main import cli

        client.upload_attachment = MagicMock(side_effect=[_row(1), _error("A file may be at most 10 MiB.", 413)])

        result = cli_runner.invoke(cli, ["issue", "attach", "CHT-7", str(files[0]), str(files[1])])

        assert result.exit_code != 0
        assert "Could not attach run.log" in result.output
        assert "attached before it: shot.png (att-1)" in result.output
        client.delete_attachment.assert_not_called()

    def test_a_missing_file_sends_nothing(self, cli_runner, client, tmp_path):
        from cli.main import cli

        result = cli_runner.invoke(cli, ["issue", "attach", "CHT-7", str(tmp_path / "nope.png")])

        assert result.exit_code != 0 and "No such file" in result.output
        client.get_issue_by_identifier.assert_not_called()
        client.upload_attachment.assert_not_called()

    def test_files_are_read_one_at_a_time(self, cli_runner, client, files, monkeypatch):
        """Each file is read just before it is sent, so only one is held."""
        from cli.commands import issue_cmd
        from cli.main import cli

        events = []
        real_read = issue_cmd.read_local_file
        monkeypatch.setattr(issue_cmd, "read_local_file",
                            lambda path: events.append(("read", path)) or real_read(path))
        client.upload_attachment = MagicMock(side_effect=lambda issue_id, data, filename: events.append(
            ("upload", filename)) or _row(len(events)))

        result = cli_runner.invoke(cli, ["issue", "attach", "CHT-7", str(files[0]), str(files[1])])

        assert result.exit_code == 0, result.output
        assert events == [("read", str(files[0])), ("upload", "shot.png"),
                          ("read", str(files[1])), ("upload", "run.log")]

    def test_a_bad_later_file_sends_nothing(self, cli_runner, client, files, tmp_path):
        from cli.main import cli

        result = cli_runner.invoke(cli, ["issue", "attach", "CHT-7", str(files[0]), str(tmp_path / "nope.png")])

        assert result.exit_code != 0 and "No such file" in result.output
        client.upload_attachment.assert_not_called()

    def test_a_directory_is_not_a_file(self, cli_runner, client, tmp_path):
        from cli.main import cli

        result = cli_runner.invoke(cli, ["issue", "attach", "CHT-7", str(tmp_path)])

        assert result.exit_code != 0 and "Not a regular file" in result.output


class TestCommentAttach:
    def test_uploads_then_posts_the_comment_linking_each(self, cli_runner, client, files):
        from cli.main import cli

        result = cli_runner.invoke(cli, ["issue", "comment", "CHT-7", "Fixed", "--note", "abc123",
                                         "--attach", str(files[0]), "--attach", str(files[1]), "--json"])

        assert result.exit_code == 0, result.output
        body = json.loads(result.stdout)
        assert body["content"] == (
            "Fixed\nabc123\n\n![shot.png](/api/attachments/att-1/content)\n[run.log](/api/attachments/att-2/content)"
        )
        assert [a["id"] for a in body["attachments"]] == ["att-1", "att-2"]

    def test_a_refused_file_removes_the_uploaded_ones_and_posts_nothing(self, cli_runner, client, files):
        from cli.main import cli

        client.upload_attachment = MagicMock(side_effect=[
            _row(1), _error("A file must be a PNG...", 415, {"error_code": "attachment_type_not_allowed"}),
        ])

        result = cli_runner.invoke(cli, ["issue", "comment", "CHT-7", "x",
                                         "--attach", str(files[0]), "--attach", str(files[1])])

        assert result.exit_code != 0
        assert "Could not attach run.log, so the comment was not posted" in result.output
        assert "removed again" in result.output
        client.delete_attachment.assert_called_once_with("att-1")
        client.create_comment.assert_not_called()

    def test_one_that_cannot_be_removed_is_named(self, cli_runner, client, files):
        from cli.main import cli

        client.upload_attachment = MagicMock(side_effect=[_row(1), _error("quota", 409)])
        client.delete_attachment = MagicMock(side_effect=_error("boom", 500))

        result = cli_runner.invoke(cli, ["issue", "comment", "CHT-7", "x",
                                         "--attach", str(files[0]), "--attach", str(files[1])])

        assert result.exit_code != 0
        assert "could not be removed and are still on the issue: shot.png (att-1)" in result.output

    def test_an_upload_with_no_answer_may_be_stored(self, cli_runner, client, files):
        from cli.main import cli

        client.upload_attachment = MagicMock(side_effect=_error(
            "No answer", None, {"error_code": "write_outcome_unknown"}))

        result = cli_runner.invoke(cli, ["issue", "comment", "CHT-7", "x", "--attach", str(files[0])])

        assert result.exit_code != 0
        assert "shot.png itself may have been stored" in result.output

    def test_a_refused_comment_removes_its_files(self, cli_runner, client, files):
        from cli.main import cli

        client.create_comment = MagicMock(side_effect=_error("Sprint is in arrears", 409))

        result = cli_runner.invoke(cli, ["issue", "comment", "CHT-7", "x", "--attach", str(files[0])])

        assert result.exit_code != 0
        assert "The comment was not posted" in result.output
        client.delete_attachment.assert_called_once_with("att-1")

    def test_a_comment_with_no_answer_keeps_its_files(self, cli_runner, client, files):
        from cli.main import cli

        client.create_comment = MagicMock(side_effect=_error(
            "No answer", None, {"error_code": "write_outcome_unknown"}))

        result = cli_runner.invoke(cli, ["issue", "comment", "CHT-7", "x", "--attach", str(files[0])])

        assert result.exit_code != 0
        assert "may or may not have been posted" in result.output
        assert "shot.png (att-1)" in result.output
        client.delete_attachment.assert_not_called()

    def test_an_interrupt_between_uploads_removes_them_and_posts_nothing(self, cli_runner, client, files):
        from cli.main import cli

        client.upload_attachment = MagicMock(side_effect=[_row(1), KeyboardInterrupt()])

        result = cli_runner.invoke(cli, ["issue", "comment", "CHT-7", "x",
                                         "--attach", str(files[0]), "--attach", str(files[1])])

        assert result.exit_code != 0
        assert "Interrupted while attaching run.log; the comment was not posted" in result.output
        client.delete_attachment.assert_called_once_with("att-1")
        client.create_comment.assert_not_called()

    def test_an_interrupted_comment_keeps_its_files(self, cli_runner, client, files):
        from cli.main import cli

        client.create_comment = MagicMock(side_effect=KeyboardInterrupt())

        result = cli_runner.invoke(cli, ["issue", "comment", "CHT-7", "x", "--attach", str(files[0])])

        assert result.exit_code != 0
        assert "may or may not have been posted" in result.output and "shot.png (att-1)" in result.output
        client.delete_attachment.assert_not_called()

    def test_without_attach_nothing_changes(self, cli_runner, client):
        from cli.main import cli

        result = cli_runner.invoke(cli, ["issue", "comment", "CHT-7", "plain"])

        assert result.exit_code == 0, result.output
        client.create_comment.assert_called_once_with("issue-1", "plain")
        client.upload_attachment.assert_not_called()


class TestListDownloadDelete:
    def test_attachments_lists_them(self, cli_runner, client):
        from cli.main import cli

        client.list_attachments = MagicMock(return_value=[_row(1)])

        result = cli_runner.invoke(cli, ["issue", "attachments", "CHT-7"])

        assert result.exit_code == 0, result.output
        assert "shot.png" in result.output and "att-1" in result.output

    def test_attachments_says_when_there_are_none(self, cli_runner, client):
        from cli.main import cli

        client.list_attachments = MagicMock(return_value=[])

        result = cli_runner.invoke(cli, ["issue", "attachments", "CHT-7"])

        assert "No attachments" in result.output

    @pytest.mark.parametrize("served,saved", [
        ("shot.png", "shot.png"), ("../../etc/passwd", "passwd"), ("..", "att-1"), (".bashrc", "att-1"),
        (None, "att-1"),
    ])
    def test_download_into_a_directory_uses_a_bare_name(self, cli_runner, client, tmp_path, served, saved):
        from cli.main import cli

        client.download_attachment = MagicMock(return_value={"content": PNG, "filename": served})

        result = cli_runner.invoke(cli, ["issue", "attachment-download", "att-1", "-o", str(tmp_path)])

        assert result.exit_code == 0, result.output
        assert (tmp_path / saved).read_bytes() == PNG
        assert sorted(p.name for p in tmp_path.iterdir()) == [saved]

    def test_download_does_not_overwrite_without_force(self, cli_runner, client, tmp_path):
        from cli.main import cli

        target = tmp_path / "out.png"
        target.write_bytes(b"old")
        client.download_attachment = MagicMock(return_value={"content": PNG, "filename": "shot.png"})

        refused = cli_runner.invoke(cli, ["issue", "attachment-download", "att-1", "-o", str(target)])
        forced = cli_runner.invoke(cli, ["issue", "attachment-download", "att-1", "-o", str(target), "--force"])

        assert refused.exit_code != 0 and "already exists" in refused.output
        assert forced.exit_code == 0 and target.read_bytes() == PNG

    def test_download_to_a_missing_directory_says_so(self, cli_runner, client, tmp_path):
        from cli.main import cli

        client.download_attachment = MagicMock(return_value={"content": PNG, "filename": "shot.png"})

        result = cli_runner.invoke(cli, ["issue", "attachment-download", "att-1", "-o", str(tmp_path / "no" / "x.png")])

        assert result.exit_code == 1 and "Could not save to" in result.output

    def test_download_will_not_write_through_a_dangling_link(self, cli_runner, client, tmp_path):
        from cli.main import cli

        elsewhere = tmp_path / "elsewhere.txt"
        target = tmp_path / "out.png"
        target.symlink_to(elsewhere)
        client.download_attachment = MagicMock(return_value={"content": PNG, "filename": "shot.png"})

        refused = cli_runner.invoke(cli, ["issue", "attachment-download", "att-1", "-o", str(target)])
        assert refused.exit_code != 0 and "already exists" in refused.output
        assert not elsewhere.exists()

        forced = cli_runner.invoke(cli, ["issue", "attachment-download", "att-1", "-o", str(target), "--force"])
        assert forced.exit_code == 0, forced.output
        assert not target.is_symlink() and target.read_bytes() == PNG and not elsewhere.exists()
        assert sorted(p.name for p in tmp_path.iterdir()) == ["out.png"]

    def test_a_failed_download_write_leaves_nothing(self, cli_runner, client, tmp_path, monkeypatch):
        import os

        from cli.main import cli

        client.download_attachment = MagicMock(return_value={"content": PNG, "filename": "shot.png"})

        def no_space(*a, **k):
            raise OSError(28, "No space left on device")

        monkeypatch.setattr(os, "link", no_space)

        result = cli_runner.invoke(cli, ["issue", "attachment-download", "att-1", "-o", str(tmp_path)])

        assert result.exit_code == 1 and "No space left on device" in result.output
        assert list(tmp_path.iterdir()) == []

    def test_download_without_hard_links_still_saves_and_still_refuses(self, cli_runner, client, tmp_path,
                                                                        monkeypatch):
        import errno
        import os

        from cli.main import cli

        client.download_attachment = MagicMock(return_value={"content": PNG, "filename": "shot.png"})

        def unsupported(*a, **k):
            raise OSError(errno.EPERM, "Operation not permitted")

        monkeypatch.setattr(os, "link", unsupported)

        saved = cli_runner.invoke(cli, ["issue", "attachment-download", "att-1", "-o", str(tmp_path)])
        again = cli_runner.invoke(cli, ["issue", "attachment-download", "att-1", "-o", str(tmp_path)])

        assert saved.exit_code == 0, saved.output
        assert (tmp_path / "shot.png").read_bytes() == PNG
        assert again.exit_code != 0 and "already exists" in again.output
        assert sorted(p.name for p in tmp_path.iterdir()) == ["shot.png"]

    def test_download_json_says_where(self, cli_runner, client, tmp_path):
        from cli.main import cli

        client.download_attachment = MagicMock(return_value={"content": PNG, "filename": "shot.png",
                                                             "content_type": "image/png"})

        result = cli_runner.invoke(cli, ["issue", "attachment-download", "att-1", "-o", str(tmp_path), "--json"])

        assert result.exit_code == 0, result.output
        assert json.loads(result.stdout) == {"id": "att-1", "path": str(tmp_path / "shot.png"), "size": len(PNG),
                                             "content_type": "image/png"}

    def test_download_json_cannot_go_to_stdout(self, cli_runner, client):
        from cli.main import cli

        client.download_attachment = MagicMock()

        result = cli_runner.invoke(cli, ["issue", "attachment-download", "att-1", "-o", "-", "--json"])

        assert result.exit_code != 0
        client.download_attachment.assert_not_called()

    def test_download_to_stdout(self, cli_runner, client):
        from cli.main import cli

        client.download_attachment = MagicMock(return_value={"content": b"hello", "filename": "a.txt"})

        result = cli_runner.invoke(cli, ["issue", "attachment-download", "att-1", "-o", "-"])

        assert result.exit_code == 0 and result.stdout_bytes == b"hello"

    def test_delete(self, cli_runner, client):
        from cli.main import cli

        result = cli_runner.invoke(cli, ["--yes", "issue", "attachment-delete", "att-1", "--json"])

        assert result.exit_code == 0, result.output
        assert json.loads(result.stdout) == {"deleted": True, "id": "att-1"}
        client.delete_attachment.assert_called_once_with("att-1")


class TestIssueView:
    def _show(self, cli_runner, client, attachments, *extra):
        from cli.main import cli

        client.get_comments = MagicMock(return_value=[])
        client.get_sub_issues = MagicMock(return_value=[])
        client.get_relations = MagicMock(return_value=[])
        client.get_issue_documents = MagicMock(return_value=[])
        client.get_pending_issue_rituals = MagicMock(return_value={"pending_rituals": [], "completed_rituals": []})
        client.list_attachments = MagicMock(**attachments)
        return cli_runner.invoke(cli, ["issue", "view", "CHT-7", *extra])

    def test_lists_attachments(self, cli_runner, client):
        result = self._show(cli_runner, client, {"return_value": [_row(1)]})
        assert result.exit_code == 0, result.output
        assert "Attachments:" in result.output and "shot.png" in result.output

    def test_json_carries_them_and_none_when_the_call_failed(self, cli_runner, client):
        ok = self._show(cli_runner, client, {"return_value": [_row(1)]}, "--json")
        failed = self._show(cli_runner, client, {"side_effect": _error("Not Found", 404)}, "--json")
        assert json.loads(ok.stdout)["attachments"] == [_row(1)]
        assert json.loads(failed.stdout)["attachments"] is None
