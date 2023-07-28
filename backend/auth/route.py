from flask import Blueprint, request, jsonify
from backend.firebase import mapRealTimeDataBase
from backend.nowTemp import nowTemp


authDefault = Blueprint('Default', __name__)

@authDefault.route("/to-record", methods=["POST"])
def toRecord():
    if request.method =="POST":
        dataStory = request.get_json()
        assert dataStory["nome"], "required nome field"
        assert dataStory["message"], "required message field"
        dataStory["dataCreate"] = nowTemp()
        mapRealTimeDataBase("/timeCapsule").push(dataStory)
        
        return jsonify({"message":"Sua historia foi gravada com succeso!"})
    
@authDefault.route("/getHistory", methods=["GET"])
def getHistory():
    if request.method =="GET":
        
      
        dataStores= mapRealTimeDataBase("/timeCapsule").get()
        
        return jsonify({"message":dataStores})