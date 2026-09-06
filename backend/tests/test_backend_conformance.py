"""Both Backend adapters expose every protocol method with the protocol's
exact parameters (CHT-1396): the shared tool bodies call one signature and
must get the same answer on the stdio (REST) and HTTP (in-process)
transports."""
from chaotic_mcp_tools.conformance import conformance_problems

from app.mcp_server.backend import InProcessBackend


def test_in_process_backend_matches_the_protocol():
    problems = conformance_problems(InProcessBackend, "InProcessBackend")
    assert not problems, "\n".join(problems)


def test_rest_backend_matches_the_protocol():
    from cli.mcp_backend import RestBackend

    problems = conformance_problems(RestBackend, "RestBackend")
    assert not problems, "\n".join(problems)
