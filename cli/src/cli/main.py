#!/usr/bin/env python3
"""Chaotic CLI - Command-line interface for Chaotic issue tracker."""
import functools
import json
import shutil
import subprocess
import sys
import webbrowser
import click
import httpx
from rich.markup import escape
from rich.panel import Panel

from .config import (
    set_token, get_token, set_api_url, get_api_url, get_web_url,
    get_current_team, set_current_team,
    get_current_project, set_current_project,
    get_api_key, set_api_key, find_local_config, get_local_config_path,
    load_config, get_global_config_file, DEFAULT_PORT,
    set_profile, get_effective_profile,
    check_profile_ambiguity,
    ProfileAmbiguityError,
)
# Not used in this module, but command modules late-bind them through
# `sys.modules['cli.main']` (and tests patch them there), so they are part
# of this module's surface.
from .config import (  # noqa: F401 - re-exported for late-binding command modules
    load_global_config, save_global_config,
    get_profile, list_profiles, ProfileError,
)
from .client import client, APIError
from .system import system
from .markup import esc
# Re-exported for callers that reach these through cli.main. Not a stable
# API: CHT-1702 renamed get_status_color and format_ritual_line to their
# *_markup names here without aliases.
from .commands.shared import (  # noqa: F401
    console, status_color_markup, suggest_key,
    resolve_sprint_id, resolve_document_id, resolve_label_id,
    resolve_team_id, print_sprint_panel,
    ritual_line_markup, print_ritual_prompt,
)


def is_json_output() -> bool:
    """Check if JSON output mode is enabled."""
    ctx = click.get_current_context(silent=True)
    if ctx and ctx.obj:
        return ctx.obj.get('json', False)
    return False


def is_yes_mode() -> bool:
    """Check if --yes flag was passed (skip confirmations)."""
    ctx = click.get_current_context(silent=True)
    if ctx and ctx.obj:
        return ctx.obj.get('yes', False)
    return False


def confirm_action(prompt: str, **kwargs) -> bool:
    """Prompt for confirmation, auto-accepting if --yes flag is set (CHT-436).

    Under --json, never prompts (CHT-1222): a machine consumer can't answer
    a TTY prompt, and click.confirm would leak the prompt text onto stdout,
    breaking the one-JSON-value contract. Without --yes, --json gets a clean
    {"error": ...} + exit 2 telling the caller to pass --yes.

    Interactive prompts go to stderr (err=True) so stdout stays reserved for
    command output even outside --json mode.
    """
    if is_yes_mode():
        return True
    if is_json_output():
        output_json({
            "error": f"Confirmation required: {prompt} "
                     "Pass --yes to proceed under --json (prompts are disabled in JSON mode).",
        })
        raise SystemExit(2)
    kwargs.setdefault("err", True)
    return click.confirm(prompt, **kwargs)


def sanitize_text_input(value: str, max_len: int = 255) -> str:
    """Basic sanity-check for free-text prompt input (CHT-759).

    quickstart and friends feed these straight into signup / team /
    project names, so keep out control characters (incl. NUL) and
    pathologically long strings before they reach the API. Drops any
    non-printable character (`str.isprintable()` is False for C0/C1
    controls, tabs, and newlines — all garbage in a single-line prompt),
    trims surrounding whitespace, and caps the length.
    """
    if not isinstance(value, str):
        return value
    cleaned = "".join(ch for ch in value if ch.isprintable()).strip()
    return cleaned[:max_len]


def sanitized_prompt(*args, max_len: int = 255, **kwargs) -> str:
    """click.prompt wrapper that runs the result through
    sanitize_text_input (CHT-759). Use for free-text prompts (names,
    emails); NOT for passwords (hide_input) or keys (own validation)."""
    return sanitize_text_input(click.prompt(*args, **kwargs), max_len=max_len)


def json_option(f):
    """Add --json flag to a subcommand so it works after the subcommand name.

    Merges the local --json with the parent group's --json flag so that both
    ``chaotic --json issue list`` and ``chaotic issue list --json`` work.

    Must be placed above @handle_error in the decorator stack so that
    ctx.obj['json'] is set before handle_error checks is_json_output().
    """
    @functools.wraps(f)
    def wrapper(*args, json_output=False, **kwargs):
        if json_output:
            ctx = click.get_current_context()
            ctx.ensure_object(dict)
            ctx.obj['json'] = True
        return f(*args, **kwargs)
    # CHT-1222: was hidden=True, making --json (the CLI's core machine-output
    # feature) undiscoverable via --help on every subcommand that has it.
    return click.option('--json', 'json_output', is_flag=True,
                        help='Output as JSON instead of formatted text; all other output goes to stderr.')(wrapper)


def output_json(data):
    """Output data as JSON and exit."""
    click.echo(json.dumps(data, indent=2, default=str))


def json_result(build=None):
    """The CLI's one sanctioned pattern for wiring --json onto a mutation
    or state-transition command (CHT-1222).

    After the wrapped command body runs, if --json is active, emits a
    single JSON object on stdout:

    * If the command function returned a non-None value, that value is
      emitted directly — use this when the mutation itself already
      produces the payload worth reporting (a freshly created comment,
      an updated issue from ``update_issue``'s own response, a relation).
    * Otherwise ``build(*args, **kwargs)`` is called with the exact
      positional/keyword arguments Click passed to the command, and its
      return value is emitted — typically a small lambda that re-fetches
      the affected entity by identifier.

    Usage — must sit innermost in the decorator stack, directly above
    ``def``, *below* @handle_error, so a failure raised by the command
    body OR by ``build`` still reaches handle_error's --json error
    formatting instead of escaping raw::

        @issue.command("move")
        @click.argument("identifier")
        @click.argument("status")
        @_main().json_option
        @_main().require_auth
        @_main().handle_error
        @_main().json_result(lambda identifier, status: _client().update_issue(...))
        def issue_move(identifier, status):
            ...

    Command console.print status lines don't need to be gated — the
    shared ``console`` object (commands/shared.py) already redirects all
    chatter to stderr while --json is active, so this decorator only
    needs to own the stdout JSON payload.
    """
    def decorator(f):
        @functools.wraps(f)
        def wrapper(*args, **kwargs):
            ret = f(*args, **kwargs)
            if is_json_output():
                payload = ret if ret is not None else (build(*args, **kwargs) if build else None)
                output_json(payload)
            return ret
        return wrapper
    return decorator


def has_credential() -> bool:
    """Will requests be authenticated: a key or login token is configured
    here, or a proxy supplies the registrar key for this session's own
    identity (CHT-1906)? What `require_auth` and friends check. Reads
    this module's getters, so a patched `get_token`/`get_api_key` applies."""
    if get_token() or get_api_key():
        return True
    from cli import session_identity

    return session_identity.has_proxied_identity()


def require_auth(f):
    """Decorator to require authentication."""
    def wrapper(*args, **kwargs):
        if not has_credential():
            console.print(
                "[red]Not authenticated.[/red] Run 'chaotic auth login' or 'chaotic auth set-key' "
                "first, or 'chaotic quickstart' to get set up."
            )
            raise SystemExit(1)
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    wrapper.__doc__ = f.__doc__
    return wrapper


def _as_configured() -> bool:
    """Whether scope lookups go with the configured key itself: yes,
    except when a proxy supplies the registrar key (CHT-1906), when the
    session identity, an agent in the registrar's team, answers them."""
    from cli import session_identity

    return session_identity.proxied_ref() is None


def _team_options(teams: list) -> str:
    return ", ".join(f"{t.get('name')} ({t.get('key')})" for t in teams)


def resolve_env_team() -> str:
    """The team CHAOTIC_TEAM names (an id, key or name), looked up once
    per process with the key the default team is asked with, and
    recorded so get_current_team answers it (CHT-1950)."""
    from . import config

    value = config.env_team()
    teams = client.get_teams(as_configured=_as_configured()) or []
    lowered = value.lower()
    for field in ("id", "key", "name"):
        matches = [t for t in teams if (t.get(field) or "").lower() == lowered]
        if len(matches) == 1:
            config.set_env_team(matches[0]["id"])
            return matches[0]["id"]
    seen = f" Teams this key can see: {_team_options(teams)}." if teams else ""
    raise click.ClickException(
        f"{config.TEAM_ENV}={value!r} matches no single team.{seen} Set it to a team key, or unset it."
    )


def resolve_env_project() -> str:
    """The project CHAOTIC_PROJECT names (an id, key or name), in the
    current team (CHT-1950)."""
    from . import config

    value = config.env_project()
    try:
        project = resolve_project(value)
    except click.ClickException as exc:
        raise click.ClickException(f"{config.PROJECT_ENV}={value!r}: {exc.format_message()}") from exc
    config.set_env_project(project["id"])
    return project["id"]


def key_project() -> dict | None:
    """The project the key is confined to when it is a project-scoped
    agent's (a session identity registered by one inherits it), else
    None; asked once per process, for the CLI and the stdio MCP server
    alike (CHT-1690, CHT-1950). A project that no longer exists says so;
    other failures raise and are asked again next time."""
    from . import config

    slot = config._team_slot(get_api_url(), config.lookup_credential() or "")
    if slot in config._key_projects:
        return config._key_projects[slot]
    me = client.get_me(as_configured=_as_configured()) or {}
    project = None
    if me.get("is_agent") and me.get("agent_project_id"):
        try:
            project = client.get_project(me["agent_project_id"])
        except APIError as exc:
            if getattr(exc, "status_code", None) == 404:
                raise click.ClickException(config.PROJECT_SCOPE_GONE) from exc
            raise
    config._key_projects[slot] = project
    return project


def _key_project() -> dict | None:
    """key_project, with a failed lookup (5xx, network) counted as "not
    project-scoped" for this call. A deleted project still says so."""
    try:
        return key_project()
    except (APIError, httpx.HTTPError):
        return None


def default_team() -> str:
    """The team to use when none is configured (CHT-1950): what
    CHAOTIC_TEAM names, else the key's only team (as `chaotic mcp` does,
    CHT-1687). Kept for this
    process only, never written to a config file. Several teams, or none,
    is an error that says what to run."""
    from . import config

    if config.env_team():
        return resolve_env_team()
    teams = config.accessible_teams(
        get_api_url(), config.lookup_credential() or "",
        functools.partial(client.get_teams, as_configured=_as_configured()),
    ) or []
    if len(teams) == 1:
        config.set_process_team(teams[0]["id"])
        return teams[0]["id"]
    if not teams:
        # The server lists an agent's own team, a project-scoped one's
        # included, so none means no team to default to, as for `chaotic
        # mcp`.
        raise click.ClickException(
            "No team selected. Run 'chaotic team list' to see available teams, "
            "or 'chaotic quickstart' if you don't have one yet."
        )
    raise click.ClickException(
        f"No team selected, and this key has access to several teams ({_team_options(teams)}). "
        f"Run 'chaotic team use <key>', or set {config.TEAM_ENV}=<key>."
    )


def default_project() -> str | None:
    """The project to use when none is configured (CHT-1950): what
    CHAOTIC_PROJECT names, else a project-scoped key's own project when
    it is in the current team. None when neither applies."""
    from . import config

    if config.env_project():
        return resolve_env_project()
    project = _key_project()
    if project and project.get("team_id") == get_current_team():
        config.set_process_project(project["id"])
        return project["id"]
    return None


def warn_env_override(kind: str) -> None:
    """After `team use` / `project use` (and create, which switch too):
    say so when CHAOTIC_TEAM / CHAOTIC_PROJECT is set, since it overrides
    the config file just written (CHT-1953)."""
    from . import config

    name, value = ((config.TEAM_ENV, config.env_team()) if kind == "team"
                   else (config.PROJECT_ENV, config.env_project()))
    if value:
        console.print(
            f"[yellow]Warning: {esc(name)}={esc(value)} is set and overrides this, so it takes effect "
            f"only once {esc(name)} is unset.[/yellow]"
        )


def _register_env_resolvers() -> None:
    """Let config's getters resolve CHAOTIC_TEAM / CHAOTIC_PROJECT on
    first use (CHT-1950), through this module's names so a patched
    client applies."""
    from . import config

    config.set_env_resolvers(lambda: resolve_env_team(), lambda: resolve_env_project())


_register_env_resolvers()


def _defaulting(fn):
    """Run a default-scope lookup with handle_error's reporting: it runs
    in require_team/require_project, outside the command's own."""
    return handle_error(fn)()


def _default_scope() -> None:
    """require_team's lookups. The getters resolve CHAOTIC_TEAM /
    CHAOTIC_PROJECT themselves; this adds the key's defaults. The
    project is looked up when the environment names a team or project,
    or no config file names a team, since many commands read the project
    without requiring it."""
    from . import config

    if not get_current_team():
        default_team()
    if not get_current_project() and (
            config.env_project() or config.env_team() or not load_config().get("current_team")):
        try:
            default_project()
        except click.ClickException as exc:
            # A deleted scoped project: commands that need a project say
            # so through require_project; team-only ones still run.
            if exc.format_message() != config.PROJECT_SCOPE_GONE:
                raise


def require_team(f):
    """Decorator to require current team. With none configured, the
    default team is looked up first, and on a setup with no team in its
    config files, or with CHAOTIC_PROJECT set, the default project too,
    since many commands read the project without requiring it (CHT-1950)."""
    @require_auth
    def wrapper(*args, **kwargs):
        _defaulting(_default_scope)
        if not get_current_team():
            console.print(
                "[red]No team selected.[/red] Run 'chaotic team list' to see available teams, "
                "or 'chaotic quickstart' if you don't have one yet."
            )
            raise SystemExit(1)
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    wrapper.__doc__ = f.__doc__
    return wrapper


def require_project(f):
    """Decorator to require current project."""
    @require_team
    def wrapper(*args, **kwargs):
        _defaulting(lambda: get_current_project() or default_project())
        if not get_current_project():
            console.print(
                "[red]No project selected.[/red] Run 'chaotic project list' to see available "
                "projects, or 'chaotic quickstart' if you don't have one yet."
            )
            raise SystemExit(1)
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    wrapper.__doc__ = f.__doc__
    return wrapper


def handle_error(f):
    """Decorator to handle API errors, httpx errors, and ClickExceptions.

    Under --json every failure it catches is one JSON object on stdout,
    `{"error": message}`, with an `error_code` where there is one
    (CHT-1957): `write_outcome_unknown` for a write that may have landed,
    and `connect_error`/`timeout`/`network_error` for the transport."""
    def wrapper(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except APIError as e:
            if is_json_output():
                payload = {"error": str(e)}
                code = e.detail.get("error_code") if isinstance(e.detail, dict) else None
                if code:
                    payload["error_code"] = code
                output_json(payload)
            else:
                # Server text (issue titles, rejection reasons) is not
                # markup: escape it so a `[/]` cannot crash the print or
                # a `[x]` vanish (CHT-1606).
                console.print(f"[red]Error: {escape(str(e))}[/red]")
            raise SystemExit(1)
        except click.ClickException as e:
            if is_json_output():
                output_json({"error": e.format_message()})
                # Preserve whatever exit code the non-JSON path would have
                # produced (UsageError/BadParameter use 2, everything else
                # ClickException's default of 1) instead of collapsing
                # every ClickException to 1 under --json (CHT-1222).
                raise SystemExit(getattr(e, "exit_code", 1)) from e
            raise
        except httpx.ConnectError:
            msg = f"Could not connect to server at {get_api_url()}. Is the server running?"
            if is_json_output():
                output_json({"error": msg, "error_code": "connect_error"})
            else:
                console.print(f"[red]{esc(msg)}[/red]")
            raise SystemExit(1)
        except httpx.TimeoutException:
            # A write that may have landed is a WriteOutcomeUnknown (an
            # APIError, above); this is a read, or a write never sent.
            msg = "Request timed out. The server may be overloaded or unreachable."
            if is_json_output():
                output_json({"error": msg, "error_code": "timeout"})
            else:
                console.print(f"[red]{esc(msg)}[/red]")
            raise SystemExit(1)
        except httpx.HTTPError as e:
            msg = f"Network error: {e}"
            if is_json_output():
                output_json({"error": msg, "error_code": "network_error"})
            else:
                console.print(f"[red]{esc(msg)}[/red]")
            raise SystemExit(1)
        except Exception as e:
            # Anything else still answers --json with JSON, never a
            # traceback alone (CHT-1957); without --json it is a bug to see.
            if not is_json_output():
                raise
            import traceback
            traceback.print_exc(file=sys.stderr)  # stdout stays one JSON value
            output_json({"error": f"Unexpected error: {type(e).__name__}: {e}", "error_code": "internal_error"})
            raise SystemExit(1) from e
    wrapper.__name__ = f.__name__
    wrapper.__doc__ = f.__doc__
    return wrapper


def resolve_project(identifier: str) -> dict:
    """Resolve a project identifier (ID, key, or name) to a project dict.

    Must be called when a team is already set (e.g., after @require_team).

    Args:
        identifier: A project UUID, key (e.g., 'CHT'), or name

    Returns:
        The full project dict from the API

    Raises:
        click.ClickException if project not found
    """
    identifier = identifier.strip()
    team_id = get_current_team()
    projects = client.get_projects(team_id)

    if not projects:
        raise click.ClickException(
            "No projects found in this team. Create one with 'chaotic project create'"
        )

    # Try exact match on ID first
    for p in projects:
        if p["id"] == identifier:
            return p

    # Try match on key (case-insensitive)
    identifier_upper = identifier.upper()
    for p in projects:
        if p["key"].upper() == identifier_upper:
            return p

    # Try match on name (case-insensitive)
    identifier_lower = identifier.lower()
    name_matches = [p for p in projects if p["name"].lower() == identifier_lower]
    if len(name_matches) == 1:
        return name_matches[0]
    if len(name_matches) > 1:
        matches = "\n".join(
            f"  {p.get('key', '?')}: {p.get('name', 'Unnamed')} ({p['id'][:8]}…)"
            for p in name_matches
        )
        raise click.ClickException(
            f"Ambiguous project name '{identifier}'. Matches:\n{matches}\n"
            f"Use the project key or ID for precision."
        )

    # Try UUID prefix match
    prefix_matches = [p for p in projects if p["id"].startswith(identifier)]
    if len(prefix_matches) == 1:
        return prefix_matches[0]
    if len(prefix_matches) > 1:
        matches = "\n".join(
            f"  {p['id']} ({p.get('key', '?')}: {p.get('name', 'Unnamed')})"
            for p in prefix_matches
        )
        raise click.ClickException(
            f"Ambiguous project ID prefix '{identifier}'. Matches:\n{matches}"
        )

    raise click.ClickException(f"Project not found: '{identifier}'")


def resolve_project_id(identifier: str) -> str:
    """Resolve a project identifier to just the project ID.

    Convenience wrapper around resolve_project() for callers
    that only need the ID.
    """
    return resolve_project(identifier)["id"]


def resolve_assignee_id(assignee_value: str) -> str:
    """Resolve an assignee string to a user/agent ID."""
    if not assignee_value:
        raise click.ClickException("Assignee is required.")

    if assignee_value.lower() == "me":
        user = client.get_me()
        return user["id"]

    team_id = get_current_team()
    if not team_id:
        raise click.ClickException(
            "No team selected. Run 'chaotic team use <team_id>' first."
        )

    value_lower = assignee_value.lower()
    candidates: list[tuple[str, str]] = []

    def matches(candidate_id: str, *fields: str | None) -> bool:
        if assignee_value == candidate_id:
            return True
        if len(assignee_value) >= 4 and candidate_id.startswith(assignee_value):
            return True
        for field in fields:
            if field and field.lower() == value_lower:
                return True
        return False

    members = client.get_team_members(team_id)
    for member in members:
        user_id = member.get("user_id") or member.get("id")
        name = member.get("user_name") or member.get("name") or ""
        email = member.get("user_email") or member.get("email") or ""
        if matches(user_id, name, email):
            label = name or email or user_id
            candidates.append((user_id, f"{label} (user)"))

    agents = client.get_team_agents(team_id)
    for agent in agents:
        agent_id = agent["id"]
        name = agent.get("name") or ""
        parent = agent.get("parent_user_name") or "Unknown"
        if matches(agent_id, name):
            label = name or agent_id
            candidates.append((agent_id, f"{label} (agent, parent: {parent})"))

    if not candidates:
        raise click.ClickException(
            f"Assignee not found: '{assignee_value}'. Use a user/agent ID, name, email, or 'me'."
        )

    if len(candidates) > 1:
        console.print(f"[red]Ambiguous assignee '{esc(assignee_value)}':[/red]")
        for _, label in candidates:
            console.print(f"  - {esc(label)}")
        raise click.ClickException("Please be more specific.")

    return candidates[0][0]


class ProfileGroup(click.Group):
    """Custom Group that extracts --profile from anywhere in the arg list.

    Click normally only parses parent-group options that appear before the
    subcommand name.  This override lets users write either:
        chaotic --profile opus sprint show
        chaotic sprint show --profile opus

    Only the long-form ``--profile`` is pre-extracted.  The short ``-p`` alias
    is NOT handled here because it collides with subcommand flags (e.g.,
    ``agent create -p``).  ``-p`` still works in the normal Click position
    (before the subcommand name).

    Also owns the --json contract for parse-time failures (CHT-1222): see
    ``main()`` below.
    """

    _profile_from_args = None  # set by parse_args, read by cli()

    def parse_args(self, ctx, args):
        # Pre-extract --profile (long form only) so it works after subcommand
        # names (CHT-771).  We skip -p to avoid stealing flags from subcommands.
        new_args = []
        profile_val = None
        i = 0
        while i < len(args):
            if args[i] == '--profile' and i + 1 < len(args):
                profile_val = args[i + 1]
                i += 2
            elif args[i].startswith('--profile='):
                profile_val = args[i].split('=', 1)[1]
                i += 1
            else:
                new_args.append(args[i])
                i += 1
        if profile_val:
            set_profile(profile_val)
            # Stash so cli() knows not to override with envvar fallback
            ProfileGroup._profile_from_args = profile_val
        return super().parse_args(ctx, new_args)

    def main(self, args=None, *main_args, standalone_mode=True, **extra):
        """Guarantee ``{"error": ...}`` on stdout for parse-time failures
        under --json (CHT-1222).

        Click's own parameter validation — ``type=click.Choice(...)``,
        missing required arguments, unknown flags — happens in
        ``Command.parse_args()``/``make_context()``, entirely before any
        command callback (and therefore before every decorator in the
        json_option/handle_error stack) runs. Handling it per-command is
        impossible; this is the one chokepoint that sees those errors.

        Because parsing failed, ctx params are unusable — --json is
        detected by scanning the raw argv. Non-JSON invocations take the
        stock Click standalone path unchanged.
        """
        if not standalone_mode:
            # Caller explicitly asked for exceptions to propagate; don't
            # interpose.
            return super().main(args, *main_args, standalone_mode=False, **extra)

        raw_args = list(args) if args is not None else sys.argv[1:]
        if '--json' not in raw_args:
            return super().main(raw_args, *main_args, standalone_mode=True, **extra)

        try:
            rv = super().main(raw_args, *main_args, standalone_mode=False, **extra)
        except click.ClickException as e:
            # Parse-time UsageError/BadParameter (or a body-level
            # ClickException re-raised by handle_error's non-JSON branch —
            # unreachable here since --json is set, but harmless).
            output_json({"error": e.format_message()})
            e.show()  # usage + error text; writes to stderr
            sys.exit(e.exit_code)
        except click.exceptions.Abort:
            # SIGINT / EOF on a prompt. Keep the one-JSON-value contract.
            output_json({"error": "Aborted."})
            click.echo("Aborted!", err=True)
            sys.exit(1)
        else:
            # Normal completion. With standalone_mode=False, click returns
            # either the callback's return value (a dict/None for our
            # commands — not an exit code) or, when ctx.exit(code) was
            # raised (--help/--version), that code as an int. Command
            # bodies signal failure via SystemExit, which propagates past
            # this handler untouched.
            sys.exit(rv if isinstance(rv, int) and not isinstance(rv, bool) else 0)


# Main CLI group
@click.group(cls=ProfileGroup, invoke_without_command=True)
@click.version_option(package_name="chaotic-cli")
@click.option(
    '--profile', '-p',
    envvar='CHAOTIC_PROFILE',
    help='Config profile name (e.g., "claude" loads ~/.chaotic/claude.json).'
)
@click.option(
    '--json', 'json_output',
    is_flag=True,
    help='Output as JSON instead of formatted text.'
)
@click.option(
    '--yes', '-y',
    is_flag=True,
    help='Skip confirmation prompts (for scripts/automation).'
)
@click.pass_context
def cli(ctx, profile, json_output, yes):
    """Chaotic - Issue tracking CLI for modern teams."""
    # Store flags in context for subcommands
    ctx.ensure_object(dict)
    ctx.obj['json'] = json_output
    ctx.obj['yes'] = yes

    # Set profile before any config loading happens.
    # ProfileGroup may have already set it from a post-subcommand --profile;
    # in that case the CLI flag should take precedence over envvar fallback.
    if ProfileGroup._profile_from_args:
        # Already handled by ProfileGroup.parse_args — don't let the envvar
        # fallback (which Click puts in `profile`) override the explicit flag.
        pass
    elif profile:
        set_profile(profile)

    # Check for profile ambiguity (fail closed when multiple profiles exist)
    # Skip check for profile management and upgrade commands
    if ctx.invoked_subcommand not in ("profile", "upgrade"):
        try:
            check_profile_ambiguity()
        except ProfileAmbiguityError as e:
            console.print(f"[red]Error: {esc(e)}[/red]")
            raise SystemExit(1)

    if ctx.invoked_subcommand is None:
        # No subcommand - check auth status and show appropriate message
        if not has_credential():
            console.print("\n[bold]Welcome to Chaotic![/bold]\n")
            console.print("To get started, run:\n")
            console.print("  [bold cyan]chaotic quickstart[/bold cyan]")
            console.print("  [dim]Interactive setup wizard (recommended)[/dim]\n")
            console.print("Or for browser-based setup:\n")
            console.print("  [bold cyan]chaotic init[/bold cyan]")
            console.print("  [dim]Opens browser to authenticate and configure[/dim]\n")
        else:
            # Authenticated - show status
            ctx.invoke(status)


# Config commands
# Init command - browser-based setup
@cli.command("init")
@click.option("--url", default=None, help=f"Chaotic server URL (default: http://localhost:{DEFAULT_PORT})")
@handle_error
def init(url):
    """Initialize Chaotic in this project via browser auth.

    Opens your browser to log in and authorize the CLI.
    Creates an API key and configures this directory.
    """
    import http.server
    import socketserver
    import threading
    import urllib.parse
    import secrets

    # Resolve the server URL
    if url:
        url = url.rstrip("/")
        if not url.endswith("/api"):
            url = f"{url}/api"
        set_api_url(url)
    else:
        existing_api_url = get_api_url()
        # get_api_url() always returns a value (falls back to default),
        # so check if there's an actual configured value in any config layer
        configured = load_config().get("api_url")
        if not configured:
            url = f"http://localhost:{DEFAULT_PORT}"
            set_api_url(f"{url}/api")
        else:
            # Derive base URL from existing API URL for browser auth
            url = existing_api_url
            if url.endswith("/api"):
                url = url[:-4]
            elif url.endswith("/api/"):
                url = url[:-5]

    # Generate a state token for security
    state = secrets.token_urlsafe(16)

    # Find an available port
    with socketserver.TCPServer(("", 0), None) as s:
        port = s.server_address[1]

    callback_url = f"http://localhost:{port}/callback"
    received_data = {"key": None, "team": None, "project": None, "error": None}
    server_ready = threading.Event()

    class CallbackHandler(http.server.BaseHTTPRequestHandler):
        def log_message(self, format, *args):
            pass  # Suppress logging

        def do_GET(self):
            parsed = urllib.parse.urlparse(self.path)
            if parsed.path == "/callback":
                params = urllib.parse.parse_qs(parsed.query)

                # Check state
                if params.get("state", [None])[0] != state:
                    self.send_response(400)
                    self.end_headers()
                    self.wfile.write(b"Invalid state")
                    received_data["error"] = "Invalid state token"
                    return

                # Extract data
                if "error" in params:
                    received_data["error"] = params["error"][0]
                else:
                    received_data["key"] = params.get("key", [None])[0]
                    received_data["team"] = params.get("team", [None])[0]
                    received_data["project"] = params.get("project", [None])[0]

                # Send success response
                self.send_response(200)
                self.send_header("Content-type", "text/html")
                self.end_headers()
                self.wfile.write(b"""
                    <html><body style="font-family: system-ui; text-align: center; padding: 50px;">
                    <h1>CLI Authorized!</h1>
                    <p>You can close this tab and return to your terminal.</p>
                    </body></html>
                """)

    # Start server in background
    server = socketserver.TCPServer(("", port), CallbackHandler)

    def serve():
        server_ready.set()
        server.handle_request()  # Handle one request then stop

    thread = threading.Thread(target=serve, daemon=True)
    thread.start()
    server_ready.wait()

    # Build auth URL
    auth_url = f"{url}/cli-auth?callback={urllib.parse.quote(callback_url)}&state={state}"

    console.print(f"\n[bold]Opening browser to authorize Chaotic CLI...[/bold]\n")
    console.print(f"[dim]If browser doesn't open, visit:[/dim]")
    console.print(f"[link={esc(auth_url)}]{esc(auth_url)}[/link]\n")

    webbrowser.open(auth_url)

    console.print("[dim]Waiting for authorization...[/dim]")

    # Wait for callback (with timeout)
    thread.join(timeout=300)  # 5 minute timeout
    server.server_close()

    if received_data["error"]:
        console.print(f"\n[red]Authorization failed: {esc(received_data['error'])}[/red]")
        raise SystemExit(1)

    if not received_data["key"]:
        console.print("\n[red]Authorization timed out or was cancelled.[/red]")
        raise SystemExit(1)

    # Save the config
    set_api_key(received_data["key"])
    console.print(f"\n[green]✓ API key saved[/green]")

    if received_data["team"]:
        set_current_team(received_data["team"])
        console.print(f"[green]✓ Team configured[/green]")

    if received_data["project"]:
        set_current_project(received_data["project"])
        console.print(f"[green]✓ Project configured[/green]")

    # Show where config was saved
    config_path = get_local_config_path()
    console.print(f"[green]✓ Config saved to {esc(config_path)}[/green]")

    console.print(f"\n[bold green]Chaotic initialized![/bold green]")
    console.print("Run [bold]chaotic status[/bold] to verify your setup.")


@cli.command("quickstart")
@click.option("--url", default=None, help=f"Chaotic server URL (default: http://localhost:{DEFAULT_PORT})")
@handle_error
def quickstart(url):
    """Interactive setup wizard for new users."""
    if not sys.stdin.isatty():
        console.print("[yellow]quickstart requires an interactive terminal.[/yellow]")
        console.print("Use [bold]chaotic init[/bold] for browser-based setup instead.")
        raise SystemExit(1)

    console.print()
    console.print(Panel(
        "[bold]Welcome to Chaotic![/bold]\n\n"
        "Chaotic is a lightweight issue tracker\n"
        "built for teams that use the CLI.\n\n"
        "Let's get you set up.",
        title="Chaotic",
        border_style="blue",
    ))
    console.print()

    # Resolve server URL
    api_url = url or get_api_url() or f"http://localhost:{DEFAULT_PORT}"
    if not api_url.endswith("/api"):
        api_url = api_url.rstrip("/") + "/api"
    set_api_url(api_url)

    try:
        _run_quickstart_wizard()
    except (KeyboardInterrupt, click.Abort):
        console.print("\n[yellow]Setup cancelled.[/yellow]")
        console.print("Run [bold]chaotic quickstart[/bold] to resume, or [bold]chaotic init[/bold] for browser setup.")
        raise SystemExit(130)


def _run_quickstart_wizard():
    """Interactive wizard steps. Separated for KeyboardInterrupt handling."""
    step = 1
    total_steps = 4

    # Step 1: Account
    if get_token() or get_api_key():
        try:
            me = client.get_me()
            console.print(f"  [green]✓[/green] Already signed in as [bold]{esc(me['name'])}[/bold] ({esc(me['email'])})")
            console.print()
        except Exception:
            # Token is stale, proceed to auth
            pass
    if not get_token() and not get_api_key():
        console.print(f"  [bold blue]Step {esc(step)}/{esc(total_steps)}: Create Account[/bold blue]")
        console.print()

        has_account = click.confirm("  Already have an account?", default=False)
        console.print()

        if has_account:
            email = sanitized_prompt("  Email")
            password = click.prompt("  Password", hide_input=True)
            result = client.login(email, password)
            set_token(result["access_token"])
            me = client.get_me()
            console.print(f"  [green]✓ Signed in as {esc(me['name'])}[/green]")
        else:
            name = sanitized_prompt("  Your name")
            email = sanitized_prompt("  Email")
            password = click.prompt("  Password", hide_input=True)
            try:
                client.signup(name, email, password)
                result = client.login(email, password)
                set_token(result["access_token"])
                console.print(f"  [green]✓ Account created and signed in![/green]")
            except APIError as e:
                if "already" in str(e).lower():
                    console.print(f"  [yellow]That email is already registered.[/yellow]")
                    console.print("  [dim]Run quickstart again and choose 'Already have an account'.[/dim]")
                    raise SystemExit(1)
                else:
                    raise
        console.print()
        step += 1

    # Step 2: Team
    team_id = None
    team_name = None
    team_key = None

    try:
        teams = client.get_teams()
    except Exception:
        teams = []

    if teams:
        team = teams[0]
        team_id = team["id"]
        team_name = team["name"]
        team_key = team["key"]
        set_current_team(team_id, local=True)
        console.print(f"  [green]✓[/green] Using team [bold]{esc(team_name)}[/bold] ({esc(team_key)})")
        console.print()
    else:
        console.print(f"  [bold blue]Step {esc(step)}/{esc(total_steps)}: Create Your Team[/bold blue]")
        console.print()
        console.print("  [dim]Teams organize your people and projects.[/dim]")
        console.print()

        for _attempt in range(5):
            team_name = sanitized_prompt("  Team name", default="My Team")
            default_key = suggest_key(team_name)
            team_key = click.prompt("  Team key (2-10 chars, used in issue IDs)", default=default_key).upper()
            try:
                result = client.create_team(team_name, team_key)
                team_id = result["id"]
                set_current_team(team_id, local=True)
                console.print(f"  [green]✓ Team created: {esc(team_name)} ({esc(team_key)})[/green]")
                break
            except APIError as e:
                if "key" in str(e).lower() and ("exists" in str(e).lower() or "already" in str(e).lower()):
                    console.print(f"  [yellow]Key '{esc(team_key)}' is already taken. Try another.[/yellow]")
                else:
                    raise
        else:
            raise click.ClickException("Too many attempts. Run 'chaotic team create' manually.")
        console.print()
    step += 1

    # Step 3: Project
    project_id = None
    project_name = None
    project_key = None

    try:
        projects = client.get_projects(team_id)
    except Exception:
        projects = []

    if projects:
        project = projects[0]
        project_id = project["id"]
        project_name = project["name"]
        project_key = project["key"]
        set_current_project(project_id, local=True)
        console.print(f"  [green]✓[/green] Using project [bold]{esc(project_name)}[/bold] ({esc(project_key)})")
        console.print()
    else:
        console.print(f"  [bold blue]Step {esc(step)}/{esc(total_steps)}: Create Your First Project[/bold blue]")
        console.print()
        console.print("  [dim]Projects group related issues. One per repo or component.[/dim]")
        console.print()

        for _attempt in range(5):
            project_name = sanitized_prompt("  Project name", default="My Project")
            default_key = suggest_key(project_name)
            project_key = click.prompt("  Project key", default=default_key).upper()
            try:
                result = client.create_project(team_id, project_name, project_key)
                project_id = result["id"]
                set_current_project(project_id, local=True)
                console.print(f"  [green]✓ Project created: {esc(project_name)} ({esc(project_key)})[/green]")
                break
            except APIError as e:
                if "key" in str(e).lower() and ("exists" in str(e).lower() or "already" in str(e).lower()):
                    console.print(f"  [yellow]Key '{esc(project_key)}' is already taken. Try another.[/yellow]")
                else:
                    raise
        else:
            raise click.ClickException("Too many attempts. Run 'chaotic project create' manually.")
        console.print()
    step += 1

    # Step 4: First issue
    console.print(f"  [bold blue]Step {esc(step)}/{esc(total_steps)}: Create Your First Issue[/bold blue]")
    console.print()

    title = sanitized_prompt("  Issue title", default="Set up project")
    result = client.create_issue(project_id, title)
    identifier = result.get("identifier", f"{project_key}-{result.get('number', '?')}")
    console.print(f"  [green]✓ Created: {esc(identifier)} - {esc(title)}[/green]")
    console.print()

    # Summary
    web_url = get_web_url() or f"http://localhost:{DEFAULT_PORT}"
    console.print(Panel(
        f"[bold]Your workspace:[/bold]\n"
        f"  Team:    {esc(team_name)} ({esc(team_key)})\n"
        f"  Project: {esc(project_name)} ({esc(project_key)})\n"
        f"  Issue:   {esc(identifier)} - {esc(title)}\n\n"
        f"[bold]Quick reference:[/bold]\n"
        f"  chaotic issue list          List issues\n"
        f"  chaotic issue create \"...\"  Create an issue\n"
        f"  chaotic status              Show context\n"
        f"  {esc(web_url)}      Open web UI",
        title="You're all set!",
        border_style="green",
    ))
    console.print()
    console.print("[dim]Remote server? Make it accessible outside localhost with:[/dim]")
    console.print("[dim]  chaotic system reconfigure --host 0.0.0.0[/dim]")
    console.print("[dim]  (Not recommended yet — this is alpha software!)[/dim]")
    console.print()


# CLI self-upgrade command (CHT-811)
@cli.command("upgrade")
@click.option("--version", "target_version", default=None, help="Target version (e.g. 0.1.0a9). Defaults to latest.")
@click.option("--git", is_flag=True, help="Install from git main branch instead of PyPI.")
@click.option("--dry-run", is_flag=True, help="Show what would be done without executing.")
def upgrade(target_version, git, dry_run):
    """Upgrade the Chaotic CLI to the latest version."""
    import importlib.metadata
    import re

    pkg = "chaotic-cli"
    GIT_URL = "git+https://github.com/thethirdbearsolutions/chaotic.sh.git#subdirectory=cli"

    if git and target_version:
        console.print("[red]Cannot use --git and --version together.[/red]")
        raise SystemExit(1)

    # Validate version string if provided
    if target_version and not re.match(r'^[0-9a-zA-Z._-]+$', target_version):
        console.print(f"[red]Invalid version string: {esc(target_version)}[/red]")
        raise SystemExit(1)

    # Get current version
    try:
        current = importlib.metadata.version(pkg)
    except importlib.metadata.PackageNotFoundError:
        current = "unknown"
    console.print(f"Current version: [bold]{esc(current)}[/bold]")

    # Detect install method
    installer = _detect_installer()
    if installer is None:
        console.print("[red]Could not detect how chaotic-cli was installed.[/red]")
        console.print("Try upgrading manually:")
        console.print("  uv tool install chaotic-cli --prerelease allow")
        console.print("  pip install --pre --upgrade chaotic-cli")
        raise SystemExit(1)

    console.print(f"Install method: [bold]{esc(installer)}[/bold]")
    if git:
        console.print("Source: [bold]git main[/bold]")

    # Build the upgrade command
    cmd = _build_upgrade_cmd(installer, pkg, target_version, git_url=GIT_URL if git else None)
    console.print(f"Command: [dim]{esc(' '.join(cmd))}[/dim]")

    if dry_run:
        console.print("[yellow]Dry run — nothing executed.[/yellow]")
        return

    # Run the upgrade
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    except subprocess.TimeoutExpired:
        console.print("[red]Upgrade timed out after 120 seconds.[/red]")
        raise SystemExit(1)

    if result.returncode != 0:
        console.print(f"[red]Upgrade failed (exit {esc(result.returncode)}):[/red]")
        if result.stderr:
            console.print(esc(result.stderr.strip()))
        raise SystemExit(1)

    if result.stdout:
        console.print(esc(result.stdout.strip()))

    # Report new version using the installer's own listing
    try:
        new_ver = _get_installed_version(installer, pkg)
        if git:
            # Git installs may not bump the version string, so always report success
            if new_ver:
                console.print(f"[green]Installed from git main (version {esc(new_ver)}).[/green]")
            else:
                console.print("[green]Installed from git main.[/green]")
        elif new_ver and new_ver != current:
            console.print(f"[green]Upgraded: {esc(current)} -> {esc(new_ver)}[/green]")
        elif new_ver == current:
            console.print(f"[yellow]Already at latest version ({esc(current)}).[/yellow]")
        else:
            console.print("[green]Upgrade complete.[/green]")
    except Exception:
        console.print("[green]Upgrade complete.[/green]")


def _detect_installer() -> str | None:
    """Detect how chaotic-cli was installed: 'uv', 'pipx', or 'pip'."""

    # Check uv tool list
    if shutil.which("uv"):
        try:
            result = subprocess.run(
                ["uv", "tool", "list"], capture_output=True, text=True, timeout=10,
            )
            if "chaotic-cli" in result.stdout:
                return "uv"
        except Exception:
            pass

    # Check pipx
    if shutil.which("pipx"):
        try:
            result = subprocess.run(
                ["pipx", "list", "--short"], capture_output=True, text=True, timeout=10,
            )
            if "chaotic-cli" in result.stdout:
                return "pipx"
        except Exception:
            pass

    # Fallback to pip
    if shutil.which("pip") or shutil.which("pip3"):
        return "pip"

    return None


def _build_upgrade_cmd(installer: str, pkg: str, version: str | None, git_url: str | None = None) -> list[str]:
    """Build the upgrade command for the detected installer.

    For uv: uses a prerelease-inclusive version specifier (>=0.0.0a0) instead
    of --prerelease allow, so only chaotic-cli prereleases are accepted —
    not prereleases of transitive deps like httpx.
    """
    if git_url:
        source = git_url
    elif version:
        source = f"{pkg}=={version}"
    else:
        source = pkg

    if installer == "uv":
        # Use >=0.0.0a0 specifier to opt into prereleases for just this
        # package, NOT --prerelease allow which leaks to all deps.
        if not git_url and not version:
            source = f"{pkg}>=0.0.0a0"
        cmd = ["uv", "tool", "install", "--force", source]
    elif installer == "pipx":
        if git_url or version:
            cmd = ["pipx", "install", "--force", source]
        else:
            cmd = ["pipx", "upgrade", pkg, "--pip-args=--pre"]
    else:
        pip_cmd = "pip3" if shutil.which("pip3") else "pip"
        cmd = [pip_cmd, "install", "--upgrade", "--pre", source]

    return cmd


def _get_installed_version(installer: str, pkg: str) -> str | None:
    """Get the installed version of a package using the appropriate tool."""
    try:
        if installer == "uv":
            result = subprocess.run(
                ["uv", "tool", "list"], capture_output=True, text=True, timeout=10,
            )
            for line in result.stdout.splitlines():
                if pkg in line:
                    # uv tool list format: "chaotic-cli v0.1.0a9"
                    parts = line.split()
                    if len(parts) >= 2:
                        return parts[1].lstrip("v")
        elif installer == "pipx":
            result = subprocess.run(
                ["pipx", "list", "--short"], capture_output=True, text=True, timeout=10,
            )
            for line in result.stdout.splitlines():
                if pkg in line:
                    # pipx list --short format: "chaotic-cli 0.1.0a9"
                    parts = line.split()
                    if len(parts) >= 2:
                        return parts[1]
        else:
            # pip: use pip show
            pip_cmd = "pip3" if shutil.which("pip3") else "pip"
            result = subprocess.run(
                [pip_cmd, "show", pkg], capture_output=True, text=True, timeout=10,
            )
            for line in result.stdout.splitlines():
                if line.startswith("Version:"):
                    return line.split(":", 1)[1].strip()
    except Exception:
        pass
    return None


# Shortcut: 'me' as alias for 'auth whoami'
@cli.command("me")
@json_option
@require_auth
@handle_error
def me():
    """Show current user info (shortcut for 'auth whoami')."""
    user = client.get_me()
    if is_json_output():
        output_json(user)
        return
    console.print(Panel(f"[bold]{esc(user['name'])}[/bold]\n{esc(user['email'])}", title="Current User"))


# Shortcut: 'status' to show current context
@cli.command("status")
@json_option
@handle_error
def status():
    """Show current context (team, project, user)."""
    # JSON output mode (CHT-170)
    if is_json_output():
        local_cfg = find_local_config()
        result = {
            "profile": get_effective_profile(),
            "config_path": str(local_cfg) if local_cfg else None,
            "authenticated": has_credential(),
            "user": None,
            "team_id": get_current_team(),
            "team": None,
            "project_id": get_current_project(),
            "project": None,
        }
        if result["authenticated"]:
            try:
                user = client.get_me()
                result["user"] = user
                if user.get("is_agent"):
                    try:
                        result["agent"] = client.get_agent(user["id"])
                    except Exception:
                        pass
            except Exception as e:
                result["user_error"] = str(e)
        if result["team_id"]:
            try:
                result["team"] = client.get_team(result["team_id"])
            except Exception as e:
                result["team_error"] = str(e)
        if result["project_id"]:
            try:
                result["project"] = client.get_project(result["project_id"])
            except Exception as e:
                result["project_error"] = str(e)
        output_json(result)
        return

    local_config = find_local_config()
    if local_config:
        config_type_markup = f"[dim](local: {esc(local_config)})[/dim]"
    else:
        config_type_markup = "[dim](global ~/.chaotic)[/dim]"

    # Show profile if not default
    current_profile = get_effective_profile()
    if current_profile != "default":
        config_type_markup = f"[cyan](profile: {esc(current_profile)})[/cyan] {config_type_markup}"

    console.print(f"[bold]Current Context[/bold] {config_type_markup}\n")

    # Auth status (CHT-478)
    if has_credential():
        try:
            user = client.get_me()
            if user.get("is_agent"):
                console.print(f"  [green]✓[/green] Acting as: [bold]{esc(user['name'])}[/bold] [dim](agent)[/dim]")
                try:
                    agent_info = client.get_agent(user["id"])
                    parent_name = agent_info.get("parent_user_name", "unknown")
                    console.print(f"    [dim]↳ Parent: {esc(parent_name)}[/dim]")
                except Exception:
                    pass
            else:
                console.print(f"  [green]✓[/green] Logged in as: [bold]{esc(user['name'])}[/bold] ({esc(user['email'])})")
        except Exception:
            console.print("  [yellow]![/yellow] Auth token set but unable to verify")
    else:
        console.print("  [red]✗[/red] Not logged in")

    # Team status
    team_id = get_current_team()
    if team_id:
        try:
            team = client.get_team(team_id)
            console.print(f"  [green]✓[/green] Team: [bold]{esc(team['name'])}[/bold] ({esc(team['key'])})")
        except Exception:
            console.print(f"  [yellow]![/yellow] Team ID set: {esc(team_id[:8])}...")
    else:
        console.print("  [dim]-[/dim] No team selected")

    # Project status
    project_id = get_current_project()
    if project_id:
        try:
            project = client.get_project(project_id)
            console.print(f"  [green]✓[/green] Project: [bold]{esc(project['name'])}[/bold] ({esc(project['key'])})")
        except Exception:
            console.print(f"  [yellow]![/yellow] Project ID set: {esc(project_id[:8])}...")
    else:
        console.print("  [dim]-[/dim] No project selected")

    # CHT-1221: bare `chaotic` already points a zero-state user at quickstart
    # (main.py's no-subcommand branch) -- `status` gave the same information
    # with no next step. Match it.
    if not has_credential() and not team_id and not project_id:
        console.print()
        console.print("Run [bold cyan]chaotic quickstart[/bold cyan] to get set up.")

    # Pending approvals (GATE and REVIEW)
    if project_id:
        try:
            pending = client.get_pending_approvals(project_id)
            if pending:
                gate_count = 0
                review_count = 0
                for item in pending:
                    for appr in item.get("pending_approvals", []):
                        if appr.get("approval_mode") == "gate":
                            gate_count += 1
                        else:
                            review_count += 1
                parts = []
                if gate_count:
                    parts.append(f"{gate_count} gate approval{'s' if gate_count != 1 else ''}")
                if review_count:
                    parts.append(f"{review_count} review{'s' if review_count != 1 else ''}")
                count = len(pending)
                suffix = f" ({', '.join(parts)})" if parts else ""
                console.print(f"\n  [yellow]⚠[/yellow] [bold]{esc(count)}[/bold] issue{esc('s' if count != 1 else '')} awaiting approval{esc(suffix)}")
                for item in pending[:5]:
                    ident = item.get("identifier", "")
                    title = item.get("title", "")
                    approvals = item.get("pending_approvals", [])
                    ritual_names = ", ".join(a.get("ritual_name", "") for a in approvals)
                    console.print(f"    [dim]•[/dim] {esc(ident)}: {esc(title)} [dim]({esc(ritual_names)})[/dim]")
                if count > 5:
                    console.print(f"    [dim]... and {esc(count - 5)} more[/dim]")
        except Exception:
            pass  # Don't fail status if approval check fails


@cli.command("whoami")
@handle_error
def whoami():
    """Show current authenticated identity."""
    if not has_credential():
        console.print("[red]Not authenticated.[/red] Run `chaotic login` or set an API key.")
        raise SystemExit(1)

    user = client.get_me()

    console.print(f"[bold]User:[/bold] {esc(user['name'])}")
    console.print(f"[bold]Email:[/bold] {esc(user['email'])}")
    console.print(f"[bold]Type:[/bold] {esc('Agent' if user.get('is_agent') else 'Human')}")

    api_key = get_api_key()
    if api_key:
        console.print(f"[bold]API Key:[/bold] {esc(api_key[:12])}...")
    elif get_token():
        console.print("[bold]Auth:[/bold] JWT token")

    profile = get_effective_profile()
    if profile != "default":
        console.print(f"[bold]Profile:[/bold] {esc(profile)}")

    config_file = get_global_config_file()
    console.print(f"[bold]Config:[/bold] {esc(config_file)}")


# Register command modules and system commands
from .commands import label as _label_mod, agent as _agent_mod
from .commands import config_cmd as _config_mod, profile_cmd as _profile_mod
from .commands import auth as _auth_mod, team as _team_mod
from .commands import project as _project_mod, epic as _epic_mod
from .commands import doc as _doc_mod
from .commands import sprint_cmd as _sprint_mod
from .commands import ritual_cmd as _ritual_mod
from .commands import issue_cmd as _issue_mod
from .commands import await_cmd as _await_mod
from .commands import mcp_cmd as _mcp_mod
from .commands import inbox_cmd as _inbox_mod
from .commands import template_cmd as _template_mod

_config_mod.register(cli)
_profile_mod.register(cli)
_auth_mod.register(cli)
_team_mod.register(cli)
_project_mod.register(cli)
_label_mod.register(cli)
_agent_mod.register(cli)
_epic_mod.register(cli)
_doc_mod.register(cli)
_sprint_mod.register(cli)
_ritual_mod.register(cli)
_issue_mod.register(cli)
_await_mod.register(cli)
_mcp_mod.register(cli)
_inbox_mod.register(cli)
_template_mod.register(cli)

cli.add_command(system)


if __name__ == "__main__":
    cli()
