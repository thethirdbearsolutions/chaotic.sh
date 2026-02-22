"""Epic management commands."""
import sys

import click
from rich.markdown import Markdown
from rich.panel import Panel
from rich.table import Table

from .shared import _client, console


def _main():
    """Late-bind to cli.main for test mock compatibility."""
    return sys.modules['cli.main']


def register(cli):
    """Register epic commands on the CLI group."""

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
    @click.option("--sprint", help="Set sprint (name, 'current', 'next', 'none', or ID)")
    @click.option("--label", "labels", multiple=True, help="Label name(s) to assign (can be used multiple times)")
    @click.option("--project", "project_key", help="Project (ID, key, or name) - overrides current project")
    @_main().require_team
    @_main().handle_error
    def epic_create(title, title_opt, description, status, priority, estimate, sprint, labels, project_key):
        """Create a new epic.

        Creates an issue with type=epic. Use 'chaotic issue create --parent' to add sub-issues.

        Examples:
            chaotic epic create "User Authentication"
            chaotic epic create "Search Feature" --priority high --description "Full-text search"
        """
        m = _main()
        title = (title or title_opt or "").strip()
        if not title:
            raise click.ClickException("Title is required. Use: chaotic epic create \"My Epic Title\"")

        if project_key:
            project_id = m.resolve_project_id(project_key)
        else:
            project_id = m.get_current_project()
            if not project_id:
                console.print("[red]No project selected. Use --project or run 'chaotic project use <project_id>' first.[/red]")
                raise SystemExit(1)

        data = {"description": description or None, "status": status, "priority": priority, "issue_type": "epic"}
        if estimate:
            data["estimate"] = estimate
        if labels:
            team_id = m.get_current_team()
            all_labels = _client().get_labels(team_id)
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
                data["sprint_id"] = m.resolve_sprint_id(sprint, project_id)

        result = _client().create_issue(project_id, title, **data)
        console.print(f"[green]Epic created: {result['identifier']} - {result['title']}[/green]")
        console.print(f"\n[dim]Add sub-issues with:[/dim]")
        console.print(f"  chaotic issue create --parent {result['identifier']} \"Sub-issue title\"")

    @epic.command("list")
    @click.option("--status", help="Filter by status (backlog, todo, in_progress, in_review, done, canceled). Comma-separated for multiple.")
    @click.option("--limit", "-n", type=int, default=50, help="Maximum number of epics to show (default: 50)")
    @_main().json_option
    @_main().require_project
    @_main().handle_error
    def epic_list(status, limit):
        """List epics in current project with progress.

        Examples:
            chaotic epic list
            chaotic epic list --status in_progress
        """
        m = _main()
        if status:
            valid_statuses = ["backlog", "todo", "in_progress", "in_review", "done", "canceled"]
            statuses = [s.strip().lower() for s in status.split(",")]
            for s in statuses:
                if s not in valid_statuses:
                    raise click.BadParameter(f"Invalid status: {s}. Must be one of: {', '.join(valid_statuses)}")

        project_id = m.get_current_project()
        epics = _client().get_issues(project_id=project_id, issue_type="epic", status=status, limit=limit)

        if m.is_json_output():
            for ep in epics:
                try:
                    ep['sub_issues'] = _client().get_sub_issues(ep['id'])
                except m.APIError:
                    ep['sub_issues'] = []
            m.output_json(epics)
            return

        if not epics:
            console.print("[yellow]No epics found.[/yellow]")
            return

        table = Table(title="Epics")
        table.add_column("ID")
        table.add_column("Title")
        table.add_column("Status")
        table.add_column("Priority")
        table.add_column("Estimate")

        for ep in epics:
            table.add_row(
                ep["identifier"],
                ep["title"][:50] + ("..." if len(ep["title"]) > 50 else ""),
                ep["status"].replace("_", " ").title(),
                ep["priority"].replace("_", " ").title(),
                str(ep.get("estimate") or "-"),
            )

        console.print(table)

    @epic.command("show")
    @click.argument("identifier")
    @_main().json_option
    @_main().require_auth
    @_main().handle_error
    def epic_show(identifier):
        """Show epic details with sub-issue tree.

        Examples:
            chaotic epic show CHT-123
        """
        m = _main()
        issue = _client().get_issue_by_identifier(identifier)

        if issue.get('issue_type') != 'epic':
            console.print(f"[yellow]{identifier} is not an epic (type: {issue.get('issue_type', 'task')}). Use 'chaotic issue show' instead.[/yellow]")
            return

        # JSON output
        if m.is_json_output():
            issue['comments'] = _client().get_comments(issue["id"])
            try:
                issue['sub_issues'] = _client().get_sub_issues(issue["id"])
            except m.APIError:
                issue['sub_issues'] = []
            m.output_json(issue)
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
            sub_issues = _client().get_sub_issues(issue['id'])
        except m.APIError:
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
                mark = "[green]\u2713[/green]" if done else "[dim]\u2717[/dim]"
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

    return epic
