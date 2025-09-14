import { useQuery } from "@tanstack/react-query";
import { fetchDashboard, fetchTicker, fetchBadges } from "../lib/api";
import StatCard from "../components/StatCard";
import ScoreTicker from "../components/ScoreTicker";
import Badges from "../components/Badges";
import PresenceDialog from "../components/PresenceDialog";
import { toast } from "sonner";
function fmtDate(iso){ try { return new Date(iso).toLocaleString("pt-BR", { dateStyle:"full", timeStyle:"short" }); } catch { return iso; } }
export default function Dashboard(){
  const dash = useQuery({ queryKey:["dashboard"], queryFn: fetchDashboard });
  const ticker = useQuery({ queryKey:["ticker"], queryFn: fetchTicker, refetchInterval: 5000, staleTime: 3000 });
  const badges = useQuery({ queryKey:["badges"], queryFn: fetchBadges });
  if(dash.isLoading) return <div className="text-white/70">Carregando dashboard…</div>;
  return (
    <div className="grid gap-6">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <div className="text-sm text-white/60">Próximo jogo</div>
          <div className="mt-1 text-xl font-semibold">{dash.data.nextMatch.opponent}</div>
          <div className="text-white/70">{fmtDate(dash.data.nextMatch.dateISO)} • {dash.data.nextMatch.venue}</div>
          <div className="mt-4 flex flex-wrap gap-2">
            <PresenceDialog
              match={dash.data.nextMatch}
              trigger={<button className="btn btn-primary">Confirmar presença</button>}
              onConfirm={(s)=> toast.success(s==='yes'?'Presença confirmada! 💚': s==='maybe'?'Marcado como “Talvez”. 🤔':'Você marcou ausência. 😢')}
            />
          </div>
          <iframe title="mapa" className="mt-4 rounded-xl w-full h-56 border border-white/10" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://maps.google.com/maps?q=${dash.data.nextMatch.lat},${dash.data.nextMatch.lng}&z=15&output=embed`} />
        </div>
        <ScoreTicker items={ticker.data||[]} />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dash.data.stats.map(s=> <StatCard key={s.id} {...s} />)}
      </div>
      {badges.data && <Badges items={badges.data} />}
    </div>
  );
}
