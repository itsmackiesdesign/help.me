import random
import uuid
from datetime import timedelta

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

from toolkit.models import BaseModel
from django.db import models

from users.querysets.confirmation import ConfirmationQuerySet
from users.querysets.token import TokenQuerySet
from users.querysets.user import UsersManager
from users.utils import tokens
from users.utils.fields import expires_default


class User(AbstractUser):
    phone = models.CharField(max_length=12, unique=True, blank=True, null=True)  # format 998913101010
    confirmation_code = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    verified_at = models.DateTimeField(null=True, blank=True)
    objects = UsersManager()

    class Meta(AbstractUser.Meta):
        db_table = 'user_users'
        app_label = 'users'


class Token(models.Model):
    key = models.CharField(max_length=500, unique=True)
    refresh = models.CharField(max_length=500, unique=True, default=tokens.generate)
    is_active = models.BooleanField("Активен", default=True)
    user = models.ForeignKey(User, models.CASCADE, related_name='tokens')
    expires_at = models.DateTimeField(default=expires_default)  # token expires in 30 days
    created_at = models.DateTimeField(auto_now_add=True, editable=False, null=True)

    objects = TokenQuerySet.as_manager()

    def __str__(self):
        return self.key

    class Meta:
        db_table = 'user_tokens'


class ConfirmationCode(BaseModel):
    phone = models.CharField(max_length=12, verbose_name='Номер телефона')
    user = models.ForeignKey("users.User", models.CASCADE, verbose_name='Пользователь')
    code = models.CharField(max_length=20, verbose_name='Код подтверждения')
    is_used = models.BooleanField(default=False, verbose_name='Был использован?')
    expires_at = models.DateTimeField(verbose_name='Срок действия')

    objects = ConfirmationQuerySet.as_manager()

    def save(self, *args, **kwargs):
        self.code = str(random.randint(10000, 99999)) if settings.SEND_CONFIRMATION_SMS else "00000"
        self.expires_at = timezone.now() + timedelta(hours=2)
        return super().save(*args, **kwargs)

    def send_code(self):
        message = f" Код для входа: {self.code}"
        # send_sms(self.phone, f"azb{self.id}cmfr", message)

    def __str__(self):
        return self.code

    class Meta:
        get_latest_by = 'id'
        db_table = 'users_confirmation_codes'
        verbose_name = 'Код подтверждения'
        verbose_name_plural = 'Коды подтверждения'
