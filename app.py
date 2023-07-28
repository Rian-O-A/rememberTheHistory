from flask import Flask
from backend.auth.route import authDefault
from flask_cors import CORS



app = Flask(__name__)
app.register_blueprint(authDefault, url_prefix="")

CORS(app, resources={r"/*": {"origins": "*"}})

app.run(host="0.0.0.0", port=2000, debug=False)
    
 