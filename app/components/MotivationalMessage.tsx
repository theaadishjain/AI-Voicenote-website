'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface MotivationalQuote {
  text: string;
  author: string;
}

export default function MotivationalMessage() {
  const [quote, setQuote] = useState<MotivationalQuote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/motivation');
      setQuote(response.data);
    } catch (err) {
      console.error('Error fetching motivational quote:', err);
      setError('Failed to load motivational message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center min-h-[280px] relative overflow-hidden">
        <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-indigo-400/10 rounded-full"></div>
        <div className="absolute -right-12 -top-12 w-32 h-32 bg-pink-400/10 rounded-full"></div>
        <div className="relative z-10 text-center">
          <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
          <h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-emerald-500 to-indigo-500 bg-clip-text text-transparent">
            Finding Inspiration
          </h2>
          <p className="text-gray-500 dark:text-gray-400">Looking for the perfect motivational quote...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-red-400/10 rounded-full"></div>
        <div className="absolute -left-12 -top-12 w-32 h-32 bg-red-400/10 rounded-full"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-red-400 to-red-600 text-white rounded-xl shadow-sm">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold ml-2">Error</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button 
            onClick={fetchQuote} 
            className="btn-secondary w-full"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-emerald-400/10 rounded-full"></div>
      <div className="absolute -left-12 -top-12 w-32 h-32 bg-indigo-400/10 rounded-full"></div>
      
      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-indigo-400 to-indigo-600 text-white rounded-xl shadow-sm">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold ml-2">Daily Inspiration</h2>
        </div>
        
        {quote && (
          <div className="mb-6">
            <div className="relative mb-6 pl-6 pr-2">
              <svg className="absolute top-0 left-0 w-5 h-5 text-indigo-400 transform -translate-y-2 -translate-x-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z" />
              </svg>
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 italic">
                {quote.text}
              </p>
              <svg className="absolute bottom-0 right-0 w-5 h-5 text-indigo-400 transform translate-y-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,17H18V11H14V17M6,17H10V11H6V17M10,7V11H14V7H10M6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22L6,22Z" />
              </svg>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">― {quote.author}</p>
            </div>
          </div>
        )}
        
        <div className="flex justify-end">
          <button
            onClick={fetchQuote}
            className="btn-outline text-sm flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" />
            </svg>
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
} 