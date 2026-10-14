"""OAuth 2.1 authorization server and /mcp resource-server pieces
(CHT-1368). Design: the Chaotic doc "MCP OAuth and token service: design".
Discovery (CHT-1517) is ``discovery.py``; ``cors.py`` is the CORS policy
of the public endpoints (CHT-1551). Client registration (CHT-1518):
``cimd.py`` fetches Client ID Metadata Documents, ``clients.py`` holds
redirect matching and the known-clients table, ``builtin.py`` the
first-party apps built into this server (CHT-1602), and
``app.services.oauth_client_service`` keeps ``oauth_clients``. The
token and revocation endpoints' logic (CHT-1520) is
``app.services.oauth_grant_service``. The endpoints themselves are in
``app.api.oauth``.
"""
