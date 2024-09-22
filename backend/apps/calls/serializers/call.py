from django.utils import timezone
from rest_framework import serializers

from calls.models import Call
from members.serializers.member_serializer import MemberSerializer


class CallSerializer(serializers.ModelSerializer):
    member = MemberSerializer(read_only=True)

    def create(self, validated_data):
        validated_data[f'{validated_data.get("status")}_at'] = timezone.now()
        validated_data['member'] = self.context['request'].user.member
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data[f'{validated_data.get("status")}_at'] = timezone.now()
        return super().update(instance, validated_data)

    class Meta:
        model = Call
        fields = (
            "id",
            "member",
            "status",
            "initiated_at",
            "longitude",
            "latitude",
            "called_at",
            "canceled_at",
            "ambulance_requested_at",
            "finished_at",
        )
