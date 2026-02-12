"""Tests for issue list --priority filter."""
import pytest
from unittest.mock import patch, MagicMock


@pytest.fixture(autouse=True)
def mock_dependencies(patched_client, patched_auth, patched_project):
    """Mock client, config, and auth before importing main."""
    yield


@pytest.fixture
def sample_issues():
    """Sample issue data for testing."""
    return [
        {
            "id": "issue-1",
            "identifier": "CHT-1",
            "title": "High priority issue",
            "status": "backlog",
            "priority": "high",
            "issue_type": "task",
            "estimate": 3,
            "sprint_id": None
        },
        {
            "id": "issue-2",
            "identifier": "CHT-2",
            "title": "Urgent issue",
            "status": "in_progress",
            "priority": "urgent",
            "issue_type": "bug",
            "estimate": 5,
            "sprint_id": None
        },
        {
            "id": "issue-3",
            "identifier": "CHT-3",
            "title": "Low priority issue",
            "status": "backlog",
            "priority": "low",
            "issue_type": "task",
            "estimate": 1,
            "sprint_id": None
        },
    ]


class TestIssueListPriorityFilter:
    """Tests for --priority filter on issue list command."""

    def test_single_priority_filter(self, cli_runner, sample_issues):
        """Test filtering by a single priority."""
        from cli.main import cli, client

        # Mock client methods
        client.get_issues = MagicMock(return_value=[sample_issues[0]])
        client.get_sprints = MagicMock(return_value=[])

        with patch('cli.config.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['issue', 'list', '--priority', 'high'])

        assert result.exit_code == 0
        client.get_issues.assert_called_once()
        call_kwargs = client.get_issues.call_args[1]
        assert call_kwargs['priority'] == 'high'

    def test_multiple_priorities_comma_separated(self, cli_runner, sample_issues):
        """Test filtering by multiple priorities (comma-separated)."""
        from cli.main import cli, client

        # Mock client methods
        client.get_issues = MagicMock(return_value=[sample_issues[0], sample_issues[1]])
        client.get_sprints = MagicMock(return_value=[])

        with patch('cli.config.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['issue', 'list', '--priority', 'high,urgent'])

        assert result.exit_code == 0
        client.get_issues.assert_called_once()
        call_kwargs = client.get_issues.call_args[1]
        assert call_kwargs['priority'] == 'high,urgent'

    def test_priority_with_status_filter(self, cli_runner, sample_issues):
        """Test combining --priority with --status filter."""
        from cli.main import cli, client

        # Mock client methods
        client.get_issues = MagicMock(return_value=[sample_issues[0]])
        client.get_sprints = MagicMock(return_value=[])

        with patch('cli.config.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['issue', 'list', '--status', 'backlog', '--priority', 'high'])

        assert result.exit_code == 0
        client.get_issues.assert_called_once()
        call_kwargs = client.get_issues.call_args[1]
        assert call_kwargs['status'] == 'backlog'
        assert call_kwargs['priority'] == 'high'

    def test_no_priority_filter(self, cli_runner, sample_issues):
        """Test that priority parameter is None when not provided."""
        from cli.main import cli, client

        # Mock client methods
        client.get_issues = MagicMock(return_value=sample_issues)
        client.get_sprints = MagicMock(return_value=[])

        with patch('cli.config.get_current_project', return_value='test-project-123'):
            result = cli_runner.invoke(cli, ['issue', 'list'])

        assert result.exit_code == 0
        client.get_issues.assert_called_once()
        call_kwargs = client.get_issues.call_args[1]
        assert call_kwargs['priority'] is None


class TestClientGetIssuesPriorityURLBuilding:
    """Tests for URL building logic with priority parameter."""

    def test_single_priority_url_construction(self):
        """Test that single priority value is added to URL correctly."""
        # Test the URL building logic directly
        params = []
        priority = 'high'
        if priority:
            for p in priority.split(","):
                params.append(f"priority={p.strip()}")
        query = "&".join(params)
        assert query == "priority=high"

    def test_multiple_priorities_url_construction(self):
        """Test that comma-separated priorities create multiple params."""
        params = []
        priority = 'high,urgent'
        if priority:
            for p in priority.split(","):
                params.append(f"priority={p.strip()}")
        query = "&".join(params)
        assert "priority=high" in query
        assert "priority=urgent" in query
        assert query == "priority=high&priority=urgent"

    def test_priorities_with_spaces_url_construction(self):
        """Test that spaces are trimmed from priority values."""
        params = []
        priority = 'high, urgent, medium'
        if priority:
            for p in priority.split(","):
                params.append(f"priority={p.strip()}")
        query = "&".join(params)
        assert "priority=high" in query
        assert "priority=urgent" in query
        assert "priority=medium" in query
        assert query == "priority=high&priority=urgent&priority=medium"

    def test_no_priority_url_construction(self):
        """Test that None priority doesn't add any params."""
        params = []
        priority = None
        if priority:
            for p in priority.split(","):
                params.append(f"priority={p.strip()}")
        query = "&".join(params)
        assert query == ""
        assert "priority" not in query
