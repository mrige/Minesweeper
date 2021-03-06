from django.db import models


class Game(models.Model):
    game_id = models.CharField(primary_key=True, max_length=60)
    board_size = models.IntegerField()
    finished = models.BooleanField(default=False)
    win = models.BooleanField(default=False)
    mine_count = models.IntegerField(default=0)
    correct_flag_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def set_mine_count(self, count):
        self.mine_count = count

    def increase_correct_flag_count(self):
        self.correct_flag_count = self.correct_flag_count + 1

    def player_won(self):
        return self.mine_count == self.correct_flag_count


class Board(models.Model):
    game_id = models.ForeignKey(Game, on_delete=models.CASCADE)
    x_coord = models.IntegerField()
    y_coord = models.IntegerField()
    is_mine = models.BooleanField(default=False)
    mine_count = models.IntegerField(default=0)
    is_flagged = models.BooleanField(default=False)

    value = models.CharField(max_length=1)
    checked = models.BooleanField(default=False)

    def get_coord(self):
        return [self.x_coord, self.y_coord]

    def __eq__(self, other):
        if isinstance(other, Board):
            if (self.game_id == other.game_id and self.x_coord == other.x_coord and y_coord == other.y_coord):
                return True
            else:
                return False
        return NotImplemented

    def is_number(self):
        return self.mine_count > 0

    def reveal(self):
        self.checked = True

    def increase_mine_count(self):
        self.mine_count = self.mine_count + 1
