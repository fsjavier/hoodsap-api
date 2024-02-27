from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from locations.models import Location


class Profile(models.Model):
    """
    Profile model extending the User model by adding additional
    fields to store user details.
    """
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    display_name = models.CharField(max_length=30, blank=True)
    bio = models.TextField(max_length=500, blank=True)
    avatar = models.ImageField(
        upload_to='images/', default='../avatar_unisex_dj6lm5'
    )
    location = models.ForeignKey(
        Location, on_delete=models.SET_NULL, null=True, blank=True
    )
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
