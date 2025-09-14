// src/components/GlobalSearch.jsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Combobox from "./Combobox";

const TEAMS = [
  { id:"passa-a-bola", name:"Passa a Bola" },
  { id:"fenix", name:"Fênix" },
  { id:"corujas", name:"Corujas" },
  { id:"panteras", name:"Panteras" },
  { id:"estrelas", name:"Estrelas" },
];

const VENUES = [
  { id:"arena-suzano", name:"Arena Suzano", lat:-23.5445, lng:-46.3111 },
  { id:"ceu-guaianases", name:"CEU Guaianases", lat:-23.52, lng:-46.36 },
  { id:"parque-linear", name:"Parque Linear", lat:-23.57, lng:-46.29 },
];

const PLAYERS = [
  { id:"luana", name:"Luana" },
  { id:"rafa",  name:"Rafa"  },
  { id:"ale",   name:"Ale"   },
  { id:"nina",  name:"Nina"  },
  { id:"vivi",  name:"Vivi"  },
];

export default function GlobalSearch(){
  const nav = useNavigate();
  const [val, setVal] = useState(null);

  const options = useMemo(()=>{
    const enc = (type, id, label) => ({ value: `${type}:${id}`, label });
    return [
      ...TEAMS.map(t => enc("team", t.id, `Time — ${t.name}`)),
      ...PLAYERS.map(p => enc("player", p.id, `Jogadora — ${p.name}`)),
      ...VENUES.map(v => enc("venue", v.id, `Local — ${v.name}`)),
      enc("page","leaderboard","Página — Leaderboard"),
      enc("page","matches","Página — Partidas"),
      enc("page","map","Página — Mapa"),
      enc("page","explore","Página — Explorar quadras"),
    ];
  }, []);

function onChange(next){
  setVal(next);

  // Aceita string ("player:luana") ou objeto { value, label }
  const raw = typeof next === "string" ? next : next?.value;
  if (!raw) return;

  const [type, id] = raw.split(":");
  if (!type || !id) return;

  // Espera 1 tick pra fechar o popover do Radix antes de navegar
  requestAnimationFrame(() => {
    if (type === "team")   return nav(`/app/team/${id}`);
    if (type === "player") return nav(`/app/player/${id}`);
    if (type === "venue")  return nav(`/app/explore?venue=${id}`);
    if (type === "page") {
      const pageMap = {
        leaderboard: "/app/leaderboard",
        matches: "/app/matches",
        map: "/app/map",
        explore: "/app/explore",
      };
      nav(pageMap[id] || "/app");
    }
  });
}

  return (
    <Combobox
      options={options}
      value={val}
      onChange={onChange}
      placeholder="Buscar (times, jogadoras, locais, páginas)…"
      searchPlaceholder="Digite para buscar…"
    />
  );
}
