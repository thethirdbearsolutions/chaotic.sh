"""Document management commands."""
import sys

import click
from rich.markdown import Markdown
from rich.panel import Panel
from rich.table import Table

from .shared import _client, console, get_status_color


def _main():
    """Late-bind to cli.main for test mock compatibility."""
    return sys.modules['cli.main']


def register(cli):
    """Register doc commands on the CLI group."""

    @cli.group()
    def doc():
        """Document management commands."""
        pass

    @doc.command("list")
    @click.option("--search", help="Search documents by title")
    @click.option("--project", help="Filter by project (ID, key, or name)")
    @click.option("--sprint", help="Filter by sprint (name, 'current', 'next', or ID)")
    @click.option("--all", "show_all", is_flag=True, help="Show all docs (not just current project)")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def doc_list(search, project, sprint, show_all):
        """List documents in current team."""
        m = _main()
        project_id = None
        sprint_id = None
        if project:
            project_id = m.resolve_project_id(project)
        elif not show_all:
            # Default to current project if set
            project_id = m.get_current_project()

        if sprint:
            proj = project_id or m.get_current_project()
            if proj:
                sprint_id = m.resolve_sprint_id(sprint, proj)
            else:
                console.print("[yellow]Warning: --sprint ignored (no project context)[/yellow]")

        documents = _client().get_documents(m.get_current_team(), project_id=project_id, sprint_id=sprint_id, search=search)
        if m.is_json_output():
            m.output_json(documents or [])
            return
        if not documents:
            console.print("[yellow]No documents found.[/yellow]")
            return

        table = Table(title="Documents")
        table.add_column("ID", style="dim")
        table.add_column("Title")
        table.add_column("Scope", style="cyan")
        table.add_column("Updated")

        for d in documents:
            scope = "Global" if not d.get("project_id") else ("Sprint" if d.get("sprint_id") else "Project")
            table.add_row(
                d["id"][:8] + "...",
                d["title"][:50] + ("..." if len(d["title"]) > 50 else ""),
                scope,
                d["updated_at"][:10]
            )

        console.print(table)

    @doc.command("create")
    @click.argument("title_words", nargs=-1)
    @click.option("--title", "title_opt", help="Document title (alternative to positional argument)")
    @click.option("--content", "--body", "--description", default="")
    @click.option("--icon", default="")
    @click.option("--project", help="Project to attach doc to (ID, key, or name). Omit for global/team-wide.")
    @click.option("--sprint", help="Sprint to attach doc to (ID, name, or 'current')")
    @click.option("--global", "is_global", is_flag=True, help="Create as global doc (not attached to current project)")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def doc_create(title_words, title_opt, content, icon, project, sprint, is_global):
        """Create a new document.

        TITLE can be provided as positional argument(s) or with --title.
        Multiple words are joined: `doc create Sprint 24 Report` -> "Sprint 24 Report"
        """
        m = _main()
        # Allow --title as alternative to positional argument
        title = " ".join(title_words) if title_words else title_opt
        if not title:
            raise click.UsageError("Missing title. Provide as argument or with --title.")
        project_id = None
        sprint_id = None
        if project:
            project_id = m.resolve_project_id(project)
        elif not is_global:
            # Default to current project if set
            project_id = m.get_current_project()

        if sprint:
            proj = project_id or m.get_current_project()
            if proj:
                sprint_id = m.resolve_sprint_id(sprint, proj)
            else:
                console.print("[yellow]Warning: --sprint ignored (no project context)[/yellow]")

        data = {"content": content or None, "icon": icon or None, "project_id": project_id, "sprint_id": sprint_id}
        result = _client().create_document(m.get_current_team(), title, **data)
        if m.is_json_output():
            m.output_json(result)
            return
        scope = "sprint" if sprint_id else ("project" if project_id else "global")
        console.print(f"[green]Document created ({scope}): {result['title']}[/green]")

    @doc.command("show")
    @click.argument("document_id")
    @click.option("--no-comments", is_flag=True, help="Hide document comments")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def doc_show(document_id, no_comments):
        """Show document content.

        DOCUMENT_ID can be a full ID, title, or a prefix.
        """
        m = _main()
        team_id = m.get_current_team()
        document_id = m.resolve_document_id(document_id, team_id)

        comments = not no_comments
        d = _client().get_document(document_id)
        if m.is_json_output():
            if comments:
                d['comments'] = _client().get_document_comments(d['id'])
            d['linked_issues'] = _client().get_document_issues(d['id'])
            m.output_json(d)
            return
        content = d.get('content') or 'No content'
        # Build subtitle with author and scope
        subtitle_parts = []
        if d.get('author_name'):
            subtitle_parts.append(f"By {d['author_name']}")
        if d.get("sprint_id"):
            scope = "Sprint-scoped"
        elif d.get("project_id"):
            scope = "Project-scoped"
        else:
            scope = "Global"
        subtitle_parts.append(scope)
        subtitle = " | ".join(subtitle_parts)
        # Render content as markdown
        md_content = Markdown(content)
        console.print(Panel(
            md_content,
            title=f"{d.get('icon') or ''} {d['title']}".strip(),
            subtitle=subtitle
        ))

        # Show linked issues
        linked_issues = _client().get_document_issues(d['id'])
        if linked_issues:
            console.print("\n[bold]Linked Issues:[/bold]")
            for issue in linked_issues:
                status_color = get_status_color(issue.get('status', 'backlog'))
                console.print(f"  \u2022 [{status_color}]{issue['identifier']}[/{status_color}] {issue['title']}")

        # Show comments if requested
        if comments:
            doc_comments = _client().get_document_comments(d['id'])
            if doc_comments:
                console.print("\n[bold]Comments:[/bold]")
                for c in doc_comments:
                    # Format date if available
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
            else:
                console.print("\n[dim]No comments[/dim]")

    @doc.command("comment")
    @click.argument("document_id")
    @click.argument("content")
    @_main().require_team
    @_main().handle_error
    def doc_comment(document_id, content):
        """Add a comment to a document.

        DOCUMENT_ID can be a full ID, title, or a prefix.
        """
        m = _main()
        team_id = m.get_current_team()
        document_id = m.resolve_document_id(document_id, team_id)
        _client().create_document_comment(document_id, content)
        console.print("[green]Comment added.[/green]")

    @doc.command("comment-edit")
    @click.argument("document_id")
    @click.argument("comment_id")
    @click.argument("content")
    @_main().require_team
    @_main().handle_error
    def doc_comment_edit(document_id, comment_id, content):
        """Edit a comment on a document.

        DOCUMENT_ID can be a full ID, title, or a prefix.
        """
        m = _main()
        team_id = m.get_current_team()
        document_id = m.resolve_document_id(document_id, team_id)
        _client().update_document_comment(document_id, comment_id, content)
        console.print("[green]Comment updated.[/green]")

    @doc.command("comment-delete")
    @click.argument("document_id")
    @click.argument("comment_id")
    @_main().require_team
    @_main().handle_error
    def doc_comment_delete(document_id, comment_id):
        """Delete a comment on a document.

        DOCUMENT_ID can be a full ID, title, or a prefix.
        """
        m = _main()
        team_id = m.get_current_team()
        if not m.confirm_action("Are you sure you want to delete this comment?"):
            raise SystemExit(0)
        document_id = m.resolve_document_id(document_id, team_id)
        _client().delete_document_comment(document_id, comment_id)
        console.print("[green]Comment deleted.[/green]")

    @doc.command("update")
    @click.argument("document_id")
    @click.option("--title")
    @click.option("--content")
    @click.option("--icon")
    @click.option("--project", help="Move to project (ID, key, or name)")
    @click.option("--sprint", help="Attach to sprint (name, 'current', 'next', or ID)")
    @click.option("--no-sprint", "no_sprint", is_flag=True, help="Remove from sprint")
    @click.option("--global", "is_global", is_flag=True, help="Make global (remove from project)")
    @_main().require_team
    @_main().handle_error
    def doc_update(document_id, title, content, icon, project, sprint, no_sprint, is_global):
        """Update a document.

        DOCUMENT_ID can be a full ID, title, or a prefix.
        """
        m = _main()
        team_id = m.get_current_team()
        document_id = m.resolve_document_id(document_id, team_id)

        data = {}
        if title:
            data["title"] = title
        if content is not None:
            data["content"] = content
        if icon is not None:
            data["icon"] = icon
        if project:
            data["project_id"] = m.resolve_project_id(project)
        elif is_global:
            data["project_id"] = None
        if sprint:
            proj = m.get_current_project()
            if proj:
                data["sprint_id"] = m.resolve_sprint_id(sprint, proj)
            else:
                console.print("[yellow]Warning: --sprint ignored (no project context)[/yellow]")
        elif no_sprint:
            data["sprint_id"] = None

        if not data:
            console.print("[yellow]No updates provided.[/yellow]")
            return

        _client().update_document(document_id, **data)
        console.print("[green]Document updated.[/green]")

    @doc.command("delete")
    @click.argument("document_id")
    @_main().require_team
    @_main().handle_error
    def doc_delete(document_id):
        """Delete a document.

        DOCUMENT_ID can be a full ID, title, or a prefix.
        """
        m = _main()
        if not m.confirm_action("Are you sure you want to delete this document?"):
            raise SystemExit(0)
        team_id = m.get_current_team()
        document_id = m.resolve_document_id(document_id, team_id)

        _client().delete_document(document_id)
        console.print("[green]Document deleted.[/green]")

    @doc.command("link")
    @click.argument("document_id")
    @click.argument("issue_identifier")
    @_main().require_team
    @_main().handle_error
    def doc_link(document_id, issue_identifier):
        """Link a document to an issue.

        DOCUMENT_ID can be a full ID, title, or a prefix.
        ISSUE_IDENTIFIER is the issue identifier (e.g., CHT-123).
        """
        m = _main()
        team_id = m.get_current_team()
        document_id = m.resolve_document_id(document_id, team_id)

        # Resolve issue
        issue = _client().get_issue_by_identifier(issue_identifier)
        issue_id = issue['id']

        _client().link_document_to_issue(document_id, issue_id)
        console.print(f"[green]Document linked to {issue_identifier}.[/green]")

    @doc.command("unlink")
    @click.argument("document_id")
    @click.argument("issue_identifier")
    @_main().require_team
    @_main().handle_error
    def doc_unlink(document_id, issue_identifier):
        """Unlink a document from an issue.

        DOCUMENT_ID can be a full ID, title, or a prefix.
        ISSUE_IDENTIFIER is the issue identifier (e.g., CHT-123).
        """
        m = _main()
        team_id = m.get_current_team()
        document_id = m.resolve_document_id(document_id, team_id)

        # Resolve issue
        issue = _client().get_issue_by_identifier(issue_identifier)
        issue_id = issue['id']

        _client().unlink_document_from_issue(document_id, issue_id)
        console.print(f"[green]Document unlinked from {issue_identifier}.[/green]")

    @doc.command("open")
    @click.argument("document_id")
    @_main().require_team
    @_main().handle_error
    def doc_open(document_id):
        """Open document in browser.

        DOCUMENT_ID can be a full ID, title, or a prefix.
        """
        m = _main()
        team_id = m.get_current_team()
        document_id = m.resolve_document_id(document_id, team_id)
        web_url = m.get_web_url()
        url = f"{web_url}/document/{document_id}"
        console.print(f"[dim]Opening {url}...[/dim]")
        m.webbrowser.open(url)

    return doc
