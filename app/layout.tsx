import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import AuthProvider from './components/AuthProvider/AuthProvider';
import { UserContextProvider } from '@/context/userContext';
import { CartContextProvider } from '@/context/cartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Car ShowRoom',
  description: 'This is car dealership website',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <UserContextProvider>
            <CartContextProvider>
              <Header />
              {children}
            </CartContextProvider>
          </UserContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
