from django.contrib import admin
from .models import Comment, PostComment

admin.site.register(Comment)
admin.site.register(PostComment)