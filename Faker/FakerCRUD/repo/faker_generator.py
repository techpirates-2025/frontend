from faker import Faker
fake = Faker()

def generate_fake_user():
    return {
        "uuid": fake.uuid4(),
        "name": fake.name(),
        "email": fake.email(),
        "phone": fake.phone_number(),
        "city": fake.city(),
        "age": fake.random_int(min=18, max=60)
    }
