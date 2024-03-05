from geopy.distance import geodesic as GD
from django.db.models import Count
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Profile
from .serializers import ProfileSerializer
from hoodsap_api.permissions import IsOwnerOrReadOnly


class ProfileList(generics.ListAPIView):
    """
    List all profiles
    """
    serializer_class = ProfileSerializer
    filter_backends = [
        filters.OrderingFilter,
        DjangoFilterBackend
    ]
    ordering_fields = [
        'posts_count',
        'followers_count',
        'following_count',
        'owner__following__created_at',
        'owner__followed__created_at',
    ]
    filterset_fields = [
        # user followers
        'owner__following__followed__profile',
        # followed by user
        'owner__followed__owner__profile',
    ]

    def get_queryset(self):
        queryset = Profile.objects.annotate(
            posts_count=Count('owner__post', distinct=True),
            followers_count=Count('owner__followed', distinct=True),
            following_count=Count('owner__following', distinct=True),
        ).order_by('-followers_count')
        
        latitude = self.request.query_params.get('latitude', None)
        longitude = self.request.query_params.get('longitude', None)
        radius = self.request.query_params.get('radius', None)

        if latitude is not None and longitude is not None and radius is not None:
            radius = float(radius)
            latitude = float(latitude)
            radius = float(radius)
            user_location = (latitude, longitude)

            filtered_profiles = []
            for profile in queryset:
                if profile.location:
                    profile_location = (profile.location.latitude, profile.location.longitude)
                    distance = GD(user_location, profile_location).meters
                    if distance <= radius:
                        filtered_profiles.append(profile.id)
            queryset = queryset.filter(id__in=filtered_profiles)
        return queryset


class ProfileDetailView(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update a profile if you are the owner
    """
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Profile.objects.annotate(
        posts_count=Count('owner__post', distinct=True),
        followers_count=Count('owner__followed', distinct=True),
        following_count=Count('owner__following', distinct=True)
    ).order_by('-created_at')
    serializer_class = ProfileSerializer
