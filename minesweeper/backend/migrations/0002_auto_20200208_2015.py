# Generated by Django 3.0.3 on 2020-02-09 02:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='game_id',
            field=models.CharField(max_length=50, primary_key=True, serialize=False),
        ),
    ]