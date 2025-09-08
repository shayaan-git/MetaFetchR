# 🔎 MetaFetchR

Metafetchr is a backend API built with **Express.js**, **Supabase**, and **Arcjet** for scraping and storing website metadata.  
It also includes optional **AI enhancement** of descriptions using OpenAI.

## 🚀 Features
- Analyze a website to extract **brand name** and **description**
- **CRUD API** for managing stored websites
- **Supabase** integration for persistence
- **Centralized error handling** & input validation
- **Rate limiting** on `/api/analyze` using Arcjet
- **Optional AI enhancement** of descriptions (via OpenAI GPT-3.5)

## 📦 Tech Stack
- Node.js (ESM)
- Express.js
- Supabase (Postgres)
- Arcjet (rate limiting)
- Cheerio + Axios (scraping)
- OpenAI (optional AI)

## ⚙️ Setup

### 1. Clone repo

```bash
git clone https://github.com/shayaan-git/MetaFetchR.git
cd metafetchr
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a .env file

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

### 4. Run Server

```bash
npm run dev
```

### 5. 🧪 Testing
Import the Postman collection (postman_collection.json) from this repo.
Try POST /api/analyze and CRUD endpoints.

### 📡 API Endpoints

- CRUD Website  

`POST /api/websites`  
`Content-Type: application/json`

- Request Body for CRUD website  

`{
  "url": "https://example.com",  
  "brandName": "your brand name example",  
  "description": "your description example"  
}`

- Analyze website  

`POST /api/analyze`  
`Content-Type: application/json`

- Request Body for analyze  

`{ "url": "https://example.com" }`

- Response

```json
{
  "success": true,
  "aiEnhanced": false,
  "data": {
    "id": "uuid",
    "url": "https://example.com",
    "brand_name": "Example Domain",
    "description": "This domain is for use in illustrative examples...",
    "created_at": "2025-09-05T12:34:56Z"
  }
}
```
</details>

### 📌 Bonus Features
- AI integration (OpenAI GPT-3.5)
- Rate limiting (Arcjet)

> [!NOTE]  
> /api/analyze is rate-limited (5 requests/min per IP via Arcjet).  
> AI enhancement only works if OPENAI_API_KEY is set. Otherwise, raw scraped description is stored.

---
### 📄 Short Note (Approach + Challenges)
<details>
  <summary><code>Short Note</code></summary>
  
```markdown
## 📄 Short Note

### Approach
I started by scaffolding an Express.js project with modern ES modules.  
Supabase was used as the database for storing website metadata.  
I created RESTful CRUD endpoints and an `/api/analyze` endpoint that scrapes a site’s title and description using Axios + Cheerio.  

Error handling and input validation were centralized in middleware.  
To prevent abuse, I integrated Arcjet for rate limiting (5 requests/minute on `/api/analyze`).  
As a bonus, I added optional AI enhancement of descriptions using OpenAI GPT-3.5.  

### Challenges
- Scraping: Many sites block bots or serve minimal metadata. I handled this by falling back to `<title>` and `meta[name=description]`.  
- AI: Initially I tried Puter’s free GPT-5 Nano but it was blocked server-side. I reverted to OpenAI with a safe fallback to scraped text.  
- Rate limiting: Arcjet required proper IP detection and `ARCJET_ENV=development` in dev mode to avoid warnings.  
- UUID handling: Supabase enforces UUID format, so I had to validate IDs to prevent runtime errors.  

Overall, the project demonstrates clean backend architecture, error resilience, and optional feature integration.
```
</details>
