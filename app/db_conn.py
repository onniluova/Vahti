import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

def get_db_connection():

    url = os.getenv("DATABASE_URL")

    if not url:
        dbname = os.getenv("DB_NAME")
        user = os.getenv("DB_USER")
        password = os.getenv("DB_PASSWORD")
        host = "localhost"
        url = f"postgresql://{user}:{password}@{host}/{dbname}"

    if url and url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql://", 1)

    conn = psycopg2.connect(url)
    return conn