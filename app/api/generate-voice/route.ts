import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const { deliveryMethod, contactInfo, sendNow } = await req.json();
    
    // Get current weather data
    const weatherRes = await axios.get(`${process.env.APP_URL || 'http://localhost:3000'}/api/weather`);
    const weatherData = weatherRes.data;
    
    // Get motivational message
    const motivationRes = await axios.get(`${process.env.APP_URL || 'http://localhost:3000'}/api/motivation`);
    const motivationData = motivationRes.data;
    
    // Generate text content
    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const textContent = `
      Good morning! It's ${currentDate}.
      Here's your daily weather update:
      The current temperature in ${weatherData.city} is ${Math.round(weatherData.temperature)} degrees Celsius.
      The weather condition is ${weatherData.description}.
      Humidity is at ${weatherData.humidity} percent, and wind speed is ${weatherData.windSpeed} meters per second.
      
      And here's your daily motivation:
      ${motivationData.quote}
      By ${motivationData.author}
      
      Have a wonderful day ahead!
    `.trim();
    
    // For demonstration purposes, we're not using a real TTS API
    // In a production app, you would use something like:
    // - Google Text-to-Speech API
    // - OpenAI TTS API
    // - AWS Polly
    // - ElevenLabs
    
    // In a real implementation, this would be where you'd generate the actual audio file
    // For now, we'll just return a placeholder URL to a sample file
    const audioUrl = '/sample-voice-note.mp3'; // Point to a static file in public directory
    
    // If sendNow is true, we would trigger the sending logic here
    if (sendNow && contactInfo) {
      try {
        await axios.post(`${process.env.APP_URL || 'http://localhost:3000'}/api/send-voice`, {
          audioUrl,
          deliveryMethod,
          contactInfo
        });
      } catch (error) {
        console.error('Error sending voice note:', error);
      }
    }
    
    return NextResponse.json({
      success: true,
      audioUrl,
      text: textContent,
    });
  } catch (error) {
    console.error('Error generating voice note:', error);
    return NextResponse.json(
      { error: 'Failed to generate voice note' },
      { status: 500 }
    );
  }
} 