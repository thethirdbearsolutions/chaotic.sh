"""Tests for ID resolution functions (document, label, team)."""
import pytest
import click
from unittest.mock import patch, MagicMock


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client):
    """Mock the client module before importing main."""
    yield


@pytest.fixture
def sample_documents():
    """Sample document data for testing."""
    return [
        {"id": "abc12345-1111-2222-3333-444444444444", "title": "Getting Started"},
        {"id": "abc12345-5555-6666-7777-888888888888", "title": "API Reference"},
        {"id": "def67890-1111-2222-3333-444444444444", "title": "Tutorial"},
        {"id": "ghi11111-1111-2222-3333-444444444444", "title": "FAQ"},
    ]


@pytest.fixture
def sample_labels():
    """Sample label data for testing."""
    return [
        {"id": "abc12345-1111-2222-3333-444444444444", "name": "bug"},
        {"id": "abc12345-5555-6666-7777-888888888888", "name": "feature"},
        {"id": "def67890-1111-2222-3333-444444444444", "name": "documentation"},
        {"id": "ghi11111-1111-2222-3333-444444444444", "name": "enhancement"},
    ]


@pytest.fixture
def sample_teams():
    """Sample team data for testing."""
    return [
        {"id": "abc12345-1111-2222-3333-444444444444", "name": "Team Alpha", "key": "ALPHA"},
        {"id": "abc12345-5555-6666-7777-888888888888", "name": "Team Beta", "key": "BETA"},
        {"id": "def67890-1111-2222-3333-444444444444", "name": "Team Gamma", "key": "GAMMA"},
        {"id": "ghi11111-1111-2222-3333-444444444444", "name": "Team Delta", "key": "DELTA"},
    ]


# =============================================================================
# Document ID Resolution Tests
# =============================================================================

class TestResolveDocumentIdEmptyDocuments:
    """Tests for empty document list handling."""

    def test_empty_documents_raises_error(self):
        """Test that empty document list raises helpful error."""
        from cli.main import resolve_document_id, client

        client.get_documents = MagicMock(return_value=[])

        with pytest.raises(click.ClickException) as exc_info:
            resolve_document_id("Getting Started", "team-123")

        assert "No documents exist" in str(exc_info.value)
        assert "chaotic doc create" in str(exc_info.value)


class TestResolveDocumentIdExactMatch:
    """Tests for exact UUID matching."""

    def test_exact_uuid_match(self, sample_documents):
        """Test that exact UUID match returns immediately."""
        from cli.main import resolve_document_id, client

        client.get_documents = MagicMock(return_value=sample_documents)

        result = resolve_document_id("abc12345-1111-2222-3333-444444444444", "team-123")

        assert result == "abc12345-1111-2222-3333-444444444444"


class TestResolveDocumentIdTitleMatch:
    """Tests for document title matching."""

    def test_title_match_single(self, sample_documents):
        """Test that unique title match returns the ID."""
        from cli.main import resolve_document_id, client

        client.get_documents = MagicMock(return_value=sample_documents)

        result = resolve_document_id("Tutorial", "team-123")

        assert result == "def67890-1111-2222-3333-444444444444"

    def test_title_match_case_insensitive(self, sample_documents):
        """Test that title matching is case-insensitive."""
        from cli.main import resolve_document_id, client

        client.get_documents = MagicMock(return_value=sample_documents)

        # lowercase
        assert resolve_document_id("tutorial", "team-123") == "def67890-1111-2222-3333-444444444444"
        # uppercase
        assert resolve_document_id("TUTORIAL", "team-123") == "def67890-1111-2222-3333-444444444444"

    def test_title_match_ambiguous_raises_error(self):
        """Test that multiple title matches raises error with options."""
        from cli.main import resolve_document_id, client

        documents_with_dupe = [
            {"id": "id-1", "title": "Guide"},
            {"id": "id-2", "title": "Guide"},
        ]
        client.get_documents = MagicMock(return_value=documents_with_dupe)

        with pytest.raises(click.ClickException) as exc_info:
            resolve_document_id("Guide", "team-123")

        assert "Ambiguous document title" in str(exc_info.value)
        assert "id-1" in str(exc_info.value)
        assert "id-2" in str(exc_info.value)


class TestResolveDocumentIdPrefixMatch:
    """Tests for UUID prefix matching."""

    def test_prefix_match_single(self, sample_documents):
        """Test that unique prefix match returns the ID."""
        from cli.main import resolve_document_id, client

        client.get_documents = MagicMock(return_value=sample_documents)

        # "def" prefix should match only Tutorial
        result = resolve_document_id("def", "team-123")

        assert result == "def67890-1111-2222-3333-444444444444"

    def test_prefix_match_ambiguous_raises_error(self, sample_documents):
        """Test that multiple prefix matches raises error."""
        from cli.main import resolve_document_id, client

        client.get_documents = MagicMock(return_value=sample_documents)

        # "abc" prefix matches both Getting Started and API Reference
        with pytest.raises(click.ClickException) as exc_info:
            resolve_document_id("abc", "team-123")

        assert "Ambiguous document ID prefix" in str(exc_info.value)
        assert "abc12345-1111" in str(exc_info.value)
        assert "abc12345-5555" in str(exc_info.value)


class TestResolveDocumentIdNotFound:
    """Tests for no match scenarios."""

    def test_no_match_raises_error(self, sample_documents):
        """Test that no match raises helpful error."""
        from cli.main import resolve_document_id, client

        client.get_documents = MagicMock(return_value=sample_documents)

        with pytest.raises(click.ClickException) as exc_info:
            resolve_document_id("Nonexistent", "team-123")

        assert "not found" in str(exc_info.value)
        assert "chaotic doc list" in str(exc_info.value)


# =============================================================================
# Label ID Resolution Tests
# =============================================================================

class TestResolveLabelIdEmptyLabels:
    """Tests for empty label list handling."""

    def test_empty_labels_raises_error(self):
        """Test that empty label list raises helpful error."""
        from cli.main import resolve_label_id, client

        client.get_labels = MagicMock(return_value=[])

        with pytest.raises(click.ClickException) as exc_info:
            resolve_label_id("bug", "team-123")

        assert "No labels exist" in str(exc_info.value)
        assert "chaotic label create" in str(exc_info.value)


class TestResolveLabelIdExactMatch:
    """Tests for exact UUID matching."""

    def test_exact_uuid_match(self, sample_labels):
        """Test that exact UUID match returns immediately."""
        from cli.main import resolve_label_id, client

        client.get_labels = MagicMock(return_value=sample_labels)

        result = resolve_label_id("abc12345-1111-2222-3333-444444444444", "team-123")

        assert result == "abc12345-1111-2222-3333-444444444444"


class TestResolveLabelIdNameMatch:
    """Tests for label name matching."""

    def test_name_match_single(self, sample_labels):
        """Test that unique name match returns the ID."""
        from cli.main import resolve_label_id, client

        client.get_labels = MagicMock(return_value=sample_labels)

        result = resolve_label_id("documentation", "team-123")

        assert result == "def67890-1111-2222-3333-444444444444"

    def test_name_match_case_insensitive(self, sample_labels):
        """Test that name matching is case-insensitive."""
        from cli.main import resolve_label_id, client

        client.get_labels = MagicMock(return_value=sample_labels)

        # lowercase
        assert resolve_label_id("documentation", "team-123") == "def67890-1111-2222-3333-444444444444"
        # uppercase
        assert resolve_label_id("DOCUMENTATION", "team-123") == "def67890-1111-2222-3333-444444444444"

    def test_name_match_ambiguous_raises_error(self):
        """Test that multiple name matches raises error with options."""
        from cli.main import resolve_label_id, client

        labels_with_dupe = [
            {"id": "id-1", "name": "priority"},
            {"id": "id-2", "name": "priority"},
        ]
        client.get_labels = MagicMock(return_value=labels_with_dupe)

        with pytest.raises(click.ClickException) as exc_info:
            resolve_label_id("priority", "team-123")

        assert "Ambiguous label name" in str(exc_info.value)
        assert "id-1" in str(exc_info.value)
        assert "id-2" in str(exc_info.value)


class TestResolveLabelIdPrefixMatch:
    """Tests for UUID prefix matching."""

    def test_prefix_match_single(self, sample_labels):
        """Test that unique prefix match returns the ID."""
        from cli.main import resolve_label_id, client

        client.get_labels = MagicMock(return_value=sample_labels)

        # "def" prefix should match only documentation
        result = resolve_label_id("def", "team-123")

        assert result == "def67890-1111-2222-3333-444444444444"

    def test_prefix_match_ambiguous_raises_error(self, sample_labels):
        """Test that multiple prefix matches raises error."""
        from cli.main import resolve_label_id, client

        client.get_labels = MagicMock(return_value=sample_labels)

        # "abc" prefix matches both bug and feature
        with pytest.raises(click.ClickException) as exc_info:
            resolve_label_id("abc", "team-123")

        assert "Ambiguous label ID prefix" in str(exc_info.value)
        assert "abc12345-1111" in str(exc_info.value)
        assert "abc12345-5555" in str(exc_info.value)


class TestResolveLabelIdNotFound:
    """Tests for no match scenarios."""

    def test_no_match_raises_error(self, sample_labels):
        """Test that no match raises helpful error."""
        from cli.main import resolve_label_id, client

        client.get_labels = MagicMock(return_value=sample_labels)

        with pytest.raises(click.ClickException) as exc_info:
            resolve_label_id("nonexistent", "team-123")

        assert "not found" in str(exc_info.value)
        assert "chaotic label list" in str(exc_info.value)


# =============================================================================
# Team ID Resolution Tests
# =============================================================================

class TestResolveTeamIdEmptyTeams:
    """Tests for empty team list handling."""

    def test_empty_teams_raises_error(self):
        """Test that empty team list raises helpful error."""
        from cli.main import resolve_team_id, client

        client.get_teams = MagicMock(return_value=[])

        with pytest.raises(click.ClickException) as exc_info:
            resolve_team_id("Team Alpha")

        assert "No teams exist" in str(exc_info.value)
        assert "chaotic team create" in str(exc_info.value)


class TestResolveTeamIdExactMatch:
    """Tests for exact UUID matching."""

    def test_exact_uuid_match(self, sample_teams):
        """Test that exact UUID match returns immediately."""
        from cli.main import resolve_team_id, client

        client.get_teams = MagicMock(return_value=sample_teams)

        result = resolve_team_id("abc12345-1111-2222-3333-444444444444")

        assert result == "abc12345-1111-2222-3333-444444444444"


class TestResolveTeamIdNameMatch:
    """Tests for team name matching."""

    def test_name_match_single(self, sample_teams):
        """Test that unique name match returns the ID."""
        from cli.main import resolve_team_id, client

        client.get_teams = MagicMock(return_value=sample_teams)

        result = resolve_team_id("Team Gamma")

        assert result == "def67890-1111-2222-3333-444444444444"

    def test_name_match_case_insensitive(self, sample_teams):
        """Test that name matching is case-insensitive."""
        from cli.main import resolve_team_id, client

        client.get_teams = MagicMock(return_value=sample_teams)

        # lowercase
        assert resolve_team_id("team gamma") == "def67890-1111-2222-3333-444444444444"
        # uppercase
        assert resolve_team_id("TEAM GAMMA") == "def67890-1111-2222-3333-444444444444"

    def test_name_match_ambiguous_raises_error(self):
        """Test that multiple name matches raises error with options."""
        from cli.main import resolve_team_id, client

        teams_with_dupe = [
            {"id": "id-1", "name": "Engineering", "key": "ENG1"},
            {"id": "id-2", "name": "Engineering", "key": "ENG2"},
        ]
        client.get_teams = MagicMock(return_value=teams_with_dupe)

        with pytest.raises(click.ClickException) as exc_info:
            resolve_team_id("Engineering")

        assert "Ambiguous team name" in str(exc_info.value)
        assert "id-1" in str(exc_info.value)
        assert "id-2" in str(exc_info.value)


class TestResolveTeamIdKeyMatch:
    """Tests for team key matching."""

    def test_key_match_single(self, sample_teams):
        """Test that unique key match returns the ID."""
        from cli.main import resolve_team_id, client

        client.get_teams = MagicMock(return_value=sample_teams)

        result = resolve_team_id("GAMMA")

        assert result == "def67890-1111-2222-3333-444444444444"

    def test_key_match_case_insensitive(self, sample_teams):
        """Test that key matching is case-insensitive."""
        from cli.main import resolve_team_id, client

        client.get_teams = MagicMock(return_value=sample_teams)

        # lowercase
        assert resolve_team_id("gamma") == "def67890-1111-2222-3333-444444444444"
        # uppercase
        assert resolve_team_id("GAMMA") == "def67890-1111-2222-3333-444444444444"

    def test_key_match_ambiguous_raises_error(self):
        """Test that multiple key matches raises error with options."""
        from cli.main import resolve_team_id, client

        teams_with_dupe = [
            {"id": "id-1", "name": "Team 1", "key": "PROD"},
            {"id": "id-2", "name": "Team 2", "key": "PROD"},
        ]
        client.get_teams = MagicMock(return_value=teams_with_dupe)

        with pytest.raises(click.ClickException) as exc_info:
            resolve_team_id("PROD")

        assert "Ambiguous team key" in str(exc_info.value)
        assert "id-1" in str(exc_info.value)
        assert "id-2" in str(exc_info.value)


class TestResolveTeamIdPrefixMatch:
    """Tests for UUID prefix matching."""

    def test_prefix_match_single(self, sample_teams):
        """Test that unique prefix match returns the ID."""
        from cli.main import resolve_team_id, client

        client.get_teams = MagicMock(return_value=sample_teams)

        # "def" prefix should match only Team Gamma
        result = resolve_team_id("def")

        assert result == "def67890-1111-2222-3333-444444444444"

    def test_prefix_match_ambiguous_raises_error(self, sample_teams):
        """Test that multiple prefix matches raises error."""
        from cli.main import resolve_team_id, client

        client.get_teams = MagicMock(return_value=sample_teams)

        # "abc" prefix matches both Team Alpha and Team Beta
        with pytest.raises(click.ClickException) as exc_info:
            resolve_team_id("abc")

        assert "Ambiguous team ID prefix" in str(exc_info.value)
        assert "abc12345-1111" in str(exc_info.value)
        assert "abc12345-5555" in str(exc_info.value)


class TestResolveTeamIdNotFound:
    """Tests for no match scenarios."""

    def test_no_match_raises_error(self, sample_teams):
        """Test that no match raises helpful error."""
        from cli.main import resolve_team_id, client

        client.get_teams = MagicMock(return_value=sample_teams)

        with pytest.raises(click.ClickException) as exc_info:
            resolve_team_id("Nonexistent")

        assert "not found" in str(exc_info.value)
        assert "chaotic team list" in str(exc_info.value)


class TestResolveTeamIdResolutionOrder:
    """Tests to verify resolution order (exact ID > name > key > prefix)."""

    def test_name_takes_precedence_over_key(self):
        """Test that name match wins over key match."""
        from cli.main import resolve_team_id, client

        teams = [
            {"id": "id-1", "name": "PROD", "key": "PRODUCTION"},  # name is "PROD"
            {"id": "id-2", "name": "Production Team", "key": "PROD"},  # key is "PROD"
        ]
        client.get_teams = MagicMock(return_value=teams)

        # "PROD" should match the name first
        result = resolve_team_id("PROD")
        assert result == "id-1"  # Matched by name

    def test_key_takes_precedence_over_prefix(self):
        """Test that key match wins over prefix match."""
        from cli.main import resolve_team_id, client

        teams = [
            {"id": "id-1", "name": "Team One", "key": "abc"},  # key is "abc"
            {"id": "abcdef-456", "name": "Team Two", "key": "XYZ"},  # ID starts with "abc"
        ]
        client.get_teams = MagicMock(return_value=teams)

        # "abc" should match the key first
        result = resolve_team_id("abc")
        assert result == "id-1"  # Matched by key
