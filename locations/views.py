from rest_framework import generics, permissions
from .models import Location
from .serializers import LocationSerializer
from hoodsap_api.permissions import IsAdminOrReadOnly


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
        serializer.save()


class LocationDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a location. Only admin can edit or delete it
    """
    serializer_class = LocationSerializer
    permission_classes = [
        IsAdminOrReadOnly
    ]
    queryset = Location.objects.all()
