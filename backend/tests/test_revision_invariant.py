"""Revision snapshot-on-edit is an invariant (CHT-1340).

``IssueService`` appends an ``issue_description_revisions`` row whenever
an update changes ``description``, and ``DocumentService`` a
``document_revisions`` row whenever an update changes ``title`` or
``content``. Until CHT-1340 that was a convention inside those two
methods: a new write path (a bulk ``QuerySet.update``, a raw ``UPDATE``,
a second service method) that changed the body without snapshotting
would have left history silently behind, and no test would have said so.

Two guards now hold it:

* **Runtime**, in every test: the ``db`` fixture's teardown
  (``conftest._assert_revision_history_current``) asserts that each
  issue and document with revision history matches its newest revision.
  Any test that exercises a body write which skips the snapshot fails.
  The tests here prove that check fires and that the service paths
  satisfy it, including the paths that rewrite the body without an
  explicit update (issue creation, template application).
* **Static**, below: the only writes of the body columns in ``app/``
  are the service methods that snapshot. A ``QuerySet.update(...)`` or
  raw ``UPDATE`` naming ``description`` on issues, or ``title``/
  ``content`` on documents, is refused unless listed here with a reason.
"""
import ast
import pathlib
import re

import pytest

APP = pathlib.Path(__file__).resolve().parents[1] / "app"

# Places allowed to write a body column without going through the
# snapshotting service methods, as "path::qualname" -> reason. Empty on
# purpose: add an entry only with the revision written alongside.
ALLOWED_BODY_WRITES: dict[str, str] = {}

BODY_COLUMNS = {
    "OxydeIssue": {"description"},
    "OxydeDocument": {"title", "content"},
}
RAW_BODY_UPDATES = (
    re.compile(r"UPDATE\s+issues\b[^;]*\bdescription\b", re.IGNORECASE | re.DOTALL),
    re.compile(r"UPDATE\s+documents\b[^;]*\b(title|content)\b", re.IGNORECASE | re.DOTALL),
)


def _qualname(stack: list[ast.AST]) -> str:
    return ".".join(n.name for n in stack if isinstance(n, (ast.ClassDef, ast.FunctionDef, ast.AsyncFunctionDef)))


def _queryset_update_writes(tree: ast.AST) -> list[tuple[str, str, str]]:
    """(qualname, model, column) for each `<Model>.objects...update(<column>=...)`."""
    found = []
    stack: list[ast.AST] = []

    def root_model(node: ast.AST) -> str | None:
        # Walk `X.objects.filter(...).update` back to `X`.
        while isinstance(node, (ast.Call, ast.Attribute)):
            node = node.func if isinstance(node, ast.Call) else node.value
        return node.id if isinstance(node, ast.Name) else None

    def visit(node: ast.AST) -> None:
        if isinstance(node, (ast.ClassDef, ast.FunctionDef, ast.AsyncFunctionDef)):
            stack.append(node)
        if isinstance(node, ast.Call) and isinstance(node.func, ast.Attribute) and node.func.attr == "update":
            model = root_model(node.func.value)
            columns = BODY_COLUMNS.get(model or "", set())
            for kw in node.keywords:
                if kw.arg in columns:
                    found.append((_qualname(stack), model, kw.arg))
        for child in ast.iter_child_nodes(node):
            visit(child)
        if isinstance(node, (ast.ClassDef, ast.FunctionDef, ast.AsyncFunctionDef)):
            stack.pop()

    visit(tree)
    return found


def _raw_body_updates(tree: ast.AST) -> list[tuple[str, str]]:
    """(qualname, sql) for each string constant that is a raw UPDATE of a body column."""
    found = []
    stack: list[ast.AST] = []

    def visit(node: ast.AST) -> None:
        if isinstance(node, (ast.ClassDef, ast.FunctionDef, ast.AsyncFunctionDef)):
            stack.append(node)
        if isinstance(node, ast.Constant) and isinstance(node.value, str):
            if any(p.search(node.value) for p in RAW_BODY_UPDATES):
                found.append((_qualname(stack), node.value.strip()))
        for child in ast.iter_child_nodes(node):
            visit(child)
        if isinstance(node, (ast.ClassDef, ast.FunctionDef, ast.AsyncFunctionDef)):
            stack.pop()

    visit(tree)
    return found


def _app_sources():
    return sorted(p for p in APP.rglob("*.py") if "__pycache__" not in p.parts)


class TestNoBodyWritesBypassTheSnapshot:
    def test_no_queryset_update_of_a_body_column(self):
        offenders = []
        for path in _app_sources():
            tree = ast.parse(path.read_text(), filename=str(path))
            for qualname, model, column in _queryset_update_writes(tree):
                key = f"{path.relative_to(APP.parent)}::{qualname}"
                if key not in ALLOWED_BODY_WRITES:
                    offenders.append(f"{key} updates {model}.{column} without a revision")
        assert not offenders, "\n".join(offenders)

    def test_no_raw_update_of_a_body_column(self):
        offenders = []
        for path in _app_sources():
            tree = ast.parse(path.read_text(), filename=str(path))
            for qualname, sql in _raw_body_updates(tree):
                key = f"{path.relative_to(APP.parent)}::{qualname}"
                if key not in ALLOWED_BODY_WRITES:
                    offenders.append(f"{key}: {sql[:80]!r}")
        assert not offenders, "\n".join(offenders)

    def test_the_sweep_sees_a_bypass(self, tmp_path):
        """The static guard is only worth having if it fires."""
        src = (
            "async def f():\n"
            "    await OxydeIssue.objects.filter(id=x).update(description='y')\n"
            "    await execute_raw('UPDATE documents SET content = ? WHERE id = ?', [a, b])\n"
        )
        tree = ast.parse(src)
        assert _queryset_update_writes(tree) == [("f", "OxydeIssue", "description")]
        assert [q for q, _ in _raw_body_updates(tree)] == ["f"]


@pytest.mark.asyncio
class TestRuntimeInvariant:
    async def _issue(self, project, user, **fields):
        from app.schemas.issue import IssueCreate
        from app.services.issue_service import IssueService
        return await IssueService().create(
            IssueCreate(title="t", project_id=project.id, **fields), project, user.id,
        )

    async def test_the_teardown_check_fires_on_a_bypassing_write(self, db, test_project, test_user):
        """A body write that skips the snapshot is what the check exists
        for. Performed here and then undone, so the fixture teardown that
        follows sees consistent history; the assertion in between is the
        check itself."""
        from oxyde import execute_raw
        from tests.conftest import _assert_revision_history_current

        issue = await self._issue(test_project, test_user, description="v1")
        await execute_raw("UPDATE issues SET description = ? WHERE id = ?", ["bypassed", issue.id])
        with pytest.raises(AssertionError, match=f"issue description of {issue.identifier} is ahead of revision v1"):
            await _assert_revision_history_current()
        await execute_raw("UPDATE issues SET description = ? WHERE id = ?", ["v1", issue.id])
        await _assert_revision_history_current()

    async def test_the_teardown_check_fires_on_a_bypassing_document_write(self, db, test_team, test_user):
        from oxyde import execute_raw
        from app.schemas.document import DocumentCreate
        from app.services.document_service import DocumentService
        from tests.conftest import _assert_revision_history_current

        doc = await DocumentService().create(
            DocumentCreate(title="t", content="one"), test_team.id, test_user.id,
        )
        await execute_raw("UPDATE documents SET content = ? WHERE id = ?", ["bypassed", doc.id])
        with pytest.raises(AssertionError, match=f"document title/content of {doc.id} is ahead of revision v1"):
            await _assert_revision_history_current()
        await execute_raw("UPDATE documents SET content = ? WHERE id = ?", ["one", doc.id])
        await _assert_revision_history_current()

    async def test_service_writes_keep_history_current(self, db, test_project, test_user):
        """Create, edit, edit back, and a no-op edit: history matches the
        row after each (the teardown check runs again at the end)."""
        from app.schemas.issue import IssueUpdate
        from app.services.issue_service import IssueService
        from tests.conftest import _assert_revision_history_current

        issues = IssueService()
        issue = await self._issue(test_project, test_user, description="v1")
        await _assert_revision_history_current()
        for description in ("v2", None, "v2", "v2"):
            issue = await issues.update(issue, IssueUpdate(description=description), user_id=test_user.id)
            await _assert_revision_history_current()
        assert [r.version for r in await issues.list_description_revisions(issue.id)] == [4, 3, 2, 1]

    async def test_records_without_history_are_not_checked(self, db, test_project, test_user):
        """A bare `objects.create` (fixtures do this) has no v1 and is
        outside the invariant; it is not mistaken for skipped history."""
        from app.oxyde_models.issue import OxydeIssue
        from tests.conftest import _assert_revision_history_current

        await OxydeIssue.objects.create(
            project_id=test_project.id, creator_id=test_user.id, identifier="PROJ-999", number=999,
            title="bare", description="never snapshotted",
        )
        await _assert_revision_history_current()
