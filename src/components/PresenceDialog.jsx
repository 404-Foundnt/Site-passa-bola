import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
export default function PresenceDialog({ trigger, match, onConfirm }){
  const [status, setStatus] = useState("yes");
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed inset-0 grid place-items-center p-4">
          <div className="card w-full max-w-md">
            <Dialog.Title className="text-lg font-semibold">Confirmar presença</Dialog.Title>
            <div className="mt-3 text-sm text-white/70">
              {match?.home} vs {match?.away} — {new Date(match?.dateISO).toLocaleString("pt-BR")}
              <div className="mt-3">Como você quer marcar?</div>
            </div>
            <div className="mt-3 flex gap-2">
              <button className={`btn ${status==='yes'?'bg-emerald-600':'btn-ghost'}`} onClick={()=>setStatus('yes')}>Vou</button>
              <button className={`btn ${status==='maybe'?'bg-amber-600':'btn-ghost'}`} onClick={()=>setStatus('maybe')}>Talvez</button>
              <button className={`btn ${status==='no'?'bg-rose-600':'btn-ghost'}`} onClick={()=>setStatus('no')}>Não vou</button>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Dialog.Close className="btn btn-ghost">Cancelar</Dialog.Close>
              <Dialog.Close asChild>
                <button className="btn btn-primary" onClick={()=>onConfirm?.(status)}>Salvar</button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
