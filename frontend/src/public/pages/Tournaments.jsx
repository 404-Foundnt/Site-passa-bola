import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import heroArena from "../../assets/public/hero-arena.jpg";
import programCelebration from "../../assets/public/program-celebration.jpg";
import programConditioning from "../../assets/public/program-conditioning.jpg";
import programWorkshop from "../../assets/public/program-workshop.jpg";
import programAnalytics from "../../assets/public/program-analytics.jpg";

const FILTERS = [
  { label: "Todos", tag: null },
  { label: "Amistosos", tag: "amistosos" },
  { label: "Categorias de base", tag: "base" },
  { label: "Copas & ligas", tag: "copas" }
];

const FEATURED = {
  title: "Copa Primavera 2025",
  stage: "Fase de grupos · Rodada 3",
  banner: heroArena,
  scoreboard: [
    { team: "Passa a Bola", score: 2 },
    { team: "União Serra", score: 1 }
  ],
  stats: [
    { label: "Onde", value: "Arena Aurora · São Paulo" },
    { label: "Transmissão", value: "YouTube / Passa a Bola TV" },
    { label: "Ingresso", value: "1 kg de alimento ou R$ 10" }
  ]
};

const SESSION = [
  {
    day: "Sex · 20/09",
    title: "Workshop de liderança feminina",
    location: "Hub Passa a Bola, São Paulo",
    tag: "base"
  },
  {
    day: "Sáb · 21/09",
    title: "Quartas de final · Circuito Passa a Bola",
    location: "Arena Aurora",
    tag: "copas"
  },
  {
    day: "Dom · 22/09",
    title: "Amistoso solidário · Passa a Bola x Quilombo",
    location: "Parque Linear",
    tag: "amistosos"
  }
];

const TOURNAMENTS = [
  {
    id: 1,
    tag: "amistosos",
    title: "Amistoso beneficente · Arena Municipal",
    summary: "Ingresso solidário com renda revertida aos programas de base.",
    when: "Sáb · 16:00",
    where: "São Paulo · Zona Oeste",
    img: programCelebration,
    href: "/news?tag=amistosos"
  },
  {
    id: 2,
    tag: "base",
    title: "Festival Sub-17 · Observadoras confirmadas",
    summary: "Rodízio de atletas, relatórios técnicos e mesas com universidades parceiras.",
    when: "Dom · 09:00-13:00",
    where: "Rio de Janeiro · Barra",
    img: programConditioning,
    href: "/news?tag=base"
  },
  {
    id: 3,
    tag: "copas",
    title: "Copa Primavera · Inscrições abertas",
    summary: "Categorias Livre e Sub-20, vagas limitadas para 24 equipes.",
    when: "Inscrição até 30/04",
    where: "Formato híbrido",
    img: programAnalytics,
    href: "/tournaments"
  },
  {
    id: 4,
    tag: "amistosos",
    title: "Jogo das Minas · Edição especial",
    summary: "Integração entre projetos parceiros, painel de inovação e roda de conversa.",
    when: "Qua · 20:00",
    where: "Belo Horizonte · Pampulha",
    img: programWorkshop,
    href: "/news?tag=amistosos"
  }
];

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function Tournaments() {
  const query = useQuery();
  const navigate = useNavigate();
  const active = query.get("tag");

  const list = useMemo(
    () => (!active ? TOURNAMENTS : TOURNAMENTS.filter((item) => item.tag === active)),
    [active]
  );

  return (
    <section className="min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-6" id="agenda">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <article className="card overflow-hidden">
            <img src={FEATURED.banner} alt={FEATURED.title} className="h-48 w-full object-cover" loading="lazy" />
            <div className="p-6">
              <span className="text-xs uppercase tracking-[0.3em] text-white/60">{FEATURED.stage}</span>
              <h1 className="text-3xl font-black mt-2">{FEATURED.title}</h1>
              <div className="mt-4 flex items-center gap-3">
                {FEATURED.scoreboard.map((team) => (
                  <div key={team.team} className="flex items-center gap-2">
                    <span className="text-white/70 text-sm">{team.team}</span>
                    <span className="text-3xl font-black">{team.score}</span>
                  </div>
                ))}
              </div>
              <dl className="mt-4 grid gap-2 text-sm text-white/70">
                {FEATURED.stats.map((stat) => (
                  <div key={stat.label} className="flex justify-between gap-3">
                    <dt className="uppercase tracking-[0.2em] text-white/50">{stat.label}</dt>
                    <dd className="text-right">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>

          <aside className="card p-5 flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Agenda da semana</h2>
            <ul className="space-y-3 text-sm">
              {SESSION.map((slot) => (
                <li key={slot.title} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
                    <span>{slot.day}</span>
                    <span className="tag">{slot.tag}</span>
                  </div>
                  <div className="mt-2 font-semibold">{slot.title}</div>
                  <div className="text-white/60">{slot.location}</div>
                </li>
              ))}
            </ul>
            <a href="/register" className="btn-primary text-center">Cadastrar minha equipe</a>
          </aside>
        </div>

        <div className="py-10 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold">Torneios & agenda</h2>
          <p className="mt-2 max-w-2xl mx-auto opacity-80">
            Calendário de jogos, inscrições e cobertura em um só lugar.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap justify-center mb-6">
          {FILTERS.map((chip) => {
            const isActive = (chip.tag ?? "") === (active ?? "");
            return (
              <button
                key={chip.label}
                onClick={() => navigate(`/tournaments${chip.tag ? `?tag=${chip.tag}` : ""}`)}
                className={`tag transition ${isActive ? "bg-pb-lilas/20 border-pb-lilas/60 text-pb-lilas" : ""}`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((item) => (
            <a key={item.id} href={item.href} className="card overflow-hidden group">
              <img
                src={item.img}
                alt={item.title}
                className="h-44 w-full object-cover transition-transform group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="p-4">
                <div className="mb-2 flex items-center gap-2 text-sm">
                  <span className="tag">{item.tag}</span>
                  <span className="px-2 py-[2px] rounded bg-pb-lilas/10 text-pb-lilas">{item.when}</span>
                  <span className="opacity-60">{item.where}</span>
                </div>
                <h3 className="font-extrabold">{item.title}</h3>
                <p className="text-sm opacity-80">{item.summary}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="/register" className="btn-outline-sport">Quero inscrever meu time</a>
        </div>
      </div>
    </section>
  );
}
