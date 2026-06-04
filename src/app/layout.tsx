import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GIT Academy — Cybersecurity Training & Certifications",
    template: "%s | GIT Academy",
  },
  description:
    "India's premier cybersecurity command center. Authorized training for Cisco, EC-Council, CompTIA, Microsoft, AWS. Hands-on labs, expert instructors, career transformation. Since 2002.",
  keywords: [
    "cybersecurity training",
    "CCNA certification Bangalore",
    "CEH training India",
    "CompTIA Security+",
    "network security courses",
    "ethical hacking course",
    "cybersecurity certifications",
    "IT training Bangalore",
    "GIT Academy",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://gitinfo.com",
    siteName: "GIT Academy",
    title: "GIT Academy — Cybersecurity Training & Certifications",
    description:
      "India's premier cybersecurity command center. Authorized training, hands-on labs, career transformation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GIT Academy — Cybersecurity Training & Certifications",
    description:
      "India's premier cybersecurity command center. Authorized training, hands-on labs, career transformation.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="flex flex-col min-h-screen font-[family-name:var(--font-inter)] antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
