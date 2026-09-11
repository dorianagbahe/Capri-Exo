import json
from decimal import Decimal
from pathlib import Path

from django.core.management.base import BaseCommand

from shop.models import Product


CATEGORY_MAP = {
    "Fruits": "fruits",
    "Légumes": "legumes",
    "Épices": "epices",
    "Épicerie": "epicerie",
    "Poissonnerie": "poissonnerie",
    "Boissons": "boissons",
    "Tubercules": "tubercules",
    "Traiteur": "traiteur",
}

LEGACY_SLUG_MAP = {
    "banane-plantain-colombie": "banane-plantain",
    "gari": "gari-du-togo",
    "gingembre-frais": "gingembre",
    "harang": "hareng-fume",
}


class Command(BaseCommand):
    help = "Importe les produits du catalogue front-end sans écraser les produits déjà administrés."

    def add_arguments(self, parser):
        parser.add_argument(
            "--update-existing",
            action="store_true",
            help="Met également à jour les textes et prix des produits déjà présents.",
        )
        parser.add_argument(
            "--update-images",
            action="store_true",
            help="Met uniquement à jour les chemins d'image sans modifier les prix ni les stocks.",
        )

    def handle(self, *args, **options):
        catalog_path = Path(__file__).resolve().parents[2] / "data" / "catalog_seed.json"
        catalog = json.loads(catalog_path.read_text(encoding="utf-8"))
        created_count = 0
        updated_count = 0
        preserved_count = 0

        for item in catalog:
            defaults = {
                "name": item["name"],
                "category": CATEGORY_MAP.get(item.get("category"), "epicerie"),
                "description": item.get("description", ""),
                "origin": item.get("origin", ""),
                "storage": item.get("storage", ""),
                "availability_text": item.get("availability", ""),
                "order_note": item.get("orderNote", ""),
                "tip": item.get("tip", ""),
                "spice_level": item.get("spiceLevel", ""),
                "pairing": item.get("pairing", ""),
                "recommended_format": item.get("recommendedFormat", ""),
                "season_label": item.get("seasonLabel", ""),
                "price_eur": Decimal(str(item.get("priceValue", 0))),
                "unit": item.get("unitLabel", "kg"),
                "image_url": item.get("image", ""),
                "is_published": True,
                "in_stock": True,
                "stock_qty": None,
            }

            product = Product.objects.filter(slug=item["id"]).first()
            if product is None:
                legacy_slug = LEGACY_SLUG_MAP.get(item["id"])
                product = Product.objects.filter(slug=legacy_slug).first() if legacy_slug else None
                if product is not None:
                    product.slug = item["id"]
                    product.save(update_fields=("slug", "updated_at"))

            if product is None:
                Product.objects.create(slug=item["id"], **defaults)
                created_count += 1
                continue

            if options["update_images"] and not options["update_existing"]:
                product.image_url = defaults["image_url"]
                product.save(update_fields=("image_url", "updated_at"))
                updated_count += 1
                continue

            if not options["update_existing"]:
                preserved_count += 1
                continue

            for field, value in defaults.items():
                if field not in {"is_published", "in_stock", "stock_qty"}:
                    setattr(product, field, value)
            product.save()
            updated_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Catalogue importé : {created_count} créé(s), "
                f"{updated_count} mis à jour, {preserved_count} conservé(s)."
            )
        )
