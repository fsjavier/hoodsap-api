# Generated by Django 3.2.23 on 2024-01-24 11:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('locations', '0001_initial'),
        ('social_events', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='socialevent',
            name='location',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='locations.location'),
        ),
    ]
