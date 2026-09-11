from django.test import TestCase
from django.urls import reverse

from .models import Product
from decimal import Decimal


class ProductAdministrationTests(TestCase):
    def setUp(self):
        self.visible_product = Product.objects.create(
            name="Produit visible",
            slug="produit-visible",
            category="fruits",
            description="Description de test",
            origin="Bénin",
            price_eur="4.90",
            unit="kg",
            is_published=True,
            in_stock=False,
            is_rare=True,
            show_origin=False,
        )
        self.hidden_product = Product.objects.create(
            name="Produit masqué",
            slug="produit-masque",
            category="epicerie",
            price_eur="2.00",
            is_published=False,
        )

    def test_admin_requires_authentication(self):
        response = self.client.get(reverse("admin:index"))

        self.assertEqual(response.status_code, 302)
        self.assertIn(reverse("admin:login"), response.url)

    def test_api_exposes_publication_state_to_the_catalog(self):
        response = self.client.get("/api/products/")

        self.assertEqual(response.status_code, 200)
        products = {product["slug"]: product for product in response.json()}
        self.assertTrue(products[self.visible_product.slug]["is_published"])
        self.assertFalse(products[self.hidden_product.slug]["is_published"])

    def test_out_of_stock_product_can_stay_visible(self):
        response = self.client.get("/api/products/")
        product = next(item for item in response.json() if item["slug"] == self.visible_product.slug)

        self.assertFalse(product["in_stock"])
        self.assertTrue(product["is_rare"])
        self.assertFalse(product["show_origin"])
        self.assertEqual(product["origin"], "Bénin")


class GuestOrderTests(TestCase):
    def setUp(self):
        self.product = Product.objects.create(
            name="Avocat",
            slug="avocat",
            category="fruits",
            price_eur="7.90",
            unit="kg",
            is_published=True,
            in_stock=True,
            stock_qty="1.000",
        )

    def test_order_can_be_created_without_personal_information(self):
        response = self.client.post(
            "/api/order-requests/",
            {
                "customer_name": "",
                "customer_email": "",
                "items": [{"id": "avocat", "quantity": 1, "weight": 0.5}],
                "total_estimated": "3.95",
                "delivery_mode": "pickup",
                "pickup_market": "cergy",
                "payment_mode": "shop",
            },
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()["customer_name"], "")
        self.assertEqual(response.json()["customer_email"], "")
        self.product.refresh_from_db()
        self.assertEqual(self.product.stock_qty, Decimal("0.500"))

    def test_order_is_rejected_when_stock_is_insufficient(self):
        response = self.client.post(
            "/api/order-requests/",
            {
                "customer_name": "",
                "customer_email": "",
                "items": [{"id": "avocat", "quantity": 1, "weight": 2}],
                "total_estimated": "15.80",
                "delivery_mode": "pickup",
                "pickup_market": "cergy",
                "payment_mode": "shop",
            },
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 400)
        self.product.refresh_from_db()
        self.assertEqual(self.product.stock_qty, Decimal("1.000"))

    def test_duplicate_order_lines_cannot_exceed_stock(self):
        response = self.client.post(
            "/api/order-requests/",
            {
                "customer_name": "",
                "customer_email": "",
                "items": [
                    {"id": "avocat", "quantity": 1, "weight": 0.6},
                    {"id": "avocat", "quantity": 1, "weight": 0.6},
                ],
                "total_estimated": "9.48",
                "delivery_mode": "pickup",
                "pickup_market": "cergy",
                "payment_mode": "shop",
            },
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 400)
        self.product.refresh_from_db()
        self.assertEqual(self.product.stock_qty, Decimal("1.000"))
