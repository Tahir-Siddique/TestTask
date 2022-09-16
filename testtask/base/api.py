from rest_framework import generics, permissions, mixins
from rest_framework.response import Response

from base.models import Car, Category
from .serializer import CarSerializer, CatSerializer, RegisterSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination


class RegisterApi(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "message": "User Created Successfully. Please check your email [While developement you can see email inside your console]. Thanks!",
        })


class MyPagination(PageNumberPagination):
    page_size = 50


class CarApi(generics.GenericAPIView):
    serializer_class = CarSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = MyPagination

    def post(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        car = serializer.save()
        return Response({
            "car": CarSerializer(car, context=self.get_serializer_context()).data,
            "message": "New car added.",
        })


class CarListApi(generics.ListAPIView):
    serializer_class = CarSerializer
    queryset = Car.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = MyPagination


class CarDetailApi(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, car_id):
        '''
        Helper method to get the object with given car_id
        '''
        try:
            return Car.objects.get(id=car_id)
        except Car.DoesNotExist:
            return None

    # 3. Retrieve
    def get(self, request, car_id, *args, **kwargs):
        '''
        Retrieves the Car with given car_id
        '''
        car_instance = self.get_object(car_id)
        if not car_instance:
            return Response(
                {"message": "Object with car id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = CarSerializer(car_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 4. Update
    def put(self, request, car_id, *args, **kwargs):
        '''
        Updates the car item with given car_id if exists
        '''
        car_instance = self.get_object(car_id)
        if not car_instance:
            return Response(
                {"message": "Object with car id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = CarSerializer(
            instance=car_instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": 'Data updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 5. Delete
    def delete(self, request, car_id, *args, **kwargs):
        '''
        Deletes the Car item with given car_id if exists
        '''
        car_instance = self.get_object(car_id)
        if not car_instance:
            return Response(
                {"res": "Object with car id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        car_instance.delete()
        return Response(
            {"message": "Car removed!"},
            status=status.HTTP_200_OK
        )


class CatDetailApi(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, cat_id):
        '''
        Helper method to get the object with given cat_id,
        '''
        try:
            return Category.objects.get(id=cat_id)
        except Category.DoesNotExist:
            return None

    # 3. Retrieve
    def get(self, request, cat_id, *args, **kwargs):
        '''
        Retrieves the Category with given cat_id
        '''
        cat_instance = self.get_object(cat_id)
        if not cat_instance:
            return Response(
                {"message": "Object with cat_id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = CatSerializer(cat_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 4. Update
    def put(self, request, cat_id, *args, **kwargs):
        '''
        Updates the Category item with given cat_id if exists
        '''
        car_instance = self.get_object(cat_id)
        if not car_instance:
            return Response(
                {"message": "Object with car id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = CatSerializer(
            instance=car_instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": 'Data updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 5. Delete
    def delete(self, request, cat_id, *args, **kwargs):
        '''
        Deletes the Category item with given cat_id if exists
        '''
        cat_instance = self.get_object(cat_id)
        if not cat_instance:
            return Response(
                {"res": "Object with cat id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        cat_instance.delete()
        return Response(
            {"message": "Category removed!"},
            status=status.HTTP_200_OK
        )


class CatApi(generics.GenericAPIView):
    serializer_class = CatSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        cat = serializer.save()
        return Response({
            "cat": CatSerializer(cat, context=self.get_serializer_context()).data,
            "message": "New category added.",
        })

    def get(self, request, *args,  **kwargs):
        data = Category.objects.all()
        cat = CatSerializer(data, many=True)
        return Response({
            "data": cat.data,

        })


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
