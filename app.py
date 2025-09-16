from flask import Flask
from models import *
from config import LocalDevelopmentConfig

def create_app():

    app = Flask(__name__)    
    
    app.config.from_object(LocalDevelopmentConfig)
    db.init_app(app)         # Through this we connect our app to the database object
        
    app.app_context().push()    # This is utilised by app.py to interact with other files
    
    return app

app = create_app()

def init_database():
    db.create_all()
    if User.query.count() == 0:
        admin = User(id=0,
                     roll_no="@@@@@@@@",
                     name="Tester",
                     education_level="_______",
                     cgpa=0.0)
        db.session.add(admin)
        db.session.commit()

with app.app_context():
    init_database()

from controllers.routes import *

#Debugger
if __name__ == "__main__":
    app.run(debug=True)