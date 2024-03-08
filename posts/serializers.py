from rest_framework import serializers
from .models import Post
from likes.models import Like
from locations.serializers import LocationSerializer
from locations.models import Location
from tags.serializers import TagSerializer
from tags.models import Tag


class PostSerializer(serializers.ModelSerializer):
    """
    Serialize Post data
    """
    owner = serializers.ReadOnlyField(source='owner.username')
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(
        source='owner.profile.avatar.url'
    )
    profile_name = serializers.ReadOnlyField(
        source='owner.profile.display_name'
    )
    is_owner = serializers.SerializerMethodField()
    like_id = serializers.SerializerMethodField()
    comments_count = serializers.ReadOnlyField()
    likes_count = serializers.ReadOnlyField()
    location_data = serializers.SerializerMethodField()
    tags_data = serializers.SerializerMethodField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_like_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            like = Like.objects.filter(
                owner=user, post=obj
            ).first()
            return like.id if like else None
        return None

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

    def get_location_data(self, obj):
        if obj.location:
            location = Location.objects.get(id=obj.location.id)
            return LocationSerializer(location).data
        return None

    def get_tags_data(self, obj):
        if obj.tags:
            tags = Tag.objects.filter(
                id__in=obj.tags.values_list('id', flat=True)
            )
            return TagSerializer(tags, many=True).data
        return []

    class Meta:
        model = Post
        fields = [
            'id', 'owner', 'image', 'title', 'content', 'location',
            'tags', 'created_at', 'updated_at', 'is_owner', 'profile_id',
            'profile_image', 'like_id', 'comments_count', 'likes_count',
            'profile_name', 'location_data', 'tags_data'
        ]
