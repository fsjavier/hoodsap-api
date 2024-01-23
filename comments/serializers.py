from rest_framework import serializers
from .models import PostComment, SocialEventComment


class PostCommentSerializer(serializers.ModelSerializer):
    """
    Serializer for the PostComment model
    """
    owner = serializers.ReadOnlyField(source='owner.profile.display_name')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = PostComment
        fields = [
            'id', 'owner', 'content', 'post', 'created_at', 'updated_at',
            'is_owner', 'profile_id', 'profile_image'
        ]


class PostCommentDetailSerializer(PostCommentSerializer):
    """
    Serializer for the PostComment model in detail view
    """
    post = serializers.ReadOnlyField(source='post.id')


class SocialEventCommentSerializer(serializers.ModelSerializer):
    """
    Serializer for the SocialEventComment model
    """
    owner = serializers.ReadOnlyField(source='owner.profile.display_name')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = SocialEventComment
        fields = [
            'id', 'owner', 'content', 'social_event', 'created_at', 'updated_at',
            'is_owner', 'profile_id', 'profile_image'
        ]


class SocialEventCommentDetailSerializer(SocialEventCommentSerializer):
    """
    Serializer for the SocialEventComment model in detail view
    """
    social_event = serializers.ReadOnlyField(source='social_event.id')
