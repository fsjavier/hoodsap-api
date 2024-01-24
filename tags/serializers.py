from rest_framework import serializers
from .models import Tag


class TagSerializer(serializers.ModelSerializer):
    """
    Serializer for the Tag model
    """
    class Meta:
        model = Tag
        fields = ['id', 'name']
