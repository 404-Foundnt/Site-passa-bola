import { Link, useNavigate } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Plus, User } from "lucide-react";
import GlobalSearch from "./GlobalSearch.jsx";
import { logout, getUser } from "../lib/auth.js";
import MobileNav from "./MobileNav.jsx";

export default function Header() {
  const user = getUser();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-black/30 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 h-14 flex items-center gap-2 sm:gap-3">
        <MobileNav />

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
              aria-label="Abrir menu do usuario"
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
    </header>
  );
}
