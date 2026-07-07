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

from app.enums import ActivityType, InboxEntryKind, TeamRole
from app.oxyde_models.inbox import OxydeInboxEntry
from app.services.email_service import EmailService, fire_and_forget
from app.services.team_service import TeamService

logger = logging.getLogger(__name__)

# Matches the frontend's mention-autocomplete handle charset
# (frontend/src/mention-autocomplete.js: `@([a-zA-Z0-9._-]*)`), applied to
# committed text rather than a live-typing prefix.
_MENTION_RE = re.compile(r"(?:^|(?<=\s))@([a-zA-Z0-9._-]+)")


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
        try:
            from app.websocket import broadcast_inbox_event
            await broadcast_inbox_event(team_id, event_type, {
                "id": entry.id,
                "recipient_user_id": entry.recipient_user_id,
                "kind": entry.kind.name if hasattr(entry.kind, "name") else entry.kind,
                "issue_id": entry.issue_id,
                "document_id": entry.document_id,
                "ritual_id": entry.ritual_id,
            })
        except Exception:
            logger.exception("Failed to broadcast inbox event %s for entry=%s", event_type, entry.id)

    async def notify_gate_pending(self, *, ritual, issue, project, requested_by_name: str) -> None:
        """A GATE ritual just became blocking on `issue`. Fan out an
        inbox entry + email to every team admin.
        """
        admins = await self._team_admins(project.team_id)
        title = f"Gate pending: {ritual.name} on {issue.identifier}"
        email_svc = EmailService()
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
            await self._broadcast(project.team_id, "created", entry)

            recipient_email = getattr(member.user, "email", None) if member.user else None
            if recipient_email:
                self._dispatch_gate_pending_email(
                    to=recipient_email, issue=issue, ritual=ritual,
                    requested_by_name=requested_by_name, email_svc=email_svc,
                )

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

    async def notify_review_requested(self, *, ritual, issue, project, attested_by_name: str) -> None:
        """A REVIEW ritual was just attested on `issue` and needs admin
        approval. Fan out an inbox entry to every team admin. No email
        per CHT-1251 (email is gate-requests + invitations only).
        """
        admins = await self._team_admins(project.team_id)
        title = f"Review requested: {ritual.name} on {issue.identifier}"
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
            await self._broadcast(project.team_id, "created", entry)

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

    async def notify_mentions(
        self, *, content: str, team_id: str, author, issue=None, document=None,
    ) -> None:
        """Parse @handles out of `content`; write a MENTION entry for each
        resolved team member (excluding the author). Exactly one of
        issue/document should be given.
        """
        handles = {m.lower() for m in _MENTION_RE.findall(content or "")}
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
            await self._broadcast(team_id, "created", entry)

    async def resolve_gate_or_review(self, *, ritual_id: str, issue_id: str) -> int:
        """Mark every open GATE_PENDING/REVIEW_REQUESTED entry for this
        (ritual, issue) as read, for every recipient -- the underlying
        gate/review was just resolved, so it's no longer 'awaiting'
        anyone. Best-effort: called from a fail-soft try/except at the
        call site, same as the other post-resolution side effects there.
        """
        now = datetime.now(timezone.utc)
        return await OxydeInboxEntry.objects.filter(
            ritual_id=ritual_id, issue_id=issue_id, read_at=None,
            kind__in=[InboxEntryKind.GATE_PENDING.name, InboxEntryKind.REVIEW_REQUESTED.name],
        ).update(read_at=now)

    # ------------------------------------------------------------------
    # Readers
    # ------------------------------------------------------------------

    async def list_for_user(
        self, user_id: str, *, team_id: str | None = None,
        unread_only: bool = False, skip: int = 0, limit: int = 50,
    ) -> list[OxydeInboxEntry]:
        query = OxydeInboxEntry.objects.filter(recipient_user_id=user_id)
        if team_id:
            query = query.filter(team_id=team_id)
        if unread_only:
            query = query.filter(read_at=None)
        return await query.order_by("-created_at").offset(skip).limit(limit).all()

    async def unread_count(self, user_id: str, *, team_id: str | None = None) -> int:
        query = OxydeInboxEntry.objects.filter(recipient_user_id=user_id, read_at=None)
        if team_id:
            query = query.filter(team_id=team_id)
        return await query.count()

    async def get_by_id(self, entry_id: str) -> OxydeInboxEntry | None:
        return await OxydeInboxEntry.objects.get_or_none(id=entry_id)

    async def mark_read(self, entry: OxydeInboxEntry) -> OxydeInboxEntry:
        if entry.read_at is None:
            entry.read_at = datetime.now(timezone.utc)
            await entry.save(update_fields={"read_at"})
        return entry

    async def mark_all_read(self, user_id: str, *, team_id: str | None = None) -> int:
        query = OxydeInboxEntry.objects.filter(recipient_user_id=user_id, read_at=None)
        if team_id:
            query = query.filter(team_id=team_id)
        return await query.update(read_at=datetime.now(timezone.utc))
