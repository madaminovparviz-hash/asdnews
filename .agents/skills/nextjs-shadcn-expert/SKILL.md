---
name: nextjs-shadcn-expert
description: Best practices for Next.js 16 (App Router), React 19, Tailwind CSS v4, and shadcn/ui components. Use when developing or refactoring UI components, pages, forms, and server actions.
---

# Next.js 16, React 19 & shadcn/ui Best Practices

This skill provides development guidelines tailored for this project stack: Next.js (App Router), React 19, Tailwind CSS v4, and shadcn/ui (Radix UI).

## 1. React 19 & Component Architecture
- **Default to Server Components**: Keep components as Server Components (`async function Component()`) unless they require user interaction, browser APIs, or React hooks (`useState`, `useEffect`, `useForm`).
- **Client Boundaries**: Mark client components explicitly with `'use client'` at the very top. Keep the client boundary as small and deep down the tree as possible.
- **Form State & Mutations**: Use `react-hook-form` with `@hookform/resolvers/zod` for client forms, and validate schemas with `zod`. For notifications, use `sonner` (`toast.success()`, `toast.error()`).
- **Icons**: Use `lucide-react`. Maintain consistent sizing (`className="w-4 h-4"` or `size={18}`).

## 2. Tailwind CSS v4 & Theming
- **Tailwind 4 Structure**: Styles use CSS-first definitions (in `src/app/globals.css`).
- **Class Merging**: Always combine dynamic classes using `cn()` from `@/lib/utils` (utilizing `clsx` and `tailwind-merge`):
  ```tsx
  import { cn } from "@/lib/utils";
  
  export function Card({ className, ...props }: React.ComponentProps<"div">) {
    return <div className={cn("rounded-2xl bg-card p-6 shadow-sm", className)} {...props} />;
  }
  ```
- **Animations**: Use `framer-motion` for fluid page transitions and interactive micro-animations.

## 3. shadcn/ui Component Standards
- Place custom/extended shadcn components in `src/components/ui/`.
- Ensure all interactive elements include accessible labels (`aria-label` or `<Label>`).
- Retain keyboard accessibility (built into Radix primitives) and test Tab/Enter navigation.
