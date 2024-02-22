# Generated by Django 3.2.23 on 2024-02-22 13:32

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0007_alter_profile_location'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='avatar',
            field=cloudinary.models.CloudinaryField(default='../profile_avatar_nxydwh', max_length=255),
        ),
    ]
