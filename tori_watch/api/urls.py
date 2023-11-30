from django.urls import path
from .views import UserView, CreateUserView, SignInUserView, GetUserByUID

urlpatterns = [
    path('user', UserView.as_view()),
    path('user/<str:uid>/', GetUserByUID.as_view(), name='get_user_by_uid'),
    path('create-user', CreateUserView.as_view()),
    path('sign-in', SignInUserView.as_view()),
]
