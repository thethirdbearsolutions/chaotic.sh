"""Guard: server text reaches Rich markup only through esc() (CHT-1702).

Rich parses every string it prints as markup, so a name with `[/bold]` in
it crashed a command mid-print and a `[link=...]` restyled the terminal
(CHT-1526). `markup.Table` escapes its cells, title, caption, column
headers and footers itself; for everything else this test reads the CLI's
source and fails on:

- unescaped: a value in a markup string handed to a sink, or in a string
  assigned to a `*_markup` name, appended to one, or returned by a
  `*_markup` function, that is not `esc(...)`, `escape(...)`,
  `markup(...)`/`Markup(...)`, a `*_markup` name or call, or a constant.
  The sinks: `.print/.log/.rule/.status/.input` on any console (a
  receiver whose name contains "console", `Console()`, or a name bound to
  one, by assignment or import alias), `rich.print`, `Panel(...)` (body,
  `renderable=`, title, subtitle), `Text.from_markup`, `Prompt/Confirm.ask`
  (under any import alias), `Live(...)`, `Tree(...)`, and these methods
  on a Rich object: `progress.add_task`, `progress.update(description=)`,
  `status.update`, `live.update`, `tree.add`. A receiver is that Rich
  object when every binding of it in its function says so (`Tree(...)`,
  `tree.add(...)`, `Progress(...)`, `console.status(...)`, `Live(...)`,
  or an annotation naming the class); with no such binding (an
  unannotated parameter, an attribute) its name decides, by its last
  `_`-separated word: `tree`/`branch`, `progress`, `status`, `live`. So
  `branches = set(); branches.add(name)` and `client.add_task(name)` are
  not sinks. Also the str arguments of `Group`/`Columns`/`Padding`. A bare
  variable passed to a sink counts too, unless it holds a renderable built
  in the same function (`Table(...)`, `Markdown(...)`, ...).
- markup_false: esc()/escape() or a `*_markup` value in a
  `console.print(..., markup=False)`, where the tags and backslashes are
  printed as they are.
- nested: esc()/escape() around a string that already contains esc(),
  escape() or a `*_markup` value, which escapes it twice.
- table_title: esc()/escape() in a `Table(title=/caption=)`, a
  positional `Table(...)` header, or an `add_column(...)` header or footer,
  all of which markup.Table escapes itself.
- rich_table: an import of `rich.table`. The table_title rule (and the
  cell escaping it relies on) holds only for markup.Table.
- markup_binding: a `*_markup` name bound where its value is not checked:
  a parameter, a for/comprehension/with/except target, a walrus, or a
  tuple target unpacked from anything but a tuple literal. Pass the
  value in under a plain name and build the `*_markup` name from it.

Text that is markup on purpose lives in a name ending in `_markup`, or is
built by a function whose name ends in `_markup`; that name is the whole
allowlist, so there is no list of exceptions to keep.

One shape this rules out: a helper that takes markup in and prints it.
`def show(body): console.print(body)` is `unescaped` (a plain parameter
is server text as far as the guard knows), `def show(body_markup)` is a
`markup_binding`, and `console.print(Markup(body))` is `unescaped` again.
The legal shape is the other way round: a `*_markup` function that
*returns* the markup (its returns are checked), and the caller prints it.
The same holds for a renderable passed in as a parameter: print it where
it is built, or build it in the helper.
"""
import ast
import re
from pathlib import Path

import pytest

SRC = Path(__file__).resolve().parents[1] / "src" / "cli"
ESCAPERS = {"esc", "escape"}
# Their argument is markup: checked like any other (`Text.from_markup` too).
MARKERS = {"markup", "Markup", "from_markup"}
# str methods that keep a checked string checked: `f"...".strip()`.
STR_METHODS = {"strip", "lstrip", "rstrip"}
# A numeric format spec (`{size_mb:.1f}`) cannot produce a bracket.
NUMERIC_SPEC = re.compile(r"^[<>=^]?[+ -]?#?0?\d*,?(\.\d+)?[dfegn%]$")
# Rich renderables (not markup strings) a variable may hold.
RENDERABLES = {"Table", "Markdown", "Panel", "Padding", "Text", "Group", "Columns", "Syntax", "Tree"}
PROMPTS = {"Prompt", "Confirm", "IntPrompt", "FloatPrompt"}
CONSOLE_METHODS = {"print", "log", "rule", "status", "input"}
# Rich objects whose methods take markup: what binds one, and the last
# `_`-word of a name that is taken to be one when nothing binds it.
TREE = ({"Tree", "add"}, {"tree", "branch"})
PROGRESS = ({"Progress"}, {"progress"})
STATUS = ({"Status", "status"}, {"status"})
LIVE = ({"Live"}, {"live"})
# Containers whose str arguments Rich renders as markup.
CONTAINERS = {"Group", "Columns", "Padding"}


def _call_name(node):
    if not isinstance(node, ast.Call):
        return None
    f = node.func
    return f.attr if isinstance(f, ast.Attribute) else f.id if isinstance(f, ast.Name) else None


def _is_markup_name(name):
    return name is not None and name.lower().endswith("_markup")


def _is_console(node, aliases=()):
    if isinstance(node, ast.Name):
        return "console" in node.id.lower() or node.id in aliases
    if isinstance(node, ast.Attribute):
        return "console" in node.attr.lower()
    return _call_name(node) == "Console"


def _last_word(name):
    return name.lower().rsplit("_", 1)[-1]


def _contains_escaper(node):
    return any(_call_name(n) in ESCAPERS for n in ast.walk(node))


def _contains_markup(node):
    """A `*_markup` name or call anywhere in `node`."""
    return any(
        (isinstance(n, ast.Name) and _is_markup_name(n.id)) or (isinstance(n, ast.Call) and _is_markup_name(_call_name(n)))
        for n in ast.walk(node)
    )


def _targets(node):
    """The plain names bound by an assignment target, through tuples and stars."""
    if isinstance(node, ast.Name):
        yield node
    elif isinstance(node, (ast.Tuple, ast.List)):
        for e in node.elts:
            yield from _targets(e)
    elif isinstance(node, ast.Starred):
        yield from _targets(node.value)


class _Checker:
    def __init__(self, path: Path):
        self.path = path
        self.src = path.read_text()
        self.tree = ast.parse(self.src)
        self.problems = []
        # Local names `from rich import print [as x]` binds.
        self.rich_prints = {
            a.asname or a.name for n in ast.walk(self.tree)
            if isinstance(n, ast.ImportFrom) and n.module == "rich" for a in n.names if a.name == "print"
        }
        # Local names for a Prompt class: `from rich.prompt import Prompt as P`.
        self.prompts = PROMPTS | {
            a.asname for n in ast.walk(self.tree)
            if isinstance(n, ast.ImportFrom) and n.module == "rich.prompt"
            for a in n.names if a.name in PROMPTS and a.asname
        }
        # Names bound to a console without "console" in them: `out = console`,
        # `from .shared import console as out`.
        self.consoles = {
            a.asname for n in ast.walk(self.tree) if isinstance(n, ast.ImportFrom)
            for a in n.names if a.asname and "console" in a.name.lower()
        }
        assigns = [n for n in ast.walk(self.tree) if isinstance(n, ast.Assign)]
        while True:
            found = {
                t.id for n in assigns if _is_console(n.value, self.consoles)
                for t in n.targets if isinstance(t, ast.Name) and "console" not in t.id.lower()
            } - self.consoles
            if not found:
                break
            self.consoles |= found
        self.parents = {}
        for p in ast.walk(self.tree):
            for c in ast.iter_child_nodes(p):
                self.parents[c] = p

    def _flag(self, rule, node, what):
        rel = self.path.relative_to(SRC.parent) if self.path.is_relative_to(SRC.parent) else self.path.name
        self.problems.append(f"{rel}:{node.lineno}: [{rule}] {what}")

    def _is_print(self, call):
        f = call.func
        if isinstance(f, ast.Name):
            return f.id in self.rich_prints
        if not isinstance(f, ast.Attribute):
            return False
        if f.attr == "print" and isinstance(f.value, ast.Name) and f.value.id == "rich":
            return True  # rich.print
        return f.attr in CONSOLE_METHODS and _is_console(f.value, self.consoles)

    def _bindings(self, name: ast.Name):
        """What each binding of `name` in its function says it holds: the
        value or annotation, or None for one that says nothing (an
        unannotated parameter, a loop target)."""
        fn = self._function(name)
        out = []
        if isinstance(fn, (ast.FunctionDef, ast.AsyncFunctionDef)):
            a = fn.args
            for p in (*a.posonlyargs, *a.args, *a.kwonlyargs):
                if p.arg == name.id:
                    out.append(p.annotation)
        for n in ast.walk(fn):
            if isinstance(n, ast.Assign) and any(isinstance(t, ast.Name) and t.id == name.id for t in n.targets):
                out.append(n.value)
            elif isinstance(n, ast.AnnAssign) and isinstance(n.target, ast.Name) and n.target.id == name.id:
                out.append(n.annotation)
            elif (isinstance(n, ast.withitem) and isinstance(n.optional_vars, ast.Name)
                  and n.optional_vars.id == name.id):
                out.append(n.context_expr)
            elif isinstance(n, (ast.For, ast.AsyncFor, ast.comprehension)) \
                    and any(t.id == name.id for t in _targets(n.target)):
                out.append(None)
        return out

    def _is_rich(self, receiver, kind):
        """`receiver` is the Rich object `kind` (TREE, PROGRESS, ...)."""
        ctors, words = kind
        if isinstance(receiver, ast.Call):
            return _call_name(receiver) in ctors
        if isinstance(receiver, ast.Attribute):
            return _last_word(receiver.attr) in words
        if not isinstance(receiver, ast.Name):
            return False
        known = [b for b in self._bindings(receiver) if b is not None]
        if not known:
            return _last_word(receiver.id) in words
        def says(b):
            if isinstance(b, ast.Call):
                return _call_name(b) in ctors
            if isinstance(b, ast.Constant) and isinstance(b.value, str):
                return b.value.rsplit(".", 1)[-1] in ctors
            n = b.attr if isinstance(b, ast.Attribute) else b.id if isinstance(b, ast.Name) else None
            return n in ctors
        return all(says(b) for b in known)

    def _inside_checked(self, node):
        """A Markup() call within a sink is checked from the sink."""
        while node in self.parents:
            node = self.parents[node]
            if isinstance(node, ast.Call) and (self._is_print(node) or _call_name(node) in ("Panel", "fit")):
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
                if any(_contains_escaper(a) or _contains_markup(a) for a in node.args):
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

    def _check_first(self, call, keyword, *, bare_ok=False):
        """The first positional argument, or the keyword that names it."""
        if call.args:
            self._check_value(call.args[0], bare_ok=bare_ok)
        for k in call.keywords:
            if k.arg == keyword:
                self._check_value(k.value, bare_ok=bare_ok)

    def _check_assign(self, target, value):
        """`target = value`, pairing tuple targets with tuple values."""
        if isinstance(target, (ast.Tuple, ast.List)):
            if isinstance(value, (ast.Tuple, ast.List)) and len(value.elts) == len(target.elts) \
                    and not any(isinstance(e, ast.Starred) for e in target.elts):
                for t, v in zip(target.elts, value.elts):
                    self._check_assign(t, v)
            elif any(_is_markup_name(n.id) for n in _targets(target)):
                self._flag("markup_binding", target, ast.get_source_segment(self.src, target))
            return
        if isinstance(target, ast.Name) and _is_markup_name(target.id):
            if isinstance(value, (ast.List, ast.Tuple)):
                for e in value.elts:
                    self._check_value(e)
            else:
                self._check_value(value)

    def _check_bindings(self, node):
        """`*_markup` names bound where nothing checks their value."""
        names = []
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef, ast.Lambda)):
            a = node.args
            names = [x for x in (*a.posonlyargs, *a.args, *a.kwonlyargs, a.vararg, a.kwarg) if x is not None]
            names = [(x, x.arg) for x in names]
        elif isinstance(node, (ast.For, ast.AsyncFor, ast.comprehension)):
            names = [(n, n.id) for n in _targets(node.target)]
        elif isinstance(node, ast.withitem) and node.optional_vars is not None:
            names = [(n, n.id) for n in _targets(node.optional_vars)]
        elif isinstance(node, ast.ExceptHandler) and node.name:
            names = [(node, node.name)]
        elif isinstance(node, ast.NamedExpr):
            names = [(node.target, node.target.id)]
        for at, name in names:
            if _is_markup_name(name):
                where = at if hasattr(at, "lineno") else node
                self._flag("markup_binding", where, name)

    def run(self):
        for node in ast.walk(self.tree):
            self._check_bindings(node)
            if isinstance(node, (ast.Import, ast.ImportFrom)):
                mods = [a.name for a in node.names] if isinstance(node, ast.Import) else [node.module or ""]
                if any(m == "rich.table" or m.startswith("rich.table.") for m in mods) or (
                        isinstance(node, ast.ImportFrom) and node.module == "rich"
                        and any(a.name == "table" for a in node.names)):
                    self._flag("rich_table", node, ast.get_source_segment(self.src, node))
            elif (isinstance(node, ast.Attribute) and node.attr == "table"
                  and isinstance(node.value, ast.Name) and node.value.id == "rich"):
                self._flag("rich_table", node, ast.get_source_segment(self.src, node))
            elif isinstance(node, ast.Call):
                name = _call_name(node)
                f = node.func
                receiver = f.value if isinstance(f, ast.Attribute) else None
                if self._is_print(node):
                    if any(k.arg == "markup" and isinstance(k.value, ast.Constant) and k.value.value is False
                           for k in node.keywords):
                        for a in node.args:
                            if _contains_escaper(a) or _contains_markup(a):
                                self._flag("markup_false", a, ast.get_source_segment(self.src, a))
                        continue
                    for a in node.args:
                        self._check_value(a, bare_ok=True)
                elif name == "Panel" or (name == "fit" and isinstance(receiver, ast.Name) and receiver.id == "Panel"):
                    for a in node.args:
                        self._check_value(a, bare_ok=True)
                    for k in node.keywords:
                        if k.arg in ("title", "subtitle"):
                            self._check_value(k.value)
                        elif k.arg == "renderable":
                            self._check_value(k.value, bare_ok=True)
                elif name in MARKERS and not self._inside_checked(node):
                    for a in node.args:
                        self._check_value(a)
                elif name in ("Table", "add_column"):
                    names = ("title", "caption") if name == "Table" else ("header", "footer")
                    heads = node.args if name == "Table" else node.args[:2]
                    for v in [*heads, *(k.value for k in node.keywords if k.arg in names)]:
                        if _contains_escaper(v):
                            self._flag("table_title", v, ast.get_source_segment(self.src, v))
                elif name == "append" and isinstance(receiver, ast.Name) and _is_markup_name(receiver.id):
                    for a in node.args:
                        self._check_value(a)
                elif name == "ask" and (
                        (isinstance(receiver, ast.Name) and receiver.id in self.prompts)
                        or (isinstance(receiver, ast.Attribute) and receiver.attr in PROMPTS)):
                    self._check_first(node, "prompt")
                elif name == "add_task" and self._is_rich(receiver, PROGRESS):
                    self._check_first(node, "description")
                elif name == "Tree" or (name == "add" and self._is_rich(receiver, TREE)):
                    self._check_first(node, "label", bare_ok=True)
                elif name == "Live":
                    self._check_first(node, "renderable", bare_ok=True)
                elif name == "update" and receiver is not None:
                    if self._is_rich(receiver, PROGRESS):
                        for k in node.keywords:
                            if k.arg == "description":
                                self._check_value(k.value)
                    elif self._is_rich(receiver, STATUS):
                        self._check_first(node, "status")
                    elif self._is_rich(receiver, LIVE):
                        self._check_first(node, "renderable", bare_ok=True)
                elif name in CONTAINERS:
                    args = node.args[:1] if name == "Padding" else node.args
                    for a in args:
                        if isinstance(a, ast.Starred):
                            a = a.value
                        elts = a.elts if isinstance(a, (ast.List, ast.Tuple)) else [a]
                        for e in elts:
                            self._check_value(e, bare_ok=True)
            elif isinstance(node, ast.Assign):
                for t in node.targets:
                    self._check_assign(t, node.value)
            elif isinstance(node, (ast.AnnAssign, ast.AugAssign)) and node.value is not None:
                self._check_assign(node.target, node.value)
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
    a_markup, b = f"[b]{esc(name)}[/b]", name
    err_console.print(a_markup)
    console.print(Group(table, a_markup), Columns([table]), Padding(table, 1))
    tree = Tree(esc(name))
    tree.add(a_markup)
    progress.add_task(esc(name))
    Prompt.ask(f"Delete {esc(name)}?")
    Text.from_markup(f"[b]{esc(name)}[/b]")
    for n in x:
        console.print(n, markup=False)
    # Not Rich objects (CHT-1703): a set, a plural, a client, a param typed set.
    branches = set()
    branches.add(name)
    worktrees.add(name)
    client.add_task(name)
    stats.update(name=name)
    table.add_column("Name", footer="Total")
    with console.status("Working") as status:
        status.update(f"Working on {esc(name)}")
    console.print(Panel(renderable=table))


def g(branches: set[str], name):
    branches.add(name)


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
    "rich_table": ["from rich.table import Table", "import rich.table", "x = rich.table.Table()"],
    "markup_binding": [
        "def show(x_markup): pass",
        "for n_markup in names: console.print(n_markup)",
        "rows = [r_markup for r_markup in names]",
        "a_markup, b = pair",
        "if (y_markup := name): pass",
    ],
}
# The sinks beyond console.print and Panel (the #386 review, L1), and the
# double escapes that go through a `*_markup` name (L2, L3).
BAD["unescaped"] += [
    'err_console.print(f"[red]{name}[/red]")',
    'self.console.print(f"{name}")',
    'Console().print(name)',
    'console.status(f"Working on {name}")',
    'rich.print(f"[b]{name}[/b]")',
    'Text.from_markup(f"{name}")',
    'Prompt.ask(f"Delete {name}?")',
    'Confirm.ask(prompt=name)',
    'progress.add_task(f"{name}")',
    "Tree(name)",
    "tree.add(name)",
    "console.print(Group(Markdown(line), name))",
    'Columns([f"{name}"])',
    "Padding(name, 1)",
    'a_markup, b = name, 1',
]
# The sinks the #386 re-review found unchecked, and Rich objects bound
# under a name that does not say so (CHT-1703).
BAD["unescaped"] += [
    'Panel(renderable=f"{name}")',
    'console.input(f"{name}? ")',
    'status.update(f"{name}")',
    'progress.update(e, description=f"{name}")',
    'Live(f"{name}")',
    "live.update(name)",
    "out = console; out.print(name)",
    "rp.Prompt.ask(name)",
    'with console.status("x") as s: s.update(name)',
    "bar = Progress(); bar.add_task(name)",
    "self.progress.add_task(name)",
    't = Tree("x"); t.add(name)',
    "branch.add(name)",
]
BAD["table_title"] += [
    "table.add_column(esc(name))",
    'table.add_column("A", footer=esc(name))',
    "table.add_column(header=esc(name))",
    "Table(esc(name))",
]
BAD["nested"] += ["console.print(esc(lines_markup))"]
BAD["markup_false"] += ["console.print(lines_markup, markup=False)"]



def _check_source(tmp_path, source):
    path = tmp_path / "sample.py"
    path.write_text(source)
    return check(path)


def test_clean_source_passes(tmp_path):
    assert _check_source(tmp_path, GOOD) == []


def test_an_aliased_rich_print_is_a_sink(tmp_path):
    problems = _check_source(tmp_path, "from rich import print as rprint\ndef f(name):\n    rprint(f'{name}')\n")
    assert len(problems) == 1 and "[unescaped] name" in problems[0], problems


@pytest.mark.parametrize("source", [
    "from rich.prompt import Confirm as C\ndef f(name):\n    C.ask(name)\n",
    "from .shared import console as out\ndef f(name):\n    out.print(name)\n",
    "def f(name, node: Tree):\n    node.add(name)\n",
    "def f(name, p: 'rich.progress.Progress'):\n    p.add_task(name)\n",
])
def test_an_aliased_or_annotated_sink_is_a_sink(tmp_path, source):
    problems = _check_source(tmp_path, source)
    assert len(problems) == 1 and "[unescaped] name" in problems[0], problems


def test_removing_a_real_escape_is_caught(tmp_path):
    """The guard reads the real code's shapes, not only these samples."""
    real = (SRC / "commands" / "shared.py").read_text()
    escaped = "{esc(result['name'])}"
    assert escaped in real
    problems = _check_source(tmp_path, real.replace(escaped, "{result['name']}", 1))
    assert len(problems) == 1 and "[unescaped] result['name']" in problems[0], problems


def test_a_bad_return_from_a_markup_function_fails(tmp_path):
    problems = _check_source(tmp_path, "def x_markup(name):\n    return f'[b]{name}[/b]'\n")
    assert len(problems) == 1 and "[unescaped] name" in problems[0]


@pytest.mark.parametrize("rule, line", [(rule, line) for rule, lines in BAD.items() for line in lines])
def test_each_rule_flags_its_bad_line(tmp_path, rule, line):
    problems = _check_source(tmp_path, f"def f(name, line, kind, e, table, names, pair):\n    lines_markup = []\n    {line}\n")
    assert len(problems) == 1 and f"[{rule}]" in problems[0], problems
