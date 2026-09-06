"""Ritual group selection, as a pure function (CHT-1408).

Which rituals a group offers for a given sprint or ticket is the
subsystem's core invariant: every listing, validation and attestation
must compute the SAME selection from the same inputs while the sprint or
ticket is open, or the UI offers one ritual and the gate demands another.
So the computation lives here with no I/O at all: `select` takes the
rituals, the groups they belong to and a seed, and returns what is chosen
plus what a rotation would record. The caller (RitualService) loads the
groups once and decides whether to write the round-robin advances; it is
the only place a pointer moves, at sprint rotation (CHT-1280).

Semantics, per group `selection_mode`:

* RANDOM_ONE  -- one ritual, weighted by `weight`, drawn from
  `random.Random(seed)` so the same seed (sprint id, issue id) always
  picks the same sibling.
* PERCENTAGE  -- each ritual independently, with probability
  `percentage`/100 from `random.Random(f"{seed}:{ritual.id}")`.
* ROUND_ROBIN -- the sibling after `group.last_selected_ritual_id` in
  `created_at` order (the first when the pointer is unset or names a
  ritual no longer in the group; CHT-1405 is about that restart).

Ungrouped rituals are always chosen. A ritual whose group row is gone is
treated as ungrouped. Inactive rituals are never chosen, and a group
with no active member offers nothing.
"""
from __future__ import annotations

import random
from dataclasses import dataclass, field

from app.enums import SelectionMode


@dataclass(frozen=True)
class Selection:
    """What a selection produced.

    `chosen` is the offered rituals, ungrouped ones first, then one
    group at a time in first-seen order. `round_robin_advances` maps a
    ROUND_ROBIN group id to the ritual id its pointer should move to if
    this selection is the one a rotation lands on; empty when the
    pointer already names the chosen sibling.
    """

    chosen: list = field(default_factory=list)
    round_robin_advances: dict = field(default_factory=dict)


def select_random_one(rituals: list, seed: str | None = None):
    """One ritual, weighted by `weight`; None when nothing has weight."""
    if not rituals:
        return None
    weights = [r.weight for r in rituals]
    if sum(weights) <= 0:
        return None
    rng = random.Random(seed) if seed else random
    return rng.choices(rituals, weights=weights, k=1)[0]


def select_round_robin(group, rituals: list):
    """The sibling after the group's pointer, in `created_at` order. Pure:
    reads `group.last_selected_ritual_id`, never writes it."""
    if not rituals:
        return None
    ordered = sorted(rituals, key=lambda r: r.created_at)
    index = 0
    if group.last_selected_ritual_id:
        for i, r in enumerate(ordered):
            if r.id == group.last_selected_ritual_id:
                index = (i + 1) % len(ordered)
                break
    return ordered[index]


def select_by_percentage(rituals: list, seed: str | None = None) -> list:
    """Each ritual independently, with probability `percentage`/100."""
    chosen = []
    for ritual in rituals:
        if ritual.percentage is None or ritual.percentage <= 0:
            continue
        rng = random.Random(f"{seed}:{ritual.id}") if seed else random
        if rng.random() * 100 < ritual.percentage:
            chosen.append(ritual)
    return chosen


def select(rituals: list, groups: dict, seed: str | None = None) -> Selection:
    """Apply every group's selection mode. `groups` maps group id to the
    group row for every `group_id` the rituals carry; a missing entry
    means the group was deleted and its members count as ungrouped."""
    if not rituals:
        return Selection()

    chosen = [r for r in rituals if r.group_id is None]
    by_group: dict[str, list] = {}
    for ritual in rituals:
        if ritual.group_id is not None:
            by_group.setdefault(ritual.group_id, []).append(ritual)

    advances: dict[str, str] = {}
    for group_id, members in by_group.items():
        group = groups.get(group_id)
        if group is None:
            chosen.extend(members)
            continue
        active = [r for r in members if r.is_active]
        if not active:
            continue
        if group.selection_mode == SelectionMode.RANDOM_ONE:
            picked = select_random_one(active, seed=seed)
            if picked is not None:
                chosen.append(picked)
        elif group.selection_mode == SelectionMode.ROUND_ROBIN:
            picked = select_round_robin(group, active)
            if picked is not None:
                chosen.append(picked)
                if group.last_selected_ritual_id != picked.id:
                    advances[group.id] = picked.id
        elif group.selection_mode == SelectionMode.PERCENTAGE:
            chosen.extend(select_by_percentage(active, seed=seed))
    return Selection(chosen=chosen, round_robin_advances=advances)
