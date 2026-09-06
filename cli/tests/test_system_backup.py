"""`chaotic system backup` must be WAL-safe (CHT-1207).

The server runs SQLite in WAL mode. Committed transactions sit in
`chaotic.db-wal` until a checkpoint, so copying `chaotic.db` while the
server is up produced backups missing recent writes, and restoring a
copy next to a stale WAL would replay that WAL onto the restored file.
"""
import sqlite3

import pytest

from cli import system


@pytest.fixture
def live_db(tmp_path, monkeypatch):
    """A WAL-mode database with committed rows still sitting in the WAL
    (the writer connection stays open, so nothing checkpoints)."""
    db = tmp_path / "chaotic.db"
    monkeypatch.setattr(system, "DATA_DIR", tmp_path)
    monkeypatch.setattr(system, "DATABASE_PATH", db)
    writer = sqlite3.connect(db)
    writer.execute("PRAGMA journal_mode=WAL")
    writer.execute("CREATE TABLE issues (id INTEGER PRIMARY KEY, title TEXT)")
    writer.executemany("INSERT INTO issues (title) VALUES (?)", [(f"issue {i}",) for i in range(50)])
    writer.commit()
    yield db, writer
    writer.close()


def _count(path):
    conn = sqlite3.connect(f"file:{path}?mode=ro", uri=True)
    try:
        return conn.execute("SELECT count(*) FROM issues").fetchone()[0]
    finally:
        conn.close()


class TestCreateBackup:
    def test_backup_includes_rows_still_in_the_wal(self, live_db):
        db, writer = live_db
        wal = db.with_name("chaotic.db-wal")
        assert wal.exists() and wal.stat().st_size > 0, "precondition: writes are in the WAL"

        backup = system.create_backup()

        assert backup is not None and backup.parent == db.parent
        assert _count(backup) == 50
        # The backup is one self-contained file with no sidecars of its own.
        assert not backup.with_name(backup.name + "-wal").exists()

    def test_backup_is_consistent_while_a_writer_keeps_going(self, live_db):
        db, writer = live_db
        backup = system.create_backup()
        writer.execute("INSERT INTO issues (title) VALUES ('after')")
        writer.commit()
        assert _count(backup) == 50
        assert _count(db) == 51

    def test_no_database_means_no_backup(self, tmp_path, monkeypatch):
        monkeypatch.setattr(system, "DATA_DIR", tmp_path)
        monkeypatch.setattr(system, "DATABASE_PATH", tmp_path / "chaotic.db")
        assert system.create_backup() is None

    def test_corrupt_source_is_not_reported_as_a_backup(self, tmp_path, monkeypatch):
        db = tmp_path / "chaotic.db"
        db.write_bytes(b"SQLite format 3\x00" + b"\x00" * 4000)  # a header and garbage
        monkeypatch.setattr(system, "DATA_DIR", tmp_path)
        monkeypatch.setattr(system, "DATABASE_PATH", db)
        with pytest.raises(sqlite3.DatabaseError):
            system.create_backup()
        assert list(tmp_path.glob("chaotic.db.backup-*")) == [], "no half-written backup left behind"


class TestRestoreBackup:
    def test_restore_drops_stale_wal_sidecars(self, live_db):
        db, writer = live_db
        backup = system.create_backup()
        writer.execute("INSERT INTO issues (title) VALUES ('after backup')")
        writer.commit()
        writer.close()  # closing checkpoints; recreate a stale WAL by hand
        for suffix in ("-wal", "-shm"):
            db.with_name(db.name + suffix).write_bytes(b"stale")

        assert system.restore_backup(backup) is True

        for suffix in ("-wal", "-shm"):
            assert not db.with_name(db.name + suffix).exists()
        assert _count(db) == 50

    def test_missing_backup_is_refused(self, live_db):
        db, _ = live_db
        assert system.restore_backup(db.parent / "chaotic.db.backup-nope") is False
