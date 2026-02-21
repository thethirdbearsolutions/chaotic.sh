"""Label management commands."""
import sys

import click
from rich.table import Table

from .shared import _client, console


def _main():
    """Late-bind to cli.main for test mock compatibility."""
    return sys.modules['cli.main']


def register(cli):
    """Register label commands on the CLI group."""

    @cli.group()
    def label():
        """Label management commands."""
        pass

    @label.command("list")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def label_list():
        """List labels in current team."""
        m = _main()
        labels = _client().get_labels(m.get_current_team())
        if m.is_json_output():
            m.output_json(labels or [])
            return
        if not labels:
            console.print("[yellow]No labels found.[/yellow]")
            return

        table = Table(title="Labels")
        table.add_column("ID", style="dim")
        table.add_column("Name")
        table.add_column("Color")

        for l in labels:
            table.add_row(l["id"][:8] + "...", l["name"], l["color"])

        console.print(table)

    @label.command("create")
    @click.argument("name")
    @click.option("--color", default="#6366f1")
    @click.option("--description", default="")
    @_main().require_team
    @_main().handle_error
    def label_create(name, color, description):
        """Create a new label."""
        m = _main()
        result = _client().create_label(m.get_current_team(), name, color=color, description=description or None)
        console.print(f"[green]Label created: {result['name']}[/green]")

    @label.command("update")
    @click.argument("label_id")
    @click.option("--name", help="New label name")
    @click.option("--color", help="New color (hex, e.g. #ff0000)")
    @click.option("--description", help="New description")
    @_main().require_team
    @_main().handle_error
    def label_update(label_id, name, color, description):
        """Update a label.

        LABEL_ID can be a full ID, name, or a prefix.
        """
        m = _main()
        team_id = m.get_current_team()
        resolved_id = m.resolve_label_id(label_id, team_id)
        kwargs = {}
        if name is not None:
            kwargs["name"] = name
        if color is not None:
            kwargs["color"] = color
        if description is not None:
            kwargs["description"] = description
        if not kwargs:
            console.print("[yellow]Nothing to update. Use --name, --color, or --description.[/yellow]")
            return
        _client().update_label(resolved_id, **kwargs)
        console.print("[green]Label updated.[/green]")

    @label.command("delete")
    @click.argument("label_id")
    @_main().require_team
    @_main().handle_error
    def label_delete(label_id):
        """Delete a label.

        LABEL_ID can be a full ID, name, or a prefix.
        """
        m = _main()
        if not m.confirm_action("Are you sure you want to delete this label?"):
            raise SystemExit(0)
        team_id = m.get_current_team()
        resolved_id = m.resolve_label_id(label_id, team_id)

        _client().delete_label(resolved_id)
        console.print("[green]Label deleted.[/green]")

    return label
