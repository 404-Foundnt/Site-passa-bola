# Passa a Bola API

Servidor Express responsável por fornecer o JSON local e os endpoints de cadastro consumidos pelo frontend.

## Requisitos
- Node.js 18+

## Instalação
```bash
npm install
```

## Desenvolvimento
```bash
npm run dev
```
Servidor disponível em http://localhost:5050.

## Produção
```bash
npm run start
```

## Endpoints principais
- `GET /api` — mapa geral
- `GET /api/data` — JSON completo (`data/app-data.json`)
- `GET /api/dashboard`
- `GET /api/ticker`
- `GET /api/badges`
- `GET /api/matches`
- `GET /api/leaderboard`
- `GET /api/teams`
- `GET /api/team/:id`
- `GET /api/public/home`
- `GET /api/public/tournaments`

## Usuárias (formulário do frontend)
Os cadastros ficam em `data/users.json`.

- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users` — cria registro `{ name, email, password, ... }`
- `POST /api/login` — valida credenciais

Atualize `data/app-data.json` e `data/users.json` para alterar o conteúdo servido.
