"""A deleted author's work survives and reads as "Deleted user"; an agent
that authored anything cannot be deleted (CHT-1427)."""
import pytest

from app.oxyde_models.document import OxydeDocument, OxydeDocumentActivity, OxydeDocumentComment
from app.oxyde_models.issue import OxydeIssue, OxydeIssueActivity, OxydeIssueComment
from app.oxyde_models.team import OxydeTeamMember
from app.oxyde_models.user import OxydeUser
from app.enums import ActivityType, DocumentActivityType, TeamRole
from app.schemas.agent import AgentCreate
from app.schemas.authorship import DELETED_USER_NAME
from app.services.agent_service import AgentHasAuthoredContentError, AgentService


async def _author_everything(project, team, author_id):
    issue = await OxydeIssue.objects.create(
        project_id=project.id, identifier=f"{project.key}-77", number=77, title="kept", creator_id=author_id,
    )
    comment = await OxydeIssueComment.objects.create(issue_id=issue.id, author_id=author_id, content="kept")
    await OxydeIssueActivity.objects.create(
        issue_id=issue.id, user_id=author_id, activity_type=ActivityType.CREATED,
    )
    document = await OxydeDocument.objects.create(team_id=team.id, author_id=author_id, title="kept")
    doc_comment = await OxydeDocumentComment.objects.create(
        document_id=document.id, author_id=author_id, content="kept",
    )
    await OxydeDocumentActivity.objects.create(
        document_id=document.id, team_id=team.id, user_id=author_id, activity_type=DocumentActivityType.CREATED,
    )
    return issue, comment, document, doc_comment


@pytest.mark.asyncio
async def test_deleting_an_author_keeps_their_work_and_names_them_deleted(
    client, auth_headers, test_team, test_project, db,
):
    """The FK path, with foreign keys ON as in production: the user row
    goes, every row it authored stays, and every response that names an
    author says "Deleted user" with a null id."""
    gone = await OxydeUser.objects.create(email="gone@example.com", hashed_password="x", name="Gone")
    await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=gone.id, role=TeamRole.MEMBER)
    issue, comment, document, doc_comment = await _author_everything(test_project, test_team, gone.id)

    from oxyde import execute_raw

    assert (await execute_raw("PRAGMA foreign_keys"))[0]["foreign_keys"] == 1, "this test needs FK actions to fire"
    await OxydeTeamMember.objects.filter(user_id=gone.id).delete()
    await OxydeUser.objects.filter(id=gone.id).delete()

    assert await OxydeIssue.objects.filter(id=issue.id).count() == 1
    assert await OxydeIssueComment.objects.filter(id=comment.id).count() == 1
    assert await OxydeIssueActivity.objects.filter(issue_id=issue.id).count() == 1
    assert await OxydeDocument.objects.filter(id=document.id).count() == 1
    assert await OxydeDocumentComment.objects.filter(id=doc_comment.id).count() == 1
    assert await OxydeDocumentActivity.objects.filter(document_id=document.id).count() == 1

    def ok(response):
        assert response.status_code == 200, response.text
        return response.json()

    body = ok(await client.get(f"/api/issues/{issue.id}", headers=auth_headers))
    assert (body["creator_id"], body["creator_name"]) == (None, DELETED_USER_NAME)

    [c] = ok(await client.get(f"/api/issues/{issue.id}/comments", headers=auth_headers))
    assert (c["author_id"], c["author_name"]) == (None, DELETED_USER_NAME)

    [a] = ok(await client.get(f"/api/issues/{issue.id}/activities", headers=auth_headers))
    assert (a["user_id"], a["user_name"]) == (None, DELETED_USER_NAME)

    feed = ok(await client.get(f"/api/issues/activities?team_id={test_team.id}", headers=auth_headers))
    assert {(row["user_id"], row["user_name"]) for row in feed} == {(None, DELETED_USER_NAME)}
    assert len(feed) == 2  # the issue's and the document's

    team_comments = ok(await client.get(f"/api/issues/comments?team_id={test_team.id}", headers=auth_headers))
    assert {(row["author_id"], row["author_name"]) for row in team_comments} == {(None, DELETED_USER_NAME)}
    assert len(team_comments) == 2

    doc = ok(await client.get(f"/api/documents/{document.id}", headers=auth_headers))
    assert (doc["author_id"], doc["author_name"]) == (None, DELETED_USER_NAME)

    [dc] = ok(await client.get(f"/api/documents/{document.id}/comments", headers=auth_headers))
    assert (dc["author_id"], dc["author_name"]) == (None, DELETED_USER_NAME)

    listed = ok(await client.get(f"/api/issues?project_id={test_project.id}", headers=auth_headers))
    assert [(row["creator_id"], row["creator_name"]) for row in listed] == [(None, DELETED_USER_NAME)]

    found = ok(await client.get(f"/api/issues/search?team_id={test_team.id}&q=kept", headers=auth_headers))
    assert [(row["creator_id"], row["creator_name"]) for row in found] == [(None, DELETED_USER_NAME)]

    docs = ok(await client.get(f"/api/teams/{test_team.id}/documents", headers=auth_headers))
    assert [(row["author_id"], row["author_name"]) for row in docs] == [(None, DELETED_USER_NAME)]


@pytest.mark.asyncio
async def test_an_agent_that_authored_anything_is_not_deleted(client, auth_headers, test_user, test_team, test_project):
    service = AgentService()
    agent, _, _ = await service.create(AgentCreate(name="Worker"), test_user, test_team.id)
    issue, *_ = await _author_everything(test_project, test_team, agent.id)

    response = await client.delete(f"/api/agents/{agent.id}", headers=auth_headers)

    assert response.status_code == 409, response.text
    detail = response.json()["detail"]
    assert "Worker" in detail and "1 issues" in detail and "1 issue comments" in detail
    assert await service.get_by_id(agent.id) is not None
    assert (await OxydeIssue.objects.get(id=issue.id)).creator_id == agent.id


@pytest.mark.asyncio
async def test_refusal_reports_counts_and_keeps_keys(test_user, test_team, test_project):
    from app.oxyde_models.api_key import OxydeAPIKey

    service = AgentService()
    agent, _, _ = await service.create(AgentCreate(name="Commenter"), test_user, test_team.id)
    issue = await OxydeIssue.objects.create(
        project_id=test_project.id, identifier="PROJ-90", number=90, title="t", creator_id=test_user.id,
    )
    for _ in range(2):
        await OxydeIssueComment.objects.create(issue_id=issue.id, author_id=agent.id, content="c")

    with pytest.raises(AgentHasAuthoredContentError) as refused:
        await service.delete(agent)

    assert refused.value.counts["issue comments"] == 2
    assert refused.value.counts["issues"] == 0
    assert await OxydeAPIKey.objects.filter(agent_user_id=agent.id).count() == 1


@pytest.mark.asyncio
async def test_an_agent_that_authored_nothing_is_deleted(client, auth_headers, test_user, test_team):
    service = AgentService()
    agent, _, _ = await service.create(AgentCreate(name="Idle"), test_user, test_team.id)

    response = await client.delete(f"/api/agents/{agent.id}", headers=auth_headers)

    assert response.status_code == 204
    assert await service.get_by_id(agent.id) is None
