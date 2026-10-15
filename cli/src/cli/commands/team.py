"""Team management commands."""
import sys
from urllib.parse import urlsplit

import click
from ..local_host import is_local_host
from ..markup import Table, esc
from rich.panel import Panel

from .shared import _client, console, resolve_content_value


def _main():
    """Late-bind to cli.main for test mock compatibility."""
    return sys.modules['cli.main']


def invite_link_for_display(accept_url: str, web_url: str | None) -> str:
    """The accept link to print (CHT-1822).

    The server builds the link from APP_BASE_URL, whose default is
    http://localhost:24267. A server that never set it hands out a link
    no remote invitee can open. When the link names a local-only host
    (is_local_host: loopback or 0.0.0.0/::) and the server this profile
    talks to is not on one, rebuild the link on that server's URL. Only
    the path (/invite/<token>) is kept from the server's link. Anything
    else is printed as the server sent it."""
    try:
        link = urlsplit(accept_url)
        here = urlsplit(web_url or "")
        link_host, here_host, here_port = link.hostname, here.hostname, here.port
    except ValueError:
        return accept_url
    if here.scheme not in ("http", "https") or not here_host:
        return accept_url
    if not is_local_host(link_host) or is_local_host(here_host):
        return accept_url
    # Only the profile's scheme, host and port, rebuilt from their parsed
    # values (no credentials, no path); the web UI and /invite/ are served
    # at the root.
    host = f"[{here_host}]" if ":" in here_host else here_host
    port = f":{here_port}" if here_port is not None else ""
    return f"{here.scheme}://{host}{port}{link.path}"


def invite_token_from_arg(value: str) -> tuple[str, str | None]:
    """The token in ``chaotic team accept-invite``'s argument (CHT-1823),
    and the host of the link it came from (None when there is none).

    The argument is the bare token or the link an admin hands out,
    ``https://host/invite/<token>``; the token is the link's last path
    segment, and the segment before it must be ``invite``. A link
    without a scheme (``host/invite/<token>``) is read as a path, so it
    has no host. Raises click.UsageError for a link with no token. The
    message never repeats the argument: it is a credential."""
    text = value.strip()
    if "/" not in text:
        return text, None
    bad = click.UsageError(
        "That link has no invitation token in it. Pass the whole link "
        "(https://<host>/invite/<token>) or just the token."
    )
    try:
        parts = urlsplit(text)
        host = parts.hostname if parts.scheme else None
    except ValueError:
        raise bad from None
    segments = [s for s in parts.path.split("/") if s]
    if len(segments) < 2 or segments[-2] != "invite":
        raise bad
    return segments[-1], host


def foreign_invite_host(link_host: str | None, web_url: str | None) -> str | None:
    """The configured server's host when an invitation link names another
    host, else None (CHT-1823).

    Hostnames are compared without case or a trailing dot, and ports are
    ignored (a server behind a proxy is reached on another port than its
    own). A link on a local-only host (is_local_host) is not foreign when
    the configured server is local-only too: both are this machine."""
    if not link_host:
        return None
    try:
        here = urlsplit(web_url or "").hostname
    except ValueError:
        here = None
    if not here:
        return None
    def norm(h):
        return h.lower().rstrip(".")
    if norm(link_host) == norm(here):
        return None
    if is_local_host(link_host) and is_local_host(here):
        return None
    return here


def register(cli):
    """Register team commands on the CLI group."""

    @cli.group()
    def team():
        """Team management commands."""
        pass

    @team.command("list")
    @_main().json_option
    @_main().require_auth
    @_main().handle_error
    def team_list():
        """List all your teams."""
        m = _main()
        teams = _client().get_teams()
        if m.is_json_output():
            m.output_json(teams)
            return
        if not teams:
            console.print("[yellow]No teams found. Create one with 'chaotic team create'[/yellow]")
            return

        current = m.get_current_team()
        table = Table(title="Teams")
        table.add_column("ID", style="dim")
        table.add_column("Key")
        table.add_column("Name")
        table.add_column("Current")

        for t in teams:
            is_current = "\u2713" if t["id"] == current else ""
            table.add_row(t["id"], t["key"], t["name"], is_current)

        console.print(table)

    @team.command("create")
    @click.argument("name")
    @click.argument("key")
    @click.option("--description", default="", callback=resolve_content_value)
    @_main().json_option
    @_main().require_auth
    @_main().handle_error
    def team_create(name, key, description):
        """Create a new team."""
        m = _main()
        result = _client().create_team(name, key.upper(), description or None)
        m.set_current_team(result["id"])
        if m.is_json_output():
            m.output_json(result)
            return
        console.print(f"[green]Team created: {esc(result['name'])} ({esc(result['key'])})[/green]")
        console.print(f"[dim]Set as current team[/dim]")

    @team.command("use")
    @click.argument("team_id")
    @_main().require_auth
    @_main().handle_error
    def team_use(team_id):
        """Set current team.

        TEAM_ID can be a full ID, name, key, or a prefix.
        """
        m = _main()
        team_id = m.resolve_team_id(team_id)

        t = _client().get_team(team_id)
        m.set_current_team(team_id)
        m.set_current_project(None)  # Reset project when changing teams
        console.print(f"[green]Switched to team: {esc(t['name'])}[/green]")

    @team.command("show")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def team_show():
        """Show current team details."""
        m = _main()
        t = _client().get_team(m.get_current_team())
        if m.is_json_output():
            m.output_json(t)
            return
        console.print(Panel(
            f"[bold]{esc(t['name'])}[/bold]\n"
            f"Key: {esc(t['key'])}\n"
            f"Description: {esc(t.get('description') or 'None')}",
            title="Current Team"
        ))

    @team.command("members")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def team_members():
        """List team members."""
        m = _main()
        members = _client().get_team_members(m.get_current_team())
        if m.is_json_output():
            m.output_json(members)
            return
        table = Table(title="Team Members")
        table.add_column("Name")
        # The @handle that reaches exactly this member (CHT-1731).
        table.add_column("Handle")
        table.add_column("Email")
        table.add_column("Role")

        for member in members:
            handle = f"@{member['mention_handle']}" if member.get("mention_handle") else ""
            table.add_row(member.get("user_name", "Unknown"), handle, member.get("user_email", ""), member["role"])

        console.print(table)

    @team.command("invite")
    @click.argument("email")
    @click.option("--role", default="member", type=click.Choice(["member", "admin"]))
    @_main().require_team
    @_main().handle_error
    def team_invite(email, role):
        """Invite a member to the team.

        On a server that cannot send email, prints the invitation link,
        once, for you to send them yourself (CHT-1794)."""
        m = _main()
        invitation = _client().invite_member(m.get_current_team(), email, role)
        accept_url = invitation.get("accept_url") if isinstance(invitation, dict) else None
        if not accept_url:
            console.print(f"[green]Invitation sent to {esc(email)}[/green]")
            return
        console.print(f"[green]Invitation created for {esc(email)}[/green]")
        console.print(
            "[yellow]This server does not send email: send this link to them yourself. "
            "It is shown only now.[/yellow]"
        )
        link = invite_link_for_display(accept_url, m.get_web_url())
        # Unwrapped and unstyled, so it copies as one line.
        console.print(esc(link), soft_wrap=True, highlight=False)

    @team.command("accept-invite")
    @click.argument("invitation", metavar="LINK_OR_TOKEN")
    @_main().json_option
    @_main().require_auth
    @_main().handle_error
    def team_accept_invite(invitation):
        """Accept a team invitation.

        LINK_OR_TOKEN is the invitation link you were sent
        (https://<host>/invite/<token>) or just its token. The invitation
        is accepted on the server this CLI is configured for; if the
        link names another host, a warning says so.
        """
        m = _main()
        token, link_host = invite_token_from_arg(invitation)
        here = foreign_invite_host(link_host, m.get_web_url())
        if here:
            click.echo(click.style(
                f"Warning: this invitation link is for {link_host}, but the CLI is "
                f"configured for {here}. Accepting it on {here}; if that fails, rerun "
                "with --profile set to a profile for the link's server.",
                fg="yellow"), err=True)
        try:
            member = _client().accept_invitation(token)
        except m.APIError as e:
            # CHT-1790: with SMTP configured the server requires a verified
            # address; say how to get one instead of the bare refusal.
            detail = getattr(e, "detail", None)
            if not (isinstance(detail, dict) and detail.get("error_code") == "email_unverified"):
                raise
            hint = "Verify your email address first: run `chaotic auth verify-email`, then accept again."
            if m.is_json_output():
                m.output_json({"error": str(e), "error_code": "email_unverified", "hint": hint})
            else:
                console.print(f"[yellow]{esc(hint)}[/yellow]")
            raise SystemExit(1)
        if m.is_json_output():
            m.output_json(member)
            return
        console.print(f"[green]Joined team successfully![/green]")

    @team.command("remove-member")
    @click.argument("user")
    @_main().require_team
    @_main().handle_error
    def team_remove_member(user):
        """Remove a member from the team.

        USER can be a user ID, name, or email.
        """
        m = _main()
        team_id = m.get_current_team()
        user_id = m.resolve_assignee_id(user)
        if not m.confirm_action(f"Remove this member from the team?"):
            raise SystemExit(0)
        _client().remove_member(team_id, user_id)
        console.print(f"[green]Member removed from team.[/green]")

    @team.command("role")
    @click.argument("user")
    @click.argument("role", type=click.Choice(["member", "admin"], case_sensitive=False))
    @_main().require_team
    @_main().handle_error
    def team_role(user, role):
        """Change a team member's role.

        USER can be a user ID, name, or email.
        """
        m = _main()
        team_id = m.get_current_team()
        user_id = m.resolve_assignee_id(user)
        _client().update_member_role(team_id, user_id, role)
        console.print(f"[green]Member role updated to {esc(role)}.[/green]")

    @team.command("invitations")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def team_invitations():
        """List pending team invitations."""
        m = _main()
        invitations = _client().get_invitations(m.get_current_team())
        if m.is_json_output():
            m.output_json(invitations)
            return
        if not invitations:
            console.print("[yellow]No pending invitations.[/yellow]")
            return
        table = Table(title="Pending Invitations")
        table.add_column("ID", style="dim")
        table.add_column("Email")
        table.add_column("Role")
        table.add_column("Created")
        for inv in invitations:
            table.add_row(
                inv["id"],
                inv.get("email", ""),
                inv.get("role", "member"),
                inv.get("created_at", ""),
            )
        console.print(table)

    @team.command("cancel-invite")
    @click.argument("invitation_id")
    @_main().require_team
    @_main().handle_error
    def team_cancel_invite(invitation_id):
        """Cancel a pending team invitation."""
        m = _main()
        _client().delete_invitation(m.get_current_team(), invitation_id)
        console.print(f"[green]Invitation cancelled.[/green]")

    return team
