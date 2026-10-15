"""Team management commands."""
import re
import sys
import unicodedata
from urllib.parse import urlsplit

import click
from ..local_host import is_local_host
from ..markup import Table, esc
from rich.panel import Panel

from .shared import _client, console, resolve_content_value


def _main():
    """Late-bind to cli.main for test mock compatibility."""
    return sys.modules['cli.main']


def _pending_invitation(error):
    """For the 409 refusing an address that already has a pending
    invitation (CHT-1824): (invitation_id or None, hint). None for any
    other error. A server older than CHT-1824 sends a plain string with
    no id."""
    if getattr(error, "status_code", None) != 409:
        return None
    detail = getattr(error, "detail", None)
    if isinstance(detail, dict):
        if detail.get("error_code") != "invitation_pending":
            return None
        inv_id = detail.get("invitation_id")
        inv_id = inv_id if isinstance(inv_id, str) and inv_id else None
    elif isinstance(detail, str) and "pending invitation" in detail:
        inv_id = None
    else:
        return None
    target = inv_id or "<id from `chaotic team invitations`>"
    return inv_id, f"To send a new link: `chaotic team cancel-invite {target}`, then invite again."


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


# The server's tokens are secrets.token_urlsafe(32): 43 characters of
# this alphabet. Same rule as inviteToken in frontend/src/invite.js.
INVITE_TOKEN_RE = re.compile(r"[A-Za-z0-9_-]{16,128}")


def invite_token_from_arg(value: str) -> tuple[str, str | None]:
    """The token in ``chaotic team accept-invite``'s argument (CHT-1823),
    and the host of the link it came from (None when there is none).

    The argument is the bare token or the link an admin hands out,
    ``https://host/invite/<token>``; the token is the link's last path
    segment, and the segment before it must be ``invite``. A link
    without a scheme (``host/invite/<token>``) is read as a path, so it
    has no host. Either way the token must match INVITE_TOKEN_RE, so
    nothing else (``..``, a trailing ``.`` or ``>`` from a paste, ``#``,
    ``?``, control or zero-width characters) reaches the request path.
    Raises click.UsageError otherwise; the message never repeats the
    argument, because it is a credential."""
    bad = click.UsageError(
        "That is not an invitation link or token. Pass the whole link "
        "(https://<host>/invite/<token>) or just the token."
    )
    text = value.strip()
    host = None
    if "/" in text:
        try:
            parts = urlsplit(text)
            host = parts.hostname if parts.scheme else None
        except ValueError:
            raise bad from None
        segments = [s for s in parts.path.split("/") if s]
        if len(segments) < 2 or segments[-2] != "invite":
            raise bad
        text = segments[-1]
    if not INVITE_TOKEN_RE.fullmatch(text):
        raise bad
    return text, host


def _host_key(host: str) -> str:
    """A hostname in the form foreign_invite_host compares: without case or
    a trailing dot, and with each punycode (``xn--``) label decoded, so an
    IDN host and its ASCII form compare equal (CHT-1826).

    Decoding rather than encoding: Python's ``idna`` codec is IDNA 2003,
    whose nameprep maps ``ß`` to ``ss``, so encoding would call
    ``faß.de`` and ``fass.de`` the same host and hide a real mismatch.
    An ``xn--`` label is decoded only when the result is non-ASCII, already
    NFC and lowercase, and re-encodes to the same label: two ACE labels are
    different DNS names, so one that would only match another host after
    normalising (U+212A KELVIN SIGN + "anban" vs ``kanban``, a decomposed
    or uppercase ``ü``) must not compare equal to it. Any other ``xn--``
    label, and one longer than DNS's 63 octets (punycode decoding is
    quadratic), stays as written: still compared, never fatal.
    """
    labels = []
    for label in host.rstrip(".").split("."):
        label = label.lower()
        if label.startswith("xn--") and len(label) <= 63:
            try:
                decoded = label[4:].encode("ascii").decode("punycode")
            except (UnicodeError, ValueError):
                decoded = None
            if decoded and not decoded.isascii() \
                    and unicodedata.normalize("NFC", decoded).lower() == decoded \
                    and decoded.encode("punycode").decode("ascii") == label[4:]:
                label = decoded
        labels.append(unicodedata.normalize("NFC", label).lower())
    return ".".join(labels)


def foreign_invite_host(link_host: str | None, web_url: str | None) -> str | None:
    """The configured server's host when an invitation link names another
    host, else None (CHT-1823).

    Hostnames are compared without case or a trailing dot, with punycode
    labels decoded (_host_key: an IDN matches its xn-- form), and ports are
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
    if _host_key(link_host) == _host_key(here):
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
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def team_invite(email, role):
        """Invite a member to the team.

        Prints the invitation link, once, for you to send them yourself
        (CHT-1794). When the server emails it too, the email is only
        queued: if it does not arrive, send them the link (CHT-1824)."""
        m = _main()
        try:
            invitation = _client().invite_member(m.get_current_team(), email, role)
        except m.APIError as e:
            pending = _pending_invitation(e)
            if pending is None:
                raise
            inv_id, hint = pending
            if m.is_json_output():
                m.output_json({"error": str(e), "error_code": "invitation_pending",
                               "invitation_id": inv_id, "hint": hint})
            else:
                console.print(f"[red]Error: {esc(str(e))}[/red]")
                console.print(f"[yellow]{esc(hint)}[/yellow]")
            raise SystemExit(1)
        invitation = invitation if isinstance(invitation, dict) else {}
        accept_url = invitation.get("accept_url")
        link = invite_link_for_display(accept_url, m.get_web_url()) if accept_url else None
        if m.is_json_output():
            m.output_json({**invitation, "accept_url": link} if link else invitation)
            return
        console.print(f"[green]Invitation created for {esc(email)}[/green]")
        if not link:
            # A server older than CHT-1824 sends no link when it has SMTP
            # (and one older than CHT-1794 never does): say nothing about
            # whether an email went out.
            console.print(
                "[yellow]If this server sends email, the link went to them by email; "
                "delivery isn't confirmed. If it does not arrive, cancel this invitation "
                "and invite again.[/yellow]"
            )
            return
        if invitation.get("email_queued") is True:
            console.print(
                f"[yellow]An email was queued to {esc(email)}; delivery isn't confirmed, "
                "so you can also pass on this link. It is shown only now.[/yellow]"
            )
        else:
            console.print(
                "[yellow]This server does not send email: send this link to them yourself. "
                "It is shown only now.[/yellow]"
            )
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
            # Hosts come from a pasted link: drop control characters so
            # they cannot drive the terminal.
            shown_link, shown_here = (
                "".join(c for c in h if c.isprintable()) for h in (link_host, here)
            )
            if is_local_host(link_host):
                # CHT-1822: a server with APP_BASE_URL unset hands out
                # localhost links; the token is most likely for this server.
                advice = ("The link names a local-only host, so it probably came from "
                          "this server with APP_BASE_URL unset.")
            else:
                advice = ("If that fails, rerun with --profile set to a profile for "
                          "the link's server.")
            click.echo(click.style(
                f"Warning: this invitation link is for {shown_link}, but the CLI is "
                f"configured for {shown_here}. Accepting it on {shown_here}. {advice}",
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
