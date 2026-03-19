# ATHARO PROVA

ATHARO PROVA / আঠারো প্রভা is a bilingual full-stack donation platform built with Next.js, App Router, MongoDB, NextAuth/Auth.js credentials auth, Mongoose, Tailwind CSS, and a production-structured monorepo-style application layout.

## Stack

- Next.js 16 + TypeScript + App Router
- Tailwind CSS + shadcn-style UI primitives
- next-intl for `/en` and `/bn`
- Auth.js / NextAuth credentials auth with bcrypt hashing
- MongoDB + Mongoose
- TanStack Table + Recharts
- Docker + Docker Compose

## Features

- Bilingual public site with localized routes
- Manual donation verification for Bangladesh-friendly payment methods
- Anonymous, partial-name, and full-name public donation display modes
- User dashboard for profile, donations, receipts, saved campaigns, notifications
- Admin surface for analytics, users, campaigns, donations, verification, content, pages, testimonials, settings, and audit logs
- Seed script with example users, campaigns, posts, FAQs, testimonials, and donation states

## Project structure

```text
src/
  app/
    [locale]/
      (public)/
      (auth)/
      dashboard/
      admin/
    api/
  components/
  features/
  lib/
  models/
  server/
  config/
  i18n/
  messages/
  scripts/
```

## Local development

1. Copy the environment file:

```bash
cp .env.example .env
```

2. Update `MONGODB_URI`, `AUTH_SECRET`, and any SMTP/storage settings you need.

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Seed the database:

```bash
npm run seed
```

## Docker

1. Copy the environment file:

```bash
cp .env.example .env
```

2. Start the stack:

```bash
docker compose up --build
```

3. Seed data from the container or host:

```bash
npm run seed
```

## Create an admin user

```bash
npm run create:admin -- admin2@atharoprova.org StrongPassw0rd! admin
```

For a super admin:

```bash
npm run create:admin -- super2@atharoprova.org StrongPassw0rd! super_admin
```

## Seed accounts

- `superadmin@atharoprova.org` / `Passw0rd!2026`
- `admin@atharoprova.org` / `Passw0rd!2026`
- `member@atharoprova.org` / `Passw0rd!2026`

## Important implementation notes

- Only approved donations are included in public campaign totals.
- Anonymous donors are never publicly identifiable.
- Manual payment verification supports `bKash`, `Nagad`, `Rocket`, and `Bank Transfer`.
- Uploads default to local storage under `public/uploads`.
- Email verification and reset flows are wired through an email abstraction; by default email payloads are logged until an SMTP provider is connected.

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run typecheck`
- `npm run seed`
- `npm run create:admin -- <email> <password> [role]`
