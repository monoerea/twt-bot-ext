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
            uid = serializer.data.get('uid')
            session_id = serializer.data.get('session_id')
            username = serializer.data.get('username')
            password = serializer.data.get('password')
            email = serializer.data.get('email')
            session_id = self.request.session.session_key

            queryset = User.objects.filter(session_id=session_id)

            if queryset.exists():
                user = queryset[0]
                user.uid = uid
                user.session_id = session_id
                user.username = username
                user.password = password
                user.email = email
                user.save(update_fields=['username', 'password', 'email'])
            else:
                user = User(username=username, password=password, email=email)
                user.save()

            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class GetUserByUID(APIView):
    def get(self, request, uid):
        try:
            user = User.objects.get(uid=uid)
            serializer = UserSerializer(user)

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)   
    def update(self, request, *args, **kwargs):
        # Retrieve the user instance to be updated
        instance = self.get_object()

        # Deserialize the request data and apply the changes to the user instance
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'uid'  # Assuming 'uid' is the field used for lookup
    
    def update(self, request, *args, **kwargs):
        # Retrieve the user instance to be updated
        instance = self.get_object()

        # Deserialize the request data and apply the changes to the user instance
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    def create(self, request, *args, **kwargs):
        # Deserialize the request data to create a new user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)