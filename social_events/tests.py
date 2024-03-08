from django.contrib.auth.models import User
from .models import SocialEvent
from .models import Location
from rest_framework import status
from rest_framework.test import APITestCase
from django.utils import timezone
from datetime import timedelta


class EventsListViewTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test_user', password='password121212')
        self.location = Location.objects.create(latitude=6.304153756511198, longitude=53.369107747775786)
        self.event_date = timezone.now() + timedelta(weeks=3)

    def test_can_list_event(self):
        SocialEvent.objects.create(owner=self.user, title='test', location=self.location, event_date=self.event_date)
        response = self.client.get('/api/events/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logged_in_user_can_create_event(self):
        event_date_str = self.event_date.strftime('%Y-%m-%dT%H:%M:%S')
        self.client.login(username='test_user', password='password121212')
        response = self.client.post('/api/events/', {'title': 'a title', 'location': self.location.id, 'event_date': event_date_str})
        count = SocialEvent.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_not_logged_in__cant_create_event(self):
        event_date_str = self.event_date.strftime('%Y-%m-%dT%H:%M:%S')
        response = self.client.post('/api/events/', {'title': 'a title', 'location': self.location.id, 'event_date': event_date_str})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class EventDetailViewTests(APITestCase):
    def setUp(self):
        test_user_1 = User.objects.create_user(username='test_user_1', password='password121212')
        test_user_2 = User.objects.create_user(username='test_user_2', password='password121212')
        self.location = Location.objects.create(latitude=6.304153756511198, longitude=53.369107747775786)
        self.event_date = timezone.now() + timedelta(weeks=3)
        SocialEvent.objects.create(
            owner=test_user_1, title='a title', location=self.location, event_date=self.event_date
        )
        SocialEvent.objects.create(
            owner=test_user_2, title='another title', location=self.location, event_date=self.event_date
        )

    def test_can_retrieve_event_using_valid_id(self):
        response = self.client.get('/api/events/1')
        self.assertEqual(response.data['title'], 'a title')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_cant_retrieve_event_using_invalid_id(self):
        response = self.client.get('/api/events/999')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_user_can_update_own_event(self):
        event_date_str = self.event_date.strftime('%Y-%m-%dT%H:%M:%S')
        self.client.login(username='test_user_1', password='password121212')
        response = self.client.put('/api/events/1', {'title': 'a new title', 'location': self.location.id, 'event_date': event_date_str})
        event = SocialEvent.objects.filter(pk=1).first()
        self.assertEqual(event.title, 'a new title')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_cant_update_not_own_event(self):
        self.client.login(username='test_user_2', password='password121212')
        response = self.client.put('/api/events/1', {'title': 'a new title', 'location': self.location.id})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
