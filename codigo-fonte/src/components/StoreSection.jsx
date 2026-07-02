import { useEffect, useMemo, useState } from 'react';
import { storeItems } from '../data/wikiData.js';
import { Icon } from './Icon.jsx';
import { SectionTitle } from './SectionTitle.jsx';

const sessionKey = 'infernal-dungeon-session-v3';
const sessionUserKey = 'infernal-dungeon-session-user-v1';
const authUpdatedEvent = 'infernal-dungeon-auth-updated';

const emptyAddress = {
  street: '',
  number: '',
  district: '',
  city: '',
  state: '',
  zip: '',
  note: '',
};

const testAddress = {
  street: 'Rua das Catacumbas',
  number: '13',
  district: 'Distrito das Forjas',
  city: 'Curitiba',
  state: 'PR',
  zip: '80000-000',
  note: 'Endereço fictício para teste da loja.',
};

function createInitialStock() {
  return Object.fromEntries(storeItems.map((item) => [item.id, item.stock]));
}

function createQuantityState() {
  return Object.fromEntries(storeItems.map((item) => [item.id, 1]));
}

function readJson(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function readAccountSession() {
  return readJson(sessionUserKey, null);
}

function normalizeAddress(address) {
  return {
    street: address.street.trim(),
    number: address.number.trim(),
    district: address.district.trim(),
    city: address.city.trim(),
    state: address.state.trim().toUpperCase(),
    zip: address.zip.trim(),
    note: address.note.trim(),
  };
}

function findMissingAddressField(address) {
  const requiredFields = [
    ['street', 'rua'],
    ['number', 'número'],
    ['city', 'cidade'],
    ['state', 'estado'],
    ['zip', 'CEP'],
  ];

  return requiredFields.find(([field]) => !address[field].trim());
}

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function formatOrderAddress(address) {
  if (!address) {
    return 'Endereço não informado';
  }

  const cityState = [address.city, address.state].filter(Boolean).join(' - ');
  const firstLine = [address.street, address.number, address.district].filter(Boolean).join(', ');
  return [firstLine, cityState, address.zip].filter(Boolean).join(' | ');
}

function getOrderItems(order) {
  return Array.isArray(order.items) ? order.items : [];
}

function getOrderTotal(order) {
  if (Number.isFinite(Number(order.totalValue))) {
    return Number(order.totalValue);
  }

  return getOrderItems(order).reduce(
    (total, item) => total + (Number(item.totalValue) || 0),
    0,
  );
}

async function requestJson(endpoint, options = {}) {
  const response = await fetch(`/api${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error ?? 'Erro ao acessar o banco local.');
  }

  return data;
}

export function StoreSection() {
  const initialAccount = readAccountSession();
  const [stock, setStock] = useState(() => createInitialStock());
  const [orders, setOrders] = useState([]);
  const [activeAccount, setActiveAccount] = useState(initialAccount);
  const [savedAddress, setSavedAddress] = useState(emptyAddress);
  const [address, setAddress] = useState(emptyAddress);
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState(() => createQuantityState());
  const [isLoadingStore, setIsLoadingStore] = useState(true);
  const [databaseError, setDatabaseError] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const cartItems = useMemo(
    () =>
      cart
        .map((cartItem) => {
          const item = storeItems.find((storeItem) => storeItem.id === cartItem.itemId);

          if (!item) {
            return null;
          }

          return {
            ...item,
            quantity: cartItem.quantity,
            available: stock[item.id] ?? 0,
            subtotal: item.priceValue * cartItem.quantity,
          };
        })
        .filter(Boolean),
    [cart, stock],
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.subtotal, 0),
    [cartItems],
  );

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const savedAddressComplete = !findMissingAddressField(savedAddress);

  function applyStoreState(data, account, shouldUpdateAddress = true) {
    setStock({ ...createInitialStock(), ...(data.stock ?? {}) });
    setOrders(data.orders ?? []);
    setDatabaseError('');

    if (shouldUpdateAddress) {
      const nextAddress = account && data.address ? data.address : emptyAddress;
      setSavedAddress(nextAddress);
      setAddress(nextAddress);
    }
  }

  async function loadStoreData(account = activeAccount, shouldUpdateAddress = true) {
    setIsLoadingStore(true);

    try {
      const email = account?.email ? `?email=${encodeURIComponent(account.email)}` : '';
      const data = await requestJson(`/store/state${email}`);
      applyStoreState(data, account, shouldUpdateAddress);
    } catch (requestError) {
      setDatabaseError(
        requestError instanceof Error
          ? requestError.message
          : 'Não foi possível conectar ao banco local.',
      );
    } finally {
      setIsLoadingStore(false);
    }
  }

  useEffect(() => {
    void loadStoreData(initialAccount);

    function refreshAccount() {
      const nextAccount = readAccountSession();
      setActiveAccount(nextAccount);
      setCart([]);
      setMessage('');
      setError('');
      void loadStoreData(nextAccount);
    }

    function syncAuth(event) {
      if (event.key === sessionKey || event.key === sessionUserKey) {
        refreshAccount();
      }
    }

    window.addEventListener('storage', syncAuth);
    window.addEventListener(authUpdatedEvent, refreshAccount);

    return () => {
      window.removeEventListener('storage', syncAuth);
      window.removeEventListener(authUpdatedEvent, refreshAccount);
    };
  }, []);

  function clearFeedback() {
    setMessage('');
    setError('');
  }

  function updateAddress(field, value) {
    setAddress((current) => ({ ...current, [field]: value }));
  }

  function updateQuantity(itemId, value, available) {
    const parsed = Number.parseInt(value, 10);
    const safeAvailable = Math.max(available, 1);
    const nextValue = Number.isFinite(parsed)
      ? Math.min(Math.max(parsed, 1), safeAvailable)
      : 1;

    setQuantities((current) => ({ ...current, [itemId]: nextValue }));
  }

  function updateCartQuantity(itemId, value) {
    const available = stock[itemId] ?? 0;
    const parsed = Number.parseInt(value, 10);
    const nextValue = Number.isFinite(parsed)
      ? Math.min(Math.max(parsed, 1), Math.max(available, 1))
      : 1;

    setCart((current) =>
      current.map((cartItem) =>
        cartItem.itemId === itemId ? { ...cartItem, quantity: nextValue } : cartItem,
      ),
    );
  }

  async function saveAddress() {
    clearFeedback();

    if (!activeAccount) {
      setError('Entre ou crie uma conta para salvar o endereço.');
      return false;
    }

    const normalizedAddress = normalizeAddress(address);
    const missingField = findMissingAddressField(normalizedAddress);

    if (missingField) {
      setError(`Preencha o campo de ${missingField[1]} para salvar o endereço.`);
      return false;
    }

    try {
      const data = await requestJson('/store/address', {
        method: 'PUT',
        body: JSON.stringify({
          customerEmail: activeAccount.email,
          address: normalizedAddress,
        }),
      });

      applyStoreState(data, activeAccount);
      setMessage('Endereço salvo para esta conta.');
      return true;
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Erro ao salvar endereço.');
      return false;
    }
  }

  function clearAddressForm() {
    clearFeedback();
    setAddress(emptyAddress);
    setMessage('Campos de endereço limpos. O endereço salvo só muda se você salvar de novo.');
  }

  function fillTestAddress() {
    clearFeedback();
    setAddress(testAddress);
    setMessage('Endereço de teste preenchido. Você pode salvar ou finalizar a compra com ele.');
  }

  function addToCart(item) {
    clearFeedback();

    if (!activeAccount) {
      setError('Entre ou crie uma conta antes de montar uma compra.');
      return;
    }

    if (databaseError) {
      setError('O banco local precisa estar online para montar uma compra.');
      return;
    }

    const available = stock[item.id] ?? 0;
    const requestedQuantity = quantities[item.id] ?? 1;
    const currentCartQuantity =
      cart.find((cartItem) => cartItem.itemId === item.id)?.quantity ?? 0;

    if (available <= 0) {
      setError(`${item.name} está sem estoque no banco local.`);
      return;
    }

    if (currentCartQuantity + requestedQuantity > available) {
      setError(`O carrinho não pode passar do estoque disponível de ${item.name}.`);
      return;
    }

    setCart((current) => {
      const alreadyInCart = current.some((cartItem) => cartItem.itemId === item.id);

      if (alreadyInCart) {
        return current.map((cartItem) =>
          cartItem.itemId === item.id
            ? { ...cartItem, quantity: cartItem.quantity + requestedQuantity }
            : cartItem,
        );
      }

      return [...current, { itemId: item.id, quantity: requestedQuantity }];
    });
    setQuantities((current) => ({ ...current, [item.id]: 1 }));
    setMessage(`${requestedQuantity}x ${item.name} adicionado ao carrinho.`);
  }

  function removeFromCart(itemId) {
    clearFeedback();
    setCart((current) => current.filter((cartItem) => cartItem.itemId !== itemId));
    setMessage('Item removido do carrinho.');
  }

  function cancelCart() {
    clearFeedback();

    if (cart.length === 0) {
      setError('Não há compra em aberto para cancelar.');
      return;
    }

    setCart([]);
    setMessage('Compra cancelada. O carrinho foi limpo e nenhum estoque foi alterado.');
  }

  async function finalizePurchase() {
    clearFeedback();

    if (!activeAccount) {
      setError('Entre ou crie uma conta para finalizar a compra.');
      return;
    }

    if (cartItems.length === 0) {
      setError('Adicione pelo menos um produto ao carrinho antes de finalizar.');
      return;
    }

    const normalizedAddress = normalizeAddress(address);
    const missingField = findMissingAddressField(normalizedAddress);

    if (missingField) {
      setError(`Preencha o campo de ${missingField[1]} antes de finalizar a compra.`);
      return;
    }

    try {
      const data = await requestJson('/store/orders', {
        method: 'POST',
        body: JSON.stringify({
          customerName: activeAccount.name,
          customerEmail: activeAccount.email,
          address: normalizedAddress,
          items: cartItems.map((item) => ({
            itemId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      applyStoreState(data, activeAccount);
      setCart([]);
      setMessage(
        data.email?.sent
          ? `Compra finalizada: ${cartCount} item(ns), total ${formatCurrency(cartTotal)}. Confirmação enviada para ${activeAccount.email}.`
          : `Compra finalizada: ${cartCount} item(ns), total ${formatCurrency(cartTotal)}.`,
      );
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Erro ao finalizar compra.');
      void loadStoreData(activeAccount, false);
    }
  }

  async function cancelOrder(orderId) {
    clearFeedback();

    try {
      const data = await requestJson(`/store/orders/${orderId}/cancel`, {
        method: 'PATCH',
      });

      applyStoreState(data, activeAccount, false);
      setMessage('Pedido cancelado e estoque devolvido ao banco.');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Erro ao cancelar pedido.');
    }
  }

  return (
    <section className="page-section store-section" id="loja">
      <div className="content-shell">
        <SectionTitle
          eyebrow="Loja fictícia"
          title="Relicário do Abismo"
          text="Vitrine dark fantasy com conta vinculada, endereço salvo, carrinho, finalização e cancelamento usando banco local."
        />

        {!activeAccount ? (
          <article className="store-checkout store-login-required">
            <Icon name="userPlus" size={32} />
            <div>
              <p className="eyebrow">Checkout bloqueado</p>
              <h3>Entre ou crie uma conta para comprar</h3>
              <p>
                A loja usa o login local da wiki para vincular comprador ao endereço e aos pedidos
                gravados no banco local.
              </p>
              <div className="store-actions">
                <a className="primary-button" href="#conta">
                  <Icon name="userPlus" size={18} />
                  Criar conta
                </a>
                <a className="secondary-button" href="#conta">
                  <Icon name="login" size={18} />
                  Entrar
                </a>
              </div>
            </div>
          </article>
        ) : (
          <div className="store-checkout">
            <article className="checkout-account">
              <Icon name="shieldCheck" size={32} />
              <p className="eyebrow">Comprador vinculado</p>
              <h3>{activeAccount.name}</h3>
              <p>{activeAccount.email}</p>
              <span>
                {savedAddressComplete
                  ? `Endereço salvo: ${formatOrderAddress(savedAddress)}`
                  : 'Nenhum endereço salvo para esta conta.'}
              </span>
            </article>

            <form className="checkout-form" onSubmit={(event) => event.preventDefault()}>
              <h3>Endereço de entrega</h3>
              <label className="full-field">
                Rua
                <input
                  value={address.street}
                  onChange={(event) => updateAddress('street', event.target.value)}
                  placeholder="Rua das Catacumbas"
                />
              </label>
              <label>
                Número
                <input
                  value={address.number}
                  onChange={(event) => updateAddress('number', event.target.value)}
                  placeholder="13"
                />
              </label>
              <label>
                Bairro
                <input
                  value={address.district}
                  onChange={(event) => updateAddress('district', event.target.value)}
                  placeholder="Distrito das Forjas"
                />
              </label>
              <label>
                Cidade
                <input
                  value={address.city}
                  onChange={(event) => updateAddress('city', event.target.value)}
                  placeholder="Curitiba"
                />
              </label>
              <label>
                Estado
                <input
                  value={address.state}
                  onChange={(event) => updateAddress('state', event.target.value)}
                  placeholder="PR"
                  maxLength="2"
                />
              </label>
              <label>
                CEP
                <input
                  value={address.zip}
                  onChange={(event) => updateAddress('zip', event.target.value)}
                  placeholder="00000-000"
                />
              </label>
              <label className="full-field">
                Observação
                <textarea
                  value={address.note}
                  onChange={(event) => updateAddress('note', event.target.value)}
                  placeholder="Ex.: entregar no salão do núcleo"
                  rows="3"
                />
              </label>
              <div className="checkout-form-actions full-field">
                <button className="primary-button" type="button" onClick={saveAddress}>
                  <Icon name="save" size={18} />
                  Salvar endereço
                </button>
                <button className="secondary-button" type="button" onClick={clearAddressForm}>
                  Limpar campos
                </button>
                <button className="secondary-button" type="button" onClick={fillTestAddress}>
                  Usar endereço teste
                </button>
              </div>
            </form>
          </div>
        )}

        <section className="cart-panel" aria-label="Carrinho da loja">
          <div className="cart-panel-head">
            <div>
              <p className="eyebrow">Carrinho</p>
              <h3>Finalização da compra</h3>
            </div>
            <strong>{cartCount} item(ns)</strong>
          </div>
          {cartItems.length === 0 ? (
            <p className="cart-empty">
              {isLoadingStore ? 'Carregando estoque do banco...' : 'Adicione produtos ao carrinho para liberar a finalização.'}
            </p>
          ) : (
            <div className="cart-list">
              {cartItems.map((item) => (
                <article className="cart-item" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{formatCurrency(item.subtotal)}</span>
                  </div>
                  <label>
                    Qtd.
                    <input
                      type="number"
                      min="1"
                      max={Math.max(item.available, 1)}
                      value={item.quantity}
                      onChange={(event) => updateCartQuantity(item.id, event.target.value)}
                    />
                  </label>
                  <button
                    className="secondary-button danger-action"
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remover
                  </button>
                </article>
              ))}
            </div>
          )}
          <div className="cart-total">
            <span>Total do carrinho</span>
            <strong>{formatCurrency(cartTotal)}</strong>
          </div>
          <div className="cart-actions">
            <button
              className="primary-button"
              type="button"
              disabled={!activeAccount || cartItems.length === 0 || Boolean(databaseError)}
              onClick={finalizePurchase}
            >
              <Icon name="shoppingBag" size={18} />
              Finalizar compra
            </button>
            <button
              className="secondary-button danger-action"
              type="button"
              disabled={cartItems.length === 0}
              onClick={cancelCart}
            >
              Cancelar compra
            </button>
          </div>
        </section>

        {message ? <p className="form-message">{message}</p> : null}
        {error ? <p className="form-error">{error}</p> : null}
        {databaseError ? <p className="form-error">Banco local offline: {databaseError}</p> : null}

        <div className="store-grid">
          {storeItems.map((item) => {
            const available = stock[item.id] ?? 0;
            const quantity = quantities[item.id] ?? 1;

            return (
              <article className="store-item" key={item.name}>
                <Icon name="shoppingBag" size={28} />
                <h3>{item.name}</h3>
                <strong>{item.price}</strong>
                <p>{item.description}</p>
                <div className="store-meta">
                  <span>Estoque: {available}</span>
                  <span>Status: {available > 0 ? 'Disponível' : 'Esgotado'}</span>
                </div>
                <label className="store-quantity">
                  Quantidade
                  <input
                    type="number"
                    min="1"
                    max={Math.max(available, 1)}
                    value={quantity}
                    disabled={!activeAccount || available <= 0 || Boolean(databaseError)}
                    onChange={(event) => updateQuantity(item.id, event.target.value, available)}
                  />
                </label>
                <button
                  className="primary-button"
                  type="button"
                  disabled={!activeAccount || available <= 0 || Boolean(databaseError)}
                  onClick={() => addToCart(item)}
                >
                  <Icon name="shoppingBag" size={18} />
                  Adicionar {formatCurrency(item.priceValue * quantity)}
                </button>
              </article>
            );
          })}
        </div>

        {orders.length > 0 ? (
          <section className="orders-panel" aria-label="Pedidos registrados no banco local">
            <div className="orders-panel-head">
              <div>
                <p className="eyebrow">Histórico local</p>
                <h3>Pedidos do banco</h3>
              </div>
              <span>{orders.length} pedido(s)</span>
            </div>
            <div className="orders-list">
              {orders.map((order) => {
                const orderItems = getOrderItems(order);
                const orderDescription = orderItems
                  .map((item) => `${item.quantity ?? 1}x ${item.itemName}`)
                  .join(', ');

                return (
                  <article className="order-item" key={order.id}>
                    <div>
                      <strong>{orderDescription || 'Pedido da loja'}</strong>
                      <span>Cliente: {order.customerName ?? 'visitante'}</span>
                    </div>
                    <div>
                      <strong>{formatCurrency(getOrderTotal(order))}</strong>
                      <span>{order.status ?? 'Pedido registrado'}</span>
                    </div>
                    <p>{formatOrderAddress(order.address)}</p>
                    <small>{order.createdAt}</small>
                    <div className="order-actions">
                      <button
                        className="secondary-button danger-action"
                        type="button"
                        disabled={order.status === 'Cancelado' || Boolean(databaseError)}
                        onClick={() => cancelOrder(order.id)}
                      >
                        Cancelar pedido
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}
      </div>
    </section>
  );
}
