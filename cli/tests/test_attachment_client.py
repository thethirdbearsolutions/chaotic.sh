"""The client's attachment methods on the wire, and the local file reader
(CHT-1996)."""
import httpx
import pytest

import cli.client as client_mod
from chaotic_mcp_tools import ToolInputError
from chaotic_mcp_tools import attachments
from cli.client import APIError, Client, disposition_filename


@pytest.fixture
def server(monkeypatch):
    """A fake server: each request recorded, answered by `server.answer`."""
    class Server:
        seen = []
        answer = staticmethod(lambda request: httpx.Response(201, json={"id": "att-1"}))

    real = httpx.Client
    monkeypatch.setattr(client_mod.httpx, "Client",
                        lambda **kw: real(transport=httpx.MockTransport(lambda r: (Server.seen.append(r), Server.answer(r))[1]), **kw))
    monkeypatch.setattr(client_mod, "get_api_url", lambda: "http://chaotic.test/api")
    monkeypatch.setattr(client_mod, "get_token", lambda: "tok")
    monkeypatch.setattr(client_mod, "get_api_key", lambda: None)
    Server.seen = []
    return Server


def test_upload_sends_the_raw_bytes_with_a_key_and_a_length(server):
    result = Client().upload_attachment("issue-1", b"\x89PNG data", filename="shot 1.png", comment_id="c-1")

    assert result == {"id": "att-1"}
    (request,) = server.seen
    assert request.method == "POST"
    assert request.url.path == "/api/issues/issue-1/attachments"
    assert dict(request.url.params) == {"filename": "shot 1.png", "comment_id": "c-1"}
    assert request.content == b"\x89PNG data"
    assert request.headers["content-length"] == str(len(b"\x89PNG data"))
    assert request.headers["idempotency-key"]
    assert "transfer-encoding" not in request.headers


def test_a_lost_upload_answer_is_resent_under_the_same_key(server, monkeypatch):
    keys = []

    def answer(request):
        keys.append(request.headers["idempotency-key"])
        if len(keys) == 1:
            raise httpx.ReadTimeout("slow", request=request)
        return httpx.Response(201, json={"id": "att-1"})

    server.answer = staticmethod(answer)
    monkeypatch.setattr(Client, "_sleep", staticmethod(lambda s: None))
    assert Client().upload_attachment("issue-1", b"x")["id"] == "att-1"
    assert len(keys) == 2 and keys[0] == keys[1]


def test_download_returns_the_bytes_and_the_servers_name(server):
    server.answer = staticmethod(lambda r: httpx.Response(200, content=b"\x00\x01", headers={
        "Content-Type": "image/png",
        "Content-Disposition": "inline; filename=\"caf_.png\"; filename*=UTF-8''caf%C3%A9.png",
    }))

    result = Client().download_attachment("att-1")

    assert result["content"] == b"\x00\x01"
    assert result["filename"] == "caf\u00e9.png"
    assert result["content_type"] == "image/png"
    assert server.seen[0].url.path == "/api/attachments/att-1/content"


def test_a_download_refusal_is_an_api_error(server):
    server.answer = staticmethod(lambda r: httpx.Response(410, json={"detail": {
        "error_code": "attachment_blob_missing", "message": "This attachment's file is no longer stored on the server.",
    }}))

    with pytest.raises(APIError) as caught:
        Client().download_attachment("att-1")

    assert caught.value.status_code == 410
    assert caught.value.detail["error_code"] == "attachment_blob_missing"


def test_list_and_delete(server):
    server.answer = staticmethod(lambda r: httpx.Response(204) if r.method == "DELETE" else httpx.Response(200, json=[]))

    assert Client().list_attachments("issue-1") == []
    assert Client().delete_attachment("att-1") is None
    assert [(r.method, r.url.path) for r in server.seen] == [
        ("GET", "/api/issues/issue-1/attachments"), ("DELETE", "/api/attachments/att-1"),
    ]


@pytest.mark.parametrize("header,name", [
    ('attachment; filename="a.pdf"', "a.pdf"),
    ("inline; filename=\"x\"; filename*=UTF-8''r%C3%A9sum%C3%A9.pdf", "r\u00e9sum\u00e9.pdf"),
    (None, None),
    ("inline", None),
])
def test_disposition_filename(header, name):
    assert disposition_filename(header) == name


class TestReadLocalFile:
    def test_reads_a_file(self, tmp_path):
        path = tmp_path / "a.txt"
        path.write_bytes(b"hi")
        assert attachments.read_local_file(str(path)) == (b"hi", "a.txt")

    def test_expands_home(self, tmp_path, monkeypatch):
        monkeypatch.setenv("HOME", str(tmp_path))
        (tmp_path / "b.txt").write_bytes(b"x")
        assert attachments.read_local_file("~/b.txt") == (b"x", "b.txt")

    @pytest.mark.parametrize("make,message", [
        (lambda p: p / "missing", "No such file"),
        (lambda p: p, "Not a regular file"),
    ])
    def test_refuses_what_is_not_a_file(self, tmp_path, make, message):
        with pytest.raises(ToolInputError, match=message):
            attachments.read_local_file(str(make(tmp_path)))

    def test_refuses_a_huge_file(self, tmp_path, monkeypatch):
        monkeypatch.setattr(attachments, "MAX_LOCAL_FILE_BYTES", 4)
        path = tmp_path / "big"
        path.write_bytes(b"12345")
        with pytest.raises(ToolInputError, match="larger than"):
            attachments.read_local_file(str(path))


class TestMarkdown:
    def test_images_inline_and_other_files_as_links(self):
        assert attachments.attachment_markdown(
            {"filename": "a.png", "content_type": "image/png", "url": "/api/attachments/1/content"}
        ) == "![a.png](/api/attachments/1/content)"
        assert attachments.attachment_markdown(
            {"filename": "a.pdf", "content_type": "application/pdf", "url": "/u"}
        ) == "[a.pdf](/u)"

    def test_a_name_cannot_break_out_of_the_link(self):
        line = attachments.attachment_markdown(
            {"filename": "x](javascript:alert(1)) [y", "content_type": "image/png", "url": "/u"}
        )
        assert line == "![x\\](javascript:alert(1)) \\[y](/u)"

    def test_lines_follow_a_blank_line_and_stand_alone_without_text(self):
        rows = [{"filename": "a.txt", "content_type": "text/plain", "url": "/u"}]
        assert attachments.with_attachment_lines("Done.\n", rows) == "Done.\n\n[a.txt](/u)"
        assert attachments.with_attachment_lines("  ", rows) == "[a.txt](/u)"
        assert attachments.with_attachment_lines("Done.", []) == "Done."

    @pytest.mark.parametrize("value,data", [("aGVsbG8=", b"hello"), ("aGVsbG8", b"hello"), ("aGVs\nbG8=", b"hello")])
    def test_base64(self, value, data):
        assert attachments.decode_base64(value) == data

    def test_bad_base64(self):
        with pytest.raises(ToolInputError, match="not valid base64"):
            attachments.decode_base64("not base64!")
