"""Team roster and self-written identity tools (CHT-1982).

Every member, people and agents alike, writes their own identity: name,
avatar, pronouns, a one-line tagline and a markdown bio (an agent's
persona goes there). `profile_update` is how an agent writes its own;
nothing here edits anyone else's.
"""
from __future__ import annotations

from typing import Annotated

from pydantic import Field

from ..backend import Backend
from ..constants import TEAM_FIELD_DESC
from ..errors import ToolInputError
from ..shapes import COMPACT_ROSTER_FIELDS, _fields_prose, listing

DETAIL_ROSTER_DESC = (
    "Return every field of each teammate (bio, avatar_url, owner and project ids, "
    f"joined_at) instead of the compact row. Compact rows carry: {_fields_prose(COMPACT_ROSTER_FIELDS)}. "
    "Use team_member for one teammate in full."
)
# What profile_update returns: the identity just written, not the account.
PROFILE_FIELDS = ("id", "name", "avatar_url", "pronouns", "tagline", "bio", "is_agent")
# The roster of one team is small; this is a ceiling, not a page.
ROSTER_LIMIT = 1000


async def team_roster(
    backend: Backend,
    team: Annotated[str | None, Field(description=TEAM_FIELD_DESC)] = None,
    hide_idle: Annotated[bool, Field(description="Leave out idle session identities (keys unused for 7 days).")] = False,
    detail: Annotated[bool, Field(description=DETAIL_ROSTER_DESC)] = False,
) -> dict:
    """List everyone on the team, people and agents, with the identity
    each wrote for themselves: name, @handle, pronouns, tagline, role (an
    agent: its kind and owner).

    Who to ask, who to assign, who to @mention. People come first by
    role, then agents, each by name. Write your own with profile_update.
    """
    team_id = await backend.resolve_member_team(team)
    roster = await backend.get_team_roster(team_id, hide_idle=hide_idle)
    return listing("members", roster, ROSTER_LIMIT, COMPACT_ROSTER_FIELDS, detail)


def roster_match(roster: list, who: str) -> dict | None:
    """The entry `who` names when it is an @handle or an exact id; None
    otherwise. A bare name goes to the assignee resolver instead, which
    weighs names, emails and handles together and refuses an ambiguous
    one, so this lookup can never pick one of two teammates silently.
    Shared by the CLI's `team whois`."""
    wanted = who.strip()
    if wanted.startswith("@"):
        handle = wanted[1:].lower()
        hits = [e for e in roster if (e.get("mention_handle") or "").lower() == handle]
    else:
        hits = [e for e in roster if e.get("user_id") == wanted]
    return hits[0] if len(hits) == 1 else None


async def team_member(
    backend: Backend,
    who: Annotated[
        str, Field(description="Who: an @handle, a name, an email, a user/agent id, or 'me'.")
    ],
    team: Annotated[str | None, Field(description=TEAM_FIELD_DESC)] = None,
) -> dict:
    """Show one teammate's full profile: name, @handle, pronouns, tagline,
    bio, role (an agent: kind and owner).

    Read it before working with someone for the first time: the bio is
    what they wrote about how they work. 'me' shows your own.
    """
    team_id = await backend.resolve_member_team(team)
    roster = await backend.get_team_roster(team_id, hide_idle=False)
    entry = roster_match(roster, who)
    if entry is None:
        user_id = await backend.resolve_assignee(who, team_id, purpose="filter")
        entry = next((e for e in roster if e.get("user_id") == user_id), None)
    if entry is None:
        raise ToolInputError(f"{who!r} is not on this team's roster.")
    return entry


async def profile_update(
    backend: Backend,
    name: Annotated[str | None, Field(description="Your name. An agent may not take a teammate's name.")] = None,
    avatar_url: Annotated[
        str | None, Field(description="An emoji or an image URL. Empty string clears it.")
    ] = None,
    pronouns: Annotated[str | None, Field(description='e.g. "they/them". Empty string clears it.')] = None,
    tagline: Annotated[
        str | None, Field(description="One line under your name on the roster. Empty string clears it.")
    ] = None,
    bio: Annotated[
        str | None,
        Field(description="Markdown about yourself: for an agent, your persona and how you work. Empty string clears it."),
    ] = None,
) -> dict:
    """Write your own profile: the identity teammates see on the roster.

    Yours to write, person or agent. Only the fields you pass change;
    pass an empty string to clear one. Returns your updated profile.
    """
    fields = {
        key: value for key, value in (
            ("name", name), ("avatar_url", avatar_url), ("pronouns", pronouns),
            ("tagline", tagline), ("bio", bio),
        ) if value is not None
    }
    if not fields:
        raise ToolInputError("Pass at least one of name, avatar_url, pronouns, tagline, bio.")
    if fields.get("avatar_url") == "":
        fields["avatar_url"] = None
    me = await backend.update_me(**fields)
    return {key: me.get(key) for key in PROFILE_FIELDS}
