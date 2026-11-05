"""Files attached to issues (CHT-1996): upload, list, download, delete.

What is stored and why is in ``app.services.attachment_service``. Every
route loads the issue (or the attachment, then its issue) through a
``visibility`` loader first, so an attachment on an issue the caller
cannot see answers exactly like a missing one. The bytes are served
only with a credential: there is no public or signed address.
"""
from typing import Annotated
from urllib.parse import quote

from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from fastapi.responses import FileResponse

from app.api.deps import CurrentUser
from app.api.idempotency import HEADER as IDEMPOTENCY_HEADER
from app.api.idempotency import IdempotentRoute, idempotent
from app.api.visibility import visible_attachment, visible_issue
from app.auth.access import reads, writes
from app.config import get_settings
from app.schemas.attachment import AttachmentResponse
from app.services.attachment_service import (
    MAX_FILENAME,
    RASTER_IMAGE_TYPES,
    TEXT_TYPE,
    AttachmentRefused,
    AttachmentService,
    attachment_url,
    too_large,
)
from app.services.issue_service import IssueService
from app.services.principals import fill_principals
from app.services.team_service import TeamService

# Routes under /issues/{issue_id}, and under /attachments/{attachment_id}.
issue_router = APIRouter(route_class=IdempotentRoute)
router = APIRouter()

# What a downloaded file may do once it is opened on its own: nothing. It
# cannot be sniffed into another type, load anything or run anything, and
# only this origin may embed it.
_DOWNLOAD_HEADERS = {
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy": "default-src 'none'; sandbox",
    "Cross-Origin-Resource-Policy": "same-origin",
    # Private: it is served only with a credential. An hour: a deleted
    # attachment stops being served, though a viewer may hold a copy.
    "Cache-Control": "private, max-age=3600",
}
# The query parameter is cut to MAX_FILENAME after cleaning; this bounds
# what is accepted at all.
_FILENAME_QUERY_MAX = 4 * MAX_FILENAME


def _refusal(refused: AttachmentRefused) -> HTTPException:
    return HTTPException(
        status_code=refused.status_code,
        detail={"error_code": refused.error_code, "message": str(refused)},
    )


async def _refuse_oversized_body(request: Request) -> None:
    """Before anything reads the body (the Idempotency-Key fingerprint
    reads it whole): refuse one whose declared length is over the limit,
    and a keyed one with no declared length, which could be any size.
    An undeclared length without a key is counted as it streams."""
    max_bytes = get_settings().attachment_max_bytes
    declared = request.headers.get("content-length")
    if declared is None:
        if request.headers.get(IDEMPOTENCY_HEADER) is not None:
            raise HTTPException(
                status_code=status.HTTP_411_LENGTH_REQUIRED,
                detail={
                    "error_code": "length_required",
                    "message": f"An upload with an {IDEMPOTENCY_HEADER} must declare its Content-Length.",
                },
            )
        return
    try:
        length = int(declared)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Content-Length") from None
    if length > max_bytes:
        raise _refusal(too_large(max_bytes))


async def _responses(attachments) -> list[AttachmentResponse]:
    return await fill_principals([
        AttachmentResponse(
            id=a.id, issue_id=a.issue_id, comment_id=a.comment_id, uploader_id=a.uploader_id,
            filename=a.filename, content_type=a.content_type, size=a.size, sha256=a.sha256,
            url=attachment_url(a.id), created_at=a.created_at,
        )
        for a in attachments
    ])


@issue_router.post(
    "/{issue_id}/attachments",
    response_model=AttachmentResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(_refuse_oversized_body)],
)
@writes
@idempotent
async def upload_attachment(
    issue_id: str,
    request: Request,
    current_user: CurrentUser,
    filename: Annotated[str | None, Query(max_length=_FILENAME_QUERY_MAX)] = None,
    comment_id: Annotated[str | None, Query()] = None,
) -> AttachmentResponse:
    """Attach a file to an issue: the raw bytes as the request body (not
    multipart), its display name in ``filename``. PNG, JPEG, GIF, WebP,
    PDF or UTF-8 plain text, recognised by its bytes (415 otherwise), at
    most 10 MiB (413 ``attachment_too_large``), within the project's
    quota (413 ``attachment_quota_exceeded``). ``comment_id`` names a
    comment of the caller's on this issue the file belongs to; without it the file is
    attached to the issue alone. Honours ``Idempotency-Key``: a resend
    stores the file once."""
    issue, project = await visible_issue(current_user, issue_id)
    if comment_id is not None:
        comment = await IssueService().get_comment_by_id(comment_id)
        if comment is None or comment.issue_id != issue.id:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Comment not found")
        # A file under someone else's comment would read as their evidence.
        if comment.author_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="Can only attach files to your own comments",
            )
    try:
        attachment = await AttachmentService().upload(
            issue=issue, project_id=project.id, uploader_id=current_user.id,
            chunks=request.stream(), filename=filename, comment_id=comment_id,
        )
    except AttachmentRefused as refused:
        raise _refusal(refused) from refused
    (response,) = await _responses([attachment])
    return response


@issue_router.get("/{issue_id}/attachments", response_model=list[AttachmentResponse])
@reads
async def list_attachments(issue_id: str, current_user: CurrentUser) -> list[AttachmentResponse]:
    """The files attached to an issue, oldest first."""
    issue, _project = await visible_issue(current_user, issue_id)
    return await _responses(await AttachmentService.list_for_issue(issue.id))


def _content_disposition(disposition: str, filename: str) -> str:
    """``filename`` for the header (RFC 6266 and RFC 5987): an ASCII
    fallback with nothing that could end the quoted string, and the
    exact name percent-encoded as UTF-8."""
    fallback = "".join(ch if 0x20 <= ord(ch) < 0x7F and ch not in '"\\' else "_" for ch in filename)
    return f"{disposition}; filename=\"{fallback}\"; filename*=UTF-8''{quote(filename, safe='')}"


@router.get("/{attachment_id}/content", response_class=FileResponse)
@reads
async def download_attachment(attachment_id: str, current_user: CurrentUser) -> FileResponse:
    """An attachment's bytes. Raster images are served ``inline``, so a
    page that fetched them can show them; anything else as an
    ``attachment`` to save. 410 ``attachment_blob_missing`` when the row
    is there but its file is not (a database restored without its
    attachments)."""
    attachment, _issue, _project = await visible_attachment(current_user, attachment_id)
    service = AttachmentService()
    path = service.store.path_for(attachment.sha256)
    if not path.is_file():
        raise HTTPException(
            status_code=status.HTTP_410_GONE,
            detail={
                "error_code": "attachment_blob_missing",
                "message": "This attachment's file is no longer stored on the server.",
            },
        )
    inline = attachment.content_type in RASTER_IMAGE_TYPES
    media_type = f"{TEXT_TYPE}; charset=utf-8" if attachment.content_type == TEXT_TYPE else attachment.content_type
    headers = {
        **_DOWNLOAD_HEADERS,
        "Content-Disposition": _content_disposition("inline" if inline else "attachment", attachment.filename),
    }
    return FileResponse(path, media_type=media_type, headers=headers)


@router.delete("/{attachment_id}", status_code=status.HTTP_204_NO_CONTENT)
@writes
async def delete_attachment(attachment_id: str, current_user: CurrentUser) -> None:
    """Delete an attachment: its uploader or a team admin may. Comments
    that link to it then show a broken image."""
    attachment, _issue, project = await visible_attachment(current_user, attachment_id)
    if attachment.uploader_id != current_user.id and not await TeamService().is_team_admin(
        project.team_id, current_user.id,
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the uploader or a team admin can delete an attachment",
        )
    await AttachmentService.delete(attachment)
