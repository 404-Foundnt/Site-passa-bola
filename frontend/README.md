# Passa a Bola – Frontend

SPA construída com **React + Vite** para o dashboard "Passa a Bola". A interface consome os dados da API local (pasta `backend/`), demonstra manipulação de DOM/estado (dialogs, toasts, invalidações do React Query) e segue boas práticas de acessibilidade (Radix UI + labels sr-only).

## Stack
- React 18, Vite 5
- Tailwind CSS v4 (tokens em `src/index.css` via `@theme`)
- Radix UI (Dialog, Dropdown, Popover)
- MUI DataGrid / Date Pickers
- Leaflet (mapas) + React Leaflet
- @tanstack/react-query
- Framer Motion, Dayjs, Sonner (toasts)

## Requisitos
- Node.js 18+ (20 recomendado)
- API local rodando em `backend/` (Express + JSON local)

## Como rodar
1. **API**
   ```bash
   cd backend
   npm install
   npm run dev # http://localhost:5050
   ```

2. **Frontend**
   ```bash
   cd frontend
   npm install
   echo VITE_API_URL=http://localhost:5050 > .env.local  # Windows: use type/Set-Content
   npm run dev # http://localhost:5173
   ```

Para build/preview: `npm run build` e `npm run preview`.

## Estrutura principal
```
frontend/
  src/
    components/        # Layout, Combobox, PresenceDialog, etc.
    pages/             # Dashboard, Matches, Teams, Public pages...
    public/            # Landing/Home/Tournaments (via PublicLayout)
    lib/
      api.js          # Funções usadas pelo React Query (buscam a API local)
      localData.js     # Cache do fetch `${VITE_API_URL}/api/data`
      auth.js, supabase.js
```

## Fluxo de dados
- `backend/server.js` expõe `/api/data` (JSON completo) e endpoints derivados.
- `src/lib/localData.js` busca esse JSON uma vez e compartilha via cache (resetável).
- `src/lib/api.js` divide as fatias (dashboard, matches, leaderboards, etc.) e injeta em `useQuery`.
- Páginas públicas (`Home`, `Tournaments`) também usam o hook para mostrar hero cards, programas e filtros sem arrays estáticos.

## Destaques de interação/DOM
- `PresenceDialog`: salva presença no `localStorage`, dispara toasts e invalida `['matches']` para atualizar DataGrid/cards imediatamente.
- `CreateMatch`, `Calendar`, `Explore`: substituíram `alert` por toasts + `useNavigate`, mantendo SPA.
- Combobox tem `label` sr-only + `aria-labelledby`, e os inputs públicos ganharam `<label class="sr-only">` para cumprir W3C.

## Rotas úteis
- `/` público (Home, Tournaments, News)
- `/login`, `/register` (mock)
- `/app` + subrotas (Dashboard, Leaderboard, Matches, Teams, Player, Create Match, Calendar, Explore)

## Contribuição
- Uma branch por feature.
- Descrever no PR o que mudou e incluir passos de QA manual.

