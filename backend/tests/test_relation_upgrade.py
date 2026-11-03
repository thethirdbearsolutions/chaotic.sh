"""Relating a pair that already has a relation (CHT-2013).

Naming another issue in a description auto-creates a ``relates_to``
link (CHT-133). The (issue, related_issue) pair is UNIQUE, and
create_relation used to answer any existing pair with the unchanged
row, so a later "A blocks B" on that pair reported success and set
nothing. Now a plain ``relates_to`` is upgraded in place, and a
conflicting specific relation is refused with a 409.
"""
import pytest

from app.enums import IssueRelationType
from app.oxyde_models.issue import OxydeIssueRelation

pytestmark = pytest.mark.asyncio


async def _mk(client, headers, project, title, description=None):
    body = {"title": title}
    if description is not None:
        body["description"] = description
    r = await client.post(f"/api/projects/{project.id}/issues", headers=headers, json=body)
    assert r.status_code in (200, 201), r.text
    return r.json()


async def _relate(client, headers, src, dst, rtype):
    return await client.post(
        f"/api/issues/{src}/relations", headers=headers,
        json={"related_issue_id": dst, "relation_type": rtype},
    )


async def _rows(src, dst):
    return await OxydeIssueRelation.objects.filter(issue_id=src, related_issue_id=dst).all()


async def _auto_linked_pair(client, headers, project):
    """A names B in its description, so A -> B relates_to exists."""
    b = await _mk(client, headers, project, "B")
    a = await _mk(client, headers, project, "A", f"Needs {b['identifier']} first")
    rows = await _rows(a["id"], b["id"])
    assert [IssueRelationType(r.relation_type) for r in rows] == [IssueRelationType.RELATES_TO]
    return a, b, rows[0]


@pytest.mark.parametrize("rtype", ["blocks", "duplicates"])
async def test_auto_relates_to_is_upgraded(client, auth_headers, test_project, db, rtype):
    a, b, auto = await _auto_linked_pair(client, auth_headers, test_project)

    r = await _relate(client, auth_headers, a["id"], b["id"], rtype)

    assert r.status_code == 201, r.text
    assert r.json()["relation_type"] == rtype
    assert r.json()["id"] == auto.id
    rows = await _rows(a["id"], b["id"])
    assert [(row.id, IssueRelationType(row.relation_type)) for row in rows] == [
        (auto.id, IssueRelationType(rtype)),
    ]
    listed = await client.get(f"/api/issues/{a['id']}/relations", headers=auth_headers)
    assert [x["relation_type"] for x in listed.json() if x["related_issue_id"] == b["id"]] == [rtype]


async def test_upgraded_block_takes_effect_in_ready(client, auth_headers, test_project, db):
    """The point of the block: B stops being ready while A is open."""
    a, b, _ = await _auto_linked_pair(client, auth_headers, test_project)
    assert (await _relate(client, auth_headers, a["id"], b["id"], "blocks")).status_code == 201

    r = await client.get(
        f"/api/projects/{test_project.id}/issues/ready", headers=auth_headers,
        params={"include_assigned": True},
    )
    assert r.status_code == 200, r.text
    ready = {i["id"] for i in r.json()}
    assert a["id"] in ready
    assert b["id"] not in ready


async def test_relates_to_on_a_specific_pair_is_a_no_op(client, auth_headers, test_project, db):
    a = await _mk(client, auth_headers, test_project, "A")
    b = await _mk(client, auth_headers, test_project, "B")
    first = await _relate(client, auth_headers, a["id"], b["id"], "blocks")
    assert first.status_code == 201

    r = await _relate(client, auth_headers, a["id"], b["id"], "relates_to")

    assert r.status_code == 201, r.text
    assert r.json()["relation_type"] == "blocks"
    assert r.json()["id"] == first.json()["id"]


async def test_conflicting_specific_relation_is_refused(client, auth_headers, test_project, db):
    a = await _mk(client, auth_headers, test_project, "A")
    b = await _mk(client, auth_headers, test_project, "B")
    first = await _relate(client, auth_headers, a["id"], b["id"], "blocks")
    assert first.status_code == 201

    r = await _relate(client, auth_headers, a["id"], b["id"], "duplicates")

    assert r.status_code == 409, r.text
    detail = r.json()["detail"]
    assert detail["error_code"] == "relation_conflict"
    assert detail["relation_id"] == first.json()["id"]
    assert detail["existing_relation_type"] == "blocks"
    assert "'blocks'" in detail["message"]
    rows = await _rows(a["id"], b["id"])
    assert [IssueRelationType(row.relation_type) for row in rows] == [IssueRelationType.BLOCKS]


async def test_duplicates_asked_to_become_blocks_is_refused(client, auth_headers, test_project, db):
    a = await _mk(client, auth_headers, test_project, "A")
    b = await _mk(client, auth_headers, test_project, "B")
    assert (await _relate(client, auth_headers, a["id"], b["id"], "duplicates")).status_code == 201

    r = await _relate(client, auth_headers, a["id"], b["id"], "blocks")

    assert r.status_code == 409, r.text
    assert r.json()["detail"]["existing_relation_type"] == "duplicates"
    rows = await _rows(a["id"], b["id"])
    assert [IssueRelationType(row.relation_type) for row in rows] == [IssueRelationType.DUPLICATES]


async def test_relates_to_on_a_duplicates_pair_is_a_no_op(client, auth_headers, test_project, db):
    a = await _mk(client, auth_headers, test_project, "A")
    b = await _mk(client, auth_headers, test_project, "B")
    first = await _relate(client, auth_headers, a["id"], b["id"], "duplicates")

    r = await _relate(client, auth_headers, a["id"], b["id"], "relates_to")

    assert r.status_code == 201, r.text
    assert r.json()["relation_type"] == "duplicates"
    assert r.json()["id"] == first.json()["id"]


async def test_upgrade_stores_the_enum_name(client, auth_headers, test_project, db):
    """Raw-SQL readers (the ready query, the cycle walk) match the stored
    .name, so the upgrade must write that, for both specific types."""
    from oxyde import execute_raw

    for rtype in ("blocks", "duplicates"):
        a, b, auto = await _auto_linked_pair(client, auth_headers, test_project)
        assert (await _relate(client, auth_headers, a["id"], b["id"], rtype)).status_code == 201
        rows = await execute_raw("SELECT relation_type FROM issue_relations WHERE id = ?", [auto.id])
        assert rows[0]["relation_type"] == rtype.upper()


async def test_reverse_direction_mention_keeps_both_rows(client, auth_headers, test_project, db):
    """A names B, then B blocks A: a different (directional) pair, so the
    block is a new row and the auto-link stays. Pinned so a later change
    to drop the redundant link is a deliberate one."""
    a, b, auto = await _auto_linked_pair(client, auth_headers, test_project)

    r = await _relate(client, auth_headers, b["id"], a["id"], "blocks")

    assert r.status_code == 201, r.text
    assert r.json()["id"] != auto.id
    assert [IssueRelationType(x.relation_type) for x in await _rows(b["id"], a["id"])] == [
        IssueRelationType.BLOCKS,
    ]
    assert [IssueRelationType(x.relation_type) for x in await _rows(a["id"], b["id"])] == [
        IssueRelationType.RELATES_TO,
    ]


async def test_upgrade_that_closes_a_cycle_is_refused(client, auth_headers, test_project, db):
    a, b, auto = await _auto_linked_pair(client, auth_headers, test_project)
    assert (await _relate(client, auth_headers, b["id"], a["id"], "blocks")).status_code == 201

    r = await _relate(client, auth_headers, a["id"], b["id"], "blocks")

    assert r.status_code == 400, r.text
    assert "blocking cycle" in r.json()["detail"].lower()
    row = await OxydeIssueRelation.objects.get(id=auto.id)
    assert IssueRelationType(row.relation_type) == IssueRelationType.RELATES_TO
