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
from app.services.mention_handles import MentionDirectory, candidates, slugify
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

    def test_person_and_agent_sharing_a_word_both_need_a_longer_handle(self):
        person, agent = _user("Claude Shannon"), _agent("Claude")
        d = MentionDirectory([person, agent])
        assert d.resolve("claude") is None
        assert d.handle_for(person.id) == "claude-shannon"
        assert d.handle_for(agent.id).startswith("claude.")

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
