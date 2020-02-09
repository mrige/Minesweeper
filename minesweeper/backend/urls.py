from rest_framework import routers
from .api import GameViewSet, BoardViewSet
"""
router = routers.DefaultRouter()
router.register('api/game', GameViewSet, 'game')
router.register('api/board', BoardViewSet, 'board')
urlpatterns = router.urls
"""

router = routers.DefaultRouter()
router.register(r"", GameViewSet, "game")
urlpatterns = router.urls
