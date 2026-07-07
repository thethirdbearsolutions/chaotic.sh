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
        -- chaotic mcp`).
        """
        from ..mcp_server import serve
        serve()
