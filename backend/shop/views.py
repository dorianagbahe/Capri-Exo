from rest_framework import filters, viewsets
from rest_framework.permissions import AllowAny
from .models import ContactMessage, OrderRequest, Product, Review
from .serializers import (
    ContactMessageSerializer,
    OrderRequestSerializer,
    ProductSerializer,
    ReviewSerializer,
)


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "category", "description"]
    ordering_fields = ["price_eur", "name", "created_at"]


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.filter(is_published=True)
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]
    http_method_names = ["get", "post", "head", "options"]

    def perform_create(self, serializer):
        serializer.save(is_published=True)


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]
    http_method_names = ["post", "head", "options"]


class OrderRequestViewSet(viewsets.ModelViewSet):
    queryset = OrderRequest.objects.all()
    serializer_class = OrderRequestSerializer
    permission_classes = [AllowAny]
    http_method_names = ["post", "head", "options"]
