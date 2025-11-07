import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import RadarHex from "../components/RadarHex.jsx";
import { fetchPlayer } from "../lib/api.js";

const seasonLabels = {
  goals: "Gols",
  assists: "Assistências",
  chances: "Chances criadas",
  rating: "Nota média",
  cleanSheets: "Jogos sem sofrer gols",
  penaltis: "Pênaltis defendidos",
  passesProg: "Passes progressivos",
  desarmes: "Desarmes"
};

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

function Stars({ count = 0 }) {
  return (
    <div className="text-amber-300" aria-label={`${count} estrelas`}>
      {"?".repeat(count)}
      <span className="text-white/30">{"?".repeat(Math.max(0, 3 - count))}</span>
    </div>
  );
}

function MediaCard({ clip }) {
  if (clip.type === "video") {
    return (
      <div className="aspect-video rounded-xl overflow-hidden border border-white/10">
        <iframe
          src={clip.src}
          title={clip.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <figure className="rounded-xl overflow-hidden border border-white/10">
      <img src={clip.src} alt={clip.title} className="w-full h-full object-cover" loading="lazy" />
      <figcaption className="px-4 py-2 text-sm text-white/70">{clip.title}</figcaption>
    </figure>
  );
}

function formatSeasonStats(season = {}) {
  return Object.entries(season).map(([key, value]) => ({
    label: seasonLabels[key] ?? key,
    value
  }));
}

export default function Player() {
  const { id } = useParams();
  const query = useQuery({ queryKey: ["player", id], queryFn: () => fetchPlayer(id) });

  if (query.isLoading) return <div className="text-white/70">Carregando jogadora…</div>;
  if (query.error) return <div className="text-rose-300">Erro ao carregar dados.</div>;

  const player = query.data;
  const overall = Math.round(
    player.stats.dri * 0.22 +
    player.stats.vel * 0.22 +
    player.stats.chu * 0.20 +
    player.stats.pas * 0.18 +
    player.stats.forc * 0.10 +
    player.stats.def * 0.08
  );

  const seasonStats = formatSeasonStats(player.season);

  return (
    <div className="grid xl:grid-cols-[320px_1fr] gap-6">
      <section className="card space-y-6">
        <header>
          <p className="text-xs text-white/60 uppercase tracking-[0.2em]">Perfil</p>
          <h1 className="text-3xl font-black leading-tight">{player.name}</h1>
          <p className="text-white/60 mt-2">{player.position} · {player.club}</p>
        </header>

        <div className="grid grid-cols-[120px_1fr] gap-4 items-start">
          <div className="rounded-xl bg-white/5 aspect-[3/4] grid place-items-center border border-white/10 text-white/40 text-sm">
            foto
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-white/50">OVR</p>
              <p className="text-5xl font-black leading-none">{overall}</p>
            </div>
            <dl className="grid gap-2 text-sm">
              <div className="flex justify-between"><span className="text-white/60">Nacionalidade</span><span>{player.nationality}</span></div>
              <div className="flex justify-between"><span className="text-white/60">Liga</span><span>{player.league}</span></div>
              <div className="flex justify-between"><span className="text-white/60">Estilo</span><span>{player.playStyle}</span></div>
              <div className="flex justify-between"><span className="text-white/60">Idade</span><span>{player.age}</span></div>
              <div className="flex justify-between"><span className="text-white/60">Pé</span><span className="capitalize">{player.footed}</span></div>
            </dl>
          </div>
        </div>

        <div>
          <h2 className="text-sm text-white/60 mb-2">Referências técnicas</h2>
          <ul className="grid gap-2">
            {player.inspirations.map((item) => (
              <li key={item.label} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10">
                <span className="text-sm">{item.label}</span>
                <Stars count={item.stars} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-6">
        <div className="grid lg:grid-cols-[minmax(0,380px)_1fr] gap-6">
          <div className="card">
            <h2 className="text-sm text-white/60 mb-3">Mapa de atributos</h2>
            <div className="grid place-items-center">
              <RadarHex stats={player.stats} size={300} color="#7C3AED" />
            </div>
          </div>
          <div className="card grid gap-3">
            <h2 className="text-sm text-white/60">Atributos detalhados</h2>
            <StatBar label="Drible" value={player.stats.dri} />
            <StatBar label="Finalização" value={player.stats.chu} />
            <StatBar label="Passe" value={player.stats.pas} />
            <StatBar label="Velocidade" value={player.stats.vel} />
            <StatBar label="Defesa" value={player.stats.def} />
            <StatBar label="Força" value={player.stats.forc} />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm text-white/60">Resumo da temporada</h2>
            <span className="text-xs text-white/40">Atualizado semanalmente</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {seasonStats.map((item) => (
              <div key={item.label} className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">{item.label}</p>
                <p className="text-2xl font-black mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card grid lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-sm text-white/60 mb-3">Últimos jogos</h2>
            <ul className="space-y-3">
              {player.lastMatches.map((match) => (
                <li key={`${match.date}-${match.opponent}`} className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <header className="flex items-center justify-between text-sm">
                    <span className="font-semibold">vs {match.opponent}</span>
                    <span className="text-white/50">{match.date}</span>
                  </header>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-white/70">Resultado</span>
                    <span>{match.result}</span>
                  </div>
                  <p className="text-sm text-white/60 mt-1">Contribuição: {match.contribution}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm text-white/60 mb-3">Plano de treino</h2>
            <ul className="space-y-3">
              {player.trainingFocus.map((item) => (
                <li key={item} className="p-3 rounded-xl bg-white/5 border border-white/10 flex gap-3 items-center">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-pb-lilas/20 text-pb-lilas font-semibold">•</span>
                  <span className="text-sm text-white/70 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card">
          <h2 className="text-sm text-white/60 mb-4">Clips e análises</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {player.highlightClips.map((clip) => (
              <MediaCard key={clip.src} clip={clip} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}