from django.urls import path
from .views.members import MemberListCreateAPIView, MemberDetailAPIView, MemberListCreate
from .views.contact import ContactListCreateAPIView, ContactDetailAPIView

urlpatterns = [
    path('member/', MemberListCreateAPIView.as_view(), name='member-list-create'),
    path('member/<int:pk>/', MemberDetailAPIView.as_view(), name='member-detail'),
    path('contacts/', ContactListCreateAPIView.as_view(), name='contact-list-create'),
    path('contacts/<int:pk>/', ContactDetailAPIView.as_view(), name='contact-detail'),
    path('member-mobile/', MemberListCreate.as_view(), name='member-list-create-mobile'),
]
