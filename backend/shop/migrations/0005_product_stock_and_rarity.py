from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("shop", "0004_orderrequest_optional_customer"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="is_rare",
            field=models.BooleanField(default=False, verbose_name="Produit rare"),
        ),
        migrations.AlterField(
            model_name="product",
            name="category",
            field=models.CharField(
                choices=[
                    ("fruits", "Fruits"),
                    ("legumes", "Legumes"),
                    ("epices", "Epices"),
                    ("epicerie", "Epicerie"),
                    ("poissonnerie", "Poissonnerie"),
                    ("boissons", "Boissons"),
                    ("tubercules", "Tubercules"),
                    ("traiteur", "Traiteur"),
                ],
                max_length=40,
            ),
        ),
        migrations.AlterField(
            model_name="product",
            name="image_url",
            field=models.CharField(blank=True, max_length=500, verbose_name="Image"),
        ),
        migrations.AlterField(
            model_name="product",
            name="in_stock",
            field=models.BooleanField(default=True, verbose_name="Disponible"),
        ),
        migrations.AlterField(
            model_name="product",
            name="stock_qty",
            field=models.DecimalField(
                blank=True,
                decimal_places=3,
                help_text="Laissez vide si la quantité exacte n'est pas encore connue.",
                max_digits=10,
                null=True,
                verbose_name="Stock réel",
            ),
        ),
    ]
