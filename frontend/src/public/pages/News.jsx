import heroArena from "../../assets/public/hero-arena.jpg";
import programAnalytics from "../../assets/public/program-analytics.jpg";
import programWorkshop from "../../assets/public/program-workshop.jpg";

const highlights = [
  {
    title: "Passa a Bola confirma centro de treinamento ecológico",
    detail: "Estrutura em São Paulo reduz consumo de água em 40% e recebe as categorias de base a partir de outubro.",
    image: heroArena,
  },
  {
    title: "Ranking CBF atualizado",
    detail: "As Leoas do Sul sobem três posições após sequência invicta.",
    image: programAnalytics,
  },
  {
    title: "Bastidores de performance",
    detail: "Veja como a academia Estrelas integra dados de GPS no treino semanal.",
    image: programWorkshop,
  },
];

export default function News() {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Boletim diário</p>
        <h1 className="text-3xl md:text-4xl font-black text-white mt-2">Notícias do futebol feminino brasileiro</h1>
        <p className="mt-4 text-white/70 max-w-2xl">
          Atualizamos este painel com bastidores, entrevistas e tabelas sobre as copas regionais. Enquanto conectamos o backoffice, deixe seu e-mail e receba o clipping semanal da Passa a Bola.
        </p>
        <form className="mt-10 grid gap-4 md:grid-cols-[minmax(0,360px)_auto]">
          <input className="input !bg-white/5 !border-white/10" type="email" placeholder="voce@clubefeminino.com.br" required />
          <button className="btn-primary">Quero receber novidades</button>
        </form>

        <div className="mt-12 grid gap-6 md:grid-cols-3 text-sm">
          {highlights.map((card) => (
            <article key={card.title} className="rounded-2xl overflow-hidden border border-white/10 bg-black/40">
              <img src={card.image} alt={card.title} className="h-32 w-full object-cover" loading="lazy" />
              <div className="p-5">
                <h2 className="font-semibold text-white">{card.title}</h2>
                <p className="text-white/70 mt-2 leading-relaxed">{card.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
