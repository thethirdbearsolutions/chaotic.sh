"""@mention handles (CHT-1731).

Who can be @mentioned in a team: its human members (``team_members``)
and its active agents (``users.agent_team_id``), session identities
included. Agents have no ``team_members`` row, so before this nothing but
humans could ever be mentioned.

Each principal has candidate handles, most readable first. Some are
*weak*: a first word, which others may well share.

- a person: the first word of their name (what ``@ethan`` has always
  meant; weak), then their whole name (``@ethan-smith``);
- a session identity whose name has the default ``<registrar> · … ·
  <tail>`` shape: ``<first word>-<tail>``, e.g. ``claude-3f9a1c``;
- every agent: its whole name, e.g. ``claude-mcp``, then its first word
  (weak). Until CHT-1731 the autocomplete offered every "Claude …" as
  ``@claude``, so that word stays claimed by all of them;
- last, the **id handle** ``<first word>.<first 8 hex of the id>`` (all
  32 if 8 are shared). A token of that shape (``word.<8 or 32 hex>``)
  is looked up by its hex alone, so it always reaches the principal with
  that id, survives renames, and no name can claim it: a candidate of
  that shape (a person's first word "claude.28b1c019") is dropped.

Who a token names:

- an id handle: the principal whose id it carries;
- otherwise every principal that has it as a candidate, except that when
  all of those claims are weak and a person is among them, only the
  people count. So ``@ethan`` stays Ethan's when an agent is called
  "Ethan Bot", and ``@claude`` still reaches a person named Claude when
  only "Claude …" agents share the word. Any other overlap between a
  person and an agent (a person renamed "claude-mcp", an agent named
  "Ethan") names both, so neither takes the other's handle.

A token reaches a principal only when it names exactly one. An ambiguous
token (``@claude`` in a team of Claude sessions) reaches nobody; it never
picks one and never fans out to all of them. A principal's handle is its
first candidate that names only it, so the handle the web autocomplete,
``agent list`` and ``team members`` show always reaches exactly them.

An idle session identity (CHT-1501) keeps its own handles but claims no
weak word: a pile of old sessions must not make ``@claude`` ambiguous.

Handles are derived from names and ids, so nothing is stored; a rename
changes the handle, as a person's has always changed with their name
(the id handle aside).
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


ID_HANDLE_RE = re.compile(r"[a-z0-9-]+\.([0-9a-f]{32}|[0-9a-f]{8})")


def _hex(user_id: str) -> str:
    return user_id.replace("-", "").lower()


def _first_word(user) -> tuple[str, str, str]:
    """(name, full slug, first-word slug) of a principal; a nameless
    person goes by the email local part."""
    is_agent = bool(user.is_agent)
    name = (user.name or "").strip()
    if not name and not is_agent:
        name = (user.email or "").split("@")[0]
    full = slugify(name)
    word = (slugify(name.split()[0]) if name else "") or full.split("-")[0]
    return name, full, word


def named_candidates(user) -> tuple[tuple[str, bool], ...]:
    """A principal's name-derived candidates as (handle, weak), most
    preferred first. The id handle is not among them (see id_handle)."""
    is_agent = bool(user.is_agent)
    name, full, word = _first_word(user)
    first = word or ("agent" if is_agent else "user")
    out: list[tuple[str, bool]] = []
    if not is_agent:
        legacy = legacy_first_word_handle(user.name, user.email)
        if HANDLE_RE.fullmatch(legacy):
            out.append((legacy, True))
        out += [(word, True), (full, False)]
    else:
        if user.kind == AgentKind.SESSION and SESSION_NAME_SEP in name:
            tail = slugify(name.rsplit(SESSION_NAME_SEP, 1)[1])
            if tail:
                out.append((f"{first}-{tail}", False))
        out += [(full, False), (word, True)]
    strongest: dict[str, bool] = {}
    for handle, weak in out:
        if not handle or ID_HANDLE_RE.fullmatch(handle):
            continue  # an id handle can only be an id's
        strongest[handle] = strongest.get(handle, True) and weak
    return tuple(strongest.items())


def id_handle(user, *, long: bool = False) -> str:
    """``<first word>.<8 hex of the id>`` (all 32 with `long`)."""
    word = _first_word(user)[2] or ("agent" if user.is_agent else "user")
    h = _hex(user.id)
    return f"{word}.{h if long else h[:ID_PREFIX_LEN]}"


def candidates(user) -> tuple[str, ...]:
    """Every candidate handle of a principal, most preferred first, the
    (short) id handle last."""
    return tuple(h for h, _ in named_candidates(user)) + (id_handle(user),)


@dataclass(frozen=True)
class Mentionable:
    user_id: str
    is_agent: bool
    # Set for a project-scoped agent: it is mentioned only from that project.
    agent_project_id: str | None


class MentionDirectory:
    """The mentionable principals of one team and their handles.

    `idle_ids`: idle session identities, which claim no weak word."""

    def __init__(self, users, idle_ids=frozenset()) -> None:
        self._people: dict[str, Mentionable] = {}
        self._named: dict[str, tuple[str, ...]] = {}
        self._claims: dict[str, dict[str, bool]] = {}  # handle -> {user id: weak}
        by_hex8: dict[str, list] = {}
        for user in users:
            if user is None or user.id in self._people:
                continue
            if user.is_agent and not user.is_active:
                continue
            self._people[user.id] = Mentionable(
                user_id=user.id, is_agent=bool(user.is_agent),
                agent_project_id=user.agent_project_id if user.is_agent else None,
            )
            idle = user.id in idle_ids
            named = [(h, weak) for h, weak in named_candidates(user) if not (idle and weak)]
            self._named[user.id] = tuple(h for h, _ in named)
            for handle, weak in named:
                self._claims.setdefault(handle, {})[user.id] = weak
            by_hex8.setdefault(_hex(user.id)[:ID_PREFIX_LEN], []).append(user)
        # The id handle, and the hex it is looked up by: 8 hex digits,
        # or all 32 for principals whose first 8 are shared.
        self._id_handle: dict[str, str] = {}
        self._by_hex: dict[str, str] = {}
        for group in by_hex8.values():
            long = len(group) > 1
            for user in group:
                self._id_handle[user.id] = id_handle(user, long=long)
                self._by_hex[_hex(user.id)] = user.id
                if not long:
                    self._by_hex[_hex(user.id)[:ID_PREFIX_LEN]] = user.id

    @classmethod
    async def for_team(cls, team_id: str, *, members=None) -> "MentionDirectory":
        """Every member of the team, then its active agents (the ones
        scoped to one of its projects included). `members`: the team's
        ``TeamService.get_members`` rows, when the caller already has them."""
        from app.oxyde_models.user import OxydeUser
        from app.services.agent_service import AgentService, is_idle
        from app.services.team_service import TeamService

        if members is None:
            members = await TeamService().get_members(team_id)
        agents = await OxydeUser.objects.filter(
            is_agent=True, agent_team_id=team_id, is_active=True,
        ).order_by("created_at").all()
        last_used = await AgentService.session_last_used(agents)
        idle = frozenset(i for i, used in last_used.items() if is_idle(used))
        return cls([m.user for m in members] + list(agents), idle)

    def _claimants(self, handle: str) -> set[str]:
        """Who a token names (see the module docstring)."""
        m = ID_HANDLE_RE.fullmatch(handle)
        if m:
            user_id = self._by_hex.get(m.group(1))
            return {user_id} if user_id else set()
        claims = self._claims.get(handle, {})
        if all(claims.values()):
            people = {i for i in claims if not self._people[i].is_agent}
            if people:
                return people
        return set(claims)

    def _token_claimants(self, token: str) -> set[str]:
        """`_claimants` of a typed token. A trailing '.', '-' or '_'
        (sentence punctuation after the handle) is dropped when the token
        itself is no handle."""
        token = token.lower()
        if token not in self._claims and not ID_HANDLE_RE.fullmatch(token):
            token = token.rstrip("._-")
        return self._claimants(token)

    def handle_for(self, user_id: str) -> str | None:
        """The handle to show for `user_id`: its first candidate that names
        only it, else its id handle. None if the user is not mentionable
        in this team."""
        if user_id not in self._people:
            return None
        for handle in self._named[user_id]:
            if self._claimants(handle) == {user_id}:
                return handle
        return self._id_handle[user_id]

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
