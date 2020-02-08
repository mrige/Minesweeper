from django.db import models


class Game(models.Model):
    board_size = models.IntegerField()
    finished = models.BooleanField(default=False)
    win = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


class Board(models.Model):
    game_id = models.ForeignKey(Game, on_delete=models.CASCADE)
    x_coord = models.IntegerField()
    y_coord = models.IntegerField()
    value = models.CharField(max_length=1)
    checked = models.BooleanField(default=False)
