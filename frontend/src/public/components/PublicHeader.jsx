import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/branding/passabola.png";

const SCORES = [
  { home: "Leoas", away: "Coral", score: "1-1" },
  { home: "Bandeira", away: "Estrelas", score: "0-3" },
  { home: "Aurora", away: "Quilombo", score: "2-2" },
  { home: "Fênix", away: "Horizonte", score: "2-1" }
];

export default function PublicHeader() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-dark)]/90 backdrop-blur-lg border-b border-[var(--border-color)]">
      <div className="container mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-3">
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          <img src={logo} alt="Passa a Bola" className="h-7 w-auto" />
          <span className="sr-only">Passa a Bola</span>
        </button>

        <div className="hidden md:block flex-1 max-w-[520px]">
          <input
            type="search"
            placeholder="Buscar torneios, notícias…"
            className="w-full h-10 rounded-full border border-[var(--border-color)] bg-transparent px-4 outline-none focus:ring-2 focus:ring-[var(--primary-color)]/30 transition-colors focus:border-[var(--primary-color)]"
          />
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[var(--text-muted)]">
          <NavLink to="/" end className={({ isActive }) => `transition ${isActive ? "text-[var(--text-light)]" : "hover:text-[var(--text-light)]"}`}>
            Início
          </NavLink>
          <NavLink to="/tournaments" className={({ isActive }) => `transition ${isActive ? "text-[var(--text-light)]" : "hover:text-[var(--text-light)]"}`}>
            Torneios
          </NavLink>
          <NavLink to="/news" className={({ isActive }) => `transition ${isActive ? "text-[var(--text-light)]" : "hover:text-[var(--text-light)]"}`}>
            Notícias
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => navigate("/login")} className="btn-secondary !h-9 !px-4 !text-sm">
            Login
          </button>
          <button onClick={() => navigate("/register")} className="btn-primary !h-9 !px-5 !text-sm">
            Criar conta
          </button>
          <button className="md:hidden btn-ghost !h-9 !px-3" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="public-mobile-nav">
            Menu
          </button>
        </div>
      </div>

      {open && (
        <div id="public-mobile-nav" className="md:hidden border-t border-[var(--border-color)]">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <div>
              <input
                type="search"
                placeholder="Buscar torneios, notícias…"
                className="w-full h-10 rounded-full border border-[var(--border-color)] bg-transparent px-4 outline-none focus:ring-2 focus:ring-[var(--primary-color)]/30 transition-colors focus:border-[var(--primary-color)]"
              />
            </div>
            <nav className="grid gap-2 text-sm font-semibold text-[var(--text-muted)]">
              <NavLink to="/" end className={({ isActive }) => `px-2 py-2 rounded ${isActive ? "bg-[var(--bg-off-dark)] text-[var(--text-light)]" : "hover:text-[var(--text-light)]"}`} onClick={() => setOpen(false)}>
                Início
              </NavLink>
              <NavLink to="/tournaments" className={({ isActive }) => `px-2 py-2 rounded ${isActive ? "bg-[var(--bg-off-dark)] text-[var(--text-light)]" : "hover:text-[var(--text-light)]"}`} onClick={() => setOpen(false)}>
                Torneios
              </NavLink>
              <NavLink to="/news" className={({ isActive }) => `px-2 py-2 rounded ${isActive ? "bg-[var(--bg-off-dark)] text-[var(--text-light)]" : "hover:text-[var(--text-light)]"}`} onClick={() => setOpen(false)}>
                Notícias
              </NavLink>
            </nav>
          </div>
        </div>
      )}

      <div className="border-t border-[var(--border-color)]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative overflow-hidden my-2 border border-[var(--border-color)] bg-[var(--bg-off-dark)]">
            <div className="whitespace-nowrap animate-[ticker_18s_linear_infinite] hover:[animation-play-state:paused] px-6 py-[6px] text-sm font-semibold">
              {[...SCORES, ...SCORES].map((match, index) => (
                <span key={index} className="mr-8 inline-flex items-center gap-2 text-[var(--text-muted)]">
                  <span>{match.home}</span>
                  <span className="opacity-50">vs</span>
                  <span>{match.away}</span>
                  <span className="ml-1 px-2 py-[2px] rounded text-xs bg-[var(--primary-color)]/12 text-[var(--primary-color)]">
                    {match.score}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes ticker {0% {transform: translateX(0);} 100% {transform: translateX(-50%);}}`}</style>
    </header>
  );
}
