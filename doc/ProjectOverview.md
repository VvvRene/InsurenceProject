# Project Overview: Insurance Management System

## 1. Purpose
This repository implements an insurance management system with a React Router v7 server-rendered app and a PostgreSQL database managed by Prisma. It supports client records, insurance policy records, client file uploads/downloads, and basic search/filter UI.

## 2. Key Technologies
- **Runtime:** Node.js with React Router v7 server rendering
- **Frontend:** React 19, Material UI v7, Tailwind v4, React Hook Form, Zod
- **Backend:** Prisma v7 with PostgreSQL datasource using `@prisma/adapter-pg`
- **Storage:** Cloudflare R2 for uploaded client files
- **Routing:** `@react-router/dev` for route-based loaders/actions
- **Database:** Prisma schema in `prisma/schema.prisma`

## 3. Repository Layout
- `app/` - main application source code
  - `app/routes.ts` - route definitions for the app
  - `app/root.tsx` - global layout, meta, error boundary, theme provider
  - `app/generated/prisma/` - generated Prisma client and type definitions
  - `app/.frontend/` - reusable UI components, pages, models, dialogs
  - `app/.server/` - server helpers for Prisma and Cloudflare R2
  - `app/routes/` - route-level pages with loaders/actions
  - `app/utils/` - form helpers for serializing/deserializing `FormData`
- `prisma/` - Prisma schema and seed/migration files
- `doc/` - project documentation
- `package.json` - dependency and script definitions
- `vite.config.ts` - build config for Vite/React Router

## 4. Core Data Model Summary
### Prisma models
- `Client` - primary customer record, includes contact info, work details, and relations to `ClientFile` and `InsurancePolicy`
- `InsurancePolicy` - policy record with references to `Client`, `Broker`, `InsuranceCompany`, and optional detail models
- `ClientFile` - metadata for uploaded files linked to a client, stored in Cloudflare R2
- `InsuranceCompany` - insurer records referenced by policies
- `Broker` - agent/broker records referenced by policies
- `VehiclePolicyDetail` - vehicle-specific policy detail
- `HomePolicyDetail` - home insurance-specific detail
- `LifePolicyDetail` - life insurance-specific detail
- `Currency` - supported currency records

### Relationships
- `Client` has many `ClientFile` and many `InsurancePolicy`
- `InsurancePolicy` belongs to one `Client`, one `Broker`, and one `InsuranceCompany`
- `InsurancePolicy` may link to a previous/next policy in the `PolicyHistory` relation
- Detail models (`VehiclePolicyDetail`, `HomePolicyDetail`, `LifePolicyDetail`) are one-to-one with `InsurancePolicy`

## 5. Main App Routes
- `/` => `routes/dashboard.tsx` - landing dashboard with tabs and general insurance form
- `/client` => `routes/clientsInfo.tsx` - client directory and create client flow
- `/policy` => `routes/policyInfo.tsx` - policy directory and policy create flow
- `/client/files` => `routes/clientFileManagement.tsx` - client file upload/delete management
- `/client/files/download/:fileId` => `routes/clientFileDownload.$fileId.ts` - downloads a file from Cloudflare R2 by ID
- `/playground` => `routes/playground.tsx` - experimental form UI and tabbed insurance sections
- `/about`, `/post/:postId`, and Chrome DevTools support routes are also defined

## 6. Frontend Structure
- `app/.frontend/pages/` contains page-level components for client, policy, and file management
- `app/.frontend/components/forms/` contains form components using `react-hook-form` and Zod validation
- `app/.frontend/models/` contains Zod schemas and TypeScript types for form data
- `app/.frontend/components/` contains shared UI elements like dialogs, buttons, layout wrappers

## 7. Backend/Server Structure
- `app/.server/db/prisma.ts` - Prisma client with PostgreSQL connection from `DATABASE_URL`
- `app/.server/cloudflareR2.ts` - helpers for uploading, downloading, and deleting objects in Cloudflare R2
- Route `action()` handlers in `app/routes/*.tsx` process form submissions and write to the database or Cloudflare R2
- `app/utils/toFormData.ts` and `app/utils/fromFormData.ts` convert data between objects and `FormData`

## 8. Important Implementation Notes
- The project uses server-side React Router loaders and actions to fetch data and handle form submissions
- Form submissions use `fetcher.submit()` with `multipart/form-data` for file uploads and payload dispatch
- Client files are uploaded to R2 and referenced in the `ClientFile.path` field
- File downloads stream objects from R2 and return them with correct headers
- The `src/` folder appears to contain legacy React boilerplate and is not part of the current `app/`-based React Router system

## 9. Current Gaps / Known Limitations
- Some routes and components are placeholders or experimental (`/playground`, partial `PolicyInfoPage` filtering)
- Error handling is minimal in many action handlers
- Validation exists for client data and policy data, but some save flows log errors instead of returning user-facing validation responses
- The app currently stores only `VehiclePolicyDetail` data for new policy creation and uses empty `homeDetail`/`lifeDetail` placeholders

## 10. Recommended Next Steps
1. Add consistent validation error handling in route `action()` functions
2. Complete policy create flow for home/life detail types or guard fields by category
3. Improve client and policy search/filtering logic in UI pages
4. Add automated tests or end-to-end coverage for loader/action workflows
5. Remove unused legacy `src/` files if they are not required by the app

## 11. Setup Notes
- Install dependencies: `npm install`
- Generate Prisma client: `npm run db:generate`
- Run migrations or push schema: `npm run db:migrate:dev` or `npm run db:push:dev`
- Start dev server: `npm run dev`

---

_This document is a generated project memory overview for onboarding and architectural reference._
