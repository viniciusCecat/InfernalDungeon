# Infernal Dungeon

## Integrantes

- Vinicius Cecatto
- Leonardo Scheffer Nunes

## Resumo

Infernal Dungeon é uma wiki/apresentação oficial de um jogo tower defense dark fantasy multiplayer.

O site apresenta o universo do jogo, personagens, máscaras, torres, atualizações e uma loja fictícia. O fluxo funcional principal inclui conta de usuário, edição de perfil, suporte por e-mail, carrinho, endereço, pagamento fictício, registro de pedido e cancelamento.

## Tecnologias

- React
- Vite
- JavaScript
- HTML e CSS
- Node.js
- Express
- SQLite com SQL.js
- Git e GitHub

## Como executar

```bash
cd codigo-fonte
npm install
npm run dev
```

Site:

```text
http://127.0.0.1:5173/
```

Visualização do banco:

```text
http://127.0.0.1:5173/api/database
```

## E-mail opcional

Para ativar envio real de e-mail, copie o exemplo:

```bash
cp .env.example .env
```

Preencha:

```text
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app
EMAIL_FROM="Infernal Dungeon <seu-email@gmail.com>"
SUPPORT_TO=
```

O arquivo `.env` não deve ser enviado ao GitHub.

## Funcionalidades

- Página inicial do jogo.
- Página de universo/lore.
- Catálogo de personagens, NPCs, inimigos e rivais.
- Página de máscaras.
- Página de torres.
- Página de atualizações.
- Registro, login, edição e exclusão de conta.
- Confirmação antes de editar perfil e excluir conta.
- Suporte por e-mail.
- Loja fictícia com carrinho, endereço, pagamento fictício e cancelamento de pedido.
- Persistência de contas, produtos, estoque, endereços e pedidos.
- Visualização do banco pelo navegador.

## Repositório

```text
https://github.com/viniciusCecat/InfernalDungeon
```
