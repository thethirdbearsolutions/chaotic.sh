"""Resolving inbox entries tells each recipient's open sockets once
(CHT-1927): an open inbox page dropped settled rows only on its next
refetch."""
import pytest

from app.enums import InboxEntryKind
from app.oxyde_models.inbox import OxydeInboxEntry
from app.services.inbox_service import InboxService


@pytest.mark.asyncio
async def test_resolve_broadcasts_once_per_recipient(monkeypatch, test_team, test_project, test_issue, test_user, agent_user, db):
    import app.websocket as ws

    sent = []

    async def record(team_id, event_type, data, *, recipient_user_id):
        sent.append((team_id, event_type, recipient_user_id, data["id"]))

    monkeypatch.setattr(ws, "broadcast_inbox_event", record)
    entries = []
    for recipient in (test_user.id, test_user.id, agent_user.id):
        entries.append(await OxydeInboxEntry.objects.create(
            recipient_user_id=recipient, kind=InboxEntryKind.ASSIGNMENT, team_id=test_team.id,
            project_id=test_project.id, issue_id=test_issue.id, title="t",
        ))
    sent.clear()

    await InboxService().resolve_for_issue(test_issue.id)

    resolved = [s for s in sent if s[1] == "resolved"]
    assert sorted(r[2] for r in resolved) == sorted([test_user.id, agent_user.id])
    assert all(r[0] == test_team.id for r in resolved)


@pytest.mark.asyncio
async def test_nothing_to_resolve_sends_nothing(monkeypatch, test_issue, db):
    import app.websocket as ws

    sent = []

    async def record(*args, **kwargs):
        sent.append(args)

    monkeypatch.setattr(ws, "broadcast_inbox_event", record)
    await InboxService().resolve_for_issue(test_issue.id)
    assert sent == []
