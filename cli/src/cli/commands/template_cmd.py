"""Template management commands (CHT-1259, CHT-1260, CHT-1261).

A template is a named, portable snapshot of (rituals + project settings)
scoped to your team. Create one from a configured project, apply it to
others, export/import as human-reviewable YAML, or install one of the
bundled starter packs.

Apply never deletes: rituals a project has that the template doesn't
are left alone. Same-named rituals that differ are only updated with
per-ritual confirmation (or --yes).
"""
import json as json_module
import sys
from importlib import resources
from pathlib import Path

import click
import yaml
from rich.table import Table

from .shared import _client, console, resolve_content_value


def _main():
    """Late-bind to cli.main for test mock compatibility."""
    return sys.modules['cli.main']


# ---------------------------------------------------------------------------
# Bundled packs (CHT-1261). YAML files shipped as cli package data.
# ---------------------------------------------------------------------------


def available_packs() -> dict:
    """Load bundled starter packs, keyed by pack name.

    Fails loud on a malformed bundled file -- these ship with the CLI, so
    a parse error is a packaging bug, not a user mistake.
    """
    packs = {}
    pack_dir = resources.files("cli") / "packs"
    for entry in sorted(pack_dir.iterdir(), key=lambda e: e.name):
        if not entry.name.endswith((".yml", ".yaml")):
            continue
        doc = yaml.safe_load(entry.read_text())
        if not isinstance(doc, dict) or "name" not in doc:
            raise RuntimeError(
                f"Bundled pack {entry.name} is malformed (expected a mapping "
                f"with a 'name' key) -- this is a chaotic-cli packaging bug."
            )
        packs[doc["name"]] = doc
    return packs


def _doc_to_body(doc: dict) -> dict:
    """Extract the API body payload from a template YAML document."""
    return {
        "version": doc.get("version", 1),
        "sections": doc.get("sections", {}),
    }


def _template_to_doc(template: dict) -> dict:
    """Build the export YAML document for a template API response."""
    doc = {"name": template["name"]}
    if template.get("description"):
        doc["description"] = template["description"]
    doc["version"] = template["body"]["version"]
    doc["sections"] = template["body"]["sections"]
    return doc


def _yaml_dump(doc: dict) -> str:
    """Dump human-reviewable YAML: stable key order, literal blocks for
    multiline strings (ritual prompts stay readable)."""

    class _Dumper(yaml.SafeDumper):
        pass

    def _str_representer(dumper, data):
        if "\n" in data:
            return dumper.represent_scalar("tag:yaml.org,2002:str", data, style="|")
        return dumper.represent_scalar("tag:yaml.org,2002:str", data)

    _Dumper.add_representer(str, _str_representer)
    return yaml.dump(
        doc, Dumper=_Dumper, sort_keys=False, allow_unicode=True,
        default_flow_style=False,
    )


def _resolve_template(name: str) -> dict:
    """Find a saved template by name in the current team, or fail loud.

    ClickException (not console.print + SystemExit) so the --json error
    contract holds: handle_error turns it into {"error": ...} on stdout
    (PR #220 review finding 4).
    """
    m = _main()
    templates = _client().get_templates(m.get_current_team())
    template = next((t for t in templates if t["name"] == name), None)
    if not template:
        raise click.ClickException(
            f"Template '{name}' not found. Run 'chaotic template list' to "
            f"see saved templates, or 'chaotic template install' to see "
            f"bundled packs."
        )
    return template


def _print_apply_report(report: dict):
    """Human-readable rendering of a TemplateApplyReport."""
    prefix = "[dim](dry run)[/dim] " if report.get("dry_run") else ""
    console.print(
        f"{prefix}Applied template [bold]{report['template']}[/bold] "
        f"to project {report['project_key']}:"
    )
    for change in report["rituals"]:
        fields = ", ".join(change.get("fields_changed") or [])
        if change["action"] == "create":
            console.print(f"  [green]+[/green] created ritual '{change['name']}'")
        elif change["action"] == "update":
            console.print(f"  [cyan]~[/cyan] updated ritual '{change['name']}' ({fields})")
        elif change["action"] == "skipped":
            console.print(
                f"  [yellow]![/yellow] skipped ritual '{change['name']}' "
                f"(differs: {fields}) -- re-run and confirm, or use --yes"
            )
        else:
            console.print(f"  [dim]=[/dim] ritual '{change['name']}' unchanged")
    for change in report["settings"]:
        if change["action"] == "set":
            console.print(
                f"  [cyan]~[/cyan] setting {change['field']}: "
                f"{change['old_value']} -> {change['new_value']}"
            )
        else:
            console.print(f"  [dim]=[/dim] setting {change['field']} unchanged")
    if not report["rituals"] and not report["settings"]:
        console.print("  [dim](template is empty -- nothing to apply)[/dim]")
    for warning in report.get("warnings", []):
        console.print(f"  [yellow]Warning: {warning}[/yellow]")


def _apply_with_confirmation(template: dict, project_id: str, yes: bool = False) -> dict:
    """Run the apply flow: dry-run to find conflicts, confirm each update
    (skipped under --json without --yes; all approved with --yes), then
    the real apply. Returns the final change report.

    Approval is per-RITUAL, not per-field-set: the final apply recomputes
    the diff server-side, so if a ritual changes between the dry run and
    the apply, an approved update may touch fields beyond the ones shown
    at the prompt (always toward template values; the final report shows
    actuals). New conflicts appearing in that window are skipped, never
    clobbered.
    """
    m = _main()

    if yes or m.is_yes_mode():
        return _client().apply_template(template["id"], project_id, update_all=True)

    dry = _client().apply_template(
        template["id"], project_id, update_all=True, dry_run=True,
    )
    conflicts = [c for c in dry["rituals"] if c["action"] == "update"]
    approved = []
    if conflicts and not m.is_json_output():
        # Interactive: one prompt per conflicting ritual. Under --json,
        # prompts are disabled (CHT-1222) -- conflicts stay skipped and
        # the report says so; pass --yes to update them.
        for change in conflicts:
            fields = ", ".join(change.get("fields_changed") or [])
            if click.confirm(
                f"Ritual '{change['name']}' already exists and differs "
                f"({fields}). Update it from the template?",
                err=True,
            ):
                approved.append(change["name"])
    return _client().apply_template(
        template["id"], project_id, update_rituals=approved,
    )


def register(cli):
    """Register template commands on the CLI group."""

    @cli.group()
    def template():
        """Project config templates (rituals + settings).

        A template is a named, portable snapshot of a project's rituals
        and settings, saved at the team level. Apply is idempotent and
        never deletes: rituals a project has that the template doesn't
        mention are left untouched.
        """
        pass

    @template.command("create")
    @click.argument("name")
    @click.option("--from-project", "from_project", required=True, metavar="KEY",
                  help="Project (key, name, or ID) to snapshot")
    @click.option("--description", default="", callback=resolve_content_value,
                  help="What this template is for")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def template_create(name, from_project, description):
        """Create a template by snapshotting a project's rituals + settings.

        NAME is the template name (unique within your team).

        Captures the project's active rituals (name, prompt, trigger,
        approval mode, note requirement) and settings (estimate scale,
        unestimated handling, default sprint budget, human-rituals-required,
        require-estimate-on-claim).
        """
        m = _main()
        project = m.resolve_project(from_project)
        result = _client().create_template_from_project(
            m.get_current_team(), name, project["id"],
            description=description or None,
        )
        if m.is_json_output():
            m.output_json(result)
            return
        ritual_count = len(result["body"]["sections"].get("rituals", []))
        console.print(
            f"[green]Template created: {result['name']} "
            f"({ritual_count} ritual(s) from {project['key']})[/green]"
        )

    @template.command("list")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def template_list():
        """List saved templates for the current team."""
        m = _main()
        templates = _client().get_templates(m.get_current_team())
        if m.is_json_output():
            m.output_json(templates or [])
            return
        if not templates:
            console.print("[yellow]No templates saved for this team.[/yellow]")
            console.print("[dim]Create one with 'chaotic template create <name> "
                          "--from-project <key>', or install a starter pack with "
                          "'chaotic template install'.[/dim]")
            return
        table = Table(title="Templates")
        table.add_column("Name")
        table.add_column("Description")
        table.add_column("Rituals", justify="right")
        for t in templates:
            ritual_count = len(t["body"]["sections"].get("rituals", []))
            table.add_row(t["name"], t.get("description") or "", str(ritual_count))
        console.print(table)

    @template.command("show")
    @click.argument("name")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def template_show(name):
        """Show a template's rituals and settings.

        NAME is the template name.
        """
        m = _main()
        t = _resolve_template(name)
        if m.is_json_output():
            m.output_json(t)
            return

        console.print(f"[bold]{t['name']}[/bold]")
        if t.get("description"):
            console.print(f"  {t['description']}")

        sections = t["body"]["sections"]
        rituals = sections.get("rituals", [])
        if rituals:
            console.print("\n[bold]Rituals:[/bold]")
            for r in rituals:
                trigger_desc = {
                    "every_sprint": "sprint-close",
                    "ticket_close": "ticket-close",
                    "ticket_claim": "ticket-claim",
                }.get(r.get("trigger"), r.get("trigger"))
                mode = r.get("approval_mode", "auto")
                console.print(f"  [cyan]{r['name']}[/cyan] ({trigger_desc}, {mode})")
                first_line = (r.get("prompt") or "").strip().splitlines()[0] if r.get("prompt") else ""
                if first_line:
                    console.print(f"    [dim]{first_line}[/dim]")
        else:
            console.print("\n[dim]No rituals in this template.[/dim]")

        settings = sections.get("settings", {})
        if settings:
            console.print("\n[bold]Settings:[/bold]")
            for key, value in settings.items():
                console.print(f"  {key}: {value}")

        unknown = sorted(set(sections) - {"rituals", "settings"})
        if unknown:
            console.print(
                f"\n[yellow]Contains section(s) this CLI version doesn't "
                f"understand: {', '.join(unknown)}[/yellow]"
            )

    @template.command("apply")
    @click.argument("name")
    @click.option("--project", "project_identifier", metavar="KEY",
                  help="Target project (key, name, or ID); defaults to the current project")
    @click.option("--yes", "-y", is_flag=True,
                  help="Update all conflicting rituals without prompting")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def template_apply(name, project_identifier, yes):
        """Apply a template to a project (idempotent).

        NAME is the template name.

        Creates rituals the project is missing. Same-named rituals that
        differ are updated only after a per-ritual confirmation (--yes
        approves all; under --json without --yes they're skipped and
        reported). Settings pinned by the template are set.

        Never deletes: rituals the project has that the template doesn't
        mention are left untouched. Running apply twice is a no-op the
        second time.
        """
        m = _main()
        template = _resolve_template(name)

        if project_identifier:
            project_id = m.resolve_project(project_identifier)["id"]
        else:
            project_id = m.get_current_project()
            if not project_id:
                raise click.ClickException(
                    "No project selected. Pass --project <key> or run "
                    "'chaotic project use <key>' first."
                )

        report = _apply_with_confirmation(template, project_id, yes=yes)
        if m.is_json_output():
            m.output_json(report)
            return
        _print_apply_report(report)

    @template.command("delete")
    @click.argument("name")
    @click.option("--yes", "-y", is_flag=True, help="Skip confirmation")
    @_main().require_team
    @_main().handle_error
    def template_delete(name, yes):
        """Delete a saved template.

        NAME is the template name. Projects the template was applied to
        are not affected.
        """
        m = _main()
        template = _resolve_template(name)
        if not yes:
            if not m.confirm_action(f"Delete template '{name}'?"):
                console.print("[dim]Cancelled.[/dim]")
                return
        _client().delete_template(template["id"])
        console.print(f"[green]Template '{name}' deleted.[/green]")

    @template.command("export")
    @click.argument("name")
    @click.option("-o", "--output", "output_path", type=click.Path(dir_okay=False),
                  help="Write to a file instead of stdout")
    @_main().require_team
    @_main().handle_error
    def template_export(name, output_path):
        """Export a template as human-reviewable YAML (CHT-1260).

        NAME is the template name. Writes to stdout unless -o is given.
        The output round-trips through 'chaotic template import'.
        """
        template = _resolve_template(name)
        text = _yaml_dump(_template_to_doc(template))
        if output_path:
            Path(output_path).write_text(text)
            console.print(f"[green]Exported template '{name}' to {output_path}[/green]")
        else:
            click.echo(text, nl=False)

    @template.command("import")
    @click.argument("file", type=click.Path(exists=True, dir_okay=False))
    @click.option("--name", "name_override",
                  help="Save under this name instead of the file's own")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def template_import(file, name_override):
        """Import a template from a YAML file (CHT-1260).

        FILE is a YAML document as produced by 'chaotic template export'
        (or a bundled pack file). Sections this CLI version doesn't
        recognize are preserved as-is.
        """
        m = _main()
        try:
            doc = yaml.safe_load(Path(file).read_text())
        except yaml.YAMLError as e:
            raise click.ClickException(f"Could not parse {file} as YAML: {e}")
        if not isinstance(doc, dict):
            raise click.ClickException(
                f"{file} does not contain a template document (expected a "
                f"YAML mapping with name/version/sections)."
            )
        name = name_override or doc.get("name")
        if not name:
            raise click.ClickException(
                f"{file} has no 'name' key; pass --name to set one."
            )
        body = _doc_to_body(doc)
        # YAML can parse scalars JSON can't carry (unquoted dates ->
        # datetime.date); the HTTP client would die with a raw TypeError.
        # Fail with a message instead (PR #220 review finding 5).
        try:
            json_module.dumps(body)
        except (TypeError, ValueError) as e:
            raise click.ClickException(
                f"{file} contains values that aren't JSON-representable "
                f"({e}). Quote YAML scalars like dates so they stay strings."
            )
        result = _client().create_template(
            m.get_current_team(), name, body,
            description=doc.get("description"),
        )
        if m.is_json_output():
            m.output_json(result)
            return
        ritual_count = len(result["body"]["sections"].get("rituals", []))
        console.print(
            f"[green]Template imported: {result['name']} "
            f"({ritual_count} ritual(s))[/green]"
        )
        console.print(f"[dim]Apply it with 'chaotic template apply {result['name']}'.[/dim]")

    @template.command("install")
    @click.argument("pack", required=False)
    @click.option("--name", "name_override",
                  help="Save under this name instead of the pack's own")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def template_install(pack, name_override):
        """Install a bundled starter pack as a team template (CHT-1261).

        Without PACK, lists the available bundled packs. With PACK,
        saves it as a template for your team -- apply it to a project
        with 'chaotic template apply <name>'.
        """
        m = _main()
        packs = available_packs()

        if not pack:
            if m.is_json_output():
                m.output_json([
                    {"name": p["name"], "description": p.get("description", "")}
                    for p in packs.values()
                ])
                return
            console.print("[bold]Available starter packs:[/bold]\n")
            for p in packs.values():
                console.print(f"  [cyan]{p['name']}[/cyan]")
                console.print(f"    {p.get('description', '')}")
                rituals = p.get("sections", {}).get("rituals", [])
                names = ", ".join(r["name"] for r in rituals)
                console.print(f"    [dim]rituals: {names}[/dim]\n")
            console.print("[dim]Install one with 'chaotic template install <pack>'.[/dim]")
            return

        if pack not in packs:
            # ClickException for --json error-shape consistency (PR #220
            # review finding 4).
            raise click.ClickException(
                f"Unknown pack '{pack}'. Available packs: {', '.join(packs)}"
            )

        doc = packs[pack]
        name = name_override or doc["name"]
        result = _client().create_template(
            m.get_current_team(), name, _doc_to_body(doc),
            description=doc.get("description"),
        )
        if m.is_json_output():
            m.output_json(result)
            return
        console.print(f"[green]Installed pack '{pack}' as template '{result['name']}'.[/green]")
        console.print(f"[dim]Apply it with 'chaotic template apply {result['name']}'.[/dim]")

    return template
