Projeto backend Django (controle de estoque)

Passos rápidos para rodar localmente (macOS / zsh):

1. Crie e ative um virtualenv

```bash
python3 -m venv .venv
source .venv/bin/activate
```

2. Instale dependências

```bash
pip install -r requirements.txt
```

3. Rode migrações e crie superuser

```bash
python manage.py migrate
python manage.py createsuperuser
```

4. Execute o servidor de desenvolvimento

```bash
python manage.py runserver
```

5. Acesse o painel de estoque em: http://127.0.0.1:8000/estoque/ (rota em português)
   O admin está em http://127.0.0.1:8000/admin/

Observações:
- O projeto usa sqlite3 por padrão para desenvolvimento.
- Em produção ajuste SECRET_KEY, DEBUG e DATABASES.

Integração com Firebase:

-- O app `estoque` inclui um endpoint de teste: `POST /estoque/firebase-login/` que aceita os campos:
   - `idToken`: token do Firebase (para testes locais, token começando com `TEST-` ou `FIREBASE-` é aceito)
   - `role`: `gerente` ou `funcionario` (ou `manager` / `employee`)

- Fluxo esperado (frontend Firebase):
   1. Autenticar com Firebase no frontend (web/mobile).
   2. Obter `idToken` (getIdToken) do Firebase.
      3. Fazer POST para `/estoque/firebase-login/` com `idToken` e `role`.
   4. O endpoint verifica o token (no dev: aceita `TEST-`), cria/obtém um `User` Django, coloca
       o usuário no grupo `gerente` ou `funcionario` e efetua login via sessão Django.

- Substituir o stub pelo Firebase Admin SDK (exemplo):

   from firebase_admin import auth as firebase_auth
   decoded = firebase_auth.verify_id_token(id_token)
   uid = decoded.get('uid')

   (ver docs: https://firebase.google.com/docs/admin/setup)

Após integração, o frontend pode redirecionar para `/stock/` que já verificará a autorização
baseada em grupos Django (`gerente`, `funcionario`) ou `is_staff`.

