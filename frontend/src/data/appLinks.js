import { LayoutDashboard, Trophy, CalendarDays, Users, User2, Map as MapIcon, PlusCircle, Compass } from "lucide-react";

export const appLinks = [
  { to: "/app", end: true, label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/app/matches", label: "Partidas", icon: CalendarDays },
  { to: "/app/teams", label: "Times", icon: Users },
  { to: "/app/create-match", label: "Criar partida", icon: PlusCircle },
  { to: "/app/calendar", label: "Calendario", icon: CalendarDays },
  { to: "/app/map", label: "Mapa", icon: MapIcon },
  { to: "/app/explore", label: "Explorar quadras", icon: Compass },
  { to: "/app/profile", label: "Perfil", icon: User2 }
];
