---
name: admin-cms-workflow
description: Best practices and patterns for building the church admin panel, authentication with next-auth, managing prayer requests, contact messages, dynamic events, and sermons in Next.js.
---

# Church Admin Panel & CMS Workflow

This skill outlines architecture and implementation guidelines for the internal administrative dashboard of the church website.

## 1. Authentication (`next-auth`)
The project has `next-auth` installed. For church administration:
- **Credentials Provider**: Use email/username + password hashed with `bcryptjs` or a secure env secret (`ADMIN_SECRET_KEY`).
- **Session Strategy**: Use JWT-based sessions (`strategy: "jwt"`).
- **Route Protection**:
  - Protect `/admin` routes using Next.js Middleware (`src/middleware.ts`):
    ```typescript
    export { default } from "next-auth/middleware";
    export const config = { matcher: ["/admin/:path*"] };
    ```
  - Or verify `getServerSession(authOptions)` inside Server Actions / Route Handlers.

## 2. Managing Submissions (Prayers & Contacts)
- **Status Lifecycle**:
  - `PrayerRequest`: `PENDING` ➔ `PRAYED` / `IN_PRAYER` ➔ `ARCHIVED`.
  - `ContactMessage`: `NEW` ➔ `CONTACTED` ➔ `CLOSED`.
- **Data Display**:
  - Use `@tanstack/react-table` with shadcn `Table` component for sorting, filtering by date/category, and pagination.
  - Provide a toggle to view `isPrivate` items (visible only to pastor/elder role).
  - Include quick actions: "Mark as Prayed", "Copy Contact", "Archive".

## 3. Dynamic Events & Sermons Management
Currently, events and sermons are defined in static files (`src/lib/events.ts`). When transitioning to database-driven content:
- **Prisma Schema Additions**:
  ```prisma
  model Event {
    id          String   @id @default(cuid())
    titleRu     String
    titleTj     String
    descRu      String?
    descTj      String?
    category    String   // WORSHIP, YOUTH, PRAYER, SOCIAL
    startDate   DateTime
    isRecurring Boolean  @default(false)
    createdAt   DateTime @default(now())
  }

  model Sermon {
    id          String   @id @default(cuid())
    titleRu     String
    titleTj     String
    preacher    String
    date        DateTime
    videoUrl    String?  // YouTube or Rutube embed
    audioUrl    String?  // Direct MP3 link
    imageUrl    String?
    createdAt   DateTime @default(now())
  }
  ```
- **Bilingual Form Handling**:
  - When creating or editing an event or sermon, provide dual input tabs or side-by-side fields for Russian (RU) and Tajik (TJ).
  - Use `react-hook-form` + `zod` for validation.

## 4. UI Standards for Admin
- Use shadcn `Tabs`, `Dialog`, `Badge`, `DropdownMenu`, and `Sonner` toasts.
- Keep the admin theme clean and functional (dark/light theme support via `next-themes`).
- Ensure destructive actions (e.g. deleting entries) require confirmation via `AlertDialog`.
