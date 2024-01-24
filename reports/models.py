from django.db import models
from django.contrib.auth.models import User
from posts.models import Post
from social_events.models import SocialEvent


class Report(models.Model):
    """
    Report model, related to a user
    """
    flag_choices = [
        ('inappropriate', 'Inappropriate content'),
        ('spam', 'Spam'),
        ('offensive', 'Offensive content'),
        ('violence', 'Violent content'),
        ('sexual', 'Sexual content'),
        ('unrelated', 'Not related to the neighbourhood'),
        ('other', 'Other')
    ]
    status_choices = [
        ('open', 'Open'),
        ('closed', 'Closed')
    ]
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    flag = models.CharField(
        max_length=50, choices=flag_choices, default='other'
    )
    content = models.TextField(blank=True, null=True)
    status = models.CharField(
        max_length=50, choices=status_choices, default='open'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.flag


class PostReport(Report):
    """
    Report posts, inherits from Report
    """
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f'{self.flag} {self.post}'


class SocialEventReport(Report):
    """
    Report social events, inherits from Report
    """
    social_event = models.ForeignKey(SocialEvent, on_delete=models.CASCADE)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f'{self.content} {self.social_event}'
