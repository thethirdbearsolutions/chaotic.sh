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


async def test_a_patch_keeping_the_upload_url_keeps_the_picture(client, auth_headers):
    url = (await _upload(client, auth_headers, PNG)).json()["avatar_url"]

    kept = await client.patch("/api/users/me", json={"avatar_url": url}, headers=auth_headers)

    assert kept.status_code == 200, kept.text
    assert (await client.get(url)).status_code == 200


# -- An agent's picture, by itself, its owner, or its registrar (CHT-2045) --

REF = "harness:session:00000000-0000-0000-0000-00000000a045"


async def _agent(client, headers, team_id, **body):
    created = await client.post(f"/api/teams/{team_id}/agents", json={"name": "Owl", **body}, headers=headers)
    assert created.status_code == 201, created.text
    return created.json()


async def _identity(client, auth_headers, team_id):
    """A registrar the team's owner made, and a session identity it
    registered: (registrar key, identity id, identity key)."""
    registrar = await _agent(client, auth_headers, team_id, name="Harness", can_register=True)
    registered = await client.post(
        "/api/agents/register", json={"external_ref": REF, "name": "Session one"},
        headers=_bearer(registrar["api_key"]),
    )
    assert registered.status_code in (200, 201), registered.text
    body = registered.json()
    return registrar["api_key"], body["agent"]["id"], body["api_key"]


async def _upload_for(client, headers, agent_id, data):
    return await client.put(
        f"/api/agents/{agent_id}/avatar", content=data, headers={**headers, "Content-Type": "image/png"},
    )


async def _roster_avatar(client, headers, team_id, user_id):
    roster = (await client.get(f"/api/teams/{team_id}/roster", headers=headers)).json()
    return next(r for r in roster if r["user_id"] == user_id)["avatar_url"]


async def test_an_owner_uploads_a_picture_for_their_agent(client, auth_headers, test_team):
    agent = await _agent(client, auth_headers, test_team.id)

    uploaded = await _upload_for(client, auth_headers, agent["id"], PNG)

    assert uploaded.status_code == 200, uploaded.text
    url = uploaded.json()["avatar_url"]
    assert url == f"/api/avatars/{hashlib.sha256(PNG).hexdigest()}"
    assert uploaded.json()["id"] == agent["id"]
    assert (await client.get(url)).content == PNG
    # Everywhere the agent shows: the agent row, the roster, the user lookup.
    assert (await client.get(f"/api/agents/{agent['id']}", headers=auth_headers)).json()["avatar_url"] == url
    assert await _roster_avatar(client, auth_headers, test_team.id, agent["id"]) == url
    assert (await client.get(f"/api/users/{agent['id']}", headers=auth_headers)).json()["avatar_url"] == url


async def test_an_owner_removes_their_agents_picture(client, auth_headers, test_team):
    agent = await _agent(client, auth_headers, test_team.id)
    url = (await _upload_for(client, auth_headers, agent["id"], PNG)).json()["avatar_url"]

    cleared = await client.delete(f"/api/agents/{agent['id']}/avatar", headers=auth_headers)

    assert cleared.status_code == 200, cleared.text
    assert cleared.json()["avatar_url"] is None
    assert (await client.get(url)).status_code == 404


async def test_removing_keeps_an_agents_emoji(client, auth_headers, test_team):
    agent = await _agent(client, auth_headers, test_team.id, avatar_url="🦉")

    cleared = await client.delete(f"/api/agents/{agent['id']}/avatar", headers=auth_headers)

    assert cleared.status_code == 200, cleared.text
    assert cleared.json()["avatar_url"] == "🦉"


async def test_an_agent_uploads_its_own_through_the_agent_route(client, auth_headers, test_team):
    agent = await _agent(client, auth_headers, test_team.id)

    uploaded = await _upload_for(client, _bearer(agent["api_key"]), agent["id"], JPEG)

    assert uploaded.status_code == 200, uploaded.text
    assert uploaded.json()["avatar_url"].endswith(hashlib.sha256(JPEG).hexdigest())


async def test_the_agent_route_has_the_same_limits(client, auth_headers, test_team):
    agent = await _agent(client, auth_headers, test_team.id)

    too_big = await _upload_for(client, auth_headers, agent["id"], PNG + b"\x00" * AVATAR_MAX_BYTES)
    not_image = await _upload_for(client, auth_headers, agent["id"], b"<svg/>")

    assert too_big.status_code == 413, too_big.text
    assert too_big.json()["detail"]["error_code"] == "avatar_too_large"
    assert not_image.status_code == 422, not_image.text
    assert not_image.json()["detail"]["error_code"] == "avatar_not_an_image"
    assert await OxydeUserAvatar.objects.count() == 0


async def test_a_teammate_who_is_not_the_owner_is_refused(client, auth_headers, auth_headers2, test_team, test_user2):
    from app.enums import TeamRole
    from app.oxyde_models.team import OxydeTeamMember

    await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
    agent = await _agent(client, auth_headers, test_team.id)

    refused = await _upload_for(client, auth_headers2, agent["id"], PNG)
    refused_delete = await client.delete(f"/api/agents/{agent['id']}/avatar", headers=auth_headers2)

    assert refused.status_code == 403, refused.text
    assert refused_delete.status_code == 403, refused_delete.text
    assert await OxydeUserAvatar.objects.count() == 0


async def test_a_team_admin_may(client, auth_headers, auth_headers2, test_team, test_user2):
    from app.enums import TeamRole
    from app.oxyde_models.team import OxydeTeamMember

    await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.ADMIN)
    agent = await _agent(client, auth_headers, test_team.id)

    uploaded = await _upload_for(client, auth_headers2, agent["id"], PNG)

    assert uploaded.status_code == 200, uploaded.text


async def test_someone_outside_the_team_gets_the_missing_agents_404(client, auth_headers, auth_headers2, test_team):
    agent = await _agent(client, auth_headers, test_team.id)

    hidden = await _upload_for(client, auth_headers2, agent["id"], PNG)
    missing = await _upload_for(client, auth_headers2, "no-such-agent", PNG)

    assert hidden.status_code == missing.status_code == 404
    assert hidden.json() == missing.json()


async def test_a_project_agent_sets_its_own_but_not_a_siblings(client, auth_headers, test_team, test_project):
    from app.oxyde_models.project import OxydeProject

    sibling_project = await OxydeProject.objects.create(team_id=test_team.id, name="Sibling", key="SIBA")
    mine = (await client.post(
        f"/api/projects/{test_project.id}/agents", json={"name": "Owl"}, headers=auth_headers,
    )).json()
    sibling = (await client.post(
        f"/api/projects/{sibling_project.id}/agents", json={"name": "Lark"}, headers=auth_headers,
    )).json()

    own = await _upload_for(client, _bearer(mine["api_key"]), mine["id"], PNG)
    theirs = await _upload_for(client, _bearer(mine["api_key"]), sibling["id"], PNG)
    back = await _upload_for(client, _bearer(sibling["api_key"]), mine["id"], JPEG)

    assert own.status_code == 200, own.text
    assert theirs.status_code == 403, theirs.text
    assert back.status_code == 403, back.text
    assert await OxydeUserAvatar.objects.count() == 1


async def test_a_creator_who_left_the_team_gets_the_missing_agents_404(
    client, auth_headers, auth_headers2, test_team, test_user2,
):
    from app.enums import TeamRole
    from app.oxyde_models.team import OxydeTeamMember

    member = await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
    agent = await _agent(client, auth_headers2, test_team.id)
    assert (await _upload_for(client, auth_headers2, agent["id"], PNG)).status_code == 200
    await member.delete()

    hidden = await _upload_for(client, auth_headers2, agent["id"], JPEG)
    hidden_delete = await client.delete(f"/api/agents/{agent['id']}/avatar", headers=auth_headers2)
    missing = await _upload_for(client, auth_headers2, "no-such-agent", JPEG)

    assert hidden.status_code == hidden_delete.status_code == missing.status_code == 404
    assert hidden.json() == hidden_delete.json() == missing.json()


async def test_replacing_an_agents_picture_keeps_one_row(client, auth_headers, test_team):
    agent = await _agent(client, auth_headers, test_team.id)
    first = (await _upload_for(client, auth_headers, agent["id"], PNG)).json()["avatar_url"]

    second = (await _upload_for(client, _bearer(agent["api_key"]), agent["id"], GIF)).json()["avatar_url"]

    assert first != second
    assert await OxydeUserAvatar.objects.filter(user_id=agent["id"]).count() == 1
    assert (await client.get(first)).status_code == 404
    assert (await client.get(second)).content == GIF


async def test_another_agent_is_refused(client, auth_headers, test_team):
    agent = await _agent(client, auth_headers, test_team.id)
    other = await _agent(client, auth_headers, test_team.id, name="Lark")

    refused = await _upload_for(client, _bearer(other["api_key"]), agent["id"], PNG)

    assert refused.status_code == 403, refused.text


async def test_a_registered_identity_sets_its_own_picture_and_bio(client, auth_headers, test_team):
    _registrar_key, identity_id, identity_key = await _identity(client, auth_headers, test_team.id)

    uploaded = await _upload(client, _bearer(identity_key), WEBP)
    bio = await client.patch("/api/users/me", json={"bio": "I sweep migrations."}, headers=_bearer(identity_key))

    assert uploaded.status_code == 200, uploaded.text
    assert bio.status_code == 200, bio.text
    me = (await client.get("/api/auth/me", headers=_bearer(identity_key))).json()
    assert me["id"] == identity_id
    assert me["avatar_url"] == uploaded.json()["avatar_url"]
    assert me["bio"] == "I sweep migrations."
    assert await _roster_avatar(client, auth_headers, test_team.id, identity_id) == uploaded.json()["avatar_url"]


async def test_a_registered_identity_uses_the_agent_route_for_itself(client, auth_headers, test_team):
    _registrar_key, identity_id, identity_key = await _identity(client, auth_headers, test_team.id)

    uploaded = await _upload_for(client, _bearer(identity_key), identity_id, GIF)
    cleared = await client.delete(f"/api/agents/{identity_id}/avatar", headers=_bearer(identity_key))

    assert uploaded.status_code == 200, uploaded.text
    assert cleared.status_code == 200, cleared.text
    assert cleared.json()["avatar_url"] is None


async def test_a_registrars_own_key_is_refused_for_its_identity(client, auth_headers, test_team):
    # A registrar's key only registers and reads (CHT-1561); it sets an
    # identity's picture with the identity's key.
    registrar_key, identity_id, _identity_key = await _identity(client, auth_headers, test_team.id)

    refused = await _upload_for(client, _bearer(registrar_key), identity_id, PNG)

    assert refused.status_code == 403, refused.text
    assert refused.json()["detail"]["error_code"] == "registrar_cannot_write"


async def test_the_human_owner_sets_a_registered_identitys_picture(client, auth_headers, test_team):
    _registrar_key, identity_id, _identity_key = await _identity(client, auth_headers, test_team.id)

    uploaded = await _upload_for(client, auth_headers, identity_id, PNG)

    assert uploaded.status_code == 200, uploaded.text
    assert uploaded.json()["registered_by_id"] is not None


async def test_a_registered_identity_may_not_set_its_registrars(client, auth_headers, test_team):
    registrar = await _agent(client, auth_headers, test_team.id, name="Harness", can_register=True)
    registered = await client.post(
        "/api/agents/register", json={"external_ref": REF}, headers=_bearer(registrar["api_key"]),
    )
    identity_key = registered.json()["api_key"]

    refused = await _upload_for(client, _bearer(identity_key), registrar["id"], PNG)

    assert refused.status_code == 403, refused.text


async def test_a_registrar_may_not_set_another_registrars_identity(client, auth_headers, test_team):
    _key, identity_id, _identity_key = await _identity(client, auth_headers, test_team.id)
    other = await _agent(client, auth_headers, test_team.id, name="Other harness", can_register=True)

    refused = await _upload_for(client, _bearer(other["api_key"]), identity_id, PNG)

    assert refused.status_code == 403, refused.text
