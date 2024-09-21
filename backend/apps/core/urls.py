from django.urls import path
from core.views.cities import CityList
from core.views.playground import PlaygroundView
from core.views.regions import RegionList
from core.views.configurations import ConfigurationsView
from core.views.general import GeneralView

urlpatterns = [
    path('playground', PlaygroundView.as_view(), name='playground'),
    path('configurations', ConfigurationsView.as_view(), name='configurations'),
    path('general', GeneralView.as_view(), name='general'),
]
