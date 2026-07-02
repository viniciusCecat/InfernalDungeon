import { useEffect, useState } from 'react';
import { Icon } from './Icon.jsx';
import { SectionTitle } from './SectionTitle.jsx';

const legacyAccountKeys = [
  'infernal-dungeon-accounts',
  'infernal-dungeon-session',
  'infernal-dungeon-accounts-v2',
  'infernal-dungeon-session-v2',
];
const sessionKey = 'infernal-dungeon-session-v3';
const sessionUserKey = 'infernal-dungeon-session-user-v1';
const authUpdatedEvent = 'infernal-dungeon-auth-updated';

const emptyRegister = {
  name: '',
  email: '',
  password: '',
  interest: 'Conhecer o jogo',
};

const emptyLogin = {
  email: '',
  password: '',
};

function readJson(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function clearLegacyAccounts() {
  legacyAccountKeys.forEach((key) => window.localStorage.removeItem(key));
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function notifyAuthUpdated() {
  window.dispatchEvent(new Event(authUpdatedEvent));
}

function saveSession(user) {
  window.localStorage.setItem(sessionKey, JSON.stringify(user.email));
  window.localStorage.setItem(sessionUserKey, JSON.stringify(user));
  notifyAuthUpdated();
}

function clearSession() {
  window.localStorage.removeItem(sessionKey);
  window.localStorage.removeItem(sessionUserKey);
  notifyAuthUpdated();
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
    throw new Error(data.error ?? 'Erro ao acessar o banco SQLite.');
  }

  return data;
}

function createProfileForm(account) {
  return account ? { ...account, password: '' } : null;
}

export function AuthSection() {
  const [activeAccount, setActiveAccount] = useState(() => readJson(sessionUserKey, null));
  const [mode, setMode] = useState('register');
  const [registerForm, setRegisterForm] = useState(emptyRegister);
  const [loginForm, setLoginForm] = useState(emptyLogin);
  const [profileForm, setProfileForm] = useState(() =>
    createProfileForm(readJson(sessionUserKey, null)),
  );
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoadingAccount, setIsLoadingAccount] = useState(false);

  const editableProfile = profileForm ?? createProfileForm(activeAccount);

  useEffect(() => {
    clearLegacyAccounts();

    async function restoreSession() {
      const sessionEmail = readJson(sessionKey, null);

      if (!sessionEmail) {
        return;
      }

      setIsLoadingAccount(true);

      try {
        const data = await requestJson(
          `/users/session?email=${encodeURIComponent(sessionEmail)}`,
        );

        if (data.user) {
          saveSession(data.user);
          setActiveAccount(data.user);
          setProfileForm(createProfileForm(data.user));
        } else {
          clearSession();
          setActiveAccount(null);
          setProfileForm(null);
        }
      } catch {
        setError('Não foi possível carregar a sessão salva no SQLite.');
      } finally {
        setIsLoadingAccount(false);
      }
    }

    void restoreSession();
  }, []);

  function updateRegister(field, value) {
    setRegisterForm((current) => ({ ...current, [field]: value }));
  }

  function updateLogin(field, value) {
    setLoginForm((current) => ({ ...current, [field]: value }));
  }

  function updateProfile(field, value) {
    setProfileForm((current) => ({ ...(current ?? createProfileForm(activeAccount)), [field]: value }));
  }

  function clearFeedback() {
    setMessage('');
    setError('');
  }

  async function register(event) {
    event.preventDefault();
    clearFeedback();

    const email = normalizeEmail(registerForm.email);

    try {
      const data = await requestJson('/users/register', {
        method: 'POST',
        body: JSON.stringify({
          ...registerForm,
          email,
          name: registerForm.name.trim(),
        }),
      });

      saveSession(data.user);
      setActiveAccount(data.user);
      setProfileForm(createProfileForm(data.user));
      setRegisterForm(emptyRegister);
      setMessage('Conta criada no SQLite e login realizado.');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Erro ao criar conta.');
    }
  }

  async function login(event) {
    event.preventDefault();
    clearFeedback();

    try {
      const data = await requestJson('/users/login', {
        method: 'POST',
        body: JSON.stringify({
          email: normalizeEmail(loginForm.email),
          password: loginForm.password,
        }),
      });

      saveSession(data.user);
      setActiveAccount(data.user);
      setProfileForm(createProfileForm(data.user));
      setLoginForm(emptyLogin);
      setMessage('Login realizado com sucesso usando o SQLite.');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Erro ao entrar.');
    }
  }

  async function saveProfile(event) {
    event.preventDefault();
    clearFeedback();

    if (!activeAccount || !editableProfile) {
      return;
    }

    try {
      const data = await requestJson(`/users/${encodeURIComponent(activeAccount.email)}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: editableProfile.name,
          email: normalizeEmail(editableProfile.email),
          interest: editableProfile.interest,
          password: editableProfile.password,
        }),
      });

      saveSession(data.user);
      setActiveAccount(data.user);
      setProfileForm(createProfileForm(data.user));
      setMessage('Perfil atualizado no SQLite.');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Erro ao salvar perfil.');
    }
  }

  function logout() {
    clearSession();
    setActiveAccount(null);
    setProfileForm(null);
    setMode('login');
    setMessage('Sessão encerrada.');
    setError('');
  }

  async function deleteAccount() {
    if (!activeAccount) {
      return;
    }

    const confirmed = window.confirm(`Excluir a conta ${activeAccount.email} do SQLite?`);

    if (!confirmed) {
      return;
    }

    clearFeedback();

    try {
      await requestJson(`/users/${encodeURIComponent(activeAccount.email)}`, {
        method: 'DELETE',
      });

      clearSession();
      setActiveAccount(null);
      setProfileForm(null);
      setMode('register');
      setMessage('Conta excluída do SQLite.');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Erro ao excluir conta.');
    }
  }

  return (
    <section className="page-section auth-section" id="conta">
      <div className="content-shell">
        <SectionTitle
          eyebrow="Acesso"
          title="Login e registro"
          text="Fluxo funcional da wiki: o visitante cria uma conta no SQLite, entra, consulta o perfil, altera dados e pode excluir o cadastro."
        />

        {isLoadingAccount ? <p className="form-message">Carregando conta do SQLite...</p> : null}
        {message ? <p className="form-message">{message}</p> : null}
        {error ? <p className="form-error">{error}</p> : null}

        {activeAccount ? (
          <div className="auth-layout">
            <article className="profile-panel">
              <Icon name="user" size={34} />
              <p className="eyebrow">Sessão ativa</p>
              <h3>{activeAccount.name}</h3>
              <p>{activeAccount.email}</p>
              <div className="account-summary">
                <span>Interesse: {activeAccount.interest}</span>
                <span>Criada em: {activeAccount.createdAt}</span>
                <span>Origem: SQLite local</span>
              </div>
            </article>

            <form className="auth-form" onSubmit={saveProfile}>
              <h3>Editar perfil</h3>
              <label>
                Nome
                <input
                  value={editableProfile?.name ?? ''}
                  onChange={(event) => updateProfile('name', event.target.value)}
                />
              </label>
              <label>
                E-mail
                <input
                  type="email"
                  value={editableProfile?.email ?? ''}
                  onChange={(event) => updateProfile('email', event.target.value)}
                />
              </label>
              <label>
                Interesse
                <select
                  value={editableProfile?.interest ?? 'Conhecer o jogo'}
                  onChange={(event) => updateProfile('interest', event.target.value)}
                >
                  <option>Conhecer o jogo</option>
                  <option>Receber novidades</option>
                  <option>Acompanhar desenvolvimento</option>
                  <option>Encontrar grupo de invasão</option>
                </select>
              </label>
              <label>
                Nova senha
                <input
                  type="password"
                  value={editableProfile?.password ?? ''}
                  onChange={(event) => updateProfile('password', event.target.value)}
                  placeholder="Deixe em branco para manter"
                />
              </label>
              <div className="form-actions">
                <button className="primary-button" type="submit">
                  <Icon name="save" size={18} />
                  Salvar perfil
                </button>
                <button className="secondary-button" type="button" onClick={logout}>
                  <Icon name="logout" size={18} />
                  Sair
                </button>
                <button className="secondary-button danger-action" type="button" onClick={deleteAccount}>
                  <Icon name="trash" size={18} />
                  Excluir conta
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="auth-layout">
            <div className="auth-card">
              <div className="auth-tabs" aria-label="Alternar entre registro e login">
                <button
                  className={mode === 'register' ? 'active' : ''}
                  type="button"
                  onClick={() => {
                    clearFeedback();
                    setMode('register');
                  }}
                >
                  Registro
                </button>
                <button
                  className={mode === 'login' ? 'active' : ''}
                  type="button"
                  onClick={() => {
                    clearFeedback();
                    setMode('login');
                  }}
                >
                  Login
                </button>
              </div>

              {mode === 'register' ? (
                <form className="auth-form" onSubmit={register}>
                  <h3>Criar conta</h3>
                  <label>
                    Nome
                    <input
                      value={registerForm.name}
                      onChange={(event) => updateRegister('name', event.target.value)}
                      placeholder="Vinicius Cecatto"
                    />
                  </label>
                  <label>
                    E-mail
                    <input
                      type="email"
                      value={registerForm.email}
                      onChange={(event) => updateRegister('email', event.target.value)}
                      placeholder="email@exemplo.com"
                    />
                  </label>
                  <label>
                    Senha
                    <input
                      type="password"
                      value={registerForm.password}
                      onChange={(event) => updateRegister('password', event.target.value)}
                      placeholder="Mínimo 4 caracteres"
                    />
                  </label>
                  <label>
                    Interesse
                    <select
                      value={registerForm.interest}
                      onChange={(event) => updateRegister('interest', event.target.value)}
                    >
                      <option>Conhecer o jogo</option>
                      <option>Receber novidades</option>
                      <option>Acompanhar desenvolvimento</option>
                      <option>Encontrar grupo de invasão</option>
                    </select>
                  </label>
                  <button className="primary-button" type="submit">
                    <Icon name="userPlus" size={18} />
                    Registrar
                  </button>
                </form>
              ) : (
                <form className="auth-form" onSubmit={login}>
                  <h3>Entrar</h3>
                  <label>
                    E-mail
                    <input
                      type="email"
                      value={loginForm.email}
                      onChange={(event) => updateLogin('email', event.target.value)}
                      placeholder="email@exemplo.com"
                    />
                  </label>
                  <label>
                    Senha
                    <input
                      type="password"
                      value={loginForm.password}
                      onChange={(event) => updateLogin('password', event.target.value)}
                      placeholder="Senha cadastrada"
                    />
                  </label>
                  <button className="primary-button" type="submit">
                    <Icon name="login" size={18} />
                    Entrar
                  </button>
                </form>
              )}
            </div>

            <article className="profile-panel">
              <Icon name="shieldCheck" size={36} />
              <p className="eyebrow">Fluxo da entrega</p>
              <h3>Conta no banco SQLite</h3>
              <p>
                O cadastro simula o acesso de um visitante interessado no jogo.
                Depois do login, a página libera consulta, edição, logout e exclusão da conta.
              </p>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}
