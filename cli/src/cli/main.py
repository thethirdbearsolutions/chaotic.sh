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
    load_config, DEFAULT_PORT,
    set_profile, get_profile, get_effective_profile,
    list_profiles, check_profile_ambiguity, ProfileAmbiguityError,
)
from .client import client, APIError
from .system import system

console = Console()


def is_json_output() -> bool:
    """Check if JSON output mode is enabled."""
    ctx = click.get_current_context(silent=True)
    if ctx and ctx.obj:
        return ctx.obj.get('json', False)
    return False


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


# Main CLI group
@click.group(invoke_without_command=True)
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
@click.pass_context
def cli(ctx, profile, json_output):
    """Chaotic - Issue tracking CLI for modern teams."""
    # Store json flag in context for subcommands
    ctx.ensure_object(dict)
    ctx.obj['json'] = json_output

    # Set profile before any config loading happens
    if profile:
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
@cli.group()
def config():
    """Configuration management."""
    pass


@config.command("show")
@json_option
def config_show():
    """Show current configuration."""
    profile = get_effective_profile()
    api_url = get_api_url()
    local_cfg = find_local_config()
    has_token = bool(get_token())
    has_key = bool(get_api_key())
    team_id = get_current_team()
    project_id = get_current_project()

    if is_json_output():
        output_json({
            "profile": profile,
            "api_url": api_url,
            "local_config": str(local_cfg) if local_cfg else None,
            "has_token": has_token,
            "has_api_key": has_key,
            "team_id": team_id,
            "project_id": project_id,
        })
        return

    console.print(f"[bold]Configuration[/bold]\n")
    console.print(f"  [dim]Profile:[/dim]      {profile}")
    console.print(f"  [dim]API URL:[/dim]      {api_url}")
    if local_cfg:
        console.print(f"  [dim]Local config:[/dim] {local_cfg}")
    else:
        console.print(f"  [dim]Local config:[/dim] [dim](none)[/dim]")
    console.print(f"  [dim]Auth token:[/dim]  {'✓' if has_token else '✗'}")
    console.print(f"  [dim]API key:[/dim]     {'✓' if has_key else '✗'}")
    console.print(f"  [dim]Team ID:[/dim]     {team_id or '[dim](not set)[/dim]'}")
    console.print(f"  [dim]Project ID:[/dim]  {project_id or '[dim](not set)[/dim]'}")


@config.command("set-url")
@click.argument("url")
def config_set_url(url):
    """Set API URL.

    Accepts either a base URL (e.g. http://localhost:24267) or a full API
    URL (e.g. http://localhost:24267/api). The /api suffix is added
    automatically if not present.
    """
    url = url.rstrip("/")
    if not url.endswith("/api"):
        url = f"{url}/api"
    set_api_url(url)
    console.print(f"[green]API URL set to: {url}[/green]")


# Profile commands
@cli.group()
def profile():
    """Profile management for multi-agent setups.

    Profiles allow different identities (human, AI agents) to use separate
    configurations. Each profile is stored in ~/.chaotic/{name}.json.

    When multiple profiles exist, you MUST specify which to use via:
    - CHAOTIC_PROFILE environment variable
    - --profile / -p flag
    """
    pass


@profile.command("list")
def profile_list():
    """List all available profiles."""
    profiles = list_profiles()
    if not profiles:
        console.print("[yellow]No profiles found in ~/.chaotic/[/yellow]")
        console.print("Create one with: chaotic auth login")
        return

    current = get_effective_profile()
    console.print("[bold]Available profiles:[/bold]\n")
    for p in profiles:
        if p == current:
            console.print(f"  [green]* {p}[/green] [dim](active)[/dim]")
        else:
            console.print(f"    {p}")
    console.print()
    console.print(f"[dim]Set profile with: CHAOTIC_PROFILE=<name> or --profile <name>[/dim]")


@profile.command("current")
def profile_current():
    """Show the currently active profile."""
    current = get_effective_profile()
    source = "CHAOTIC_PROFILE" if get_profile() else "default"

    console.print(f"[bold]Active profile:[/bold] {current}")
    console.print(f"[dim]Source: {source}[/dim]")

    # Show profile details
    try:
        config = load_config()
        if config.get("token"):
            console.print("[dim]Auth: JWT token[/dim]")
        elif config.get("api_key"):
            # Mask API key
            key = config["api_key"]
            masked = f"{key[:8]}...{key[-4:]}" if len(key) > 12 else "***"
            console.print(f"[dim]Auth: API key ({masked})[/dim]")
        else:
            console.print("[yellow]Auth: Not configured[/yellow]")
    except Exception:
        pass


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


def suggest_key(name: str) -> str:
    """Suggest a team/project key from a name."""
    words = [w for w in name.upper().split() if w]
    if not words:
        return ""
    if len(words) == 1:
        return words[0][:4]
    return "".join(w[0] for w in words[:4])


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


# Auth commands
@cli.group()
def auth():
    """Authentication commands."""
    pass


@auth.command("signup")
@click.option("--name", required=True)
@click.option("--email", required=True)
@click.option("--password", required=True)
@handle_error
def auth_signup(name, email, password):
    """Create a new account."""
    client.signup(name, email, password)
    result = client.login(email, password)
    set_token(result["access_token"])
    console.print("[green]Account created and logged in![/green]")


@auth.command("login")
@click.option("--email", required=True)
@click.option("--password", required=True)
@handle_error
def auth_login(email, password):
    """Login to your account."""
    result = client.login(email, password)
    set_token(result["access_token"])
    console.print("[green]Logged in successfully![/green]")


@auth.command("logout")
def auth_logout():
    """Logout from your account."""
    set_token(None)
    set_api_key(None)
    set_current_team(None)
    set_current_project(None)
    console.print("[green]Logged out.[/green]")


@auth.command("set-key")
@click.argument("key")
def auth_set_key(key):
    """Set API key for authentication."""
    if not key.startswith("ck_"):
        console.print("[red]Invalid API key format. Keys should start with 'ck_'[/red]")
        raise SystemExit(1)
    set_api_key(key)
    console.print("[green]API key set successfully![/green]")


@auth.command("clear-key")
def auth_clear_key():
    """Clear stored API key."""
    set_api_key(None)
    console.print("[green]API key cleared.[/green]")


@auth.command("whoami")
@json_option
@require_auth
@handle_error
def auth_whoami():
    """Show current user info."""
    user = client.get_me()
    if is_json_output():
        output_json(user)
        return
    console.print(Panel(f"[bold]{user['name']}[/bold]\n{user['email']}", title="Current User"))


@auth.group("keys")
def auth_keys():
    """API key management commands."""
    pass


@auth_keys.command("list")
@json_option
@require_auth
@handle_error
def auth_keys_list():
    """List your API keys."""
    keys = client.list_api_keys()
    if is_json_output():
        output_json(keys)
        return
    if not keys:
        console.print("[yellow]No API keys found. Create one with 'chaotic auth keys create'[/yellow]")
        return

    table = Table(title="API Keys")
    table.add_column("ID", style="dim")
    table.add_column("Name")
    table.add_column("Prefix")
    table.add_column("Created")
    table.add_column("Last Used")
    table.add_column("Active")
    table.add_column("Expires")

    for k in keys:
        key_id = k["id"][:8] + "..."
        name = k.get("name") or "Unnamed"
        prefix = k.get("key_prefix") or "-"
        created = (k.get("created_at") or "")[:10] or "-"
        last_used = (k.get("last_used_at") or "")[:10] or "-"
        expires = (k.get("expires_at") or "")[:10] or "-"
        active = "Yes" if k.get("is_active") else "No"
        table.add_row(key_id, name, prefix, created, last_used, active, expires)

    console.print(table)


@auth_keys.command("create")
@click.argument("name")
@require_auth
@handle_error
def auth_keys_create(name):
    """Create a new API key.

    The API key is displayed only once - save it immediately!
    """
    result = client.create_api_key(name)
    console.print(f"[green]API key '{result['name']}' created.[/green]")
    console.print()
    console.print("[bold yellow]API Key (save this - it won't be shown again!):[/bold yellow]")
    console.print(f"[cyan]{result['key']}[/cyan]")
    console.print()
    console.print("To configure the CLI with this key:")
    console.print(f"  chaotic auth set-key {result['key']}")


@auth_keys.command("revoke")
@click.argument("key_id")
@click.confirmation_option(prompt="Are you sure you want to revoke this API key?")
@require_auth
@handle_error
def auth_keys_revoke(key_id):
    """Revoke an API key.

    KEY_ID can be the full key ID or a prefix (e.g., the first 8 characters).
    """
    keys = client.list_api_keys()
    key = None
    for k in keys:
        if k["id"] == key_id or k["id"].startswith(key_id):
            if key is not None:
                console.print(f"[red]Ambiguous key ID prefix '{key_id}'. Please be more specific.[/red]")
                raise SystemExit(1)
            key = k

    if not key:
        console.print(f"[red]API key '{key_id}' not found.[/red]")
        raise SystemExit(1)

    client.revoke_api_key(key["id"])
    console.print(f"[green]API key '{key['name']}' revoked.[/green]")


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
                result["user"] = client.get_me()
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

    # Auth status
    if get_token() or get_api_key():
        try:
            user = client.get_me()
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

    # Pending GATE approvals
    if project_id:
        try:
            pending_gates = client.get_pending_gates(project_id)
            if pending_gates:
                count = len(pending_gates)
                console.print(f"\n  [yellow]⚠[/yellow] [bold]{count}[/bold] issue{'s' if count != 1 else ''} awaiting gate approval")
                for gate in pending_gates[:5]:
                    ident = gate.get("identifier", "")
                    title = gate.get("title", "")
                    rituals = gate.get("pending_gates", [])
                    ritual_names = ", ".join(r.get("ritual_name", "") for r in rituals)
                    console.print(f"    [dim]•[/dim] {ident}: {title} [dim]({ritual_names})[/dim]")
                if count > 5:
                    console.print(f"    [dim]... and {count - 5} more[/dim]")
        except Exception:
            pass  # Don't fail status if gate check fails


@cli.command("budget")
@require_project
@handle_error
def budget_shortcut():
    """Show current sprint budget status (shortcut for 'sprint budget')."""
    sprint_budget.callback()


# Team commands
@cli.group()
def team():
    """Team management commands."""
    pass


@team.command("list")
@json_option
@require_auth
@handle_error
def team_list():
    """List all your teams."""
    teams = client.get_teams()
    if is_json_output():
        output_json(teams)
        return
    if not teams:
        console.print("[yellow]No teams found. Create one with 'chaotic team create'[/yellow]")
        return

    current = get_current_team()
    table = Table(title="Teams")
    table.add_column("ID", style="dim")
    table.add_column("Key")
    table.add_column("Name")
    table.add_column("Current")

    for t in teams:
        is_current = "✓" if t["id"] == current else ""
        table.add_row(t["id"], t["key"], t["name"], is_current)

    console.print(table)


@team.command("create")
@click.argument("name")
@click.argument("key")
@click.option("--description", default="")
@json_option
@require_auth
@handle_error
def team_create(name, key, description):
    """Create a new team."""
    result = client.create_team(name, key.upper(), description or None)
    set_current_team(result["id"])
    if is_json_output():
        output_json(result)
        return
    console.print(f"[green]Team created: {result['name']} ({result['key']})[/green]")
    console.print(f"[dim]Set as current team[/dim]")


@team.command("use")
@click.argument("team_id")
@require_auth
@handle_error
def team_use(team_id):
    """Set current team.

    TEAM_ID can be a full ID, name, key, or a prefix.
    """
    team_id = resolve_team_id(team_id)

    t = client.get_team(team_id)
    set_current_team(team_id)
    set_current_project(None)  # Reset project when changing teams
    console.print(f"[green]Switched to team: {t['name']}[/green]")


@team.command("show")
@json_option
@require_team
@handle_error
def team_show():
    """Show current team details."""
    t = client.get_team(get_current_team())
    if is_json_output():
        output_json(t)
        return
    console.print(Panel(
        f"[bold]{t['name']}[/bold]\n"
        f"Key: {t['key']}\n"
        f"Description: {t.get('description') or 'None'}",
        title="Current Team"
    ))


@team.command("members")
@json_option
@require_team
@handle_error
def team_members():
    """List team members."""
    members = client.get_team_members(get_current_team())
    if is_json_output():
        output_json(members)
        return
    table = Table(title="Team Members")
    table.add_column("Name")
    table.add_column("Email")
    table.add_column("Role")

    for m in members:
        table.add_row(m.get("user_name", "Unknown"), m.get("user_email", ""), m["role"])

    console.print(table)


@team.command("invite")
@click.argument("email")
@click.option("--role", default="member", type=click.Choice(["member", "admin"]))
@require_team
@handle_error
def team_invite(email, role):
    """Invite a member to the team."""
    client.invite_member(get_current_team(), email, role)
    console.print(f"[green]Invitation sent to {email}[/green]")


@team.command("accept-invite")
@click.argument("token")
@require_auth
@handle_error
def team_accept_invite(token):
    """Accept a team invitation."""
    result = client.accept_invitation(token)
    console.print(f"[green]Joined team successfully![/green]")


# Project commands
@cli.group()
def project():
    """Project management commands."""
    pass


@project.command("list")
@json_option
@require_team
@handle_error
def project_list():
    """List all projects in current team."""
    projects = client.get_projects(get_current_team())
    if is_json_output():
        output_json(projects)
        return

    if not projects:
        console.print("[yellow]No projects found. Create one with 'chaotic project create'[/yellow]")
        return

    current = get_current_project()
    table = Table(title="Projects")
    table.add_column("ID", style="dim", overflow="fold")
    table.add_column("Key")
    table.add_column("Name")
    table.add_column("Issues")
    table.add_column("Current")

    for p in projects:
        is_current = "✓" if p["id"] == current else ""
        table.add_row(p["id"], p["key"], p["name"], str(p["issue_count"]), is_current)

    console.print(table)


@project.command("create")
@click.argument("name")
@click.argument("key")
@click.option("--description", default="")
@click.option("--color", default="#6366f1")
@click.option("--estimate-scale", default="fibonacci",
              type=click.Choice(["fibonacci", "linear", "powers_of_2", "tshirt"]),
              help="Estimation scale for issues")
@click.option("--default-sprint-budget", type=int, help="Default budget for new sprints")
@json_option
@require_team
@handle_error
def project_create(name, key, description, color, estimate_scale, default_sprint_budget):
    """Create a new project."""
    result = client.create_project(
        get_current_team(), name, key.upper(),
        description=description or None, color=color, estimate_scale=estimate_scale,
        default_sprint_budget=default_sprint_budget
    )
    set_current_project(result["id"])
    if is_json_output():
        output_json(result)
        return
    console.print(f"[green]Project created: {result['name']} ({result['key']})[/green]")
    console.print(f"[dim]Set as current project[/dim]")


@project.command("use")
@click.argument("identifier")
@require_team
@handle_error
def project_use(identifier):
    """Set current project by ID, key, or name."""
    p = resolve_project(identifier)
    set_current_project(p["id"])
    console.print(f"[green]Switched to project: {p['name']}[/green]")


@project.command("show")
@click.argument("identifier", required=False)
@json_option
@require_team
@handle_error
def project_show(identifier):
    """Show project details.

    IDENTIFIER can be a project ID, key (e.g., CHT), or name.
    If not provided, shows the current project.
    """
    if identifier:
        p = resolve_project(identifier)
        project_id = p["id"]
    else:
        project_id = get_current_project()
        if not project_id:
            raise click.ClickException("No current project set. Use 'chaotic project use <key>' or provide an identifier.")
        p = client.get_project(project_id)

    if is_json_output():
        output_json(p)
        return

    scale = p.get('estimate_scale', 'fibonacci').replace('_', ' ').title()
    budget = p.get('default_sprint_budget')
    budget_str = str(budget) if budget is not None else "Unlimited"
    is_current = " (current)" if project_id == get_current_project() else ""
    console.print(Panel(
        f"[bold]{p['name']}[/bold]{is_current}\n"
        f"Key: {p['key']}\n"
        f"Description: {p.get('description') or 'None'}\n"
        f"Issues: {p['issue_count']}\n"
        f"Estimate Scale: {scale}\n"
        f"Default Sprint Budget: {budget_str}",
        title="Project Details"
    ))


@project.command("update")
@click.option("--name")
@click.option("--description")
@click.option("--color")
@click.option("--estimate-scale",
              type=click.Choice(["fibonacci", "linear", "powers_of_2", "tshirt"]),
              help="Estimation scale for issues")
@click.option("--default-sprint-budget", type=int, help="Default budget for new sprints")
@click.option("--no-default-sprint-budget", is_flag=True, help="Remove default sprint budget")
@require_project
@handle_error
def project_update(name, description, color, estimate_scale, default_sprint_budget, no_default_sprint_budget):
    """Update the current project."""
    data = {}
    if name:
        data["name"] = name
    if description is not None:
        data["description"] = description
    if color:
        data["color"] = color
    if estimate_scale:
        data["estimate_scale"] = estimate_scale
    if no_default_sprint_budget:
        data["default_sprint_budget"] = None
    elif default_sprint_budget is not None:
        data["default_sprint_budget"] = default_sprint_budget

    if not data:
        console.print("[yellow]No updates provided.[/yellow]")
        return

    client.update_project(get_current_project(), **data)
    console.print("[green]Project updated.[/green]")


# Issue commands
@cli.group()
def issue():
    """Issue management commands."""
    pass


@issue.command("list")
@click.option("--status", help="Filter by status (backlog, todo, in_progress, in_review, done, canceled). Comma-separated for multiple.")
@click.option("--priority", help="Filter by priority (urgent, high, medium, low, no_priority). Comma-separated for multiple.")
@click.option("--sprint", help="Filter by sprint ('current' for active sprint, or sprint ID)")
@click.option("--no-sprint", "no_sprint", is_flag=True, help="Show only issues not assigned to any sprint")
@click.option("--epic", help="Filter by epic/parent issue (e.g., CHT-12)")
@click.option("--label", "-l", help="Filter by label name. Comma-separated for multiple (issues must have ALL labels).")
@click.option("--search", help="Search in title, description, and identifier.")
@click.option("--limit", "-n", type=int, default=50, help="Maximum number of issues to show (default: 50)")
@click.option("--sort-by", "-s", type=click.Choice(["created", "updated", "priority", "status", "title", "estimate", "random"], case_sensitive=False), default="random", help="Sort field (default: random)")
@click.option("--order", "-o", type=click.Choice(["asc", "desc"], case_sensitive=False), default="desc", help="Sort direction (default: desc)")
@json_option
@require_project
@handle_error
def issue_list(status, priority, sprint, no_sprint, epic, label, search, limit, sort_by, order):
    """List issues in current project."""
    # Validate status values if provided (CHT-502)
    if status:
        valid_statuses = ["backlog", "todo", "in_progress", "in_review", "done", "canceled"]
        statuses = [s.strip().lower() for s in status.split(",")]
        for s in statuses:
            if s not in valid_statuses:
                raise click.BadParameter(f"Invalid status: {s}. Must be one of: {', '.join(valid_statuses)}")

    # Validate priority values if provided
    if priority:
        valid_priorities = ["urgent", "high", "medium", "low", "no_priority"]
        priorities = [p.strip().lower() for p in priority.split(",")]
        for p in priorities:
            if p not in valid_priorities:
                raise click.BadParameter(f"Invalid priority: {p}. Must be one of: {', '.join(valid_priorities)}")

    project_id = get_current_project()
    parent_id = None
    if epic:
        epic_issue = client.get_issue_by_identifier(epic)
        parent_id = epic_issue["id"]
    if sprint and no_sprint:
        raise click.UsageError("Cannot use both --sprint and --no-sprint")
    if no_sprint:
        sprint_id = "no_sprint"
    elif sprint:
        sprint_id = resolve_sprint_id(sprint, project_id)
    else:
        sprint_id = None
    issues = client.get_issues(project_id=project_id, status=status, priority=priority, sprint_id=sprint_id, limit=limit, parent_id=parent_id, sort_by=sort_by, order=order, label=label, search=search)

    # JSON output mode (CHT-170)
    if is_json_output():
        output_json(issues)
        return

    if not issues:
        console.print("[yellow]No issues found.[/yellow]")
        return

    # Build sprint ID → name map
    sprints = client.get_sprints(project_id)
    sprint_names = {s["id"]: s["name"] for s in sprints}

    table = Table(title="Issues")
    table.add_column("ID")
    table.add_column("Title")
    table.add_column("Status")
    table.add_column("Priority")
    table.add_column("Type")
    table.add_column("Estimate")
    table.add_column("Sprint")

    for i in issues:
        table.add_row(
            i["identifier"],
            i["title"][:50] + ("..." if len(i["title"]) > 50 else ""),
            i["status"].replace("_", " ").title(),
            i["priority"].replace("_", " ").title(),
            i.get("issue_type", "task").replace("_", " ").title(),
            str(i.get("estimate") or "-"),
            sprint_names.get(i.get("sprint_id"), "-")
        )

    console.print(table)


@issue.command("mine")
@click.option("--status", help="Filter by status (backlog, todo, in_progress, in_review, done, canceled). Comma-separated for multiple.")
@click.option("--limit", "-n", type=int, default=50, help="Maximum number of issues to show (default: 50)")
@click.option("--sort-by", "-s", type=click.Choice(["created", "updated", "priority", "status", "title", "estimate", "random"], case_sensitive=False), default="random", help="Sort field (default: random)")
@click.option("--order", "-o", type=click.Choice(["asc", "desc"], case_sensitive=False), default="desc", help="Sort direction (default: desc)")
@json_option
@require_team
@handle_error
def issue_mine(status, limit, sort_by, order):
    """List issues assigned to me."""
    # Validate status values if provided (CHT-502)
    if status:
        valid_statuses = ["backlog", "todo", "in_progress", "in_review", "done", "canceled"]
        statuses = [s.strip().lower() for s in status.split(",")]
        for s in statuses:
            if s not in valid_statuses:
                raise click.BadParameter(f"Invalid status: {s}. Must be one of: {', '.join(valid_statuses)}")

    user = client.get_me()
    issues = client.get_issues(assignee_id=user["id"], status=status, limit=limit, sort_by=sort_by, order=order)
    if is_json_output():
        output_json(issues)
        return
    if not issues:
        console.print("[yellow]No issues assigned to you.[/yellow]")
        return

    # Build sprint ID → name map from unique sprint IDs in results
    sprint_names = {}
    for i in issues:
        sid = i.get("sprint_id")
        if sid and sid not in sprint_names:
            try:
                s = client.get_sprint(sid)
                sprint_names[sid] = s["name"]
            except APIError:
                sprint_names[sid] = sid[:8] + "..."

    table = Table(title="My Issues")
    table.add_column("ID")
    table.add_column("Title")
    table.add_column("Project")
    table.add_column("Status")
    table.add_column("Priority")
    table.add_column("Type")
    table.add_column("Estimate")
    table.add_column("Sprint")

    for i in issues:
        table.add_row(
            i["identifier"],
            i["title"][:50] + ("..." if len(i["title"]) > 50 else ""),
            i.get("project_key", "-"),
            i["status"].replace("_", " ").title(),
            i["priority"].replace("_", " ").title(),
            i.get("issue_type", "task").replace("_", " ").title(),
            str(i.get("estimate") or "-"),
            sprint_names.get(i.get("sprint_id"), "-")
        )

    console.print(table)


@issue.command("search")
@click.argument("query")
@click.option("--all", "-a", "search_all", is_flag=True, help="Search all projects (ignore current project context)")
@json_option
@require_team
@handle_error
def issue_search(query, search_all):
    """Search issues.

    Searches issue titles, descriptions, and identifiers.
    If a project is selected (via 'chaotic project use'), searches only that project.
    Use --all to search across all projects in the team.
    """
    project_id = None if search_all else get_current_project()

    issues = client.search_issues(get_current_team(), query, project_id)
    if is_json_output():
        output_json(issues or [])
        return
    if not issues:
        scope = "" if search_all else " in current project"
        console.print(f"[yellow]No issues found matching '{query}'{scope}.[/yellow]")
        return

    title = f"Search Results: '{query}'" + (" (all projects)" if search_all else "")
    table = Table(title=title)
    table.add_column("ID")
    table.add_column("Title")
    table.add_column("Project")
    table.add_column("Status")
    table.add_column("Priority")

    for i in issues:
        table.add_row(
            i["identifier"],
            i["title"][:50] + ("..." if len(i["title"]) > 50 else ""),
            i.get("project_key", "-"),
            i["status"].replace("_", " ").title(),
            i["priority"].replace("_", " ").title()
        )

    console.print(table)


@issue.command("create")
@click.argument("title", required=False)
@click.option("--title", "-t", "title_opt", help="Issue title (alternative to positional argument)")
@click.option("--description", default="")
@click.option("--status", default="backlog", type=click.Choice(["backlog", "todo", "in_progress", "in_review", "done"], case_sensitive=False))
@click.option("--priority", default="no_priority", type=click.Choice(["no_priority", "low", "medium", "high", "urgent"], case_sensitive=False))
@click.option("--type", "issue_type", default="task", type=click.Choice(["task", "bug", "feature", "chore", "docs", "tech_debt", "epic"], case_sensitive=False), help="Issue type")
@click.option("--estimate", type=int)
@click.option("--sprint", help="Set sprint ('current' for active sprint, 'none' to not assign, or sprint ID)")
@click.option("--parent", help="Parent issue identifier (e.g., PRJ-123) to create a sub-issue")
@click.option("--epic", help="Epic identifier (e.g., PRJ-123) - shorthand for --parent with an epic")
@click.option("--label", "labels", multiple=True, help="Label name(s) to assign (can be used multiple times)")
@click.option("--blocked-by", "blocked_by", multiple=True, help="Issue identifier(s) that block this issue (can be used multiple times)")
@click.option("--relates-to", "relates_to", multiple=True, help="Related issue identifier(s) (can be used multiple times)")
@click.option("--project", "project_key", help="Project (ID, key, or name) - overrides current project")
@json_option
@require_team
@handle_error
def issue_create(title, title_opt, description, status, priority, issue_type, estimate, sprint, parent, epic, labels, blocked_by, relates_to, project_key):
    """Create a new issue (or sub-issue with --parent/--epic)."""
    # Resolve title from positional arg or --title option
    title = (title or title_opt or "").strip()
    if not title:
        raise click.ClickException("Title is required. Use: chaotic issue create \"My Title\" or --title \"My Title\"")

    # Resolve project ID
    if project_key:
        project_id = resolve_project_id(project_key)
    else:
        project_id = get_current_project()
        if not project_id:
            console.print("[red]No project selected. Use --project or run 'chaotic project use <project_id>' first.[/red]")
            raise SystemExit(1)

    data = {"description": description or None, "status": status, "priority": priority, "issue_type": issue_type}
    if estimate:
        data["estimate"] = estimate
    if parent and epic:
        raise click.UsageError("Cannot use both --parent and --epic")
    if parent:
        parent_issue = client.get_issue_by_identifier(parent)
        data["parent_id"] = parent_issue["id"]
    elif epic:
        epic_issue = client.get_issue_by_identifier(epic)
        data["parent_id"] = epic_issue["id"]
    if labels:
        # Resolve label names to IDs
        team_id = get_current_team()
        all_labels = client.get_labels(team_id)
        label_ids = []
        for label_name in labels:
            label = next((l for l in all_labels if l["name"].lower() == label_name.lower()), None)
            if not label:
                console.print(f"[red]Label '{label_name}' not found. Available labels: {', '.join(l['name'] for l in all_labels)}[/red]")
                raise SystemExit(1)
            label_ids.append(label["id"])
        data["label_ids"] = label_ids
    if sprint is not None:
        if sprint.lower() == "none" or sprint == "":
            data["sprint_id"] = None
        else:
            data["sprint_id"] = resolve_sprint_id(sprint, project_id)
    result = client.create_issue(project_id, title, **data)

    if is_json_output():
        output_json(result)
        return

    if parent:
        console.print(f"[green]Sub-issue created: {result['identifier']} - {result['title']} (parent: {parent})[/green]")
    elif epic:
        console.print(f"[green]Issue created: {result['identifier']} - {result['title']} (epic: {epic})[/green]")
    else:
        console.print(f"[green]Issue created: {result['identifier']} - {result['title']}[/green]")

    # Create relations if specified
    for blocker_id in blocked_by:
        blocker = client.get_issue_by_identifier(blocker_id)
        client.create_relation(blocker["id"], result["id"], "blocks")
        console.print(f"[dim]  Blocked by {blocker_id}[/dim]")
    for related_id in relates_to:
        related = client.get_issue_by_identifier(related_id)
        client.create_relation(result["id"], related["id"], "relates_to")
        console.print(f"[dim]  Related to {related_id}[/dim]")


@issue.command("show")
@click.argument("identifiers", nargs=-1)
@json_option
@require_auth
@handle_error
def issue_show(identifiers):
    """Show issue details.

    Pass one identifier for detailed view, or multiple for a summary table.

    Examples:
        chaotic issue show CHT-123
        chaotic issue show CHT-123 CHT-124 CHT-125
    """
    if not identifiers:
        console.print("[yellow]Usage: chaotic issue show IDENTIFIER [IDENTIFIER...][/yellow]")
        return

    # JSON output mode (CHT-170)
    if is_json_output():
        if len(identifiers) == 1:
            issue = client.get_issue_by_identifier(identifiers[0])
            issue['comments'] = client.get_comments(issue["id"])
            try:
                issue['sub_issues'] = client.get_sub_issues(issue["id"])
            except APIError:
                issue['sub_issues'] = []
            output_json(issue)
        else:
            issues = [client.get_issue_by_identifier(i) for i in identifiers]
            output_json(issues)
        return

    # Single issue: show detailed view
    if len(identifiers) == 1:
        issue = client.get_issue_by_identifier(identifiers[0])
        comments = client.get_comments(issue["id"])

        # Build panel lines
        panel_lines = [
            f"[bold]{issue['title']}[/bold]\n",
            f"[dim]Status:[/dim] {issue['status'].replace('_', ' ').title()}",
            f"[dim]Priority:[/dim] {issue['priority'].replace('_', ' ').title()}",
            f"[dim]Type:[/dim] {issue.get('issue_type', 'task').replace('_', ' ').title()}",
            f"[dim]Estimate:[/dim] {issue.get('estimate') or '-'} points",
        ]

        # Show parent info if this is a sub-issue
        if issue.get('parent_id'):
            try:
                parent = client.get_issue(issue['parent_id'])
                panel_lines.append(f"[dim]Parent:[/dim] {parent['identifier']}: {parent['title']}")
            except APIError:
                panel_lines.append(f"[dim]Parent:[/dim] [dim](unable to load)[/dim]")

        # Show sub-issue summary
        try:
            sub_issues = client.get_sub_issues(issue['id'])
            if sub_issues:
                done_count = sum(1 for s in sub_issues if s.get('status') in ('done', 'canceled'))
                panel_lines.append(f"[dim]Sub-issues:[/dim] {done_count}/{len(sub_issues)} done")
        except APIError:
            pass

        console.print(Panel("\n".join(panel_lines), title=issue["identifier"]))

        console.print("\n[dim]Description:[/dim]")
        description = issue.get('description') or 'No description'
        if issue.get('description'):
            console.print(Markdown(description))
        else:
            console.print(f"  {description}")

        if comments:
            console.print("\n[bold]Comments:[/bold]")
            for c in comments:
                # Format date if available (CHT-462)
                created_at = c.get('created_at', '')
                if created_at:
                    # Parse ISO date and format nicely
                    try:
                        from datetime import datetime
                        dt = datetime.fromisoformat(created_at.replace('Z', '+00:00'))
                        date_str = dt.strftime('%Y-%m-%d %H:%M')
                    except (ValueError, AttributeError):
                        date_str = created_at[:16] if len(created_at) > 16 else created_at
                    console.print(f"  • [dim]{c.get('author_name', 'User')} ({date_str}):[/dim]")
                else:
                    console.print(f"  • [dim]{c.get('author_name', 'User')}:[/dim]")
                console.print(Markdown(c.get('content', '')))

        # Show ritual attestation notes
        try:
            ritual_status = client.get_pending_issue_rituals(issue["id"])
            completed_rituals = ritual_status.get("completed_rituals", [])
            attestations_with_notes = [
                r for r in completed_rituals
                if r.get("attestation") and r["attestation"].get("note")
            ]
            if attestations_with_notes:
                console.print("\n[bold]Ritual Attestations:[/bold]")
                for r in attestations_with_notes:
                    att = r["attestation"]
                    console.print(f"  ✓ [green]{r['name']}[/green] - {att.get('attested_by_name', 'Unknown')}")
                    if att.get("note"):
                        console.print(f"    [dim]{att['note']}[/dim]")
        except APIError:
            pass  # Silently ignore if rituals API fails

        # Show linked documents
        try:
            linked_docs = client.get_issue_documents(issue['id'])
            if linked_docs:
                console.print("\n[bold]Linked Documents:[/bold]")
                for doc in linked_docs:
                    icon = doc.get('icon') or '📄'
                    console.print(f"  • {icon} {doc['title']}")
        except APIError:
            pass  # Silently ignore if API doesn't support this yet
        return

    # Multiple issues: show compact table
    table = Table(title="Issues")
    table.add_column("ID")
    table.add_column("Title")
    table.add_column("Status")
    table.add_column("Priority")
    table.add_column("Type")
    table.add_column("Estimate")

    for identifier in identifiers:
        try:
            issue = client.get_issue_by_identifier(identifier)
            table.add_row(
                issue["identifier"],
                issue["title"][:50] + ("..." if len(issue["title"]) > 50 else ""),
                issue["status"].replace("_", " ").title(),
                issue["priority"].replace("_", " ").title(),
                issue.get("issue_type", "task").replace("_", " ").title(),
                str(issue.get("estimate") or "-")
            )
        except APIError as e:
            table.add_row(identifier, f"[red]Error: {e}[/red]", "-", "-", "-", "-")

    console.print(table)


@issue.command("view")
@click.argument("identifiers", nargs=-1)
@require_auth
@handle_error
def issue_view(identifiers):
    """Show issue details.

    Alias for 'issue show'.
    """
    issue_show.callback(identifiers)


@issue.command("open")
@click.argument("identifier")
@require_auth
@handle_error
def issue_open(identifier):
    """Open issue in browser."""
    issue = client.get_issue_by_identifier(identifier)
    web_url = get_web_url()
    url = f"{web_url}/#/issue/{issue['id']}"
    console.print(f"[dim]Opening {url}...[/dim]")
    webbrowser.open(url)


@issue.command("get")
@click.argument("identifier")
@require_auth
@handle_error
def issue_get(identifier):
    """Show issue details (alias for 'show')."""
    # issue_show expects a tuple (nargs=-1), so wrap the single identifier
    issue_show.callback((identifier,))


@issue.command("update")
@click.argument("identifier")
@click.option("--title")
@click.option("--description")
@click.option("--status", type=click.Choice(["backlog", "todo", "in_progress", "in_review", "done", "canceled"], case_sensitive=False))
@click.option("--priority", type=click.Choice(["no_priority", "low", "medium", "high", "urgent"], case_sensitive=False))
@click.option("--type", "issue_type", type=click.Choice(["task", "bug", "feature", "chore", "docs", "tech_debt", "epic"], case_sensitive=False), help="Issue type")
@click.option("--estimate", type=int)
@click.option("--sprint", help="Set sprint ('current' for active sprint, 'none' to unassign, or sprint ID)")
@click.option("--parent", help="Set parent issue (e.g., CHT-123) to make this a sub-issue")
@click.option("--no-parent", "clear_parent", is_flag=True, help="Detach from parent issue")
@click.option("--label", "-l", "add_labels", multiple=True, help="Add label(s) to issue (can be used multiple times)")
@click.option("--remove-label", "remove_labels", multiple=True, help="Remove label(s) from issue (can be used multiple times)")
@click.option("--blocked-by", "blocked_by", multiple=True, help="Add blocked-by relation(s) (can be used multiple times)")
@click.option("--relates-to", "relates_to", multiple=True, help="Add relates-to relation(s) (can be used multiple times)")
@click.option("--unceremoniously-attest-all-rituals", "unceremonious", is_flag=True,
              help="Auto-attest all pending ticket rituals (requires --note)")
@click.option("--note", help="Note for ritual attestations (required with --unceremoniously-attest-all-rituals)")
@json_option
@require_auth
@handle_error
def issue_update(identifier, title, description, status, priority, issue_type, estimate, sprint, parent, clear_parent, add_labels, remove_labels, blocked_by, relates_to, unceremonious, note):
    """Update an issue."""
    issue = client.get_issue_by_identifier(identifier)

    # Warn if --note used without --unceremoniously-attest-all-rituals
    if note and not unceremonious:
        console.print("[yellow]Note: --note has no effect without --unceremoniously-attest-all-rituals[/yellow]")

    # Handle unceremonious ritual attestation
    if unceremonious:
        if not note or not note.strip():
            raise click.ClickException(
                "--unceremoniously-attest-all-rituals requires --note to explain why rituals are being skipped.\n"
                "Example: --note 'Trivial fix, rituals not warranted'"
            )

        # Get and attest all pending rituals for this issue
        ritual_status = client.get_pending_issue_rituals(issue["id"])
        pending = ritual_status.get("pending_rituals", [])

        # Filter out GATE mode rituals (require human approval, can't be auto-attested)
        attestable = [r for r in pending if r.get("approval_mode") != "gate"]
        gate_rituals = [r for r in pending if r.get("approval_mode") == "gate"]

        if gate_rituals:
            console.print(f"[yellow]Warning: {len(gate_rituals)} GATE ritual(s) require human approval and cannot be auto-attested:[/yellow]")
            for r in gate_rituals:
                console.print(f"  [dim]⚠ {r['name']}[/dim]")

        if attestable:
            console.print(f"[yellow]Auto-attesting {len(attestable)} ritual(s)...[/yellow]")
            for ritual in attestable:
                client.attest_ritual_for_issue(ritual["id"], issue["id"], note)
                console.print(f"  [dim]✓ {ritual['name']}[/dim]")
        elif not gate_rituals:
            console.print("[dim]No pending rituals to attest.[/dim]")

    # Handle label add/remove operations (CHT-697)
    labels_modified = False
    if add_labels or remove_labels:
        # Get all labels for the team to resolve names to IDs
        team_id = get_current_team()
        all_labels = client.get_labels(team_id)
        label_lookup = {l["name"].lower(): l["id"] for l in all_labels}

        # Add labels
        for label_name in add_labels:
            label_id = label_lookup.get(label_name.lower())
            if not label_id:
                console.print(f"[red]Label '{label_name}' not found. Available labels: {', '.join(l['name'] for l in all_labels)}[/red]")
                raise SystemExit(1)
            client.add_label_to_issue(issue["id"], label_id)
            console.print(f"[dim]Added label: {label_name}[/dim]")
            labels_modified = True

        # Remove labels
        for label_name in remove_labels:
            label_id = label_lookup.get(label_name.lower())
            if not label_id:
                console.print(f"[red]Label '{label_name}' not found. Available labels: {', '.join(l['name'] for l in all_labels)}[/red]")
                raise SystemExit(1)
            client.remove_label_from_issue(issue["id"], label_id)
            console.print(f"[dim]Removed label: {label_name}[/dim]")
            labels_modified = True

    # Validate parent flags before building update data
    if parent and clear_parent:
        raise click.ClickException("Cannot use --parent and --no-parent together.")

    data = {}
    if title is not None:
        data["title"] = title
    if description is not None:
        data["description"] = description
    if status:
        data["status"] = status
    if priority:
        data["priority"] = priority
    if issue_type:
        data["issue_type"] = issue_type
    if estimate is not None:
        data["estimate"] = estimate
    if parent:
        parent_issue = client.get_issue_by_identifier(parent)
        if parent_issue["id"] == issue["id"]:
            raise click.ClickException("An issue cannot be its own parent.")
        data["parent_id"] = parent_issue["id"]
    if clear_parent:
        data["parent_id"] = None
    if sprint is not None:
        if sprint.lower() == "none" or sprint == "":
            data["sprint_id"] = None
        else:
            project_id = issue.get("project_id") or get_current_project()
            if not project_id:
                raise click.ClickException("No project context. Set a project with 'chaotic project use <id>' or specify a sprint ID directly.")
            data["sprint_id"] = resolve_sprint_id(sprint, project_id)

    # Create relations if specified (CHT-843, CHT-844)
    relations_modified = False
    for blocker_id in blocked_by:
        blocker = client.get_issue_by_identifier(blocker_id)
        client.create_relation(blocker["id"], issue["id"], "blocks")
        console.print(f"[dim]  Blocked by {blocker_id}[/dim]")
        relations_modified = True
    for related_id in relates_to:
        related = client.get_issue_by_identifier(related_id)
        client.create_relation(issue["id"], related["id"], "relates_to")
        console.print(f"[dim]  Related to {related_id}[/dim]")
        relations_modified = True

    if not data and not labels_modified and not relations_modified:
        console.print("[yellow]No updates provided.[/yellow]")
        return

    if data:
        client.update_issue(issue["id"], **data)
    if is_json_output():
        updated = client.get_issue_by_identifier(identifier)
        output_json(updated)
        return
    console.print(f"[green]Issue {identifier} updated.[/green]")


@issue.command("comment")
@click.argument("identifier")
@click.argument("content")
@click.option("--note", "--notes", help="Additional context appended to the comment (e.g., commit hash)")
@require_auth
@handle_error
def issue_comment(identifier, content, note):
    """Add a comment to an issue."""
    body = "\n".join([content, note]) if note else content
    issue = client.get_issue_by_identifier(identifier)
    client.create_comment(issue["id"], body)
    console.print(f"[green]Comment added to {identifier}.[/green]")


@issue.command("delete")
@click.argument("identifier")
@click.confirmation_option(prompt="Are you sure you want to delete this issue?")
@require_auth
@handle_error
def issue_delete(identifier):
    """Delete an issue."""
    issue = client.get_issue_by_identifier(identifier)
    client.delete_issue(issue["id"])
    console.print(f"[green]Issue {identifier} deleted.[/green]")


@issue.command("sub-issues")
@click.argument("identifier")
@json_option
@require_auth
@handle_error
def issue_sub_issues(identifier):
    """List sub-issues of an issue."""
    issue = client.get_issue_by_identifier(identifier)
    sub_issues = client.get_sub_issues(issue["id"])
    if is_json_output():
        output_json(sub_issues or [])
        return

    if not sub_issues:
        console.print(f"[yellow]No sub-issues found for {identifier}.[/yellow]")
        return

    table = Table(title=f"Sub-issues of {identifier}")
    table.add_column("ID")
    table.add_column("Title")
    table.add_column("Status")
    table.add_column("Priority")
    table.add_column("Estimate")

    for i in sub_issues:
        table.add_row(
            i["identifier"],
            i["title"][:50] + ("..." if len(i["title"]) > 50 else ""),
            i["status"].replace("_", " ").title(),
            i["priority"].replace("_", " ").title(),
            str(i.get("estimate") or "-")
        )

    console.print(table)


@issue.command("relations")
@click.argument("identifier")
@json_option
@require_auth
@handle_error
def issue_relations(identifier):
    """Show blocking and related issues."""
    issue = client.get_issue_by_identifier(identifier)
    relations = client.get_relations(issue["id"])
    if is_json_output():
        output_json(relations or [])
        return

    if not relations:
        console.print(f"[yellow]No relations found for {identifier}.[/yellow]")
        return

    table = Table(title=f"Relations for {identifier}")
    table.add_column("Relation ID", style="dim")
    table.add_column("Type")
    table.add_column("Related Issue")
    table.add_column("Direction")

    for r in relations:
        table.add_row(
            r["id"][:8] + "...",
            r["relation_type"].replace("_", " ").title(),
            r["related_issue"]["identifier"],
            r["direction"]
        )

    console.print(table)


@issue.command("block")
@click.argument("identifier")
@click.argument("blocked_identifier")
@click.option("--type", "relation_type", default="blocks",
              type=click.Choice(["blocks", "relates_to", "duplicates"]),
              help="Type of relation")
@require_auth
@handle_error
def issue_block(identifier, blocked_identifier, relation_type):
    """Create a relation between issues.

    IDENTIFIER blocks BLOCKED_IDENTIFIER (for 'blocks' type).
    """
    issue = client.get_issue_by_identifier(identifier)
    blocked = client.get_issue_by_identifier(blocked_identifier)
    client.create_relation(issue["id"], blocked["id"], relation_type)

    if relation_type == "blocks":
        console.print(f"[green]{identifier} now blocks {blocked_identifier}.[/green]")
    elif relation_type == "duplicates":
        console.print(f"[green]{identifier} marked as duplicate of {blocked_identifier}.[/green]")
    else:
        console.print(f"[green]{identifier} related to {blocked_identifier}.[/green]")


@issue.command("unblock")
@click.argument("identifier")
@click.argument("relation_id")
@require_auth
@handle_error
def issue_unblock(identifier, relation_id):
    """Remove a relation from an issue."""
    issue = client.get_issue_by_identifier(identifier)
    client.delete_relation(issue["id"], relation_id)
    console.print(f"[green]Relation removed from {identifier}.[/green]")


@issue.command("duplicate")
@click.argument("duplicate_identifier")
@click.argument("original_identifier")
@require_auth
@handle_error
def issue_duplicate(duplicate_identifier, original_identifier):
    """Mark an issue as a duplicate of another and close it.

    DUPLICATE_IDENTIFIER is the duplicate that will be closed.
    ORIGINAL_IDENTIFIER is the original issue to keep open.

    This will:
    1. Create a 'duplicates' relation
    2. Add a comment explaining the closure
    3. Close the duplicate as 'canceled' (skips ritual checks)
    """
    duplicate = client.get_issue_by_identifier(duplicate_identifier)
    original = client.get_issue_by_identifier(original_identifier)

    # Validate not same issue
    if duplicate["id"] == original["id"]:
        raise click.ClickException("Cannot mark an issue as a duplicate of itself.")

    # Check if duplicate is already closed
    if duplicate["status"] in ("done", "canceled"):
        raise click.ClickException(
            f"{duplicate_identifier} is already {duplicate['status']}. "
            "Cannot mark a closed issue as duplicate."
        )

    # Create the duplicates relation
    client.create_relation(duplicate["id"], original["id"], "duplicates")

    # Add comment explaining the closure
    client.create_comment(
        duplicate["id"],
        f"Closed as duplicate of {original_identifier}."
    )

    # Close the duplicate as canceled (skips rituals per CHT-171)
    client.update_issue(duplicate["id"], status="canceled")

    console.print(f"[green]{duplicate_identifier} closed as duplicate of {original_identifier}.[/green]")


@issue.command("assign")
@click.argument("identifier")
@click.argument("assignee", required=False)
@require_auth
@handle_error
def issue_assign(identifier, assignee):
    """Assign an issue to a user.

    ASSIGNEE can be 'me' (assign to yourself), a user/agent ID, or a name/email.
    Omit ASSIGNEE to unassign.
    """
    issue = client.get_issue_by_identifier(identifier)

    if assignee is None:
        client.update_issue(issue["id"], assignee_id=None)
        console.print(f"[green]Issue {identifier} unassigned.[/green]")
    else:
        assignee_id = resolve_assignee_id(assignee)
        client.update_issue(issue["id"], assignee_id=assignee_id)
        console.print(f"[green]Issue {identifier} assigned.[/green]")


@issue.command("move")
@click.argument("identifier")
@click.argument("status", type=click.Choice(["backlog", "todo", "in_progress", "in_review", "done", "canceled"], case_sensitive=False))
@require_auth
@handle_error
def issue_move(identifier, status):
    """Move an issue to a different status.

    Shortcut for 'issue update IDENTIFIER --status STATUS'.
    """
    issue = client.get_issue_by_identifier(identifier)
    client.update_issue(issue["id"], status=status)
    console.print(f"[green]Issue {identifier} moved to {status.replace('_', ' ').title()}.[/green]")


@issue.command("close")
@click.argument("identifier")
@require_auth
@handle_error
def issue_close(identifier):
    """Close an issue (move to done).

    Shortcut for 'issue move IDENTIFIER done'.
    """
    issue = client.get_issue_by_identifier(identifier)
    client.update_issue(issue["id"], status="done")
    console.print(f"[green]Issue {identifier} closed.[/green]")


@issue.command("complete")
@click.argument("identifier")
@require_auth
@handle_error
def issue_complete(identifier):
    """Mark an issue as done.

    Alias for 'issue close IDENTIFIER'.
    """
    issue_close.callback(identifier)


@issue.command("wontfix")
@click.argument("identifier")
@require_auth
@handle_error
def issue_wontfix(identifier):
    """Mark an issue as wontfix (canceled).

    Use this when you decide not to do an issue. Unlike 'issue close',
    this does not require ticket-level rituals to be completed.
    """
    issue = client.get_issue_by_identifier(identifier)
    if issue["status"] == "canceled":
        console.print(f"[dim]Issue {identifier} is already canceled.[/dim]")
        return
    client.update_issue(issue["id"], status="canceled")
    console.print(f"[green]Issue {identifier} marked as wontfix (canceled).[/green]")


@issue.command("cancel")
@click.argument("identifier")
@require_auth
@handle_error
def issue_cancel(identifier):
    """Cancel an issue.

    Alias for 'issue wontfix IDENTIFIER'.
    """
    issue_wontfix.callback(identifier)


@issue.command("claim")
@click.argument("identifier")
@require_auth
@handle_error
def issue_claim(identifier):
    """Assign an issue to yourself and move to in_progress.

    Shortcut for 'issue assign IDENTIFIER me' + 'issue move IDENTIFIER in_progress'.
    """
    issue = client.get_issue_by_identifier(identifier)
    user = client.get_me()
    client.update_issue(issue["id"], assignee_id=user["id"], status="in_progress")
    console.print(f"[green]Issue {identifier} claimed and moved to In Progress.[/green]")


@issue.command("start")
@click.argument("identifier")
@require_auth
@handle_error
def issue_start(identifier):
    """Start working on an issue.

    Alias for 'issue claim IDENTIFIER'.
    """
    issue_claim.callback(identifier)


@issue.command("rituals")
@click.argument("identifier")
@require_auth
@handle_error
def issue_rituals(identifier):
    """Show pending rituals for an issue.

    Displays which ticket-level rituals (close or claim) still need to be
    completed before the issue can be claimed or marked done.
    """
    issue = client.get_issue_by_identifier(identifier)
    status = client.get_pending_issue_rituals(issue["id"])
    pending = status.get("pending_rituals", [])
    completed = status.get("completed_rituals", [])

    if not pending and not completed:
        console.print(f"[dim]No ticket-level rituals configured for this project.[/dim]")
        return

    console.print(f"[bold]Ticket-level rituals for {identifier}:[/bold]")

    for r in completed:
        console.print(f"  [green]✓[/green] {r['name']}")
        if r.get("attestation"):
            att = r["attestation"]
            if att.get("note"):
                console.print(f"      [dim]Note: {att['note']}[/dim]")
            if att.get("attested_at"):
                attested_date = att["attested_at"][:10]
                console.print(f"      [dim]Attested: {attested_date}[/dim]")

    for r in pending:
        mode = f"[dim]({r['approval_mode']})[/dim]"
        if r.get("attestation"):
            if r["attestation"].get("approved_at"):
                console.print(f"  [green]✓[/green] {r['name']} {mode}")
            else:
                console.print(f"  [yellow]⏳[/yellow] {r['name']} {mode} - pending approval")
                att = r["attestation"]
                if att.get("note"):
                    console.print(f"      [dim]Note: {att['note']}[/dim]")
        else:
            console.print(f"  [red]○[/red] {r['name']} {mode}")
            _print_ritual_prompt(r['prompt'])

    if pending:
        console.print(f"\n[dim]Run 'chaotic ritual attest <name> --ticket {identifier}' to attest.[/dim]")


# Priority levels in order (lowest to highest)
PRIORITY_LEVELS = ["no_priority", "low", "medium", "high", "urgent"]


@issue.command("escalate")
@click.argument("identifier")
@require_auth
@handle_error
def issue_escalate(identifier):
    """Bump issue priority up one level.

    Increases priority: no_priority -> low -> medium -> high -> urgent.
    If already at urgent, no change is made.

    Example: chaotic issue escalate CHT-123
    """
    issue = client.get_issue_by_identifier(identifier)
    current = issue.get("priority", "no_priority")

    try:
        current_index = PRIORITY_LEVELS.index(current)
    except ValueError:
        current_index = 0  # Default to no_priority if unknown

    if current_index >= len(PRIORITY_LEVELS) - 1:
        console.print(f"[yellow]Issue {identifier} is already at highest priority (urgent).[/yellow]")
        return

    new_priority = PRIORITY_LEVELS[current_index + 1]
    client.update_issue(issue["id"], priority=new_priority)
    console.print(f"[green]Issue {identifier} priority escalated: {current} → {new_priority}[/green]")


@issue.command("deescalate")
@click.argument("identifier")
@require_auth
@handle_error
def issue_deescalate(identifier):
    """Bump issue priority down one level.

    Decreases priority: urgent -> high -> medium -> low -> no_priority.
    If already at no_priority, no change is made.

    Example: chaotic issue deescalate CHT-123
    """
    issue = client.get_issue_by_identifier(identifier)
    current = issue.get("priority", "no_priority")

    try:
        current_index = PRIORITY_LEVELS.index(current)
    except ValueError:
        current_index = 0  # Default to no_priority if unknown

    if current_index <= 0:
        console.print(f"[yellow]Issue {identifier} is already at lowest priority (no_priority).[/yellow]")
        return

    new_priority = PRIORITY_LEVELS[current_index - 1]
    client.update_issue(issue["id"], priority=new_priority)
    console.print(f"[green]Issue {identifier} priority deescalated: {current} → {new_priority}[/green]")


# Add 'ticket' as alias for 'issue' command group
cli.add_command(issue, name="ticket")


# Epic commands (CHT-824)
@cli.group()
def epic():
    """Epic management commands."""
    pass


@epic.command("create")
@click.argument("title", required=False)
@click.option("--title", "title_opt", help="Epic title (alternative to positional argument)")
@click.option("--description", default="")
@click.option("--status", default="backlog", type=click.Choice(["backlog", "todo", "in_progress", "in_review", "done"], case_sensitive=False))
@click.option("--priority", default="no_priority", type=click.Choice(["no_priority", "low", "medium", "high", "urgent"], case_sensitive=False))
@click.option("--estimate", type=int)
@click.option("--sprint", help="Set sprint ('current' for active sprint, 'none' to not assign, or sprint ID)")
@click.option("--label", "labels", multiple=True, help="Label name(s) to assign (can be used multiple times)")
@click.option("--project", "project_key", help="Project (ID, key, or name) - overrides current project")
@require_team
@handle_error
def epic_create(title, title_opt, description, status, priority, estimate, sprint, labels, project_key):
    """Create a new epic.

    Creates an issue with type=epic. Use 'chaotic issue create --parent' to add sub-issues.

    Examples:
        chaotic epic create "User Authentication"
        chaotic epic create "Search Feature" --priority high --description "Full-text search"
    """
    title = (title or title_opt or "").strip()
    if not title:
        raise click.ClickException("Title is required. Use: chaotic epic create \"My Epic Title\"")

    if project_key:
        project_id = resolve_project_id(project_key)
    else:
        project_id = get_current_project()
        if not project_id:
            console.print("[red]No project selected. Use --project or run 'chaotic project use <project_id>' first.[/red]")
            raise SystemExit(1)

    data = {"description": description or None, "status": status, "priority": priority, "issue_type": "epic"}
    if estimate:
        data["estimate"] = estimate
    if labels:
        team_id = get_current_team()
        all_labels = client.get_labels(team_id)
        label_ids = []
        for label_name in labels:
            label = next((l for l in all_labels if l["name"].lower() == label_name.lower()), None)
            if not label:
                console.print(f"[red]Label '{label_name}' not found. Available labels: {', '.join(l['name'] for l in all_labels)}[/red]")
                raise SystemExit(1)
            label_ids.append(label["id"])
        data["label_ids"] = label_ids
    if sprint is not None:
        if sprint.lower() == "none" or sprint == "":
            data["sprint_id"] = None
        else:
            data["sprint_id"] = resolve_sprint_id(sprint, project_id)

    result = client.create_issue(project_id, title, **data)
    console.print(f"[green]Epic created: {result['identifier']} - {result['title']}[/green]")
    console.print(f"\n[dim]Add sub-issues with:[/dim]")
    console.print(f"  chaotic issue create --parent {result['identifier']} \"Sub-issue title\"")


@epic.command("list")
@click.option("--status", help="Filter by status (backlog, todo, in_progress, in_review, done, canceled). Comma-separated for multiple.")
@click.option("--limit", "-n", type=int, default=50, help="Maximum number of epics to show (default: 50)")
@json_option
@require_project
@handle_error
def epic_list(status, limit):
    """List epics in current project with progress.

    Examples:
        chaotic epic list
        chaotic epic list --status in_progress
    """
    if status:
        valid_statuses = ["backlog", "todo", "in_progress", "in_review", "done", "canceled"]
        statuses = [s.strip().lower() for s in status.split(",")]
        for s in statuses:
            if s not in valid_statuses:
                raise click.BadParameter(f"Invalid status: {s}. Must be one of: {', '.join(valid_statuses)}")

    project_id = get_current_project()
    epics = client.get_issues(project_id=project_id, issue_type="epic", status=status, limit=limit)

    if is_json_output():
        for ep in epics:
            try:
                ep['sub_issues'] = client.get_sub_issues(ep['id'])
            except APIError:
                ep['sub_issues'] = []
        output_json(epics)
        return

    if not epics:
        console.print("[yellow]No epics found.[/yellow]")
        return

    table = Table(title="Epics")
    table.add_column("ID")
    table.add_column("Title")
    table.add_column("Status")
    table.add_column("Priority")
    table.add_column("Progress")

    for ep in epics:
        # Fetch sub-issues for progress
        try:
            sub_issues = client.get_sub_issues(ep['id'])
            if sub_issues:
                done_count = sum(1 for s in sub_issues if s.get('status') in ('done', 'canceled'))
                progress = f"{done_count}/{len(sub_issues)} done"
            else:
                progress = "-"
        except APIError:
            progress = "-"

        table.add_row(
            ep["identifier"],
            ep["title"][:50] + ("..." if len(ep["title"]) > 50 else ""),
            ep["status"].replace("_", " ").title(),
            ep["priority"].replace("_", " ").title(),
            progress,
        )

    console.print(table)


@epic.command("show")
@click.argument("identifier")
@json_option
@require_auth
@handle_error
def epic_show(identifier):
    """Show epic details with sub-issue tree.

    Examples:
        chaotic epic show CHT-123
    """
    issue = client.get_issue_by_identifier(identifier)

    if issue.get('issue_type') != 'epic':
        console.print(f"[yellow]{identifier} is not an epic (type: {issue.get('issue_type', 'task')}). Use 'chaotic issue show' instead.[/yellow]")
        return

    # JSON output
    if is_json_output():
        issue['comments'] = client.get_comments(issue["id"])
        try:
            issue['sub_issues'] = client.get_sub_issues(issue["id"])
        except APIError:
            issue['sub_issues'] = []
        output_json(issue)
        return

    # Build panel
    panel_lines = [
        f"[bold]{issue['title']}[/bold]\n",
        f"[dim]Status:[/dim] {issue['status'].replace('_', ' ').title()}",
        f"[dim]Priority:[/dim] {issue['priority'].replace('_', ' ').title()}",
        f"[dim]Estimate:[/dim] {issue.get('estimate') or '-'} points",
    ]

    console.print(Panel("\n".join(panel_lines), title=f"Epic {issue['identifier']}"))

    # Description
    description = issue.get('description') or 'No description'
    console.print("\n[dim]Description:[/dim]")
    if issue.get('description'):
        console.print(Markdown(description))
    else:
        console.print(f"  {description}")

    # Sub-issue tree
    try:
        sub_issues = client.get_sub_issues(issue['id'])
    except APIError:
        sub_issues = []

    if sub_issues:
        done_count = sum(1 for s in sub_issues if s.get('status') in ('done', 'canceled'))
        console.print(f"\n[bold]Sub-issues ({done_count}/{len(sub_issues)} done):[/bold]")

        table = Table(show_header=True)
        table.add_column("", width=3)  # checkmark
        table.add_column("ID")
        table.add_column("Title")
        table.add_column("Status")
        table.add_column("Priority")
        table.add_column("Estimate")

        for s in sub_issues:
            done = s.get('status') in ('done', 'canceled')
            mark = "[green]✓[/green]" if done else "[dim]✗[/dim]"
            table.add_row(
                mark,
                s.get("identifier", "-"),
                (s.get("title", "")[:45] + ("..." if len(s.get("title", "")) > 45 else "")),
                s["status"].replace("_", " ").title(),
                s["priority"].replace("_", " ").title(),
                str(s.get("estimate") or "-"),
            )

        console.print(table)
    else:
        console.print("\n[dim]No sub-issues yet. Add one with:[/dim]")
        console.print(f"  chaotic issue create --parent {issue['identifier']} \"Sub-issue title\"")


# Sprint commands
@cli.group()
def sprint():
    """Sprint management commands."""
    pass


@sprint.command("list")
@click.option("--status", type=click.Choice(["planned", "active", "completed"]))
@json_option
@require_project
@handle_error
def sprint_list(status):
    """List sprints in current project."""
    sprints = client.get_sprints(get_current_project(), status)

    # JSON output mode (CHT-170)
    if is_json_output():
        output_json(sprints)
        return

    if not sprints:
        console.print("[yellow]No sprints found.[/yellow]")
        return

    table = Table(title="Sprints")
    table.add_column("ID", style="dim")
    table.add_column("Name")
    table.add_column("Status")
    table.add_column("Start")
    table.add_column("End")

    for s in sprints:
        table.add_row(
            s["id"],
            s["name"],
            s["status"].title(),
            s.get("start_date", "-")[:10] if s.get("start_date") else "-",
            s.get("end_date", "-")[:10] if s.get("end_date") else "-"
        )

    console.print(table)


def resolve_sprint_id(sprint_value: str, project_id: str) -> str:
    """Resolve a sprint value to a sprint ID.

    Resolution order (first match wins):
    1. "current" → active sprint ID
    2. "next" → planned sprint ID
    3. Full UUID → passed through
    4. Sprint name → matched case-insensitively
    5. UUID prefix → matched against project sprints

    Raises ClickException on ambiguity or not found.
    """
    if sprint_value.lower() == "current":
        current = client.get_current_sprint(project_id)
        return current["id"]

    if sprint_value.lower() == "next":
        sprints = client.get_sprints(project_id, status="planned")
        if not sprints:
            raise click.ClickException("No planned (next) sprint found. Use 'chaotic sprint list' to see available sprints.")
        return sprints[0]["id"]

    # Fetch all sprints for resolution
    sprints = client.get_sprints(project_id)
    if not sprints:
        raise click.ClickException("No sprints exist for this project. Use 'chaotic sprint current' to create the initial sprint.")

    # Try exact ID match first
    exact = [s for s in sprints if s["id"] == sprint_value]
    if exact:
        return exact[0]["id"]

    # Try matching by name (case-insensitive, with null-safety)
    # Note: (s.get("name") or "") handles both missing keys AND None values
    name_matches = [s for s in sprints if (s.get("name") or "").lower() == sprint_value.lower()]
    if len(name_matches) == 1:
        return name_matches[0]["id"]
    if len(name_matches) > 1:
        names = "\n".join(f"  {s['id']}  ({s['name']})" for s in name_matches)
        raise click.ClickException(f"Ambiguous sprint name '{sprint_value}'. Matches:\n{names}")

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
    # Fetch all documents for resolution
    documents = client.get_documents(team_id)
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
    labels = client.get_labels(team_id)
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
    teams = client.get_teams()
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


def print_sprint_panel(result: dict, title: str = "Sprint"):
    """Print a sprint details panel."""
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


@sprint.command("current")
@json_option
@require_project
@handle_error
def sprint_current():
    """Show the current (active) sprint."""
    result = client.get_current_sprint(get_current_project())
    if is_json_output():
        output_json(result)
        return
    print_sprint_panel(result, title="Current Sprint")


# 'status' as alias for 'current'
@sprint.command("status", hidden=True)
@require_project
@handle_error
def sprint_status():
    """Show the current sprint (alias for 'current')."""
    sprint_current.callback()


@sprint.command("budget")
@json_option
@require_project
@handle_error
def sprint_budget():
    """Show current sprint budget status."""
    result = client.get_current_sprint(get_current_project())
    if is_json_output():
        output_json(result)
        return

    name = result["name"]
    budget = result.get("budget")
    spent = result.get("points_spent", 0)

    if budget is None:
        console.print(Panel(
            f"[bold]{name}[/bold]\n"
            f"Budget: [dim]Unlimited[/dim]\n"
            f"Spent: {spent} points",
            title="Sprint Budget"
        ))
        return

    remaining = budget - spent
    if remaining < 0:
        status_line = f"Arrears: [red]{abs(remaining)} points over budget[/red]\nStatus: [red bold]BLOCKED - close sprint to continue[/red bold]"
    else:
        status_line = f"Remaining: {remaining} points\nStatus: [green]OK[/green]"

    console.print(Panel(
        f"[bold]{name}[/bold]\n"
        f"Budget: {budget} points\n"
        f"Spent: {spent} points\n"
        f"{status_line}",
        title="Sprint Budget"
    ))


@sprint.command("show")
@click.argument("sprint_id", required=False)
@click.option("--current", "-c", "show_current", is_flag=True, help="Show the current (active) sprint")
@json_option
@require_project
@handle_error
def sprint_show(sprint_id, show_current):
    """Show sprint details and its issues.

    If no SPRINT_ID is given, shows the current (active) sprint.
    Use --current to explicitly request the active sprint.
    """
    project_id = get_current_project()
    if show_current or not sprint_id:
        resolved_id = resolve_sprint_id("current", project_id)
    else:
        resolved_id = resolve_sprint_id(sprint_id, project_id)
    result = client.get_sprint(resolved_id)

    # JSON output mode (CHT-170)
    if is_json_output():
        issues = client.get_issues(project_id=result.get("project_id", project_id), sprint_id=result["id"])
        result['issues'] = issues
        output_json(result)
        return

    print_sprint_panel(result)

    # Fetch and display the sprint's issues (use sprint's own project_id
    # in case the user passed a sprint ID from a different project)
    issues = client.get_issues(project_id=result.get("project_id", project_id), sprint_id=result["id"])
    if not issues:
        console.print("[dim]No issues in this sprint.[/dim]")
        return

    table = Table(title="Sprint Issues")
    table.add_column("ID")
    table.add_column("Title")
    table.add_column("Status")
    table.add_column("Priority")
    table.add_column("Estimate")

    for i in issues:
        table.add_row(
            i["identifier"],
            i["title"][:50] + ("..." if len(i["title"]) > 50 else ""),
            i["status"].replace("_", " ").title(),
            i["priority"].replace("_", " ").title(),
            str(i.get("estimate") or "-")
        )

    console.print(table)


@sprint.command("close")
@click.argument("sprint_id", required=False)
@require_project
@handle_error
def sprint_close(sprint_id):
    """Close the current sprint and rotate to next.

    SPRINT_ID can be a full ID, prefix, or omitted for current sprint.
    If project has rituals, sprint enters limbo until rituals are attested.
    """
    project_id = get_current_project()
    sprint_id = resolve_sprint_id(sprint_id or "current", project_id)

    result = client.close_sprint(sprint_id)

    if result.get("limbo"):
        console.print(f"[yellow]Sprint '{result['name']}' closed.[/yellow]")
        console.print("Run `chaotic ritual list` to continue.")
    else:
        console.print(f"[green]Sprint '{result['name']}' closed. Next sprint is now active.[/green]")


@sprint.command("update")
@click.argument("sprint_id", required=False)
@click.option("--name", help="Sprint name")
@click.option("--description", help="Sprint description")
@click.option("--budget", type=int, help="Point budget for the sprint")
@click.option("--no-budget", is_flag=True, help="Remove budget limit (unlimited)")
@require_auth
@handle_error
def sprint_update(sprint_id, name, description, budget, no_budget):
    """Update a sprint.

    SPRINT_ID can be a full ID, prefix, or 'current'. Defaults to current sprint if omitted.
    """
    project_id = get_current_project()
    if sprint_id is None:
        if not project_id:
            raise click.ClickException("No project selected and no SPRINT_ID given. Run 'chaotic project use <project_id>' first.")
        sprint_id = resolve_sprint_id("current", project_id)
    elif project_id:
        sprint_id = resolve_sprint_id(sprint_id, project_id)
    data = {}
    if name is not None:
        data["name"] = name
    if description is not None:
        data["description"] = description
    if no_budget:
        data["budget"] = None
    elif budget is not None:
        data["budget"] = budget

    if not data:
        console.print("[yellow]No updates provided.[/yellow]")
        return

    result = client.update_sprint(sprint_id, **data)
    console.print(f"[green]Sprint '{result['name']}' updated.[/green]")


@sprint.command("add")
@click.argument("identifiers", nargs=-1, required=True)
@require_auth
@handle_error
def sprint_add(identifiers):
    """Add issues to the current sprint.

    IDENTIFIERS are issue identifiers (e.g., CHT-123 CHT-456).

    \b
    Examples:
        chaotic sprint add CHT-123
        chaotic sprint add CHT-123 CHT-456 CHT-789
    """
    project_id = get_current_project()
    if not project_id:
        raise click.ClickException("No project selected. Run 'chaotic project use <project_id>' first.")
    sprint_id = resolve_sprint_id("current", project_id)

    for identifier in identifiers:
        issue = client.get_issue_by_identifier(identifier)
        client.update_issue(issue["id"], sprint_id=sprint_id)
        console.print(f"[green]Added {issue['identifier']} to current sprint.[/green]")


@sprint.command("remove")
@click.argument("identifiers", nargs=-1, required=True)
@require_auth
@handle_error
def sprint_remove(identifiers):
    """Remove issues from their sprint.

    IDENTIFIERS are issue identifiers (e.g., CHT-123 CHT-456).

    \b
    Examples:
        chaotic sprint remove CHT-123
        chaotic sprint remove CHT-123 CHT-456
    """
    for identifier in identifiers:
        issue = client.get_issue_by_identifier(identifier)
        client.update_issue(issue["id"], sprint_id=None)
        console.print(f"[green]Removed {issue['identifier']} from sprint.[/green]")


@sprint.command("issues")
@json_option
@require_project
@handle_error
def sprint_issues():
    """List issues in the current sprint.

    Shorthand for 'chaotic issue list --sprint current'.
    """
    project_id = get_current_project()
    sprint_id = resolve_sprint_id("current", project_id)
    issues = client.get_issues(project_id=project_id, sprint_id=sprint_id, limit=50)

    if is_json_output():
        output_json(issues)
        return

    if not issues:
        console.print("[yellow]No issues in the current sprint.[/yellow]")
        return

    sprints = client.get_sprints(project_id)
    sprint_names = {s["id"]: s["name"] for s in sprints}

    table = Table(title="Issues")
    table.add_column("ID")
    table.add_column("Title")
    table.add_column("Status")
    table.add_column("Priority")
    table.add_column("Type")
    table.add_column("Estimate")
    table.add_column("Sprint")

    for issue in issues:
        est = str(issue.get("estimate", "")) if issue.get("estimate") is not None else ""
        sname = sprint_names.get(issue.get("sprint_id"), "") if issue.get("sprint_id") else ""
        table.add_row(
            issue.get("identifier", ""),
            issue.get("title", ""),
            (issue.get("status") or "").replace("_", " ").title(),
            (issue.get("priority") or "").replace("_", " ").title(),
            (issue.get("issue_type") or "").title(),
            est,
            sname,
        )

    console.print(table)


# Ritual commands
@cli.group()
def ritual():
    """Ritual management commands.

    Rituals are mindfulness checkpoints at sprint boundaries.
    When a sprint closes, pending rituals must be attested before
    the next sprint can begin.
    """
    pass


def _format_ritual_line(r):
    """Format a ritual display line with mode, group, and note info."""
    mode = f"[dim]({r['approval_mode']})[/dim]"
    note_tag = "" if r.get("note_required", True) else " [dim][no note req][/dim]"
    group_tag = ""
    if r.get("group_name"):
        group_tag = f" [dim][group: {r['group_name']}][/dim]"
    deleted_tag = " [red][deleted][/red]" if not r.get("is_active", True) else ""
    return f"  • {r['name']} {mode}{note_tag}{group_tag}{deleted_tag}"


def _print_ritual_prompt(prompt):
    """Print ritual prompt with markdown rendering."""
    from rich.padding import Padding
    console.print(Padding(Markdown(prompt), (0, 0, 0, 6)))


@ritual.command("list")
@click.option("--pending", is_flag=True, help="Show only pending/incomplete rituals")
@click.option("--ticket", "ticket_id", help="Show pending rituals for a specific ticket (e.g., CHT-123)")
@click.option("--deleted", is_flag=True, help="Include deleted (inactive) rituals")
@require_project
@handle_error
def ritual_list(pending, ticket_id, deleted):
    """List rituals and show limbo status."""
    project_id = get_current_project()

    # If --ticket is specified, show pending rituals for that ticket
    if ticket_id:
        issue = client.get_issue_by_identifier(ticket_id)
        if not issue:
            console.print(f"[red]Issue '{ticket_id}' not found.[/red]")
            raise SystemExit(1)
        pending_rituals = client.get_pending_issue_rituals(issue["id"])
        rituals_list = pending_rituals.get("pending_rituals", [])
        if not rituals_list:
            console.print(f"[green]No pending rituals for {ticket_id}.[/green]")
            return
        console.print(f"\n[bold]Pending Rituals for {ticket_id}:[/bold]")
        for r in rituals_list:
            mode = f"[dim]({r.get('approval_mode', 'auto')})[/dim]"
            if r.get("attestation"):
                if r["attestation"].get("approved_at"):
                    console.print(f"  [green]✓[/green] {r['name']} {mode}")
                else:
                    console.print(f"  [yellow]⏳[/yellow] {r['name']} {mode} - attested, pending approval")
            else:
                console.print(f"  [red]○[/red] {r['name']} {mode}")
                _print_ritual_prompt(r['prompt'])
        return

    status = client.get_limbo_status(project_id)

    if status["in_limbo"]:
        console.print(Panel(
            "[yellow]Sprint is in LIMBO[/yellow]\n"
            "Complete pending rituals to continue.",
            title="Limbo Status"
        ))

    if status["pending_rituals"]:
        console.print("\n[bold]Pending Sprint Rituals:[/bold]")
        for r in status["pending_rituals"]:
            mode = f"[dim]({r['approval_mode']})[/dim]"
            if r.get("attestation"):
                if r["attestation"].get("approved_at"):
                    console.print(f"  [green]✓[/green] {r['name']} {mode}")
                else:
                    console.print(f"  [yellow]⏳[/yellow] {r['name']} {mode} - attested, pending approval")
            else:
                console.print(f"  [red]○[/red] {r['name']} {mode}")
                _print_ritual_prompt(r['prompt'])

    # Skip completed rituals if --pending flag is set
    if status["completed_rituals"] and not pending:
        console.print("\n[bold]Completed Sprint Rituals:[/bold]")
        for r in status["completed_rituals"]:
            console.print(f"  [green]✓[/green] {r['name']}")

    # Always show all configured rituals grouped by trigger type
    rituals = client.get_rituals(project_id, include_inactive=deleted)
    if rituals:
        sprint_rituals = [r for r in rituals if r.get("trigger", "every_sprint") == "every_sprint"]
        ticket_close_rituals = [r for r in rituals if r.get("trigger") == "ticket_close"]
        ticket_claim_rituals = [r for r in rituals if r.get("trigger") == "ticket_claim"]

        if not status["pending_rituals"] and not status["completed_rituals"]:
            # Not in limbo, show all configured rituals
            if sprint_rituals:
                console.print("\n[bold]Sprint-Close Rituals:[/bold]")
                for r in sprint_rituals:
                    console.print(_format_ritual_line(r))
                    _print_ritual_prompt(r['prompt'])

        if ticket_close_rituals:
            console.print("\n[bold]Ticket-Close Rituals:[/bold]")
            for r in ticket_close_rituals:
                console.print(_format_ritual_line(r))
                _print_ritual_prompt(r['prompt'])
            console.print("  [dim]Use 'chaotic ritual attest <name> --ticket <issue>' to attest.[/dim]")

        if ticket_claim_rituals:
            console.print("\n[bold]Ticket-Claim Rituals:[/bold]")
            for r in ticket_claim_rituals:
                console.print(_format_ritual_line(r))
                _print_ritual_prompt(r['prompt'])
            console.print("  [dim]Use 'chaotic ritual attest <name> --ticket <issue>' to attest.[/dim]")

    if not rituals:
        console.print("[yellow]No rituals configured for this project.[/yellow]")
        console.print("[dim]Create rituals with 'chaotic ritual create'.[/dim]")


@ritual.command("attest")
@click.argument("ritual_name")
@click.option("--note", "--notes", help="Note about the attestation (required by default; error shows ritual prompt if omitted)")
@click.option("--ticket", "ticket_id", help="Issue identifier for ticket-level rituals (e.g., CHT-123)")
@require_project
@handle_error
def ritual_attest(ritual_name, note, ticket_id):
    """Attest to a ritual (confirm you did it).

    RITUAL_NAME is the name of the ritual to attest.

    For ticket-level rituals (close or claim), use --ticket to specify the issue.
    """
    project_id = get_current_project()

    # Get rituals to find the ID
    rituals = client.get_rituals(project_id)
    ritual = next((r for r in rituals if r["name"] == ritual_name), None)

    if not ritual:
        console.print(f"[red]Ritual '{ritual_name}' not found.[/red]")
        console.print("Run `chaotic ritual list` to see available rituals.")
        raise SystemExit(1)

    # Check if note is required (reject empty/whitespace-only notes)
    if ritual.get("note_required", True) and not (note and note.strip()):
        console.print("[red]Error: Attestation requires a note.[/red]")
        console.print()
        console.print(f"[bold]This ritual asks:[/bold] \"{ritual['prompt']}\"")
        console.print()
        if ticket_id:
            console.print(f"[dim]Usage: chaotic ritual attest {ritual_name} --ticket {ticket_id} --note \"your note here\"[/dim]")
        else:
            console.print(f"[dim]Usage: chaotic ritual attest {ritual_name} --note \"your note here\"[/dim]")
        raise SystemExit(1)

    # Check if this is a ticket-level ritual (close or claim)
    if ritual.get("trigger") in ("ticket_close", "ticket_claim"):
        if not ticket_id:
            trigger_type = "ticket-close" if ritual.get("trigger") == "ticket_close" else "ticket-claim"
            console.print(f"[red]Ritual '{ritual_name}' is a {trigger_type} ritual. Use --ticket <issue-id>.[/red]")
            raise SystemExit(1)

        # Get the issue to get its ID
        issue = client.get_issue_by_identifier(ticket_id)
        result = client.attest_ritual_for_issue(ritual["id"], issue["id"], note)

        if result.get("approved_at"):
            console.print(f"[green]Ritual '{ritual_name}' cleared for {ticket_id}.[/green]")
        else:
            console.print(f"[yellow]Ritual '{ritual_name}' attested for {ticket_id}, pending human approval.[/yellow]")
    else:
        # Sprint ritual
        if ticket_id:
            console.print(f"[yellow]Note: --ticket ignored for sprint rituals.[/yellow]")

        result = client.attest_ritual(ritual["id"], project_id, note)

        if result.get("approved_at"):
            # Check if limbo cleared
            status = client.get_limbo_status(project_id)
            if not status["in_limbo"]:
                console.print(f"[green]Ritual '{ritual_name}' cleared. Limbo complete.[/green]")
            else:
                pending = len(status["pending_rituals"])
                console.print(f"[green]Ritual '{ritual_name}' cleared.[/green] {pending} remaining.")
                console.print("Run `chaotic ritual list` to continue.")
        else:
            console.print(f"[yellow]Ritual '{ritual_name}' attested, pending human approval.[/yellow]")


@ritual.command("create")
@click.argument("name")
@click.argument("ritual_prompt")
@click.option("--mode", default="auto", type=click.Choice(["auto", "review", "gate"]),
              help="Approval mode: auto (agent clears), review (human approves), gate (human only)")
@click.option("--trigger", default="every_sprint", type=click.Choice(["every_sprint", "ticket_close", "ticket_claim"]),
              help="When ritual is required: every_sprint, ticket_close (when closing), or ticket_claim (when claiming)")
@click.option("--note-required/--no-note-required", default=True,
              help="Require a note when attesting (default: required)")
@click.option("--group", help="Name of ritual group to add this ritual to (for random/rotation selection)")
@click.option("--weight", type=float, default=1.0, help="Weight for random selection in group (default: 1.0)")
@click.option("--percentage", type=float, help="Percentage chance (0-100) for PERCENTAGE mode groups")
@require_project
@handle_error
def ritual_create(name, ritual_prompt, mode, trigger, note_required, group, weight, percentage):
    """Create a new ritual for the project.

    Triggers:
      every_sprint - Required when closing a sprint (default)
      ticket_close - Required when closing/canceling tickets
      ticket_claim - Required when claiming tickets (moving to in_progress)

    Modes:
      auto   - Agent attestation clears immediately (default)
      review - Agent attests, human must approve
      gate   - Only human can complete (agent cannot attest)

    Groups:
      Add ritual to a group for alternative selection. Use --group to specify.
      For RANDOM_ONE groups, use --weight for weighted selection.
      For PERCENTAGE groups, use --percentage to set chance (0-100).
    """
    project_id = get_current_project()

    # Check if project is in limbo and warn
    status = client.get_limbo_status(project_id)
    if status["in_limbo"]:
        console.print("[yellow]Warning: Project is in limbo. This ritual will be added to the pending rituals list.[/yellow]")
        if not click.confirm("Continue creating ritual?"):
            raise SystemExit(0)

    # Resolve group name to ID if provided
    group_id = None
    if group:
        groups = client.get_ritual_groups(project_id)
        matching = next((g for g in groups if g["name"] == group), None)
        if not matching:
            console.print(f"[red]Ritual group '{group}' not found.[/red]")
            console.print("Run `chaotic ritual group list` to see available groups.")
            raise SystemExit(1)
        group_id = matching["id"]

    result = client.create_ritual(
        project_id,
        name,
        ritual_prompt,
        approval_mode=mode,
        trigger=trigger,
        note_required=note_required,
        group_id=group_id,
        weight=weight,
        percentage=percentage,
    )
    trigger_desc = {"every_sprint": "sprint-close", "ticket_close": "ticket-close", "ticket_claim": "ticket-claim"}.get(trigger, trigger)
    group_info = f" (group: {group})" if group else ""
    console.print(f"[green]Ritual created: {result['name']} ({trigger_desc}){group_info}[/green]")


@ritual.command("update")
@click.argument("ritual_name")
@click.option("--prompt", "new_prompt", help="New prompt text")
@click.option("--name", "new_name", help="New name for the ritual")
@click.option("--mode", type=click.Choice(["auto", "review", "gate"]),
              help="New approval mode")
@click.option("--note-required/--no-note-required", default=None,
              help="Require a note when attesting")
@click.option("--group", help="Name of ritual group (use empty string '' to remove from group)")
@click.option("--weight", type=float, help="Weight for random selection in group")
@click.option("--percentage", type=float, help="Percentage chance (0-100) for PERCENTAGE mode groups")
@click.option("--conditions", help="JSON conditions for when ritual applies (e.g., '{\"estimate__gte\": 3}'). Use '{}' to clear.")
@require_project
@handle_error
def ritual_update(ritual_name, new_prompt, new_name, mode, note_required, group, weight, percentage, conditions):
    """Update a ritual's prompt, name, mode, or group.

    RITUAL_NAME is the current name of the ritual to update.

    Conditions use Django-style lookups:
      estimate__gte: 3    (estimate >= 3)
      estimate__lte: 5    (estimate <= 5)
      priority__in: ["urgent", "high"]
      issue_type__eq: "bug"
    """
    project_id = get_current_project()

    # Get rituals to find the ID
    rituals = client.get_rituals(project_id)
    ritual = next((r for r in rituals if r["name"] == ritual_name), None)

    if not ritual:
        console.print(f"[red]Ritual '{ritual_name}' not found.[/red]")
        console.print("Run `chaotic ritual list` to see available rituals.")
        raise SystemExit(1)

    # Build update kwargs
    kwargs = {}
    if new_prompt:
        kwargs["prompt"] = new_prompt
    if new_name:
        kwargs["name"] = new_name
    if mode:
        kwargs["approval_mode"] = mode
    if note_required is not None:
        kwargs["note_required"] = note_required
    if weight is not None:
        kwargs["weight"] = weight
    if percentage is not None:
        kwargs["percentage"] = percentage
    if conditions is not None:
        import json as json_module
        try:
            kwargs["conditions"] = json_module.loads(conditions)
        except json_module.JSONDecodeError:
            console.print(f"[red]Invalid JSON for conditions: {conditions}[/red]")
            raise SystemExit(1)

    # Handle group: empty string means remove, otherwise resolve name to ID
    if group is not None:
        if group == "":
            kwargs["group_id"] = ""  # Signal to remove from group
        else:
            groups = client.get_ritual_groups(project_id)
            matching = next((g for g in groups if g["name"] == group), None)
            if not matching:
                console.print(f"[red]Ritual group '{group}' not found.[/red]")
                console.print("Run `chaotic ritual group list` to see available groups.")
                raise SystemExit(1)
            kwargs["group_id"] = matching["id"]

    if not kwargs:
        console.print("[yellow]No changes specified. Use --prompt, --name, --mode, --group, --weight, --percentage, or --conditions.[/yellow]")
        raise SystemExit(1)

    result = client.update_ritual(ritual["id"], **kwargs)
    console.print(f"[green]Ritual '{result['name']}' updated.[/green]")


@ritual.command("delete")
@click.argument("ritual_name")
@click.option("--yes", "-y", is_flag=True, help="Skip confirmation")
@require_project
@handle_error
def ritual_delete(ritual_name, yes):
    """Delete (deactivate) a ritual.

    RITUAL_NAME is the name of the ritual to delete.

    This soft-deletes the ritual, preserving attestation history.
    The ritual will no longer appear in lists or be required for new tickets/sprints.
    """
    project_id = get_current_project()

    # Get rituals to find the ID
    rituals = client.get_rituals(project_id)
    ritual = next((r for r in rituals if r["name"] == ritual_name), None)

    if not ritual:
        console.print(f"[red]Ritual '{ritual_name}' not found.[/red]")
        console.print("Run `chaotic ritual list` to see available rituals.")
        raise SystemExit(1)

    if not yes:
        if not click.confirm(f"Delete ritual '{ritual_name}'?"):
            console.print("[yellow]Cancelled.[/yellow]")
            raise SystemExit(0)

    client.delete_ritual(ritual["id"])
    console.print(f"[green]Ritual '{ritual_name}' deleted.[/green]")


@ritual.command("restore")
@click.argument("ritual_name")
@require_project
@handle_error
def ritual_restore(ritual_name):
    """Restore a deleted (inactive) ritual.

    RITUAL_NAME is the name of the ritual to restore.

    Use 'chaotic ritual list --deleted' to see deleted rituals.
    """
    project_id = get_current_project()

    # Search including inactive rituals
    rituals = client.get_rituals(project_id, include_inactive=True)
    ritual = next((r for r in rituals if r["name"] == ritual_name), None)

    if not ritual:
        console.print(f"[red]Ritual '{ritual_name}' not found.[/red]")
        console.print("Run `chaotic ritual list --deleted` to see deleted rituals.")
        raise SystemExit(1)

    if ritual.get("is_active", True):
        console.print(f"[yellow]Ritual '{ritual_name}' is already active.[/yellow]")
        return

    client.update_ritual(ritual["id"], is_active=True)
    console.print(f"[green]Ritual '{ritual_name}' restored.[/green]")


@ritual.command("status")
@click.argument("identifier", required=False)
@click.option("--ticket", "ticket_id", help="Show ticket-level ritual status for an issue (e.g., CHT-123)")
@require_project
@handle_error
def ritual_status(identifier, ticket_id):
    """Check limbo status or ticket ritual status.

    Without IDENTIFIER or --ticket: shows sprint limbo status.
    With IDENTIFIER or --ticket: shows ticket-level ritual status for that issue.

    Examples:
        chaotic ritual status CHT-123
        chaotic ritual status --ticket CHT-123
    """
    project_id = get_current_project()

    # Positional argument takes precedence, fall back to --ticket option
    effective_ticket_id = identifier or ticket_id

    if effective_ticket_id:
        # Show ticket-level ritual status
        effective_ticket_id = effective_ticket_id.strip()
        if not effective_ticket_id:
            console.print("[red]Ticket ID cannot be empty.[/red]")
            return

        issue = client.get_issue_by_identifier(effective_ticket_id)
        status = client.get_pending_issue_rituals(issue["id"])
        pending = status.get("pending_rituals", [])
        completed = status.get("completed_rituals", [])

        if not pending and not completed:
            console.print(f"[dim]No ticket-level rituals configured for this project.[/dim]")
            return

        console.print(f"[bold]Ticket-level rituals for {effective_ticket_id}:[/bold]")

        for r in completed:
            console.print(f"  [green]✓[/green] {r['name']}")
            # Show attestation details for completed rituals
            if r.get("attestation"):
                att = r["attestation"]
                if att.get("note"):
                    console.print(f"      [dim]Note: {att['note']}[/dim]")
                if att.get("attested_at"):
                    attested_date = att["attested_at"][:10]
                    console.print(f"      [dim]Attested: {attested_date}[/dim]")

        for r in pending:
            mode = f"[dim]({r['approval_mode']})[/dim]"
            if r.get("attestation"):
                if r["attestation"].get("approved_at"):
                    console.print(f"  [green]✓[/green] {r['name']} {mode}")
                else:
                    console.print(f"  [yellow]⏳[/yellow] {r['name']} {mode} - pending approval")
                    # Show attestation note for pending approval
                    att = r["attestation"]
                    if att.get("note"):
                        console.print(f"      [dim]Note: {att['note']}[/dim]")
            else:
                console.print(f"  [red]○[/red] {r['name']} {mode}")
                _print_ritual_prompt(r['prompt'])

        if pending:
            console.print(f"\n[dim]Run 'chaotic ritual attest <name> --ticket {effective_ticket_id}' to attest.[/dim]")
    else:
        # Show sprint limbo status
        status = client.get_limbo_status(project_id)

        if status["in_limbo"]:
            pending_count = len(status["pending_rituals"])
            console.print(f"[yellow]IN LIMBO[/yellow] - {pending_count} ritual(s) pending")
            for r in status["pending_rituals"]:
                if r.get("attestation") and not r["attestation"].get("approved_at"):
                    console.print(f"  [yellow]⏳[/yellow] {r['name']} - pending approval")
                else:
                    console.print(f"  [red]○[/red] {r['name']}")
        else:
            console.print("[green]Not in limbo[/green]")


@ritual.command("approve")
@click.argument("ritual_name")
@require_project
@handle_error
def ritual_approve(ritual_name):
    """Approve a ritual attestation (admin only, for REVIEW mode)."""
    project_id = get_current_project()

    # Get rituals to find the ID
    rituals = client.get_rituals(project_id)
    ritual = next((r for r in rituals if r["name"] == ritual_name), None)

    if not ritual:
        console.print(f"[red]Ritual '{ritual_name}' not found.[/red]")
        console.print("Run `chaotic ritual list` to see available rituals.")
        raise SystemExit(1)

    result = client.approve_ritual(ritual["id"], project_id)

    # Check if limbo cleared
    status = client.get_limbo_status(project_id)
    if not status["in_limbo"]:
        console.print(f"[green]Ritual '{ritual_name}' approved. Limbo complete.[/green]")
    else:
        pending = len(status["pending_rituals"])
        console.print(f"[green]Ritual '{ritual_name}' approved.[/green] {pending} remaining.")
        console.print("Run `chaotic ritual list` to continue.")


@ritual.command("complete")
@click.argument("ritual_name")
@click.option("--note", help="Optional note about completion")
@click.option("--ticket", "ticket_id", help="Issue identifier for ticket-level rituals (e.g., CHT-123)")
@require_project
@handle_error
def ritual_complete(ritual_name, note, ticket_id):
    """Complete a GATE mode ritual (human-only, admin only).

    For ticket-level rituals (close or claim), use --ticket to specify the issue.
    """
    project_id = get_current_project()

    # Get rituals to find the ID
    rituals = client.get_rituals(project_id)
    ritual = next((r for r in rituals if r["name"] == ritual_name), None)

    if not ritual:
        console.print(f"[red]Ritual '{ritual_name}' not found.[/red]")
        console.print("Run `chaotic ritual list` to see available rituals.")
        raise SystemExit(1)

    # Check if this is a ticket-level ritual (close or claim)
    if ritual.get("trigger") in ("ticket_close", "ticket_claim"):
        if not ticket_id:
            trigger_type = "ticket-close" if ritual.get("trigger") == "ticket_close" else "ticket-claim"
            console.print(f"[red]Ritual '{ritual_name}' is a {trigger_type} ritual. Use --ticket <issue-id>.[/red]")
            raise SystemExit(1)

        # Get the issue to get its ID
        issue = client.get_issue_by_identifier(ticket_id)
        result = client.complete_gate_ritual_for_issue(ritual["id"], issue["id"], note)
        console.print(f"[green]Ritual '{ritual_name}' completed for {ticket_id}.[/green]")
    else:
        # Sprint ritual
        if ticket_id:
            console.print(f"[yellow]Note: --ticket ignored for sprint rituals.[/yellow]")

        result = client.complete_gate_ritual(ritual["id"], project_id, note)

        # Check if limbo cleared
        status = client.get_limbo_status(project_id)
        if not status["in_limbo"]:
            console.print(f"[green]Ritual '{ritual_name}' completed. Limbo complete.[/green]")
        else:
            pending = len(status["pending_rituals"])
            console.print(f"[green]Ritual '{ritual_name}' completed.[/green] {pending} remaining.")
            console.print("Run `chaotic ritual list` to continue.")


@ritual.command("force-clear")
@click.option("--yes", "-y", is_flag=True, help="Skip confirmation prompt")
@require_project
@handle_error
def ritual_force_clear(yes):
    """Force-clear limbo without completing rituals (admin only).

    This allows admins to skip rituals if the team decides to abort a limbo cycle.
    The sprint will be completed and the next sprint activated without attestations.
    """
    project_id = get_current_project()

    # Check if in limbo
    status = client.get_limbo_status(project_id)
    if not status["in_limbo"]:
        console.print("[yellow]Project is not in limbo.[/yellow]")
        return

    pending_count = len(status["pending_rituals"])

    if not yes:
        console.print(f"[yellow]Warning: This will skip {pending_count} pending ritual(s).[/yellow]")
        if not click.confirm("Are you sure you want to force-clear limbo?"):
            console.print("[dim]Cancelled.[/dim]")
            return

    result = client.force_clear_limbo(project_id)
    next_name = result.get("next_sprint_name", "the next sprint")
    console.print(f"[green]Limbo cleared. {next_name} is now active.[/green]")


# Ritual Group commands
@ritual.group("group")
def ritual_group():
    """Ritual group management commands.

    Groups allow configuring alternative selection for rituals:
    - RANDOM_ONE: Pick one ritual randomly (weighted)
    - ROUND_ROBIN: Rotate through rituals per sprint
    - PERCENTAGE: Each ritual has independent X% chance
    """
    pass


@ritual_group.command("list")
@require_project
@handle_error
def ritual_group_list():
    """List ritual groups for the project."""
    project_id = get_current_project()
    groups = client.get_ritual_groups(project_id)

    if not groups:
        console.print("[yellow]No ritual groups configured.[/yellow]")
        console.print("[dim]Create groups with 'chaotic ritual group create'.[/dim]")
        return

    console.print("[bold]Ritual Groups:[/bold]\n")
    for group in groups:
        mode_desc = {
            "random_one": "Random (pick one weighted)",
            "round_robin": "Round-robin (rotate per sprint)",
            "percentage": "Percentage (independent chance)",
        }.get(group["selection_mode"], group["selection_mode"])

        console.print(f"  [cyan]{group['name']}[/cyan] - {mode_desc}")

        # Show rituals in this group
        rituals = client.get_rituals(project_id)
        group_rituals = [r for r in rituals if r.get("group_id") == group["id"]]
        if group_rituals:
            for r in group_rituals:
                if group["selection_mode"] == "percentage":
                    pct = r.get("percentage", 0)
                    console.print(f"    • {r['name']} ({pct}%)")
                else:
                    weight = r.get("weight", 1.0)
                    console.print(f"    • {r['name']} (weight: {weight})")
        else:
            console.print("    [dim](no rituals in group)[/dim]")
        console.print()


@ritual_group.command("create")
@click.argument("name")
@click.option("--mode", default="random_one",
              type=click.Choice(["random_one", "round_robin", "percentage"]),
              help="Selection mode (default: random_one)")
@require_project
@handle_error
def ritual_group_create(name, mode):
    """Create a ritual group.

    NAME is the group name (e.g., "weekly-mindfulness").

    Selection modes:
      random_one  - Pick one ritual randomly (weighted) per sprint
      round_robin - Rotate through rituals per sprint
      percentage  - Each ritual has independent X% chance
    """
    project_id = get_current_project()
    result = client.create_ritual_group(project_id, name, mode)
    console.print(f"[green]Ritual group created: {result['name']} ({mode})[/green]")


@ritual_group.command("update")
@click.argument("name")
@click.option("--new-name", help="New name for the group")
@click.option("--mode", type=click.Choice(["random_one", "round_robin", "percentage"]),
              help="New selection mode")
@require_project
@handle_error
def ritual_group_update(name, new_name, mode):
    """Update a ritual group.

    NAME is the current name of the group to update.
    """
    project_id = get_current_project()

    # Get groups to find the ID
    groups = client.get_ritual_groups(project_id)
    group = next((g for g in groups if g["name"] == name), None)

    if not group:
        console.print(f"[red]Ritual group '{name}' not found.[/red]")
        console.print("Run `chaotic ritual group list` to see available groups.")
        raise SystemExit(1)

    kwargs = {}
    if new_name:
        kwargs["name"] = new_name
    if mode:
        kwargs["selection_mode"] = mode

    if not kwargs:
        console.print("[yellow]No changes specified. Use --new-name or --mode.[/yellow]")
        raise SystemExit(1)

    result = client.update_ritual_group(group["id"], **kwargs)
    console.print(f"[green]Ritual group '{result['name']}' updated.[/green]")


@ritual_group.command("delete")
@click.argument("name")
@click.option("--yes", "-y", is_flag=True, help="Skip confirmation")
@require_project
@handle_error
def ritual_group_delete(name, yes):
    """Delete a ritual group.

    NAME is the name of the group to delete.

    Rituals in the group will be ungrouped (not deleted).
    """
    project_id = get_current_project()

    # Get groups to find the ID
    groups = client.get_ritual_groups(project_id)
    group = next((g for g in groups if g["name"] == name), None)

    if not group:
        console.print(f"[red]Ritual group '{name}' not found.[/red]")
        console.print("Run `chaotic ritual group list` to see available groups.")
        raise SystemExit(1)

    if not yes:
        if not click.confirm(f"Delete ritual group '{name}'? (rituals will be ungrouped)"):
            console.print("[dim]Cancelled.[/dim]")
            return

    client.delete_ritual_group(group["id"])
    console.print(f"[green]Ritual group '{name}' deleted. Rituals ungrouped.[/green]")


# Document commands
@cli.group()
def doc():
    """Document management commands."""
    pass


@doc.command("list")
@click.option("--search", help="Search documents by title")
@click.option("--project", help="Filter by project (ID, key, or name)")
@click.option("--sprint", help="Filter by sprint (ID, name, or 'current')")
@click.option("--all", "show_all", is_flag=True, help="Show all docs (not just current project)")
@json_option
@require_team
@handle_error
def doc_list(search, project, sprint, show_all):
    """List documents in current team."""
    project_id = None
    sprint_id = None
    if project:
        project_id = resolve_project_id(project)
    elif not show_all:
        # Default to current project if set
        project_id = get_current_project()

    if sprint:
        proj = project_id or get_current_project()
        if proj:
            sprint_id = resolve_sprint_id(sprint, proj)
        else:
            console.print("[yellow]Warning: --sprint ignored (no project context)[/yellow]")

    documents = client.get_documents(get_current_team(), project_id=project_id, sprint_id=sprint_id, search=search)
    if is_json_output():
        output_json(documents or [])
        return
    if not documents:
        console.print("[yellow]No documents found.[/yellow]")
        return

    table = Table(title="Documents")
    table.add_column("ID", style="dim")
    table.add_column("Title")
    table.add_column("Scope", style="cyan")
    table.add_column("Updated")

    for d in documents:
        scope = "Global" if not d.get("project_id") else ("Sprint" if d.get("sprint_id") else "Project")
        table.add_row(
            d["id"][:8] + "...",
            d["title"][:50] + ("..." if len(d["title"]) > 50 else ""),
            scope,
            d["updated_at"][:10]
        )

    console.print(table)


@doc.command("create")
@click.argument("title_words", nargs=-1)
@click.option("--title", "title_opt", help="Document title (alternative to positional argument)")
@click.option("--content", "--body", default="")
@click.option("--icon", default="")
@click.option("--project", help="Project to attach doc to (ID, key, or name). Omit for global/team-wide.")
@click.option("--sprint", help="Sprint to attach doc to (ID, name, or 'current')")
@click.option("--global", "is_global", is_flag=True, help="Create as global doc (not attached to current project)")
@json_option
@require_team
@handle_error
def doc_create(title_words, title_opt, content, icon, project, sprint, is_global):
    """Create a new document.

    TITLE can be provided as positional argument(s) or with --title.
    Multiple words are joined: `doc create Sprint 24 Report` → "Sprint 24 Report"
    """
    # Allow --title as alternative to positional argument
    title = " ".join(title_words) if title_words else title_opt
    if not title:
        raise click.UsageError("Missing title. Provide as argument or with --title.")
    project_id = None
    sprint_id = None
    if project:
        project_id = resolve_project_id(project)
    elif not is_global:
        # Default to current project if set
        project_id = get_current_project()

    if sprint:
        proj = project_id or get_current_project()
        if proj:
            sprint_id = resolve_sprint_id(sprint, proj)
        else:
            console.print("[yellow]Warning: --sprint ignored (no project context)[/yellow]")

    data = {"content": content or None, "icon": icon or None, "project_id": project_id, "sprint_id": sprint_id}
    result = client.create_document(get_current_team(), title, **data)
    if is_json_output():
        output_json(result)
        return
    scope = "sprint" if sprint_id else ("project" if project_id else "global")
    console.print(f"[green]Document created ({scope}): {result['title']}[/green]")


@doc.command("show")
@click.argument("document_id")
@click.option("--comments", is_flag=True, help="Show document comments")
@json_option
@require_auth
@handle_error
def doc_show(document_id, comments):
    """Show document content.

    DOCUMENT_ID can be a full ID, title, or a prefix.
    """
    team_id = get_current_team()
    document_id = resolve_document_id(document_id, team_id)

    d = client.get_document(document_id)
    if is_json_output():
        if comments:
            d['comments'] = client.get_document_comments(d['id'])
        d['linked_issues'] = client.get_document_issues(d['id'])
        output_json(d)
        return
    content = d.get('content') or 'No content'
    # Build subtitle with author and scope
    subtitle_parts = []
    if d.get('author_name'):
        subtitle_parts.append(f"By {d['author_name']}")
    if d.get("sprint_id"):
        scope = "Sprint-scoped"
    elif d.get("project_id"):
        scope = "Project-scoped"
    else:
        scope = "Global"
    subtitle_parts.append(scope)
    subtitle = " | ".join(subtitle_parts)
    # Render content as markdown
    md_content = Markdown(content)
    console.print(Panel(
        md_content,
        title=f"{d.get('icon') or ''} {d['title']}".strip(),
        subtitle=subtitle
    ))

    # Show linked issues
    linked_issues = client.get_document_issues(d['id'])
    if linked_issues:
        console.print("\n[bold]Linked Issues:[/bold]")
        for issue in linked_issues:
            status_color = get_status_color(issue.get('status', 'backlog'))
            console.print(f"  • [{status_color}]{issue['identifier']}[/{status_color}] {issue['title']}")

    # Show comments if requested
    if comments:
        doc_comments = client.get_document_comments(d['id'])
        if doc_comments:
            console.print("\n[bold]Comments:[/bold]")
            for c in doc_comments:
                # Format date if available
                created_at = c.get('created_at', '')
                if created_at:
                    try:
                        from datetime import datetime
                        dt = datetime.fromisoformat(created_at.replace('Z', '+00:00'))
                        date_str = dt.strftime('%Y-%m-%d %H:%M')
                    except (ValueError, AttributeError):
                        date_str = created_at[:16] if len(created_at) > 16 else created_at
                    console.print(f"  • [dim]{c.get('author_name', 'User')} ({date_str}):[/dim]")
                else:
                    console.print(f"  • [dim]{c.get('author_name', 'User')}:[/dim]")
                console.print(Markdown(c.get('content', '')))
        else:
            console.print("\n[dim]No comments[/dim]")


@doc.command("comment")
@click.argument("document_id")
@click.argument("content")
@require_auth
@handle_error
def doc_comment(document_id, content):
    """Add a comment to a document.

    DOCUMENT_ID can be a full ID, title, or a prefix.
    """
    team_id = get_current_team()
    document_id = resolve_document_id(document_id, team_id)
    client.create_document_comment(document_id, content)
    console.print("[green]Comment added.[/green]")


@doc.command("update")
@click.argument("document_id")
@click.option("--title")
@click.option("--content")
@click.option("--icon")
@click.option("--project", help="Move to project (ID, key, or name)")
@click.option("--sprint", help="Attach to sprint (ID, name, or 'current')")
@click.option("--no-sprint", "no_sprint", is_flag=True, help="Remove from sprint")
@click.option("--global", "is_global", is_flag=True, help="Make global (remove from project)")
@require_auth
@handle_error
def doc_update(document_id, title, content, icon, project, sprint, no_sprint, is_global):
    """Update a document.

    DOCUMENT_ID can be a full ID, title, or a prefix.
    """
    team_id = get_current_team()
    document_id = resolve_document_id(document_id, team_id)

    data = {}
    if title:
        data["title"] = title
    if content is not None:
        data["content"] = content
    if icon is not None:
        data["icon"] = icon
    if project:
        data["project_id"] = resolve_project_id(project)
    elif is_global:
        data["project_id"] = None
    if sprint:
        proj = get_current_project()
        if proj:
            data["sprint_id"] = resolve_sprint_id(sprint, proj)
        else:
            console.print("[yellow]Warning: --sprint ignored (no project context)[/yellow]")
    elif no_sprint:
        data["sprint_id"] = None

    if not data:
        console.print("[yellow]No updates provided.[/yellow]")
        return

    client.update_document(document_id, **data)
    console.print("[green]Document updated.[/green]")


@doc.command("delete")
@click.argument("document_id")
@click.confirmation_option(prompt="Are you sure you want to delete this document?")
@require_auth
@handle_error
def doc_delete(document_id):
    """Delete a document.

    DOCUMENT_ID can be a full ID, title, or a prefix.
    """
    team_id = get_current_team()
    document_id = resolve_document_id(document_id, team_id)

    client.delete_document(document_id)
    console.print("[green]Document deleted.[/green]")


@doc.command("link")
@click.argument("document_id")
@click.argument("issue_identifier")
@require_auth
@handle_error
def doc_link(document_id, issue_identifier):
    """Link a document to an issue.

    DOCUMENT_ID can be a full ID, title, or a prefix.
    ISSUE_IDENTIFIER is the issue identifier (e.g., CHT-123).
    """
    team_id = get_current_team()
    document_id = resolve_document_id(document_id, team_id)

    # Resolve issue
    issue = client.get_issue_by_identifier(issue_identifier)
    issue_id = issue['id']

    client.link_document_to_issue(document_id, issue_id)
    console.print(f"[green]Document linked to {issue_identifier}.[/green]")


@doc.command("unlink")
@click.argument("document_id")
@click.argument("issue_identifier")
@require_auth
@handle_error
def doc_unlink(document_id, issue_identifier):
    """Unlink a document from an issue.

    DOCUMENT_ID can be a full ID, title, or a prefix.
    ISSUE_IDENTIFIER is the issue identifier (e.g., CHT-123).
    """
    team_id = get_current_team()
    document_id = resolve_document_id(document_id, team_id)

    # Resolve issue
    issue = client.get_issue_by_identifier(issue_identifier)
    issue_id = issue['id']

    client.unlink_document_from_issue(document_id, issue_id)
    console.print(f"[green]Document unlinked from {issue_identifier}.[/green]")


@doc.command("open")
@click.argument("document_id")
@require_auth
@handle_error
def doc_open(document_id):
    """Open document in browser.

    DOCUMENT_ID can be a full ID, title, or a prefix.
    """
    team_id = get_current_team()
    document_id = resolve_document_id(document_id, team_id)
    web_url = get_web_url()
    url = f"{web_url}/document/{document_id}"
    console.print(f"[dim]Opening {url}...[/dim]")
    webbrowser.open(url)


# Label commands
@cli.group()
def label():
    """Label management commands."""
    pass


@label.command("list")
@json_option
@require_team
@handle_error
def label_list():
    """List labels in current team."""
    labels = client.get_labels(get_current_team())
    if is_json_output():
        output_json(labels or [])
        return
    if not labels:
        console.print("[yellow]No labels found.[/yellow]")
        return

    table = Table(title="Labels")
    table.add_column("ID", style="dim")
    table.add_column("Name")
    table.add_column("Color")

    for l in labels:
        table.add_row(l["id"][:8] + "...", l["name"], l["color"])

    console.print(table)


@label.command("create")
@click.argument("name")
@click.option("--color", default="#6366f1")
@click.option("--description", default="")
@require_team
@handle_error
def label_create(name, color, description):
    """Create a new label."""
    result = client.create_label(get_current_team(), name, color=color, description=description or None)
    console.print(f"[green]Label created: {result['name']}[/green]")


@label.command("delete")
@click.argument("label_id")
@click.confirmation_option(prompt="Are you sure you want to delete this label?")
@require_auth
@handle_error
def label_delete(label_id):
    """Delete a label.

    LABEL_ID can be a full ID, name, or a prefix.
    """
    team_id = get_current_team()
    label_id = resolve_label_id(label_id, team_id)

    client.delete_label(label_id)
    console.print("[green]Label deleted.[/green]")


# =============================================================================
# Agent Commands
# =============================================================================

@cli.group()
def agent():
    """Agent management commands."""
    pass


@agent.command("create")
@click.argument("name")
@click.option("--project", "-p", is_flag=True, help="Create project-scoped agent (otherwise team-scoped)")
@require_team
@handle_error
def agent_create(name, project):
    """Create a new agent.

    NAME is the display name for the agent (e.g., 'claude-bot').

    By default, creates a team-scoped agent that can access all projects in the team.
    Use --project to create a project-scoped agent that can only access the current project.

    The API key is displayed only once - save it immediately!

    Examples:
        chaotic agent create claude-bot
        chaotic agent create ci-bot --project
    """
    team_id = get_current_team()

    if project:
        project_id = get_current_project()
        if not project_id:
            console.print("[red]No project selected. Run 'chaotic project use <project_id>' first.[/red]")
            raise SystemExit(1)
        result = client.create_project_agent(project_id, name)
        scope_msg = f"project-scoped (project: {project_id[:8]}...)"
    else:
        result = client.create_team_agent(team_id, name)
        scope_msg = "team-scoped"

    console.print(f"[green]Agent '{result['name']}' created ({scope_msg}).[/green]")
    console.print()
    console.print("[bold yellow]API Key (save this - it won't be shown again!):[/bold yellow]")
    console.print(f"[cyan]{result['api_key']}[/cyan]")
    console.print()
    console.print("To configure the CLI with this agent's key:")
    console.print(f"  chaotic auth set-key {result['api_key']}")


@agent.command("list")
@json_option
@require_team
@handle_error
def agent_list():
    """List agents in current team."""
    team_id = get_current_team()
    agents = client.get_team_agents(team_id)
    if is_json_output():
        output_json(agents or [])
        return

    if not agents:
        console.print("[yellow]No agents found.[/yellow]")
        console.print("Create one with: chaotic agent create <name>")
        return

    table = Table(title="Agents")
    table.add_column("ID", style="dim")
    table.add_column("Name")
    table.add_column("Scope")
    table.add_column("Created By")
    table.add_column("Created At")

    for a in agents:
        agent_id = a["id"][:8] + "..."
        name = a["name"]
        if a.get("agent_project_id"):
            scope = f"Project: {a['agent_project_id'][:8]}..."
        else:
            scope = "Team-wide"
        created_by = a.get("parent_user_name", "Unknown")
        created_at = a["created_at"][:10]
        table.add_row(agent_id, name, scope, created_by, created_at)

    console.print(table)


@agent.command("delete")
@click.argument("agent_id")
@click.confirmation_option(prompt="Are you sure you want to delete this agent? This will revoke all its API keys.")
@require_team
@handle_error
def agent_delete(agent_id):
    """Delete an agent and revoke all its API keys.

    AGENT_ID can be the full agent ID or a prefix (e.g., the first 8 characters).
    """
    # Try to find the agent by prefix if not a full ID
    team_id = get_current_team()
    agents = client.get_team_agents(team_id)

    # Find agent by ID or prefix
    agent = None
    for a in agents:
        if a["id"] == agent_id or a["id"].startswith(agent_id):
            if agent is not None:
                console.print(f"[red]Ambiguous agent ID prefix '{agent_id}'. Please be more specific.[/red]")
                raise SystemExit(1)
            agent = a

    if not agent:
        console.print(f"[red]Agent '{agent_id}' not found.[/red]")
        raise SystemExit(1)

    client.delete_agent(agent["id"])
    console.print(f"[green]Agent '{agent['name']}' deleted.[/green]")


# Register system commands
cli.add_command(system)


if __name__ == "__main__":
    cli()
