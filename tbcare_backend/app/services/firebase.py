import firebase_admin
from firebase_admin import credentials, auth
import os

cred = credentials.Certificate("app/services/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

def verify_token(id_token: str):
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except Exception as e:
        raise Exception("Invalid Firebase token") from e
