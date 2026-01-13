from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from flask import jsonify
from app.db_conn import init_db_pool
import pytest

import time
import logging
from apscheduler.schedulers.background import BackgroundScheduler
from app.models.endpoint_model import EndpointModel
from app.services.check_service import CheckService
from app.models.checks_model import CheckModel

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

@pytest.fixture
def app_instance():
    app = Flask(__name__)

    allowed_origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://vahti-web.vercel.app",
        "https://apishield.vercel.app"
    ]

    CORS(app, 
         resources={r"/*": {"origins": allowed_origins}}, 
         supports_credentials=True, 
         allow_headers=["Content-Type", "Authorization"]
    )

    with app.app_context():
        init_db_pool()
    
    from app.routes.auth_routes import auth_bp
    from app.routes.endpoint_routes import endpoints_bp
    from app.routes.checks_routes import checks_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(endpoints_bp)
    app.register_blueprint(checks_bp)
    
    return app

@pytest.fixture
def scheduler_instance(app_instance):
    if app_instance.debug and os.environ.get('WERKZEUG_RUN_MAIN') != 'true':
        return

    scheduler = BackgroundScheduler()
    
    scheduler.start()

    yield scheduler

    if scheduler.running:
        print("\nSammutetaan scheduler...")
        scheduler.shutdown(wait=False)