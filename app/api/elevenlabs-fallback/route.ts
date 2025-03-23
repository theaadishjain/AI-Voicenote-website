import { NextRequest, NextResponse } from 'next/server';
import { synthesizeSpeech } from '@/app/lib/elevenlabs-tts';
import path from 'path';
import fs from 'fs';
import { writeFile } from 'fs/promises';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = body;
    
    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }
    
    // Create unique filename based on timestamp
    const timestamp = Date.now();
    const filename = `fallback_voice_${timestamp}.mp3`;
    
    // Path to save the audio file
    const audioDir = path.join(process.cwd(), 'public', 'audio');
    
    // Ensure directory exists
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }
    
    // For now, we're returning a success response without actually generating audio
    // In a real implementation, you would use a server-side TTS library like say.js
    // or call another TTS service API
    
    console.log('Using fallback TTS for text:', text.substring(0, 100) + '...');
    
    // Create an empty file so the client has something to reference
    // In a real implementation, this would contain actual audio data
    await writeFile(path.join(audioDir, filename), Buffer.from(''));
    
    return NextResponse.json({
      success: true,
      message: 'Text-to-speech fallback used',
      audioFilename: `/audio/${filename}`,
      isFallback: true
    });
  } catch (error) {
    console.error('Error in fallback TTS:', error);
    return NextResponse.json(
      { error: 'Failed to generate speech' },
      { status: 500 }
    );
  }
} 