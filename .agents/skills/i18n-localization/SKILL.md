---
name: i18n-localization
description: Guidelines for managing bilingual localization (Russian and Tajik) with next-intl or JSON dictionaries in Next.js. Use when adding translations, modifying language switches, or expanding bilingual content.
---

# Bilingual i18n (RU / TJ) Guidelines

This project supports bilingual content for **Russian (RU)** and **Tajik (TJ)**.

## 1. Key Principles
- **Symmetrical Dictionaries**: When adding or updating a key in Russian, ensure the corresponding Tajik key is also present and updated.
- **Language Switching**: Maintain the active locale state cleanly in the URL route/hash or state store (`zustand`), ensuring users retain their selected language across navigation.
- **Cyrillic Font Support**: Ensure all used fonts (such as Inter, Manrope) include Cyrillic subsets (`subsets: ['latin', 'cyrillic']`) to properly render Tajik/Russian special characters (ғ, ӣ, қ, ӯ, ҳ, ҷ).

## 2. Best Practices for New Pages
- Never hardcode raw user-facing text directly in JSX.
- Organize translation keys hierarchically by page or component:
  ```json
  {
    "common": { "submit": "Отправить", "cancel": "Отмена" },
    "nav": { "home": "Главная", "about": "О нас", "prayer": "Молитвенная нужда" },
    "prayer": { "title": "Оставить молитвенную просьбу" }
  }
  ```
