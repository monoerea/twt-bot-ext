from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('uid','session_id','email', 'username','password','created_at')

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','password','email')
class SignInUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','password','email')