---
name: prisma-db-guide
description: Guidelines and patterns for Prisma ORM, SQLite database management, migrations, and safe schema updates. Use when modifying schema.prisma, running database migrations, or writing database queries.
---

# Prisma ORM & Database Guidelines

This skill guides schema modifications, migrations, and database querying in Prisma with SQLite.

## 1. Schema Updates & Workflow
- Schema file location: [schema.prisma](file:///c:/Users/MSI%20AR/Desktop/Новая%20папка%20(4)/prisma/schema.prisma)
- For local prototyping with SQLite:
  ```bash
  bun run db:push
  # or
  npx prisma db push --accept-data-loss
  ```
- After altering schema models, always re-generate the Prisma client:
  ```bash
  bun run db:generate
  # or
  npx prisma generate
  ```

## 2. Safe Query Practices
- **Singleton Prisma Client**: Always import Prisma from the shared client instance (`@/lib/prisma` or `@/db`) to prevent exhausting connection limits during Next.js hot reload:
  ```typescript
  import { prisma } from "@/lib/prisma";
  ```
- **Error Handling**: Wrap database calls in `try / catch` blocks inside Next.js API route handlers (`src/app/api/.../route.ts`) and return standardized JSON error responses with proper HTTP status codes (e.g. 400, 404, 500).
- **Spam & Validation**: Always sanitize and validate incoming request payloads with `zod` before persisting to the database.
