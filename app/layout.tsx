import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppNav } from '@/components/app-nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SMART TA’LIM',
  description: 'Smart personalized learning platform for higher education students.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body className={inter.className}>
        <AppNav />
        {children}
      </body>
    </html>
  );
}
