"""@mention handles (CHT-1731).

Who can be @mentioned in a team: its human members (``team_members``)
and its active agents (``users.agent_team_id``), session identities
included. Agents have no ``team_members`` row, so before this nothing but
humans could ever be mentioned.

Each principal has a list of candidate handles, most readable first:

- a person: the first word of their name (what ``@ethan`` has always
  meant), then their whole name;
- a session identity whose name has the default ``<registrar> · … ·
  <tail>`` shape: ``<first word>-<tail>``, e.g. ``claude-3f9a1c``;
- every agent: its whole name, e.g. ``claude-mcp``, then its first word.
  Until CHT-1731 the autocomplete offered every "Claude …" as ``@claude``,
  so that word stays claimed by all of them and is ambiguous among them;
- last, for everyone: ``<first word>.<first 8 of the id>``, which no
  other principal can share.

A token names the people who have it as a candidate or, when no person
does, the agents who do. People come first so that naming an agent can
never take a person's handle away or make it ambiguous.

A principal's handle is its first candidate that names only them. That is
what the web autocomplete, ``agent list`` and ``team members`` show, and it
always resolves to exactly them.

Resolving a typed ``@token`` is the same rule from the other side: it
reaches a principal only when it names exactly one. An ambiguous token
(``@claude`` in a team of Claude sessions) reaches nobody; it never picks
one and never fans out to all of them.

Handles are derived from names and ids, so nothing is stored; a rename
changes the handle, as a person's has always changed with their name.
"""
from __future__ import annotations

import re
import unicodedata
from dataclasses import dataclass

from app.enums import AgentKind

# The characters a mention can carry (frontend/src/mention-autocomplete.js
# and inbox_service._MENTION_RE).
HANDLE_RE = re.compile(r"[a-zA-Z0-9._-]+")
_NOT_SLUG = re.compile(r"[^a-z0-9]+")
# How a default session identity name is built: the registrar's name,
# then " · "-separated parts ending with a piece of the session id
# (cli/src/cli/session_identity.py, RegistrationService._default_name).
SESSION_NAME_SEP = " · "
ID_PREFIX_LEN = 8


def slugify(text: str | None) -> str:
    """Lowercase ASCII words joined by '-': "Claude Code (Ethan's Mac)"
    becomes "claude-code-ethan-s-mac". Never contains '.' or '_'."""
    folded = unicodedata.normalize("NFKD", text or "").encode("ascii", "ignore").decode()
    return _NOT_SLUG.sub("-", folded.lower()).strip("-")


def legacy_first_word_handle(name: str | None, email: str | None) -> str:
    """A person's handle before CHT-1731, kept so ``@ethan`` still works:
    the first word of the name lowercased, or the email local part, or
    'user'. Mirrors getMemberHandle() in mention-autocomplete.js."""
    if name:
        return name.split(" ")[0].lower()
    if email:
        return email.split("@")[0].lower()
    return "user"


def candidates(user) -> tuple[str, ...]:
    """A principal's candidate handles, most preferred first (see the
    module docstring). The last one is always ``<first word>.<id prefix>``."""
    is_agent = bool(user.is_agent)
    name = (user.name or "").strip()
    if not name and not is_agent:
        name = (user.email or "").split("@")[0]
    full = slugify(name)
    word = (slugify(name.split()[0]) if name else "") or full.split("-")[0]
    first = word or ("agent" if is_agent else "user")

    out: list[str] = []
    if not is_agent:
        legacy = legacy_first_word_handle(user.name, user.email)
        if HANDLE_RE.fullmatch(legacy):
            out.append(legacy)
        out += [word, full]
    else:
        if user.kind == AgentKind.SESSION and SESSION_NAME_SEP in name:
            tail = slugify(name.rsplit(SESSION_NAME_SEP, 1)[1])
            if tail:
                out.append(f"{first}-{tail}")
        # The first word comes after the whole name: it is claimed (so a
        # word several agents share is ambiguous) but shown only when it
        # is the whole name.
        out += [full, word]
    out.append(f"{first}.{user.id.replace('-', '')[:ID_PREFIX_LEN].lower()}")
    return tuple(h for h in dict.fromkeys(out) if h)


@dataclass(frozen=True)
class Mentionable:
    user_id: str
    is_agent: bool
    # Set for a project-scoped agent: it is mentioned only from that project.
    agent_project_id: str | None


class MentionDirectory:
    """The mentionable principals of one team and their handles."""

    def __init__(self, users) -> None:
        self._people: dict[str, Mentionable] = {}
        self._candidates: dict[str, tuple[str, ...]] = {}
        self._claims: dict[str, set[str]] = {}
        for user in users:
            if user is None or user.id in self._people:
                continue
            if user.is_agent and not user.is_active:
                continue
            self._people[user.id] = Mentionable(
                user_id=user.id, is_agent=bool(user.is_agent),
                agent_project_id=user.agent_project_id if user.is_agent else None,
            )
            self._candidates[user.id] = candidates(user)
            for handle in self._candidates[user.id]:
                self._claims.setdefault(handle, set()).add(user.id)

    @classmethod
    async def for_team(cls, team_id: str, *, members=None) -> "MentionDirectory":
        """Every member of the team, then its active agents (the ones
        scoped to one of its projects included). `members`: the team's
        ``TeamService.get_members`` rows, when the caller already has them."""
        from app.oxyde_models.user import OxydeUser
        from app.services.team_service import TeamService

        if members is None:
            members = await TeamService().get_members(team_id)
        agents = await OxydeUser.objects.filter(
            is_agent=True, agent_team_id=team_id, is_active=True,
        ).order_by("created_at").all()
        return cls([m.user for m in members] + list(agents))

    def _claimants(self, handle: str) -> set[str]:
        """Who `handle` names. People come first: if any person claims it,
        only people do, so naming an agent can never take a person's handle
        or make it ambiguous (and ``@claude`` still reaches a person whose
        first word it is, as it always has)."""
        ids = self._claims.get(handle, set())
        people = {i for i in ids if not self._people[i].is_agent}
        return people or ids

    def _token_claimants(self, token: str) -> set[str]:
        """`_claimants` of a typed token. A trailing '.', '-' or '_'
        (sentence punctuation after the handle) is dropped when the token
        itself is nobody's candidate."""
        token = token.lower()
        if token not in self._claims:
            token = token.rstrip("._-")
        return self._claimants(token)

    def handle_for(self, user_id: str) -> str | None:
        """The handle to show for `user_id`: its first candidate that names
        only them (the id-prefixed one if none does). None if the user is
        not mentionable in this team."""
        cands = self._candidates.get(user_id)
        if not cands:
            return None
        for handle in cands:
            if self._claimants(handle) == {user_id}:
                return handle
        return cands[-1]

    def resolve(self, token: str) -> str | None:
        """The one principal `token` names, or None when it names nobody
        or more than one."""
        ids = self._token_claimants(token)
        return next(iter(ids)) if len(ids) == 1 else None

    def ambiguous(self, token: str) -> bool:
        """Whether `token` names more than one principal."""
        return len(self._token_claimants(token)) > 1

    def can_reach(self, user_id: str, project_id: str | None) -> bool:
        """A project-scoped agent is reached only from its own project
        (a team-level document has no project, so it reaches none)."""
        person = self._people.get(user_id)
        if person is None:
            return False
        return person.agent_project_id is None or person.agent_project_id == project_id
