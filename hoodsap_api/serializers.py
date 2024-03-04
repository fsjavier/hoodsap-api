from rest_framework import serializers
from dj_rest_auth.serializers import UserDetailsSerializer
from profiles.serializers import ProfileSerializer


class UserSerializer(UserDetailsSerializer):
    profile_id = serializers.ReadOnlyField(source='profile.id')
    profile_image = serializers.ReadOnlyField(source='profile.avatar.url')
    profile_location_data = serializers.SerializerMethodField()

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + (
            'profile_id', 'profile_image', 'profile_location_data'
        )

    def get_profile_location_data(self, obj):
        profile = obj.profile
        return ProfileSerializer(profile, context=self.context).data.get('location_data')
