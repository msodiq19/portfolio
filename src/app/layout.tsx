import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammed Sodiq — Software Engineer",
  description:
    "Software engineer specializing in systems architecture, security-aware frontend development, and scalable web applications. Based in Lagos, Nigeria.",
  keywords: [
    "Muhammed Sodiq",
    "Software Engineer",
    "Frontend Developer",
    "React",
    "TypeScript",
    "Next.js",
    "Systems Architecture",
    "Lagos Nigeria",
  ],
  authors: [{ name: "Muhammed Sodiq" }],
  openGraph: {
    title: "Muhammed Sodiq — Software Engineer",
    description:
      "Software engineer specializing in systems architecture, security-aware frontend development, and scalable web applications.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammed Sodiq — Software Engineer",
    description:
      "Software engineer specializing in systems architecture, security-aware frontend development, and scalable web applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
