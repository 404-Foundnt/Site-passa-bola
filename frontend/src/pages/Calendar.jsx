import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMatches } from "../lib/api";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { toast } from "sonner";
export default function CalendarPage(){
  const { data=[], isLoading } = useQuery({ queryKey:["matches"], queryFn: fetchMatches });
  const events = useMemo(()=> data.map(m => ({ id:String(m.id), title:`${m.home} vs ${m.away}`, start:m.dateISO })), [data]);
  if(isLoading) return <div className="text-white/70">Carregando calendário…</div>;
  return (
    <div className="card">
      <div className="text-sm text-white/60">Calendário</div>
      <div className="mt-3">
        <FullCalendar plugins={[dayGridPlugin, interactionPlugin]} initialView="dayGridMonth"
          events={events} height="auto"
          headerToolbar={{ left:"prev,next today", center:"title", right:"dayGridMonth,dayGridWeek" }}
          dateClick={(info)=>toast.success(`Dia selecionado: ${new Date(info.dateStr).toLocaleDateString("pt-BR")}`)}
          eventClick={(info)=>{info.jsEvent?.preventDefault(); toast.success(`Jogo: ${info.event.title}`);}} />
      </div>
    </div>
  );
}

