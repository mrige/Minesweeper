from .models import Game, Board
from rest_framework import viewsets, permissions
from .serializers import GameSerializer, BoardSerializer


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = GameSerializer


class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = BoardSerializer
