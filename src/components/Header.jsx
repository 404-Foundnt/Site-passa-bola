// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import GlobalSearch from "./GlobalSearch";
import { logout, getUser } from "../lib/auth";

export default function Header(){
  const user = getUser();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-black/30 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex-1"><GlobalSearch /></div>

        <Link to="/app/create-match" className="btn btn-ghost">
          ➕ Nova partida
        </Link>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className="btn btn-ghost rounded-full"
              aria-label="Abrir menu do usuário"
            >
              🙂
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content className="card p-2 min-w-48" sideOffset={8}>
              <div className="px-2 py-1 text-xs text-white/60">Logada como</div>
              <div className="px-2 pb-2 break-all text-sm">{user?.email}</div>

              <button
                className="btn btn-ghost w-full justify-start"
                onClick={() => navigate("/app/profile")}
              >
                Perfil
              </button>

              <button
                className="btn btn-ghost w-full justify-start"
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
