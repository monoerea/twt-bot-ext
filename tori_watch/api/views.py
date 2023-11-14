from django.shortcuts import render
from rest_framework import generics,status

from .models import User
from .serializers import UserSerializer, CreateUserSerializer, SignInUserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.

class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class SignInUserView(generics.CreateAPIView):
    serializer_class = SignInUserSerializer

    def post(self, request, format=None):
        username = request.data.get('username')
        password = request.data.get('password')

        queryset = User.objects.filter(username=username, password=password)

        if queryset.exists():
            user = queryset.first()
            if not user.session_id:
                user.session_id = self.request.session.session_key
                user.save(update_fields=['session_id'])

            serializer = self.serializer_class(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class CreateUserView(generics.CreateAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            username = serializer.data.get('username')
            password = serializer.data.get('password')
            email = serializer.data.get('email')
            session_id = self.request.session.session_key

            queryset = User.objects.filter(session_id=session_id)

            if queryset.exists():
                user = queryset[0]
                user.username = username
                user.password = password
                user.email = email
                user.save(update_fields=['username', 'password', 'email'])
            else:
                user = User(session_id=session_id, username=username, password=password, email=email)
                user.save()

            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)