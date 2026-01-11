import type { Metadata } from "next";
import { Orbitron, Space_Mono, Rajdhani } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// Cyberpunk headline font - futuristic and bold
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Techy monospace font for code/terminal aesthetics
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Clean futuristic font for body text
const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AI Agents Directory - Discover Your Next Productivity Stack",
  description: "Browse our comprehensive AI agents list and build your digital workforce. Find AI agents for content writing, coding, marketing, SEO and more. Perfect for students and professionals.",
  keywords: ["AI agents", "productivity tools", "automation", "AI tools", "digital workforce"],
  openGraph: {
    title: "AI Agents Directory",
    description: "Discover and explore the best AI agents to supercharge your productivity",
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
        className={`${orbitron.variable} ${spaceMono.variable} ${rajdhani.variable} antialiased bg-black font-rajdhani`}
      >
        <Navbar />
        <main className="pt-16 sm:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
