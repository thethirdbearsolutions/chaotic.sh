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
from datetime import datetime, timezone

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
        # Ritual events store the ritual name in `field_name` (legacy
        # RITUAL_ATTESTED) or `new_value` (RITUAL_APPROVED + intent
        # events). Match either.
        rn = scope["ritual_name"]
        if event.get("field_name") != rn and event.get("new_value") != rn:
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
    / not executable), as distinct from "predicate rejected this
    event" (a normal non-zero exit).
    """


def _run_until_predicate(cmd: str, event: dict) -> bool:
    """Run the `--until` predicate. Returns True iff exit code is 0
    (event matches). Predicate stdout/stderr are discarded so the
    caller's stdout contract is preserved. Exit codes 126/127 raise
    PredicateBroken — the predicate itself is broken, not just
    rejecting events.
    """
    payload = (json.dumps(event, default=str) + "\n").encode("utf-8")
    try:
        proc = subprocess.run(
            ["sh", "-c", cmd],
            input=payload,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            check=False,
        )
    except FileNotFoundError as exc:
        raise PredicateBroken(
            f"--until: shell unavailable to run predicate ({exc})"
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

def _emit_event(event: dict, json_mode: bool) -> None:
    """Write the wake event to stdout per the CLI contract: exactly
    one JSON object + `\\n` under --json, or a single human-readable
    line otherwise.
    """
    if json_mode:
        sys.stdout.write(json.dumps(event, default=str) + "\n")
        sys.stdout.flush()
        return
    actor = event.get("user_name") or event.get("user_id") or "?"
    activity = event.get("activity_type") or "?"
    target = (
        event.get("issue_identifier")
        or event.get("issue_id")
        or event.get("document_id")
        or ""
    )
    ts = event.get("created_at") or ""
    line = f"[{ts}] {activity} {target} by {actor}"
    new_value = event.get("new_value")
    if new_value:
        line += f" ({new_value})"
    click.echo(line)


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

def _poll(
    fetch_team_activities,
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
    seen_ids: set[str] = set()
    backoff_idx = 0

    while True:
        if deadline is not None and time.time() >= deadline:
            return None

        try:
            activities = fetch_team_activities()
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
        for event in activities:
            ev_id = event.get("id")
            if ev_id and ev_id in seen_ids:
                continue
            ev_dt = _parse_event_dt(event.get("created_at"))
            if ev_dt is None or ev_dt <= watermark:
                continue
            new_events.append((ev_dt, event))

        new_events.sort(key=lambda pair: pair[0])

        for _dt, event in new_events:
            ev_id = event.get("id")
            if ev_id:
                seen_ids.add(ev_id)
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
    """Best-effort lookup of the current user's id for --include-self
    filtering. Failure to resolve is logged to stderr but doesn't
    abort the wait.
    """
    try:
        me = _client().get_me()
    except Exception as exc:  # noqa: BLE001
        _stderr(f"await: could not resolve self ({type(exc).__name__}); "
                "--include-self default may be ineffective")
        return None
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

    exclude_self_for = None if include_self else _resolve_principal_id()
    watermark = _now_utc()

    def fetch():
        return _client().get_team_activities(
            team_id=team_id, skip=0, limit=50,
        ) if project_id is None else _client().get_team_activities(
            # Manual URL build since the helper doesn't take project_id.
            # Falls back to a direct request below.
            team_id=team_id, skip=0, limit=50,
        )

    # The bundled client.get_team_activities doesn't accept project_id;
    # build a direct request when we need it. Keep using the helper
    # otherwise so we benefit from its auth + error wrapping.
    if project_id is not None:
        from urllib.parse import urlencode

        def fetch_with_project():  # noqa: D401
            params = urlencode({
                "team_id": team_id,
                "project_id": project_id,
                "skip": 0,
                "limit": 50,
            })
            return _client()._request("GET", f"/issues/activities?{params}")

        fetch = fetch_with_project

    try:
        event = _poll(
            fetch,
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
        """Block until a matching activity arrives, then exit.

        See `chaotic await SUBCOMMAND --help` for scope-specific options.
        Exits 0 on match, 124 on timeout, 130 on SIGINT, 2 on usage error.
        """

    @await_.command("issue")
    @click.argument("identifier")
    @_common_options
    def await_issue(identifier, type_spec, include_self, timeout_spec, json_mode, until_cmd):
        """Wait on a specific issue (e.g. `chaotic await issue CHT-1334`)."""
        # Resolve the issue to confirm access + get its project/team.
        try:
            issue = _client().get_issue_by_identifier(identifier)
        except APIError as exc:
            _stderr(f"await: {exc}")
            raise SystemExit(1 if (exc.status_code or 0) >= 500 else 2) from exc
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
    @click.option("--assignee", default=None,
                  help="Filter to events where the issue's assignee matches "
                       "this value (`me`, name, or id). Best-effort client-side.")
    @_common_options
    def await_issues(project_override, assignee, type_spec, include_self,
                     timeout_spec, json_mode, until_cmd):
        """Wait on any issue in the (current or specified) project."""
        team_id = _require_current_team()
        project_id = project_override or _require_current_project()
        scope: dict = {}
        if assignee is not None:
            # Stash for client-side filtering; the team feed doesn't
            # support assignee filtering server-side. Note: matching
            # requires looking up the issue per event, which we skip
            # for MVP — assignee is documented as best-effort.
            scope["_assignee_hint"] = assignee
        _run_wait(
            team_id=team_id, project_id=project_id, scope=scope,
            type_spec=type_spec, include_self=include_self,
            timeout_spec=timeout_spec, json_mode=json_mode,
            until_cmd=until_cmd,
        )

    @await_.command("doc")
    @click.argument("document_id")
    @_common_options
    def await_doc(document_id, type_spec, include_self, timeout_spec, json_mode, until_cmd):
        """Wait on a specific document."""
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
        """Wait on any document in the current team."""
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
        """Wait on any activity in a sprint (defaults to current sprint)."""
        team_id = _require_current_team()
        project_id = _require_current_project()
        # Sprint scope is enforced client-side via the moved_to_sprint
        # signal; the team feed doesn't filter by sprint server-side.
        # For MVP we scope by project and document the limitation.
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
        """Wait on a specific ritual's next attestation or approval."""
        team_id = _require_current_team()
        project_id = _require_current_project()
        scope: dict = {"ritual_name": ritual_name}
        if ticket_identifier:
            try:
                issue = _client().get_issue_by_identifier(ticket_identifier)
            except APIError as exc:
                _stderr(f"await: {exc}")
                raise SystemExit(2) from exc
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
        """Wait on any ritual attestation/approval in the current project."""
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
