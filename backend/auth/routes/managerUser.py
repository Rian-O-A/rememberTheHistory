from flask import Blueprint, request, jsonify
from backend.firebase import Manager
from backend.nowTemp import nowTemp
from flask_jwt_extended import get_jwt_identity, jwt_required


managerUser = Blueprint('Manager user', __name__)
   
# =============================== app route default ===============================

@managerUser.route("/to-record", methods=["POST"]) # route to record user message 
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
        
        return jsonify({"message":"Sua historia foi gravada com succeso!"}), 201
    
@managerUser.route("/history", methods=["GET"]) # route to get user message
@jwt_required()
def getHistoryUser():
    if request.method =="GET":
        infoUser = get_jwt_identity()
        
      
        dataStores= Manager.mapRealTimeDataBase(f"/timeCapsule/{infoUser['uid']}").get()
        
        return jsonify({"message":{"myHistorys":dataStores}}), 200
    
    