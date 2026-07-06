"""Tests for the sanitized RequestValidationError handler (CHT-1221).

FastAPI's default 422 handler serializes pydantic's `.errors()` verbatim,
including an `input` key holding the raw submitted value. For
UserCreate.password (min_length=8) that put a user's plaintext password
straight into the 422 response body -- and from there into CLI stdout,
shell history, and any agent-harness logging of raw output.
`app.main.validation_exception_handler` strips every error down to just
`loc`+`msg`. These tests cover both the real end-to-end HTTP path (auth
signup with a too-short password) and the handler in isolation.
"""
import pytest
from fastapi.exceptions import RequestValidationError

from app.main import validation_exception_handler


@pytest.mark.asyncio
async def test_signup_short_password_body_never_contains_the_password(client):
    """End-to-end: POST /api/auth/signup with a too-short password must
    not echo the password value anywhere in the 422 response body."""
    response = await client.post(
        "/api/auth/signup",
        json={
            "name": "User",
            "email": "user@example.com",
            "password": "hunter2",  # too short (min_length=8), memorable if leaked
        },
    )
    assert response.status_code == 422
    assert "hunter2" not in response.text

    body = response.json()
    assert "detail" in body
    assert isinstance(body["detail"], list)
    assert body["detail"], "expected at least one validation error"
    for error in body["detail"]:
        assert set(error.keys()) == {"loc", "msg"}, (
            f"validation error leaked extra keys: {error.keys()}"
        )
    assert any("password" in error["loc"] for error in body["detail"])


@pytest.mark.asyncio
async def test_signup_missing_fields_also_sanitized(client):
    """Missing-field errors (no `password` at all) go through the same
    sanitized shape -- not just the seeded password-leak case."""
    response = await client.post("/api/auth/signup", json={})
    assert response.status_code == 422
    body = response.json()
    for error in body["detail"]:
        assert set(error.keys()) == {"loc", "msg"}


class TestValidationExceptionHandlerDirectly:
    """Unit-test the handler in isolation, with a hand-built pydantic-v2
    error shape (type/loc/msg/input/ctx/url) -- the exact fields FastAPI's
    default handler would otherwise pass through untouched."""

    @pytest.mark.asyncio
    async def test_strips_input_ctx_url_type(self):
        exc = RequestValidationError(errors=[
            {
                "type": "string_too_short",
                "loc": ("body", "password"),
                "msg": "String should have at least 8 characters",
                "input": "supersecretpassword",
                "ctx": {"min_length": 8},
                "url": "https://errors.pydantic.dev/2.5/v/string_too_short",
            }
        ])

        response = await validation_exception_handler(None, exc)

        assert response.status_code == 422
        body = json_body(response)
        assert body == {
            "detail": [
                {
                    "loc": ["body", "password"],
                    "msg": "String should have at least 8 characters",
                }
            ]
        }
        assert "supersecretpassword" not in response.body.decode()

    @pytest.mark.asyncio
    async def test_multiple_errors_all_sanitized(self):
        exc = RequestValidationError(errors=[
            {"type": "missing", "loc": ("body", "name"), "msg": "Field required", "input": {}},
            {
                "type": "string_too_short",
                "loc": ("body", "password"),
                "msg": "String should have at least 8 characters",
                "input": "abc",
                "ctx": {"min_length": 8},
            },
        ])

        response = await validation_exception_handler(None, exc)

        body = json_body(response)
        assert len(body["detail"]) == 2
        for error in body["detail"]:
            assert set(error.keys()) == {"loc", "msg"}
        assert "abc" not in response.body.decode()

    @pytest.mark.asyncio
    async def test_empty_errors_list(self):
        """Degenerate case: no errors -- handler shouldn't blow up."""
        exc = RequestValidationError(errors=[])
        response = await validation_exception_handler(None, exc)
        assert response.status_code == 422
        assert json_body(response) == {"detail": []}


def json_body(response) -> dict:
    """Decode a Starlette JSONResponse's body back into a dict."""
    import json
    return json.loads(response.body.decode())
