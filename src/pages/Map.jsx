import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMatches } from "../lib/api";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png?url";
import icon2xUrl from "leaflet/dist/images/marker-icon-2x.png?url";
import shadowUrl from "leaflet/dist/images/marker-shadow.png?url";
const DefaultIcon = L.icon({ iconUrl, iconRetinaUrl: icon2xUrl, shadowUrl, iconSize: [25,41], iconAnchor:[12,41] });
L.Marker.prototype.options.icon = DefaultIcon;
export default function MapPage(){
  const { data=[], isLoading } = useQuery({ queryKey:["matches"], queryFn: fetchMatches });
  useEffect(()=>{ document.body.classList.add("leaflet-body-fix"); return ()=>document.body.classList.remove("leaflet-body-fix"); },[]);
  if(isLoading) return <div className="text-white/70">Carregando mapa…</div>;
  const center = data[0] ?? { lat:-23.55, lng:-46.33 };
  return (
    <div className="card">
      <div className="text-sm text-white/60">Locais das partidas</div>
      <div className="mt-3 rounded-xl overflow-hidden border border-white/10">
        <MapContainer center={[center.lat, center.lng]} zoom={12} style={{height: 480, width:"100%"}}>
          <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {data.map(m => (
            <Marker key={m.id} position={[m.lat, m.lng]}>
              <Popup>
                <div className="text-sm">
                  <div className="font-semibold">{m.home} vs {m.away}</div>
                  <div className="text-white/70">{m.venue}</div>
                  <div className="text-white/60 text-xs">{new Date(m.dateISO).toLocaleString("pt-BR")}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="text-xs text-white/60 mt-2">Mapa interativo com React-Leaflet.</div>
    </div>
  );
}
