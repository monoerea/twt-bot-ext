from django.db import models

import string
import random
def generate_ids():
    length = 30
    while True:
        uid= ''.join(random.choices(string.ascii_uppercase, k=length))
        if User.objects.filter(uid = uid).count() == 0:
            break
    return uid

# Create your models here.

class User(models.Model):
    uid = models.CharField(max_length=30,primary_key=True, default=generate_ids, unique=True)
    session_id = models.CharField(max_length=128,default=generate_ids, unique=True)
    email = models.EmailField(null=False, default='')
    password = models.CharField(max_length=68, default="", unique=False)
    username = models.CharField(max_length=20, default="", unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
