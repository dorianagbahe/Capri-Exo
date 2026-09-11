from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("shop", "0003_product_editable_details"),
    ]

    operations = [
        migrations.AlterField(
            model_name="orderrequest",
            name="customer_name",
            field=models.CharField(blank=True, max_length=120),
        ),
        migrations.AlterField(
            model_name="orderrequest",
            name="customer_email",
            field=models.EmailField(blank=True, max_length=254),
        ),
    ]
