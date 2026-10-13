"""OAuth scopes are enforced where the registrar rule is (CHT-1562).

These tests bind a synthetic ``Principal`` with limited scopes, to
cover the rule itself: on REST by standing in for the resolver, on /mcp
by binding it in the request context the way ``auth.py`` does. Real
OAuth access tokens (CHT-1576) carrying scopes through the resolver are
tested in test_credential_resolver.py and test_mcp_endpoint.py.
"""
import importlib
from datetime import datetime, timedelta, timezone

import pytest

from oxyde import execute_raw

from app.api import deps
from app.auth.access import (
    ALL, ALL_SCOPES, MCP_READS_WITH_BOOKKEEPING, READS_WITH_BOOKKEEPING, SCOPE_GRANTS, Access, authorize,
    reads, refuse_out_of_scope, scopes_permit, writes,
)
from app.auth.credentials import CredentialKind, Principal
from app.enums import ApprovalMode, IssueStatus, LimboType, RitualTrigger, SprintStatus, TeamRole
from app.mcp_server import tools
from app.oauth.discovery import AUTHORIZATION_SERVER_SCOPES, RESOURCE_SCOPES
from app.oxyde_models.issue import OxydeIssue, OxydeTicketLimbo, OxydeTicketLimboBlocker
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.ritual import OxydeRitual, OxydeRitualAttestation
from app.oxyde_models.sprint import OxydeSprint
from app.oxyde_models.team import OxydeTeamMember
from app.oxyde_models.user import OxydeUser
from app.utils.security import get_password_hash

from .mcp_principal import acting_as

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

    def test_the_wildcard_is_not_a_scope_string(self):
        """S1: ``scope=*`` off the wire is an unknown scope, nothing more."""
        assert ALL != "*"
        assert not scopes_permit(frozenset({"*"}), Access.READ)
        assert not scopes_permit(frozenset({"*"}), _unclassified)

    def test_an_oauth_principal_cannot_carry_the_wildcard(self, test_user):
        with pytest.raises(ValueError):
            Principal(user=test_user, holder_user_id=test_user.id, kind=CredentialKind.OAUTH_ACCESS)
        with pytest.raises(ValueError):
            _principal(test_user, {ALL, "chaotic:read"})
        assert _principal(test_user, {"*"}).scopes == frozenset({"*"})

    def test_token_service_scopes_never_carry_the_wildcard(self, test_user):
        """What TokenService (#340) parses off a stored or requested scope
        string is strings, so ``*`` there is an unknown scope."""
        from app.services.token_service import _split_scopes

        parsed = frozenset(_split_scopes("* chaotic:read"))
        assert ALL not in parsed
        assert not scopes_permit(parsed, Access.WRITE)
        assert _principal(test_user, parsed).scopes == parsed

    def test_mcp_bookkeeping_helpers_are_listed(self):
        """The MCP helpers outside app.api that reconcile on read are the
        ones MCP_READS_WITH_BOOKKEEPING lists (review, B1)."""
        import inspect

        from app.mcp_server import scope

        found = {
            f"{scope.__name__}.{name}" for name, fn in vars(scope).items()
            if inspect.iscoroutinefunction(fn) and fn.__module__ == scope.__name__
            and "ensure_sprints_exist(" in inspect.getsource(fn)
        }
        assert found == set(MCP_READS_WITH_BOOKKEEPING)

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
        with acting_as(_principal(test_user, READ)):
            assert "error" not in await tools.issue_list(project=test_project.id)
            refused = await tools.issue_create(title="t", project=test_project.id)
        assert refused["error"]["error_code"] == "policy_denied", refused
        assert refused["error"]["http_status"] == 403
        assert refused["error"]["required_scopes"] == ["chaotic:write"]
        assert await OxydeIssue.objects.filter(project_id=test_project.id).count() == 0

    async def test_write_scope_writes(self, test_user, test_project):
        with acting_as(_principal(test_user, WRITE)):
            created = await tools.issue_create(title="t", project=test_project.id)
        assert "error" not in created, created

    async def test_api_key_principal_is_unchanged(self, test_user, test_project):
        with acting_as(test_user) as principal:
            assert principal.scopes == ALL_SCOPES
            created = await tools.issue_create(title="t", project=test_project.id)
        assert "error" not in created, created

    async def test_no_principal_is_a_bug_not_a_pass(self, test_project):
        """Nothing bound: the call fails (the boundary reports it as
        unexpected), it is never let through."""
        result = await tools.issue_list(project=test_project.id)
        assert result["error"]["error_code"] == "unexpected", result


class TestNoReadNoLookup:
    """B1: a principal whose scopes permit no read is refused before any
    MCP resolver runs, so it can neither enumerate nor materialize."""

    async def test_no_sprint_is_materialized(self, test_user, test_project):
        assert await OxydeSprint.objects.filter(project_id=test_project.id).count() == 0
        with acting_as(_principal(test_user, {"offline_access"})):
            refused = await tools.sprint_close(project=test_project.id)
            current = await tools.sprint_current(project=test_project.id)
        assert refused["error"]["error_code"] == "policy_denied", refused
        assert current["error"]["error_code"] == "policy_denied", current
        assert await OxydeSprint.objects.filter(project_id=test_project.id).count() == 0

    async def test_no_project_names_leak(self, test_user, test_team, test_project):
        await OxydeProject.objects.create(team_id=test_team.id, name="Secret Second", key="SEC")
        with acting_as(_principal(test_user, {"offline_access"})):
            listed = await tools.issue_list()
            projects = await tools.project_list()
        for result in (listed, projects):
            assert result["error"]["error_code"] == "policy_denied", result
            assert "SEC" not in str(result) and "Secret" not in str(result)

    async def test_read_scope_still_resolves(self, test_user, test_project):
        with acting_as(_principal(test_user, READ)):
            current = await tools.sprint_current(project=test_project.id)
        assert "error" not in current, current


async def _snapshot() -> dict[str, set]:
    """Every row of every table, as a set of sorted item tuples."""
    tables = await execute_raw(
        "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'", [],
    )
    out = {}
    for t in tables:
        name = t["name"]
        rows = await execute_raw(f'SELECT * FROM "{name}"', [])
        out[name] = {tuple(sorted((k, str(v)) for k, v in dict(r).items())) for r in rows}
    return out


class TestReadScopeBookkeeping:
    """CHT-1568, option (a): a read-scoped principal may trigger each
    reconciliation, and nothing it writes names the reader. The reader is
    a team member who appears in no row before the read, so any row the
    read adds or changes that mentions it is attribution (review, S3)."""

    @pytest.fixture
    async def reader(self, db, test_team, as_scoped):
        user = await OxydeUser.objects.create(
            email="reader@example.com", hashed_password=get_password_hash("x"), name="Reader",
        )
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=user.id, role=TeamRole.MEMBER)
        as_scoped(user, READ)
        return user

    async def _read(self, client, auth_headers, reader, url):
        before = await _snapshot()
        response = await client.get(url, headers=auth_headers)
        assert response.status_code == 200, response.text
        after = await _snapshot()
        changed = {t: after[t] - before.get(t, set()) for t in after}
        changed = {t: rows for t, rows in changed.items() if rows}
        assert changed, "the read reconciled nothing; the setup is wrong"
        stamped = {t: rows for t, rows in changed.items() if any(reader.id in v for row in rows for _, v in row)}
        assert stamped == {}, stamped
        return changed

    async def test_lease_release(self, client, auth_headers, reader, test_user2, test_issue):
        past = datetime.now(timezone.utc) - timedelta(minutes=5)
        await OxydeIssue.objects.filter(id=test_issue.id).update(
            status=IssueStatus.IN_PROGRESS, assignee_id=test_user2.id, lease_expires_at=past,
        )
        changed = await self._read(client, auth_headers, reader, f"/api/issues/{test_issue.id}")
        assert "issue_activities" in changed or any("activit" in t for t in changed), changed
        assert (await OxydeIssue.objects.get(id=test_issue.id)).status == IssueStatus.TODO

    async def test_limbo_self_heal(self, client, auth_headers, reader, test_project):
        sprint = await OxydeSprint.objects.create(
            project_id=test_project.id, name="Stuck", status=SprintStatus.ACTIVE, limbo=True,
        )
        await OxydeSprint.objects.create(project_id=test_project.id, name="Next", status=SprintStatus.PLANNED)
        await self._read(client, auth_headers, reader, f"/api/rituals/limbo?project_id={test_project.id}")
        assert (await OxydeSprint.objects.get(id=sprint.id)).status == SprintStatus.COMPLETED

    async def test_orphaned_ticket_limbo_cleanup(self, client, auth_headers, reader, test_user2, test_issue, test_project):
        ritual = await OxydeRitual.objects.create(
            project_id=test_project.id, name="gate", prompt="p",
            trigger=RitualTrigger.TICKET_CLOSE, approval_mode=ApprovalMode.GATE,
        )
        limbo = await OxydeTicketLimbo.objects.create(
            issue_id=test_issue.id, limbo_type=LimboType.CLOSE, requested_by_id=test_user2.id,
        )
        blocker = await OxydeTicketLimboBlocker.objects.create(limbo_id=limbo.id, ritual_id=ritual.id)
        await OxydeRitualAttestation.objects.create(
            ritual_id=ritual.id, issue_id=test_issue.id, attested_by=test_user2.id,
            approved_by=test_user2.id, approved_at=datetime.now(timezone.utc),
        )
        await self._read(
            client, auth_headers, reader, f"/api/rituals/pending-gates?project_id={test_project.id}",
        )
        assert (await OxydeTicketLimboBlocker.objects.get(id=blocker.id)).resolved_at is not None

    async def test_sprint_materialization(self, client, auth_headers, reader, test_project):
        await self._read(client, auth_headers, reader, f"/api/sprints/current?project_id={test_project.id}")
        assert await OxydeSprint.objects.filter(project_id=test_project.id).count() == 2
