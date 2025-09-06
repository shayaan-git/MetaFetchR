# Metafetchr

Metafetchr is a backend API built with **Express.js**, **Supabase**, and **Arcjet** for scraping and storing website metadata.  
It also includes optional **AI enhancement** of descriptions using OpenAI.

---

## 🚀 Features
- Analyze a website to extract **brand name** and **description**
- **CRUD API** for managing stored websites
- **Supabase** integration for persistence
- **Centralized error handling** & input validation
- **Rate limiting** on `/api/analyze` using Arcjet
- **Optional AI enhancement** of descriptions (via OpenAI GPT-3.5)

---

## 📦 Tech Stack
- Node.js (ESM)
- Express.js
- Supabase (Postgres)
- Arcjet (rate limiting)
- Cheerio + Axios (scraping)
- OpenAI (optional AI)

---

## ⚙️ Setup

### 1. Clone repo

```bash
git clone https://github.com/shayaan-git/MetaFetchR.git
cd metafetchr
```

### Install Dependencies

```bash
npm install
```

### Create a .env file

```bash
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_role_key

# Optional (AI enhancement)
OPENAI_API_KEY=your_openai_key

# Arcjet (rate limiting)
ARCJET_KEY=demo
ARCJET_ENV=development
```

### Run Server

```bash
npm run dev
```
