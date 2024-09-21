from django.db import models
from django.db.models import RESTRICT

from toolkit.models import BaseModel


class Call(BaseModel):
    STATUS_CHOICES = (
        ('initiated', 'Вызов инициирован'),
        ('called', 'Вызван'),
        ('canceled', 'Отменен'),
        ('ambulance_requested', 'Вызвана скорая помощь'),
        ('finished', 'Вызов завершен'),
    )
    member = models.ForeignKey("members.Member", on_delete=RESTRICT)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    initiated_at = models.DateTimeField(auto_now_add=True)
    longitude = models.FloatField()
    latitude = models.FloatField()
    called_at = models.DateTimeField(null=True, blank=True)
    canceled_at = models.DateTimeField(null=True, blank=True)
    ambulance_requested_at = models.DateTimeField(null=True, blank=True)
    finished_at = models.DateTimeField(null=True, blank=True)
    call_id = models.CharField(null=True, blank=True)

    class Meta:
        db_table = "calls"
        verbose_name = "Вызов"
        verbose_name_plural = "Вызовы"
