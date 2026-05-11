"""Tests for `chaotic await`.

Focused on the behaviors the docs commit to: command-tree shape, type-token
vocabulary, exit-code mapping, scope-resolution errors, --until predicate
contract, and the JSON output discipline. Polling itself is exercised via
a controllable fetch function so tests don't need a running server.
"""
from datetime import datetime, timedelta, timezone
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
        # Legacy RITUAL_ATTESTED puts name in field_name.
        assert await_cmd._event_matches_scope(
            {"field_name": "code-review", "new_value": None}, scope,
        )
        # RITUAL_APPROVED + intent events put name/limbo_type in new_value.
        assert await_cmd._event_matches_scope(
            {"field_name": "status", "new_value": "code-review"}, scope,
        )
        # Mismatch on both is rejected.
        assert not await_cmd._event_matches_scope(
            {"field_name": "other", "new_value": "other"}, scope,
        )

    def test_ritual_ticket_id_restricts_to_issue(self):
        scope = {"ritual_name": "x", "ritual_ticket_id": "iss_1"}
        assert await_cmd._event_matches_scope(
            {"field_name": "x", "issue_id": "iss_1"}, scope,
        )
        assert not await_cmd._event_matches_scope(
            {"field_name": "x", "issue_id": "iss_2"}, scope,
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
# --until predicate contract
# ---------------------------------------------------------------------------


class TestUntilPredicate:
    def test_zero_exit_means_match(self):
        assert await_cmd._run_until_predicate(
            "exit 0", {"id": "x"},
        ) is True

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

        def fetch():
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

        def fetch():
            return events

        result = await_cmd._poll(
            fetch, watermark=watermark, scope={}, type_filter=None,
            exclude_self_for=None, until_cmd=None,
            timeout_secs=5, interval_secs=0.01,
        )
        assert result["id"] == "new"

    def test_returns_none_on_timeout_with_no_matches(self):
        watermark = datetime(2026, 1, 1, tzinfo=timezone.utc)

        def fetch():
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

        def fetch():
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

        def fetch():
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

        def fetch():
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

        def fetch():
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
