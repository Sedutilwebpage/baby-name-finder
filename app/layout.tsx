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

export const metadata: Metadata = {
  metadataBase: new URL('https://babeznamez.com'),

  title: {
    default: 'Baby Name Finder | AI Baby Names | BabezNamez',
    template: '%s | BabezNamez',
  },

  description:
    'Discover beautiful baby names with the power of AI. Search by meaning, origin, style, popularity, and gender to find the perfect name for your baby, then explore similar names, save your favorites, and print your personalized list.',

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
  
  other: {
  "google-adsense-account": "ca-pub-9315314372257867",
},

  alternates: {
    canonical: 'https://babeznamez.com',
  },

  openGraph: {
    title: 'Baby Name Finder | BabezNamez',
    description:
      'Discover beautiful baby names with the power of AI. Search by meaning, origin, style, popularity, and gender to find the perfect name for your baby, then explore similar names, save your favorites, and print your personalized list.',
    url: 'https://babeznamez.com',
    siteName: 'BabezNamez',
    locale: 'en_US',
    type: 'website',
	images: ['/social-preview.jpg'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Baby Name Finder | BabezNamez',
    description:
      'Discover beautiful baby names with the power of AI. Search by meaning, origin, style, popularity, and gender to find the perfect name for your baby, then explore similar names, save your favorites, and print your personalized list.',
	images: ['/social-preview.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
	  <head>
	    <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9315314372257867"
          crossOrigin="anonymous"
        />
	  </head>	
		
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}