from .models import Game, Board
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import GameSerializer, BoardSerializer


# class GameViewSet(viewsets.ModelViewSet):
#       queryset = Game.objects.all()
#     permission_classes = [
#         permissions.AllowAny
#     ]
#     serializer_class = GameSerializer


class GameViewSet(viewsets.ViewSet):

    @action(detail=False, methods=['get'])
    def game(self, request):
        print("hello")
        queryset = Game.objects.all()

        serializer = GameSerializer(queryset, many=True)
        print(serializer)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def create_game(self, request):
        game = Game(board_size=request.data["board_size"])
        date = game.save()
        print(date)

        # print(request.data["board_size"])
        return Response("request.body")


class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = BoardSerializer
