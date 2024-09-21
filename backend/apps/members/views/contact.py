from rest_framework import generics
from members.serializers.contact import ContactSerializer
from members.models import Contact
from toolkit.views import ListMixin


class ContactListCreateAPIView(ListMixin, generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def get_queryset(self):
        return Contact.objects.filter(member=self.request.user.member)

    def performes_create(self, serializer):
        serializer.save(member=self.request.user.member, created_by=self.request.user)


class ContactDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def get_queryset(self):
        return Contact.objects.filter(member=self.request.user.member)
