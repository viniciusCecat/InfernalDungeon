import { LogIn, LogOut, Save, ShieldCheck, Trash2, UserPlus, UserRound } from 'lucide-react';
import { useMemo, useState } from 'react';
import { SectionTitle } from './SectionTitle.jsx';

const accountsKey = 'infernal-dungeon-accounts';
const sessionKey = 'infernal-dungeon-session';

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

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

export function AuthSection() {
  const [accounts, setAccounts] = useState(() => readJson(accountsKey, []));
  const [sessionEmail, setSessionEmail] = useState(() => readJson(sessionKey, null));
  const [mode, setMode] = useState('register');
  const [registerForm, setRegisterForm] = useState(emptyRegister);
  const [loginForm, setLoginForm] = useState(emptyLogin);
  const [profileForm, setProfileForm] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const activeAccount = useMemo(
    () => accounts.find((account) => account.email === sessionEmail) ?? null,
    [accounts, sessionEmail],
  );

  const editableProfile = profileForm ?? activeAccount;

  function saveAccounts(nextAccounts) {
    setAccounts(nextAccounts);
    window.localStorage.setItem(accountsKey, JSON.stringify(nextAccounts));
  }

  function updateRegister(field, value) {
    setRegisterForm((current) => ({ ...current, [field]: value }));
  }

  function updateLogin(field, value) {
    setLoginForm((current) => ({ ...current, [field]: value }));
  }

  function updateProfile(field, value) {
    setProfileForm((current) => ({ ...(current ?? activeAccount), [field]: value }));
  }

  function clearFeedback() {
    setMessage('');
    setError('');
  }

  function register(event) {
    event.preventDefault();
    clearFeedback();

    const email = normalizeEmail(registerForm.email);

    if (!registerForm.name.trim() || !email || registerForm.password.length < 4) {
      setError('Preencha nome, e-mail e uma senha com pelo menos 4 caracteres.');
      return;
    }

    if (accounts.some((account) => account.email === email)) {
      setError('Ja existe uma conta cadastrada com esse e-mail.');
      return;
    }

    const nextAccount = {
      ...registerForm,
      name: registerForm.name.trim(),
      email,
      createdAt: new Date().toLocaleDateString('pt-BR'),
    };
    const nextAccounts = [nextAccount, ...accounts];

    saveAccounts(nextAccounts);
    window.localStorage.setItem(sessionKey, JSON.stringify(email));
    setSessionEmail(email);
    setProfileForm(nextAccount);
    setRegisterForm(emptyRegister);
    setMessage('Conta criada e login realizado.');
  }

  function login(event) {
    event.preventDefault();
    clearFeedback();

    const email = normalizeEmail(loginForm.email);
    const account = accounts.find(
      (item) => item.email === email && item.password === loginForm.password,
    );

    if (!account) {
      setError('E-mail ou senha invalidos.');
      return;
    }

    window.localStorage.setItem(sessionKey, JSON.stringify(account.email));
    setSessionEmail(account.email);
    setProfileForm(account);
    setLoginForm(emptyLogin);
    setMessage('Login realizado com sucesso.');
  }

  function saveProfile(event) {
    event.preventDefault();
    clearFeedback();

    if (!activeAccount || !editableProfile) {
      return;
    }

    const nextEmail = normalizeEmail(editableProfile.email);

    if (!editableProfile.name.trim() || !nextEmail) {
      setError('Nome e e-mail sao obrigatorios.');
      return;
    }

    const emailInUse = accounts.some(
      (account) => account.email === nextEmail && account.email !== activeAccount.email,
    );

    if (emailInUse) {
      setError('Esse e-mail ja esta em uso em outra conta local.');
      return;
    }

    const updatedAccount = {
      ...editableProfile,
      name: editableProfile.name.trim(),
      email: nextEmail,
      password: editableProfile.password || activeAccount.password,
    };
    const nextAccounts = accounts.map((account) =>
      account.email === activeAccount.email ? updatedAccount : account,
    );

    saveAccounts(nextAccounts);
    window.localStorage.setItem(sessionKey, JSON.stringify(nextEmail));
    setSessionEmail(nextEmail);
    setProfileForm(updatedAccount);
    setMessage('Perfil atualizado.');
  }

  function logout() {
    window.localStorage.removeItem(sessionKey);
    setSessionEmail(null);
    setProfileForm(null);
    setMode('login');
    setMessage('Sessao encerrada.');
    setError('');
  }

  function deleteAccount() {
    if (!activeAccount) {
      return;
    }

    const confirmed = window.confirm(`Excluir a conta ${activeAccount.email}?`);

    if (!confirmed) {
      return;
    }

    const nextAccounts = accounts.filter((account) => account.email !== activeAccount.email);
    saveAccounts(nextAccounts);
    window.localStorage.removeItem(sessionKey);
    setSessionEmail(null);
    setProfileForm(null);
    setMode('register');
    setMessage('Conta excluida.');
    setError('');
  }

  return (
    <section className="page-section auth-section" id="conta">
      <div className="content-shell">
        <SectionTitle
          eyebrow="Acesso"
          title="Login e registro"
          text="Fluxo funcional da wiki: o visitante cria uma conta local, entra, consulta o perfil, altera dados e pode excluir o cadastro."
        />

        {message ? <p className="form-message">{message}</p> : null}
        {error ? <p className="form-error">{error}</p> : null}

        {activeAccount ? (
          <div className="auth-layout">
            <article className="profile-panel">
              <UserRound size={34} />
              <p className="eyebrow">Sessao ativa</p>
              <h3>{activeAccount.name}</h3>
              <p>{activeAccount.email}</p>
              <div className="account-summary">
                <span>Interesse: {activeAccount.interest}</span>
                <span>Criada em: {activeAccount.createdAt}</span>
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
                  <option>Participar de teste futuro</option>
                </select>
              </label>
              <label>
                Senha
                <input
                  type="password"
                  value={editableProfile?.password ?? ''}
                  onChange={(event) => updateProfile('password', event.target.value)}
                />
              </label>
              <div className="form-actions">
                <button className="primary-button" type="submit">
                  <Save size={18} />
                  Salvar perfil
                </button>
                <button className="secondary-button" type="button" onClick={logout}>
                  <LogOut size={18} />
                  Sair
                </button>
                <button className="secondary-button danger-action" type="button" onClick={deleteAccount}>
                  <Trash2 size={18} />
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
                      placeholder="Minimo 4 caracteres"
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
                      <option>Participar de teste futuro</option>
                    </select>
                  </label>
                  <button className="primary-button" type="submit">
                    <UserPlus size={18} />
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
                    <LogIn size={18} />
                    Entrar
                  </button>
                </form>
              )}
            </div>

            <article className="profile-panel">
              <ShieldCheck size={36} />
              <p className="eyebrow">Fluxo da entrega</p>
              <h3>Conta local da wiki</h3>
              <p>
                O cadastro simula o acesso de um visitante interessado no jogo.
                Depois do login, a pagina libera consulta, edicao, logout e exclusao da conta.
              </p>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}
