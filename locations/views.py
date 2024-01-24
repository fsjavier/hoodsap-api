from rest_framework import generics, permissions
from .models import Location
from .serializers import LocationSerializer
from hoodsap_api.permissions import IsOwnerOrReadOnly


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
        serializer.save(owner=self.request.user)


class LocationDetail(generics.RetrieveUpdateAPIView):
    """
    Retrieve a location and update it if it's their own
    """
    serializer_class = LocationSerializer
    permission_classes = [
        IsOwnerOrReadOnly
    ]
    queryset = Location.objects.all()
