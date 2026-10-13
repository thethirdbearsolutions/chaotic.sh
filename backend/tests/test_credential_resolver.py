"""The shared credential resolver (CHT-1560): what a Principal carries,
and how an edge's accepted kinds gate a token. The HTTP behaviour of
each edge is pinned by test_auth_deps.py (REST) and test_mcp_endpoint.py
(/mcp); this covers what those cannot see."""
import pytest

from app.auth.credentials import (
    ALL_SCOPES,
    CredentialError,
    CredentialFailure,
    CredentialKind,
    CredentialResolver,
    Principal,
    classify,
    mcp_resolver,
    rest_resolver,
)
from app.schemas.api_key import APIKeyCreate
from app.services.api_key_service import APIKeyService
from app.utils.security import create_access_token


def test_classify_by_shape():
    assert classify("ck_abc") is CredentialKind.API_KEY
    assert classify("eyJhbGciOi.x.y") is CredentialKind.SESSION_JWT


def test_a_kind_with_no_verifier_cannot_be_accepted():
    # The OAuth seam: accepting OAUTH_ACCESS before its verifier exists is
    # a startup error, not a silent 401 per request.
    with pytest.raises(ValueError, match="oauth_access"):
        CredentialResolver(frozenset({CredentialKind.OAUTH_ACCESS}))


def test_scopes():
    p = Principal(user=None, holder_user_id=None, kind=CredentialKind.API_KEY)
    assert p.scopes == ALL_SCOPES and p.has_scope("chaotic:write")
    narrow = Principal(
        user=None, holder_user_id=None, kind=CredentialKind.OAUTH_ACCESS,
        scopes=frozenset({"chaotic:read"}),
    )
    assert narrow.has_scope("chaotic:read") and not narrow.has_scope("chaotic:write")


@pytest.mark.asyncio
async def test_missing(db):
    with pytest.raises(CredentialError) as exc:
        await rest_resolver.resolve(None)
    assert exc.value.failure is CredentialFailure.MISSING
    assert exc.value.kind is None and exc.value.status_code == 401


@pytest.mark.asyncio
async def test_api_key_principal(db, test_user):
    record, key = await APIKeyService().create(test_user.id, APIKeyCreate(name="k"))
    for resolver in (rest_resolver, mcp_resolver):
        p = await resolver.resolve(key)
        assert p.user.id == test_user.id
        assert p.holder_user_id == test_user.id
        assert p.kind is CredentialKind.API_KEY
        assert p.credential_id == record.id
        assert p.scopes == ALL_SCOPES


@pytest.mark.asyncio
async def test_jwt_principal_on_rest_unsupported_on_mcp(db, test_user):
    token = create_access_token(data={"sub": test_user.id})
    p = await rest_resolver.resolve(token)
    assert p.user.id == test_user.id and p.holder_user_id == test_user.id
    assert p.kind is CredentialKind.SESSION_JWT and p.credential_id is None

    with pytest.raises(CredentialError) as exc:
        await mcp_resolver.resolve(token)
    assert exc.value.failure is CredentialFailure.UNSUPPORTED
    assert exc.value.kind is CredentialKind.SESSION_JWT


@pytest.mark.asyncio
async def test_invalid_and_inactive_carry_kind_and_status(db, test_user):
    with pytest.raises(CredentialError) as exc:
        await mcp_resolver.resolve("ck_" + "0" * 64)
    assert (exc.value.failure, exc.value.kind, exc.value.status_code) == (
        CredentialFailure.INVALID, CredentialKind.API_KEY, 401,
    )

    _, key = await APIKeyService().create(test_user.id, APIKeyCreate(name="k"))
    test_user.is_active = False
    await test_user.save(update_fields={"is_active"})
    with pytest.raises(CredentialError) as exc:
        await rest_resolver.resolve(key)
    assert exc.value.failure is CredentialFailure.INACTIVE and exc.value.status_code == 403
