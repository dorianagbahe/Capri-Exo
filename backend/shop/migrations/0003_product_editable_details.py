from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("shop", "0002_contactmessage_market_code_contactmessage_phone_and_more"),
    ]

    operations = [
        migrations.AddField(model_name="product", name="origin", field=models.CharField(blank=True, max_length=160, verbose_name="Origine")),
        migrations.AddField(model_name="product", name="storage", field=models.TextField(blank=True, verbose_name="Conservation")),
        migrations.AddField(model_name="product", name="availability_text", field=models.CharField(blank=True, max_length=180, verbose_name="Texte de disponibilité")),
        migrations.AddField(model_name="product", name="order_note", field=models.TextField(blank=True, verbose_name="Informations de commande")),
        migrations.AddField(model_name="product", name="tip", field=models.TextField(blank=True, verbose_name="Conseil")),
        migrations.AddField(model_name="product", name="spice_level", field=models.CharField(blank=True, max_length=120, verbose_name="Niveau de piquant")),
        migrations.AddField(model_name="product", name="pairing", field=models.CharField(blank=True, max_length=180, verbose_name="Produit conseillé avec")),
        migrations.AddField(model_name="product", name="recommended_format", field=models.CharField(blank=True, max_length=180, verbose_name="Format recommandé")),
        migrations.AddField(model_name="product", name="season_label", field=models.CharField(blank=True, max_length=160, verbose_name="Saison")),
        migrations.AddField(model_name="product", name="is_published", field=models.BooleanField(default=True, verbose_name="Produit publié")),
        migrations.AddField(model_name="product", name="show_description", field=models.BooleanField(default=True, verbose_name="Afficher la description")),
        migrations.AddField(model_name="product", name="show_origin", field=models.BooleanField(default=True, verbose_name="Afficher l'origine")),
        migrations.AddField(model_name="product", name="show_storage", field=models.BooleanField(default=True, verbose_name="Afficher la conservation")),
        migrations.AddField(model_name="product", name="show_availability", field=models.BooleanField(default=True, verbose_name="Afficher la disponibilité")),
        migrations.AddField(model_name="product", name="show_order_note", field=models.BooleanField(default=True, verbose_name="Afficher les informations de commande")),
        migrations.AddField(model_name="product", name="show_tip", field=models.BooleanField(default=True, verbose_name="Afficher le conseil")),
        migrations.AddField(model_name="product", name="show_spice_level", field=models.BooleanField(default=True, verbose_name="Afficher le niveau de piquant")),
        migrations.AddField(model_name="product", name="show_pairing", field=models.BooleanField(default=True, verbose_name="Afficher les produits conseillés")),
        migrations.AddField(model_name="product", name="show_recommended_format", field=models.BooleanField(default=True, verbose_name="Afficher le format recommandé")),
        migrations.AddField(model_name="product", name="show_season", field=models.BooleanField(default=True, verbose_name="Afficher la saison")),
    ]
