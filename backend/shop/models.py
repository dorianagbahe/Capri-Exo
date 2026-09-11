from django.db import models


class Product(models.Model):
    CATEGORY_CHOICES = [
        ("fruits", "Fruits"),
        ("legumes", "Legumes"),
        ("epices", "Epices"),
        ("epicerie", "Epicerie"),
        ("poissonnerie", "Poissonnerie"),
        ("boissons", "Boissons"),
        ("tubercules", "Tubercules"),
        ("traiteur", "Traiteur"),
    ]

    name = models.CharField(max_length=120)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=40, choices=CATEGORY_CHOICES)
    description = models.TextField(blank=True)
    origin = models.CharField("Origine", max_length=160, blank=True)
    storage = models.TextField("Conservation", blank=True)
    availability_text = models.CharField("Texte de disponibilité", max_length=180, blank=True)
    order_note = models.TextField("Informations de commande", blank=True)
    tip = models.TextField("Conseil", blank=True)
    spice_level = models.CharField("Niveau de piquant", max_length=120, blank=True)
    pairing = models.CharField("Produit conseillé avec", max_length=180, blank=True)
    recommended_format = models.CharField("Format recommandé", max_length=180, blank=True)
    season_label = models.CharField("Saison", max_length=160, blank=True)
    price_eur = models.DecimalField(max_digits=8, decimal_places=2)
    unit = models.CharField(max_length=20, default="kg")
    image_url = models.CharField("Image", max_length=500, blank=True)
    is_rare = models.BooleanField("Produit rare", default=False)
    is_published = models.BooleanField("Produit publié", default=True)
    in_stock = models.BooleanField("Disponible", default=True)
    stock_qty = models.DecimalField(
        "Stock réel",
        max_digits=10,
        decimal_places=3,
        null=True,
        blank=True,
        help_text="Laissez vide si la quantité exacte n'est pas encore connue.",
    )
    show_description = models.BooleanField("Afficher la description", default=True)
    show_origin = models.BooleanField("Afficher l'origine", default=True)
    show_storage = models.BooleanField("Afficher la conservation", default=True)
    show_availability = models.BooleanField("Afficher la disponibilité", default=True)
    show_order_note = models.BooleanField("Afficher les informations de commande", default=True)
    show_tip = models.BooleanField("Afficher le conseil", default=True)
    show_spice_level = models.BooleanField("Afficher le niveau de piquant", default=True)
    show_pairing = models.BooleanField("Afficher les produits conseillés", default=True)
    show_recommended_format = models.BooleanField("Afficher le format recommandé", default=True)
    show_season = models.BooleanField("Afficher la saison", default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="reviews", null=True, blank=True)
    author_name = models.CharField(max_length=100)
    author_email = models.EmailField()
    market_code = models.CharField(max_length=50, blank=True)
    rating = models.PositiveSmallIntegerField()
    comment = models.TextField()
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.author_name} - {self.product.name}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    market_code = models.CharField(max_length=50, blank=True)
    subject = models.CharField(max_length=150, blank=True)
    message = models.TextField()
    status = models.CharField(max_length=30, default="received")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} ({self.email})"


class OrderRequest(models.Model):
    STATUS_CHOICES = [
        ("new", "New"),
        ("in_progress", "In progress"),
        ("done", "Done"),
        ("cancelled", "Cancelled"),
    ]

    customer_name = models.CharField(max_length=120, blank=True)
    customer_email = models.EmailField(blank=True)
    customer_phone = models.CharField(max_length=30, blank=True)
    customer_address = models.TextField(blank=True)
    frontend_order_number = models.CharField(max_length=50, blank=True)
    frontend_client_id = models.CharField(max_length=80, blank=True)
    delivery_mode = models.CharField(max_length=30, default="pickup")
    pickup_market = models.CharField(max_length=80, blank=True)
    pickup_slot = models.CharField(max_length=120, blank=True)
    payment_mode = models.CharField(max_length=30, default="shop")
    payment_status = models.CharField(max_length=30, default="pending")
    items = models.JSONField(default=list)
    total_estimated = models.DecimalField(max_digits=10, decimal_places=2)
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        customer = self.customer_name or "Client non renseigné"
        return f"Commande {self.id} - {customer}"
