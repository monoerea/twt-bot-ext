# Generated by Django 4.2.7 on 2023-12-16 03:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_remove_user_feed'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='session_id',
        ),
    ]