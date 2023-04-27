from flask import request, jsonify, make_response, session

# Local imports
from config import app, db, api
from models import User, Comment, Tarot, Post



if __name__ == '__main__':
    app.run(port=5555, debug=True)
