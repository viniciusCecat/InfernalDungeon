import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import initSqlJs from 'sql.js';
import { storeItems } from '../src/data/wikiData.js';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const databaseDir = path.join(currentDir, 'data');
const databasePath = path.join(databaseDir, 'infernal-dungeon.sqlite');

let db;

function persistDatabase() {
  fs.mkdirSync(databaseDir, { recursive: true });
  fs.writeFileSync(databasePath, Buffer.from(db.export()));
}

function run(sql, params = []) {
  db.run(sql, params);
}

function query(sql, params = []) {
  const statement = db.prepare(sql);
  const rows = [];

  statement.bind(params);

  while (statement.step()) {
    rows.push(statement.getAsObject());
  }

  statement.free();
  return rows;
}

function getOne(sql, params = []) {
  return query(sql, params)[0] ?? null;
}

function parseJson(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function normalizeEmail(email = '') {
  return String(email).trim().toLowerCase();
}

function hashPassword(password) {
  return createHash('sha256').update(String(password)).digest('hex');
}

function mapUser(row) {
  if (!row) {
    return null;
  }

  return {
    name: row.name,
    email: row.email,
    interest: row.interest,
    createdAt: row.created_at,
  };
}

function normalizeAddress(address = {}) {
  return {
    street: String(address.street ?? '').trim(),
    number: String(address.number ?? '').trim(),
    district: String(address.district ?? '').trim(),
    city: String(address.city ?? '').trim(),
    state: String(address.state ?? '').trim().toUpperCase(),
    zip: String(address.zip ?? '').trim(),
    note: String(address.note ?? '').trim(),
  };
}

function validateAddress(address) {
  const requiredFields = ['street', 'number', 'city', 'state', 'zip'];
  return requiredFields.every((field) => address[field]);
}

function getInitialStock() {
  return Object.fromEntries(storeItems.map((item) => [item.id, item.stock]));
}

function seedProducts() {
  storeItems.forEach((item) => {
    run(
      `INSERT INTO products (id, name, price, stock)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         name = excluded.name,
         price = excluded.price`,
      [item.id, item.name, item.priceValue, item.stock],
    );
  });
}

function createSchema() {
  run(`
    CREATE TABLE IF NOT EXISTS users (
      email TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      interest TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);

  run(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      stock INTEGER NOT NULL
    )
  `);

  run(`
    CREATE TABLE IF NOT EXISTS addresses (
      email TEXT PRIMARY KEY,
      address_json TEXT NOT NULL
    )
  `);

  run(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      total_value REAL NOT NULL,
      address_json TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL,
      created_order INTEGER NOT NULL,
      canceled_at TEXT
    )
  `);

  run(`
    CREATE TABLE IF NOT EXISTS order_items (
      order_id TEXT NOT NULL,
      item_id TEXT NOT NULL,
      item_name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unit_price REAL NOT NULL,
      total_value REAL NOT NULL,
      PRIMARY KEY (order_id, item_id),
      FOREIGN KEY(order_id) REFERENCES orders(id)
    )
  `);
}

function getStock() {
  const rows = query('SELECT id, stock FROM products ORDER BY id');
  return Object.fromEntries(rows.map((row) => [row.id, Number(row.stock)]));
}

function getAddress(customerEmail) {
  if (!customerEmail) {
    return null;
  }

  const row = getOne('SELECT address_json FROM addresses WHERE email = ?', [customerEmail]);
  return row ? parseJson(row.address_json, null) : null;
}

function getOrders() {
  const orders = query(`
    SELECT *
    FROM orders
    ORDER BY created_order DESC
  `);

  return orders.map((order) => {
    const items = query(
      `
        SELECT item_id, item_name, quantity, unit_price, total_value
        FROM order_items
        WHERE order_id = ?
        ORDER BY item_name
      `,
      [order.id],
    );

    return {
      id: order.id,
      customerName: order.customer_name,
      customerEmail: order.customer_email,
      totalValue: Number(order.total_value),
      address: parseJson(order.address_json, null),
      status: order.status,
      createdAt: order.created_at,
      canceledAt: order.canceled_at,
      items: items.map((item) => ({
        itemId: item.item_id,
        itemName: item.item_name,
        quantity: Number(item.quantity),
        unitPrice: Number(item.unit_price),
        totalValue: Number(item.total_value),
      })),
    };
  });
}

function getState(customerEmail) {
  return {
    stock: getStock(),
    orders: getOrders(),
    address: getAddress(customerEmail),
    database: {
      type: 'SQLite',
      file: databasePath,
    },
  };
}

export async function initDatabase() {
  const SQL = await initSqlJs({
    locateFile: (file) => path.join(currentDir, '..', 'node_modules', 'sql.js', 'dist', file),
  });

  fs.mkdirSync(databaseDir, { recursive: true });
  db = fs.existsSync(databasePath)
    ? new SQL.Database(fs.readFileSync(databasePath))
    : new SQL.Database();

  createSchema();
  seedProducts();
  persistDatabase();
}

export function saveAddress(customerEmail, address) {
  const normalizedAddress = normalizeAddress(address);

  if (!customerEmail || !validateAddress(normalizedAddress)) {
    throw new Error('Endereço incompleto.');
  }

  run(
    `INSERT INTO addresses (email, address_json)
     VALUES (?, ?)
     ON CONFLICT(email) DO UPDATE SET address_json = excluded.address_json`,
    [customerEmail, JSON.stringify(normalizedAddress)],
  );
  persistDatabase();
  return getState(customerEmail);
}

export function createOrder({ customerName, customerEmail, address, items }) {
  const normalizedAddress = normalizeAddress(address);

  if (!customerName || !customerEmail) {
    throw new Error('Cliente não informado.');
  }

  if (!validateAddress(normalizedAddress)) {
    throw new Error('Endereço incompleto.');
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Carrinho vazio.');
  }

  const orderId = `pedido-${Date.now()}`;
  const createdOrder = Date.now();
  const createdAt = new Date().toLocaleString('pt-BR');
  const orderItems = items.map((item) => {
    const product = getOne('SELECT * FROM products WHERE id = ?', [item.itemId]);
    const quantity = Number(item.quantity);

    if (!product || !Number.isInteger(quantity) || quantity <= 0) {
      throw new Error('Produto inválido no carrinho.');
    }

    if (Number(product.stock) < quantity) {
      throw new Error(`Estoque insuficiente para ${product.name}.`);
    }

    const unitPrice = Number(product.price);
    return {
      itemId: product.id,
      itemName: product.name,
      quantity,
      unitPrice,
      totalValue: unitPrice * quantity,
    };
  });
  const totalValue = orderItems.reduce((total, item) => total + item.totalValue, 0);

  run('BEGIN TRANSACTION');

  try {
    run(
      `INSERT INTO orders (
        id,
        customer_name,
        customer_email,
        total_value,
        address_json,
        status,
        created_at,
        created_order
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderId,
        customerName,
        customerEmail,
        totalValue,
        JSON.stringify(normalizedAddress),
        'Pedido recebido',
        createdAt,
        createdOrder,
      ],
    );

    orderItems.forEach((item) => {
      run('UPDATE products SET stock = stock - ? WHERE id = ?', [item.quantity, item.itemId]);
      run(
        `INSERT INTO order_items (
          order_id,
          item_id,
          item_name,
          quantity,
          unit_price,
          total_value
        )
        VALUES (?, ?, ?, ?, ?, ?)`,
        [orderId, item.itemId, item.itemName, item.quantity, item.unitPrice, item.totalValue],
      );
    });

    run(
      `INSERT INTO addresses (email, address_json)
       VALUES (?, ?)
       ON CONFLICT(email) DO UPDATE SET address_json = excluded.address_json`,
      [customerEmail, JSON.stringify(normalizedAddress)],
    );
    run('COMMIT');
  } catch (error) {
    run('ROLLBACK');
    throw error;
  }

  persistDatabase();
  return getState(customerEmail);
}

export function cancelOrder(orderId) {
  const order = getOne('SELECT * FROM orders WHERE id = ?', [orderId]);

  if (!order || order.status === 'Cancelado') {
    throw new Error('Pedido não pode ser cancelado.');
  }

  const items = query('SELECT item_id, quantity FROM order_items WHERE order_id = ?', [orderId]);

  run('BEGIN TRANSACTION');

  try {
    items.forEach((item) => {
      run('UPDATE products SET stock = stock + ? WHERE id = ?', [
        Number(item.quantity),
        item.item_id,
      ]);
    });
    run('UPDATE orders SET status = ?, canceled_at = ? WHERE id = ?', [
      'Cancelado',
      new Date().toLocaleString('pt-BR'),
      orderId,
    ]);
    run('COMMIT');
  } catch (error) {
    run('ROLLBACK');
    throw error;
  }

  persistDatabase();
  return getState(order.customer_email);
}

export function resetStore(customerEmail) {
  const initialStock = getInitialStock();

  run('BEGIN TRANSACTION');

  try {
    run('DELETE FROM order_items');
    run('DELETE FROM orders');
    run('DELETE FROM addresses');
    Object.entries(initialStock).forEach(([itemId, stock]) => {
      run('UPDATE products SET stock = ? WHERE id = ?', [stock, itemId]);
    });
    run('COMMIT');
  } catch (error) {
    run('ROLLBACK');
    throw error;
  }

  persistDatabase();
  return getState(customerEmail);
}

export function getStoreState(customerEmail) {
  return getState(customerEmail);
}

export function getDatabaseSnapshot() {
  const users = query(`
    SELECT email, name, interest, created_at
    FROM users
    ORDER BY created_at DESC, email
  `);
  const products = query(`
    SELECT id, name, price, stock
    FROM products
    ORDER BY name
  `).map((product) => ({
    ...product,
    price: Number(product.price),
    stock: Number(product.stock),
  }));
  const addresses = query(`
    SELECT email, address_json
    FROM addresses
    ORDER BY email
  `).map((address) => ({
    email: address.email,
    address: parseJson(address.address_json, null),
  }));
  const orderItems = query(`
    SELECT order_id, item_id, item_name, quantity, unit_price, total_value
    FROM order_items
    ORDER BY order_id DESC, item_name
  `).map((item) => ({
    orderId: item.order_id,
    itemId: item.item_id,
    itemName: item.item_name,
    quantity: Number(item.quantity),
    unitPrice: Number(item.unit_price),
    totalValue: Number(item.total_value),
  }));

  return {
    database: {
      type: 'SQLite',
      file: databasePath,
    },
    tables: ['users', 'products', 'addresses', 'orders', 'order_items'],
    users,
    products,
    addresses,
    orders: getOrders(),
    orderItems,
  };
}

export function getUser(email) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return null;
  }

  return mapUser(getOne('SELECT * FROM users WHERE email = ?', [normalizedEmail]));
}

export function registerUser({ name, email, password, interest }) {
  const normalizedEmail = normalizeEmail(email);
  const normalizedName = String(name ?? '').trim();
  const normalizedInterest = String(interest ?? 'Conhecer o jogo').trim() || 'Conhecer o jogo';

  if (!normalizedName || !normalizedEmail || String(password ?? '').length < 4) {
    throw new Error('Preencha nome, e-mail e uma senha com pelo menos 4 caracteres.');
  }

  if (getOne('SELECT email FROM users WHERE email = ?', [normalizedEmail])) {
    throw new Error('Já existe uma conta cadastrada com esse e-mail.');
  }

  run(
    `INSERT INTO users (email, name, password_hash, interest, created_at)
     VALUES (?, ?, ?, ?, ?)`,
    [
      normalizedEmail,
      normalizedName,
      hashPassword(password),
      normalizedInterest,
      new Date().toLocaleDateString('pt-BR'),
    ],
  );
  persistDatabase();
  return getUser(normalizedEmail);
}

export function loginUser({ email, password }) {
  const normalizedEmail = normalizeEmail(email);
  const row = getOne('SELECT * FROM users WHERE email = ?', [normalizedEmail]);

  if (!row || row.password_hash !== hashPassword(password ?? '')) {
    throw new Error('E-mail ou senha inválidos.');
  }

  return mapUser(row);
}

export function updateUser(currentEmail, { name, email, password, interest }) {
  const normalizedCurrentEmail = normalizeEmail(currentEmail);
  const currentUser = getOne('SELECT * FROM users WHERE email = ?', [normalizedCurrentEmail]);

  if (!currentUser) {
    throw new Error('Conta não encontrada no banco.');
  }

  const nextEmail = normalizeEmail(email);
  const nextName = String(name ?? '').trim();
  const nextInterest = String(interest ?? 'Conhecer o jogo').trim() || 'Conhecer o jogo';
  const nextPassword = String(password ?? '');

  if (!nextName || !nextEmail) {
    throw new Error('Nome e e-mail são obrigatórios.');
  }

  const emailInUse = getOne('SELECT email FROM users WHERE email = ? AND email <> ?', [
    nextEmail,
    normalizedCurrentEmail,
  ]);

  if (emailInUse) {
    throw new Error('Esse e-mail já está em uso em outra conta.');
  }

  const passwordHash = nextPassword ? hashPassword(nextPassword) : currentUser.password_hash;

  if (nextPassword && nextPassword.length < 4) {
    throw new Error('A nova senha precisa ter pelo menos 4 caracteres.');
  }

  run('BEGIN TRANSACTION');

  try {
    run(
      `UPDATE users
       SET email = ?, name = ?, password_hash = ?, interest = ?
       WHERE email = ?`,
      [nextEmail, nextName, passwordHash, nextInterest, normalizedCurrentEmail],
    );
    run('UPDATE addresses SET email = ? WHERE email = ?', [nextEmail, normalizedCurrentEmail]);
    run(
      `UPDATE orders
       SET customer_email = ?,
           customer_name = ?
       WHERE customer_email = ?`,
      [nextEmail, nextName, normalizedCurrentEmail],
    );
    run('COMMIT');
  } catch (error) {
    run('ROLLBACK');
    throw error;
  }

  persistDatabase();
  return getUser(nextEmail);
}

export function deleteUser(email) {
  const normalizedEmail = normalizeEmail(email);

  if (!getOne('SELECT email FROM users WHERE email = ?', [normalizedEmail])) {
    throw new Error('Conta não encontrada no banco.');
  }

  run('BEGIN TRANSACTION');

  try {
    run('DELETE FROM addresses WHERE email = ?', [normalizedEmail]);
    run('DELETE FROM users WHERE email = ?', [normalizedEmail]);
    run('COMMIT');
  } catch (error) {
    run('ROLLBACK');
    throw error;
  }

  persistDatabase();
  return { deleted: true };
}
