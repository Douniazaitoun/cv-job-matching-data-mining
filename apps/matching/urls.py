from django.urls import path

from .views import match_uploaded_cv_view

urlpatterns = [
    path("match-cv/", match_uploaded_cv_view, name="match_uploaded_cv"),
]
