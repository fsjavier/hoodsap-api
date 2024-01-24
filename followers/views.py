from rest_framework import generics, permissions
from .models import Follower
from .serializers import FollowerSerializer
from hoodsap_api.permissions import IsOwnerOrReadOnly


class FollowerList(generics.ListCreateAPIView):
    """
    List all followers, create follow if the user if logged in
    """
    serializer_class = FollowerSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    queryset = Follower.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class FollowerDetail(generics.RetrieveDestroyAPIView):
    """
    Retrieve a follower, delete (unfollow) if the user is the owner
    """
    serializer_class = FollowerSerializer
    permission_classes = [
        IsOwnerOrReadOnly
    ]
    queryset = Follower.objects.all()
