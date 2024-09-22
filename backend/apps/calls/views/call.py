import json
import time

from django.http import StreamingHttpResponse
from rest_framework.generics import GenericAPIView
from django.views import View

from calls.models import Call
from calls.serializers.call import CallSerializer
from toolkit.views import ListMixin, CreateMixin, UpdateMixin, RetrieveMixin
from users.utils.authentication import CustomParamsAuthentication


class CallListViewSet(ListMixin, CreateMixin, GenericAPIView):
    queryset = Call.objects.all()
    serializer_class = CallSerializer


class CallDetailViewSet(RetrieveMixin, UpdateMixin, GenericAPIView):
    queryset = Call.objects.all()
    serializer_class = CallSerializer


class CallEventStreamViewSet(View):
    authentication_classes = (CustomParamsAuthentication,)

    def get(self, request):
        def event_stream():
            while True:
                instance = Call.objects.filter(status=Call.STATUS_CHOICES[0][0])

                if instance:
                    serializer = CallSerializer(instance, many=True)
                    yield "data: %s\n\n" % json.dumps(serializer.data)

                time.sleep(5)

        return StreamingHttpResponse(event_stream(), content_type="text/event-stream")
