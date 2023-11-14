from django.urls import path
from .views import UserView, CreateUserView, SignInUserView

urlpatterns = [
    path('user', UserView.as_view()),
    path('create-user', CreateUserView.as_view()),
    path('sign-in', SignInUserView.as_view())
]
