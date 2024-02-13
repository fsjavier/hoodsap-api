from rest_framework import generics, permissions
from .models import Location
from .serializers import LocationSerializer
from hoodsap_api.permissions import IsAdminOrReadOnly
import requests


class LocationList(generics.ListCreateAPIView):
    """
    List all locations and create a new one if logged in
    """
    serializer_class = LocationSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    queryset = Location.objects.all()

    def perform_create(self, serializer):
        lat = serializer.validated_data.get('latitude')
        lng = serializer.validated_data.get('longitude')
        print(f'latitude: ${lat}, longitude: ${lng}')

        nominatim_url = f'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat={lat}&lon={lng}&addressdetails=1`'
        response = requests.get(nominatim_url)
        data = response.json()

        country = data.get('address').get('country_code')
        city = data.get('address').get('city')
        town = data.get('address').get('town')
        village = data.get('address').get('village')
        postcode = data.get('address').get('postcode')
        locality = data.get('address').get('locality')
        suburb = data.get('address').get('suburb')
        city_district = data.get('address').get('city_district')

        serializer.save(
            country=country, city=city, town=town, village=village,
            postcode=postcode, locality=locality, suburb=suburb,
            city_district=city_district
        )


class LocationDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a location. Only admin can edit or delete it
    """
    serializer_class = LocationSerializer
    permission_classes = [
        IsAdminOrReadOnly
    ]
    queryset = Location.objects.all()
