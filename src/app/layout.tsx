import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from '@/components/common/Header';
import { DarkModeProvider } from '@/context/DarkModeContext';
import "./globals.css";

const googleSans = Inter({
  variable: "--font-google-sans",
  subsets: ["latin"],
  display: 'swap',
});

const googleMono = JetBrains_Mono({
  variable: "--font-google-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Visionary Vectors - GenAI Blog",
  description: "Exploring the frontiers of Generative AI through insightful articles and hands-on experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${googleSans.variable} ${googleMono.variable} antialiased bg-white dark:bg-black text-black dark:text-white`}>
        <DarkModeProvider>
          <Header />
          {children}
        </DarkModeProvider>
        <Analytics />
      </body>
    </html>
  );
}
