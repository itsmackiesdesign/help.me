from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from getstream import Stream
from django.conf import settings

from calls.models import Call

from users.models import User

stream_client = Stream(api_key=settings.STREAM_API_KEY, api_secret=settings.STREAM_API_SECRET)


class StartStreamAPIView(APIView):
    def put(self, request, pk):
        call = get_object_or_404(Call, pk=pk)
        call_response = stream_client.video.call('default', f"call_{pk}")
        user_id = f"id_{call.member.id}_{call.member.user.phone}"
        token = stream_client.create_token(user_id)
        call_id = call_response.id
        call.call_id = call_id
        call.save()
        return Response({"call_id": call_id, "token": token, "user_id": user_id}, 201)


class EndStreamAPIView(APIView):
    def put(self, request, pk):
        call = get_object_or_404(Call, pk=pk)
        if not call.call_id:
            return Response({"error": "Call does not exist"}, 400)

        stream_client.video.call('default', call.call_id).end()
        call.save()
        return Response(status=status.HTTP_200_OK)


class GetStreamTokenAPIView(APIView):
    def post(self, request, pk):
        call = get_object_or_404(Call, pk=pk)
        user = User.objects.filter(phone=request.user).first()
        user_id = f"id_{user.id}_{user.phone}"
        token = stream_client.create_token(user_id)
        return Response({"call_id": call.call_id, "token": token, "user_id": user_id}, 201)
