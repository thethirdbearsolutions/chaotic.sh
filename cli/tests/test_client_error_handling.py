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


@pytest.fixture
def mock_client_request():
    """Mock httpx.Client and config for testing."""
    with patch("cli.client.httpx.Client") as mock_httpx, \
         patch("cli.client.get_api_url", return_value="http://test"), \
         patch("cli.client.get_api_key", return_value="test-key"):
        mock_http_client = MagicMock()
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
        mock_client_request.request.return_value = MockResponse(409, response_data)

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
        mock_client_request.request.return_value = MockResponse(409, response_data)

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
        mock_client_request.request.return_value = MockResponse(409, response_data)

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
        mock_client_request.request.return_value = MockResponse(409, response_data)

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
        mock_client_request.request.return_value = MockResponse(409, response_data)

        client = Client()

        with pytest.raises(APIError) as exc_info:
            client._request("POST", "/api/sprints/123/close", {})

        error_msg = str(exc_info.value)
        # Should suggest ritual list command
        assert "chaotic ritual list" in error_msg.lower()


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
        mock_client_request.request.return_value = MockResponse(409, response_data)

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

    def test_dict_with_message_key(self, mock_client_request):
        """Dict detail with message key should use the message."""
        response_data = {"detail": {"message": "Custom error message"}}
        mock_client_request.request.return_value = MockResponse(400, response_data)

        client = Client()
        with pytest.raises(APIError, match="Custom error message"):
            client._request("GET", "/test")

    def test_dict_without_message_falls_back_to_str(self, mock_client_request):
        """Dict detail without message key should stringify the dict."""
        response_data = {"detail": {"code": "UNKNOWN"}}
        mock_client_request.request.return_value = MockResponse(400, response_data)

        client = Client()
        with pytest.raises(APIError, match="UNKNOWN"):
            client._request("GET", "/test")

    def test_empty_body_success_returns_none(self, mock_client_request):
        """Empty body with success status should return None."""
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.is_success = True
        mock_response.content = b""
        mock_client_request.request.return_value = mock_response

        client = Client()
        result = client._request("DELETE", "/test")
        assert result is None

    def test_empty_body_error_raises(self, mock_client_request):
        """Empty body with error status should raise APIError."""
        mock_response = MagicMock()
        mock_response.status_code = 500
        mock_response.is_success = False
        mock_response.content = b""
        mock_client_request.request.return_value = mock_response

        client = Client()
        with pytest.raises(APIError, match="500 with no body"):
            client._request("GET", "/test")

    def test_204_returns_none(self, mock_client_request):
        """204 No Content should return None."""
        mock_response = MagicMock()
        mock_response.status_code = 204
        mock_client_request.request.return_value = mock_response

        client = Client()
        result = client._request("DELETE", "/test")
        assert result is None
