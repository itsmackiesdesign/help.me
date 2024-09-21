from rest_framework import serializers
from members.models import Contact


class ContactSerializer(serializers.ModelSerializer):
    member = serializers.PrimaryKeyRelatedField(read_only=True)

    def validate_phone(self, value):
        if not value.startswith('998'):
            raise serializers.ValidationError('Phone number must start with 998')
        if len(value) != 12:
            raise serializers.ValidationError('Phone number must be 12 characters long')

        return value

    def validate_full_name(self, value):
        if len(value) < 3:
            raise serializers.ValidationError('Full name must be at least 3 characters long')

        return value

    def create(self, validated_data):
        member = self.context['request'].user.member
        created_by = self.context['request'].user
        contact = Contact.objects.create(member=member, created_by=created_by, **validated_data)
        return contact

    def update(self, instance, validated_data):
        instance.full_name = validated_data.get('full_name', instance.full_name)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.relationship = validated_data.get('relationship', instance.relationship)
        instance.save()
        return instance

    def delete(self, instance):
        instance.delete()

    class Meta:
        model = Contact
        fields = ['id', 'full_name', 'phone', 'relationship', 'member']
