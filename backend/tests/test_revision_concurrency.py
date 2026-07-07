"""Concurrency tests for revision snapshot writes (CHT-1243, PR #216 review).

Two shapes:

* Forced-retry: deterministically exercise the IntegrityError retry
  branch in `_snapshot_revision` / `_snapshot_description_revision` by
  simulating a racing writer that lands the exact version slot the
  snapshot just computed. The retry must re-read MAX(version), take the
  next slot, and the save must succeed — no gaps, no dupes, side
  effects exactly once.

* Gather race (test_ritual_concurrency.py's shape): concurrent saves to
  the same entity must serialize into distinct consecutive versions,
  and per-save side effects (activity rows) must fire exactly once per
  successful save.
"""
import asyncio
import pytest

from app.enums import ActivityType, DocumentActivityType
from app.oxyde_models.document import OxydeDocumentActivity, OxydeDocumentRevision
from app.oxyde_models.issue import OxydeIssueActivity, OxydeIssueDescriptionRevision
from app.schemas.document import DocumentCreate, DocumentUpdate
from app.schemas.issue import IssueCreate, IssueUpdate
from app.services.document_service import DocumentService
from app.services.issue_service import IssueService


def _assert_dense_versions(rows, expected_count):
    """Versions must be exactly 1..expected_count — no gaps, no dupes."""
    versions = sorted(r.version for r in rows)
    assert versions == list(range(1, expected_count + 1)), (
        f"Expected dense versions 1..{expected_count}, got {versions}"
    )


class TestForcedVersionRaceRetry:
    """Deterministically drive the retry branch: a 'racing writer' steals
    the computed version slot before the snapshot INSERT, forcing the
    UNIQUE-constraint IntegrityError the retry loop exists for."""

    @pytest.mark.asyncio
    async def test_issue_snapshot_retries_when_version_slot_stolen(
        self, db, test_project, test_user, monkeypatch,
    ):
        service = IssueService()
        issue = await service.create(
            IssueCreate(title="Raced", description="v1"), test_project, test_user.id,
        )

        real = IssueService._next_description_revision_version
        stolen = {"done": False}

        async def racy(self, issue_id):
            version = await real(self, issue_id)
            if not stolen["done"]:
                stolen["done"] = True
                # Racing writer lands the slot we just computed; our
                # INSERT must hit the UNIQUE index and retry.
                await OxydeIssueDescriptionRevision.objects.create(
                    issue_id=issue_id, version=version,
                    description="raced in", author_id=None,
                )
            return version

        monkeypatch.setattr(IssueService, "_next_description_revision_version", racy)

        updated = await service.update(
            issue, IssueUpdate(description="v2 mine"), user_id=test_user.id,
        )
        assert updated.description == "v2 mine"
        assert stolen["done"], "The forced race never fired — test is vacuous"

        rows = await OxydeIssueDescriptionRevision.objects.filter(
            issue_id=issue.id
        ).all()
        # v1 (create) + v2 (racing writer) + v3 (our retried snapshot)
        _assert_dense_versions(rows, 3)
        by_version = {r.version: r for r in rows}
        assert by_version[2].description == "raced in"
        assert by_version[3].description == "v2 mine"

        # Side effects exactly once: one UPDATED activity for the save.
        activities = await OxydeIssueActivity.objects.filter(
            issue_id=issue.id, activity_type=ActivityType.UPDATED.name,
        ).all()
        assert len(activities) == 1

    @pytest.mark.asyncio
    async def test_document_snapshot_retries_when_version_slot_stolen(
        self, db, test_team, test_user, monkeypatch,
    ):
        service = DocumentService()
        document = await service.create(
            DocumentCreate(title="Raced Doc", content="v1"), test_team.id, test_user.id,
        )

        real = DocumentService._next_revision_version
        stolen = {"done": False}

        async def racy(self, document_id):
            version = await real(self, document_id)
            if not stolen["done"]:
                stolen["done"] = True
                await OxydeDocumentRevision.objects.create(
                    document_id=document_id, version=version,
                    title="raced title", content="raced in", author_id=None,
                )
            return version

        monkeypatch.setattr(DocumentService, "_next_revision_version", racy)

        updated = await service.update(
            document, DocumentUpdate(content="v2 mine"), test_user.id,
        )
        assert updated.content == "v2 mine"
        assert stolen["done"], "The forced race never fired — test is vacuous"

        rows = await OxydeDocumentRevision.objects.filter(
            document_id=document.id
        ).all()
        _assert_dense_versions(rows, 3)
        by_version = {r.version: r for r in rows}
        assert by_version[2].content == "raced in"
        assert by_version[3].content == "v2 mine"

        activities = await OxydeDocumentActivity.objects.filter(
            document_id=document.id,
            activity_type=DocumentActivityType.UPDATED.name,
        ).all()
        assert len(activities) == 1


class TestConcurrentSavesSerialize:
    """Concurrent saves to the same entity (asyncio.gather shape from
    test_ritual_concurrency.py) must serialize into distinct
    consecutive versions with exactly one activity row per successful
    save."""

    @pytest.mark.asyncio
    async def test_concurrent_issue_description_saves(
        self, db, test_project, test_user,
    ):
        service = IssueService()
        issue = await service.create(
            IssueCreate(title="Contended", description="v1"), test_project, test_user.id,
        )

        async def _save(n):
            # Fresh instance per writer, like separate requests would load.
            mine = await IssueService().get_by_id(issue.id)
            return await IssueService().update(
                mine, IssueUpdate(description=f"edit {n}"), user_id=test_user.id,
            )

        outcomes = await asyncio.gather(
            _save(1), _save(2), _save(3), return_exceptions=True,
        )
        successes = [o for o in outcomes if not isinstance(o, Exception)]
        assert len(successes) == 3, f"Concurrent saves failed: {outcomes}"

        rows = await OxydeIssueDescriptionRevision.objects.filter(
            issue_id=issue.id
        ).all()
        # v1 from create + one per successful save; dense, no dupes.
        _assert_dense_versions(rows, 1 + len(successes))
        snapshots = {r.description for r in rows}
        assert snapshots == {"v1", "edit 1", "edit 2", "edit 3"}

        activities = await OxydeIssueActivity.objects.filter(
            issue_id=issue.id, activity_type=ActivityType.UPDATED.name,
        ).all()
        assert len(activities) == len(successes)

    @pytest.mark.asyncio
    async def test_concurrent_document_saves(self, db, test_team, test_user):
        service = DocumentService()
        document = await service.create(
            DocumentCreate(title="Contended Doc", content="v1"), test_team.id, test_user.id,
        )

        async def _save(n):
            mine = await DocumentService().get_by_id(document.id)
            return await DocumentService().update(
                mine, DocumentUpdate(content=f"edit {n}"), test_user.id,
            )

        outcomes = await asyncio.gather(
            _save(1), _save(2), _save(3), return_exceptions=True,
        )
        successes = [o for o in outcomes if not isinstance(o, Exception)]
        assert len(successes) == 3, f"Concurrent saves failed: {outcomes}"

        rows = await OxydeDocumentRevision.objects.filter(
            document_id=document.id
        ).all()
        _assert_dense_versions(rows, 1 + len(successes))
        snapshots = {r.content for r in rows}
        assert snapshots == {"v1", "edit 1", "edit 2", "edit 3"}

        activities = await OxydeDocumentActivity.objects.filter(
            document_id=document.id,
            activity_type=DocumentActivityType.UPDATED.name,
        ).all()
        assert len(activities) == len(successes)
