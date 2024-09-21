from django.test import override_settings
from django.urls import reverse
from toolkit.tests.base_test import BaseTestCase
from users.tests.constants import USER_TOKEN


@override_settings(EMAIL_BACKEND='toolkit.utils.email.TestEmailBackend')
class UserTest(BaseTestCase):
    auth_token = USER_TOKEN
    fixtures = ('users_and_tokens.yaml',)

    def test_settings(self):
        response = self.client.patch(reverse('user:user-settings'), {
            'email': 'test@gmail.com',
            'first_name': 'Arnold',
            'last_name': 'Swarchenegger',
        })
        self.assertEqual(200, response.status_code, response.data)
