from rest_framework import generics, permissions
from hoodsap_api.permissions import IsAdminOrReadOnly
from .models import Tag
from .serializers import TagSerializer


class TagList(generics.ListCreateAPIView):
    """
    Lists all tags, create a tag if logged in
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    
    def perform_create(self, serializer):
        serializer.save()


class TagDetail(generics.RetrieveDestroyAPIView):
    """
    Retrieve a tags, create a tag if logged in
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [
        IsAdminOrReadOnly
    ]
