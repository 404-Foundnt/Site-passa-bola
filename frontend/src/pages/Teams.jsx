import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchTeams } from "../lib/api";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Box } from "@mui/material";

const columns = [
  { field: "name", headerName: "Time", flex: 1, minWidth: 160 },
  { field: "city", headerName: "Cidade", flex: 1, minWidth: 140 },
  { field: "players", headerName: "Jogadoras", type: "number", width: 120 }
];

const MobileTeamCard = ({ team, onNavigate }) => (
  <button
    type="button"
    onClick={onNavigate}
    className="rounded-2xl border border-white/10 bg-black/30 p-4 text-left shadow-sm active:scale-[0.99]"
  >
    <div className="text-base font-semibold text-white">{team.name}</div>
    <div className="text-sm text-white/70">{team.city}</div>
    <div className="mt-3 text-xs text-white/60">{team.players} jogadoras cadastradas</div>
    <div className="mt-2 text-xs text-pb-lilas">Toque para ver o elenco</div>
  </button>
);

export default function Teams() {
  const navigate = useNavigate();
  const { data = [], isLoading } = useQuery({ queryKey: ["teams"], queryFn: fetchTeams });
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return data
      .filter((team) => !term || team.name.toLowerCase().includes(term) || team.city.toLowerCase().includes(term))
      .map((team) => ({ id: team.id, name: team.name, city: team.city, players: team.players }));
  }, [data, q]);

  if (isLoading) return <div className="text-white/70">Carregando times...</div>;

  return (
    <div className="grid gap-3">
      <div className="card">
        <div className="text-sm text-white/60 mb-3">Busca</div>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0,1fr))", gap: 12 }}>
          <TextField
            label="Pesquisar por nome/cidade"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            size="small"
            sx={{ gridColumn: { xs: "span 6", sm: "span 3" } }}
          />
        </Box>
      </div>
      <div className="card">
        <div className="text-sm text-white/60 mb-2">Times</div>
        <div className="hidden md:block">
          <div className="mui-surface overflow-x-auto">
            <div className="min-w-[640px]" style={{ height: 520 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10, 25]}
                initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                disableRowSelectionOnClick
                onRowClick={(params) => {
                  window.location.href = `/app/team/${params.id}`;
                }}
              />
            </div>
          </div>
        </div>
        <div className="md:hidden space-y-3">
          {rows.length === 0 && <div className="text-white/60 text-sm">Nenhum time encontrado.</div>}
          {rows.map((team) => (
            <MobileTeamCard key={team.id} team={team} onNavigate={() => navigate(`/app/team/${team.id}`)} />
          ))}
        </div>
      </div>
    </div>
  );
}
