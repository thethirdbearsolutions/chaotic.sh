"""`team roster`, `team whois`, `auth profile` (CHT-1981)."""
import json
from unittest.mock import MagicMock

import pytest


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    yield


ROSTER = [
    {"user_id": "u-ada-1111", "name": "Ada", "avatar_url": None, "pronouns": "she/her",
     "tagline": "Founder", "bio": "Builds **Chaotic**.", "mention_handle": "ada", "is_agent": False,
     "role": "owner", "kind": None, "owner_id": None, "owner_name": None, "idle": False},
    {"user_id": "a-piper-2222", "name": "Piper", "avatar_url": "🦉", "pronouns": "it/its",
     "tagline": "[red]Reviews PRs[/red]", "bio": None, "mention_handle": "piper", "is_agent": True,
     "role": None, "kind": "session", "owner_id": "u-ada-1111", "owner_name": "Ada", "idle": True},
]


def test_roster_lists_people_and_agents(cli_runner):
    from cli.main import cli, client
    client.get_team_roster = MagicMock(return_value=ROSTER)

    result = cli_runner.invoke(cli, ["team", "roster", "--hide-idle"])

    assert result.exit_code == 0, result.output
    client.get_team_roster.assert_called_once()
    assert client.get_team_roster.call_args.kwargs["hide_idle"] is True
    for text in ("Ada", "@ada", "she/her", "owner", "Founder", "🦉 Piper", "agent (session), idle"):
        assert text in result.output, text
    # A teammate's own text is never Rich markup.
    assert "[red]Reviews" in result.output and "PRs[/red]" in result.output


def test_roster_json(cli_runner):
    from cli.main import cli, client
    client.get_team_roster = MagicMock(return_value=ROSTER)

    result = cli_runner.invoke(cli, ["team", "roster", "--json"])

    assert result.exit_code == 0, result.output
    assert json.loads(result.stdout)[1]["name"] == "Piper"


@pytest.mark.parametrize("who", ["@piper", "piper", "a-piper-2222"])
def test_whois_finds_by_handle_name_or_id(cli_runner, who):
    from cli.main import cli, client
    client.get_team_roster = MagicMock(return_value=ROSTER)

    result = cli_runner.invoke(cli, ["team", "whois", who])

    assert result.exit_code == 0, result.output
    assert "Piper" in result.output and "owned by Ada" in result.output
    assert "No bio yet." in result.output


def test_whois_falls_back_to_the_assignee_resolver(cli_runner):
    from cli.main import cli, client
    client.get_team_roster = MagicMock(return_value=ROSTER)
    client.get_me = MagicMock(return_value={"id": "u-ada-1111"})

    result = cli_runner.invoke(cli, ["team", "whois", "me", "--json"])

    assert result.exit_code == 0, result.output
    assert json.loads(result.stdout)["bio"] == "Builds **Chaotic**."


def test_whois_says_when_nobody_matches(cli_runner):
    from cli.main import cli, client
    client.get_team_roster = MagicMock(return_value=ROSTER)
    client.get_me = MagicMock(return_value={"id": "u-elsewhere"})

    result = cli_runner.invoke(cli, ["team", "whois", "me"])

    assert result.exit_code != 0
    assert "not on this team's roster" in result.output


ME = {"id": "u-ada-1111", "name": "Ada", "email": "ada@example.com", "avatar_url": None,
      "pronouns": "she/her", "tagline": "Founder", "bio": None, "is_agent": False}


def test_profile_with_no_options_shows_yours(cli_runner):
    from cli.main import cli, client
    client.get_me = MagicMock(return_value=ME)
    client.update_me = MagicMock()

    result = cli_runner.invoke(cli, ["auth", "profile"])

    assert result.exit_code == 0, result.output
    client.update_me.assert_not_called()
    assert "Founder" in result.output and "--bio" in result.output


def test_profile_changes_only_what_you_pass(cli_runner, tmp_path):
    from cli.main import cli, client
    bio = tmp_path / "bio.md"
    bio.write_text("I review **migrations**.\n")
    client.update_me = MagicMock(return_value={**ME, "bio": "I review **migrations**."})

    result = cli_runner.invoke(cli, ["auth", "profile", "--bio", f"@{bio}", "--pronouns", ""])

    assert result.exit_code == 0, result.output
    client.update_me.assert_called_once_with(bio="I review **migrations**.\n", pronouns="")


def test_profile_clears_the_avatar_with_an_empty_value(cli_runner):
    from cli.main import cli, client
    client.update_me = MagicMock(return_value=ME)

    result = cli_runner.invoke(cli, ["auth", "profile", "--avatar", ""])

    assert result.exit_code == 0, result.output
    client.update_me.assert_called_once_with(avatar_url=None)


def test_profile_refuses_a_blank_name(cli_runner):
    from cli.main import cli, client
    client.update_me = MagicMock()

    result = cli_runner.invoke(cli, ["auth", "profile", "--name", "  "])

    assert result.exit_code != 0
    client.update_me.assert_not_called()
