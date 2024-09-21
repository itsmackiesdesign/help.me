from rest_framework import generics
from members.serializers.member_serializer import MemberSerializer
from members.models import Member
from toolkit.views import ListMixin


class MemberListCreateAPIView(ListMixin, generics.ListCreateAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

    def get_queryset(self):
        return Member.objects.all().order_by('id')

    def perform_create(self, serializer):
        first_name = self.request.data.get('first_name')
        last_name = self.request.data.get('last_name')
        user = self.request.user
        user.first_name = first_name
        user.last_name = last_name
        user.save()
        serializer.save(user=user, created_by=user)


class MemberDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

    def get_queryset(self):
        return Member.objects.filter(user=self.request.user)
