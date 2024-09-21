from django.urls import path

from calls.views.call import CallListViewSet, CallDetailViewSet

urlpatterns = [
    path("call/", CallListViewSet.as_view(), name="call-list"),
    path("call/<int:pk>", CallDetailViewSet.as_view(), name="call-detail"),
]
