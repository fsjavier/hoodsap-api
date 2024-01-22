from rest_framework import generics
from .models import Profile
from .serializers import ProfileSerializer
from hoodsap_api.permissions import IsOwnerOrReadOnly


class ProfileList(generics.ListAPIView):
    """
    List all profiles
    """
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()


class ProfileDetailView(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update a profile if you are the owner
    """
    serializer_class = ProfileSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Profile.objects.all()
