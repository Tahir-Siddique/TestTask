
from django.contrib import admin
from django.urls import path, include
# from rest_framework_swagger.views import get_swagger_view
# schema_view = get_swagger_view(title='Pastebin API', url='/api')

from drf_yasg import openapi
from drf_yasg.views import get_schema_view as swagger_schema_view
schema_view = swagger_schema_view(
    openapi.Info(
        title="Posts API",
        default_version="1.0.0",
        description="API Documentation for TestTask",
    ),
    public=True
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('base.urls')),
    path('api/schema', schema_view.with_ui('swagger', cache_timeout=0)),
    # path('schema', schema_view),
]
