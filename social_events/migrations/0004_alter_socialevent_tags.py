# Generated by Django 3.2.23 on 2024-02-01 08:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0001_initial'),
        ('social_events', '0003_auto_20240125_1013'),
    ]

    operations = [
        migrations.AlterField(
            model_name='socialevent',
            name='tags',
            field=models.ManyToManyField(blank=True, to='tags.Tag'),
        ),
    ]
