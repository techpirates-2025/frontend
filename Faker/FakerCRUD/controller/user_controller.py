from flask import Blueprint, jsonify, request
from service.user_service import (
    get_or_create_user,
    get_all_users,
    create_user,
    update_user,
    delete_user
)

user_blueprint = Blueprint("user_controller", __name__)


@user_blueprint.get("/users/<int:user_id>")
def get_user(user_id):
    user = get_or_create_user(user_id)
    return jsonify(user.to_dict())


@user_blueprint.get("/users")
def list_users():
    users = get_all_users()
    return jsonify([u.to_dict() for u in users])


@user_blueprint.post("/users")
def create_new_user():
    user = create_user()
    return jsonify(user.to_dict()), 201


@user_blueprint.put("/users/<int:user_id>")
def update_user_route(user_id):
    data = request.json
    updated = update_user(user_id, data)
    if not updated:
        return {"error": "User not found"}, 404
    return jsonify(updated.to_dict())


@user_blueprint.delete("/users/<int:user_id>")
def delete_user_route(user_id):
    result = delete_user(user_id)
    if not result:
        return {"error": "User not found"}, 404
    return {"message": "User deleted successfully"}
