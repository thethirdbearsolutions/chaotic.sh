"""Remote MCP (Model Context Protocol) server -- Streamable HTTP transport
mounted on the backend at /mcp (see CHT-1266).

Sibling to ``chaotic mcp`` (cli/src/cli/mcp_server.py, stdio transport,
CHT-1247/#215). Since CHT-1374 the two register the SAME tool bodies
(the ``chaotic_mcp_tools`` package, ADR-0007); what differs is the
``Backend`` each binds them to. The stdio server's backend is a thin
adapter over the CLI's own HTTP client and inherits its auth/context from
local profile config; this server IS the backend, so its adapter
(``backend.py``) calls ``app.api`` functions directly and resolves
auth/team/project context from the caller's API key (``auth.py``,
``scope.py``). ``tools.py`` does the binding; ``asgi.py`` mounts it.
"""
