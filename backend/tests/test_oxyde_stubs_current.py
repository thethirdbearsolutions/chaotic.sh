"""The checked-in Oxyde ``.pyi`` stubs must match what ``oxyde generate-stubs``
would emit for the current models (CHT-1385).

The stubs are generated artifacts that nothing else checks: ruff excludes
them (``extend-exclude`` in pyproject) and no test imports them, so four of
them drifted from their models across several tickets and one (templates)
was never generated at all. This regenerates in memory -- no files are
written -- and diffs against the tree.

The generator embeds ``repr`` of the DateTimeUTC validator, which carries a
process-specific address (``<function ensure_utc at 0x7f...>``), so both
sides are normalised before comparing. That repr is also not valid stub
syntax; it is an upstream Oxyde limitation, tracked separately (CHT-1386),
and not something this test can fix.
"""
import re
from pathlib import Path

from oxyde.codegen import generate_stubs_for_models

import app.oxyde_models  # noqa: F401 -- importing registers every table model

_ADDRESS = re.compile(r" at 0x[0-9a-fA-F]+>")
_MODELS_DIR = Path(app.oxyde_models.__file__).parent


def _normalised(text: str) -> str:
    return _ADDRESS.sub(" at 0x...>", text)


def test_checked_in_stubs_match_the_generator():
    expected = generate_stubs_for_models()
    assert len(expected) >= 10, "the model registry looks empty; is app.oxyde_models imported?"

    stale = []
    for stub_path, content in sorted(expected.items()):
        if not stub_path.exists() or _normalised(stub_path.read_text()) != _normalised(content):
            stale.append(str(stub_path.relative_to(_MODELS_DIR.parent.parent)))
    assert stale == [], (
        f"stale or missing Oxyde stubs: {stale} -- run `cd backend && uv run oxyde generate-stubs` "
        f"and commit the result"
    )

    # Every checked-in stub corresponds to a model file the generator knows.
    orphans = sorted(p.name for p in _MODELS_DIR.glob("*.pyi") if p not in expected)
    assert orphans == [], f"stub files with no generating model: {orphans}"
