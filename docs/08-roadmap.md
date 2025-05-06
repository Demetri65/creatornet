# Roadmap

CreatorNet MVP development plan using flexible, ongoing weekly sprints. Each sprint focuses on building a critical feature or system that supports the long-term vision of the platform.

---

## 🗓️ Timeline Overview (May–October 2025)

| Sprint | Week of       | Focus Areas                                  |
|--------|---------------|-----------------------------------------------|
| 1      | May 6         | Project scaffolding, layout, repo setup       |
| 2      | May 13        | Prisma DB setup, user/profile models          |
| 3      | May 20        | Auth system (NextAuth + OAuth)                |
| 4      | May 27        | Profile UI + types + pages                    |
| 5      | June 3        | Media upload system (S3 or alt)               |
| 6      | June 10       | Stripe payments + membership tiers            |
| 7      | June 17       | Map-based discovery UI                        |
| 8      | June 24       | Search filters: niche, location, tags         |
| 9      | July 1        | Collab system (requests, accept, decline)     |
| 10     | July 8        | Messaging / notifications                     |
| 11     | July 15       | Creator vs Contractor feature differences     |
| 12     | July 22       | Social account sync & OAuth metadata          |
| 13     | July 29       | Admin dashboard & verification queue          |
| 14     | August 5      | Finalize profile linking + S3 validation      |
| 15     | August 12     | Polish UI, mobile compatibility               |
| 16     | August 19     | Internal testing, feature freeze              |
| 17     | August 26     | Beta onboarding for selected creators         |
| 18–20  | Sept–Oct      | Feedback loop, improvements, MVP prep         |

---

## 🛠️ Feature Branches and Status

| Branch Name              | Description                                | ETA           | Status        |
|--------------------------|--------------------------------------------|----------------|---------------|
| `feature/layout`         | Nav, layout, footer, site shell             | May 10         | ✅ Complete    |
| `feature/prisma-init`    | Prisma schema, migrations, DB connection    | May 17         | 🔜 Planned     |
| `feature/auth`           | NextAuth setup, OAuth (IG, TikTok, X)       | May 24         | 🟡 In Progress |
| `feature/user-profile`   | Editable profile: name, bio, tags, links    | May 31         | 🔜 Planned     |
| `feature/media-upload`   | AWS S3 + upload endpoint                    | June 7         | 🔜 Planned     |
| `feature/stripe`         | Stripe Pro flow, webhooks                   | June 14        | 🔜 Planned     |
| `feature/map-filtering`  | Location + niche filters                    | June 28        | 🔜 Planned     |
| `feature/collab-system`  | Send + receive collab requests              | July 5         | 🔜 Planned     |
| `feature/messaging`      | Messaging + collab notifications            | July 12        | 🔜 Planned     |
| `feature/user-types`     | Feature sets for Creators vs Contractors    | July 19        | 🔜 Planned     |
| `feature/social-sync`    | Deep social linking (OAuth + DB sync)       | July 26        | 🔜 Planned     |
| `feature/admin-tools`    | Verify queue, reported content tools        | August 2       | 🔜 Planned     |

---

## ✅ Done

- [x] GitHub repo initialized
- [x] Next.js App Router + Tailwind configured
- [x] `docs/` directory scaffolded
- [x] Feature roadmap created

---

## 🔁 Weekly Workflow

- **Fridays**: Sprint review & PR merging
- **Mondays**: Sprint planning & new branch kickoff
- PRs must pass lint and preview on Vercel before merging

---

## 🚀 MVP Launch (Target: October 2025)

We aim to release the public-facing MVP around **October 2025**.

### MVP Goals
- Stable map-based creator discovery
- Verified profile system with social linking
- Functional collaboration + messaging flow
- Paid membership system via Stripe
- Mobile-friendly layout