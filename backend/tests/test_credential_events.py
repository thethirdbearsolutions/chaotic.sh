"""The credential-ended hook (CHT-1625): every revoking path reports one
``CredentialsEnded``, and its dependents (push devices, /ws sockets) run
after the transaction that ended the credentials commits, each on its own."""
import asyncio
import logging
from datetime import datetime, timezone

import pytest
from oxyde import atomic

from app.oxyde_models.api_key import OxydeAPIKey
from app.oxyde_models.oauth import OxydeHolderSession
from app.oxyde_models.push import OxydePushDevice
from app.oxyde_models.team import OxydeTeamMember
from app.schemas.api_key import APIKeyCreate
from app.services import credential_events
from app.services.api_key_service import APIKeyService
from app.services.credential_events import CredentialsEnded, revoking
from app.services.push_service import PushService, Registration
from app.services.revocation_service import (
    REASON_MEMBER_REMOVED,
    REASON_PRINCIPAL_DEACTIVATED,
    REASON_PRINCIPAL_DELETED,
    REASON_TEAM_DELETED,
    RevocationService,
)
from app.services.token_service import TokenService

from .oauth_tokens import connector_token, enable_oauth, make_agent
from .test_push import INSTALL, INSTALL2, _keys, fake_dns  # noqa: F401 -- autouse: no real DNS


@pytest.fixture
def seen(db):
    """Every event dispatched, in order."""
    events: list[CredentialsEnded] = []

    async def hook(event):
        events.append(event)

    remove = credential_events.register(hook)
    yield events
    remove()


async def _device(user, installation, endpoint, *, key_id=None, session_id=None):
    device, _created = await PushService().register(
        user.id, installation, Registration(endpoint=endpoint, **_keys()),
        holder_session_id=session_id, credential_id=key_id, credential_expires_at=None,
    )
    return device


class TestAfterCommit:
    async def test_a_hook_runs_after_the_commit_not_inside(self, seen, test_user):
        key, _raw = await APIKeyService().create(test_user.id, APIKeyCreate(name="k"))
        observed = []

        async def check(event):
            # Outside any transaction, and the revocation is visible.
            from oxyde.db.transaction import get_active_transaction

            observed.append((get_active_transaction(), (await OxydeAPIKey.objects.get(id=key.id)).is_active))

        remove = credential_events.register(check)
        try:
            await APIKeyService().revoke(key)
        finally:
            remove()
        assert observed == [(None, False)]
        assert [e.key_ids for e in seen] == [frozenset({key.id})]

    async def test_a_rollback_dispatches_nothing(self, seen, test_user):
        key, _raw = await APIKeyService().create(test_user.id, APIKeyCreate(name="k"))
        with pytest.raises(RuntimeError, match="boom"):
            async with revoking():
                await OxydeAPIKey.objects.filter(id=key.id).update(is_active=False)
                await RevocationService().revoke_for_keys([key.id], actor_id=None)
                raise RuntimeError("boom")
        assert seen == []
        assert (await OxydeAPIKey.objects.get(id=key.id)).is_active

    async def test_nested_revoking_joins_the_outer_and_a_failed_one_drops_its_events(self, seen):
        a = CredentialsEnded.of("t", key_ids=["a"])
        b = CredentialsEnded.of("t", key_ids=["b"])
        async with revoking():
            async with revoking():
                await credential_events.ended(a)
            with pytest.raises(RuntimeError):
                async with revoking():
                    await credential_events.ended(b)
                    raise RuntimeError("savepoint rolled back")
            assert seen == []  # not yet: the outer has not committed
        assert seen == [a]

    async def test_outside_revoking_every_primitive_refuses_even_with_nothing_to_end(self, seen):
        """PR #356 review, 1: a path that forgot revoking() fails at once,
        not only when it happens to end something."""
        with pytest.raises(RuntimeError, match="revoking"):
            await credential_events.ended(CredentialsEnded.of("t", holder_session_ids=["s"]))
        service = RevocationService()
        for call in (
            service.revoke_for_keys([], actor_id=None),
            service.revoke_for_principals([], actor_id=None),
            service.revoke_for_member("team", "user", actor_id=None),
            service.revoke_for_team("team", actor_id=None),
            TokenService().revoke_sessions_batch([], actor_id=None, reason="t"),
            TokenService()._revoke_session_in_tx("nope", actor_id=None, reason="t"),
        ):
            with pytest.raises(RuntimeError, match="revoking"):
                await call
        assert seen == []

    async def test_a_child_task_is_outside_its_parents_block(self, seen):
        """PR #356 review, 5: a task inherits the ContextVar but not the
        block; reporting from it refuses rather than appending to a list
        that may already have been dispatched."""
        async def child():
            await credential_events.ended(CredentialsEnded.of("t", key_ids=["k"]))

        async with revoking():
            task = asyncio.create_task(child())
            with pytest.raises(RuntimeError, match="revoking"):
                await task
        assert seen == []

    async def test_the_generation_moves_once_per_dispatch(self, seen):
        before = credential_events.generation()
        async with revoking():
            pass  # nothing ended: no dispatch
        assert credential_events.generation() == before
        async with revoking():
            await credential_events.ended(CredentialsEnded.of("t", key_ids=["a"]))
            await credential_events.ended(CredentialsEnded.of("t", key_ids=["b"]))
        assert credential_events.generation() == before + 1

    async def test_inside_a_plain_atomic_it_refuses(self, seen):
        """Oxyde has no on-commit callback: a revocation inside a plain
        atomic() could only fire too early or never, so it refuses."""
        with pytest.raises(RuntimeError, match="revoking"):
            async with atomic():
                await credential_events.ended(CredentialsEnded.of("t", key_ids=["a"]))
        with pytest.raises(RuntimeError, match="revoking"):
            async with atomic():
                async with revoking():
                    pass
        assert seen == []

    async def test_inside_an_app_atomic_it_waits_for_that_commit(self, seen):
        """revoking() is app.db.transactions.atomic() (CHT-1605): inside
        another one it joins it, and its events wait for that commit."""
        from app.db.transactions import atomic as app_atomic

        async with app_atomic():
            async with revoking():
                await credential_events.ended(CredentialsEnded.of("t", key_ids=["a"]))
            async with revoking():
                await credential_events.ended(CredentialsEnded.of("t", key_ids=["b"]))
            assert seen == []
        assert [sorted(e.key_ids) for e in seen] == [["a"], ["b"]]
        seen.clear()
        with pytest.raises(ValueError):
            async with app_atomic():
                async with revoking():
                    await credential_events.ended(CredentialsEnded.of("t", key_ids=["c"]))
                raise ValueError
        assert seen == []

    async def test_an_empty_event_is_not_dispatched(self, seen):
        async with revoking():
            await credential_events.ended(CredentialsEnded.of("t"))
        await credential_events.dispatch([])
        assert seen == []


class TestIsolation:
    async def test_a_failing_hook_is_logged_and_neither_the_revocation_nor_the_others_break(
        self, seen, test_user, caplog,
    ):
        key, _raw = await APIKeyService().create(test_user.id, APIKeyCreate(name="phone"))
        device = await _device(test_user, INSTALL, "https://ntfy.example.net/up", key_id=key.id)

        async def broken(event):
            raise RuntimeError("hook down")

        remove = credential_events.register(broken)
        try:
            with caplog.at_level(logging.ERROR, logger="app.services.credential_events"):
                revoked = await APIKeyService().revoke(key)
        finally:
            remove()
        assert revoked.is_active is False
        assert len(seen) == 1  # the hook registered before it still ran
        assert await OxydePushDevice.objects.filter(id=device.id).count() == 0  # and the built-in one
        assert "credential-ended hook" in caplog.text and "hook down" in caplog.text

    async def test_a_failing_builtin_hook_does_not_stop_the_next(self, seen, monkeypatch, caplog):
        async def broken(event):
            raise RuntimeError("push down")

        monkeypatch.setattr("app.services.push_service.on_credentials_ended", broken)
        with caplog.at_level(logging.ERROR, logger="app.services.credential_events"):
            async with revoking():
                await credential_events.ended(CredentialsEnded.of("t", key_ids=["k"]))
        assert len(seen) == 1
        assert "push down" in caplog.text

    async def test_a_slow_hook_is_abandoned_after_its_timeout(self, seen, monkeypatch, caplog):
        """PR #356 review, 3: the revoking request waits for its hooks, so
        each is bounded."""
        monkeypatch.setattr(credential_events, "HOOK_TIMEOUT_SECONDS", 0.05)

        async def stuck(event):
            await asyncio.sleep(10)

        remove = credential_events.register(stuck)
        try:
            with caplog.at_level(logging.ERROR, logger="app.services.credential_events"):
                async with revoking():
                    await credential_events.ended(CredentialsEnded.of("t", key_ids=["k"]))
        finally:
            remove()
        assert len(seen) == 1
        assert "timed out" in caplog.text


    async def test_the_whole_dispatch_is_capped(self, seen, monkeypatch, caplog):
        """CHT-1629: per-hook bounds add up over events and hooks; one cap
        bounds the whole dispatch, and it is logged."""
        monkeypatch.setattr(credential_events, "HOOK_TIMEOUT_SECONDS", 10)
        monkeypatch.setattr(credential_events, "DISPATCH_TIMEOUT_SECONDS", 0.1)
        ran = []

        async def slow(event):
            ran.append(event.reason)
            await asyncio.sleep(0.04)

        remove = credential_events.register(slow)
        loop = asyncio.get_running_loop()
        started = loop.time()
        try:
            with caplog.at_level(logging.ERROR, logger="app.services.credential_events"):
                await credential_events.dispatch(
                    [CredentialsEnded.of(f"e{i}", key_ids=[f"k{i}"]) for i in range(10)],
                )
        finally:
            remove()
        assert loop.time() - started < 1
        assert len(seen) == 10  # registered before the slow hook: ran on every event
        assert len(ran) < 10  # stopped part-way through the slow hook
        assert "dispatch stopped after 0.1s" in caplog.text
        # The line names the hook that was left, and how many runs.
        line = next(r.getMessage() for r in caplog.records if "dispatch stopped" in r.getMessage())
        assert "hook runs left:" in line
        assert f"{__name__}.{TestIsolation.__name__}.test_the_whole_dispatch_is_capped.<locals>.slow x" in line
        assert "seen" not in line.split("left:")[1].split("(reasons")[0]  # finished hooks are not listed

    async def test_each_hook_runs_on_every_event_before_the_next_hook(self, seen, monkeypatch):
        """The socket hook closes every socket before the push hook
        writes anything (CHT-1629)."""
        order = []

        async def sockets(event):
            order.append(("sockets", event.reason))

        async def push(event):
            order.append(("push", event.reason))

        monkeypatch.setattr("app.websocket.on_credentials_ended", sockets)
        monkeypatch.setattr("app.services.push_service.on_credentials_ended", push)
        await credential_events.dispatch(
            [CredentialsEnded.of("a", key_ids=["k1"]), CredentialsEnded.of("b", key_ids=["k2"])],
        )
        assert order == [("sockets", "a"), ("sockets", "b"), ("push", "a"), ("push", "b")]

    async def test_the_connection_is_healthy_after_a_timed_out_delete(
        self, seen, monkeypatch, caplog, test_user,
    ):
        """CHT-1629: a hook timing out in the middle of the push-device
        DELETE abandons a running query. The pool (one connection in
        tests) must still serve the next query and transaction. The
        abandoned DELETE runs to its end (the timeout bounds the waiting,
        not the work; ``credential_events`` docstring). A temporary
        trigger on this connection makes the DELETE slow enough to be
        timed out while it runs."""
        from oxyde import execute_raw

        from app.db.transactions import atomic
        from app.oxyde_models.user import OxydeUser

        key, _raw = await APIKeyService().create(test_user.id, APIKeyCreate(name="phone"))
        device = await _device(test_user, INSTALL, "https://ntfy.example.net/up", key_id=key.id)
        await execute_raw(
            "CREATE TEMP TRIGGER slow_push_delete BEFORE DELETE ON push_devices BEGIN"
            " SELECT count(*) FROM (WITH RECURSIVE c(x) AS"
            " (SELECT 1 UNION ALL SELECT x + 1 FROM c LIMIT 3000000) SELECT x FROM c); END"
        )
        monkeypatch.setattr(credential_events, "HOOK_TIMEOUT_SECONDS", 0.01)
        try:
            with caplog.at_level(logging.ERROR, logger="app.services.credential_events"):
                revoked = await APIKeyService().revoke(key)
            assert "push_devices" not in caplog.text
            assert "on_credentials_ended timed out" in caplog.text
        finally:
            await asyncio.wait_for(execute_raw("DROP TRIGGER slow_push_delete"), 30)
        assert revoked.is_active is False
        # The abandoned DELETE ran to its end on the connection.
        assert await OxydePushDevice.objects.filter(id=device.id).count() == 0
        # And the connection serves a transaction afterwards.
        async with atomic():
            await OxydeUser.objects.filter(id=test_user.id).update(name="after the timeout")
        assert (await OxydeUser.objects.get(id=test_user.id)).name == "after the timeout"
        other, _ = await APIKeyService().create(test_user.id, APIKeyCreate(name="other"))
        await APIKeyService().revoke(other)
        assert (await OxydeAPIKey.objects.get(id=other.id)).is_active is False


class TestWhatEachPathReports:
    async def test_a_batch_reports_only_the_sessions_it_revoked(self, seen, monkeypatch, test_team, test_user):
        """PR #356 review, 7."""
        enable_oauth(monkeypatch)
        agent = await make_agent(test_team, test_user)
        one = await connector_token(agent, test_team, test_user)
        two = await connector_token(agent, test_team, test_user)
        await TokenService().revoke_session(one.holder_session_id, actor_id=None, reason="earlier")
        seen.clear()
        async with revoking():
            counts = await TokenService().revoke_sessions_batch(
                [one.holder_session_id, two.holder_session_id, "no-such-session"], actor_id=None, reason="t",
            )
        assert counts[0] == 1
        assert [e.holder_session_ids for e in seen] == [frozenset({two.holder_session_id})]

    async def test_agent_delete(self, seen, test_team, test_user):
        from app.services.agent_service import AgentService

        agent = await make_agent(test_team, test_user)
        key, _raw = await APIKeyService().create(agent.id, APIKeyCreate(name="k"), holder_user_id=test_user.id)
        await AgentService().delete(agent)
        [event] = [e for e in seen if agent.id in e.user_ids]
        assert event.reason == REASON_PRINCIPAL_DELETED
        assert key.id in event.key_ids

    async def test_session_revocation(self, seen, monkeypatch, test_team, test_user):
        enable_oauth(monkeypatch)
        agent = await make_agent(test_team, test_user)
        one = await connector_token(agent, test_team, test_user)
        await TokenService().revoke_session(one.holder_session_id, actor_id=None, reason="t")
        # Already revoked: nothing ended, nothing reported.
        await TokenService().revoke_session(one.holder_session_id, actor_id=None, reason="t")
        assert [e.holder_session_ids for e in seen] == [frozenset({one.holder_session_id})]

    async def test_agent_deactivation(self, seen, test_team, test_user):
        from app.services.agent_service import AgentService

        agent = await make_agent(test_team, test_user)
        key, _raw = await APIKeyService().create(agent.id, APIKeyCreate(name="k"), holder_user_id=test_user.id)
        await AgentService().deactivate(agent, test_user)
        [event] = [e for e in seen if e.user_ids]
        assert event.reason == REASON_PRINCIPAL_DEACTIVATED
        assert event.user_ids == {agent.id}
        assert key.id in event.key_ids
        assert event.holder_user_ids == frozenset()

    async def test_user_deletion(self, seen, test_user):
        from app.services.user_service import UserService

        await UserService().delete(test_user)
        [event] = [e for e in seen if test_user.id in e.user_ids]
        assert event.reason == REASON_PRINCIPAL_DELETED
        assert event.holder_user_ids == {test_user.id}

    async def test_member_removal_reports_even_when_nothing_was_revoked(
        self, seen, client, test_team, test_user, test_user2, auth_headers,
    ):
        await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role="MEMBER")
        response = await client.delete(f"/api/teams/{test_team.id}/members/{test_user2.id}", headers=auth_headers)
        assert response.status_code == 204, response.text
        [event] = seen
        assert event.reason == REASON_MEMBER_REMOVED
        assert event.removed_member == (test_team.id, test_user2.id)

    async def test_team_deletion(self, seen, client, test_team, auth_headers):
        response = await client.delete(f"/api/teams/{test_team.id}", headers=auth_headers)
        assert response.status_code == 204, response.text
        assert [(e.reason, e.deleted_team_id) for e in seen] == [(REASON_TEAM_DELETED, test_team.id)]


    async def test_deleting_a_key_revokes_it_first(self, seen, test_user):
        """CHT-1629: deleting a key ends what depended on it, as revoking
        it does, rather than ending it unreported."""
        key, _raw = await APIKeyService().create(test_user.id, APIKeyCreate(name="phone"))
        device = await _device(test_user, INSTALL, "https://ntfy.example.net/up", key_id=key.id)
        await APIKeyService().delete(key)
        assert [e.key_ids for e in seen] == [frozenset({key.id})]
        assert await OxydeAPIKey.objects.filter(id=key.id).count() == 0
        assert await OxydePushDevice.objects.filter(id=device.id).count() == 0

    async def test_deleting_a_revoked_key_reports_it_again_harmlessly(self, seen, test_user):
        key, _raw = await APIKeyService().create(test_user.id, APIKeyCreate(name="old"))
        await APIKeyService().revoke(key)
        await APIKeyService().delete(key)
        assert [e.key_ids for e in seen] == [frozenset({key.id})] * 2
        assert await OxydeAPIKey.objects.filter(id=key.id).count() == 0

    @pytest.mark.parametrize("method", ["revoke", "delete"])
    async def test_a_failed_call_leaves_the_object_as_the_database_has_it(
        self, seen, monkeypatch, test_user, method,
    ):
        """PR #359 review, 5: the transaction rolled back, so the caller's
        object must not say the key is revoked."""
        key, _raw = await APIKeyService().create(test_user.id, APIKeyCreate(name="k"))

        async def broken(self, *args, **kwargs):
            raise RuntimeError("cascade failed")

        monkeypatch.setattr(RevocationService, "revoke_for_keys", broken)
        with pytest.raises(RuntimeError):
            await getattr(APIKeyService(), method)(key)
        assert key.is_active is True
        assert (await OxydeAPIKey.objects.get(id=key.id)).is_active is True
        assert seen == []

    @pytest.mark.parametrize("method", ["revoke", "delete"])
    async def test_cancelled_while_the_hooks_run_keeps_the_committed_state(self, seen, test_user, method):
        """PR #359 re-review, 2: a request cancelled during the hook
        dispatch, after the commit, must not put is_active back."""
        key, _raw = await APIKeyService().create(test_user.id, APIKeyCreate(name="k"))
        started, release = asyncio.Event(), asyncio.Event()

        async def blocking(event):
            started.set()
            await release.wait()

        remove = credential_events.register(blocking)
        try:
            task = asyncio.create_task(getattr(APIKeyService(), method)(key))
            await asyncio.wait_for(started.wait(), 5)
            task.cancel()
            with pytest.raises(asyncio.CancelledError):
                await task
            assert key.is_active is False
            rows = await OxydeAPIKey.objects.filter(id=key.id).all()
            assert [r.is_active for r in rows] == ([False] if method == "revoke" else [])
        finally:
            release.set()
            remove()
            from app.db.transactions import drain_detached

            await asyncio.wait_for(drain_detached(), 5)

    async def test_a_failed_delete_ends_nothing(self, seen, monkeypatch, test_user):
        key, _raw = await APIKeyService().create(test_user.id, APIKeyCreate(name="k"))

        async def broken(self, *args, **kwargs):
            raise RuntimeError("delete failed")

        monkeypatch.setattr(OxydeAPIKey, "delete", broken)
        with pytest.raises(RuntimeError):
            await APIKeyService().delete(key)
        monkeypatch.undo()
        assert seen == []
        assert (await OxydeAPIKey.objects.get(id=key.id)).is_active is True


class TestStalePushBindings:
    async def test_the_startup_sweep_deletes_devices_of_dead_credentials_only(
        self, monkeypatch, test_team, test_user,
    ):
        """A process that died between a revocation's commit and its hooks
        leaves the device; the sweep at startup removes it."""
        enable_oauth(monkeypatch)
        dead_key, _ = await APIKeyService().create(test_user.id, APIKeyCreate(name="dead"))
        live_key, _ = await APIKeyService().create(test_user.id, APIKeyCreate(name="live"))
        agent = await make_agent(test_team, test_user)
        issued = await connector_token(agent, test_team, test_user)
        dead = await _device(test_user, INSTALL, "https://ntfy.example.net/a", key_id=dead_key.id)
        live = await _device(test_user, INSTALL2, "https://ntfy.example.net/b", key_id=live_key.id)
        session = await _device(test_user, "install-3", "https://ntfy.example.net/c", session_id=issued.holder_session_id)
        # Revoked behind the hooks' back, as if the process died after the commit.
        await OxydeAPIKey.objects.filter(id=dead_key.id).update(is_active=False)
        await OxydeHolderSession.objects.filter(id=issued.holder_session_id).update(
            revoked_at=datetime.now(timezone.utc),
        )
        assert await PushService().delete_stale_bindings() == 2
        remaining = {d.id for d in await OxydePushDevice.objects.all()}
        assert remaining == {live.id}
        assert dead.id not in remaining and session.id not in remaining
        assert await PushService().delete_stale_bindings() == 0


class TestStartupSweepWiring:
    """PR #356 review, 6: the lifespan runs the sweep, and a sweep that
    fails is logged and does not stop the server."""

    @pytest.fixture
    def stubbed_lifespan(self, db, monkeypatch):
        import contextlib

        import app.main as main

        async def noop(*args, **kwargs):
            return None

        @contextlib.asynccontextmanager
        async def no_mcp():
            yield

        for name in ("init_oxyde", "close_oxyde", "bootstrap_if_empty", "verify_migrations_current",
                     "_mcp_toolset_fingerprint"):
            monkeypatch.setattr(main, name, noop)
        monkeypatch.setattr(main, "get_version_info", lambda *a, **k: None)
        monkeypatch.setattr(main, "mcp_lifespan", no_mcp)
        monkeypatch.setattr(main.settings, "secret_key", "x" * 32)
        return main

    async def test_the_lifespan_sweeps(self, stubbed_lifespan, monkeypatch):
        calls = []

        async def sweep(self):
            calls.append(True)
            return 0

        monkeypatch.setattr(PushService, "delete_stale_bindings", sweep)
        async with stubbed_lifespan.lifespan(stubbed_lifespan.app):
            assert calls == [True]

    async def test_a_failing_sweep_is_logged_and_startup_goes_on(self, stubbed_lifespan, monkeypatch, caplog):
        async def sweep(self):
            raise RuntimeError("database is locked")

        monkeypatch.setattr(PushService, "delete_stale_bindings", sweep)
        with caplog.at_level(logging.ERROR, logger="app.main"):
            async with stubbed_lifespan.lifespan(stubbed_lifespan.app):
                pass
        assert "could not sweep push devices" in caplog.text
