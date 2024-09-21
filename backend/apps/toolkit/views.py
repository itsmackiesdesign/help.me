from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework.mixins import RetrieveModelMixin, DestroyModelMixin, UpdateModelMixin
from rest_framework.response import Response
from rest_framework.views import APIView


class BaseAPIView(APIView):
    ...


class BaseView(GenericAPIView):
    def get_model(self):
        return self.get_serializer_class().Meta.model

    def get_app_and_model(self):
        model = self.get_model()
        return {'app': model._meta.app_label, 'model': model._meta.model_name}

    def check_perm(self, perm):
        permission = perm.format(**self.get_app_and_model())
        if not self.request.user.has_perm(permission):
            raise PermissionDenied()


class CreateMixin(CreateModelMixin):
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.validated_data['created_by'] = self.request.user
        super().perform_create(serializer)


class ListMixin(ListModelMixin):
    def get(self, request, *args, **kwargs):
        """Returns list of entities"""
        return self.list(request, *args, **kwargs)

    def list_response(self, data):
        return data

    def get_paginated_response(self, data):
        return Response(self.list_response({
            'count': self.paginator.page.paginator.count,
            'results': data
        }))


class RetrieveMixin(RetrieveModelMixin):
    def get(self, request, *args, **kwargs):
        """Returns single object details by primary key"""
        return self.retrieve(request, *args, **kwargs)


class DestroyMixin(DestroyModelMixin):
    def delete(self, request, *args, **kwargs):
        """Removes object by primary key"""
        return self.destroy(request, *args, **kwargs)


class UpdateMixin(UpdateModelMixin):
    def put(self, request, *args, **kwargs):
        """Updates single object by primary key"""
        return self.update(request, *args, **kwargs)

    def perform_update(self, serializer):
        serializer.validated_data['updated_by'] = self.request.user
        super().perform_update(serializer)
