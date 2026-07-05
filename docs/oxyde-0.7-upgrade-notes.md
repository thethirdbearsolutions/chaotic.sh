# Oxyde 0.3.1 → 0.7.1 upgrade notes

Release notes for 0.4.x–0.6.x are empty upstream. Everything below comes from
reading `git diff v0.3.1 v0.7.1` of github.com/mr-fatalyst/oxyde (python layer
+ commit log). "Touches us" = grepped this backend for the API.

## Breaking / behavior changes upstream

| # | Change | Touches chaotic? |
|---|--------|------------------|
| 1 | `OxydeModel` renamed to `Model`. Old name still importable via module `__getattr__` but emits `DeprecationWarning`. | **Yes** — every model module (`app/oxyde_models/*.py`, 2 test files) does `from oxyde import OxydeModel, Field`. Works, but warns. Mechanical rename. |
| 2 | `Query.update()` now returns **affected-row count (int)** by default instead of list of updated row dicts. `returning=True` opts back in and returns validated model instances (not dicts). | **No** — both queryset-update call sites (`project_service.increment_issue_count`, `issue_service` project counter) discard the return value. `instance.save(update_fields=…)` internally uses `returning=True` and keeps prior semantics. |
| 3 | `Model.ensure_field_metadata()` and `Model._get_primary_key_field()` removed — metadata is finalized eagerly at class-definition time (`finalize_pending()`); PK cached at `Model._db_meta.pk_field`. | **No direct calls.** But it changes *when* FK resolution happens — models with forward-ref FKs must be resolvable at import time. Our models import fine (verified by test run). |
| 4 | `AsyncDatabase.execute_to_pylist()` / `execute_batched_dedup()` and `oxyde.core.execute_select_*` removed. Single `execute()` (msgpack columnar wire format) remains. | **No** — we only use `execute()` indirectly via managers and `execute_raw`. |
| 5 | `PoolSettings.batch_size` removed; TLS / pg / mysql settings added. | **No** — we never construct `PoolSettings`. |
| 6 | INSERT serialization: `_dump_insert_data` switched from `exclude_none=True` to `exclude_unset=True`, and now also excludes FK model fields and Pydantic computed fields. Consequence: creating via `Model(...).save()` no longer sends Pydantic-defaulted (unset) fields to the DB. | **Mostly no** — all creates go through `objects.create(**kwargs)` (kwargs are "set"), and `app/oxyde_db.py`'s default-factory monkeypatch supplies timestamps/uuids explicitly as kwargs. No `.save()`-as-create call sites. |
| 7 | `objects.create()` / `save()` now rebuild the instance via `model_validate` on the RETURNING row (validators actually run on returned data). | **Yes, positively** — the test-conftest "re-fetch after create for DbEnum coercion" patch becomes redundant but stays harmless. |
| 8 | `get_or_create()` now catches `IntegrityError` and re-fetches (race-safe). New `update_or_create()`. | No call sites; harmless. |
| 9 | Migration runner reworked: topological sort by `depends_on` everywhere, advisory locks pinned to one connection (pg/mysql; sqlite unchanged), `import_migration_module` → `oxyde.migrations.utils.load_migration_module`, `oxyde.migrations.types` module deleted. `makemigrations` now **hard-fails** if replaying existing migrations errors (previously warned + used empty baseline). | **Yes** — `chaotic system upgrade` shells out to the migration tool; our 5 migration files use `upgrade(ctx)` + fields dicts with `python_type`/`db_type` keys, which is still the supported format. Needs rehearsal on a real 0.3.1-era DB (below). |
| 10 | Wire format between Python and Rust core (oxyde-core 0.3.0 → 0.6.x): columnar `[columns, rows]` everywhere, dedup JOIN format `[cols, rows, relations]`, `db_column→field` remapping moved Python-side, typed value bindings (`value_type` hints) for Decimal/UUID/datetime. | Internal, but **this is where runtime breakage shows up** — enum/datetime binding behavior changed (see "Test delta" below). |
| 11 | `refresh()` no longer clobbers virtual relation fields (reverse FK / m2m). | Positive — we `.refresh()` after F() updates. |
| 12 | `F()` expressions: values serialized via TYPE_REGISTRY with typed bindings; Decimal arithmetic fixed. | We use `F("issue_count") + 1` (int) — fine. |
| 13 | Lookup escaping fixes: `contains`/`startswith`/`endswith`/`iexact` now escape `%`/`_` literally. | Behavioral fix; our search endpoints get more-correct semantics. No code change. |
| 14 | `group_by()` + `.all()` (model mode) now raises `TypeError` (must use `.values()`); `count()`/`exists()` rebuilt through `to_ir()`; `union()`/`union_all()` actually work now; `having()` understands annotation aliases. | No `group_by`/`union`/`having` call sites. |
| 15 | `save(update_fields={"fk_field"})` resolves virtual FK names to synthetic columns and raises `FieldError` for reverse-fk/m2m names instead of silently ignoring. | We pass concrete column fields only — fine. |
| 16 | Transactions: ContextVar ownership check (`task` field) — child asyncio tasks no longer inherit parent transactions. | We use `atomic()` in request handlers without spawning tasks inside — fine. |
| 17 | `Field()` return type annotation changed to `Any` (mypy-friendliness); `OxydeFieldInfo.is_virtual` added. | No impact. |

## Chaotic-specific patch points reviewed

- `app/oxyde_db.py` `_patch_objects_create_to_apply_default_factory()`:
  monkeypatches `QueryManager.create`. 0.7.1 still exposes
  `QueryManager.create(self, *, instance=None, …, **data)` and `model_class`
  attr, so the patch still applies cleanly. Still needed: 0.7.1's
  `exclude_unset` INSERT serialization means Pydantic defaults are *still* not
  sent for plain `create(**kwargs)` unless supplied — the patch supplies them.
- `tests/conftest.py` re-fetch-after-create patch: still applies (wraps the
  same method); redundant with 0.7.1's model_validate-on-RETURNING but
  harmless.

## Test delta

- Baseline, oxyde 0.3.1 (origin/main): **42 failed, 1082 passed** (pre-existing failures).
- oxyde 0.7.1, no code changes: **124 failed, 1000 passed** (~82 new failures; ~96 new / 13 baseline-flaky-fixed by set-diff).
- oxyde 0.7.1 after this branch's fixes: **42 failed, 1082 passed — the failure *set* is
  byte-identical to the 0.3.1 baseline.** Zero new failures, zero regressions.

Fixes applied (one commit each):
1. `OxydeModel` → `Model` rename in model modules + stubs (kills DeprecationWarnings).
2. `DateTimeUTC` annotation on every ORM datetime field — 0.7 binds datetimes as
   typed SQL timestamps so SQLite round-trips them naive, and create()/save()
   now re-validate instances from RETURNING rows; the validator re-attaches UTC.
   (`DateTimeUTC`/`ensure_utc` moved to `app/utils/datetimes.py`; `app.utils`
   re-exports unchanged.)
3. Extended the `objects.create()` patch in `app/oxyde_db.py` to pass plain
   non-None Pydantic defaults as explicit kwargs — 0.7 INSERTs with
   `exclude_unset`, so model defaults stopped reaching the DB and SQL column
   defaults won, including `rituals.approval_mode DEFAULT 'NONE'` which has no
   matching enum member (create() then failed validating its own RETURNING row).
4. One test assertion: after save(), `invitation.status` is now the coerced
   enum member (DbEnum's intended semantics), not the raw `'DECLINED'` string.
5. Test pool pinned to `max_connections=1`: FK-corruption tests bracket writes
   with `PRAGMA foreign_keys OFF/ON`; 0.7's pool routed the PRAGMA and the
   write to different connections (and 0.7 actually enforces FKs), making
   several tests flaky.

(Coverage disabled with `--no-cov` throughout: repo `.coveragerc` references a
missing greenlet concurrency plugin.)

## Migration rehearsal (real database copies, originals untouched)

### Scenario A — 0.3.1-era Oxyde database (`backend/chaotic.db`, copied to scratch)

DB state before: `oxyde_migrations` = `0001_initial`,
`0002_human_rituals_required_default_true` (a migration file that no longer
exists in `migrations/` — harmless, it's simply not pending).

With oxyde 0.7.1 (`DATABASE_URL=sqlite+aiosqlite:///<copy>`):

- `oxyde showmigrations` — works (its Applied/Pending arithmetic counts the
  orphaned applied name, cosmetic only).
- `oxyde migrate` — **applied 0002–0005 cleanly**, including 0005's
  PRAGMA-heavy table rebuild.
- Server boot (`uvicorn app.main:app`, `SECRET_KEY` set) — lifespan runs
  `apply_migrations()`, app starts healthy.
- End-to-end over HTTP against the migrated copy: `/health`, signup, login,
  team create, project create, issue create, issue list. Issue list hydrates
  the `creator` JOIN (`creator_name` populated); enum defaults come back
  correct (`status: backlog`, `priority: no_priority`); all timestamps
  tz-aware (`...Z`).

### Scenario B — pre-Oxyde (alembic-era) backup (`chaotic.db.backup.1`, Feb 5)

`oxyde migrate 0001_initial --fake` + `oxyde migrate` fails at the cleanup
migrations: `no such table: ticket_limbo`. **Verified identical failure under
oxyde 0.3.1** — this backup predates the schema `--fake-initial` assumes
(it has no ticket_limbo/ritual_groups/document_* tables), so this is a
pre-existing limitation of the `--fake-initial` flow for sufficiently old
databases, not an upgrade regression.

### makemigrations skew (pre-existing, not upgrade-caused)

`oxyde makemigrations --dry-run` reports a 36-operation diff (create
ticket_limbo_blockers / document_issues, many drop_foreign_key, drop
ticket_limbo.ritual_id). **The identical 36-op diff is produced on main with
oxyde 0.3.1** — models and the migration chain were already out of sync
(0002–0005 are raw-SQL migrations invisible to the replayer). `oxyde migrate`
(what `chaotic system upgrade` runs) is unaffected. Do not run
`makemigrations` expecting a no-op; that cleanup is a separate chore.

## Post-review changes (oppositional review on PR #197)

1. **`create(instance=...)` guard + `bulk_create` coverage** — the defaults
   patch injected kwargs unconditionally, which made `create(instance=...)`
   (the call `Model.save()`'s insert path makes) raise
   `ManagerError("either 'instance' or field values, not both")`. Now the
   instance path re-validates a full `model_dump()` so every field counts as
   "set" under exclude_unset INSERT serialization (defaults still land, no
   kwarg injection), and `bulk_create` gets the same treatment for both dict
   payloads and instances. Pinned by `tests/test_oxyde_create_defaults.py`
   (7 tests, all paths).
2. **Datetime normalization migration** —
   `migrations/0006_normalize_datetime_format.py` rewrites all 40 datetime
   columns across 22 tables to the naive space-separated form 0.7.1 writes,
   eliminating the mixed-format ordering hazard permanently. Empirical note:
   real 0.3.1-era rows in our DBs use `2026-02-19 18:17:39.823056+00:00`
   (space separator + offset), not the `T` separator the review predicted —
   with that shape, cross-time ORDER BY was already byte-correct and only
   exact-microsecond ties misordered. The migration handles `T`-separated
   and `Z`-suffixed variants anyway (other historical writers may have left
   them). Rehearsed on a fresh copy of the real 0.3.1-era dev DB: applied
   cleanly after 0002–0005, zero nonconforming values remained across all 40
   columns, server boots, old and new rows sort uniformly. Tests:
   `tests/test_datetime_normalization_migration.py` (5 tests: every variant,
   NULL passthrough, conforming no-op, bytewise==chronological, column-list
   drift check).
3. **Version cap** — `oxyde>=0.7.1,<0.8`. The monkeypatches are welded to
   0.7 internals and `chaotic system upgrade` re-resolves deps on user
   machines; 0.8 must be vetted like this PR was before it's allowed in.

Suite after review fixes: **42 failed, 1094 passed** — failure set still
byte-identical to the 0.3.1 baseline (the +12 passes are the new tests above).

## Open risks for production deploys

- ~~Datetime storage format mix~~ — resolved by migration 0006 (above).
- **FK enforcement semantics**: 0.7's SQLite pool enforces `PRAGMA
  foreign_keys`; 0.3.1 did not. Per the PR review's audit, production DDL
  (migrations 0001–0005) declares very few FK constraints — two clauses in
  0001 (document_issues) plus 0005's ticket_limbo tables — so mass
  IntegrityError on legacy dangling rows is unlikely. The real change:
  declared `ON DELETE CASCADE`/`SET NULL` clauses now actually fire (latent
  today; rituals are only soft-deleted). Separately, the test schema
  (`tests/conftest.py` `_SCHEMA_SQL`) declares ~55 FK clauses production
  doesn't have — pre-existing test/prod schema skew that FK enforcement
  makes behavior-relevant. Ticket fodder alongside the makemigrations skew.
- **`update()` return-type change**: any future code (or plugins) written
  against 0.3.1 examples that inspects the return of queryset `.update()`
  gets an int now. Chaotic's two call sites discard it.
- **get_or_create/update_or_create now swallow IntegrityError into a re-fetch** —
  behavior improvement, but different failure surface under concurrent writes.
- The monkeypatches in `app/oxyde_db.py` remain load-bearing (defaults
  injection for create/bulk_create). Version-capped to <0.8; re-vet on any
  oxyde bump, and revisit if upstream changes INSERT serialization semantics.
- **WAL + bare-file backup** (pre-existing, flagged by review): `chaotic
  system upgrade`'s backup copies the DB file without its `-wal` sidecar; a
  backup taken while the server is live can miss committed transactions.
  Should use `VACUUM INTO` or the sqlite3 backup API. Not this PR's scope.
