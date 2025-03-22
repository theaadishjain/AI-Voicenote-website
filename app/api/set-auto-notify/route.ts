import { NextResponse } from 'next/server';
import cron from 'node-cron';
import axios from 'axios';

type AutoNotifyRequest = {
  enabled: boolean;
  time: string; // Time in format "HH:MM"
  deliveryMethod: 'email' | 'telegram';
  contactInfo: string;
  city?: string; // Optional city parameter
};

// In a real app, these settings would be stored in a database
// For simplicity, we'll simulate storing in memory
let autoNotifySettings: { 
  enabled: boolean;
  time: string;
  cronExpression: string;
  deliveryMethod: 'email' | 'telegram';
  contactInfo: string;
  city: string; // Added city field
} | null = null;

// Store the scheduled task so we can stop it if needed
let scheduledTask: cron.ScheduledTask | null = null;

export async function GET() {
  return NextResponse.json({ 
    settings: autoNotifySettings ? {
      enabled: autoNotifySettings.enabled,
      time: autoNotifySettings.time,
      deliveryMethod: autoNotifySettings.deliveryMethod,
      contactInfo: autoNotifySettings.contactInfo,
      city: autoNotifySettings.city
    } : null
  });
}

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
    
    // Validate delivery method and contact info
    if (body.enabled) {
      if (!body.deliveryMethod) {
        return NextResponse.json(
          { error: 'Delivery method is required when enabling auto notifications.' },
          { status: 400 }
        );
      }
      
      if (!body.contactInfo) {
        return NextResponse.json(
          { error: 'Contact information is required when enabling auto notifications.' },
          { status: 400 }
        );
      }
      
      // Check if delivery method is supported
      if (body.deliveryMethod !== 'email' && body.deliveryMethod !== 'telegram') {
        return NextResponse.json(
          { error: 'Unsupported delivery method. Supported methods: email, telegram' },
          { status: 400 }
        );
      }
    }
    
    // Parse time into cron expression
    const [hours, minutes] = body.time ? body.time.split(':') : ['6', '0'];
    const cronExpression = `${minutes} ${hours} * * *`;
    
    // Update the settings
    autoNotifySettings = {
      enabled: body.enabled,
      time: body.time || '06:00', // Default to 6 AM
      cronExpression,
      deliveryMethod: body.deliveryMethod || 'email',
      contactInfo: body.contactInfo || '',
      city: body.city || 'London' // Default to London if not provided
    };
    
    // In a real app, you would save this to a database
    console.log('Auto-notify settings updated:', autoNotifySettings);
    
    // Handle scheduling with node-cron
    if (scheduledTask) {
      // Stop any existing scheduled task
      scheduledTask.stop();
      scheduledTask = null;
    }
    
    if (body.enabled) {
      // Schedule task to run at the specified time
      scheduledTask = cron.schedule(cronExpression, async () => {
        try {
          console.log(`Running scheduled task at ${new Date().toISOString()}`);
          
          // Get current weather data first for the selected city
          const weatherRes = await axios.get(
            `${process.env.APP_URL || 'http://localhost:3000'}/api/weather?city=${encodeURIComponent(autoNotifySettings?.city || 'London')}`
          );
          const weatherData = weatherRes.data;
          
          // Get motivational message
          const motivationRes = await axios.get(
            `${process.env.APP_URL || 'http://localhost:3000'}/api/motivation`
          );
          const motivationalMessage = motivationRes.data?.quote;
          
          // Generate voice note with the weather data
          const generateRes = await axios.post(
            `${process.env.APP_URL || 'http://localhost:3000'}/api/generate-voice`, 
            { 
              weatherData: {
                location: weatherData.city,
                temperature: weatherData.temperature,
                description: weatherData.description,
                humidity: weatherData.humidity,
                wind: weatherData.windSpeed
              },
              motivationalMessage,
              deliveryMethod: autoNotifySettings?.deliveryMethod,
              contactInfo: autoNotifySettings?.contactInfo,
              sendNow: true
            }
          );
          
          console.log('Auto-notification generated:', generateRes.data);
        } catch (error) {
          console.error('Failed to send auto-notification:', error);
        }
      });
      
      console.log(`Scheduled task set for ${cronExpression} (${body.time})`);
    }
    
    return NextResponse.json({ 
      success: true,
      message: `Auto notifications ${body.enabled ? 'enabled' : 'disabled'}${body.enabled ? ` at ${autoNotifySettings.time} for ${autoNotifySettings.city} via ${autoNotifySettings.deliveryMethod}` : ''}`,
      settings: {
        enabled: autoNotifySettings.enabled,
        time: autoNotifySettings.time,
        deliveryMethod: autoNotifySettings.deliveryMethod,
        contactInfo: autoNotifySettings.contactInfo,
        city: autoNotifySettings.city
      }
    });
  } catch (err) {
    console.error('Error setting auto-notify:', err);
    return NextResponse.json(
      { error: 'Failed to update notification settings' },
      { status: 500 }
    );
  }
} 