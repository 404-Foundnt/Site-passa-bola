import { players } from "../data/players.js";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchDashboard() {
  await wait(200);
  return {
    nextMatch: {
      opponent: "Atlético Brisa",
      dateISO: new Date(Date.now() + 86400000).toISOString(),
      venue: "Arena Aurora",
      lat: -23.5445,
      lng: -46.3111
    },
    stats: [
      { id: "xp", label: "XP semanal", value: 1420, diff: "+21%" },
      { id: "minutes", label: "Minutos jogados", value: 312, diff: "+8%" },
      { id: "goals", label: "Gols", value: 9, diff: "+3" },
      { id: "streak", label: "Séries ativas", value: 5, diff: "+1" }
    ]
  };
}

const TICKER = [
  { home: "Aurora", away: "Quilombo", score: "2-1", minute: 73 },
  { home: "Brisa", away: "Leoas", score: "0-0", minute: 38 },
  { home: "União Serra", away: "Horizonte", score: "1-0", minute: 90 }
];

export async function fetchTicker() {
  await wait(300);
  return [TICKER[0]];
}

export async function fetchBadges() {
  await wait(200);
  return [
    { id: "cap", label: "Capitã assídua", desc: "Confirmou presença 8x seguidas", owned: true },
    { id: "fair", label: "Fair-play", desc: "0 faltas em 5 jogos", owned: true },
    { id: "hat", label: "Hat-trick", desc: "3 gols em um jogo", owned: false },
    { id: "clean", label: "Clean sheet", desc: "Sem sofrer gols", owned: false }
  ];
}

export async function fetchTeam() {
  await wait(200);
  return {
    id: "passa-a-bola",
    name: "Passa a Bola",
    roster: [
      { id: "isabela-monteiro", name: "Isabela Monteiro", position: "MEI" },
      { id: "lara-santana", name: "Lara Santana", position: "ATA" },
      { id: "marina-figueiredo", name: "Marina Figueiredo", position: "ZAG" },
      { id: "sofia-baltar", name: "Sofia Baltar", position: "GOL" },
      { id: "nina-oliveira", name: "Nina Oliveira", position: "MEI" }
    ],
    availability: [
      { id: "isabela-monteiro", name: "Isabela Monteiro", status: "Vou" },
      { id: "lara-santana", name: "Lara Santana", status: "Talvez" },
      { id: "marina-figueiredo", name: "Marina Figueiredo", status: "Vou" },
      { id: "sofia-baltar", name: "Sofia Baltar", status: "Não vou" },
      { id: "nina-oliveira", name: "Nina Oliveira", status: "Chegando" }
    ]
  };
}

export async function fetchMatches() {
  await wait(240);
  const base = Date.now();
  return [
    {
      id: 1,
      dateISO: new Date(base + 86400000).toISOString(),
      home: "Passa a Bola",
      away: "Atlético Brisa",
      venue: "Arena Aurora",
      lat: -23.5445,
      lng: -46.3111
    },
    {
      id: 2,
      dateISO: new Date(base + 2 * 86400000).toISOString(),
      home: "Clube Aurora",
      away: "União Serra",
      venue: "Centro Olímpico",
      lat: -23.52,
      lng: -46.36
    },
    {
      id: 3,
      dateISO: new Date(base + 5 * 86400000).toISOString(),
      home: "Rio Negro",
      away: "Quilombo",
      venue: "Parque Linear",
      lat: -23.57,
      lng: -46.29
    }
  ];
}

export async function fetchLeaderboard() {
  await wait(180);
  return [
    { id: "lara-santana", pos: 1, name: "Lara Santana", team: "Atlético Brisa", xp: 1640 },
    { id: "isabela-monteiro", pos: 2, name: "Isabela Monteiro", team: "Clube Aurora", xp: 1580 },
    { id: "sofia-baltar", pos: 3, name: "Sofia Baltar", team: "União Serra", xp: 1495 },
    { id: "marina-figueiredo", pos: 4, name: "Marina Figueiredo", team: "Rio Negro", xp: 1430 },
    { id: "nina-oliveira", pos: 5, name: "Nina Oliveira", team: "Leoas", xp: 1310 }
  ];
}

export async function fetchTeams() {
  await wait(160);
  return [
    { id: "passa-a-bola", name: "Passa a Bola", city: "São Paulo/SP", players: 24 },
    { id: "aurora", name: "Clube Aurora", city: "Campinas/SP", players: 19 },
    { id: "brisa", name: "Atlético Brisa", city: "Santos/SP", players: 21 },
    { id: "serra", name: "União Serra", city: "Caxias do Sul/RS", players: 22 },
    { id: "rio-negro", name: "Rio Negro", city: "Manaus/AM", players: 20 }
  ];
}

export async function fetchPlayer(id) {
  await wait(200);
  return players.find((player) => player.id === id) || players[0];
}
