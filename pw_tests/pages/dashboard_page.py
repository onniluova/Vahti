from playwright.sync_api import Page, expect
import os
from dotenv import load_dotenv

load_dotenv()

class DashboardPage:
    def __init__(self, page):
        self.page = page
        self.add_endpoint_button = page.get_by_text("+ Add new endpoint", exact=True)
        self.api_name_field = page.get_by_placeholder("API Service name", exact=True)
        self.target_url_field = page.get_by_placeholder("https://api.example.com", exact=True)
        self.create_button = page.get_by_text("Create", exact=True)

    def click_add_endpoint(self):
        self.add_endpoint_button.click()

    def fill_fields(self):
        self.api_name_field.fill("Test API")
        self.target_url_field.fill("https://jsonplaceholder.typicode.com/todos/1")

    def click_create(self):
        self.create_button.click()