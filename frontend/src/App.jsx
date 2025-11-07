import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicLayout from "./public/PublicLayout.jsx";

const PublicHome = lazy(() => import("./public/pages/Home.jsx"));
const PublicTournaments = lazy(() => import("./public/pages/Tournaments.jsx"));
const PublicNews = lazy(() => import("./public/pages/News.jsx"));

const Login = lazy(() => import("./pages/Auth/Login.jsx"));
const Register = lazy(() => import("./pages/Auth/Register.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Matches = lazy(() => import("./pages/Matches.jsx"));
const Teams = lazy(() => import("./pages/Teams.jsx"));
const Team = lazy(() => import("./pages/Team.jsx"));
const CreateMatch = lazy(() => import("./pages/CreateMatch.jsx"));
const CalendarPage = lazy(() => import("./pages/Calendar.jsx"));
const MapPage = lazy(() => import("./pages/Map.jsx"));
const Explore = lazy(() => import("./pages/Explore.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const Leaderboard = lazy(() => import("./pages/Leaderboard.jsx"));
const Player = lazy(() => import("./pages/Player.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

export default function App() {
  return (
    <Suspense fallback={<div className="p-6 text-white/70">Carregando…</div>}>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<PublicHome />} />
          <Route path="tournaments" element={<PublicTournaments />} />
          <Route path="news" element={<PublicNews />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="matches" element={<Matches />} />
          <Route path="teams" element={<Teams />} />
          <Route path="team/:id" element={<Team />} />
          <Route path="player/:id" element={<Player />} />
          <Route path="create-match" element={<CreateMatch />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="explore" element={<Explore />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="tournaments" element={<Navigate to="/tournaments" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}