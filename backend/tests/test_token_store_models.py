"""The token-store models through Oxyde (CHT-1515): each builds from its
`<name>_id` columns alone, DbEnum columns store `.name` and filter by
member, and a required reference left out is refused by the database
(the `X | None = Field(default=None, db_nullable=False)` declaration moves
that refusal from pydantic to SQLite, so this is where it is pinned)."""
from datetime import datetime, timedelta, timezone

import pytest
from oxyde import IntegrityError, execute_raw

from app.enums import HolderVia, OAuthClientRegistration, RevocationTarget, TokenKind
from app.oxyde_models.oauth import (
    OxydeAuthToken,
    OxydeHolderSession,
    OxydeOAuthAuthorizationRequest,
    OxydeOAuthClient,
    OxydeRevocationEvent,
)
from app.oxyde_models.user import OxydeUser

LATER = datetime.now(timezone.utc) + timedelta(days=1)


async def test_every_model_builds_from_ids_alone(test_user, test_team):
    agent = await OxydeUser.objects.create(
        email="a@example.com", hashed_password="x", name="A", is_agent=True, agent_team_id=test_team.id,
        parent_user_id=test_user.id,
    )
    client = await OxydeOAuthClient.objects.create(id="dcr_x", registration=OAuthClientRegistration.DCR, redirect_uris="[]")
    request = await OxydeOAuthAuthorizationRequest.objects.create(
        id="r" * 32, client_id=client.id, redirect_uri="http://127.0.0.1/cb", code_challenge="c",
        bound_user_id=test_user.id, expires_at=LATER,
    )
    session = await OxydeHolderSession.objects.create(
        team_id=test_team.id, principal_user_id=agent.id, holder_user_id=test_user.id, via=HolderVia.OAUTH,
        oauth_client_id=client.id, resource="https://x/mcp", idle_expires_at=LATER, absolute_expires_at=LATER,
    )
    token = await OxydeAuthToken.objects.create(
        kind=TokenKind.ACCESS, token_hash="h", display_prefix="cat_0000", holder_session_id=session.id,
        team_id=test_team.id, principal_user_id=agent.id, holder_user_id=test_user.id, resource="https://x/mcp",
        expires_at=LATER,
    )
    event = await OxydeRevocationEvent.objects.create(
        seq=1, team_id=test_team.id, actor_id=test_user.id, target_type=RevocationTarget.HOLDER_SESSION,
        target_id=session.id,
    )
    assert request.bound_user_id == test_user.id and session.team_id == test_team.id
    rows = await execute_raw(
        "SELECT (SELECT via FROM holder_sessions) AS via, (SELECT kind FROM auth_tokens) AS kind, "
        "(SELECT target_type FROM revocation_events) AS target, (SELECT registration FROM oauth_clients) AS reg"
    )
    assert rows[0] == {"via": "OAUTH", "kind": "ACCESS", "target": "HOLDER_SESSION", "reg": "DCR"}
    assert (await OxydeAuthToken.objects.get(kind=TokenKind.ACCESS)).id == token.id
    assert (await OxydeRevocationEvent.objects.get(target_type=RevocationTarget.HOLDER_SESSION)).id == event.id
    assert (await OxydeHolderSession.objects.get(via=HolderVia.OAUTH)).via == HolderVia.OAUTH


async def test_a_web_login_session_may_have_no_team(test_user):
    """CHT-1524: an account-wide session."""
    session = await OxydeHolderSession.objects.create(
        principal_user_id=test_user.id, holder_user_id=test_user.id, via=HolderVia.OAUTH, resource="https://x",
        idle_expires_at=LATER, absolute_expires_at=LATER,
    )
    assert session.team_id is None


@pytest.mark.parametrize("missing", ["team_id", "principal_user_id", "holder_user_id"])
async def test_a_token_missing_a_required_reference_is_refused(test_user, test_team, missing):
    values = dict(
        kind=TokenKind.CLAIM_TICKET, token_hash=f"h-{missing}", display_prefix="cct_0000", team_id=test_team.id,
        principal_user_id=test_user.id, holder_user_id=test_user.id, resource="https://x", expires_at=LATER,
    )
    del values[missing]
    with pytest.raises(IntegrityError):
        await OxydeAuthToken.objects.create(**values)
