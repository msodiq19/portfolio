import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dmsodiq.xyz"),
  title: "Sodiq Muhammed — Software Engineer",
  description:
    "Software engineer specializing in systems architecture, security-aware frontend development, and scalable web applications. Based in Lagos, Nigeria.",
  keywords: [
    "Sodiq Muhammed",
    "Software Engineer",
    "Frontend Developer",
    "React",
    "TypeScript",
    "Next.js",
    "Systems Architecture",
    "Lagos Nigeria",
  ],
  authors: [{ name: "Sodiq Muhammed" }],
  alternates: {
    canonical: "https://dmsodiq.xyz",
  },
  openGraph: {
    title: "Sodiq Muhammed — Software Engineer",
    description:
      "Software engineer specializing in systems architecture, security-aware frontend development, and scalable web applications.",
    type: "website",
    locale: "en_US",
    url: "https://dmsodiq.xyz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sodiq Muhammed — Software Engineer",
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  var resolved = theme;
                  if (theme === 'system') {
                    resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.setAttribute('data-theme', resolved);
                } catch(e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
