from playwright.sync_api import Page, expect
import os
from dotenv import load_dotenv

load_dotenv()

class LoginPage:
    def __init__(self, page):
        self.page = page
        self.username_input = page.get_by_placeholder("Enter your username")
        self.password_input = page.get_by_placeholder("••••••••")
        self.sign_in_button = page.get_by_role("button", name="Sign In", exact=True)
    
    def navigate(self):
        base_url = os.getenv("BASE_URL", "http://127.0.0.1:5173/")
        self.page.goto(base_url)

    def fill(self):
        user = os.getenv("APP_USERNAME")
        password = os.getenv("APP_PASSWORD")

        if not user or not password:
            raise ValueError("Ympäristömuuttujat APP_USERNAME tai APP_PASSWORD puuttuvat!")

        self.username_input.wait_for(state="visible", timeout=15000)

        self.username_input.fill(user)

        # Lisätty varmistus: painikkeen pitää olla vakaa ennen klikkausta
        expect(self.sign_in_button).to_be_visible()

        self.password_input.fill(password)

    def sign_in(self):
        self.sign_in_button.click()