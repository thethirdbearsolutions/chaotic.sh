"""Project management commands."""
import sys

import click
from rich.panel import Panel
from rich.table import Table

from .shared import _client, console, resolve_content_value


def _main():
    """Late-bind to cli.main for test mock compatibility."""
    return sys.modules['cli.main']


def register(cli):
    """Register project commands on the CLI group."""

    @cli.group()
    def project():
        """Project management commands."""
        pass

    @project.command("list")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def project_list():
        """List all projects in current team."""
        m = _main()
        projects = _client().get_projects(m.get_current_team())
        if m.is_json_output():
            m.output_json(projects)
            return

        if not projects:
            console.print("[yellow]No projects found. Create one with 'chaotic project create'[/yellow]")
            return

        current = m.get_current_project()
        table = Table(title="Projects")
        table.add_column("ID", style="dim", overflow="fold")
        table.add_column("Key")
        table.add_column("Name")
        table.add_column("Issues")
        table.add_column("Current")

        for p in projects:
            is_current = "\u2713" if p["id"] == current else ""
            table.add_row(p["id"], p["key"], p["name"], str(p["issue_count"]), is_current)

        console.print(table)

    @project.command("create")
    @click.argument("name")
    @click.argument("key")
    @click.option("--description", default="", callback=resolve_content_value)
    @click.option("--color", default="#6366f1")
    @click.option("--estimate-scale", default="fibonacci",
                  type=click.Choice(["fibonacci", "linear", "powers_of_2", "tshirt"]),
                  help="Estimation scale for issues")
    @click.option("--default-sprint-budget", type=int, help="Default budget for new sprints")
    @click.option("--template", "template_name", metavar="NAME",
                  help="Apply a saved template or bundled starter pack after "
                       "creating (saved templates checked first, then packs; a "
                       "pack is installed as a team template on first use).")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def project_create(name, key, description, color, estimate_scale, default_sprint_budget, template_name):
        """Create a new project.

        With --template, applies a saved template (or bundled starter
        pack) to the new project right after creating it -- rituals and
        settings in one line. See 'chaotic template install' for the
        bundled packs.
        """
        m = _main()
        team_id = m.get_current_team()

        # Resolve --template BEFORE creating the project, so a typo'd
        # name fails loud with no side effects (CHT-1262).
        template = None
        if template_name:
            templates = _client().get_templates(team_id)
            template = next((t for t in templates if t["name"] == template_name), None)
            if template is None:
                from .template_cmd import available_packs, _doc_to_body
                packs = available_packs()
                if template_name in packs:
                    # First use of a bundled pack: install it as a team
                    # template, then apply that.
                    doc = packs[template_name]
                    template = _client().create_template(
                        team_id, doc["name"], _doc_to_body(doc),
                        description=doc.get("description"),
                    )
                    console.print(
                        f"[dim]Installed pack '{template_name}' as a team template.[/dim]"
                    )
                else:
                    console.print(
                        f"[red]No saved template or bundled pack named "
                        f"'{template_name}'.[/red]"
                    )
                    console.print(
                        "Run `chaotic template list` for saved templates or "
                        "`chaotic template install` for bundled packs."
                    )
                    raise SystemExit(1)

        result = _client().create_project(
            team_id, name, key.upper(),
            description=description or None, color=color, estimate_scale=estimate_scale,
            default_sprint_budget=default_sprint_budget
        )
        m.set_current_project(result["id"])

        report = None
        if template is not None:
            # Fresh project: no ritual collisions possible, so apply with
            # update_all rather than prompting per change.
            report = _client().apply_template(
                template["id"], result["id"], update_all=True,
            )

        if m.is_json_output():
            if report is not None:
                result = {**result, "template_applied": report}
            m.output_json(result)
            return
        console.print(f"[green]Project created: {result['name']} ({result['key']})[/green]")
        console.print(f"[dim]Set as current project[/dim]")
        if report is not None:
            created = sum(1 for c in report["rituals"] if c["action"] == "create")
            set_count = sum(1 for c in report["settings"] if c["action"] == "set")
            console.print(
                f"[green]Applied template '{report['template']}': "
                f"{created} ritual(s) created, {set_count} setting(s) set.[/green]"
            )
            for warning in report.get("warnings", []):
                console.print(f"[yellow]Warning: {warning}[/yellow]")

    @project.command("use")
    @click.argument("identifier")
    @_main().require_team
    @_main().handle_error
    def project_use(identifier):
        """Set current project by ID, key, or name."""
        m = _main()
        p = m.resolve_project(identifier)
        m.set_current_project(p["id"])
        console.print(f"[green]Switched to project: {p['name']}[/green]")

    @project.command("show")
    @click.argument("identifier", required=False)
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def project_show(identifier):
        """Show project details.

        IDENTIFIER can be a project ID, key (e.g., CHT), or name.
        If not provided, shows the current project.
        """
        m = _main()
        if identifier:
            p = m.resolve_project(identifier)
            project_id = p["id"]
        else:
            project_id = m.get_current_project()
            if not project_id:
                raise click.ClickException("No current project set. Use 'chaotic project use <key>' or provide an identifier.")
            p = _client().get_project(project_id)

        if m.is_json_output():
            m.output_json(p)
            return

        scale = p.get('estimate_scale', 'fibonacci').replace('_', ' ').title()
        budget = p.get('default_sprint_budget')
        budget_str = str(budget) if budget is not None else "Unlimited"
        unest = p.get('unestimated_handling', 'default_one_point').replace('_', ' ').title()
        is_current = " (current)" if project_id == m.get_current_project() else ""
        console.print(Panel(
            f"[bold]{p['name']}[/bold]{is_current}\n"
            f"Key: {p['key']}\n"
            f"Description: {p.get('description') or 'None'}\n"
            f"Issues: {p['issue_count']}\n"
            f"Estimate Scale: {scale}\n"
            f"Default Sprint Budget: {budget_str}\n"
            f"Unestimated Handling: {unest}",
            title="Project Details"
        ))

    @project.command("update")
    @click.option("--name")
    @click.option("--description", callback=resolve_content_value)
    @click.option("--color")
    @click.option("--estimate-scale",
                  type=click.Choice(["fibonacci", "linear", "powers_of_2", "tshirt"]),
                  help="Estimation scale for issues")
    @click.option("--default-sprint-budget", type=int, help="Default budget for new sprints")
    @click.option("--no-default-sprint-budget", is_flag=True, help="Remove default sprint budget")
    @click.option("--unestimated-handling",
                  type=click.Choice(["default_one_point", "block_until_estimated"], case_sensitive=False),
                  help="How unestimated tickets are handled on completion")
    @_main().require_project
    @_main().handle_error
    def project_update(name, description, color, estimate_scale, default_sprint_budget, no_default_sprint_budget, unestimated_handling):
        """Update the current project."""
        m = _main()
        data = {}
        if name:
            data["name"] = name
        if description is not None:
            data["description"] = description
        if color:
            data["color"] = color
        if estimate_scale:
            data["estimate_scale"] = estimate_scale
        if no_default_sprint_budget:
            data["default_sprint_budget"] = None
        elif default_sprint_budget is not None:
            data["default_sprint_budget"] = default_sprint_budget
        if unestimated_handling:
            data["unestimated_handling"] = unestimated_handling

        if not data:
            console.print("[yellow]No updates provided.[/yellow]")
            return

        _client().update_project(m.get_current_project(), **data)
        console.print("[green]Project updated.[/green]")

    return project
