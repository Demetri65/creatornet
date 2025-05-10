# 🌐 API & Frontend Routes – CreatorNet

This document lists and explains the current backend and frontend routes related to authentication and user flows in the CreatorNet project.

---

## ✅ API Routes (under `/api`)

### POST `/api/auth/register`

- **Purpose:** Registers a new user in the system.
- **Backend File:** `src/app/api/auth/register/route.ts`
- **Body Payload:**
  ```json
  {
    "email": "user@example.com",
    "username": "creatorName",
    "password": "securePassword123"
  }
  ```
- **Response:**
  - `201 Created`: Returns `{ userId }`
  - `409 Conflict`: If user already exists
  - `400 Bad Request`: Missing or invalid data

---

### Dynamic Route: `/api/auth/[...nextauth]`

- **Purpose:** Handles all authentication flows via NextAuth
- **Backend File:** `src/app/api/auth/[...nextauth]/route.ts`
- **Includes Internal Routes:**
  - `POST /api/auth/callback/credentials` – Called by `signIn()` to authorize user
  - `GET /api/auth/session` – Get current user session
  - `POST /api/auth/signout` – Logout endpoint
  - `GET /api/auth/providers` – Lists available auth providers (credentials, Google, etc.)
- **Session Strategy:** JWT-based
- **Uses Prisma + bcrypt for CredentialsProvider**

---

## ✅ Frontend Routes (under `/`)

### `/`

- **Landing page**
- **Component:** `app/page.tsx`
- **Purpose:** Intro to the platform + call to action to log in

---

### `/login`

- **Login + Registration page**
- **Component:** `components/AuthForm.tsx`
- **Purpose:** Unified login/register UI
- **TODO:**
  - Split into two separate routes: `/login` and `/register`
  - Improve UI and UX
  - Add client-side validation

---

### `/dashboard` (planned)

- **Protected route (in progress)**
- **Purpose:** Authenticated landing for users after login
- **Will use:** `getServerSession()` to verify authentication
- **TODO:** Scaffold this page and add content per user type (creator vs. viewer)

---

## 🧠 Notes

- The current system uses **App Router** (not `pages/`)
- All API routes are under `src/app/api/...`
- Frontend routes map to folders under `src/app`