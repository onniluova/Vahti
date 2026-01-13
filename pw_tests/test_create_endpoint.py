import pytest
from pages.dashboard_page import DashboardPage
from playwright.sync_api import Page, expect

def test_create_endpoint(authenticated_page):
    page = authenticated_page

    # Mockataan endpoint create request
    page.route("**/addEndpoint", lambda route: route.fulfill(
        status=200,
        body='{"success": true, "token": "fake-jwt", "endpoint_id": 1}'
    ))

    dp = DashboardPage(page)

    dp.click_add_endpoint()

    dp.fill_fields()

    dp.click_create()