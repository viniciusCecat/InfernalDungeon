# Infernal Dungeon

## Integrantes

| Nome |
| --- |
| Vinicius Cecatto |
| Leonardo Scheffer Nunes |

## Descrição resumida

Infernal Dungeon é uma wiki/apresentação oficial do jogo proposto na Etapa 1. O jogo é um tower defense dark fantasy multiplayer com tema de dungeon em que cada jogador controla um núcleo, posiciona torres, recruta NPCs, evolui recursos em camadas mais profundas e invade dungeons de jogadores rivais. O site organiza as informações principais do universo, personagens, comerciantes, inimigos, torres, sistema de máscaras, atualizações e loja fictícia.

Os fluxos funcionais completos implementados são o acesso do visitante e a compra na loja fictícia. O usuário consegue criar uma conta, fazer login, consultar o perfil, editar os dados, sair da sessão, excluir a conta, salvar endereço de entrega, montar carrinho, validar a compra, passar por pagamento fictício, finalizar o pedido e cancelar pedidos vinculados ao login. Contas, produtos, estoque, endereços e pedidos ficam salvos em um banco SQLite local.

A wiki foi organizada em páginas separadas dentro da aplicação React: Início, Universo, Personagens, Máscaras, Torres, Conta, Atualizações e Loja.

## Tecnologias utilizadas

- React
- Vite
- JavaScript
- HTML
- CSS
- Node.js
- Express
- SQLite local com SQL.js
- SVGs locais
- Git e GitHub

## Instruções para execução

1. Acesse a pasta do código:

```bash
cd InfernalDungeon/codigo-fonte
```

2. Instale as dependências:

```bash
npm install
```

3. Rode o projeto:

```bash
npm run dev
```

4. O comando sobe o frontend e a API do banco ao mesmo tempo. Abra o endereço exibido pelo Vite no navegador, normalmente:

```text
http://localhost:5173
```

A API da loja roda em `http://127.0.0.1:3001` e o arquivo do banco é criado em `codigo-fonte/server/data/infernal-dungeon.sqlite`.

Para visualizar o banco no navegador, acesse:

```text
http://127.0.0.1:5173/api/database
```

Para visualizar os dados em JSON, acesse:

```text
http://127.0.0.1:5173/api/database/json
```

## Configuração opcional de e-mail

O projeto pode enviar e-mail real no cadastro e na finalização de pedido. Para isso, copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Depois preencha o `.env` com os dados SMTP:

```text
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app
EMAIL_FROM="Infernal Dungeon <seu-email@gmail.com>"
SUPPORT_TO=
```

O arquivo `.env` nao deve ser enviado ao GitHub. A senha usada deve ser senha de app, nao a senha normal da conta.
Se `SUPPORT_TO` ficar vazio, as mensagens de suporte sao enviadas para o e-mail configurado em `EMAIL_FROM`. O e-mail da conta logada fica como resposta da mensagem.

## Funcionalidades implementadas

- Página inicial de apresentação do jogo.
- Página de background/universo do Infernal Dungeon.
- Página de personagens, NPCs comerciantes, inimigos, mestres rivais e invasores rivais com filtro por categoria e lore expandida.
- Página de máscaras com poderes, uso, recarga e risco.
- Página de torres infernais com dano, alcance, recarga e função.
- Sistema de login e registro com consulta, edição e exclusão de conta no SQLite.
- Página de atualizações/devlog.
- Página de loja fictícia com produtos, bloqueio para usuário sem login, endereço salvo, carrinho, validação de compra, pagamento fictício, cancelamento de pedido, estoque controlado no SQLite e registro de pedidos no banco.
- Interface componentizada em React.
- Persistência de contas e loja usando SQLite local com tabelas de usuários, produtos, pedidos, itens do pedido e endereços.
- Uso de `localStorage` apenas para manter a sessão ativa do navegador durante a demonstração.
- Envio opcional de e-mail real para cadastro, confirmação de pedido e suporte quando SMTP estiver configurado.

## Link do repositório

https://github.com/viniciusCecat/InfernalDungeon

## Link do vídeo de demonstração

Vídeo pendente de gravação. Inserir aqui o link do vídeo de demonstração após o upload.
