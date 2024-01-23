from rest_framework import generics, permissions
from .models import SocialEvent
from .serializers import SocialEventSerializer
from hoodsap_api.permissions import IsOwnerOrReadOnly


class SocialEventList(generics.ListCreateAPIView):
    """
    Lists all social events and create an event if
    the user is logged in
    """
    serializer_class = SocialEventSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    queryset = SocialEvent.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class SocialEventDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SocialEventSerializer
    permission_classes = [
        IsOwnerOrReadOnly
    ]
    queryset = SocialEvent.objects.all()