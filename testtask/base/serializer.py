from .models import Car, Category
from .utils import send_email
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.utils.crypto import get_random_string
# Register serializer


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name',
                  'username', 'email', 'password')
        extra_kwargs = {
            'password': {'required': False},
        }

    def create(self, validated_data):
        password = get_random_string(8)
        print("Password:", password)
        print("Email:", validated_data['email'])
        user = User.objects.create_user(validated_data['username'], password,
                                        first_name=validated_data['first_name'],
                                        last_name=validated_data['last_name'])
        user.set_password(password)
        user.email = validated_data['email']
        user.save()

        message = send_email(
            "Accoutn Registered",
            f'Hi! There. Here are your credentials.\nUsername:' +
            validated_data['username']+'\nPassword:'+password,
            'tahirsiddique52740@gmail.com',
            validated_data['email']
        )
        print("Message:", message['details'])
        return user
# User serializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'


class CatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['name'] = user.first_name + " " + user.last_name
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
