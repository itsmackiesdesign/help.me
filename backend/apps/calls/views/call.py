from rest_framework.generics import GenericAPIView

from calls.models import Call
from calls.serializers.call import CallSerializer
from toolkit.views import ListMixin, CreateMixin, UpdateMixin, RetrieveMixin


class CallListViewSet(ListMixin, CreateMixin, GenericAPIView):
    queryset = Call.objects.all()
    serializer_class = CallSerializer


class CallDetailViewSet(RetrieveMixin, UpdateMixin, GenericAPIView):
    queryset = Call.objects.all()
    serializer_class = CallSerializer
