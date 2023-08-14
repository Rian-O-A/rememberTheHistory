from flask import Blueprint, request, jsonify
from backend.firebase import Manager
from backend.nowTemp import nowTemp
from backend.auth.emails import validation
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required


authRoute = Blueprint('Auth', __name__)
authDefault = Blueprint('Default', __name__)



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
            return jsonify({"message": {"token":create_access_token(response[0])}}), response[1]
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
        
        return jsonify({"message":{"token": create_access_token(response)}}), 201
        
    except AssertionError as asser:
        return jsonify({"error":str(asser)}), 400
    
    
    except Exception as e:
        
        return jsonify({"error":str(e)}), 500
    

# =============================== app route default ===============================

@authDefault.route("/to-record", methods=["POST"]) # route to record user message 
@jwt_required()
def toRecord():
    if request.method =="POST":
        infoUser = get_jwt_identity()
        dataStory = request.get_json()
        dataStory["nome"] = infoUser["displayName"]
        assert dataStory["message"], "required message field"
        dataStory["dataCreate"] = nowTemp()
        dataStory["key"] = infoUser['uid']
        Manager.mapRealTimeDataBase(f"/timeCapsule/{infoUser['uid']}").set(dataStory)
        
        return jsonify({"message":"Sua historia foi gravada com succeso!"})
    
@authDefault.route("/user/history", methods=["GET"]) # route to get user message
@jwt_required()
def getHistoryUser():
    if request.method =="GET":
        infoUser = get_jwt_identity()
        
      
        dataStores= Manager.mapRealTimeDataBase(f"/timeCapsule/{infoUser['uid']}").get()
        
        return jsonify({"message":{"myHistorys":dataStores}})
    
    
@authDefault.route("/all/history", methods=["GET"]) # route to get user message
@jwt_required()
def getHistoryAll():
    if request.method =="GET":
        dataStores= Manager.mapRealTimeDataBase(f"/timeCapsule").get()
        
        return jsonify({"message":{"historys":dataStores}})