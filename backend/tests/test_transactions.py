"""app.db.transactions (CHT-1605): atomic() with on-commit callbacks.

Callbacks run after the outermost commit, in order, once; never on a
rollback, a set_rollback or a failed commit; a savepoint that rolls back
takes its own callbacks with it. Every transaction in app/ is opened
with this atomic(), never Oxyde's.
"""
import asyncio
import ast
from pathlib import Path

import oxyde
import oxyde.db.transaction as oxyde_tx
import pytest

from app.db.transactions import atomic, on_commit, on_commit_collect
from app.oxyde_models.team import OxydeTeam


def _recorder():
    seen: list = []

    def callback(label):
        async def run():
            seen.append(label)
        return run

    async def flush(items):
        seen.append(("flush", list(items)))

    return seen, callback, flush


async def _teams() -> int:
    return await OxydeTeam.objects.count()


async def test_runs_after_commit_in_order(db):
    seen, cb, flush = _recorder()
    async with atomic():
        await OxydeTeam.objects.create(name="A", key="AAA")
        await on_commit(cb("one"))
        await on_commit_collect("k", 1, flush)
        await on_commit(cb("two"))
        await on_commit_collect("k", 2, flush)
        assert seen == []
    assert seen == ["one", ("flush", [1, 2]), "two"]
    assert await _teams() == 1


async def test_outside_a_transaction_runs_now(db):
    seen, cb, flush = _recorder()
    await on_commit(cb("now"))
    await on_commit_collect("k", 1, flush)
    assert seen == ["now", ("flush", [1])]


async def test_rollback_runs_nothing(db):
    seen, cb, flush = _recorder()
    with pytest.raises(ValueError):
        async with atomic():
            await on_commit(cb("x"))
            await on_commit_collect("k", 1, flush)
            raise ValueError
    assert seen == []


async def test_set_rollback_runs_nothing(db):
    seen, cb, _ = _recorder()
    async with atomic() as tx:
        await OxydeTeam.objects.create(name="A", key="AAA")
        await on_commit(cb("x"))
        tx.set_rollback()
    assert seen == [] and await _teams() == 0


async def test_savepoints(db):
    seen, cb, flush = _recorder()
    async with atomic():
        await on_commit(cb("outer"))
        with pytest.raises(ValueError):
            async with atomic():
                await on_commit(cb("dropped"))
                await on_commit_collect("k", "dropped", flush)
                raise ValueError
        async with atomic():
            await on_commit(cb("kept"))
            await on_commit_collect("k", "kept", flush)
        assert seen == []
    assert seen == ["outer", "kept", ("flush", ["kept"])]


async def test_a_failed_commit_runs_nothing(db, monkeypatch):
    seen, cb, _ = _recorder()

    async def failing(tx_id):
        await oxyde_tx._rollback_transaction(tx_id)  # release the connection, as a failed COMMIT would
        raise RuntimeError("disk full")

    real = oxyde_tx._commit_transaction
    monkeypatch.setattr(oxyde_tx, "_commit_transaction", failing)
    with pytest.raises(RuntimeError, match="disk full"):
        async with atomic():
            await on_commit(cb("x"))
    monkeypatch.setattr(oxyde_tx, "_commit_transaction", real)
    assert seen == []


async def test_runs_only_once_the_commit_has_returned(db, monkeypatch):
    events = []
    real = oxyde_tx._commit_transaction

    async def slow(tx_id):
        await asyncio.sleep(0.2)
        await real(tx_id)
        events.append("committed")

    async def callback():
        events.append("callback")

    monkeypatch.setattr(oxyde_tx, "_commit_transaction", slow)
    async with atomic():
        await on_commit(callback)
    assert events == ["committed", "callback"]


async def test_a_failing_callback_is_logged_and_the_rest_run(db, caplog):
    from . import conftest

    seen, cb, _ = _recorder()

    async def boom():
        raise RuntimeError("bad callback")

    async with atomic():
        await on_commit(boom)
        await on_commit(cb("after"))
    assert seen == ["after"]
    assert any("on-commit callback" in e for e in conftest.push_errors)
    conftest.push_errors.clear()


async def test_a_child_task_is_outside_the_transaction(db):
    seen, cb, _ = _recorder()
    async with atomic():
        await asyncio.create_task(on_commit(cb("child")))
        assert seen == ["child"]


async def test_registering_in_a_plain_oxyde_transaction_raises(db):
    seen, cb, flush = _recorder()
    async with oxyde.atomic():
        with pytest.raises(RuntimeError, match="app.db.transactions.atomic"):
            await on_commit(cb("x"))
        with pytest.raises(RuntimeError):
            await on_commit_collect("k", 1, flush)
        with pytest.raises(RuntimeError):
            async with atomic():
                pass
    assert seen == []


def test_app_never_opens_an_oxyde_transaction_directly():
    """Every transaction in app/ must be able to hold on-commit callbacks."""
    app_dir = Path(__file__).resolve().parents[1] / "app"
    offenders = []
    for path in app_dir.rglob("*.py"):
        if path.relative_to(app_dir).as_posix() == "db/transactions.py":
            continue
        for node in ast.walk(ast.parse(path.read_text())):
            if isinstance(node, ast.ImportFrom) and node.module and node.module.startswith("oxyde"):
                if any(alias.name == "atomic" for alias in node.names):
                    offenders.append(str(path.relative_to(app_dir)))
            elif isinstance(node, ast.Attribute) and node.attr == "atomic" and (
                isinstance(node.value, ast.Name) and node.value.id == "oxyde"
            ):
                offenders.append(str(path.relative_to(app_dir)))
    assert not offenders, f"use app.db.transactions.atomic: {offenders}"


