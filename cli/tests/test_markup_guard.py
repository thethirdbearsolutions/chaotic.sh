"""Guard: server text reaches Rich markup only through esc() (CHT-1702).

Rich parses every string it prints as markup, so a name with `[/bold]` in
it crashed a command mid-print and a `[link=...]` restyled the terminal
(CHT-1526). `markup.Table` escapes its cells, title and caption itself;
for everything else this test reads the CLI's source and fails on:

- unescaped: a value in a markup string handed to `console.print(...)` or
  `Panel(...)` (body, title, subtitle), or in a string assigned to a
  `*_markup` name, appended to one, or returned by a `*_markup` function,
  that is not `esc(...)`, `escape(...)`, `markup(...)`/`Markup(...)`, a
  `*_markup` name or call, or a constant. A bare variable passed to
  console.print/Panel counts too, unless it holds a renderable built
  in the same function (`Table(...)`, `Markdown(...)`, ...).
- markup_false: esc()/escape() in a `console.print(..., markup=False)`,
  where the backslashes are printed.
- nested: esc()/escape() around a string that already contains esc() or
  escape(), which escapes it twice.
- table_title: esc()/escape() in a `Table(title=/caption=)`, which
  markup.Table escapes itself.

Text that is markup on purpose lives in a name ending in `_markup`, or is
built by a function whose name ends in `_markup`; that name is the whole
allowlist, so there is no list of exceptions to keep.
"""
import ast
import re
from pathlib import Path

import pytest

SRC = Path(__file__).resolve().parents[1] / "src" / "cli"
ESCAPERS = {"esc", "escape"}
MARKERS = {"markup", "Markup"}  # their argument is markup: checked like any other
# str methods that keep a checked string checked: `f"...".strip()`.
STR_METHODS = {"strip", "lstrip", "rstrip"}
# A numeric format spec (`{size_mb:.1f}`) cannot produce a bracket.
NUMERIC_SPEC = re.compile(r"^[<>=^]?[+ -]?#?0?\d*,?(\.\d+)?[dfegn%]$")
# Rich renderables (not markup strings) a variable may hold.
RENDERABLES = {"Table", "Markdown", "Panel", "Padding", "Text", "Group", "Columns", "Syntax", "Tree"}
CONSOLES = {"console"}


def _call_name(node):
    if not isinstance(node, ast.Call):
        return None
    f = node.func
    return f.attr if isinstance(f, ast.Attribute) else f.id if isinstance(f, ast.Name) else None


def _is_markup_name(name):
    return name is not None and name.lower().endswith("_markup")


def _is_console_print(call):
    f = call.func
    return (isinstance(f, ast.Attribute) and f.attr in ("print", "log", "rule")
            and isinstance(f.value, ast.Name) and f.value.id in CONSOLES)


def _contains_escaper(node):
    return any(_call_name(n) in ESCAPERS for n in ast.walk(node))


class _Checker:
    def __init__(self, path: Path):
        self.path = path
        self.src = path.read_text()
        self.tree = ast.parse(self.src)
        self.problems = []
        self.parents = {}
        for p in ast.walk(self.tree):
            for c in ast.iter_child_nodes(p):
                self.parents[c] = p

    def _flag(self, rule, node, what):
        rel = self.path.relative_to(SRC.parent) if self.path.is_relative_to(SRC.parent) else self.path.name
        self.problems.append(f"{rel}:{node.lineno}: [{rule}] {what}")

    def _inside_checked(self, node):
        """A Markup() call within a sink is checked from the sink."""
        while node in self.parents:
            node = self.parents[node]
            if isinstance(node, ast.Call) and (_is_console_print(node) or _call_name(node) == "Panel"):
                return True
        return False

    def _function(self, node):
        while node in self.parents:
            node = self.parents[node]
            if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
                return node
        return self.tree

    def _holds_renderable(self, name: ast.Name):
        """Every assignment to `name` in its function builds a renderable."""
        values = [
            n.value for n in ast.walk(self._function(name))
            if isinstance(n, ast.Assign) and any(isinstance(t, ast.Name) and t.id == name.id for t in n.targets)
        ]
        return bool(values) and all(_call_name(v) in RENDERABLES for v in values)

    def _check_value(self, node, *, bare_ok=False):
        """A value that becomes part of a markup string."""
        if isinstance(node, ast.Constant):
            return
        if isinstance(node, ast.JoinedStr):
            for v in node.values:
                if not isinstance(v, ast.FormattedValue):
                    continue
                spec = v.format_spec
                if (spec is not None and len(spec.values) == 1 and isinstance(spec.values[0], ast.Constant)
                        and NUMERIC_SPEC.match(spec.values[0].value)):
                    continue
                self._check_value(v.value)
            return
        if isinstance(node, ast.BinOp) and isinstance(node.op, ast.Add):
            self._check_value(node.left, bare_ok=bare_ok)
            self._check_value(node.right, bare_ok=bare_ok)
            return
        if isinstance(node, ast.IfExp):
            self._check_value(node.body, bare_ok=bare_ok)
            self._check_value(node.orelse, bare_ok=bare_ok)
            return
        if isinstance(node, ast.BoolOp):
            for v in node.values:
                self._check_value(v, bare_ok=bare_ok)
            return
        name = _call_name(node)
        if name is not None:
            if name in ESCAPERS:
                if any(_contains_escaper(a) for a in node.args):
                    self._flag("nested", node, ast.get_source_segment(self.src, node))
                return
            if name in MARKERS:
                for a in node.args:
                    self._check_value(a)
                return
            if _is_markup_name(name) or name in RENDERABLES:
                return
            if (name == "get" and isinstance(node.func, ast.Attribute) and isinstance(node.func.value, ast.Dict)
                    and all(isinstance(v, ast.Constant) for v in node.func.value.values)
                    and all(isinstance(d, ast.Constant) for d in node.args[1:])):
                return  # a lookup in a literal table of constants, constant default
            if name in STR_METHODS and isinstance(node.func, ast.Attribute):
                self._check_value(node.func.value, bare_ok=bare_ok)
                return
            if name == "join" and isinstance(node.func, ast.Attribute) and isinstance(node.func.value, ast.Constant):
                for a in node.args:
                    self._check_value(a)
                return
            self._flag("unescaped", node, ast.get_source_segment(self.src, node))
            return
        if isinstance(node, ast.Name):
            if _is_markup_name(node.id) or (bare_ok and self._holds_renderable(node)):
                return
        if isinstance(node, (ast.GeneratorExp, ast.ListComp)):
            self._check_value(node.elt)
            return
        self._flag("unescaped", node, ast.get_source_segment(self.src, node))

    def run(self):
        for node in ast.walk(self.tree):
            if isinstance(node, ast.Call):
                name = _call_name(node)
                if _is_console_print(node):
                    if any(k.arg == "markup" and isinstance(k.value, ast.Constant) and k.value.value is False
                           for k in node.keywords):
                        for a in node.args:
                            if _contains_escaper(a):
                                self._flag("markup_false", a, ast.get_source_segment(self.src, a))
                        continue
                    for a in node.args:
                        self._check_value(a, bare_ok=True)
                elif name == "Panel":
                    for a in node.args:
                        self._check_value(a, bare_ok=True)
                    for k in node.keywords:
                        if k.arg in ("title", "subtitle"):
                            self._check_value(k.value)
                elif name in MARKERS and not self._inside_checked(node):
                    for a in node.args:
                        self._check_value(a)
                elif name == "Table":
                    for k in node.keywords:
                        if k.arg in ("title", "caption") and _contains_escaper(k.value):
                            self._flag("table_title", k.value, ast.get_source_segment(self.src, k.value))
                elif (name == "append" and isinstance(node.func, ast.Attribute)
                      and isinstance(node.func.value, ast.Name) and _is_markup_name(node.func.value.id)):
                    for a in node.args:
                        self._check_value(a)
            elif isinstance(node, (ast.Assign, ast.AnnAssign, ast.AugAssign)):
                targets = node.targets if isinstance(node, ast.Assign) else [node.target]
                if any(isinstance(t, ast.Name) and _is_markup_name(t.id) for t in targets) and node.value is not None:
                    if isinstance(node.value, (ast.List, ast.Tuple)):
                        for e in node.value.elts:
                            self._check_value(e)
                    else:
                        self._check_value(node.value)
            elif isinstance(node, ast.Return) and node.value is not None:
                fn = self._function(node)
                if isinstance(fn, ast.FunctionDef) and _is_markup_name(fn.name):
                    self._check_value(node.value)
        return self.problems


def check(path: Path) -> list[str]:
    return _Checker(path).run()


def _sources():
    # markup.py defines the markers; what it wraps is its callers' to check.
    return [p for p in sorted(SRC.rglob("*.py")) if p.name != "markup.py"]


def test_server_text_reaches_rich_markup_only_through_esc():
    problems = [p for path in _sources() for p in check(path)]
    assert problems == [], "\n".join(problems)


# ── The rules themselves, on small sources ────────────────────────────────────

GOOD = """
def f(name, size_mb, rows, x):
    table = Table(title=name)
    console.print(table)
    console.print(f"[red]{esc(name)}[/red] {size_mb:.1f} MB")
    console.print(Panel(f"[b]{esc(name)}[/b]", title=esc(name), subtitle="s"))
    note_markup = "[dim]note[/dim]" if x else ""
    console.print(f"{note_markup}")
    lines_markup = [f"[b]{esc(name)}[/b]"]
    lines_markup.append(f"[dim]{escape(name)}[/dim]")
    console.print(Panel("\\n".join(lines_markup)))
    console.print(line, markup=False)
    table.add_row(Markup(f"[red]{esc(name)}[/red]"))
    color_markup = {"done": "green"}.get(x, "white")
    console.print(f"[{color_markup}]{esc(name)}[/{color_markup}]")


def status_markup(x):
    return f"[green]{esc(x)}[/green]"
"""

BAD = {
    "unescaped": [
        'console.print(f"[red]{name}[/red]")',
        'console.print(Panel("body", title=f"Issue {name}"))',
        "console.print(name)",
        'x_markup = f"[b]{name}[/b]"',
        'lines_markup.append(f"Parent: {name}")',
        'table.add_row(Markup(f"[red]{name}[/red]"))',
    ],
    # The two double escapes in #385's first head (its review, L1 and L2).
    "markup_false": ['console.print(f"  {esc(line)}", markup=False)'],
    "nested": ["console.print(f\"[red]{escape(f'{esc(kind)}: {e}')}[/red]\")"],
    "table_title": ['table = Table(title=f"Keys for {esc(name)}")'],
}


def _check_source(tmp_path, source):
    path = tmp_path / "sample.py"
    path.write_text(source)
    return check(path)


def test_clean_source_passes(tmp_path):
    assert _check_source(tmp_path, GOOD) == []


def test_a_bad_return_from_a_markup_function_fails(tmp_path):
    problems = _check_source(tmp_path, "def x_markup(name):\n    return f'[b]{name}[/b]'\n")
    assert len(problems) == 1 and "[unescaped] name" in problems[0]


@pytest.mark.parametrize("rule, line", [(rule, line) for rule, lines in BAD.items() for line in lines])
def test_each_rule_flags_its_bad_line(tmp_path, rule, line):
    problems = _check_source(tmp_path, f"def f(name, line, kind, e, table, lines_markup):\n    {line}\n")
    assert len(problems) == 1 and f"[{rule}]" in problems[0], problems
