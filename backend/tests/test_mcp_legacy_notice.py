"""Retirement notice for a shared MCP identity's keys (CHT-1720, step 2).

``MCP_LEGACY_SHARED_KEY_IDS`` names API keys; a /mcp request
authenticated with one gets a notice in the server ``instructions`` and a
``notice`` field on every tool result. Nothing listed (the default) means
no notice anywhere; any other credential gets none; a malformed setting
is logged, never fatal. Driven over HTTP like test_mcp_endpoint.py, plus
direct checks of the config parsing and of the toolset staying as is.
"""
import asyncio
import inspect
import json
import logging
import pathlib
from types import SimpleNamespace

import pytest

from app.auth.credentials import CredentialKind, Principal
from app.config import Settings, get_settings
from app.mcp_server import legacy, tools
from app.schemas.api_key import APIKeyCreate
from app.services.api_key_service import APIKeyService

from .mcp_principal import acting_as
from .test_mcp_endpoint import _MCP_HEADERS, _init_params, _remount_mcp, _rpc, _tool_call

BASE_INSTRUCTIONS_START = "Tools for the Chaotic issue tracker"
DATE = "2099-11-15"
KEY_ID = "0b7e2a3c-1d4f-4a5b-8c6d-7e8f9a0b1c2d"


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

    @pytest.mark.parametrize("bad", [
        "not-a-uuid", "0b7e2a3c", "*",
        # Forms uuid.UUID would take, refused like the CLI refuses them.
        "{0b7e2a3c-1d4f-4a5b-8c6d-7e8f9a0b1c2e}", "urn:uuid:0b7e2a3c-1d4f-4a5b-8c6d-7e8f9a0b1c2e",
        "0b7e2a3c1d4f4a5b8c6d7e8f9a0b1c2e",
    ])
    def test_a_bad_id_is_logged_by_position_and_dropped_never_fatal(self, monkeypatch, caplog, bad):
        good = "0b7e2a3c-1d4f-4a5b-8c6d-7e8f9a0b1c2d"
        monkeypatch.setenv("MCP_LEGACY_SHARED_KEY_IDS", f"{good},{bad}")
        with caplog.at_level(logging.ERROR, logger="app.config"):
            settings = Settings()
        assert settings.mcp_legacy_shared_key_id_set == frozenset({good})
        messages = [r.getMessage() for r in caplog.records if r.levelno == logging.ERROR]
        assert any("MCP_LEGACY_SHARED_KEY_IDS entry 2 is not an API key id" in m for m in messages)
        assert not any(bad in m for m in messages)

    @pytest.mark.parametrize("pasted", ["ck_" + "a1" * 32, "cat_" + "b2" * 32])
    def test_a_pasted_key_is_recognised_and_never_logged(self, monkeypatch, caplog, pasted):
        monkeypatch.setenv("MCP_LEGACY_SHARED_KEY_IDS", pasted)
        with caplog.at_level(logging.DEBUG):
            assert Settings().mcp_legacy_shared_key_id_set == frozenset()
        messages = [r.getMessage() for r in caplog.records]
        assert any("looks like an API key, not its id" in m for m in messages)
        assert not any(pasted in m or pasted[:12] in m for m in messages)

    def test_date_is_kept(self, monkeypatch):
        monkeypatch.setenv("MCP_LEGACY_RETIRE_DATE", f" {DATE} ")
        assert Settings().mcp_legacy_retire_date == DATE

    @pytest.mark.parametrize("bad", ["15/11/2026", "2026-13-01", "20261115", "2026-W46-7", "soon"])
    def test_a_bad_date_is_logged_and_unset_never_fatal(self, monkeypatch, caplog, bad):
        monkeypatch.setenv("MCP_LEGACY_RETIRE_DATE", bad)
        with caplog.at_level(logging.ERROR, logger="app.config"):
            assert Settings().mcp_legacy_retire_date == ""
        assert any("MCP_LEGACY_RETIRE_DATE" in r.getMessage() for r in caplog.records)

    @pytest.mark.parametrize("pasted", ["ck_" + "a1" * 32, "cat_" + "b2" * 32])
    def test_a_key_pasted_as_the_date_is_never_logged(self, monkeypatch, caplog, pasted):
        """CHT-1725: the same "looks like a key" check as the ids."""
        monkeypatch.setenv("MCP_LEGACY_RETIRE_DATE", pasted)
        with caplog.at_level(logging.DEBUG):
            assert Settings().mcp_legacy_retire_date == ""
        messages = [r.getMessage() for r in caplog.records]
        assert any("MCP_LEGACY_RETIRE_DATE looks like an API key" in m for m in messages)
        assert not any(pasted in m or pasted[:12] in m for m in messages)


# --- the notice text ------------------------------------------------------------


def _principal(user, credential_id=KEY_ID, kind=CredentialKind.API_KEY):
    return Principal(user=user, holder_user_id=user.id, kind=kind, credential_id=credential_id)


class TestNoticeFor:
    def test_names_the_identity_date_and_how_to_switch(self, legacy_settings, test_user):
        legacy_settings(ids=KEY_ID, date=DATE)
        notice = legacy.notice_for(_principal(test_user))
        assert f'"{test_user.name}"' in notice
        assert f"is being retired on {DATE}" in notice
        assert "set-session-identity auto" in notice and "chaotic mcp" in notice

    def test_tickets_only_the_ones_started_here(self, legacy_settings, test_user):
        """Review M2: sessions sharing the identity cannot tell their
        tickets apart, so none may bulk-take them."""
        legacy_settings(ids=KEY_ID, date=DATE)
        notice = legacy.notice_for(_principal(test_user))
        assert "re-claim only the tickets you started in this conversation" in notice
        assert "if you cannot tell which tickets are yours, leave them all and tell your user" in notice
        assert "tickets you have in progress" not in notice

    def test_no_oauth_line_while_oauth_is_off(self, legacy_settings, test_user):
        legacy_settings(ids=KEY_ID, date=DATE)
        notice = legacy.notice_for(_principal(test_user))
        assert "OAuth" not in notice and "/mcp)" not in notice
        assert "ask your user to reconnect it with an identity of its own" in notice

    @pytest.mark.parametrize("base,offered", [
        ("https://tracker.example.com", True),
        ("http://localhost:24267", False),
        ("http://127.0.0.1:24267", False),
        ("https://localhost", False),
        ("https://127.0.0.1", False),
        ("https://[::1]", False),
        ("https://app.localhost", False),
        # CHT-1725: the fully-qualified trailing dot is the same host.
        ("https://localhost.", False),
        ("https://app.localhost.", False),
        ("https://tracker.example.com.", True),
        # CHT-1725: addresses no chat client elsewhere can route to.
        ("https://0.0.0.0", False),
        ("https://[::]", False),
        ("https://[fe80::1]", False),
        ("https://10.0.0.5", False),
        ("https://192.168.1.20", False),
        ("https://172.16.0.1", False),
        ("https://169.254.1.1", False),
        ("https://100.64.0.1", False),
        ("https://[fd00::1]", False),
        ("https://8.8.8.8", True),
        ("https://[2606:4700:4700::1111]", True),
    ])
    def test_the_oauth_line_needs_a_reachable_https_issuer(self, legacy_settings, monkeypatch, test_user,
                                                           base, offered):
        monkeypatch.setenv("OAUTH_ENABLED", "true")
        monkeypatch.setenv("APP_BASE_URL", base)
        legacy_settings(ids=KEY_ID, date=DATE)
        notice = legacy.notice_for(_principal(test_user))
        assert (f"add the server again by URL ({base}/mcp) and sign in with OAuth" in notice) is offered
        assert ("ask your user to reconnect" in notice) is not offered

    @pytest.mark.parametrize("issuer,offered", [
        ("https://127.0.0.1.", False),
        ("https://[::ffff:127.0.0.1]", False),
        ("https://[::ffff:192.168.1.20]", False),
        ("https://[::ffff:8.8.8.8]", True),
        ("https://[fe80::1%25eth0]", False),
    ])
    def test_reachability_of_issuers_settings_refuses_anyway(self, issuer, offered):
        """Forms APP_BASE_URL validation already refuses at startup,
        checked on the gate itself so it does not rely on that."""
        settings = SimpleNamespace(oauth_enabled=True, oauth_issuer=issuer)
        assert legacy._oauth_reachable(settings) is offered

    def test_no_date_says_so(self, legacy_settings, test_user):
        legacy_settings(ids=KEY_ID)
        assert "the date is not set yet" in legacy.notice_for(_principal(test_user))

    def test_a_past_date_says_it_may_stop_any_time(self, legacy_settings, test_user):
        legacy_settings(ids=KEY_ID, date="2020-01-01")
        notice = legacy.notice_for(_principal(test_user))
        assert "was due to be retired on 2020-01-01 and may stop working at any time" in notice

    def test_only_an_api_key_credential_matches(self, legacy_settings, test_user):
        """A session JWT never reaches /mcp, but a principal of another
        kind carrying a listed id must not match by accident."""
        legacy_settings(ids=KEY_ID)
        assert legacy.notice_for(_principal(test_user, kind=CredentialKind.SESSION_JWT)) is None
        assert legacy.notice_for(_principal(test_user, credential_id=None)) is None
        assert legacy.notice_for(None) is None

    def test_outside_a_request_there_is_none(self, legacy_settings):
        legacy_settings(ids=KEY_ID)
        assert legacy.current_notice() is None


class TestWrappers:
    """The paths where a notice cannot be attached are logged (review L2)."""

    @pytest.fixture
    def listed(self, legacy_settings, test_user):
        legacy_settings(ids=KEY_ID, date=DATE)
        with acting_as(_principal(test_user)):
            yield

    async def test_a_non_object_result_is_logged(self, listed, caplog):
        async def odd():
            return ["not", "an", "object"]

        with caplog.at_level(logging.WARNING, logger="app.mcp_server.legacy"):
            assert await legacy.with_notice(odd)() == ["not", "an", "object"]
        assert any("notice was dropped" in r.getMessage() for r in caplog.records)

    async def test_a_result_with_its_own_notice_is_logged(self, listed, caplog):
        async def clash():
            return {"notice": "mine"}

        with caplog.at_level(logging.ERROR, logger="app.mcp_server.legacy"):
            result = await legacy.with_notice(clash)()
        assert result["notice"].startswith("NOTICE:")
        assert any("returned its own 'notice'" in r.getMessage() for r in caplog.records)

    async def test_unlisted_results_are_returned_as_is(self, legacy_settings, test_user):
        legacy_settings(ids=KEY_ID)
        payload = {"a": 1}

        async def body():
            return payload

        with acting_as(_principal(test_user, credential_id="1b7e2a3c-1d4f-4a5b-8c6d-7e8f9a0b1c2d")):
            assert await legacy.with_notice(body)() is payload

    async def test_middleware_adds_to_discover_and_logs_a_non_object(self, listed, caplog):
        middleware = legacy.LegacyNoticeMiddleware()

        async def wire(_ctx):
            return {"instructions": "base"}

        discover = await middleware(SimpleNamespace(method="server/discover"), wire)
        assert discover["instructions"].startswith("base\n\nNOTICE:")
        other = await middleware(SimpleNamespace(method="tools/list"), wire)
        assert other == {"instructions": "base"}

        async def model(_ctx):
            return SimpleNamespace(instructions="base")

        with caplog.at_level(logging.WARNING, logger="app.mcp_server.legacy"):
            await middleware(SimpleNamespace(method="initialize"), model)
        assert any("notice was dropped" in r.getMessage() for r in caplog.records)

        async def bare(_ctx):
            return {}

        assert (await middleware(SimpleNamespace(method="initialize"), bare))["instructions"].startswith("NOTICE:")


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
        # A call refused before any tool runs (CHT-1951) carries it as well.
        refused = await _payload(client, headers, "issue_view", {"identifier": "NOPE-1", "bogus": 1})
        assert refused["error"]["error_code"] == "unknown_argument"
        assert f"retired on {DATE}" in refused["notice"]

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

    async def test_concurrent_requests_do_not_share_the_notice(
        self, client, legacy_settings, shared_key, own_key, test_project,
    ):
        """Review L3: interleaved listed and unlisted requests, at once;
        each gets exactly its own answer."""
        key_id, shared = shared_key
        _own_id, own = own_key
        legacy_settings(ids=key_id, date=DATE)
        keys = [shared, own] * 15

        async def one(index, full_key):
            if index % 4 < 2:
                return full_key, "NOTICE" in await _instructions(client, "/mcp", _bearer(full_key))
            return full_key, "notice" in await _payload(client, _bearer(full_key), "issue_list")

        results = await asyncio.gather(*(one(i, k) for i, k in enumerate(keys)))
        assert [noticed for _key, noticed in results] == [key == shared for key, _ in results]
        assert len(results) == 30

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

    def test_the_hook_is_the_public_middleware(self):
        """Review M3: no class swap and no private attribute; the server
        keeps its own low-level class."""
        from mcp.server.lowlevel.server import Server

        server = tools.build_server()
        assert type(server._lowlevel_server) is Server
        assert sum(isinstance(m, legacy.LegacyNoticeMiddleware) for m in server.middleware) == 1

    def test_no_response_schema_has_a_notice_field(self):
        """Review L1: `notice` is reserved at the top of a result, so no
        response schema a tool might dump may declare it (by name or
        alias)."""
        import importlib
        import pkgutil

        import app.schemas
        from pydantic import BaseModel

        seen = 0
        for info in pkgutil.iter_modules(app.schemas.__path__):
            module = importlib.import_module(f"app.schemas.{info.name}")
            for obj in vars(module).values():
                if isinstance(obj, type) and issubclass(obj, BaseModel) and obj is not BaseModel:
                    seen += 1
                    for name, field in obj.model_fields.items():
                        assert legacy.NOTICE_KEY not in (name, field.alias, field.serialization_alias), obj
        assert seen > 50
