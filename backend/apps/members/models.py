from django.db import models
from django.db.models import RESTRICT, CASCADE

from toolkit.models import BaseModel


class Member(BaseModel):
    birthdate = models.DateField("Дата рождения")
    user = models.OneToOneField(verbose_name="Позьзователь", to='users.User', on_delete=RESTRICT)
    address = models.CharField("Адрес", max_length=255)
    extra = models.TextField()

    def __str__(self):
        return self.user.get_full_name()

    class Meta:
        db_table = 'members'
        verbose_name = 'Пациенты'
        verbose_name_plural = 'Пациенты'


class Contact(BaseModel):
    RELATIONSHIP_CHOICES = (
        ('father', "Отец"),
        ('mother', "Мать"),
        ('brother', "Брат"),
        ('sister', "Сестра"),
        ('wife', "Жена"),
        ('husband', "Муж"),
        ('friend', "Друг"),
        ('son', "Сын"),
        ('doughter', "Дочь"),
        ('other', "Другое"),
    )
    full_name = models.CharField("Имя", max_length=255)
    phone = models.CharField("Номер телефона", max_length=12, help_text="format 998913101010")
    relationship = models.CharField("Кем приходится?", max_length=20, choices=RELATIONSHIP_CHOICES)
    member = models.ForeignKey(verbose_name="Пользователь", to="members.Member", on_delete=CASCADE)

    class Meta:
        db_table = 'contacts'
        verbose_name = 'Близкие человек пользователя'
        verbose_name_plural = 'Близкие люди пользователя'
