from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), unique=False, nullable=False)
    email = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(250), unique=False, nullable=False)
    profession = db.Column(db.String(250), unique=False, nullable=True)
    bio = db.Column(db.String(500), unique=False, nullable=True)
    twitter_username = db.Column(db.String(250), unique=False, nullable=True)
    ig_username = db.Column(db.String(250), unique=False, nullable=True)
    profile = db.relationship("Profile")

    # discussions = db.relationship("Discussions", backref="created_by")

    def __repr__(self):
        return f'<Users {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "profession": self.profession,
            "bio": self.bio,
            "twitter_username": self.twitter_username,
            "ig_username": self.ig_username,
            
            # do not serialize the password, its a security breach
        }


class Discussions(db.Model):
    __tablename__ = "discussions"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_by = db.relationship(
        "Users", backref="discussions", foreign_keys=[user_id])
    discussion = db.Column(db.String(500), unique=False, nullable=False)

    def __repr__(self):
        return f'<Discussions {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "created_by": self.created_by.serialize(),
            "discussion": self.discussion,
            # do not serialize the password, its a security breach
        }


class Profile(db.Model):
    __tablename__ = "profile"
    id = db.Column(db.Integer, primary_key=True)
    favorite_book = db.Column(db.String(250), unique=False, nullable=True)
    favorite_genres = db.Column(db.String(250), unique=False, nullable=True)
    favorite_author = db.Column(db.String(250), unique=False, nullable=True)
    number_books_read = db.Column(db.String(250), unique=False, nullable=True)
    favorite_quotes = db.Column(db.String(250), unique=False, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))


        

    def __repr__(self):
        return f'<Profile {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "favorite_book": self.favorite_book,
            "favorite_genres": self.favorite_genres,
            "favorite_author": self.favorite_author,
            "number_books_read": self.number_books_read,
            "favorite_quotes": self.favorite_quotes
            # "user_id": self.user_id
        
        }
