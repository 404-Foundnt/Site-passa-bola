import { LayoutDashboard, Trophy, CalendarDays, Users, User2, Map as MapIcon, PlusCircle, Compass, Bell, Settings } from "lucide-react";

const links = [
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

// Extra items (requested): Notifications and Settings
links.push(
  { to: "/app/notifications", label: "Notificações", icon: Bell },
  { to: "/app/settings", label: "Configurações", icon: Settings }
);

export default links;
