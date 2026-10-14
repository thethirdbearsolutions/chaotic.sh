"""Inbox service (CHT-1250): the unified 'awaiting you' surface.

Entries are written by the same service-layer paths that already produce
the underlying events -- gate rituals blocking a ticket, review-mode
attestations awaiting approval, assignment changes, and @mentions in
comments -- so the inbox can't drift from the activity log / websocket
feeds those paths already emit.

Scope note: GATE/REVIEW entries only cover ticket-level rituals (the
TICKET_CLAIM/TICKET_CLOSE triggers surfaced in gate-approvals.js's
"Waiting to Claim/Close" and "Awaiting Review Approval" sections) --
sprint-level EVERY_SPRINT ritual gates are a separate limbo flow with no
per-recipient targeting today and are out of scope here.

Targeting: GATE and REVIEW rituals aren't per-user -- any team admin can
act on them (RitualService gates completion/approval on
TeamService.is_team_admin, not on a specific assignee). So both kinds
fan out one entry per team admin, mirroring the authorization check.
"""
import logging
import re
from datetime import datetime, timezone
from typing import TYPE_CHECKING

from oxyde import execute_raw

from app.db.transactions import on_commit
from app.enums import ActivityType, ApprovalMode, InboxEntryKind, TeamRole
from app.oxyde_models.inbox import OxydeInboxEntry
from app.services.email_service import EmailService, fire_and_forget
from app.services.team_service import TeamService
from app.utils.markdown import strip_code_spans

if TYPE_CHECKING:
    from app.oxyde_models.document import OxydeDocument
    from app.oxyde_models.issue import OxydeIssue

logger = logging.getLogger(__name__)

# Matches the frontend's mention-autocomplete handle charset
# (frontend/src/mention-autocomplete.js: `@([a-zA-Z0-9._-]*)`), applied to
# committed text rather than a live-typing prefix.
_MENTION_RE = re.compile(r"(?:^|(?<=\s))@([a-zA-Z0-9._-]+)")

# CHT-1272: fenced ``` code blocks and inline `code` spans are stripped
# before mention-matching -- a literal @handle pasted as example code
# shouldn't page anyone. Mirrors the frontend's rendering pipeline
# (rich-text.js's addIssueLinksAndMentions walks the *rendered* markdown
# DOM and skips text nodes under <code>/<pre>, which marked already
# produces for both ``` fences and inline `code`); this strips the same
# spans out of the raw markdown source before regex-matching, since the
# backend never renders to DOM. Fences are stripped first (DOTALL, so a
# fence spanning multiple lines is removed as one block), then any
# remaining inline spans.
# The hardened fence/inline regexes now live in app.utils.markdown, shared
# with the cross-reference path (CHT-801) so there's one copy to keep correct.
_strip_code_spans = strip_code_spans


def _member_handle(name: str | None, email: str | None) -> str:
    """Mirror frontend/src/mention-autocomplete.js's getMemberHandle():
    first name lowercased, or the email local-part, or 'user'.
    """
    if name:
        return name.split(" ")[0].lower()
    if email:
        return email.split("@")[0].lower()
    return "user"


class InboxService:
    """Writes and reads InboxEntry rows."""

    # ------------------------------------------------------------------
    # Writers
    # ------------------------------------------------------------------

    async def _team_admins(self, team_id: str) -> list:
        """OWNER/ADMIN members of a team, with .user loaded."""
        members = await TeamService().get_members(team_id)
        return [m for m in members if m.role in (TeamRole.OWNER, TeamRole.ADMIN)]

    async def _has_open_entry(
        self, recipient_user_id: str, kind: InboxEntryKind,
        ritual_id: str | None = None, issue_id: str | None = None,
    ) -> bool:
        """True if an unread entry already covers this (recipient, kind,
        ritual, issue) tuple -- de-dupes repeated triggers (e.g. the same
        GATE ritual firing again if a new ritual is added to the same
        already-open intent) into one inbox row per recipient.
        """
        existing = await OxydeInboxEntry.objects.filter(
            recipient_user_id=recipient_user_id, kind=kind.name,
            ritual_id=ritual_id, issue_id=issue_id, read_at=None,
        ).first()
        return existing is not None

    async def _broadcast(self, team_id: str, event_type: str, entry) -> None:
        """Tell the team's sockets, once the entry is committed: a client
        that refetches on the event must find it (a writer can run inside
        a transaction, as the ritual mode change's carry does)."""
        payload = {
            "id": entry.id,
            "recipient_user_id": entry.recipient_user_id,
            "kind": entry.kind.name if hasattr(entry.kind, "name") else entry.kind,
            "issue_id": entry.issue_id,
            "document_id": entry.document_id,
            "ritual_id": entry.ritual_id,
        }

        async def send() -> None:
            try:
                from app.websocket import broadcast_inbox_event
                await broadcast_inbox_event(team_id, event_type, payload)
            except Exception:
                logger.exception("Failed to broadcast inbox event %s for entry=%s", event_type, entry.id)

        try:
            await on_commit(send)
        except RuntimeError:  # inside oxyde.atomic(): nothing would call it later
            logger.exception("Inbox event %s for entry=%s broadcast before commit", event_type, entry.id)
            await send()

    async def _push(self, entries: list, actor_id: str | None = None) -> None:
        """Push the new entries to their recipients' devices (CHT-1605),
        except to whoever caused them. Never raises."""
        from app.services.push_sender import push_created

        await push_created(entries, actor_id=actor_id)

    async def notify_gate_pending(
        self, *, ritual, issue, project, requested_by_name: str, requested_by_id: str | None = None,
        email: bool = True,
    ) -> None:
        """A GATE ritual just became blocking on `issue`. Fan out an
        inbox entry + email to every team admin. The requester, when an
        admin, gets the entry but no push (CHT-1605). ``email=False``
        when nobody asked anew: a request carried over from REVIEW mode
        (CHT-1626).
        """
        admins = await self._team_admins(project.team_id)
        title = f"Gate pending: {ritual.name} on {issue.identifier}"
        email_svc = EmailService()
        created = []
        for member in admins:
            if await self._has_open_entry(member.user_id, InboxEntryKind.GATE_PENDING, ritual.id, issue.id):
                continue
            entry = await OxydeInboxEntry.objects.create(
                recipient_user_id=member.user_id,
                kind=InboxEntryKind.GATE_PENDING,
                team_id=project.team_id,
                project_id=project.id,
                issue_id=issue.id,
                ritual_id=ritual.id,
                title=title,
                body=ritual.prompt,
            )
            created.append(entry)
            await self._broadcast(project.team_id, "created", entry)

            recipient_email = getattr(member.user, "email", None) if member.user else None
            if recipient_email and email:
                self._dispatch_gate_pending_email(
                    to=recipient_email, issue=issue, ritual=ritual,
                    requested_by_name=requested_by_name, email_svc=email_svc,
                )
        await self._push(created, requested_by_id)

    def _dispatch_gate_pending_email(self, *, to, issue, ritual, requested_by_name, email_svc: EmailService) -> None:
        """Fire-and-forget the gate-pending email; on a configured-but-
        failing send, write a loud OxydeIssueActivity note (CHT-1251
        fail-loud doctrine) since there's an issue to attach it to.
        """
        from app.config import get_settings

        # The email's entire job is the clickthrough (PR #218 review
        # finding 1): /issue/<identifier> is the frontend's canonical
        # deep-link route (router.js's navigateToIssueByIdentifier).
        base_url = get_settings().app_base_url.rstrip("/")
        subject, body = email_svc.render_gate_pending(
            requested_by_name=requested_by_name,
            issue_identifier=issue.identifier,
            issue_title=issue.title,
            ritual_name=ritual.name,
            ritual_prompt=ritual.prompt,
            issue_url=f"{base_url}/issue/{issue.identifier}",
        )

        async def _job():
            sent = await email_svc.send(to, subject, body)
            if not sent and email_svc.is_configured():
                try:
                    from app.oxyde_models.issue import OxydeIssueActivity
                    await OxydeIssueActivity.objects.create(
                        issue_id=issue.id,
                        activity_type=ActivityType.EMAIL_DELIVERY_FAILED,
                        field_name="gate_pending_email",
                        new_value=f"Failed to deliver gate-pending email to {to}",
                    )
                except Exception:
                    logger.exception(
                        "Failed to write email-delivery-failed activity for issue=%s", issue.id,
                    )

        fire_and_forget(_job())

    async def notify_review_requested(
        self, *, ritual, issue, project, attested_by_name: str, attested_by_id: str | None = None,
    ) -> None:
        """A REVIEW ritual was just attested on `issue` and needs admin
        approval. Fan out an inbox entry to every team admin. No email
        per CHT-1251 (email is gate-requests + invitations only). The
        attester, when an admin, gets the entry but no push (CHT-1605).
        """
        admins = await self._team_admins(project.team_id)
        title = f"Review requested: {ritual.name} on {issue.identifier}"
        created = []
        for member in admins:
            if await self._has_open_entry(member.user_id, InboxEntryKind.REVIEW_REQUESTED, ritual.id, issue.id):
                continue
            entry = await OxydeInboxEntry.objects.create(
                recipient_user_id=member.user_id,
                kind=InboxEntryKind.REVIEW_REQUESTED,
                team_id=project.team_id,
                project_id=project.id,
                issue_id=issue.id,
                ritual_id=ritual.id,
                title=title,
                body=ritual.prompt,
            )
            created.append(entry)
            await self._broadcast(project.team_id, "created", entry)
        await self._push(created, attested_by_id)

    async def notify_gate_rejected(self, *, ritual, issue, project, rejection) -> None:
        """A human rejected a gate request or review attestation (CHT-1606).
        Tell whoever it was addressed to, and that agent's owner, why: the
        reason is the entry's body. Nobody is told about their own reject,
        and an owner who is also the attester gets one entry.
        """
        from app.services.user_service import UserService

        attester_id = rejection.attested_by_id
        if not attester_id:
            return
        users = UserService()
        attester = await users.get_by_id(attester_id)
        rejecter = await users.get_by_id(rejection.rejected_by_id) if rejection.rejected_by_id else None
        recipients = [attester_id]
        if attester is not None and attester.is_agent and attester.parent_user_id:
            recipients.append(attester.parent_user_id)

        what = "review" if ritual.approval_mode == ApprovalMode.REVIEW else "gate request"
        who = rejecter.name if rejecter else "Someone"
        seen = set()
        created = []
        for recipient_id in recipients:
            if recipient_id in seen or recipient_id == rejection.rejected_by_id:
                continue
            seen.add(recipient_id)
            whose = "your" if recipient_id == attester_id else f"{attester.name}'s"
            title = f"{who} rejected {whose} {what}: {ritual.name} on {issue.identifier}"
            entry = await OxydeInboxEntry.objects.create(
                recipient_user_id=recipient_id,
                kind=InboxEntryKind.GATE_REJECTED,
                team_id=project.team_id,
                project_id=project.id,
                issue_id=issue.id,
                ritual_id=ritual.id,
                source_user_id=rejection.rejected_by_id,
                title=title,
                body=rejection.note,
            )
            created.append(entry)
            await self._broadcast(project.team_id, "created", entry)
        await self._push(created, rejection.rejected_by_id)

    async def notify_assignment(self, *, issue, project, assignee_id: str, assigned_by) -> None:
        """An issue was assigned to `assignee_id`. Skip self-assignment --
        no one needs to be told they assigned themselves something.
        """
        if assigned_by is not None and assignee_id == assigned_by.id:
            return
        entry = await OxydeInboxEntry.objects.create(
            recipient_user_id=assignee_id,
            kind=InboxEntryKind.ASSIGNMENT,
            team_id=project.team_id,
            project_id=project.id,
            issue_id=issue.id,
            source_user_id=assigned_by.id if assigned_by else None,
            title=f"{assigned_by.name if assigned_by else 'Someone'} assigned you {issue.identifier}",
            body=issue.title,
        )
        await self._broadcast(project.team_id, "created", entry)
        await self._push([entry], assigned_by.id if assigned_by else None)

    async def notify_agent_status(self, *, agent, actor, verb: str) -> None:
        """Someone other than its creator deactivated or reactivated an
        agent (CHT-1494): tell the creator who, so a bot that starts
        failing auth has an explanation in the app."""
        if verb == "deactivated":
            body = (
                "Its API keys were revoked and it can no longer sign in. "
                "Its authored work is kept. It can be reactivated with "
                "`chaotic agent reactivate`."
            )
        else:
            body = (
                "It can sign in again once it has a key; its old keys stay "
                "revoked. Mint one with `chaotic agent keys create`."
            )
        entry = await OxydeInboxEntry.objects.create(
            recipient_user_id=agent.parent_user_id,
            kind=InboxEntryKind.AGENT_STATUS,
            team_id=agent.agent_team_id,
            project_id=agent.agent_project_id,
            source_user_id=actor.id,
            title=f"{actor.name} {verb} your agent {agent.name}",
            body=body,
        )
        await self._broadcast(agent.agent_team_id, "created", entry)
        await self._push([entry], actor.id)

    async def notify_agent_keys_released(
        self, *, recipient_user_id: str, agent, actor, removed, revoked: int, new_owner,
    ) -> None:
        """A member left the agent's team and took keys or ownership with
        them (CHT-1510): tell a team admin, so the bot that just started
        failing auth has an explanation and someone mints it a new key."""
        who = removed.name if removed else "A member"
        verb = "left the team" if removed is not None and removed.id == actor.id else "was removed from the team"
        parts = []
        if revoked:
            parts.append(
                f"{revoked} API key{'s' if revoked != 1 else ''} they held for it "
                f"{'were' if revoked != 1 else 'was'} revoked, so anything running on "
                f"{'them' if revoked != 1 else 'it'} has stopped."
            )
        if new_owner is not None:
            parts.append(f"{new_owner.name} now owns the agent.")
        parts.append("Mint a replacement key with `chaotic agent keys create` if it is still in use.")
        entry = await OxydeInboxEntry.objects.create(
            recipient_user_id=recipient_user_id,
            kind=InboxEntryKind.AGENT_STATUS,
            team_id=agent.agent_team_id,
            project_id=agent.agent_project_id,
            source_user_id=actor.id,
            title=f"{who} {verb}: agent {agent.name} needs attention",
            body=" ".join(parts),
        )
        await self._broadcast(agent.agent_team_id, "created", entry)
        await self._push([entry], actor.id)

    async def notify_connection_revoked_for_reuse(self, *, session, principal) -> None:
        """A refresh token of a connection was presented a second time and
        the connection was revoked (CHT-1516, design §2.4): tell the human
        who answers for it. Either the client misbehaved or someone else
        has a copy of the token; either way the app stops working until it
        is reconnected, and this is the explanation."""
        from app.enums import HolderVia

        team_id = session.team_id
        if session.via == HolderVia.APP:
            # A built-in app signed in as the recipient (CHT-1602). Its
            # session has no team, and an inbox entry needs one: the
            # first of their teams, as for a push-device notice; a person
            # in no team has no inbox and gets none.
            title = "An app signed in as you was signed out"
            team_ids = await self.current_team_ids(session.holder_user_id)
            if not team_ids:
                return
            team_id = team_ids[0]
        else:
            name = principal.name if principal is not None else "an agent"
            title = f"A connection acting as {name} was revoked"
        entry = await OxydeInboxEntry.objects.create(
            recipient_user_id=session.holder_user_id,
            kind=InboxEntryKind.AGENT_STATUS,
            team_id=team_id,
            title=title,
            body=(
                "One of its refresh tokens was used twice, which happens when a token "
                "has been copied. Every token of the connection was revoked. If you still "
                "use the app, reconnect it; if you don't recognise this, check who has access."
            ),
        )
        await self._broadcast(team_id, "created", entry)
        await self._push([entry])

    async def add_push_device_entry(
        self, *, user_id: str, device, created: bool, credential_label: str,
    ) -> OxydeInboxEntry | None:
        """A device was registered for this person's push notifications,
        or an existing one's endpoint changed (CHT-1604). Whoever holds any
        of their credentials can register one, so they are told, in one
        entry in the first of their teams (an inbox entry needs a team; a
        person in no team has no inbox and gets none).

        Written in the registration's own transaction, so a device is
        never registered without its notice; the caller broadcasts the
        entry after commit (``broadcast_created``)."""
        team_ids = await self.current_team_ids(user_id)
        if not team_ids:
            return None
        from urllib.parse import urlsplit

        name = device.label or device.platform or "a device"
        host = urlsplit(device.endpoint).hostname or "an unknown host"
        # Quoted: the label is the registrant's own text.
        title = f'New device for push notifications: "{name}"' if created else (
            f'Push notifications for "{name}" now go to a new address'
        )
        entry = await OxydeInboxEntry.objects.create(
            recipient_user_id=user_id,
            kind=InboxEntryKind.PUSH_DEVICE_ADDED,
            team_id=team_ids[0],
            source_user_id=user_id,
            title=title,
            body=(
                f"Registered with {credential_label}; notifications are delivered through {host}. "
                "If this wasn't you, remove the device under Settings > Push Devices, "
                "and revoke the API key or session it was registered with."
            ),
        )
        return entry

    async def broadcast_created(self, entry: OxydeInboxEntry) -> None:
        """Announce an entry written inside a transaction, once it
        committed, and push it (CHT-1605)."""
        await self._broadcast(entry.team_id, "created", entry)
        await self._push([entry])

    async def notify_mentions(
        self, *, content: str, team_id: str, author, issue=None, document=None,
    ) -> None:
        """Parse @handles out of `content`; write a MENTION entry for each
        resolved team member (excluding the author). Exactly one of
        issue/document should be given.

        @handles inside fenced ``` blocks or inline `code` spans are not
        real mentions (CHT-1272) -- see _strip_code_spans.
        """
        handles = {m.lower() for m in _MENTION_RE.findall(_strip_code_spans(content or ""))}
        if not handles:
            return

        members = await TeamService().get_members(team_id)
        by_handle: dict[str, str] = {}
        for member in members:
            if not member.user:
                continue
            handle = _member_handle(member.user.name, member.user.email)
            by_handle.setdefault(handle, member.user_id)

        matched_user_ids = {by_handle[h] for h in handles if h in by_handle}
        matched_user_ids.discard(author.id)
        if not matched_user_ids:
            return

        if issue is not None:
            title = f"{author.name} mentioned you in {issue.identifier}"
            project_id = issue.project_id
            issue_id = issue.id
            document_id = None
        else:
            title = f"{author.name} mentioned you in {document.title}"
            project_id = document.project_id
            issue_id = None
            document_id = document.id

        snippet = (content or "")[:280]
        created = []
        for user_id in matched_user_ids:
            entry = await OxydeInboxEntry.objects.create(
                recipient_user_id=user_id,
                kind=InboxEntryKind.MENTION,
                team_id=team_id,
                project_id=project_id,
                issue_id=issue_id,
                document_id=document_id,
                source_user_id=author.id,
                title=title,
                body=snippet,
            )
            created.append(entry)
            await self._broadcast(team_id, "created", entry)
        await self._push(created, author.id)

    async def resolve_gate_or_review(
        self, *, ritual_id: str, issue_id: str, recipient_user_id: str | None = None,
    ) -> int:
        """Mark every open GATE_PENDING/REVIEW_REQUESTED entry for this
        (ritual, issue) as read, for every recipient -- the underlying
        gate/review was just resolved, so it's no longer 'awaiting'
        anyone. Best-effort: called from a fail-soft try/except at the
        call site, same as the other post-resolution side effects there.

        With `recipient_user_id`, only that recipient's entries: a gate
        reject settles the rejecter's prompt while the gate stays pending
        for the other approvers (CHT-1606).
        """
        filters = dict(
            ritual_id=ritual_id, issue_id=issue_id,
            kind__in=[InboxEntryKind.GATE_PENDING.name, InboxEntryKind.REVIEW_REQUESTED.name],
        )
        if recipient_user_id is not None:
            filters["recipient_user_id"] = recipient_user_id
        return await self._resolve(filters)

    # The kinds that ask a human to decide a ritual on an issue, and the
    # answer to such a decision: what goes stale when the ritual or the
    # gate goes away.
    _DECISION_KINDS = (
        InboxEntryKind.GATE_PENDING, InboxEntryKind.REVIEW_REQUESTED, InboxEntryKind.GATE_REJECTED,
    )

    async def resolve_for_issue(self, issue_id: str, *, decisions_only: bool = False) -> int:
        """Settle the entries about `issue_id` (CHT-1607 review, finding 4):
        every kind when the issue is deleted (the entry points at nothing),
        only the gate/review kinds when its pending rituals were cleared
        some other way (an admin force-clear). Without this a synced
        device would keep an approve button whose call 404s or 400s."""
        filters: dict = {"issue_id": issue_id}
        if decisions_only:
            filters["kind__in"] = [k.name for k in self._DECISION_KINDS]
        return await self._resolve(filters)

    async def resolve_for_ritual(self, ritual_id: str) -> int:
        """Settle the gate/review entries of a ritual that was deleted or
        deactivated: nothing is waiting on it any more (finding 4)."""
        return await self._resolve({
            "ritual_id": ritual_id, "kind__in": [k.name for k in self._DECISION_KINDS],
        })

    # Ids per IN (...) list: well under SQLite's bound-variable limit.
    _RESOLVE_CHUNK = 500

    async def resolve_for_project(self, project_id: str) -> int:
        """Settle the entries about the issues and documents of a project
        about to be deleted (CHT-1626). The database cascade removes the
        issues without going through ``IssueService.delete``, and an
        entry's ``issue_id`` has no foreign key, so without this their
        entries would stay open with approve/reject actions that 404.
        Call it inside the delete's transaction, before the rows go:
        the push withdrawals wait for the commit."""
        from app.oxyde_models.document import OxydeDocument
        from app.oxyde_models.issue import OxydeIssue

        unread = 0
        for model, column in ((OxydeIssue, "issue_id"), (OxydeDocument, "document_id")):
            ids = [row["id"] for row in await model.objects.filter(project_id=project_id).values("id").all()]
            for start in range(0, len(ids), self._RESOLVE_CHUNK):
                unread += await self._resolve({f"{column}__in": ids[start:start + self._RESOLVE_CHUNK]})
        return unread

    _ASK_KINDS = (InboxEntryKind.GATE_PENDING, InboxEntryKind.REVIEW_REQUESTED)

    async def open_decision_issue_ids(self, ritual_id: str) -> list[str]:
        """The issues with an open GATE_PENDING or REVIEW_REQUESTED entry
        of this ritual."""
        rows = await OxydeInboxEntry.objects.filter(
            ritual_id=ritual_id, kind__in=[k.name for k in self._ASK_KINDS], resolved_at=None,
        ).values("issue_id").all()
        return sorted({row["issue_id"] for row in rows if row["issue_id"]})

    async def settle_decisions_except(self, ritual_id: str, keep: dict[str, InboxEntryKind]) -> int:
        """Settle this ritual's open GATE_PENDING and REVIEW_REQUESTED
        entries, except, for each issue in ``keep``, those of the kind
        given for it: a mode change (CHT-1626). GATE_REJECTED entries
        are left alone; the rejection still stands. One resolve per
        group of issues, not per issue."""
        groups: dict[tuple[str, ...], list[str]] = {}
        for issue_id in await self.open_decision_issue_ids(ritual_id):
            kinds = tuple(k.name for k in self._ASK_KINDS if keep.get(issue_id) is not k)
            groups.setdefault(kinds, []).append(issue_id)
        unread = 0
        for kinds, ids in groups.items():
            for start in range(0, len(ids), self._RESOLVE_CHUNK):
                unread += await self._resolve({
                    "ritual_id": ritual_id, "issue_id__in": ids[start:start + self._RESOLVE_CHUNK],
                    "kind__in": list(kinds),
                })
        return unread

    async def resolve_for_document(self, document_id: str) -> int:
        """Settle the entries about a deleted document (CHT-1607)."""
        return await self._resolve({"document_id": document_id})

    async def touch(self, **filters) -> int:
        """Bump updated_at on the open entries matching `filters`: text an
        entry shows changed (a document title, a person's name) though the
        entry itself did not, and a synced device should re-fetch it
        (CHT-1607 review, finding 6). Tombstones are left alone."""
        return await OxydeInboxEntry.objects.filter(
            **filters, resolved_at=None, archived_at=None,
        ).update(updated_at=datetime.now(timezone.utc))

    async def touch_safely(self, **filters) -> None:
        """touch(), best-effort, for the rename paths: a failure here must
        not fail the rename."""
        try:
            await self.touch(**filters)
        except Exception:
            logger.exception("Failed to bump inbox entries %s", filters)

    async def _resolve(self, filters: dict) -> int:
        """Settle the unresolved entries matching `filters` (CHT-1607):
        each gets resolved_at, and read_at if it had none, and a fresh
        updated_at so a syncing client sees the change. An entry the
        recipient already read is resolved too: the device still holds
        it and must learn to drop it. Returns how many were unread, which
        is what callers have always been told.

        Two statements, and only the second touches what a sync reads
        (updated_at): every row it settles changes in that one statement,
        so a sync can never see some of them at an instant and miss the
        rest at the same instant (PR #355 review, finding 1). The first
        only fills read_at, which moves no cursor.

        Every resolve path comes through here, so this is where a device
        is told to withdraw the entry's notification (CHT-1605): the rows
        about to be settled are read first, and a ``resolved`` push is
        scheduled for them once the update is in."""
        settling = await OxydeInboxEntry.objects.filter(**filters, resolved_at=None).all()
        unread = await self._mark_read_for_resolve(filters)
        now = datetime.now(timezone.utc)
        await OxydeInboxEntry.objects.filter(
            **filters, resolved_at=None,
        ).update(resolved_at=now, updated_at=now)
        if settling:
            from app.services.push_sender import push_resolved

            await push_resolved(settling)
        return unread

    async def _mark_read_for_resolve(self, filters: dict) -> int:
        """Step one of _resolve: read_at on the unread rows, nothing else."""
        return await OxydeInboxEntry.objects.filter(
            **filters, resolved_at=None, read_at=None,
        ).update(read_at=datetime.now(timezone.utc))

    async def resolve_rejected(
        self, *, ritual_id: str, issue_id: str, recipient_user_ids: list[str],
    ) -> int:
        """Mark the open GATE_REJECTED entries of these recipients for this
        (ritual, issue) as read: they answered the rejection (attested or
        asked again), or a human completed the gate anyway (CHT-1606).
        """
        if not recipient_user_ids:
            return 0
        return await self._resolve(dict(
            ritual_id=ritual_id, issue_id=issue_id,
            kind=InboxEntryKind.GATE_REJECTED.name,
            recipient_user_id__in=list(recipient_user_ids),
        ))

    # ------------------------------------------------------------------
    # Readers
    # ------------------------------------------------------------------

    async def current_team_ids(self, user_id: str) -> list[str]:
        """Team ids the user CURRENTLY has access to.

        Inbox reads must be scoped to live access: entries only cascade on
        user/team DELETION, never on member removal, so a removed member would
        otherwise keep reading (and live-refetching) entries from a team they've
        left (CHT-1274/CHT-1271). Every inbox entry has a non-null team_id, so
        scoping reads to this set is sufficient; an empty set correctly yields
        no entries.

        Delegates to TeamService.get_user_teams so it branches correctly for
        AGENTS (scoped via user.agent_team_id, no TeamMember row) as well as
        humans (TeamMember membership) — a direct TeamMember query would lock
        every agent out of its own inbox.
        """
        teams = await TeamService().get_user_teams(user_id)
        return [t.id for t in teams]

    async def is_member_of_entry_team(self, user_id: str, entry: OxydeInboxEntry) -> bool:
        """Whether the user is currently a member of the entry's team (CHT-1274)."""
        return entry.team_id in await self.current_team_ids(user_id)

    async def resolve_display_fields(
        self, entries: list[OxydeInboxEntry],
    ) -> tuple[dict[str, "OxydeIssue"], dict[str, "OxydeDocument"]]:
        """The issues and documents a page of entries refers to, keyed by
        id, in two queries for the whole page (CHT-1399). The source user
        is a principal summary, which the API batch-loads with
        ``fill_principals`` (CHT-1500).

        The API used to resolve each entry's issue identifier, document
        title and source user name with one service lookup apiece, per
        entry: several queries per row, up to a page of 200. The distinct
        ids are collected first and each set is fetched with one `id__in`
        filter; an empty set costs no query. This is the one place that
        decides what an inbox row may show about the things it points at,
        so an access rule for those lookups belongs here, not in the route.
        """
        from app.oxyde_models.document import OxydeDocument
        from app.oxyde_models.issue import OxydeIssue

        issue_ids = sorted({e.issue_id for e in entries if e.issue_id})
        document_ids = sorted({e.document_id for e in entries if e.document_id})

        issues = {i.id: i for i in await OxydeIssue.objects.filter(id__in=issue_ids).all()} if issue_ids else {}
        documents = (
            {d.id: d for d in await OxydeDocument.objects.filter(id__in=document_ids).all()}
            if document_ids else {}
        )
        return issues, documents

    async def list_for_user(
        self, user_id: str, *, team_id: str | None = None,
        unread_only: bool = False, skip: int = 0, limit: int = 50,
    ) -> list[OxydeInboxEntry]:
        query = OxydeInboxEntry.objects.filter(
            recipient_user_id=user_id,
            team_id__in=await self.current_team_ids(user_id),
            archived_at=None,  # CHT-1316: archived entries leave the inbox
        )
        if team_id:
            query = query.filter(team_id=team_id)
        if unread_only:
            query = query.filter(read_at=None)
        return await query.order_by("-created_at").offset(skip).limit(limit).all()

    async def sync_for_user(
        self, user_id: str, *, since: tuple[datetime, str] | None, limit: int,
        team_ids: list[str] | None = None,
    ) -> list[OxydeInboxEntry]:
        """One page of the user's entries in (updated_at, id) order, after
        the position `since` (CHT-1607). Up to `limit` + 1 rows, so the
        caller can tell whether another page follows.

        With no position (a first sync) only open entries come back: a
        device that holds nothing needs no tombstones. After a position,
        archived and resolved entries come back too, so the device drops
        its copy. Scoped to the teams the user can read now, like every
        other read (CHT-1274); the caller hands back that team list so the
        device can drop entries from a team it lost.
        """
        if team_ids is None:
            team_ids = await self.current_team_ids(user_id)
        if not team_ids:
            return []
        # Raw because Oxyde has no ordering lookups (__gt) on a str column,
        # and the tie-break on id is what keeps a bulk update (mark-all-read,
        # a resolve), which stamps many rows with one instant, from losing
        # rows at a page boundary. Datetimes bind as the same text Oxyde
        # stores, so they compare in time order.
        sql = (
            "SELECT id FROM inbox_entries WHERE recipient_user_id = ? "
            f"AND team_id IN ({', '.join('?' for _ in team_ids)}) "
        )
        params: list = [user_id, *team_ids]
        if since is None:
            sql += "AND archived_at IS NULL AND resolved_at IS NULL "
        else:
            at, row_id = since
            sql += "AND (updated_at > ? OR (updated_at = ? AND id > ?)) "
            params += [at, at, row_id]
        sql += "ORDER BY updated_at, id LIMIT ?"
        params.append(limit + 1)
        ids = [row["id"] for row in await execute_raw(sql, params)]
        if not ids:
            return []
        rows = {e.id: e for e in await OxydeInboxEntry.objects.filter(id__in=ids).all()}
        return [rows[i] for i in ids if i in rows]

    async def admin_team_ids(self, user_id: str, team_ids: set[str]) -> set[str]:
        """Which of `team_ids` the user is an OWNER or ADMIN of now: the
        teams where a gate or review entry may offer approve and reject
        (CHT-1607). One query for the whole page, mirroring
        TeamService.is_team_admin, which the ritual endpoints check."""
        if not team_ids:
            return set()
        from app.oxyde_models.team import OxydeTeamMember

        members = await OxydeTeamMember.objects.filter(
            user_id=user_id, team_id__in=sorted(team_ids),
        ).all()
        return {m.team_id for m in members if m.role in (TeamRole.OWNER, TeamRole.ADMIN)}

    async def unread_count(self, user_id: str, *, team_id: str | None = None) -> int:
        query = OxydeInboxEntry.objects.filter(
            recipient_user_id=user_id, read_at=None,
            archived_at=None,  # CHT-1316: archived entries don't count
            team_id__in=await self.current_team_ids(user_id),
        )
        if team_id:
            query = query.filter(team_id=team_id)
        return await query.count()

    async def get_by_id(self, entry_id: str) -> OxydeInboxEntry | None:
        return await OxydeInboxEntry.objects.get_or_none(id=entry_id)

    async def mark_read(self, entry: OxydeInboxEntry) -> OxydeInboxEntry:
        if entry.read_at is None:
            entry.read_at = entry.updated_at = datetime.now(timezone.utc)
            await entry.save(update_fields={"read_at", "updated_at"})
        return entry

    async def archive(self, entry: OxydeInboxEntry) -> OxydeInboxEntry:
        """Archive an entry (CHT-1316): it leaves the inbox list + unread
        count. Archiving implies handled, so also mark it read if it wasn't."""
        if entry.archived_at is None:
            now = datetime.now(timezone.utc)
            entry.archived_at = entry.updated_at = now
            fields = {"archived_at", "updated_at"}
            if entry.read_at is None:
                entry.read_at = now
                fields.add("read_at")
            await entry.save(update_fields=fields)
        return entry

    async def mark_all_read(self, user_id: str, *, team_id: str | None = None) -> int:
        query = OxydeInboxEntry.objects.filter(
            recipient_user_id=user_id, read_at=None,
            team_id__in=await self.current_team_ids(user_id),
        )
        if team_id:
            query = query.filter(team_id=team_id)
        now = datetime.now(timezone.utc)
        return await query.update(read_at=now, updated_at=now)
