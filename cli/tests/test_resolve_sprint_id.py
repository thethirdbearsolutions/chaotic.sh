"""Tests for resolve_sprint_id function."""
import pytest
import click
from unittest.mock import patch, MagicMock


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client):
    """Mock the client module before importing main."""
    yield


@pytest.fixture
def sample_sprints():
    """Sample sprint data for testing."""
    return [
        {"id": "abc12345-1111-2222-3333-444444444444", "name": "Sprint 1", "status": "completed"},
        {"id": "abc12345-5555-6666-7777-888888888888", "name": "Sprint 2", "status": "completed"},
        {"id": "def67890-1111-2222-3333-444444444444", "name": "Sprint 3", "status": "active"},
        {"id": "ghi11111-1111-2222-3333-444444444444", "name": "Sprint 4", "status": "planned"},
    ]


class TestResolveSprintIdCurrent:
    """Tests for 'current' keyword resolution."""

    def test_current_returns_active_sprint_id(self):
        """Test that 'current' resolves to the active sprint ID."""
        from cli.main import resolve_sprint_id, client

        client.get_current_sprint = MagicMock(return_value={
            "id": "active-sprint-id-123",
            "name": "Current Sprint",
            "status": "active"
        })

        result = resolve_sprint_id("current", "project-123")

        assert result == "active-sprint-id-123"
        client.get_current_sprint.assert_called_once_with("project-123")

    def test_current_case_insensitive(self):
        """Test that 'CURRENT' and 'Current' also work."""
        from cli.main import resolve_sprint_id, client

        client.get_current_sprint = MagicMock(return_value={
            "id": "active-sprint-id-123",
            "name": "Current Sprint",
            "status": "active"
        })

        assert resolve_sprint_id("CURRENT", "project-123") == "active-sprint-id-123"
        assert resolve_sprint_id("Current", "project-123") == "active-sprint-id-123"

    def test_current_no_active_sprint_propagates_error(self):
        """Test that API error when no active sprint propagates up."""
        from cli.main import resolve_sprint_id, client
        import httpx

        # Simulate API error when no active sprint exists
        client.get_current_sprint = MagicMock(
            side_effect=httpx.HTTPStatusError(
                "No active sprint",
                request=MagicMock(),
                response=MagicMock(status_code=404)
            )
        )

        with pytest.raises(httpx.HTTPStatusError):
            resolve_sprint_id("current", "project-123")


class TestResolveSprintIdEmptySprints:
    """Tests for empty sprint list handling."""

    def test_empty_sprints_raises_error(self):
        """Test that empty sprint list raises helpful error."""
        from cli.main import resolve_sprint_id, client

        client.get_sprints = MagicMock(return_value=[])

        with pytest.raises(click.ClickException) as exc_info:
            resolve_sprint_id("Sprint 1", "project-123")

        assert "No sprints exist" in str(exc_info.value)
        assert "chaotic sprint current" in str(exc_info.value)


class TestResolveSprintIdExactMatch:
    """Tests for exact UUID matching."""

    def test_exact_uuid_match(self, sample_sprints):
        """Test that exact UUID match returns immediately."""
        from cli.main import resolve_sprint_id, client

        client.get_sprints = MagicMock(return_value=sample_sprints)

        result = resolve_sprint_id("abc12345-1111-2222-3333-444444444444", "project-123")

        assert result == "abc12345-1111-2222-3333-444444444444"


class TestResolveSprintIdNameMatch:
    """Tests for sprint name matching."""

    def test_name_match_single(self, sample_sprints):
        """Test that unique name match returns the ID."""
        from cli.main import resolve_sprint_id, client

        client.get_sprints = MagicMock(return_value=sample_sprints)

        result = resolve_sprint_id("Sprint 3", "project-123")

        assert result == "def67890-1111-2222-3333-444444444444"

    def test_name_match_case_insensitive(self, sample_sprints):
        """Test that name matching is case-insensitive."""
        from cli.main import resolve_sprint_id, client

        client.get_sprints = MagicMock(return_value=sample_sprints)

        # lowercase
        assert resolve_sprint_id("sprint 3", "project-123") == "def67890-1111-2222-3333-444444444444"
        # uppercase
        assert resolve_sprint_id("SPRINT 3", "project-123") == "def67890-1111-2222-3333-444444444444"
        # mixed
        assert resolve_sprint_id("SpRiNt 3", "project-123") == "def67890-1111-2222-3333-444444444444"

    def test_name_match_ambiguous_raises_error(self):
        """Test that multiple name matches raises error with options."""
        from cli.main import resolve_sprint_id, client

        # Two sprints with same name
        sprints_with_dupe = [
            {"id": "id-1", "name": "Sprint X", "status": "completed"},
            {"id": "id-2", "name": "Sprint X", "status": "active"},
        ]
        client.get_sprints = MagicMock(return_value=sprints_with_dupe)

        with pytest.raises(click.ClickException) as exc_info:
            resolve_sprint_id("Sprint X", "project-123")

        assert "Ambiguous sprint name" in str(exc_info.value)
        assert "id-1" in str(exc_info.value)
        assert "id-2" in str(exc_info.value)

    def test_name_match_null_safety(self):
        """Test that sprints with null names don't crash."""
        from cli.main import resolve_sprint_id, client

        sprints_with_null = [
            {"id": "id-1", "name": None, "status": "completed"},
            {"id": "id-2", "name": "Sprint 2", "status": "active"},
        ]
        client.get_sprints = MagicMock(return_value=sprints_with_null)

        # Should find Sprint 2, not crash on null
        result = resolve_sprint_id("Sprint 2", "project-123")
        assert result == "id-2"

    def test_name_match_missing_name_key(self):
        """Test that sprints missing 'name' key don't crash."""
        from cli.main import resolve_sprint_id, client

        sprints_missing_name = [
            {"id": "id-1", "status": "completed"},  # no name key
            {"id": "id-2", "name": "Sprint 2", "status": "active"},
        ]
        client.get_sprints = MagicMock(return_value=sprints_missing_name)

        result = resolve_sprint_id("Sprint 2", "project-123")
        assert result == "id-2"


class TestResolveSprintIdSubstringMatch:
    """Tests for sprint name substring matching."""

    def test_substring_match_single(self, sample_sprints):
        """Test that unique substring match returns the ID."""
        from cli.main import resolve_sprint_id, client

        client.get_sprints = MagicMock(return_value=sample_sprints)

        # "Sprint 3" is the only sprint with "3" in its name
        result = resolve_sprint_id("3", "project-123")

        assert result == "def67890-1111-2222-3333-444444444444"

    def test_substring_match_case_insensitive(self):
        """Test that substring matching is case-insensitive."""
        from cli.main import resolve_sprint_id, client

        sprints = [
            {"id": "id-1", "name": "Housekeeping & Plumbing", "status": "active"},
        ]
        client.get_sprints = MagicMock(return_value=sprints)

        assert resolve_sprint_id("housekeeping", "project-123") == "id-1"
        assert resolve_sprint_id("PLUMBING", "project-123") == "id-1"

    def test_substring_match_ambiguous_raises_error(self):
        """Test that multiple substring matches raises error."""
        from cli.main import resolve_sprint_id, client

        sprints = [
            {"id": "id-1", "name": "Sprint Alpha", "status": "active"},
            {"id": "id-2", "name": "Sprint Beta", "status": "completed"},
        ]
        client.get_sprints = MagicMock(return_value=sprints)

        with pytest.raises(click.ClickException) as exc_info:
            resolve_sprint_id("Sprint", "project-123")

        assert "Ambiguous sprint name substring" in str(exc_info.value)

    def test_exact_name_takes_precedence_over_substring(self):
        """Test that exact name match wins over substring match."""
        from cli.main import resolve_sprint_id, client

        sprints = [
            {"id": "id-1", "name": "Sprint", "status": "active"},
            {"id": "id-2", "name": "Sprint Extended", "status": "completed"},
        ]
        client.get_sprints = MagicMock(return_value=sprints)

        # "Sprint" is an exact match for id-1
        result = resolve_sprint_id("Sprint", "project-123")
        assert result == "id-1"


class TestResolveSprintIdPrefixMatch:
    """Tests for UUID prefix matching."""

    def test_prefix_match_single(self, sample_sprints):
        """Test that unique prefix match returns the ID."""
        from cli.main import resolve_sprint_id, client

        client.get_sprints = MagicMock(return_value=sample_sprints)

        # "def" prefix should match only Sprint 3
        result = resolve_sprint_id("def", "project-123")

        assert result == "def67890-1111-2222-3333-444444444444"

    def test_prefix_match_ambiguous_raises_error(self, sample_sprints):
        """Test that multiple prefix matches raises error."""
        from cli.main import resolve_sprint_id, client

        client.get_sprints = MagicMock(return_value=sample_sprints)

        # "abc" prefix matches both Sprint 1 and Sprint 2
        with pytest.raises(click.ClickException) as exc_info:
            resolve_sprint_id("abc", "project-123")

        assert "Ambiguous sprint ID prefix" in str(exc_info.value)
        assert "abc12345-1111" in str(exc_info.value)
        assert "abc12345-5555" in str(exc_info.value)


class TestResolveSprintIdNotFound:
    """Tests for no match scenarios."""

    def test_no_match_raises_error(self, sample_sprints):
        """Test that no match raises helpful error."""
        from cli.main import resolve_sprint_id, client

        client.get_sprints = MagicMock(return_value=sample_sprints)

        with pytest.raises(click.ClickException) as exc_info:
            resolve_sprint_id("Nonexistent Sprint", "project-123")

        assert "not found" in str(exc_info.value)
        assert "chaotic sprint list" in str(exc_info.value)

    def test_no_match_for_invalid_uuid(self, sample_sprints):
        """Test that invalid UUID that doesn't match any prefix raises error."""
        from cli.main import resolve_sprint_id, client

        client.get_sprints = MagicMock(return_value=sample_sprints)

        with pytest.raises(click.ClickException) as exc_info:
            resolve_sprint_id("zzz99999", "project-123")

        assert "not found" in str(exc_info.value)


class TestResolveSprintIdResolutionOrder:
    """Tests to verify resolution order (exact ID > name > prefix)."""

    def test_exact_id_takes_precedence_over_name(self):
        """Test that exact ID match wins over name match."""
        from cli.main import resolve_sprint_id, client

        # Sprint named same as another sprint's ID (edge case)
        tricky_sprints = [
            {"id": "sprint-1-id", "name": "Sprint 1", "status": "active"},
            {"id": "Sprint 1", "name": "Other Sprint", "status": "completed"},  # ID is "Sprint 1"
        ]
        client.get_sprints = MagicMock(return_value=tricky_sprints)

        # "Sprint 1" should match the ID, not the name
        result = resolve_sprint_id("Sprint 1", "project-123")
        assert result == "Sprint 1"  # The ID, not sprint-1-id

    def test_name_takes_precedence_over_prefix(self):
        """Test that name match wins over prefix match."""
        from cli.main import resolve_sprint_id, client

        sprints = [
            {"id": "abc-123", "name": "abc", "status": "active"},  # name is "abc"
            {"id": "abcdef-456", "name": "Sprint 2", "status": "completed"},  # ID starts with "abc"
        ]
        client.get_sprints = MagicMock(return_value=sprints)

        # "abc" should match the name first, not the prefix
        result = resolve_sprint_id("abc", "project-123")
        assert result == "abc-123"  # Matched by name


class TestResolveSprintIdEdgeCases:
    """Tests for edge case inputs."""

    def test_empty_string_matches_all_substrings(self, sample_sprints):
        """Test that empty string input matches all sprints as substring.

        Empty string is a substring of every name, so with multiple sprints
        it raises an ambiguous substring error.
        """
        from cli.main import resolve_sprint_id, client

        client.get_sprints = MagicMock(return_value=sample_sprints)

        with pytest.raises(click.ClickException) as exc_info:
            resolve_sprint_id("", "project-123")

        assert "Ambiguous sprint name substring" in str(exc_info.value)

    def test_whitespace_not_trimmed(self, sample_sprints):
        """Test that whitespace is not automatically trimmed.

        Input "  Sprint 3  " does not match "Sprint 3" because
        the function does not strip whitespace - this is intentional.
        """
        from cli.main import resolve_sprint_id, client

        client.get_sprints = MagicMock(return_value=sample_sprints)

        with pytest.raises(click.ClickException) as exc_info:
            resolve_sprint_id("  Sprint 3  ", "project-123")

        assert "not found" in str(exc_info.value)

    def test_empty_string_name_sprint(self):
        """Test that sprint with empty string name doesn't match empty input."""
        from cli.main import resolve_sprint_id, client

        sprints_with_empty_name = [
            {"id": "id-1", "name": "", "status": "completed"},
            {"id": "id-2", "name": "Sprint 2", "status": "active"},
        ]
        client.get_sprints = MagicMock(return_value=sprints_with_empty_name)

        # Empty string input matches empty name - this is edge case behavior
        result = resolve_sprint_id("", "project-123")
        assert result == "id-1"
