import type { Metadata } from 'next';
import { Inter, Figtree, Poppins, Roboto, Open_Sans } from 'next/font/google';
import './globals.css';
import LayoutProvider from '@/features/Layout/LayoutProvider';
import ReduxProvider from '@/features/store/Provider';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const figtree = Figtree({ 
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const roboto = Roboto({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

const openSans = Open_Sans({ 
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TradeX - Trading Dashboard',
  description: 'A modern trading dashboard application',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} ${inter.variable} ${poppins.variable} ${roboto.variable} ${openSans.variable} font-figtree`}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
