"""Team management commands."""
import re
import sys
import unicodedata
from datetime import datetime, timezone
from urllib.parse import urlsplit

import click
from ..local_host import is_local_host
from ..markup import Table, esc
from rich.panel import Panel

from .shared import _client, console, resolve_content_value


# The server's TeamActivityAction values (backend app/enums.py), listed
# here so --help shows them and a typo is refused before any request. The
# CLI cannot import the backend; e2e's test_teams.py checks the two lists
# are equal, so a new action fails there until it is added here.
TEAM_ACTIVITY_ACTIONS = [
    "member_added", "member_removed", "role_changed", "invitation_created",
    "invitation_cancelled", "invitation_accepted", "verification_code_issued",
    "ownership_transferred", "invitation_invalidated",
]


def _who(name, user_id) -> str:
    """A user as the activity log shows them: name, else id (a user since
    deleted keeps only the id), else nobody."""
    return name or user_id or ""


def _avatar_name(entry) -> str:
    """The name, after the avatar when the avatar is an emoji (an image
    URL cannot show in a terminal)."""
    avatar = entry.get("avatar_url") or ""
    if avatar and len(avatar) <= 8 and "/" not in avatar:
        return f"{avatar} {entry['name']}"
    return entry["name"]


def roster_role(entry) -> str:
    """A person's role; an agent's kind, and its idleness."""
    if not entry.get("is_agent"):
        return entry.get("role") or ""
    role = f"agent ({entry.get('kind') or 'assistant'})"
    return f"{role}, idle" if entry.get("idle") else role


def _find_on_roster(roster, who: str):
    """The one roster entry `who` names by @handle, exact id, or name
    (ignoring case); None when nothing or more than one matches, for the
    caller to resolve another way (email, id prefix, `me`)."""
    wanted = who.strip()
    if wanted.startswith("@"):
        handle = wanted[1:].lower()
        hits = [e for e in roster if (e.get("mention_handle") or "").lower() == handle]
    else:
        hits = [e for e in roster if e["user_id"] == wanted]
        if not hits:
            hits = [e for e in roster if e["name"].casefold() == wanted.casefold()]
    return hits[0] if len(hits) == 1 else None


def profile_markup(entry) -> str:
    """A teammate's self-written identity (CHT-1979) as Rich markup for a
    panel. Every value is the member's own text, so all of it is escaped."""
    title_markup = esc(_avatar_name(entry))
    if entry.get("pronouns"):
        title_markup += f" [dim]({esc(entry['pronouns'])})[/dim]"
    lines_markup = [f"[bold]{title_markup}[/bold]"]
    if entry.get("tagline"):
        lines_markup.append(f"[italic]{esc(entry['tagline'])}[/italic]")
    facts_markup = []
    if entry.get("mention_handle"):
        facts_markup.append(f"@{esc(entry['mention_handle'])}")
    role = roster_role(entry)
    if role:
        facts_markup.append(esc(role))
    if entry.get("owner_name"):
        facts_markup.append(f"owned by {esc(entry['owner_name'])}")
    if facts_markup:
        lines_markup.append("[dim]" + " · ".join(facts_markup) + "[/dim]")
    lines_markup.append("")
    lines_markup.append(esc(entry["bio"]) if entry.get("bio") else "[dim]No bio yet.[/dim]")
    return "\n".join(lines_markup)


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


def _parse_time(value):
    if not isinstance(value, str):
        return None
    try:
        moment = datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None
    return moment if moment.tzinfo else moment.replace(tzinfo=timezone.utc)


def _span(seconds: float) -> str:
    seconds = abs(seconds)
    if seconds < 3600:
        return f"{max(1, round(seconds / 60))} min"
    if seconds < 2 * 86400:
        return f"{round(seconds / 3600)} h"
    return f"{round(seconds / 86400)} days"


def signed_up_relative(signed_up, invited) -> str:
    """The account's signup time against the invitation's creation
    (CHT-1828): an account made before the invitation went out was not
    made for it."""
    a, b = _parse_time(signed_up), _parse_time(invited)
    if a is None or b is None:
        return "invitation time unknown"
    delta = (a - b).total_seconds()
    if delta >= 0:
        return f"{_span(delta)} after the invitation was created"
    return f"{_span(delta)} before the invitation was created"


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
        m.warn_env_override("team")

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
        m.warn_env_override("team")

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

    @team.command("roster")
    @click.option("--hide-idle", is_flag=True, help="Leave out idle session identities.")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def team_roster(hide_idle):
        """Show everyone on the team, people and agents, with their identities.

        Each teammate writes their own: `chaotic auth profile`. See one in
        full with `chaotic team whois <name>`.
        """
        m = _main()
        roster = _client().get_team_roster(m.get_current_team(), hide_idle=hide_idle)
        if m.is_json_output():
            m.output_json(roster)
            return
        table = Table(title="Team Roster")
        table.add_column("Name")
        table.add_column("Handle")
        table.add_column("Pronouns")
        table.add_column("Role")
        table.add_column("Tagline")
        for entry in roster:
            handle = f"@{entry['mention_handle']}" if entry.get("mention_handle") else ""
            table.add_row(
                _avatar_name(entry), handle, entry.get("pronouns") or "",
                roster_role(entry), entry.get("tagline") or "",
            )
        console.print(table)

    @team.command("whois")
    @click.argument("who")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def team_whois(who):
        """Show a teammate's profile: name, pronouns, tagline, bio.

        WHO is a name, @handle, email, user ID (or prefix), or `me`.
        """
        m = _main()
        roster = _client().get_team_roster(m.get_current_team())
        entry = _find_on_roster(roster, who)
        if entry is None:
            user_id = m.resolve_assignee_id(who)
            entry = next((e for e in roster if e["user_id"] == user_id), None)
        if entry is None:
            raise click.ClickException(f"{who!r} is not on this team's roster.")
        if m.is_json_output():
            m.output_json(entry)
            return
        console.print(Panel(profile_markup(entry), title="Profile", expand=False))

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
    @click.option("--code", default=None,
                  help="A code a team admin gave you for this invitation, or one emailed to you "
                       "(when the server needs a verified address).")
    @_main().json_option
    @_main().require_auth
    @_main().handle_error
    def team_accept_invite(invitation, code):
        """Accept a team invitation.

        LINK_OR_TOKEN is the invitation link you were sent
        (https://<host>/invite/<token>) or just its token. The invitation
        is accepted on the server this CLI is configured for; if the
        link names another host, a warning says so.

        When the server needs a verified address and the verification
        email never arrives, a team admin can give you a code for this
        invitation (CHT-1828): pass it with --code. It lets you accept
        this invitation only; it does not verify your address.
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
            member = (
                _client().accept_invitation(token, code) if code else _client().accept_invitation(token)
            )
        except m.APIError as e:
            # CHT-1790: with SMTP configured the server requires a verified
            # address; say how to get one instead of the bare refusal.
            detail = getattr(e, "detail", None)
            if not (isinstance(detail, dict) and detail.get("error_code") == "email_unverified"):
                raise
            hint = ("Verify your email address first: run `chaotic auth verify-email`, then accept again. "
                    "If the email never arrives, ask the team's admin for a code and pass it with --code.")
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

    @team.command("leave")
    @_main().require_team
    @_main().handle_error
    def team_leave():
        """Leave the current team.

        An owner can leave only while the team has another owner; hand it
        on first with `chaotic team transfer-ownership USER` (CHT-1848).
        """
        m = _main()
        team_id = m.get_current_team()
        me = _client().get_me()
        if not m.confirm_action("Leave this team?"):
            raise SystemExit(0)
        _client().remove_member(team_id, me["id"])
        console.print("[green]You left the team.[/green] Pick another with `chaotic team use`.")

    @team.command("transfer-ownership")
    @click.argument("user")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def team_transfer_ownership(user):
        """Hand the current team on to another member (owners only).

        USER (a user ID, name, or email) becomes an owner and you become
        an admin, in one step, so the team always has an owner. USER must
        be a person who is a member of the team, not an agent. To add an
        owner without stepping down: `chaotic team role USER owner`.
        Afterwards you can step down further (`chaotic team role me
        member`) or leave (`chaotic team leave`) (CHT-1848).
        """
        m = _main()
        team_id = m.get_current_team()
        user_id = m.resolve_assignee_id(user)
        if not m.confirm_action("Make this member an owner and step down to admin?"):
            raise SystemExit(0)
        member = _client().transfer_ownership(team_id, user_id)
        if m.is_json_output():
            m.output_json(member)
            return
        who = member.get("user_name") or member.get("user_email") or user_id
        console.print(f"[green]{esc(who)} now owns the team; you are an admin.[/green]")

    @team.command("role")
    @click.argument("user")
    @click.argument("role", type=click.Choice(["member", "admin", "owner"], case_sensitive=False))
    @_main().require_team
    @_main().handle_error
    def team_role(user, role):
        """Change a team member's role.

        USER can be a user ID, name, email, or "me". Only an owner can
        make a member an owner or change an owner's role, and a team
        always keeps an owner: an owner steps down (`chaotic team role me
        admin`) only while another owner remains (CHT-1848).
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

    @team.command("activity")
    @click.option("--action", "action", default=None, type=click.Choice(TEAM_ACTIVITY_ACTIONS),
                  help="Show only this kind of entry.")
    @click.option("--limit", default=50, show_default=True, type=click.IntRange(1, 500),
                  help="How many entries to show.")
    @click.option("--skip", default=0, show_default=True, type=click.IntRange(min=0),
                  help="Skip this many of the newest entries first.")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def team_activity(action, limit, skip):
        """Show the team's administrative log, newest first (admins only).

        Members added, removed (or leaving) and given another role,
        ownership transferred, invitations created, cancelled, accepted
        and voided (an owner invitation refused because its sender is no
        longer an owner), and invitation verification codes issued: who
        did it, to whom, and when (CHT-1843). Recorded since the server version that added it;
        `chaotic system audit removed-members` reads it too."""
        m = _main()
        rows = _client().get_team_activity(m.get_current_team(), skip=skip, limit=limit, action=action)
        if m.is_json_output():
            m.output_json(rows)
            return
        if not rows:
            console.print("[yellow]No team activity recorded.[/yellow]")
            return
        table = Table(title="Team Activity")
        table.add_column("When")
        table.add_column("Action")
        table.add_column("By")
        table.add_column("Whom")
        table.add_column("Details")
        for row in rows:
            details = []
            if row.get("old_role"):
                details.append(f"{row['old_role']} -> {row.get('role')}")
            elif row.get("role"):
                details.append(f"role {row['role']}")
            if row.get("invitation_id"):
                details.append(f"invitation {row['invitation_id']}")
            table.add_row(
                row.get("created_at") or "",
                (row.get("action") or "").replace("_", " "),
                _who(row.get("actor_name"), row.get("actor_id")),
                _who(row.get("target_user_name"), row.get("target_user_id")) or (row.get("email") or ""),
                ", ".join(details),
            )
        console.print(table)
        if len(rows) == limit:
            console.print(f"[dim]There may be older entries: --skip {esc(skip + limit)}[/dim]")

    @team.command("cancel-invite")
    @click.argument("invitation_id")
    @_main().require_team
    @_main().handle_error
    def team_cancel_invite(invitation_id):
        """Cancel a pending team invitation."""
        m = _main()
        _client().delete_invitation(m.get_current_team(), invitation_id)
        console.print(f"[green]Invitation cancelled.[/green]")

    @team.command("invitation-code")
    @click.argument("invitation_id")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def team_invitation_code(invitation_id):
        """Get a code for an invitee whose verification email never arrives.

        With SMTP configured, accepting an invitation needs a verified
        address, and when the server's mail is failing the verification
        email fails too (CHT-1828). This gives you, a team admin, a code
        that lets the account signed up with the invited address accept
        this invitation (and nothing else). INVITATION_ID is from
        `chaotic team invitations`.

        Send it only through a channel you already trust for the
        invitee, never to whoever asked for it: anyone who saw the link
        can sign up with that address and ask. They pass it with
        `chaotic team accept-invite <link> --code <code>`, or on the
        invitation page. Shown only now; it expires in 15 minutes, and a
        new one replaces it (three a day per team and address).
        """
        m = _main()
        issued = _client().issue_invitation_verification_code(m.get_current_team(), invitation_id)
        if m.is_json_output():
            m.output_json(issued)
            return
        account = issued.get("account") or {}
        console.print(
            "[yellow]Send this code only through a channel you already trust for the invitee, "
            "never to whoever asked you for it. Anyone who saw the link can sign up with their "
            "address and ask, and chooses the name shown below.[/yellow]"
        )
        console.print("[bold]The account it is for:[/bold]")
        console.print(f"  Name:      {esc(str(account.get('name', '')))}")
        console.print(f"  Email:     {esc(str(account.get('email', '')))}")
        console.print(
            f"  Signed up: {esc(str(account.get('created_at', '')))} "
            f"({esc(signed_up_relative(account.get('created_at'), issued.get('invitation_created_at')))})"
        )
        if account.get("member_of_any_team"):
            console.print("  Already in a team: yes")
        else:
            console.print("  Already in a team: no")
        console.print(
            "[yellow]A signup shortly after you sent the link fits both the invitee and someone "
            "who saw the link: confirm with the invitee directly. One that predates the invitation "
            "was not made from the link, but check that the invitee recognises it. If they don't, "
            "don't give out the code: cancel the invitation.[/yellow]"
        )
        console.print(
            f"Code (expires {esc(str(issued.get('expires_at', '')))}): "
            f"[bold]{esc(str(issued.get('code', '')))}[/bold]",
            highlight=False,
        )
        console.print(
            "[dim]It lets that account accept this invitation only. They pass it with: "
            "chaotic team accept-invite <link> --code <code>, or on the invitation page.[/dim]"
        )

    return team
