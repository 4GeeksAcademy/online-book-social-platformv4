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

    discussions = db.relationship("Discussion", back_populates="created_by", foreign_keys='Discussion.user_id')
    comments = db.relationship("Comment", back_populates="created_by", foreign_keys='Comment.user_id')

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


class Discussion(db.Model):
    __tablename__= 'discussions'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256), unique=False, nullable=False)
    discussion = db.Column(db.String(500), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_by = db.relationship("Users", back_populates="discussions", foreign_keys=[user_id])
    disc_comments = db.relationship('Comment', backref='discussion', lazy=True)
    def __repr__(self):
        return f'<Discussion {self.id}>'
    def serialize(self):
        serialized_data = {
            "id": self.id,
            "title": self.title,
            "discussion": self.discussion,
            "createdBy": self.created_by.serialize(),
            "comments": []
        }
        serialized_comments = []
        visited_comments = set()
        for comment in self.disc_comments:
            if comment.parent_id is None:
                serialized_comment = comment.serialize()
                serialized_comments.append(serialized_comment)
                visited_comments.add(comment.id)
                self.serialize_child_comments(comment, serialized_comment, visited_comments)
        serialized_data["comments"] = serialized_comments
        return serialized_data
    def serialize_child_comments(self, comment, serialized_comment, visited_comments):
        for child_comment in comment.children:
            if child_comment.id not in visited_comments:
                serialized_child_comment = child_comment.serialize()
                serialized_comment["children"].append(serialized_child_comment)
                visited_comments.add(child_comment.id)
                self.serialize_child_comments(child_comment, serialized_child_comment, visited_comments)

class Comment(db.Model):
    __tablename__='comments'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    discussion_id = db.Column(db.Integer, db.ForeignKey("discussions.id"), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=True)
    comment = db.Column(db.String(500), unique=False, nullable=False)
    created_by = db.relationship("Users", back_populates="comments", foreign_keys=[user_id])
    children = db.relationship('Comment', backref=db.backref('parent', remote_side=[id]))
    def __repr__(self):
        return f'<Comment {self.id}>'
    def serialize(self):
        return {
            "id": self.id,
            "discussion_id": self.discussion_id,
            'createdBy': self.created_by.serialize(),
            "parent_id": self.parent_id,
            'comment' : self.comment,
            'children': []
        }


class Profile(db.Model):
    __tablename__ = "profile"
    id = db.Column(db.Integer, primary_key=True)
    favorite_book = db.Column(db.String(250), unique=False, nullable=True)
    favorite_genres = db.Column(db.String(250), unique=False, nullable=True)
    favorite_author = db.Column(db.String(250), unique=False, nullable=True)
    number_books_read = db.Column(db.String(250), unique=False, nullable=True)
    favorite_quotes = db.Column(db.String(250), unique=False, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)


        

    def __repr__(self):
        return f'<Profile {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "favorite_book": self.favorite_book,
            "favorite_genres": self.favorite_genres,
            "favorite_author": self.favorite_author,
            "number_books_read": self.number_books_read,
            "favorite_quotes": self.favorite_quotes,
            "user_id": self.user_id
        
        }
