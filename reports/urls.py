from django.urls import path
from reports import views


urlpatterns = [
    path('post_reports/', views.PostReportList.as_view()),
    path('post_reports/<int:pk>', views.PostReportDetail.as_view()),
    path('event_reports/', views.SocialEventReportList.as_view()),
    path('event_reports/<int:pk>', views.PostReportDetail.as_view()),
]
