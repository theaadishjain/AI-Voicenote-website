import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  // Replace with your actual OpenWeather API key
  const API_KEY = process.env.OPENWEATHER_API_KEY || 'your_openweather_api_key';
  
  // Default to London if geolocation not available in backend
  const city = 'London'; 
  
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    const data = response.data;
    
    return NextResponse.json({
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      city: data.name,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
} 