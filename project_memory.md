# Project Memory

- **Project Overview:**
  This repository appears to be a web application for insurance policy and client management. It contains a React frontend (server + client entry), routes for pages such as dashboard, clients, and policy information, Prisma database models, and configuration for building and containerizing the app.

- **Core Tech Stack:**
  - React (server + client entry files under `app/`)
  - TypeScript and JavaScript (mix of `.ts`, `.tsx`, `.js` files)
  - Vite as the frontend build tool (`vite.config.ts`)
  - React Router for routing (`react-router.config.ts`, `app/routes.ts`)
  - Prisma ORM (`prisma/schema.prisma`, generated client in `app/generated/prisma`)
  - Docker (project root `Dockerfile`)
  - Node / npm (`package.json`)

- **Rules & Preferences:**
  1. Keep TypeScript types accurate and prefer typed APIs when possible.
  2. Keep routes and page logic under `app/routes` and route configuration in `app/routes.ts`.
  3. Use environment variables for secrets and DB connection strings (do not commit `.env`).
  4. Use `prisma` migrations to evolve the database schema; seed script lives at `prisma/seed.ts`.
  5. Maintain separation between server-rendered entry (`entry.server.tsx`) and client entry (`entry.client.tsx`).

- **Current Status:**
  - Finished / Present:
    - React app structure with routes and pages in `app/routes` and `app/` (client/server entries present).
    - Prisma schema and generated client exist under `prisma/` and `app/generated/prisma`.
    - Dockerfile and project config files (`tsconfig.json`, `vite.config.ts`, `package.json`).
  - In progress / Needs verification:
    - Database integration and migrations: `prisma/migrations` exists but verify the development database and migrations applied.
    - API routes and server endpoints: several route files exist (e.g., `clientFileDownload.$fileId.ts`) and may need full implementation and tests.
    - Static assets/uploads: `public/uploads` and `public/` content exist; verify upload handling and permissions.
  - Next steps / Suggestions:
    - Run `npm install` and `npx prisma migrate dev` to verify database connectivity and apply migrations.
    - Start the dev server (`npm run dev` or equivalent) to confirm build and routing behavior.
    - Add a top-level `README.md` or update `doc/README.md` with startup instructions and environment variables required.
