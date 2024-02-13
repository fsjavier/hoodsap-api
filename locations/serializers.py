from rest_framework import serializers
from .models import Location


class LocationSerializer(serializers.ModelSerializer):
    """
    Location serializer
    """
    class Meta:
        model = Location
        fields = [
            'id', 'latitude', 'longitude', 'country', 'city', 'town',
            'village', 'postcode', 'locality', 'suburb', 'city_district',
            'created_at', 'updated_at'
        ]
