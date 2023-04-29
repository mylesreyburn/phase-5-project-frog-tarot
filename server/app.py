from flask import request, jsonify, make_response, session

# Local imports
from config import app, db, api
from models import User, Comment, Tarot, Post

# Secret key
app.secret_key = b'\x89\x8eo\xe3*\x13\xcf!\t\xf0I\xc6'

# Log In, Log Out, and Sign Up

@app.route("/log_in", methods=["POST"])
def log_in():
    email = request.json.get("email")
    password = request.json.get("password")

    user = User.query.filter_by(email=email).first()

    if not user:
        response = make_response(
            jsonify({
            "error": "404: Email not found"
            }),
            404
        )
        return response

    if not user.authenticate(password):
        response = make_response(
            jsonify({
            "error": "403: Invalid password"
            }),
            403
        )
        return response
    
    session["u_token"] = user.id
    
    response = make_response(
        jsonify({
            "success" : "200: Successfully signed in"
        }),
        200
    )

    return response

@app.route("/log_out", methods=["POST"])
def log_out():
    try:
        session["u_token"] = None
    except:
        response = make_response(
            jsonify({
                "error": "400: Error logging out"
            }),
            400
        )
        return response
    
    response = make_response(
        jsonify({
            "success": "200: Successfully logged out user"
        })
    )
    return response

@app.route("/sign_up", methods=["POST"])
def sign_up():
    email = request.json.get("email")
    username = request.json.get("username")
    password = request.json.get("password")
    
    user_exists = User.query.filter_by(email=email).first() is not None

    if not email or not username or not password:
        response = make_response(
            jsonify({
                "error": "400: Cannot create user: Missing required attributes"
            }),
            400
        )
        return response

    if user_exists:
        response = make_response(
            jsonify({
                "error": "400: User already exists with that email"
            }),
            400
        )
        return response
    
    new_user = User(
        email=email,
        username=username,
        password_hash=password
    )

    if not new_user:
        response = make_response(
            jsonify({
                "error": "400: Error during user creation"
            }),
            400
        )
        return response
    
    db.session.add(new_user)
    db.session.commit()

    session["u_token"] = new_user.id

    response = make_response(
        jsonify({
            "success": "201: User signed up successfully."
        })
    )

    return response

@app.route("/users")
def users():
    all_users = User.query.all()
    dict_list = []
    for user in all_users:
        dict_user = user.to_dict()
        dict_list.append(dict_user)
    
    response = make_response(
        jsonify(dict_list),
        200
    )

    return response

@app.route("/tarots")
def tarots():
    all_tarots = Tarot.query.all()
    dict_list = []
    for tarot in all_tarots:
        dict_tarot = tarot.to_dict()
        dict_list.append(dict_tarot)
    
    response = make_response(
        jsonify(dict_list),
        200
    )

    return response

@app.route("/posts")
def posts():
    all_posts = Post.query.all()
    dict_list = []
    for post in all_posts:
        dict_post = post.to_dict()
        dict_list.append(dict_post)
    
    response = make_response(
        jsonify(dict_list),
        200
    )

    return response

@app.route("/comments")
def comments():
    all_comments = Comment.query.all()
    dict_list = []
    for comment in all_comments:
        dict_comment = comment.to_dict()
        dict_list.append(dict_comment)
    
    response = make_response(
        jsonify(dict_list),
        200
    )

    return response

#@app.route("/user/<int:id>", methods=["GET", "PATCH"])
@app.route("/user/<int:id>")
def user_by_id(id):
    user = User.query.filter_by(id=id).first()
    if not user:
        response = make_response(
            jsonify({
            "error": "404: User Not Found"
            }),
            404
        )
        return response

    # GET METHOD
    if request.method == "GET":
        user_dict = user.to_dict()
        response = make_response(
            jsonify(user_dict),
            200
        )
        return response

    # # PATCH METHOD
    # if request.method == "PATCH":
    #     if session["u_token"] != user.id:
    #         response = make_response(
    #             jsonify({
    #                 "error": "403: Forbidden"
    #             }),
    #             403
    #         )
    #         return response
    #     new_email = request.json.get("email")
    #     new_username = request.json.get("username")

    #     if new_email != None:
    #         setattr(user, "email", new_email)
    #     if new_username != None:
    #         setattr(user, "username", new_username)
    #     db.session.commit()
    #     user_dict = user.to_dict()
    #     response = make_response(
    #         jsonify(user_dict),
    #         200
    #     )
    #     return response
    
@app.route("/comment/<int:id>", methods=["GET", "PATCH", "DELETE"])
def comment_by_id(id):
    comment = Comment.query.filter_by(id=id).first()
    if not comment:
        response = make_response(
            jsonify({
            "error": "404: Comment Not Found"
            }),
            404
        )
        return response

    # GET METHOD
    if request.method == "GET":
        comment_dict = comment.to_dict()
        response = make_response(
            jsonify(comment_dict),
            200
        )
        return response

    # PATCH METHOD
    if request.method == "PATCH":
        if session["u_token"] != comment.user.id:
            response = make_response(
                jsonify({
                    "error": "403: Forbidden"
                }),
                403
            )
            return response
        new_content = request.json.get("content")

        if new_content != None:
            setattr(comment, "contents", new_content)
        db.session.commit()
        comment_dict = comment.to_dict()
        response = make_response(
            jsonify(comment_dict),
            200
        )
        return response
    
    # DELETE METHOD
    if request.method == "DELETE":
        if session["u_token"] != comment.user.id:
            response = make_response(
                jsonify({
                    "error": "403: Forbidden"
                }),
                403
            )
            return response
        db.session.delete(comment)
        db.session.commit()

        response = make_response(
            jsonify({
                "success": "200: Comment Deleted Successfully."
            }),
            200
        )
        return response
    
@app.route("/post/<int:id>", methods=["GET", "PATCH", "DELETE"])
def post_by_id(id):
    post = Post.query.filter_by(id=id).first()
    if not post:
        response = make_response(
            jsonify({
            "error": "404: Post Not Found"
            }),
            404
        )
        return response
    
    # GET METHOD
    if request.method == "GET":
        post_dict = post.to_dict()
        response = make_response(
            jsonify(post_dict),
            200
        )
        return response

    # PATCH METHOD
    if request.method == "PATCH":
        if session["u_token"] != post.user.id:
            response = make_response(
                jsonify({
                    "error": "403: Forbidden"
                }),
                403
            )
            return response
        new_content = request.json.get("content")

        if new_content != None:
            setattr(post, "contents", new_content)
        db.session.commit()
        post_dict = post.to_dict()
        response = make_response(
            jsonify(post_dict),
            200
        )
        return response
    
    # DELETE METHOD
    if request.method == "DELETE":
        # if session["u_token"] != post.user.id:
        #     response = make_response(
        #         jsonify({
        #             "error": "403: Forbidden"
        #         }),
        #         403
        #     )
        #     return response
        for comment in post.comments:
            db.session.delete(comment)
        db.session.delete(post)
        db.session.commit()

        response = make_response(
            jsonify({
                "success": "200: Post and Child Comments Deleted Successfully."
            }),
            200
        )
        return response
        
@app.route("/tarot/<int:id>")
def get_tarot_by_id(id):
    tarot = Tarot.query.filter_by(id=id).first()
    if not tarot:
        response = make_response(
            jsonify({
            "error": "404: Tarot Not Found"
            }),
            404
        )
        return response
    
    tarot_dict = tarot.to_dict()
    response = make_response(
        jsonify(tarot_dict),
        200
    )
    return response

# POST FUNCTIONS

@app.route("/comment/new", methods=["POST"])
def new_comment():
    if not session["u_token"]:
        response = make_response(
            jsonify({
                "error": "403: Must be logged in in order to leave comments."
            }),
            403
        )
        return response

    user_id = request.json.get("user_id")
    tarot_id = request.json.get("tarot_id")
    post_id = request.json.get("post_id")
    content = request.json.get("content")

    new_comment = Comment(
        user_id=user_id,
        tarot_id=tarot_id,
        post_id=post_id,
        content=content
    )

    if not new_comment:
        response = make_response(
            jsonify({
                "error": "400: Invalid Comment."
            }),
            400
        )
        return response
    
    db.session.add(new_comment)
    db.session.commit()

    response = make_response(
        jsonify({
            "success": "201: Comment Created Successfully."
        })
    )

    return response

@app.route("/post/new", methods=["POST"])
def new_post():
    if not session["u_token"]:
        response = make_response(
            jsonify({
                "error": "403: Must be logged in in order to leave posts."
            }),
            403
        )
        return response

    user_id = request.json.get("user_id")
    content = request.json.get("content")

    new_post = Post(
        user_id=user_id,
        content=content
    )

    if not new_post:
        response = make_response(
            jsonify({
                "error": "400: Invalid Comment."
            }),
            400
        )
        return response
    
    db.session.add(new_post)
    db.session.commit()

    response = make_response(
        jsonify({
            "success": "201: Comment Created Successfully."
        })
    )

    return response


if __name__ == '__main__':
    app.run(port=5555, debug=True)
