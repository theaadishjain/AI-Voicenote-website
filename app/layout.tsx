import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

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
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <header className="py-6 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="absolute right-0 top-0 w-96 h-96 bg-pink-300 dark:bg-pink-900 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              <div className="absolute left-0 bottom-0 w-96 h-96 bg-emerald-300 dark:bg-emerald-900 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/3"></div>
            </div>
            
            <div className="container mx-auto relative z-10 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-emerald-400 to-emerald-600 text-white rounded-xl shadow-lg">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,3C16.97,3 21,7.03 21,12C21,16.97 16.97,21 12,21C7.03,21 3,16.97 3,12C3,7.03 7.03,3 12,3M12,5C8.14,5 5,8.14 5,12C5,15.86 8.14,19 12,19C15.86,19 19,15.86 19,12C19,8.14 15.86,5 12,5M12,7C14.76,7 17,9.24 17,12C17,14.76 14.76,17 12,17C9.24,17 7,14.76 7,12C7,9.24 9.24,7 12,7M12,9C10.34,9 9,10.34 9,12C9,13.66 10.34,15 12,15C13.66,15 15,13.66 15,12C15,10.34 13.66,9 12,9" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">Morning Voice</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Your daily assistant</p>
                  </div>
                </div>
                
                <div className="hidden md:flex items-center space-x-4">
                  <button className="btn-outline text-sm py-2">Documentation</button>
                  <button className="btn-primary text-sm py-2">Get Started</button>
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-grow pt-4 pb-12">
            {children}
          </main>
          
          <footer className="py-8 bg-gray-50 dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-emerald-400 to-emerald-600 text-white rounded-lg">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,3C16.97,3 21,7.03 21,12C21,16.97 16.97,21 12,21C7.03,21 3,16.97 3,12C3,7.03 7.03,3 12,3M12,5C8.14,5 5,8.14 5,12C5,15.86 8.14,19 12,19C15.86,19 19,15.86 19,12C19,8.14 15.86,5 12,5M12,7C14.76,7 17,9.24 17,12C17,14.76 14.76,17 12,17C9.24,17 7,14.76 7,12C7,9.24 9.24,7 12,7M12,9C10.34,9 9,10.34 9,12C9,13.66 10.34,15 12,15C13.66,15 15,13.66 15,12C15,10.34 13.66,9 12,9" />
                      </svg>
                    </div>
                    <span className="font-semibold text-sm">Morning Voice</span>
                  </div>
                </div>
                
                <div className="text-center md:text-right text-sm text-gray-500 dark:text-gray-400">
                  <p>© {new Date().getFullYear()} AI Morning Voice Note. All rights reserved.</p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 