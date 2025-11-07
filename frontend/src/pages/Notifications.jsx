export default function Notifications(){
  const items = [
    { id: 1, title: "Convite para amistoso", detail: "Panteras convidou seu time para jogo no sábado às 16:00." },
    { id: 2, title: "Presença confirmada", detail: "Você confirmou presença no jogo de quarta às 20:00." },
    { id: 3, title: "Nova mensagem", detail: "Secretaria: calendário atualizado para o mês." },
  ];
  return (
    <div className="grid gap-4">
      <div className="card">
        <div className="text-sm text-[var(--text-muted)]">Notificações</div>
        <h1 className="text-xl font-bold text-[var(--text-light)]">Caixa de entrada</h1>
      </div>
      <div className="card">
        <ul className="divide-y divide-[var(--border-color)]">
          {items.map((n) => (
            <li key={n.id} className="py-3">
              <div className="font-semibold text-[var(--text-light)]">{n.title}</div>
              <div className="text-sm text-[var(--text-muted)]">{n.detail}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

