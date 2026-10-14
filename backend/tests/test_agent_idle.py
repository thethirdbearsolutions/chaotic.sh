"""Idle session identities (CHT-1501).

A kind=session identity whose keys have gone unused for IDLE_SESSION_AFTER
is `idle`: `GET /teams/{id}/agents?hide_idle=true` (what `agent list` and
the web pickers ask for) leaves it out, while the default list, a read by
id and assignment by id still find it.
"""
from datetime import datetime, timedelta, timezone

import pytest

from app.oxyde_models.api_key import OxydeAPIKey
from app.oxyde_models.user import OxydeUser
from app.services.agent_service import IDLE_SESSION_AFTER, AgentService, is_idle

REF = "claude-code:session:2b1f0000-aaaa-bbbb-cccc-0000000015a1"


def _bearer(key):
    return {"Authorization": f"Bearer {key}"}


@pytest.fixture
async def session_identity(client, auth_headers, test_team):
    """(registrar id, session identity id, session key) in test_team."""
    created = await client.post(
        f"/api/teams/{test_team.id}/agents", json={"name": "Registrar", "can_register": True}, headers=auth_headers,
    )
    assert created.status_code == 201, created.text
    registered = await client.post(
        "/api/agents/register", json={"external_ref": REF}, headers=_bearer(created.json()["api_key"]),
    )
    assert registered.status_code == 201, registered.text
    body = registered.json()
    return created.json()["id"], body["agent"]["id"], body["api_key"]


async def _age_keys(agent_id, *, by=IDLE_SESSION_AFTER + timedelta(hours=1), used=True):
    """Backdate every key of `agent_id` so it was made, and (if `used`)
    last used, `by` ago; `used=False` leaves it never used."""
    then = datetime.now(timezone.utc) - by
    await OxydeAPIKey.objects.filter(principal_user_id=agent_id).update(
        created_at=then, last_used_at=then if used else None,
    )


async def _list(client, headers, team_id, **params):
    response = await client.get(f"/api/teams/{team_id}/agents", params=params, headers=headers)
    assert response.status_code == 200, response.text
    return {a["id"]: a for a in response.json()}


class TestIdle:
    async def test_a_fresh_identity_is_listed_and_not_idle(self, client, auth_headers, test_team, session_identity):
        registrar_id, identity_id, _ = session_identity

        listed = await _list(client, auth_headers, test_team.id, hide_idle="true")

        assert identity_id in listed and registrar_id in listed
        assert listed[identity_id]["idle"] is False and listed[identity_id]["last_used_at"] is not None
        # Only a session identity carries a last use; a registrar never idles.
        assert (listed[registrar_id]["idle"], listed[registrar_id]["last_used_at"]) == (False, None)

    @pytest.mark.parametrize("used", [True, False], ids=["used-long-ago", "never-used"])
    async def test_an_identity_unused_for_seven_days_is_hidden_on_request(
        self, client, auth_headers, test_team, session_identity, used,
    ):
        registrar_id, identity_id, _ = session_identity
        await _age_keys(identity_id, used=used)

        hidden = await _list(client, auth_headers, test_team.id, hide_idle="true")
        everything = await _list(client, auth_headers, test_team.id)

        assert identity_id not in hidden and registrar_id in hidden
        assert everything[identity_id]["idle"] is True
        one = (await client.get(f"/api/agents/{identity_id}", headers=auth_headers)).json()
        assert one["idle"] is True

    async def test_newest_key_wins(self, client, auth_headers, test_team, session_identity):
        """A rotated-out old key does not make a renewed identity idle."""
        _, identity_id, _ = session_identity
        await _age_keys(identity_id)
        renewed = await client.post(
            f"/api/agents/{identity_id}/keys", headers=auth_headers,
        )
        assert renewed.status_code in (200, 201), renewed.text

        listed = await _list(client, auth_headers, test_team.id, hide_idle="true")

        assert identity_id in listed and listed[identity_id]["idle"] is False

    async def test_using_the_key_makes_it_active_again(self, client, auth_headers, test_team, session_identity):
        _, identity_id, key = session_identity
        await _age_keys(identity_id)

        assert (await client.get("/api/auth/me", headers=_bearer(key))).status_code == 200

        assert identity_id in await _list(client, auth_headers, test_team.id, hide_idle="true")

    async def test_an_idle_identity_still_takes_an_assignment_by_id(
        self, client, auth_headers, test_team, test_issue, session_identity,
    ):
        _, identity_id, _ = session_identity
        await _age_keys(identity_id)

        response = await client.patch(
            f"/api/issues/{test_issue.id}", json={"assignee_id": identity_id}, headers=auth_headers,
        )

        assert response.status_code == 200, response.text
        assert response.json()["assignee_id"] == identity_id


class TestLastUsedSources:
    """Review of PR #372: which key decides, in every shape of key history."""

    async def test_an_older_key_used_more_recently_wins(self, client, auth_headers, test_team, session_identity):
        _, identity_id, _ = session_identity
        now = datetime.now(timezone.utc)
        old = await OxydeAPIKey.objects.filter(principal_user_id=identity_id).first()
        await OxydeAPIKey.objects.filter(id=old.id).update(created_at=now - timedelta(days=30), last_used_at=now - timedelta(days=1))
        newer = await client.post(f"/api/agents/{identity_id}/keys", headers=auth_headers)
        assert newer.status_code in (200, 201), newer.text
        await OxydeAPIKey.objects.filter(principal_user_id=identity_id).exclude(id=old.id).update(
            created_at=now - timedelta(days=20), last_used_at=None,
        )

        listed = await _list(client, auth_headers, test_team.id, hide_idle="true")

        assert listed[identity_id]["idle"] is False
        assert datetime.fromisoformat(listed[identity_id]["last_used_at"]) > now - timedelta(days=2)

    @pytest.mark.parametrize("recent", [True, False])
    async def test_a_revoked_key_still_counts_by_its_last_use(
        self, client, auth_headers, test_team, session_identity, recent,
    ):
        _, identity_id, _ = session_identity
        await _age_keys(identity_id, by=timedelta(hours=1) if recent else IDLE_SESSION_AFTER + timedelta(hours=1))
        await OxydeAPIKey.objects.filter(principal_user_id=identity_id).update(is_active=False)

        everything = await _list(client, auth_headers, test_team.id)

        assert everything[identity_id]["idle"] is (not recent)

    @pytest.mark.parametrize("age,idle", [(timedelta(0), False), (IDLE_SESSION_AFTER + timedelta(hours=1), True)])
    async def test_no_keys_counts_from_the_identity_itself(
        self, client, auth_headers, test_team, session_identity, age, idle,
    ):
        _, identity_id, _ = session_identity
        await OxydeAPIKey.objects.filter(principal_user_id=identity_id).delete()
        await OxydeUser.objects.filter(id=identity_id).update(created_at=datetime.now(timezone.utc) - age)

        assert (await _list(client, auth_headers, test_team.id))[identity_id]["idle"] is idle

    async def test_a_non_session_agent_with_old_keys_is_never_idle(
        self, client, auth_headers, test_team, session_identity,
    ):
        registrar_id, _, _ = session_identity
        await _age_keys(registrar_id)

        listed = await _list(client, auth_headers, test_team.id, hide_idle="true")

        assert (listed[registrar_id]["idle"], listed[registrar_id]["last_used_at"]) == (False, None)


class TestEveryResponseStatesIdle:
    """Review L1: no AgentResponse claims an idle identity is in use."""

    async def test_rename_and_deactivate_and_reactivate(self, client, auth_headers, test_team, session_identity):
        _, identity_id, _ = session_identity
        await _age_keys(identity_id)

        renamed = await client.patch(f"/api/agents/{identity_id}", json={"name": "Renamed"}, headers=auth_headers)
        deactivated = await client.post(f"/api/agents/{identity_id}/deactivate", headers=auth_headers)
        hidden = await _list(client, auth_headers, test_team.id, hide_idle="true")
        reactivated = await client.post(f"/api/agents/{identity_id}/reactivate", headers=auth_headers)

        for response in (renamed, deactivated, reactivated):
            assert response.status_code == 200, response.text
            assert response.json()["idle"] is True and response.json()["last_used_at"] is not None
        # A deactivated identity follows the same rule.
        assert identity_id not in hidden

    async def test_register_reports_the_renewed_identity_in_use(self, client, auth_headers, test_team):
        created = await client.post(
            f"/api/teams/{test_team.id}/agents", json={"name": "Registrar", "can_register": True}, headers=auth_headers,
        )
        registered = await client.post(
            "/api/agents/register", json={"external_ref": REF}, headers=_bearer(created.json()["api_key"]),
        )

        agent = registered.json()["agent"]
        assert agent["idle"] is False and agent["last_used_at"] is not None


class TestHelpers:
    def test_is_idle_boundary(self):
        now = datetime.now(timezone.utc)
        assert is_idle(None, now) is False
        assert is_idle(now - IDLE_SESSION_AFTER + timedelta(seconds=1), now) is False
        assert is_idle(now - IDLE_SESSION_AFTER, now) is True

    async def test_no_session_identities_reads_nothing(self):
        assert await AgentService.session_last_used([]) == {}
