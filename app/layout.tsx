import './styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Morning Voice Note',
  description: 'Daily Weather & Motivation Voice Notes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md">
            <div className="container mx-auto py-5 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <svg 
                    className="w-9 h-9" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12,3C16.97,3 21,7.03 21,12C21,16.97 16.97,21 12,21C7.03,21 3,16.97 3,12C3,7.03 7.03,3 12,3M12,5C8.14,5 5,8.14 5,12C5,15.86 8.14,19 12,19C15.86,19 19,15.86 19,12C19,8.14 15.86,5 12,5M12,7C14.76,7 17,9.24 17,12C17,14.76 14.76,17 12,17C9.24,17 7,14.76 7,12C7,9.24 9.24,7 12,7M12,9C10.34,9 9,10.34 9,12C9,13.66 10.34,15 12,15C13.66,15 15,13.66 15,12C15,10.34 13.66,9 12,9M12,11C12.55,11 13,11.45 13,12C13,12.55 12.55,13 12,13C11.45,13 11,12.55 11,12C11,11.45 11.45,11 12,11Z" />
                  </svg>
                  <h1 className="text-xl font-bold">AI Morning Voice Note</h1>
                </div>
                <div className="text-sm">Weather & Motivation For Your Day</div>
              </div>
            </div>
          </header>
          
          <main className="flex-grow">
            {children}
          </main>
          
          <footer className="bg-slate-800 text-slate-200 py-4">
            <div className="container mx-auto px-4 text-center text-sm">
              <p>© {new Date().getFullYear()} AI Morning Voice Note. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 