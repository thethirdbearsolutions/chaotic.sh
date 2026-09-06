"""Off-scale estimates warn, never block (CHT-1365)."""
import pytest

from chaotic_mcp_tools.estimates import SCALE_VALUES, off_scale_warning


class TestOffScaleWarning:
    @pytest.mark.parametrize("scale,ok", [
        ("fibonacci", 5), ("fibonacci", 21), ("linear", 7), ("powers_of_2", 64), ("tshirt", 8),
    ])
    def test_on_scale_values_are_silent(self, scale, ok):
        assert off_scale_warning(ok, scale) is None

    def test_off_scale_names_the_scale_and_the_nearest_value(self):
        msg = off_scale_warning(7, "fibonacci")
        assert msg == (
            "Estimate 7 is not on this project's fibonacci scale (1, 2, 3, 5, 8, 13, 21); "
            "nearest is 8. Stored as given."
        )
        assert "nearest is 2" in off_scale_warning(3, "powers_of_2")  # tie with 4; ties round down
        assert "nearest is 8" in off_scale_warning(40, "tshirt")

    def test_ties_round_down(self):
        assert "nearest is 3" in off_scale_warning(4, "fibonacci")  # 3 and 5 are both one away

    def test_no_estimate_or_unknown_scale_is_silent(self):
        assert off_scale_warning(None, "fibonacci") is None
        assert off_scale_warning(7, None) is None
        assert off_scale_warning(7, "hexadecimal") is None  # a newer server's scale, not our business

    def test_zero_is_a_zero_point_estimate_not_a_typo(self):
        assert off_scale_warning(0, "fibonacci") is None
        assert off_scale_warning(0, "powers_of_2") is None

    def test_tables_match_the_frontend(self):
        """The same tables drive the frontend's estimate dropdown
        (frontend/src/projects.js ESTIMATE_SCALES). Parse that source rather
        than hand-copy it, so drift fails here (PR #283 review)."""
        import re
        from pathlib import Path

        source = (Path(__file__).resolve().parents[2] / "frontend" / "src" / "projects.js").read_text()
        block = source[source.index("const ESTIMATE_SCALES = {"):]
        block = block[: block.index("\n};") + 3]
        frontend = {
            name: tuple(int(v) for v in re.findall(r"value: (\d+)", body))
            for name, body in re.findall(r"\n  (\w+): \[((?:.|\n)*?)\n  \]", block)
        }
        assert frontend, "could not parse ESTIMATE_SCALES out of projects.js"
        assert frontend == dict(SCALE_VALUES)
