#!/usr/bin/env python3
"""Chaotic CLI - Command-line interface for Chaotic issue tracker."""
import functools
import json
import shutil
import subprocess
import sys
import webbrowser
import click
from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich.markdown import Markdown
from rich import print as rprint

from .config import (
    set_token, get_token, set_api_url, get_api_url, get_web_url,
    get_current_team, set_current_team,
    get_current_project, set_current_project,
    get_api_key, set_api_key, has_local_config,
    find_local_config, get_local_config_path,
    load_config, load_global_config, save_global_config,
    get_global_config_file, DEFAULT_PORT,
    set_profile, get_profile, get_effective_profile,
    list_profiles, check_profile_ambiguity,
    ProfileAmbiguityError, ProfileError,
)
from .client import client, APIError
from .system import system
from .commands.shared import (  # noqa: F401 – re-exported for backward compat
    console, get_status_color, suggest_key,
    resolve_sprint_id, resolve_document_id, resolve_label_id,
    resolve_team_id, print_sprint_panel,
    format_ritual_line, print_ritual_prompt,
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
    """Prompt for confirmation, auto-accepting if --yes flag is set (CHT-436)."""
    if is_yes_mode():
        return True
    return click.confirm(prompt, **kwargs)


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
    return click.option('--json', 'json_output', is_flag=True, hidden=True,
                        help='Output as JSON instead of formatted text.')(wrapper)


def output_json(data):
    """Output data as JSON and exit."""
    click.echo(json.dumps(data, indent=2, default=str))


def require_auth(f):
    """Decorator to require authentication."""
    def wrapper(*args, **kwargs):
        if not get_token() and not get_api_key():
            console.print("[red]Not authenticated. Run 'chaotic auth login' or 'chaotic auth set-key' first.[/red]")
            raise SystemExit(1)
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    wrapper.__doc__ = f.__doc__
    return wrapper


def require_team(f):
    """Decorator to require current team."""
    @require_auth
    def wrapper(*args, **kwargs):
        if not get_current_team():
            console.print("[red]No team selected. Run 'chaotic team use <team_id>' first.[/red]")
            raise SystemExit(1)
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    wrapper.__doc__ = f.__doc__
    return wrapper


def require_project(f):
    """Decorator to require current project."""
    @require_team
    def wrapper(*args, **kwargs):
        if not get_current_project():
            console.print("[red]No project selected. Run 'chaotic project use <project_id>' first.[/red]")
            raise SystemExit(1)
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    wrapper.__doc__ = f.__doc__
    return wrapper


def handle_error(f):
    """Decorator to handle API errors and ClickExceptions (for JSON mode)."""
    def wrapper(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except APIError as e:
            if is_json_output():
                output_json({"error": str(e)})
            else:
                console.print(f"[red]Error: {e}[/red]")
            raise SystemExit(1)
        except click.ClickException as e:
            if is_json_output():
                output_json({"error": e.format_message()})
                raise SystemExit(1)
            raise
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
        console.print(f"[red]Ambiguous assignee '{assignee_value}':[/red]")
        for _, label in candidates:
            console.print(f"  - {label}")
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
            console.print(f"[red]Error: {e}[/red]")
            raise SystemExit(1)

    if ctx.invoked_subcommand is None:
        # No subcommand - check auth status and show appropriate message
        if not get_token() and not get_api_key():
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
    console.print(f"[link={auth_url}]{auth_url}[/link]\n")

    webbrowser.open(auth_url)

    console.print("[dim]Waiting for authorization...[/dim]")

    # Wait for callback (with timeout)
    thread.join(timeout=300)  # 5 minute timeout
    server.server_close()

    if received_data["error"]:
        console.print(f"\n[red]Authorization failed: {received_data['error']}[/red]")
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
    console.print(f"[green]✓ Config saved to {config_path}[/green]")

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
            console.print(f"  [green]✓[/green] Already signed in as [bold]{me['name']}[/bold] ({me['email']})")
            console.print()
        except Exception:
            # Token is stale, proceed to auth
            pass
    if not get_token() and not get_api_key():
        console.print(f"  [bold blue]Step {step}/{total_steps}: Create Account[/bold blue]")
        console.print()

        has_account = click.confirm("  Already have an account?", default=False)
        console.print()

        if has_account:
            email = click.prompt("  Email")
            password = click.prompt("  Password", hide_input=True)
            result = client.login(email, password)
            set_token(result["access_token"])
            me = client.get_me()
            console.print(f"  [green]✓ Signed in as {me['name']}[/green]")
        else:
            name = click.prompt("  Your name")
            email = click.prompt("  Email")
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
        console.print(f"  [green]✓[/green] Using team [bold]{team_name}[/bold] ({team_key})")
        console.print()
    else:
        console.print(f"  [bold blue]Step {step}/{total_steps}: Create Your Team[/bold blue]")
        console.print()
        console.print("  [dim]Teams organize your people and projects.[/dim]")
        console.print()

        for _attempt in range(5):
            team_name = click.prompt("  Team name", default="My Team")
            default_key = suggest_key(team_name)
            team_key = click.prompt("  Team key (2-10 chars, used in issue IDs)", default=default_key).upper()
            try:
                result = client.create_team(team_name, team_key)
                team_id = result["id"]
                set_current_team(team_id, local=True)
                console.print(f"  [green]✓ Team created: {team_name} ({team_key})[/green]")
                break
            except APIError as e:
                if "key" in str(e).lower() and ("exists" in str(e).lower() or "already" in str(e).lower()):
                    console.print(f"  [yellow]Key '{team_key}' is already taken. Try another.[/yellow]")
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
        console.print(f"  [green]✓[/green] Using project [bold]{project_name}[/bold] ({project_key})")
        console.print()
    else:
        console.print(f"  [bold blue]Step {step}/{total_steps}: Create Your First Project[/bold blue]")
        console.print()
        console.print("  [dim]Projects group related issues. One per repo or component.[/dim]")
        console.print()

        for _attempt in range(5):
            project_name = click.prompt("  Project name", default="My Project")
            default_key = suggest_key(project_name)
            project_key = click.prompt("  Project key", default=default_key).upper()
            try:
                result = client.create_project(team_id, project_name, project_key)
                project_id = result["id"]
                set_current_project(project_id, local=True)
                console.print(f"  [green]✓ Project created: {project_name} ({project_key})[/green]")
                break
            except APIError as e:
                if "key" in str(e).lower() and ("exists" in str(e).lower() or "already" in str(e).lower()):
                    console.print(f"  [yellow]Key '{project_key}' is already taken. Try another.[/yellow]")
                else:
                    raise
        else:
            raise click.ClickException("Too many attempts. Run 'chaotic project create' manually.")
        console.print()
    step += 1

    # Step 4: First issue
    console.print(f"  [bold blue]Step {step}/{total_steps}: Create Your First Issue[/bold blue]")
    console.print()

    title = click.prompt("  Issue title", default="Set up project")
    result = client.create_issue(project_id, title)
    identifier = result.get("identifier", f"{project_key}-{result.get('number', '?')}")
    console.print(f"  [green]✓ Created: {identifier} - {title}[/green]")
    console.print()

    # Summary
    web_url = get_web_url() or f"http://localhost:{DEFAULT_PORT}"
    console.print(Panel(
        f"[bold]Your workspace:[/bold]\n"
        f"  Team:    {team_name} ({team_key})\n"
        f"  Project: {project_name} ({project_key})\n"
        f"  Issue:   {identifier} - {title}\n\n"
        f"[bold]Quick reference:[/bold]\n"
        f"  chaotic issue list          List issues\n"
        f"  chaotic issue create \"...\"  Create an issue\n"
        f"  chaotic status              Show context\n"
        f"  {web_url}      Open web UI",
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
        console.print(f"[red]Invalid version string: {target_version}[/red]")
        raise SystemExit(1)

    # Get current version
    try:
        current = importlib.metadata.version(pkg)
    except importlib.metadata.PackageNotFoundError:
        current = "unknown"
    console.print(f"Current version: [bold]{current}[/bold]")

    # Detect install method
    installer = _detect_installer()
    if installer is None:
        console.print("[red]Could not detect how chaotic-cli was installed.[/red]")
        console.print("Try upgrading manually:")
        console.print("  uv tool install chaotic-cli --prerelease allow")
        console.print("  pip install --pre --upgrade chaotic-cli")
        raise SystemExit(1)

    console.print(f"Install method: [bold]{installer}[/bold]")
    if git:
        console.print("Source: [bold]git main[/bold]")

    # Build the upgrade command
    cmd = _build_upgrade_cmd(installer, pkg, target_version, git_url=GIT_URL if git else None)
    console.print(f"Command: [dim]{' '.join(cmd)}[/dim]")

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
        console.print(f"[red]Upgrade failed (exit {result.returncode}):[/red]")
        if result.stderr:
            console.print(result.stderr.strip())
        raise SystemExit(1)

    if result.stdout:
        console.print(result.stdout.strip())

    # Report new version using the installer's own listing
    try:
        new_ver = _get_installed_version(installer, pkg)
        if git:
            # Git installs may not bump the version string, so always report success
            if new_ver:
                console.print(f"[green]Installed from git main (version {new_ver}).[/green]")
            else:
                console.print("[green]Installed from git main.[/green]")
        elif new_ver and new_ver != current:
            console.print(f"[green]Upgraded: {current} -> {new_ver}[/green]")
        elif new_ver == current:
            console.print(f"[yellow]Already at latest version ({current}).[/yellow]")
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
    console.print(Panel(f"[bold]{user['name']}[/bold]\n{user['email']}", title="Current User"))


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
            "authenticated": bool(get_token() or get_api_key()),
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
        config_type = f"[dim](local: {local_config})[/dim]"
    else:
        config_type = "[dim](global ~/.chaotic)[/dim]"

    # Show profile if not default
    current_profile = get_effective_profile()
    if current_profile != "default":
        config_type = f"[cyan](profile: {current_profile})[/cyan] {config_type}"

    console.print(f"[bold]Current Context[/bold] {config_type}\n")

    # Auth status (CHT-478)
    if get_token() or get_api_key():
        try:
            user = client.get_me()
            if user.get("is_agent"):
                console.print(f"  [green]✓[/green] Acting as: [bold]{user['name']}[/bold] [dim](agent)[/dim]")
                try:
                    agent_info = client.get_agent(user["id"])
                    parent_name = agent_info.get("parent_user_name", "unknown")
                    console.print(f"    [dim]↳ Parent: {parent_name}[/dim]")
                except Exception:
                    pass
            else:
                console.print(f"  [green]✓[/green] Logged in as: [bold]{user['name']}[/bold] ({user['email']})")
        except Exception:
            console.print("  [yellow]![/yellow] Auth token set but unable to verify")
    else:
        console.print("  [red]✗[/red] Not logged in")

    # Team status
    team_id = get_current_team()
    if team_id:
        try:
            team = client.get_team(team_id)
            console.print(f"  [green]✓[/green] Team: [bold]{team['name']}[/bold] ({team['key']})")
        except Exception:
            console.print(f"  [yellow]![/yellow] Team ID set: {team_id[:8]}...")
    else:
        console.print("  [dim]-[/dim] No team selected")

    # Project status
    project_id = get_current_project()
    if project_id:
        try:
            project = client.get_project(project_id)
            console.print(f"  [green]✓[/green] Project: [bold]{project['name']}[/bold] ({project['key']})")
        except Exception:
            console.print(f"  [yellow]![/yellow] Project ID set: {project_id[:8]}...")
    else:
        console.print("  [dim]-[/dim] No project selected")

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
                console.print(f"\n  [yellow]⚠[/yellow] [bold]{count}[/bold] issue{'s' if count != 1 else ''} awaiting approval{suffix}")
                for item in pending[:5]:
                    ident = item.get("identifier", "")
                    title = item.get("title", "")
                    approvals = item.get("pending_approvals", [])
                    ritual_names = ", ".join(a.get("ritual_name", "") for a in approvals)
                    console.print(f"    [dim]•[/dim] {ident}: {title} [dim]({ritual_names})[/dim]")
                if count > 5:
                    console.print(f"    [dim]... and {count - 5} more[/dim]")
        except Exception:
            pass  # Don't fail status if approval check fails


@cli.command("whoami")
@handle_error
def whoami():
    """Show current authenticated identity."""
    if not (get_token() or get_api_key()):
        console.print("[red]Not authenticated.[/red] Run `chaotic login` or set an API key.")
        raise SystemExit(1)

    user = client.get_me()

    console.print(f"[bold]User:[/bold] {user['name']}")
    console.print(f"[bold]Email:[/bold] {user['email']}")
    console.print(f"[bold]Type:[/bold] {'Agent' if user.get('is_agent') else 'Human'}")

    api_key = get_api_key()
    if api_key:
        console.print(f"[bold]API Key:[/bold] {api_key[:12]}...")
    elif get_token():
        console.print("[bold]Auth:[/bold] JWT token")

    profile = get_effective_profile()
    if profile != "default":
        console.print(f"[bold]Profile:[/bold] {profile}")

    config_file = get_global_config_file()
    console.print(f"[bold]Config:[/bold] {config_file}")


# Register command modules and system commands
from .commands import label as _label_mod, agent as _agent_mod
from .commands import config_cmd as _config_mod, profile_cmd as _profile_mod
from .commands import auth as _auth_mod, team as _team_mod
from .commands import project as _project_mod, epic as _epic_mod
from .commands import doc as _doc_mod
from .commands import sprint_cmd as _sprint_mod
from .commands import ritual_cmd as _ritual_mod
from .commands import issue_cmd as _issue_mod

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

cli.add_command(system)


if __name__ == "__main__":
    cli()
