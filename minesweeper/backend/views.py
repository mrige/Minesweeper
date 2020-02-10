from django.shortcuts import render
from .models import Board
from random import randint
import math


def generate_mines(id, size):
    num_mines = 0
    mine_location = []
    num_mines = int((math.pow(size, 2))/3)
    mine_coordinate = []
    x = 0
    y = 0
    for i in range(num_mines):
        while([x, y] in mine_coordinate):
            x = randint(0, size-1)
            y = randint(0, size-1)
        mine_coordinate.append([x, y])

        board_item = Board(game_id=id,
                           x_coord=x,
                           y_coord=y,
                           is_mine=True,
                           value='m')
        mine_location.append(board_item)

    count_list = generate_mine_count(id, mine_coordinate, num_mines, size)
    new_board = []
    new_board.extend(mine_location)
    new_board.extend(count_list)
    print(len(new_board))
    print(len(count_list))
    print(len(mine_location))
    return new_board


def generate_mine_count(id, mine_coordinate, num_mines, size):

    mine_neightbour_count = []
    check_neighbours = []

    for mine in mine_coordinate:
        neigbours = get_neighbours(mine[0], mine[1], size)
        for neigbour in neigbours:
            is_mine = neigbour in mine_coordinate
            if(not is_mine):
                checked = neigbour in check_neighbours
                if(checked):
                    checked_index = check_neighbours.index(neigbour)
                    mine_neightbour_count[checked_index].increase_mine_count()
                else:
                    board_item = Board(game_id=id,
                                       x_coord=neigbour[0],
                                       y_coord=neigbour[1],
                                       mine_count=1,
                                       value='0')
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
    print(neigbours_coord)

    return neigbours_coord
