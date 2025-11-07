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
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
