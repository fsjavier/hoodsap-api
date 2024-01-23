from django.db import IntegrityError
from rest_framework import serializers
from .models import Like


class LikeSerializer(serializers.ModelSerializer):
    """
    Like serializer
    """
    owner = serializers.ReadOnlyField(source='owner.profile.display_name')

    class Meta:
        model = Like
        fields = [
            'id', 'owner', 'post', 'created_at'
        ]

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({
                'detail': 'possible duplicate'
            })