from rest_framework import serializers
from .models import ContactMessage, OrderRequest, Product, Review


from decimal import Decimal, InvalidOperation

from django.db import transaction


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"
        read_only_fields = ("is_published", "created_at", "updated_at")
        extra_kwargs = {
            "product": {"required": False, "allow_null": True},
            "market_code": {"required": False, "allow_blank": True},
        }

    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("La note doit etre entre 1 et 5.")
        return value


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = "__all__"
        read_only_fields = ("created_at", "updated_at")


class OrderRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderRequest
        fields = "__all__"
        read_only_fields = ("status", "created_at", "updated_at")

    def validate_items(self, value):
        if not isinstance(value, list) or not value:
            raise serializers.ValidationError("La commande doit contenir au moins un produit.")
        return value

    def create(self, validated_data):
        items = validated_data.get("items", [])

        with transaction.atomic():
            reservations = {}

            for item in items:
                slug = str(item.get("id") or item.get("slug") or "").strip()
                product = Product.objects.select_for_update().filter(slug=slug, is_published=True).first()
                if not product:
                    raise serializers.ValidationError({"items": f"Le produit {slug or 'inconnu'} n'existe plus."})
                if not product.in_stock:
                    raise serializers.ValidationError({"items": f"{product.name} n'est plus disponible."})

                raw_amount = item.get("weight") if product.unit.lower() == "kg" else item.get("quantity")
                try:
                    requested_amount = Decimal(str(raw_amount or 0))
                except (InvalidOperation, TypeError, ValueError):
                    requested_amount = Decimal("0")

                if requested_amount <= 0:
                    raise serializers.ValidationError({"items": f"La quantité de {product.name} est incorrecte."})

                reservation = reservations.setdefault(
                    product.pk,
                    {"product": product, "amount": Decimal("0")},
                )
                reservation["amount"] += requested_amount

                if product.stock_qty is not None and reservation["amount"] > product.stock_qty:
                    raise serializers.ValidationError(
                        {"items": f"Stock insuffisant pour {product.name} : {product.stock_qty} {product.unit} disponible(s)."}
                    )

            order = OrderRequest.objects.create(**validated_data)

            for reservation in reservations.values():
                product = reservation["product"]
                requested_amount = reservation["amount"]
                if product.stock_qty is None:
                    continue
                product.stock_qty = max(Decimal("0"), product.stock_qty - requested_amount)
                if product.stock_qty == 0:
                    product.in_stock = False
                product.save(update_fields=("stock_qty", "in_stock", "updated_at"))

        return order
