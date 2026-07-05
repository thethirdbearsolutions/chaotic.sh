"""Tests for `chaotic await`.

Focused on the behaviors the docs commit to: command-tree shape, type-token
vocabulary, exit-code mapping, scope-resolution errors, --until predicate
contract, and the JSON output discipline. Polling itself is exercised via
a controllable fetch function so tests don't need a running server.
"""
from datetime import datetime, timedelta, timezone
import os
import signal
import time
import json

import pytest

from cli.commands import await_cmd


# ---------------------------------------------------------------------------
# Pure helpers (no Click runner, no patching needed)
# ---------------------------------------------------------------------------


class TestParseDuration:
    def test_none_means_no_timeout(self):
        assert await_cmd._parse_duration(None) is None
        assert await_cmd._parse_duration("") is None
        assert await_cmd._parse_duration("   ") is None

    def test_bare_integer_is_seconds(self):
        assert await_cmd._parse_duration("30") == 30.0

    def test_unit_suffixes(self):
        assert await_cmd._parse_duration("30s") == 30.0
        assert await_cmd._parse_duration("5m") == 300.0
        assert await_cmd._parse_duration("2h") == 7200.0
        assert await_cmd._parse_duration("1d") == 86400.0

    def test_compound(self):
        assert await_cmd._parse_duration("1h30m") == 5400.0

    def test_malformed_raises(self):
        import click
        with pytest.raises(click.BadParameter):
            await_cmd._parse_duration("nope")


class TestTypeTokenResolution:
    def test_none_means_any(self):
        assert await_cmd._resolve_type_filter(None) is None
        assert await_cmd._resolve_type_filter("any") is None

    def test_single_token(self):
        assert await_cmd._resolve_type_filter("commented") == {
            "commented", "doc_commented",
        }

    def test_multiple_tokens_union(self):
        out = await_cmd._resolve_type_filter("status_changed,assigned")
        assert out == {"status_changed", "assigned"}

    def test_any_anywhere_means_no_filter(self):
        # If 'any' appears in a comma list, the whole spec is no-filter.
        assert await_cmd._resolve_type_filter("commented,any") is None

    def test_unknown_token_raises(self):
        import click
        with pytest.raises(click.BadParameter):
            await_cmd._resolve_type_filter("not_a_real_token")

    def test_intent_and_ritual_tokens_map_to_new_enum_values(self):
        # These are the wake events the future use case (and the agent
        # await harness) depends on.
        assert await_cmd._resolve_type_filter("intent_opened") == {"intent_opened"}
        assert await_cmd._resolve_type_filter("intent_cleared") == {"intent_cleared"}
        assert await_cmd._resolve_type_filter("intent_canceled") == {"intent_canceled"}
        assert await_cmd._resolve_type_filter("approved") == {"ritual_approved"}
        assert await_cmd._resolve_type_filter("attested") == {"ritual_attested"}


class TestEventScopeMatching:
    def test_issue_scope_matches_issue_events(self):
        scope = {"issue_id": "iss_1"}
        assert await_cmd._event_matches_scope({"issue_id": "iss_1"}, scope)
        assert not await_cmd._event_matches_scope({"issue_id": "iss_2"}, scope)

    def test_ritual_name_matches_field_name_or_new_value(self):
        scope = {"ritual_name": "code-review"}
        # RITUAL_ATTESTED puts the ritual name in field_name.
        assert await_cmd._event_matches_scope(
            {"activity_type": "ritual_attested",
             "field_name": "code-review", "new_value": None},
            scope,
        )
        # RITUAL_APPROVED puts the ritual name in new_value.
        assert await_cmd._event_matches_scope(
            {"activity_type": "ritual_approved",
             "field_name": "status", "new_value": "code-review"},
            scope,
        )
        # Mismatch on both is rejected.
        assert not await_cmd._event_matches_scope(
            {"activity_type": "ritual_attested",
             "field_name": "other", "new_value": "other"},
            scope,
        )

    def test_ritual_name_match_is_per_activity_type_field(self):
        scope = {"ritual_name": "code-review"}
        # ATTESTED must match on field_name only; new_value carries the
        # attestation note, which could coincidentally equal the name.
        assert not await_cmd._event_matches_scope(
            {"activity_type": "ritual_attested",
             "field_name": "other", "new_value": "code-review"},
            scope,
        )
        # APPROVED must match on new_value only.
        assert not await_cmd._event_matches_scope(
            {"activity_type": "ritual_approved",
             "field_name": "code-review", "new_value": "other"},
            scope,
        )

    def test_ritual_scope_rejects_non_ritual_events(self):
        # A status named like the ritual must NOT wake the ritual wait.
        scope = {"ritual_name": "code-review"}
        assert not await_cmd._event_matches_scope(
            {"activity_type": "status_changed",
             "field_name": "status", "new_value": "code-review"},
            scope,
        )
        assert not await_cmd._event_matches_scope(
            {"activity_type": "moved_to_sprint",
             "field_name": None, "new_value": "code-review"},
            scope,
        )
        assert not await_cmd._event_matches_scope(
            {"activity_type": "commented",
             "field_name": "code-review", "new_value": None},
            scope,
        )

    def test_ritual_ticket_id_restricts_to_issue(self):
        scope = {"ritual_name": "x", "ritual_ticket_id": "iss_1"}
        assert await_cmd._event_matches_scope(
            {"activity_type": "ritual_attested",
             "field_name": "x", "issue_id": "iss_1"},
            scope,
        )
        assert not await_cmd._event_matches_scope(
            {"activity_type": "ritual_attested",
             "field_name": "x", "issue_id": "iss_2"},
            scope,
        )

    def test_intent_events_rejected_without_ticket_scope(self):
        # Intent events don't carry a ritual name (the intent covers all
        # claim/close-blocking rituals on the issue). Under
        # `await ritual NAME` without --ticket, we can't soundly
        # attribute an intent event to a named ritual, so we skip them.
        scope = {"ritual_name": "code-review"}
        for activity_type in ("intent_opened", "intent_cleared", "intent_canceled"):
            assert not await_cmd._event_matches_scope(
                {"activity_type": activity_type,
                 "issue_id": "iss_1",
                 "field_name": None,
                 "new_value": "close"},
                scope,
            ), f"{activity_type} should not match ritual-name-only scope"

    def test_intent_events_match_when_ticket_scope_present(self):
        # With --ticket (ritual_ticket_id), intent events are accepted
        # if the event's issue matches. The activity_type filter is
        # what gates the lifecycle event.
        scope = {"ritual_name": "code-review", "ritual_ticket_id": "iss_1"}
        for activity_type in ("intent_opened", "intent_cleared", "intent_canceled"):
            assert await_cmd._event_matches_scope(
                {"activity_type": activity_type,
                 "issue_id": "iss_1",
                 "field_name": None,
                 "new_value": "close"},
                scope,
            ), f"{activity_type} should match when ticket scope is present"
            # Wrong issue is still rejected.
            assert not await_cmd._event_matches_scope(
                {"activity_type": activity_type,
                 "issue_id": "iss_2",
                 "field_name": None,
                 "new_value": "close"},
                scope,
            )


class TestEventTypeFiltering:
    def test_none_filter_matches_all(self):
        assert await_cmd._event_matches_type(
            {"activity_type": "commented"}, None,
        )

    def test_set_filter_includes_doc_variants(self):
        wire = await_cmd._resolve_type_filter("commented")
        assert await_cmd._event_matches_type(
            {"activity_type": "commented"}, wire,
        )
        assert await_cmd._event_matches_type(
            {"activity_type": "doc_commented"}, wire,
        )
        assert not await_cmd._event_matches_type(
            {"activity_type": "status_changed"}, wire,
        )


# ---------------------------------------------------------------------------
# Transient error classification
# ---------------------------------------------------------------------------


class TestIsTransient:
    def test_connect_error_is_transient(self):
        import httpx
        assert await_cmd._is_transient(httpx.ConnectError("boom"))

    def test_timeout_is_transient(self):
        import httpx
        assert await_cmd._is_transient(httpx.TimeoutException("boom"))

    def test_apierror_without_status_code_is_transient(self):
        # The non-server-response form of APIError (e.g. local failure
        # before a status code is known). Treat as transient so a wait
        # doesn't die on a momentary blip.
        assert await_cmd._is_transient(await_cmd.APIError("network blip"))

    def test_apierror_429_is_transient(self):
        assert await_cmd._is_transient(
            await_cmd.APIError("rate limited", status_code=429),
        )

    def test_apierror_5xx_is_transient(self):
        for code in (500, 502, 503, 504):
            assert await_cmd._is_transient(
                await_cmd.APIError("server err", status_code=code),
            ), code

    def test_apierror_4xx_not_transient(self):
        # Auth/perm failures won't self-heal — kill the wait fast.
        for code in (400, 401, 403, 404, 422):
            assert not await_cmd._is_transient(
                await_cmd.APIError("client err", status_code=code),
            ), code

    def test_apierror_evaluation_does_not_raise(self):
        # Regression guard against the bug where APIError.status_code
        # didn't exist and `_is_transient` blew up with AttributeError
        # on every server error, killing all retries.
        try:
            await_cmd._is_transient(await_cmd.APIError("boom"))
        except AttributeError as exc:
            pytest.fail(f"_is_transient must not raise AttributeError: {exc}")


# ---------------------------------------------------------------------------
# Rendered (non-JSON) output
# ---------------------------------------------------------------------------


def _strip_ansi(s: str) -> str:
    import re as _re
    return _re.sub(r"\x1b\[[0-9;]*m", "", s)


class TestRenderEventLine:
    def test_basic_event_renders_all_visible_fields(self):
        event = {
            "created_at": "2026-05-11T14:22:07Z",
            "activity_type": "commented",
            "user_name": "ali",
            "issue_identifier": "CHT-1334",
            "issue_title": "Polling await command",
        }
        line = _strip_ansi(await_cmd._render_event_line(event))
        assert "2026-05-11 14:22:07" in line
        assert "commented" in line
        assert "CHT-1334" in line
        assert '"Polling await command"' in line
        assert "by ali" in line

    def test_status_change_shows_old_to_new(self):
        event = {
            "created_at": "2026-05-11T14:22:07Z",
            "activity_type": "status_changed",
            "user_name": "ali",
            "issue_identifier": "CHT-1334",
            "old_value": "todo",
            "new_value": "in_review",
        }
        line = _strip_ansi(await_cmd._render_event_line(event))
        assert "todo → in_review" in line

    def test_status_change_with_only_new_value(self):
        event = {
            "created_at": "2026-05-11T14:22:07Z",
            "activity_type": "status_changed",
            "user_name": "ali",
            "issue_identifier": "CHT-1334",
            "new_value": "done",
        }
        line = _strip_ansi(await_cmd._render_event_line(event))
        assert "→ done" in line

    def test_comment_event_omits_arrow(self):
        # Non-transition events shouldn't render an arrow even when
        # new_value is set (e.g. comment text snippets in future).
        event = {
            "activity_type": "commented",
            "user_name": "ali",
            "issue_identifier": "CHT-1334",
            "new_value": "looks great",
        }
        line = _strip_ansi(await_cmd._render_event_line(event))
        assert "→" not in line
        assert "(looks great)" in line

    def test_missing_fields_do_not_crash(self):
        # Partial event — no user, no target, no timestamp.
        line = _strip_ansi(await_cmd._render_event_line({}))
        assert "?" in line  # falls back gracefully

    def test_falls_back_to_user_id_when_no_name(self):
        event = {"activity_type": "commented", "user_id": "u_42"}
        line = _strip_ansi(await_cmd._render_event_line(event))
        assert "by u_42" in line


# ---------------------------------------------------------------------------
# --until predicate contract
# ---------------------------------------------------------------------------


class TestUntilPredicate:
    def test_zero_exit_means_match(self):
        assert await_cmd._run_until_predicate(
            "exit 0", {"id": "x"},
        ) is True

    def test_wedged_predicate_raises_predicate_broken(self, monkeypatch):
        # A predicate that outlives the execution ceiling must surface
        # as PredicateBroken, not hang the poll loop forever.
        monkeypatch.setattr(await_cmd, "_UNTIL_TIMEOUT_SECS", 0.2)
        with pytest.raises(await_cmd.PredicateBroken) as exc_info:
            await_cmd._run_until_predicate("sleep 10", {"id": "x"})
        assert "did not finish" in str(exc_info.value)

    def test_fast_predicate_unaffected_by_ceiling(self):
        assert await_cmd._run_until_predicate("true", {"id": "x"}) is True

    def test_nonzero_exit_means_keep_polling(self):
        assert await_cmd._run_until_predicate(
            "exit 1", {"id": "x"},
        ) is False

    def test_command_not_found_raises_predicate_broken(self):
        # Shell exit 127 = command not found. Predicate is genuinely
        # broken (jq not installed, typo, etc.) and we surface as a
        # fatal error rather than polling forever.
        with pytest.raises(await_cmd.PredicateBroken):
            await_cmd._run_until_predicate(
                "this_binary_does_not_exist_anywhere_12345", {"id": "x"},
            )

    def test_event_piped_to_stdin(self, tmp_path):
        # Write stdin to a file via the predicate, then assert the file
        # contains our event JSON. Demonstrates the event-on-stdin contract.
        sink = tmp_path / "payload.json"
        cmd = f"cat > {sink}"
        await_cmd._run_until_predicate(cmd, {"id": "evt_42"})
        data = json.loads(sink.read_text())
        assert data == {"id": "evt_42"}

    def test_event_not_interpolated_into_command(self, tmp_path):
        # An adversarial event value containing shell metacharacters must
        # NOT be interpolated into CMD. The predicate sees it on stdin,
        # not in argv.
        sink = tmp_path / "out.json"
        evt = {"id": "$(touch /tmp/should_not_exist_chaotic_test)"}
        await_cmd._run_until_predicate(f"cat > {sink}", evt)
        # Confirm the metacharacter survived as a literal string.
        assert json.loads(sink.read_text())["id"].startswith("$(")


# ---------------------------------------------------------------------------
# Polling loop
# ---------------------------------------------------------------------------


def _event(eid, ts, **extra):
    return {"id": eid, "created_at": ts.isoformat(), **extra}


class TestPollingLoop:
    def test_wakes_on_first_matching_event(self):
        watermark = datetime(2026, 1, 1, tzinfo=timezone.utc)
        later = watermark + timedelta(seconds=10)
        events = [
            _event("e1", later, activity_type="commented", user_id="u1"),
        ]

        def fetch(skip, limit):
            return events

        result = await_cmd._poll(
            fetch,
            watermark=watermark,
            scope={},
            type_filter=None,
            exclude_self_for=None,
            until_cmd=None,
            timeout_secs=5,
            interval_secs=0.01,
        )
        assert result["id"] == "e1"

    def test_skips_events_before_watermark(self):
        watermark = datetime(2026, 1, 1, tzinfo=timezone.utc)
        before = watermark - timedelta(seconds=10)
        after = watermark + timedelta(seconds=5)
        events = [
            _event("old", before, activity_type="commented"),
            _event("new", after, activity_type="commented"),
        ]

        def fetch(skip, limit):
            return events

        result = await_cmd._poll(
            fetch, watermark=watermark, scope={}, type_filter=None,
            exclude_self_for=None, until_cmd=None,
            timeout_secs=5, interval_secs=0.01,
        )
        assert result["id"] == "new"

    def test_returns_none_on_timeout_with_no_matches(self):
        watermark = datetime(2026, 1, 1, tzinfo=timezone.utc)

        def fetch(skip, limit):
            return []

        result = await_cmd._poll(
            fetch, watermark=watermark, scope={}, type_filter=None,
            exclude_self_for=None, until_cmd=None,
            timeout_secs=0.2, interval_secs=0.05,
        )
        assert result is None

    def test_excludes_self_authored_events(self):
        watermark = datetime(2026, 1, 1, tzinfo=timezone.utc)
        later = watermark + timedelta(seconds=10)
        events = [
            _event("mine", later, activity_type="commented", user_id="me"),
        ]

        def fetch(skip, limit):
            return events

        result = await_cmd._poll(
            fetch, watermark=watermark, scope={}, type_filter=None,
            exclude_self_for="me", until_cmd=None,
            timeout_secs=0.2, interval_secs=0.05,
        )
        # Excluded → no match → timeout.
        assert result is None

    def test_type_filter_rejects_non_matching(self):
        watermark = datetime(2026, 1, 1, tzinfo=timezone.utc)
        later = watermark + timedelta(seconds=10)
        events = [
            _event("e1", later, activity_type="updated"),
        ]

        def fetch(skip, limit):
            return events

        result = await_cmd._poll(
            fetch, watermark=watermark, scope={},
            type_filter={"commented"},
            exclude_self_for=None, until_cmd=None,
            timeout_secs=0.2, interval_secs=0.05,
        )
        assert result is None

    def test_until_predicate_filters_candidates(self):
        watermark = datetime(2026, 1, 1, tzinfo=timezone.utc)
        later = watermark + timedelta(seconds=10)
        # First event is rejected by predicate (exit 1); second matches.
        events = [
            _event("reject", later, activity_type="commented", new_value="no"),
            _event(
                "accept",
                later + timedelta(seconds=1),
                activity_type="commented",
                new_value="yes",
            ),
        ]

        def fetch(skip, limit):
            return events

        result = await_cmd._poll(
            fetch, watermark=watermark, scope={}, type_filter=None,
            exclude_self_for=None,
            until_cmd='grep -q yes',
            timeout_secs=2, interval_secs=0.05,
        )
        assert result["id"] == "accept"

    def test_seen_ids_prevent_double_emission(self):
        # If the server returns the same row across multiple polls,
        # we should still wake on it exactly once.
        watermark = datetime(2026, 1, 1, tzinfo=timezone.utc)
        later = watermark + timedelta(seconds=10)
        events = [_event("e1", later, activity_type="commented")]
        call_count = {"n": 0}

        def fetch(skip, limit):
            call_count["n"] += 1
            return events

        result = await_cmd._poll(
            fetch, watermark=watermark, scope={}, type_filter=None,
            exclude_self_for=None, until_cmd=None,
            timeout_secs=2, interval_secs=0.05,
        )
        # First call returns the event; loop exits immediately.
        assert result["id"] == "e1"
        assert call_count["n"] == 1

    def test_event_at_exact_watermark_is_candidate(self):
        # Servers that truncate created_at to the second can stamp an
        # event in the same instant the wait starts. Equal-timestamp
        # events must be candidates (strict-less-than filter).
        watermark = datetime(2026, 1, 1, tzinfo=timezone.utc)
        events = [_event("e1", watermark, activity_type="commented")]

        def fetch(skip, limit):
            return events

        result = await_cmd._poll(
            fetch, watermark=watermark, scope={}, type_filter=None,
            exclude_self_for=None, until_cmd=None,
            timeout_secs=5, interval_secs=0.01,
        )
        assert result["id"] == "e1"

    def test_wakes_on_event_beyond_first_page(self):
        # A burst larger than one page (e.g. after a backoff window)
        # must not drop the older events past page 1.
        watermark = datetime(2026, 1, 1, tzinfo=timezone.utc)
        target = _event(
            "target", watermark + timedelta(seconds=1),
            activity_type="commented",
        )
        page1 = [
            _event(f"noise{i}", watermark + timedelta(seconds=500 - i),
                   activity_type="updated")
            for i in range(await_cmd._PAGE_LIMIT)
        ]
        page2 = [target, _event("old", watermark - timedelta(seconds=5),
                                activity_type="commented")]

        def fetch(skip, limit):
            if skip == 0:
                return page1
            if skip == await_cmd._PAGE_LIMIT:
                return page2
            return []

        result = await_cmd._poll(
            fetch, watermark=watermark, scope={},
            type_filter={"commented"},
            exclude_self_for=None, until_cmd=None,
            timeout_secs=5, interval_secs=0.01,
        )
        assert result["id"] == "target"


class TestFetchNewPages:
    def _full_page(self, base_ts, n_start):
        return [
            _event(f"e{n_start + i}", base_ts - timedelta(seconds=i))
            for i in range(await_cmd._PAGE_LIMIT)
        ]

    def test_short_page_ends_walk(self):
        floor = datetime(2026, 1, 1, tzinfo=timezone.utc)
        calls = []

        def fetch(skip, limit):
            calls.append((skip, limit))
            return [_event("e1", floor + timedelta(seconds=1))]

        rows = await_cmd._fetch_new_pages(fetch, floor)
        assert len(rows) == 1
        assert calls == [(0, await_cmd._PAGE_LIMIT)]

    def test_walk_stops_when_page_reaches_floor(self):
        floor = datetime(2026, 1, 1, tzinfo=timezone.utc)
        # Page 1 entirely above floor; page 2 crosses it.
        page1 = self._full_page(floor + timedelta(seconds=1000), 0)
        page2 = [_event("below", floor - timedelta(seconds=1))] * await_cmd._PAGE_LIMIT
        calls = []

        def fetch(skip, limit):
            calls.append(skip)
            return page1 if skip == 0 else page2

        rows = await_cmd._fetch_new_pages(fetch, floor)
        assert calls == [0, await_cmd._PAGE_LIMIT]
        assert len(rows) == 2 * await_cmd._PAGE_LIMIT

    def test_depth_cap_warns_and_stops(self, capsys):
        floor = datetime(2026, 1, 1, tzinfo=timezone.utc)
        calls = []

        def fetch(skip, limit):
            calls.append(skip)
            # Every page full and entirely above the floor.
            return self._full_page(
                floor + timedelta(seconds=10_000_000 - skip), skip,
            )

        await_cmd._fetch_new_pages(fetch, floor)
        assert len(calls) == await_cmd._MAX_PAGES
        assert "may be missed" in capsys.readouterr().err

    def test_rows_without_timestamps_do_not_break_walk(self):
        floor = datetime(2026, 1, 1, tzinfo=timezone.utc)

        def fetch(skip, limit):
            return [{"id": "no-ts"}]

        rows = await_cmd._fetch_new_pages(fetch, floor)
        assert rows == [{"id": "no-ts"}]


class TestPruneSeen:
    def test_prunes_entries_older_than_floor(self):
        floor = datetime(2026, 1, 1, tzinfo=timezone.utc)
        seen = {
            "old": floor - timedelta(seconds=1),
            "at-floor": floor,
            "new": floor + timedelta(seconds=1),
        }
        await_cmd._prune_seen(seen, floor)
        assert sorted(seen) == ["at-floor", "new"]

    def test_empty_map_is_fine(self):
        seen: dict = {}
        await_cmd._prune_seen(seen, datetime(2026, 1, 1, tzinfo=timezone.utc))
        assert seen == {}


# ---------------------------------------------------------------------------
# Command-tree shape (Click-level)
# ---------------------------------------------------------------------------


class TestCommandTree:
    def test_all_documented_subcommands_register(self):
        import click

        @click.group()
        def root():
            pass

        await_cmd.register(root)
        await_group = root.commands["await"]
        assert sorted(await_group.commands) == [
            "doc", "docs", "issue", "issues",
            "project", "ritual", "rituals", "sprint", "team",
        ]

    def test_help_includes_subcommand_listing(self):
        from click.testing import CliRunner
        import click

        @click.group()
        def root():
            pass

        await_cmd.register(root)
        runner = CliRunner()
        result = runner.invoke(root, ["await", "--help"])
        assert result.exit_code == 0
        for sub in ("issue", "issues", "doc", "docs", "project",
                    "sprint", "team", "ritual", "rituals"):
            assert sub in result.output

    def test_group_help_includes_warm_examples(self):
        # The await group's --help is the entry point a confused human
        # sees first. It should ship concrete examples and the
        # singular/plural map, not just "see subcommand --help".
        from click.testing import CliRunner
        import click

        @click.group()
        def root():
            pass

        await_cmd.register(root)
        runner = CliRunner()
        result = runner.invoke(root, ["await", "--help"])
        assert result.exit_code == 0
        # Examples block.
        assert "chaotic await issue CHT-1334" in result.output
        # Singular/plural map.
        assert "Singular subcommands" in result.output
        assert "Plural subcommands" in result.output

    def test_singular_and_plural_subcommands_cross_reference(self):
        # A user who runs `chaotic await issue --help` should learn
        # about `await issues` (and vice versa). Same for doc/docs and
        # ritual/rituals.
        from click.testing import CliRunner
        import click

        @click.group()
        def root():
            pass

        await_cmd.register(root)
        runner = CliRunner()

        pairs = [
            ("issue", "issues"),
            ("issues", "issue"),
            ("doc", "docs"),
            ("docs", "doc"),
            ("ritual", "rituals"),
            ("rituals", "ritual"),
        ]
        for cmd, sibling in pairs:
            result = runner.invoke(root, ["await", cmd, "--help"])
            assert result.exit_code == 0, f"await {cmd} --help failed"
            assert f"await {sibling}" in result.output, (
                f"`chaotic await {cmd} --help` should mention "
                f"`chaotic await {sibling}`; got:\n{result.output}"
            )

    def test_issues_subcommand_rejects_assignee_flag(self):
        # `--assignee` used to be accepted-but-ignored; that silent
        # no-op was misleading harness authors. The flag is removed
        # until we wire up real assignee filtering — Click should
        # surface a "No such option" error (exit 2).
        from click.testing import CliRunner
        import click

        @click.group()
        def root():
            pass

        await_cmd.register(root)
        runner = CliRunner()
        result = runner.invoke(
            root, ["await", "issues", "--assignee", "me", "--timeout", "1s"],
        )
        assert result.exit_code != 0
        assert "assignee" in (result.output or "").lower() or \
               "assignee" in str(result.exception or "").lower()


# ---------------------------------------------------------------------------
# _run_wait: principal resolution failure must fail fast
# ---------------------------------------------------------------------------


class TestPrincipalResolutionFailFast:
    def test_run_wait_fails_when_whoami_raises_and_include_self_off(
        self, monkeypatch,
    ):
        # Without a resolvable principal id and --include-self OFF, the
        # implementation cannot enforce the documented "default OFF"
        # filter. Silently flipping the default would self-trigger the
        # exact wake loop the default was designed to prevent — so we
        # fail fast instead.
        def boom():
            raise await_cmd.APIError("unauthorized", status_code=401)

        monkeypatch.setattr(await_cmd, "_resolve_principal_id", boom)

        with pytest.raises(SystemExit) as excinfo:
            await_cmd._run_wait(
                team_id="team_x",
                project_id=None,
                scope={},
                type_spec=None,
                include_self=False,
                timeout_spec="1s",
                json_mode=False,
                until_cmd=None,
            )
        assert excinfo.value.code == 1

    def test_run_wait_fails_when_whoami_returns_no_id_and_include_self_off(
        self, monkeypatch,
    ):
        # Server responded but didn't include an id field. Same risk:
        # we can't enforce the default OFF filter. Fail fast.
        monkeypatch.setattr(await_cmd, "_resolve_principal_id", lambda: None)

        with pytest.raises(SystemExit) as excinfo:
            await_cmd._run_wait(
                team_id="team_x",
                project_id=None,
                scope={},
                type_spec=None,
                include_self=False,
                timeout_spec="1s",
                json_mode=False,
                until_cmd=None,
            )
        assert excinfo.value.code == 1

    def test_run_wait_does_not_call_whoami_when_include_self_on(
        self, monkeypatch,
    ):
        # When --include-self is ON, we don't need the principal id, so
        # a failing whoami must NOT abort the wait.
        def boom():
            raise AssertionError("must not be called when include_self=True")

        monkeypatch.setattr(await_cmd, "_resolve_principal_id", boom)

        # We expect _run_wait to fall through to _poll. Stub the poll
        # to return None (timeout) so the test doesn't hit real IO.
        monkeypatch.setattr(await_cmd, "_poll", lambda *a, **kw: None)
        # Patch the client lookup to a no-op fetcher.
        monkeypatch.setattr(
            await_cmd, "_client",
            lambda: type("X", (), {
                "get_team_activities": lambda self, **kw: [],
            })(),
        )

        with pytest.raises(SystemExit) as excinfo:
            await_cmd._run_wait(
                team_id="team_x",
                project_id=None,
                scope={},
                type_spec=None,
                include_self=True,  # opt in
                timeout_spec="1s",
                json_mode=False,
                until_cmd=None,
            )
        # _poll returned None → timeout exit.
        assert excinfo.value.code == 124


# ---------------------------------------------------------------------------
# Signal and pipe handling
# ---------------------------------------------------------------------------


class TestSignalAndPipeHandling:
    def _run(self, monkeypatch, poll):
        monkeypatch.setattr(await_cmd, "_resolve_principal_id", lambda: "me")
        monkeypatch.setattr(await_cmd, "_poll", poll)
        monkeypatch.setattr(
            await_cmd, "_client",
            lambda: type("X", (), {
                "get_team_activities": lambda self, **kw: [],
            })(),
        )
        with pytest.raises(SystemExit) as excinfo:
            await_cmd._run_wait(
                team_id="team_x", project_id=None, scope={},
                type_spec=None, include_self=False, timeout_spec="1s",
                json_mode=True, until_cmd=None,
            )
        return excinfo.value.code

    def test_sigterm_handler_raises_terminated(self):
        with pytest.raises(await_cmd.TerminatedBySignal):
            await_cmd._raise_terminated(signal.SIGTERM, None)

    def test_sigterm_during_poll_exits_143(self, monkeypatch, capsys):
        # Deliver a real SIGTERM mid-poll: the installed handler must
        # convert it into a clean 143, not a hard kill.
        def poll(*a, **kw):
            os.kill(os.getpid(), signal.SIGTERM)
            time.sleep(5)  # never reached; signal interrupts
            raise AssertionError("signal did not interrupt the poll")

        assert self._run(monkeypatch, poll) == 143
        assert "SIGTERM" in capsys.readouterr().err

    def test_sigterm_handler_restored_after_wait(self, monkeypatch):
        before = signal.getsignal(signal.SIGTERM)
        self._run(monkeypatch, lambda *a, **kw: None)  # timeout path
        assert signal.getsignal(signal.SIGTERM) is before

    def test_broken_pipe_on_emit_exits_0(self, monkeypatch):
        monkeypatch.setattr(
            await_cmd, "_emit_event",
            lambda event, json_mode: (_ for _ in ()).throw(BrokenPipeError()),
        )
        # Neutralize the fd redirection so it can't clobber pytest's
        # capture file descriptors.
        monkeypatch.setattr(os, "open", lambda *a, **kw: -1)
        monkeypatch.setattr(os, "dup2", lambda *a, **kw: None)
        code = self._run(
            monkeypatch,
            lambda *a, **kw: {"id": "e1", "created_at": "2026-01-01T00:00:00Z"},
        )
        assert code == 0

    def test_timeout_still_exits_124(self, monkeypatch):
        assert self._run(monkeypatch, lambda *a, **kw: None) == 124
