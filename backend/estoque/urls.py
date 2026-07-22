from django.urls import path
from . import views

app_name = 'estoque'

urlpatterns = [
    path('', views.painel, name='painel'),
    path('criar/', views.produto_criar, name='produto_criar'),
    path('editar/<int:pk>/', views.produto_editar, name='produto_editar'),
    path('excluir/<int:pk>/', views.produto_excluir, name='produto_excluir'),
    path('firebase-login/', views.firebase_login, name='firebase_login'),
    path('intermediaria/', views.intermediaria, name='intermediaria'),
    path('api/dashboard-data/', views.api_dashboard_data, name='api_dashboard_data'),
]
