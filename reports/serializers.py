from rest_framework import serializers
from .models import PostReport, SocialEventReport


class PostReportSerializer(serializers.ModelSerializer):
    """
    Serializer for the PostComment model
    """
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = PostReport
        fields = [
            'id', 'owner', 'flag', 'content', 'post', 'created_at',
            'updated_at', 'is_owner', 'profile_id', 'profile_image'
        ]


class SocialEventReportSerializer(serializers.ModelSerializer):
    """
    Serializer for the SocialEventComment model
    """
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = SocialEventComment
        fields = [
            'id', 'owner', 'flag', 'content', 'social_event', 'created_at',
            'updated_at', 'is_owner', 'profile_id', 'profile_image'
        ]
