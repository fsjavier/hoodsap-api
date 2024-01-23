from django.db import models
from django.contrib.auth.models import User
from posts.models import Post


class Comment(models.Model):
    """
    Comment model, related to a user
    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.content


class PostComment(Comment):
    """
    Post comments, inherits from Comment
    """
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    class Meta:
        ordering = ['created_at']
    
    def __str__(self):
        return self.content