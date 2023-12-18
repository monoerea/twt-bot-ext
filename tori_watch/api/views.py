from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import generics,status
from django.contrib.auth import authenticate, login, logout

from .models import User
from .serializers import UserSerializer, CreateUserSerializer, SignInUserSerializer
from rest_framework.views import APIView,View
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate, login, logout
from django.contrib.sessions.models import Session
from django.contrib.auth import get_user_model
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CreateUserSerializer
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password
# Create your views here.

class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class SignInUserView(generics.CreateAPIView):
    serializer_class = SignInUserSerializer
    def get(self, request, *args, **kwargs):
        # Fetch the logged-in user
        user = request.user
        print('Get User:', user)
        # Return user information
        if user.is_authenticated:
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'User not logged in'}, status=status.HTTP_401_UNAUTHORIZED)
        
    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        username = self.request.data.get('username')
        password = self.request.data.get('password')
        print(f"Username: {username}, Password: {password}")
        # Hash the password
        try:
            # Retrieve the user by username
            user = authenticate(request, username=username, password=password)
            # user = User.objects.get(username=username)
            print(f'User Username:{user.username}, User Password: {user.password}')
            print('Type', type(password))
        except User.DoesNotExist:
            print(f"User with username {username} not found.")
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        # user = authenticate(request, username=username, password=password)
        if user and check_password(password, user.password):
            print("Password Matched!")
            login(request, user)
            # Get or create a session
            session, created = Session.objects.get_or_create(session_key=request.session.session_key)
            # Do whatever you need with the session
            # For example, you can store user-related information in the session
            request.session['user_id'] = user.uid
            request.session['username'] = user.get_username()
            print(request.session)
            # Serialize the user
            serializer = self.serializer_class(user)
            return Response({
            'user': serializer.data,
            'logged_in_user': {
                'uid': request.session.get('user_id'),
                'username': request.session.get('username'),
            },
            }, status=status.HTTP_200_OK)
        else:
            print("Password Mismatch!")
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        
    def logout_user(self, request):
        print('LoggedUser',request.user)
        # Logout functionality
        if request.user.is_authenticated:
            logout(request)
            return Response({'success': 'User logged out'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'User not logged in'}, status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, format=None):
        return self.logout_user(request)

class LogoutUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        
        print('LoggedUser:', request.user)  # Debugging print
        if request.user.is_authenticated:
            logout(request)
            return JsonResponse({'success': 'User logged out'}, status=200)
        else:
            print('User not authenticated')  # Debugging print
            return JsonResponse({'error': 'User not authenticated'}, status=403)

class CreateUserView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CreateUserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class CreateUserAPIView(generics.CreateAPIView):
#     model = get_user_model()
#     serializer_class = CreateUserSerializer
    
# class CreateUserView(generics.CreateAPIView):
#     serializer_class = CreateUserSerializer

#     def post(self, request, format=None):
#         if not self.request.session.exists(self.request.session.session_key):
#             self.request.session.create()

#         serializer = self.serializer_class(data=request.data)
        
#         if serializer.is_valid():
#             uid = serializer.data.get('uid')
#             username = serializer.data.get('username')
#             password = serializer.data.get('password')
#             email = serializer.data.get('email')
            
#             queryset = User.objects.filter(uid=uid)

#             if queryset.exists():
#                 user = queryset[0]
#                 user.uid = uid
#                 user.username = username
#                 user.password = password
#                 user.email = email
#                 user.save(update_fields=['username', 'password', 'email'])
#             else:
#                 user = User(username=username, password=password, email=email)
#                 user.save()

#             return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
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