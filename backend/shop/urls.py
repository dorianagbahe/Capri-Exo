from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import ContactMessageViewSet, OrderRequestViewSet, ProductViewSet, ReviewViewSet

router = DefaultRouter()
router.register("products", ProductViewSet, basename="products")
router.register("reviews", ReviewViewSet, basename="reviews")
router.register("contact-messages", ContactMessageViewSet, basename="contact-messages")
router.register("order-requests", OrderRequestViewSet, basename="order-requests")

urlpatterns = [
    path("", include(router.urls)),
]
