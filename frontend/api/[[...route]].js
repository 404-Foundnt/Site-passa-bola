import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, "data", "app-data.json");
const USERS_PATH = path.join(__dirname, "data", "users.json");
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const app = express();
app.use(cors());
app.use(express.json());

function ensureFile(filePath, fallback) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2));
    return fallback;
  }
  return null;
}

function readJson(filePath, fallback) {
  try {
    const created = ensureFile(filePath, fallback);
    if (created) return created;
    const raw = fs.readFileSync(filePath, "utf-8");
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.error("Erro ao ler", filePath, error);
    throw new Error("Falha ao acessar os dados locais");
  }
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

const loadData = () => readJson(DATA_PATH, {});
const getSlice = (selector) => selector(loadData());
const readUsers = () => readJson(USERS_PATH, []);
const writeUsers = (users) => writeJson(USERS_PATH, users);
const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, ...safe } = user;
  return safe;
};
const normalizeEmail = (email = "") => String(email).trim().toLowerCase();

app.get("/api", (_req, res) => {
  res.json({
    status: "ok",
    message: "API Passa a Bola",
    endpoints: {
      data: "/api/data",
      dashboard: "/api/dashboard",
      ticker: "/api/ticker",
      badges: "/api/badges",
      matches: "/api/matches",
      leaderboard: "/api/leaderboard",
      teams: "/api/teams",
      team: "/api/team/:id",
      users: "/api/users",
      login: "/api/login",
      public: {
        home: "/api/public/home",
        tournaments: "/api/public/tournaments"
      }
    }
  });
});

app.get("/api/data", (_req, res) => {
  try {
    res.json(loadData());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/dashboard", (_req, res) => {
  try {
    res.json(getSlice((data) => data.dashboard));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/ticker", (_req, res) => {
  try {
    res.json(getSlice((data) => data.ticker ?? []));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/badges", (_req, res) => {
  try {
    res.json(getSlice((data) => data.badges ?? []));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/matches", (_req, res) => {
  try {
    res.json(getSlice((data) => data.matches ?? []));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/leaderboard", (_req, res) => {
  try {
    res.json(getSlice((data) => data.leaderboard ?? []));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/teams", (_req, res) => {
  try {
    res.json(getSlice((data) => data.teams ?? []));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/team/:id", (req, res) => {
  try {
    const id = String(req.params.id);
    const data = loadData();
    const list = data.teams ?? [];
    const team = list.find((item) => String(item.id) === id) || data.team;
    if (!team) {
      return res.status(404).json({ message: "Time não encontrado" });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/public/home", (_req, res) => {
  try {
    res.json(getSlice((data) => data.publicContent?.home ?? {}));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/public/tournaments", (_req, res) => {
  try {
    res.json(getSlice((data) => data.publicContent?.tournaments ?? {}));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/users", (_req, res) => {
  try {
    res.json(readUsers().map(sanitizeUser));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/users/:id", (req, res) => {
  try {
    const id = String(req.params.id);
    const user = readUsers().find((item) => String(item.id) === id);
    if (!user) {
      return res.status(404).json({ message: "Usuária não encontrada" });
    }
    res.json(sanitizeUser(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/users", (req, res) => {
  try {
    const { name, email, password, birthdate, position, team, phone } = req.body || {};
    const trimmedName = String(name || "").trim();
    const normalizedEmail = normalizeEmail(email);

    if (trimmedName.length < 3) {
      return res.status(400).json({ message: "Informe seu nome completo." });
    }
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return res.status(400).json({ message: "Informe um e-mail válido." });
    }
    if (!password || String(password).length < 6) {
      return res.status(400).json({ message: "A senha precisa ter pelo menos 6 caracteres." });
    }

    const users = readUsers();
    if (users.some((user) => user.email === normalizedEmail)) {
      return res.status(409).json({ message: "Já existe uma conta com este e-mail." });
    }

    const user = {
      id: typeof randomUUID === "function" ? randomUUID() : String(Date.now()),
      name: trimmedName,
      email: normalizedEmail,
      password: String(password),
      birthdate: birthdate || null,
      position: position || "",
      team: team || "",
      phone: phone || "",
      createdAt: new Date().toISOString()
    };

    users.push(user);
    writeUsers(users);

    res.status(201).json(sanitizeUser(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/login", (req, res) => {
  try {
    const { email, password } = req.body || {};
    const normalizedEmail = normalizeEmail(email);
    const pwd = String(password || "");

    if (!EMAIL_REGEX.test(normalizedEmail) || !pwd) {
      return res.status(400).json({ message: "Credenciais inválidas." });
    }

    const users = readUsers();
    const target = users.find((user) => user.email === normalizedEmail);
    if (!target) {
      return res.status(404).json({ message: "Conta não encontrada." });
    }
    if (target.password !== pwd) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    res.json(sanitizeUser(target));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: `Rota ${req.originalUrl} não encontrada` });
});

export default app;
