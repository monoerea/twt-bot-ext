# Generated by Django 4.2.7 on 2023-12-09 13:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_user_feed'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='feed',
        ),
    ]