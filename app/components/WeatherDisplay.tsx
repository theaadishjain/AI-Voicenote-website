'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  error: string | null;
}

export default function WeatherDisplay() {
  const [weather, setWeather] = useState<WeatherData>({
    city: '',
    temperature: 0,
    description: '',
    humidity: 0,
    windSpeed: 0,
    icon: '',
    error: null,
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [cityInput, setCityInput] = useState('');
  const [searchCity, setSearchCity] = useState('London'); // Default city
  
  useEffect(() => {
    fetchWeatherData(searchCity);
  }, [searchCity]);
  
  const fetchWeatherData = async (city: string) => {
    setIsLoading(true);
    setWeather((prev) => ({ ...prev, error: null }));
    
    try {
      const response = await axios.get(`/api/weather?city=${encodeURIComponent(city)}`);
      setWeather({
        ...response.data,
        error: null,
      });
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setWeather((prev) => ({
        ...prev,
        error: 'Failed to fetch weather data',
      }));
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim()) {
      setSearchCity(cityInput.trim());
    }
  };
  
  const getWeatherTheme = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes('rain') || desc.includes('drizzle') || desc.includes('shower')) {
      return 'weather-gradient-rainy';
    } else if (desc.includes('cloud') || desc.includes('overcast')) {
      return 'weather-gradient-cloudy';
    } else if (desc.includes('snow') || desc.includes('sleet') || desc.includes('ice')) {
      return 'weather-gradient-snowy';
    } else if (desc.includes('thunder') || desc.includes('storm')) {
      return 'weather-gradient-storm';
    } else if (desc.includes('fog') || desc.includes('mist') || desc.includes('haze')) {
      return 'weather-gradient-foggy';
    } else if (desc.includes('clear') || desc.includes('sun')) {
      return 'weather-gradient-sunny';
    } else {
      return 'weather-gradient-default';
    }
  };
  
  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6 min-h-[320px] flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-xl font-bold">Loading Weather Data...</h2>
      </div>
    );
  }
  
  if (weather.error) {
    return (
      <div className="glass-card rounded-2xl p-6 min-h-[320px] flex flex-col items-center justify-center">
        <svg className="w-12 h-12 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="text-lg">{weather.error}</p>
        <button 
          onClick={() => fetchWeatherData(searchCity)} 
          className="mt-4 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-md"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  return (
    <div className={`glass-card rounded-2xl p-6 overflow-hidden relative ${getWeatherTheme(weather.description)}`}>
      <div className="mb-6">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            placeholder="Enter city name"
            className="input-field flex-grow"
            aria-label="City name"
          />
          <button 
            type="submit" 
            className="btn-primary py-2 px-4 flex-none"
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold mb-1">{weather.city}</h2>
          <p className="text-lg capitalize mb-4">{weather.description}</p>
          
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span>Humidity: {weather.humidity}%</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <span>Wind: {weather.windSpeed} km/h</span>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-5xl font-bold">{Math.round(weather.temperature)}°C</div>
          {weather.icon && (
            <img 
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
              alt={weather.description}
              className="w-20 h-20 object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
} 