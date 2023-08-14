import requests
from backend.auth.credentials import validationAPIKey 

headers = {"x-api-key": validationAPIKey}

def validation(email):
    
    response = requests.get(url=f'https://block-temporary-email.com/check/email/{email}', headers=headers)
    return response.json()["temporary"]
