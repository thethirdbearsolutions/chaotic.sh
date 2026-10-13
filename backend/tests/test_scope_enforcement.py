"""OAuth scopes are enforced where the registrar rule is (CHT-1562).

No credential carries a narrower scope yet (OAuth access tokens arrive
with CHT-1520), so these tests bind a synthetic ``Principal`` with
limited scopes: on REST by standing in for the resolver, on /mcp by
binding it in the request context the way ``auth.py`` does.
"""
import importlib
from datetime import datetime, timedelta, timezone

import pytest

from app.api import deps
from app.auth.access import (
    ALL_SCOPES, READS_WITH_BOOKKEEPING, SCOPE_GRANTS, Access, authorize, reads, refuse_out_of_scope,
    scopes_permit, writes,
)
from app.auth.credentials import CredentialKind, Principal
from app.enums import ActivityType, IssueStatus
from app.mcp_server import context, tools
from app.oauth.discovery import AUTHORIZATION_SERVER_SCOPES, RESOURCE_SCOPES
from app.oxyde_models.issue import OxydeIssue, OxydeIssueActivity

READ = frozenset({"chaotic:read"})
WRITE = frozenset({"chaotic:write"})


def _principal(user, scopes):
    # The kind an OAuth token will have; nothing here depends on it.
    return Principal(user=user, holder_user_id=user.id, kind=CredentialKind.OAUTH_ACCESS, scopes=frozenset(scopes))


@reads
async def _a_read():  # pragma: no cover -- never called
    pass


@writes
async def _a_write():  # pragma: no cover -- never called
    pass


async def _unclassified():  # pragma: no cover -- never called
    pass


class TestScopeRule:
    def test_the_grants_name_exactly_the_advertised_scopes(self):
        """Every scope a client can be granted is enforced, and nothing is
        enforced that is not advertised."""
        assert set(SCOPE_GRANTS) == set(RESOURCE_SCOPES)
        assert set(AUTHORIZATION_SERVER_SCOPES) - set(RESOURCE_SCOPES) == {"offline_access"}

    @pytest.mark.parametrize("scopes,read,write,register", [
        (ALL_SCOPES, True, True, True),
        ({"chaotic:write"}, True, True, True),
        # triage/worker writes are a subset of write that a marker cannot
        # express: reads only until RBAC (fail closed).
        ({"chaotic:worker"}, True, False, False),
        ({"chaotic:triage"}, True, False, False),
        ({"chaotic:read"}, True, False, False),
        ({"chaotic:read", "offline_access"}, True, False, False),
        ({"offline_access"}, False, False, False),
        ({"chaotic:admin"}, False, False, False),
        (set(), False, False, False),
    ])
    def test_matrix(self, scopes, read, write, register):
        scopes = frozenset(scopes)
        assert scopes_permit(scopes, Access.READ) is read
        assert scopes_permit(scopes, Access.WRITE) is write
        assert scopes_permit(scopes, Access.REGISTER) is register
        assert scopes_permit(scopes, _a_read) is read
        assert scopes_permit(scopes, _a_write) is write

    def test_unclassified_is_refused_to_any_narrower_scope(self):
        assert scopes_permit(ALL_SCOPES, _unclassified)
        assert not scopes_permit(frozenset(RESOURCE_SCOPES), _unclassified)
        assert not scopes_permit(WRITE, None)

    def test_refusal_names_what_would_do(self):
        from fastapi import HTTPException

        with pytest.raises(HTTPException) as refused:
            refuse_out_of_scope(READ, _a_write)
        assert refused.value.status_code == 403
        assert refused.value.detail["error_code"] == "policy_denied"
        assert refused.value.detail["required_scopes"] == ["chaotic:write"]
        assert refused.value.detail["granted_scopes"] == ["chaotic:read"]
        assert "chaotic:write" in refused.value.detail["message"]

    def test_registrar_rule_runs_first(self):
        """A registrar holding chaotic:write is still register-only."""
        from fastapi import HTTPException

        class _Registrar:
            id = "r"
            is_agent = True
            can_register = True

        with pytest.raises(HTTPException) as refused:
            authorize(_principal(_Registrar(), WRITE), _a_write)
        assert refused.value.detail["error_code"] == "registrar_cannot_write"

    def test_bookkeeping_reads_are_reads(self):
        """CHT-1568 option (a): a read scope may call every read that
        reconciles as a side effect. Reclassifying one ``@writes`` would
        change what a read-only token can see, so it is pinned."""
        for qualname in READS_WITH_BOOKKEEPING:
            module, name = qualname.rsplit(".", 1)
            fn = getattr(importlib.import_module(module), name)
            assert scopes_permit(READ, fn), qualname


@pytest.fixture
def as_scoped(monkeypatch):
    """Make REST resolve every credential to ``user`` with ``scopes``."""
    def bind(user, scopes):
        async def resolve(token):
            return _principal(user, scopes)
        monkeypatch.setattr(deps.rest_resolver, "resolve", resolve)
    return bind


class TestRest:
    async def test_read_scope_reads_and_cannot_write(self, client, auth_headers, test_user, test_project, as_scoped):
        as_scoped(test_user, READ)
        listed = await client.get(f"/api/projects/{test_project.id}/issues", headers=auth_headers)
        assert listed.status_code == 200, listed.text
        assert (await client.get("/api/auth/me", headers=auth_headers)).status_code == 200

        created = await client.post(
            f"/api/projects/{test_project.id}/issues", json={"title": "t"}, headers=auth_headers,
        )
        assert created.status_code == 403, created.text
        assert created.json()["detail"]["error_code"] == "policy_denied"
        assert await OxydeIssue.objects.filter(project_id=test_project.id).count() == 0

    async def test_registration_needs_write(self, client, auth_headers, test_user, as_scoped):
        as_scoped(test_user, READ)
        refused = await client.post("/api/agents/register", json={"external_ref": "x"}, headers=auth_headers)
        assert refused.status_code == 403
        assert refused.json()["detail"]["error_code"] == "policy_denied"

    async def test_write_scope_writes(self, client, auth_headers, test_user, test_project, as_scoped):
        as_scoped(test_user, WRITE)
        created = await client.post(
            f"/api/projects/{test_project.id}/issues", json={"title": "t"}, headers=auth_headers,
        )
        assert created.status_code == 201, created.text

    async def test_no_scope_reads_nothing(self, client, auth_headers, test_user, as_scoped):
        as_scoped(test_user, {"offline_access"})
        refused = await client.get("/api/auth/me", headers=auth_headers)
        assert refused.status_code == 403
        assert refused.json()["detail"]["required_scopes"] == list(SCOPE_GRANTS)

    async def test_session_jwt_is_unchanged(self, client, auth_headers, test_project):
        """No stand-in: a real JWT carries every scope."""
        created = await client.post(
            f"/api/projects/{test_project.id}/issues", json={"title": "t"}, headers=auth_headers,
        )
        assert created.status_code == 201, created.text


class TestMcp:
    async def test_read_scope_reads_and_cannot_write(self, test_user, test_project):
        with context.acting_as(_principal(test_user, READ)):
            assert "error" not in await tools.issue_list(project=test_project.id)
            refused = await tools.issue_create(title="t", project=test_project.id)
        assert refused["error"]["error_code"] == "policy_denied", refused
        assert refused["error"]["http_status"] == 403
        assert refused["error"]["required_scopes"] == ["chaotic:write"]
        assert await OxydeIssue.objects.filter(project_id=test_project.id).count() == 0

    async def test_write_scope_writes(self, test_user, test_project):
        with context.acting_as(_principal(test_user, WRITE)):
            created = await tools.issue_create(title="t", project=test_project.id)
        assert "error" not in created, created

    async def test_api_key_principal_is_unchanged(self, test_user, test_project):
        with context.acting_as(test_user) as principal:
            assert principal.scopes == ALL_SCOPES
            created = await tools.issue_create(title="t", project=test_project.id)
        assert "error" not in created, created

    async def test_no_principal_is_a_bug_not_a_pass(self, test_project):
        """Nothing bound: the call fails (the boundary reports it as
        unexpected), it is never let through."""
        result = await tools.issue_list(project=test_project.id)
        assert result["error"]["error_code"] == "unexpected", result


class TestReadScopeBookkeeping:
    async def test_lease_release_is_not_attributed_to_the_reader(self, test_user, test_user2, test_issue):
        """CHT-1568: a read-scoped principal's read releases an expired
        lease as any read does, and the record names the lapsed assignee,
        never the reader."""
        past = datetime.now(timezone.utc) - timedelta(minutes=5)
        await OxydeIssue.objects.filter(id=test_issue.id).update(
            status=IssueStatus.IN_PROGRESS, assignee_id=test_user2.id, lease_expires_at=past,
        )

        with context.acting_as(_principal(test_user, READ)):
            viewed = await tools.issue_view(test_issue.identifier)
        assert "error" not in viewed, viewed
        assert viewed["status"] == "todo"

        expired = await OxydeIssueActivity.objects.filter(
            issue_id=test_issue.id, activity_type=ActivityType.LEASE_EXPIRED,
        ).all()
        assert [a.user_id for a in expired] == [test_user2.id]
