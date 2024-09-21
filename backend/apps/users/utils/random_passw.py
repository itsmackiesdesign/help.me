import random
import string


def make_random_password(length=12, use_digits=True, use_uppercase=True, use_punctuation=True):
    characters = string.ascii_lowercase

    if use_digits:
        characters += string.digits
    if use_uppercase:
        characters += string.ascii_uppercase
    if use_punctuation:
        characters += string.punctuation

    password = []
    if use_digits:
        password.append(random.choice(string.digits))
    if use_uppercase:
        password.append(random.choice(string.ascii_uppercase))
    if use_punctuation:
        password.append(random.choice(string.punctuation))

    password += [random.choice(characters) for _ in range(length - len(password))]

    random.shuffle(password)
    return "".join(password)
