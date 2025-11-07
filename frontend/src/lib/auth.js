const USERS_KEY = "pb_users";
const SESSION_KEY = "pb_user";
const DEMO_USER = {
  id: "demo",
  name: "Conta Demo",
  email: "demo@passa-bola.com",
  password: "",
  createdAt: new Date().toISOString()
};

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [DEMO_USER];
    const list = JSON.parse(raw);
    const hasDemo = list.some((user) => user.email === DEMO_USER.email);
    return hasDemo ? list : [...list, DEMO_USER];
  } catch (error) {
    console.warn("PB auth: falha ao ler usuários", error);
    return [DEMO_USER];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}

export function emailExists(email) {
  const users = readUsers();
  return users.some((user) => user.email.toLowerCase() === String(email).toLowerCase());
}

export function registerUser({ email, password, name }) {
  if (!validateEmail(email)) {
    return { ok: false, error: "Informe um e-mail válido." };
  }
  if (!password || password.length < 6) {
    return { ok: false, error: "A senha precisa ter pelo menos 6 caracteres." };
  }
  if (!name || name.trim().length < 3) {
    return { ok: false, error: "Informe seu nome completo." };
  }
  if (emailExists(email)) {
    return { ok: false, error: "Já existe uma conta com este e-mail." };
  }

  const users = readUsers();
  const user = {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    email: email.toLowerCase(),
    password,
    name: name.trim(),
    createdAt: new Date().toISOString()
  };

  writeUsers([...users, user]);
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id: user.id, email: user.email, name: user.name }));

  return { ok: true, user };
}

export function login(email, password) {
  const users = readUsers();
  const target = users.find((user) => user.email.toLowerCase() === String(email).toLowerCase());

  if (!target) {
    return { ok: false, error: "Conta não encontrada." };
  }

  if (target.id !== DEMO_USER.id && target.password !== password) {
    return { ok: false, error: "Senha incorreta." };
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify({ id: target.id, email: target.email, name: target.name }));
  return { ok: true, user: target };
}

export function loginDemo() {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id: DEMO_USER.id, email: DEMO_USER.email, name: DEMO_USER.name }));
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getUser() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn("PB auth: falha ao ler sessão", error);
    return null;
  }
}

export function clearUsers() {
  localStorage.removeItem(USERS_KEY);
}