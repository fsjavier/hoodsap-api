from rest_framework import serializers
from .models import SocialEvent
from django.utils import timezone


class SocialEventSerializer(serializers.ModelSerializer):
    """
    Serialize Post data
    """
    owner = serializers.ReadOnlyField(source='owner.username')
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.avatar.url')
    is_owner = serializers.SerializerMethodField()
    comments_count = serializers.ReadOnlyField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def validate_image(self, value):
        if value.size > 2 * 1024 * 1024:
            raise serializers.ValidationError(
                'Image larger than 2MB'
            )
        if value.image.width > 4096:
            raise serializers.ValidationError(
                'Image width larger than 4096px'
            )
        if value.image.height > 4096:
            raise serializers.ValidationError(
                'Image height larger than 4096px'
            )
        return value

    def validate_event_date(self, value):
        if value < timezone.now():
            raise serializers.ValidationError(
                'The event cannot be in the past'
            )
        return value

    class Meta:
        model = SocialEvent
        fields = [
            'id', 'owner', 'image', 'title', 'content', 'location', 'tags',
            'event_date', 'event_category', 'indoor_outdoor', 'event_registration',
            'created_at', 'updated_at', 'is_owner', 'profile_id', 'profile_image',
            'comments_count',
        ]
