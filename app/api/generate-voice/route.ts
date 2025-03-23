import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import { generateWeatherUpdate } from '@/app/lib/gemini-api';
import { synthesizeSpeech } from '@/app/lib/elevenlabs-tts';
import { v4 as uuidv4 } from 'uuid';
import { weatherData } from '@/app/types';

// Define the expected request body type
interface GenerateVoiceRequest {
  weatherData: weatherData;
  motivationalMessage?: string;
  deliveryMethod?: 'email' | 'telegram' | 'twilio-call' | 'twilio-sms';
  contactInfo?: string;
  sendNow?: boolean;
}

// Maximum retries for speech synthesis
const MAX_RETRIES = 2;

// Simple fallback text-to-speech function (for when ElevenLabs is not available)
async function fallbackTTS(text: string): Promise<Buffer> {
  try {
    // Use a free TTS API as fallback
    const response = await axios({
      method: 'GET',
      url: `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
        text.substring(0, 200)  // Limit length for free API
      )}&tl=en&client=tw-ob`,
      responseType: 'arraybuffer'
    });
    
    return Buffer.from(response.data);
  } catch (error) {
    console.error('Fallback TTS failed:', error);
    throw new Error('Both primary and fallback TTS failed');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as GenerateVoiceRequest;
    const { weatherData, motivationalMessage, sendNow, deliveryMethod, contactInfo } = body;

    // Validate input
    if (!weatherData) {
      return NextResponse.json(
        { error: 'Weather data is required' },
        { status: 400 }
      );
    }

    // Explicitly log the received weatherData for debugging
    console.log('Received weather data:', JSON.stringify(weatherData));

    const { city, temperature, description } = weatherData;
    if (!city || temperature === undefined || !description) {
      return NextResponse.json(
        { error: 'Weather data must include city, temperature, and description' },
        { status: 400 }
      );
    }

    console.log('Generating voice note for', city);
    console.log('Weather:', temperature, description);
    if (motivationalMessage) {
      console.log('Motivational message:', motivationalMessage);
    }

    try {
      // Generate voice content using Gemini
      const voiceContent = await generateWeatherUpdate(weatherData, motivationalMessage);
      console.log('Generated voice content:', voiceContent.substring(0, 100) + '...');

      // Try to synthesize speech with ElevenLabs first
      let audioFilename = '';
      let usedFallback = false;
      let maxRetries = 2;
      let retryCount = 0;
      let error = null;

      while (retryCount <= maxRetries) {
        try {
          console.log(`ElevenLabs synthesis attempt ${retryCount + 1}/${maxRetries + 1}`);
          audioFilename = await synthesizeSpeech(voiceContent);
          console.log('Successfully generated audio:', audioFilename);
          break;
        } catch (err) {
          error = err;
          console.error(`ElevenLabs synthesis attempt ${retryCount + 1} failed:`, err);
          retryCount++;
          
          if (retryCount > maxRetries) {
            console.log('All ElevenLabs attempts failed, trying fallback TTS...');
            
            // Use fallback TTS service
            try {
              const fallbackResponse = await fetch(new URL('/api/elevenlabs-fallback', request.url).toString(), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: voiceContent }),
              });
              
              if (!fallbackResponse.ok) {
                throw new Error(`Fallback TTS failed with status: ${fallbackResponse.status}`);
              }
              
              const fallbackData = await fallbackResponse.json();
              audioFilename = fallbackData.audioFilename;
              usedFallback = true;
              console.log('Successfully used fallback TTS:', audioFilename);
            } catch (fallbackErr) {
              console.error('Fallback TTS also failed:', fallbackErr);
              throw new Error('Both primary and fallback TTS services failed');
            }
          }
        }
      }

      if (!audioFilename) {
        throw new Error('Failed to generate audio');
      }

      // If sendNow is true, send the voice note immediately
      let sendResult = null;
      if (sendNow && deliveryMethod && contactInfo) {
        try {
          // Implementation for sending the voice note via the specified delivery method
          // This could be email, SMS, etc.
          console.log(`Sending voice note via ${deliveryMethod} to ${contactInfo}`);
          
          // Send the voice note
          const sendResponse = await fetch(new URL('/api/send-voice', request.url).toString(), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              audioFilename,
              deliveryMethod,
              contactInfo,
              weatherData,
            }),
          });
          
          sendResult = await sendResponse.json();
          console.log('Send result:', sendResult);
        } catch (err) {
          console.error('Error sending voice note:', err);
          return NextResponse.json(
            { 
              error: 'Failed to send voice note',
              audioFilename, // Still return the audio filename so client can play it
              usedFallback
            },
            { status: 500 }
          );
        }
      }

      return NextResponse.json({
        success: true,
        audioFilename,
        sendResult,
        usedFallback
      });
    } catch (error: any) {
      console.error('Error generating voice note:', error);
      return NextResponse.json(
        { error: 'Failed to generate voice note', details: error.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
} 