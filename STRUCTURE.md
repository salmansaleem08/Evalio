# Evalio — Project Structure

```
Evalio/
├── README.md                 # Public overview (minimal)
├── RULES.md                  # Development rules (required reading)
├── UI-SPECS.md               # Design system (required for all UI)
├── STRUCTURE.md              # This file
├── .env.example              # Environment template (committed)
├── .env                      # Local secrets (gitignored — never commit)
├── .gitignore
├── render.yaml               # Render backend deploy config
│
├── frontend/                 # Next.js → deploy on Vercel
│   ├── app/                  # App Router pages & API routes
│   ├── components/
│   │   └── ui/               # Design-system components
│   ├── lib/                  # Supabase client, utils
│   ├── public/               # Static assets (logo.svg, etc.)
│   ├── package.json
│   └── next.config.ts
│
├── backend/                  # Python API → deploy on Render
│   ├── app/
│   │   ├── main.py           # FastAPI entry
│   │   ├── config.py         # Settings from env
│   │   └── routes/           # Grading, health, uploads
│   ├── requirements.txt
│   └── runtime.txt
│
└── supabase/                 # SQL migrations & storage policies (future)
    └── migrations/
```

## Deployment

| Service  | Platform | Root directory |
|----------|----------|----------------|
| Frontend | Vercel   | `frontend`     |
| Backend  | Render   | `backend`      |
| Database | Supabase | —              |
| AI       | Gemini   | key in env     |

## Core User Flow (product)

1. Teacher enters pilot access key
2. Uploads up to 5 student answer sheets (PDF/image)
3. Uploads or inputs marking scheme
4. Backend grades via Gemini; results stored in Supabase
5. Teacher views per-question marks and feedback
