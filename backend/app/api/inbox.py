"""Inbox API routes (CHT-1250)."""
from fastapi import APIRouter, HTTPException, Query, status

from app.api.deps import CurrentUser
from app.schemas.inbox import InboxEntryResponse, MarkAllReadResponse, UnreadCountResponse
from app.services.inbox_service import InboxService
from app.services.issue_service import IssueService
from app.services.document_service import DocumentService
from app.services.user_service import UserService
from app.websocket import broadcast_inbox_event

router = APIRouter()


async def _build_response(entry) -> InboxEntryResponse:
    """Fill in display fields (issue identifier, document title, source
    user name) that aren't stored on the entry itself.
    """
    issue_identifier = None
    if entry.issue_id:
        issue = await IssueService().get_by_id(entry.issue_id)
        issue_identifier = issue.identifier if issue else None

    document_title = None
    if entry.document_id:
        document = await DocumentService().get_by_id(entry.document_id)
        document_title = document.title if document else None

    source_user_name = None
    if entry.source_user_id:
        source_user = await UserService().get_by_id(entry.source_user_id)
        source_user_name = source_user.name if source_user else None

    return InboxEntryResponse(
        id=entry.id,
        recipient_user_id=entry.recipient_user_id,
        kind=entry.kind,
        team_id=entry.team_id,
        project_id=entry.project_id,
        issue_id=entry.issue_id,
        issue_identifier=issue_identifier,
        document_id=entry.document_id,
        document_title=document_title,
        ritual_id=entry.ritual_id,
        source_user_id=entry.source_user_id,
        source_user_name=source_user_name,
        title=entry.title,
        body=entry.body,
        created_at=entry.created_at,
        read_at=entry.read_at,
    )


@router.get("", response_model=list[InboxEntryResponse])
async def list_inbox(
    current_user: CurrentUser,
    team_id: str | None = None,
    unread: bool = False,
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50, ge=1, le=200),
):
    """List the current user's inbox entries, newest first."""
    entries = await InboxService().list_for_user(
        current_user.id, team_id=team_id, unread_only=unread, skip=skip, limit=limit,
    )
    return [await _build_response(e) for e in entries]


@router.get("/unread-count", response_model=UnreadCountResponse)
async def get_unread_count(current_user: CurrentUser, team_id: str | None = None):
    """Unread count for the current user (sidebar badge)."""
    count = await InboxService().unread_count(current_user.id, team_id=team_id)
    return UnreadCountResponse(unread_count=count)


@router.post("/{entry_id}/read", response_model=InboxEntryResponse)
async def mark_inbox_read(entry_id: str, current_user: CurrentUser):
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
    return await _build_response(entry)


@router.post("/mark-all-read", response_model=MarkAllReadResponse)
async def mark_all_inbox_read(current_user: CurrentUser, team_id: str | None = None):
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
