---
name: telegram-notifications
description: Guidelines and patterns for integrating Telegram Bot notifications for prayer requests, contact messages, and admin alerts in Next.js. Use when implementing, updating, or debugging Telegram messaging.
---

# Telegram Notifications Integration

This skill provides patterns for real-time notifications to church ministers/admins via Telegram Bot API when users submit prayer requests or contact messages.

## 1. Architectural Guidelines
- **Zero Heavy Dependencies**: Use native `fetch` with the Telegram Bot API (`https://api.telegram.org/bot<TOKEN>/sendMessage`). Avoid bulky SDKs like `telegraf` or `node-telegram-bot-api` in Next.js server routes.
- **Fail-Safe / Non-Blocking**: Sending a Telegram notification must **never** fail the client's request. Always write to SQLite (Prisma) first, then dispatch the Telegram notification inside a `try/catch` or background promise.
- **Environment Variables**:
  ```env
  TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrSTUvwxYZ
  TELEGRAM_CHAT_ID=-1001234567890 # Group, channel, or pastor's user ID
  TELEGRAM_THREAD_ID= # Optional: topic thread ID for forum groups
  ```

## 2. Helper Implementation Pattern (`src/lib/telegram.ts`)
```typescript
interface TelegramNotificationOptions {
  text: string;
  parseMode?: "HTML" | "MarkdownV2";
}

export function escapeTelegramHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function sendTelegramAlert({ text, parseMode = "HTML" }: TelegramNotificationOptions): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const threadId = process.env.TELEGRAM_THREAD_ID;

  if (!token || !chatId) {
    console.warn("[Telegram] Notification skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured.");
    return false;
  }

  try {
    const payload: Record<string, any> = {
      chat_id: chatId,
      text,
      parse_mode: parseMode,
      disable_web_page_preview: true,
    };
    if (threadId) payload.message_thread_id = Number(threadId);

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[Telegram] API error:", err);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[Telegram] Network failure sending alert:", error);
    return false;
  }
}
```

## 3. Message Formatting Templates

### Prayer Request (`/api/prayer`):
```typescript
const message = `
🙏 <b>Новая молитвенная нужда</b>

👤 <b>Имя:</b> ${escapeTelegramHtml(data.name || "Анонимно")}
📞 <b>Телефон:</b> ${escapeTelegramHtml(data.phone || "Не указан")}
🏷 <b>Категория:</b> ${escapeTelegramHtml(data.category || "Общая")}
🔒 <b>Конфиденциально:</b> ${data.isPrivate ? "Да (только пастору)" : "Нет"}

📝 <b>Текст:</b>
${escapeTelegramHtml(data.request)}
`.trim();
```

### Contact Inquiry (`/api/contact`):
```typescript
const message = `
✉️ <b>Новое сообщение с сайта</b>

👤 <b>Имя:</b> ${escapeTelegramHtml(data.name)}
📞 <b>Контакт:</b> ${escapeTelegramHtml(data.contact)}
📌 <b>Тема:</b> ${escapeTelegramHtml(data.subject || "Общий вопрос")}

💬 <b>Сообщение:</b>
${escapeTelegramHtml(data.message)}
`.trim();
```
