# Database Schema

_Initial schema — will evolve as features are added._

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Profile {
  id        String   @id @default(cuid())
  userId    String   @unique
  bio       String?
  tags      String[]
  socials   Json
  location  String
}
```