"""Inbox API routes (CHT-1250)."""
import math
from typing import Annotated

from fastapi import APIRouter, HTTPException, Query, status

from datetime import datetime, timedelta, timezone

from app.auth.access import Access, is_registrar, reads, scopes_permit, writes
from app.api.deps import CurrentPrincipal, CurrentUser
from app.enums import InboxActionKind, InboxActionNote, InboxEntryKind, InboxEntryState
from app.schemas.inbox import (
    InboxEntryAction,
    InboxEntryResponse,
    InboxSyncResponse,
    MarkAllReadResponse,
    UnreadCountResponse,
)
from app.oxyde_models.inbox import OxydeInboxEntry
from app.services.inbox_service import InboxService
from app.services.principals import load_principals
from app.utils.sync_cursor import InvalidCursorError, SyncPosition, decode_cursor, encode_cursor, teams_digest
from app.websocket import broadcast_inbox_event

router = APIRouter()

# How far behind "now" a sync cursor stays (CHT-1622). updated_at is
# stamped before the write commits, so a row can become visible with a
# timestamp older than rows a sync already saw. A cursor never points
# past now minus this lag, so such a row (committed within the lag) is
# still after the cursor. Rows newer than the lag are sent anyway; they
# come again on the next sync, and the client upserts by id.
#
# 30 s, well clear of how long a write can sit between its stamp and its
# commit: SQLite's busy_timeout is 5000 ms, so a writer can wait that long
# for the lock alone after stamping (PR #355 re-review, R2). The cost of a
# longer lag is only that recent rows are sent twice.
SYNC_SAFETY_LAG = timedelta(seconds=30)


def _may_write(principal) -> bool:
    """Whether this credential may make the calls an action names: they
    are all @writes. A read-scoped OAuth token or a registrar gets none
    (PR #355 review, finding 5)."""
    return scopes_permit(principal.scopes, Access.WRITE) and not is_registrar(principal.user)


def _state(entry: OxydeInboxEntry) -> InboxEntryState:
    """Archived wins over resolved: the recipient's own choice is the
    more specific fact, and either way the device drops the entry."""
    if entry.archived_at is not None:
        return InboxEntryState.ARCHIVED
    if entry.resolved_at is not None:
        return InboxEntryState.RESOLVED
    return InboxEntryState.OPEN


# The approve call for each entry kind that waits on a human decision, and
# whether it takes a note. A GATE is completed; a REVIEW attestation is
# approved. Both are rejected the same way, with a required note (CHT-1606).
_APPROVE = {
    InboxEntryKind.GATE_PENDING: ("complete-issue", InboxActionNote.OPTIONAL),
    InboxEntryKind.REVIEW_REQUESTED: ("approve-issue", InboxActionNote.NONE),
}


def _actions(
    entry: OxydeInboxEntry, state: InboxEntryState, *, can_decide: bool,
) -> list[InboxEntryAction]:
    """The calls the recipient can make on this entry (CHT-1607). A
    tombstone offers none. Approve and reject appear only on an open gate
    or review entry, and only when the recipient may decide it now: a
    human who is still an admin of the entry's team, the same check the
    ritual endpoints make. Any of these calls can still fail if the world
    moved since (most usefully the 409 naming who already decided). A
    resolved entry offers archive only; an archived one nothing."""
    if state == InboxEntryState.ARCHIVED:
        return []
    if state == InboxEntryState.RESOLVED:
        # Still listed by GET /inbox until archived; nothing else to do.
        return [InboxEntryAction(kind=InboxActionKind.ARCHIVE, path=f"/api/inbox/{entry.id}/archive")]
    actions = []
    approve = _APPROVE.get(entry.kind)
    if approve and can_decide and entry.ritual_id and entry.issue_id:
        segment, note = approve
        base = f"/api/rituals/{entry.ritual_id}"
        actions.append(InboxEntryAction(
            kind=InboxActionKind.APPROVE, path=f"{base}/{segment}/{entry.issue_id}", note=note,
        ))
        actions.append(InboxEntryAction(
            kind=InboxActionKind.REJECT, path=f"{base}/reject-issue/{entry.issue_id}",
            note=InboxActionNote.REQUIRED,
        ))
    if entry.read_at is None:
        actions.append(InboxEntryAction(kind=InboxActionKind.MARK_READ, path=f"/api/inbox/{entry.id}/read"))
    actions.append(InboxEntryAction(kind=InboxActionKind.ARCHIVE, path=f"/api/inbox/{entry.id}/archive"))
    return actions


async def _build_responses(
    entries: list[OxydeInboxEntry], viewer, *, may_write: bool,
) -> list[InboxEntryResponse]:
    """Fill in display fields (issue identifier, document title, source
    user) that aren't stored on the entry itself, and each entry's state
    and actions for `viewer`, who is the entries' recipient (none at all
    unless the credential `may_write`). A fixed
    number of queries for the whole page, not several per entry:
    InboxService resolves the referents in bulk (CHT-1399), the source
    users are principal summaries loaded in one batch (CHT-1500), and the
    admin check is one query (CHT-1607)."""
    inbox_service = InboxService()
    issues, documents = await inbox_service.resolve_display_fields(entries)
    principals = await load_principals(e.source_user_id for e in entries)
    decide_teams: set[str] = set()
    if may_write and not viewer.is_agent:
        decide_teams = await inbox_service.admin_team_ids(viewer.id, {
            e.team_id for e in entries
            if e.kind in _APPROVE and e.recipient_user_id == viewer.id
        })

    def one(entry: OxydeInboxEntry) -> InboxEntryResponse:
        state = _state(entry)
        issue = issues.get(entry.issue_id) if entry.issue_id else None
        document = documents.get(entry.document_id) if entry.document_id else None
        source_user = principals.get(entry.source_user_id) if entry.source_user_id else None
        return InboxEntryResponse(
            id=entry.id,
            recipient_user_id=entry.recipient_user_id,
            kind=entry.kind,
            team_id=entry.team_id,
            project_id=entry.project_id,
            issue_id=entry.issue_id,
            issue_identifier=issue.identifier if issue else None,
            document_id=entry.document_id,
            document_title=document.title if document else None,
            ritual_id=entry.ritual_id,
            source_user_id=entry.source_user_id,
            source_user_name=source_user.name if source_user else None,
            source_user=source_user,
            title=entry.title,
            body=entry.body,
            created_at=entry.created_at,
            read_at=entry.read_at,
            archived_at=entry.archived_at,
            resolved_at=entry.resolved_at,
            updated_at=entry.updated_at,
            state=state,
            actions=_actions(
                entry, state,
                can_decide=entry.recipient_user_id == viewer.id and entry.team_id in decide_teams,
            ) if may_write else [],
        )

    return [one(e) for e in entries]


async def _build_response(entry: OxydeInboxEntry, viewer, principal) -> InboxEntryResponse:
    return (await _build_responses([entry], viewer, may_write=_may_write(principal)))[0]


@router.get("", response_model=list[InboxEntryResponse])
@reads
async def list_inbox(
    current_user: CurrentUser,
    principal: CurrentPrincipal,
    team_id: str | None = None,
    unread: bool = False,
    skip: Annotated[int, Query(ge=0)] = 0,
    limit: Annotated[int, Query(ge=1, le=200)] = 50,
) -> list[InboxEntryResponse]:
    """List the current user's inbox entries, newest first."""
    entries = await InboxService().list_for_user(
        current_user.id, team_id=team_id, unread_only=unread, skip=skip, limit=limit,
    )
    return await _build_responses(entries, current_user, may_write=_may_write(principal))


@router.get("/sync", response_model=InboxSyncResponse)
@reads
async def sync_inbox(
    current_user: CurrentUser,
    principal: CurrentPrincipal,
    since: Annotated[str | None, Query(
        description="The next_cursor of the previous sync. Omit for a first sync.",
    )] = None,
    limit: Annotated[int, Query(ge=1, le=500)] = 200,
) -> InboxSyncResponse:
    """Incremental inbox sync for an offline client (CHT-1607).

    Across every team the user can read. Without `since`, the open entries
    (read or not); with it, every entry created or changed after it, where
    archived and resolved ones come back as tombstones (`state`) for the
    device to drop. Ordered oldest change first. Each entry carries the
    one-call `actions` its recipient can take. See InboxSyncResponse for
    the client contract (`reset`, `team_ids`, repeats).
    """
    position: SyncPosition | None = None
    if since is not None:
        try:
            position = decode_cursor(since)
        except InvalidCursorError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={
                    "error_code": "invalid_cursor",
                    "message": "The since cursor is not one this server issued. Sync again without it.",
                },
            )
    inbox_service = InboxService()
    team_ids = await inbox_service.current_team_ids(current_user.id)

    # The caller's teams changed since the cursor was issued. A team it
    # joined (or rejoined after the device dropped its entries) has
    # entries behind the cursor the device never got or threw away. Start
    # over: a first sync, with reset set so the client clears its cache
    # (review finding 3). The cursor holds only a digest of the team set,
    # so a team left resets too; that costs one full sync and is rare.
    reset = position is not None and position.teams_digest != teams_digest(team_ids)
    if reset:
        position = None

    rows = await inbox_service.sync_for_user(
        current_user.id,
        since=(position.updated_at, position.id) if position else None,
        limit=limit, team_ids=team_ids,
    )
    has_more = len(rows) > limit
    rows = rows[:limit]

    # Where the next sync starts: after the last row sent, but never past
    # the safety lag (CHT-1622), and never before where this one started.
    # When the lag holds the cursor back, has_more is false so a client
    # does not spin on the same page; it comes back on its next poll.
    if rows:
        at, row_id = rows[-1].updated_at, rows[-1].id
    elif position is not None:
        at, row_id = position.updated_at, position.id
    else:
        at = row_id = None
    retry_after = None
    if at is not None:
        watermark = datetime.now(timezone.utc) - SYNC_SAFETY_LAG
        if at > watermark:
            has_more = False
            if rows:
                # When the newest row sent passes the watermark, the next
                # sync can move the cursor past it (re-review, R3).
                retry_after = max(1, math.ceil((at - watermark).total_seconds()))
            if position is not None and position.updated_at >= watermark:
                at, row_id = position.updated_at, position.id
            else:
                at, row_id = watermark, ""
    next_cursor = encode_cursor(at, row_id, teams=team_ids) if at is not None else None

    return InboxSyncResponse(
        entries=await _build_responses(rows, current_user, may_write=_may_write(principal)),
        next_cursor=next_cursor,
        has_more=has_more,
        retry_after=retry_after,
        reset=reset,
        team_ids=sorted(team_ids),
    )


@router.get("/unread-count", response_model=UnreadCountResponse)
@reads
async def get_unread_count(current_user: CurrentUser, team_id: str | None = None):
    """Unread count for the current user (sidebar badge)."""
    count = await InboxService().unread_count(current_user.id, team_id=team_id)
    return UnreadCountResponse(unread_count=count)


@router.post("/{entry_id}/read", response_model=InboxEntryResponse)
@writes
async def mark_inbox_read(
    entry_id: str, current_user: CurrentUser, principal: CurrentPrincipal,
) -> InboxEntryResponse:
    """Mark a single inbox entry as read."""
    inbox_service = InboxService()
    entry = await inbox_service.get_by_id(entry_id)
    if not entry:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inbox entry not found")
    if entry.recipient_user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not your inbox entry")
    # A removed team member must not read/re-fetch entries from a team they've
    # left (CHT-1274) — scope the single-entry read to current membership too,
    # mirroring the list/count paths. 404 (not 403) so it's indistinguishable
    # from a nonexistent entry.
    if not await inbox_service.is_member_of_entry_team(current_user.id, entry):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inbox entry not found")

    entry = await inbox_service.mark_read(entry)
    try:
        await broadcast_inbox_event(entry.team_id, "read", {
            "id": entry.id, "recipient_user_id": entry.recipient_user_id,
        })
    except Exception:
        pass
    return await _build_response(entry, current_user, principal)


@router.post("/{entry_id}/archive", response_model=InboxEntryResponse)
@writes
async def archive_inbox_entry(
    entry_id: str, current_user: CurrentUser, principal: CurrentPrincipal,
) -> InboxEntryResponse:
    """Archive a single inbox entry (CHT-1316): it leaves the list + badge.

    Same ownership + team-membership guards as the read endpoint (a removed
    member can't touch entries from a team they've left, CHT-1274); 404 (not
    403) keeps a foreign/nonexistent entry indistinguishable.
    """
    inbox_service = InboxService()
    entry = await inbox_service.get_by_id(entry_id)
    if not entry:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inbox entry not found")
    if entry.recipient_user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not your inbox entry")
    if not await inbox_service.is_member_of_entry_team(current_user.id, entry):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inbox entry not found")

    entry = await inbox_service.archive(entry)
    try:
        await broadcast_inbox_event(entry.team_id, "archived", {
            "id": entry.id, "recipient_user_id": entry.recipient_user_id,
        })
    except Exception:
        pass
    return await _build_response(entry, current_user, principal)


@router.post("/mark-all-read", response_model=MarkAllReadResponse)
@writes
async def mark_all_inbox_read(current_user: CurrentUser, team_id: str | None = None) -> MarkAllReadResponse:
    """Mark every unread inbox entry for the current user as read."""
    marked = await InboxService().mark_all_read(current_user.id, team_id=team_id)
    if marked and team_id:
        try:
            await broadcast_inbox_event(team_id, "read-all", {
                "recipient_user_id": current_user.id, "marked_count": marked,
            })
        except Exception:
            pass
    return MarkAllReadResponse(marked_count=marked)
