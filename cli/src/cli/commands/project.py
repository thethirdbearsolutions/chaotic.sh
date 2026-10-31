"""Project management commands."""
import sys

import click
from rich.panel import Panel
from ..markup import Table, esc

from .shared import _client, console, resolve_content_value


def _main():
    """Late-bind to cli.main for test mock compatibility."""
    return sys.modules['cli.main']


def _yes_no(value) -> str:
    return "Yes" if value else "No"


def _default_epic_label(p: dict) -> str:
    """The default epic's identifier and title, or "None". A lookup
    failure (the epic was deleted, or the API is older) falls back to
    the raw id rather than failing `project show`."""
    epic_id = p.get("default_epic_id")
    if not epic_id:
        return "None"
    try:
        epic = _client().get_issue(epic_id)
    except Exception:
        return epic_id
    return f"{epic.get('identifier', epic_id)} {epic.get('title', '')}".strip()


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
                        f"[dim]Installed pack '{esc(template_name)}' as a team template.[/dim]"
                    )
                else:
                    # ClickException for --json error-shape consistency
                    # (PR #220 review finding 4).
                    raise click.ClickException(
                        f"No saved template or bundled pack named "
                        f"'{template_name}'. Run 'chaotic template list' for "
                        f"saved templates or 'chaotic template install' for "
                        f"bundled packs."
                    )

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
            try:
                report = _client().apply_template(
                    template["id"], result["id"], update_all=True,
                )
            except Exception:
                # The project exists and is set current -- say so before the
                # error surfaces, or the partial state is invisible (PR #220
                # review finding 9). Goes to stderr under --json.
                console.print(
                    f"[yellow]Project {esc(result['key'])} was created, but the "
                    f"template was not applied. Fix the issue and run "
                    f"'chaotic template apply {esc(template_name)}'.[/yellow]"
                )
                raise

        if m.is_json_output():
            if report is not None:
                result = {**result, "template_applied": report}
            m.output_json(result)
            return
        console.print(f"[green]Project created: {esc(result['name'])} ({esc(result['key'])})[/green]")
        console.print(f"[dim]Set as current project[/dim]")
        if report is not None:
            created = sum(1 for c in report["rituals"] if c["action"] == "create")
            set_count = sum(1 for c in report["settings"] if c["action"] == "set")
            console.print(
                f"[green]Applied template '{esc(report['template'])}': "
                f"{esc(created)} ritual(s) created, {esc(set_count)} setting(s) set.[/green]"
            )
            for warning in report.get("warnings", []):
                console.print(f"[yellow]Warning: {esc(warning)}[/yellow]")

    @project.command("use")
    @click.argument("identifier")
    @_main().require_team
    @_main().handle_error
    def project_use(identifier):
        """Set current project by ID, key, or name."""
        m = _main()
        p = m.resolve_project(identifier)
        m.set_current_project(p["id"])
        console.print(f"[green]Switched to project: {esc(p['name'])}[/green]")

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
            f"[bold]{esc(p['name'])}[/bold]{esc(is_current)}\n"
            f"Key: {esc(p['key'])}\n"
            f"Description: {esc(p.get('description') or 'None')}\n"
            f"Issues: {esc(p['issue_count'])}\n"
            f"Estimate Scale: {esc(scale)}\n"
            f"Default Sprint Budget: {esc(budget_str)}\n"
            f"Unestimated Handling: {esc(unest)}\n"
            f"Require Estimate on Claim: {_yes_no(p.get('require_estimate_on_claim'))}\n"
            f"Require Assignee on Claim: {_yes_no(p.get('require_assignee_on_claim'))}\n"
            f"Require Epic on Close: {_yes_no(p.get('require_epic_on_close'))}\n"
            f"Default Epic: {esc(_default_epic_label(p))}",
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
    @click.option("--require-estimate-on-claim/--no-require-estimate-on-claim", default=None,
                  help="Agents must estimate a ticket before claiming it")
    @click.option("--require-assignee-on-claim/--no-require-assignee-on-claim", default=None,
                  help="Agents must leave a ticket assigned when claiming it")
    @click.option("--require-epic-on-close/--no-require-epic-on-close", default=None,
                  help="Agents must file a ticket under an epic before closing it "
                       "(the default epic is used when one is set)")
    @click.option("--default-epic", metavar="ISSUE",
                  help="Epic (e.g. CHT-12) that new tickets without a parent are filed under")
    @click.option("--no-default-epic", is_flag=True, help="Stop filing new tickets under a default epic")
    @_main().require_project
    @_main().handle_error
    def project_update(name, description, color, estimate_scale, default_sprint_budget, no_default_sprint_budget,
                       unestimated_handling, require_estimate_on_claim, require_assignee_on_claim,
                       require_epic_on_close, default_epic, no_default_epic):
        """Update the current project."""
        m = _main()
        if default_epic and no_default_epic:
            raise click.UsageError("Pass either --default-epic or --no-default-epic, not both.")
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
        for field, value in (
            ("require_estimate_on_claim", require_estimate_on_claim),
            ("require_assignee_on_claim", require_assignee_on_claim),
            ("require_epic_on_close", require_epic_on_close),
        ):
            if value is not None:
                data[field] = value
        if no_default_epic:
            data["default_epic_id"] = None
        elif default_epic:
            data["default_epic_id"] = _client().get_issue_by_identifier(default_epic.strip())["id"]

        if not data:
            console.print("[yellow]No updates provided.[/yellow]")
            return

        _client().update_project(m.get_current_project(), **data)
        console.print("[green]Project updated.[/green]")

    return project
