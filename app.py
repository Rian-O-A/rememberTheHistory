from flask import Flask
from backend.auth.route import authDefault




app = Flask(__name__)
app.register_blueprint(authDefault, url_prefix="")

app.run(host="0.0.0.0", port=2000, debug=False)
    
 