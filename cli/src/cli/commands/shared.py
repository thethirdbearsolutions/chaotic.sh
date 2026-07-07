"""Shared resolvers and utilities for CLI commands.

Contains resolver functions that take all parameters explicitly (no config
lookups), display helpers, and other shared utilities. Decorators and resolvers
that call config functions (get_current_team, get_token, etc.) remain in
cli.main because existing tests patch those via the cli.main namespace.
"""
import re
import sys

import click
from rich.console import Console


# ── Duration parsing ─────────────────────────────────────────────────────────
# Shared by `await --timeout` and `issue start/claim --lease` (CHT-1246);
# originated in await_cmd.py as `_parse_duration`, moved here so a second
# duration-taking flag doesn't re-implement it.

_DURATION_RE = re.compile(r"(\d+)([smhd]?)", re.IGNORECASE)
_UNIT_SECONDS = {"": 1, "s": 1, "m": 60, "h": 3600, "d": 86400}


def parse_duration(spec: str | None, flag_name: str = "--timeout") -> float | None:
    """Parse `30`, `30s`, `5m`, `8h`, `1h30m` → seconds. Whitespace is
    ignored, so `1h 30m` works too. Returns None on empty input -- what
    that means is the caller's call (await: wait forever; issue
    start/claim --lease: use the server-configured default). Raises
    BadParameter for malformed input and for a zero duration -- always
    ambiguous (instant expiry either way), so this refuses to guess.
    `flag_name` customizes the error text for the calling command's
    actual flag (`--timeout`, `--lease`, ...).
    """
    if spec is None or not spec.strip():
        return None
    text = re.sub(r"\s+", "", spec.lower())
    total = 0
    pos = 0
    while pos < len(text):
        m = _DURATION_RE.match(text, pos)
        if m is None or m.end() == pos:
            raise click.BadParameter(
                f"Invalid {flag_name} value: {spec!r}. "
                "Use seconds (30), or unit suffixes like 30s/5m/8h/1h30m."
            )
        n, unit = m.group(1), m.group(2)
        total += int(n) * _UNIT_SECONDS[unit]
        pos = m.end()
    if total == 0:
        raise click.BadParameter(
            f"{flag_name} {spec!r} is zero -- that's an instant expiry, "
            f"which is never useful. Omit {flag_name} instead."
        )
    return float(total)


class _JsonAwareConsole:
    """Proxy that redirects Rich output to stderr while --json mode is
    active (CHT-1222), so no command's status lines/tables/panels can leak
    onto the single-JSON-value stdout contract.

    This is the ONE place that decision is made: individual command call
    sites keep calling plain ``console.print(...)`` and get stdout-purity
    under --json for free, without gating each call behind an
    ``is_json_output()`` check. Structured JSON payloads never go through
    this console — they're written directly via ``cli.main.output_json``
    (a plain ``click.echo`` to stdout) — so this proxy can never suppress
    the actual JSON output, only the human-readable chatter around it.

    Rich's ``Console.print()`` has no per-call ``file=`` override (the
    file is bound at Console construction), so this holds two real
    Console instances — one bound to stdout, one to stderr — and picks
    per call. Only the output methods commands are expected to use are
    exposed (``print``/``log``/``rule``/``print_json``/``status``), each
    routed through the same stream selection. There is deliberately no
    ``__getattr__`` fallback: any other Console method raises
    AttributeError at dev time (fail loud) instead of silently picking
    the wrong stream in production — a future command imitating existing
    chatter with a new Rich method must be added here, where it will get
    the redirection for free.
    """

    def __init__(self):
        self._stdout_console = Console()
        self._stderr_console = Console(stderr=True)

    @property
    def _target(self):
        return self._stderr_console if _is_json_output() else self._stdout_console

    def print(self, *args, **kwargs):
        self._target.print(*args, **kwargs)

    def log(self, *args, **kwargs):
        self._target.log(*args, **kwargs)

    def rule(self, *args, **kwargs):
        self._target.rule(*args, **kwargs)

    def print_json(self, *args, **kwargs):
        # NOTE: this is Rich chatter (pretty-printed, human-facing), not
        # the machine contract — the actual --json payload always goes
        # through cli.main.output_json to stdout.
        self._target.print_json(*args, **kwargs)

    def status(self, *args, **kwargs):
        return self._target.status(*args, **kwargs)


console = _JsonAwareConsole()


def _client():
    """Get the client singleton, resolving through cli.main for test compatibility.

    Tests patch ``cli.main.client``, so we must look it up through that module
    rather than binding it at import time via ``from ..client import client``.
    """
    return sys.modules['cli.main'].client


def _is_json_output() -> bool:
    """Late-bind to cli.main.is_json_output (same rationale as _client())."""
    return sys.modules['cli.main'].is_json_output()


# ── Display helpers ──────────────────────────────────────────────────────────

def format_ritual_line(r):
    """Format a ritual display line with mode, group, and note info."""
    mode = f"[dim]({r['approval_mode']})[/dim]"
    note_tag = "" if r.get("note_required", True) else " [dim][no note req][/dim]"
    group_tag = ""
    if r.get("group_name"):
        group_tag = f" [dim][group: {r['group_name']}][/dim]"
    deleted_tag = " [red][deleted][/red]" if not r.get("is_active", True) else ""
    return f"  \u2022 {r['name']} {mode}{note_tag}{group_tag}{deleted_tag}"


def print_ritual_prompt(prompt):
    """Print ritual prompt with markdown rendering."""
    from rich.markdown import Markdown
    from rich.padding import Padding
    console.print(Padding(Markdown(prompt), (0, 0, 0, 6)))


# ── Click parameter callbacks ────────────────────────────────────────────────


def resolve_content_value(ctx, param, value):
    """Click callback: resolve a long-text option value via curl-style conventions.

    Resolution rules:
      ``-``           read stdin to EOF
      ``@@<rest>``    literal ``@<rest>`` (escape; only the leading ``@@`` is
                      unescaped, so ``@@@foo`` becomes ``@@foo``)
      ``@<path>``     read text from file at ``<path>``; missing or unreadable
                      file raises ``UsageError``
      anything else   pass through unchanged (including ``None`` and ``""``)

    Stdin is consumed only once per invocation; if multiple options on the same
    command both pass ``-``, the second sees EOF and gets an empty string.
    """
    if value in (None, ""):
        return value
    if value == "-":
        return sys.stdin.read()
    if value.startswith("@@"):
        return "@" + value[2:]
    if value.startswith("@"):
        path = value[1:]
        try:
            with open(path, encoding="utf-8") as f:
                return f.read()
        except UnicodeDecodeError as exc:
            # e.g. --description @screenshot.png — not OSError (it's a
            # ValueError subclass), and this fires during Click's
            # parameter-callback phase, outside every command decorator's
            # reach; UsageError routes it through the Group-level --json
            # handling (CHT-1222).
            raise click.UsageError(
                f"Could not read content from {path!r}: not valid UTF-8 text ({exc})"
            )
        except OSError as exc:
            raise click.UsageError(
                f"Could not read content from {path!r}: {exc.strerror or exc}"
            )
    return value


def get_status_color(status: str) -> str:
    """Get Rich color for issue status."""
    return {
        'done': 'green',
        'in_progress': 'yellow',
        'in_review': 'cyan',
        'canceled': 'red',
        'todo': 'white',
        'backlog': 'dim',
    }.get(status, 'white')


def suggest_key(name: str) -> str:
    """Suggest a team/project key from a name."""
    words = [w for w in name.upper().split() if w]
    if not words:
        return ""
    if len(words) == 1:
        return words[0][:4]
    return "".join(w[0] for w in words[:4])


def print_sprint_panel(result: dict, title: str = "Sprint"):
    """Print a sprint details panel."""
    from rich.panel import Panel

    budget_info = ""
    if result.get("budget") is not None:
        remaining = result["budget"] - result["points_spent"]
        status_str = "[red]IN ARREARS[/red]" if remaining < 0 else f"{remaining} remaining"
        budget_info = f"\nBudget: {result['points_spent']}/{result['budget']} ({status_str})"

    limbo_info = "\n[yellow]IN LIMBO - pending rituals[/yellow]" if result.get("limbo") else ""

    console.print(Panel(
        f"[bold]{result['name']}[/bold]\n"
        f"Status: {result['status'].title()}"
        f"{budget_info}"
        f"{limbo_info}",
        title=title
    ))


# ── Resolvers (parameter-explicit, no config lookups) ────────────────────────

def resolve_sprint_id(sprint_value: str, project_id: str) -> str:
    """Resolve a sprint value to a sprint ID.

    Resolution order (first match wins):
    1. "current" → active sprint ID
    2. "next" → planned sprint ID
    3. Full UUID → passed through
    4. Sprint number → bare number matches sprint name containing that number
    5. Sprint name → exact match, case-insensitive
    6. Sprint name → substring match, case-insensitive
    7. UUID prefix → matched against project sprints

    Raises ClickException on ambiguity or not found.
    """
    if sprint_value.lower() == "current":
        current = _client().get_current_sprint(project_id)
        return current["id"]

    if sprint_value.lower() == "next":
        sprints = _client().get_sprints(project_id, status="planned")
        if not sprints:
            raise click.ClickException("No planned (next) sprint found. Use 'chaotic sprint list' to see available sprints.")
        return sprints[0]["id"]

    # Fetch all sprints for resolution
    sprints = _client().get_sprints(project_id)
    if not sprints:
        raise click.ClickException("No sprints exist for this project. Use 'chaotic sprint current' to create the initial sprint.")

    # Try exact ID match first
    exact = [s for s in sprints if s["id"] == sprint_value]
    if exact:
        return exact[0]["id"]

    # Try sprint number match — bare "44" matches "Sprint 44" etc. (CHT-892)
    if sprint_value.isdigit():
        pattern = r'\b' + re.escape(sprint_value) + r'\b'
        num_matches = [
            s for s in sprints
            if re.search(pattern, s.get("name") or "")
        ]
        if len(num_matches) == 1:
            return num_matches[0]["id"]
        if len(num_matches) > 1:
            names = "\n".join(f"  {s['id']}  ({s['name']})" for s in num_matches)
            raise click.ClickException(f"Ambiguous sprint number '{sprint_value}'. Matches:\n{names}")

    # Try matching by name (case-insensitive, with null-safety)
    # Note: (s.get("name") or "") handles both missing keys AND None values
    name_matches = [s for s in sprints if (s.get("name") or "").lower() == sprint_value.lower()]
    if len(name_matches) == 1:
        return name_matches[0]["id"]
    if len(name_matches) > 1:
        names = "\n".join(f"  {s['id']}  ({s['name']})" for s in name_matches)
        raise click.ClickException(f"Ambiguous sprint name '{sprint_value}'. Matches:\n{names}")

    # Try substring match on name (case-insensitive)
    substr_matches = [s for s in sprints if sprint_value.lower() in (s.get("name") or "").lower()]
    if len(substr_matches) == 1:
        return substr_matches[0]["id"]
    if len(substr_matches) > 1:
        names = "\n".join(f"  {s['id']}  ({s['name']})" for s in substr_matches)
        raise click.ClickException(f"Ambiguous sprint name substring '{sprint_value}'. Matches:\n{names}")

    # Try UUID prefix match
    prefix_matches = [s for s in sprints if s["id"].startswith(sprint_value)]
    if len(prefix_matches) == 1:
        return prefix_matches[0]["id"]
    if len(prefix_matches) > 1:
        names = "\n".join(f"  {s['id']}  ({s['name']})" for s in prefix_matches)
        raise click.ClickException(f"Ambiguous sprint ID prefix '{sprint_value}'. Matches:\n{names}")

    # No match found
    raise click.ClickException(f"Sprint '{sprint_value}' not found. Use 'chaotic sprint list' to see available sprints.")


def resolve_document_id(doc_value: str, team_id: str) -> str:
    """Resolve a document value to a document ID.

    Resolution order (first match wins):
    1. Full UUID → passed through
    2. Document title → matched case-insensitively
    3. UUID prefix → matched against team documents

    Raises ClickException on ambiguity or not found.
    """
    # Fetch all documents for resolution (high limit to avoid pagination cutoff)
    documents = _client().get_documents(team_id, limit=10000)
    if not documents:
        raise click.ClickException("No documents exist. Create one with 'chaotic doc create'.")

    # Try exact ID match first
    exact = [d for d in documents if d["id"] == doc_value]
    if exact:
        return exact[0]["id"]

    # Try matching by title (case-insensitive, with null-safety)
    title_matches = [d for d in documents if (d.get("title") or "").lower() == doc_value.lower()]
    if len(title_matches) == 1:
        return title_matches[0]["id"]
    if len(title_matches) > 1:
        titles = "\n".join(f"  {d['id']}  ({d['title']})" for d in title_matches)
        raise click.ClickException(f"Ambiguous document title '{doc_value}'. Matches:\n{titles}")

    # Try UUID prefix match
    prefix_matches = [d for d in documents if d["id"].startswith(doc_value)]
    if len(prefix_matches) == 1:
        return prefix_matches[0]["id"]
    if len(prefix_matches) > 1:
        titles = "\n".join(f"  {d['id']}  ({d.get('title', 'Untitled')})" for d in prefix_matches)
        raise click.ClickException(f"Ambiguous document ID prefix '{doc_value}'. Matches:\n{titles}")

    # No match found
    raise click.ClickException(f"Document '{doc_value}' not found. Use 'chaotic doc list' to see available documents.")


def resolve_label_id(label_value: str, team_id: str) -> str:
    """Resolve a label value to a label ID.

    Resolution order (first match wins):
    1. Full UUID → passed through
    2. Label name → matched case-insensitively
    3. UUID prefix → matched against team labels

    Raises ClickException on ambiguity or not found.
    """
    # Fetch all labels for resolution
    labels = _client().get_labels(team_id)
    if not labels:
        raise click.ClickException("No labels exist. Create one with 'chaotic label create'.")

    # Try exact ID match first
    exact = [l for l in labels if l["id"] == label_value]
    if exact:
        return exact[0]["id"]

    # Try matching by name (case-insensitive, with null-safety)
    name_matches = [l for l in labels if (l.get("name") or "").lower() == label_value.lower()]
    if len(name_matches) == 1:
        return name_matches[0]["id"]
    if len(name_matches) > 1:
        names = "\n".join(f"  {l['id']}  ({l['name']})" for l in name_matches)
        raise click.ClickException(f"Ambiguous label name '{label_value}'. Matches:\n{names}")

    # Try UUID prefix match
    prefix_matches = [l for l in labels if l["id"].startswith(label_value)]
    if len(prefix_matches) == 1:
        return prefix_matches[0]["id"]
    if len(prefix_matches) > 1:
        names = "\n".join(f"  {l['id']}  ({l.get('name', 'Unnamed')})" for l in prefix_matches)
        raise click.ClickException(f"Ambiguous label ID prefix '{label_value}'. Matches:\n{names}")

    # No match found
    raise click.ClickException(f"Label '{label_value}' not found. Use 'chaotic label list' to see available labels.")


def resolve_team_id(team_value: str) -> str:
    """Resolve a team value to a team ID.

    Resolution order (first match wins):
    1. Full UUID → passed through
    2. Team name → matched case-insensitively
    3. Team key → matched case-insensitively
    4. UUID prefix → matched against all teams

    Raises ClickException on ambiguity or not found.
    """
    # Fetch all teams for resolution
    teams = _client().get_teams()
    if not teams:
        raise click.ClickException("No teams exist. Create one with 'chaotic team create'.")

    # Try exact ID match first
    exact = [t for t in teams if t["id"] == team_value]
    if exact:
        return exact[0]["id"]

    # Try matching by name (case-insensitive, with null-safety)
    name_matches = [t for t in teams if (t.get("name") or "").lower() == team_value.lower()]
    if len(name_matches) == 1:
        return name_matches[0]["id"]
    if len(name_matches) > 1:
        names = "\n".join(f"  {t['id']}  ({t['name']})" for t in name_matches)
        raise click.ClickException(f"Ambiguous team name '{team_value}'. Matches:\n{names}")

    # Try matching by key (case-insensitive, with null-safety)
    key_matches = [t for t in teams if (t.get("key") or "").lower() == team_value.lower()]
    if len(key_matches) == 1:
        return key_matches[0]["id"]
    if len(key_matches) > 1:
        names = "\n".join(f"  {t['id']}  ({t['name']}, key: {t['key']})" for t in key_matches)
        raise click.ClickException(f"Ambiguous team key '{team_value}'. Matches:\n{names}")

    # Try UUID prefix match
    prefix_matches = [t for t in teams if t["id"].startswith(team_value)]
    if len(prefix_matches) == 1:
        return prefix_matches[0]["id"]
    if len(prefix_matches) > 1:
        names = "\n".join(f"  {t['id']}  ({t.get('name', 'Unnamed')})" for t in prefix_matches)
        raise click.ClickException(f"Ambiguous team ID prefix '{team_value}'. Matches:\n{names}")

    # No match found
    raise click.ClickException(f"Team '{team_value}' not found. Use 'chaotic team list' to see available teams.")
