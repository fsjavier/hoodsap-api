from geopy.distance import geodesic as GD
from django.db.models import Count
from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Post
from .serializers import PostSerializer
from hoodsap_api.permissions import IsOwnerOrReadOnly


class PostList(generics.ListCreateAPIView):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    serializer_class = PostSerializer
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend,
    ]
    ordering_fields = [
        'likes_count',
        'comments_count',
        'likes__created_at',
    ]
    search_fields = [
        'title',
        'owner__profile__display_name',
    ]
    filterset_fields = [
        # user feed (following users)
        'owner__followed__owner__profile',
        # user liked posts
        'likes__owner__profile',
        # user posts
        'owner__profile'
    ]

    def get_queryset(self):
        queryset = Post.objects.annotate(
            comments_count=Count('postcomment', distinct=True),
            likes_count=Count('likes', distinct=True)
        ).order_by('-created_at')

        latitude = self.request.query_params.get('latitude', None)
        longitude = self.request.query_params.get('longitude', None)
        radius = self.request.query_params.get('radius', None)

        if (latitude is not None and
                longitude is not None and
                radius is not None):
            radius = float(radius)
            latitude = float(latitude)
            radius = float(radius)
            user_location = (latitude, longitude)

            filtered_posts = []
            for post in queryset:
                if post.location:
                    post_location = (
                        post.location.latitude, post.location.longitude
                    )
                    distance = GD(user_location, post_location).meters
                    if distance <= radius:
                        filtered_posts.append(post.id)
            queryset = queryset.filter(id__in=filtered_posts)
        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [
        IsOwnerOrReadOnly
    ]
    queryset = Post.objects.annotate(
        comments_count=Count('postcomment', distinct=True),
        likes_count=Count('likes', distinct=True)
    ).order_by('-created_at')
    serializer_class = PostSerializer
