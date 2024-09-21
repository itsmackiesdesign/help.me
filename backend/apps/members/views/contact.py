from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from members.serializers.contact import ContactSerializer
from members.models import Contact
from django.shortcuts import get_object_or_404


class ContactListCreateAPIView(APIView):
    def get(self, request):
        contact = get_object_or_404(Contact, user=request.user)
        serializer = ContactSerializer(contact)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ContactSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save(created_by=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ContactDetailAPIVIew(APIView):

    def get(self, request):
        contact = get_object_or_404(Contact, user=request.user)
        serializer = ContactSerializer(contact)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        contact = get_object_or_404(Contact, pk=pk)
        serializer = ContactSerializer(contact, data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        contact = get_object_or_404(Contact, pk=pk)
        contact.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
