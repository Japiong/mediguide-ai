# ⚡ Quick Setup — MediGuide AI

## 1-Minute Docker Setup (Recommended)

```bash
cp .env.example .env
# Edit .env — add your Anthropic or OpenAI-compatible provider key
docker-compose up --build
```

Open **http://localhost:3000** 🎉

---

## Manual Setup

### Step 1 — Install dependencies

```bash
npm install          # installs concurrently in root
npm run install:all  # installs server + client deps
```

### Step 2 — Configure environment

```bash
# Create server .env
cp .env.example server/.env

# Create client .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > client/.env.local
```

Edit `server/.env`:
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/mediguide_ai
# Use GITHUB_TOKEN for GitHub inference
GITHUB_TOKEN=ghp_...
# Optional: override GitHub inference endpoint or model
GITHUB_ENDPOINT=https://models.github.ai/inference
GITHUB_MODEL=openai/gpt-5
PORT=5000
```

### Step 3 — Set up database

```bash
# Create the DB (requires psql)
createdb mediguide_ai

# Apply schema + seed data
psql mediguide_ai -f database/schema. sql
psql mediguide_ai -f database/seed.sql
```

### Step 4 — Start everything

```bash
npm run dev
# Runs server on :5000 and client on :3000 simultaneously
```

Or individually:
```bash
npm run dev:server   # Express backend
npm run dev:client   # Next.js frontend
```

---

## Environment Variables Reference

| Variable | Where | Description |
|---|---|---|
| `DATABASE_URL` | server | PostgreSQL connection string |
| `GITHUB_TOKEN` | server | Your GitHub inference API key |
| `GITHUB_ENDPOINT` | server | Optional GitHub inference endpoint |
| `GITHUB_MODEL` | server | Optional GitHub model override |
| `PORT` | server | Backend port (default: 5000) |
| `CLIENT_URL` | server | Frontend origin for CORS |
| `NEXT_PUBLIC_API_URL` | client | Backend URL for API calls |

---

## API Quick Reference

```
GET  /api/health                    — Health check
GET  /api/search?q=ibuprofen        — Search drugs + supplements
GET  /api/drugs                     — List all drugs
GET  /api/drugs/categories          — List categories
GET  /api/drugs/:id                 — Drug details
GET  /api/supplements               — List supplements
POST /api/interactions/check        — Check interactions
POST /api/ai/chat                   — AI health chat
```

---

## Deployment

### Vercel (Frontend)
This monorepo is configured to deploy the Next.js app from `client/`.

```bash
# From repo root
npx vercel --prod
```

Set `NEXT_PUBLIC_API_URL` in the Vercel dashboard to your backend URL.

If you want, you can also deploy directly from the `client/` directory:

```bash
cd client
npx vercel --prod
```

### Railway (Backend + Database)
```bash
# Install Railway CLI
npm install -g @railway/cli
railway login
cd server
railway up
# Add DATABASE_URL and GITHUB_TOKEN in Railway dashboard
```
