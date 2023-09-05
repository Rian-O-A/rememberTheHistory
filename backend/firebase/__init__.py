import firebase_admin
from firebase_admin import credentials, db, auth
from backend.auth.credentials import api_key
from backend.auth.credentials import credFirebase, databaseURL, urlFireBase
import requests


firebase_admin.initialize_app(credentials.Certificate(credFirebase), databaseURL)



class Manager:

    def mapRealTimeDataBase(path):
        
        return db.reference(path)


    def registerUser(**args):
        
         response = auth.create_user(email=args["email"], password=args["senha"], display_name=args["name"]) 
         return {"uid":response.uid, "displayName": response.display_name}
    
    def loginUser(**args):

        auth_payload = {
            'email': args["email"],
            'password': args["senha"],
            'returnSecureToken': True
        }

        # Fazendo a solicitação POST para autenticar e obter o token JWT
        response = requests.post(urlFireBase, params={'key': api_key}, json=auth_payload).json()
        
        
        if "idToken" in response:
            return ({"uid":response['localId'], "displayName": response["displayName"]}, 200)
        else:
            return ({"error":response['error']['message']}, response['error']['code'])
        
    def infoUser(uid):
        
        response =  auth.get_user(uid)
        return ({"email":response.email, "nome": response.display_name}, 200)
                

                
        
        
        
    