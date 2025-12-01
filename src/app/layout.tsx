import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import './globals.css';
import { CartProvider } from '@/contexts/cart-context';
import { CurrencyProvider } from '@/contexts/currency-context';

export const metadata: Metadata = {
  title: 'Auria by TFG',
  description: 'Timeless Elegance, Redefined.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <CurrencyProvider>
          <CartProvider>
            <div className="relative flex min-h-dvh flex-col bg-background">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </CurrencyProvider>
        <Toaster />
      </body>
    </html>
  );
}
