from rest_framework import generics
from .models import Profile
from .serializers import ProfileSerializer


class ProfileList(generics.ListAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
