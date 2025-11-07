import { Outlet, NavLink } from "react-router-dom";
import Header from "./Header.jsx";
import links from "./navLinks";

export default function AppLayout() {
  return (
    <div className="public-theme min-h-screen grid md:grid-cols-[260px_1fr] bg-dots">
      <aside className="hidden md:flex flex-col gap-4 p-4 bg-[var(--bg-off-dark)] border-r border-[var(--border-color)]">
        <div className="text-2xl font-bold tracking-tight">
          <span className="text-pb-lilas">Passa</span> <span className="text-pb-verde">a Bola</span>
        </div>
        <nav className="mt-2 flex flex-col gap-1">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `btn btn-ghost justify-start gap-2 ${isActive ? "bg-pb-lilas/20 text-[var(--text-light)]" : "text-[var(--text-muted)]"}`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
      <div className="min-h-screen">
        <Header />
        <main className="p-4 pb-16 md:pb-8 md:p-8">
          <Outlet />
        </main>
        {/* Bottom navigation fallback for mobile */}
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[var(--border-color)] bg-[var(--bg-off-dark)]/95 backdrop-blur">
          <ul className="grid grid-cols-5 text-xs">
            {[
              links.find(l => l.to === "/app"),
              links.find(l => l.to === "/app/matches"),
              links.find(l => l.to === "/app/teams"),
              links.find(l => l.to === "/app/explore"),
              links.find(l => l.to === "/app/profile"),
            ].filter(Boolean).map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex flex-col items-center justify-center py-2 ${isActive ? "text-[var(--text-light)]" : "text-[var(--text-muted)]"}`
                    }
                    aria-label={item.label}
                  >
                    <Icon size={18} />
                    <span className="mt-0.5">{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
