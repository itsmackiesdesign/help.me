from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("__debug__/", include("debug_toolbar.urls")),
    path('', RedirectView.as_view(url='/api/v1/toolkit/')),
    path('api/v1/', include([
        path('toolkit/', include(('toolkit.urls', "toolkit"), namespace="toolkit")),
        path('users/', include('users.urls')),
        path('members/', include('members.urls')),
        path("calls/", include(("calls.urls", "calls"), namespace="calls")),
        path('core/', include('core.urls')),

    ])),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
