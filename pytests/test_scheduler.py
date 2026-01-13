import time
import os
import logging
from apscheduler.schedulers.background import BackgroundScheduler
from app.models.endpoint_model import EndpointModel
from app.services.check_service import CheckService
from app.models.checks_model import CheckModel
from unittest.mock import patch

def test_start_scheduler(scheduler_instance):
    assert scheduler_instance is not None
    assert scheduler_instance.running is True

@patch('app.models.endpoint_model.EndpointModel.get_every_endpoint')
def test_schedule_endpoints_with_mock(mocked_get, scheduler_instance, app_instance):
    mock_endpoints = [
        {"id": 1, "url": "https://test-site-1.com"},
        {"id": 2, "url": "https://test-site-2.com"}
    ]
    
    mocked_get.return_value = mock_endpoints
        
    from app.services.scheduler import scheduleEndpoints
    scheduleEndpoints(app_instance)

    assert mocked_get.called