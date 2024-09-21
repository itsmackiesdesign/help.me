from rest_framework.generics import UpdateAPIView
from users.serializers.users import UserSerializer


class UserSettingsView(UpdateAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
