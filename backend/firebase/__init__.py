import firebase_admin
from firebase_admin import credentials, db

from backend.auth.credentials import credFirebase, databaseURL

firebase_admin.initialize_app(credentials.Certificate(credFirebase), databaseURL)


def mapRealTimeDataBase(path):
    
    return db.reference(path)