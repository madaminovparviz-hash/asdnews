# Project Rules & Development Guidelines

These rules are enforced across the entire repository. Adhere to them for all edits and feature additions.

---

## 1. Tech Stack & Library Constraints
- **Framework**: Next.js 16 (App Router), React 19, TypeScript.
- **Styling**: Tailwind CSS v4 + `@tailwindcss/postcss`. Avoid adding Tailwind v3 syntax or unnecessary config files.
- **UI Components**: Use existing `shadcn/ui` and `Radix UI` primitives located in `src/components/ui/`.
- **Forms & Validation**: Use `react-hook-form` + `@hookform/resolvers/zod` with `zod`.
- **Feedback & Notifications**: Use `sonner` (`toast.success()`, `toast.error()`).
- **Icons**: Always use `lucide-react`.
- **Strictly Avoid Duplicates**:
  - Do NOT install `axios` (use native `fetch`).
  - Do NOT install `moment` (use `date-fns`).
  - Do NOT install additional CSS frameworks or alternative icon sets.

---

## 2. Design System & Aesthetics
- **Color Palette**:
  - Primary Deep Blue: `#2F5A7C` (headings, primary buttons, accents).
  - Warm Gold Accent: `#C29B40` (highlights, badges, borders).
  - Background: Soft warm beige `#F6F1E7` and clean white `#FFFFFF` cards.
- **Visual Style**: Rounded borders (`rounded-2xl`), subtle shadows, soft micro-interactions with `framer-motion`.
- **Typography**: Headings use `Manrope`, body uses `Inter`. Both MUST include Latin and Cyrillic subsets.

---

## 3. Bilingual Support (RU & TJ)
- The site serves audiences in Russian (`ru`) and Tajik (`tj`).
- **Zero Hardcoded Strings**: Never hardcode user-visible strings inside JSX components.
- **Symmetry**: Any translation key added or modified for RU must simultaneously have an accurate, natural translation for TJ.
- **Tajik Alphabet Support**: Preserve and test support for specific letters: `ғ`, `ӣ`, `қ`, `ӯ`, `ҳ`, `ҷ`.

---

## 4. Database & Backend Conventions
- **Database**: SQLite managed by Prisma ORM (`prisma/schema.prisma` -> `prisma/dev.db`).
- **Prisma Client**: Always import the singleton instance from `@/lib/prisma`. Never instantiate `new PrismaClient()` in route handlers.
- **API Routes**:
  - Place handlers in `src/app/api/.../route.ts`.
  - Validate all input payloads with `zod` before querying the database.
  - Wrap database operations in `try / catch` and return appropriate HTTP status codes (400, 422, 500) with JSON error descriptions.
  - Implement spam/flood protection checks on public forms (like prayer requests and contact messages).
