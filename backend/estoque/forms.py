from django import forms
from .models import Produto


class FormularioProduto(forms.ModelForm):
    class Meta:
        model = Produto
        fields = ['nome', 'sku', 'quantidade', 'preco', 'descricao']
