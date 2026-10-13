"""Claude Code's OAuth client metadata document (CHT-1521), byte for byte
as https://claude.ai/oauth/claude-code-client-metadata served it on
2026-10-13, with its Cache-Control. One copy for both suites:
backend/tests/test_oauth_claude_code.py and e2e/test_oauth.py (which
imports it as ``tests.claude_code_client``, since e2e/conftest.py puts
backend/ on sys.path). No imports, so loading it from e2e pulls in
nothing else from backend/tests.

If Claude Code's document changes shape, update it here on purpose.
"""

CLAUDE_CODE_CLIENT_ID = "https://claude.ai/oauth/claude-code-client-metadata"
CLAUDE_CODE_DOCUMENT = (
    b'{"client_id":"https://claude.ai/oauth/claude-code-client-metadata","client_name":"Claude Code",'
    b'"client_uri":"https://claude.ai","redirect_uris":["http://localhost/callback","http://127.0.0.1/callback"],'
    b'"grant_types":["authorization_code","refresh_token"],"response_types":["code"],'
    b'"token_endpoint_auth_method":"none"}'
)
CLAUDE_CODE_CACHE_CONTROL = "public, max-age=300"
