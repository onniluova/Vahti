import pytest
import re
from playwright.sync_api import expect
from pages.login_page import LoginPage

@pytest.fixture
def authenticated_page(page):
    # 1. Mockataan kirjautuminen (ei await)
    page.route("**/auth/login", lambda route: route.fulfill(
        status=200,
        body='{"success": true, "token": "fake-jwt", "user": "demo_user"}'
    ))

    # 2. Mockataan endpoint-kyselyt
    page.route("**/getEndpoints*", lambda route: route.fulfill(
        status=200,
        body='{"endpoints": []}'
    ))

    # 3. Mockataan refresh-kutsu
    page.route("**/auth/refresh", lambda route: route.fulfill(
        status=200,
        body='{"token": "new-fake-jwt"}'
    ))

    lg = LoginPage(page)
    lg.navigate()
    lg.fill()
    lg.sign_in()
    
    expect(page).to_have_url(re.compile(r".*/dashboard"), timeout=10000)
    
    return page