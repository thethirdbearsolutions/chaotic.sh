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
# `user_id` is the account's `id`, named as the roster names it.
PROFILE_FIELDS = ("user_id", "name", "avatar_url", "pronouns", "tagline", "bio", "is_agent")
# The roster of one team is small; this is a ceiling, not a page.
ROSTER_LIMIT = 1000


async def team_roster(
    backend: Backend,
    team: Annotated[str | None, Field(description=TEAM_FIELD_DESC)] = None,
    include_idle: Annotated[
        bool, Field(description="Also list idle session identities (keys unused for 7 days); left out by default.")
    ] = False,
    detail: Annotated[bool, Field(description=DETAIL_ROSTER_DESC)] = False,
) -> dict:
    """List everyone on the team, people and agents, with the identity
    each wrote for themselves: name, @handle, pronouns, tagline, role (an
    agent: its kind and owner).

    Who to ask, who to assign, who to @mention. People come first by
    role, then agents, each by name. Write your own with profile_update.
    """
    team_id = await backend.resolve_member_team(team)
    roster = await backend.get_team_roster(team_id, include_idle=include_idle)
    return listing("members", roster, ROSTER_LIMIT, COMPACT_ROSTER_FIELDS, detail)


def roster_lookup(roster: list, who: str) -> list:
    """The roster entries `who` names: an @handle, an exact id, a name
    (any case), or a handle typed without its @. Several entries when
    a name is shared; the caller refuses that rather than pick one.

    Matched against the roster itself, so it finds exactly whom the
    roster shows: a sibling project's agent that a project-scoped caller
    sees there, and never a deactivated teammate the roster leaves out
    (PR #516 review). Shared by the CLI's `team whois`."""
    wanted = " ".join(who.split())
    if not wanted:
        return []

    def by_handle(handle: str) -> list:
        handle = handle.casefold()
        return [e for e in roster if handle and (e.get("mention_handle") or "").casefold() == handle]

    if wanted.startswith("@"):
        return by_handle(wanted[1:])
    by_id = [e for e in roster if e.get("user_id") == wanted]
    if by_id:
        return by_id
    folded = wanted.casefold()
    by_name = [e for e in roster if " ".join((e.get("name") or "").split()).casefold() == folded]
    return by_name or by_handle(wanted)


def ambiguous_message(who: str, hits: list) -> str:
    """Why `who` was refused: it names several teammates, by handle."""
    handles = ", ".join(f"@{e['mention_handle']}" for e in hits if e.get("mention_handle"))
    return f"{who!r} names {len(hits)} teammates; use one of their handles: {handles}."


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
    roster = await backend.get_team_roster(team_id, include_idle=True)
    hits = roster_lookup(roster, who)
    if len(hits) > 1:
        raise ToolInputError(ambiguous_message(who, hits))
    entry = hits[0] if hits else None
    if entry is None and not who.strip().startswith("@"):
        # An email, 'me' or an id prefix: the resolver knows those.
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
    if "avatar_url" in fields and not fields["avatar_url"].strip():
        fields["avatar_url"] = None
    me = await backend.update_me(**fields)
    # `user_id`, as on the roster rows, so the two compare (PR #516 review).
    return {"user_id": me.get("id"), **{key: me.get(key) for key in PROFILE_FIELDS[1:]}}
