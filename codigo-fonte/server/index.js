import cors from 'cors';
import express from 'express';
import {
  cancelOrder,
  createOrder,
  deleteUser,
  getDatabaseSnapshot,
  getUser,
  getStoreState,
  initDatabase,
  loginUser,
  registerUser,
  resetStore,
  saveAddress,
  updateUser,
} from './database.js';

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());

function handleApiError(response, error) {
  response.status(400).json({
    error: error instanceof Error ? error.message : 'Erro inesperado no banco.',
  });
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatCell(value) {
  if (value && typeof value === 'object') {
    return escapeHtml(JSON.stringify(value));
  }

  return escapeHtml(value);
}

function renderTable(title, rows) {
  if (!rows.length) {
    return `<section><h2>${escapeHtml(title)}</h2><p class="empty">Sem registros.</p></section>`;
  }

  const columns = Object.keys(rows[0]);
  const head = columns.map((column) => `<th>${escapeHtml(column)}</th>`).join('');
  const body = rows
    .map(
      (row) =>
        `<tr>${columns.map((column) => `<td>${formatCell(row[column])}</td>`).join('')}</tr>`,
    )
    .join('');

  return `
    <section>
      <h2>${escapeHtml(title)} <span>${rows.length}</span></h2>
      <div class="table-wrap">
        <table>
          <thead><tr>${head}</tr></thead>
          <tbody>${body}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderDatabasePage(snapshot) {
  return `<!doctype html>
  <html lang="pt-BR">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Banco SQLite - Infernal Dungeon</title>
      <style>
        body {
          margin: 0;
          background: #f8f8ff;
          color: #1b1024;
          font-family: Arial, sans-serif;
        }

        header {
          background: #4b0082;
          color: #f8f8ff;
          padding: 24px 32px;
        }

        main {
          display: grid;
          gap: 20px;
          padding: 24px 32px;
        }

        section {
          border: 1px solid rgba(75, 0, 130, 0.18);
          background: #fff;
          padding: 18px;
        }

        h1,
        h2,
        p {
          margin: 0;
        }

        h2 {
          color: #8b008b;
          margin-bottom: 12px;
        }

        h2 span {
          color: #4b0082;
          font-size: 0.9rem;
        }

        code {
          overflow-wrap: anywhere;
        }

        .table-wrap {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.92rem;
        }

        th,
        td {
          border: 1px solid rgba(75, 0, 130, 0.14);
          padding: 9px;
          text-align: left;
          vertical-align: top;
        }

        th {
          background: rgba(64, 224, 208, 0.18);
        }

        td {
          overflow-wrap: anywhere;
        }

        .empty {
          color: #665873;
          font-weight: 700;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>Banco SQLite - Infernal Dungeon</h1>
        <p>Arquivo: <code>${escapeHtml(snapshot.database.file)}</code></p>
      </header>
      <main>
        ${renderTable('users', snapshot.users)}
        ${renderTable('products', snapshot.products)}
        ${renderTable('addresses', snapshot.addresses)}
        ${renderTable('orders', snapshot.orders)}
        ${renderTable('order_items', snapshot.orderItems)}
      </main>
    </body>
  </html>`;
}

await initDatabase();

app.get('/', (_request, response) => {
  response.type('text').send(
    'API do Infernal Dungeon rodando. Abra o site em http://127.0.0.1:5173/ ou teste /api/health.',
  );
});

app.get('/api/health', (_request, response) => {
  response.json({ ok: true, database: 'SQLite' });
});

app.get('/api/database', (_request, response) => {
  response.type('html').send(renderDatabasePage(getDatabaseSnapshot()));
});

app.get('/api/database/json', (_request, response) => {
  response.json(getDatabaseSnapshot());
});

app.get('/api/users/session', (request, response) => {
  response.json({ user: getUser(String(request.query.email ?? '')) });
});

app.post('/api/users/register', (request, response) => {
  try {
    response.status(201).json({ user: registerUser(request.body) });
  } catch (error) {
    handleApiError(response, error);
  }
});

app.post('/api/users/login', (request, response) => {
  try {
    response.json({ user: loginUser(request.body) });
  } catch (error) {
    handleApiError(response, error);
  }
});

app.put('/api/users/:email', (request, response) => {
  try {
    response.json({ user: updateUser(request.params.email, request.body) });
  } catch (error) {
    handleApiError(response, error);
  }
});

app.delete('/api/users/:email', (request, response) => {
  try {
    response.json(deleteUser(request.params.email));
  } catch (error) {
    handleApiError(response, error);
  }
});

app.get('/api/store/state', (request, response) => {
  response.json(getStoreState(String(request.query.email ?? '')));
});

app.put('/api/store/address', (request, response) => {
  try {
    response.json(saveAddress(request.body.customerEmail, request.body.address));
  } catch (error) {
    handleApiError(response, error);
  }
});

app.post('/api/store/orders', (request, response) => {
  try {
    response.status(201).json(createOrder(request.body));
  } catch (error) {
    handleApiError(response, error);
  }
});

app.patch('/api/store/orders/:id/cancel', (request, response) => {
  try {
    response.json(cancelOrder(request.params.id));
  } catch (error) {
    handleApiError(response, error);
  }
});

app.post('/api/store/reset', (request, response) => {
  try {
    response.json(resetStore(request.body?.customerEmail ?? ''));
  } catch (error) {
    handleApiError(response, error);
  }
});

app.listen(port, '127.0.0.1', () => {
  console.log(`Banco SQLite/API rodando em http://127.0.0.1:${port}`);
});
