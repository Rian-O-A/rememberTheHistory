import requests

headers = {"x-api-key": "0srlaPhUBb5pXeQXtqjGn2AB33JdkOsD6v2EZh7u"}

def validation(email):
    
    response = requests.get(url=f'https://block-temporary-email.com/check/email/{email}', headers=headers)
    return response.json()["temporary"]