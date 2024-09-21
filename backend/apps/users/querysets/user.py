from datetime import timedelta

from django.contrib.auth.models import UserManager as BaseUserManager
from django.db.models import Q
from django.utils import timezone


class UsersManager(BaseUserManager):
    ...
