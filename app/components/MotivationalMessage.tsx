'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

type MessageData = {
  message: string;
  author: string;
  loading: boolean;
  error: string | null;
};

export default function MotivationalMessage() {
  const [motivationalData, setMotivationalData] = useState<MessageData>({
    message: '',
    author: '',
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchMotivationalMessage = async () => {
      try {
        const response = await axios.get('/api/motivation');
        const data = response.data;
        
        setMotivationalData({
          message: data.quote,
          author: data.author,
          loading: false,
          error: null,
        });
      } catch (err) {
        console.error('Error fetching motivational message:', err);
        setMotivationalData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch motivational message',
        }));
      }
    };

    fetchMotivationalMessage();
  }, []);

  if (motivationalData.loading) {
    return (
      <div className="glass-card rounded-2xl p-6 h-full">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 text-amber-500">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,15C12.81,15 13.5,14.7 14.11,14.11C14.7,13.5 15,12.81 15,12C15,11.19 14.7,10.5 14.11,9.89C13.5,9.3 12.81,9 12,9C11.19,9 10.5,9.3 9.89,9.89C9.3,10.5 9,11.19 9,12C9,12.81 9.3,13.5 9.89,14.11C10.5,14.7 11.19,15 12,15M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12V13.45C22,14.45 21.65,15.3 21,16C20.3,16.67 19.5,17 18.5,17C17.3,17 16.31,16.5 15.56,15.5C14.56,16.5 13.38,17 12,17C10.63,17 9.45,16.5 8.46,15.54C7.5,14.55 7,13.38 7,12C7,10.63 7.5,9.45 8.46,8.46C9.45,7.5 10.63,7 12,7C13.38,7 14.55,7.5 15.54,8.46C16.5,9.45 17,10.63 17,12V13.45C17,13.86 17.16,14.22 17.46,14.53C17.76,14.84 18.11,15 18.5,15C18.92,15 19.27,14.84 19.57,14.53C19.87,14.22 20,13.86 20,13.45V12C20,9.81 19.23,7.93 17.65,6.35C16.07,4.77 14.19,4 12,4C9.81,4 7.93,4.77 6.35,6.35C4.77,7.93 4,9.81 4,12C4,14.19 4.77,16.07 6.35,17.65C7.93,19.23 9.81,20 12,20H17V22H12C9.25,22 6.9,21 4.95,19.05C3,17.1 2,14.75 2,12C2,9.25 3,6.9 4.95,4.95C6.9,3 9.25,2 12,2Z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold ml-2">Daily Motivation</h2>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      </div>
    );
  }

  if (motivationalData.error) {
    return (
      <div className="glass-card rounded-2xl p-6 h-full">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 text-amber-500">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,15C12.81,15 13.5,14.7 14.11,14.11C14.7,13.5 15,12.81 15,12C15,11.19 14.7,10.5 14.11,9.89C13.5,9.3 12.81,9 12,9C11.19,9 10.5,9.3 9.89,9.89C9.3,10.5 9,11.19 9,12C9,12.81 9.3,13.5 9.89,14.11C10.5,14.7 11.19,15 12,15M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12V13.45C22,14.45 21.65,15.3 21,16C20.3,16.67 19.5,17 18.5,17C17.3,17 16.31,16.5 15.56,15.5C14.56,16.5 13.38,17 12,17C10.63,17 9.45,16.5 8.46,15.54C7.5,14.55 7,13.38 7,12C7,10.63 7.5,9.45 8.46,8.46C9.45,7.5 10.63,7 12,7C13.38,7 14.55,7.5 15.54,8.46C16.5,9.45 17,10.63 17,12V13.45C17,13.86 17.16,14.22 17.46,14.53C17.76,14.84 18.11,15 18.5,15C18.92,15 19.27,14.84 19.57,14.53C19.87,14.22 20,13.86 20,13.45V12C20,9.81 19.23,7.93 17.65,6.35C16.07,4.77 14.19,4 12,4C9.81,4 7.93,4.77 6.35,6.35C4.77,7.93 4,9.81 4,12C4,14.19 4.77,16.07 6.35,17.65C7.93,19.23 9.81,20 12,20H17V22H12C9.25,22 6.9,21 4.95,19.05C3,17.1 2,14.75 2,12C2,9.25 3,6.9 4.95,4.95C6.9,3 9.25,2 12,2Z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold ml-2">Daily Motivation</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-red-500 text-center mb-2">
            <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
          </div>
          <p className="text-lg">{motivationalData.error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
            onClick={() => setMotivationalData(prev => ({ ...prev, loading: true }))}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 h-full">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 text-amber-500">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,15C12.81,15 13.5,14.7 14.11,14.11C14.7,13.5 15,12.81 15,12C15,11.19 14.7,10.5 14.11,9.89C13.5,9.3 12.81,9 12,9C11.19,9 10.5,9.3 9.89,9.89C9.3,10.5 9,11.19 9,12C9,12.81 9.3,13.5 9.89,14.11C10.5,14.7 11.19,15 12,15M12,2C14.75,2 17.1,3 19.05,4.95C21,6.9 22,9.25 22,12V13.45C22,14.45 21.65,15.3 21,16C20.3,16.67 19.5,17 18.5,17C17.3,17 16.31,16.5 15.56,15.5C14.56,16.5 13.38,17 12,17C10.63,17 9.45,16.5 8.46,15.54C7.5,14.55 7,13.38 7,12C7,10.63 7.5,9.45 8.46,8.46C9.45,7.5 10.63,7 12,7C13.38,7 14.55,7.5 15.54,8.46C16.5,9.45 17,10.63 17,12V13.45C17,13.86 17.16,14.22 17.46,14.53C17.76,14.84 18.11,15 18.5,15C18.92,15 19.27,14.84 19.57,14.53C19.87,14.22 20,13.86 20,13.45V12C20,9.81 19.23,7.93 17.65,6.35C16.07,4.77 14.19,4 12,4C9.81,4 7.93,4.77 6.35,6.35C4.77,7.93 4,9.81 4,12C4,14.19 4.77,16.07 6.35,17.65C7.93,19.23 9.81,20 12,20H17V22H12C9.25,22 6.9,21 4.95,19.05C3,17.1 2,14.75 2,12C2,9.25 3,6.9 4.95,4.95C6.9,3 9.25,2 12,2Z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold ml-2">Daily Motivation</h2>
      </div>
      
      <div className="flex-grow flex flex-col justify-center px-4 py-8">
        <div className="relative">
          <svg className="absolute -top-6 left-0 w-16 h-16 text-amber-400 opacity-20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.22,6C9.22,4.9 8.32,4 7.22,4C6.12,4 5.22,4.9 5.22,6C5.22,7.1 6.12,8 7.22,8C8.32,8 9.22,7.1 9.22,6M7.22,10C4.91,10 3.12,11.79 3.12,14.1V18H5.22V20H9.22V18H11.32V14.1C11.32,11.79 9.53,10 7.22,10M19.22,6C19.22,4.9 18.32,4 17.22,4C16.12,4 15.22,4.9 15.22,6C15.22,7.1 16.12,8 17.22,8C18.32,8 19.22,7.1 19.22,6M17.22,10C14.91,10 13.12,11.79 13.12,14.1V18H15.22V20H19.22V18H21.32V14.1C21.32,11.79 19.53,10 17.22,10Z" />
          </svg>
          <blockquote className="text-xl md:text-2xl italic mb-6 text-slate-700 dark:text-slate-200 leading-relaxed">
            &ldquo;{motivationalData.message}&rdquo;
          </blockquote>
          
          {motivationalData.author && (
            <div className="flex justify-end">
              <div className="glass-card p-3 rounded-lg shadow-sm inline-block">
                <p className="text-right text-slate-600 dark:text-slate-300 font-medium">
                  - {motivationalData.author}
                </p>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-center">
          <button 
            onClick={() => fetchMotivationalMessage()}
            className="flex items-center px-4 py-2 text-sm bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors shadow-sm"
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