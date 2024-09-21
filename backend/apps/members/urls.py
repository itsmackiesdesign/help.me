from django.urls import path
from .views.members import MemberListCreate
from .views.contact import ContactListCreateAPIView, ContactDetailAPIVIew


urlpatterns = [
    path('member/', MemberListCreate.as_view(), name='member-list-create'),
    path('member/<int:pk>/', MemberListCreate.as_view(), name='member-detail'),
    path('contacts/', ContactListCreateAPIView.as_view(), name='contact-list-create'),
    path('contacts/<int:pk>/', ContactDetailAPIVIew.as_view(), name='contact-detail'),
]