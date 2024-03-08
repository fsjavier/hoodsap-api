from django.contrib.auth.models import User
from .models import Post
from .models import Location
from rest_framework import status
from rest_framework.test import APITestCase


class PostListViewTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test_user', password='password121212')
        self.location = Location.objects.create(latitude=6.304153756511198, longitude=53.369107747775786)

    def test_can_list_posts(self):
        Post.objects.create(owner=self.user, title='test', location=self.location)
        response = self.client.get('/api/posts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logged_in_user_can_create_post(self):
        self.client.login(username='test_user', password='password121212')
        response = self.client.post('/api/posts/', {'title': 'a title', 'location': self.location.id})
        count = Post.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_not_logged_in__cant_create_post(self):
        response = self.client.post('/api/posts/', {'title': 'a title', 'location': self.location.id})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class PostDetailViewTests(APITestCase):
    def setUp(self):
        test_user_1 = User.objects.create_user(username='test_user_1', password='password121212')
        test_user_2 = User.objects.create_user(username='test_user_2', password='password121212')
        self.location = Location.objects.create(latitude=6.304153756511198, longitude=53.369107747775786)
        Post.objects.create(
            owner=test_user_1, title='a title', location=self.location
        )
        Post.objects.create(
            owner=test_user_2, title='another title', location=self.location
        )

    def test_can_retrieve_post_using_valid_id(self):
        response = self.client.get('/api/posts/1')
        self.assertEqual(response.data['title'], 'a title')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_cant_retrieve_post_using_invalid_id(self):
        response = self.client.get('/api/posts/999')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_user_can_update_own_post(self):
        self.client.login(username='test_user_1', password='password121212')
        response = self.client.put('/api/posts/1', {'title': 'a new title', 'location': self.location.id})
        post = Post.objects.filter(pk=1).first()
        self.assertEqual(post.title, 'a new title')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_cant_update_not_own_post(self):
        self.client.login(username='test_user_2', password='password121212')
        response = self.client.put('/api/posts/1', {'title': 'a new title', 'location': self.location.id})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
