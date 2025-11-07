import { players } from "../data/players.js";
import { getAppData } from "./localData.js";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchDashboard() {
  const data = await getAppData();
  return data.dashboard;
}

export async function fetchTicker() {
  const data = await getAppData();
  return data.ticker?.length ? [data.ticker[0]] : [];
}

export async function fetchBadges() {
  const data = await getAppData();
  return data.badges ?? [];
}

export async function fetchTeam() {
  const data = await getAppData();
  return data.team;
}

export async function fetchMatches() {
  const data = await getAppData();
  const readPresence = (matchId) => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(`match-presence:${matchId}`);
    } catch (error) {
      console.warn("Falha ao ler presença salva", error);
      return null;
    }
  };

  return (data.matches ?? []).map((match) => ({
    ...match,
    presenceStatus: readPresence(match.id)
  }));
}

export async function fetchLeaderboard() {
  const data = await getAppData();
  return data.leaderboard ?? [];
}

export async function fetchTeams() {
  const data = await getAppData();
  return data.teams ?? [];
}

export async function fetchPlayer(id) {
  await wait(200);
  return players.find((player) => player.id === id) || players[0];
}
