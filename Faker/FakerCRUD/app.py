from flask import Flask
from config.database import db
from controller.user_controller import user_blueprint

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    db.create_all()

app.register_blueprint(user_blueprint)

if __name__ == "__main__":
    app.run(debug=True)
