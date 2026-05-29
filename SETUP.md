# InfraSight / Pulse — Production Setup

You only need **Docker**, **Node.js 22+**, and **two `.env` files**. All UI data comes from **PostgreSQL** via the API — no mock fallbacks.

## 1. Environment files

```bash
# Root (frontend)
cp .env.example .env

# Backend
cp backend/.env.example backend/.env
```

Default database URL (matches `docker-compose.yml`):

```
postgresql://pulse:pulse_secret@localhost:5432/pulse_db
```

## 2. Start database & Redis

```bash
docker compose up -d
```

Wait until Postgres is healthy (`docker compose ps`).

## 3. Backend setup

```bash
cd backend
npm install
npm run db:push      # applies Prisma schema to PostgreSQL
npm run db:seed      # demo org, users, events, services, etc.
npm run dev          # API on http://localhost:3001
```

Verify: http://localhost:3001/health → `{ "status": "ok" }`

## 4. Frontend

```bash
# from project root
npm install
npm run dev          # http://localhost:8080
```

Vite proxies `/api` and `/ws` to the backend — no CORS setup needed in dev.

## 5. Sign in

| Email | Password |
|--------|----------|
| admin@pulse.io | Demo1234! |
| sre@pulse.io | Demo1234! |
| dev@pulse.io | Demo1234! |
| viewer@pulse.io | Demo1234! |

Session + UI preferences are stored in **localStorage** (`pulse-auth`, `pulse-ui`).

## Production

1. Set strong `JWT_SECRET` (or RS256 keys) in `backend/.env`
2. Set `DATABASE_URL` and `REDIS_URL` to managed services
3. Set `VITE_API_URL` to your public API (e.g. `https://api.yourdomain.com/api/v1`)
4. Run `npm run build` in backend and frontend
5. Deploy API with `npm run start` in backend

## Troubleshooting

| Issue | Fix |
|--------|-----|
| Login fails | API running? `curl http://localhost:3001/health` |
| Empty pages | Run `npm run db:seed` in backend |
| 401 errors | Sign out and sign in again (token in localStorage) |
| DB connection | `docker compose up -d` and check `DATABASE_URL` |

## Schema changes

Edit `backend/prisma/schema.prisma`, then:

```bash
cd backend
npm run db:push
npm run db:seed   # optional: refresh demo data
```
