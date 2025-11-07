import { useCallback, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMatches } from "../lib/api";
import { DataGrid } from "@mui/x-data-grid";
import { Box, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import PresenceDialog from "../components/PresenceDialog";
import { toast } from "sonner";

const presenceFeedback = (status) => {
  if (status === "yes") {
    toast.success("Presenca confirmada!");
  } else if (status === "maybe") {
    toast.success("Marcado como talvez.");
  } else {
    toast.success("Voce marcou ausencia.");
  }
};

const PresenceButton = ({ match, variant = "ghost", onConfirm }) => (
  <PresenceDialog
    match={match}
    trigger={
      <button
        className={`btn ${variant === "ghost" ? "btn-ghost" : "btn-primary w-full"}`}
      >
        Marcar
      </button>
    }
    onConfirm={onConfirm}
  />
);


const createColumns = (onConfirm) => [
  { field: "date", headerName: "Data", width: 140, valueGetter: (_, row) => row.date },
  { field: "time", headerName: "Hora", width: 100, valueGetter: (_, row) => row.time },
  { field: "home", headerName: "Casa", flex: 1, minWidth: 140 },
  { field: "away", headerName: "Fora", flex: 1, minWidth: 140 },
  { field: "venue", headerName: "Local", flex: 1, minWidth: 160 },
  {
    field: "presence",
    headerName: "Presenca",
    width: 130,
    sortable: false,
    filterable: false,
    renderCell: (params) => <PresenceButton match={params.row.__raw} onConfirm={onConfirm} />
  }
];

const MobileMatchCard = ({ match, onConfirm }) => (
  <div className="rounded-2xl border border-white/10 bg-black/30 p-4 space-y-3">
    <div className="flex items-center justify-between text-xs uppercase tracking-wide text-white/60">
      <span>{match.date}</span>
      <span>{match.time}</span>
    </div>
    <div className="space-y-1">
      <p className="text-base font-semibold text-white">{match.home}</p>
      <p className="text-sm text-white/60">vs {match.away}</p>
    </div>
    <div className="text-sm text-white/70">
      <span className="font-medium text-white">Local:</span> {match.venue}
    </div>
    <PresenceButton match={match.__raw} variant="primary" onConfirm={onConfirm} />
  </div>
);

export default function Matches() {
  const { data = [], isLoading } = useQuery({ queryKey: ["matches"], queryFn: fetchMatches });
  const queryClient = useQueryClient();
  const [team, setTeam] = useState("");
  const [venue, setVenue] = useState("");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  const handlePresence = useCallback(
    (status) => {
      presenceFeedback(status);
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
    [queryClient]
  );

  const columns = useMemo(() => createColumns(handlePresence), [handlePresence]);


  const teams = useMemo(() => {
    const set = new Set();
    data.forEach((m) => {
      set.add(m.home);
      set.add(m.away);
    });
    return Array.from(set);
  }, [data]);

  const venues = useMemo(() => Array.from(new Set(data.map((m) => m.venue))), [data]);

  const rows = useMemo(() => {
    const fmt = (iso) => {
      const dateObj = new Date(iso);
      const date = dateObj.toLocaleDateString("pt-BR");
      const time = dateObj.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
      return { date, time };
    };

    return data
      .filter((m) => {
        if (team && !(m.home === team || m.away === team)) return false;
        if (venue && m.venue !== venue) return false;
        const dj = dayjs(m.dateISO);
        if (from && dj.isBefore(from, "day")) return false;
        if (to && dj.isAfter(to, "day")) return false;
        return true;
      })
      .map((m) => {
        const t = fmt(m.dateISO);
        return { id: m.id, ...t, home: m.home, away: m.away, venue: m.venue, __raw: m };
      });
  }, [data, team, venue, from, to]);

  if (isLoading) return <div className="text-white/70">Carregando partidas...</div>;

  return (
    <div className="grid gap-3">
      <div className="card">
        <div className="text-sm text-white/60 mb-3">Filtros</div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gap: 12 }}>
            <TextField
              select
              label="Time"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              SelectProps={{ native: true }}
              size="small"
              sx={{ gridColumn: { xs: "span 6", sm: "span 2" } }}
            >
              <option value="">Todos</option>
              {teams.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </TextField>
            <TextField
              select
              label="Local"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              SelectProps={{ native: true }}
              size="small"
              sx={{ gridColumn: { xs: "span 6", sm: "span 2" } }}
            >
              <option value="">Todos</option>
              {venues.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </TextField>
            <DatePicker
              label="De"
              value={from}
              onChange={(v) => setFrom(v)}
              slotProps={{ textField: { size: "small" } }}
              sx={{ gridColumn: { xs: "span 3", sm: "span 1" } }}
            />
            <DatePicker
              label="Ate"
              value={to}
              onChange={(v) => setTo(v)}
              slotProps={{ textField: { size: "small" } }}
              sx={{ gridColumn: { xs: "span 3", sm: "span 1" } }}
            />
          </Box>
        </LocalizationProvider>
      </div>
      <div className="card">
        <div className="text-sm text-white/60 mb-2">Partidas</div>
        <div className="hidden md:block">
          <div className="mui-surface overflow-x-auto">
            <div className="min-w-[720px]" style={{ height: 520 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10, 25]}
                initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                disableRowSelectionOnClick
              />
            </div>
          </div>
        </div>
        <div className="md:hidden space-y-3">
          {rows.length === 0 && <div className="text-white/60 text-sm">Nenhuma partida para os filtros atuais.</div>}
          {rows.map((match) => (
            <MobileMatchCard key={match.id} match={match} onConfirm={handlePresence} />
          ))}
        </div>
      </div>
    </div>
  );
}






