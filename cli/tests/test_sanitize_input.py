"""Tests for sanitize_text_input (CHT-759): free-text prompt hardening."""
import pytest


@pytest.fixture(autouse=True)
def _deps(patched_client, patched_auth, patched_project):
    yield


class TestSanitizeTextInput:
    def _fn(self):
        from cli.main import sanitize_text_input
        return sanitize_text_input

    def test_strips_control_chars_and_nul(self):
        assert self._fn()("ab\x00c\x01d\x1f") == "abcd"

    def test_strips_tabs_and_newlines(self):
        # Single-line prompt input: tabs/newlines are non-printable garbage.
        assert self._fn()("a\tb\nc\rd") == "abcd"

    def test_trims_surrounding_whitespace(self):
        assert self._fn()("  My Team  ") == "My Team"

    def test_keeps_normal_printable_text(self):
        assert self._fn()("Ácme Project #1 (v2)!") == "Ácme Project #1 (v2)!"

    def test_caps_length_at_max(self):
        out = self._fn()("x" * 500)
        assert len(out) == 255 and out == "x" * 255

    def test_custom_max_len(self):
        assert self._fn()("abcdef", max_len=3) == "abc"

    def test_non_string_passthrough(self):
        assert self._fn()(None) is None
        assert self._fn()(123) == 123

    def test_empty_string(self):
        assert self._fn()("") == ""
        assert self._fn()("   ") == ""


class TestSanitizedPromptWrapper:
    """The click.prompt wrapper (CHT-759): sanitizes the result and must
    not leak `max_len` into the click.prompt call."""

    def test_wrapper_sanitizes_and_does_not_forward_max_len(self):
        from unittest.mock import patch
        with patch("cli.main.click.prompt", return_value="  ab\x00c \t ") as mp:
            from cli.main import sanitized_prompt
            out = sanitized_prompt("Name", default="X")
        assert out == "abc"
        _, kwargs = mp.call_args
        assert "max_len" not in kwargs, "max_len must not reach click.prompt"
        assert kwargs.get("default") == "X", "default must pass through"

    def test_wrapper_respects_custom_max_len(self):
        from unittest.mock import patch
        with patch("cli.main.click.prompt", return_value="x" * 300):
            from cli.main import sanitized_prompt
            assert len(sanitized_prompt("N", max_len=10)) == 10
