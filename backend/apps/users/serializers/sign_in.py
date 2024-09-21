from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from toolkit.utils.serializers import BaseSerializer
from users.models import ConfirmationCode


class SendCodeSerializer(BaseSerializer):
    phone = serializers.CharField(required=True, max_length=12, min_length=12, trim_whitespace=True)


class SignInSerializer(BaseSerializer):
    phone = serializers.CharField(required=True, max_length=12, min_length=12, trim_whitespace=True)
    code = serializers.CharField(required=True, trim_whitespace=False)

    def validate(self, data):
        confirmation = ConfirmationCode.objects.verify(data.get('phone'), data.get('code'))

        if not confirmation:
            raise ValidationError({'code': "Неверный код подтверждения"})

        if not confirmation.user.is_active:
            raise ValidationError('Пользователь не активен', code='authorization')

        data['user'] = confirmation.user
        return data
