"""Push device registration, per-kind preferences and the VAPID key
(CHT-1604): /api/push and app.services.push_service.

* A person registers, replaces, lists and deletes their own devices; an
  agent is refused whatever it holds.
* Endpoints are https, bounded, and public unless an admin allows private
  ones (SSRF: the server POSTs to them); keys must be RFC 8291's shapes.
* An endpoint is held by one registration; re-registering it elsewhere
  takes it over.
* Revoking the session or API key a device was registered with deletes
  the device.
* Preferences default to on except agent_status, and PATCH changes only
  the kinds it names.
* The VAPID key is derived from SECRET_KEY unless VAPID_PRIVATE_KEY is
  set, and is a valid P-256 point either way.
"""
import base64
import os

import pytest
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import ec

from app.config import get_settings
from app.enums import InboxEntryKind, PushTransport
from app.oxyde_models.push import OxydePushDevice, OxydePushPreference
from app.schemas.api_key import APIKeyCreate
from app.services import push_service
from app.services.api_key_service import APIKeyService
from app.services.push_service import (
    MAX_DEVICES_PER_USER,
    PushRegistrationError,
    PushService,
    Registration,
    check_endpoint,
)
from app.services.revocation_service import RevocationService
from app.services.token_service import TokenService
from app.utils import vapid

from .oauth_tokens import connector_token, enable_oauth, make_agent

PUBLIC_IP = "93.184.216.34"
INSTALL = "3f1d2c4b-0000-4000-8000-000000000001"
INSTALL2 = "3f1d2c4b-0000-4000-8000-000000000002"


def _b64(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode()


def _keys() -> dict[str, str]:
    point = ec.generate_private_key(ec.SECP256R1()).public_key().public_bytes(
        serialization.Encoding.X962, serialization.PublicFormat.UncompressedPoint,
    )
    return {"p256dh": _b64(point), "auth": _b64(os.urandom(16))}


def _body(endpoint: str = "https://ntfy.example.net/upAbC123", **extra) -> dict:
    return {"endpoint": endpoint, **_keys(), **extra}


@pytest.fixture(autouse=True)
def fake_dns(monkeypatch):
    """Names resolve from this table, never the network."""
    table = {
        "ntfy.example.net": [PUBLIC_IP],
        "ntfy2.example.net": ["2606:4700::6810:84e5"],
        "intranet.example.net": ["10.0.0.5"],
        "split.example.net": [PUBLIC_IP, "127.0.0.1"],
    }

    async def resolve(host: str) -> list[str]:
        if host not in table:
            raise push_service._invalid("the endpoint URL's host does not resolve")
        return table[host]

    monkeypatch.setattr(push_service, "_resolve", resolve)
    return table


@pytest.fixture
def private_allowed(monkeypatch):
    monkeypatch.setenv("PUSH_ALLOW_PRIVATE_ENDPOINTS", "true")
    get_settings.cache_clear()
    yield
    get_settings.cache_clear()


async def _key_headers(user) -> tuple[dict, object]:
    key, raw = await APIKeyService().create(user.id, APIKeyCreate(name="phone"))
    return {"Authorization": f"Bearer {raw}"}, key


# --- registration -------------------------------------------------------------


class TestRegister:
    async def test_register_list_replace_delete(self, client, test_user, auth_headers):
        url = f"/api/push/devices/{INSTALL}"
        created = await client.put(url, json=_body(platform="android", label="Pixel 9"), headers=auth_headers)
        assert created.status_code == 201, created.text
        device = created.json()
        assert device["installation_id"] == INSTALL
        assert device["transport"] == "web_push"
        assert device["endpoint_host"] == "ntfy.example.net"
        assert (device["platform"], device["label"]) == ("android", "Pixel 9")
        assert device["failure_count"] == 0 and device["last_success_at"] is None
        # Neither the endpoint (a capability) nor the keys come back.
        assert not {"endpoint", "p256dh", "auth"} & device.keys()

        # The distributor changed: same installation, new endpoint.
        await OxydePushDevice.objects.filter(id=device["id"]).update(failure_count=3)
        replaced = await client.put(url, json=_body("https://ntfy2.example.net/up/xyz"), headers=auth_headers)
        assert replaced.status_code == 200, replaced.text
        assert replaced.json()["id"] == device["id"]
        assert replaced.json()["endpoint_host"] == "ntfy2.example.net"
        assert replaced.json()["failure_count"] == 0
        assert replaced.json()["label"] is None  # a PUT replaces the whole registration

        rows = await OxydePushDevice.objects.filter(user_id=test_user.id).all()
        assert [r.endpoint for r in rows] == ["https://ntfy2.example.net/up/xyz"]
        assert rows[0].transport is PushTransport.WEB_PUSH

        listed = await client.get("/api/push/devices", headers=auth_headers)
        assert [d["id"] for d in listed.json()] == [device["id"]]

        assert (await client.delete(url, headers=auth_headers)).status_code == 204
        assert (await client.delete(url, headers=auth_headers)).status_code == 404
        assert (await client.get("/api/push/devices", headers=auth_headers)).json() == []

    async def test_same_endpoint_unchanged_keeps_history(self, client, test_user, auth_headers):
        body = _body()
        first = (await client.put(f"/api/push/devices/{INSTALL}", json=body, headers=auth_headers)).json()
        await OxydePushDevice.objects.filter(id=first["id"]).update(failure_count=2)
        again = await client.put(f"/api/push/devices/{INSTALL}", json=body, headers=auth_headers)
        assert again.status_code == 200
        assert again.json()["failure_count"] == 2

    async def test_devices_are_per_person(self, client, test_user, test_user2, auth_headers, auth_headers2):
        mine = await client.put(f"/api/push/devices/{INSTALL}", json=_body(), headers=auth_headers)
        theirs = await client.put(
            f"/api/push/devices/{INSTALL}", json=_body("https://ntfy2.example.net/b"), headers=auth_headers2,
        )
        assert mine.status_code == theirs.status_code == 201
        assert mine.json()["id"] != theirs.json()["id"]
        assert [d["id"] for d in (await client.get("/api/push/devices", headers=auth_headers)).json()] == [
            mine.json()["id"]
        ]
        # Deleting is by the caller's own installation only.
        assert (await client.delete(f"/api/push/devices/{INSTALL}", headers=auth_headers2)).status_code == 204
        assert await OxydePushDevice.objects.filter(id=mine.json()["id"]).count() == 1

    async def test_an_endpoint_has_one_registration(self, client, test_user, test_user2, auth_headers, auth_headers2):
        """The phone switched accounts without signing out: the endpoint
        now delivers to the second person, so the first loses it."""
        endpoint = "https://ntfy.example.net/upShared"
        first = await client.put(f"/api/push/devices/{INSTALL}", json=_body(endpoint), headers=auth_headers)
        second = await client.put(f"/api/push/devices/{INSTALL2}", json=_body(endpoint), headers=auth_headers2)
        assert first.status_code == second.status_code == 201
        rows = await OxydePushDevice.objects.filter(endpoint=endpoint).all()
        assert [(r.user_id, r.installation_id) for r in rows] == [(test_user2.id, INSTALL2)]

        # And within one person: a reinstall under a new installation id.
        again = await client.put(f"/api/push/devices/{INSTALL}", json=_body(endpoint), headers=auth_headers2)
        assert again.status_code == 201
        rows = await OxydePushDevice.objects.filter(endpoint=endpoint).all()
        assert [(r.user_id, r.installation_id) for r in rows] == [(test_user2.id, INSTALL)]

    async def test_device_limit(self, client, test_user, auth_headers):
        for i in range(MAX_DEVICES_PER_USER):
            response = await client.put(
                f"/api/push/devices/install-{i:04d}", json=_body(f"https://ntfy.example.net/up{i}"),
                headers=auth_headers,
            )
            assert response.status_code == 201, response.text
        over = await client.put(
            "/api/push/devices/install-over", json=_body("https://ntfy.example.net/over"), headers=auth_headers,
        )
        assert over.status_code == 409
        assert over.json()["detail"]["error_code"] == "too_many_push_devices"
        # Replacing an existing one is still allowed at the limit.
        replace = await client.put(
            "/api/push/devices/install-0000", json=_body("https://ntfy.example.net/new0"), headers=auth_headers,
        )
        assert replace.status_code == 200

    @pytest.mark.parametrize("installation_id", ["short", "has space here", "x" * 129, "a/b/c/d/e/f"])
    async def test_installation_id_shape(self, client, auth_headers, installation_id):
        response = await client.put(f"/api/push/devices/{installation_id}", json=_body(), headers=auth_headers)
        # 422 from the path's pattern; a slash never reaches the route.
        assert response.status_code in (404, 405, 422)
        assert await OxydePushDevice.objects.count() == 0

    async def test_unknown_fields_are_refused(self, client, auth_headers):
        response = await client.put(
            f"/api/push/devices/{INSTALL}", json=_body(user_id="someone-else"), headers=auth_headers,
        )
        assert response.status_code == 422

    async def test_needs_a_credential(self, client):
        assert (await client.get("/api/push/devices")).status_code == 401
        assert (await client.put(f"/api/push/devices/{INSTALL}", json=_body())).status_code == 401


class TestAgentsRefused:
    @pytest.mark.parametrize("method,path", [
        ("GET", "/api/push/devices"),
        ("PUT", f"/api/push/devices/{INSTALL}"),
        ("DELETE", f"/api/push/devices/{INSTALL}"),
        ("GET", "/api/push/preferences"),
        ("PATCH", "/api/push/preferences"),
        ("GET", "/api/push/vapid-public-key"),
    ])
    async def test_agent_is_refused(self, client, agent_headers, method, path):
        body = _body() if method == "PUT" else {"kinds": {"mention": False}} if method == "PATCH" else None
        response = await client.request(method, path, json=body, headers=agent_headers)
        assert response.status_code == 403, response.text
        assert response.json()["detail"]["error_code"] == "human_required"
        assert await OxydePushDevice.objects.count() == 0
        assert await OxydePushPreference.objects.count() == 0


# --- endpoint and key validation ------------------------------------------------


class TestEndpointValidation:
    @pytest.mark.parametrize("endpoint,why", [
        ("http://ntfy.example.net/up", "https"),
        ("https:///up", "no host"),
        ("https://user:pw@ntfy.example.net/up", "credentials"),
        ("https://ntfy.example.net/up#frag", "fragment"),
        ("https://ntfy.example.net/up a", "RFC 3986"),
        ("https://ntfy.example.net/üp", "RFC 3986"),
        ("https://ntfy.example.net:99999/up", "port"),
        ("https://127.0.0.1/up", "public"),
        ("https://[::1]/up", "public"),
        ("https://10.1.2.3/up", "public"),
        ("https://169.254.169.254/latest", "public"),
        ("https://[::ffff:127.0.0.1]/up", "public"),
        ("https://intranet.example.net/up", "public"),
        ("https://split.example.net/up", "public"),
        ("https://nowhere.example.net/up", "does not resolve"),
        ("https://ntfy.example.net/" + "a" * 2100, "longer"),
    ])
    async def test_refused(self, endpoint, why):
        with pytest.raises(PushRegistrationError) as refused:
            await check_endpoint(endpoint)
        assert why in refused.value.message
        assert refused.value.error_code == "invalid_push_endpoint"
        # The refusal never names an internal address it resolved to.
        assert "10.0.0.5" not in refused.value.message

    @pytest.mark.parametrize("endpoint", [
        "https://ntfy.example.net/upAbC",
        "https://ntfy2.example.net:8443/up?x=1",
        f"https://{PUBLIC_IP}/up",
    ])
    async def test_accepted(self, endpoint):
        await check_endpoint(endpoint)

    async def test_admin_can_allow_private_hosts(self, private_allowed):
        for endpoint in ("https://127.0.0.1/up", "https://intranet.example.net/up", "https://localhost:2586/up"):
            await check_endpoint(endpoint)
        # Still https, still no credentials.
        with pytest.raises(PushRegistrationError):
            await check_endpoint("http://127.0.0.1/up")
        with pytest.raises(PushRegistrationError):
            await check_endpoint("https://u:p@127.0.0.1/up")

    async def test_api_refuses_a_private_endpoint(self, client, auth_headers):
        response = await client.put(
            f"/api/push/devices/{INSTALL}", json=_body("https://127.0.0.1/up"), headers=auth_headers,
        )
        assert response.status_code == 422
        assert response.json()["detail"]["error_code"] == "invalid_push_endpoint"
        assert await OxydePushDevice.objects.count() == 0

    async def test_real_resolver_refuses_an_unresolvable_name(self, monkeypatch):
        monkeypatch.undo()  # the real _resolve, against a reserved name
        with pytest.raises(PushRegistrationError):
            await check_endpoint("https://does-not-exist.invalid/up")

    @pytest.mark.parametrize("field,value", [
        ("p256dh", _b64(b"\x04" + b"x" * 63)),  # one byte short
        ("p256dh", _b64(b"\x02" + b"x" * 64)),  # not an uncompressed point
        ("p256dh", "!!!not base64!!!"),
        ("auth", _b64(b"x" * 15)),
        ("auth", _b64(b"x" * 32)),
    ])
    async def test_bad_keys(self, client, auth_headers, field, value):
        body = _body()
        body[field] = value
        response = await client.put(f"/api/push/devices/{INSTALL}", json=body, headers=auth_headers)
        assert response.status_code == 422, response.text
        assert response.json()["detail"]["error_code"] == "invalid_push_keys"

    async def test_service_requires_keys(self, test_user):
        with pytest.raises(PushRegistrationError) as refused:
            await PushService().register(
                test_user.id, INSTALL, Registration(endpoint="https://ntfy.example.net/up", p256dh=None, auth=None),
                holder_session_id=None, credential_id=None,
            )
        assert refused.value.error_code == "invalid_push_keys"


# --- revocation -------------------------------------------------------------------


class TestRevocation:
    async def test_registered_with_a_key_goes_with_the_key(self, client, test_user, auth_headers):
        headers, key = await _key_headers(test_user)
        response = await client.put(f"/api/push/devices/{INSTALL}", json=_body(), headers=headers)
        assert response.status_code == 201, response.text
        row = await OxydePushDevice.objects.get(id=response.json()["id"])
        assert (row.credential_id, row.holder_session_id) == (key.id, None)

        # A JWT-registered device is not tied to the key.
        other = await client.put(
            f"/api/push/devices/{INSTALL2}", json=_body("https://ntfy2.example.net/b"), headers=auth_headers,
        )
        assert (await OxydePushDevice.objects.get(id=other.json()["id"])).credential_id is None

        assert (await client.delete(f"/api/api-keys/{key.id}", headers=auth_headers)).status_code == 204
        assert await OxydePushDevice.objects.filter(id=row.id).count() == 0
        assert await OxydePushDevice.objects.filter(id=other.json()["id"]).count() == 1

    async def test_re_registering_moves_the_device_to_the_new_credential(self, client, test_user, auth_headers):
        headers, key = await _key_headers(test_user)
        await client.put(f"/api/push/devices/{INSTALL}", json=_body(), headers=headers)
        await client.put(f"/api/push/devices/{INSTALL}", json=_body(), headers=auth_headers)
        await APIKeyService().revoke(key)
        assert await OxydePushDevice.objects.filter(installation_id=INSTALL).count() == 1

    async def test_deleting_the_key_row_cascades(self, test_user):
        key, _raw = await APIKeyService().create(test_user.id, APIKeyCreate(name="phone"))
        await PushService().register(
            test_user.id, INSTALL, Registration(endpoint="https://ntfy.example.net/up", **_keys()),
            holder_session_id=None, credential_id=key.id,
        )
        await APIKeyService().delete(key)
        assert await OxydePushDevice.objects.count() == 0

    async def _session_device(self, monkeypatch, test_team, test_user):
        enable_oauth(monkeypatch)
        agent = await make_agent(test_team, test_user)
        issued = await connector_token(agent, test_team, test_user)
        # Today only an agent holds a session; the app's human session
        # (CHT-1602) will be linked the same way.
        device, created = await PushService().register(
            test_user.id, INSTALL, Registration(endpoint="https://ntfy.example.net/up", **_keys()),
            holder_session_id=issued.holder_session_id, credential_id=None,
        )
        assert created
        return issued, device

    async def test_revoking_the_session_deletes_the_device(self, monkeypatch, test_team, test_user):
        issued, device = await self._session_device(monkeypatch, test_team, test_user)
        assert await TokenService().revoke_session(issued.holder_session_id, actor_id=test_user.id, reason="t")
        assert await OxydePushDevice.objects.filter(id=device.id).count() == 0

    async def test_batch_revocation_deletes_the_device(self, monkeypatch, test_team, test_user):
        issued, device = await self._session_device(monkeypatch, test_team, test_user)
        assert await RevocationService().revoke_connection(test_user.id, issued.holder_session_id)
        assert await OxydePushDevice.objects.filter(id=device.id).count() == 0

    async def test_service_delete_helpers_ignore_empty(self):
        assert await PushService().delete_for_sessions([]) == 0
        assert await PushService().delete_for_keys([]) == 0


# --- preferences ----------------------------------------------------------------


class TestPreferences:
    async def test_defaults(self, client, auth_headers):
        response = await client.get("/api/push/preferences", headers=auth_headers)
        assert response.status_code == 200
        kinds = response.json()["kinds"]
        assert set(kinds) == {k.value for k in InboxEntryKind}
        assert kinds["agent_status"] is False
        assert all(v for k, v in kinds.items() if k != "agent_status")

    async def test_patch_changes_only_what_it_names(self, client, test_user, test_user2, auth_headers, auth_headers2):
        response = await client.patch(
            "/api/push/preferences", json={"kinds": {"mention": False, "agent_status": True}}, headers=auth_headers,
        )
        assert response.status_code == 200, response.text
        kinds = response.json()["kinds"]
        assert (kinds["mention"], kinds["agent_status"], kinds["gate_pending"]) == (False, True, True)

        again = await client.patch("/api/push/preferences", json={"kinds": {"mention": True}}, headers=auth_headers)
        kinds = again.json()["kinds"]
        assert (kinds["mention"], kinds["agent_status"]) == (True, True)
        assert await OxydePushPreference.objects.filter(user_id=test_user.id).count() == 2

        # Stored as the member's name, like every DbEnum column.
        row = await OxydePushPreference.objects.filter(user_id=test_user.id, kind=InboxEntryKind.MENTION).first()
        assert row.kind is InboxEntryKind.MENTION

        # Someone else's are untouched.
        theirs = (await client.get("/api/push/preferences", headers=auth_headers2)).json()["kinds"]
        assert theirs["agent_status"] is False

        assert await PushService().wants(test_user.id, InboxEntryKind.AGENT_STATUS) is True
        assert await PushService().wants(test_user2.id, InboxEntryKind.AGENT_STATUS) is False
        assert await PushService().wants(test_user2.id, InboxEntryKind.GATE_PENDING) is True

    @pytest.mark.parametrize("body", [
        {"kinds": {"not_a_kind": True}},
        {"kinds": {"mention": "maybe"}},
        {"mention": False},
        {"kinds": {"mention": False}, "extra": 1},
    ])
    async def test_bad_patch(self, client, auth_headers, body):
        response = await client.patch("/api/push/preferences", json=body, headers=auth_headers)
        assert response.status_code == 422


# --- VAPID ------------------------------------------------------------------------


def _point(public_key: str) -> ec.EllipticCurvePublicKey:
    raw = base64.urlsafe_b64decode(public_key + "=" * (-len(public_key) % 4))
    assert len(raw) == 65 and raw[0] == 4
    return ec.EllipticCurvePublicKey.from_encoded_point(ec.SECP256R1(), raw)


class TestVapid:
    @pytest.fixture(autouse=True)
    def clean_settings(self):
        get_settings.cache_clear()
        yield
        get_settings.cache_clear()

    async def test_endpoint_serves_the_derived_key(self, client, auth_headers):
        response = await client.get("/api/push/vapid-public-key", headers=auth_headers)
        assert response.status_code == 200
        key = response.json()["public_key"]
        _point(key)
        assert key == vapid.public_key_b64url()  # stable across calls

    def test_derived_from_secret_key(self, monkeypatch):
        first = vapid.public_key_b64url()
        monkeypatch.setenv("SECRET_KEY", "another-secret-entirely")
        get_settings.cache_clear()
        assert vapid.public_key_b64url() != first

    def test_raw_setting(self, monkeypatch):
        key = ec.generate_private_key(ec.SECP256R1())
        raw = key.private_numbers().private_value.to_bytes(32, "big")
        monkeypatch.setenv("VAPID_PRIVATE_KEY", _b64(raw))
        get_settings.cache_clear()
        expected = key.public_key().public_bytes(
            serialization.Encoding.X962, serialization.PublicFormat.UncompressedPoint,
        )
        assert vapid.public_key_b64url() == _b64(expected)

    def test_pem_setting(self, monkeypatch):
        key = ec.generate_private_key(ec.SECP256R1())
        pem = key.private_bytes(
            serialization.Encoding.PEM, serialization.PrivateFormat.PKCS8, serialization.NoEncryption(),
        ).decode()
        monkeypatch.setenv("VAPID_PRIVATE_KEY", pem)
        get_settings.cache_clear()
        assert vapid.private_key().private_numbers() == key.private_numbers()

    @pytest.mark.parametrize("value", [
        "-----BEGIN PRIVATE KEY-----\nnope\n-----END PRIVATE KEY-----",
        _b64(b"x" * 31),
        _b64(b"\xff" * 32),  # above the group order
        _b64(b"\x00" * 32),
        "!!!",
    ])
    def test_bad_setting(self, monkeypatch, value):
        monkeypatch.setenv("VAPID_PRIVATE_KEY", value)
        get_settings.cache_clear()
        with pytest.raises(vapid.VapidKeyError):
            vapid.private_key()

    def test_pem_of_another_curve(self, monkeypatch):
        pem = ec.generate_private_key(ec.SECP384R1()).private_bytes(
            serialization.Encoding.PEM, serialization.PrivateFormat.PKCS8, serialization.NoEncryption(),
        ).decode()
        monkeypatch.setenv("VAPID_PRIVATE_KEY", pem)
        get_settings.cache_clear()
        with pytest.raises(vapid.VapidKeyError, match="P-256"):
            vapid.private_key()

    async def test_bad_setting_is_a_503(self, client, auth_headers, monkeypatch):
        monkeypatch.setenv("VAPID_PRIVATE_KEY", "!!!")
        get_settings.cache_clear()
        response = await client.get("/api/push/vapid-public-key", headers=auth_headers)
        assert response.status_code == 503
        assert response.json()["detail"]["error_code"] == "push_misconfigured"


async def test_preference_insert_race_is_the_later_write(test_user, monkeypatch):
    """A concurrent PATCH created the row between this one's UPDATE and
    INSERT: the INSERT's unique violation becomes an UPDATE."""
    real_create = OxydePushPreference.objects.create

    async def create_after_a_rival(**fields):
        await real_create(**{**fields, "enabled": not fields["enabled"]})
        return await real_create(**fields)

    monkeypatch.setattr(OxydePushPreference.objects, "create", create_after_a_rival)
    kinds = await PushService().set_preferences(test_user.id, {InboxEntryKind.MENTION: False})
    assert kinds[InboxEntryKind.MENTION] is False
    assert await OxydePushPreference.objects.filter(user_id=test_user.id).count() == 1


async def test_concurrent_registration_is_a_409(client, test_user, auth_headers, monkeypatch):
    """Another registration of the same installation landed between this
    one's read and its INSERT."""
    real_create = OxydePushDevice.objects.create

    async def create_after_a_rival(**fields):
        await real_create(**{**fields, "endpoint": "https://ntfy2.example.net/rival"})
        return await real_create(**fields)

    monkeypatch.setattr(OxydePushDevice.objects, "create", create_after_a_rival)
    response = await client.put(f"/api/push/devices/{INSTALL}", json=_body(), headers=auth_headers)
    assert response.status_code == 409
    assert response.json()["detail"]["error_code"] == "push_registration_conflict"
