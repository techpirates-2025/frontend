from faker import Faker
from model.user import User

fake = Faker()

def createFakeUser():
    return User(
        id=fake.uuid4(),
        name=fake.name(),
        email=fake.email(),
        phone=fake.phone_number(),
        city=fake.city(),
        age=fake.random_int(min=18, max=60)
    )