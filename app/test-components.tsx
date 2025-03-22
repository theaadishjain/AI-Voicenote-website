'use client';

// This is a test file to verify component imports
import React from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import MotivationalMessage from './components/MotivationalMessage';
import VoiceNoteControls from './components/VoiceNoteControls';

export default function TestComponents() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 gradient-text">
          Component Testing Page
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mb-8">
          This page displays all components for testing and development purposes
        </p>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <WeatherDisplay />
          </div>
          
          <div>
            <MotivationalMessage />
          </div>
        </div>
        
        <div className="mt-8">
          <VoiceNoteControls />
        </div>
      </div>
      
      <div className="mt-12 p-6 glass-card rounded-xl">
        <h2 className="text-2xl font-bold mb-6">UI Component Showcase</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-3">
              <button className="btn-primary">Primary Button</button>
              <button className="btn-secondary">Secondary Button</button>
              <button className="btn-success">Success Button</button>
              <button className="btn-outline">Outline Button</button>
              <button className="animated-gradient-btn text-white px-4 py-2 rounded-lg">
                Gradient Button
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Inputs</h3>
            <div className="space-y-4">
              <input 
                type="text" 
                className="input-field w-full" 
                placeholder="Text input" 
              />
              <div className="flex gap-2">
                <input 
                  type="time" 
                  className="input-field" 
                  defaultValue="08:00" 
                />
                <select className="input-field">
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Cards & Elements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card p-4 rounded-lg">
              <h4 className="font-medium mb-2">Glass Card</h4>
              <p className="text-sm">A simple glass card with blur effect</p>
            </div>
            
            <div className="weather-gradient-clear text-white p-4 rounded-lg">
              <h4 className="font-medium mb-2">Weather: Clear</h4>
              <p className="text-sm">Gradient background for clear weather</p>
            </div>
            
            <div className="weather-gradient-rain text-white p-4 rounded-lg">
              <h4 className="font-medium mb-2">Weather: Rain</h4>
              <p className="text-sm">Gradient background for rainy weather</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 