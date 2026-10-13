"""Connected apps and revocation cascades (CHT-1523; design doc "MCP OAuth
and token service: design" §4.3, threats S7 and S12).

* A person lists and revokes their own OAuth connections, and only theirs
  (``GET/DELETE /api/oauth/connections``).
* Revoking an API key ends the holder sessions opened with it and the
  unredeemed claim tickets it minted.
* Deactivating an agent, or retiring the identities of a registrar, ends
  every session acting as them.
* Removing a member from a team ends the sessions they answer for there
  (the connections they consented to, claims made with their keys), the
  codes they would answer for there, and what the keys the removal
  revoked had opened.

Each action revokes set-wise and writes exactly one ``revocation_events``
row per target, with its counts, so the epoch moves once per target and
no session is counted twice across events (review of #347, finding 5).
"""
import json

import pytest

from app.enums import RevocationTarget, TeamRole, TokenKind
from app.oxyde_models.api_key import OxydeAPIKey
from app.oxyde_models.oauth import OxydeAuthToken, OxydeHolderSession, OxydeRevocationEvent
from app.oxyde_models.team import OxydeTeam, OxydeTeamMember
from app.oxyde_models.user import OxydeUser
from app.schemas.api_key import APIKeyCreate
from app.services.api_key_service import APIKeyService
from app.services.revocation_service import (
    REASON_KEY_REVOKED,
    REASON_MEMBER_REMOVED,
    REASON_PRINCIPAL_DEACTIVATED,
    REASON_TEAM_DELETED,
    REASON_USER_REVOKED,
    RevocationService,
)
from app.services.token_service import TokenError, TokenService, revocation_epoch

from .oauth_tokens import BASE, CLIENT, MCP, connector_token, enable_oauth, make_agent, server_token


@pytest.fixture
def oauth_on(monkeypatch):
    enable_oauth(monkeypatch)


async def _revoked(issued) -> bool:
    session = await OxydeHolderSession.objects.get(id=issued.holder_session_id)
    return session.revoked_at is not None


async def _refused(issued, resource=MCP) -> bool:
    try:
        await TokenService().validate_access(issued.access_token, resource=resource)
    except TokenError:
        return True
    return False


async def _ticket(agent, team, holder, key):
    row, _raw = await TokenService().mint_single_use(
        TokenKind.CLAIM_TICKET, team_id=team.id, principal_user_id=agent.id, holder_user_id=holder.id,
        resource=BASE, scopes=("chaotic:write",), minted_by_credential_id=key.id,
    )
    return row


async def _code(agent, team, holder):
    row, _raw = await TokenService().mint_single_use(
        TokenKind.AUTH_CODE, team_id=team.id, principal_user_id=agent.id, holder_user_id=holder.id,
        resource=MCP, scopes=("chaotic:write",), oauth_client_id=CLIENT, code_challenge="c",
        redirect_uri="https://claude.ai/api/mcp/auth_callback",
    )
    return row


async def _token_revoked(row) -> bool:
    return (await OxydeAuthToken.objects.get(id=row.id)).revoked_at is not None


async def _key_active(key_id) -> bool:
    return (await OxydeAPIKey.objects.get(id=key_id)).is_active


async def _events(target_type, target_id):
    return await OxydeRevocationEvent.objects.filter(target_type=target_type, target_id=target_id).all()


# --- connected apps -----------------------------------------------------------


class TestConnectedApps:
    async def test_lists_only_your_own_oauth_connections(
        self, client, oauth_on, test_team, test_user, test_user2, auth_headers, auth_headers2,
    ):
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        agent = await make_agent(test_team, test_user)
        mine = await connector_token(agent, test_team, test_user)
        theirs = await connector_token(agent, test_team, test_user2)
        # A grantee-credential claim is not an OAuth connection.
        await server_token(agent, test_team, test_user)

        response = await client.get("/api/oauth/connections", headers=auth_headers)
        assert response.status_code == 200, response.text
        rows = response.json()
        assert [r["id"] for r in rows] == [mine.holder_session_id]
        row = rows[0]
        assert row["client"]["client_id"] == CLIENT
        # Named as the consent screen named it (OAuthClientService.identity).
        assert row["client"]["trust"] in ("recognized", "cimd")
        assert row["client"]["host"] == "claude.ai"
        assert row["agent"] == {"id": agent.id, "name": agent.name, "kind": None}
        assert (row["team_id"], row["team_name"]) == (test_team.id, test_team.name)
        assert row["policy"] == "write" and row["scopes"] == ["chaotic:write", "offline_access"]
        assert row["project_ids"] is None
        assert row["created_at"] and row["idle_expires_at"] and row["absolute_expires_at"]

        other = await client.get("/api/oauth/connections", headers=auth_headers2)
        assert [r["id"] for r in other.json()] == [theirs.holder_session_id]

    async def test_revoked_connections_are_not_listed(self, client, oauth_on, test_team, test_user, auth_headers):
        agent = await make_agent(test_team, test_user)
        issued = await connector_token(agent, test_team, test_user)
        await TokenService().revoke_session(issued.holder_session_id, actor_id=None, reason="test")
        response = await client.get("/api/oauth/connections", headers=auth_headers)
        assert response.json() == []

    async def test_revoke_your_own_connection(self, client, oauth_on, test_team, test_user, auth_headers):
        agent = await make_agent(test_team, test_user)
        issued = await connector_token(agent, test_team, test_user)
        await TokenService().validate_access(issued.access_token, resource=MCP)  # cached
        epoch = await revocation_epoch()

        response = await client.delete(f"/api/oauth/connections/{issued.holder_session_id}", headers=auth_headers)
        assert response.status_code == 204, response.text
        assert await _revoked(issued) and await _refused(issued)
        assert await revocation_epoch() == epoch + 1
        session = await OxydeHolderSession.objects.get(id=issued.holder_session_id)
        assert (session.revoked_by_id, session.revoked_reason) == (test_user.id, REASON_USER_REVOKED)

        again = await client.delete(f"/api/oauth/connections/{issued.holder_session_id}", headers=auth_headers)
        assert again.status_code == 204
        assert await revocation_epoch() == epoch + 1

    async def test_someone_elses_connection_is_a_404(
        self, client, oauth_on, test_team, test_user, test_user2, auth_headers2,
    ):
        agent = await make_agent(test_team, test_user)
        issued = await connector_token(agent, test_team, test_user)
        claim, _key = await server_token(agent, test_team, test_user2)
        for target in (issued.holder_session_id, claim.holder_session_id, "no-such-session"):
            response = await client.delete(f"/api/oauth/connections/{target}", headers=auth_headers2)
            assert response.status_code == 404, target
        assert not await _revoked(issued)
        assert not await _revoked(claim)  # theirs, but not an OAuth connection

    async def test_an_unverified_app_is_labelled_so(self, client, oauth_on, test_team, test_user, auth_headers):
        """A dynamically registered client that calls itself "Claude" is
        listed as an unverified "Claude", exactly as consent showed it."""
        from app.enums import OAuthClientRegistration
        from app.oxyde_models.oauth import OxydeOAuthClient

        await OxydeOAuthClient.objects.create(
            id="dcr_fake", registration=OAuthClientRegistration.DCR, client_name="Claude",
            redirect_uris='["https://evil.example/cb"]',
        )
        agent = await make_agent(test_team, test_user)
        await connector_token(agent, test_team, test_user)
        await OxydeHolderSession.objects.filter(principal_user_id=agent.id).update(oauth_client_id="dcr_fake")
        [row] = (await client.get("/api/oauth/connections", headers=auth_headers)).json()
        assert row["client"] == {
            "client_id": "dcr_fake", "name": "Claude", "trust": "unverified", "host": None, "registration": "dcr",
        }

    async def test_a_humans_api_key_works(self, client, oauth_on, test_team, test_user):
        agent = await make_agent(test_team, test_user)
        issued = await connector_token(agent, test_team, test_user)
        _key, raw = await APIKeyService().create(test_user.id, APIKeyCreate(name="cli"), holder_user_id=test_user.id)
        headers = {"Authorization": f"Bearer {raw}"}
        listed = await client.get("/api/oauth/connections", headers=headers)
        assert [r["id"] for r in listed.json()] == [issued.holder_session_id]
        revoked = await client.delete(f"/api/oauth/connections/{issued.holder_session_id}", headers=headers)
        assert revoked.status_code == 204 and await _revoked(issued)

    async def test_an_oauth_token_is_refused_by_its_kind(self, client, oauth_on, test_team, test_user):
        """Refused because it is an OAuth access token, before anything
        about its principal is considered (a human-principal session,
        CHT-1524, must not reach its human's connections either)."""
        agent = await make_agent(test_team, test_user)
        connection = await connector_token(agent, test_team, test_user)
        claim, _key = await server_token(agent, test_team, test_user)  # a REST-audience cat_ token
        headers = {"Authorization": f"Bearer {claim.access_token}"}
        for response in (
            await client.get("/api/oauth/connections", headers=headers),
            await client.delete(f"/api/oauth/connections/{connection.holder_session_id}", headers=headers),
        ):
            assert response.status_code == 403, response.text
            assert response.json()["detail"]["error_code"] == "oauth_token_refused"
        assert not await _revoked(connection)
        # Refused before it was resolved: never marked used.
        token = await OxydeAuthToken.objects.get(holder_session_id=claim.holder_session_id, kind=TokenKind.ACCESS)
        assert token.used_at is None
        session = await OxydeHolderSession.objects.get(id=claim.holder_session_id)
        assert session.last_used_at is None

    async def test_no_credential_is_a_401(self, client):
        assert (await client.get("/api/oauth/connections")).status_code == 401

    async def test_the_batch_is_atomic_on_its_own(self, oauth_on, test_team, test_user, monkeypatch):
        """Outside any transaction, a failure between its two updates
        leaves the sessions unrevoked."""
        agent = await make_agent(test_team, test_user)
        issued = await connector_token(agent, test_team, test_user)
        original = OxydeAuthToken.objects.filter

        def failing_filter(*args, **kwargs):
            if "holder_session_id__in" in kwargs:
                raise RuntimeError("boom")
            return original(*args, **kwargs)

        monkeypatch.setattr(OxydeAuthToken.objects, "filter", failing_filter)
        with pytest.raises(RuntimeError):
            await TokenService().revoke_sessions_batch([issued.holder_session_id], actor_id=None, reason="t")
        monkeypatch.undo()
        assert not await _revoked(issued)

    async def test_an_agent_cannot_list_or_revoke(self, client, oauth_on, test_team, test_user):
        agent = await make_agent(test_team, test_user)
        issued = await connector_token(agent, test_team, test_user)
        _key, raw = await APIKeyService().create(agent.id, APIKeyCreate(name="k"), holder_user_id=test_user.id)
        headers = {"Authorization": f"Bearer {raw}"}
        listed = await client.get("/api/oauth/connections", headers=headers)
        assert listed.status_code == 403
        assert listed.json()["detail"]["error_code"] == "human_required"
        revoked = await client.delete(f"/api/oauth/connections/{issued.holder_session_id}", headers=headers)
        assert revoked.status_code == 403
        assert not await _revoked(issued)

    async def test_works_with_oauth_turned_off(self, client, monkeypatch, test_team, test_user, auth_headers):
        enable_oauth(monkeypatch)
        agent = await make_agent(test_team, test_user)
        issued = await connector_token(agent, test_team, test_user)
        enable_oauth(monkeypatch, enabled=False)
        listed = await client.get("/api/oauth/connections", headers=auth_headers)
        assert [r["id"] for r in listed.json()] == [issued.holder_session_id]
        response = await client.delete(f"/api/oauth/connections/{issued.holder_session_id}", headers=auth_headers)
        assert response.status_code == 204
        assert await _revoked(issued)

    async def test_idle_expired_connections_drop_off_after_the_access_lifetime(
        self, client, oauth_on, test_team, test_user, auth_headers,
    ):
        from datetime import datetime, timedelta, timezone

        from app.config import get_settings

        agent = await make_agent(test_team, test_user)
        issued = await connector_token(agent, test_team, test_user)
        now = datetime.now(timezone.utc)
        ttl = timedelta(seconds=get_settings().oauth_access_token_ttl_seconds)
        await OxydeHolderSession.objects.filter(id=issued.holder_session_id).update(
            idle_expires_at=now - ttl / 2,
        )
        assert len((await client.get("/api/oauth/connections", headers=auth_headers)).json()) == 1
        await OxydeHolderSession.objects.filter(id=issued.holder_session_id).update(
            idle_expires_at=now - ttl * 2,
        )
        assert (await client.get("/api/oauth/connections", headers=auth_headers)).json() == []


# --- cascades -------------------------------------------------------------------


class TestKeyRevocation:
    async def test_revoking_a_key_ends_its_sessions_and_unredeemed_tickets(
        self, client, oauth_on, test_team, test_user, auth_headers,
    ):
        agent = await make_agent(test_team, test_user)
        claim, key = await server_token(agent, test_team, test_user)
        second = await TokenService().start_session(
            team_id=test_team.id, principal_user_id=agent.id, holder_user_id=test_user.id,
            credential_id=key.id, resource=BASE, scopes=("chaotic:write",), offline=False,
        )
        ticket = await _ticket(agent, test_team, test_user, key)
        # Not this key's: untouched.
        other_claim, other_key = await server_token(agent, test_team, test_user)
        other_ticket = await _ticket(agent, test_team, test_user, other_key)
        connection = await connector_token(agent, test_team, test_user)
        epoch = await revocation_epoch()

        response = await client.delete(f"/api/api-keys/{key.id}", headers=auth_headers)
        assert response.status_code == 204, response.text

        assert await _revoked(claim) and await _revoked(second)
        assert await _refused(claim, resource=BASE)
        assert await _token_revoked(ticket)
        assert not await _revoked(other_claim) and not await _token_revoked(other_ticket)
        assert not await _revoked(connection)
        # One event for the whole action, with its counts.
        assert await revocation_epoch() == epoch + 1
        [event] = await _events(RevocationTarget.API_KEY, key.id)
        assert json.loads(event.cascade_counts) == {"holder_sessions": 2, "tokens": 1}
        assert (event.actor_id, event.reason, event.team_id) == (test_user.id, REASON_KEY_REVOKED, test_team.id)

    async def test_a_redeemed_ticket_is_left_to_its_session(self, oauth_on, test_team, test_user):
        agent = await make_agent(test_team, test_user)
        _claim, key = await server_token(agent, test_team, test_user)
        row, raw = await TokenService().mint_single_use(
            TokenKind.CLAIM_TICKET, team_id=test_team.id, principal_user_id=agent.id,
            holder_user_id=test_user.id, resource=BASE, scopes=("chaotic:write",), minted_by_credential_id=key.id,
        )
        await TokenService().redeem_single_use(raw, TokenKind.CLAIM_TICKET)
        counts = await RevocationService().revoke_for_keys([key.id], actor_id=None)
        assert (counts.holder_sessions, counts.tokens) == (1, 0)

    async def test_a_key_with_nothing_to_cascade_writes_no_event(self, client, test_user, auth_headers):
        key, _raw = await APIKeyService().create(test_user.id, APIKeyCreate(name="k"), holder_user_id=test_user.id)
        epoch = await revocation_epoch()
        response = await client.delete(f"/api/api-keys/{key.id}", headers=auth_headers)
        assert response.status_code == 204
        assert await revocation_epoch() == epoch
        assert not await _key_active(key.id)


class TestPrincipalDeactivation:
    async def test_deactivating_an_agent_ends_every_session_acting_as_it(
        self, client, oauth_on, test_team, test_user, auth_headers,
    ):
        agent = await make_agent(test_team, test_user)
        connection = await connector_token(agent, test_team, test_user)
        claim, key = await server_token(agent, test_team, test_user)
        code = await _code(agent, test_team, test_user)
        other_agent = await make_agent(test_team, test_user, email="other@example.com")
        untouched = await connector_token(other_agent, test_team, test_user)

        response = await client.post(f"/api/agents/{agent.id}/deactivate", headers=auth_headers)
        assert response.status_code == 200, response.text

        assert await _revoked(connection) and await _revoked(claim)
        assert await _token_revoked(code)
        assert not await _revoked(untouched)
        session = await OxydeHolderSession.objects.get(id=connection.holder_session_id)
        assert (session.revoked_by_id, session.revoked_reason) == (test_user.id, REASON_PRINCIPAL_DEACTIVATED)
        # One event for the agent, the claim made with its key included.
        assert await _events(RevocationTarget.API_KEY, key.id) == []
        [agent_event] = await _events(RevocationTarget.IDENTITY, agent.id)
        assert json.loads(agent_event.cascade_counts) == {"holder_sessions": 2, "tokens": 1}
        assert agent_event.team_id == test_team.id

    async def test_retired_identities_lose_their_sessions(self, client, oauth_on, test_team, test_user, auth_headers):
        registrar = await make_agent(test_team, test_user, email="registrar@example.com")
        identity = await OxydeUser.objects.create(
            email="identity@example.com", hashed_password="x", name="session-1", is_agent=True,
            parent_user_id=test_user.id, agent_team_id=test_team.id, registered_by_id=registrar.id,
        )
        connection = await connector_token(identity, test_team, test_user)

        response = await client.post(f"/api/agents/{registrar.id}/deactivate", headers=auth_headers)
        assert response.status_code == 200, response.text
        assert await _revoked(connection)
        assert await _events(RevocationTarget.IDENTITY, identity.id)

    async def test_deleting_an_agent_moves_the_epoch(self, client, oauth_on, test_team, test_user, auth_headers):
        agent = await make_agent(test_team, test_user)
        connection = await connector_token(agent, test_team, test_user)
        await TokenService().validate_access(connection.access_token, resource=MCP)  # cached
        epoch = await revocation_epoch()
        response = await client.delete(f"/api/agents/{agent.id}", headers=auth_headers)
        assert response.status_code == 204, response.text
        assert await revocation_epoch() > epoch
        assert await _refused(connection)

    async def test_deleting_a_user_revokes_what_they_answer_for_first(self, oauth_on, test_team, test_user):
        from app.services.user_service import UserService

        holder = await OxydeUser.objects.create(email="h@example.com", hashed_password="x", name="H")
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=holder.id, role=TeamRole.MEMBER)
        agent = await make_agent(test_team, test_user)
        await connector_token(agent, test_team, holder)
        epoch = await revocation_epoch()
        await UserService().delete(holder)
        assert await revocation_epoch() == epoch + 1
        [event] = await _events(RevocationTarget.IDENTITY, holder.id)
        assert json.loads(event.cascade_counts) == {"holder_sessions": 1, "tokens": 0}


class TestMemberRemoval:
    @pytest.fixture
    async def world(self, oauth_on, test_team, test_user, test_user2):
        """Bob (test_user2) is a member of the owner's team and of a second
        team. In the owner's team he consented a connection for the
        owner's agent, holds a key for it that claimed it, and has a code
        outstanding. The owner has a connection of their own."""
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
        agent = await make_agent(test_team, test_user)
        bob_connection = await connector_token(agent, test_team, test_user2)
        bob_claim, bob_key = await server_token(agent, test_team, test_user2)
        bob_ticket = await _ticket(agent, test_team, test_user2, bob_key)
        bob_code = await _code(agent, test_team, test_user2)
        owner_connection = await connector_token(agent, test_team, test_user)

        other = await OxydeTeam.objects.create(name="Other", key="OTHR")
        await OxydeTeamMember.objects.create(team_id=other.id, user_id=test_user2.id, role=TeamRole.OWNER)
        elsewhere_agent = await make_agent(other, test_user2, email="elsewhere@example.com")
        bob_elsewhere = await connector_token(elsewhere_agent, other, test_user2)
        return dict(
            agent=agent, bob_connection=bob_connection, bob_claim=bob_claim, bob_key=bob_key,
            bob_ticket=bob_ticket, bob_code=bob_code, owner_connection=owner_connection,
            bob_elsewhere=bob_elsewhere,
        )

    async def _assert_cascaded(self, w, team, bob, actor):
        assert await _revoked(w["bob_connection"]) and await _revoked(w["bob_claim"])
        assert await _refused(w["bob_connection"])
        assert await _token_revoked(w["bob_ticket"]) and await _token_revoked(w["bob_code"])
        assert not await _revoked(w["owner_connection"])
        assert not await _revoked(w["bob_elsewhere"])
        assert not await _key_active(w["bob_key"].id)
        [event] = await _events(RevocationTarget.MEMBER, bob.id)
        # Both sessions he answers for (the key's claim among them), the
        # code and the ticket; the key then had nothing left to end.
        assert json.loads(event.cascade_counts) == {"holder_sessions": 2, "tokens": 2}
        assert (event.team_id, event.actor_id, event.reason) == (team.id, actor.id, REASON_MEMBER_REMOVED)
        # Nothing counted twice: the key's cascade is in this one event.
        assert await _events(RevocationTarget.API_KEY, w["bob_key"].id) == []
        session = await OxydeHolderSession.objects.get(id=w["bob_connection"].holder_session_id)
        assert session.revoked_reason == REASON_MEMBER_REMOVED

    async def test_removal_by_an_admin(self, client, world, test_team, test_user, test_user2, auth_headers):
        response = await client.delete(f"/api/teams/{test_team.id}/members/{test_user2.id}", headers=auth_headers)
        assert response.status_code == 204, response.text
        await self._assert_cascaded(world, test_team, test_user2, test_user)

    async def test_leaving_on_your_own(self, client, world, test_team, test_user2, auth_headers2):
        response = await client.delete(f"/api/teams/{test_team.id}/members/{test_user2.id}", headers=auth_headers2)
        assert response.status_code == 204, response.text
        await self._assert_cascaded(world, test_team, test_user2, test_user2)

    async def test_the_removed_member_no_longer_lists_them(
        self, client, world, test_team, test_user2, auth_headers, auth_headers2,
    ):
        before = await client.get("/api/oauth/connections", headers=auth_headers2)
        assert len(before.json()) == 2
        await client.delete(f"/api/teams/{test_team.id}/members/{test_user2.id}", headers=auth_headers)
        after = await client.get("/api/oauth/connections", headers=auth_headers2)
        assert [r["id"] for r in after.json()] == [world["bob_elsewhere"].holder_session_id]

    async def test_a_key_cascade_counts_what_the_member_cascade_missed(self, oauth_on, test_team, test_user):
        """A session opened with a revoked key but answered for by someone
        else (not possible through the API today) still ends, and is
        counted, through the key."""
        agent = await make_agent(test_team, test_user)
        bob = await OxydeUser.objects.create(email="b@example.com", hashed_password="x", name="B")
        key, _raw = await APIKeyService().create(agent.id, APIKeyCreate(name="k"), holder_user_id=bob.id)
        issued = await TokenService().start_session(
            team_id=test_team.id, principal_user_id=agent.id, holder_user_id=test_user.id,
            credential_id=key.id, resource=BASE, scopes=("chaotic:write",), offline=False,
        )
        counts = await RevocationService().revoke_for_member(
            test_team.id, bob.id, revoked_key_ids=[key.id], actor_id=None,
        )
        assert (counts.holder_sessions, counts.tokens) == (1, 0)
        assert await _revoked(issued)



class TestRegistrationAndTeams:
    async def test_re_registering_ends_what_the_old_key_opened(
        self, client, oauth_on, test_team, test_user, auth_headers,
    ):
        """Re-registration rotates the identity's key; a session claimed
        with the old key, and a ticket it minted, end with it."""
        created = await client.post(
            f"/api/teams/{test_team.id}/agents", json={"name": "registrar", "can_register": True},
            headers=auth_headers,
        )
        assert created.status_code == 201, created.text
        registrar_key = created.json()["api_key"]
        reg = {"Authorization": f"Bearer {registrar_key}"}
        first = await client.post("/api/agents/register", json={"external_ref": "s-1"}, headers=reg)
        assert first.status_code in (200, 201), first.text
        identity = await OxydeUser.objects.get(id=first.json()["agent"]["id"])
        [old_key] = await OxydeAPIKey.objects.filter(principal_user_id=identity.id, is_active=True).all()
        claim = await TokenService().start_session(
            team_id=test_team.id, principal_user_id=identity.id, holder_user_id=test_user.id,
            credential_id=old_key.id, resource=BASE, scopes=("chaotic:write",), offline=False,
        )
        ticket = await _ticket(identity, test_team, test_user, old_key)
        untouched = await connector_token(identity, test_team, test_user)

        again = await client.post("/api/agents/register", json={"external_ref": "s-1"}, headers=reg)
        assert again.status_code == 200, again.text
        assert await _revoked(claim) and await _token_revoked(ticket)
        assert not await _revoked(untouched)  # not opened with the key
        [event] = await _events(RevocationTarget.API_KEY, old_key.id)
        assert json.loads(event.cascade_counts) == {"holder_sessions": 1, "tokens": 1}
        assert event.actor_id == created.json()["id"]

    async def test_deleting_a_team_revokes_and_audits_first(self, client, oauth_on, test_team, test_user, auth_headers):
        agent = await make_agent(test_team, test_user)
        connection = await connector_token(agent, test_team, test_user)
        await TokenService().validate_access(connection.access_token, resource=MCP)  # cached
        code = await _code(agent, test_team, test_user)
        epoch = await revocation_epoch()

        response = await client.delete(f"/api/teams/{test_team.id}", headers=auth_headers)
        assert response.status_code == 204, response.text
        events = await OxydeRevocationEvent.objects.filter(reason=REASON_TEAM_DELETED).all()
        assert len(events) == 1
        assert events[0].target_type == RevocationTarget.BULK
        assert json.loads(events[0].filter) == {"team_id": test_team.id}
        assert events[0].actor_id == test_user.id
        assert json.loads(events[0].cascade_counts) == {"holder_sessions": 1, "tokens": 1}
        assert await revocation_epoch() == epoch + 1
        assert await _refused(connection)
        assert await OxydeAuthToken.objects.get_or_none(id=code.id) is None  # cascaded away after

    async def test_an_event_spanning_teams_names_none(self, oauth_on, test_team, test_user):
        other = await OxydeTeam.objects.create(name="Other", key="OTHR")
        await OxydeTeamMember.objects.create(team_id=other.id, user_id=test_user.id, role=TeamRole.OWNER)
        agent = await make_agent(test_team, test_user)
        elsewhere = await make_agent(other, test_user, email="elsewhere@example.com")
        await connector_token(agent, test_team, test_user)
        await connector_token(elsewhere, other, test_user)
        counts = await RevocationService().revoke_for_principals([test_user.id], actor_id=None, as_holder=True)
        assert counts.holder_sessions == 2
        [event] = await _events(RevocationTarget.IDENTITY, test_user.id)
        assert event.team_id is None
