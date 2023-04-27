COMMIT 1:

* Created all backend files
* Installed all dependencies
* Filled out config.py and set up exports to other files
* Filled out models.py and seed.py
* Initialized database tables: (data in brackets are relationships)
                               (all tables have id, created_at, and updated_at)
    * users - email, username, password_hash (bcrypt'd) [posts, comments]
    * tarots - name, image_url, description, fortune [comments]
    * posts - content, user_id [comments]
    * comments - content, user_id, tarot_id, post_id