from rest_framework import generics

from members.models import Contact
from members.serializers.contact import ContactSerializer
from toolkit.views import ListMixin


class ContactListCreateAPIView(ListMixin, generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def get_queryset(self):
        return Contact.objects.filter(member=self.request.user.member)

    def performs_create(self, serializer):
        serializer.save(member=self.request.user.member, created_by=self.request.user)


class ContactDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def get_queryset(self):
        return Contact.objects.filter(member=self.request.user.member)
