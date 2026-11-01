"""Uploaded profile pictures (CHT-1992).

A member uploads one image for themselves. It is checked by its bytes
(PNG, JPEG, WebP or GIF, by signature; never by the name or type the
client sent), capped at AVATAR_MAX_BYTES, and stored whole: the web app
shrinks a photo before sending it, so nothing here decodes an image.
The member's ``avatar_url`` then points at ``/api/avatars/{sha256}``.
"""
from __future__ import annotations

import base64
import hashlib
from datetime import datetime, timezone

from app.db.transactions import atomic
from app.oxyde_models.user import OxydeUser
from app.oxyde_models.user_avatar import OxydeUserAvatar

# Room for a 512 px photo; the web app sends far less (256 px WebP/JPEG).
AVATAR_MAX_BYTES = 256 * 1024
AVATAR_PATH = "/api/avatars/"


class AvatarRefused(ValueError):
    """Not an image this server stores; `error_code` says why."""

    def __init__(self, error_code: str, message: str):
        super().__init__(message)
        self.error_code = error_code


def sniff_image_type(data: bytes) -> str | None:
    """The content type `data` is by its signature, among the four
    stored; None for anything else (SVG, HTML, ...)."""
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return "image/png"
    if data.startswith(b"\xff\xd8\xff"):
        return "image/jpeg"
    if data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return "image/webp"
    if data[:6] in (b"GIF87a", b"GIF89a"):
        return "image/gif"
    return None


def avatar_url_for(sha256: str) -> str:
    return f"{AVATAR_PATH}{sha256}"


def is_uploaded_avatar_url(url: str | None) -> bool:
    return bool(url) and url.startswith(AVATAR_PATH)


class AvatarService:
    async def set(self, user: OxydeUser, data: bytes) -> OxydeUser:
        """Store `data` as `user`'s picture, replacing any earlier one, and
        point their avatar_url at it."""
        if not data:
            raise AvatarRefused("avatar_empty", "The file is empty.")
        if len(data) > AVATAR_MAX_BYTES:
            raise AvatarRefused(
                "avatar_too_large", f"A profile picture may be at most {AVATAR_MAX_BYTES // 1024} KB.",
            )
        content_type = sniff_image_type(data)
        if content_type is None:
            raise AvatarRefused("avatar_not_an_image", "A profile picture must be a PNG, JPEG, WebP or GIF image.")
        digest = hashlib.sha256(data).hexdigest()
        now = datetime.now(timezone.utc)
        fields = {
            "content_type": content_type, "data_b64": base64.b64encode(data).decode("ascii"),
            "sha256": digest, "updated_at": now,
        }
        # One transaction: two uploads at once (two tabs) serialise instead
        # of both creating the row, and the row and avatar_url never
        # disagree (PR #522 review).
        async with atomic():
            await OxydeUserAvatar.objects.filter(user_id=user.id).delete()
            await OxydeUserAvatar.objects.create(user_id=user.id, **fields)
            return await self._point(user, avatar_url_for(digest), now)

    async def clear(self, user: OxydeUser) -> OxydeUser:
        """Delete `user`'s uploaded picture. Their avatar_url is cleared
        only when it points at the upload: an emoji or URL they set
        since stays."""
        async with atomic():
            await OxydeUserAvatar.objects.filter(user_id=user.id).delete()
            if is_uploaded_avatar_url(user.avatar_url):
                return await self._point(user, None, datetime.now(timezone.utc))
        return user

    @staticmethod
    async def drop_unless_pointed(user_id: str, new_url: str | None) -> None:
        """An avatar_url was just set: delete the member's stored picture
        unless that is what it now points at, so a picture they moved
        off (to an emoji, a URL or nothing) is not still served with no
        way left to remove it (PR #522 review). It reads the row, not the
        old avatar_url, so an upload that landed meanwhile counts too;
        call it in the same transaction as the save."""
        row = await OxydeUserAvatar.objects.filter(user_id=user_id).first()
        if row is not None and new_url != avatar_url_for(row.sha256):
            await OxydeUserAvatar.objects.filter(user_id=user_id).delete()

    @staticmethod
    async def get(sha256: str) -> OxydeUserAvatar | None:
        return await OxydeUserAvatar.objects.filter(sha256=sha256).first()

    @staticmethod
    async def forget(user_ids: list[str]) -> None:
        """Delete the pictures of accounts being deleted."""
        if user_ids:
            await OxydeUserAvatar.objects.filter(user_id__in=user_ids).delete()

    @staticmethod
    async def _point(user: OxydeUser, url: str | None, now: datetime) -> OxydeUser:
        user.avatar_url = url
        user.updated_at = now
        await user.save(update_fields={"avatar_url", "updated_at"})
        await user.refresh()
        return user
