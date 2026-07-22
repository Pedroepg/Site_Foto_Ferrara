from django.db import models


class Produto(models.Model):
    """Modelo que representa um produto no estoque."""
    nome = models.CharField(max_length=200)
    sku = models.CharField(max_length=50, unique=True)
    quantidade = models.IntegerField(default=0)
    preco = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    descricao = models.TextField(blank=True)

    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.nome} ({self.sku})"
