import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Combobox from "../components/Combobox";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png?url";
import icon2xUrl from "leaflet/dist/images/marker-icon-2x.png?url";
import shadowUrl from "leaflet/dist/images/marker-shadow.png?url";
const DefaultIcon = L.icon({ iconUrl, iconRetinaUrl: icon2xUrl, shadowUrl, iconSize: [25,41], iconAnchor:[12,41] });
L.Marker.prototype.options.icon = DefaultIcon;
const VENUES = [
  { id:"arena-suzano", name:"Arena Suzano", lat:-23.5445, lng:-46.3111 },
  { id:"ceu-guaianases", name:"CEU Guaianases", lat:-23.52, lng:-46.36 },
  { id:"parque-linear", name:"Parque Linear", lat:-23.57, lng:-46.29 },
];
export default function Explore(){
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initial = params.get("venue");
  const [venue, setVenue] = useState(initial || "arena-suzano");
  const options = useMemo(()=> VENUES.map(v => ({ value:v.id, label:v.name })), []);
  const current = useMemo(()=> VENUES.find(v => v.id === venue) || VENUES[0], [venue]);
  useEffect(()=>{ document.body.classList.add("leaflet-body-fix"); return ()=>document.body.classList.remove("leaflet-body-fix"); },[]);
  return (
    <div className="grid gap-4">
      <div className="card">
        <div className="text-lg font-semibold">Explorar quadras</div>
        <div className="grid md:grid-cols-3 gap-3 mt-3">
          <div>
            <div className="label">Local</div>
            <Combobox label="Local" options={options} value={venue} onChange={setVenue} placeholder="Selecione o local…" searchPlaceholder="Buscar local…" />
          </div>
          <div className="md:col-span-2">
            <div className="text-sm text-white/60">Sugestão</div>
            <div className="mt-2 p-3 rounded-xl bg-white/5 border border-white/10">Escolha um local para visualizar no mapa e usar na criação de partidas.</div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="text-sm text-white/60 mb-2">Mapa</div>
        <div className="rounded-xl overflow-hidden border border-white/10">
          <MapContainer key={current.id} center={[current.lat, current.lng]} zoom={13} style={{height: 480, width:"100%"}}>
            <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[current.lat, current.lng]}>
              <Popup><div className="text-sm"><div className="font-semibold">{current.name}</div><div className="text-white/60">({current.lat.toFixed(4)}, {current.lng.toFixed(4)})</div></div></Popup>
            </Marker>
          </MapContainer>
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={()=>{
            toast.success(`Local definido: ${current.name}`);
            navigate(`/app/create-match?venue=${current.id}`);
          }}
        >
          Usar este local
        </button>
      </div>
    </div>
  );
}
