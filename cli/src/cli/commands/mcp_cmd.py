"""`chaotic mcp` — run the MCP server over stdio.

The actual tool definitions live in ``cli.mcp_server`` (kept out of the
Click command tree so tests/tooling can build a server instance
without going through Click or stdio). This module is just the CLI
entry point.
"""


def register(cli):
    """Register `chaotic mcp` on the CLI group."""

    @cli.command("mcp")
    def mcp_serve():
        """Run an MCP server over stdio exposing chaotic's core tools.

        Inherits whatever `chaotic status` would report (profile, team,
        project, credentials) -- there is no separate MCP auth step.
        See docs/agents.md for client setup (e.g. `claude mcp add chaotic
        -- chaotic mcp`). With `session_identity: auto` it acts as this
        Claude Code session's own identity (CHT-1499).
        """
        import sys

        from .. import session_identity
        from ..mcp_server import serve

        # stdout is the protocol; say it on stderr, which harnesses log.
        notice = session_identity.missing_session_notice()
        if notice:
            print(notice, file=sys.stderr)
        serve()
