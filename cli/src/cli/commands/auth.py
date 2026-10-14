"""Authentication commands."""
import sys
from datetime import datetime, timedelta, timezone

import click
from rich.markup import escape
from rich.panel import Panel
from rich.table import Table

from .shared import _client, console, parse_duration


# How the consent screen labels an app (frontend/src/oauth-consent.js).
TRUST_LABELS = {
    "builtin": "official Chaotic app",
    "recognized": "recognized",
    "cimd": "identified by its website",
    "unverified": "unverified (registered itself)",
}


def _app_name(connection) -> str:
    client = connection.get("client") or {}
    return client.get("name") or client.get("client_id") or "unknown app"


def _trust_label(connection) -> str:
    client = connection.get("client") or {}
    label = TRUST_LABELS.get(client.get("trust"), TRUST_LABELS["unverified"])
    return f"{label} · {client['host']}" if client.get("host") else label


def _main():
    """Late-bind to cli.main for test mock compatibility."""
    return sys.modules['cli.main']


def register(cli):
    """Register auth commands on the CLI group."""

    @cli.group()
    def auth():
        """Authentication commands."""
        pass

    @auth.command("signup")
    @click.option("--name", required=True)
    @click.option("--email", required=True)
    @click.option("--password", required=True)
    @_main().handle_error
    def auth_signup(name, email, password):
        """Create a new account."""
        m = _main()
        _client().signup(name, email, password)
        result = _client().login(email, password)
        m.set_token(result["access_token"])
        console.print("[green]Account created and logged in![/green]")

    @auth.command("login")
    @click.option("--email", required=True)
    @click.option("--password", required=True)
    @_main().handle_error
    def auth_login(email, password):
        """Login to your account."""
        m = _main()
        result = _client().login(email, password)
        m.set_token(result["access_token"])
        console.print("[green]Logged in successfully![/green]")

    @auth.command("logout")
    def auth_logout():
        """Logout from your account."""
        m = _main()
        m.set_token(None)
        m.set_api_key(None)
        m.set_current_team(None)
        m.set_current_project(None)
        console.print("[green]Logged out.[/green]")

    @auth.command("set-key")
    @click.argument("key")
    def auth_set_key(key):
        """Set API key for authentication."""
        if not key.startswith("ck_"):
            console.print("[red]Invalid API key format. Keys should start with 'ck_'[/red]")
            raise SystemExit(1)
        _main().set_api_key(key)
        console.print("[green]API key set successfully![/green]")

    @auth.command("clear-key")
    def auth_clear_key():
        """Clear stored API key."""
        _main().set_api_key(None)
        console.print("[green]API key cleared.[/green]")

    @auth.command("whoami")
    @_main().json_option
    @_main().require_auth
    @_main().handle_error
    def auth_whoami():
        """Show current user info."""
        m = _main()
        user = _client().get_me()
        if m.is_json_output():
            m.output_json(user)
            return
        if user.get("is_agent"):
            identity = "[cyan]AGENT[/cyan]"
            parent_name = user.get("parent_user_name")
            if parent_name:
                identity += f" (parent: {escape(parent_name)})"
        else:
            identity = "human"
        console.print(Panel(
            f"[bold]{escape(user['name'])}[/bold]\n{escape(user['email'])}\n{identity}",
            title="Current User",
        ))

    @auth.group("keys")
    def auth_keys():
        """API key management commands."""
        pass

    @auth_keys.command("list")
    @_main().json_option
    @_main().require_auth
    @_main().handle_error
    def auth_keys_list():
        """List your API keys."""
        m = _main()
        keys = _client().list_api_keys()
        if m.is_json_output():
            m.output_json(keys)
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

        # Server strings, the name the caller's own free text: escaped so
        # "[/red]" cannot break the render nor "[link=...]" add a link.
        for k in keys:
            key_id = k["id"][:8] + "..."
            name = k.get("name") or "Unnamed"
            prefix = k.get("key_prefix") or "-"
            created = (k.get("created_at") or "")[:10] or "-"
            last_used = (k.get("last_used_at") or "")[:10] or "-"
            expires = (k.get("expires_at") or "")[:10] or "-"
            active = "Yes" if k.get("is_active") else "No"
            table.add_row(*(escape(cell) for cell in (key_id, name, prefix, created, last_used, active, expires)))

        console.print(table)

    @auth_keys.command("create")
    @click.argument("name")
    @click.option(
        "--expires-in",
        default=None,
        help="Expire the key after this long (e.g. 90d, 12h, 30m). "
             "Omit for a non-expiring key. Recommended for keys embedded "
             "in URLs (the /mcp/<key> capability URL, see docs/agents.md).",
    )
    @_main().require_auth
    @_main().handle_error
    def auth_keys_create(name, expires_in):
        """Create a new API key.

        The API key is displayed only once - save it immediately!
        """
        expires_at = None
        seconds = parse_duration(expires_in, flag_name="--expires-in")
        if seconds is not None:
            expires_at = (datetime.now(timezone.utc) + timedelta(seconds=seconds)).isoformat()

        result = _client().create_api_key(name, expires_at=expires_at)
        console.print(f"[green]API key '{escape(result['name'])}' created.[/green]")
        if result.get("expires_at"):
            console.print(f"Expires: {escape(result['expires_at'][:19])}Z")
        console.print()
        console.print("[bold yellow]API Key (save this - it won't be shown again!):[/bold yellow]")
        console.print(f"[cyan]{escape(result['key'])}[/cyan]")
        console.print()
        console.print("To configure the CLI with this key:")
        console.print(f"  chaotic auth set-key {escape(result['key'])}")

    @auth_keys.command("revoke")
    @click.argument("key_id")
    @_main().require_auth
    @_main().handle_error
    def auth_keys_revoke(key_id):
        """Revoke an API key.

        KEY_ID can be the full key ID or a prefix (e.g., the first 8 characters).
        """
        m = _main()
        if not m.confirm_action("Are you sure you want to revoke this API key?"):
            raise SystemExit(0)
        keys = _client().list_api_keys()
        key = None
        for k in keys:
            if k["id"] == key_id or k["id"].startswith(key_id):
                if key is not None:
                    console.print(f"[red]Ambiguous key ID prefix '{escape(key_id)}'. Please be more specific.[/red]")
                    raise SystemExit(1)
                key = k

        if not key:
            console.print(f"[red]API key '{escape(key_id)}' not found.[/red]")
            raise SystemExit(1)

        _client().revoke_api_key(key["id"])
        console.print(f"[green]API key '{escape(key['name'])}' revoked.[/green]")

    @auth.group("connections")
    def auth_connections():
        """Your connected apps: the OAuth connections you approved."""
        pass

    @auth_connections.command("list")
    @_main().json_option
    @_main().require_auth
    @_main().handle_error
    def auth_connections_list():
        """List the apps you connected over OAuth, and what each can do."""
        m = _main()
        connections = _client().list_connections()
        if m.is_json_output():
            m.output_json(connections)
            return
        if not connections:
            console.print("[yellow]No connected apps.[/yellow]")
            return

        table = Table(title="Connected Apps")
        table.add_column("ID", style="dim", no_wrap=True)
        table.add_column("App")
        table.add_column("Trust")
        table.add_column("Agent")
        table.add_column("Team")
        table.add_column("Projects")
        table.add_column("Policy")
        table.add_column("Created")
        table.add_column("Last Used")

        # Every string here comes from the server, and the app's name from
        # the app itself: escape it all, so a name like "[/red]" cannot
        # break the render or "[link=...]" inject a hyperlink.
        for c in connections:
            agent = c.get("agent") or {}
            projects = c.get("project_ids")
            if c.get("acts_as") == "person":
                # A built-in app signed in as you on one device (CHT-1602).
                device = c.get("device_name")
                acts_as = f"you ({device})" if device else "you"
            else:
                acts_as = agent.get("name") or "-"
            table.add_row(
                escape(c["id"][:8]),
                escape(_app_name(c)),
                escape(_trust_label(c)),
                escape(acts_as),
                escape(c.get("team_name") or "-"),
                "all" if projects is None else str(len(projects)),
                escape(c.get("policy") or "-"),
                escape((c.get("created_at") or "")[:10] or "-"),
                escape((c.get("last_used_at") or "")[:10] or "-"),
            )

        console.print(table)

    @auth_connections.command("revoke")
    @click.argument("connection_id")
    @_main().require_auth
    @_main().handle_error
    def auth_connections_revoke(connection_id):
        """Disconnect an app: its tokens stop working on its next request.

        CONNECTION_ID can be the full ID or a prefix (e.g., the first 8 characters).
        """
        m = _main()
        matches = [c for c in _client().list_connections() if c["id"].startswith(connection_id)]
        exact = [c for c in matches if c["id"] == connection_id]
        if exact:
            matches = exact
        if not matches:
            console.print(f"[red]Connection '{escape(connection_id)}' not found.[/red]")
            raise SystemExit(1)
        if len(matches) > 1:
            console.print(
                f"[red]Ambiguous connection ID prefix '{escape(connection_id)}'. Please be more specific.[/red]"
            )
            raise SystemExit(1)
        connection = matches[0]
        name = f"{_app_name(connection)} ({_trust_label(connection)})"
        # confirm_action prompts through click, not Rich: no markup there.
        if not m.confirm_action(f"Disconnect '{name}'? It will have to be approved again to reconnect."):
            raise SystemExit(0)
        _client().revoke_connection(connection["id"])
        console.print(f"[green]Disconnected '{escape(name)}'.[/green]")

    return auth
