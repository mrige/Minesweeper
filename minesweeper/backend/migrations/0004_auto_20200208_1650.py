# Generated by Django 3.0.3 on 2020-02-08 22:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_board_checked'),
    ]

    operations = [
        migrations.RenameField(
            model_name='board',
            old_name='game',
            new_name='game_id',
        ),
    ]