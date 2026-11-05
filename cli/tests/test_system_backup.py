"""`chaotic system backup` must be WAL-safe (CHT-1207).

The server runs SQLite in WAL mode. Committed transactions sit in
`chaotic.db-wal` until a checkpoint, so copying `chaotic.db` while the
server is up produced backups missing recent writes, and restoring a
copy next to a stale WAL would replay that WAL onto the restored file.
"""
import hashlib
import io
import os
import sqlite3
import tarfile

import pytest

from cli import system


@pytest.fixture
def live_db(tmp_path, monkeypatch):
    """A WAL-mode database with committed rows still sitting in the WAL
    (the writer connection stays open, so nothing checkpoints)."""
    db = tmp_path / "chaotic.db"
    monkeypatch.setattr(system, "DATA_DIR", tmp_path)
    monkeypatch.setattr(system, "DATABASE_PATH", db)
    monkeypatch.setattr(system, "is_service_running", lambda: False)
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
        with pytest.raises(system.BackupError):
            system.create_backup()
        assert list(tmp_path.glob("chaotic.db.backup-*")) == [], "no half-written backup left behind"

    def test_locked_source_fails_within_the_timeout_instead_of_hanging(self, tmp_path, monkeypatch):
        """The backup API retries a locked source forever. A rollback-journal
        database held by an exclusive writer must fail loudly, not hang."""
        db = tmp_path / "chaotic.db"
        monkeypatch.setattr(system, "DATA_DIR", tmp_path)
        monkeypatch.setattr(system, "DATABASE_PATH", db)
        setup = sqlite3.connect(db)
        setup.execute("PRAGMA journal_mode=DELETE")
        setup.execute("CREATE TABLE t (x)")
        setup.commit()
        setup.close()
        holder = sqlite3.connect(db, isolation_level=None)
        holder.execute("BEGIN EXCLUSIVE")
        try:
            with pytest.raises(system.BackupError, match="locked"):
                system.create_backup(timeout=0.5)
        finally:
            holder.close()
        assert list(tmp_path.glob("chaotic.db.backup-*")) == []


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

    def test_refuses_while_the_service_is_running(self, live_db, monkeypatch):
        """Copying a backup over a database a live process has open loses the
        restore at best and corrupts the file at worst."""
        db, writer = live_db
        backup = system.create_backup()
        writer.execute("INSERT INTO issues (title) VALUES ('after backup')")
        writer.commit()
        monkeypatch.setattr(system, "is_service_running", lambda: True)

        assert system.restore_backup(backup) is False
        assert _count(db) == 51, "the live database was left alone"

    def test_refuses_while_something_holds_the_port(self, live_db, monkeypatch):
        """The CHT-1363 case: the service unit is stopped but a process it does
        not own still answers the port, so it still has the database open."""
        db, writer = live_db
        backup = system.create_backup()
        writer.execute("INSERT INTO issues (title) VALUES ('after backup')")
        writer.commit()
        monkeypatch.setattr(system, "is_port_in_use", lambda port, host="127.0.0.1": port == 24267)

        assert system.restore_backup(backup, port=24267) is False
        assert _count(db) == 51
        assert system.restore_backup(backup, port=24268) is True


def _blob(store, data):
    """Put `data` in the blob store under its sha256, as the server does."""
    sha = hashlib.sha256(data).hexdigest()
    path = store / sha[:2] / sha
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)
    return sha, path


class TestAttachmentsBackup:
    """The blob store is archived beside each backup and put back on
    restore (CHT-1996)."""

    @pytest.fixture
    def store(self, live_db):
        db, _ = live_db
        return db.parent / "attachments"

    @pytest.fixture
    def installed(self, monkeypatch):
        monkeypatch.setattr(system, "is_server_installed", lambda: True)
        monkeypatch.setattr(system, "load_server_json", lambda: {"port": 1})
        monkeypatch.setattr(system, "_socket_active", lambda: False)
        monkeypatch.setattr(system, "is_port_in_use", lambda port, host="127.0.0.1": False)

    def test_the_backup_archives_the_blobs_and_nothing_else(self, live_db, store):
        sha, _ = _blob(store, b"png bytes")
        (store / "tmp").mkdir()
        (store / "tmp" / "upload.part").write_bytes(b"half")
        (store / sha[:2] / "stray.txt").write_bytes(b"not a blob")

        backup = system.create_backup()

        archive = system.attachments_backup_for(backup)
        assert archive.name == backup.name.replace("chaotic.db.backup-", "attachments.backup-") + ".tar"
        with tarfile.open(archive) as tar:
            assert tar.getnames() == [f"{sha[:2]}/{sha}"]
        assert not archive.with_name(archive.name + ".partial").exists()

    def test_no_store_no_archive(self, live_db):
        backup = system.create_backup()
        assert not system.attachments_backup_for(backup).exists()

    def test_the_upgrade_backup_leaves_the_blobs_out(self, live_db, store):
        _blob(store, b"png bytes")
        backup = system.create_backup(attachments=False)
        assert backup.exists() and not system.attachments_backup_for(backup).exists()

    def test_a_failed_archive_discards_the_database_backup(self, live_db, store, monkeypatch):
        _blob(store, b"png bytes")

        def broken(*a, **k):
            raise OSError("disk full")

        monkeypatch.setattr(system.tarfile, "open", broken)

        with pytest.raises(system.BackupError, match="attachments"):
            system.create_backup()
        db, _ = live_db
        assert list(db.parent.glob("chaotic.db.backup-*")) == []
        assert list(db.parent.glob("attachments.backup-*")) == []

    def test_restore_puts_missing_blobs_back_and_leaves_the_rest(self, live_db, store):
        _, kept = _blob(store, b"still here")
        _, gone = _blob(store, b"deleted since")
        backup = system.create_backup()
        gone.unlink()
        _, newer = _blob(store, b"uploaded after the backup")

        restored, skipped = system.restore_attachments(system.attachments_backup_for(backup))

        assert (restored, skipped) == (1, 0)
        assert gone.read_bytes() == b"deleted since"
        assert kept.exists() and newer.exists()
        assert list(store.rglob("*.restoring")) == []

    def test_restore_refuses_members_that_are_not_blobs_or_do_not_match(self, live_db, store, tmp_path):
        archive = tmp_path / "attachments.backup-x.tar"
        good = b"good"
        good_sha = hashlib.sha256(good).hexdigest()
        lying_sha = hashlib.sha256(b"something else").hexdigest()
        with tarfile.open(archive, "w") as tar:
            for name, data in [
                (f"{good_sha[:2]}/{good_sha}", good),
                (f"{lying_sha[:2]}/{lying_sha}", b"not what the name says"),
                ("../../escape", b"x"),
                (f"/{good_sha[:2]}/abs", b"x"),
            ]:
                info = tarfile.TarInfo(name)
                info.size = len(data)
                tar.addfile(info, io.BytesIO(data))
            link = tarfile.TarInfo(f"{lying_sha[:2]}/{lying_sha[:2]}{'0' * 62}")
            link.type = tarfile.SYMTYPE
            link.linkname = "/etc/passwd"
            tar.addfile(link)

        restored, skipped = system.restore_attachments(archive)

        assert (restored, skipped) == (1, 4)
        assert (store / good_sha[:2] / good_sha).read_bytes() == good
        assert not (store / lying_sha[:2] / lying_sha).exists()
        assert not (store / lying_sha[:2] / f"{lying_sha[:2]}{'0' * 62}").exists()
        assert not (tmp_path / "escape").exists() and not (store.parent.parent / "escape").exists()

    def test_cleanup_removes_an_old_backups_archive(self, live_db, store, monkeypatch):
        db, _ = live_db
        _blob(store, b"x")
        stamps = iter(["20260101-000000", "20260102-000000"])
        monkeypatch.setattr(system, "get_backup_path", lambda ts=None: db.parent / f"chaotic.db.backup-{next(stamps)}")
        old = system.create_backup()
        os.utime(old, (1, 1))
        new = system.create_backup()

        system.cleanup_old_backups(keep=1)

        assert not old.exists() and not system.attachments_backup_for(old).exists()
        assert new.exists() and system.attachments_backup_for(new).exists()

    def test_the_restore_command_restores_both(self, live_db, store, installed):
        from click.testing import CliRunner

        db, writer = live_db
        _, path = _blob(store, b"evidence")
        backup = system.create_backup()
        path.unlink()
        writer.close()

        stamp = backup.name.removeprefix("chaotic.db.backup-")
        result = CliRunner().invoke(system.system, ["backup", "--restore", stamp])

        assert result.exit_code == 0, result.output
        assert "Database restored" in result.output
        assert "Attachments restored: 1 file(s)" in result.output
        assert path.read_bytes() == b"evidence"

    def test_an_unreadable_archive_fails_the_restore_after_the_database(self, live_db, store, installed):
        from click.testing import CliRunner

        db, writer = live_db
        _blob(store, b"evidence")
        backup = system.create_backup()
        system.attachments_backup_for(backup).write_bytes(b"not a tar")
        writer.close()

        result = CliRunner().invoke(system.system, ["backup", "--restore", "latest"])

        assert result.exit_code == 1, result.output
        assert "Database restored" in result.output
        assert "Could not restore the attachments" in result.output

    def test_a_backup_without_an_archive_says_so(self, live_db, installed):
        from click.testing import CliRunner

        db, writer = live_db
        system.create_backup()
        writer.close()

        result = CliRunner().invoke(system.system, ["backup", "--restore", "latest"])

        assert result.exit_code == 0, result.output
        assert "no attachments archive" in result.output

    def test_backup_and_list_report_the_archive(self, live_db, store, installed):
        from click.testing import CliRunner

        _blob(store, b"evidence")

        made = CliRunner().invoke(system.system, ["backup"])
        listed = CliRunner().invoke(system.system, ["backup", "--list"])

        assert made.exit_code == 0, made.output
        assert "Attachments archived: attachments.backup-" in made.output
        assert "attachments" in listed.output
