import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTeams } from "../lib/api";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Box } from "@mui/material";
const columns = [
  { field: "name", headerName: "Time", flex: 1, minWidth: 160 },
  { field: "city", headerName: "Cidade", flex: 1, minWidth: 140 },
  { field: "players", headerName: "Jogadoras", type: "number", width: 120 },
];
export default function Teams(){
  const { data = [], isLoading } = useQuery({ queryKey:["teams"], queryFn: fetchTeams });
  const [q, setQ] = useState("");
  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return data.filter(t => !term || t.name.toLowerCase().includes(term) || t.city.toLowerCase().includes(term)).map(t => ({ id: t.id, name: t.name, city: t.city, players: t.players }));
  }, [data, q]);
  if (isLoading) return <div className="text-white/70">Carregando times…</div>;
  return (
    <div className="grid gap-3">
      <div className="card">
        <div className="text-sm text-white/60 mb-3">Busca</div>
        <Box sx={{ display:"grid", gridTemplateColumns:"repeat(6, minmax(0,1fr))", gap:12 }}>
          <TextField label="Pesquisar por nome/cidade" value={q} onChange={(e)=>setQ(e.target.value)} size="small" sx={{ gridColumn: { xs: "span 6", sm: "span 3" } }} />
        </Box>
      </div>
      <div className="card">
        <div className="text-sm text-white/60 mb-2">Times</div>
        <div className="mui-surface"><div style={{ height: 520, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSizeOptions={[5,10,25]} initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} disableRowSelectionOnClick onRowClick={(p)=>{ window.location.href = `/app/team/${p.id}`; }} />
        </div></div>
      </div>
    </div>
  );
}
