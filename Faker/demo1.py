from dataclasses import dataclass
from faker import Faker
from faker.providers import DynamicProvider

fake = Faker()

student_department = DynamicProvider(
    provider_name = "stu_dpt",
    elements=["CSE", "EEE", "ECE", "IT", "MECH"]
)

fake.add_provider(student_department)

@dataclass
class Student:
    stuId: int
    stuName: str
    stuDpt: str

def createFakeStudent():
    return Student(
        stuId=fake.uuid4(),
        stuName=fake.name(),
        stuDpt=fake.stu_dpt()
    )


stu = createFakeStudent()
print(stu)
