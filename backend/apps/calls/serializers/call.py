from django.utils import timezone
from rest_framework import serializers

from calls.models import Call


class CallSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        validated_data[f'{validated_data.get("status")}_at'] = timezone.now()
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
