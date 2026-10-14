"""Server text in Rich output (CHT-1526).

Rich parses every string it prints as markup: `console.print(str)`,
`Panel(str)`, a `Table` title and each `str` table cell. Names, titles,
descriptions and error messages come from the server and from other
users, so a `[/x]` in one raised MarkupError mid-print, and a `[link=...]`
or `[red]` in one restyled the terminal.

- `esc(value)`: escape a value interpolated into a markup string.
- `Table`: a rich Table whose `add_row` escapes every plain `str` cell,
  so a row cannot carry markup by accident. A cell that is markup on
  purpose is passed as `Markup(...)` (or `markup(...)`, which keeps None
  as an empty cell), with any server text inside it already escaped.
"""
from rich.markup import escape
from rich.table import Table as _RichTable


class Markup(str):
    """A table cell that is Rich markup on purpose; `Table.add_row` leaves
    it as is. Build it from constants and `esc()`'d values only."""


def markup(value: str | None) -> Markup | None:
    """`Markup(value)`, keeping None (an empty cell) as None."""
    return None if value is None else Markup(value)


def esc(value) -> str:
    """`value` as text that Rich prints literally inside markup."""
    return escape(str(value))


class Table(_RichTable):
    """rich.table.Table, but a plain `str` cell is printed as text, not
    parsed as markup (see the module docstring)."""

    def add_row(self, *renderables, **kwargs):
        cells = [
            esc(cell) if isinstance(cell, str) and not isinstance(cell, Markup) else cell
            for cell in renderables
        ]
        return super().add_row(*cells, **kwargs)
