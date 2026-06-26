import type { Metadata } from "next";
import Script from "next/script";
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

import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://babeznamez.com'),

  title: {
    default: 'Baby Name Finder | AI Baby Names | BabezNamez',
    template: '%s | BabezNamez',
  },

  description:
    'Discover beautiful baby names with AI. Search by style, origin, popularity, and meaning to find the perfect name for your baby.',

  keywords: [
    'baby names',
    'baby name finder',
    'AI baby names',
    'unique baby names',
    'boy names',
    'girl names',
    'gender neutral names',
    'baby name meanings',
    'name generator',
    'BabezNamez',
  ],

  authors: [{ name: 'BabezNamez' }],
  creator: 'BabezNamez',
  publisher: 'BabezNamez',

  alternates: {
    canonical: 'https://babeznamez.com',
  },

  openGraph: {
    title: 'Baby Name Finder | BabezNamez',
    description:
      'Generate beautiful baby names with AI and discover meanings, origins, and inspiration.',
    url: 'https://babeznamez.com',
    siteName: 'BabezNamez',
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Baby Name Finder | BabezNamez',
    description:
      'Generate beautiful baby names with AI and discover meanings and origins.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2903109120824082"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}