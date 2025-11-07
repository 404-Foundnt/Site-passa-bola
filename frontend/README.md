# Passa a Bola — Frontend v4

UI/UX moderna para o Passa a Bola com **React + Vite + Tailwind CSS v4**, **Radix UI** (acessibilidade top), **MUI** (DataGrid/DatePickers onde faz sentido), **Leaflet** (mapa), **React Query**, **Framer Motion** e integração opcional com **Supabase** (auth/storage).

> **Tailwind v4**: não existe `tailwind.config.js`. Os tokens ficam em `src/index.css` com `@theme` e o plugin é `@tailwindcss/vite`.

---

## 📦 Stack
- **React 18**, **Vite 5**
- **Tailwind CSS v4** + utilitários “na unha” (`.card`, `.btn`, `.mui-surface`…)
- **Radix UI** (Dialog/Dropdown/Tabs/Combobox)
- **MUI**: `@mui/x-data-grid` e `@mui/x-date-pickers` (apenas onde agrega)
- **Leaflet** para mapas
- **@tanstack/react-query** para dados
- **Framer Motion** (animações leves)
- **Dayjs** (datas)
- **Supabase** (opcional): Storage (avatars) e, em seguida, Auth/DB

---

## 🚀 Início rápido

```bash
# Node 18+ (recomendado 20+). Seu Node: v22 já serve.
npm i
npm run dev
Abra o endereço que o Vite imprimir (geralmente http://localhost:5173/).

Login local (mock): acesse /login, digite qualquer e-mail/senha e entre.

🔧 Variáveis de ambiente (Supabase opcional)

Crie um arquivo .env.local na raiz:
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=chave-anon

Se não preencher, tudo roda com mocks.

🧭 Rotas principais

/login, /register (mock local por enquanto)

/app → layout autenticado

/app/dashboard

/app/leaderboard (DataGrid + PT-BR + estilos dark)

/app/matches (DataGrid, filtros, “Marcar presença” com Dialog Radix)

/app/teams e /app/team/:id

/app/player/:id ← ficha da jogadora (overall com gradiente 💚→💜, radar hexagonal, mini-campo heatmap, tabs)

/app/create-match

/app/calendar, /app/map

/app/explore (Combobox + Leaflet, “Explorar quadras”)

A Busca Global (Combobox no Header) navega para times, jogadoras, locais e páginas.

🗂️ Estrutura rápida

src/
  components/
    AppLayout.jsx
    Header.jsx
    Combobox.jsx
    GlobalSearch.jsx
    RadarHex.jsx        # hexágono reativo (SVG)
    MiniPitch.jsx       # mini-campo com heatmap (SVG)
  lib/
    api.js             # mocks dos dados (rápidos)
    auth.js            # login/logout localStorage (mock)
    supabase.js        # createClient + getAvatarUrl()
  pages/
    Player.jsx         # ficha da jogadora (tabs/gradiente/radar/heatmap)
    Leaderboard.jsx    # DataGrid estilizado
    Matches.jsx, Teams.jsx, Team.jsx, ...
  routes/
    ProtectedRoute.jsx
  index.css            # Tailwind v4 + tokens + utilitários + fixes MUI
  main.jsx, App.jsx

🎨 Design System (util classes)

.card → container com bg escuro, borda sutil e blur.

.btn, .btn-primary, .btn-ghost

.input, .label

.mui-surface → wrapper para MUI DataGrid com contraste correto no tema escuro.

Tokens em @theme (--color-pb-lilas, --color-pb-verde etc).

🖼️ Avatares (Supabase Storage)

No Supabase, crie bucket avatars (público).

Suba luana.jpg, rafa.jpg, ale.jpg etc (mesmo id da rota /app/player/:id).

O getAvatarUrl(playerId) monta a URL pública e a Player.jsx mostra a imagem.

Arquivo: src/lib/supabase.js

import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
export function getAvatarUrl(playerId) {
  try { return supabase.storage.from("avatars").getPublicUrl(`${String(playerId).toLowerCase()}.jpg`).data?.publicUrl || null; }
  catch { return null; }
}

npm run dev       # desenvolvimento
npm run build     # build de produção
npm run preview   # preview do build

⚠️ Dicas & Troubleshooting

Tela vazia azul/roxa: geralmente erro de runtime em algum import/JSX.

App.jsx usa React.lazy + <Suspense> para evitar “matar” o app; veja o console.

DataGrid “invisível” no dark: garanta .mui-surface no container e estilos do index.css.

Combobox não navega: ele retorna objeto { value, label }. O onChange já trata objeto ou string.

Header.jsx: se ver erro do esbuild, revise tags e feche os elementos (tinha um </div> extra numa versão antiga).

Leaflet: não esqueça import "leaflet/dist/leaflet.css"; nas páginas de mapa.

🧱 Roadmap próximo (quando você der o “go”)

Trocar mocks por Supabase (Auth + DB + Policies).

Presença/placar/XP com RLS e ranking semanal server-side.

Upload de avatar direto na ficha da jogadora (Storage signed URLs).

Modo admin (criar partidas/times/jogadoras).

🤝 Contribuir

Branch por feature

PR com descrição breve e screenshot/gif

Sem segredos no repo: configure .env.local (ignored) e mantenha um README curto no PR