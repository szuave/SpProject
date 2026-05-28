import type { Metadata, Viewport } from "next";
import { Poppins, Archivo } from "next/font/google";
import "./globals.css";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  ...buildMetadata(),
  metadataBase: new URL(site.url),
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  icons: { icon: "/img/logo-black.png", apple: "/img/logo-black.png" },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl-BE" className={`${poppins.variable} ${archivo.variable} antialiased`}>
      <body className="min-h-dvh flex flex-col bg-surface text-ink">{children}</body>
    </html>
  );
}
