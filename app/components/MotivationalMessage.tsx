'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Quote {
  quote: string;
  author: string;
}

export default function MotivationalMessage() {
  const [motivationalQuote, setMotivationalQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMotivationalQuote = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('/api/motivation');
        
        if (response.data && response.data.quote) {
          setMotivationalQuote({
            quote: response.data.quote,
            author: response.data.author || 'Unknown'
          });
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching motivational quote:', err);
        setError('Failed to load motivational quote. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMotivationalQuote();
    
    // Refresh quote every 30 minutes
    const interval = setInterval(fetchMotivationalQuote, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <svg className="w-6 h-6 mr-2 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" clipRule="evenodd" />
        </svg>
        Daily Motivation
      </h2>

      <div className="mt-2 flex-grow">
        {loading ? (
          <div className="animate-pulse flex flex-col h-full justify-center items-center">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2.5"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-2.5"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 h-full flex items-center justify-center">
            <p>{error}</p>
          </div>
        ) : motivationalQuote ? (
          <div className="relative h-full flex flex-col justify-center">
            <div className="absolute text-6xl opacity-20 left-0 top-0 text-pink-300">"</div>
            <blockquote className="pl-4 italic text-gray-600 dark:text-gray-300 relative z-10">
              <p className="mb-4">{motivationalQuote.quote}</p>
              <footer className="text-sm text-right text-gray-500 dark:text-gray-400">
                — {motivationalQuote.author}
              </footer>
            </blockquote>
            <div className="absolute text-6xl opacity-20 right-0 bottom-0 text-pink-300">"</div>
          </div>
        ) : (
          <div className="text-center h-full flex items-center justify-center">
            <p>No quote available at the moment.</p>
          </div>
        )}
      </div>
      
      <div className="flex justify-center mt-4">
        <button 
          onClick={() => {
            setLoading(true);
            axios.get('/api/motivation')
              .then(response => {
                if (response.data && response.data.quote) {
                  setMotivationalQuote({
                    quote: response.data.quote,
                    author: response.data.author || 'Unknown'
                  });
                }
                setLoading(false);
              })
              .catch(err => {
                console.error('Error refreshing quote:', err);
                setError('Failed to refresh quote');
                setLoading(false);
              });
          }}
          className="px-3 py-1 text-sm bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'New Quote'}
        </button>
      </div>
    </div>
  );
} 