from geopy.distance import geodesic as GD
from django.db.models import Count
from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
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

    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend,
    ]
    search_fields = [
        'title',
        'owner__profile__display_name',
    ]
    filterset_fields = [
        'event_category',
        'indoor_outdoor',
        'owner__profile'
    ]

    def get_queryset(self):
        queryset = SocialEvent.objects.annotate(
            comments_count=Count('socialeventcomment', distinct=True)
        ).order_by('-created_at')
        
        latitude = self.request.query_params.get('latitude', None)
        longitude = self.request.query_params.get('longitude', None)
        radius = self.request.query_params.get('radius', None)

        if latitude is not None and longitude is not None and radius is not None:
            radius = float(radius)
            latitude = float(latitude)
            radius = float(radius)
            user_location = (latitude, longitude)

            filtered_events = []
            for event in queryset:
                if event.location:
                    event_location = (event.location.latitude, event.location.longitude)
                    distance = GD(user_location, event_location).meters
                    if distance <= radius:
                        filtered_events.append(event.id)
            queryset = queryset.filter(id__in=filtered_events)
        return queryset

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