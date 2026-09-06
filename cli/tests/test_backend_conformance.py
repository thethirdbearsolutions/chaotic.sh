"""RestBackend must expose every Backend method with the protocol's
parameter names, kinds and defaults (CHT-1396; annotations are out of
scope, see chaotic_mcp_tools/conformance.py). The in-process adapter is
checked by the backend suite, which can import both."""
import re
from pathlib import Path

from chaotic_mcp_tools.conformance import conformance_problems, protocol_methods
from cli.mcp_backend import RestBackend

_TOOLS_DIR = Path(__file__).resolve().parents[1] / "src" / "chaotic_mcp_tools" / "tools"
_BACKEND_CALL = re.compile(r"\bbackend\.([a-z_][a-z0-9_]*)\(")


def test_protocol_has_the_methods_the_tools_call():
    """Every `backend.<name>(` a tool body makes is a protocol method, so a
    body cannot grow a call that only one adapter happens to answer."""
    called = {
        name
        for path in _TOOLS_DIR.glob("*.py")
        for name in _BACKEND_CALL.findall(path.read_text())
    }
    assert called, "no backend calls found under tools/ -- pattern or path is wrong"
    unknown = sorted(called - set(protocol_methods()))
    assert not unknown, f"tool bodies call methods the Backend protocol lacks: {unknown}"


def test_rest_backend_matches_the_protocol():
    problems = conformance_problems(RestBackend, "RestBackend")
    assert not problems, "\n".join(problems)


def test_a_drifted_adapter_is_named():
    class Drifted(RestBackend):
        async def list_inbox(self, team_id, *, unread, limit=20):  # default added, keyword kept
            ...

        async def get_project(self, project_id, extra=None):  # unexpected parameter
            ...

        async def list_rituals(self, project_id, include_inactive=0):  # 0 is not False
            ...

    problems = conformance_problems(Drifted, "Drifted")
    assert any("Drifted.list_inbox: parameter 'limit'" in p for p in problems), problems
    assert "Drifted.get_project: unexpected parameter 'extra'" in problems
    assert any("Drifted.list_rituals: parameter 'include_inactive'" in p and "(int)" in p for p in problems), problems


def test_a_broken_adapter_is_reported_not_crashed():
    """A property or a plain attribute where a method should be is a finding
    for that method; the other methods are still checked."""
    class Broken(RestBackend):
        capabilities = None
        get_project = property(lambda self: None)
        list_labels = "not even callable"

        async def get_issue(self, identifier, extra=None):
            ...

    problems = conformance_problems(Broken, "Broken")
    assert "Broken.capabilities: missing or not a Capabilities" in problems
    assert "Broken.get_project: not a method (property)" in problems
    assert "Broken.list_labels: not a method (str)" in problems
    assert "Broken.get_issue: unexpected parameter 'extra'" in problems
