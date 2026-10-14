"""Server text in Rich output (CHT-1526).

Rich parses every string it prints as markup: `console.print(str)`,
`Panel(str)`, a `Table` title and each `str` table cell. Names, titles,
descriptions and error messages come from the server and from other
users, so a `[/x]` in one raised MarkupError mid-print, and a `[link=...]`
or `[red]` in one restyled the terminal.

- `esc(value)`: escape a value interpolated into a markup string.
- `Table`: a rich Table that escapes every plain `str` cell, title,
  caption, column header and footer, so none of them can carry markup by
  accident. One that is markup on purpose is passed as `Markup(...)` (or
  `markup(...)`, which keeps None as an empty cell), with any server text
  inside it already escaped.
"""
from rich.markup import escape
from rich.table import Table as _RichTable


class Markup(str):
    """A table cell, title, caption or header that is Rich markup on purpose;
    `Table` leaves it as is. Build it from constants and `esc()`'d values
    only, and wrap last: any str operation on a Markup (`+`, slicing,
    `.strip()`, `.format()`) returns a plain str, which `Table` then
    escapes, so the tags print literally (safe, but wrong)."""


def markup(value: str | None) -> Markup | None:
    """`Markup(value)`, keeping None (an empty cell) as None."""
    return None if value is None else Markup(value)


def _text(value):
    """Escape a plain str; leave Markup, None and renderables alone."""
    return esc(value) if isinstance(value, str) and not isinstance(value, Markup) else value


def esc(value) -> str:
    """`value` as text that Rich prints literally inside markup."""
    return escape(str(value))


class Table(_RichTable):
    """rich.table.Table, but a plain `str` cell, title, caption, column
    header or footer is printed as text, not parsed as markup (see the
    module docstring)."""

    def __init__(self, *headers, title=None, caption=None, **kwargs):
        # rich's __init__ adds each str header through add_column, which escapes it.
        super().__init__(*headers, title=_text(title), caption=_text(caption), **kwargs)

    def add_column(self, header="", footer="", **kwargs):
        return super().add_column(_text(header), _text(footer), **kwargs)

    def add_row(self, *renderables, **kwargs):
        return super().add_row(*(_text(cell) for cell in renderables), **kwargs)
