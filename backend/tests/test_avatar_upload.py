"""Uploaded profile pictures (CHT-1992)."""
import hashlib

import pytest

from app.oxyde_models.user_avatar import OxydeUserAvatar
from app.services.avatar_service import AVATAR_MAX_BYTES

PNG = b"\x89PNG\r\n\x1a\n" + b"\x00" * 64
JPEG = b"\xff\xd8\xff\xe0" + b"\x00" * 64
WEBP = b"RIFF\x00\x00\x00\x00WEBPVP8 " + b"\x00" * 64
GIF = b"GIF89a" + b"\x00" * 64


def _bearer(key):
    return {"Authorization": f"Bearer {key}"}


async def _upload(client, headers, data, content_type="image/png"):
    return await client.put(
        "/api/users/me/avatar", content=data, headers={**headers, "Content-Type": content_type},
    )


@pytest.mark.parametrize("data,kind", [(PNG, "image/png"), (JPEG, "image/jpeg"), (WEBP, "image/webp"), (GIF, "image/gif")])
async def test_upload_and_serve(client, auth_headers, data, kind):
    uploaded = await _upload(client, auth_headers, data, "application/octet-stream")

    assert uploaded.status_code == 200, uploaded.text
    url = uploaded.json()["avatar_url"]
    assert url == f"/api/avatars/{hashlib.sha256(data).hexdigest()}"
    served = await client.get(url)
    assert served.status_code == 200
    assert served.content == data
    assert served.headers["content-type"] == kind
    assert served.headers["x-content-type-options"] == "nosniff"
    # Private and short: a removed picture must stop being served.
    assert served.headers["cache-control"] == "private, max-age=3600"
    assert "sandbox" in served.headers["content-security-policy"]


@pytest.mark.parametrize("data", [b"", b"<svg xmlns='http://www.w3.org/2000/svg'/>", b"<html>hi</html>"])
async def test_only_images_are_stored(client, auth_headers, data):
    refused = await _upload(client, auth_headers, data, "image/png")

    assert refused.status_code == 422, refused.text
    assert await OxydeUserAvatar.objects.count() == 0


async def test_too_large_is_refused(client, auth_headers):
    refused = await _upload(client, auth_headers, PNG + b"\x00" * AVATAR_MAX_BYTES)

    assert refused.status_code == 413, refused.text
    assert refused.json()["detail"]["error_code"] == "avatar_too_large"


async def test_a_new_upload_replaces_the_old(client, auth_headers):
    first = (await _upload(client, auth_headers, PNG)).json()["avatar_url"]
    second = (await _upload(client, auth_headers, JPEG)).json()["avatar_url"]

    assert first != second
    assert (await client.get(first)).status_code == 404
    assert (await client.get(second)).status_code == 200
    assert await OxydeUserAvatar.objects.count() == 1


async def test_delete_clears_the_upload(client, auth_headers):
    url = (await _upload(client, auth_headers, PNG)).json()["avatar_url"]

    cleared = await client.delete("/api/users/me/avatar", headers=auth_headers)

    assert cleared.status_code == 200, cleared.text
    assert cleared.json()["avatar_url"] is None
    assert (await client.get(url)).status_code == 404


async def test_delete_keeps_an_emoji_set_since(client, auth_headers):
    await _upload(client, auth_headers, PNG)
    await client.patch("/api/users/me", json={"avatar_url": "🦉"}, headers=auth_headers)

    cleared = await client.delete("/api/users/me/avatar", headers=auth_headers)

    assert cleared.json()["avatar_url"] == "🦉"


async def test_an_agent_uploads_its_own(client, auth_headers, test_team):
    agent = (await client.post(f"/api/teams/{test_team.id}/agents", json={"name": "Owl"}, headers=auth_headers)).json()

    uploaded = await _upload(client, _bearer(agent["api_key"]), GIF)

    assert uploaded.status_code == 200, uploaded.text
    roster = (await client.get(f"/api/teams/{test_team.id}/roster", headers=auth_headers)).json()
    assert next(r for r in roster if r["user_id"] == agent["id"])["avatar_url"] == uploaded.json()["avatar_url"]


async def test_upload_needs_a_credential(client):
    assert (await _upload(client, {}, PNG)).status_code == 401


@pytest.mark.parametrize("sha", ["0" * 64, "not-a-hash", "A" * 64])
async def test_unknown_avatar_is_404(client, sha):
    assert (await client.get(f"/api/avatars/{sha}")).status_code == 404


async def test_deleting_an_agent_deletes_its_picture(client, auth_headers, test_team):
    agent = (await client.post(f"/api/teams/{test_team.id}/agents", json={"name": "Owl"}, headers=auth_headers)).json()
    await _upload(client, _bearer(agent["api_key"]), PNG)

    deleted = await client.delete(f"/api/agents/{agent['id']}", headers=auth_headers)

    assert deleted.status_code in (200, 204), deleted.text
    assert await OxydeUserAvatar.objects.count() == 0


async def test_deleting_an_account_deletes_its_picture(client, auth_headers):
    await _upload(client, auth_headers, PNG)

    deleted = await client.delete("/api/users/me", headers=auth_headers)

    assert deleted.status_code == 204, deleted.text
    assert await OxydeUserAvatar.objects.count() == 0


async def test_moving_avatar_url_off_the_upload_deletes_it(client, auth_headers):
    url = (await _upload(client, auth_headers, PNG)).json()["avatar_url"]

    await client.patch("/api/users/me", json={"tagline": "Still here"}, headers=auth_headers)
    assert (await client.get(url)).status_code == 200

    moved = await client.patch("/api/users/me", json={"avatar_url": "🦉"}, headers=auth_headers)

    assert moved.status_code == 200, moved.text
    assert (await client.get(url)).status_code == 404
    assert await OxydeUserAvatar.objects.count() == 0


async def test_an_owner_moving_an_agents_avatar_deletes_its_picture(client, auth_headers, test_team):
    agent = (await client.post(f"/api/teams/{test_team.id}/agents", json={"name": "Owl"}, headers=auth_headers)).json()
    url = (await _upload(client, _bearer(agent["api_key"]), PNG)).json()["avatar_url"]

    moved = await client.patch(f"/api/agents/{agent['id']}", json={"avatar_url": None}, headers=auth_headers)

    assert moved.status_code == 200, moved.text
    assert (await client.get(url)).status_code == 404


async def test_a_shared_picture_survives_one_owner_removing_theirs(client, auth_headers, auth_headers2):
    url = (await _upload(client, auth_headers, PNG)).json()["avatar_url"]
    assert (await _upload(client, auth_headers2, PNG)).json()["avatar_url"] == url

    await client.delete("/api/users/me/avatar", headers=auth_headers)

    assert (await client.get(url)).status_code == 200


async def test_deleting_an_account_deletes_its_agents_pictures(client, auth_headers, test_team, test_user2):
    from app.enums import TeamRole
    from app.oxyde_models.team import OxydeTeamMember

    # Another owner, so the account is not the team's only one.
    await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.OWNER)
    agent = (await client.post(f"/api/teams/{test_team.id}/agents", json={"name": "Owl"}, headers=auth_headers)).json()
    await _upload(client, _bearer(agent["api_key"]), GIF)

    deleted = await client.delete("/api/users/me", headers=auth_headers)

    assert deleted.status_code == 204, deleted.text
    assert await OxydeUserAvatar.objects.count() == 0
