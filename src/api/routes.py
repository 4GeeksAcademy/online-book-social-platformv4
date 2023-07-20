"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Profile
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

api = Blueprint('api', __name__)


# login Route-----------------------------------------------------------------------------
@api.route("/login", methods=["POST"])
def create_token():
    if request.method == 'POST':
      email = request.json.get("email", None)
      password = request.json.get("password", None)
      if not email:
          return jsonify({"msg": "Email is required"}), 400
      if not password:
          return jsonify({"msg": "Password is required"}), 400
      user = Users.query.filter_by(email=email).first()
      if not user:
          return jsonify({"msg": "Email/Password are incorrect"}), 401
      if not check_password_hash(user.password, password):
          return jsonify({"msg": "Username/Password are incorrect"}), 401
      # create token
      expiration = datetime.timedelta(days=3)
      access_token = create_access_token(
          identity=user.id, expires_delta=expiration)
      return jsonify(access_token=access_token, user=user.serialize())
    return jsonify(msg="wrong user")
# create user -----------------------------------------------------------------------------------------------------------


@api.route('/createUser', methods=['POST'])
def createUser():
  if request.method == 'POST':
    request_body = request.get_json()
    if not request_body["name"]:
      return jsonify({"msg": "Name is required"}), 400
    if not request_body["email"]:
      return jsonify({"msg": "Email is required"}), 400
    if not request_body["password"]:
      return jsonify({"msg": "Password is required"}), 400
    user = Users.query.filter_by(email=request_body["email"]).first()
    if user:
      return jsonify({"msg": "User already exists"}), 400
    user = Users(
          name=request_body["name"],
          email=request_body["email"],
          password=generate_password_hash(request_body["password"]),
          profession=request_body["profession"],
          bio=request_body["bio"],
          twitter_username=request_body["twitter_username"],
          ig_username=request_body["ig_username"]
      )
    db.session.add(user)
    db.session.commit()
    return jsonify({"created": "Thanks. Your registration was successfully", "status": "true"}), 200


@api.route('/users', methods=['GET'])
def get_all_users():
    users_list = Users.query.all()
    users_serialized = [users.serialize() for users in users_list]
    return jsonify(users_serialized), 200

  # routes for profile page
@api.route("/profile", methods=["POST"])
  # @jwt_required()
def addProfile():
    #  uid= get_jwt_identity()
     request_body= request.get_json(force=True)
     favorite_book=request_body.get("favorite_book")
     favorite_genres=request_body.get("favorite_genres")
     favorite_author=request_body.get("favorite_author")
     number_books_read=request_body.get("number_books_read")
     favorite_quotes=request_body.get("favorite_quote")
     user_id=request_body.get("user_id")
     
     new_profile = Profile(
        favorite_book = favorite_book,
        favorite_genres = favorite_genres,
        favorite_author = favorite_author,
        number_books_read = number_books_read,
        favorite_quotes = favorite_quotes,
        user_id = user_id
     )
     db.session.add(new_profile)
     db.session.commit()
     return jsonify("Profile Created"), 200


  
@api.route("/profile", methods=["GET"])
# @jwt_required()
def getProfile():
  # uid = get_jwt_identity()
  uid = 1
  c_profile = Profile.query.filter_by(user_id=uid).first()

  if c_profile is None:
     return jsonify("Profile doesnt Exist")
     
  return jsonify(c_profile.serialize())


@api.route("/profile", methods=["PUT"])
@jwt_required()
def updateProfile():
   uid = get_jwt_identity()
   profile = profile.query.get(uid)
   data = request.json
   favorite_book = data.get("favorite_book")
   favorite_author = data.get("favorite_author")
   favorite_genres = data.get("favorite_genres")
   number_books_read = data.get("number_books_read")
   favorite_quotes = data.get("favorite_quote")
   if favorite_book is not None:
      profile.favorite_book = favorite_book
   if favorite_author is not None:
      profile.favorite_author = favorite_author
   if favorite_genres is not None:
      profile.favorite_genres = favorite_author
   if number_books_read is not None:
      profile.number_books_read = number_books_read
   if favorite_quotes is not None:
      profile.favorite_quotes = favorite_quotes
   db.session.commit()

   return jsonify(profile.serialize())
