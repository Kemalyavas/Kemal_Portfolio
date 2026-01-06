import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kemal Yavaş | Full Stack Developer",
  description: "Full Stack Developer specializing in React, Next.js, and AI Integration. I build things that actually work.",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "AI Integration"],
  authors: [{ name: "Kemal Yavaş" }],
  openGraph: {
    title: "Kemal Yavaş | Full Stack Developer",
    description: "I build things that actually work.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
