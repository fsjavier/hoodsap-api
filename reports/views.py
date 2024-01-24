from rest_framework import generics
from .models import PostReport, SocialEventReport
from .serializers import PostReportSerializer, SocialEventReportSerializer
from hoodsap_api.permissions import IsAdminOrCreateOnly


class PostReportList(generics.ListCreateAPIView):
    """
    List all post reports and create if the user is logged in
    """
    serializer_class = PostReportSerializer
    permission_classes = [
        IsAdminOrCreateOnly
    ]
    queryset = PostReport.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PostReportDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a post report by id. Only admins can retrieve,
    update and delete reports
    """
    serializer_class = PostReportSerializer
    permission_classes = [
        IsAdminOrCreateOnly
    ]
    queryset = PostReport.objects.all()


class SocialEventReportList(generics.ListCreateAPIView):
    """
    List all social events and create if the user is logged in
    """
    serializer_class = SocialEventReportSerializer
    permission_classes = [
        IsAdminOrCreateOnly
    ]
    queryset = SocialEventReport.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class SocialEventReportDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a social event report by id. Only admins can retrieve,
    update and delete reports
    """
    serializer_class = SocialEventReportSerializer
    permission_classes = [
        IsAdminOrCreateOnly
    ]
    queryset = SocialEventReport.objects.all()
