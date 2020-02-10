from rest_framework import routers
from .api import GameViewSet, BoardViewSet


router = routers.DefaultRouter()
router.register("game", GameViewSet, "game")
router.register("board", BoardViewSet, "board")
urlpatterns = router.urls
