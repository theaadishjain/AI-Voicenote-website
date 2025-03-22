import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    // Get the city from query parameters, default to London
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city') || 'London';
    
    // Check if API key is configured
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Weather API key not configured' },
        { status: 500 }
      );
    }
    
    // Fetch weather data from OpenWeatherMap API
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
    );
    
    const data = response.data;
    
    // Transform the response data into our format
    const weatherData = {
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0].icon,
    };
    
    return NextResponse.json(weatherData);
  } catch (error: any) {
    console.error('Error fetching weather data:', error);
    
    // Check if it's a 404 error (city not found)
    if (error.response && error.response.status === 404) {
      return NextResponse.json(
        { error: 'City not found. Please check the spelling and try again.' },
        { status: 404 }
      );
    }
    
    // Handle API key errors
    if (error.response && error.response.status === 401) {
      return NextResponse.json(
        { error: 'Invalid API key or authorization error' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
} 