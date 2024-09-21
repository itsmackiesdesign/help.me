from django.conf import settings
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from toolkit.utils.helpers import integers_only
from toolkit.utils.security import AntiPerDayThrottle, AntiPerMinuteThrottle
from toolkit.utils.session import get_session
from users.models import User, ConfirmationCode
from users.serializers.sign_in import SignInSerializer, SendCodeSerializer
from users.utils.authentication import sign_in_response
from order.models import CartItem, Wish


class SendCodeView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = SendCodeSerializer
    throttle_key = 'sign_in'

    def get_throttles(self):
        return [AntiPerDayThrottle(), AntiPerMinuteThrottle()] if settings.SEND_CONFIRMATION_SMS else []

    def post(self, request):
        data = self.serializer_class.check(request)
        phone = integers_only(data['phone'])
        user, _ = User.objects.get_or_create(phone=phone, defaults={
            'username': phone,
            'password': User.objects.make_random_password(),
        })
        confirmation = ConfirmationCode.objects.create(user=user, phone=data['phone'], created_by=user)
        confirmation.send_code()
        return Response({"detail": "Код подтверждения отправлен на указанный номер телефона"})


class SignInView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = SignInSerializer

    def post(self, request):
        data = self.serializer_class.check(request)
        session_key = get_session(request)
        CartItem.objects.filter(session=session_key, user=None).update(user=data['user'])
        Wish.objects.filter(session=session_key, user=None).update(user=data['user'])
        return sign_in_response(data['user'])
