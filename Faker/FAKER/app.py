from flask import Flask, jsonify, request 
from service.faker import createFakeUser

app = Flask(__name__)


@app.get("/fake/user")
def get_fake_user():
    user = createFakeUser()
    return jsonify(user.__dict__)



if __name__ == "__main__":
    app.run(debug=True)