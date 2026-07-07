"""Remote MCP (Model Context Protocol) server -- Streamable HTTP transport
mounted on the backend at /mcp (see CHT-1266).

Sibling to ``chaotic mcp`` (cli/src/cli/mcp_server.py, stdio transport,
CHT-1247/#215): same 10 tools, same names, same-shaped schemas -- see
``tools.py``'s module docstring for exactly what's shared and what isn't.
The stdio server is a thin adapter over the CLI's own HTTP client and
inherits its auth/context from local profile config; this server IS the
backend, so its tools call ``app.services``/``app.api`` functions directly
and resolve auth/team/project context from the caller's API key
(``auth.py``, ``scope.py``) instead.
"""
