import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { site } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.displayName} — ${site.community}`,
    template: `%s — ${site.displayName}`,
  },
  description: site.description,
  applicationName: site.displayName,
  keywords: [
    "PapaKow",
    "The Clutch Club",
    "Twitch",
    "FPS",
    "Australia",
    "OCE",
    "Valorant",
    "streaming",
  ],
  authors: [{ name: site.displayName, url: site.url }],
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.displayName} — live from Australia`,
    description: site.description,
    siteName: site.displayName,
    images: [
      {
        url: "/images/offline-hero.png",
        width: 1920,
        height: 1080,
        alt: "Warm golden-hour streaming desk overlooking the coast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.displayName} — ${site.community}`,
    description: site.description,
    images: ["/images/offline-hero.png"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream font-sans text-charcoal">
        <a
          href="#watch"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-sun focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
