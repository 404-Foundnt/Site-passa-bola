import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchTeam } from "../lib/api.js";
import Combobox from "../components/Combobox.jsx";

const slugify = (value) =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const STATUS_STYLES = {
  Vou: "bg-emerald-500/15 text-emerald-300 border border-emerald-400/40",
  Talvez: "bg-amber-500/15 text-amber-300 border border-amber-400/40",
  'Não vou': "bg-rose-500/20 text-rose-300 border border-rose-400/40",
  Chegando: "bg-sky-500/15 text-sky-300 border border-sky-400/40"
};

export default function Team() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({ queryKey: ["team", id], queryFn: () => fetchTeam(id) });
  const [player, setPlayer] = useState(null);

  const roster = data?.roster ?? [];
  const availability = data?.availability ?? [];

  const playerOptions = useMemo(
    () => roster.map((item) => ({ value: String(item.id), label: item.name })),
    [roster]
  );

  const filtered = useMemo(() => {
    if (!player) return roster;
    return roster.filter((item) => String(item.id) === String(player));
  }, [roster, player]);

  if (isLoading) return <div className="text-white/70">Carregando time…</div>;

  return (
    <div className="grid gap-6">
      <div className="card">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <p className="text-sm text-white/60">Time</p>
            <h1 className="text-xl font-bold">{data.name}</h1>
          </div>
          <div className="text-xs text-white/50">{roster.length} jogadoras ativas</div>
        </header>

        <div className="grid md:grid-cols-3 gap-3 mt-4">
          <div>
            <div className="label">Filtrar jogadora</div>
            <Combobox label="Jogadora"
              options={playerOptions}
              value={player}
              onChange={setPlayer}
              placeholder="Digite um nome"
              searchPlaceholder="Buscar jogadora"
            />
            {player && (
              <button className="btn btn-ghost mt-2" onClick={() => setPlayer(null)}>
                Limpar filtro
              </button>
            )}
          </div>
          <div className="md:col-span-2">
            <div className="text-white/60 text-sm">Elenco</div>
            <ul className="mt-3 grid md:grid-cols-2 gap-2">
              {filtered.map((item) => {
                const slug = item.id ? String(item.id) : slugify(item.name);
                return (
                  <li
                    key={item.id}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer hover:bg-white/10"
                    onClick={() => (window.location.href = `/app/player/${slug}`)}
                    title="Ver ficha da jogadora"
                  >
                    <span>{item.name}</span>
                    <span className="text-xs text-white/60">{item.position}</span>
                  </li>
                );
              })}
              {filtered.length === 0 && (
                <li className="text-white/60 text-sm">Nenhuma jogadora encontrada.</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="text-white/60 text-sm mb-3">Confirmações</div>
        <div className="grid md:grid-cols-3 gap-2">
          {availability.map((item) => (
            <div key={item.id} className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="text-sm font-semibold">{item.name}</div>
              <div className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[item.status] ?? "bg-white/5 text-white/70 border border-white/10"}`}>
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
