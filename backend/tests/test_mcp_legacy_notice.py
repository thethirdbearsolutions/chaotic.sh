"""Retirement notice for a shared MCP identity's keys (CHT-1720, step 2).

``MCP_LEGACY_SHARED_KEY_IDS`` names API keys; a /mcp request
authenticated with one gets a notice in the server ``instructions`` and a
``notice`` field on every tool result. Nothing listed (the default) means
no notice anywhere; any other credential gets none; a malformed setting
is logged, never fatal. Driven over HTTP like test_mcp_endpoint.py, plus
direct checks of the config parsing and of the toolset staying as is.
"""
import inspect
import json
import logging
import pathlib

import pytest

from app.auth.credentials import CredentialKind, Principal
from app.config import Settings, get_settings
from app.mcp_server import legacy, tools
from app.schemas.api_key import APIKeyCreate
from app.services.api_key_service import APIKeyService

from .test_mcp_endpoint import _MCP_HEADERS, _init_params, _remount_mcp, _rpc, _tool_call

BASE_INSTRUCTIONS_START = "Tools for the Chaotic issue tracker"
DATE = "2026-11-15"


@pytest.fixture(autouse=True)
async def _fresh_mcp():
    await _remount_mcp()


@pytest.fixture
def legacy_settings(monkeypatch):
    """Set MCP_LEGACY_SHARED_KEY_IDS / MCP_LEGACY_RETIRE_DATE for a test."""

    def _set(ids: str | None = None, date: str | None = None):
        for name, value in (("MCP_LEGACY_SHARED_KEY_IDS", ids), ("MCP_LEGACY_RETIRE_DATE", date)):
            if value is None:
                monkeypatch.delenv(name, raising=False)
            else:
                monkeypatch.setenv(name, value)
        get_settings.cache_clear()

    yield _set
    get_settings.cache_clear()


async def _key(user, name):
    record, full_key = await APIKeyService().create(user.id, APIKeyCreate(name=name))
    return record.id, full_key


@pytest.fixture
async def shared_key(db, test_user):
    return await _key(test_user, "shared connector")


@pytest.fixture
async def own_key(db, test_user):
    return await _key(test_user, "own identity")


def _bearer(full_key):
    return {**_MCP_HEADERS, "Authorization": f"Bearer {full_key}"}


async def _instructions(client, url, headers):
    resp = await client.post(url, json=_rpc("initialize", _init_params()), headers=headers)
    assert resp.status_code == 200, resp.text
    return resp.json()["result"]["instructions"]


async def _payload(client, headers, name, arguments=None, url="/mcp"):
    resp = await _tool_call(client, headers, name, arguments, url=url)
    assert resp.status_code == 200, resp.text
    return json.loads(resp.json()["result"]["content"][0]["text"])


# --- settings -----------------------------------------------------------------


class TestSettings:
    def test_empty_by_default(self, monkeypatch):
        monkeypatch.delenv("MCP_LEGACY_SHARED_KEY_IDS", raising=False)
        monkeypatch.delenv("MCP_LEGACY_RETIRE_DATE", raising=False)
        settings = Settings()
        assert settings.mcp_legacy_shared_key_ids == ""
        assert settings.mcp_legacy_shared_key_id_set == frozenset()
        assert settings.mcp_legacy_retire_date == ""

    def test_ids_are_canonicalised_and_deduplicated(self, monkeypatch):
        upper = "0B7E2A3C-1D4F-4A5B-8C6D-7E8F9A0B1C2D"
        monkeypatch.setenv("MCP_LEGACY_SHARED_KEY_IDS", f" {upper} ,,{upper.lower()},")
        settings = Settings()
        assert settings.mcp_legacy_shared_key_id_set == frozenset({upper.lower()})

    @pytest.mark.parametrize("bad", ["ck_abc123", "not-a-uuid", "0b7e2a3c", "*"])
    def test_a_bad_id_is_logged_and_dropped_never_fatal(self, monkeypatch, caplog, bad):
        good = "0b7e2a3c-1d4f-4a5b-8c6d-7e8f9a0b1c2d"
        monkeypatch.setenv("MCP_LEGACY_SHARED_KEY_IDS", f"{bad},{good}")
        with caplog.at_level(logging.ERROR, logger="app.config"):
            settings = Settings()
        assert settings.mcp_legacy_shared_key_id_set == frozenset({good})
        assert any("MCP_LEGACY_SHARED_KEY_IDS" in r.getMessage() and r.levelno == logging.ERROR
                   for r in caplog.records)

    def test_date_is_kept(self, monkeypatch):
        monkeypatch.setenv("MCP_LEGACY_RETIRE_DATE", f" {DATE} ")
        assert Settings().mcp_legacy_retire_date == DATE

    @pytest.mark.parametrize("bad", ["15/11/2026", "2026-13-01", "20261115", "2026-W46-7", "soon"])
    def test_a_bad_date_is_logged_and_unset_never_fatal(self, monkeypatch, caplog, bad):
        monkeypatch.setenv("MCP_LEGACY_RETIRE_DATE", bad)
        with caplog.at_level(logging.ERROR, logger="app.config"):
            assert Settings().mcp_legacy_retire_date == ""
        assert any("MCP_LEGACY_RETIRE_DATE" in r.getMessage() for r in caplog.records)


# --- the notice text ------------------------------------------------------------


class TestNoticeFor:
    def test_names_the_identity_date_and_both_ways_to_switch(self, legacy_settings, test_user):
        legacy_settings(ids="0b7e2a3c-1d4f-4a5b-8c6d-7e8f9a0b1c2d", date=DATE)
        principal = Principal(user=test_user, holder_user_id=test_user.id, kind=CredentialKind.API_KEY,
                              credential_id="0b7e2a3c-1d4f-4a5b-8c6d-7e8f9a0b1c2d")
        notice = legacy.notice_for(principal)
        assert f'"{test_user.name}"' in notice
        assert f"on {DATE}" in notice
        assert "set-session-identity auto" in notice and "chaotic mcp" in notice
        assert get_settings().oauth_issuer + "/mcp" in notice and "OAuth" in notice
        assert "issue_update" in notice and "issue_start" in notice

    def test_no_date_says_so(self, legacy_settings, test_user):
        legacy_settings(ids="0b7e2a3c-1d4f-4a5b-8c6d-7e8f9a0b1c2d")
        principal = Principal(user=test_user, holder_user_id=test_user.id, kind=CredentialKind.API_KEY,
                              credential_id="0b7e2a3c-1d4f-4a5b-8c6d-7e8f9a0b1c2d")
        assert "the date is not set yet" in legacy.notice_for(principal)

    def test_only_an_api_key_credential_matches(self, legacy_settings, test_user):
        """A session JWT never reaches /mcp, but a principal of another
        kind carrying a listed id must not match by accident."""
        listed = "0b7e2a3c-1d4f-4a5b-8c6d-7e8f9a0b1c2d"
        legacy_settings(ids=listed)
        jwt = Principal(user=test_user, holder_user_id=test_user.id, kind=CredentialKind.SESSION_JWT,
                        credential_id=listed)
        assert legacy.notice_for(jwt) is None
        assert legacy.notice_for(None) is None

    def test_outside_a_request_there_is_none(self, legacy_settings):
        legacy_settings(ids="0b7e2a3c-1d4f-4a5b-8c6d-7e8f9a0b1c2d")
        assert legacy.current_notice() is None


# --- over HTTP --------------------------------------------------------------------


class TestOverHTTP:
    async def test_nothing_listed_means_no_notice(self, client, legacy_settings, shared_key, test_project):
        legacy_settings()
        _id, full_key = shared_key
        instructions = await _instructions(client, "/mcp", _bearer(full_key))
        assert instructions.startswith(BASE_INSTRUCTIONS_START) and "NOTICE" not in instructions
        assert "notice" not in await _payload(client, _bearer(full_key), "issue_list")
        assert "notice" not in await _payload(client, _bearer(full_key), "issue_view", {"identifier": "NOPE-1"})

    async def test_a_listed_key_gets_the_notice_in_both_places(
        self, client, legacy_settings, shared_key, test_project,
    ):
        key_id, full_key = shared_key
        legacy_settings(ids=key_id, date=DATE)
        headers = _bearer(full_key)
        instructions = await _instructions(client, "/mcp", headers)
        assert instructions.startswith(BASE_INSTRUCTIONS_START)
        assert f"retired on {DATE}" in instructions

        listed = await _payload(client, headers, "issue_list")
        assert f"retired on {DATE}" in listed["notice"]
        assert listed["issues"] == [] and listed["count"] == 0  # the result itself is untouched
        # Error envelopes carry it too: every result does.
        failed = await _payload(client, headers, "issue_view", {"identifier": "NOPE-1"})
        assert "error" in failed and f"retired on {DATE}" in failed["notice"]
        created = await _payload(client, headers, "issue_create", {"title": "still works"})
        assert created["title"] == "still works" and "notice" in created

    async def test_the_capability_url_gets_it_too(self, client, legacy_settings, shared_key, test_project):
        key_id, full_key = shared_key
        legacy_settings(ids=key_id, date=DATE)
        url = f"/mcp/{full_key}"
        assert f"retired on {DATE}" in await _instructions(client, url, _MCP_HEADERS)
        assert "notice" in await _payload(client, _MCP_HEADERS, "issue_list", url=url)

    async def test_other_keys_get_none(self, client, legacy_settings, shared_key, own_key, test_project):
        key_id, _shared = shared_key
        _own_id, own = own_key
        legacy_settings(ids=key_id, date=DATE)
        instructions = await _instructions(client, "/mcp", _bearer(own))
        assert "NOTICE" not in instructions
        assert "notice" not in await _payload(client, _bearer(own), "issue_list")
        assert "notice" not in await _payload(client, _bearer(own), "issue_view", {"identifier": "NOPE-1"})

    async def test_instructions_without_the_notice_are_unchanged(
        self, client, legacy_settings, shared_key, own_key,
    ):
        """The listed key's instructions are the others' plus the notice,
        and nothing else differs."""
        key_id, shared = shared_key
        _own_id, own = own_key
        legacy_settings(ids=key_id, date=DATE)
        plain = await _instructions(client, "/mcp", _bearer(own))
        noticed = await _instructions(client, "/mcp", _bearer(shared))
        assert noticed.startswith(plain + "\n\n")

    async def test_a_malformed_setting_serves_normally(self, client, legacy_settings, shared_key, test_project):
        """A bad id and a bad date are logged at startup and ignored: the
        server serves, and no one gets a notice."""
        legacy_settings(ids="ck_not-an-id,,", date="next month")
        _id, full_key = shared_key
        assert "NOTICE" not in await _instructions(client, "/mcp", _bearer(full_key))
        assert "notice" not in await _payload(client, _bearer(full_key), "issue_list")


# --- the toolset ------------------------------------------------------------------


class TestToolset:
    def test_wrapping_keeps_every_signature(self):
        """The notice is added to results, never declared: each served
        tool has the same signature (so the same schema) as the bound
        body it wraps."""
        for tool in tools.ALL_TOOLS:
            assert inspect.signature(tool) == inspect.signature(tool.__wrapped__), tool.__name__
            assert inspect.iscoroutinefunction(tool)

    async def test_tools_list_is_the_same_for_a_listed_key(self, client, legacy_settings, shared_key, own_key):
        key_id, shared = shared_key
        _own_id, own = own_key
        legacy_settings(ids=key_id, date=DATE)
        lists = []
        for full_key in (shared, own):
            resp = await client.post("/mcp", json=_rpc("tools/list"), headers=_bearer(full_key))
            lists.append(resp.json()["result"]["tools"])
        assert lists[0] == lists[1]

    def test_no_tool_body_returns_a_notice_of_its_own(self):
        """`notice` is reserved for this transport's retirement notice: a
        tool body that set it would be overwritten for a listed key."""
        import chaotic_mcp_tools

        package = pathlib.Path(chaotic_mcp_tools.__file__).parent
        for path in package.rglob("*.py"):
            text = path.read_text()
            assert '"notice"' not in text and "'notice'" not in text, path

    def test_installing_twice_is_harmless(self):
        server = tools.build_server()
        cls = type(server._lowlevel_server)
        legacy.install_instructions_notice(server)
        assert type(server._lowlevel_server) is cls
        assert server.instructions.startswith(BASE_INSTRUCTIONS_START)
