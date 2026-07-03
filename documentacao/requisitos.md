# Documento de Requisitos

## Projeto

Infernal Dungeon

## Integrantes

- Vinicius Cecatto
- Leonardo Scheffer Nunes

## Objetivo do sistema

Desenvolver uma wiki/apresentacao oficial do jogo Infernal Dungeon, reunindo informacoes do universo, personagens, mascaras, torres, atualizacoes e loja ficticia.

O sistema tambem deve demonstrar um fluxo funcional completo com conta de usuario, persistencia em banco local, carrinho, endereco, pedidos e suporte por e-mail.

## Requisitos funcionais implementados

- RF01: Exibir pagina inicial de apresentacao do jogo.
- RF02: Exibir pagina de universo/background com lore do jogo.
- RF03: Exibir catalogo de personagens, NPCs, inimigos e mestres rivais.
- RF04: Permitir filtro de personagens por categoria.
- RF05: Exibir pagina de mascaras com habilidades, recarga, uso e risco.
- RF06: Exibir pagina de torres com dano, alcance, recarga e funcao.
- RF07: Exibir pagina de atualizacoes/devlog.
- RF08: Permitir cadastro de usuario.
- RF09: Permitir login de usuario.
- RF10: Permitir consulta e edicao de perfil.
- RF11: Permitir exclusao de conta.
- RF12: Manter sessao ativa no navegador durante a demonstracao.
- RF13: Permitir envio de mensagem de suporte por e-mail para usuario logado.
- RF14: Bloquear compra na loja para usuario sem login.
- RF15: Permitir salvar endereco de entrega vinculado a conta.
- RF16: Permitir adicionar produtos ao carrinho.
- RF17: Permitir alterar e remover itens do carrinho.
- RF18: Permitir finalizar compra.
- RF19: Registrar pedidos no banco local.
- RF20: Controlar estoque da loja no banco local.
- RF21: Permitir cancelamento de pedido.
- RF22: Exibir uma pagina de visualizacao do banco local para evidencias.

## Requisitos nao funcionais considerados

- RNF01: Utilizar React com interface componentizada.
- RNF02: Utilizar Vite para execucao do frontend.
- RNF03: Utilizar Node.js e Express para a API local.
- RNF04: Utilizar SQLite local com SQL.js para persistencia dos dados.
- RNF05: Utilizar Git e GitHub para controle de versao.
- RNF06: Manter o codigo organizado por componentes, dados, assets e servidor.
- RNF07: Nao salvar senhas em texto puro no banco.
- RNF08: Nao enviar arquivos sensiveis como `.env` para o repositorio.
- RNF09: Nao enviar o arquivo local do banco SQLite para o repositorio.
- RNF10: Manter interface responsiva para desktop e telas menores.
- RNF11: Usar SVGs locais para os icones da interface.
- RNF12: Permitir configuracao opcional de SMTP por arquivo `.env`.

## Fluxo funcional principal

1. Usuario acessa a wiki.
2. Usuario cria uma conta.
3. Usuario faz login.
4. Usuario consulta e edita o perfil.
5. Usuario acessa a loja.
6. Usuario salva um endereco.
7. Usuario adiciona produtos ao carrinho.
8. Usuario finaliza a compra.
9. Sistema registra pedido e reduz estoque no banco.
10. Usuario pode cancelar o pedido.
11. Sistema registra o cancelamento e devolve o estoque.

## Banco de dados

O sistema utiliza banco SQLite local criado automaticamente em:

```text
codigo-fonte/server/data/infernal-dungeon.sqlite
```

Tabelas usadas:

- `users`
- `products`
- `addresses`
- `orders`
- `order_items`

Visualizacao no navegador:

```text
http://127.0.0.1:5173/api/database
```
