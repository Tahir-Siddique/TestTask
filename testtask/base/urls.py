from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .api import CarApi, CarDetailApi, CatApi, CatDetailApi, LogoutView, RegisterApi
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [

    path('api/register', RegisterApi.as_view()),
    path("api/car", CarApi.as_view(), name='car-list'),
    path("api/editcar/<int:car_id>", CarDetailApi.as_view(), name='car-edit'),

    path("api/cat", CatApi.as_view(), name='categories-list'),
    path("api/editcat/<int:cat_id>",
         CatDetailApi.as_view(), name='category-edit'),


    path('api/token/', TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(),
         name='token_refresh'),
]
