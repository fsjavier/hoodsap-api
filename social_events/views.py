from django.db.models import Count
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
    queryset = SocialEvent.objects.annotate(
       comments_count=Count('socialeventcomment', distinct=True) 
    )

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class SocialEventDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SocialEventSerializer
    permission_classes = [
        IsOwnerOrReadOnly
    ]
    queryset = SocialEvent.objects.annotate(
       comments_count=Count('socialeventcomment', distinct=True) 
    )