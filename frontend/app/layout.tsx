import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ARIA — AI Personal Shopper",
  description: "Your AI-powered personal stylist. Describe your style, discover your look.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-ink text-cream antialiased">{children}</body>
    </html>
  );
}
