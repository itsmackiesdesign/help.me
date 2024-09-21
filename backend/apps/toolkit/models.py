from django.db import models
from django.db.models import RESTRICT


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, editable=False, null=True)
    updated_at = models.DateTimeField(auto_now=True, editable=False, null=True)
    created_by = models.ForeignKey('users.User', RESTRICT, related_name='created_%(model_name)ss')
    updated_by = models.ForeignKey('users.User', RESTRICT, related_name='updated_%(model_name)ss', null=True)

    class Meta:
        abstract = True
        ordering = ('id',)
