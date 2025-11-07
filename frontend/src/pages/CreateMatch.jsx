import { useState } from "react";
import Combobox from "../components/Combobox";
const TEAM_OPTIONS = [
  { value:"Panteras", label:"Panteras" },
  { value:"Fênix", label:"Fênix" },
  { value:"Corujas", label:"Corujas" },
  { value:"Estrelas", label:"Estrelas" },
  { value:"Furacão", label:"Furacão" },
];
const VENUE_OPTIONS = [
  { value:"Arena Suzano", label:"Arena Suzano" },
  { value:"CEU Guaianases", label:"CEU Guaianases" },
  { value:"Parque Linear", label:"Parque Linear" },
];
export default function CreateMatch(){
  const [form,setForm]=useState({home:"Passa a Bola", away:"Panteras", date:"", time:"", venue:"Arena Suzano"});
  function update(k,v){ setForm(s=>({...s,[k]:v})); }
  function onSubmit(e){ e.preventDefault(); alert("(UI) Partida criada! Depois ligamos no backend."); }
  return (
    <div className="max-w-xl card">
      <div className="text-lg font-semibold">Criar Partida</div>
      <form className="mt-4 grid gap-3" onSubmit={onSubmit}>
        <div><div className="label">Time da casa</div><input className="input" value={form.home} onChange={e=>update("home",e.target.value)} /></div>
        <div><div className="label">Time visitante</div><Combobox options={TEAM_OPTIONS} value={form.away} onChange={(v)=>update("away", v)} placeholder="Selecione o adversário…" searchPlaceholder="Buscar time…" /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><div className="label">Data</div><input className="input" type="date" value={form.date} onChange={e=>update("date",e.target.value)} /></div>
          <div><div className="label">Hora</div><input className="input" type="time" value={form.time} onChange={e=>update("time",e.target.value)} /></div>
        </div>
        <div><div className="label">Local</div><Combobox options={VENUE_OPTIONS} value={form.venue} onChange={(v)=>update("venue", v)} placeholder="Selecione o local…" searchPlaceholder="Buscar local…" /></div>
        <button className="btn btn-primary mt-2">Salvar</button>
      </form>
    </div>
  );
}
