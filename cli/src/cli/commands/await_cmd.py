"""`chaotic await` — block until an event matches, then exit.

The agent-harness primitive for "park this process until a human (or
another agent) does something I care about." MVP is polling-based;
the CLI contract is transport-agnostic so a future WebSocket
implementation can swap underneath without changing the user surface.

See `cli/README.md` § Await for the user-facing spec.

Implementation overview
-----------------------

* The command tree mirrors the top-level chaotic groups. Singular
  subcommands (`issue ID`, `doc ID`, `ritual NAME`) target a specific
  entity. Plural subcommands (`issues`, `docs`, `rituals`) take
  collection filters. Scope-only subcommands (`project [ID]`,
  `sprint [ID]`, `team [ID]`) default to the current scope.
* All subcommands resolve their team_id (and optional project_id /
  issue_id / etc. filters) up front, then drop into a shared polling
  loop that calls `chaotic.activities` against the team feed.
* Logical type tokens (`commented`, `attested`, …) map to backend
  ActivityType / DocumentActivityType wire values per
  `TYPE_TOKEN_VALUES` so the CLI contract is stable across backend
  enum renames.
* The watermark is wall-clock at command start; events with
  `created_at` strictly greater than the watermark are candidates.
* `--include-self` is OFF by default — an agent that backgrounds
  `await` and keeps working should not wake itself on its own
  activity.
* `--until CMD` runs CMD via `sh -c` with the candidate event JSON
  on stdin; exit 0 wakes, non-zero keeps polling, 126/127 surface as
  exit 1 (predicate broken).
* Output: a single JSON object (`--json`) or a one-line rendered
  summary on stdout; all other output goes to stderr.
"""
import json
import os
import re
import subprocess
import sys
import time
from datetime import datetime, timedelta, timezone

import click
import httpx

from .shared import _client, console
from ..client import APIError


def _main():
    """Late-bind to cli.main for test mock compatibility."""
    return sys.modules['cli.main']


# ---------------------------------------------------------------------------
# Type-token vocabulary
# ---------------------------------------------------------------------------
#
# CLI-stable logical tokens, mapped to the backend's wire values. Cross-entity
# tokens (commented, created, updated) include both the issue and document
# variants so `chaotic await project --type commented` wakes on either.
#
# These tokens are part of the CLI contract; backend enum renames must keep
# the wire values listed here or update this map in the same change.

TYPE_TOKEN_VALUES: dict[str, list[str]] = {
    "commented": ["commented", "doc_commented"],
    "created": ["created", "doc_created"],
    "updated": ["updated", "doc_updated"],
    "status_changed": ["status_changed"],
    "priority_changed": ["priority_changed"],
    "assigned": ["assigned"],
    "unassigned": ["unassigned"],
    "labeled": ["labeled"],
    "unlabeled": ["unlabeled"],
    "moved_to_sprint": ["moved_to_sprint"],
    "removed_from_sprint": ["removed_from_sprint"],
    "attested": ["ritual_attested"],
    "approved": ["ritual_approved"],
    "intent_opened": ["intent_opened"],
    "intent_cleared": ["intent_cleared"],
    "intent_canceled": ["intent_canceled"],
}
"""Logical token → list of backend wire values to match. `any` is handled
specially (empty filter)."""


def _resolve_type_filter(spec: str | None) -> set[str] | None:
    """Translate a `--type` argument into a set of wire values. Returns
    None when no filter should apply (the caller treats None as "match
    any type").
    """
    if not spec or spec.strip().lower() == "any":
        return None
    tokens = [t.strip() for t in spec.split(",") if t.strip()]
    wire: set[str] = set()
    for token in tokens:
        key = token.lower()
        if key == "any":
            return None
        if key not in TYPE_TOKEN_VALUES:
            valid = ", ".join(sorted(set(TYPE_TOKEN_VALUES) | {"any"}))
            raise click.BadParameter(
                f"Unknown type token '{token}'. Valid: {valid}"
            )
        wire.update(TYPE_TOKEN_VALUES[key])
    return wire


# ---------------------------------------------------------------------------
# Duration parsing for --timeout
# ---------------------------------------------------------------------------

_DURATION_RE = re.compile(r"(\d+)\s*([smhd]?)", re.IGNORECASE)
_UNIT_SECONDS = {"": 1, "s": 1, "m": 60, "h": 3600, "d": 86400}


def _parse_duration(spec: str | None) -> float | None:
    """Parse `30`, `30s`, `5m`, `8h`, `1h30m` → seconds. Returns None on
    empty input (meaning "no timeout"). Raises BadParameter for
    malformed input.
    """
    if spec is None or not spec.strip():
        return None
    text = spec.strip().lower()
    total = 0
    pos = 0
    while pos < len(text):
        m = _DURATION_RE.match(text, pos)
        if m is None or m.end() == pos:
            raise click.BadParameter(
                f"Invalid --timeout value: {spec!r}. "
                "Use seconds (30), or unit suffixes like 30s/5m/8h/1h30m."
            )
        n, unit = m.group(1), m.group(2)
        total += int(n) * _UNIT_SECONDS[unit]
        pos = m.end()
    return float(total) if total > 0 else 0.0


# ---------------------------------------------------------------------------
# Watermark and event helpers
# ---------------------------------------------------------------------------

def _now_utc() -> datetime:
    return datetime.now(timezone.utc)


def _parse_event_dt(value) -> datetime | None:
    """Parse an activity row's `created_at` into an aware UTC datetime.
    Returns None if unparseable so the caller can skip the row.
    """
    if value is None:
        return None
    if isinstance(value, datetime):
        return value if value.tzinfo else value.replace(tzinfo=timezone.utc)
    if isinstance(value, str):
        # Tolerate the trailing-Z form FastAPI emits.
        try:
            return datetime.fromisoformat(value.replace("Z", "+00:00"))
        except ValueError:
            return None
    return None


INTENT_ACTIVITY_TYPES = frozenset({
    "intent_opened", "intent_cleared", "intent_canceled",
})
"""Activity types where the row records a ticket-level intent state
change rather than a specific ritual event. Intent events store the
limbo type ("claim"/"close") in `new_value` — they do NOT carry a
ritual name, because one intent covers ALL pending claim-blocking
(or close-blocking) rituals on the ticket simultaneously."""


def _event_matches_type(event: dict, wire_filter: set[str] | None) -> bool:
    if wire_filter is None:
        return True
    return event.get("activity_type") in wire_filter


def _event_is_self(event: dict, principal_user_id: str | None) -> bool:
    return bool(
        principal_user_id
        and event.get("user_id") == principal_user_id
    )


def _event_matches_scope(event: dict, scope: dict) -> bool:
    """Apply scope filters (issue_id, project_id, ritual filters, etc.)
    client-side. The team feed returns activities scoped to a team
    (and optionally project), so the team_id / project_id are already
    pre-filtered server-side; this is for tighter scopes the server
    doesn't directly express.
    """
    if "issue_id" in scope and event.get("issue_id") != scope["issue_id"]:
        return False
    if "issue_identifier" in scope:
        if event.get("issue_identifier") != scope["issue_identifier"]:
            return False
    if "document_id" in scope and event.get("document_id") != scope["document_id"]:
        return False
    if "ritual_name" in scope:
        rn = scope["ritual_name"]
        activity_type = event.get("activity_type")
        if activity_type in INTENT_ACTIVITY_TYPES:
            # Intent events don't carry a ritual name (see
            # INTENT_ACTIVITY_TYPES). To still wake on them from
            # `await ritual NAME`, the caller must scope the wait to a
            # specific ticket via --ticket — the intent is then bound
            # at least to the right issue, and the activity_type filter
            # picks the right lifecycle event. Without --ticket we
            # can't soundly attribute an intent event to a named
            # ritual and the event is skipped.
            if "ritual_ticket_id" not in scope:
                return False
            # ritual_ticket_id is enforced below.
        elif activity_type == "ritual_attested":
            # RITUAL_ATTESTED stores the ritual name in `field_name`
            # (`new_value` holds the attestation note).
            if event.get("field_name") != rn:
                return False
        elif activity_type == "ritual_approved":
            # RITUAL_APPROVED stores the ritual name in `new_value`
            # (`field_name` is by convention an issue column name).
            if event.get("new_value") != rn:
                return False
        else:
            # Non-ritual events can't be attributed to a named ritual;
            # matching on field_name/new_value here would false-positive
            # on e.g. a status named after the ritual.
            return False
    if "ritual_ticket_id" in scope:
        # When --ticket is provided, restrict to events on that issue.
        if event.get("issue_id") != scope["ritual_ticket_id"]:
            return False
    return True


# ---------------------------------------------------------------------------
# --until predicate
# ---------------------------------------------------------------------------

class PredicateBroken(Exception):
    """Raised when --until CMD itself failed to execute (binary missing
    / not executable / wedged past the execution ceiling), as distinct
    from "predicate rejected this event" (a normal non-zero exit).
    """


_UNTIL_TIMEOUT_SECS = 30.0
"""Hard ceiling on a single --until predicate run. A wedged predicate
would otherwise block the poll loop indefinitely — the outer --timeout
deadline is only checked between fetches, so it can't save you."""


def _run_until_predicate(cmd: str, event: dict) -> bool:
    """Run the `--until` predicate. Returns True iff exit code is 0
    (event matches). Predicate stdout/stderr are discarded so the
    caller's stdout contract is preserved. Exit codes 126/127 raise
    PredicateBroken — the predicate itself is broken, not just
    rejecting events. So does exceeding _UNTIL_TIMEOUT_SECS.
    """
    payload = (json.dumps(event, default=str) + "\n").encode("utf-8")
    try:
        proc = subprocess.run(
            ["sh", "-c", cmd],
            input=payload,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            check=False,
            timeout=_UNTIL_TIMEOUT_SECS,
        )
    except FileNotFoundError as exc:
        raise PredicateBroken(
            f"--until: shell unavailable to run predicate ({exc})"
        ) from exc
    except subprocess.TimeoutExpired as exc:
        raise PredicateBroken(
            f"--until: predicate did not finish within "
            f"{_UNTIL_TIMEOUT_SECS:.0f}s and was killed. Predicates must "
            "be fast; a wedged predicate would hang the wait forever."
        ) from exc
    if proc.returncode in (126, 127):
        raise PredicateBroken(
            f"--until: predicate could not be executed "
            f"(exit code {proc.returncode}). Check the command and "
            "ensure required binaries (e.g. jq) are installed."
        )
    return proc.returncode == 0


# ---------------------------------------------------------------------------
# Output
# ---------------------------------------------------------------------------

_TRANSITION_ACTIVITY_TYPES = frozenset({
    "status_changed", "priority_changed", "assigned", "unassigned",
    "labeled", "unlabeled", "moved_to_sprint", "removed_from_sprint",
    "ritual_attested", "ritual_approved",
})


def _format_event_ts(value) -> str:
    """Render the event timestamp in a human-readable form. Keeps the
    full date+time (harness authors who want pretty relative times
    can post-process the JSON form themselves), but drops microseconds
    and timezone noise that clutter without informing.
    """
    dt = _parse_event_dt(value)
    if dt is None:
        return str(value or "")
    return dt.strftime("%Y-%m-%d %H:%M:%S")


def _render_event_line(event: dict) -> str:
    """Build the one-line human-readable summary for non-JSON output.

    Field-extraction is defensive: events may be missing user/title
    fields depending on the activity type. The line stays scannable
    even on a partial event — never crashes on a missing key.
    """
    ts = _format_event_ts(event.get("created_at"))
    actor = event.get("user_name") or event.get("user_id") or "?"
    activity = event.get("activity_type") or "?"
    target = (
        event.get("issue_identifier")
        or event.get("issue_id")
        or event.get("document_id")
        or ""
    )
    title = event.get("issue_title") or event.get("document_title")

    parts: list[str] = []
    if ts:
        parts.append(click.style(f"[{ts}]", dim=True))
    parts.append(click.style(activity, bold=True))
    if target:
        parts.append(target)
    if title:
        parts.append(click.style(f'"{title}"', dim=True))
    parts.append(click.style(f"by {actor}", dim=True))

    old_val = event.get("old_value")
    new_val = event.get("new_value")
    if activity in _TRANSITION_ACTIVITY_TYPES:
        # Status/priority/assignment-style transitions: show old → new
        # when both are present, just → new when not.
        if old_val and new_val and old_val != new_val:
            parts.append(click.style(f"{old_val} → {new_val}", fg="cyan"))
        elif new_val:
            parts.append(click.style(f"→ {new_val}", fg="cyan"))
    elif new_val:
        parts.append(click.style(f"({new_val})", dim=True))

    return " ".join(parts)


def _emit_event(event: dict, json_mode: bool) -> None:
    """Write the wake event to stdout per the CLI contract: exactly
    one JSON object + `\\n` under --json, or a single human-readable
    line otherwise. The rendered form is unstable and intended for
    human eyes; harness scripts use --json.
    """
    if json_mode:
        sys.stdout.write(json.dumps(event, default=str) + "\n")
        sys.stdout.flush()
        return
    click.echo(_render_event_line(event))


def _stderr(msg: str) -> None:
    click.echo(msg, err=True)


# ---------------------------------------------------------------------------
# Retry policy
# ---------------------------------------------------------------------------

_BACKOFF_SCHEDULE = (1, 2, 4, 8, 16, 30)


def _is_transient(exc: Exception) -> bool:
    if isinstance(exc, (httpx.ConnectError, httpx.TimeoutException)):
        return True
    if isinstance(exc, APIError):
        return exc.status_code is None or exc.status_code in (429,) or exc.status_code >= 500
    if isinstance(exc, httpx.HTTPError):
        return True
    return False


# ---------------------------------------------------------------------------
# Polling loop
# ---------------------------------------------------------------------------

_PAGE_LIMIT = 200
"""Rows fetched per activity-feed page."""

_MAX_PAGES = 10
"""Pagination depth cap per poll. Beyond this we warn to stderr rather
than fetch unboundedly — the feed would have to produce
_MAX_PAGES * _PAGE_LIMIT rows inside one poll window to hit it."""

_REFETCH_OVERLAP = 600.0
"""Seconds of overlap kept behind the newest fetched event. The
pagination floor trails the newest event by this margin so rows whose
`created_at` commits slightly out of order are still fetched; seen-id
entries older than the floor can never be re-fetched and are pruned,
bounding the dedup map for long waits (and for a future --follow)."""


def _fetch_new_pages(fetch_page, floor: datetime) -> list[dict]:
    """Fetch activity-feed pages (newest first) until every row newer
    than `floor` has been retrieved, a short page signals the end of
    the feed, or the depth cap is hit (warned to stderr — events past
    the cap may be missed).
    """
    batch: list[dict] = []
    for page in range(_MAX_PAGES):
        rows = fetch_page(page * _PAGE_LIMIT, _PAGE_LIMIT)
        batch.extend(rows)
        if len(rows) < _PAGE_LIMIT:
            return batch
        oldest = min(
            (dt for row in rows
             if (dt := _parse_event_dt(row.get("created_at"))) is not None),
            default=None,
        )
        if oldest is not None and oldest <= floor:
            return batch
    _stderr(
        f"await: activity feed produced more than "
        f"{_MAX_PAGES * _PAGE_LIMIT} rows in one poll window; "
        "events past that depth may be missed"
    )
    return batch


def _prune_seen(seen: dict[str, datetime], floor: datetime) -> None:
    """Drop seen-id entries older than the pagination floor. Rows below
    the floor are never fetched again, so their ids can't recur."""
    for ev_id in [i for i, dt in seen.items() if dt < floor]:
        del seen[ev_id]


def _poll(
    fetch_page,
    *,
    watermark: datetime,
    scope: dict,
    type_filter: set[str] | None,
    exclude_self_for: str | None,
    until_cmd: str | None,
    timeout_secs: float | None,
    interval_secs: float = 5.0,
) -> dict | None:
    """Block until a matching activity arrives or `--timeout` expires.
    Returns the matching event dict, or None on timeout.

    `fetch_page(skip, limit)` returns one page of the activity feed,
    newest first. Each poll paginates back to the floor (see
    _REFETCH_OVERLAP) so a burst larger than one page — e.g. during a
    backoff window — doesn't silently drop events.

    Network errors trigger exponential backoff (1/2/4/8/16/30s cap),
    retried indefinitely while the timeout has not expired.
    """
    # Deadline is relative to wall-clock at poll start, not to the
    # watermark — the watermark is "what counts as new" (semantic),
    # the deadline is "give up at" (real-time). In production both
    # happen at the same instant, but separating them makes the loop
    # testable with synthetic historic watermarks.
    deadline = (
        time.time() + timeout_secs if timeout_secs is not None else None
    )
    seen: dict[str, datetime] = {}
    floor = watermark
    backoff_idx = 0

    while True:
        if deadline is not None and time.time() >= deadline:
            return None

        try:
            activities = _fetch_new_pages(fetch_page, floor)
        except Exception as exc:  # noqa: BLE001 - we re-classify below
            if _is_transient(exc):
                wait = _BACKOFF_SCHEDULE[min(backoff_idx, len(_BACKOFF_SCHEDULE) - 1)]
                backoff_idx += 1
                if deadline is not None:
                    wait = min(wait, max(0.0, deadline - time.time()))
                _stderr(
                    f"await: transient error fetching activities "
                    f"({type(exc).__name__}); retrying in {wait:.0f}s"
                )
                if wait > 0:
                    time.sleep(wait)
                continue
            raise

        backoff_idx = 0

        # Activities arrive newest-first; sort oldest-first so we wake
        # on the chronologically earliest matching event.
        new_events: list[tuple[datetime, dict]] = []
        max_dt: datetime | None = None
        for event in activities:
            ev_dt = _parse_event_dt(event.get("created_at"))
            if ev_dt is None:
                continue
            if max_dt is None or ev_dt > max_dt:
                max_dt = ev_dt
            # Strictly-before events predate the wait. Equal-timestamp
            # events are candidates (second-precision servers can stamp
            # an event in the same instant the wait starts); the seen-id
            # map absorbs any double-fetch.
            if ev_dt < watermark:
                continue
            ev_id = event.get("id")
            if ev_id and ev_id in seen:
                continue
            new_events.append((ev_dt, event))

        new_events.sort(key=lambda pair: pair[0])

        for ev_dt, event in new_events:
            ev_id = event.get("id")
            if ev_id:
                seen[ev_id] = ev_dt
            if not _event_matches_type(event, type_filter):
                continue
            if exclude_self_for and _event_is_self(event, exclude_self_for):
                continue
            if not _event_matches_scope(event, scope):
                continue
            if until_cmd is not None:
                if not _run_until_predicate(until_cmd, event):
                    continue
            return event

        # Advance the floor behind the newest event and prune the seen
        # map. Rows older than the floor are never re-fetched, so their
        # entries can't recur; this keeps memory bounded on long waits.
        if max_dt is not None:
            candidate = max_dt - timedelta(seconds=_REFETCH_OVERLAP)
            if candidate > floor:
                floor = candidate
                _prune_seen(seen, floor)

        # Sleep until next poll, capped by timeout.
        wait = interval_secs
        if deadline is not None:
            wait = min(wait, max(0.0, deadline - time.time()))
        if wait <= 0:
            continue
        time.sleep(wait)


# ---------------------------------------------------------------------------
# Click command tree
# ---------------------------------------------------------------------------

_TYPE_OPTION_HELP = (
    "Comma-separated activity tokens to wake on. Tokens: "
    + ", ".join(sorted(set(TYPE_TOKEN_VALUES) | {"any"}))
    + ". Default: any."
)


def _common_options(f):
    """Shared flags across every await subcommand."""
    f = click.option(
        "--until", "until_cmd", default=None,
        help="Shell predicate run via `sh -c` with the candidate event "
             "JSON on stdin. Exit 0 wakes; non-zero keeps polling.",
    )(f)
    f = click.option(
        "--json", "json_mode", is_flag=True,
        help="Emit the matching event as a single JSON object.",
    )(f)
    f = click.option(
        "--timeout", "timeout_spec", default=None,
        help="Give up after DURATION (30, 30s, 5m, 1h30m). "
             "Exits 124 on expiry.",
    )(f)
    f = click.option(
        "--include-self", "include_self", is_flag=True,
        help="Wake on activity authored by the current principal. "
             "Default: excluded.",
    )(f)
    f = click.option(
        "-t", "--type", "type_spec", default=None, help=_TYPE_OPTION_HELP,
    )(f)
    return f


def _resolve_principal_id() -> str | None:
    """Look up the current user's id for --include-self filtering. May
    return None when the server responds but doesn't include an id;
    network/auth failures propagate so the caller can fail fast (a
    silent fallback would invert the documented `--include-self`
    default OFF and risk self-triggered wake loops).
    """
    me = _client().get_me()
    return (me or {}).get("id")


def _require_current_team() -> str:
    """Return the configured current team_id, or exit 2 if unset."""
    m = _main()
    team_id = m.get_current_team()
    if not team_id:
        _stderr(
            "await: no current team. Run `chaotic team use <team_id>` first."
        )
        raise SystemExit(2)
    return team_id


def _require_current_project() -> str:
    m = _main()
    project_id = m.get_current_project()
    if not project_id:
        _stderr(
            "await: no current project. Run "
            "`chaotic project use <project_id>` first."
        )
        raise SystemExit(2)
    return project_id


def _run_wait(
    *,
    team_id: str,
    project_id: str | None,
    scope: dict,
    type_spec: str | None,
    include_self: bool,
    timeout_spec: str | None,
    json_mode: bool,
    until_cmd: str | None,
) -> None:
    """Common entry: resolve filters, run the poll loop, emit/exit."""
    try:
        type_filter = _resolve_type_filter(type_spec)
        timeout_secs = _parse_duration(timeout_spec)
    except click.BadParameter as exc:
        _stderr(f"await: {exc.message}")
        raise SystemExit(2) from exc

    if include_self:
        exclude_self_for = None
    else:
        try:
            exclude_self_for = _resolve_principal_id()
        except Exception as exc:  # noqa: BLE001
            _stderr(
                "await: cannot resolve current user "
                f"({type(exc).__name__}: {exc}). --include-self defaults "
                "OFF; without a principal id the filter would silently "
                "wake on the agent's own activity. Pass --include-self "
                "to opt in, or fix authentication and retry."
            )
            raise SystemExit(1) from exc
        if exclude_self_for is None:
            _stderr(
                "await: current user has no id field in /users/me. "
                "--include-self defaults OFF but cannot be enforced without "
                "a principal id. Pass --include-self to opt in."
            )
            raise SystemExit(1)
    watermark = _now_utc()

    def fetch_page(skip: int, limit: int) -> list:
        return _client().get_team_activities(
            team_id=team_id, skip=skip, limit=limit, project_id=project_id,
        )

    try:
        event = _poll(
            fetch_page,
            watermark=watermark,
            scope=scope,
            type_filter=type_filter,
            exclude_self_for=exclude_self_for,
            until_cmd=until_cmd,
            timeout_secs=timeout_secs,
        )
    except PredicateBroken as exc:
        _stderr(f"await: {exc}")
        raise SystemExit(1) from exc
    except APIError as exc:
        _stderr(f"await: {exc}")
        raise SystemExit(1) from exc
    except KeyboardInterrupt:
        raise SystemExit(130)

    if event is None:
        _stderr("await: timeout")
        raise SystemExit(124)

    _emit_event(event, json_mode)
    raise SystemExit(0)


def register(cli):
    """Register `chaotic await` and its subcommands on the CLI group."""

    # `await` is a Python keyword, so the function is named `await_` and
    # registered under the user-facing name via the `name=` kwarg.
    @cli.group(name="await")
    def await_():
        """Block until activity arrives, then exit with the event.

        The agent-harness primitive: park the process here, do other work,
        and resume when something you care about happens. Exits 0 with the
        matching event on stdout; 124 on --timeout; 130 on SIGINT.

        \b
        Singular subcommands target one entity:
          await issue ID         await doc ID         await ritual NAME
        Plural subcommands take collection filters:
          await issues           await docs           await rituals
        Scope-only subcommands (await project/sprint/team) default to the
        configured current scope.

        \b
        Examples:
          chaotic await issue CHT-1334 --type commented --timeout 8h
          chaotic await ritual code-review --ticket CHT-1334 --json
          chaotic await issues --type status_changed \\
              --until 'jq -e ".new_value == \\"in_review\\""'

        Run `chaotic await SUBCOMMAND --help` for scope-specific options.
        """

    @await_.command("issue")
    @click.argument("identifier")
    @_common_options
    def await_issue(identifier, type_spec, include_self, timeout_spec, json_mode, until_cmd):
        """Wait on a specific issue.

        Example: `chaotic await issue CHT-1334`.
        For any issue in a project, use `chaotic await issues` instead.
        """
        # Resolve the issue to confirm access + get its project/team.
        try:
            issue = _client().get_issue_by_identifier(identifier)
        except APIError as exc:
            _stderr(f"await: {exc}")
            raise SystemExit(1) from exc
        team_id = issue.get("team_id") or _require_current_team()
        project_id = issue.get("project_id")
        scope = {"issue_id": issue["id"]}
        _run_wait(
            team_id=team_id, project_id=project_id, scope=scope,
            type_spec=type_spec, include_self=include_self,
            timeout_spec=timeout_spec, json_mode=json_mode,
            until_cmd=until_cmd,
        )

    @await_.command("issues")
    @click.option("--project", "project_override", default=None,
                  help="Project key to scope to (defaults to current project).")
    @_common_options
    def await_issues(project_override, type_spec, include_self,
                     timeout_spec, json_mode, until_cmd):
        """Wait on any issue in the (current or specified) project.

        For a specific issue, use `chaotic await issue ID` instead.
        """
        team_id = _require_current_team()
        project_id = project_override or _require_current_project()
        _run_wait(
            team_id=team_id, project_id=project_id, scope={},
            type_spec=type_spec, include_self=include_self,
            timeout_spec=timeout_spec, json_mode=json_mode,
            until_cmd=until_cmd,
        )

    @await_.command("doc")
    @click.argument("document_id")
    @_common_options
    def await_doc(document_id, type_spec, include_self, timeout_spec, json_mode, until_cmd):
        """Wait on a specific document.

        For any document in the team, use `chaotic await docs` instead.
        """
        team_id = _require_current_team()
        scope = {"document_id": document_id}
        _run_wait(
            team_id=team_id, project_id=None, scope=scope,
            type_spec=type_spec, include_self=include_self,
            timeout_spec=timeout_spec, json_mode=json_mode,
            until_cmd=until_cmd,
        )

    @await_.command("docs")
    @_common_options
    def await_docs(type_spec, include_self, timeout_spec, json_mode, until_cmd):
        """Wait on any document in the current team.

        For a specific document, use `chaotic await doc ID` instead.
        """
        team_id = _require_current_team()
        _run_wait(
            team_id=team_id, project_id=None, scope={},
            type_spec=type_spec, include_self=include_self,
            timeout_spec=timeout_spec, json_mode=json_mode,
            until_cmd=until_cmd,
        )

    @await_.command("project")
    @click.argument("project_id", required=False)
    @_common_options
    def await_project(project_id, type_spec, include_self, timeout_spec, json_mode, until_cmd):
        """Wait on any activity in a project (defaults to current project)."""
        team_id = _require_current_team()
        project_id = project_id or _require_current_project()
        _run_wait(
            team_id=team_id, project_id=project_id, scope={},
            type_spec=type_spec, include_self=include_self,
            timeout_spec=timeout_spec, json_mode=json_mode,
            until_cmd=until_cmd,
        )

    @await_.command("sprint")
    @click.argument("sprint_id", required=False)
    @_common_options
    def await_sprint(sprint_id, type_spec, include_self, timeout_spec, json_mode, until_cmd):
        """Wait on activity in the project that hosts a sprint.

        MVP limitation: sprint-level filtering is not yet wired up.
        This wakes on any activity in the sprint's parent project,
        which is a superset of true sprint activity. Combine with
        `--type moved_to_sprint,removed_from_sprint` or `--until` to
        narrow to sprint-specific signals.
        """
        team_id = _require_current_team()
        project_id = _require_current_project()
        # The team feed doesn't filter by sprint server-side, and we
        # don't fetch each event's issue to check its sprint_id (heavy
        # + racy). Scope by project for MVP; documented above.
        _run_wait(
            team_id=team_id, project_id=project_id, scope={},
            type_spec=type_spec, include_self=include_self,
            timeout_spec=timeout_spec, json_mode=json_mode,
            until_cmd=until_cmd,
        )

    @await_.command("team")
    @click.argument("team_id_arg", required=False)
    @_common_options
    def await_team(team_id_arg, type_spec, include_self, timeout_spec, json_mode, until_cmd):
        """Wait on any activity on a team (defaults to current team)."""
        team_id = team_id_arg or _require_current_team()
        _run_wait(
            team_id=team_id, project_id=None, scope={},
            type_spec=type_spec, include_self=include_self,
            timeout_spec=timeout_spec, json_mode=json_mode,
            until_cmd=until_cmd,
        )

    @await_.command("ritual")
    @click.argument("ritual_name")
    @click.option("--ticket", "ticket_identifier", default=None,
                  help="Restrict to attestations/approvals on this ticket.")
    @_common_options
    def await_ritual(ritual_name, ticket_identifier, type_spec, include_self,
                     timeout_spec, json_mode, until_cmd):
        """Wait on a specific ritual's next attestation or approval.

        For any ritual in the current project, use `chaotic await rituals`.
        Pass `--ticket CHT-123` to also wake on `intent_*` lifecycle
        events for that issue (intents don't carry a ritual name on
        their own — see README § Await).
        """
        team_id = _require_current_team()
        project_id = _require_current_project()
        scope: dict = {"ritual_name": ritual_name}
        if ticket_identifier:
            try:
                issue = _client().get_issue_by_identifier(ticket_identifier)
            except APIError as exc:
                _stderr(f"await: {exc}")
                raise SystemExit(1) from exc
            scope["ritual_ticket_id"] = issue["id"]
        # Default type filter for rituals if user didn't specify:
        # attested/approved/intent_* events.
        if type_spec is None:
            type_spec = "attested,approved,intent_opened,intent_cleared,intent_canceled"
        _run_wait(
            team_id=team_id, project_id=project_id, scope=scope,
            type_spec=type_spec, include_self=include_self,
            timeout_spec=timeout_spec, json_mode=json_mode,
            until_cmd=until_cmd,
        )

    @await_.command("rituals")
    @_common_options
    def await_rituals(type_spec, include_self, timeout_spec, json_mode, until_cmd):
        """Wait on any ritual attestation/approval in the current project.

        For a specific ritual, use `chaotic await ritual NAME` instead.
        """
        team_id = _require_current_team()
        project_id = _require_current_project()
        if type_spec is None:
            type_spec = "attested,approved,intent_opened,intent_cleared,intent_canceled"
        _run_wait(
            team_id=team_id, project_id=project_id, scope={},
            type_spec=type_spec, include_self=include_self,
            timeout_spec=timeout_spec, json_mode=json_mode,
            until_cmd=until_cmd,
        )
