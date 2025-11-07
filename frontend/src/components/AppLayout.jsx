import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, Trophy, CalendarDays, Users, User2, Map as MapIcon, PlusCircle, Compass } from "lucide-react";
import Header from "./Header.jsx";

const links = [
  { to: "/app", end: true, label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/app/matches", label: "Partidas", icon: CalendarDays },
  { to: "/app/teams", label: "Times", icon: Users },
  { to: "/app/create-match", label: "Criar partida", icon: PlusCircle },
  { to: "/app/calendar", label: "Calendário", icon: CalendarDays },
  { to: "/app/map", label: "Mapa", icon: MapIcon },
  { to: "/app/explore", label: "Explorar quadras", icon: Compass },
  { to: "/app/profile", label: "Perfil", icon: User2 }
];

export default function AppLayout() {
  return (
    <div className="min-h-screen grid md:grid-cols-[260px_1fr]">
      <aside className="hidden md:flex flex-col gap-4 p-4 bg-black/40 border-r border-white/10">
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
                  `btn btn-ghost justify-start gap-2 ${isActive ? "bg-pb-lilas/20 text-white" : "text-white/80"}`
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
        {/* Mobile bottom navigation */}
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-black/80 backdrop-blur">
          <ul className="grid grid-cols-5 text-xs">
            {[
              { to: "/app", label: "Início", icon: LayoutDashboard, end: true },
              { to: "/app/matches", label: "Partidas", icon: CalendarDays },
              { to: "/app/teams", label: "Times", icon: Users },
              { to: "/app/explore", label: "Explorar", icon: Compass },
              { to: "/app/profile", label: "Perfil", icon: User2 }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex flex-col items-center justify-center py-2 ${isActive ? "text-white" : "text-white/70"}`
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
