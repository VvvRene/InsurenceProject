# Guide: Fixing Prisma Database Drift Safely (No Data Loss)

Use this guide when your live database layout changes, but your migration history falls out of sync, throwing a drift warning.

### Step 1: Pull Your Current Database Structure
Update your local Prisma schema to perfectly match the current structure of your live database.
```bash
npx prisma db pull
```

### Step 2: Create a Clean Initialization Folder
Prisma needs a fresh baseline folder in your migration history to bypass historical tracking conflicts.
1. Open your project's `prisma/migrations/` folder.
2. Create a brand new folder inside it named exactly: `000000000000_init`

### Step 3: Generate the Baseline SQL Script
Use the `migrate diff` tool to extract your schema into a raw SQL file inside your new directory. This bypasses active engine checks that cause the drift loop.
```bash
npx prisma migrate diff --from-empty --to-schema prisma/schema.prisma --script > prisma/migrations/000000000000_init/migration.sql
```

### Step 4: Fake the Migration Execution
Tell Prisma to mark this new baseline migration as already completed in your database so it does not try to run the SQL code over your existing tables.
```bash
npx prisma migrate resolve --applied 000000000000_init
```

### Step 5: Verify Everything is Synced
Check the status of your migrations. Prisma should now confirm that everything is aligned.
```bash
npx prisma migrate status
```
*Expected output: `Database schema is up to date!`*

---

### Best Practices to Prevent Future Drift
* **Avoid Mixing Methods:** Never mix `npx prisma db push` and `npx prisma migrate dev` on the same database.
* **Schema-First Changes:** Always modify `schema.prisma` first, then run `npx prisma migrate dev` to push changes to your database. Never make manual structure edits directly inside your database UI (like PgAdmin or TablePlus).
