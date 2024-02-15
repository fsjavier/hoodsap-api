from django.db import models
from django.contrib.auth.models import User
from locations.models import Location
from tags.models import Tag
from cloudinary.models import CloudinaryField


class Post(models.Model):
    """
    Post model related to the user, with location.
    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to='images/', blank=True
    )
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True)
    location = models.ForeignKey(
        Location, on_delete=models.CASCADE
    )
    tags = models.ManyToManyField(Tag, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.title}'
