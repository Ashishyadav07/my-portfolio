import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
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
  metadataBase: new URL("https://ashishyadav.dev"),
  title: {
    default: "Ashish Yadav | Full Stack Developer",
    template: "%s | Ashish Yadav",
  },
  description:
    "Ashish Yadav is a Full Stack Developer specializing in building robust, scalable web applications with React, Next.js, TypeScript, Node.js, and MongoDB.",
  keywords: [
    "Ashish Yadav",
    "Full Stack Developer",
    "Full Stack Web Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Web Development",
    "Portfolio",
  ],
  authors: [
    {
      name: "Ashish Yadav",
      url: "https://github.com/Ashishyadav07",
    },
  ],
  creator: "Ashish Yadav",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ashishyadav.dev",
    title: "Ashish Yadav | Full Stack Developer",
    description:
      "Ashish Yadav is a Full Stack Developer specializing in building robust, scalable web applications with React, Next.js, TypeScript, Node.js, and MongoDB.",
    siteName: "Ashish Yadav | Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ashish Yadav | Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashish Yadav | Full Stack Developer",
    description:
      "Ashish Yadav is a Full Stack Developer specializing in building robust, scalable web applications with React, Next.js, TypeScript, Node.js, and MongoDB.",
    images: ["/og-image.jpg"],
    creator: "@Ashishyadav07",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.jpg", type: "image/jpeg" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
