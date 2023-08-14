import os


credFirebase = {
  "type": os.environ['type'],
  "project_id": os.environ['project_id'],
  "private_key_id": os.environ['private_key_id'],
  "private_key": os.environ['private_key'].replace(r'\n', '\n'),
  "client_email": os.environ['client_email'],
  "client_id": os.environ['client_id'],
  "auth_uri": os.environ['auth_uri'],
  "token_uri": os.environ['token_uri'],
  "auth_provider_x509_cert_url": os.environ['auth_provider_x509_cert_url'],
  "client_x509_cert_url": os.environ['client_x509_cert_url'],
  "universe_domain": os.environ['universe_domain']
}

databaseURL = {"databaseURL": os.environ['databaseURL']}
api_key = os.environ["api_key"]

passwordRSAPriv = os.environ["passwordRSAPriv"]
secretKey= os.environ["secretKey"]

urlFireBase = os.environ["urlFireBase"]
validationAPIKey = os.environ["validationAPIKey"]