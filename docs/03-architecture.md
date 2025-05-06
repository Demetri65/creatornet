# Architecture

- Fullstack Next.js using App Router
- API Routes for backend logic
- Server actions for database interaction
- Prisma ORM (planned)
- OAuth + Email auth (NextAuth)

## Diagram (Textual)
To hash out proper front end architecture and backend architecture accordingly
```
User
  |
Next.js App (SSR + API Routes)
  |--- UI Components
  |--- API Routes
        |-- DB (Prisma/Postgres)
        |-- S3 (Uploads)
        |-- Stripe (Payments)
        |-- OAuth (IG, TikTok, X)
```