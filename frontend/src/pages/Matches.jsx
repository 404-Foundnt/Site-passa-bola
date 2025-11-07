import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMatches } from "../lib/api";
import { DataGrid } from "@mui/x-data-grid";
import { Box, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import PresenceDialog from "../components/PresenceDialog";
import { toast } from "sonner";

function PresenceCell({ row }){
  return (
    <PresenceDialog
      match={row.__raw}
      trigger={<button className="btn btn-ghost">Marcar</button>}
      onConfirm={(s)=> toast.success(s==='yes'?'Presença confirmada! 💚': s==='maybe'?'Marcado como “Talvez”. 🤔':'Você marcou ausência. 😢')}
    />
  );
}

const columns = [
  { field: "date", headerName: "Data", width: 140, valueGetter: (_, row) => row.date },
  { field: "time", headerName: "Hora", width: 100, valueGetter: (_, row) => row.time },
  { field: "home", headerName: "Casa", flex: 1, minWidth: 140 },
  { field: "away", headerName: "Fora", flex: 1, minWidth: 140 },
  { field: "venue", headerName: "Local", flex: 1, minWidth: 160 },
  { field: "presence", headerName: "Presença", width: 130, sortable:false, filterable:false, renderCell: (params) => <PresenceCell row={params.row} /> },
];

export default function Matches(){
  const { data = [], isLoading } = useQuery({ queryKey: ["matches"], queryFn: fetchMatches });
  const [team, setTeam] = useState("");
  const [venue, setVenue] = useState("");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const teams = useMemo(() => {
    const set = new Set(); data.forEach(m => { set.add(m.home); set.add(m.away); }); return Array.from(set);
  }, [data]);
  const venues = useMemo(() => Array.from(new Set(data.map(m => m.venue))), [data]);
  const rows = useMemo(() => {
    const fmt = (iso) => { const d = new Date(iso); const date = d.toLocaleDateString("pt-BR"); const time = d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }); return { date, time }; };
    return data.filter(m => {
      if (team && !(m.home === team || m.away === team)) return false;
      if (venue && m.venue !== venue) return false;
      const dj = dayjs(m.dateISO);
      if (from && dj.isBefore(from, "day")) return false;
      if (to && dj.isAfter(to, "day")) return false;
      return true;
    }).map(m => { const t = fmt(m.dateISO); return { id: m.id, ...t, home: m.home, away: m.away, venue: m.venue, __raw: m }; });
  }, [data, team, venue, from, to]);
  if (isLoading) return <div className="text-white/70">Carregando partidas…</div>;
  return (
    <div className="grid gap-3">
      <div className="card">
        <div className="text-sm text-white/60 mb-3">Filtros</div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gap: 12 }}>
            <TextField select label="Time" value={team} onChange={(e) => setTeam(e.target.value)} SelectProps={{ native: true }} size="small" sx={{ gridColumn: { xs: "span 6", sm: "span 2" } }}>
              <option value="">Todos</option>{teams.map((t) => <option key={t} value={t}>{t}</option>)}
            </TextField>
            <TextField select label="Local" value={venue} onChange={(e) => setVenue(e.target.value)} SelectProps={{ native: true }} size="small" sx={{ gridColumn: { xs: "span 6", sm: "span 2" } }}>
              <option value="">Todos</option>{venues.map((v) => <option key={v} value={v}>{v}</option>)}
            </TextField>
            <DatePicker label="De" value={from} onChange={(v) => setFrom(v)} slotProps={{ textField: { size: "small" } }} sx={{ gridColumn: { xs: "span 3", sm: "span 1" } }} />
            <DatePicker label="Até" value={to} onChange={(v) => setTo(v)} slotProps={{ textField: { size: "small" } }} sx={{ gridColumn: { xs: "span 3", sm: "span 1" } }} />
          </Box>
        </LocalizationProvider>
      </div>
      <div className="card">
        <div className="text-sm text-white/60 mb-2">Partidas</div>
        <div className="mui-surface overflow-x-auto">
          <div className="min-w-[720px]" style={{ height: 520 }}>
            <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10, 25]} initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} disableRowSelectionOnClick />
          </div>
        </div>
      </div>
    </div>
  );
}
