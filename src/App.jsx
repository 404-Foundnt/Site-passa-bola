// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

// Lazy load de todas as páginas (isola erro de um módulo)
const Login        = lazy(() => import("./pages/Auth/Login"));
const Register     = lazy(() => import("./pages/Auth/Register"));
const Dashboard    = lazy(() => import("./pages/Dashboard"));
const Matches      = lazy(() => import("./pages/Matches"));
const Teams        = lazy(() => import("./pages/Teams"));
const Team         = lazy(() => import("./pages/Team"));
const CreateMatch  = lazy(() => import("./pages/CreateMatch"));
const CalendarPage = lazy(() => import("./pages/Calendar"));
const MapPage      = lazy(() => import("./pages/Map"));
const Explore      = lazy(() => import("./pages/Explore"));
const Profile      = lazy(() => import("./pages/Profile"));
const Leaderboard  = lazy(() => import("./pages/Leaderboard"));
const Player       = lazy(() => import("./pages/Player"));  
const NotFound     = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <Suspense fallback={<div className="p-6 text-white/70">Carregando…</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
