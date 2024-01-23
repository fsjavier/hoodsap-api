from django.urls import path
from social_events import views


urlpatterns = [
    path('events/', views.SocialEventList.as_view()),
    path('events/<int:pk>', views.SocialEventDetail.as_view()),
]