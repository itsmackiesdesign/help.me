from django.contrib import admin
from .models import Member, Contact


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ('user', 'get_first_name', 'get_last_name', 'birthdate', 'address', 'extra')
    search_fields = ('user__first_name', 'user__last_name', 'address')
    list_filter = ('birthdate',)
    ordering = ('user',)

    def get_first_name(self, obj):
        return obj.user.first_name

    def get_last_name(self, obj):
        return obj.user.last_name

    get_first_name.short_description = 'First Name'
    get_last_name.short_description = 'Last Name'


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'phone', 'relationship', 'member')
    search_fields = ('full_name', 'phone', 'relationship', 'member__user__first_name')
    list_filter = ('relationship',)
    ordering = ('full_name',)
