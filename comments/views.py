from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .models import PostComment, SocialEventComment
from .serializers import (
    PostCommentSerializer, PostCommentDetailSerializer,
    SocialEventCommentSerializer, SocialEventCommentDetailSerializer
)
from hoodsap_api.permissions import IsOwnerOrReadOnly


class PostCommentList(generics.ListCreateAPIView):
    """
    List all post comments and create if the user is logged in
    """
    serializer_class = PostCommentSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    queryset = PostComment.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['post']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PostCommentDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a post comment by id and update and delete if the
    user is the owner
    """
    serializer_class = PostCommentDetailSerializer
    permission_classes = [
        IsOwnerOrReadOnly
    ]
    queryset = PostComment.objects.all()


class SocialEventCommentList(generics.ListCreateAPIView):
    """
    List all social events and create if the user is logged in
    """
    serializer_class = SocialEventCommentSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    queryset = SocialEventComment.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['social_event']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class SocialEventCommentDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a social event comment by id and update and delete if the
    user is the owner
    """
    serializer_class = SocialEventCommentDetailSerializer
    permission_classes = [
        IsOwnerOrReadOnly
    ]
    queryset = SocialEventComment.objects.all()
