import { getUser } from "../lib/auth";
export default function Profile(){
  const user = getUser();
  return (
    <div className="grid gap-6">
      <div className="card">
        <div className="text-xl font-bold">Meu Perfil</div>
        <div className="mt-2 grid md:grid-cols-2 gap-4">
          <div><div className="text-sm text-white/60">E-mail</div><div className="mt-1 break-all">{user?.email}</div></div>
          <div><div className="text-sm text-white/60">Posição favorita</div><select className="input mt-1"><option>MEI</option><option>ATA</option><option>ZAG</option><option>LAT</option><option>GOL</option></select></div>
          <div className="md:col-span-2"><div className="text-sm text-white/60">Bio</div><textarea className="input mt-1 min-h-24" placeholder="Fale sobre você..."></textarea></div>
        </div>
      </div>
    </div>
  );
}
