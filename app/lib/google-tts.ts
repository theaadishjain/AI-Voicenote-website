import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { writeFile } from 'fs/promises';
import path from 'path';

export interface TTSOptions {
  text: string;
  languageCode?: string;
  voiceName?: string;
  gender?: 'MALE' | 'FEMALE' | 'NEUTRAL';
  audioEncoding?: 'MP3' | 'OGG_OPUS';
}

/**
 * Synthesize speech from text using Google Cloud Text-to-Speech API
 * @param options - Configuration options for text-to-speech
 * @returns Promise resolving to the audio buffer
 */
export const synthesizeSpeech = async (
  options: TTSOptions | string
): Promise<Buffer> => {
  try {
    // If options is a string, convert it to TTSOptions
    const ttsOptions: TTSOptions = typeof options === 'string' 
      ? { text: options } 
      : options;
    
    // Check if credentials are properly configured
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      console.error('GOOGLE_APPLICATION_CREDENTIALS not found in environment variables');
      throw new Error('TTS API credentials are not configured');
    }
    
    // Initialize TTS client
    const client = new TextToSpeechClient();
    
    // Build the request
    const request = {
      input: { text: ttsOptions.text },
      voice: {
        languageCode: ttsOptions.languageCode || 'en-US',
        name: ttsOptions.voiceName || 'en-US-Neural2-F',
        ssmlGender: ttsOptions.gender || 'FEMALE',
      },
      audioConfig: {
        audioEncoding: ttsOptions.audioEncoding === 'OGG_OPUS' ? 'OGG_OPUS' : 'MP3',
      },
    };
    
    // Perform the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    
    if (!response.audioContent) {
      throw new Error('Failed to generate audio content');
    }
    
    // Return the audio buffer directly
    return response.audioContent as Buffer;
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    throw new Error('Failed to synthesize speech');
  }
};

/**
 * Legacy function to synthesize speech and save to file
 * @param options - Configuration options for text-to-speech
 * @returns Promise resolving to the file path
 */
export const synthesizeSpeechToFile = async (options: TTSOptions): Promise<string> => {
  try {
    // Get the audio buffer
    const audioBuffer = await synthesizeSpeech(options);
    
    // Create unique filename based on timestamp
    const timestamp = Date.now();
    const fileExtension = options.audioEncoding === 'OGG_OPUS' ? 'ogg' : 'mp3';
    const filename = `voice_note_${timestamp}.${fileExtension}`;
    
    // Ensure public directory exists and has a voice-notes subdirectory
    const voiceNotesDir = path.join(process.cwd(), 'public', 'voice-notes');
    
    // Write the audio content to a file in the public directory
    await writeFile(
      path.join(voiceNotesDir, filename),
      audioBuffer
    );
    
    // Return the path relative to the public directory
    return `/voice-notes/${filename}`;
  } catch (error) {
    console.error('Error saving speech to file:', error);
    throw new Error('Failed to save speech to file');
  }
}; 