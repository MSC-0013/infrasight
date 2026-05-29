# InfraSight / Pulse — Backend API

Production-grade Node.js backend for the InfraSight observability platform.

## Stack

- **Fastify 5** + TypeScript 5 (strict)
- **PostgreSQL 16** + Prisma ORM
- **Redis 7** — sessions, pub/sub, BullMQ
- **JWT auth** (RS256 in prod, HS256 in dev)
- **OpenAI** — AI RCA and insights

## Quick start

```bash
# 1. Start infrastructure
cd docker
docker compose up -d postgres redis

# 2. Configure environment
cp .env.example .env
# Edit DATABASE_URL if needed

# 3. Install & migrate
npm install
npm run db:push
npm run db:seed

# 4. Run API
npm run dev
```

API: `http://localhost:3001`  
Health: `GET /health`  
API base: `/api/v1`

### Demo credentials (after seed)

- **Email:** `admin@pulse.io`
- **Password:** `Demo1234!`

## Docker (full stack)

```bash
cd docker
docker compose up --build
```

## Module structure

Each domain module follows:

```
modules/<name>/
  <name>.controller.ts
  <name>.service.ts
  <name>.repository.ts
  <name>.routes.ts
  <name>.schema.ts
```

## Key endpoints

| Module | Prefix |
|--------|--------|
| Auth | `/api/v1/auth` |
| Events | `/api/v1/events` |
| Traces | `/api/v1/traces` |
| Incidents | `/api/v1/incidents` |
| Analytics | `/api/v1/analytics` |
| AI | `/api/v1/ai` |

WebSocket: `ws://localhost:3001/ws?token=<access_token>`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Compile TypeScript |
| `npm run db:migrate` | Prisma migrations |
| `npm run db:seed` | Seed demo data |
| `npm run lint` | Type check |
