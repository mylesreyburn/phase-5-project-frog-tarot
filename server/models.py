from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = (
        "-comments.post",
        "-comments.user",
        "-posts.user.posts",
        "-posts.comments.user",
    )

    # serialize_only = ("id", "email", "posts.comments.id",)

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    email = db.Column(db.String)
    username = db.Column(db.String)
    bio = db.Column(db.String)
    _password_hash = db.Column(db.String)

    posts = db.relationship("Post", backref="user")
    comments = db.relationship("Comment", backref="user")

    # password hashing

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        # utf-8 encoding and decoding is required in python 3
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

class Tarot(db.Model, SerializerMixin):
    __tablename__ = "tarots"

    serialize_rules = (
        "-comments.tarot",
        "-comments.user.comments",
    )

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    name = db.Column(db.String)
    image_url = db.Column(db.String)
    description = db.Column(db.String)
    fortune = db.Column(db.String)

    comments = db.relationship("Comment", backref="tarot")

class Post(db.Model, SerializerMixin):
    __tablename__ = "posts"

    serialize_rules = (
        "-comments.post",
        "-comments.user.comments",
    )

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    title = db.Column(db.String)
    content = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    comments = db.relationship("Comment", backref="post")


class Comment(db.Model, SerializerMixin):
    __tablename__ = "comments"

    serialize_rules = (
        "-user.comments",
        "-tarot.comments",
        "-post.comments",
        "-post.user.comments",
        "-post.user.post.comments"
    )

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    content = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    tarot_id = db.Column(db.Integer, db.ForeignKey("tarots.id"))