"""Smoke test to verify the e2e harness works."""
import httpx
from cli.client import Client, APIError
import pytest
from conftest import TEST_PORT


class TestHarnessSmoke:
    """Verify the test harness connects CLI client to real backend."""

    def test_server_is_reachable(self, test_server):
        """Raw HTTP request to health endpoint works."""
        resp = httpx.get(f"http://127.0.0.1:{TEST_PORT}/health", timeout=5.0)
        assert resp.status_code == 200

    def test_api_endpoint_reachable(self, test_server):
        """Raw HTTP request to /api/teams returns 401 without auth."""
        resp = httpx.get(f"http://127.0.0.1:{TEST_PORT}/api/teams", timeout=5.0)
        assert resp.status_code == 401

    def test_client_can_get_teams(self, api_client, test_team):
        """Client.get_teams() returns data from the real backend."""
        teams = api_client.get_teams()
        assert isinstance(teams, list)
        assert len(teams) >= 1
        assert any(t["name"] == "E2E Team" for t in teams)

    def test_unauthenticated_client_gets_401(self, unauthenticated_client):
        """Unauthenticated requests raise APIError."""
        with pytest.raises(APIError):
            unauthenticated_client.get_teams()
