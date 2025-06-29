
# RAG Next.js SaaS Starter

This is a full-stack SaaS starter project built with Next.js featuring:

- JWT Authentication with Email OTP + 2FA (stubbed SMS/WhatsApp OTP)
- Google OAuth integration using NextAuth.js
- PostgreSQL + pgvector via Prisma ORM
- Role-based access control (admin/user)
- Plans with query limits per user
- File ingestion and embedding pipeline using Hugging Face inference API (sentence-transformers)
- n8n webhook ingestion endpoint
- Admin and User dashboards

## Setup Instructions

1. Clone or unzip the project
2. Rename `.env.example` to `.env` and fill your credentials
3. Install dependencies:
    ```bash
    npm install
    ```
4. Setup the database and run migrations:
    ```bash
    npx prisma migrate deploy
    ```
5. Run the dev server:
    ```bash
    npm run dev
    ```
6. Access:
   - Admin dashboard: `/admin`
   - User dashboard: `/user`

## Notes

- OTP functions are stubbed, replace with your SMS/WhatsApp API
- Embeddings use Hugging Face Inference API, replace as needed
- n8n integration webhook available at `/api/admin/ingest-webhook`
- Google OAuth configured via NextAuth.js (fill client ID/secret in `.env`)

