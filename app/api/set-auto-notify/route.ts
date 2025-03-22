import { NextResponse } from 'next/server';
import cron from 'node-cron';
import axios from 'axios';

type AutoNotifyRequest = {
  enabled: boolean;
  time: string; // Time in format "HH:MM"
};

// In a real app, this would be stored in a database
// For simplicity, we'll simulate storing in memory
// This variable is kept for future implementation when settings would be retrieved
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let autoNotifySettings: { 
  enabled: boolean;
  time: string;
} | null = null;

// Store the scheduled task so we can stop it if needed
let scheduledTask: cron.ScheduledTask | null = null;

export async function POST(request: Request) {
  try {
    const body = await request.json() as AutoNotifyRequest;
    
    // Validate the time format (should be "HH:MM")
    if (body.enabled && body.time) {
      const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
      if (!timeRegex.test(body.time)) {
        return NextResponse.json(
          { error: 'Invalid time format. Use HH:MM format (24-hour).' },
          { status: 400 }
        );
      }
    }
    
    // Update the settings
    autoNotifySettings = {
      enabled: body.enabled,
      time: body.time || '06:00' // Default to 6 AM
    };
    
    // In a real app, you would save this to a database
    console.log('Auto-notify settings updated:', autoNotifySettings);
    
    // Handle scheduling with node-cron
    if (body.enabled) {
      // Schedule task to run at the specified time
      scheduledTask = cron.schedule(autoNotifySettings.time, async () => {
        try {
          // Generate voice note and send
          const generateRes = await axios.post(`${process.env.APP_URL || 'http://localhost:3000'}/api/generate-voice`, { 
            deliveryMethod: 'email',
            contactInfo: 'user@example.com',
            sendNow: true
          });
          
          console.log('Auto-notification sent:', generateRes.data);
        } catch (error) {
          console.error('Failed to send auto-notification:', error);
        }
      });
    } else if (scheduledTask) {
      // Stop the scheduled task if it exists
      scheduledTask.stop();
      scheduledTask = null;
    }
    
    return NextResponse.json({ 
      success: true,
      message: `Auto notifications ${body.enabled ? 'enabled' : 'disabled'} at ${autoNotifySettings.time}`,
      settings: autoNotifySettings
    });
  } catch (err) {
    console.error('Error setting auto-notify:', err);
    return NextResponse.json(
      { error: 'Failed to update notification settings' },
      { status: 500 }
    );
  }
} 