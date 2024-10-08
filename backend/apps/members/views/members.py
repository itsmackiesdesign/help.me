from rest_framework import generics
from rest_framework.generics import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend

from members.serializers.member_serializer import MemberSerializer, MemberDetailSerializer
from members.models import Member
from toolkit.views import ListMixin


class MemberListCreateAPIView(ListMixin, generics.ListCreateAPIView):
    serializer_class = MemberSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id']

    def get_queryset(self):
        return Member.objects.all()

    def perform_create(self, serializer):
        first_name = self.request.data.get('first_name')
        last_name = self.request.data.get('last_name')
        user = self.request.user
        user.first_name = first_name
        user.last_name = last_name
        user.save()
        serializer.save(user=user, created_by=user)


class MyMemberAPIView(generics.RetrieveAPIView):
    serializer_class = MemberSerializer
    queryset = Member.objects.all()

    def get_object(self):
        return get_object_or_404(Member, user=self.request.user)


class MemberDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = Member.objects.all()
    serializer_class = MemberDetailSerializer

    def get_object(self):
        return get_object_or_404(Member, pk=self.kwargs.get('pk'))
