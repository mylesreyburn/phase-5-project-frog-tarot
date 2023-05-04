COMMIT 1:

* Created all backend files
* Installed all dependencies
* Filled out config.py and set up exports to other files
* Filled out models.py and seed.py
* Initialized database tables: (data in brackets are relationships) (all tables have id, created_at, and updated_at)
    * users - email, username, password_hash (bcrypt'd) [posts, comments]
    * tarots - name, image_url, description, fortune [comments]
    * posts - content, user_id [comments]
    * comments - content, user_id, tarot_id, post_id

COMMIT 2:

* Fleshed out the following API functionality in app.py:
    - /log_in: POST which logs user in
    - /log_out: POST which resets session["u_token"]
    - /sign_up: POST which creates new user and logs them in if email is not already in database
    - /users: GET which returns json of all users
    - /comments: GET which returns json of all comments
    - /tarot: GET which return json of all tarot cards
    - /posts: GET which returns json of all posts
    - /user/<id>: GET which returns json of a specific user (commented out PATCH functionality for the time being)
    - /comment/<id>: GET/PATCH/DELETE which returns json of a specific comment with GET, and allows user to edit/delete comment so long as they're logged in and are the comment's author by using PATCH/DELETE
    - /post/<id>: GET/PATCH which returns json of a specific post with GET, and allows user to edit/delete post so long as they're logged in and are the comment's author by using PATCH/DELETE (also deletes all child comments of post)
    - /tarot/<id>: GET which returns a specific tarot card
    - /comment/new: POST which creates a new Comment and returns success json
    - /post/new: POST which creates a new Post and returns success json


