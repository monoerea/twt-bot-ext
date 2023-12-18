from django.db import models
from django.contrib.auth.models import AbstractUser
import string
import random
from .managers import CustomUserManager

def generate_ids():
    length = 30
    while True:
        uid= ''.join(random.choices(string.ascii_uppercase, k=length))
        if User.objects.filter(uid = uid).count() == 0:
            break
    return uid

# Create your models here.
class User(AbstractUser):
    uid = models.CharField(max_length=30,primary_key=True, default=generate_ids, unique=True)
    email = models.EmailField(null=False, default='')
    password = models.CharField(max_length=68, default="", unique=False)
    username = models.CharField(max_length=20, default="", unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['password', 'email']
    objects = CustomUserManager()
    def __str__(self):
        return self.username
    
class TwitterUser(models.Model):
    user_id = models.BigIntegerField(primary_key=True, unique=True)
    screen_name = models.CharField(max_length=50)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    followers_count = models.IntegerField(default=0)
    friends_count = models.IntegerField(default=0)
    created_at = models.DateTimeField()
    # Additional Twitter user attributes
    location = models.CharField(max_length=255, blank=True, null=True)
    url = models.URLField(blank=True, null=True)
    verified = models.BooleanField(default=False)
    profile_image_url = models.URLField(blank=True, null=True)
    # User activity
    statuses_count = models.IntegerField(default=0)
    favourites_count = models.IntegerField(default=0)
    # Additional user details
    lang = models.CharField(max_length=10, blank=True, null=True)
    time_zone = models.CharField(max_length=50, blank=True, null=True)
    utc_offset = models.IntegerField(blank=True, null=True)
    # Timestamps
    last_tweet_at = models.DateTimeField(blank=True, null=True)
    # Notification settings
    notifications_enabled = models.BooleanField(default=False)
    contributors_enabled = models.BooleanField(default=False)

    # Additional fields for user preferences
    is_premium_user = models.BooleanField(default=False)
    preferred_theme = models.CharField(max_length=20, blank=True, null=True)
    # Social connections
    following = models.ManyToManyField('TwitterUser', symmetrical=False, related_name='followers', blank=True)

    # Interaction and settings
    is_protected = models.BooleanField(default=False)
    is_suspended = models.BooleanField(default=False)
    has_geo_enabled = models.BooleanField(default=False)
    is_translator = models.BooleanField(default=False)
    default_profile = models.BooleanField(default=False)
    default_profile_image = models.BooleanField(default=False)
    # User statistics
    listed_count = models.IntegerField(default=0)
    
    # External links
    external_url = models.URLField(blank=True, null=True)
    external_blog = models.URLField(blank=True, null=True)
    
    # Add other fields as needed based on your requirements
    def __str__(self):
        return f"{self.screen_name} - {self.name}"

class Tweet(models.Model):
    tweet_id = models.BigIntegerField(primary_key=True, unique=True)
    user = models.ForeignKey(TwitterUser, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField()
    retweet_count = models.IntegerField(default=0)
    favorite_count = models.IntegerField(default=0)
    is_retweet = models.BooleanField(default=False)
    original_tweet = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='retweets')

    # Additional tweet-related fields
    reply_to_tweet = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')
    in_reply_to_user = models.ForeignKey(TwitterUser, null=True, blank=True, on_delete=models.CASCADE, related_name='user_replies')
    is_quote_tweet = models.BooleanField(default=False)
    quoted_tweet = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='quoted_tweets')
    
    # Additional metadata
    lang = models.CharField(max_length=10, blank=True, null=True)
    source = models.CharField(max_length=255, blank=True, null=True)
    
    # Add other tweet-related fields as needed
    def __str__(self):
        return f"{self.user.username}: {self.content}"
class Feed(models.Model):
    feed_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='feeds')  # Adjusted related_name
    tweets = models.ManyToManyField(Tweet)
    # Add other feed-related fields as needed
    def __str__(self):
        return f"Twitter Feed for {self.user.username}"