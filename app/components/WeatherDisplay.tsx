'use client';

import { useState, useEffect } from 'react';
import { weatherData } from '@/app/types';

interface WeatherDisplayProps {
  onWeatherUpdate?: (data: weatherData) => void;
}

export default function WeatherDisplay({ onWeatherUpdate }: WeatherDisplayProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cityInput, setCityInput] = useState('');
  const [searchCity, setSearchCity] = useState('London');
  
  const [weatherData, setWeatherData] = useState<weatherData>({
    city: '',
    temperature: 0,
    description: '',
    humidity: 0,
    windSpeed: 0,
    icon: '',
  });

  useEffect(() => {
    fetchWeatherData(searchCity);
  }, [searchCity]);

  const fetchWeatherData = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
      
      // Share weather data with parent component if callback provided
      if (onWeatherUpdate) {
        onWeatherUpdate(data);
      }
    } catch (err: any) {
      console.error('Error fetching weather data:', err);
      setError(err.message || 'An error occurred while fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim()) {
      setSearchCity(cityInput.trim());
      setCityInput('');
    }
  };

  // Helper function to determine icon based on weather description
  const getWeatherIcon = () => {
    const description = weatherData.description.toLowerCase();
    if (description.includes('clear') || description.includes('sun')) {
      return '☀️';
    } else if (description.includes('cloud')) {
      return '☁️';
    } else if (description.includes('rain') || description.includes('drizzle')) {
      return '🌧️';
    } else if (description.includes('thunder')) {
      return '⛈️';
    } else if (description.includes('snow')) {
      return '❄️';
    } else if (description.includes('mist') || description.includes('fog')) {
      return '🌫️';
    } else {
      return '🌤️';
    }
  };

  return (
    <div className="weather-display">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-xl shadow-sm">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6,19A5,5 0 0,1 1,14A5,5 0 0,1 6,9C7,6.65 9.3,5 12,5C15.43,5 18.24,7.66 18.5,11.03L19,11A4,4 0 0,1 23,15A4,4 0 0,1 19,19H6M19,13H17V12A5,5 0 0,0 12,7C9.5,7 7.45,8.82 7.06,11.19C6.73,11.07 6.37,11 6,11A3,3 0 0,0 3,14A3,3 0 0,0 6,17H19A2,2 0 0,0 21,15A2,2 0 0,0 19,13Z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold ml-2">Weather Forecast</h2>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex space-x-2">
          <input
            type="text"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            placeholder="Enter city name"
            className="input-field flex-grow"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !cityInput.trim()}
            className="btn-primary"
          >
            {loading ? (
              <div className="inline-block animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full" />
            ) : (
              'Search'
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 mb-4 bg-red-100 border border-red-200 text-red-700 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        !error && (
          <div className="p-6 rounded-xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm shadow-sm border border-white/30 dark:border-slate-700/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-semibold">{weatherData.city}</h2>
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold mr-2">{Math.round(weatherData.temperature)}°C</span>
                  <span className="text-lg text-gray-600 dark:text-gray-300 capitalize">{weatherData.description}</span>
                </div>
                <div className="mt-4">
                  <p className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-5 h-5 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z" />
                    </svg>
                    Humidity: {weatherData.humidity}%
                  </p>
                  <p className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-5 h-5 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4,10A1,1 0 0,1 3,9A1,1 0 0,1 4,8H12A2,2 0 0,0 14,6A2,2 0 0,0 12,4C11.45,4 10.95,4.22 10.59,4.59C10.2,5 9.56,5 9.17,4.59C8.78,4.2 8.78,3.56 9.17,3.17C9.9,2.45 10.9,2 12,2A4,4 0 0,1 16,6A4,4 0 0,1 12,10H4M19,12A1,1 0 0,0 20,11A1,1 0 0,0 19,10C18.72,10 18.47,10.11 18.29,10.29C17.9,10.68 17.27,10.68 16.88,10.29C16.5,9.9 16.5,9.27 16.88,8.88C17.42,8.34 18.17,8 19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14H5A1,1 0 0,1 4,13A1,1 0 0,1 5,12H19M18,18H4A1,1 0 0,1 3,17A1,1 0 0,1 4,16H18A3,3 0 0,1 21,19A3,3 0 0,1 18,22C17.17,22 16.42,21.66 15.88,21.12C15.5,20.73 15.5,20.1 15.88,19.71C16.27,19.32 16.9,19.32 17.29,19.71C17.47,19.89 17.72,20 18,20A1,1 0 0,0 19,19A1,1 0 0,0 18,18Z" />
                    </svg>
                    Wind: {weatherData.windSpeed} km/h
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <span className="text-7xl">{getWeatherIcon()}</span>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        )
      )}
    </div>
  );
} 