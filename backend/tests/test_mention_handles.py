"""@mentions reach agents, session identities included (CHT-1731).

Before: mention resolution read only team_members (agents have none, they
are scoped by agent_team_id), and a handle was the first word of a name,
so every "Claude …" agent and session was `@claude`, first one wins.
"""
import uuid
from types import SimpleNamespace

import pytest

from app.enums import AgentKind, InboxEntryKind
from app.oxyde_models.inbox import OxydeInboxEntry
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.user import OxydeUser
from app.schemas.issue import IssueCommentCreate
from app.services.inbox_service import InboxService
from app.services.issue_service import IssueService
from app.services.mention_handles import (
    MentionDirectory, agent_name_handles, candidates, handle_words, named_candidates, slugify,
)
from app.utils.security import get_password_hash


def _user(name, *, is_agent=False, kind=None, email=None, is_active=True, project=None, id=None):
    return SimpleNamespace(
        id=id or str(uuid.uuid4()), name=name, email=email or f"{uuid.uuid4().hex[:6]}@example.com",
        is_agent=is_agent, kind=kind, is_active=is_active, agent_project_id=project,
    )


def _agent(name, **kw):
    return _user(name, is_agent=True, kind=kw.pop("kind", AgentKind.ASSISTANT), **kw)


def _session(name, **kw):
    return _agent(name, kind=AgentKind.SESSION, **kw)


class TestSlugAndCandidates:
    def test_slugify(self):
        assert slugify("Claude Code (Ethan's Mac)") == "claude-code-ethan-s-mac"
        assert slugify("  José  Núñez ") == "jose-nunez"
        assert slugify("🤖") == ""

    def test_person_keeps_the_first_word_handle_first(self):
        p = _user("Ada Lovelace", id="0a1b2c3d-0000-0000-0000-000000000000")
        assert candidates(p) == ("ada", "ada-lovelace", "ada.0a1b2c3d")

    def test_person_without_name_uses_email(self):
        p = _user("", email="Grace.H@example.com", id="ffffffff-0000-0000-0000-000000000000")
        assert candidates(p) == ("grace.h", "grace-h", "grace-h.ffffffff")

    def test_person_whose_first_word_is_not_typeable(self):
        p = _user("José Núñez", id="0a1b2c3d-0000-0000-0000-000000000000")
        assert candidates(p) == ("jose", "jose-nunez", "jose.0a1b2c3d")

    def test_agent_has_no_first_word_handle(self):
        a = _agent("Claude MCP", id="28b1c019-5770-425e-bc02-8898f982de3c")
        assert candidates(a) == ("claude-mcp", "claude", "claude.28b1c019")

    def test_session_gets_first_word_and_tail(self):
        s = _session("Claude Code (Ethan's Mac) · chaotic.sh · 3f9a1c", id="a3600610-0000-0000-0000-000000000000")
        assert candidates(s) == (
            "claude-3f9a1c", "claude-code-ethan-s-mac-chaotic-sh-3f9a1c", "claude", "claude.a3600610",
        )

    def test_unnameable_agent_still_has_an_id_handle(self):
        a = _agent("🤖", id="12345678-0000-0000-0000-000000000000")
        assert candidates(a) == ("agent.12345678",)
        b = _agent("🤖 Bot", id="12345678-0000-0000-0000-000000000000")
        assert candidates(b) == ("bot", "bot.12345678")

    def test_a_lone_agent_named_by_one_word_is_that_word(self):
        a = _agent("Claude")
        d = MentionDirectory([a, _user("Ada Lovelace")])
        assert d.handle_for(a.id) == "claude" and d.resolve("claude") == a.id


class TestDirectory:
    def test_every_shown_handle_resolves_to_its_owner(self):
        people = [
            _user("Ethan Smith"), _user("Ethan Jones"), _user("Claude Shannon"),
            _agent("Claude"), _agent("Claude"), _agent("Claude MCP"),
            _session("Claude Code (cloud) · 3f9a1c2b"), _session("Claude Code (cloud) · 77aa01bc"),
            _session("Claude Code (cloud) · 77aa01bc"),  # same default name twice
        ]
        d = MentionDirectory(people)
        handles = [d.handle_for(p.id) for p in people]
        assert len(set(handles)) == len(handles)
        for p, h in zip(people, handles):
            assert d.resolve(h) == p.id, h

    def test_shared_first_word_reaches_nobody(self):
        """The collision case: '@claude' names many principals, so it names
        none. It must neither pick one nor reach them all."""
        people = [_agent("Claude"), _agent("Claude MCP"), _session("Claude Code (cloud) · 3f9a1c2b")]
        d = MentionDirectory(people)
        assert d.resolve("claude") is None
        assert d.ambiguous("claude")
        assert d.resolve("claude-mcp") == people[1].id
        assert d.resolve("claude-3f9a1c2b") == people[2].id
        assert d.handle_for(people[0].id) == f"claude.{people[0].id.replace('-', '')[:8]}"

    def test_a_person_keeps_a_word_agents_only_share(self):
        """When every claim on a word is a first word, people come first:
        '@claude' still reaches Claude Shannon, as it did before agents
        could be mentioned, and '@ethan' stays Ethan's beside "Ethan Bot"."""
        person, mcp = _user("Claude Shannon"), _agent("Claude MCP")
        session = _session("Claude Code (cloud) · 3f9a1c2b")
        ethan, bot = _user("Ethan Smith"), _agent("Ethan Bot")
        d = MentionDirectory([person, mcp, session, ethan, bot])
        assert d.resolve("claude") == person.id and d.handle_for(person.id) == "claude"
        assert d.resolve("ethan") == ethan.id and d.handle_for(ethan.id) == "ethan"
        assert d.handle_for(mcp.id) == "claude-mcp"
        assert d.handle_for(bot.id) == "ethan-bot"

    def test_an_agent_named_like_a_person_takes_nothing(self):
        """An agent whose whole name is a person's word or name makes that
        token name both, so it reaches nobody; neither takes the other's."""
        ethan, bot, solo = _user("Ethan Smith"), _agent("Ethan-Smith"), _agent("Ethan")
        d = MentionDirectory([ethan, bot, solo])
        assert d.resolve("ethan") is None
        assert d.resolve("ethan-smith") is None
        for x in (ethan, bot, solo):
            assert d.resolve(d.handle_for(x.id)) == x.id

    def test_a_person_renamed_to_an_agents_handle_does_not_take_it(self):
        """CHT-1731 review finding 1: renaming yourself "claude-mcp" or
        "claude-3f9a1c" must not move that agent's mentions to you."""
        mcp, session = _agent("Claude MCP"), _session("Claude Code (cloud) · 3f9a1c")
        before = MentionDirectory([mcp, session])
        assert (before.handle_for(mcp.id), before.handle_for(session.id)) == ("claude-mcp", "claude-3f9a1c")
        thief1, thief2 = _user("claude-mcp"), _user("Claude-3f9a1c")
        d = MentionDirectory([mcp, session, thief1, thief2])
        assert d.resolve("claude-mcp") is None
        assert d.resolve("claude-3f9a1c") is None
        for x in (mcp, session, thief1, thief2):
            assert d.resolve(d.handle_for(x.id)) == x.id

    def test_no_name_can_claim_an_id_handle(self):
        """A person named "claude.28b1c019" cannot take the id handle of
        the agent 28b1c019: an id handle is looked up by its hex alone."""
        agent = _agent("Claude", id="28b1c019-5770-425e-bc02-8898f982de3c")
        other = _session("Claude Code · zz")
        thief = _user("claude.28b1c019")
        d = MentionDirectory([thief, agent, other])
        assert d.handle_for(agent.id) == "claude.28b1c019"
        assert d.resolve("claude.28b1c019") == agent.id
        assert d.resolve(d.handle_for(thief.id)) == thief.id
        assert "claude.28b1c019" not in candidates(thief)[:-1]

    def test_a_punctuated_name_takes_no_handle(self):
        """CHT-1731 re-review M1: a trailing '.' kept on a person's first
        word let "claude-mcp. X" own '@claude-mcp.' and "claude.60342e24.
        Jones" own the agent's id handle with a sentence-final period."""
        mcp = _agent("Claude MCP")
        agent = _agent("Claude", id="60342e24-0000-0000-0000-000000000000")
        thieves = [_user("claude-mcp. X"), _user("claude.60342e24. Jones"), _user("Claude_ Smith")]
        d = MentionDirectory([mcp, agent, *thieves])
        assert d.resolve("claude.60342e24.") == agent.id
        assert d.resolve("claude.60342e24") == agent.id
        assert d.resolve("claude-mcp.") is None and d.resolve("claude-mcp") is None
        for x in (mcp, agent, *thieves):
            h = d.handle_for(x.id)
            assert not h.endswith((".", "-", "_")), h
            for typed in (h, h + ".", h + "...", h + "-", h.upper() + "."):
                assert d.resolve(typed) == x.id, (x.name, typed)

    def test_id_handle_survives_a_rename_and_takes_32_hex_on_a_clash(self):
        a = _agent("Claude", id="28b1c019-0000-0000-0000-00000000000a")
        b = _agent("Claude", id="28b1c019-0000-0000-0000-00000000000b")
        d = MentionDirectory([a, b])
        assert d.handle_for(a.id) == f"claude.{a.id.replace('-', '')}"
        assert d.resolve("claude.28b1c019") is None  # names both: nobody
        assert d.resolve(f"renamed.{b.id.replace('-', '')}") == b.id

    def test_idle_sessions_keep_their_handle_but_claim_no_shared_word(self):
        """CHT-1731 review finding 4: idle sessions stay reachable by their
        own handle, but do not make '@claude' ambiguous."""
        mcp = _agent("Claude MCP")
        idle = [_session(f"Claude Code (cloud) · {i:08x}") for i in range(3)]
        d = MentionDirectory([mcp, *idle], idle_ids={s.id for s in idle})
        assert d.resolve("claude") == mcp.id
        for s_ in idle:
            assert d.resolve(d.handle_for(s_.id)) == s_.id
        live = _session("Claude Code (cloud) · ffffffff")
        d = MentionDirectory([mcp, live, *idle], idle_ids={s.id for s in idle})
        assert d.resolve("claude") is None

    def test_every_principal_resolves_by_its_own_handle(self):
        """The invariant the autocomplete, `agent list` and `team members`
        promise: resolve(handle_for(x)) == x for every principal, here in a
        team built to collide every way we know of."""
        mcp = _agent("Claude MCP", id="28b1c019-5770-425e-bc02-8898f982de3c")
        sessions = [_session(f"Claude Code (cloud) · {t}") for t in ("3f9a1c2b", "77aa01bc", "77aa01bc")]
        idle = [_session("Claude Code (cloud) · 0000aaaa"), _session("Claude Code (cloud) · 3f9a1c2b")]
        people = [
            _user("Ethan Smith"), _user("Ethan Jones"), _user("Claude Shannon"),
            _user("claude-mcp"), _user("claude.28b1c019"), _user("Claude-3f9a1c2b"),
            _user("José Núñez"), _user("O'Brien"), _user("", email="test.user@example.com"),
            _user("🤖"), _user("Ethan"), _user("ada.deadbeef"),
            # Punctuated claimants (CHT-1731 re-review M1).
            _user("claude-mcp. X"), _user("claude.28b1c019. Jones"), _user("ethan. Q"), _user("Bob_ Ross"),
        ]
        agents = [
            mcp, _agent("Claude"), _agent("Claude"), _agent("Ethan"), _agent("Ethan-Smith"),
            _agent("🤖"), _agent("Ada", id="deadbeef-0000-0000-0000-000000000001"),
            _agent("Twin", id="0badc0de-0000-0000-0000-000000000001"),
            _agent("Twin", id="0badc0de-0000-0000-0000-000000000002"),
            _agent("Scoped", project="p1"),
            # Tail handles that are a person's or an agent's (CHT-1741;
            # registration refuses the first, the directory must cope anyway).
            _session("Ethan Bot · smith"), _session("Claude Bot · mcp"),
        ]
        everyone = people + agents + sessions + idle
        d = MentionDirectory(everyone, idle_ids={s.id for s in idle})
        handles = {}
        for x in everyone:
            h = d.handle_for(x.id)
            assert d.resolve(h) == x.id, (x.name, h)
            assert d.resolve(h.upper()) == x.id
            assert d.resolve(h + ".") == x.id, (x.name, h)
            assert d.resolve(h + "..") == x.id, (x.name, h)
            handles[x.id] = h
        assert len(set(handles.values())) == len(everyone)
        # What an ambiguous-mention warning suggests (CHT-1735): every
        # candidate's handle reaches exactly that candidate.
        for x in everyone:
            for token in candidates(x):
                for i in d.claimants(token):
                    assert d.resolve(d.handle_for(i)) == i, (x.name, token)

    def test_a_person_named_by_one_word_keeps_it_beside_agents_sharing_it(self):
        """CHT-1744: a person named "Claude" claims `claude` as a first
        word, as Claude Shannon does, so "Claude Code" (whose first word
        it also is) no longer makes '@claude' reach nobody."""
        person, code = _user("Claude"), _agent("Claude Code")
        session = _session("Claude Code (cloud) · 3f9a1c2b")
        d = MentionDirectory([person, code, session])
        assert d.resolve("claude") == person.id and not d.ambiguous("claude")
        assert d.handle_for(person.id) == "claude"
        assert d.handle_for(code.id) == "claude-code"
        assert d.handle_for(session.id) == "claude-3f9a1c2b"
        # Two people still share it: nobody, as with any shared word.
        d = MentionDirectory([person, code, _user("Claude Shannon")])
        assert d.resolve("claude") is None

    def test_a_person_and_an_agent_both_named_by_the_word_reach_nobody_by_it(self):
        """CHT-1744: an agent named exactly "Claude" claims `claude` as its
        whole name, which stays strong, so beside a person "Claude" the
        token names both and reaches nobody; each falls back to its id
        handle. Naming refuses that agent while the person is a member
        (TestNamingAgreesWithResolution); this is the order naming cannot
        see, a person who joins or renames after the agent."""
        person, agent = _user("Claude"), _agent("Claude")
        d = MentionDirectory([person, agent])
        assert d.resolve("claude") is None and d.ambiguous("claude")
        assert d.claimants("claude") == {person.id, agent.id}
        for x in (person, agent):
            h = d.handle_for(x.id)
            assert h == f"claude.{x.id.replace('-', '')[:8]}"
            assert d.resolve(h) == x.id

    def test_hostile_people_take_no_agents_strong_handle(self):
        """CHT-1744 property, with people built to collide: one-word people
        named after every handle the agents have (whole name, first word,
        session tail, id handle, shown handle; upper-cased and with a
        trailing '.'). No agent's shown strong handle comes to name a
        person alone, every id handle stays its owner's, and
        resolve(handle_for(x)) == x holds for everyone."""
        agents = [
            _agent("Claude MCP", id="28b1c019-5770-425e-bc02-8898f982de3c"), _agent("Claude Code"),
            _agent("Claude"), _agent("Ethan"), _agent("Ethan Bot"), _agent("Ada"),
            _session("Claude Code (cloud) · 3f9a1c2b"), _session("Ethan Bot · smith"),
        ]
        alone = MentionDirectory(agents)
        shown = {a.id: alone.handle_for(a.id) for a in agents}
        names = set()
        for a in agents:
            names.update(candidates(a))
            names.add(shown[a.id])
        names |= {f"{n}." for n in names} | {n.upper() for n in names}
        people = [_user(n) for n in sorted(names)] + [_user("Claude Shannon"), _user("Ethan Smith")]
        d = MentionDirectory(agents + people)
        person_ids = {p.id for p in people}
        checked = 0
        for a in agents:
            strong = {h for h, weak in named_candidates(a) if not weak}
            if shown[a.id] in strong:
                checked += 1
                assert a.id in d.claimants(shown[a.id]), (a.name, shown[a.id])
                assert d.resolve(shown[a.id]) not in person_ids, (a.name, shown[a.id])
            assert d.resolve(f"x.{a.id.replace('-', '')[:8]}") == a.id
        # "Claude" and "Ethan" share their whole name with another agent's
        # first word, so they show an id handle even alone; the other six
        # show a strong one.
        assert checked == 6
        everyone = agents + people
        for x in everyone:
            h = d.handle_for(x.id)
            assert d.resolve(h) == x.id, (x.name, h)
            assert d.resolve(h.upper() + ".") == x.id, (x.name, h)
        assert len({d.handle_for(x.id) for x in everyone}) == len(everyone)

    def test_two_people_sharing_a_word_reach_nobody_by_it(self):
        a, b = _user("Ethan Smith"), _user("Ethan Jones")
        d = MentionDirectory([a, b])
        assert d.resolve("ethan") is None and d.ambiguous("ethan")
        assert (d.handle_for(a.id), d.handle_for(b.id)) == ("ethan-smith", "ethan-jones")

    def test_unique_first_word_still_works_for_people(self):
        ada = _user("Ada Lovelace")
        d = MentionDirectory([ada, _agent("Claude")])
        assert d.handle_for(ada.id) == "ada"
        assert d.resolve("ADA") == ada.id

    def test_trailing_punctuation_is_ignored(self):
        mcp = _agent("Claude MCP")
        d = MentionDirectory([mcp])
        assert d.resolve("claude-mcp.") == mcp.id
        id_handle = d.handle_for(mcp.id)
        assert d.resolve(f"claude.{mcp.id.replace('-', '')[:8]}.") == mcp.id
        assert id_handle == "claude-mcp"

    def test_deactivated_agent_is_not_mentionable_and_frees_its_name(self):
        gone, live = _agent("Claude MCP", is_active=False), _agent("Claude MCP")
        d = MentionDirectory([gone, live])
        assert d.handle_for(gone.id) is None
        assert d.resolve("claude-mcp") == live.id

    def test_project_agent_is_reached_only_from_its_project(self):
        scoped = _agent("Builder", project="p1")
        d = MentionDirectory([scoped])
        assert d.can_reach(scoped.id, "p1")
        assert not d.can_reach(scoped.id, "p2")
        assert not d.can_reach(scoped.id, None)


class TestNamingAgreesWithResolution:
    """CHT-1744: naming (registration rule 8, `member_named`) refuses an
    agent exactly when one of the strong handles it would claim is one of
    a person's handles, weak or strong. Making a person's one-word name a
    weak claim changes resolution only, so the two still agree: an agent
    naming may refuse makes the shared token ambiguous, and one it allows
    leaves the person's word theirs."""

    def test_handles_of_a_person_named_by_one_word(self):
        person = _user("Claude")
        assert named_candidates(person) == (("claude", True),)
        assert handle_words(person) == {"claude"}
        assert agent_name_handles("Claude") & handle_words(person)  # refused
        assert not agent_name_handles("Claude Code") & handle_words(person)  # allowed

    @pytest.mark.parametrize("agent_name", ["Claude", "claude", "Claude Code", "Claude MCP", "Claude · x · 3f9a1c"])
    def test_refused_exactly_when_resolution_would_be_ambiguous(self, agent_name):
        person = _user("Claude")
        refused = bool(agent_name_handles(agent_name) & handle_words(person))
        agent = _agent(agent_name, kind=AgentKind.SESSION)
        d = MentionDirectory([person, agent])
        assert d.resolve("claude") == (None if refused else person.id)
        assert refused == (agent_name.lower() == "claude")

    async def test_member_named_refuses_the_word_and_allows_the_longer_name(self, db, test_team):
        from app.enums import TeamRole
        from app.oxyde_models.team import OxydeTeamMember
        from app.services.registration_service import member_named

        claude = await OxydeUser.objects.create(
            email="claude@example.com", hashed_password=get_password_hash("pw-12345678"), name="Claude",
        )
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=claude.id, role=TeamRole.MEMBER)
        assert await member_named(test_team.id, "Claude")
        assert not await member_named(test_team.id, "Claude Code")
        code = await _team_agent(test_team.id, "Claude Code")
        d = await MentionDirectory.for_team(test_team.id)
        assert d.resolve("claude") == claude.id and d.handle_for(claude.id) == "claude"
        assert d.resolve(d.handle_for(code.id)) == code.id


# ---------------------------------------------------------------------------
# Through the inbox
# ---------------------------------------------------------------------------

async def _team_agent(team_id, name, *, kind=AgentKind.ASSISTANT, project_id=None, parent=None):
    """An agent the way prod has them: agent_team_id, no team_members row."""
    return await OxydeUser.objects.create(
        email=f"agent-{uuid.uuid4().hex}@agents.local", hashed_password=get_password_hash("pw-12345678"),
        name=name, is_agent=True, kind=kind, agent_team_id=team_id, agent_project_id=project_id,
        parent_user_id=parent.id if parent else None,
    )


async def _mentions_of(user_id):
    return await OxydeInboxEntry.objects.filter(
        recipient_user_id=user_id, kind=InboxEntryKind.MENTION.name,
    ).all()


@pytest.mark.asyncio
class TestNotifyMentionsReachesAgents:
    async def test_agent_without_a_team_members_row_is_mentioned(self, db, test_team, test_issue, test_user):
        mcp = await _team_agent(test_team.id, "Claude MCP", parent=test_user)
        await IssueService().create_comment(
            test_issue.id, IssueCommentCreate(content="@claude-mcp please look"), author_id=test_user.id,
        )
        entries = await _mentions_of(mcp.id)
        assert len(entries) == 1 and entries[0].issue_id == test_issue.id

    async def test_collision_reaches_nobody_and_the_handle_reaches_one(
        self, db, test_team, test_issue, test_user,
    ):
        mcp = await _team_agent(test_team.id, "Claude MCP", parent=test_user)
        sessions = [
            await _team_agent(test_team.id, f"Claude Code (cloud) · {tail}", kind=AgentKind.SESSION, parent=test_user)
            for tail in ("aaaa1111", "bbbb2222", "cccc3333")
        ]
        await InboxService().notify_mentions(
            content="@claude anyone?", team_id=test_team.id, author=test_user, issue=test_issue,
        )
        assert await OxydeInboxEntry.objects.count() == 0

        d = await MentionDirectory.for_team(test_team.id)
        target = sessions[1]
        handle = d.handle_for(target.id)
        assert handle == "claude-bbbb2222"
        await InboxService().notify_mentions(
            content=f"@{handle} over to you", team_id=test_team.id, author=sessions[0], issue=test_issue,
        )
        entries = await OxydeInboxEntry.objects.all()
        assert [(e.recipient_user_id, e.source_user_id) for e in entries] == [(target.id, sessions[0].id)]
        assert await _mentions_of(mcp.id) == []

    async def test_project_agent_only_from_its_own_project(self, db, test_team, test_project, test_issue, test_user):
        other = await OxydeProject.objects.create(team_id=test_team.id, name="Other", key="OTH")
        here = await _team_agent(test_team.id, "Here Bot", project_id=test_project.id, parent=test_user)
        there = await _team_agent(test_team.id, "There Bot", project_id=other.id, parent=test_user)
        await InboxService().notify_mentions(
            content="@here-bot @there-bot", team_id=test_team.id, author=test_user, issue=test_issue,
        )
        assert len(await _mentions_of(here.id)) == 1
        assert await _mentions_of(there.id) == []

    async def test_one_comment_notifies_at_most_the_cap(
        self, db, test_team, test_issue, test_user, monkeypatch, caplog,
    ):
        import app.services.inbox_service as inbox_module

        monkeypatch.setattr(inbox_module, "MAX_MENTION_RECIPIENTS", 3)
        bots = [await _team_agent(test_team.id, f"Bot {i}", parent=test_user) for i in range(5)]
        content = " ".join(f"@bot-{i}" for i in range(5)) + " @bot-0"
        with caplog.at_level("WARNING", logger="app.services.inbox_service"):
            await InboxService().notify_mentions(
                content=content, team_id=test_team.id, author=test_user, issue=test_issue,
            )
        recipients = {e.recipient_user_id for e in await OxydeInboxEntry.objects.all()}
        assert recipients == {b.id for b in bots[:3]}
        assert "notifying the first 3" in caplog.text

    async def test_idle_sessions_do_not_make_a_shared_word_ambiguous(
        self, db, test_team, test_issue, test_user,
    ):
        from datetime import datetime, timedelta, timezone

        mcp = await _team_agent(test_team.id, "Claude MCP", parent=test_user)
        old = await _team_agent(test_team.id, "Claude Code (cloud) · 0ld0ld00", kind=AgentKind.SESSION, parent=test_user)
        old.created_at = datetime.now(timezone.utc) - timedelta(days=30)
        await old.save(update_fields={"created_at"})  # no key: idle since created_at

        await InboxService().notify_mentions(
            content="@claude and @claude-0ld0ld00", team_id=test_team.id, author=test_user, issue=test_issue,
        )
        assert len(await _mentions_of(mcp.id)) == 1
        assert len(await _mentions_of(old.id)) == 1

    async def test_the_cap_is_25(self):
        import app.services.inbox_service as inbox_module

        assert inbox_module.MAX_MENTION_RECIPIENTS == 25

    async def test_deactivated_agent_is_not_mentioned(self, db, test_team, test_issue, test_user):
        mcp = await _team_agent(test_team.id, "Claude MCP", parent=test_user)
        mcp.is_active = False
        await mcp.save(update_fields={"is_active"})
        await InboxService().notify_mentions(
            content="@claude-mcp", team_id=test_team.id, author=test_user, issue=test_issue,
        )
        assert await OxydeInboxEntry.objects.count() == 0

    async def test_agent_of_another_team_is_not_mentioned(self, db, test_team, test_issue, test_user):
        from app.oxyde_models.team import OxydeTeam

        elsewhere = await OxydeTeam.objects.create(name="Elsewhere", key="ELS")
        await _team_agent(elsewhere.id, "Claude MCP", parent=test_user)
        await InboxService().notify_mentions(
            content="@claude-mcp", team_id=test_team.id, author=test_user, issue=test_issue,
        )
        assert await OxydeInboxEntry.objects.count() == 0


# ---------------------------------------------------------------------------
# End to end: session A mentions session B (the CHT-1502 step-1 check)
# ---------------------------------------------------------------------------

def _bearer(key):
    return {"Authorization": f"Bearer {key}"}


@pytest.mark.asyncio
class TestSessionToSession:
    async def test_session_b_receives_a_mention_written_by_session_a(
        self, client, auth_headers, test_team, test_issue, test_user,
    ):
        created = await client.post(
            f"/api/teams/{test_team.id}/agents", json={"name": "Claude Code (cloud)", "can_register": True},
            headers=auth_headers,
        )
        assert created.status_code == 201, created.text
        registrar_id, registrar_key = created.json()["id"], created.json()["api_key"]
        mcp = await _team_agent(test_team.id, "Claude MCP", parent=test_user)

        async def register(ref):
            r = await client.post("/api/agents/register", json={"external_ref": ref}, headers=_bearer(registrar_key))
            assert r.status_code == 201, r.text
            return r.json()

        a = await register("claude-code:session:2b1f0000-aaaa-bbbb-cccc-00000000000a")
        b = await register("claude-code:session:2b1f0000-aaaa-bbbb-cccc-00000000000b")
        # The default names share everything but the tail, and their
        # registration response tells each session its handle.
        assert a["agent"]["mention_handle"] == "claude-0000000a"
        assert b["agent"]["mention_handle"] == "claude-0000000b"

        # Everyone in the team sees the same handles (agent list, team members).
        listed = (await client.get(f"/api/teams/{test_team.id}/agents", headers=auth_headers)).json()
        by_id = {row["id"]: row["mention_handle"] for row in listed}
        assert by_id[b["agent"]["id"]] == "claude-0000000b"
        assert by_id[mcp.id] == "claude-mcp"
        assert by_id[registrar_id] == "claude-code-cloud"
        one = (await client.get(f"/api/agents/{b['agent']['id']}", headers=auth_headers)).json()
        assert one["mention_handle"] == "claude-0000000b"
        members = (await client.get(f"/api/teams/{test_team.id}/members", headers=auth_headers)).json()
        assert [m["mention_handle"] for m in members] == ["test"]

        comment = await client.post(
            f"/api/issues/{test_issue.id}/comments",
            json={"content": "@claude-0000000b can you take this? (@claude alone is ambiguous)"},
            headers=_bearer(a["api_key"]),
        )
        assert comment.status_code == 201, comment.text

        inbox_b = (await client.get("/api/inbox", headers=_bearer(b["api_key"]))).json()
        assert len(inbox_b) == 1
        assert inbox_b[0]["kind"] == "mention" and inbox_b[0]["issue_id"] == test_issue.id
        assert inbox_b[0]["source_user_id"] == a["agent"]["id"]
        synced = (await client.get("/api/inbox/sync", headers=_bearer(b["api_key"]))).json()
        assert [e["id"] for e in synced["entries"]] == [inbox_b[0]["id"]]

        # Exactly one MENTION entry in all: not A, not the registrar, not
        # Claude MCP, not the human.
        everyone = await OxydeInboxEntry.objects.filter(kind=InboxEntryKind.MENTION.name).all()
        assert [e.recipient_user_id for e in everyone] == [b["agent"]["id"]]


# ---------------------------------------------------------------------------
# Warnings for the author (CHT-1735)
# ---------------------------------------------------------------------------

async def _notify(team, author, issue, content):
    return await InboxService().notify_mentions(content=content, team_id=team.id, author=author, issue=issue)


@pytest.mark.asyncio
class TestMentionWarnings:
    async def test_unknown_and_ambiguous_handles_warn_and_resolved_ones_do_not(
        self, db, test_team, test_project, test_issue, test_user,
    ):
        other = await OxydeProject.objects.create(team_id=test_team.id, name="Other", key="OTH")
        await _team_agent(test_team.id, "Claude MCP", parent=test_user)
        for tail in ("bbbb2222", "aaaa1111"):
            await _team_agent(test_team.id, f"Claude Code (cloud) · {tail}", kind=AgentKind.SESSION, parent=test_user)
        # Claims the word too, but the author cannot mention it from here.
        await _team_agent(test_team.id, "Claude Scoped", project_id=other.id, parent=test_user)

        warnings = await _notify(
            test_team, test_user, test_issue,
            "@claude-mcp, @claude and @nobody. Mail foo@bar.com, @Nobody again, "
            "me @test, and `@ghost` in code.",
        )
        assert warnings == [
            "@claude is ambiguous; nobody was notified. "
            "Use one of: @claude-aaaa1111, @claude-bbbb2222, @claude-mcp.",
            "@nobody matches nobody who can be mentioned here; nobody was notified.",
        ]

    async def test_nothing_to_warn_about(self, db, test_team, test_issue, test_user):
        assert await _notify(test_team, test_user, test_issue, "no mentions, a@b.c") == []
        assert await _notify(test_team, test_user, test_issue, "@test @. hi") == []

    async def test_principals_the_author_cannot_mention_are_not_revealed(
        self, db, test_team, test_issue, test_user,
    ):
        from app.oxyde_models.team import OxydeTeam

        other = await OxydeProject.objects.create(team_id=test_team.id, name="Other", key="OTH")
        await _team_agent(test_team.id, "There Bot", project_id=other.id, parent=test_user)
        await _team_agent(test_team.id, "Twin Bot", project_id=other.id, parent=test_user)
        await _team_agent(test_team.id, "Twin Bot", project_id=other.id, parent=test_user)
        elsewhere = await OxydeTeam.objects.create(name="Elsewhere", key="ELS")
        await _team_agent(elsewhere.id, "Far Bot", parent=test_user)

        warnings = await _notify(test_team, test_user, test_issue, "@there-bot @twin-bot @far-bot")
        assert warnings == [
            f"@{h} matches nobody who can be mentioned here; nobody was notified."
            for h in ("there-bot", "twin-bot", "far-bot")
        ]

    async def test_warnings_and_candidates_are_capped(
        self, db, test_team, test_issue, test_user, monkeypatch,
    ):
        import app.services.inbox_service as inbox_module

        monkeypatch.setattr(inbox_module, "MAX_MENTION_WARNINGS", 2)
        monkeypatch.setattr(inbox_module, "MAX_MENTION_CANDIDATES", 2)
        monkeypatch.setattr(inbox_module, "MAX_MENTION_RECIPIENTS", 1)
        for i in range(3):
            await _team_agent(test_team.id, f"Claude {i}", parent=test_user)
        await _team_agent(test_team.id, "Bot A", parent=test_user)
        await _team_agent(test_team.id, "Bot B", parent=test_user)

        warnings = await _notify(test_team, test_user, test_issue, "@claude @x @y @z @bot-a @bot-b")
        assert warnings == [
            "@claude is ambiguous; nobody was notified. Use one of: @claude-0, @claude-1 (and 1 more).",
            "@x matches nobody who can be mentioned here; nobody was notified.",
            "2 more @handles reached nobody.",
            "This comment mentions 2 members; only the first 1 were notified.",
        ]

    async def test_rest_comment_carries_warnings_and_the_broadcast_does_not(
        self, client, auth_headers, test_team, test_issue, test_document, test_user, monkeypatch,
    ):
        import app.api.documents as documents_api
        import app.api.issues as issues_api

        broadcast = []

        async def capture(team_id, action, payload):
            broadcast.append(payload)

        monkeypatch.setattr(issues_api, "broadcast_comment_event", capture)
        monkeypatch.setattr(documents_api, "broadcast_comment_event", capture)
        for _ in range(2):
            await _team_agent(test_team.id, "Claude Bot", parent=test_user)

        r = await client.post(
            f"/api/issues/{test_issue.id}/comments", json={"content": "@nobody and @claude-bot"}, headers=auth_headers,
        )
        assert r.status_code == 201, r.text
        warnings = r.json()["warnings"]
        assert warnings[0].startswith("@nobody matches nobody")
        assert warnings[1].startswith("@claude-bot is ambiguous") and "@claude." in warnings[1]

        r = await client.post(
            f"/api/documents/{test_document.id}/comments", json={"content": "cc @nobody"}, headers=auth_headers,
        )
        assert r.status_code == 201, r.text
        assert r.json()["warnings"] == ["@nobody matches nobody who can be mentioned here; nobody was notified."]

        r = await client.post(
            f"/api/issues/{test_issue.id}/comments", json={"content": "plain"}, headers=auth_headers,
        )
        assert r.json()["warnings"] == []
        assert len(broadcast) == 3 and all("warnings" not in p for p in broadcast)

    async def test_a_failed_fan_out_still_saves_the_comment(
        self, db, test_issue, test_user, monkeypatch,
    ):
        async def boom(self, **kw):
            raise RuntimeError("inbox down")

        monkeypatch.setattr(InboxService, "notify_mentions", boom)
        warnings: list[str] = []
        comment = await IssueService().create_comment(
            test_issue.id, IssueCommentCreate(content="@nobody"), author_id=test_user.id, warnings=warnings,
        )
        assert comment.content == "@nobody" and warnings == []
