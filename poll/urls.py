from django.urls import path

from . import views

urlpatterns = [
    # path("login", views.login_view, name="login_view"),
    # path("signup", views.signup_view, name="signup_view"),
    
    path("create", views.create, name="create"),
    path("view/<int:poll_id>", views.view_poll, name="view"),
    path("results/<int:poll_id>", views.results_view, name="results")
]