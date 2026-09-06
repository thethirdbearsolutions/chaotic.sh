"""ritual_selection.select is pure (CHT-1408): these tests build rituals
and groups as plain objects and never touch the database. What they pin
is the contract the listing, the attest-time validation and the rotation
all rely on: the same inputs and seed give the same selection, and the
round-robin pointer is reported, not moved."""
from datetime import datetime, timedelta, timezone
from types import SimpleNamespace

from app.enums import SelectionMode
from app.services.ritual_selection import (
    Selection,
    select,
    select_by_percentage,
    select_random_one,
    select_round_robin,
)

_T0 = datetime(2026, 1, 1, tzinfo=timezone.utc)


def ritual(id, *, group_id=None, is_active=True, weight=1.0, percentage=None, order=0):
    return SimpleNamespace(
        id=id, group_id=group_id, is_active=is_active, weight=weight, percentage=percentage,
        created_at=_T0 + timedelta(minutes=order),
    )


def group(id, mode, last=None):
    return SimpleNamespace(id=id, selection_mode=mode, last_selected_ritual_id=last)


class TestUngroupedAndMissingGroups:
    def test_empty_input_is_an_empty_selection(self):
        assert select([], {}, "seed") == Selection()

    def test_ungrouped_rituals_are_always_chosen_first(self):
        a, b = ritual("a"), ritual("b", group_id="g")
        g = group("g", SelectionMode.RANDOM_ONE)
        assert select([b, a], {"g": g}, "seed").chosen == [a, b]

    def test_a_deleted_group_makes_its_members_ungrouped(self):
        a, b = ritual("a", group_id="gone"), ritual("b", group_id="gone")
        assert select([a, b], {}, "seed").chosen == [a, b]

    def test_inactive_grouped_rituals_are_never_chosen(self):
        """Grouped members are filtered on is_active here. Ungrouped ones
        are not: the callers list a project's active rituals to begin
        with, and select() does not second-guess that."""
        a = ritual("a", group_id="g", is_active=False)
        g = group("g", SelectionMode.RANDOM_ONE)
        assert select([a], {"g": g}, "seed").chosen == []


class TestRandomOne:
    def test_same_seed_same_pick(self):
        rituals = [ritual(str(i), group_id="g") for i in range(5)]
        g = group("g", SelectionMode.RANDOM_ONE)
        first = select(rituals, {"g": g}, "sprint-1").chosen
        assert first == select(rituals, {"g": g}, "sprint-1").chosen
        assert len(first) == 1

    def test_different_seeds_eventually_differ(self):
        rituals = [ritual(str(i), group_id="g") for i in range(5)]
        g = group("g", SelectionMode.RANDOM_ONE)
        picks = {select(rituals, {"g": g}, f"seed-{n}").chosen[0].id for n in range(50)}
        assert len(picks) > 1

    def test_weight_zero_is_never_picked_and_all_zero_picks_nothing(self):
        heavy, none = ritual("heavy", weight=1.0), ritual("none", weight=0.0)
        assert all(select_random_one([heavy, none], seed=f"s{n}") is heavy for n in range(20))
        assert select_random_one([ritual("z", weight=0.0)], seed="s") is None
        assert select_random_one([], seed="s") is None

    def test_random_one_never_reports_an_advance(self):
        rituals = [ritual("a", group_id="g"), ritual("b", group_id="g")]
        assert select(rituals, {"g": group("g", SelectionMode.RANDOM_ONE)}, "s").round_robin_advances == {}


class TestPercentage:
    def test_each_ritual_rolls_independently_and_deterministically(self):
        always = ritual("always", group_id="g", percentage=100.0)
        never = ritual("never", group_id="g", percentage=0.0)
        unset = ritual("unset", group_id="g", percentage=None)
        g = group("g", SelectionMode.PERCENTAGE)
        chosen = select([always, never, unset], {"g": g}, "sprint").chosen
        assert chosen == [always]
        assert select_by_percentage([always, never, unset], seed="sprint") == [always]

    def test_thirty_percent_is_a_frequency_not_a_schedule(self):
        r = ritual("r", percentage=30.0)
        hits = sum(1 for n in range(400) if select_by_percentage([r], seed=f"sprint-{n}"))
        assert 60 < hits < 180  # around 120; not every third sprint


class TestRoundRobin:
    def _siblings(self):
        return [ritual("a", group_id="g", order=0), ritual("b", group_id="g", order=1), ritual("c", group_id="g", order=2)]

    def test_unset_pointer_offers_the_oldest(self):
        a, b, c = self._siblings()
        g = group("g", SelectionMode.ROUND_ROBIN, last=None)
        result = select([c, a, b], {"g": g}, "s")
        assert result.chosen == [a]
        assert result.round_robin_advances == {"g": "a"}

    def test_pointer_offers_the_next_and_wraps(self):
        a, b, c = self._siblings()
        assert select_round_robin(group("g", SelectionMode.ROUND_ROBIN, last="a"), [a, b, c]) is b
        assert select_round_robin(group("g", SelectionMode.ROUND_ROBIN, last="b"), [a, b, c]) is c
        assert select_round_robin(group("g", SelectionMode.ROUND_ROBIN, last="c"), [a, b, c]) is a

    def test_selection_is_stable_until_the_pointer_moves(self):
        """The invariant: listing twice offers the same sibling; select()
        never mutates the group it read."""
        a, b, c = self._siblings()
        g = group("g", SelectionMode.ROUND_ROBIN, last="a")
        first = select([a, b, c], {"g": g}, "s")
        second = select([a, b, c], {"g": g}, "s")
        assert first.chosen == second.chosen == [b]
        assert g.last_selected_ritual_id == "a"  # untouched
        assert first.round_robin_advances == {"g": "b"}

    def test_no_advance_when_the_pointer_already_names_the_choice(self):
        (a,) = self._siblings()[:1]
        g = group("g", SelectionMode.ROUND_ROBIN, last="a")
        result = select([a], {"g": g}, "s")
        assert result.chosen == [a] and result.round_robin_advances == {}

    def test_inactive_siblings_are_skipped_in_the_order(self):
        a, b, c = self._siblings()
        b.is_active = False
        g = group("g", SelectionMode.ROUND_ROBIN, last="a")
        assert select([a, b, c], {"g": g}, "s").chosen == [c]

    def test_a_stale_pointer_restarts_at_the_oldest(self):
        """Pinned as current behaviour: a pointer naming a ritual no longer
        in the group falls back to index 0 (CHT-1405 questions whether it
        should resume after the deleted ritual's position instead)."""
        a, b, c = self._siblings()
        g = group("g", SelectionMode.ROUND_ROBIN, last="deleted")
        assert select_round_robin(g, [a, b, c]) is a


class TestSeveralGroups:
    def test_groups_are_independent_and_reported_by_id(self):
        r1 = ritual("r1", group_id="rr", order=0)
        r2 = ritual("r2", group_id="rr", order=1)
        p1 = ritual("p1", group_id="pc", percentage=100.0)
        u = ritual("u")
        groups = {
            "rr": group("rr", SelectionMode.ROUND_ROBIN, last="r1"),
            "pc": group("pc", SelectionMode.PERCENTAGE),
        }
        result = select([r1, p1, u, r2], groups, "seed")
        assert result.chosen == [u, r2, p1]
        assert result.round_robin_advances == {"rr": "r2"}
