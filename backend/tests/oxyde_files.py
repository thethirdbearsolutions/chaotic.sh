"""Handing SQLite files between Oxyde and Python's sqlite3 in one process
(CHT-1491).

Oxyde links its own copy of SQLite; `import sqlite3` is a second, separate
one. POSIX locks are per process, so neither copy can see the other's
locks. If both have the same WAL database open, Python's takes itself for
the only user: it truncates and rebuilds the -shm index that Oxyde has
mapped, and it drops Oxyde's locks when it closes. That gives SIGBUS, or
"database disk image is malformed" on Oxyde's next write. Oxyde's close
can also finish a few milliseconds after `disconnect_all()` returns, so
calling disconnect first does not make it safe either.

The rule for tests: a file Oxyde has had open reaches Python's sqlite3
only after `leave_wal_mode()`. In rollback-journal mode there is no -shm
and no -wal, an idle connection holds no lock, and a close does not
checkpoint, so a late close by Oxyde has nothing to break. To read or
write through Oxyde from synchronous test code, use `OxydeFile`.
"""
import asyncio
import threading
import uuid


async def leave_wal_mode(database=None) -> None:
    """Switch the database `database` (an Oxyde AsyncDatabase; default
    connection when None) to rollback-journal mode. That checkpoints the
    WAL and removes the -wal and -shm files. Raises if SQLite refuses,
    which it does while another connection has the file open."""
    from oxyde import execute_raw

    rows = await execute_raw("PRAGMA journal_mode = DELETE", client=database)
    mode = rows[0]["journal_mode"] if rows else None
    if mode != "delete":
        raise RuntimeError(f"could not take the database out of WAL mode (journal_mode={mode!r})")


class OxydeFile:
    """A file-backed SQLite database driven through Oxyde from synchronous
    test code, on a private event loop in a background thread. `database`
    is the AsyncDatabase, so it can be a migration context's `_db_conn`.
    `close()` leaves WAL mode before disconnecting, so Python's sqlite3 can
    open the file afterwards."""

    def __init__(self, path: str):
        from oxyde import AsyncDatabase, PoolSettings

        self._loop = asyncio.new_event_loop()
        self._thread = threading.Thread(target=self._loop.run_forever, name="oxyde-file", daemon=True)
        self._thread.start()
        # A pool name of its own, kept out of Oxyde's alias registry, so it
        # never replaces or outlives another test's "default".
        self.database = AsyncDatabase(
            f"sqlite:///{path}",
            name=f"oxyde-file-{uuid.uuid4().hex}",
            settings=PoolSettings(max_connections=1),
            auto_register=False,
        )
        self._call(self.database.connect())

    def _call(self, coroutine):
        return asyncio.run_coroutine_threadsafe(coroutine, self._loop).result()

    def query(self, sql: str, params: list | None = None) -> list[tuple]:
        from oxyde import execute_raw

        rows = self._call(execute_raw(sql, params, client=self.database))
        return [tuple(row.values()) for row in rows]

    def execute(self, sql: str, params: list | None = None) -> None:
        self.query(sql, params)

    def close(self) -> None:
        try:
            self._call(leave_wal_mode(self.database))
        finally:
            try:
                self._call(self.database.disconnect())
            finally:
                self._loop.call_soon_threadsafe(self._loop.stop)
                self._thread.join()
                self._loop.close()
