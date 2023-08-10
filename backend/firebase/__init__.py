import firebase_admin
from firebase_admin import credentials, db, auth

from backend.auth.credentials import credFirebase, databaseURL

firebase_admin.initialize_app(credentials.Certificate(credFirebase), databaseURL)



class Manager:

    def mapRealTimeDataBase(path):
        
        return db.reference(path)


    def registerUser(**args):
        
        return auth.create_user(email=args["email"], password=args["senha"], display_name=args["name"]) 
    