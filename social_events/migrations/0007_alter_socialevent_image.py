# Generated by Django 3.2.23 on 2024-03-03 21:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social_events', '0006_alter_socialevent_location'),
    ]

    operations = [
        migrations.AlterField(
            model_name='socialevent',
            name='image',
            field=models.ImageField(blank=True, default='../event_default_bqzqbg', upload_to='images/'),
        ),
    ]
