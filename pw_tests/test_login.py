import asyncio
import re 
from playwright.async_api import async_playwright, expect
from pages.login_page import LoginPage

async def test_successful_login():
    async with async_playwright() as p:
        is_ci = os.getenv("CI") == "true"
        
        # Asetetaan headless: True jos ollaan CI:ssä, muuten False
        browser = await p.chromium.launch(
            headless=is_ci, 
            slow_mo=0 if is_ci else 1000
        )
        
        page = await browser.new_page()

        # 1. Mockataan kirjautuminen
        await page.route("**/auth/login", lambda route: route.fulfill(
            status=200,
            body='{"success": true, "token": "fake-jwt", "user": "demo_user"}'
        ))

        # 2. Mockataan endpoint-kyselyt, jotta frontti ei hämmenny
        await page.route("**/getEndpoints*", lambda route: route.fulfill(
            status=200,
            body='{"endpoints": []}'
        ))

        # 3. Mockataan refresh-kutsu (estetään 401)
        await page.route("**/auth/refresh", lambda route: route.fulfill(
            status=200,
            body='{"token": "new-fake-jwt"}'
        ))

        lg = LoginPage(page)
        await lg.navigate()
        await lg.fill()
        await lg.sign_in()

        # Varmistus: Nyt frontin pitäisi päästä dashboardille
        await expect(page).to_have_url(re.compile(r".*/dashboard"), timeout=10000)
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(test_successful_login())