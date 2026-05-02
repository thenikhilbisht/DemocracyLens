import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import MobileNav from '@/components/layout/MobileNav';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Indian Election Assistant',
  description: 'Learn about the Indian Election System interactively through timelines, flashcards, and quizzes.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={inter.variable}>
      <body className="antialiased font-sans">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main id="main-content" className="flex-grow pt-24 lg:pt-32 pb-20 md:pb-0 relative z-0">
            {children}
          </main>
          <MobileNav />
          <Footer />
        </div>
      </body>
    </html>
  );
}
