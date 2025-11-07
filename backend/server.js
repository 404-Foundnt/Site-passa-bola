const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 5050;
const DATA_PATH = path.join(__dirname, "data", "app-data.json");

const app = express();
app.use(cors());
app.use(express.json());

function loadData() {
  try {
    const file = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(file);
  } catch (error) {
    console.error("Erro ao ler o arquivo de dados:", error.message);
    throw new Error("Não foi possível carregar os dados locais");
  }
}

function getSlice(selector) {
  const data = loadData();
  return selector(data);
}

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
    return res.json(team);
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

app.use((req, res) => {
  res.status(404).json({ message: `Rota ${req.originalUrl} não encontrada` });
});

app.listen(PORT, () => {
  console.log(`API Passa a Bola pronta em http://localhost:${PORT}`);
});
