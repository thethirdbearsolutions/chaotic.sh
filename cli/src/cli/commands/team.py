"""Team management commands."""
import sys

import click
from rich.table import Table
from rich.panel import Panel

from .shared import _client, console


def _main():
    """Late-bind to cli.main for test mock compatibility."""
    return sys.modules['cli.main']


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
    @click.option("--description", default="")
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
        console.print(f"[green]Team created: {result['name']} ({result['key']})[/green]")
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
        console.print(f"[green]Switched to team: {t['name']}[/green]")

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
            f"[bold]{t['name']}[/bold]\n"
            f"Key: {t['key']}\n"
            f"Description: {t.get('description') or 'None'}",
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
        table.add_column("Email")
        table.add_column("Role")

        for member in members:
            table.add_row(member.get("user_name", "Unknown"), member.get("user_email", ""), member["role"])

        console.print(table)

    @team.command("invite")
    @click.argument("email")
    @click.option("--role", default="member", type=click.Choice(["member", "admin"]))
    @_main().require_team
    @_main().handle_error
    def team_invite(email, role):
        """Invite a member to the team."""
        m = _main()
        _client().invite_member(m.get_current_team(), email, role)
        console.print(f"[green]Invitation sent to {email}[/green]")

    @team.command("accept-invite")
    @click.argument("token")
    @_main().require_auth
    @_main().handle_error
    def team_accept_invite(token):
        """Accept a team invitation."""
        result = _client().accept_invitation(token)
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
        console.print(f"[green]Member role updated to {role}.[/green]")

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
