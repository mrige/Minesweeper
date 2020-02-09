from django.shortcuts import render
from .models import Board
from random import randint


def generate_mines(id, size):
    num_mines = 0
    mine_location = []
    num_mines = int(size/2)
    mine_coordinate = []

    for i in range(num_mines):
        x = randint(0, size-1)
        y = randint(0, size-1)
        mine_coordinate.append([x, y])

        board_item = Board(game_id=id,
                           x_coord=x,
                           y_coord=y,
                           is_mine=True,
                           value='m')
        mine_location.append(board_item)

    count_list = generate_mine_count(id, mine_coordinate, num_mines)
    new_board = mine_location+count_list
    return new_board


def generate_mine_count(id, mine_coordinate, num_mines):

    mine_neightbour_count = []
    check_neighbours = []

    for mine in mine_coordinate:
        neigbours = get_neighbours(mine[0], mine[1], len(mine_coordinate))
        for neigbour in neigbours:
            is_mine = neigbour in mine_coordinate
            if(not is_mine):
                checked = check_neighbours.index(neigbour)
                if(checked):
                    mine_neightbour_count[checked].increase_mine_count()
                else:
                    board_item = Board(game_id=id,
                                       x_coord=neigbour[0],
                                       y_coord=neigbour[1],
                                       mine_count=1,
                                       value='1')
                    check_neighbours.append(neigbour)
                    mine_neightbour_count.append(board_item)
    return mine_neightbour_count


def get_neighbours(xcoord, ycoord, size):
    neigbours_coord = []

    if size > 0:
        for y in range(max(ycoord-1, 0), min(ycoord+1, size)+1):
            for x in range(max(xcoord-1, 0), min(xcoord+1, size)+1):
                if not (y == ycoord and x == xcoord):
                    neigbours_coord.append([x, y])

    return neigbours_coord
