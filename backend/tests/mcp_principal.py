"""Binding an MCP principal by hand, for tests that call tools directly
instead of through ``app.mcp_server.auth`` (CHT-1562). Kept out of
``app/`` so no production caller can bind a principal it did not
resolve (PR #341 review, N4)."""
import contextlib

from app.auth.credentials import CredentialKind, Principal
from app.mcp_server import context


def api_key_principal(user) -> Principal:
    """``user`` as an API key's principal (every scope), the way a ``ck_``
    key resolves. ``holder_user_id`` is ``user`` itself, which is right
    for a human's key, not an agent's; nothing on the MCP path reads it."""
    return Principal(user=user, holder_user_id=user.id, kind=CredentialKind.API_KEY)


@contextlib.contextmanager
def acting_as(who):
    """Bind ``who`` (a ``Principal``, or a user via ``api_key_principal``)
    for the duration of the block."""
    principal = who if isinstance(who, Principal) else api_key_principal(who)
    token = context.current_mcp_principal.set(principal)
    try:
        yield principal
    finally:
        context.current_mcp_principal.reset(token)
