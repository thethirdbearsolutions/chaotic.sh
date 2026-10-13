"""OAuth endpoint schemas (CHT-1518, CHT-1519)."""
from pydantic import BaseModel


class OAuthErrorResponse(BaseModel):
    """RFC 6749 §5.2 / RFC 7591 §3.2.2 error body."""

    error: str
    error_description: str | None = None


class ClientRegistrationResponse(BaseModel):
    """RFC 7591 §3.2.1. ``client_secret`` only for a confidential
    (``client_secret_post``) client; it is shown once and stored hashed."""

    client_id: str
    client_id_issued_at: int
    client_secret: str | None = None
    client_secret_expires_at: int | None = None
    client_name: str | None = None
    redirect_uris: list[str]
    token_endpoint_auth_method: str
    grant_types: list[str]
    response_types: list[str]
    scope: str | None = None
