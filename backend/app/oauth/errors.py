"""OAuth-shaped error responses (RFC 6749 §5.2, RFC 7591 §3.2.2) for the
authorization-server endpoints in ``app.api.oauth``."""
from __future__ import annotations

from fastapi import Request
from fastapi.responses import JSONResponse

NO_STORE = {"Cache-Control": "no-store", "Pragma": "no-cache"}


class OAuthHTTPError(Exception):
    """An OAuth error response: ``status_code`` with ``{"error",
    "error_description"}`` and ``Cache-Control: no-store``."""

    def __init__(self, status_code: int, error: str, description: str | None = None):
        super().__init__(description or error)
        self.status_code = status_code
        self.error = error
        self.description = description


async def oauth_error_handler(request: Request, exc: OAuthHTTPError) -> JSONResponse:
    body = {"error": exc.error}
    if exc.description:
        body["error_description"] = exc.description
    return JSONResponse(body, status_code=exc.status_code, headers=NO_STORE)
