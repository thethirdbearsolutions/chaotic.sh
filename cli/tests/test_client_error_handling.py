"""Tests for CLI client error handling (CHT-158).

Tests cover:
- TicketRitualsError response parsing (new dict format)
- Backward compatibility with old format (string list)
- Edge cases: empty pending_rituals, missing keys
"""
import json
import pytest
from unittest.mock import patch, MagicMock
from cli.client import Client, APIError


class MockResponse:
    """Mock httpx response object."""

    def __init__(self, status_code, json_data):
        self._status_code = status_code
        self._json_data = json_data
        self.content = json.dumps(json_data).encode() if json_data is not None else b""

    @property
    def is_success(self):
        return 200 <= self._status_code < 300

    @property
    def status_code(self):
        return self._status_code

    def json(self):
        return self._json_data


class _MethodDispatchMock(MagicMock):
    """Mock httpx.Client that routes any HTTP method call to a shared return value.

    Set `mock.method_response` to the desired MockResponse, then any call
    to `mock.get(...)`, `mock.post(...)`, `mock.patch(...)`, etc. returns it.
    Also supports the legacy `mock.request(...)` path for older tests.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.method_response = None

    def __getattr__(self, name):
        if name == "method_response":
            return super().__getattr__(name)
        if name in ("get", "post", "put", "patch", "delete", "head", "options", "request"):
            m = MagicMock()
            m.return_value = self.method_response
            return m
        return super().__getattr__(name)


@pytest.fixture
def mock_client_request():
    """Mock httpx.Client and config for testing."""
    with patch("cli.client.httpx.Client") as mock_httpx, \
         patch("cli.client.get_api_url", return_value="http://test"), \
         patch("cli.client.get_api_key", return_value="test-key"):
        mock_http_client = _MethodDispatchMock()
        mock_httpx.return_value.__enter__.return_value = mock_http_client
        yield mock_http_client


class TestTicketRitualsErrorParsing:
    """Tests for parsing ticket ritual error responses."""

    def test_parses_new_dict_format_with_name_and_prompt(self, mock_client_request):
        """Test parsing new format: pending_rituals as list of dicts with name and prompt."""
        # Simulate 409 response with new format
        response_data = {
            "detail": {
                "message": "Cannot close issue - ticket has pending rituals.",
                "issue_id": "CHT-123",
                "pending_rituals": [
                    {"name": "code-review", "prompt": "Get code review approval."},
                    {"name": "test-pass", "prompt": "Ensure all tests pass."},
                ],
            }
        }
        mock_client_request.method_response = MockResponse(409, response_data)

        client = Client()

        with pytest.raises(APIError) as exc_info:
            client._request("PATCH", "/api/issues/123", {"status": "done"})

        error_msg = str(exc_info.value)
        # Should show first ritual name
        assert "code-review" in error_msg
        # Should show prompt
        assert "Get code review approval" in error_msg
        # Should include attest command hint
        assert "chaotic ritual attest code-review --ticket CHT-123" in error_msg
        # Should NOT show second ritual — only first is revealed (CHT-900)
        assert "test-pass" not in error_msg
        assert "Ensure all tests pass" not in error_msg
        # Should hint that more rituals are pending
        assert "1 more ritual(s) pending" in error_msg

    def test_parses_old_string_format_for_backward_compatibility(self, mock_client_request):
        """Test backward compatibility: pending_rituals as list of strings."""
        # Simulate 409 response with old format (strings instead of dicts)
        response_data = {
            "detail": {
                "message": "Cannot close issue - ticket has pending rituals.",
                "issue_id": "CHT-456",
                "pending_rituals": ["legacy-ritual"],
            }
        }
        mock_client_request.method_response = MockResponse(409, response_data)

        client = Client()

        with pytest.raises(APIError) as exc_info:
            client._request("PATCH", "/api/issues/456", {"status": "done"})

        error_msg = str(exc_info.value)
        # Should show ritual name
        assert "legacy-ritual" in error_msg
        # Should include attest command hint
        assert "chaotic ritual attest legacy-ritual --ticket CHT-456" in error_msg

    def test_handles_empty_pending_rituals_list(self, mock_client_request):
        """Test edge case: pending_rituals is an empty list."""
        # Simulate 409 response with empty pending_rituals
        response_data = {
            "detail": {
                "message": "Cannot close issue - ticket has pending rituals.",
                "issue_id": "CHT-789",
                "pending_rituals": [],
            }
        }
        mock_client_request.method_response = MockResponse(409, response_data)

        client = Client()

        with pytest.raises(APIError) as exc_info:
            client._request("PATCH", "/api/issues/789", {"status": "done"})

        error_msg = str(exc_info.value)
        # Should show generic message for empty list
        assert "pending rituals" in error_msg.lower()

    def test_handles_ritual_dict_missing_prompt(self, mock_client_request):
        """Test edge case: ritual dict has name but no prompt."""
        response_data = {
            "detail": {
                "message": "Cannot close issue - ticket has pending rituals.",
                "issue_id": "CHT-101",
                "pending_rituals": [
                    {"name": "quick-check"},  # No prompt key
                ],
            }
        }
        mock_client_request.method_response = MockResponse(409, response_data)

        client = Client()

        with pytest.raises(APIError) as exc_info:
            client._request("PATCH", "/api/issues/101", {"status": "done"})

        error_msg = str(exc_info.value)
        # Should still work, just without the prompt line
        assert "quick-check" in error_msg
        assert "chaotic ritual attest quick-check --ticket CHT-101" in error_msg


class TestSprintLimboErrorParsing:
    """Tests for parsing sprint limbo error responses."""

    def test_recognizes_limbo_error_without_issue_id(self, mock_client_request):
        """Test that limbo errors (pending_rituals without issue_id) are handled correctly."""
        # Limbo error - has pending_rituals but no issue_id
        response_data = {
            "detail": {
                "message": "Sprint is in limbo.",
                "pending_rituals": [
                    {"name": "sprint-review", "prompt": "Review sprint goals."},
                ],
            }
        }
        mock_client_request.method_response = MockResponse(409, response_data)

        client = Client()

        with pytest.raises(APIError) as exc_info:
            client._request("POST", "/api/sprints/123/close", {})

        error_msg = str(exc_info.value)
        # Should suggest ritual pending command
        assert "chaotic ritual pending" in error_msg.lower()


class TestArrearsErrorParsing:
    """Tests for parsing sprint arrears error responses."""

    def test_recognizes_arrears_error(self, mock_client_request):
        """Test that arrears errors are handled correctly."""
        response_data = {
            "detail": {
                "message": "Sprint is in arrears.",
                "arrears_by": 5,
                "budget": 20,
                "points_spent": 25,
            }
        }
        mock_client_request.method_response = MockResponse(409, response_data)

        client = Client()

        with pytest.raises(APIError) as exc_info:
            client._request("POST", "/api/issues", {"title": "New Issue"})

        error_msg = str(exc_info.value)
        # Should suggest sprint close command
        assert "chaotic sprint close" in error_msg.lower()


class TestFormatError:
    """Tests for the _format_error helper method (CHT-788)."""

    def test_string_detail_returned_as_is(self):
        """String error details should be returned unchanged."""
        client = Client()
        assert client._format_error("Something went wrong") == "Something went wrong"

    def test_list_detail_formatted_readably(self):
        """List error details (e.g. FastAPI validation errors) render as
        readable `<field>: <message>` lines (CHT-1221) -- not a raw
        Python-repr dump of the whole list, which used to include
        pydantic's raw `input` value alongside `loc`/`msg`."""
        client = Client()
        detail = [{"loc": ["body", "title"], "msg": "field required"}]
        result = client._format_error(detail)
        assert isinstance(result, str)
        assert result == "title: field required"

    def test_list_detail_never_echoes_submitted_value(self):
        """CHT-1221 (password leak): even though the backend's validation
        handler already strips `input`, this stays value-blind on its own
        -- if `input`/`ctx`/`value` show up in a detail dict for any
        reason, they must never be rendered."""
        client = Client()
        detail = [{
            "type": "string_too_short",
            "loc": ["body", "password"],
            "msg": "String should have at least 8 characters",
            "input": "hunter2",
            "ctx": {"min_length": 8},
        }]
        result = client._format_error(detail)
        assert result == "password: String should have at least 8 characters"
        assert "hunter2" not in result
        assert "min_length" not in result

    def test_list_detail_multiple_errors_one_line_each(self):
        """Multiple validation errors render as one line per error."""
        client = Client()
        detail = [
            {"loc": ["body", "name"], "msg": "field required"},
            {"loc": ["body", "password"], "msg": "String should have at least 8 characters", "input": "abc"},
        ]
        result = client._format_error(detail)
        assert result == (
            "name: field required\n"
            "password: String should have at least 8 characters"
        )
        assert "abc" not in result

    def test_list_detail_strips_body_prefix_from_loc(self):
        """The `body`/`query`/`path`/`header` root segment is noise -- drop
        it so the field name reads cleanly."""
        client = Client()
        detail = [{"loc": ["query", "limit"], "msg": "value is not a valid integer"}]
        assert client._format_error(detail) == "limit: value is not a valid integer"

    def test_list_detail_nested_loc_joined_with_dots(self):
        """Nested field paths (e.g. list index) join with '.'."""
        client = Client()
        detail = [{"loc": ["body", "items", 0, "name"], "msg": "field required"}]
        assert client._format_error(detail) == "items.0.name: field required"

    def test_list_detail_non_dict_entries_fall_back_to_str(self):
        """Backward compatibility: a list of plain strings (not the
        loc/msg dict shape) still stringifies per-entry."""
        client = Client()
        detail = ["first problem", "second problem"]
        result = client._format_error(detail)
        assert result == "first problem\nsecond problem"

    def test_empty_list_detail(self):
        """Degenerate case: empty list shouldn't blow up."""
        client = Client()
        assert client._format_error([]) == "Validation error."

    def test_dict_with_message_key(self, mock_client_request):
        """Dict detail with message key should use the message."""
        response_data = {"detail": {"message": "Custom error message"}}
        mock_client_request.method_response = MockResponse(400, response_data)

        client = Client()
        with pytest.raises(APIError, match="Custom error message"):
            client._request("GET", "/test")

    def test_dict_without_message_falls_back_to_str(self, mock_client_request):
        """Dict detail without message key should stringify the dict."""
        response_data = {"detail": {"code": "UNKNOWN"}}
        mock_client_request.method_response = MockResponse(400, response_data)

        client = Client()
        with pytest.raises(APIError, match="UNKNOWN"):
            client._request("GET", "/test")

    def test_empty_body_success_returns_none(self, mock_client_request):
        """Empty body with success status should return None."""
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.is_success = True
        mock_response.content = b""
        mock_client_request.method_response = mock_response

        client = Client()
        result = client._request("DELETE", "/test")
        assert result is None

    def test_empty_body_error_raises(self, mock_client_request):
        """Empty body with error status should raise APIError."""
        mock_response = MagicMock()
        mock_response.status_code = 500
        mock_response.is_success = False
        mock_response.content = b""
        mock_client_request.method_response = mock_response

        client = Client()
        with pytest.raises(APIError, match="500 with no body"):
            client._request("GET", "/test")

    def test_204_returns_none(self, mock_client_request):
        """204 No Content should return None."""
        mock_response = MagicMock()
        mock_response.status_code = 204
        mock_client_request.method_response = mock_response

        client = Client()
        result = client._request("DELETE", "/test")
        assert result is None


class TestInteractiveHeader:
    """CHT-1302: the client stamps X-Chaotic-Interactive from isatty() so the
    backend can require BOTH a human account AND an interactive caller for the
    ritual/estimate exemption. Verify the client computes the header value."""

    @patch("cli.client.sys")
    def test_interactive_when_both_tty(self, mock_sys):
        mock_sys.stdin.isatty.return_value = True
        mock_sys.stdout.isatty.return_value = True
        assert Client()._headers()["X-Chaotic-Interactive"] == "1"

    @patch("cli.client.sys")
    def test_non_interactive_when_stdout_piped(self, mock_sys):
        mock_sys.stdin.isatty.return_value = True
        mock_sys.stdout.isatty.return_value = False
        assert Client()._headers()["X-Chaotic-Interactive"] == "0"

    @patch("cli.client.sys")
    def test_non_interactive_when_stdin_piped(self, mock_sys):
        mock_sys.stdin.isatty.return_value = False
        mock_sys.stdout.isatty.return_value = True
        assert Client()._headers()["X-Chaotic-Interactive"] == "0"

    @patch("cli.client.sys")
    def test_non_interactive_when_both_piped(self, mock_sys):
        mock_sys.stdin.isatty.return_value = False
        mock_sys.stdout.isatty.return_value = False
        assert Client()._headers()["X-Chaotic-Interactive"] == "0"
