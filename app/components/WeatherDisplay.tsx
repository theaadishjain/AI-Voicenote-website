'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

type WeatherData = {
  temperature: number;
  description: string;
  icon: string;
  city: string;
  humidity: number;
  windSpeed: number;
  loading: boolean;
  error: string | null;
};

export default function WeatherDisplay() {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 0,
    description: '',
    icon: '',
    city: '',
    humidity: 0,
    windSpeed: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('/api/weather');
        const data = response.data;
        
        setWeather({
          temperature: data.temperature,
          description: data.description,
          icon: data.icon,
          city: data.city,
          humidity: data.humidity,
          windSpeed: data.windSpeed,
          loading: false,
          error: null,
        });
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setWeather(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch weather data',
        }));
      }
    };

    fetchWeatherData();
  }, []);

  if (weather.loading) {
    return (
      <div className="glass-card rounded-2xl p-6 h-full">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 text-blue-500">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.74,5.47C15.1,6.5 16.35,9.03 15.92,11.46C17.19,12.56 18,14.19 18,16V16.17C18.31,16.06 18.65,16 19,16A3,3 0 0,1 22,19A3,3 0 0,1 19,22H6A4,4 0 0,1 2,18A4,4 0 0,1 6,14H6.27C5,12.45 4.6,10.24 5.5,8.26C6.72,5.5 9.97,4.24 12.74,5.47M11.93,7.3C10.16,6.5 8.09,7.31 7.31,9.07C6.85,10.09 6.93,11.22 7.41,12.13C8.5,10.83 10.16,10 12,10C12.7,10 13.38,10.12 14,10.34C13.94,9.06 13.18,7.86 11.93,7.3M13.55,3.64C13,3.4 12.45,3.23 11.88,3.12L14.37,1.82L15.27,4.71C14.76,4.29 14.19,3.93 13.55,3.64M6.09,4.44C5.6,4.79 5.17,5.19 4.8,5.63L4.91,2.82L7.87,3.5C7.25,3.71 6.65,4.03 6.09,4.44M18,9.71C17.91,9.12 17.78,8.55 17.59,8L19.97,9.5L17.92,11.73C18.03,11.08 18.05,10.4 18,9.71M3.04,11.3C3.11,11.9 3.24,12.47 3.43,13L1.06,11.5L3.1,9.28C3,9.93 2.97,10.61 3.04,11.3M19,18H16V16A4,4 0 0,0 12,12A4,4 0 0,0 8,16H6A2,2 0 0,0 4,18A2,2 0 0,0 6,20H19A1,1 0 0,0 20,19A1,1 0 0,0 19,18Z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold ml-2">Weather Update</h2>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (weather.error) {
    return (
      <div className="glass-card rounded-2xl p-6 h-full">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 text-blue-500">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.74,5.47C15.1,6.5 16.35,9.03 15.92,11.46C17.19,12.56 18,14.19 18,16V16.17C18.31,16.06 18.65,16 19,16A3,3 0 0,1 22,19A3,3 0 0,1 19,22H6A4,4 0 0,1 2,18A4,4 0 0,1 6,14H6.27C5,12.45 4.6,10.24 5.5,8.26C6.72,5.5 9.97,4.24 12.74,5.47M11.93,7.3C10.16,6.5 8.09,7.31 7.31,9.07C6.85,10.09 6.93,11.22 7.41,12.13C8.5,10.83 10.16,10 12,10C12.7,10 13.38,10.12 14,10.34C13.94,9.06 13.18,7.86 11.93,7.3M13.55,3.64C13,3.4 12.45,3.23 11.88,3.12L14.37,1.82L15.27,4.71C14.76,4.29 14.19,3.93 13.55,3.64M6.09,4.44C5.6,4.79 5.17,5.19 4.8,5.63L4.91,2.82L7.87,3.5C7.25,3.71 6.65,4.03 6.09,4.44M18,9.71C17.91,9.12 17.78,8.55 17.59,8L19.97,9.5L17.92,11.73C18.03,11.08 18.05,10.4 18,9.71M3.04,11.3C3.11,11.9 3.24,12.47 3.43,13L1.06,11.5L3.1,9.28C3,9.93 2.97,10.61 3.04,11.3M19,18H16V16A4,4 0 0,0 12,12A4,4 0 0,0 8,16H6A2,2 0 0,0 4,18A2,2 0 0,0 6,20H19A1,1 0 0,0 20,19A1,1 0 0,0 19,18Z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold ml-2">Weather Update</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-red-500 text-center mb-2">
            <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
          </div>
          <p className="text-lg">{weather.error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => setWeather(prev => ({ ...prev, loading: true }))}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Get appropriate weather icon colors and backgrounds based on weather
  const getWeatherTheme = () => {
    const description = weather.description.toLowerCase();
    
    if (description.includes('rain') || description.includes('drizzle')) {
      return 'from-blue-400 to-blue-600';
    } else if (description.includes('snow')) {
      return 'from-blue-200 to-indigo-400';
    } else if (description.includes('cloud')) {
      return 'from-gray-300 to-gray-500';
    } else if (description.includes('clear')) {
      return 'from-yellow-400 to-orange-500';
    } else if (description.includes('thunder') || description.includes('storm')) {
      return 'from-purple-600 to-indigo-800';
    } else {
      return 'from-blue-400 to-cyan-300';
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 h-full">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 text-blue-500">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.74,5.47C15.1,6.5 16.35,9.03 15.92,11.46C17.19,12.56 18,14.19 18,16V16.17C18.31,16.06 18.65,16 19,16A3,3 0 0,1 22,19A3,3 0 0,1 19,22H6A4,4 0 0,1 2,18A4,4 0 0,1 6,14H6.27C5,12.45 4.6,10.24 5.5,8.26C6.72,5.5 9.97,4.24 12.74,5.47M11.93,7.3C10.16,6.5 8.09,7.31 7.31,9.07C6.85,10.09 6.93,11.22 7.41,12.13C8.5,10.83 10.16,10 12,10C12.7,10 13.38,10.12 14,10.34C13.94,9.06 13.18,7.86 11.93,7.3M13.55,3.64C13,3.4 12.45,3.23 11.88,3.12L14.37,1.82L15.27,4.71C14.76,4.29 14.19,3.93 13.55,3.64M6.09,4.44C5.6,4.79 5.17,5.19 4.8,5.63L4.91,2.82L7.87,3.5C7.25,3.71 6.65,4.03 6.09,4.44M18,9.71C17.91,9.12 17.78,8.55 17.59,8L19.97,9.5L17.92,11.73C18.03,11.08 18.05,10.4 18,9.71M3.04,11.3C3.11,11.9 3.24,12.47 3.43,13L1.06,11.5L3.1,9.28C3,9.93 2.97,10.61 3.04,11.3M19,18H16V16A4,4 0 0,0 12,12A4,4 0 0,0 8,16H6A2,2 0 0,0 4,18A2,2 0 0,0 6,20H19A1,1 0 0,0 20,19A1,1 0 0,0 19,18Z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold ml-2">Weather Update</h2>
      </div>
      
      <div className="mb-8">
        <div className="text-center mb-2">
          <p className="text-lg font-medium text-slate-600 dark:text-slate-300">{weather.city}</p>
        </div>
        
        <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${getWeatherTheme()} p-6 text-white shadow-lg mb-4`}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-5xl font-bold">{Math.round(weather.temperature)}°</p>
              <p className="text-lg capitalize mt-1">{weather.description}</p>
            </div>
            {weather.icon && (
              <div className="relative w-24 h-24">
                <Image 
                  src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
                  alt={weather.description}
                  width={96}
                  height={96}
                  unoptimized={true}
                  className="transform scale-150"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4 rounded-xl text-center flex flex-col items-center">
          <div className="mb-2 text-blue-500">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z" />
            </svg>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Humidity</p>
          <p className="text-xl font-medium">{weather.humidity}%</p>
        </div>
        <div className="glass-card p-4 rounded-xl text-center flex flex-col items-center">
          <div className="mb-2 text-blue-500">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4,10A1,1 0 0,1 3,9A1,1 0 0,1 4,8H12A2,2 0 0,0 14,6A2,2 0 0,0 12,4C11.45,4 10.95,4.22 10.59,4.59C10.2,5 9.56,5 9.17,4.59C8.78,4.2 8.78,3.56 9.17,3.17C9.9,2.45 10.9,2 12,2A4,4 0 0,1 16,6A4,4 0 0,1 12,10H4M19,12A1,1 0 0,0 20,11A1,1 0 0,0 19,10C18.72,10 18.47,10.11 18.29,10.29C17.9,10.68 17.27,10.68 16.88,10.29C16.5,9.9 16.5,9.27 16.88,8.88C17.42,8.34 18.17,8 19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14H5A1,1 0 0,1 4,13A1,1 0 0,1 5,12H19M18,18H4A1,1 0 0,1 3,17A1,1 0 0,1 4,16H18A3,3 0 0,1 21,19A3,3 0 0,1 18,22C17.17,22 16.42,21.66 15.88,21.12C15.5,20.73 15.5,20.1 15.88,19.71C16.27,19.32 16.9,19.32 17.29,19.71C17.47,19.89 17.72,20 18,20A1,1 0 0,0 19,19A1,1 0 0,0 18,18Z" />
            </svg>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Wind Speed</p>
          <p className="text-xl font-medium">{weather.windSpeed} m/s</p>
        </div>
      </div>
    </div>
  );
} 