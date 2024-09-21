from django.urls import path

from users.views.refresh import RefreshView
from users.views.sign_in import SignInView, SendCodeView
from users.views.sign_out import SignOutView
from users.views.users import UserSettingsView

urlpatterns = [
    path('send-code', SendCodeView.as_view(), name='send-code'),
    path('sign-in', SignInView.as_view(), name='signin'),
    path('refresh', RefreshView.as_view(), name='refresh'),
    path('sign-out', SignOutView.as_view(), name='signout'),
    path('user_settings', UserSettingsView.as_view(), name='user-settings'),
]
