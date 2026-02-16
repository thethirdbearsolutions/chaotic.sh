"""E2E contract tests: Teams, members, and invitations."""
import pytest
from cli.client import APIError


class TestTeamCRUD:
    def test_create_team(self, api_client):
        team = api_client.create_team(name="New Team", key="NEW")
        assert team["name"] == "New Team"
        assert team["key"] == "NEW"
        assert "id" in team

    def test_create_team_with_description(self, api_client):
        team = api_client.create_team(name="Desc Team", key="DSC", description="A described team")
        assert team["description"] == "A described team"

    def test_create_team_duplicate_key(self, api_client, test_team):
        with pytest.raises(APIError):
            api_client.create_team(name="Another", key="E2E")

    def test_get_teams(self, api_client, test_team):
        teams = api_client.get_teams()
        assert isinstance(teams, list)
        assert any(t["id"] == test_team["id"] for t in teams)

    def test_get_team(self, api_client, test_team):
        team = api_client.get_team(test_team["id"])
        assert team["name"] == "E2E Team"
        assert team["id"] == test_team["id"]

    def test_get_team_not_found(self, api_client):
        with pytest.raises(APIError):
            api_client.get_team("nonexistent-id")

    def test_update_team(self, api_client, test_team):
        updated = api_client.update_team(test_team["id"], description="Updated desc")
        assert updated["description"] == "Updated desc"

    def test_delete_team(self, api_client):
        team = api_client.create_team(name="To Delete", key="DEL")
        api_client.delete_team(team["id"])
        with pytest.raises(APIError):
            api_client.get_team(team["id"])

    def test_create_team_unauthenticated(self, unauthenticated_client):
        with pytest.raises(APIError):
            unauthenticated_client.create_team(name="No Auth", key="NAH")


class TestTeamMembers:
    def test_get_members(self, api_client, test_team):
        members = api_client.get_team_members(test_team["id"])
        assert isinstance(members, list)
        assert len(members) >= 1

    def test_remove_member_last_admin_fails(self, api_client, test_team, test_user):
        # Removing yourself as the last admin should fail
        with pytest.raises(APIError):
            api_client.remove_member(test_team["id"], test_user.id)


class TestInvitations:
    def test_invite_member(self, api_client, test_team):
        invite = api_client.invite_member(test_team["id"], "invite@example.com")
        assert "id" in invite
        assert invite["email"] == "invite@example.com"

    def test_get_invitations(self, api_client, test_team):
        api_client.invite_member(test_team["id"], "inv2@example.com")
        invites = api_client.get_invitations(test_team["id"])
        assert isinstance(invites, list)
        assert len(invites) >= 1

    def test_delete_invitation(self, api_client, test_team):
        invite = api_client.invite_member(test_team["id"], "del@example.com")
        api_client.delete_invitation(test_team["id"], invite["id"])
        invites = api_client.get_invitations(test_team["id"])
        assert not any(i["id"] == invite["id"] for i in invites)

    def test_invite_response_structure(self, api_client, test_team):
        invite = api_client.invite_member(test_team["id"], "structure@example.com")
        assert "id" in invite
        assert "team_id" in invite
        assert "email" in invite
        assert invite["email"] == "structure@example.com"
        assert "status" in invite

    def test_accept_invitation(self, api_client, test_team):
        """Accept an invitation using the token fetched from the DB."""
        # Create a fresh user for this test (not already a team member)
        from conftest import _run_async, _create_user_in_db
        from unittest.mock import patch
        accept_user = _run_async(_create_user_in_db(
            "accept-invite@example.com", "Accept User"
        ))
        from app.utils.security import create_access_token
        accept_token = create_access_token(data={"sub": accept_user.id})
        invite = api_client.invite_member(test_team["id"], accept_user.email)
        # Token isn't in API response; fetch it from DB
        from app.database import async_session_maker
        from app.models.team import TeamInvitation
        from sqlalchemy import select

        async def _get_token():
            async with async_session_maker() as session:
                result = await session.execute(
                    select(TeamInvitation.token).where(
                        TeamInvitation.id == invite["id"]
                    )
                )
                return result.scalar_one()

        token = _run_async(_get_token())

        # Accept as the invited user
        from conftest import TEST_BASE_URL
        from cli.client import Client
        with patch('cli.client.get_api_url', return_value=TEST_BASE_URL), \
             patch('cli.client.get_token', return_value=accept_token), \
             patch('cli.client.get_api_key', return_value=None):
            accept_client = Client()
            result = accept_client.accept_invitation(token)
        assert result is not None
        # User should now be a member
        members = api_client.get_team_members(test_team["id"])
        assert any(m.get("user_id") == accept_user.id for m in members)
