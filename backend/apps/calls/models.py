from django.db import models
from django.db.models import RESTRICT

from toolkit.models import BaseModel


class Call(BaseModel):
    INITIATED = "initiated"
    CALLED = "called"
    VIEWED = "viewed"
    CANCELED = "canceled"
    AMBULANCE_REQUESTED = "ambulance_requested"
    FINISHED = "finished"

    STATUS_CHOICES = (
        (INITIATED, "Вызов инициирован"),
        (CALLED, "Вызван"),
        (VIEWED, "Рассматриваемый"),
        (CANCELED, "Отменен"),
        (AMBULANCE_REQUESTED, "Вызвана скорая помощь"),
        (FINISHED, "Вызов завершен"),
    )
    member = models.ForeignKey("members.Member", on_delete=RESTRICT)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='initiated')
    initiated_at = models.DateTimeField(auto_now_add=True)
    longitude = models.FloatField(null=True)
    latitude = models.FloatField(null=True)
    called_at = models.DateTimeField(null=True, blank=True)
    canceled_at = models.DateTimeField(null=True, blank=True)
    ambulance_requested_at = models.DateTimeField(null=True, blank=True)
    finished_at = models.DateTimeField(null=True, blank=True)
    call_id = models.CharField(null=True, blank=True)

    class Meta:
        db_table = "calls"
        verbose_name = "Вызов"
        verbose_name_plural = "Вызовы"
