import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import RadarHex from "../components/RadarHex";
import { fetchPlayer } from "../lib/api";

function StatBar({ label, value }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-white/70">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden mt-1">
        <div className="h-full bg-pb-lilas" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
    </div>
  );
}

function Stars({ n = 0 }) {
  return (
    <div className="text-amber-300" aria-label={`${n} estrelas`}>{"★".repeat(n)}<span className="text-white/30">{"★".repeat(Math.max(0, 3 - n))}</span></div>
  );
}

export default function Player() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({ queryKey: ["player", id], queryFn: () => fetchPlayer(id) });

  if (isLoading) return <div className="text-white/70">Carregando jogadora…</div>;
  if (error)     return <div className="text-rose-300">Erro ao carregar.</div>;

  const p = data;
  const ov = Math.round(
    (p.stats.vel * 0.22) +
    (p.stats.dri * 0.22) +
    (p.stats.chu * 0.20) +
    (p.stats.pas * 0.18) +
    (p.stats.forc * 0.10) +
    (p.stats.def * 0.08)
  );

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Coluna esquerda — Info + Overall */}
      <div className="card lg:col-span-1">
        <div className="text-sm text-white/60">Info. da jogadora</div>
        <div className="mt-2 text-2xl font-extrabold">{p.name}</div>

        <div className="mt-4 grid grid-cols-[100px_1fr] gap-4 items-center">
          {/* Foto/Silhueta (placeholder) */}
          <div className="rounded-xl bg-white/5 aspect-[3/4] grid place-items-center border border-white/10">
            <span className="text-white/40 text-sm">foto</span>
          </div>

          <div className="grid gap-2">
            <div className="text-white/60 text-xs">OVR</div>
            <div className="text-5xl font-black leading-none">{ov}</div>

            <div className="text-sm mt-1">
              <div><span className="text-white/60">Nacional./Região</span> <span className="ml-2">{p.nationality}</span></div>
              <div><span className="text-white/60">Liga</span> <span className="ml-2">{p.league}</span></div>
              <div><span className="text-white/60">Time</span> <span className="ml-2">{p.club}</span></div>
              <div><span className="text-white/60">Estilo de jogo</span> <span className="ml-2">{p.playStyle}</span></div>
              <div><span className="text-white/60">Idade</span> <span className="ml-2">{p.age}</span></div>
              <div><span className="text-white/60">Pé</span> <span className="ml-2 capitalize">{p.footed}</span></div>
            </div>
          </div>
        </div>

        {/* Inspiradores */}
        <div className="mt-5">
          <div className="text-white/60 text-sm mb-2">Inspirador</div>
          <ul className="grid gap-2">
            {p.inspirations.map((it) => (
              <li key={it.label} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10">
                <span className="text-sm">{it.label}</span>
                <Stars n={it.stars} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Coluna central — Radar */}
      <div className="card lg:col-span-1 grid place-items-center">
        <RadarHex stats={p.stats} size={300} color="#7C3AED" />
      </div>

      {/* Coluna direita — Barras de atributos detalhados */}
      <div className="card lg:col-span-1 grid gap-3">
        <div className="text-sm text-white/60">Atributos</div>
        <StatBar label="Drible" value={p.stats.dri} />
        <StatBar label="Chute" value={p.stats.chu} />
        <StatBar label="Passe" value={p.stats.pas} />
        <StatBar label="Velocidade" value={p.stats.vel} />
        <StatBar label="Defesa" value={p.stats.def} />
        <StatBar label="Força" value={p.stats.forc} />
      </div>
    </div>
  );
}
