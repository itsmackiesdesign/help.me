from django.test import override_settings
from django.urls import reverse
from toolkit.tests.base_test import BaseTestCase


@override_settings(SEND_CONFIRMATION_SMS=False)
class SignInTest(BaseTestCase):
    fixtures = ('users_and_tokens.yaml',)

    def test_send_code(self):
        response = self.client.post(reverse('user:send-code'), {'phone': '998913101010'})

        self.assertEqual(200, response.status_code, response.data)
        self.assertIn('detail', response.data, response.data)
        self.assertEqual(response.data['detail'], 'Код подтверждения отправлен на указанный номер телефона')

    def test_signin_success(self):
        self.test_send_code()

        response = self.client.post(reverse('user:signin'), {'phone': '998913101010', 'code': '00000'})
        self.assertEqual(200, response.status_code, response.data)
        self.assertIn('token', response.data, response.data)
        self.assertIn('user', response.data, response.data)

    def test_signin_fail(self):
        response = self.client.post(reverse('user:signin'), {'phone': '999999999999', 'code': '12345'})
        self.assertEqual(400, response.status_code, response.data)
        self.assertEqual(str(response.data['code'][0]), 'Неверный код подтверждения', response.data)
