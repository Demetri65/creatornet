# 🔐 Authentication and Verification – CreatorNet

This document outlines the current authentication system used in CreatorNet, built using **NextAuth.js**, **Prisma**, and **Next.js App Router**, along with steps to extend the system.

---

## ✅ Current Auth Features

- [x] Email + password login using `CredentialsProvider`
- [x] Secure password hashing with `bcryptjs`
- [x] Registration via a custom API route (`/api/auth/register`)
- [x] Session management with JWT strategy
- [x] `username`, `email`, and `passwordHash` stored in Prisma
- [x] Type-safe JWT → Session mapping via NextAuth callbacks

---

## 🧱 File Structure

```
src/
├── app/
│   └── api/
│       └── auth/
│           ├── register/
│           │   └── route.ts     # Handles POST /api/auth/register
│           └── [...nextauth]/
│               └── route.ts     # Handles all NextAuth routes
├── components/
│   └── AuthForm.tsx             # Unified login/register form
├── prisma/
│   └── prisma.ts                # Prisma singleton
```

---

## ⚙️ Configuration

### `.env.local`

```env
NEXTAUTH_SECRET=your-random-generated-secret
DATABASE_URL=postgresql://...
```

Generate a secret:

```bash
openssl rand -base64 32
```

---

## 🔑 How Login Works

- The form submits to `signIn('credentials')`
- NextAuth routes the request to `/api/auth/callback/credentials`
- Inside `authorize()`, we validate the user using Prisma + bcrypt
- If valid, user info is added to the JWT and exposed via `useSession()` or `getServerSession()`

---

## 🆕 How Registration Works

- The form submits to `/api/auth/register`
- Backend:
  - Validates inputs
  - Checks if email already exists
  - Hashes the password with `bcryptjs`
  - Stores `email`, `username`, and `passwordHash` in the database

---

## 🧩 Current Limitations

- Login and Register are combined in one component
- Registration only collects `username`, `email`, and `password`
- No email verification or OAuth sign-in options yet

---

## ✅ TODO

- [ ] Separate `/login` and `/register` into distinct pages + components
- [ ] Expand registration to include:
  - `displayName`
  - `profilePictureUrl`
  - `bio`, `location`, `role`, `isCreator`
- [ ] Add client-side form validation (`zod`, `react-hook-form`)
- [ ] Add email verification (via magic link or token email)
- [ ] Add OAuth providers:
  - [ ] Google
  - [ ] GitHub
  - [ ] Twitter
- [ ] Add a user settings page to update profile info
- [ ] Add protected dashboard route using `getServerSession`

---

## 🔌 Adding OAuth Providers (Planned)

Update `providers` in `src/app/api/auth/[...nextauth]/route.ts`:

```ts
import GoogleProvider from 'next-auth/providers/google';

providers: [
  CredentialsProvider({ ... }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
]
```

And update `.env.local`:

```env
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

---

## 📚 References

- [NextAuth Docs](https://next-auth.js.org/getting-started/introduction)
- [NextAuth Credentials](https://next-auth.js.org/providers/credentials)
- [Next.js App Router Routing](https://nextjs.org/docs/app/building-your-application/routing)

---

## 🧠 Final Notes

This system is designed for security, scalability, and flexibility. All authentication is handled through the standard NextAuth catch-all route at `/api/auth/[...nextauth]`, while registration logic is maintained separately under `/api/auth/register`.

The app uses **JWT session strategy**, but can be adapted to use **database sessions** in the future if needed.
