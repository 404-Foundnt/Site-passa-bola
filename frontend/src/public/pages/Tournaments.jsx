import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAppData } from "../../lib/localData.js";
import heroArena from "../../assets/public/hero-arena.jpg";
import programCelebration from "../../assets/public/program-celebration.jpg";
import programConditioning from "../../assets/public/program-conditioning.jpg";
import programWorkshop from "../../assets/public/program-workshop.jpg";
import programAnalytics from "../../assets/public/program-analytics.jpg";

const imageMap = {
  heroArena,
  programCelebration,
  programConditioning,
  programWorkshop,
  programAnalytics
};

const resolveImage = (key) => (key && imageMap[key]) || key;


function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function Tournaments() {
  const query = useQuery();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const active = query.get("tag");

  useEffect(() => {
    let activeRequest = true;

    getAppData()
      .then((data) => {
        if (!activeRequest) return;
        setContent(data.publicContent?.tournaments ?? null);
      })
      .catch((error) => {
        console.error("Falha ao carregar agenda p��blica", error);
      });

    return () => {
      activeRequest = false;
    };
  }, []);

  const filters = content?.filters ?? [];
  const featured = content?.featured
    ? {
        ...content.featured,
        banner: resolveImage(content.featured.bannerKey ?? content.featured.banner)
      }
    : null;
  const session = content?.session ?? [];
  const tournaments = (content?.tournaments ?? []).map((item) => ({
    ...item,
    img: resolveImage(item.imageKey ?? item.img)
  }));

  const list = useMemo(
    () => (!active ? tournaments : tournaments.filter((item) => item.tag === active)),
    [active, tournaments]
  );

  if (!content || !featured) {
    return (
      <section className="min-h-screen pt-8 pb-16">
        <div className="container mx-auto px-6 text-white/70">Carregando agenda...</div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-8 pb-16">
      <div className="container mx-auto px-6" id="agenda">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <article className="card overflow-hidden">
            <img src={featured.banner} alt={featured.title} className="h-48 w-full object-cover" loading="lazy" />
            <div className="p-6">
              <span className="text-xs uppercase tracking-[0.3em] text-white/60">{featured.stage}</span>
              <h1 className="text-3xl font-black mt-2">{featured.title}</h1>
              <div className="mt-4 flex items-center gap-3">
                {featured.scoreboard.map((team) => (
                  <div key={team.team} className="flex items-center gap-2">
                    <span className="text-white/70 text-sm">{team.team}</span>
                    <span className="text-3xl font-black">{team.score}</span>
                  </div>
                ))}
              </div>
              <dl className="mt-4 grid gap-2 text-sm text-white/70">
                {featured.stats.map((stat) => (
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
              {session.map((slot) => (
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
          {filters.map((chip) => {
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
