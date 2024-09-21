from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.serializers import ModelSerializer

from toolkit.utils.serializers import BaseSerializer
from users.models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email')
        extra_kwargs = {'email': {'read_only': True}}


class SimpleUserSerializer(ModelSerializer):
    # This serializer also was used for generating JWT token.
    class Meta:
        model = User
        fields = ('id', 'phone', 'first_name', 'last_name')
