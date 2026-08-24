import React from 'react';
import '../index.css';
import Providers from './providers';

export const metadata = {
  title: 'OITS Dhaka | Swiss-Modern Software Engineering Studio',
  description: 'Frontier Software Engineering Studio in Dhaka, Bangladesh.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className="dark scroll-smooth">
      <body className="font-sans antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100">
        <Providers>
          <div className="flex flex-col min-h-screen relative">
            <main className="flex-grow flex flex-col relative z-10">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
