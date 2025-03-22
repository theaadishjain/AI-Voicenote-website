import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import { generateWeatherUpdate } from '@/app/lib/gemini-api';
import { synthesizeSpeech } from '@/app/lib/google-tts';
import { v4 as uuidv4 } from 'uuid';

// Define the expected request body type
interface GenerateVoiceRequest {
  weatherData: {
    location: string;
    temperature: number;
    description: string;
    humidity: number;
    wind: number;
  };
  motivationalMessage?: string;
  deliveryMethod?: 'email' | 'telegram';
  contactInfo?: string;
  sendNow?: boolean;
}

/**
 * POST handler for the generate-voice API endpoint
 * Generates a personalized voice message based on weather data and motivational content
 * Uses Gemini API to create the message text and Google TTS to convert it to speech
 */
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json() as GenerateVoiceRequest;
    const { weatherData, motivationalMessage, deliveryMethod, contactInfo, sendNow } = body;
    
    // Validate that weather data is provided
    if (!weatherData) {
      return NextResponse.json(
        { error: 'Weather data is required' },
        { status: 400 }
      );
    }
    
    // Extract weather information
    const { location, temperature, description, humidity, wind } = weatherData;
    
    // Validate required weather fields
    if (!location || temperature === undefined || !description) {
      return NextResponse.json(
        { error: 'Weather data must include location, temperature, and description' },
        { status: 400 }
      );
    }
    
    console.log('Generating voice content for:', location, description);
    
    // Generate the voice content text using Gemini API
    const voiceContent = await generateWeatherUpdate({
      city: location,
      temperature,
      description,
      humidity,
      windSpeed: wind
    }, {
      quote: motivationalMessage || '',
      author: ''
    });
    
    if (!voiceContent) {
      return NextResponse.json(
        { error: 'Failed to generate voice content' },
        { status: 500 }
      );
    }
    
    // Create a unique filename for the audio file
    const fileName = `voice-note-${uuidv4()}.mp3`;
    const audioDir = path.join(process.cwd(), 'public', 'audio');
    const audioPath = path.join(audioDir, fileName);
    const audioUrl = `/audio/${fileName}`;
    
    // Ensure the audio directory exists
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }
    
    // Convert the text to speech using Google TTS
    const audioBuffer = await synthesizeSpeech(voiceContent);
    
    // Save the audio file
    fs.writeFileSync(audioPath, audioBuffer);
    
    console.log('Voice note generated:', audioUrl);
    
    // If sendNow is true, we would trigger the sending logic here
    if (sendNow && contactInfo && deliveryMethod) {
      try {
        await axios.post(`${process.env.APP_URL || 'http://localhost:3000'}/api/send-voice`, {
          audioFilename: audioUrl,
          deliveryMethod,
          contactInfo,
          message: voiceContent
        });
      } catch (error) {
        console.error('Error sending voice note:', error);
        // We continue and return the generated voice note even if sending fails
      }
    }
    
    // Return the URL and content of the generated voice note
    return NextResponse.json({
      success: true,
      audioUrl,
      content: voiceContent
    });
  } catch (error) {
    console.error('Error generating voice note:', error);
    return NextResponse.json(
      { error: 'Failed to generate voice note' },
      { status: 500 }
    );
  }
} 