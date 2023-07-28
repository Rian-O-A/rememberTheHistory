from flask import Flask
from backend.auth.route import authDefault




app = Flask(__name__)



app.register_blueprint(authDefault, url_prefix="")
    
 