from django.urls import path

from calls.views.call import CallListViewSet, CallDetailViewSet, CallEventStreamViewSet
from calls.views.stream import StartStreamAPIView, GetStreamTokenAPIView, EndStreamAPIView

urlpatterns = [
    path("call/", CallListViewSet.as_view(), name="call-list"),
    path("call/<int:pk>", CallDetailViewSet.as_view(), name="call-detail"),
    path("call/start_stream/<int:pk>", StartStreamAPIView.as_view(), name="start_stream"),
    path("call/join-stream-student/<int:pk>/", GetStreamTokenAPIView.as_view(), name="get_stream_token"),
    path("call/end_stream/<int:pk>", EndStreamAPIView.as_view(), name="end_stream"),
    path("call-event-stream/", CallEventStreamViewSet.as_view(), name="call-event-stream"),
]
