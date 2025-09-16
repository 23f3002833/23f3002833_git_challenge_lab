from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy() # Instance of SQLAlchemy to manage the database

class User(db.Model): # Parent 1
    id = db.Column(db.Integer,primary_key = True)
    roll_no =db.Column(db.String(),nullable = False,unique = True, default = "Pending")
    name = db.Column(db.String(),nullable = False)
    education_level = db.Column(db.String(),nullable=False)
    cgpa = db.Column(db.Double, nullable = False, default=0.0)