from django.urls import reverse
from toolkit.tests.base_test import BaseTestCase
from users.models import Token
from users.tests.constants import USER_TOKEN


class SignOutTest(BaseTestCase):
    auth_token = USER_TOKEN
    fixtures = ('users_and_tokens.yaml',)

    def test_signout_success(self):
        response = self.client.delete(reverse('user:signout'))
        self.assertEqual(200, response.status_code, response.data)
        self.assertFalse(Token.objects.filter(key=USER_TOKEN).exists())
