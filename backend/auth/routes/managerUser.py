from flask import Blueprint, request, jsonify
from backend.firebase import Manager
from backend.nowTemp import nowTemp
from flask_jwt_extended import get_jwt_identity, jwt_required


managerUser = Blueprint('Manager user', __name__)
   
# =============================== app route default ===============================

@managerUser.route("/infor", methods=["GET"])
@jwt_required()
def inforUsers():
    
    if request.method == "GET":
        try:
            inforUser = get_jwt_identity()
         
            response = Manager.infoUser(inforUser["uid"])
            
            if response[-1] == 200:
                return jsonify({"message":{"data":response[0], "code":200}}), 200
        except Exception as e:
            
            return jsonify({"error":"INTERNAL ERROR"}), 500


@managerUser.route("/to-record", methods=["POST"]) # route to record user message 
@jwt_required()
def toRecord():
    
    infoUser = get_jwt_identity()
    dataStory = request.get_json()
    dataStory["nome"] = infoUser["displayName"]
    assert dataStory["message"], "required message field"
    dataStory["dataCreate"] = nowTemp()
    dataStory["key"] = infoUser['uid']
    Manager.mapRealTimeDataBase(f"/timeCapsule/{infoUser['uid']}").set(dataStory)
    
    return jsonify({"message":"Sua historia foi gravada com succeso!"}), 201
    
@managerUser.route("/history", methods=["GET"]) # route to get user message
@jwt_required()
def getHistoryUser():
    
    infoUser = get_jwt_identity()
    
    
    dataStores= Manager.mapRealTimeDataBase(f"/timeCapsule/{infoUser['uid']}").get()
    
    return jsonify({"message":{"myHistorys":dataStores}}), 200
    

@managerUser.route("/history", methods=["DELETE"])
@jwt_required()
def deleteMessage():
    
    
    try:
        infoUser = get_jwt_identity()
        
        Manager.mapRealTimeDataBase(f'/timeCapsule/{infoUser["uid"]}').delete()
        
        return jsonify({"message":{"return":"DELETE", "code":201}}), 201
    except Exception as e:
        
        return jsonify({"error":"INTERNAL ERROR"}), 500