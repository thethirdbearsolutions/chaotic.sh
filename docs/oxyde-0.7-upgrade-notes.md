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
- oxyde 0.7.1, no code changes: **124 failed, 1000 passed** (~82 new failures).
- After fixes on this branch: see PR description / commits.

(Coverage disabled with `--no-cov` throughout: repo `.coveragerc` references a
missing greenlet concurrency plugin.)

## Migration rehearsal

(filled in below after running against a copied production backup)
