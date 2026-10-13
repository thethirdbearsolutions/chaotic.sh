"""OAuth 2.1 authorization server and /mcp resource-server pieces
(CHT-1368). Design: the Chaotic doc "MCP OAuth and token service: design".
Discovery (CHT-1517) is ``discovery.py``; ``cors.py`` is the CORS policy
of the public endpoints (CHT-1551). Client registration (CHT-1518):
``cimd.py`` fetches Client ID Metadata Documents, ``clients.py`` holds
redirect matching and the known-clients table, and
``app.services.oauth_client_service`` keeps ``oauth_clients``; the
endpoints themselves are in ``app.api.oauth``.
"""
