from django.db import models
from django.contrib.auth.models import User
from locations.models import Location
from cloudinary.models import CloudinaryField


class SocialEvent(models.Model):
    """
    Social Event model related to the user, with location.
    """
    event_category_choices = [
        ('games', 'Games'),
        ('movies', 'Movies'),
        ('street_art', 'Street art'),
        ('sport', 'Sport'),
        ('languages', 'Languages'),
        ('other', 'Other'),
    ]
    indoor_outdoor_choices = [
        ('indoor', 'Indoor'),
        ('outdoor', 'Outdoor')
    ]
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    image = CloudinaryField(
        folder='images/', default='default_post_orqqen'
    )
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True)
    location = models.ForeignKey(
        Location, on_delete=models.SET_NULL, null=True, blank=True
    )
    event_date = models.DateTimeField()
    event_category = models.CharField(
        max_length=32, choices=event_category_choices, default='other'
    )
    indoor_outdoor = models.CharField(
        max_length=15, choices=indoor_outdoor_choices, default='indoor'
    )
    event_registration = models.BooleanField(default=False)
    tags = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.title}'
