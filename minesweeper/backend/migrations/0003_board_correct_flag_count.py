# Generated by Django 3.0.2 on 2020-02-10 17:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_auto_20200210_1036'),
    ]

    operations = [
        migrations.AddField(
            model_name='board',
            name='correct_flag_count',
            field=models.IntegerField(default=0),
        ),
    ]
