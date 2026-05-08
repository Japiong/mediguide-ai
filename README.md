# 🏥 MediGuide AI

> AI-powered drug information, interaction checker, and health assistant platform.

**⚕️ Medical Disclaimer:** This application provides general educational information only and is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider.

---

## ✨ Features

- 🔍 **Drug Search** — Search 50+ real medications with detailed info
- 💊 **Drug Details** — Uses, dosage, side effects, ingredients, warnings
- ⚡ **Interaction Checker** — Check drug-drug interactions with severity ratings
- 🤖 **AI Health Assistant** — Structured health Q&A powered by Claude AI
- 🌿 **Supplements** — Common supplement information with warnings
- 🌙 **Dark Mode** — Full dark/light theme support
- 📱 **Responsive** — Mobile-first design

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) + Tailwind CSS |
| Backend | Node.js + Express |
| Database | PostgreSQL |
| AI | GitHub inference via `GITHUB_TOKEN` |
| Fonts | Syne (display) + DM Sans (body) |

---

## 📁 Project Structure

```
mediguide-ai/
├── README.md
├── .env.example
├── database/
│   ├── schema.sql          # PostgreSQL schema
│   └── seed.sql            # 50+ drugs + supplements + interactions
├── server/                 # Express backend
│   ├── index.js            # Entry point
│   ├── db/index.js         # PostgreSQL connection pool
│   ├── routes/             # Express routers
│   ├── controllers/        # Request handlers
│   ├── services/           # Business logic
│   ├── middleware/         # Error handler
│   └── tests/              # Jest tests
└── client/                 # Next.js frontend
    ├── app/
    │   ├── page.js          # Home
    │   ├── search/page.js   # Search results
    │   ├── drugs/[id]/page.js  # Drug detail
    │   ├── interactions/page.js # Interaction checker
    │   └── chat/page.js     # AI chat
    ├── components/
    │   ├── Navbar.jsx
    │   ├── SearchBar.jsx
    │   ├── DrugCard.jsx
    │   ├── WarningAlert.jsx
    │   └── ChatBubble.jsx
    └── lib/
        └── api.js           # API client
```

---

## 🚀 Local Setup

### Prerequisites

- **Node.js** v18+
- **PostgreSQL** v14+
- **GitHub inference token** via `GITHUB_TOKEN`

---

### 1. Clone & Configure

```bash
git clone https://github.com/your-username/mediguide-ai.git
cd mediguide-ai

# Copy environment files
cp .env.example server/.env
cp .env.example client/.env.local
```

Edit `server/.env`:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/mediguide_ai
# Use GITHUB_TOKEN for GitHub inference
GITHUB_TOKEN=ghp_...
# Optional: override GitHub inference endpoint or model
GITHUB_ENDPOINT=https://models.github.ai/inference
GITHUB_MODEL=openai/gpt-5
CLIENT_URL=http://localhost:3000
PORT=5000
```

Edit `client/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

### 2. Database Setup

```bash
# Create the database
sql -U postgres -c "CREATE DATABASE mediguide_ai;"

# Run schema
psql -U postgres -d mediguide_ai -f database/schema.sql

# Seed with 50+ drugs
psql -U postgres -d mediguide_ai -f database/seed.sql
```

Or using the DATABASE_URL:
```bash
psql $DATABASE_URL -f database/schema.sql
psql $DATABASE_URL -f database/seed.sql
```
p
---

### 3. Start Backend

```bash
cd server
npm install
npm run dev   # Development with nodemon
# or
npm start     # Production
```

Server runs at **http://localhost:5000**

---

### 4. Start Frontend

```bash
cd client
npm install
npm run dev   # Development
# or
npm run build && npm start  # Production
```

Frontend runs at **http://localhost:3000**

---

## � Deploying on Railway

This repository now includes a root `Dockerfile` for Railway deployment.

1. Create a Railway project and add a PostgreSQL plugin.
2. Set these environment variables in Railway:
   - `DATABASE_URL` (provided by Railway Postgres)
   - `GITHUB_TOKEN` (your GitHub inference token)
   - `CLIENT_URL` set to your Railway deployment URL, e.g. `https://your-app.railway.app`
3. Deploy using Railway's Docker deployment flow.

The container starts the Next.js frontend on Railway's assigned `PORT`, while API requests to `/api/*` are proxied internally to the Express backend at `http://127.0.0.1:5000`.

---

## �🔌 API Reference

### Search
```
GET /api/search?q=ibuprofen
```

### Get Drug by ID
```
GET /api/drugs/:id
```

### List All Drugs
```
GET /api/drugs?limit=50&offset=0
```

### Get Categories
```
GET /api/drugs/categories
```

### List Supplements
```
GET /api/supplements
```

### Check Interactions
```
POST /api/interactions/check
Body: { "drugIds": [1, 4] }
```

### AI Chat
```
POST /api/ai/chat
Body: { "message": "What are the side effects of aspirin?", "history": [] }
```

### Health Check
```
GET /api/health
```

---

## 🧪 Running Tests

```bash
cd server
npm test
```

Tests cover:
- Health endpoint
- Search endpoint (valid/invalid queries)
- Drug detail endpoint (valid/invalid/missing IDs)
- Supplements list
- Interaction checker (validation + logic)
- AI chat (input validation)

---

## 🌐 Deployment

### Frontend → Vercel

This repository is a monorepo. Vercel is configured to build the app from the `client/` directory.

```bash
# From the repo root
npx vercel --prod
```

Set the following environment variable in the Vercel dashboard:
- `NEXT_PUBLIC_API_URL = https://your-backend-url`

If you prefer, you can also deploy directly from the `client/` folder:

```bash
cd client
npx vercel --prod
```

### Backend → Railway / Render

```bash
# Railway
railway login
cd server
railway up

# Environment variables to set:
# DATABASE_URL (from Railway PostgreSQL plugin)
# GITHUB_TOKEN
# CLIENT_URL (your Vercel frontend URL)
# NODE_ENV=production
```

### Database → Railway PostgreSQL

1. Create a new Railway project
2. Add a PostgreSQL plugin
3. Run the schema and seed SQL against the Railway DB
4. Copy the `DATABASE_URL` to your backend environment

---

## 🔐 Security Notes

- Rate limiting: 100 req/15min general, 10 req/min for AI
- Helmet.js for security headers
- CORS restricted to configured client URL
- Input validation on all endpoints
- No user data stored without explicit feature

---

## 📝 AI Response Format

The AI assistant (powered by Claude) returns structured JSON:

```json
{
  "overview": "Brief explanation...",
  "possibleCauses": ["cause 1", "cause 2"],
  "generalAdvice": ["advice 1", "advice 2"],
  "warningSigns": ["warning 1", "warning 2"],
  "disclaimer": "Always consult a healthcare professional..."
}
```

---

## ⚠️ Safety & Compliance

This application:
- ✅ Provides **general educational information only**
- ✅ Always includes **medical disclaimers**
- ✅ Never **diagnoses conditions**
- ✅ Never **prescribes medications**
- ✅ Always recommends **consulting healthcare professionals**
- ✅ Uses a safety-focused AI system prompt

---

## 📄 License

MIT — For educational use only. Not for commercial medical purposes without proper licensing.
