from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from members.serializers.member_serializer import MemberSerializer
from members.models import Member


class MemberListCreate(APIView):
    def get(self, request):
        member = get_object_or_404(Member, user=request.user)
        serializer = MemberSerializer(member)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = MemberSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save(created_by=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, pk):
        member = get_object_or_404(Member, pk=pk)
        serializer = MemberSerializer(member, data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
