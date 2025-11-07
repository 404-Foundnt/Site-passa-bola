# Passa a Bola – API

Servidor Express usado pelo frontend para servir o JSON local (`data/app-data.json`) e os cadastros de jogadoras (`data/users.json`).

## Requisitos
- Node.js 18+

## Instalação
```bash
npm install
```

## Desenvolvimento
```bash
npm run dev   # http://localhost:5050
```

## Produção
```bash
npm run start
```

## Endpoints principais
- `GET /api` – mapa geral
- `GET /api/data` – JSON completo
- `GET /api/dashboard`
- `GET /api/ticker`
- `GET /api/badges`
- `GET /api/matches`
- `GET /api/leaderboard`
- `GET /api/teams`
- `GET /api/team/:id`
- `GET /api/public/home`
- `GET /api/public/tournaments`

## Cadastros (usados pelo formulário do frontend)
- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users` – cria `{ name, email, password, birthdate?, position?, team?, phone? }`
- `POST /api/login` – valida `{ email, password }`

Todos os dados ficam em `data/app-data.json` (mock geral) e `data/users.json` (registro real). Editando esses arquivos você altera o que o frontend enxerga.
