from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField


class Profile(models.Model):
    """
    Profile model extending the User model by adding additional
    fields to store user details.
    """
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    display_name = models.CharField(max_length=255, blank=True)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    bio = models.TextField(blank=True)
    avatar = CloudinaryField(
        folder='images/', default='profile_avatar_nxydwh'
    )
    location = models.FloatField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.owner}'s profile"

    def save(self, *args, **kwargs):
        """
        Assign the username to display_name
        """
        if not self.display_name:
            self.display_name = self.owner.username
        super(Profile, self).save(*args, **kwargs)


def create_profile(sender, instance, created, **kwargs):
    """
    Create user profile when a user is created
    """
    if created:
        Profile.objects.create(owner=instance)


post_save.connect(create_profile, sender=User)
