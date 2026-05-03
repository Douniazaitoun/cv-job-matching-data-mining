from django.urls import path

from .views import map_offers_view, match_uploaded_cv_view

urlpatterns = [
    path("match-cv/", match_uploaded_cv_view, name="match_uploaded_cv"),
    path("map-offers/", map_offers_view, name="map_offers"),
]
