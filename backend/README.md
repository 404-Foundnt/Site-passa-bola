# Passa a Bola API

Servidor Express responsável por fornecer o JSON local que o frontend consume.

## Requisitos
- Node.js 18+

## Instalação
`ash
npm install
`

## Desenvolvimento
`ash
npm run dev
`
Servidor disponível em http://localhost:5050.

## Produção
`ash
npm run start
`

## Endpoints
- GET /api — informações gerais
- GET /api/data — JSON completo
- GET /api/dashboard — dados do dashboard
- GET /api/ticker
- GET /api/badges
- GET /api/matches
- GET /api/leaderboard
- GET /api/teams
- GET /api/team/:id
- GET /api/public/home
- GET /api/public/tournaments

Todos os dados vêm de data/app-data.json. Atualize o arquivo para alterar o conteúdo servido ao frontend.

