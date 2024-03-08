from rest_framework import serializers
from .models import Profile
from followers.models import Follower
from locations.serializers import LocationSerializer
from locations.models import Location


class ProfileSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    following_id = serializers.SerializerMethodField()
    posts_count = serializers.ReadOnlyField()
    followers_count = serializers.ReadOnlyField()
    following_count = serializers.ReadOnlyField()
    location_data = serializers.SerializerMethodField()
    user_id = serializers.IntegerField(source='owner.id', read_only=True)

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_following_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            following = Follower.objects.filter(
                owner=user, followed=obj.owner
            ).first()
            return following.id if following else None
        return None

    def get_location_data(self, obj):
        if obj.location:
            location = Location.objects.get(id=obj.location.id)
            return LocationSerializer(location).data
        return None

    class Meta:
        model = Profile
        fields = [
            'id', 'owner', 'display_name', 'bio', 'avatar', 'location',
            'created_at', 'updated_at', 'is_owner', 'following_id',
            'posts_count', 'following_count', 'followers_count',
            'location_data', 'user_id'
        ]
