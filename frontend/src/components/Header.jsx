import { Link, NavLink, useNavigate } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Plus, User, Menu, X } from "lucide-react";
import { useState } from "react";
import GlobalSearch from "./GlobalSearch.jsx";
import { logout, getUser } from "../lib/auth.js";
import links from "./navLinks";

export default function Header() {
  const user = getUser();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-off-dark)]/90 backdrop-blur border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 h-14 flex items-center gap-2 sm:gap-3">
        <button
          className="sm:hidden btn btn-ghost rounded-full w-10 h-10 grid place-items-center"
          aria-label="Abrir menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={18} />
        </button>
        <div className="flex-1 min-w-0 hidden sm:block">
          <GlobalSearch />
        </div>

        <Link to="/app/create-match" className="btn btn-ghost gap-2 hidden sm:flex">
          <Plus size={18} /> Nova partida
        </Link>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className="btn btn-ghost rounded-full aspect-square w-10 h-10 grid place-items-center"
              aria-label="Abrir menu do usuário"
            >
              <User size={18} />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content className="min-w-48 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-off-dark)] text-[var(--text-light)] shadow-xl backdrop-blur p-2" sideOffset={8}>
              <div className="px-2 py-1 text-xs text-[var(--text-muted)]">Logada como</div>
              <div className="px-2 pb-2 break-all text-sm text-[var(--text-light)]">{user?.email ?? "-"}</div>

              <button
                className="btn btn-ghost w-full justify-start text-[var(--text-light)] hover:text-[var(--text-light)]"
                onClick={() => navigate("/app/profile")}
              >
                Perfil
              </button>

              <button
                className="btn btn-ghost w-full justify-start text-[var(--text-light)] hover:text-[var(--text-light)]"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                Sair
              </button>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/50" aria-label="Fechar menu" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-[var(--bg)] border-r border-[var(--border-color)] shadow-xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="text-lg font-bold"><span className="text-pb-lilas">Passa</span> <span className="text-pb-verde">a Bola</span></div>
              <button className="btn btn-ghost rounded-full w-9 h-9 grid place-items-center" aria-label="Fechar" onClick={() => setMobileOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="mb-3">
              <GlobalSearch />
            </div>
            <nav className="flex-1 overflow-y-auto space-y-1">
              {links.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) => `btn btn-ghost w-full justify-start gap-2 ${isActive ? "bg-pb-lilas/20 text-[var(--text-light)]" : "text-[var(--text-muted)]"}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon size={18} />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
