"""Serving uploaded profile pictures (CHT-1992), and storing one from a
request body for the routes that upload one (CHT-2045)."""
import base64
import re
from collections.abc import AsyncIterator

from fastapi import APIRouter, HTTPException, Response

from app.oxyde_models.user import OxydeUser
from app.services.avatar_service import AVATAR_MAX_BYTES, AvatarRefused, AvatarService

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


async def store_avatar(user: OxydeUser, chunks: AsyncIterator[bytes]) -> None:
    """Read an uploaded picture from `chunks` (a request body) and store
    it as `user`'s (the row is updated in place), for ``PUT /users/me/avatar`` and
    ``PUT /agents/{id}/avatar``. Reading stops just past the cap, so an
    oversized body is refused without being read whole: 413
    ``avatar_too_large``, else 422 with the refusal's error_code."""
    data = bytearray()
    async for chunk in chunks:
        data.extend(chunk)
        if len(data) > AVATAR_MAX_BYTES:
            break  # refused below; no need to read the rest
    try:
        await AvatarService().set(user, bytes(data))
    except AvatarRefused as refused:
        code = 413 if refused.error_code == "avatar_too_large" else 422
        raise HTTPException(
            status_code=code, detail={"error_code": refused.error_code, "message": str(refused)},
        ) from refused
