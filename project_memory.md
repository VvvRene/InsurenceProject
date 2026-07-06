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
    - Insurance policy creation flow now supports inline add actions for insurance companies, brokers, and clients from the policy dialog.
    - Newly created insurance companies, brokers, and clients are submitted to the relevant route actions and available immediately in the form dropdowns.
    - Effective Date and Expiry Date fields are editable and initialized with sensible defaults in the policy form.
    - Client, Insurance Company, and Broker selectors in the policy form now use searchable autocomplete controls for faster selection.
    - **i18n / Multi-language Support:**
      - Added `i18next`, `react-i18next`, and `i18next-browser-languagedetector` dependencies.
      - i18n infrastructure in `app/.frontend/i18n/` with `i18n.ts` initialization and locale files (`en.json`, `zh-TW.json`).
      - Default language is Traditional Chinese (`zh-TW`); falls back to `zh-TW` if no saved preference.
      - Language auto-detected from browser settings and saved to `localStorage`.
      - Language switcher component (`LanguageSwitcher.tsx`) in the top navigation bar (shows "EN" or "繁").
      - All UI text across pages, forms, dialogs, and navigation uses `useTranslation()` hook with `t('key')` instead of hardcoded English.
      - Dynamic `<html lang>` attribute set based on active language.
  - In progress / Needs verification:
    - Database integration and migrations: `prisma/migrations` exists but verify the development database and migrations applied.
    - API routes and server endpoints: several route files exist (e.g., `clientFileDownload.$fileId.ts`) and may need full implementation and tests.
    - Static assets/uploads: `public/uploads` and `public/` content exist; verify upload handling and permissions.
  - Newly added features:
    - **Subagent entity** created with many-to-one relationship to Broker:
      - Prisma `Subagent` model added with fields `id`, `name`, `brokerId` (FK to Broker with cascade delete), and a unique constraint on `[name, brokerId]`.
      - Migration `20260706153019_add_subagent_model` created and applied.
      - Frontend model `SubagentInfo.ts` (Zod schema + TypeScript type) created.
      - `SubagentInformationForm` and `SubagentUpsertDialog` components created (reusable pattern mirroring Broker form/dialog).
      - Brokers page updated with expandable subagent rows under each broker, supporting add/edit/delete via collapsible table rows.
      - Route `app/routes/brokers.tsx` updated: loader includes `subagents` relation, action handles `subagent_upsert` and `subagent_delete` intents.
      - i18n translations added in both `en.json` and `zh-TW.json` under the `subagent` key.
    - **Client-to-Broker/Subagent assignment**:
      - Client model updated with optional `brokerId` and `subagentId` foreign keys (many-to-one to Broker and Subagent respectively).
      - Broker and Subagent models each have a `clients[]` relation back to Client.
      - Migration `20260706154352_add_broker_subagent_to_client` created and applied.
      - ClientInfo schema extended with `brokerId` and `subagentId` fields.
      - Client form (`ClientInformationForm.tsx`) now has broker/subagent autocomplete selectors; subagent dropdown is filtered by selected broker.
      - Clients list page (`ClientsInfoPage.tsx`) displays Broker and Subagent columns in the table.
      - i18n keys `assignment`, `broker`, `subagent` added to client section in both locales.
    - Vehicle Type and Vehicle Body Type tables added to database (`VehicleType`, `VehicleBodyType`) with migration `20260702172801`.
    - Vehicle Type and Vehicle Body Type are now stored in the DB and fetched via loader, seeded with defaults.
    - Policy upsert dialog now has create buttons (+) for Vehicle Type and Vehicle Body Type fields, using Autocomplete (freeSolo with dropdown).
    - A reusable `OptionInformationForm` and `OptionUpsertDialog` were created for managing simple name-based option entries.
    - Vehicle Info management page at `/vehicle-info` with search, add, edit capabilities for both Vehicle Types and Vehicle Body Types — mirrors the Brokers page pattern.
    - Navigation link "Vehicle Info / 車輛資訊" added to the sidebar under Data Management.
    - All text is translated in both `en.json` and `zh-TW.json`.
    - Expiry Date auto-updates when Effective Date changes: Expiry Date = Effective Date + 1 year - 1 day (implemented in `InsurancePolicyForm.tsx` via `useEffect` watching `effectiveDate` field changes).
    - Policy Number field is no longer compulsory — removed `.min(1, 'Required')` validation from `insuranceGeneralInformationSchema` in `InsuranceGenernalInformation.ts`, allowing empty string values.
  - Next steps / Suggestions:
    - Run `npm install` and `npx prisma migrate dev` to verify database connectivity and apply migrations.
    - Start the dev server (`npm run dev` or equivalent) to confirm build and routing behavior.
    - Add a top-level `README.md` or update `doc/README.md` with startup instructions and environment variables required.
