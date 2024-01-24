from django.db import models


class Location(models.Model):
    """
    Location model
    """
    latitude = models.FloatField()
    longitude = models.FloatField()
    country = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    locality = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.locality}, {self.city}, {self.country}'
