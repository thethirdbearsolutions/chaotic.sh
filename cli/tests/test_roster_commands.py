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

    result = cli_runner.invoke(cli, ["team", "roster", "--all"])

    assert result.exit_code == 0, result.output
    client.get_team_roster.assert_called_once()
    assert client.get_team_roster.call_args.kwargs["include_idle"] is True
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


@pytest.mark.parametrize("who", ["@piper", "@Piper", "piper", "a-piper-2222"])
def test_whois_finds_by_handle_name_or_id(cli_runner, who):
    from cli.main import cli, client
    client.get_team_roster = MagicMock(return_value=ROSTER)
    client.get_team_members = MagicMock(return_value=[])
    client.get_team_agents = MagicMock(return_value=[{"id": "a-piper-2222", "name": "Piper"}])

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


def test_whois_an_ambiguous_name_is_refused_not_guessed(cli_runner):
    """A name two teammates answer to is refused, with their handles,
    rather than the roster picking one."""
    from cli.main import cli, client
    client.get_team_roster = MagicMock(return_value=[{**r, "name": "Sam"} for r in ROSTER])

    result = cli_runner.invoke(cli, ["team", "whois", "sam"])

    assert result.exit_code != 0
    assert "Profile" not in result.output
    assert "@ada" in result.output and "@piper" in result.output


def test_roster_default_leaves_idle_sessions_to_the_server(cli_runner):
    from cli.main import cli, client
    client.get_team_roster = MagicMock(return_value=ROSTER[:1])

    result = cli_runner.invoke(cli, ["team", "roster"])

    assert result.exit_code == 0, result.output
    assert not client.get_team_roster.call_args.kwargs["include_idle"]


def test_whois_an_unknown_handle_is_not_on_the_roster(cli_runner):
    """An @handle no one on the roster has is answered as a teammate,
    never as a missing assignee."""
    from cli.main import cli, client
    client.get_team_roster = MagicMock(return_value=ROSTER)

    result = cli_runner.invoke(cli, ["team", "whois", "@nobody"])

    assert result.exit_code != 0
    assert "not on this team's roster" in result.output
    assert "Assignee" not in result.output


def test_whois_a_bare_at_sign_matches_no_one(cli_runner):
    from cli.main import cli, client
    client.get_team_roster = MagicMock(return_value=[{**ROSTER[0], "mention_handle": None}])

    result = cli_runner.invoke(cli, ["team", "whois", "@"])

    assert result.exit_code != 0


def test_whois_an_unknown_name_is_not_called_an_assignee(cli_runner):
    from cli.main import cli, client
    client.get_team_roster = MagicMock(return_value=ROSTER)
    client.get_team_members = MagicMock(return_value=[])
    client.get_team_agents = MagicMock(return_value=[])

    result = cli_runner.invoke(cli, ["team", "whois", "Nobody"])

    assert result.exit_code != 0
    assert "not on this team's roster" in result.output


def test_a_control_character_in_an_avatar_never_reaches_the_terminal(cli_runner):
    from cli.main import cli, client
    client.get_team_roster = MagicMock(return_value=[{**ROSTER[1], "avatar_url": "\x1b[2J🦉"}])

    result = cli_runner.invoke(cli, ["team", "roster", "--all"])

    assert result.exit_code == 0, result.output
    assert "\x1b" not in result.output and "🦉" in result.output


def test_whois_profile_text_is_not_markup(cli_runner):
    from cli.main import cli, client
    client.get_team_roster = MagicMock(return_value=[{**ROSTER[0], "bio": "[bold]loud[/bold]", "pronouns": "[red]x[/red]"}])

    result = cli_runner.invoke(cli, ["team", "whois", "@ada"])

    assert result.exit_code == 0, result.output
    assert "[bold]loud[/bold]" in result.output and "[red]x[/red]" in result.output


def test_profile_a_blank_avatar_clears_it(cli_runner):
    from cli.main import cli, client
    client.update_me = MagicMock(return_value=ME)

    result = cli_runner.invoke(cli, ["auth", "profile", "--avatar", "   "])

    assert result.exit_code == 0, result.output
    client.update_me.assert_called_once_with(avatar_url=None)


def test_whois_me_is_you_even_beside_a_teammate_named_me(cli_runner):
    from cli.main import cli, client
    client.get_team_roster = MagicMock(return_value=[ROSTER[0], {**ROSTER[1], "name": "Me", "mention_handle": "me"}])
    client.get_me = MagicMock(return_value={"id": "u-ada-1111"})

    result = cli_runner.invoke(cli, ["team", "whois", "me", "--json"])

    assert result.exit_code == 0, result.output
    assert json.loads(result.stdout)["user_id"] == "u-ada-1111"


def test_whois_an_ambiguous_id_prefix_says_so(cli_runner):
    from cli.main import cli, client
    client.get_team_roster = MagicMock(return_value=ROSTER)
    client.get_team_members = MagicMock(return_value=[{"user_id": "abcd-1", "user_name": "X"}])
    client.get_team_agents = MagicMock(return_value=[{"id": "abcd-2", "name": "Y"}])

    result = cli_runner.invoke(cli, ["team", "whois", "abcd"])

    assert result.exit_code != 0
    assert "not on this team's roster" not in result.output
