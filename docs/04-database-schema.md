# 📄 04 - Database Schema

## 🧱 Overview

This document outlines the database schema for the Creatornet MVP, built using Prisma ORM and PostgreSQL. The schema is designed for extensibility, with support for user roles, content creator profiles, map-based discovery, and future monetization features.

---

## 📘 Models & Relationships

### `User`

Stores all account-level data (login, roles, etc).

```prisma
model User {
  id                String   @id @default(cuid())
  email             String   @unique
  username          String   @unique
  passwordHash      String
  displayName       String?
  profilePictureUrl String?
  bio               String?
  location          String?
  isCreator         Boolean  @default(false)
  role              String   @default("user")
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  creatorProfile    CreatorProfile?
  locationMeta      Location?
  following         Connection[]       @relation("Following")
  followers         Connection[]       @relation("Followers")
  sentMessages      Message[]          @relation("SentMessages")
  receivedMessages  Message[]          @relation("ReceivedMessages")
}
```

- One-to-one with `CreatorProfile` (if user is a creator)
- One-to-one with `Location`
- Many-to-many through `Connection` (social graph)
- One-to-many with `Message`

---

### `CreatorProfile`

Extended profile information for content creators.

```prisma
model CreatorProfile {
  id                  String           @id @default(cuid())
  userId              String           @unique
  user                User             @relation(fields: [userId], references: [id])
  onlyfansUrl         String?
  twitterUrl          String?
  blueskyUrl          String?
  websiteUrl          String?
  ratePerMinute       Float?
  availableForCollabs Boolean          @default(false)

  categories          CreatorCategory[]
  mediaLinks          MediaLink[]
}
```

- Linked one-to-one with `User`
- Many-to-many with `Category` (via `CreatorCategory`)
- One-to-many with `MediaLink`

---

### `Category` and `CreatorCategory`

Tags for content creators.

```prisma
model Category {
  id        String            @id @default(cuid())
  name      String            @unique
  creators  CreatorCategory[]
}

model CreatorCategory {
  id               String          @id @default(cuid())
  creatorProfileId String
  categoryId       String
  creatorProfile   CreatorProfile @relation(fields: [creatorProfileId], references: [id])
  category         Category        @relation(fields: [categoryId], references: [id])
}
```

- Many-to-many relationship between `CreatorProfile` and `Category`

---

### `Location`

Geolocation metadata for users.

```prisma
model Location {
  id      String   @id @default(cuid())
  userId  String   @unique
  user    User     @relation(fields: [userId], references: [id])
  lat     Float
  lng     Float
  city    String?
  state   String?
  country String?
}
```

- One-to-one with `User`

---

### `Connection`

Represents user follows, bookmarks, etc.

```prisma
model Connection {
  id             String   @id @default(cuid())
  followerId     String
  followeeId     String
  connectionType String
  createdAt      DateTime @default(now())
  follower       User     @relation("Following", fields: [followerId], references: [id])
  followee       User     @relation("Followers", fields: [followeeId], references: [id])
}
```

- Many-to-many between users
- Used for social graph

---

### `Message`

Simple private messaging system.

```prisma
model Message {
  id         String   @id @default(cuid())
  senderId   String
  receiverId String
  content    String
  sentAt     DateTime @default(now())
  readAt     DateTime?
  sender     User     @relation("SentMessages", fields: [senderId], references: [id])
  receiver   User     @relation("ReceivedMessages", fields: [receiverId], references: [id])
}
```

- One-to-many messaging between users

---

### `MediaLink`

Represents content URLs associated with a creator.

```prisma
model MediaLink {
  id               String           @id @default(cuid())
  creatorProfileId String
  creatorProfile   CreatorProfile  @relation(fields: [creatorProfileId], references: [id])
  url              String
  title            String?
  mediaType        String
  createdAt        DateTime         @default(now())
}
```

- One-to-many with `CreatorProfile`

---

## 🛠️ Prisma Scripts & Usage

| Script         | File Path            | Purpose                                                              |
|----------------|----------------------|----------------------------------------------------------------------|
| `migrate`      | `npx prisma migrate dev` | Applies schema changes to PostgreSQL and generates client        |
| `generate`     | `npx prisma generate`     | Regenerates Prisma Client after schema changes                     |
| `studio`       | `npx prisma studio`       | Opens a visual editor to view and manipulate DB                    |
| `test.ts`      | `scripts/test.ts`         | Runs a basic query to check DB connectivity and log user data      |
| `seed.ts`      | `scripts/seed.ts`         | Populates database with mock users, creators, and categories       |

To run:
```bash
npx ts-node scripts/db-test.ts
npx ts-node scripts/db-seed.ts
```

Or via `package.json`:
```json
"scripts": {
  "db:migrate": "prisma migrate dev",
  "db:studio": "prisma studio",
  "db:test": "ts-node scripts/db-test.ts",
  "db:seed": "ts-node scripts/db-seed.ts"
}
```

---

## ✅ Notes

- All primary keys use `cuid()` for global uniqueness
- Authentication should link to `User` table
- Schema supports future expansion like payments, reviews, and moderation

## ⚒️ To Do
- Need to expand user db schema to allow any platform to be placed for scalability
- Check other schemas to see if scalable with future feature sets