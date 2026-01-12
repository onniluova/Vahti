import asyncio
from playwright.async_api import async_playwright
from pages.login_page import LoginPage

async def test_login_page():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False, slow_mo=2000)
        context = await browser.new_context()
        page = await context.new_page()

        lg = LoginPage(page)

        await lg.navigate()

        await lg.fill()

        await lg.sign_in()

        await browser.close()

if __name__ == "__main__":
    asyncio.run(test_login_page())