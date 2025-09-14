import { DataGrid } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import { useQuery } from "@tanstack/react-query";
import { fetchLeaderboard } from "../lib/api";

// helper: transforma "Luana" → "luana", "Rafa Silva" → "rafa"
const slugify = (s) =>
  String(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .split(" ")[0];

const columns = [
  { field: "pos", headerName: "#", width: 70 },
  { field: "name", headerName: "Jogadora", flex: 1, minWidth: 140 },
  { field: "team", headerName: "Time", flex: 1, minWidth: 120 },
  {
    field: "xp",
    headerName: "XP",
    type: "number",
    width: 110,
    align: "right",
    headerAlign: "right",
    valueFormatter: ({ value }) =>
      new Intl.NumberFormat("pt-BR").format(value ?? 0),
  },
];

export default function Leaderboard() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboard,
  });

  if (isLoading) return <div className="text-white/70">Carregando ranking…</div>;

  return (
    <div className="card">
      <div className="text-sm text-white/60 mb-2">Ranking semanal</div>

      <div className="mui-surface">
        <div style={{ height: 480, width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            density="comfortable"
            initialState={{
              sorting: { sortModel: [{ field: "xp", sort: "desc" }] },
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            getRowClassName={(params) => `rank-${params.row.pos}`}
            disableRowSelectionOnClick
            onRowClick={(p) => {
              const slug = slugify(p.row.name);
              window.location.href = `/app/player/${slug}`;
            }}
            sx={{
              bgcolor: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.1)",
              borderRadius: "12px",
              "& .MuiDataGrid-row": { cursor: "pointer" },
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "rgba(255,255,255,.06)",
              },
              "& .MuiDataGrid-cell": {
                borderColor: "rgba(255,255,255,.08)",
              },
              "& .MuiDataGrid-row:nth-of-type(odd)": {
                bgcolor: "rgba(255,255,255,.03)",
              },
              "& .MuiDataGrid-row:hover": {
                bgcolor: "rgba(124,58,237,.12)", // lilás leve no hover
              },
              "& .MuiDataGrid-footerContainer": {
                bgcolor: "rgba(255,255,255,.06)",
              },
              /* Destaque Top 3 */
              "& .rank-1": { boxShadow: "inset 4px 0 0 #16A34A" },
              "& .rank-2": { boxShadow: "inset 4px 0 0 #22c55e" },
              "& .rank-3": { boxShadow: "inset 4px 0 0 #34d399" },
            }}
          />
        </div>
      </div>
    </div>
  );
}
