"""Agent management commands."""
import sys

import click
from rich.table import Table

from .shared import _client, console


def _main():
    """Late-bind to cli.main for test mock compatibility."""
    return sys.modules['cli.main']


def register(cli):
    """Register agent commands on the CLI group."""

    @cli.group()
    def agent():
        """Agent management commands."""
        pass

    @agent.command("create")
    @click.argument("name")
    @click.option("--project", "-p", is_flag=True, help="Create project-scoped agent (otherwise team-scoped)")
    @_main().require_team
    @_main().handle_error
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
        m = _main()
        team_id = m.get_current_team()

        if project:
            project_id = m.get_current_project()
            if not project_id:
                console.print("[red]No project selected. Run 'chaotic project use <project_id>' first.[/red]")
                raise SystemExit(1)
            result = _client().create_project_agent(project_id, name)
            scope_msg = f"project-scoped (project: {project_id[:8]}...)"
        else:
            result = _client().create_team_agent(team_id, name)
            scope_msg = "team-scoped"

        console.print(f"[green]Agent '{result['name']}' created ({scope_msg}).[/green]")
        console.print()
        console.print("[bold yellow]API Key (save this - it won't be shown again!):[/bold yellow]")
        console.print(f"[cyan]{result['api_key']}[/cyan]")
        console.print()
        console.print("To configure the CLI with this agent's key:")
        console.print(f"  chaotic auth set-key {result['api_key']}")

    @agent.command("list")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def agent_list():
        """List agents in current team."""
        m = _main()
        team_id = m.get_current_team()
        agents = _client().get_team_agents(team_id)
        if m.is_json_output():
            m.output_json(agents or [])
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
    @_main().require_team
    @_main().handle_error
    def agent_delete(agent_id):
        """Delete an agent and revoke all its API keys.

        AGENT_ID can be the full agent ID or a prefix (e.g., the first 8 characters).
        """
        m = _main()
        if not m.confirm_action("Are you sure you want to delete this agent? This will revoke all its API keys."):
            raise SystemExit(0)
        # Try to find the agent by prefix if not a full ID
        team_id = m.get_current_team()
        agents = _client().get_team_agents(team_id)

        # Find agent by ID or prefix
        agent_obj = None
        for a in agents:
            if a["id"] == agent_id or a["id"].startswith(agent_id):
                if agent_obj is not None:
                    console.print(f"[red]Ambiguous agent ID prefix '{agent_id}'. Please be more specific.[/red]")
                    raise SystemExit(1)
                agent_obj = a

        if not agent_obj:
            console.print(f"[red]Agent '{agent_id}' not found.[/red]")
            raise SystemExit(1)

        _client().delete_agent(agent_obj["id"])
        console.print(f"[green]Agent '{agent_obj['name']}' deleted.[/green]")

    return agent
