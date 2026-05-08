import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans, DM_Mono } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LUMINARY — Exclusive Luxury Residence',
  description: 'Experience ultra-luxury living at LUMINARY. Premium suites, cinematic design, and an immersive world of modern elegance in Jakarta.',
  keywords: ['luxury hotel', 'exclusive residence', 'Jakarta', 'premium suites', 'luxury living'],
  openGraph: {
    title: 'LUMINARY — Exclusive Luxury Residence',
    description: 'Where luxury meets the extraordinary.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} ${dmMono.variable}`}>
      <body className="bg-[#080808] text-white antialiased font-jakarta overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
