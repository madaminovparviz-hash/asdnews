# Useful Prompts & Workflows for Church Website Development

Quick-reference prompt templates to interact with the AI assistant efficiently.

---

### 1. New Section or Page
> "Создай новый блок [Название блока] на сайте.
> - Стилистика: теплый золотой `#C29B40`, глубокий синий `#2F5A7C`, скругление `rounded-2xl`.
> - Используй shadcn/ui и framer-motion для плавной анимации появления.
> - Добавь все текстовые строки сразу в оба словаря: русский и таджикский.
> - Проверь мобильную адаптивность."

---

### 2. Form & API Endpoint with Validation
> "Создай форму [Название] с отправкой на API:
> - Клиент: `react-hook-form` + `zod` + всплывающие уведомления `sonner`.
> - Сервер: роут `src/app/api/.../route.ts` с валидацией payload через Zod.
> - Сохранение в базу через Prisma (`@/lib/prisma`).
> - Базовая защита от спама и повторных отправок."

---

### 3. Database Schema Update
> "Нужно добавить в базу новую сущность [Название]:
> - Опиши модель в `prisma/schema.prisma`.
> - Запусти `bun run db:push` и `bun run db:generate`.
> - Создай типизированный сервисный слой для выборки данных."

---

### 4. Code & Accessibility Review
> "Проведи аудит страницы:
> - Проверь контрастность текста и кнопок (a11y).
> - Убедись, что таджикские спецсимволы (ғ, ӣ, қ, ӯ, ҳ, ҷ) отображаются корректно.
> - Проверь, нет ли ошибок гидратации или лишних клиентских рендеров."
