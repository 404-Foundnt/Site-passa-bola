import { Outlet, NavLink } from "react-router-dom";
import Header from "./Header.jsx";
import { appLinks } from "../data/appLinks.js";

export default function AppLayout() {
  return (
    <div className="min-h-screen grid md:grid-cols-[260px_1fr]">
      <aside className="hidden md:flex flex-col gap-4 p-4 bg-black/40 border-r border-white/10">
        <div className="text-2xl font-bold tracking-tight">
          <span className="text-pb-lilas">Passa</span> <span className="text-pb-verde">a Bola</span>
        </div>
        <nav className="mt-2 flex flex-col gap-1">
          {appLinks.map((item) => {
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
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
