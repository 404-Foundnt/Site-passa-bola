# Passa a Bola – Frontend

SPA em React + Vite que consome a API local (pasta `backend/`) para exibir dashboard, partidas, ranking, páginas públicas etc. Demonstra consumo de JSON local via fetch, manipulação de DOM/estado (dialogs, toasts, invalidateQuery) e práticas de acessibilidade (Radix UI + labels sr-only).

## Stack
- React 18, Vite 5
- Tailwind CSS v4 (`@theme` em `src/index.css`)
- Radix UI, MUI DataGrid/DatePicker
- Leaflet + React Leaflet
- @tanstack/react-query, Framer Motion, Sonner

## Requisitos
- Node.js 18+
- Backend rodando em `backend/` (Express)

## Como rodar
1. **API**
   ```bash
   cd backend
   npm install
   npm run dev  # http://localhost:5050
   ```
2. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev   # http://localhost:5173
   ```

> O Vite já proxia `/api` para `http://localhost:5050` em desenvolvimento. Só crie `.env.local` com `VITE_API_URL=...` se usar outro host/porta.

Build/preview: `npm run build` e `npm run preview`.

## Estrutura
```
frontend/
  src/
    components/
    pages/           # dashboard, leaderboard, matches...
    public/          # Home/Tournaments (marketing)
    lib/
      api.js        # usa getAppData() e React Query
      localData.js  # fetch `/api/data` com cache
      auth.js       # POST /api/users e /api/login
```

## Fluxo de dados
- Backend expõe `/api/data` e derivados a partir de `backend/data/app-data.json`.
- `localData.js` faz o fetch uma vez e compartilha via cache (resetável).
- `api.js` fatia o JSON (dashboard, matches, leaderboard, etc.) para os hooks `useQuery`.
- Páginas públicas (`Home`, `Tournaments`) também usam a API, sem arrays estáticos.
- Cadastro/Login usam `POST /api/users` e `POST /api/login`, gravando em `backend/data/users.json`; a seção “Cadastros recentes” lê de `/api/users` para provar o registro.

## Interação/DOM
- `PresenceDialog` salva presença no `localStorage`, dispara toasts e invalida `['matches']` atualizando DataGrid/cards na hora.
- `CreateMatch`, `Explore`, `Calendar` agora usam toasts + `useNavigate` (nada de `alert`).
- Inputs públicos e Combobox ganharam `label` sr-only/`aria-labelledby` (W3C).

## Rotas úteis
- `/` público (Home, Tournaments, News)
- `/login`, `/register` (consumindo API real)
- `/app/dashboard`, `/app/matches`, `/app/leaderboard`, `/app/teams`, `/app/player/:id`, `/app/create-match`, `/app/calendar`, `/app/explore`, etc.

## Notas
- Novos cadastros aparecem em `backend/data/users.json` e no painel lateral de `/register`.
- Para limpar sessões locais, remova `localStorage.pb_user`.
- Os dados mockados estão em `backend/data/app-data.json`; altere ali para atualizar os cards do dashboard/páginas públicas.

## Contribuição
- Uma branch por feature.
- Rodar `npm run build` antes de PRs e listar passos de QA manual.
