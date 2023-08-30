from flask import Blueprint, request, jsonify
from backend.firebase import Manager
from flask_jwt_extended import jwt_required


authDefault = Blueprint('Default', __name__)

# =============================== app route all default ===============================
@authDefault.route("/history", methods=["GET"]) # route to get user message
@jwt_required()
def getHistoryAll():
    if request.method =="GET":
        dataStores= Manager.mapRealTimeDataBase(f"/timeCapsule").get()
        
        return jsonify({"message":{"historys":dataStores}}), 200