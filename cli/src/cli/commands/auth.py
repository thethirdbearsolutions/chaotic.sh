"""Authentication commands."""
import sys

import click
from rich.panel import Panel
from rich.table import Table

from .shared import _client, console


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
        console.print(Panel(f"[bold]{user['name']}[/bold]\n{user['email']}", title="Current User"))

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
    @_main().require_auth
    @_main().handle_error
    def auth_keys_create(name):
        """Create a new API key.

        The API key is displayed only once - save it immediately!
        """
        result = _client().create_api_key(name)
        console.print(f"[green]API key '{result['name']}' created.[/green]")
        console.print()
        console.print("[bold yellow]API Key (save this - it won't be shown again!):[/bold yellow]")
        console.print(f"[cyan]{result['key']}[/cyan]")
        console.print()
        console.print("To configure the CLI with this key:")
        console.print(f"  chaotic auth set-key {result['key']}")

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
                    console.print(f"[red]Ambiguous key ID prefix '{key_id}'. Please be more specific.[/red]")
                    raise SystemExit(1)
                key = k

        if not key:
            console.print(f"[red]API key '{key_id}' not found.[/red]")
            raise SystemExit(1)

        _client().revoke_api_key(key["id"])
        console.print(f"[green]API key '{key['name']}' revoked.[/green]")

    return auth
