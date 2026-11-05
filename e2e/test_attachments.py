"""Attachments from the CLI, end to end (CHT-1996): the real `chaotic`
commands against the real server and blob store."""
import json
import struct
import zlib
from unittest.mock import patch

import pytest
from click.testing import CliRunner

from cli.main import cli as chaotic_cli


def _png() -> bytes:
    """A valid 1x1 PNG."""
    def chunk(kind, data):
        return struct.pack(">I", len(data)) + kind + data + struct.pack(">I", zlib.crc32(kind + data) & 0xFFFFFFFF)

    header = struct.pack(">IIBBBBB", 1, 1, 8, 2, 0, 0, 0)
    pixels = zlib.compress(b"\x00\xff\x00\x00")
    return b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", header) + chunk(b"IDAT", pixels) + chunk(b"IEND", b"")


@pytest.fixture
def run(auth_token):
    def _run(*args):
        with patch("cli.main.get_token", return_value=auth_token):
            return CliRunner().invoke(chaotic_cli, list(args), catch_exceptions=False)
    return _run


def test_attach_list_download_delete(api_client, test_project, run, tmp_path):
    issue = api_client.create_issue(test_project["id"], "Needs a screenshot")
    shot = tmp_path / "shot.png"
    shot.write_bytes(_png())

    attached = run("issue", "attach", issue["identifier"], str(shot), "--json")
    assert attached.exit_code == 0, attached.output
    (attachment,) = json.loads(attached.stdout)
    assert attachment["filename"] == "shot.png"
    assert attachment["content_type"] == "image/png"
    assert attachment["markdown"] == f"![shot.png](/api/attachments/{attachment['id']}/content)"

    listed = run("issue", "attachments", issue["identifier"], "--json")
    assert listed.exit_code == 0, listed.output
    assert [a["id"] for a in json.loads(listed.stdout)] == [attachment["id"]]
    view = run("issue", "view", issue["identifier"], "--json")
    assert [a["id"] for a in json.loads(view.stdout)["attachments"]] == [attachment["id"]]
    shown = run("issue", "view", issue["identifier"])
    assert "Attachments:" in shown.output and "shot.png" in shown.output

    out = tmp_path / "downloads"
    out.mkdir()
    downloaded = run("issue", "attachment-download", attachment["id"], "-o", str(out))
    assert downloaded.exit_code == 0, downloaded.output
    assert (out / "shot.png").read_bytes() == _png()
    again = run("issue", "attachment-download", attachment["id"], "-o", str(out))
    assert again.exit_code != 0 and "already exists" in again.output

    deleted = run("--yes", "issue", "attachment-delete", attachment["id"])
    assert deleted.exit_code == 0, deleted.output
    assert api_client.list_attachments(issue["id"]) == []


def test_comment_with_attachments(api_client, test_project, run, tmp_path):
    issue = api_client.create_issue(test_project["id"], "Fixed")
    shot = tmp_path / "after.png"
    shot.write_bytes(_png())
    log = tmp_path / "run.log"
    log.write_text("all green\n")

    posted = run("issue", "comment", issue["identifier"], "Fixed, see screenshot",
                 "--attach", str(shot), "--attach", str(log), "--json")
    assert posted.exit_code == 0, posted.output
    comment = json.loads(posted.stdout)
    png, text = comment["attachments"]
    assert comment["content"] == (
        "Fixed, see screenshot\n\n"
        f"![after.png](/api/attachments/{png['id']}/content)\n"
        f"[run.log](/api/attachments/{text['id']}/content)"
    )
    assert {a["id"] for a in api_client.list_attachments(issue["id"])} == {png["id"], text["id"]}
    assert api_client.download_attachment(png["id"])["content"] == _png()


def test_a_refused_file_posts_nothing_and_removes_the_rest(api_client, test_project, run, tmp_path):
    issue = api_client.create_issue(test_project["id"], "Evidence")
    shot = tmp_path / "ok.png"
    shot.write_bytes(_png())
    page = tmp_path / "page.html"
    page.write_text("<html><script>alert(1)</script></html>")

    posted = run("issue", "comment", issue["identifier"], "see files",
                 "--attach", str(shot), "--attach", str(page))
    assert posted.exit_code != 0
    assert "Could not attach page.html, so the comment was not posted" in posted.output
    assert "removed again" in posted.output
    assert api_client.list_attachments(issue["id"]) == []
    assert api_client.get_comments(issue["id"]) == []


def test_a_missing_file_sends_nothing(api_client, test_project, run, tmp_path):
    issue = api_client.create_issue(test_project["id"], "Evidence")
    posted = run("issue", "comment", issue["identifier"], "see file", "--attach", str(tmp_path / "nope.png"))
    assert posted.exit_code != 0 and "No such file" in posted.output
    assert api_client.get_comments(issue["id"]) == []
