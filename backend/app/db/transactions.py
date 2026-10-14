"""Transactions with on-commit callbacks (CHT-1605).

Oxyde's ``atomic()`` has no on-commit hook, and a side effect that
leaves the process (a push notification, a socket close) must not run
for a write that may still roll back, nor be lost when the write
commits. Every transaction in ``app`` is opened with this module's
``atomic()`` (``tests/test_transactions.py`` keeps it that way), a
wrapper that holds what was registered inside it:

* ``on_commit(callback)``: run ``callback()`` once the outermost
  transaction has committed. Outside any transaction it runs at once.
* ``on_commit_collect(key, item, flush)``: gather ``item`` under ``key``
  and, after the commit, call ``flush(items)`` once for the whole
  transaction, so a writer called a hundred times in one transaction
  costs one dispatch.

Nothing registered runs when the transaction rolls back, or when it is
marked for rollback (``set_rollback``). What was registered inside a
nested ``atomic()`` (a savepoint) that exits with an exception is
dropped with the savepoint; what was registered in one that succeeds
waits for the outermost commit. Callbacks run in the order registered
(a ``flush`` at the place of its key's first item), after the commit
has returned; each runs on its own, and one that raises is logged and
cannot fail the request, whose write has already committed. A callback
that has slow work to do schedules it. The committing task waits for
them, but they run in a task of their own, shielded from its
cancellation: a request cancelled while they run (a client gone) is
still cancelled, and the callbacks it has not reached still run, since
what they report has committed (CHT-1632).

Registering inside a transaction opened with Oxyde's own ``atomic()``
raises RuntimeError: the callback could neither run now (the write is
not committed) nor later (nothing would call it). A task that does not
own the transaction (one created inside it) is outside it, as it is for
Oxyde, so its callbacks run at once.
"""
from __future__ import annotations

import asyncio
import logging
from collections.abc import Awaitable, Callable, Hashable
from contextvars import ContextVar
from datetime import timedelta
from typing import Any

from oxyde import atomic as _oxyde_atomic
from oxyde.db.transaction import get_active_transaction

logger = logging.getLogger(__name__)

Callback = Callable[[], Awaitable[None]]
Flush = Callable[[list], Awaitable[None]]


class _Frame:
    """What the outermost transaction of one task has registered."""

    __slots__ = ("task", "events", "rollback")

    def __init__(self) -> None:
        self.task = asyncio.current_task()
        # ("call", callback, None) or ("item", key, (flush, item)), in order.
        self.events: list[tuple[str, Any, Any]] = []
        self.rollback = False


_frame: ContextVar[_Frame | None] = ContextVar("app_transaction_frame", default=None)


def _current() -> _Frame | None:
    frame = _frame.get()
    return frame if frame is not None and frame.task is asyncio.current_task() else None


def _unhooked() -> RuntimeError:
    return RuntimeError(
        "an on-commit callback was registered inside oxyde.atomic(); "
        "open the transaction with app.db.transactions.atomic() (CHT-1605)"
    )


class atomic:  # noqa: N801 -- a drop-in for oxyde.atomic
    """``oxyde.atomic()`` that runs on-commit callbacks (module docstring)."""

    def __init__(self, *, timeout: float | int | timedelta | None = None):
        self._inner = _oxyde_atomic(timeout=timeout)
        self._frame: _Frame | None = None
        self._token = None
        self._mark: int | None = None

    async def __aenter__(self) -> "atomic":
        outer = _current()
        if outer is None and get_active_transaction() is not None:
            raise _unhooked()
        await self._inner.__aenter__()
        if outer is None:
            self._frame = _Frame()
            self._token = _frame.set(self._frame)
        else:
            self._frame, self._mark = outer, len(outer.events)
        return self

    async def __aexit__(self, exc_type, exc, tb) -> bool:
        frame = self._frame
        if self._mark is not None:  # a savepoint
            try:
                await self._inner.__aexit__(exc_type, exc, tb)
            finally:
                if exc_type is not None:
                    del frame.events[self._mark:]
            return False
        try:
            await self._inner.__aexit__(exc_type, exc, tb)
        finally:
            _frame.reset(self._token)
        if exc_type is None and not frame.rollback and frame.events:
            await _dispatch(frame.events)
        return False

    def set_rollback(self, rollback: bool = True) -> None:
        """Roll the whole transaction back at its end (as Oxyde does), so
        nothing registered in it runs."""
        self._inner.set_rollback(rollback)
        self._frame.rollback = bool(rollback)


# Dispatches whose committing task was cancelled, kept referenced until
# they finish.
_detached: set[asyncio.Task] = set()


async def _dispatch(events: list[tuple[str, Any, Any]]) -> None:
    """Run ``events`` in a task the committing task's cancellation does
    not reach (module docstring)."""
    task = asyncio.ensure_future(_run(events))
    try:
        await asyncio.shield(task)
    except asyncio.CancelledError:
        if not task.done():
            _detached.add(task)
            task.add_done_callback(_detached_done)
        raise


def _detached_done(task: asyncio.Task) -> None:
    _detached.discard(task)
    if not task.cancelled():
        task.exception()  # retrieved: _run logged it before re-raising


async def drain_detached() -> None:
    """Wait for the dispatches whose committing task was cancelled
    (shutdown, tests)."""
    while _detached:
        await asyncio.gather(*list(_detached), return_exceptions=True)


async def _run(events: list[tuple[str, Any, Any]]) -> None:
    order: list[tuple[str, Any]] = []
    batches: dict[Hashable, tuple[Flush, list]] = {}
    for kind, first, second in events:
        if kind == "call":
            order.append(("call", first))
            continue
        flush, item = second
        if first not in batches:
            batches[first] = (flush, [])
            order.append(("flush", first))
        batches[first][1].append(item)
    for kind, value in order:
        try:
            if kind == "call":
                await value()
            else:
                flush, items = batches[value]
                await flush(items)
        except Exception:
            logger.exception("on-commit callback %s failed", value)
        except BaseException:
            # Cancelled (a shutdown that stopped waiting) or worse: the
            # callbacks after this one are lost, which must not pass
            # silently, nor be swallowed (CHT-1632 review, finding 7).
            logger.exception("on-commit callback %s interrupted; later callbacks dropped", value)
            raise


def active() -> bool:
    """Whether this task is inside this module's atomic()."""
    return _current() is not None


async def on_commit(callback: Callback) -> None:
    """Run ``callback()`` after the current transaction commits, or now
    if there is none (module docstring)."""
    frame = _current()
    if frame is None:
        if get_active_transaction() is not None:
            raise _unhooked()
        await callback()
        return
    frame.events.append(("call", callback, None))


async def on_commit_collect(key: Hashable, item: Any, flush: Flush) -> None:
    """Add ``item`` to the current transaction's batch under ``key``;
    after the commit, ``flush(items)`` runs once for the batch. Outside a
    transaction, ``flush([item])`` runs now."""
    frame = _current()
    if frame is None:
        if get_active_transaction() is not None:
            raise _unhooked()
        await flush([item])
        return
    frame.events.append(("item", key, (flush, item)))
