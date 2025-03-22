import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * GET handler for retrieving the latest voice note
 * This API returns the filename of the most recently created audio file
 */
export async function GET() {
  try {
    // Define the directory where audio files are stored
    const audioDir = path.join(process.cwd(), 'public', 'audio');
    
    // Ensure the directory exists
    if (!fs.existsSync(audioDir)) {
      return NextResponse.json({
        error: 'No voice notes available'
      }, { status: 404 });
    }
    
    // Get all files in the directory
    const files = fs.readdirSync(audioDir);
    
    // Filter for mp3 files
    const audioFiles = files.filter(file => file.endsWith('.mp3'));
    
    if (audioFiles.length === 0) {
      return NextResponse.json({
        error: 'No voice notes available'
      }, { status: 404 });
    }
    
    // Get file stats to determine the most recent file
    const fileStats = audioFiles.map(file => ({
      name: file,
      stats: fs.statSync(path.join(audioDir, file))
    }));
    
    // Sort by creation time, most recent first
    fileStats.sort((a, b) => b.stats.ctimeMs - a.stats.ctimeMs);
    
    // Get the most recent file
    const latestFile = fileStats[0].name;
    
    return NextResponse.json({
      success: true,
      audioFilename: `/audio/${latestFile}`
    });
  } catch (error) {
    console.error('Error getting latest voice note:', error);
    return NextResponse.json({
      error: 'Failed to get latest voice note'
    }, { status: 500 });
  }
} 