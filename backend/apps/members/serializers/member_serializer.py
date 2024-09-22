from rest_framework import serializers
from members.models import Member
from members.serializers.contact import ContactSerializer
from users.serializers.users import SimpleUserSerializer


class MemberSerializer(serializers.ModelSerializer):
    user = SimpleUserSerializer(read_only=True)
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)

    def create(self, validated_data):
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')

        user = self.context['request'].user

        user.first_name = first_name
        user.last_name = last_name
        user.save()

        validated_data.pop('user', None)

        member = Member.objects.create(user=user, **validated_data)

        return member

    class Meta:
        model = Member
        fields = ['id', 'birthdate', 'address', 'extra', 'user', 'first_name', 'last_name']


class MemberDetailSerializer(serializers.ModelSerializer):
    user = SimpleUserSerializer(read_only=True)
    contacts = ContactSerializer(many=True, read_only=True, source='contact_set')

    class Meta:
        model = Member
        fields = ['id', 'birthdate', 'address', 'extra', 'user', 'contacts']
