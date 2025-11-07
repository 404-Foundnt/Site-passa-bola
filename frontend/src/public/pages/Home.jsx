import { useEffect, useState } from "react";
import { getAppData } from "../../lib/localData.js";
import logo from "../../assets/branding/passabola.png";
import clara from "../../assets/founders/clara-vilela.jpg";
import helena from "../../assets/founders/helena-magalhaes.jpg";
import heroArena from "../../assets/public/hero-arena.jpg";
import programConditioning from "../../assets/public/program-conditioning.jpg";
import programWorkshop from "../../assets/public/program-workshop.jpg";
import programCelebration from "../../assets/public/program-celebration.jpg";
import programAnalytics from "../../assets/public/program-analytics.jpg";

const imageMap = {
  heroArena,
  programConditioning,
  programWorkshop,
  programCelebration,
  programAnalytics,
  clara,
  helena
};

const resolveImage = (key) => (key && imageMap[key]) || key;


export default function Home() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    let active = true;

    getAppData()
      .then((data) => {
        if (!active) return;
        setContent(data.publicContent?.home ?? null);
      })
      .catch((error) => {
        console.error("Falha ao carregar conteúdo público", error);
      });

    return () => {
      active = false;
    };
  }, []);

  const sponsors = content?.sponsors ?? [];
  const heroLinks = (content?.heroLinks ?? []).map((item) => ({
    ...item,
    image: resolveImage(item.imageKey ?? item.image)
  }));
  const programs = (content?.programs ?? []).map((item) => ({
    ...item,
    image: resolveImage(item.imageKey ?? item.image)
  }));
  const newsHighlights = (content?.newsHighlights ?? []).map((item) => ({
    ...item,
    image: resolveImage(item.imageKey ?? item.image)
  }));
  const courtGuides = (content?.courtGuides ?? []).map((item) => ({
    ...item,
    image: resolveImage(item.imageKey ?? item.image)
  }));
  const values = content?.values ?? [];
  const founders = (content?.founders ?? []).map((item) => ({
    ...item,
    img: resolveImage(item.imageKey ?? item.img)
  }));

  return (
    <>
      <section className="relative min-h-[80vh] flex items-end pb-16">
        <img
          src={heroArena}
          alt="Equipe comemorando"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/88 to-transparent" />
        <div className="relative z-10 container mx-auto px-6">
          <img src={logo} alt="Passa a Bola" className="w-28 h-28 md:w-36 md:h-36 mb-6" />
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl md:text-7xl font-black leading-[0.95]">
              Futebol feminino,<br /> impacto em <span style={{ color: "var(--primary-color)" }}>campo</span>.
            </h1>
            <p className="mt-4 text-lg text-[var(--text-muted)]">
              Organização de campeonatos, suporte a projetos sociais e dados que destacam novos talentos em todos os estados.
            </p>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {heroLinks.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/20" />
                <div className="relative p-6">
                  <span className="text-xs uppercase tracking-[0.3em] text-white/60">Acesso rápido</span>
                  <h2 className="mt-2 text-xl font-bold text-white">{item.title}</h2>
                  <p className="mt-1 text-sm text-white/80">{item.description}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-8 flex gap-3 flex-wrap">
            <a href="/tournaments" className="btn-primary">Ver torneios</a>
            <a href="/register" className="btn-secondary">Participar</a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-center title-line">Nossos valores</h2>
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {values.map((value) => (
              <article
                key={value.title}
                className="p-7 rounded-2xl bg-[var(--bg-off-dark)] border border-[var(--border-color)] hover:border-[var(--primary-color)]/40 transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="font-display text-2xl font-extrabold text-[var(--accent-color)]">{value.title}</h3>
                <p className="mt-2 text-[var(--text-muted)]">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12" id="programas">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold mb-6">Programas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program) => (
              <a
                key={program.title}
                href={program.href}
                className="rounded-2xl bg-[var(--bg-off-dark)] border border-[var(--border-color)] hover:border-[var(--primary-color)]/40 transition-all duração-300 group overflow-hidden"
              >
                <img
                  src={program.image}
                  alt={program.title}
                  className="h-44 w-full object-cover transition-transform duração-500 group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="p-5">
                  <h3 className="font-display font-extrabold text-lg text-[var(--primary-color)]">{program.title}</h3>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{program.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" id="quadras">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl md:text-4xl font-extrabold">Guia de quadras parceiras</h2>
              <p className="mt-3 text-[var(--text-muted)]">
                Indicamos arenas com estrutura completa para amistosos, seletivas e eventos sociais. Cada espaço é avaliado pelo nosso time técnico.
              </p>
              <ul className="mt-4 space-y-3 text-sm text-[var(--text-muted)]">
                <li>• Reservas com 15 dias de antecedência e suporte logístico local.</li>
                <li>• Checklists de segurança, iluminação e acessibilidade auditada.</li>
                <li>• Sugestões de hospedagem e transporte parceiro em cada cidade.</li>
              </ul>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
              {courtGuides.map((court) => (
                <div key={court.name} className="rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-off-dark)] group">
                  <img src={court.image} alt={court.name} className="h-36 w-full object-cover group-hover:scale-105 transition-transform duração-500" loading="lazy" />
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{court.city}</p>
                    <h3 className="font-semibold text-[var(--text-light)] mt-1">{court.name}</h3>
                    <p className="text-sm text-[var(--text-muted)] mt-2">{court.feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold mb-8">Últimas notícias</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {newsHighlights.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="rounded-2xl bg-[var(--bg-off-dark)] border border-[var(--border-color)] hover:border-[var(--primary-color)]/40 transition-all duração-300 group overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full object-cover transition-transform duração-500 group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="p-4">
                  <span className="tag">{item.tag}</span>
                  <h3 className="mt-2 font-extrabold">{item.title}</h3>
                  <p className="text-sm text-[var(--text-muted)]">{item.description}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="/news" className="btn-secondary">Ver todas</a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold mb-10">Quem lidera</h2>
          <div className="flex flex-col md:flex-row justify-center gap-12">
            {founders.map((person) => (
              <div key={person.name} className="flex flex-col items-center">
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-36 h-36 rounded-full object-cover border-4 border-[var(--primary-color)] mb-4"
                />
                <h3 className="font-bold text-lg text-[var(--text-light)]">{person.name}</h3>
                <p className="text-[var(--text-muted)] font-semibold">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-2xl font-extrabold text-center mb-8 text-[var(--text-muted)]">Patrocinadores</h2>
          <div className="flex gap-x-12 gap-y-8 items-center justificar-center flex-wrap opacity-80">
            {sponsors.map((sponsor) => (
              <img key={sponsor.alt} src={sponsor.src} alt={sponsor.alt} className="h-8 w-20 object-contain" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
