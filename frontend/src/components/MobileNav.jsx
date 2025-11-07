import { NavLink } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { appLinks } from "../data/appLinks.js";

export default function MobileNav() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="btn btn-ghost gap-2 sm:hidden" aria-label="Abrir menu de navegacao">
          <Menu size={18} />
          Menu
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />

        <Dialog.Content className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-xs bg-black/90 border-r border-white/10 p-4 flex flex-col gap-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="text-xl font-semibold">
              <span className="text-pb-lilas">Passa</span> <span className="text-pb-verde">a Bola</span>
            </div>
            <Dialog.Close className="btn btn-ghost rounded-full w-10 h-10" aria-label="Fechar menu">
              <X size={18} />
            </Dialog.Close>
          </div>

          <nav className="flex flex-col gap-1">
            {appLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Dialog.Close asChild key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `btn btn-ghost justify-start gap-2 ${isActive ? "bg-pb-lilas/20 text-white" : "text-white/80"}`
                    }
                  >
                    <Icon size={18} />
                    {item.label}
                  </NavLink>
                </Dialog.Close>
              );
            })}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
