from flask import Blueprint, request, jsonify
from backend.firebase import Manager
from backend.auth.emails import validation
from flask_jwt_extended import create_access_token, jwt_required


authRoute = Blueprint('Auth', __name__)

# =========================== authetication user ==============================
@authRoute.route("/login", methods=["POST"])
def login():
    getInfo = request.get_json()
    try:
        assert 'email' in getInfo, "Required email"
        assert 'password' in getInfo, "Required password"
        assert '@' in getInfo['email'], 'invalid email'
        
        response = Manager.loginUser(email=getInfo["email"], senha=getInfo["password"])
        if response[-1] == 200:
            return jsonify(access_token=create_access_token(response[0])), response[1]
        return jsonify({"message": response[0]}), response[1]
        
        
   
        
        
    except AssertionError as asser:
        return jsonify({"error":asser}), 400
    
    
    except ValueError as e:
        
        return jsonify({"error":e}), 500


@authRoute.route("/register", methods=["POST"])
def register():
    getInfo = request.get_json()
    try:
        assert 'email' in getInfo, "Required email"
        assert 'password' in getInfo, "Required password"
        assert '@' in getInfo['email'], 'invalid email'
        assert not validation(getInfo['email']), 'invalid temp email'
        assert len(getInfo['password']) > 7, 'invalid password'
        assert 'name' in getInfo, "Required name"
        
        
        response  = Manager.registerUser(email=getInfo['email'], senha=getInfo['password'], name=getInfo['name'])
        return jsonify(access_token=create_access_token(response)), 201
        
    except AssertionError as asser:
        return jsonify({"error":str(asser)}), 400
    
    
    except Exception as e:
        
        return jsonify({"error":str(e)}), 500
    

@authRoute.route("/refresh", methods=["POST"])
@jwt_required()
def refresh():
    getInfo = request.get_json()
   
    return jsonify(access_token=create_access_token(getInfo)), 201