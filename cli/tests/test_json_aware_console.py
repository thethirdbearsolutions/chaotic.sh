"""Tests for _JsonAwareConsole's stream selection (CHT-1222).

The shared console is the ONE place stdout-purity under --json is
enforced for Rich chatter. Finding #4 of the oppositional review: the
original __getattr__ fallback silently routed any non-print Console
method to stdout even under --json — a copycat hazard for the next
command that imitates existing chatter with console.rule()/log()/etc.
Now every supported output method routes through the same stream
selection, and anything else fails loud with AttributeError at dev time
instead of silently picking the wrong stream in production.
"""
from unittest.mock import patch

import pytest

from cli.commands.shared import console

# Outside any patch window so patch.dict('sys.modules') snapshots include
# it (same rationale as test_content_resolution.py).
import cli.main  # noqa: F401


@pytest.fixture
def json_mode():
    with patch('cli.main.is_json_output', return_value=True):
        yield


@pytest.fixture
def text_mode():
    with patch('cli.main.is_json_output', return_value=False):
        yield


class TestOutputMethodsRedirectUnderJson:
    """Every supported Rich output method goes to stderr while --json is
    active — not just .print()."""

    def test_print_to_stderr(self, json_mode, capsys):
        console.print("chatter")
        out = capsys.readouterr()
        assert out.out == ""
        assert "chatter" in out.err

    def test_log_to_stderr(self, json_mode, capsys):
        console.log("log line")
        out = capsys.readouterr()
        assert out.out == ""
        assert "log line" in out.err

    def test_rule_to_stderr(self, json_mode, capsys):
        console.rule("section")
        out = capsys.readouterr()
        assert out.out == ""
        assert "section" in out.err

    def test_print_json_to_stderr(self, json_mode, capsys):
        # Rich's pretty-printed JSON is human chatter, not the machine
        # contract (which goes through cli.main.output_json to stdout).
        console.print_json('{"k": "v"}')
        out = capsys.readouterr()
        assert out.out == ""
        assert '"k"' in out.err


class TestOutputMethodsStayOnStdoutInTextMode:
    def test_print_to_stdout(self, text_mode, capsys):
        console.print("chatter")
        out = capsys.readouterr()
        assert "chatter" in out.out
        assert out.err == ""

    def test_rule_to_stdout(self, text_mode, capsys):
        console.rule("section")
        out = capsys.readouterr()
        assert "section" in out.out
        assert out.err == ""


class TestUnknownMethodsFailLoud:
    """No __getattr__ fallback: an output method this proxy doesn't know
    about must raise at dev time, never silently leak to stdout."""

    def test_unknown_method_raises_attribute_error(self):
        with pytest.raises(AttributeError):
            console.print_exception()

    def test_arbitrary_attribute_raises_attribute_error(self):
        with pytest.raises(AttributeError):
            console.width
