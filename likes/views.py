from rest_framework import generics, permissions
from .models import Like
from .serializers import LikeSerializer
from hoodsap_api.permissions import IsOwnerOrReadOnly


class LikeList(generics.ListCreateAPIView):
    """
    Lists all likes, creates a new like if the user
    is logged in
    """
    serializer_class = LikeSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    queryset = Like.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class LikeDetail(generics.RetrieveDestroyAPIView):
    """
    Retrieves a like or delete if it's the owner's
    """
    serializer_class = LikeSerializer
    permission_classes = [
        IsOwnerOrReadOnly
    ]
    queryset = Like.objects.all()
