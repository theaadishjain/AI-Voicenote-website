import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export interface ElevenLabsVoice {
  voice_id: string;
  name: string;
  category?: string;
  description?: string;
}

interface SynthesisOptions {
  text: string;
  voice_id?: string;
  stability?: number;
  similarityBoost?: number;
  speakerBoost?: boolean;
  style?: number;
}

export async function getAvailableVoices(): Promise<ElevenLabsVoice[]> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    throw new Error('ELEVENLABS_API_KEY is not defined in environment variables');
  }

  try {
    const response = await axios.get('https://api.elevenlabs.io/v1/voices', {
      headers: {
        'xi-api-key': apiKey,
      },
    });

    return response.data.voices;
  } catch (error: any) {
    console.error('Error fetching ElevenLabs voices:', error.message);
    throw new Error(`Failed to fetch ElevenLabs voices: ${error.message}`);
  }
}

export async function synthesizeSpeech(text: string): Promise<string> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    throw new Error('ELEVENLABS_API_KEY is not defined in environment variables');
  }

  // Default voice ID - Rachel
  const voiceId = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM';

  try {
    // Prepare the request options
    const options = {
      method: 'POST',
      url: `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg'
      },
      data: {
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.6,
          similarity_boost: 0.75,
          style: 0.0,
          use_speaker_boost: true
        }
      },
      responseType: 'arraybuffer' as const
    };

    console.log(`Calling ElevenLabs API to synthesize speech (text length: ${text.length})`);
    const response = await axios(options);
    
    // Create a unique filename
    const fileName = `voice-note-${uuidv4()}.mp3`;
    const audioDir = path.join(process.cwd(), 'public', 'audio');
    const audioPath = path.join(audioDir, fileName);
    
    // Ensure the audio directory exists
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }
    
    // Save the audio file
    fs.writeFileSync(audioPath, Buffer.from(response.data));
    
    // Return the path to the audio file relative to the public directory
    return `/audio/${fileName}`;
  } catch (error: any) {
    console.error('Error synthesizing speech with ElevenLabs:', error.message);
    if (error.response) {
      console.error('ElevenLabs API error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      });
    }
    throw new Error(`Failed to synthesize speech: ${error.message}`);
  }
} 