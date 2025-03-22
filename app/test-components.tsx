'use client';

// This is a test file to verify component imports
import React from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import MotivationalMessage from './components/MotivationalMessage';
import VoiceNoteControls from './components/VoiceNoteControls';

export default function TestComponents() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Decorative elements */}
      <div className="absolute top-40 -left-20 w-72 h-72 bg-emerald-400/30 rounded-full blur-3xl"></div>
      <div className="absolute top-80 -right-20 w-72 h-72 bg-pink-400/20 rounded-full blur-3xl"></div>
      <div className="absolute top-[40rem] left-40 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-500 to-pink-500 bg-clip-text text-transparent">
            Component Showcase
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of our redesigned components with a modern Figma-style design featuring glass cards and gradients.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 mb-16">
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-emerald-400 to-emerald-600 text-white rounded-lg shadow-sm mr-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4,10V21H10V10H4M10,10V21H16V10H10M16,10V21H22V10H16M4,8H8V4H4V8M10,8H14V4H10V8M16,8H20V4H16V8Z" />
                </svg>
              </div>
              Components
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Weather Display</h3>
                <WeatherDisplay />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Motivational Message</h3>
                <MotivationalMessage />
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-xl font-semibold mb-4">Voice Note Controls</h3>
                <VoiceNoteControls />
              </div>
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-pink-400 to-pink-600 text-white rounded-lg shadow-sm mr-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3Z" />
                </svg>
              </div>
              UI Elements
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-emerald-400/10 rounded-full"></div>
                <div className="absolute -left-12 -top-12 w-32 h-32 bg-pink-400/10 rounded-full"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold mb-6">Buttons</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <button className="btn-primary w-full">Primary Button</button>
                    </div>
                    <div>
                      <button className="btn-secondary w-full">Secondary Button</button>
                    </div>
                    <div>
                      <button className="btn-outline w-full">Outline Button</button>
                    </div>
                    <div>
                      <button className="animated-gradient-btn w-full">
                        <span>Gradient Button</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-indigo-400/10 rounded-full"></div>
                <div className="absolute -left-12 -top-12 w-32 h-32 bg-emerald-400/10 rounded-full"></div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold mb-6">Inputs</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Text Input</label>
                      <input type="text" className="input-field w-full" placeholder="Enter text..." />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Input</label>
                      <select className="input-field w-full">
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time Input</label>
                      <input type="time" className="input-field w-full" />
                    </div>
                    
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-zinc-600 peer-checked:bg-emerald-500"></div>
                        <span className="ml-3 text-gray-900 dark:text-gray-300 font-medium">Toggle Switch</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 