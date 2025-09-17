from flask import current_app as app,jsonify,request, render_template
from models import *
import matplotlib.pyplot as plt

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
        
def User_summary_record():
    data = {}
    colours = ['#6495ED','#F08080', '#9FE2BF', '#FFA07A', '#CCCCFF','#e59866','#a569bd']
    set_colour = []
    flag = 0
    try:
        all_users = User.query.all()        

        for user in all_users:
            
            level = user.education_level

            if level not in data:
                data[level] = 1

                if flag <= len(colours):                 # Setting alternative colours of the bars
                    set_colour.append(colours[flag])
                    flag += 1
                else:
                    flag = 0
                    set_colour.append(colours[flag])

            else:
                data[level] += 1
        
        return [data,set_colour]
    
    except:
        print("Error in generating User summary record.") 



@app.route("/user/api/get_summary_data")
def user_summary_data():

    try:
        data = User_summary_record()
        print(data)
        if data == [{},[]]:
            return jsonify({
                "message":"No data found"
            }),404

        categories = data[0].keys()
        values = data[0].values()

        # Create the figure and axis
        fig, ax = plt.subplots(figsize=(8, 6))

        bar_colors = data[1]
        # Plot the bars
        bars = ax.bar(categories, values, color=bar_colors)

        # Add value labels to the bars
        ax.bar_label(bars, padding=3)

        # Set axis labels and title
        ax.set_xlabel('Level', fontsize=14, fontweight='bold')
        ax.set_ylabel('Number of Registrations', fontsize=14, fontweight='bold')
        ax.set_title("Summary of different levels", fontsize=16)

        # Save the chart as a file; change the path as needed
        plt.savefig(f"./static/Pictures/Summary_chart", dpi=300, bbox_inches='tight')
        plt.close()  # Closes the plot to free up memory

        return jsonify({
            "message": "Summary data chart created successfully"
        })
    
    except:
        return jsonify({
            "message": "Error in creating summary data chart"
        }),500