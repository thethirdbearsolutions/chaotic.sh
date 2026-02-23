"""Ritual management commands."""
import json as json_module
import sys

import click
from rich.panel import Panel
from rich.table import Table

from .shared import _client, console, format_ritual_line, print_ritual_prompt


def _main():
    """Late-bind to cli.main for test mock compatibility."""
    return sys.modules['cli.main']


def register(cli):
    """Register ritual commands on the CLI group."""

    @cli.group()
    def ritual():
        """Ritual management commands.

        Rituals are mindfulness checkpoints at sprint boundaries.
        When a sprint closes, pending rituals must be attested before
        the next sprint can begin.
        """
        pass

    @ritual.command("list")
    @click.option("--pending", is_flag=True, help="Show only pending/incomplete rituals")
    @click.option("--ticket", "ticket_id", help="Show pending rituals for a specific ticket (e.g., CHT-123)")
    @click.option("--deleted", is_flag=True, help="Include deleted (inactive) rituals")
    @_main().json_option
    @_main().require_project
    @_main().handle_error
    def ritual_list(pending, ticket_id, deleted):
        """List rituals and show limbo status."""
        m = _main()
        project_id = m.get_current_project()

        # JSON output mode
        if m.is_json_output():
            if ticket_id:
                issue = _client().get_issue_by_identifier(ticket_id)
                pending_rituals = _client().get_pending_issue_rituals(issue["id"])
                m.output_json(pending_rituals)
            else:
                status = _client().get_limbo_status(project_id)
                rituals = _client().get_rituals(project_id, include_inactive=deleted)
                result = {"limbo_status": status, "rituals": rituals}
                if pending:
                    result.pop("rituals")  # --pending: only show limbo status
                m.output_json(result)
            return

        # If --ticket is specified, show pending rituals for that ticket
        if ticket_id:
            issue = _client().get_issue_by_identifier(ticket_id)
            if not issue:
                console.print(f"[red]Issue '{ticket_id}' not found.[/red]")
                raise SystemExit(1)
            pending_rituals = _client().get_pending_issue_rituals(issue["id"])
            rituals_list = pending_rituals.get("pending_rituals", [])
            if not rituals_list:
                console.print(f"[green]No pending rituals for {ticket_id}.[/green]")
                return
            console.print(f"\n[bold]Pending Rituals for {ticket_id}:[/bold]")
            for r in rituals_list:
                mode = f"[dim]({r.get('approval_mode', 'auto')})[/dim]"
                if r.get("attestation"):
                    if r["attestation"].get("approved_at"):
                        console.print(f"  [green]\u2713[/green] {r['name']} {mode}")
                    else:
                        console.print(f"  [yellow]\u23f3[/yellow] {r['name']} {mode} - attested, pending approval")
                else:
                    console.print(f"  [red]\u25cb[/red] {r['name']} {mode}")
                    print_ritual_prompt(r['prompt'])
            return

        status = _client().get_limbo_status(project_id)

        if status["in_limbo"]:
            console.print(Panel(
                "[yellow]Sprint is in LIMBO[/yellow]\n"
                "Complete pending rituals to continue.\n"
                "Run [bold]chaotic ritual pending[/bold] to see what to do next.",
                title="Limbo Status"
            ))

        if status["pending_rituals"]:
            console.print("\n[bold]Pending Sprint Rituals:[/bold]")
            for r in status["pending_rituals"]:
                mode = f"[dim]({r['approval_mode']})[/dim]"
                if r.get("attestation"):
                    if r["attestation"].get("approved_at"):
                        console.print(f"  [green]\u2713[/green] {r['name']} {mode}")
                    else:
                        console.print(f"  [yellow]\u23f3[/yellow] {r['name']} {mode} - attested, pending approval")
                else:
                    console.print(f"  [red]\u25cb[/red] {r['name']} {mode}")
                    print_ritual_prompt(r['prompt'])

        # Skip completed rituals if --pending flag is set
        if status["completed_rituals"] and not pending:
            console.print("\n[bold]Completed Sprint Rituals:[/bold]")
            for r in status["completed_rituals"]:
                console.print(f"  [green]\u2713[/green] {r['name']}")

        # Always show all configured rituals grouped by trigger type
        rituals = _client().get_rituals(project_id, include_inactive=deleted)
        if rituals:
            sprint_rituals = [r for r in rituals if r.get("trigger", "every_sprint") == "every_sprint"]
            ticket_close_rituals = [r for r in rituals if r.get("trigger") == "ticket_close"]
            ticket_claim_rituals = [r for r in rituals if r.get("trigger") == "ticket_claim"]

            if not status["pending_rituals"] and not status["completed_rituals"]:
                # Not in limbo, show all configured rituals
                if sprint_rituals:
                    console.print("\n[bold]Sprint-Close Rituals:[/bold]")
                    for r in sprint_rituals:
                        console.print(format_ritual_line(r))
                        print_ritual_prompt(r['prompt'])

            if ticket_close_rituals:
                console.print("\n[bold]Ticket-Close Rituals:[/bold]")
                for r in ticket_close_rituals:
                    console.print(format_ritual_line(r))
                    print_ritual_prompt(r['prompt'])
                console.print("  [dim]Use 'chaotic ritual attest <name> --ticket <issue>' to attest.[/dim]")

            if ticket_claim_rituals:
                console.print("\n[bold]Ticket-Claim Rituals:[/bold]")
                for r in ticket_claim_rituals:
                    console.print(format_ritual_line(r))
                    print_ritual_prompt(r['prompt'])
                console.print("  [dim]Use 'chaotic ritual attest <name> --ticket <issue>' to attest.[/dim]")

        if not rituals:
            console.print("[yellow]No rituals configured for this project.[/yellow]")
            console.print("[dim]Create rituals with 'chaotic ritual create'.[/dim]")

    @ritual.command("show")
    @click.argument("ritual_name")
    @_main().json_option
    @_main().require_project
    @_main().handle_error
    def ritual_show(ritual_name):
        """Show details for a specific ritual.

        RITUAL_NAME is the name of the ritual to inspect.
        """
        m = _main()
        project_id = m.get_current_project()

        # Find ritual by name, case-insensitive (include inactive so we can
        # show deleted ones too)
        rituals = _client().get_rituals(project_id, include_inactive=True)
        rit = next((r for r in rituals if r["name"].lower() == ritual_name.lower()), None)

        if not rit:
            console.print(f"[red]Ritual '{ritual_name}' not found.[/red]")
            console.print("Run `chaotic ritual list` to see available rituals.")
            raise SystemExit(1)

        if m.is_json_output():
            m.output_json(rit)
            return

        # Header
        active_badge = "" if rit.get("is_active", True) else " [red](deleted)[/red]"
        console.print(f"[bold]{rit['name']}[/bold]{active_badge}")

        # Trigger
        trigger_desc = {
            "every_sprint": "Sprint close",
            "ticket_close": "Ticket close",
            "ticket_claim": "Ticket claim",
        }.get(rit.get("trigger", "every_sprint"), rit.get("trigger", "every_sprint"))
        console.print(f"  Trigger: {trigger_desc}")

        # Mode
        mode_desc = {
            "auto": "Auto (agent clears immediately)",
            "review": "Review (agent attests, human approves)",
            "gate": "Gate (human only)",
        }.get(rit.get("approval_mode", "auto"), rit.get("approval_mode", "auto"))
        console.print(f"  Mode: {mode_desc}")

        # Note required
        note_req = rit.get("note_required", True)
        console.print(f"  Note required: {'yes' if note_req else 'no'}")

        # Prompt
        console.print(f"  Prompt: \"{rit.get('prompt', '')}\"")

        # Conditions
        conditions = rit.get("conditions")
        if conditions:
            console.print(f"  Conditions: {json_module.dumps(conditions)}")

        # Group
        if rit.get("group_id"):
            groups = _client().get_ritual_groups(project_id)
            group = next((g for g in groups if g["id"] == rit["group_id"]), None)
            group_name = group["name"] if group else rit["group_id"][:8]
            console.print(f"  Group: {group_name}")
            if rit.get("weight") is not None:
                console.print(f"  Weight: {rit['weight']}")
            if rit.get("percentage") is not None:
                console.print(f"  Percentage: {rit['percentage']}%")

    @ritual.command("pending")
    @click.argument("ticket_id", required=False)
    @_main().require_project
    @_main().handle_error
    def ritual_pending(ticket_id):
        """Show the next ritual you need to complete.

        Without arguments, shows the next pending sprint ritual (during limbo).
        With a TICKET_ID argument, shows the next pending ticket ritual.
        """
        m = _main()
        project_id = m.get_current_project()

        if ticket_id:
            issue = _client().get_issue_by_identifier(ticket_id)
            if not issue:
                console.print(f"[red]Issue '{ticket_id}' not found.[/red]")
                raise SystemExit(1)
            pending_rituals = _client().get_pending_issue_rituals(issue["id"])
            rituals_list = pending_rituals.get("pending_rituals", [])
            if not rituals_list:
                console.print(f"[green]No pending rituals for {ticket_id}.[/green]")
                return
            # Find first un-attested ritual
            r = None
            for candidate in rituals_list:
                if not candidate.get("attestation"):
                    r = candidate
                    break
            if not r:
                # All attested — show first (pending approval or approved)
                r = rituals_list[0]
            mode = f"[dim]({r.get('approval_mode', 'auto')})[/dim]"
            if r.get("attestation"):
                if r["attestation"].get("approved_at"):
                    console.print(f"[green]\u2713[/green] {r['name']} {mode} - approved")
                    return
                else:
                    console.print(f"[yellow]\u23f3[/yellow] {r['name']} {mode} - attested, pending approval")
                    raise SystemExit(1)
            else:
                console.print(f"\n[bold]Next pending ritual for {ticket_id}:[/bold] {r['name']} {mode}")
                print_ritual_prompt(r['prompt'])
                console.print(f"\n  [dim]Usage: chaotic ritual attest {r['name']} --ticket {ticket_id} --note \"your note here\"[/dim]")
                raise SystemExit(1)
        else:
            status = _client().get_limbo_status(project_id)
            pending_rituals = status.get("pending_rituals", [])
            if not pending_rituals:
                console.print("[green]No pending sprint rituals.[/green]")
                return
            # Find first un-attested ritual
            next_r = None
            for r in pending_rituals:
                if not r.get("attestation"):
                    next_r = r
                    break
            if not next_r:
                # All attested — show first (pending approval or approved)
                next_r = pending_rituals[0]
            mode = f"[dim]({next_r.get('approval_mode', 'auto')})[/dim]"
            if next_r.get("attestation"):
                if next_r["attestation"].get("approved_at"):
                    console.print(f"[green]\u2713[/green] {next_r['name']} {mode} - approved")
                    return
                else:
                    console.print(f"[yellow]\u23f3[/yellow] {next_r['name']} {mode} - attested, pending approval")
                    raise SystemExit(1)
            else:
                console.print(f"\n[bold]Next pending ritual:[/bold] {next_r['name']} {mode}")
                print_ritual_prompt(next_r['prompt'])
                console.print(f"\n  [dim]Usage: chaotic ritual attest {next_r['name']} --note \"your note here\"[/dim]")
                raise SystemExit(1)

    @ritual.command("attest")
    @click.argument("ritual_name")
    @click.option("--note", "--notes", help="Note about the attestation (required by default; error shows ritual prompt if omitted)")
    @click.option("--ticket", "ticket_id", help="Issue identifier for ticket-level rituals (e.g., CHT-123)")
    @_main().require_project
    @_main().handle_error
    def ritual_attest(ritual_name, note, ticket_id):
        """Attest to a ritual (confirm you did it).

        RITUAL_NAME is the name of the ritual to attest.

        For ticket-level rituals (close or claim), use --ticket to specify the issue.
        """
        m = _main()
        project_id = m.get_current_project()

        # Get rituals to find the ID
        rituals = _client().get_rituals(project_id)
        rit = next((r for r in rituals if r["name"] == ritual_name), None)

        if not rit:
            console.print(f"[red]Ritual '{ritual_name}' not found.[/red]")
            console.print("Run `chaotic ritual list` to see available rituals.")
            raise SystemExit(1)

        # Check if note is required (reject empty/whitespace-only notes)
        if rit.get("note_required", True) and not (note and note.strip()):
            console.print("[red]Error: Attestation requires a note.[/red]")
            console.print()
            console.print(f"[bold]This ritual asks:[/bold] \"{rit['prompt']}\"")
            console.print()
            if ticket_id:
                console.print(f"[dim]Usage: chaotic ritual attest {ritual_name} --ticket {ticket_id} --note \"your note here\"[/dim]")
            else:
                console.print(f"[dim]Usage: chaotic ritual attest {ritual_name} --note \"your note here\"[/dim]")
            raise SystemExit(1)

        # Check if this is a ticket-level ritual (close or claim)
        if rit.get("trigger") in ("ticket_close", "ticket_claim"):
            if not ticket_id:
                trigger_type = "ticket-close" if rit.get("trigger") == "ticket_close" else "ticket-claim"
                console.print(f"[red]Ritual '{ritual_name}' is a {trigger_type} ritual. Use --ticket <issue-id>.[/red]")
                raise SystemExit(1)

            # Get the issue to get its ID
            issue = _client().get_issue_by_identifier(ticket_id)
            result = _client().attest_ritual_for_issue(rit["id"], issue["id"], note)

            if result.get("approved_at"):
                console.print(f"[green]Ritual '{ritual_name}' cleared for {ticket_id}.[/green]")
            else:
                console.print(f"[yellow]Ritual '{ritual_name}' attested for {ticket_id}, pending human approval.[/yellow]")
        else:
            # Sprint ritual
            if ticket_id:
                console.print(f"[yellow]Note: --ticket ignored for sprint rituals.[/yellow]")

            result = _client().attest_ritual(rit["id"], project_id, note)

            if result.get("approved_at"):
                # Check if limbo cleared
                status = _client().get_limbo_status(project_id)
                if not status["in_limbo"]:
                    console.print(f"[green]Ritual '{ritual_name}' cleared. Limbo complete.[/green]")
                else:
                    pending_count = len(status["pending_rituals"])
                    console.print(f"[green]Ritual '{ritual_name}' cleared.[/green] {pending_count} remaining.")
                    console.print("Run `chaotic ritual list` to continue.")
            else:
                console.print(f"[yellow]Ritual '{ritual_name}' attested, pending human approval.[/yellow]")

    @ritual.command("create")
    @click.argument("name")
    @click.argument("ritual_prompt")
    @click.option("--mode", default="auto", type=click.Choice(["auto", "review", "gate"]),
                  help="Approval mode: auto (agent clears), review (human approves), gate (human only)")
    @click.option("--trigger", default="every_sprint", type=click.Choice(["every_sprint", "ticket_close", "ticket_claim"]),
                  help="When ritual is required: every_sprint, ticket_close (when closing), or ticket_claim (when claiming)")
    @click.option("--note-required/--no-note-required", default=True,
                  help="Require a note when attesting (default: required)")
    @click.option("--group", help="Name of ritual group to add this ritual to (for random/rotation selection)")
    @click.option("--weight", type=float, default=1.0, help="Weight for random selection in group (default: 1.0)")
    @click.option("--percentage", type=float, help="Percentage chance (0-100) for PERCENTAGE mode groups")
    @_main().require_project
    @_main().handle_error
    def ritual_create(name, ritual_prompt, mode, trigger, note_required, group, weight, percentage):
        """Create a new ritual for the project.

        Triggers:
          every_sprint - Required when closing a sprint (default)
          ticket_close - Required when closing/canceling tickets
          ticket_claim - Required when claiming tickets (moving to in_progress)

        Modes:
          auto   - Agent attestation clears immediately (default)
          review - Agent attests, human must approve
          gate   - Only human can complete (agent cannot attest)

        Groups:
          Add ritual to a group for alternative selection. Use --group to specify.
          For RANDOM_ONE groups, use --weight for weighted selection.
          For PERCENTAGE groups, use --percentage to set chance (0-100).
        """
        m = _main()
        project_id = m.get_current_project()

        # Check if project is in limbo and warn
        status = _client().get_limbo_status(project_id)
        if status["in_limbo"]:
            console.print("[yellow]Warning: Project is in limbo. This ritual will be added to the pending rituals list.[/yellow]")
            if not m.confirm_action("Continue creating ritual?"):
                raise SystemExit(0)

        # Resolve group name to ID if provided
        group_id = None
        if group:
            groups = _client().get_ritual_groups(project_id)
            matching = next((g for g in groups if g["name"] == group), None)
            if not matching:
                console.print(f"[red]Ritual group '{group}' not found.[/red]")
                console.print("Run `chaotic ritual group list` to see available groups.")
                raise SystemExit(1)
            group_id = matching["id"]

        result = _client().create_ritual(
            project_id,
            name,
            ritual_prompt,
            approval_mode=mode,
            trigger=trigger,
            note_required=note_required,
            group_id=group_id,
            weight=weight,
            percentage=percentage,
        )
        trigger_desc = {"every_sprint": "sprint-close", "ticket_close": "ticket-close", "ticket_claim": "ticket-claim"}.get(trigger, trigger)
        group_info = f" (group: {group})" if group else ""
        console.print(f"[green]Ritual created: {result['name']} ({trigger_desc}){group_info}[/green]")

    @ritual.command("update")
    @click.argument("ritual_name")
    @click.option("--prompt", "new_prompt", help="New prompt text")
    @click.option("--name", "new_name", help="New name for the ritual")
    @click.option("--mode", type=click.Choice(["auto", "review", "gate"]),
                  help="New approval mode")
    @click.option("--note-required/--no-note-required", default=None,
                  help="Require a note when attesting")
    @click.option("--group", help="Name of ritual group (use empty string '' to remove from group)")
    @click.option("--weight", type=float, help="Weight for random selection in group")
    @click.option("--percentage", type=float, help="Percentage chance (0-100) for PERCENTAGE mode groups")
    @click.option("--conditions", help="JSON conditions for when ritual applies (e.g., '{\"estimate__gte\": 3}'). Use '{}' to clear.")
    @_main().require_project
    @_main().handle_error
    def ritual_update(ritual_name, new_prompt, new_name, mode, note_required, group, weight, percentage, conditions):
        """Update a ritual's prompt, name, mode, or group.

        RITUAL_NAME is the current name of the ritual to update.

        Conditions use Django-style lookups:
          estimate__gte: 3    (estimate >= 3)
          estimate__lte: 5    (estimate <= 5)
          priority__in: ["urgent", "high"]
          issue_type__eq: "bug"
        """
        m = _main()
        project_id = m.get_current_project()

        # Get rituals to find the ID
        rituals = _client().get_rituals(project_id)
        rit = next((r for r in rituals if r["name"] == ritual_name), None)

        if not rit:
            console.print(f"[red]Ritual '{ritual_name}' not found.[/red]")
            console.print("Run `chaotic ritual list` to see available rituals.")
            raise SystemExit(1)

        # Build update kwargs
        kwargs = {}
        if new_prompt:
            kwargs["prompt"] = new_prompt
        if new_name:
            kwargs["name"] = new_name
        if mode:
            kwargs["approval_mode"] = mode
        if note_required is not None:
            kwargs["note_required"] = note_required
        if weight is not None:
            kwargs["weight"] = weight
        if percentage is not None:
            kwargs["percentage"] = percentage
        if conditions is not None:
            import json as json_module
            try:
                kwargs["conditions"] = json_module.loads(conditions)
            except json_module.JSONDecodeError:
                console.print(f"[red]Invalid JSON for conditions: {conditions}[/red]")
                raise SystemExit(1)

        # Handle group: empty string means remove, otherwise resolve name to ID
        if group is not None:
            if group == "":
                kwargs["group_id"] = ""  # Signal to remove from group
            else:
                groups = _client().get_ritual_groups(project_id)
                matching = next((g for g in groups if g["name"] == group), None)
                if not matching:
                    console.print(f"[red]Ritual group '{group}' not found.[/red]")
                    console.print("Run `chaotic ritual group list` to see available groups.")
                    raise SystemExit(1)
                kwargs["group_id"] = matching["id"]

        if not kwargs:
            console.print("[yellow]No changes specified. Use --prompt, --name, --mode, --group, --weight, --percentage, or --conditions.[/yellow]")
            raise SystemExit(1)

        result = _client().update_ritual(rit["id"], **kwargs)
        console.print(f"[green]Ritual '{result['name']}' updated.[/green]")

    @ritual.command("delete")
    @click.argument("ritual_name")
    @click.option("--yes", "-y", is_flag=True, help="Skip confirmation")
    @_main().require_project
    @_main().handle_error
    def ritual_delete(ritual_name, yes):
        """Delete (deactivate) a ritual.

        RITUAL_NAME is the name of the ritual to delete.

        This soft-deletes the ritual, preserving attestation history.
        The ritual will no longer appear in lists or be required for new tickets/sprints.
        """
        m = _main()
        project_id = m.get_current_project()

        # Get rituals to find the ID
        rituals = _client().get_rituals(project_id)
        rit = next((r for r in rituals if r["name"] == ritual_name), None)

        if not rit:
            console.print(f"[red]Ritual '{ritual_name}' not found.[/red]")
            console.print("Run `chaotic ritual list` to see available rituals.")
            raise SystemExit(1)

        if not yes:
            if not m.confirm_action(f"Delete ritual '{ritual_name}'?"):
                console.print("[yellow]Cancelled.[/yellow]")
                raise SystemExit(0)

        _client().delete_ritual(rit["id"])
        console.print(f"[green]Ritual '{ritual_name}' deleted.[/green]")

    @ritual.command("restore")
    @click.argument("ritual_name")
    @_main().require_project
    @_main().handle_error
    def ritual_restore(ritual_name):
        """Restore a deleted (inactive) ritual.

        RITUAL_NAME is the name of the ritual to restore.

        Use 'chaotic ritual list --deleted' to see deleted rituals.
        """
        m = _main()
        project_id = m.get_current_project()

        # Search including inactive rituals
        rituals = _client().get_rituals(project_id, include_inactive=True)
        rit = next((r for r in rituals if r["name"] == ritual_name), None)

        if not rit:
            console.print(f"[red]Ritual '{ritual_name}' not found.[/red]")
            console.print("Run `chaotic ritual list --deleted` to see deleted rituals.")
            raise SystemExit(1)

        if rit.get("is_active", True):
            console.print(f"[yellow]Ritual '{ritual_name}' is already active.[/yellow]")
            return

        _client().update_ritual(rit["id"], is_active=True)
        console.print(f"[green]Ritual '{ritual_name}' restored.[/green]")

    @ritual.command("status")
    @click.argument("identifier", required=False)
    @click.option("--ticket", "ticket_id", help="Show ticket-level ritual status for an issue (e.g., CHT-123)")
    @_main().require_project
    @_main().handle_error
    def ritual_status(identifier, ticket_id):
        """Check limbo status or ticket ritual status.

        Without IDENTIFIER or --ticket: shows sprint limbo status.
        With IDENTIFIER or --ticket: shows ticket-level ritual status for that issue.

        Examples:
            chaotic ritual status CHT-123
            chaotic ritual status --ticket CHT-123
        """
        m = _main()
        project_id = m.get_current_project()

        # Positional argument takes precedence, fall back to --ticket option
        effective_ticket_id = identifier or ticket_id

        if effective_ticket_id:
            # Show ticket-level ritual status
            effective_ticket_id = effective_ticket_id.strip()
            if not effective_ticket_id:
                console.print("[red]Ticket ID cannot be empty.[/red]")
                return

            issue = _client().get_issue_by_identifier(effective_ticket_id)
            status = _client().get_pending_issue_rituals(issue["id"])
            pending = status.get("pending_rituals", [])
            completed = status.get("completed_rituals", [])

            if not pending and not completed:
                console.print(f"[dim]No ticket-level rituals configured for this project.[/dim]")
                return

            console.print(f"[bold]Ticket-level rituals for {effective_ticket_id}:[/bold]")

            for r in completed:
                console.print(f"  [green]\u2713[/green] {r['name']}")
                # Show attestation details for completed rituals
                if r.get("attestation"):
                    att = r["attestation"]
                    if att.get("note"):
                        console.print(f"      [dim]Note: {att['note']}[/dim]")
                    if att.get("attested_at"):
                        attested_date = att["attested_at"][:10]
                        console.print(f"      [dim]Attested: {attested_date}[/dim]")

            for r in pending:
                mode = f"[dim]({r['approval_mode']})[/dim]"
                if r.get("attestation"):
                    if r["attestation"].get("approved_at"):
                        console.print(f"  [green]\u2713[/green] {r['name']} {mode}")
                    else:
                        console.print(f"  [yellow]\u23f3[/yellow] {r['name']} {mode} - pending approval")
                        # Show attestation note for pending approval
                        att = r["attestation"]
                        if att.get("note"):
                            console.print(f"      [dim]Note: {att['note']}[/dim]")
                else:
                    console.print(f"  [red]\u25cb[/red] {r['name']} {mode}")
                    print_ritual_prompt(r['prompt'])

            if pending:
                console.print(f"\n[dim]Run 'chaotic ritual attest <name> --ticket {effective_ticket_id}' to attest.[/dim]")
        else:
            # Show sprint limbo status
            status = _client().get_limbo_status(project_id)

            if status["in_limbo"]:
                pending_count = len(status["pending_rituals"])
                console.print(f"[yellow]IN LIMBO[/yellow] - {pending_count} ritual(s) pending")
                for r in status["pending_rituals"]:
                    if r.get("attestation") and not r["attestation"].get("approved_at"):
                        console.print(f"  [yellow]\u23f3[/yellow] {r['name']} - pending approval")
                    else:
                        console.print(f"  [red]\u25cb[/red] {r['name']}")
            else:
                console.print("[green]Not in limbo[/green]")

    @ritual.command("approve")
    @click.argument("ritual_name")
    @_main().require_project
    @_main().handle_error
    def ritual_approve(ritual_name):
        """Approve a ritual attestation (admin only, for REVIEW mode)."""
        m = _main()
        project_id = m.get_current_project()

        # Get rituals to find the ID
        rituals = _client().get_rituals(project_id)
        rit = next((r for r in rituals if r["name"] == ritual_name), None)

        if not rit:
            console.print(f"[red]Ritual '{ritual_name}' not found.[/red]")
            console.print("Run `chaotic ritual list` to see available rituals.")
            raise SystemExit(1)

        result = _client().approve_ritual(rit["id"], project_id)

        # Check if limbo cleared
        status = _client().get_limbo_status(project_id)
        if not status["in_limbo"]:
            console.print(f"[green]Ritual '{ritual_name}' approved. Limbo complete.[/green]")
        else:
            pending_count = len(status["pending_rituals"])
            console.print(f"[green]Ritual '{ritual_name}' approved.[/green] {pending_count} remaining.")
            console.print("Run `chaotic ritual list` to continue.")

    @ritual.command("complete")
    @click.argument("ritual_name")
    @click.option("--note", help="Optional note about completion")
    @click.option("--ticket", "ticket_id", help="Issue identifier for ticket-level rituals (e.g., CHT-123)")
    @_main().require_project
    @_main().handle_error
    def ritual_complete(ritual_name, note, ticket_id):
        """Complete a GATE mode ritual (human-only, admin only).

        For ticket-level rituals (close or claim), use --ticket to specify the issue.
        """
        m = _main()
        project_id = m.get_current_project()

        # Get rituals to find the ID
        rituals = _client().get_rituals(project_id)
        rit = next((r for r in rituals if r["name"] == ritual_name), None)

        if not rit:
            console.print(f"[red]Ritual '{ritual_name}' not found.[/red]")
            console.print("Run `chaotic ritual list` to see available rituals.")
            raise SystemExit(1)

        # Check if this is a ticket-level ritual (close or claim)
        if rit.get("trigger") in ("ticket_close", "ticket_claim"):
            if not ticket_id:
                trigger_type = "ticket-close" if rit.get("trigger") == "ticket_close" else "ticket-claim"
                console.print(f"[red]Ritual '{ritual_name}' is a {trigger_type} ritual. Use --ticket <issue-id>.[/red]")
                raise SystemExit(1)

            # Get the issue to get its ID
            issue = _client().get_issue_by_identifier(ticket_id)
            result = _client().complete_gate_ritual_for_issue(rit["id"], issue["id"], note)
            console.print(f"[green]Ritual '{ritual_name}' completed for {ticket_id}.[/green]")
        else:
            # Sprint ritual
            if ticket_id:
                console.print(f"[yellow]Note: --ticket ignored for sprint rituals.[/yellow]")

            result = _client().complete_gate_ritual(rit["id"], project_id, note)

            # Check if limbo cleared
            status = _client().get_limbo_status(project_id)
            if not status["in_limbo"]:
                console.print(f"[green]Ritual '{ritual_name}' completed. Limbo complete.[/green]")
            else:
                pending_count = len(status["pending_rituals"])
                console.print(f"[green]Ritual '{ritual_name}' completed.[/green] {pending_count} remaining.")
                console.print("Run `chaotic ritual list` to continue.")

    @ritual.command("history")
    @click.option("--limit", "-n", type=int, default=20, help="Number of entries to show (default: 20)")
    @_main().require_project
    @_main().handle_error
    def ritual_history(limit):
        """Show recent ritual attestation history."""
        m = _main()
        project_id = m.get_current_project()
        entries = _client().get_ritual_history(project_id, limit=limit)

        if not entries:
            console.print("[dim]No attestation history found.[/dim]")
            return

        table = Table(title="Attestation History")
        table.add_column("Date", style="dim")
        table.add_column("Ritual")
        table.add_column("Type", style="dim")
        table.add_column("Context")
        table.add_column("Attested By")
        table.add_column("Status")
        table.add_column("Note", max_width=40)

        for entry in entries:
            # Format date
            date = entry["attested_at"][:10] if entry.get("attested_at") else "?"

            # Format trigger type
            trigger = entry.get("ritual_trigger", "")
            type_display = {"every_sprint": "Sprint", "ticket_close": "Close", "ticket_claim": "Claim"}.get(trigger, trigger)

            # Format context (sprint name or issue identifier)
            context = entry.get("sprint_name") or entry.get("issue_identifier") or ""

            # Format status
            if entry.get("approved_at"):
                approval_mode = entry.get("approval_mode", "auto")
                if approval_mode == "auto":
                    status_str = "[green]Auto[/green]"
                else:
                    approver = entry.get("approved_by_name", "")
                    status_str = f"[green]Approved[/green] by {approver}"
            else:
                status_str = "[yellow]Pending[/yellow]"

            note = (entry.get("note") or "")[:40]

            table.add_row(
                date,
                entry.get("ritual_name", "?"),
                type_display,
                context,
                entry.get("attested_by_name", "?"),
                status_str,
                note,
            )

        console.print(table)

    @ritual.command("force-clear")
    @click.option("--yes", "-y", is_flag=True, help="Skip confirmation prompt")
    @click.option("--ticket", default=None, help="Clear ticket-level limbo for a specific issue")
    @_main().require_project
    @_main().handle_error
    def ritual_force_clear(yes, ticket):
        """Force-clear limbo without completing rituals (admin only).

        Without --ticket: clears sprint-level limbo (completes the limbo sprint
        and activates the next sprint without attestations).

        With --ticket: clears ticket-level limbo for a specific issue, allowing
        it to proceed with its blocked action (claim/close).
        """
        m = _main()
        project_id = m.get_current_project()

        if ticket:
            # Ticket-level limbo clearing
            from cli.commands.shared import resolve_issue_id
            team_id = m.get_current_team()
            issue_id = resolve_issue_id(ticket, team_id)

            if not yes:
                console.print(f"[yellow]Warning: This will force-clear ticket limbo for {ticket}.[/yellow]")
                if not m.confirm_action("Are you sure?"):
                    console.print("[dim]Cancelled.[/dim]")
                    return

            result = _client().force_clear_ticket_limbo(issue_id)
            cleared = result.get("cleared_count", 0)
            console.print(f"[green]Cleared {cleared} ticket limbo record(s) for {ticket}.[/green]")
        else:
            # Sprint-level limbo clearing (existing behavior)
            status = _client().get_limbo_status(project_id)
            if not status["in_limbo"]:
                console.print("[yellow]Project is not in limbo.[/yellow]")
                return

            pending_count = len(status["pending_rituals"])

            if not yes:
                console.print(f"[yellow]Warning: This will skip {pending_count} pending ritual(s).[/yellow]")
                if not m.confirm_action("Are you sure you want to force-clear limbo?"):
                    console.print("[dim]Cancelled.[/dim]")
                    return

            result = _client().force_clear_limbo(project_id)
            next_name = result.get("next_sprint_name", "the next sprint")
            console.print(f"[green]Limbo cleared. {next_name} is now active.[/green]")

    # Ritual Group commands
    @ritual.group("group")
    def ritual_group():
        """Ritual group management commands.

        Groups allow configuring alternative selection for rituals:
        - RANDOM_ONE: Pick one ritual randomly (weighted)
        - ROUND_ROBIN: Rotate through rituals per sprint
        - PERCENTAGE: Each ritual has independent X% chance
        """
        pass

    @ritual_group.command("list")
    @_main().require_project
    @_main().handle_error
    def ritual_group_list():
        """List ritual groups for the project."""
        m = _main()
        project_id = m.get_current_project()
        groups = _client().get_ritual_groups(project_id)

        if not groups:
            console.print("[yellow]No ritual groups configured.[/yellow]")
            console.print("[dim]Create groups with 'chaotic ritual group create'.[/dim]")
            return

        console.print("[bold]Ritual Groups:[/bold]\n")
        for group in groups:
            mode_desc = {
                "random_one": "Random (pick one weighted)",
                "round_robin": "Round-robin (rotate per sprint)",
                "percentage": "Percentage (independent chance)",
            }.get(group["selection_mode"], group["selection_mode"])

            console.print(f"  [cyan]{group['name']}[/cyan] - {mode_desc}")

            # Show rituals in this group
            rituals = _client().get_rituals(project_id)
            group_rituals = [r for r in rituals if r.get("group_id") == group["id"]]
            if group_rituals:
                for r in group_rituals:
                    if group["selection_mode"] == "percentage":
                        pct = r.get("percentage", 0)
                        console.print(f"    \u2022 {r['name']} ({pct}%)")
                    else:
                        wt = r.get("weight", 1.0)
                        console.print(f"    \u2022 {r['name']} (weight: {wt})")
            else:
                console.print("    [dim](no rituals in group)[/dim]")
            console.print()

    @ritual_group.command("create")
    @click.argument("name")
    @click.option("--mode", default="random_one",
                  type=click.Choice(["random_one", "round_robin", "percentage"]),
                  help="Selection mode (default: random_one)")
    @_main().require_project
    @_main().handle_error
    def ritual_group_create(name, mode):
        """Create a ritual group.

        NAME is the group name (e.g., "weekly-mindfulness").

        Selection modes:
          random_one  - Pick one ritual randomly (weighted) per sprint
          round_robin - Rotate through rituals per sprint
          percentage  - Each ritual has independent X% chance
        """
        m = _main()
        project_id = m.get_current_project()
        result = _client().create_ritual_group(project_id, name, mode)
        console.print(f"[green]Ritual group created: {result['name']} ({mode})[/green]")

    @ritual_group.command("update")
    @click.argument("name")
    @click.option("--new-name", help="New name for the group")
    @click.option("--mode", type=click.Choice(["random_one", "round_robin", "percentage"]),
                  help="New selection mode")
    @_main().require_project
    @_main().handle_error
    def ritual_group_update(name, new_name, mode):
        """Update a ritual group.

        NAME is the current name of the group to update.
        """
        m = _main()
        project_id = m.get_current_project()

        # Get groups to find the ID
        groups = _client().get_ritual_groups(project_id)
        group = next((g for g in groups if g["name"] == name), None)

        if not group:
            console.print(f"[red]Ritual group '{name}' not found.[/red]")
            console.print("Run `chaotic ritual group list` to see available groups.")
            raise SystemExit(1)

        kwargs = {}
        if new_name:
            kwargs["name"] = new_name
        if mode:
            kwargs["selection_mode"] = mode

        if not kwargs:
            console.print("[yellow]No changes specified. Use --new-name or --mode.[/yellow]")
            raise SystemExit(1)

        result = _client().update_ritual_group(group["id"], **kwargs)
        console.print(f"[green]Ritual group '{result['name']}' updated.[/green]")

    @ritual_group.command("delete")
    @click.argument("name")
    @click.option("--yes", "-y", is_flag=True, help="Skip confirmation")
    @_main().require_project
    @_main().handle_error
    def ritual_group_delete(name, yes):
        """Delete a ritual group.

        NAME is the name of the group to delete.

        Rituals in the group will be ungrouped (not deleted).
        """
        m = _main()
        project_id = m.get_current_project()

        # Get groups to find the ID
        groups = _client().get_ritual_groups(project_id)
        group = next((g for g in groups if g["name"] == name), None)

        if not group:
            console.print(f"[red]Ritual group '{name}' not found.[/red]")
            console.print("Run `chaotic ritual group list` to see available groups.")
            raise SystemExit(1)

        if not yes:
            if not m.confirm_action(f"Delete ritual group '{name}'? (rituals will be ungrouped)"):
                console.print("[dim]Cancelled.[/dim]")
                return

        _client().delete_ritual_group(group["id"])
        console.print(f"[green]Ritual group '{name}' deleted. Rituals ungrouped.[/green]")

    return ritual
