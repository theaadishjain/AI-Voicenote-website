import { NextRequest, NextResponse } from 'next/server';
import { getAvailableVoices } from '@/app/lib/elevenlabs-tts';

/**
 * GET handler for the voices API endpoint
 * Lists all available voices from ElevenLabs
 */
export async function GET(req: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.ELEVENLABS_API_KEY) {
      return NextResponse.json(
        { error: 'ElevenLabs API key not configured' },
        { status: 500 }
      );
    }
    
    // Get available voices
    const voices = await getAvailableVoices();
    
    if (!voices || voices.length === 0) {
      return NextResponse.json(
        { error: 'No voices found or error fetching voices' },
        { status: 404 }
      );
    }
    
    // Return the list of voices
    return NextResponse.json({
      success: true,
      count: voices.length,
      voices: voices
    });
  } catch (error: any) {
    console.error('Error fetching voices:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch available voices',
        details: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
} 