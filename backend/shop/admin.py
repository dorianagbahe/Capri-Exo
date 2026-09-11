from django.contrib import admin
from .models import ContactMessage, OrderRequest, Product, Review


admin.site.site_header = "Administration Capri Exo"
admin.site.site_title = "Capri Exo"
admin.site.index_title = "Gestion du site et du catalogue"


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "category",
        "price_eur",
        "unit",
        "is_rare",
        "is_published",
        "in_stock",
        "stock_qty",
        "updated_at",
    )
    list_editable = ("price_eur", "unit", "is_rare", "is_published", "in_stock", "stock_qty")
    list_filter = ("is_rare", "is_published", "in_stock", "category")
    search_fields = ("name", "description", "origin", "slug")
    prepopulated_fields = {"slug": ("name",)}
    readonly_fields = ("created_at", "updated_at")
    list_per_page = 50
    actions = (
        "mark_available",
        "mark_unavailable",
        "mark_rare",
        "remove_rare_status",
    )
    fieldsets = (
        (
            "Informations principales",
            {
                "fields": (
                    "name",
                    "slug",
                    "category",
                    "description",
                    "price_eur",
                    "unit",
                    "image_url",
                )
            },
        ),
        (
            "Informations complémentaires",
            {
                "fields": (
                    "origin",
                    "storage",
                    "availability_text",
                    "order_note",
                    "tip",
                    "spice_level",
                    "pairing",
                    "recommended_format",
                    "season_label",
                )
            },
        ),
        (
            "Publication et stock",
            {"fields": ("is_rare", "is_published", "in_stock", "stock_qty")},
        ),
        (
            "Informations visibles sur la fiche produit",
            {
                "description": "Décochez une case pour masquer uniquement cette information aux clients.",
                "fields": (
                    "show_description",
                    "show_origin",
                    "show_storage",
                    "show_availability",
                    "show_order_note",
                    "show_tip",
                    "show_spice_level",
                    "show_pairing",
                    "show_recommended_format",
                    "show_season",
                ),
            },
        ),
        (
            "Historique",
            {"fields": ("created_at", "updated_at"), "classes": ("collapse",)},
        ),
    )

    @admin.action(description="Marquer les produits sélectionnés comme disponibles")
    def mark_available(self, request, queryset):
        queryset.update(in_stock=True)

    @admin.action(description="Marquer les produits sélectionnés comme indisponibles")
    def mark_unavailable(self, request, queryset):
        queryset.update(in_stock=False)

    @admin.action(description="Marquer les produits sélectionnés comme rares")
    def mark_rare(self, request, queryset):
        queryset.update(is_rare=True)

    @admin.action(description="Retirer le statut rare des produits sélectionnés")
    def remove_rare_status(self, request, queryset):
        queryset.update(is_rare=False)


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("author_name", "product", "rating", "is_published", "created_at")
    list_filter = ("rating", "is_published")
    search_fields = ("author_name", "author_email", "comment")


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "created_at")
    search_fields = ("name", "email", "subject", "message")


@admin.register(OrderRequest)
class OrderRequestAdmin(admin.ModelAdmin):
    list_display = ("id", "customer_name", "customer_email", "total_estimated", "status", "created_at")
    list_filter = ("status",)
    search_fields = ("customer_name", "customer_email", "customer_phone")
