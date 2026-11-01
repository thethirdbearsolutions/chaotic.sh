"""Resolving inbox entries tells each recipient's open sockets once per
transaction (CHT-1927): an open inbox page showed settled rows as unread
until its next refetch."""
import pytest

from app.enums import InboxEntryKind
from app.oxyde_models.inbox import OxydeInboxEntry
from app.services.inbox_service import InboxService


@pytest.fixture
def sent(monkeypatch):
    import app.websocket as ws

    events = []

    async def record(team_id, event_type, data, *, recipient_user_id):
        events.append((team_id, event_type, recipient_user_id, data))

    monkeypatch.setattr(ws, "broadcast_inbox_event", record)
    return events


async def _entry(team_id, project_id, issue_id, recipient):
    return await OxydeInboxEntry.objects.create(
        recipient_user_id=recipient, kind=InboxEntryKind.ASSIGNMENT, team_id=team_id,
        project_id=project_id, issue_id=issue_id, title="secret title", body="secret body",
    )


def _resolved(sent):
    return [s for s in sent if s[1] == "resolved"]


@pytest.mark.asyncio
async def test_resolve_broadcasts_once_per_recipient(sent, test_team, test_project, test_issue, test_user, agent_user, db):
    mine = [await _entry(test_team.id, test_project.id, test_issue.id, test_user.id) for _ in range(2)]
    theirs = await _entry(test_team.id, test_project.id, test_issue.id, agent_user.id)
    sent.clear()

    await InboxService().resolve_for_issue(test_issue.id)

    by_recipient = {r[2]: r for r in _resolved(sent)}
    assert set(by_recipient) == {test_user.id, agent_user.id}
    team_id, _type, _to, data = by_recipient[test_user.id]
    assert team_id == test_team.id
    # Every settled id and the count; nothing else about the entries.
    assert set(data) == {"recipient_user_id", "ids", "count"} and data["recipient_user_id"] == test_user.id
    assert sorted(data["ids"]) == sorted(e.id for e in mine) and data["count"] == 2
    assert by_recipient[agent_user.id][3]["ids"] == [theirs.id]


@pytest.mark.asyncio
async def test_many_resolve_calls_in_one_transaction_send_one_event(sent, monkeypatch, test_team, test_project, test_user, db):
    """Review 1: a project delete settles in chunks; one event per
    recipient, after the commit, with the total count and capped ids."""
    import app.services.inbox_service as inbox_module
    from app.db.transactions import atomic
    from app.oxyde_models.issue import OxydeIssue

    monkeypatch.setattr(inbox_module, "_RESOLVED_IDS_CAP", 3)
    monkeypatch.setattr(InboxService, "_RESOLVE_CHUNK", 2)
    issues = []
    for n in range(5):
        issue = await OxydeIssue.objects.create(
            project_id=test_project.id, identifier=f"{test_project.key}-9{n}", number=900 + n,
            title=f"I{n}", creator_id=test_user.id,
        )
        issues.append(issue)
        await _entry(test_team.id, test_project.id, issue.id, test_user.id)
    sent.clear()

    async with atomic():
        # Five issues in chunks of two: three _resolve calls.
        await InboxService().resolve_for_project(test_project.id)
        assert _resolved(sent) == []  # not before the commit

    [(_team, _type, to, data)] = _resolved(sent)
    assert to == test_user.id and data["count"] == 5 and len(data["ids"]) == 3


@pytest.mark.asyncio
async def test_a_rolled_back_resolve_sends_nothing(sent, test_team, test_project, test_issue, test_user, db):
    from app.db.transactions import atomic

    await _entry(test_team.id, test_project.id, test_issue.id, test_user.id)
    sent.clear()
    with pytest.raises(RuntimeError):
        async with atomic():
            await InboxService().resolve_for_issue(test_issue.id)
            raise RuntimeError("roll back")
    assert _resolved(sent) == []


@pytest.mark.asyncio
async def test_nothing_to_resolve_sends_nothing(sent, test_issue, db):
    await InboxService().resolve_for_issue(test_issue.id)
    assert sent == []
