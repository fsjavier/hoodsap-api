from django.db import models


class Tag(models.Model):
    """
    Tags model
    """
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
