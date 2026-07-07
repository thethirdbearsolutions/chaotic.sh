"""Inbox commands (CHT-1250).

`chaotic inbox` bare (no subcommand) lists entries -- same options as
`chaotic inbox list`, which is also kept as an explicit alias to match
every other resource group's `<noun> <verb>` shape (label list, ritual
attest, doc create, ...).
"""
import sys

import click
from rich.table import Table

from .shared import _client, console


def _main():
    """Late-bind to cli.main for test mock compatibility."""
    return sys.modules['cli.main']


def _print_inbox_table(items):
    if not items:
        console.print("[yellow]Inbox is empty.[/yellow]")
        return

    table = Table(title="Inbox")
    table.add_column("ID", style="dim")
    table.add_column("Kind")
    table.add_column("Title")
    table.add_column("Source")
    table.add_column("Created")
    table.add_column("Read")

    for item in items:
        source = item.get("issue_identifier") or item.get("document_title") or ""
        table.add_row(
            (item["id"][:8] + "...") if item.get("id") else "",
            item.get("kind", ""),
            item.get("title", ""),
            source,
            (item.get("created_at") or "")[:19],
            "yes" if item.get("read_at") else "",
        )

    console.print(table)


def _list_inbox(unread, limit, skip):
    m = _main()
    items = _client().get_inbox(
        m.get_current_team(), unread=unread, skip=skip, limit=limit,
    )
    if m.is_json_output():
        m.output_json(items or [])
        return
    _print_inbox_table(items or [])


def register(cli):
    """Register inbox commands on the CLI group."""

    @cli.group(invoke_without_command=True)
    @click.option("--unread", is_flag=True, help="Show only unread entries")
    @click.option("--limit", "-n", type=int, default=50, help="Max entries to show")
    @click.option("--skip", type=int, default=0, help="Entries to skip (pagination)")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    @click.pass_context
    def inbox(ctx, unread, limit, skip):
        """Inbox: gates awaiting you, mentions, assignments, review requests.

        Bare `chaotic inbox` lists entries (same as `chaotic inbox list`).
        """
        if ctx.invoked_subcommand is not None:
            return
        _list_inbox(unread, limit, skip)

    @inbox.command("list")
    @click.option("--unread", is_flag=True, help="Show only unread entries")
    @click.option("--limit", "-n", type=int, default=50, help="Max entries to show")
    @click.option("--skip", type=int, default=0, help="Entries to skip (pagination)")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def inbox_list(unread, limit, skip):
        """List inbox entries, newest first."""
        _list_inbox(unread, limit, skip)

    @inbox.command("mark-read")
    @click.argument("entry_id")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    @_main().json_result(lambda entry_id: _client().mark_inbox_read(entry_id))
    def inbox_mark_read(entry_id):
        """Mark a single inbox entry as read. ENTRY_ID is the full entry id
        (as shown, un-truncated, by `--json`; the table view truncates it
        for display only).
        """
        _client().mark_inbox_read(entry_id)
        console.print(f"[green]Marked {entry_id} as read.[/green]")

    @inbox.command("mark-all-read")
    @_main().json_option
    @_main().require_team
    @_main().handle_error
    def inbox_mark_all_read():
        """Mark every unread inbox entry (in the current team) as read."""
        m = _main()
        result = _client().mark_all_inbox_read(m.get_current_team())
        if m.is_json_output():
            m.output_json(result)
            return
        console.print(f"[green]Marked {result.get('marked_count', 0)} entries as read.[/green]")

    return inbox
