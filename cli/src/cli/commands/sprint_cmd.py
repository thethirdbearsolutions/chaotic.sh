"""Sprint management commands."""
import sys

import click
from rich.panel import Panel
from rich.table import Table

from .shared import _client, console, print_sprint_panel


def _main():
    """Late-bind to cli.main for test mock compatibility."""
    return sys.modules['cli.main']


def register(cli):
    """Register sprint commands on the CLI group."""

    @cli.group()
    def sprint():
        """Sprint management commands."""
        pass

    @sprint.command("list")
    @click.option("--status", type=click.Choice(["planned", "active", "completed"]))
    @_main().json_option
    @_main().require_project
    @_main().handle_error
    def sprint_list(status):
        """List sprints in current project."""
        m = _main()
        sprints = _client().get_sprints(m.get_current_project(), status)

        # JSON output mode (CHT-170)
        if m.is_json_output():
            m.output_json(sprints)
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

    @sprint.command("current")
    @_main().json_option
    @_main().require_project
    @_main().handle_error
    def sprint_current():
        """Show the current (active) sprint."""
        m = _main()
        result = _client().get_current_sprint(m.get_current_project())
        if m.is_json_output():
            m.output_json(result)
            return
        print_sprint_panel(result, title="Current Sprint")

    @sprint.command("status")
    @_main().json_option
    @_main().require_project
    @_main().handle_error
    def sprint_status():
        """Show current sprint status (alias for 'current')."""
        sprint_current.callback()

    @sprint.command("budget")
    @_main().json_option
    @_main().require_project
    @_main().handle_error
    def sprint_budget():
        """Show current sprint budget status."""
        m = _main()
        result = _client().get_current_sprint(m.get_current_project())
        if m.is_json_output():
            m.output_json(result)
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
    @_main().json_option
    @_main().require_project
    @_main().handle_error
    def sprint_show(sprint_id, show_current):
        """Show sprint details and its issues.

        If no SPRINT_ID is given, shows the current (active) sprint.
        Use --current to explicitly request the active sprint.
        """
        m = _main()
        project_id = m.get_current_project()
        if show_current or not sprint_id:
            resolved_id = m.resolve_sprint_id("current", project_id)
        else:
            resolved_id = m.resolve_sprint_id(sprint_id, project_id)
        result = _client().get_sprint(resolved_id)

        # JSON output mode (CHT-170)
        if m.is_json_output():
            issues = _client().get_issues(project_id=result.get("project_id", project_id), sprint_id=result["id"])
            result['issues'] = issues
            m.output_json(result)
            return

        print_sprint_panel(result)

        # Fetch and display the sprint's issues
        issues = _client().get_issues(project_id=result.get("project_id", project_id), sprint_id=result["id"])
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
    @_main().require_project
    @_main().handle_error
    def sprint_close(sprint_id):
        """Close the current sprint and rotate to next.

        SPRINT_ID can be a full ID, prefix, or omitted for current sprint.
        If project has rituals, sprint enters limbo until rituals are attested.
        """
        m = _main()
        project_id = m.get_current_project()
        sprint_id = m.resolve_sprint_id(sprint_id or "current", project_id)

        result = _client().close_sprint(sprint_id)

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
    @_main().require_auth
    @_main().handle_error
    def sprint_update(sprint_id, name, description, budget, no_budget):
        """Update a sprint.

        SPRINT_ID can be a full ID, prefix, or 'current'. Defaults to current sprint if omitted.
        """
        m = _main()
        project_id = m.get_current_project()
        if sprint_id is None:
            if not project_id:
                raise click.ClickException("No project selected and no SPRINT_ID given. Run 'chaotic project use <project_id>' first.")
            sprint_id = m.resolve_sprint_id("current", project_id)
        elif project_id:
            sprint_id = m.resolve_sprint_id(sprint_id, project_id)
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

        result = _client().update_sprint(sprint_id, **data)
        console.print(f"[green]Sprint '{result['name']}' updated.[/green]")

    @sprint.command("add")
    @click.argument("identifiers", nargs=-1, required=True)
    @_main().require_auth
    @_main().handle_error
    def sprint_add(identifiers):
        """Add issues to the current sprint.

        IDENTIFIERS are issue identifiers (e.g., CHT-123 CHT-456).

        \b
        Examples:
            chaotic sprint add CHT-123
            chaotic sprint add CHT-123 CHT-456 CHT-789
        """
        m = _main()
        project_id = m.get_current_project()
        if not project_id:
            raise click.ClickException("No project selected. Run 'chaotic project use <project_id>' first.")
        sprint_id = m.resolve_sprint_id("current", project_id)

        for identifier in identifiers:
            issue = _client().get_issue_by_identifier(identifier)
            _client().update_issue(issue["id"], sprint_id=sprint_id)
            console.print(f"[green]Added {issue['identifier']} to current sprint.[/green]")

    @sprint.command("remove")
    @click.argument("identifiers", nargs=-1, required=True)
    @_main().require_auth
    @_main().handle_error
    def sprint_remove(identifiers):
        """Remove issues from their sprint.

        IDENTIFIERS are issue identifiers (e.g., CHT-123 CHT-456).

        \b
        Examples:
            chaotic sprint remove CHT-123
            chaotic sprint remove CHT-123 CHT-456
        """
        for identifier in identifiers:
            issue = _client().get_issue_by_identifier(identifier)
            _client().update_issue(issue["id"], sprint_id=None)
            console.print(f"[green]Removed {issue['identifier']} from sprint.[/green]")

    @sprint.command("issues")
    @_main().json_option
    @_main().require_project
    @_main().handle_error
    def sprint_issues():
        """List issues in the current sprint.

        Shorthand for 'chaotic issue list --sprint current'.
        """
        m = _main()
        project_id = m.get_current_project()
        sprint_id = m.resolve_sprint_id("current", project_id)
        issues = _client().get_issues(project_id=project_id, sprint_id=sprint_id, limit=50)

        if m.is_json_output():
            m.output_json(issues)
            return

        if not issues:
            console.print("[yellow]No issues in the current sprint.[/yellow]")
            return

        sprints = _client().get_sprints(project_id)
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

    # Also register the 'budget' shortcut at the CLI root level
    @cli.command("budget")
    @_main().require_project
    @_main().handle_error
    def budget_shortcut():
        """Show current sprint budget status (shortcut for 'sprint budget')."""
        sprint_budget.callback()

    return sprint
