export default function Badges({ items }){
  return (
    <div className="card">
      <div className="text-sm text-white/60">Conquistas</div>
      <ul className="mt-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((b)=> (
          <li key={b.id} className={`p-4 rounded-xl border ${b.owned?'bg-emerald-500/10 border-emerald-500/30':'bg-white/5 border-white/10'}`} title={b.desc}>
            <div className="text-base font-semibold">{b.label}</div>
            <div className="text-xs text-white/70 mt-1">{b.desc}</div>
            <div className={`mt-2 text-xs ${b.owned?'text-emerald-300':'text-white/40'}`}>{b.owned?'Conquistada':'A conquistar'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
