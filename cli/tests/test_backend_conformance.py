"""RestBackend must expose every Backend method with the protocol's exact
parameters, names, kinds and defaults (CHT-1396). The in-process adapter is
checked by the backend suite, which can import both."""
from chaotic_mcp_tools.conformance import conformance_problems, protocol_methods
from cli.mcp_backend import RestBackend


def test_protocol_has_the_methods_the_tools_call():
    assert len(protocol_methods()) > 40


def test_rest_backend_matches_the_protocol():
    problems = conformance_problems(RestBackend, "RestBackend")
    assert not problems, "\n".join(problems)


def test_a_drifted_adapter_is_named(monkeypatch):
    class Drifted(RestBackend):
        async def list_inbox(self, team_id, *, unread, limit=20):  # default added, keyword kept
            ...

        async def get_project(self, project_id, extra=None):  # unexpected parameter
            ...

    problems = conformance_problems(Drifted, "Drifted")
    assert any("Drifted.list_inbox: parameter 'limit'" in p for p in problems), problems
    assert "Drifted.get_project: unexpected parameter 'extra'" in problems
