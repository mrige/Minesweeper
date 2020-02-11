from .models import Game, Board
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import GameSerializer, BoardSerializer
from .views import generate_mines
import uuid


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = GameSerializer

    @action(detail=False, methods=['get'])
    def get_game(self, request, game_id=None):
        queryset = Game.objects.all()
        print(game_id)
        serializer = GameSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def create_game(self, request):
        id = uuid.uuid4()
        game = Game(game_id=id,
                    board_size=request.data["board_size"])

        mine_location, mine_count = generate_mines(
            game, request.data["board_size"])
        game.set_mine_count(mine_count)
        game.save()
        Board.objects.bulk_create(mine_location)
        serializer = GameSerializer(game, many=False)
        return Response(serializer.data)


class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = BoardSerializer

    lookup_field = 'game_id'

    def get(self, request, game_id=None):
        print(game_id)
        if(game_id):
            serializer = BoardSerializer(self.queryset, many=True)
            return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def get_board(self, request, game_id=None):
        if(game_id):
            queryset = Board.objects.filter(game_id=game_id)
            serializer = BoardSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            queryset = Board.objects.all()
            serializer = BoardSerializer(queryset, many=True)
            return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def mark_board(self, request):
        curr_game = Game.objects.get(game_id=request.data["game_id"])
        is_mine = Board.objects.filter(game_id=curr_game,
                                       x_coord=request.data["x_coord"],
                                       y_coord=request.data["y_coord"], is_mine=True)

        is_flagged = request.data["is_flagged"]
        if(is_mine):
            if (not is_flagged):
                return Response("game over")
            else:
                mine = is_mine.first()
                mine.is_flagged = is_flagged
                curr_game.increase_correct_flag_count()
                curr_game.save()
                mine.save()
                winner = curr_game.player_won()
                if(winner):
                    print("win")
                serializer = BoardSerializer(mine, many=False)
                return Response(serializer.data)

        else:
            board = Board.objects.filter(game_id=curr_game,
                                         x_coord=request.data["x_coord"],
                                         y_coord=request.data["y_coord"]).first()
            if(board):
                if(is_flagged):
                    board.is_flagged = is_flagged
                else:
                    board.checked = request.data["checked"]
                    board.is_flagged = is_flagged
                board.save()
                serializer = BoardSerializer(board, many=False)
                return Response(serializer.data)
            else:
                tile = Board(game_id=curr_game, x_coord=request.data["x_coord"],
                             y_coord=request.data["y_coord"],
                             value="x",
                             checked=request.data["checked"])
                tile.save()
                serializer = BoardSerializer(tile, many=False)
                return Response(serializer.data)
