from flask import current_app as app,jsonify,request, render_template
from models import *

@app.route('/')
def home():
    return render_template("index.html")

@app.route("/api/all_users")
def All_Users():
    Users_Json=[]
    try:
        users= User.query.all()
        for user in users:
            data = {}
            data["ID"] = user.id
            data["Roll_No"] = user.roll_no
            data["Name"] = user.name
            data["Level"] = user.education_level
            data["CGPA"] = user.cgpa
            Users_Json.append(data)

        return jsonify(Users_Json)
    except:
        return jsonify({
            "message":"Error in retrieving the Users data"
        }),500
    
@app.route("/api/add/new_user", methods=["POST"])
def Add_User():
    data = request.get_json()
    try:
        new_user= User(roll_no=data["Roll_No"],
                       name=data["Name"],
                       education_level=data["Level"],
                       cgpa=data["CGPA"])
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({
            "message": "New user added successfully"
        })
    except:
        return jsonify({
            "message":"Error in adding new user to the database"
        }),500
        
