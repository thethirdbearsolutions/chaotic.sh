"""The client reaches every API route and passes pagination through
(CHT-1383). The route-by-route coverage guard is e2e's
test_client_route_coverage.py, which records what every client method
sends and matches it against the live OpenAPI document; these pin the
exact request each new or widened method sends."""
from unittest.mock import patch

import pytest

from cli.client import Client


@pytest.fixture
def sent():
    with patch.object(Client, "_request", return_value=None) as request:
        yield request


def _call(sent):
    (method, path), kwargs = sent.call_args.args[:2], sent.call_args.kwargs
    body = sent.call_args.args[2] if len(sent.call_args.args) > 2 else kwargs.get("data")
    return method, path, body


class TestWithQuery:
    def test_omits_unset_params_and_keeps_the_bare_path(self):
        assert Client._with_query("/x", skip=None, limit=None) == "/x"
        assert Client._with_query("/x", skip=0, limit=None) == "/x?skip=0"
        assert Client._with_query("/x", project_id="p 1", skip=10, limit=5) == "/x?project_id=p+1&skip=10&limit=5"
        assert Client._with_query("/x", include_inactive=True, mine=False) == "/x?include_inactive=true&mine=false"


class TestPaginationIsSent:
    @pytest.mark.parametrize("method, args, path", [
        ("list_api_keys", (), "/api-keys"),
        ("get_team_members", ("t1",), "/teams/t1/members"),
        ("get_invitations", ("t1",), "/teams/t1/invitations"),
        ("get_projects", ("t1",), "/teams/t1/projects"),
        ("get_issue_description_revisions", ("i1",), "/issues/i1/description-revisions"),
        ("get_sub_issues", ("i1",), "/issues/i1/sub-issues"),
        ("get_relations", ("i1",), "/issues/i1/relations"),
        ("get_comments", ("i1",), "/issues/i1/comments"),
        ("get_issue_activities", ("i1",), "/issues/i1/activities"),
        ("get_sprints", ("p1",), "/projects/p1/sprints"),
        ("get_sprint_transactions", ("s1",), "/sprints/s1/transactions"),
        ("get_documents", ("t1",), "/teams/t1/documents"),
        ("get_document_revisions", ("d1",), "/documents/d1/revisions"),
        ("get_document_comments", ("d1",), "/documents/d1/comments"),
        ("get_labels", ("t1",), "/teams/t1/labels"),
        ("get_rituals", ("p1",), "/projects/p1/rituals"),
    ])
    def test_skip_and_limit_are_query_params_only_when_given(self, sent, method, args, path):
        getattr(Client(), method)(*args)
        assert _call(sent)[:2] == ("GET", path)
        getattr(Client(), method)(*args, skip=20, limit=10)
        assert _call(sent)[:2] == ("GET", f"{path}?skip=20&limit=10")

    def test_ritual_groups_keep_project_id_with_pagination(self, sent):
        Client().get_ritual_groups("p1", skip=5, limit=2)
        assert _call(sent)[:2] == ("GET", "/rituals/groups?project_id=p1&skip=5&limit=2")

    def test_search_issues_sends_skip_after_the_filters(self, sent):
        Client().search_issues("t1", "a b", project_id="p1", limit=3, status="todo", skip=6)
        assert _call(sent)[:2] == ("GET", "/issues/search?team_id=t1&q=a%20b&project_id=p1&limit=3&issue_status=todo&skip=6")

    def test_existing_filters_survive_the_rewrite(self, sent):
        Client().get_sprints("p1", status="active")
        assert _call(sent)[:2] == ("GET", "/projects/p1/sprints?sprint_status=active")
        Client().get_rituals("p1", include_inactive=True)
        assert _call(sent)[:2] == ("GET", "/projects/p1/rituals?include_inactive=true")
        Client().get_documents("t1", project_id="p1", search="x y", limit=4)
        assert _call(sent)[:2] == ("GET", "/teams/t1/documents?project_id=p1&search=x+y&limit=4")


class TestNewRoutes:
    def test_each_new_method_sends_the_route(self, sent):
        c = Client()
        c.get_document_labels("d1")
        assert _call(sent)[:2] == ("GET", "/documents/d1/labels")
        c.add_label_to_document("d1", "l1")
        assert _call(sent)[:2] == ("POST", "/documents/d1/labels/l1")
        c.remove_label_from_document("d1", "l1")
        assert _call(sent)[:2] == ("DELETE", "/documents/d1/labels/l1")
        c.archive_inbox_entry("e1")
        assert _call(sent)[:2] == ("POST", "/inbox/e1/archive")
        c.get_label("l1")
        assert _call(sent)[:2] == ("GET", "/labels/l1")
        c.get_pending_gates("p1")
        assert _call(sent)[:2] == ("GET", "/rituals/pending-gates?project_id=p1")
        c.get_user("u1")
        assert _call(sent)[:2] == ("GET", "/users/u1")
        c.update_me(name="N")
        assert _call(sent) == ("PATCH", "/users/me", {"name": "N"})
        c.delete_me()
        assert _call(sent)[:2] == ("DELETE", "/users/me")

    def test_batch_update_sends_ids_and_the_safe_fields(self, sent):
        Client().batch_update_issues(["a", "b"], priority="high", add_label_ids=["l1"])
        assert _call(sent) == (
            "POST", "/issues/batch-update", {"issue_ids": ["a", "b"], "priority": "high", "add_label_ids": ["l1"]},
        )
