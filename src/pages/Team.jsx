import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { fetchTeam } from "../lib/api";
import Combobox from "../components/Combobox";
export default function Team(){
  const { id }=useParams();
  const { data, isLoading } = useQuery({ queryKey:["team",id], queryFn: ()=>fetchTeam(id) });
  const [player, setPlayer] = useState(null);
  const playerOptions = useMemo(()=> (data?.roster||[]).map(p => ({ value:String(p.id), label:p.name })), [data]);
  const filtered = useMemo(()=>{
    if(!player) return data?.roster||[];
    return (data?.roster||[]).filter(p => String(p.id) === String(player));
  }, [data, player]);
  if(isLoading) return <div className="text-white/70">Carregando time…</div>;
  return (
    <div className="grid gap-6">
      <div className="card">
        <div className="text-xl font-bold">{data.name}</div>
        <div className="grid md:grid-cols-3 gap-3 mt-3">
          <div className="md:col-span-1">
            <div className="label">Filtrar jogadora</div>
            <Combobox options={playerOptions} value={player} onChange={setPlayer} placeholder="Digite um nome…" searchPlaceholder="Buscar jogadora…" />
            {player && (<button className="btn btn-ghost mt-2" onClick={()=>setPlayer(null)}>Limpar filtro</button>)}
          </div>
          <div className="md:col-span-2">
            <div className="text-white/60 text-sm">Elenco</div>
<ul className="mt-3 grid md:grid-cols-2 gap-2">
  {filtered.map(p=> {
    const slug = String(p.name).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().split(" ")[0];
    return (
      <li
        key={p.id}
        className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer hover:bg-white/10"
        onClick={()=> window.location.href = `/app/player/${slug}`}
        title="Ver ficha da jogadora"
      >
        <span>{p.name}</span>
        <span className="text-xs text-white/60">{p.position}</span>
      </li>
    );
  })}
  {filtered.length===0 && <li className="text-white/60 text-sm">Nenhuma jogadora encontrada.</li>}
</ul>

          </div>
        </div>
      </div>
      <div className="card">
        <div className="text-white/60 text-sm">Confirmações</div>
        <div className="mt-3 grid md:grid-cols-3 gap-2">
          {data.availability.map(p=> (<div key={p.id} className="p-3 rounded-xl bg-white/5 border border-white/10"><div className="text-sm">{p.name}</div><div className="text-xs text-emerald-400">{p.status}</div></div>))}
        </div>
      </div>
    </div>
  );
}
