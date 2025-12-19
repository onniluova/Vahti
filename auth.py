import jwt
import datetime
import os

SECRET_KEY = os.getenv('SECRET_KEY', 'kehitysvaiheen-salaisuus')

def createToken(user_id, role):
    payload = {
        'user_id': user_id,
        'role': role,
        'exp': datetime.datetime.now(datetime.UTC) + datetime.timedelta(hours=8)
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token