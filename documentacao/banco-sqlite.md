# Banco SQLite

O projeto usa um banco SQLite local para persistir os dados funcionais da conta e da loja.

## Arquivo do banco

```text
codigo-fonte/server/data/infernal-dungeon.sqlite
```

O arquivo e criado automaticamente ao executar:

```bash
npm run dev
```

## Tabelas

- `users`: contas cadastradas, login e perfil.
- `products`: produtos da loja e estoque.
- `addresses`: enderecos salvos por conta.
- `orders`: pedidos finalizados e status do pedido.
- `order_items`: itens vinculados a cada pedido.

## Visualizacao

Com a aplicacao rodando, o banco pode ser visualizado no navegador em:

```text
http://127.0.0.1:5173/api/database
```

A versao JSON fica em:

```text
http://127.0.0.1:5173/api/database/json
```

Tambem e possivel abrir o arquivo `.sqlite` no DB Browser for SQLite.
