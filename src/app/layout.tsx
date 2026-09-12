import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/church/theme-provider";
import { CHURCH } from "@/lib/site";

// Both fonts fully support Cyrillic (Russian + Tajik).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Церковь Адвентистов Седьмого Дня в Душанбе",
    template: "%s — Адвентисты Седьмого Дня Душанбе",
  },
  description:
    "Церковь христиан Адвентистов Седьмого Дня в Душанбе, Таджикистан. Богослужения каждую субботу: Субботняя школа в 09:00, Божественное служение в 10:30. Добро пожаловать!",
  keywords: [
    "Адвентисты Седьмого Дня",
    "церковь Душанбе",
    "Таджикистан",
    "Калисои Адвентистҳои Рӯзи Ҳафтум",
    "Seventh-day Adventist",
    "субботнее богослужение",
  ],
  authors: [{ name: "Церковь Адвентистов Седьмого Дня, Душанбе" }],
  openGraph: {
    title: "Церковь Адвентистов Седьмого Дня в Душанбе",
    description:
      "Место веры, надежды и любви в сердце Душанбе. Богослужения каждую субботу. Хуш омадед!",
    type: "website",
    locale: "ru_RU",
    alternateLocale: ["tg_TJ"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Церковь Адвентистов Седьмого Дня в Душанбе",
    description: "Место веры, надежды и любви в сердце Душанбе. Хуш омадед!",
  },
};

export const viewport: Viewport = {
  themeColor: "#2f5a7c",
  width: "device-width",
  initialScale: 1,
};

const churchJsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: "Церковь Адвентистов Седьмого Дня в Душанбе",
  alternateName: "Калисои Адвентистҳои Рӯзи Ҳафтум дар Душанбе",
  url: "https://adventist-dushanbe.tj/",
  telephone: CHURCH.phoneHref.replace("tel:", ""),
  email: CHURCH.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "улица Борбад, 117",
    addressLocality: "Душанбе",
    addressCountry: "TJ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: CHURCH.geo.lat,
    longitude: CHURCH.geo.lng,
  },
  sameAs: [
    "https://t.me/adventist_dushanbe",
    "https://instagram.com/adventist.dushanbe",
    "https://youtube.com/@adventistdushanbe",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${manrope.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster position="top-center" richColors />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(churchJsonLd) }}
        />
      </body>
    </html>
  );
}
