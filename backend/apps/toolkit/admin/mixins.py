from django.contrib.admin.views.main import ChangeList


class AuthorMixin:
    def save_model(self, request, obj, form, change):
        if change:
            obj.updated_by = request.user
        else:
            obj.created_by = request.user

        super().save_model(request, obj, form, change)

    def save_formset(self, request, form, formset, change):
        instances = formset.save(commit=False)

        for obj in instances:
            if obj.id:
                obj.updated_by = request.user
            else:
                obj.created_by = request.user

        formset.save()


class CascadeDeleteMixin:
    def get_deleted_objects(self, objs, request):
        deleted_objects, model_count, perms_needed, protected = super().get_deleted_objects(objs, request)
        return deleted_objects, model_count, set(), protected


class DisableCreateMixin:
    def has_add_permission(self, request):
        return False


class DisableDeleteMixin:
    def has_delete_permission(self, request, obj=None):
        return False


class DisableChangeMixin:
    def has_change_permission(self, request, obj=None):
        return False


class DisableActionsMixin(DisableCreateMixin, DisableDeleteMixin, DisableChangeMixin):
    ...


class ReadOnlyMixin(DisableCreateMixin, DisableDeleteMixin, DisableChangeMixin):
    read_only_fields = '__all__'


class HideMixin:
    def get_model_perms(self, request):
        return {}


class ListTitleMixin:
    list_title = None

    def get_list_title(self, request):
        return self.list_title

    def changelist_view(self, request, extra_context=None):
        title = self.get_list_title(request)
        extra_context = {'title': title} if title else extra_context
        return super().changelist_view(request, extra_context=extra_context)


class UnorderedMixin:
    def get_changelist(self, request, **kwargs):
        class UnorderedChangeList(ChangeList):
            def get_ordering(self, *args, **kwargs):
                return []

        return UnorderedChangeList


class CustomInlineFormsMixin:
    def change_inline_form(self, form, request):
        ...

    def get_inline_formsets(self, request, *args, **kwargs):
        inlines = super().get_inline_formsets(request, *args, **kwargs)

        for inline in inlines:
            for form in inline.forms:
                self.change_inline_form(form, request)

        return inlines
