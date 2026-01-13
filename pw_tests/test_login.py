import pytest
import re
from playwright.sync_api import Page, expect
from pages.login_page import LoginPage
from pages.dashboard_page import DashboardPage

def test_login_page_loads(page):
    lg = LoginPage(page)
    lg.navigate()

def test_successful_login_flow(page):
    page.route("**/auth/login", lambda route: route.fulfill(status=200, body='{"success":true}'))

    lg = LoginPage(page)
    lg.navigate()
    lg.fill()
    lg.sign_in()
    