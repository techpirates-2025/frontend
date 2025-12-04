from model.user_model import User
from config.database import db
from repo.faker_generator import generate_fake_user


def get_or_create_user(user_id: int):
    # ORM: Fetch by primary key
    user = User.query.get(user_id)

    if user:
        return user

    # Create new fake user
    fake_data = generate_fake_user()
    new_user = User(**fake_data)

    db.session.add(new_user)
    db.session.commit()

    return new_user


def get_all_users():
    return User.query.all()


def create_user():
    fake_data = generate_fake_user()
    user = User(**fake_data)
    db.session.add(user)
    db.session.commit()
    return user


def update_user(user_id, data):
    user = User.query.get(user_id)
    if not user:
        return None

    # ORM: Update fields automatically
    for k, v in data.items():
        setattr(user, k, v)

    db.session.commit()
    return user


def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return None

    db.session.delete(user)
    db.session.commit()
    
    return True
