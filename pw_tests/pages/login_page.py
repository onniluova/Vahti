from playwright.async_api import Page
import os
from dotenv import load_dotenv

load_dotenv()
base_url = os.getenv("BASE_URL", "http://127.0.0.1:5173")

class LoginPage:
    def __init__(self, page):
        self.page = page
        self.username_input = page.get_by_placeholder("Enter your username")
        self.password_input = page.get_by_placeholder("••••••••")
        self.sign_in_button = page.get_by_role("button", name="Sign In", exact=True)
    
    async def navigate(self):
        await self.page.goto(base_url)

    async def fill(self):
        user = os.getenv("APP_USERNAME")
        password = os.getenv("APP_PASSWORD")

        if not user or not password:
            raise ValueError("Ympäristömuuttujat APP_USERNAME tai APP_PASSWORD puuttuvat!")

        await self.username_input.fill(user)
        await self.password_input.fill(password)

    async def sign_in(self):
        await self.sign_in_button.click()