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


async def test_cancelling_the_committer_does_not_lose_callbacks(db):
    """CHT-1632 R2: the write has committed, so what reports it must go
    out even when the request is cancelled mid-dispatch."""
    from app.db import transactions

    seen, cb, flush = _recorder()
    started, release = asyncio.Event(), asyncio.Event()

    async def slow():
        started.set()
        await release.wait()
        seen.append("slow")

    async def request():
        async with atomic():
            await OxydeTeam.objects.create(name="A", key="AAA")
            await on_commit(slow)
            await on_commit(cb("after"))
            await on_commit_collect("k", 1, flush)

    task = asyncio.create_task(request())
    await started.wait()
    task.cancel()
    with pytest.raises(asyncio.CancelledError):
        await task
    assert transactions._detached
    release.set()
    await asyncio.gather(*list(transactions._detached))
    assert seen == ["slow", "after", ("flush", [1])]
    assert not transactions._detached and await _teams() == 1


async def test_an_interrupted_callback_is_logged_and_propagates(db):
    """Review finding 7: a callback that raises a BaseException ends the
    dispatch, loudly; the callbacks after it are not run."""
    from . import conftest

    seen, cb, _ = _recorder()

    async def interrupted():
        raise asyncio.CancelledError

    with pytest.raises(asyncio.CancelledError):
        async with atomic():
            await on_commit(interrupted)
            await on_commit(cb("after"))
    assert seen == []
    assert any("interrupted" in e for e in conftest.push_errors)
    conftest.push_errors.clear()


async def test_a_detached_dispatch_that_fails_is_logged_and_retrieved(db):
    from app.db import transactions

    from . import conftest

    started, release = asyncio.Event(), asyncio.Event()

    async def slow_then_interrupted():
        started.set()
        await release.wait()
        raise asyncio.CancelledError

    async def request():
        async with atomic():
            await on_commit(slow_then_interrupted)

    task = asyncio.create_task(request())
    await started.wait()
    task.cancel()
    with pytest.raises(asyncio.CancelledError):
        await task
    release.set()
    await transactions.drain_detached()
    assert not transactions._detached
    assert any("interrupted" in e for e in conftest.push_errors)
    conftest.push_errors.clear()


async def test_callbacks_run_outside_the_committed_transaction(db):
    """The dispatch task starts after the commit: a callback that writes
    opens a transaction of its own, and one it registers runs at once."""
    seen, cb, _ = _recorder()

    async def writes():
        async with atomic():
            await OxydeTeam.objects.create(name="B", key="BBB")
            await on_commit(cb("nested"))
        seen.append("wrote")

    async with atomic():
        await on_commit(writes)
    assert seen == ["nested", "wrote"] and await _teams() == 1


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


# What opens an Oxyde transaction, under any spelling (CHT-1632 R3).
_OPENERS = {"atomic", "AtomicTransactionContext", "AsyncTransaction"}
_PRIVATE_HANDLE = "_oxyde_atomic"


def _is_oxyde_module(dotted: str) -> bool:
    import importlib.util

    try:
        return importlib.util.find_spec(dotted) is not None
    except (ImportError, ValueError):
        return False


def _oxyde_transaction_uses(source: str) -> list[str]:
    """Each place ``source`` reaches one of Oxyde's transaction openers:
    imported by name from any oxyde module, or as an attribute of a name
    bound to an oxyde module (``import oxyde``, ``import
    oxyde.db.transaction as tx``, ``from oxyde.db import transaction``)."""
    tree = ast.parse(source)
    modules: set[str] = set()
    found = []
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            for alias in node.names:
                if alias.name.split(".")[0] == "oxyde":
                    modules.add(alias.asname or alias.name.split(".")[0])
        elif isinstance(node, ast.ImportFrom) and node.module and node.module.split(".")[0] == "oxyde":
            for alias in node.names:
                if alias.name == "*":
                    # Binds atomic and friends without naming them.
                    found.append(f"from {node.module} import *")
                elif alias.name in _OPENERS:
                    found.append(f"from {node.module} import {alias.name}")
                elif _is_oxyde_module(f"{node.module}.{alias.name}"):
                    modules.add(alias.asname or alias.name)
    for node in ast.walk(tree):
        # app.db.transactions' own handle on Oxyde's atomic, reached from
        # outside it (the file itself is exempt).
        if isinstance(node, ast.ImportFrom) and any(a.name == _PRIVATE_HANDLE for a in node.names):
            found.append(f"from {node.module} import {_PRIVATE_HANDLE}")
        elif isinstance(node, ast.Attribute) and node.attr == _PRIVATE_HANDLE:
            found.append(f"{ast.unparse(node)} (line {node.lineno})")
        if isinstance(node, ast.Attribute) and node.attr in _OPENERS:
            root = node.value
            while isinstance(root, ast.Attribute):
                root = root.value
            if isinstance(root, ast.Name) and root.id in modules:
                found.append(f"{ast.unparse(node)} (line {node.lineno})")
    return found


@pytest.mark.parametrize("source", [
    "from oxyde import atomic",
    "from oxyde.db.transaction import atomic as a",
    "from oxyde.db.transaction import AtomicTransactionContext",
    "import oxyde\noxyde.atomic()",
    "import oxyde.db.transaction\noxyde.db.transaction.atomic()",
    "import oxyde.db.transaction as tx\ntx.atomic()",
    "from oxyde.db import transaction\ntransaction.AtomicTransactionContext()",
    "from oxyde import db\ndb.transaction.atomic()",
    "from oxyde import *\natomic()",
    "from oxyde.db.transaction import *\nAtomicTransactionContext()",
    "from app.db.transactions import _oxyde_atomic\n_oxyde_atomic()",
    "from app.db import transactions\ntransactions._oxyde_atomic()",
])
def test_the_guard_sees_every_spelling(source):
    assert _oxyde_transaction_uses(source)


@pytest.mark.parametrize("source", [
    "from oxyde.db.transaction import get_active_transaction",
    "from app.db.transactions import atomic",
    "import oxyde\noxyde.F('x')",
    "from oxyde import F\nF.atomic",
])
def test_the_guard_passes_other_uses(source):
    assert _oxyde_transaction_uses(source) == []


def test_app_never_opens_an_oxyde_transaction_directly():
    """Every transaction in app/ must be able to hold on-commit callbacks."""
    app_dir = Path(__file__).resolve().parents[1] / "app"
    offenders = []
    for path in app_dir.rglob("*.py"):
        if path.relative_to(app_dir).as_posix() == "db/transactions.py":
            continue
        offenders += [f"{path.relative_to(app_dir)}: {use}" for use in _oxyde_transaction_uses(path.read_text())]
    assert not offenders, f"use app.db.transactions.atomic: {offenders}"
