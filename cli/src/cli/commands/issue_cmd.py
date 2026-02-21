"""Issue management commands."""
import sys

import click
from rich.markdown import Markdown
from rich.panel import Panel
from rich.table import Table

from .shared import _client, console, print_ritual_prompt


def _main():
    """Late-bind to cli.main for test mock compatibility."""
    return sys.modules['cli.main']


# Priority levels in order (lowest to highest)
PRIORITY_LEVELS = ["no_priority", "low", "medium", "high", "urgent"]


def register(cli):
    """Register issue commands on the CLI group."""

    @cli.group()
    def issue():
        """Issue management commands."""
        pass

    @issue.command("list")
    @click.option("--status", help="Filter by status (backlog, todo, in_progress, in_review, done, canceled). Comma-separated for multiple.")
    @click.option("--priority", help="Filter by priority (urgent, high, medium, low, no_priority). Comma-separated for multiple.")
    @click.option("--sprint", help="Filter by sprint (name, 'current', 'next', or ID)")
    @click.option("--no-sprint", "no_sprint", is_flag=True, help="Show only issues not assigned to any sprint")
    @click.option("--epic", help="Filter by epic/parent issue (e.g., CHT-12)")
    @click.option("--label", "-l", help="Filter by label name. Comma-separated for multiple (issues must have ALL labels).")
    @click.option("--search", help="Search in title, description, and identifier.")
    @click.option("--limit", "-n", type=int, default=50, help="Maximum number of issues to show (default: 50)")
    @click.option("--skip", type=int, default=0, help="Number of issues to skip (for pagination)")
    @click.option("--sort-by", "--sort", "-s", type=click.Choice(["created", "updated", "priority", "status", "title", "estimate", "random"], case_sensitive=False), default="random", help="Sort field (default: random)")
    @click.option("--order", "-o", type=click.Choice(["asc", "desc"], case_sensitive=False), default="desc", help="Sort direction (default: desc)")
    @_main().json_option
    @_main().require_project
    @_main().handle_error
    def issue_list(status, priority, sprint, no_sprint, epic, label, search, limit, skip, sort_by, order):
        """List issues in current project."""
        m = _main()
        # Validate status values if provided (CHT-502)
        if status:
            valid_statuses = ["backlog", "todo", "in_progress", "in_review", "done", "canceled"]
            statuses = [s.strip().lower() for s in status.split(",")]
            for s in statuses:
                if s not in valid_statuses:
                    raise click.BadParameter(f"Invalid status: {s}. Must be one of: {', '.join(valid_statuses)}")

        # Validate priority values if provided
        if priority:
            valid_priorities = ["urgent", "high", "medium", "low", "no_priority"]
            priorities = [p.strip().lower() for p in priority.split(",")]
            for p in priorities:
                if p not in valid_priorities:
                    raise click.BadParameter(f"Invalid priority: {p}. Must be one of: {', '.join(valid_priorities)}")

        project_id = m.get_current_project()
        parent_id = None
        if epic:
            epic_issue = _client().get_issue_by_identifier(epic)
            parent_id = epic_issue["id"]
        if sprint and no_sprint:
            raise click.UsageError("Cannot use both --sprint and --no-sprint")
        if no_sprint:
            sprint_id = "no_sprint"
        elif sprint:
            sprint_id = m.resolve_sprint_id(sprint, project_id)
        else:
            sprint_id = None
        issues = _client().get_issues(project_id=project_id, status=status, priority=priority, sprint_id=sprint_id, limit=limit, parent_id=parent_id, sort_by=sort_by, order=order, label=label, search=search, skip=skip or None)

        # JSON output mode (CHT-170)
        if m.is_json_output():
            m.output_json(issues)
            return

        if not issues:
            console.print("[yellow]No issues found.[/yellow]")
            return

        # Build sprint ID -> name map
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

        for i in issues:
            table.add_row(
                i["identifier"],
                i["title"][:50] + ("..." if len(i["title"]) > 50 else ""),
                i["status"].replace("_", " ").title(),
                i["priority"].replace("_", " ").title(),
                i.get("issue_type", "task").replace("_", " ").title(),
                str(i.get("estimate") or "-"),
                sprint_names.get(i.get("sprint_id"), "-")
            )

        console.print(table)

        # Truncation warning (CHT-946) + pagination hint (CHT-950)
        if len(issues) >= limit:
            next_skip = (skip or 0) + limit
            console.print(f"\n[yellow]Showing {limit} issues (results may be truncated). Use --skip {next_skip} to see next page, or --limit to adjust.[/yellow]")

        # Search tip (CHT-949)
        console.print("\n[dim]Tip: Use 'chaotic issue search <query>' to search by title, description, or identifier.[/dim]")

    @issue.command("mine")
    @click.option("--status", help="Filter by status (backlog, todo, in_progress, in_review, done, canceled). Comma-separated for multiple.")
    @click.option("--limit", "-n", type=int, default=50, help="Maximum number of issues to show (default: 50)")
    @click.option("--sort-by", "--sort", "-s", type=click.Choice(["created", "updated", "priority", "status", "title", "estimate", "random"], case_sensitive=False), default="random", help="Sort field (default: random)")
    @click.option("--order", "-o", type=click.Choice(["asc", "desc"], case_sensitive=False), default="desc", help="Sort direction (default: desc)")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def issue_mine(status, limit, sort_by, order):
        """List issues assigned to me."""
        m = _main()
        # Validate status values if provided (CHT-502)
        if status:
            valid_statuses = ["backlog", "todo", "in_progress", "in_review", "done", "canceled"]
            statuses = [s.strip().lower() for s in status.split(",")]
            for s in statuses:
                if s not in valid_statuses:
                    raise click.BadParameter(f"Invalid status: {s}. Must be one of: {', '.join(valid_statuses)}")

        user = _client().get_me()
        issues = _client().get_issues(assignee_id=user["id"], status=status, limit=limit, sort_by=sort_by, order=order)
        if m.is_json_output():
            m.output_json(issues)
            return
        if not issues:
            console.print("[yellow]No issues assigned to you.[/yellow]")
            return

        # Build sprint ID -> name map from unique sprint IDs in results
        sprint_names = {}
        for i in issues:
            sid = i.get("sprint_id")
            if sid and sid not in sprint_names:
                try:
                    s = _client().get_sprint(sid)
                    sprint_names[sid] = s["name"]
                except m.APIError:
                    sprint_names[sid] = sid[:8] + "..."

        table = Table(title="My Issues")
        table.add_column("ID")
        table.add_column("Title")
        table.add_column("Project")
        table.add_column("Status")
        table.add_column("Priority")
        table.add_column("Type")
        table.add_column("Estimate")
        table.add_column("Sprint")

        for i in issues:
            table.add_row(
                i["identifier"],
                i["title"][:50] + ("..." if len(i["title"]) > 50 else ""),
                i.get("project_key", "-"),
                i["status"].replace("_", " ").title(),
                i["priority"].replace("_", " ").title(),
                i.get("issue_type", "task").replace("_", " ").title(),
                str(i.get("estimate") or "-"),
                sprint_names.get(i.get("sprint_id"), "-")
            )

        console.print(table)

    @issue.command("search")
    @click.argument("query")
    @click.option("--all", "-a", "search_all", is_flag=True, help="Search all projects (ignore current project context)")
    @click.option("--limit", "-n", type=int, default=50, help="Maximum number of results (default: 50)")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def issue_search(query, search_all, limit):
        """Search issues.

        Searches issue titles, descriptions, and identifiers.
        If a project is selected (via 'chaotic project use'), searches only that project.
        Use --all to search across all projects in the team.
        """
        m = _main()
        project_id = None if search_all else m.get_current_project()

        issues = _client().search_issues(m.get_current_team(), query, project_id, limit=limit)
        if m.is_json_output():
            m.output_json(issues or [])
            return
        if not issues:
            scope = "" if search_all else " in current project"
            console.print(f"[yellow]No issues found matching '{query}'{scope}.[/yellow]")
            return

        title = f"Search Results: '{query}'" + (" (all projects)" if search_all else "")
        table = Table(title=title)
        table.add_column("ID")
        table.add_column("Title")
        table.add_column("Project")
        table.add_column("Status")
        table.add_column("Priority")

        for i in issues:
            table.add_row(
                i["identifier"],
                i["title"][:50] + ("..." if len(i["title"]) > 50 else ""),
                i.get("project_key", "-"),
                i["status"].replace("_", " ").title(),
                i["priority"].replace("_", " ").title()
            )

        console.print(table)

        # Truncation warning for search results (CHT-948)
        if len(issues) >= limit:
            console.print(f"\n[yellow]Showing {limit} results (may be truncated). Use --limit to see more.[/yellow]")

    @issue.command("create")
    @click.argument("title", required=False)
    @click.option("--title", "-t", "title_opt", help="Issue title (alternative to positional argument)")
    @click.option("--description", default="")
    @click.option("--status", default="backlog", type=click.Choice(["backlog", "todo", "in_progress", "in_review", "done"], case_sensitive=False))
    @click.option("--priority", default="no_priority", type=click.Choice(["no_priority", "low", "medium", "high", "urgent"], case_sensitive=False))
    @click.option("--type", "issue_type", default="task", type=click.Choice(["task", "bug", "feature", "chore", "docs", "tech_debt", "epic"], case_sensitive=False), help="Issue type")
    @click.option("--estimate", "--points", type=int, help="Story point estimate")
    @click.option("--sprint", help="Set sprint (name, 'current', 'next', 'none', or ID)")
    @click.option("--parent", help="Parent issue identifier (e.g., PRJ-123) to create a sub-issue")
    @click.option("--epic", help="Epic identifier (e.g., PRJ-123) - shorthand for --parent with an epic")
    @click.option("--label", "labels", multiple=True, help="Label name(s) to assign (can be used multiple times)")
    @click.option("--blocked-by", "blocked_by", multiple=True, help="Issue identifier(s) that block this issue (can be used multiple times)")
    @click.option("--relates-to", "relates_to", multiple=True, help="Related issue identifier(s) (can be used multiple times)")
    @click.option("--project", "project_key", help="Project (ID, key, or name) - overrides current project")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def issue_create(title, title_opt, description, status, priority, issue_type, estimate, sprint, parent, epic, labels, blocked_by, relates_to, project_key):
        """Create a new issue (or sub-issue with --parent/--epic)."""
        m = _main()
        # Resolve title from positional arg or --title option
        title = (title or title_opt or "").strip()
        if not title:
            raise click.ClickException("Title is required. Use: chaotic issue create \"My Title\" or --title \"My Title\"")

        # Resolve project ID
        if project_key:
            project_id = m.resolve_project_id(project_key)
        else:
            project_id = m.get_current_project()
            if not project_id:
                console.print("[red]No project selected. Use --project or run 'chaotic project use <project_id>' first.[/red]")
                raise SystemExit(1)

        data = {"description": description or None, "status": status, "priority": priority, "issue_type": issue_type}
        if estimate:
            data["estimate"] = estimate
        if parent and epic:
            raise click.UsageError("Cannot use both --parent and --epic")
        if parent:
            parent_issue = _client().get_issue_by_identifier(parent)
            data["parent_id"] = parent_issue["id"]
        elif epic:
            epic_issue = _client().get_issue_by_identifier(epic)
            data["parent_id"] = epic_issue["id"]
        if labels:
            # Resolve label names to IDs
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

        if m.is_json_output():
            m.output_json(result)
            return

        if parent:
            console.print(f"[green]Sub-issue created: {result['identifier']} - {result['title']} (parent: {parent})[/green]")
        elif epic:
            console.print(f"[green]Issue created: {result['identifier']} - {result['title']} (epic: {epic})[/green]")
        else:
            console.print(f"[green]Issue created: {result['identifier']} - {result['title']}[/green]")

        # Create relations if specified
        for blocker_id in blocked_by:
            blocker = _client().get_issue_by_identifier(blocker_id)
            _client().create_relation(blocker["id"], result["id"], "blocks")
            console.print(f"[dim]  Blocked by {blocker_id}[/dim]")
        for related_id in relates_to:
            related = _client().get_issue_by_identifier(related_id)
            _client().create_relation(result["id"], related["id"], "relates_to")
            console.print(f"[dim]  Related to {related_id}[/dim]")

    @issue.command("show")
    @click.argument("identifiers", nargs=-1)
    @_main().json_option
    @_main().require_auth
    @_main().handle_error
    def issue_show(identifiers):
        """Show issue details.

        Pass one identifier for detailed view, or multiple for a summary table.

        Examples:
            chaotic issue show CHT-123
            chaotic issue show CHT-123 CHT-124 CHT-125
        """
        m = _main()
        if not identifiers:
            console.print("[yellow]Usage: chaotic issue show IDENTIFIER [IDENTIFIER...][/yellow]")
            return

        # JSON output mode (CHT-170)
        if m.is_json_output():
            if len(identifiers) == 1:
                iss = _client().get_issue_by_identifier(identifiers[0])
                iss['comments'] = _client().get_comments(iss["id"])
                try:
                    iss['sub_issues'] = _client().get_sub_issues(iss["id"])
                except m.APIError:
                    iss['sub_issues'] = []
                m.output_json(iss)
            else:
                issues = [_client().get_issue_by_identifier(i) for i in identifiers]
                m.output_json(issues)
            return

        # Single issue: show detailed view
        if len(identifiers) == 1:
            iss = _client().get_issue_by_identifier(identifiers[0])
            comments = _client().get_comments(iss["id"])

            # Build panel lines
            panel_lines = [
                f"[bold]{iss['title']}[/bold]\n",
                f"[dim]Status:[/dim] {iss['status'].replace('_', ' ').title()}",
                f"[dim]Priority:[/dim] {iss['priority'].replace('_', ' ').title()}",
                f"[dim]Type:[/dim] {iss.get('issue_type', 'task').replace('_', ' ').title()}",
                f"[dim]Estimate:[/dim] {iss.get('estimate') or '-'} points",
            ]

            # Show parent info if this is a sub-issue
            if iss.get('parent_id'):
                try:
                    parent = _client().get_issue(iss['parent_id'])
                    panel_lines.append(f"[dim]Parent:[/dim] {parent['identifier']}: {parent['title']}")
                except m.APIError:
                    panel_lines.append(f"[dim]Parent:[/dim] [dim](unable to load)[/dim]")

            # Show sub-issue summary
            try:
                sub_issues = _client().get_sub_issues(iss['id'])
                if sub_issues:
                    done_count = sum(1 for s in sub_issues if s.get('status') in ('done', 'canceled'))
                    panel_lines.append(f"[dim]Sub-issues:[/dim] {done_count}/{len(sub_issues)} done")
            except m.APIError:
                pass

            console.print(Panel("\n".join(panel_lines), title=iss["identifier"]))

            console.print("\n[dim]Description:[/dim]")
            description = iss.get('description') or 'No description'
            if iss.get('description'):
                console.print(Markdown(description))
            else:
                console.print(f"  {description}")

            if comments:
                console.print("\n[bold]Comments:[/bold]")
                for c in comments:
                    # Format date if available (CHT-462)
                    created_at = c.get('created_at', '')
                    if created_at:
                        try:
                            from datetime import datetime
                            dt = datetime.fromisoformat(created_at.replace('Z', '+00:00'))
                            date_str = dt.strftime('%Y-%m-%d %H:%M')
                        except (ValueError, AttributeError):
                            date_str = created_at[:16] if len(created_at) > 16 else created_at
                        console.print(f"  \u2022 [dim]{c.get('author_name', 'User')} ({date_str}):[/dim]")
                    else:
                        console.print(f"  \u2022 [dim]{c.get('author_name', 'User')}:[/dim]")
                    console.print(Markdown(c.get('content', '')))

            # Show ritual attestation notes
            try:
                ritual_status = _client().get_pending_issue_rituals(iss["id"])
                completed_rituals = ritual_status.get("completed_rituals", [])
                attestations_with_notes = [
                    r for r in completed_rituals
                    if r.get("attestation") and r["attestation"].get("note")
                ]
                if attestations_with_notes:
                    console.print("\n[bold]Ritual Attestations:[/bold]")
                    for r in attestations_with_notes:
                        att = r["attestation"]
                        console.print(f"  \u2713 [green]{r['name']}[/green] - {att.get('attested_by_name', 'Unknown')}")
                        if att.get("note"):
                            console.print(f"    [dim]{att['note']}[/dim]")
            except m.APIError:
                pass  # Silently ignore if rituals API fails

            # Show linked documents
            try:
                linked_docs = _client().get_issue_documents(iss['id'])
                if linked_docs:
                    console.print("\n[bold]Linked Documents:[/bold]")
                    for doc in linked_docs:
                        icon = doc.get('icon') or '\U0001f4c4'
                        console.print(f"  \u2022 {icon} {doc['title']}")
            except m.APIError:
                pass  # Silently ignore if API doesn't support this yet
            return

        # Multiple issues: show compact table
        table = Table(title="Issues")
        table.add_column("ID")
        table.add_column("Title")
        table.add_column("Status")
        table.add_column("Priority")
        table.add_column("Type")
        table.add_column("Estimate")

        for identifier in identifiers:
            try:
                iss = _client().get_issue_by_identifier(identifier)
                table.add_row(
                    iss["identifier"],
                    iss["title"][:50] + ("..." if len(iss["title"]) > 50 else ""),
                    iss["status"].replace("_", " ").title(),
                    iss["priority"].replace("_", " ").title(),
                    iss.get("issue_type", "task").replace("_", " ").title(),
                    str(iss.get("estimate") or "-")
                )
            except m.APIError as e:
                table.add_row(identifier, f"[red]Error: {e}[/red]", "-", "-", "-", "-")

        console.print(table)

    @issue.command("view")
    @click.argument("identifiers", nargs=-1)
    @_main().require_auth
    @_main().handle_error
    def issue_view(identifiers):
        """Show issue details.

        Alias for 'issue show'.
        """
        issue_show.callback(identifiers)

    @issue.command("open")
    @click.argument("identifier")
    @_main().require_auth
    @_main().handle_error
    def issue_open(identifier):
        """Open issue in browser."""
        m = _main()
        iss = _client().get_issue_by_identifier(identifier)
        web_url = m.get_web_url()
        url = f"{web_url}/#/issue/{iss['identifier']}"
        console.print(f"[dim]Opening {url}...[/dim]")
        m.webbrowser.open(url)

    @issue.command("get")
    @click.argument("identifier")
    @_main().require_auth
    @_main().handle_error
    def issue_get(identifier):
        """Show issue details (alias for 'show')."""
        # issue_show expects a tuple (nargs=-1), so wrap the single identifier
        issue_show.callback((identifier,))

    @issue.command("update")
    @click.argument("identifier")
    @click.option("--title")
    @click.option("--description")
    @click.option("--status", type=click.Choice(["backlog", "todo", "in_progress", "in_review", "done", "canceled"], case_sensitive=False))
    @click.option("--priority", type=click.Choice(["no_priority", "low", "medium", "high", "urgent"], case_sensitive=False))
    @click.option("--type", "issue_type", type=click.Choice(["task", "bug", "feature", "chore", "docs", "tech_debt", "epic"], case_sensitive=False), help="Issue type")
    @click.option("--estimate", "--points", type=int, help="Story point estimate")
    @click.option("--sprint", help="Set sprint (name, 'current', 'next', 'none', or ID)")
    @click.option("--parent", help="Set parent issue (e.g., CHT-123) to make this a sub-issue")
    @click.option("--no-parent", "clear_parent", is_flag=True, help="Detach from parent issue")
    @click.option("--label", "-l", "add_labels", multiple=True, help="Add label(s) to issue (can be used multiple times)")
    @click.option("--remove-label", "remove_labels", multiple=True, help="Remove label(s) from issue (can be used multiple times)")
    @click.option("--blocked-by", "blocked_by", multiple=True, help="Add blocked-by relation(s) (can be used multiple times)")
    @click.option("--relates-to", "relates_to", multiple=True, help="Add relates-to relation(s) (can be used multiple times)")
    @click.option("--unceremoniously-attest-all-rituals", "unceremonious", is_flag=True,
                  help="Auto-attest all pending ticket rituals (requires --note)")
    @click.option("--note", help="Note for ritual attestations (required with --unceremoniously-attest-all-rituals)")
    @_main().json_option
    @_main().require_auth
    @_main().handle_error
    def issue_update(identifier, title, description, status, priority, issue_type, estimate, sprint, parent, clear_parent, add_labels, remove_labels, blocked_by, relates_to, unceremonious, note):
        """Update an issue."""
        m = _main()
        iss = _client().get_issue_by_identifier(identifier)

        # Warn if --note used without --unceremoniously-attest-all-rituals
        if note and not unceremonious:
            console.print("[yellow]Note: --note has no effect without --unceremoniously-attest-all-rituals[/yellow]")

        # Handle unceremonious ritual attestation
        if unceremonious:
            if not note or not note.strip():
                raise click.ClickException(
                    "--unceremoniously-attest-all-rituals requires --note to explain why rituals are being skipped.\n"
                    "Example: --note 'Trivial fix, rituals not warranted'"
                )

            # Get and attest all pending rituals for this issue
            ritual_status = _client().get_pending_issue_rituals(iss["id"])
            pending = ritual_status.get("pending_rituals", [])

            # Filter out GATE mode rituals (require human approval, can't be auto-attested)
            attestable = [r for r in pending if r.get("approval_mode") != "gate"]
            gate_rituals = [r for r in pending if r.get("approval_mode") == "gate"]

            if gate_rituals:
                console.print(f"[yellow]Warning: {len(gate_rituals)} GATE ritual(s) require human approval and cannot be auto-attested:[/yellow]")
                for r in gate_rituals:
                    console.print(f"  [dim]\u26a0 {r['name']}[/dim]")

            if attestable:
                console.print(f"[yellow]Auto-attesting {len(attestable)} ritual(s)...[/yellow]")
                for rit in attestable:
                    _client().attest_ritual_for_issue(rit["id"], iss["id"], note)
                    console.print(f"  [dim]\u2713 {rit['name']}[/dim]")
            elif not gate_rituals:
                console.print("[dim]No pending rituals to attest.[/dim]")

        # Handle label add/remove operations (CHT-697)
        labels_modified = False
        if add_labels or remove_labels:
            # Get all labels for the team to resolve names to IDs
            team_id = m.get_current_team()
            all_labels = _client().get_labels(team_id)
            label_lookup = {l["name"].lower(): l["id"] for l in all_labels}

            # Add labels
            for label_name in add_labels:
                label_id = label_lookup.get(label_name.lower())
                if not label_id:
                    console.print(f"[red]Label '{label_name}' not found. Available labels: {', '.join(l['name'] for l in all_labels)}[/red]")
                    raise SystemExit(1)
                _client().add_label_to_issue(iss["id"], label_id)
                console.print(f"[dim]Added label: {label_name}[/dim]")
                labels_modified = True

            # Remove labels
            for label_name in remove_labels:
                label_id = label_lookup.get(label_name.lower())
                if not label_id:
                    console.print(f"[red]Label '{label_name}' not found. Available labels: {', '.join(l['name'] for l in all_labels)}[/red]")
                    raise SystemExit(1)
                _client().remove_label_from_issue(iss["id"], label_id)
                console.print(f"[dim]Removed label: {label_name}[/dim]")
                labels_modified = True

        # Validate parent flags before building update data
        if parent and clear_parent:
            raise click.ClickException("Cannot use --parent and --no-parent together.")

        data = {}
        if title is not None:
            data["title"] = title
        if description is not None:
            data["description"] = description
        if status:
            data["status"] = status
        if priority:
            data["priority"] = priority
        if issue_type:
            data["issue_type"] = issue_type
        if estimate is not None:
            data["estimate"] = estimate
        if parent:
            parent_issue = _client().get_issue_by_identifier(parent)
            if parent_issue["id"] == iss["id"]:
                raise click.ClickException("An issue cannot be its own parent.")
            data["parent_id"] = parent_issue["id"]
        if clear_parent:
            data["parent_id"] = None
        if sprint is not None:
            if sprint.lower() == "none" or sprint == "":
                data["sprint_id"] = None
            else:
                project_id = iss.get("project_id") or m.get_current_project()
                if not project_id:
                    raise click.ClickException("No project context. Set a project with 'chaotic project use <id>' or specify a sprint ID directly.")
                data["sprint_id"] = m.resolve_sprint_id(sprint, project_id)

        # Create relations if specified (CHT-843, CHT-844)
        relations_modified = False
        for blocker_id in blocked_by:
            blocker = _client().get_issue_by_identifier(blocker_id)
            _client().create_relation(blocker["id"], iss["id"], "blocks")
            console.print(f"[dim]  Blocked by {blocker_id}[/dim]")
            relations_modified = True
        for related_id in relates_to:
            related = _client().get_issue_by_identifier(related_id)
            _client().create_relation(iss["id"], related["id"], "relates_to")
            console.print(f"[dim]  Related to {related_id}[/dim]")
            relations_modified = True

        if not data and not labels_modified and not relations_modified:
            console.print("[yellow]No updates provided.[/yellow]")
            return

        if data:
            _client().update_issue(iss["id"], **data)
        if m.is_json_output():
            updated = _client().get_issue_by_identifier(identifier)
            m.output_json(updated)
            return
        console.print(f"[green]Issue {identifier} updated.[/green]")

    @issue.command("comment")
    @click.argument("identifier")
    @click.argument("content")
    @click.option("--note", "--notes", help="Additional context appended to the comment (e.g., commit hash)")
    @click.option("--assign-to", help="Also assign the issue (use 'me', a user ID, or name/email)")
    @_main().require_auth
    @_main().handle_error
    def issue_comment(identifier, content, note, assign_to):
        """Add a comment to an issue."""
        m = _main()
        body = "\n".join([content, note]) if note else content
        iss = _client().get_issue_by_identifier(identifier)
        _client().create_comment(iss["id"], body)
        console.print(f"[green]Comment added to {identifier}.[/green]")
        if assign_to:
            assignee_id = m.resolve_assignee_id(assign_to)
            _client().update_issue(iss["id"], assignee_id=assignee_id)
            console.print(f"[green]Issue {identifier} assigned.[/green]")

    @issue.command("delete")
    @click.argument("identifier")
    @_main().require_auth
    @_main().handle_error
    def issue_delete(identifier):
        """Delete an issue."""
        m = _main()
        if not m.confirm_action("Are you sure you want to delete this issue?"):
            raise SystemExit(0)
        iss = _client().get_issue_by_identifier(identifier)
        _client().delete_issue(iss["id"])
        console.print(f"[green]Issue {identifier} deleted.[/green]")

    @issue.command("sub-issues")
    @click.argument("identifier")
    @_main().json_option
    @_main().require_auth
    @_main().handle_error
    def issue_sub_issues(identifier):
        """List sub-issues of an issue."""
        m = _main()
        iss = _client().get_issue_by_identifier(identifier)
        sub_issues = _client().get_sub_issues(iss["id"])
        if m.is_json_output():
            m.output_json(sub_issues or [])
            return

        if not sub_issues:
            console.print(f"[yellow]No sub-issues found for {identifier}.[/yellow]")
            return

        table = Table(title=f"Sub-issues of {identifier}")
        table.add_column("ID")
        table.add_column("Title")
        table.add_column("Status")
        table.add_column("Priority")
        table.add_column("Estimate")

        for i in sub_issues:
            table.add_row(
                i["identifier"],
                i["title"][:50] + ("..." if len(i["title"]) > 50 else ""),
                i["status"].replace("_", " ").title(),
                i["priority"].replace("_", " ").title(),
                str(i.get("estimate") or "-")
            )

        console.print(table)

    @issue.command("relations")
    @click.argument("identifier")
    @_main().json_option
    @_main().require_auth
    @_main().handle_error
    def issue_relations(identifier):
        """Show blocking and related issues."""
        m = _main()
        iss = _client().get_issue_by_identifier(identifier)
        relations = _client().get_relations(iss["id"])
        if m.is_json_output():
            m.output_json(relations or [])
            return

        if not relations:
            console.print(f"[yellow]No relations found for {identifier}.[/yellow]")
            return

        table = Table(title=f"Relations for {identifier}")
        table.add_column("Relation ID", style="dim")
        table.add_column("Type")
        table.add_column("Related Issue")
        table.add_column("Direction")

        for r in relations:
            table.add_row(
                r["id"][:8] + "...",
                r["relation_type"].replace("_", " ").title(),
                r["related_issue"]["identifier"],
                r["direction"]
            )

        console.print(table)

    @issue.command("block")
    @click.argument("identifier")
    @click.argument("blocked_identifier")
    @click.option("--type", "relation_type", default="blocks",
                  type=click.Choice(["blocks", "relates_to", "duplicates"]),
                  help="Type of relation")
    @_main().require_auth
    @_main().handle_error
    def issue_block(identifier, blocked_identifier, relation_type):
        """Create a relation between issues.

        IDENTIFIER blocks BLOCKED_IDENTIFIER (for 'blocks' type).
        """
        iss = _client().get_issue_by_identifier(identifier)
        blocked = _client().get_issue_by_identifier(blocked_identifier)
        _client().create_relation(iss["id"], blocked["id"], relation_type)

        if relation_type == "blocks":
            console.print(f"[green]{identifier} now blocks {blocked_identifier}.[/green]")
        elif relation_type == "duplicates":
            console.print(f"[green]{identifier} marked as duplicate of {blocked_identifier}.[/green]")
        else:
            console.print(f"[green]{identifier} related to {blocked_identifier}.[/green]")

    @issue.command("unblock")
    @click.argument("identifier")
    @click.argument("relation_id")
    @_main().require_auth
    @_main().handle_error
    def issue_unblock(identifier, relation_id):
        """Remove a relation from an issue."""
        iss = _client().get_issue_by_identifier(identifier)
        _client().delete_relation(iss["id"], relation_id)
        console.print(f"[green]Relation removed from {identifier}.[/green]")

    @issue.command("duplicate")
    @click.argument("duplicate_identifier")
    @click.argument("original_identifier")
    @_main().require_auth
    @_main().handle_error
    def issue_duplicate(duplicate_identifier, original_identifier):
        """Mark an issue as a duplicate of another and close it.

        DUPLICATE_IDENTIFIER is the duplicate that will be closed.
        ORIGINAL_IDENTIFIER is the original issue to keep open.

        This will:
        1. Create a 'duplicates' relation
        2. Add a comment explaining the closure
        3. Close the duplicate as 'canceled' (skips ritual checks)
        """
        duplicate = _client().get_issue_by_identifier(duplicate_identifier)
        original = _client().get_issue_by_identifier(original_identifier)

        # Validate not same issue
        if duplicate["id"] == original["id"]:
            raise click.ClickException("Cannot mark an issue as a duplicate of itself.")

        # Check if duplicate is already closed
        if duplicate["status"] in ("done", "canceled"):
            raise click.ClickException(
                f"{duplicate_identifier} is already {duplicate['status']}. "
                "Cannot mark a closed issue as duplicate."
            )

        # Create the duplicates relation
        _client().create_relation(duplicate["id"], original["id"], "duplicates")

        # Add comment explaining the closure
        _client().create_comment(
            duplicate["id"],
            f"Closed as duplicate of {original_identifier}."
        )

        # Close the duplicate as canceled (skips rituals per CHT-171)
        _client().update_issue(duplicate["id"], status="canceled")

        console.print(f"[green]{duplicate_identifier} closed as duplicate of {original_identifier}.[/green]")

    @issue.command("assign")
    @click.argument("identifier")
    @click.argument("assignee", required=False)
    @click.option("--comment", "comment_text", help="Also add a comment to the issue")
    @_main().require_auth
    @_main().handle_error
    def issue_assign(identifier, assignee, comment_text):
        """Assign an issue to a user.

        ASSIGNEE can be 'me' (assign to yourself), a user/agent ID, or a name/email.
        Omit ASSIGNEE to unassign.
        """
        m = _main()
        iss = _client().get_issue_by_identifier(identifier)

        if assignee is None:
            _client().update_issue(iss["id"], assignee_id=None)
            console.print(f"[green]Issue {identifier} unassigned.[/green]")
        else:
            assignee_id = m.resolve_assignee_id(assignee)
            _client().update_issue(iss["id"], assignee_id=assignee_id)
            console.print(f"[green]Issue {identifier} assigned.[/green]")
        if comment_text:
            _client().create_comment(iss["id"], comment_text)
            console.print(f"[green]Comment added to {identifier}.[/green]")

    @issue.command("move")
    @click.argument("identifier")
    @click.argument("status", type=click.Choice(["backlog", "todo", "in_progress", "in_review", "done", "canceled"], case_sensitive=False))
    @_main().require_auth
    @_main().handle_error
    def issue_move(identifier, status):
        """Move an issue to a different status.

        Shortcut for 'issue update IDENTIFIER --status STATUS'.
        """
        iss = _client().get_issue_by_identifier(identifier)
        _client().update_issue(iss["id"], status=status)
        console.print(f"[green]Issue {identifier} moved to {status.replace('_', ' ').title()}.[/green]")

    @issue.command("close")
    @click.argument("identifier")
    @_main().require_auth
    @_main().handle_error
    def issue_close(identifier):
        """Close an issue (move to done).

        Shortcut for 'issue move IDENTIFIER done'.
        """
        iss = _client().get_issue_by_identifier(identifier)
        _client().update_issue(iss["id"], status="done")
        console.print(f"[green]Issue {identifier} closed.[/green]")

    @issue.command("complete")
    @click.argument("identifier")
    @_main().require_auth
    @_main().handle_error
    def issue_complete(identifier):
        """Mark an issue as done.

        Alias for 'issue close IDENTIFIER'.
        """
        issue_close.callback(identifier)

    @issue.command("wontfix")
    @click.argument("identifier")
    @_main().require_auth
    @_main().handle_error
    def issue_wontfix(identifier):
        """Mark an issue as wontfix (canceled).

        Use this when you decide not to do an issue. Unlike 'issue close',
        this does not require ticket-level rituals to be completed.
        """
        iss = _client().get_issue_by_identifier(identifier)
        if iss["status"] == "canceled":
            console.print(f"[dim]Issue {identifier} is already canceled.[/dim]")
            return
        _client().update_issue(iss["id"], status="canceled")
        console.print(f"[green]Issue {identifier} marked as wontfix (canceled).[/green]")

    @issue.command("cancel")
    @click.argument("identifier")
    @_main().require_auth
    @_main().handle_error
    def issue_cancel(identifier):
        """Cancel an issue.

        Alias for 'issue wontfix IDENTIFIER'.
        """
        issue_wontfix.callback(identifier)

    @issue.command("claim")
    @click.argument("identifier")
    @_main().require_auth
    @_main().handle_error
    def issue_claim(identifier):
        """Assign an issue to yourself and move to in_progress.

        Shortcut for 'issue assign IDENTIFIER me' + 'issue move IDENTIFIER in_progress'.
        """
        iss = _client().get_issue_by_identifier(identifier)
        user = _client().get_me()
        _client().update_issue(iss["id"], assignee_id=user["id"], status="in_progress")
        console.print(f"[green]Issue {identifier} claimed and moved to In Progress.[/green]")

    @issue.command("start")
    @click.argument("identifier")
    @_main().require_auth
    @_main().handle_error
    def issue_start(identifier):
        """Start working on an issue.

        Alias for 'issue claim IDENTIFIER'.
        """
        issue_claim.callback(identifier)

    @issue.command("rituals")
    @click.argument("identifier")
    @_main().require_auth
    @_main().handle_error
    def issue_rituals(identifier):
        """Show pending rituals for an issue.

        Displays which ticket-level rituals (close or claim) still need to be
        completed before the issue can be claimed or marked done.
        """
        m = _main()
        iss = _client().get_issue_by_identifier(identifier)
        status = _client().get_pending_issue_rituals(iss["id"])
        pending = status.get("pending_rituals", [])
        completed = status.get("completed_rituals", [])

        if not pending and not completed:
            console.print(f"[dim]No ticket-level rituals configured for this project.[/dim]")
            return

        console.print(f"[bold]Ticket-level rituals for {identifier}:[/bold]")

        for r in completed:
            console.print(f"  [green]\u2713[/green] {r['name']}")
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
                    att = r["attestation"]
                    if att.get("note"):
                        console.print(f"      [dim]Note: {att['note']}[/dim]")
            else:
                console.print(f"  [red]\u25cb[/red] {r['name']} {mode}")
                print_ritual_prompt(r['prompt'])

        if pending:
            console.print(f"\n[dim]Run 'chaotic ritual attest <name> --ticket {identifier}' to attest.[/dim]")

    @issue.command("escalate")
    @click.argument("identifier")
    @_main().require_auth
    @_main().handle_error
    def issue_escalate(identifier):
        """Bump issue priority up one level.

        Increases priority: no_priority -> low -> medium -> high -> urgent.
        If already at urgent, no change is made.

        Example: chaotic issue escalate CHT-123
        """
        iss = _client().get_issue_by_identifier(identifier)
        current = iss.get("priority", "no_priority")

        try:
            current_index = PRIORITY_LEVELS.index(current)
        except ValueError:
            current_index = 0  # Default to no_priority if unknown

        if current_index >= len(PRIORITY_LEVELS) - 1:
            console.print(f"[yellow]Issue {identifier} is already at highest priority (urgent).[/yellow]")
            return

        new_priority = PRIORITY_LEVELS[current_index + 1]
        _client().update_issue(iss["id"], priority=new_priority)
        console.print(f"[green]Issue {identifier} priority escalated: {current} \u2192 {new_priority}[/green]")

    @issue.command("deescalate")
    @click.argument("identifier")
    @_main().require_auth
    @_main().handle_error
    def issue_deescalate(identifier):
        """Bump issue priority down one level.

        Decreases priority: urgent -> high -> medium -> low -> no_priority.
        If already at no_priority, no change is made.

        Example: chaotic issue deescalate CHT-123
        """
        iss = _client().get_issue_by_identifier(identifier)
        current = iss.get("priority", "no_priority")

        try:
            current_index = PRIORITY_LEVELS.index(current)
        except ValueError:
            current_index = 0  # Default to no_priority if unknown

        if current_index <= 0:
            console.print(f"[yellow]Issue {identifier} is already at lowest priority (no_priority).[/yellow]")
            return

        new_priority = PRIORITY_LEVELS[current_index - 1]
        _client().update_issue(iss["id"], priority=new_priority)
        console.print(f"[green]Issue {identifier} priority deescalated: {current} \u2192 {new_priority}[/green]")

    # Add 'ticket' as alias for 'issue' command group
    cli.add_command(issue, name="ticket")

    return issue
