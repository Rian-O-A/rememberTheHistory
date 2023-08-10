from flask import Blueprint, request, jsonify
from backend.firebase import Manager
from backend.nowTemp import nowTemp
from backend.auth.emails import validation


authRoute = Blueprint('Auth', __name__)
authDefault = Blueprint('Default', __name__)



# =========================== authetication user ==============================
@authRoute.route("/login", methods=["POST"])
def login():
    getInfo = request.get_json()
    try:
        assert 'email' in getInfo, "Required email"
        assert 'passowrd' in getInfo, "Required passowrd"
        assert '@' in getInfo['email'] or not validation(getInfo['email']), 'invalid email'
        
        
   
        
        
    except AssertionError as asser:
        return jsonify({"error":asser}), 400
    
    
    except ValueError as e:
        
        return jsonify({"error":e}), 500


@authRoute.route("/register", methods=["POST"])
def register():
    getInfo = request.get_json()
    try:
        assert 'email' in getInfo, "Required email"
        assert 'passowrd' in getInfo, "Required passowrd"
        assert '@' in getInfo['email'] or not validation(getInfo['email']), 'invalid email'
        assert len(getInfo['senha']) > 7, 'invalid password'
        assert 'nome' in getInfo, "Required nome"
        
        Manager.registerUser(email=getInfo['email'], senha=getInfo['senha'], nome=getInfo['nome'])
        
        return jsonify({"message":"user created successfully"}), 201
        
    except AssertionError as asser:
        return jsonify({"error":asser}), 400
    
    
    except ValueError as e:
        
        return jsonify({"error":e}), 500
    

# =============================== app route default ===============================

@authDefault.route("/to-record", methods=["POST"]) # route to record user message 
def toRecord():
    if request.method =="POST":
        dataStory = request.get_json()
        assert dataStory["nome"], "required nome field"
        assert dataStory["message"], "required message field"
        dataStory["dataCreate"] = nowTemp()
        Manager.mapRealTimeDataBase("/timeCapsule").push(dataStory)
        
        return jsonify({"message":"Sua historia foi gravada com succeso!"})
    
@authDefault.route("/getHistory", methods=["GET"]) # route to get user message

def getHistory():
    if request.method =="GET":
        
      
        dataStores= Manager.mapRealTimeDataBase("/timeCapsule").get()
        
        return jsonify({"message":dataStores})