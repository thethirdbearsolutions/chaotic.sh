"""Authentication commands."""
import os
import sys
from datetime import datetime, timedelta, timezone

import click
from rich.markup import escape
from rich.panel import Panel
from ..markup import Table

from .shared import _client, console, parse_duration, resolve_content_value


# The server's cap on an uploaded profile picture (CHT-1992).
PHOTO_MAX_BYTES = 256 * 1024

# How the consent screen labels an app (frontend/src/oauth-consent.js).
TRUST_LABELS = {
    "builtin": "built-in sign-in",
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


def _interactive() -> bool:
    """May verify-email prompt for the code? Only in a terminal."""
    return sys.stdin.isatty() and sys.stdout.isatty()


def _local_time(iso: str) -> str:
    """A server timestamp as local wall-clock time, or as sent if it
    does not parse."""
    try:
        moment = datetime.fromisoformat(iso.replace("Z", "+00:00"))
    except (TypeError, ValueError):
        return str(iso)
    if moment.tzinfo is None:
        moment = moment.replace(tzinfo=timezone.utc)
    return moment.astimezone().strftime("%H:%M")


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
            identity_markup = "[cyan]AGENT[/cyan]"
            parent_name = user.get("parent_user_name")
            if parent_name:
                identity_markup += f" (parent: {escape(parent_name)})"
        else:
            identity_markup = "human"
        lines_markup = [f"[bold]{escape(user['name'])}[/bold]", escape(user["email"]), identity_markup]
        # Agent identity (CHT-1499): what kind, and for a registered
        # session, its address and the registrar that registered it.
        if user.get("is_agent"):
            kind = "registrar" if user.get("can_register") else (user.get("kind") or "agent")
            lines_markup.append(f"[dim]Kind:[/dim] {escape(str(kind))}")
            if user.get("external_ref"):
                lines_markup.append(f"[dim]Session:[/dim] {escape(user['external_ref'])}")
            if user.get("registered_by_id"):
                registrar = user.get("registered_by_name") or user["registered_by_id"]
                lines_markup.append(f"[dim]Registered by:[/dim] {escape(registrar)}")
        else:
            # CHT-1790: whether the address has been proved by a mailed code.
            # Neutral: the CLI cannot tell whether this server can verify.
            verified = user.get("email_verified_at")
            lines_markup.append(
                "[dim]Email verified:[/dim] yes" if verified else "[dim]Email verified:[/dim] no"
            )
        console.print(Panel("\n".join(lines_markup), title="Current User"))

    @auth.command("rename")
    @click.argument("name")
    @_main().json_option
    @_main().require_auth
    @_main().handle_error
    def auth_rename(name):
        """Rename the session identity you are signed in as (CHT-1918).

        Only a registered session identity may rename itself, and only its
        name. A person renames an agent with `chaotic agent update`. To name
        a new session before it first registers, set CHAOTIC_SESSION_NAME.
        """
        m = _main()
        name = name.strip()
        if not name:
            raise click.BadParameter("must not be blank", param_hint="NAME")
        me = _client().get_me()
        if not me.get("is_agent") or not (me.get("kind") == "session" or me.get("registered_by_id")):
            message = (
                f"{me.get('name')!r} is not a session identity. `auth rename` renames the session "
                f"identity you are signed in as; to rename an agent, use `chaotic agent update`."
            )
            if m.is_json_output():
                m.output_json({"error": message, "error_code": "not_a_session_identity"})
            else:
                console.print(f"[red]Error: {escape(message)}[/red]")
            raise SystemExit(1)
        agent = _client().update_agent(me["id"], name=name)
        if m.is_json_output():
            m.output_json(agent)
            return
        console.print(
            f"[green]Renamed {escape(me.get('name') or '')} to {escape(agent.get('name') or name)}.[/green]"
        )

    @auth.command("profile")
    @click.option("--name", default=None, help="Your name.")
    @click.option("--avatar", default=None, help="An emoji or an image URL.")
    @click.option("--pronouns", default=None, help='e.g. "they/them". Pass "" to clear.')
    @click.option("--tagline", default=None, help='One line under your name on the roster. Pass "" to clear.')
    @click.option(
        "--bio", default=None, callback=resolve_content_value,
        help='Markdown about yourself (an agent: your persona). @path reads a file, - reads stdin, "" clears.',
    )
    @click.option(
        "--photo", default=None, type=click.Path(dir_okay=False, allow_dash=False),
        help='Upload a profile picture (PNG, JPEG, WebP or GIF, at most 256 KB). "" removes it.',
    )
    @_main().json_option
    @_main().require_auth
    @_main().handle_error
    def auth_profile(name, avatar, pronouns, tagline, bio, photo):
        """Show or write your own profile (CHT-1979).

        Everyone writes their own identity, people and agents alike. With no
        options, shows it; with any, changes just those. Teammates see it in
        `chaotic team roster` and `chaotic team whois`.
        """
        from .team import profile_markup

        m = _main()
        changes = {
            field: value for field, value in (
                ("name", name), ("avatar_url", avatar), ("pronouns", pronouns),
                ("tagline", tagline), ("bio", bio),
            ) if value is not None
        }
        if "name" in changes and not changes["name"].strip():
            raise click.BadParameter("must not be blank", param_hint="--name")
        if "avatar_url" in changes and not changes["avatar_url"].strip():
            changes["avatar_url"] = None
        if photo is not None and avatar is not None:
            raise click.UsageError("Pass --photo or --avatar, not both.")
        user = None
        if photo == "":
            user = _client().delete_avatar()
        elif photo is not None:
            try:
                # The server's cap (AVATAR_MAX_BYTES): refuse a bigger
                # file here rather than read and send it all for a 413.
                if os.path.getsize(photo) > PHOTO_MAX_BYTES:
                    raise click.BadParameter(
                        f"{photo} is larger than {PHOTO_MAX_BYTES // 1024} KB; shrink it first "
                        "(the web app resizes a photo for you).",
                        param_hint="--photo",
                    )
                with open(photo, "rb") as f:
                    image = f.read()
            except OSError as exc:
                raise click.BadParameter(str(exc), param_hint="--photo") from exc
            user = _client().upload_avatar(image)
        if changes or user is None:
            user = _client().update_me(**changes) if changes else _client().get_me()
        if m.is_json_output():
            m.output_json(user)
            return
        entry = {**user, "user_id": user["id"], "role": None, "owner_name": user.get("parent_user_name")}
        console.print(Panel(profile_markup(entry), title="Your profile", expand=False))
        if not changes and photo is None:
            console.print("[dim]Change it with --name, --avatar, --photo, --pronouns, --tagline, --bio.[/dim]")

    @auth.command("verify-email")
    @click.option("--code", default=None, help="Confirm a code you already received, without requesting a new one.")
    @_main().json_option
    @_main().require_auth
    @_main().handle_error
    def auth_verify_email(code):
        """Verify your account's email address with a mailed code.

        Without --code, asks the server to email a six-digit code to your
        address, then prompts for it; with --json or when not run in a
        terminal, it only requests the code and prints where it went and
        when it expires (confirm it afterwards with --code). With --code,
        confirms a code you already received. With SMTP configured on the
        server, accepting a team invitation requires a verified address.
        """
        m = _main()
        if code is None:
            try:
                sent = _client().request_email_verification()
            except m.APIError as e:
                if getattr(e, "status_code", None) != 429:
                    raise
                hint = "If you already have a code: chaotic auth verify-email --code <code>"
                if m.is_json_output():
                    m.output_json({"error": str(e), "error_code": "email_verification_rate_limited", "hint": hint})
                else:
                    console.print(f"[red]Error: {escape(str(e))}[/red]")
                    console.print(f"[dim]{escape(hint)}[/dim]")
                raise SystemExit(1)
            if m.is_json_output():
                m.output_json({"email": sent["email"], "expires_at": sent["expires_at"]})
                return
            console.print(
                f"Sent a verification code to [bold]{escape(sent['email'])}[/bold]; "
                f"it expires at {escape(_local_time(sent['expires_at']))}."
            )
            if not _interactive():
                console.print("Confirm it with: chaotic auth verify-email --code <code>")
                return
            code = click.prompt("Code")
        user = _client().confirm_email_verification(code.strip())
        if m.is_json_output():
            m.output_json(user)
            return
        console.print(f"[green]Email address {escape(user['email'])} verified.[/green]")

    @auth.command("change-email")
    @click.argument("new_email")
    @click.option("--password", prompt=True, hide_input=True,
                  help="Your account's password (prompted for when not given).")
    @_main().json_option
    @_main().require_auth
    @_main().handle_error
    def auth_change_email(new_email, password):
        """Change your account's email address to NEW_EMAIL.

        Asks for your password. The new address starts unverified: verify
        it with `chaotic auth verify-email`. If the server sends email, a
        notice goes to the old address. Your sessions and API keys keep
        working. The server refuses an address another account holds,
        with the same answer as a wrong password.
        """
        m = _main()
        user = _client().change_email(new_email, password)
        if m.is_json_output():
            m.output_json(user)
            return
        console.print(f"[green]Your email address is now {escape(user['email'])}.[/green]")
        console.print("It is not verified yet: chaotic auth verify-email")

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
            table.add_row(key_id, name, prefix, created, last_used, active, expires)

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
            team = c.get("team_name") or "-"
            if c.get("acts_as") == "person":
                # A built-in app signed in as you on one device (CHT-1602),
                # account-wide: it reaches every team you belong to.
                device = c.get("device_name")
                acts_as = f"you ({device})" if device else "you"
                team = "all yours"
            else:
                acts_as = agent.get("name") or "-"
            table.add_row(
                c["id"][:8],
                _app_name(c),
                _trust_label(c),
                acts_as,
                team,
                "all" if projects is None else str(len(projects)),
                c.get("policy") or "-",
                (c.get("created_at") or "")[:10] or "-",
                (c.get("last_used_at") or "")[:10] or "-",
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
