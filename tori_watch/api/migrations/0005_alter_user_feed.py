# Generated by Django 4.2.7 on 2023-12-09 13:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_user_feed'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='feed',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='user_feed', to='api.feed'),
        ),
    ]
