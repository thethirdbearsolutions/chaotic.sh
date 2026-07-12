"""Tests for the Inbox feature (CHT-1250): InboxService, its hooks into
IssueService/RitualService/DocumentService, and the /inbox API routes.
"""
import pytest

from app.enums import ApprovalMode, InboxEntryKind, IssueStatus, TeamRole
from app.oxyde_models.inbox import OxydeInboxEntry
from app.oxyde_models.team import OxydeTeamMember
from app.schemas.document import DocumentCommentCreate
from app.schemas.issue import IssueCommentCreate, IssueUpdate
from app.services.document_service import DocumentService
from app.services.inbox_service import InboxService, _member_handle, _strip_code_spans, _MENTION_RE
from app.services.issue_service import ClaimRitualsError, IssueService, TicketRitualsError
from app.services.ritual_service import RitualService


async def _try_claim(issue, user_id: str):
    return await IssueService().update(
        issue, IssueUpdate(status=IssueStatus.IN_PROGRESS),
        user_id=user_id, is_human_request=False,
    )


async def _try_close(issue, user_id: str):
    return await IssueService().update(
        issue, IssueUpdate(status=IssueStatus.DONE),
        user_id=user_id, is_human_request=False,
    )


async def _add_distinct_member(team_id: str, first_name: str):
    """Add a team member whose first-name handle can't collide with
    test_user/test_user2's shared "Test" first name (mention resolution
    is first-name-based -- see _member_handle -- so fixture reuse across
    these mention tests needs a name that won't shadow another member's
    handle via the by_handle dict's setdefault).
    """
    from app.oxyde_models.user import OxydeUser
    from app.utils.security import get_password_hash

    user = await OxydeUser.objects.create(
        email=f"{first_name.lower()}@example.com",
        hashed_password=get_password_hash("testpassword123"),
        name=f"{first_name} Mentioned",
    )
    await OxydeTeamMember.objects.create(team_id=team_id, user_id=user.id, role=TeamRole.MEMBER)
    return user


# ---------------------------------------------------------------------------
# _member_handle -- mirrors frontend/src/mention-autocomplete.js exactly
# ---------------------------------------------------------------------------

class TestMemberHandle:
    def test_uses_first_name_lowercased(self):
        assert _member_handle("Ada Lovelace", "ada@example.com") == "ada"

    def test_falls_back_to_email_local_part_when_no_name(self):
        assert _member_handle(None, "grace@example.com") == "grace"

    def test_falls_back_to_user_when_nothing(self):
        assert _member_handle(None, None) == "user"

    def test_lowercases_email_local_part(self):
        assert _member_handle(None, "Grace@Example.com") == "grace"


# ---------------------------------------------------------------------------
# InboxService.notify_gate_pending
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
class TestNotifyGatePending:
    async def test_fans_out_to_admins_only(
        self, db, test_project, test_team, test_user, test_user2, test_issue, gate_close_ritual,
    ):
        """test_user is OWNER (test_team fixture); test_user2 is a plain
        MEMBER -- only admins/owners get gate_pending entries, mirroring
        RitualService's is_team_admin gate on completion.
        """
        await OxydeTeamMember.objects.create(
            team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER,
        )

        await InboxService().notify_gate_pending(
            ritual=gate_close_ritual, issue=test_issue, project=test_project,
            requested_by_name="Someone",
        )

        entries = await OxydeInboxEntry.objects.filter(issue_id=test_issue.id).all()
        assert len(entries) == 1
        assert entries[0].recipient_user_id == test_user.id
        assert entries[0].kind == InboxEntryKind.GATE_PENDING
        assert entries[0].ritual_id == gate_close_ritual.id
        assert entries[0].team_id == test_team.id
        assert entries[0].read_at is None

    async def test_dedupes_repeated_notify_for_same_open_entry(
        self, db, test_project, test_issue, gate_close_ritual,
    ):
        service = InboxService()
        await service.notify_gate_pending(
            ritual=gate_close_ritual, issue=test_issue, project=test_project,
            requested_by_name="A",
        )
        await service.notify_gate_pending(
            ritual=gate_close_ritual, issue=test_issue, project=test_project,
            requested_by_name="A",
        )
        entries = await OxydeInboxEntry.objects.filter(issue_id=test_issue.id).all()
        assert len(entries) == 1

    async def test_new_entry_after_prior_one_marked_read(
        self, db, test_project, test_issue, gate_close_ritual,
    ):
        """Dedup only suppresses while an entry is unread -- once resolved,
        the same (ritual, issue) can gate again (e.g. reopened + reclaimed).
        """
        service = InboxService()
        await service.notify_gate_pending(
            ritual=gate_close_ritual, issue=test_issue, project=test_project,
            requested_by_name="A",
        )
        await service.resolve_gate_or_review(ritual_id=gate_close_ritual.id, issue_id=test_issue.id)
        await service.notify_gate_pending(
            ritual=gate_close_ritual, issue=test_issue, project=test_project,
            requested_by_name="A",
        )
        entries = await OxydeInboxEntry.objects.filter(issue_id=test_issue.id).all()
        assert len(entries) == 2


# ---------------------------------------------------------------------------
# Gate-pending email carries the issue deep link (PR #218 review finding 1)
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
class TestGatePendingEmailLink:
    async def test_gate_pending_email_includes_issue_deep_link(
        self, db, test_project, test_issue, gate_close_ritual, monkeypatch,
    ):
        """The email's entire job is the clickthrough: with app_base_url
        configured, the gate-pending body must contain the frontend's
        canonical /issue/<identifier> deep link.
        """
        from unittest.mock import patch as mock_patch

        from app.config import get_settings
        from app.services.email_service import EmailService

        monkeypatch.setenv("APP_BASE_URL", "https://chaotic.example.com")
        get_settings.cache_clear()

        sent = {}

        async def fake_send(self, to, subject, body):
            sent.update(to=to, subject=subject, body=body)
            return True

        # Capture the fire-and-forget coroutine and await it directly so
        # the assertion is deterministic (no event-loop-turn roulette).
        captured = []
        with mock_patch.object(EmailService, "send", fake_send), \
             mock_patch("app.services.inbox_service.fire_and_forget", side_effect=captured.append):
            await InboxService().notify_gate_pending(
                ritual=gate_close_ritual, issue=test_issue, project=test_project,
                requested_by_name="Agent A",
            )
            assert len(captured) == 1
            await captured[0]

        assert sent["to"] == "test@example.com"  # the owner (test_user fixture)
        assert f"https://chaotic.example.com/issue/{test_issue.identifier}" in sent["body"]

        get_settings.cache_clear()  # don't leak APP_BASE_URL into later tests


# ---------------------------------------------------------------------------
# InboxService.notify_review_requested
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
class TestNotifyReviewRequested:
    async def test_fans_out_to_admins(
        self, db, test_project, test_team, test_user, test_issue, review_close_ritual,
    ):
        await InboxService().notify_review_requested(
            ritual=review_close_ritual, issue=test_issue, project=test_project,
            attested_by_name="An Agent",
        )
        entries = await OxydeInboxEntry.objects.filter(issue_id=test_issue.id).all()
        assert len(entries) == 1
        assert entries[0].recipient_user_id == test_user.id
        assert entries[0].kind == InboxEntryKind.REVIEW_REQUESTED


# ---------------------------------------------------------------------------
# InboxService.notify_assignment
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
class TestNotifyAssignment:
    async def test_creates_entry_for_new_assignee(
        self, db, test_project, test_issue, test_user, test_user2,
    ):
        await InboxService().notify_assignment(
            issue=test_issue, project=test_project,
            assignee_id=test_user2.id, assigned_by=test_user,
        )
        entries = await OxydeInboxEntry.objects.filter(recipient_user_id=test_user2.id).all()
        assert len(entries) == 1
        assert entries[0].kind == InboxEntryKind.ASSIGNMENT
        assert entries[0].issue_id == test_issue.id
        assert entries[0].source_user_id == test_user.id

    async def test_skips_self_assignment(self, db, test_project, test_issue, test_user):
        await InboxService().notify_assignment(
            issue=test_issue, project=test_project,
            assignee_id=test_user.id, assigned_by=test_user,
        )
        entries = await OxydeInboxEntry.objects.filter(recipient_user_id=test_user.id).all()
        assert len(entries) == 0

    async def test_no_assigned_by_still_notifies(self, db, test_project, test_issue, test_user2):
        """assigned_by=None (e.g. system-driven reassignment) still notifies
        -- only a matching self-assignment id is skipped.
        """
        await InboxService().notify_assignment(
            issue=test_issue, project=test_project,
            assignee_id=test_user2.id, assigned_by=None,
        )
        entries = await OxydeInboxEntry.objects.filter(recipient_user_id=test_user2.id).all()
        assert len(entries) == 1
        assert entries[0].source_user_id is None


# ---------------------------------------------------------------------------
# InboxService.notify_mentions
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
class TestNotifyMentions:
    async def test_mentions_by_first_name_handle(
        self, db, test_team, test_project, test_issue, test_user,
    ):
        mentioned = await _add_distinct_member(test_team.id, "Zara")
        handle = _member_handle(mentioned.name, mentioned.email)

        await InboxService().notify_mentions(
            content=f"hey @{handle} can you take a look?",
            team_id=test_team.id, author=test_user, issue=test_issue,
        )

        entries = await OxydeInboxEntry.objects.filter(recipient_user_id=mentioned.id).all()
        assert len(entries) == 1
        assert entries[0].kind == InboxEntryKind.MENTION
        assert entries[0].source_user_id == test_user.id
        assert entries[0].issue_id == test_issue.id

    async def test_no_mention_no_entries(self, db, test_team, test_issue, test_user):
        await InboxService().notify_mentions(
            content="no mentions here", team_id=test_team.id, author=test_user, issue=test_issue,
        )
        assert await OxydeInboxEntry.objects.count() == 0

    async def test_unresolvable_handle_no_entries(self, db, test_team, test_issue, test_user):
        await InboxService().notify_mentions(
            content="hey @nobody-like-this", team_id=test_team.id, author=test_user, issue=test_issue,
        )
        assert await OxydeInboxEntry.objects.count() == 0

    async def test_self_mention_is_skipped(self, db, test_team, test_issue, test_user):
        handle = _member_handle(test_user.name, test_user.email)
        await InboxService().notify_mentions(
            content=f"note to self @{handle}", team_id=test_team.id, author=test_user, issue=test_issue,
        )
        assert await OxydeInboxEntry.objects.count() == 0

    async def test_document_mention(self, db, test_team, test_document, test_user):
        mentioned = await _add_distinct_member(test_team.id, "Zara")
        handle = _member_handle(mentioned.name, mentioned.email)
        await InboxService().notify_mentions(
            content=f"@{handle} thoughts?", team_id=test_team.id, author=test_user, document=test_document,
        )
        entries = await OxydeInboxEntry.objects.filter(recipient_user_id=mentioned.id).all()
        assert len(entries) == 1
        assert entries[0].document_id == test_document.id
        assert entries[0].issue_id is None

    async def test_handle_inside_fenced_code_block_is_not_mentioned(
        self, db, test_team, test_issue, test_user,
    ):
        """CHT-1272: a literal @handle pasted as example code inside a ```
        fence must not page anyone -- mirrors the frontend, which only
        highlights/links mentions in rendered markdown text nodes (never
        inside <pre>/<code>).
        """
        mentioned = await _add_distinct_member(test_team.id, "Zara")
        handle = _member_handle(mentioned.name, mentioned.email)

        await InboxService().notify_mentions(
            content=f"see this snippet:\n```\n@{handle} do the thing\n```\nno real mention here",
            team_id=test_team.id, author=test_user, issue=test_issue,
        )

        assert await OxydeInboxEntry.objects.count() == 0

    async def test_handle_outside_fence_still_mentioned_alongside_one_inside(
        self, db, test_team, test_issue, test_user,
    ):
        """A real @handle outside the fence still notifies even when the
        same content also has one fenced inside -- the fence strip must not
        eat legitimate mentions elsewhere in the comment.
        """
        mentioned = await _add_distinct_member(test_team.id, "Zara")
        handle = _member_handle(mentioned.name, mentioned.email)

        await InboxService().notify_mentions(
            content=f"@{handle} check this:\n```\n@{handle} example\n```\nthanks",
            team_id=test_team.id, author=test_user, issue=test_issue,
        )

        entries = await OxydeInboxEntry.objects.filter(recipient_user_id=mentioned.id).all()
        assert len(entries) == 1

    async def test_handle_inside_inline_code_span_is_not_mentioned(
        self, db, test_team, test_issue, test_user,
    ):
        """Same treatment for a single-backtick inline code span (the
        frontend's addIssueLinksAndMentions skips <code> the same way it
        skips <pre>)."""
        mentioned = await _add_distinct_member(test_team.id, "Zara")
        handle = _member_handle(mentioned.name, mentioned.email)

        await InboxService().notify_mentions(
            content=f"run `@{handle}` as a literal example",
            team_id=test_team.id, author=test_user, issue=test_issue,
        )

        assert await OxydeInboxEntry.objects.count() == 0


# ---------------------------------------------------------------------------
# InboxService readers/mark-read
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
class TestInboxReaders:
    async def test_list_for_user_newest_first(self, db, test_project, test_issue, test_user):
        service = InboxService()
        e1 = await OxydeInboxEntry.objects.create(
            recipient_user_id=test_user.id, kind=InboxEntryKind.MENTION,
            team_id=test_project.team_id, title="first",
        )
        e2 = await OxydeInboxEntry.objects.create(
            recipient_user_id=test_user.id, kind=InboxEntryKind.MENTION,
            team_id=test_project.team_id, title="second",
        )
        entries = await service.list_for_user(test_user.id)
        assert [e.id for e in entries] == [e2.id, e1.id]

    async def test_unread_only_filter(self, db, test_project, test_user):
        service = InboxService()
        read_entry = await OxydeInboxEntry.objects.create(
            recipient_user_id=test_user.id, kind=InboxEntryKind.MENTION,
            team_id=test_project.team_id, title="read",
        )
        await service.mark_read(read_entry)
        await OxydeInboxEntry.objects.create(
            recipient_user_id=test_user.id, kind=InboxEntryKind.MENTION,
            team_id=test_project.team_id, title="unread",
        )
        unread = await service.list_for_user(test_user.id, unread_only=True)
        assert len(unread) == 1
        assert unread[0].title == "unread"

    async def test_unread_count(self, db, test_project, test_user):
        service = InboxService()
        assert await service.unread_count(test_user.id) == 0
        await OxydeInboxEntry.objects.create(
            recipient_user_id=test_user.id, kind=InboxEntryKind.MENTION,
            team_id=test_project.team_id, title="x",
        )
        assert await service.unread_count(test_user.id) == 1

    async def test_mark_all_read(self, db, test_project, test_user):
        service = InboxService()
        for i in range(3):
            await OxydeInboxEntry.objects.create(
                recipient_user_id=test_user.id, kind=InboxEntryKind.MENTION,
                team_id=test_project.team_id, title=f"x{i}",
            )
        marked = await service.mark_all_read(test_user.id)
        assert marked == 3
        assert await service.unread_count(test_user.id) == 0

    async def test_mark_all_read_scoped_by_team(self, db, test_project, test_team, test_user):
        service = InboxService()
        from app.oxyde_models.team import OxydeTeam
        other_team = await OxydeTeam.objects.create(name="Other", key="OTHR")
        # test_user must be a current member of both teams for their entries to
        # be visible (CHT-1274 scopes reads to membership); this test is about
        # mark_all_read's team_id filter, not membership.
        await OxydeTeamMember.objects.create(
            team_id=other_team.id, user_id=test_user.id, role=TeamRole.MEMBER,
        )
        await OxydeInboxEntry.objects.create(
            recipient_user_id=test_user.id, kind=InboxEntryKind.MENTION,
            team_id=test_team.id, title="in-team",
        )
        await OxydeInboxEntry.objects.create(
            recipient_user_id=test_user.id, kind=InboxEntryKind.MENTION,
            team_id=other_team.id, title="other-team",
        )
        marked = await service.mark_all_read(test_user.id, team_id=test_team.id)
        assert marked == 1
        assert await service.unread_count(test_user.id) == 1


# ---------------------------------------------------------------------------
# resolve_gate_or_review
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
class TestInboxTeamScoping:
    """Inbox reads must be scoped to CURRENT team membership (CHT-1274/CHT-1271):
    a removed member must not read or re-fetch entries from a team they left.
    Entries only cascade on user/team deletion, never on member removal."""

    async def test_list_and_count_exclude_left_team(self, db, test_team, test_user):
        service = InboxService()
        await OxydeInboxEntry.objects.create(
            recipient_user_id=test_user.id, kind=InboxEntryKind.MENTION,
            team_id=test_team.id, title="scoped",
        )
        # Baseline: a current member sees the entry across the read paths.
        assert len(await service.list_for_user(test_user.id)) == 1
        assert await service.unread_count(test_user.id) == 1
        # Remove membership (user + team still exist; the entry does NOT cascade).
        await OxydeTeamMember.objects.filter(
            team_id=test_team.id, user_id=test_user.id,
        ).delete()
        # Now scoped out of every read path.
        assert await service.list_for_user(test_user.id) == []
        assert await service.unread_count(test_user.id) == 0
        assert await service.mark_all_read(test_user.id) == 0

    async def test_mark_read_404_after_team_removal(self, client, db, test_team, test_user, auth_headers):
        entry = await OxydeInboxEntry.objects.create(
            recipient_user_id=test_user.id, kind=InboxEntryKind.MENTION,
            team_id=test_team.id, title="scoped",
        )
        await OxydeTeamMember.objects.filter(
            team_id=test_team.id, user_id=test_user.id,
        ).delete()
        resp = await client.post(f"/api/inbox/{entry.id}/read", headers=auth_headers)
        # 404 (not 403) so a revoked member can't even confirm the entry exists.
        assert resp.status_code == 404

    async def test_agent_scoped_by_agent_team_id_sees_own_inbox(self, db, test_team):
        """A production agent (is_agent + agent_team_id, NO TeamMember row, as
        AgentService.create builds them) must still read its own inbox —
        membership scoping delegates to get_user_teams, which branches for
        agents (CHT-1274 review CRITICAL: a direct TeamMember query would lock
        every agent out of its own inbox)."""
        from app.oxyde_models.user import OxydeUser
        agent = await OxydeUser.objects.create(
            email="prodagent@agent.local", hashed_password="", name="ProdAgent",
            is_agent=True, agent_team_id=test_team.id,
        )
        service = InboxService()
        entry = await OxydeInboxEntry.objects.create(
            recipient_user_id=agent.id, kind=InboxEntryKind.ASSIGNMENT,
            team_id=test_team.id, title="agent entry",
        )
        assert len(await service.list_for_user(agent.id)) == 1
        assert await service.unread_count(agent.id) == 1
        assert await service.is_member_of_entry_team(agent.id, entry) is True


class TestResolveGateOrReview:
    async def test_resolves_gate_pending_only_for_matching_ritual_issue(
        self, db, test_project, test_issue, gate_close_ritual, review_close_ritual,
    ):
        service = InboxService()
        await service.notify_gate_pending(
            ritual=gate_close_ritual, issue=test_issue, project=test_project,
            requested_by_name="A",
        )
        await service.notify_review_requested(
            ritual=review_close_ritual, issue=test_issue, project=test_project,
            attested_by_name="A",
        )

        resolved = await service.resolve_gate_or_review(
            ritual_id=gate_close_ritual.id, issue_id=test_issue.id,
        )
        assert resolved == 1

        entries = await OxydeInboxEntry.objects.filter(issue_id=test_issue.id).all()
        by_ritual = {e.ritual_id: e for e in entries}
        assert by_ritual[gate_close_ritual.id].read_at is not None
        assert by_ritual[review_close_ritual.id].read_at is None

    async def test_does_not_touch_mention_or_assignment_entries(
        self, db, test_project, test_issue, test_user, gate_close_ritual,
    ):
        service = InboxService()
        await service.notify_gate_pending(
            ritual=gate_close_ritual, issue=test_issue, project=test_project,
            requested_by_name="A",
        )
        mention = await OxydeInboxEntry.objects.create(
            recipient_user_id=test_user.id, kind=InboxEntryKind.MENTION,
            team_id=test_project.team_id, issue_id=test_issue.id,
            ritual_id=gate_close_ritual.id, title="unrelated mention",
        )
        await service.resolve_gate_or_review(ritual_id=gate_close_ritual.id, issue_id=test_issue.id)
        mention = await OxydeInboxEntry.objects.get(id=mention.id)
        assert mention.read_at is None


# ---------------------------------------------------------------------------
# Integration: real claim/close/comment flows write the expected entries
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
class TestIntegrationHooks:
    async def test_claim_with_gate_ritual_writes_gate_pending_entry(
        self, db, test_issue, test_user, gate_claim_ritual,
    ):
        with pytest.raises(ClaimRitualsError):
            await _try_claim(test_issue, test_user.id)

        entries = await OxydeInboxEntry.objects.filter(
            issue_id=test_issue.id, kind=InboxEntryKind.GATE_PENDING.name,
        ).all()
        assert len(entries) == 1
        assert entries[0].recipient_user_id == test_user.id  # owner
        assert entries[0].ritual_id == gate_claim_ritual.id

    async def test_close_with_review_ritual_does_not_write_gate_pending(
        self, db, test_issue, test_user, review_close_ritual,
    ):
        """REVIEW-mode rituals don't fan out gate_pending -- only once
        attested does a review_requested entry appear (next test).
        """
        with pytest.raises(TicketRitualsError):
            await _try_close(test_issue, test_user.id)

        assert await OxydeInboxEntry.objects.count() == 0

    async def test_attest_review_ritual_writes_review_requested_entry(
        self, db, test_issue, test_user, review_close_ritual,
    ):
        with pytest.raises(TicketRitualsError):
            await _try_close(test_issue, test_user.id)

        await RitualService().attest_for_issue(
            ritual=review_close_ritual, issue_id=test_issue.id, user_id=test_user.id, note="done",
        )

        entries = await OxydeInboxEntry.objects.filter(
            issue_id=test_issue.id, kind=InboxEntryKind.REVIEW_REQUESTED.name,
        ).all()
        assert len(entries) == 1
        assert entries[0].recipient_user_id == test_user.id

    async def test_complete_gate_ritual_resolves_inbox_entry(
        self, db, test_issue, test_user, gate_claim_ritual,
    ):
        with pytest.raises(ClaimRitualsError):
            await _try_claim(test_issue, test_user.id)

        await RitualService().complete_gate_ritual_for_issue(
            ritual=gate_claim_ritual, issue_id=test_issue.id, user_id=test_user.id, note="ok",
        )

        entries = await OxydeInboxEntry.objects.filter(issue_id=test_issue.id).all()
        assert len(entries) == 1
        assert entries[0].read_at is not None

    async def test_approve_review_ritual_resolves_inbox_entry(
        self, db, test_issue, test_user, review_close_ritual,
    ):
        with pytest.raises(TicketRitualsError):
            await _try_close(test_issue, test_user.id)

        att = await RitualService().attest_for_issue(
            ritual=review_close_ritual, issue_id=test_issue.id, user_id=test_user.id, note="done",
        )
        await RitualService().approve_for_issue(att, approver_id=test_user.id)

        entries = await OxydeInboxEntry.objects.filter(issue_id=test_issue.id).all()
        assert len(entries) == 1
        assert entries[0].read_at is not None

    async def test_assignee_change_writes_assignment_entry(
        self, db, test_issue, test_user, test_user2,
    ):
        await IssueService().update(
            test_issue, IssueUpdate(assignee_id=test_user2.id), user_id=test_user.id,
        )
        entries = await OxydeInboxEntry.objects.filter(
            recipient_user_id=test_user2.id, kind=InboxEntryKind.ASSIGNMENT.name,
        ).all()
        assert len(entries) == 1
        assert entries[0].issue_id == test_issue.id

    async def test_unassign_writes_no_entry(self, db, test_issue, test_user, test_user2):
        await IssueService().update(
            test_issue, IssueUpdate(assignee_id=test_user2.id), user_id=test_user.id,
        )
        issue = await IssueService().get_by_id(test_issue.id)
        await IssueService().update(
            issue, IssueUpdate(assignee_id=None), user_id=test_user.id,
        )
        entries = await OxydeInboxEntry.objects.filter(kind=InboxEntryKind.ASSIGNMENT.name).all()
        assert len(entries) == 1  # only the original assignment, not the unassign

    # -----------------------------------------------------------------
    # Claim-lease intersection (CHT-1246 x CHT-1250): the merged update()
    # runs both #217's lease/CAS claim logic and this branch's
    # assignment-inbox fan-out.
    # -----------------------------------------------------------------

    async def test_self_claim_with_lease_writes_no_assignment_entry(
        self, db, test_issue, test_user,
    ):
        """`chaotic issue start` semantics: assignee=self + IN_PROGRESS in
        one PATCH grants a lease AND is a self-assign -- no inbox entry.
        """
        updated = await IssueService().update(
            test_issue,
            IssueUpdate(status=IssueStatus.IN_PROGRESS, assignee_id=test_user.id),
            user_id=test_user.id,
        )
        assert updated.lease_expires_at is not None  # lease granted (CHT-1246 survives)
        entries = await OxydeInboxEntry.objects.filter(kind=InboxEntryKind.ASSIGNMENT.name).all()
        assert entries == []  # self-assign skip survives (CHT-1250)

    async def test_claim_assigning_someone_else_still_writes_entry(
        self, db, test_issue, test_user, test_user2,
    ):
        """Assigning someone ELSE while moving to IN_PROGRESS is not a
        self-claim (no lease) but IS an assignment -- entry fires.
        """
        updated = await IssueService().update(
            test_issue,
            IssueUpdate(status=IssueStatus.IN_PROGRESS, assignee_id=test_user2.id),
            user_id=test_user.id,
        )
        assert updated.lease_expires_at is None  # not a self-claim, no lease
        entries = await OxydeInboxEntry.objects.filter(
            recipient_user_id=test_user2.id, kind=InboxEntryKind.ASSIGNMENT.name,
        ).all()
        assert len(entries) == 1

    async def test_lost_claim_race_writes_no_assignment_entry(
        self, db, test_issue, test_user, test_user2,
    ):
        """A self-claim that loses to an existing valid lease raises
        IssueAlreadyClaimedError inside the transaction -- it must never
        leave a phantom assignment inbox entry behind.
        """
        from app.services.issue_service import IssueAlreadyClaimedError

        # user2 self-claims first (valid lease).
        await IssueService().update(
            test_issue,
            IssueUpdate(status=IssueStatus.IN_PROGRESS, assignee_id=test_user2.id),
            user_id=test_user2.id,
        )
        issue = await IssueService().get_by_id(test_issue.id)

        with pytest.raises(IssueAlreadyClaimedError):
            await IssueService().update(
                issue,
                IssueUpdate(status=IssueStatus.IN_PROGRESS, assignee_id=test_user.id),
                user_id=test_user.id,
            )

        entries = await OxydeInboxEntry.objects.filter(kind=InboxEntryKind.ASSIGNMENT.name).all()
        assert entries == []  # neither the self-claim nor the failed steal produced one

    async def test_issue_comment_mention_writes_entry(
        self, db, test_team, test_issue, test_user,
    ):
        mentioned = await _add_distinct_member(test_team.id, "Zara")
        handle = _member_handle(mentioned.name, mentioned.email)
        await IssueService().create_comment(
            test_issue.id, IssueCommentCreate(content=f"cc @{handle}"), author_id=test_user.id,
        )
        entries = await OxydeInboxEntry.objects.filter(
            recipient_user_id=mentioned.id, kind=InboxEntryKind.MENTION.name,
        ).all()
        assert len(entries) == 1
        assert entries[0].issue_id == test_issue.id

    async def test_document_comment_mention_writes_entry(
        self, db, test_team, test_document, test_user,
    ):
        mentioned = await _add_distinct_member(test_team.id, "Zara")
        handle = _member_handle(mentioned.name, mentioned.email)
        await DocumentService().create_comment(
            test_document.id, DocumentCommentCreate(content=f"cc @{handle}"), author_id=test_user.id,
        )
        entries = await OxydeInboxEntry.objects.filter(
            recipient_user_id=mentioned.id, kind=InboxEntryKind.MENTION.name,
        ).all()
        assert len(entries) == 1
        assert entries[0].document_id == test_document.id


@pytest.mark.asyncio
class TestInboxBroadcast:
    async def test_notify_gate_pending_broadcasts_inbox_event(
        self, db, test_project, test_issue, gate_close_ritual, captured_broadcasts,
    ):
        await InboxService().notify_gate_pending(
            ritual=gate_close_ritual, issue=test_issue, project=test_project,
            requested_by_name="A",
        )
        inbox_broadcasts = [m for _, m in captured_broadcasts if m.get("entity") == "inbox"]
        assert len(inbox_broadcasts) == 1
        assert inbox_broadcasts[0]["type"] == "created"


# ---------------------------------------------------------------------------
# API routes
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
class TestInboxApi:
    async def test_list_only_returns_own_entries(
        self, client, db, test_project, test_team, test_user, test_user2, auth_headers,
    ):
        await OxydeInboxEntry.objects.create(
            recipient_user_id=test_user.id, kind=InboxEntryKind.MENTION,
            team_id=test_team.id, title="mine",
        )
        await OxydeInboxEntry.objects.create(
            recipient_user_id=test_user2.id, kind=InboxEntryKind.MENTION,
            team_id=test_team.id, title="not mine",
        )
        resp = await client.get("/api/inbox", headers=auth_headers)
        assert resp.status_code == 200
        titles = [e["title"] for e in resp.json()]
        assert titles == ["mine"]

    async def test_list_unread_filter(self, client, db, test_team, test_user, auth_headers):
        service = InboxService()
        read_entry = await OxydeInboxEntry.objects.create(
            recipient_user_id=test_user.id, kind=InboxEntryKind.MENTION,
            team_id=test_team.id, title="read",
        )
        await service.mark_read(read_entry)
        await OxydeInboxEntry.objects.create(
            recipient_user_id=test_user.id, kind=InboxEntryKind.MENTION,
            team_id=test_team.id, title="unread",
        )
        resp = await client.get("/api/inbox?unread=true", headers=auth_headers)
        assert resp.status_code == 200
        titles = [e["title"] for e in resp.json()]
        assert titles == ["unread"]

    async def test_list_includes_issue_identifier(
        self, client, db, test_project, test_team, test_issue, test_user, auth_headers,
    ):
        await OxydeInboxEntry.objects.create(
            recipient_user_id=test_user.id, kind=InboxEntryKind.MENTION,
            team_id=test_team.id, issue_id=test_issue.id, title="mentioned",
        )
        resp = await client.get("/api/inbox", headers=auth_headers)
        assert resp.status_code == 200
        assert resp.json()[0]["issue_identifier"] == test_issue.identifier

    async def test_unread_count_endpoint(self, client, db, test_team, test_user, auth_headers):
        await OxydeInboxEntry.objects.create(
            recipient_user_id=test_user.id, kind=InboxEntryKind.MENTION,
            team_id=test_team.id, title="x",
        )
        resp = await client.get("/api/inbox/unread-count", headers=auth_headers)
        assert resp.status_code == 200
        assert resp.json()["unread_count"] == 1

    async def test_mark_read_endpoint(self, client, db, test_team, test_user, auth_headers):
        entry = await OxydeInboxEntry.objects.create(
            recipient_user_id=test_user.id, kind=InboxEntryKind.MENTION,
            team_id=test_team.id, title="x",
        )
        resp = await client.post(f"/api/inbox/{entry.id}/read", headers=auth_headers)
        assert resp.status_code == 200
        assert resp.json()["read_at"] is not None

    async def test_mark_read_rejects_other_users_entry(
        self, client, db, test_team, test_user2, auth_headers,
    ):
        entry = await OxydeInboxEntry.objects.create(
            recipient_user_id=test_user2.id, kind=InboxEntryKind.MENTION,
            team_id=test_team.id, title="not yours",
        )
        resp = await client.post(f"/api/inbox/{entry.id}/read", headers=auth_headers)
        assert resp.status_code == 403

    async def test_mark_read_404_for_missing_entry(self, client, db, auth_headers):
        resp = await client.post("/api/inbox/does-not-exist/read", headers=auth_headers)
        assert resp.status_code == 404

    async def test_mark_all_read_endpoint(self, client, db, test_team, test_user, auth_headers):
        for i in range(2):
            await OxydeInboxEntry.objects.create(
                recipient_user_id=test_user.id, kind=InboxEntryKind.MENTION,
                team_id=test_team.id, title=f"x{i}",
            )
        resp = await client.post(
            f"/api/inbox/mark-all-read?team_id={test_team.id}", headers=auth_headers,
        )
        assert resp.status_code == 200
        assert resp.json()["marked_count"] == 2

    async def test_list_requires_auth(self, client, db):
        resp = await client.get("/api/inbox")
        assert resp.status_code == 401


class TestStripCodeSpans:
    """CHT-1272 review: code-span stripping must handle the leak edge cases the
    naive regex missed — unclosed fences, nested/variable-length fences, and
    double-backtick / multi-line inline spans — while preserving the deliberate
    '@handle.' wart and still firing real mentions outside code."""

    def _mentions(self, text):
        return _MENTION_RE.findall(_strip_code_spans(text))

    def test_closed_fence_stripped(self):
        assert self._mentions("```\n@bob\n```") == []

    def test_unclosed_fence_stripped_to_eof(self):
        assert self._mentions("before\n```\n@zara do the thing") == []

    def test_nested_longer_fence_stripped(self):
        # A 4-backtick fence quoting a literal ``` run (GFM) — the inner @handle
        # must not leak.
        assert self._mentions("````\n```\n@nested\n```\n````") == []

    def test_double_backtick_inline_stripped(self):
        assert self._mentions("``@dbl``") == []

    def test_single_backtick_inline_stripped(self):
        assert self._mentions("`@one`") == []

    def test_multiline_inline_span_stripped(self):
        assert self._mentions("``multi\n@line``") == []

    def test_unclosed_single_backtick_is_literal(self):
        # CommonMark: an unclosed inline backtick is literal text, so a mention
        # after it still fires (matches the frontend).
        assert self._mentions("a ` b @real") == ["real"]

    def test_real_mention_outside_code_still_fires(self):
        assert self._mentions("```\n@inside\n``` and @outside") == ["outside"]

    def test_trailing_period_wart_preserved(self):
        # The deliberate mirror-wart: a mention immediately followed by a period
        # is captured with the period (unchanged by this fix).
        assert self._mentions("@bob.") == ["bob."]


class TestInboxArchive:
    """CHT-1316: a real archive (archived_at) removes an entry from the
    inbox list + unread count, instead of piggybacking on read-state."""

    async def _entry(self, test_user, team_id, title="x"):
        return await OxydeInboxEntry.objects.create(
            recipient_user_id=test_user.id, kind=InboxEntryKind.MENTION,
            team_id=team_id, title=title,
        )

    async def test_archive_removes_from_list_and_count(self, db, test_project, test_user):
        service = InboxService()
        keep = await self._entry(test_user, test_project.team_id, "keep")
        drop = await self._entry(test_user, test_project.team_id, "drop")
        assert await service.unread_count(test_user.id) == 2
        await service.archive(drop)
        assert [e.id for e in await service.list_for_user(test_user.id)] == [keep.id]
        assert await service.unread_count(test_user.id) == 1

    async def test_archive_marks_read_too(self, db, test_project, test_user):
        service = InboxService()
        e = await self._entry(test_user, test_project.team_id)
        assert e.read_at is None
        archived = await service.archive(e)
        assert archived.archived_at is not None
        assert archived.read_at is not None  # archiving implies handled

    async def test_archive_is_idempotent(self, db, test_project, test_user):
        service = InboxService()
        e = await self._entry(test_user, test_project.team_id)
        first = (await service.archive(e)).archived_at
        assert (await service.archive(e)).archived_at == first

    async def test_archive_endpoint_removes_entry(self, client, db, test_team, test_user, auth_headers):
        e = await self._entry(test_user, test_team.id, "bye")
        resp = await client.post(f"/api/inbox/{e.id}/archive", headers=auth_headers)
        assert resp.status_code == 200
        listed = await client.get("/api/inbox", headers=auth_headers)
        assert e.id not in [x["id"] for x in listed.json()]
        count = await client.get("/api/inbox/unread-count", headers=auth_headers)
        assert count.json()["unread_count"] == 0

    async def test_archive_endpoint_not_owner_403(self, client, db, test_team, test_user2, auth_headers):
        e = await self._entry(test_user2, test_team.id, "not mine")
        resp = await client.post(f"/api/inbox/{e.id}/archive", headers=auth_headers)
        assert resp.status_code == 403

    async def test_archive_endpoint_nonexistent_404(self, client, db, auth_headers):
        resp = await client.post(
            "/api/inbox/00000000-0000-0000-0000-000000000000/archive", headers=auth_headers,
        )
        assert resp.status_code == 404
