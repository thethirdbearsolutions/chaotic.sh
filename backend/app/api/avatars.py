"""Serving uploaded profile pictures (CHT-1992)."""
import base64
import re

from fastapi import APIRouter, HTTPException, Response

from app.services.avatar_service import AvatarService

router = APIRouter()

_SHA256 = re.compile(r"[0-9a-f]{64}")
# An image is all this answer may be: no sniffing it into something
# else, nothing it could load or run if opened on its own.
_HEADERS = {
    # Private and short: a picture its owner removed must stop being
    # served, which a shared or year-long cache would defeat.
    "Cache-Control": "private, max-age=3600",
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy": "default-src 'none'; img-src 'self'; style-src 'unsafe-inline'; sandbox",
    "Cross-Origin-Resource-Policy": "same-origin",
}


@router.get("/{sha256}", response_class=Response)
async def get_avatar(sha256: str) -> Response:
    """An uploaded profile picture, by its sha256. No credential: an
    `<img>` sends none, and the address is the image's own hash, which
    only someone shown a member's avatar_url knows. Cached privately for
    an hour, so a removed picture stops showing soon. Unknown answers 404."""
    if not _SHA256.fullmatch(sha256):
        raise HTTPException(status_code=404, detail="Not found")
    avatar = await AvatarService.get(sha256)
    if avatar is None:
        raise HTTPException(status_code=404, detail="Not found")
    return Response(content=base64.b64decode(avatar.data_b64), media_type=avatar.content_type, headers=_HEADERS)
