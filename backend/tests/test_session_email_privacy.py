"""A session identity's address never carries its external_ref (CHT-1864).

Until CHT-1864 a registered session identity's address was
``session-<last 24 chars of the ref>-<rand>@agent.local``, and the issue
and document activity feeds showed it to readers ``sees_external_ref``
hides the ref from. Now the address is random, and those feeds also
null a session identity's address for such readers, as GET /users/{id}
does (CHT-1841). The MCP activity_recent tool reads the same feed; its
test is in test_mcp_endpoint.py.
"""
import pytest

from app.enums import TeamRole
from app.oxyde_models.team import OxydeTeamMember
from app.oxyde_models.user import OxydeUser
from app.services.registration_service import session_email
from app.utils.security import create_access_token

from .test_agent_register import REF, _bearer, _register, registrar  # noqa: F401
from .test_session_emails_migration import NEW_FORM, carries_ref


async def _teammate(test_team, role=TeamRole.MEMBER, email="mate@example.com"):
    user = await OxydeUser.objects.create(email=email, hashed_password="x", name=email.split("@")[0])
    await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=user.id, role=role)
    return user, _bearer(create_access_token(data={"sub": user.id}))


@pytest.fixture
async def session_at_work(client, registrar, test_team, test_project):  # noqa: F811
    """A registered session identity that made an issue and a document."""
    _, key = registrar
    registered = (await _register(client, key)).json()
    session_key = registered["api_key"]
    issue = await client.post(
        f"/api/projects/{test_project.id}/issues", json={"title": "by a session"}, headers=_bearer(session_key),
    )
    assert issue.status_code == 201, issue.text
    doc = await client.post(
        f"/api/teams/{test_team.id}/documents",
        json={"title": "session notes", "content": "x", "icon": "📝", "project_id": test_project.id},
        headers=_bearer(session_key),
    )
    assert doc.status_code == 201, doc.text
    session = await OxydeUser.objects.get(id=registered["agent"]["id"])
    return session, issue.json()["id"]


def test_a_new_session_address_is_random():
    first, second = session_email(), session_email()
    assert NEW_FORM.fullmatch(first) and first != second


async def test_a_registered_session_address_carries_nothing_of_its_ref(session_at_work):
    session, _ = session_at_work
    assert NEW_FORM.fullmatch(session.email), session.email
    assert not carries_ref(session.email, REF)
    assert session.email_folded == session.email


async def _feed_emails(client, headers, test_team, issue_id, session_id):
    feed = await client.get(f"/api/issues/activities?team_id={test_team.id}", headers=headers)
    assert feed.status_code == 200, feed.text
    issue_feed = await client.get(f"/api/issues/{issue_id}/activities", headers=headers)
    assert issue_feed.status_code == 200, issue_feed.text
    rows = [r for r in feed.json() + issue_feed.json() if r["user_id"] == session_id]
    # The issue's own activity, and at least one issue row and one
    # document row in the team feed.
    assert any(r.get("document_id") for r in feed.json() if r["user_id"] == session_id)
    assert any(r.get("issue_id") for r in feed.json() if r["user_id"] == session_id)
    assert issue_feed.json() and all(r["user_id"] == session_id for r in issue_feed.json())
    return {r["user_email"] for r in rows}


async def test_a_plain_teammate_sees_no_session_address_in_the_feeds(client, session_at_work, test_team):
    session, issue_id = session_at_work
    _, mate_headers = await _teammate(test_team)
    assert await _feed_emails(client, mate_headers, test_team, issue_id, session.id) == {None}


async def test_the_holder_and_an_admin_see_it_and_it_carries_no_ref(
    client, auth_headers, session_at_work, test_team,
):
    session, issue_id = session_at_work
    _, admin_headers = await _teammate(test_team, role=TeamRole.ADMIN, email="admin@example.com")
    for headers in (auth_headers, admin_headers):
        emails = await _feed_emails(client, headers, test_team, issue_id, session.id)
        assert emails == {session.email}
        assert not carries_ref(session.email, REF)


async def test_a_person_and_a_plain_agent_keep_their_address_in_the_feed(
    client, auth_headers, test_user, test_team, test_project,
):
    """Only a session identity's address hides."""
    _, mate_headers = await _teammate(test_team)
    agent = await client.post(f"/api/teams/{test_team.id}/agents", json={"name": "Helper"}, headers=auth_headers)
    assert agent.status_code == 201, agent.text
    for headers in (auth_headers, _bearer(agent.json()["api_key"])):
        made = await client.post(
            f"/api/projects/{test_project.id}/issues", json={"title": "t"}, headers=headers,
        )
        assert made.status_code == 201, made.text
    feed = (await client.get(f"/api/issues/activities?team_id={test_team.id}", headers=mate_headers)).json()
    emails = {r["user_id"]: r["user_email"] for r in feed}
    assert emails[test_user.id] == test_user.email
    agent_row = await OxydeUser.objects.get(id=agent.json()["id"])
    assert emails[agent_row.id] == agent_row.email
