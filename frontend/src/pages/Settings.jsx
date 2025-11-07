export default function Settings(){
  return (
    <div className="grid gap-4">
      <div className="card">
        <div className="text-sm text-[var(--text-muted)]">Preferências</div>
        <h1 className="text-xl font-bold text-[var(--text-light)]">Configurações</h1>
      </div>
      <div className="card grid gap-3">
        <label className="flex items-center justify-between">
          <span className="text-[var(--text-light)]">Notificações por e-mail</span>
          <input type="checkbox" defaultChecked className="accent-pb-verde" />
        </label>
        <label className="flex items-center justify-between">
          <span className="text-[var(--text-light)]">Notificações push</span>
          <input type="checkbox" className="accent-pb-verde" />
        </label>
        <label className="flex items-center justify-between">
          <span className="text-[var(--text-light)]">Compartilhar disponibilidade com o time</span>
          <input type="checkbox" defaultChecked className="accent-pb-verde" />
        </label>
        <button className="btn-primary mt-2 self-start">Salvar</button>
      </div>
    </div>
  );
}

