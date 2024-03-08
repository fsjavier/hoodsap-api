from django.urls import path
from comments import views


urlpatterns = [
    path('post_comments/', views.PostCommentList.as_view()),
    path('post_comments/<int:pk>', views.PostCommentDetail.as_view()),
    path('event_comments/', views.SocialEventCommentList.as_view()),
    path('event_comments/<int:pk>', views.SocialEventCommentDetail.as_view()),
]
