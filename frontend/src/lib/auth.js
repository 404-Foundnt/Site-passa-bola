const SESSION_KEY = "pb_user";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const resolveBaseUrl = () => {
  const envUrl = import.meta.env?.VITE_API_URL;
  if (envUrl) return envUrl.replace(/\/$/, "");
  if (typeof window !== "undefined") return ""; // usa mesma origem (proxy do Vite)
  return "http://localhost:5050";
};

const API_BASE = resolveBaseUrl();
const USERS_ENDPOINT = `${API_BASE}/api/users`;
const LOGIN_ENDPOINT = `${API_BASE}/api/login`;

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.message || "Falha na comunicação com a API.";
    throw new Error(message);
  }
  return data;
}

function persistSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function validateEmail(email) {
  return EMAIL_REGEX.test(String(email).toLowerCase());
}

export async function fetchRegisteredUsers() {
  const list = await request(USERS_ENDPOINT, { method: "GET" });
  return Array.isArray(list) ? list : [];
}

export async function registerUser(payload) {
  try {
    const user = await request(USERS_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(payload)
    });
    persistSession(user);
    return { ok: true, user };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

export async function login(email, password) {
  try {
    const user = await request(LOGIN_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    persistSession(user);
    return { ok: true, user };
  } catch (error) {
    return { ok: false, error: error.message };
  }
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
