import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Combobox from "./Combobox.jsx";
import { players } from "../data/players.js";

const TEAMS = [
  { id: "passa-a-bola", name: "Passa a Bola" },
  { id: "aurora", name: "Clube Aurora" },
  { id: "brisa", name: "Atlético Brisa" },
  { id: "serra", name: "União Serra" },
  { id: "rio-negro", name: "Rio Negro" }
];

const VENUES = [
  { id: "arena-aurora", name: "Arena Aurora" },
  { id: "ceu-guaianases", name: "CEU Guaianases" },
  { id: "parque-linear", name: "Parque Linear" }
];

const PAGES = [
  { id: "leaderboard", name: "Leaderboard" },
  { id: "matches", name: "Partidas" },
  { id: "map", name: "Mapa" },
  { id: "explore", name: "Explorar quadras" }
];

export default function GlobalSearch() {
  const navigate = useNavigate();
  const [value, setValue] = useState(null);

  const playerOptions = useMemo(
    () =>
      players.map((player) => ({
        id: player.id,
        name: player.name
      })),
    []
  );

  const options = useMemo(() => {
    const encode = (type, id, label) => ({ value: `${type}:${id}`, label });
    return [
      ...TEAMS.map((team) => encode("team", team.id, `Time · ${team.name}`)),
      ...playerOptions.map((player) => encode("player", player.id, `Jogadora · ${player.name}`)),
      ...VENUES.map((venue) => encode("venue", venue.id, `Local · ${venue.name}`)),
      ...PAGES.map((page) => encode("page", page.id, `Página · ${page.name}`))
    ];
  }, [playerOptions]);

  function handleChange(next) {
    setValue(next);

    const raw = typeof next === "string" ? next : next?.value;
    if (!raw) return;

    const [type, id] = raw.split(":");
    if (!type || !id) return;

    requestAnimationFrame(() => {
      if (type === "team") {
        navigate(`/app/team/${id}`);
        return;
      }
      if (type === "player") {
        navigate(`/app/player/${id}`);
        return;
      }
      if (type === "venue") {
        navigate(`/app/explore?venue=${id}`);
        return;
      }
      if (type === "page") {
        const routes = {
          leaderboard: "/app/leaderboard",
          matches: "/app/matches",
          map: "/app/map",
          explore: "/app/explore"
        };
        navigate(routes[id] ?? "/app");
      }
    });
  }

  return (
    <Combobox
      options={options}
      value={value}
      onChange={handleChange}
      placeholder="Buscar (times, jogadoras, locais, páginas)…"
      searchPlaceholder="Digite para buscar…"
    />
  );
}
