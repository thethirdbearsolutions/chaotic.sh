"""Each team-wide feed shows only its own team's rows (CHT-1991).

Without a project_id, the comment and activity feeds keep another team's
rows out only through their services' raw-SQL team pins:
IssueService.list_team_comments and list_team_activities (`p.team_id =
?`) and their DocumentService counterparts (`d.team_id = ?`). The caller
here owns both teams, so it passes every access check for either, and
only those clauses separate the feeds. Rows are created through the ORM,
so the projects' issue counters stay at zero; that is fine here, but an
API-created issue in these projects would collide on its identifier.
"""
import pytest

from app.enums import ActivityType, DocumentActivityType, TeamRole
from app.oxyde_models.document import OxydeDocument, OxydeDocumentActivity, OxydeDocumentComment
from app.oxyde_models.issue import OxydeIssue, OxydeIssueActivity, OxydeIssueComment
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.team import OxydeTeam, OxydeTeamMember


async def _rows_in(team, project, author_id):
    """One issue comment, one document comment, one issue activity and
    one document activity in ``project``; their ids by feed."""
    issue = await OxydeIssue.objects.create(
        project_id=project.id, identifier=f"{project.key}-1", number=1, title="issue", creator_id=author_id,
    )
    document = await OxydeDocument.objects.create(
        team_id=team.id, project_id=project.id, author_id=author_id, title="document",
    )
    issue_comment = await OxydeIssueComment.objects.create(issue_id=issue.id, author_id=author_id, content="c")
    doc_comment = await OxydeDocumentComment.objects.create(document_id=document.id, author_id=author_id, content="c")
    issue_activity = await OxydeIssueActivity.objects.create(
        issue_id=issue.id, user_id=author_id, activity_type=ActivityType.CREATED,
    )
    doc_activity = await OxydeDocumentActivity.objects.create(
        document_id=document.id, team_id=team.id, user_id=author_id, activity_type=DocumentActivityType.CREATED,
    )
    return {
        "comments": {issue_comment.id, doc_comment.id},
        "activities": {issue_activity.id, doc_activity.id},
    }


@pytest.fixture
async def two_teams(db, test_user, test_team, test_project):
    other = await OxydeTeam.objects.create(name="Second", key="SEC")
    await OxydeTeamMember.objects.create(team_id=other.id, user_id=test_user.id, role=TeamRole.OWNER)
    other_project = await OxydeProject.objects.create(team_id=other.id, name="Second project", key="SEP")
    return [
        (test_team, test_project, await _rows_in(test_team, test_project, test_user.id)),
        (other, other_project, await _rows_in(other, other_project, test_user.id)),
    ]


@pytest.mark.parametrize("feed", ["comments", "activities"])
async def test_team_feed_holds_only_its_own_teams_rows(client, auth_headers, two_teams, feed):
    for team, _, expected in two_teams:
        response = await client.get(f"/api/issues/{feed}?team_id={team.id}", headers=auth_headers)
        assert response.status_code == 200, response.text
        assert {row["id"] for row in response.json()} == expected[feed]


@pytest.mark.parametrize("feed", ["comments", "activities"])
async def test_project_feed_holds_only_that_projects_rows(client, auth_headers, two_teams, feed):
    for team, project, expected in two_teams:
        response = await client.get(
            f"/api/issues/{feed}?team_id={team.id}&project_id={project.id}", headers=auth_headers,
        )
        assert response.status_code == 200, response.text
        assert {row["id"] for row in response.json()} == expected[feed]
