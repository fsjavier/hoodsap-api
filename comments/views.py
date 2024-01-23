from rest_framework import generics, permissions
from .models import PostComment
from .serializers import PostCommentSerializer, PostCommentDetailSerializer
from hoodsap_api.permissions import IsOwnerOrReadOnly


class PostCommentList(generics.ListCreateAPIView):
    """
    List all posts and create if the user is logged ind
    """
    serializer_class = PostCommentSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    queryset = PostComment.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PostCommentDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostCommentDetailSerializer
    permission_classes = [
        IsOwnerOrReadOnly
    ]
    queryset = PostComment.objects.all()