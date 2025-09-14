import { Outlet, NavLink } from "react-router-dom";
import Header from "./Header";
export default function AppLayout(){
  return (
    <div className="min-h-screen grid md:grid-cols-[260px_1fr]">
      <aside className="hidden md:flex flex-col gap-4 p-4 bg-black/40 border-r border-white/10">
        <div className="text-2xl font-bold tracking-tight">
          <span className="text-pb-lilas">Passa</span> <span className="text-pb-verde">a Bola</span>
        </div>
        <nav className="mt-2 flex flex-col gap-1">
          <NavLink to="/app" end className={({isActive})=>`btn btn-ghost justify-start ${isActive?'bg-pb-lilas/30':''}`}>🏠 Dashboard</NavLink>
          <NavLink to="/app/leaderboard" className={({isActive})=>`btn btn-ghost justify-start ${isActive?'bg-pb-lilas/30':''}`}>🏆 Leaderboard</NavLink>
          <NavLink to="/app/matches" className={({isActive})=>`btn btn-ghost justify-start ${isActive?'bg-pb-lilas/30':''}`}>📆 Partidas</NavLink>
          <NavLink to="/app/teams" className={({isActive})=>`btn btn-ghost justify-start ${isActive?'bg-pb-lilas/30':''}`}>👥 Times</NavLink>
          <NavLink to="/app/create-match" className={({isActive})=>`btn btn-ghost justify-start ${isActive?'bg-pb-lilas/30':''}`}>➕ Criar Partida</NavLink>
          <NavLink to="/app/calendar" className={({isActive})=>`btn btn-ghost justify-start ${isActive?'bg-pb-lilas/30':''}`}>🗓️ Calendário</NavLink>
          <NavLink to="/app/map" className={({isActive})=>`btn btn-ghost justify-start ${isActive?'bg-pb-lilas/30':''}`}>🗺️ Mapa</NavLink>
          <NavLink to="/app/explore" className={({isActive})=>`btn btn-ghost justify-start ${isActive?'bg-pb-lilas/30':''}`}>🧭 Explorar quadras</NavLink>
        </nav>
      </aside>
      <div className="min-h-screen">
        <Header />
        <main className="p-4 md:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
