"""The team-wide comment feed shows only its own team's comments (CHT-1991).

With no project_id, the feed's SQL team pin (`p.team_id = ?` in
IssueService.list_team_comments) is all that keeps another team's
comments out. A caller in both teams passes every access check for
either, so only that clause separates the two feeds.
"""
from app.enums import TeamRole
from app.oxyde_models.issue import OxydeIssue, OxydeIssueComment
from app.oxyde_models.project import OxydeProject
from app.oxyde_models.team import OxydeTeam, OxydeTeamMember


async def _comment_in(project, author_id, text):
    issue = await OxydeIssue.objects.create(
        project_id=project.id, identifier=f"{project.key}-1", number=1, title=text, creator_id=author_id,
    )
    await OxydeIssueComment.objects.create(issue_id=issue.id, author_id=author_id, content=text)
    return issue


async def test_team_feed_holds_only_its_own_teams_comments(client, auth_headers, test_user, test_team, test_project):
    other = await OxydeTeam.objects.create(name="Second", key="SEC")
    await OxydeTeamMember.objects.create(team_id=other.id, user_id=test_user.id, role=TeamRole.OWNER)
    other_project = await OxydeProject.objects.create(team_id=other.id, name="Second project", key="SEP")

    mine = await _comment_in(test_project, test_user.id, "first team")
    theirs = await _comment_in(other_project, test_user.id, "second team")

    for team, expected in ((test_team, mine), (other, theirs)):
        response = await client.get(f"/api/issues/comments?team_id={team.id}", headers=auth_headers)
        assert response.status_code == 200, response.text
        rows = response.json()
        assert [row["issue_id"] for row in rows] == [expected.id], rows
        assert [row["content"] for row in rows] == [expected.title]
