import { NextResponse } from 'next/server';
import cron from 'node-cron';
import axios from 'axios';

type AutoNotifyRequest = {
  enabled: boolean;
  time: string; // Time in format "HH:MM"
  deliveryMethod: 'email' | 'telegram' | 'twilio-call' | 'twilio-sms';
  contactInfo: string;
  city?: string; // Optional city parameter
};

// In-memory storage for the auto-notification settings
let autoNotifySettings: AutoNotifyRequest | null = null;

// Store the scheduled task so we can cancel it if needed
let scheduledTask: cron.ScheduledTask | null = null;

/**
 * GET handler for the auto-notify API
 * Returns the current auto-notification settings
 */
export async function GET() {
  return NextResponse.json({
    enabled: !!autoNotifySettings,
    settings: autoNotifySettings
  });
}

/**
 * POST handler for the auto-notify API
 * Updates the auto-notification settings
 */
export async function POST(request: Request) {
  try {
    const body = await request.json() as AutoNotifyRequest;
    
    // If disabling, just update the settings
    if (!body.enabled) {
      if (scheduledTask) {
        scheduledTask.stop();
        scheduledTask = null;
        console.log('Auto-notifications disabled and scheduled task stopped');
      }
      
      autoNotifySettings = null;
      
      return NextResponse.json({ 
        success: true,
        message: 'Auto notifications disabled',
        settings: null
      });
    }
    
    // From here on, we're enabling notifications, so validate everything
    
    // Validate time format (should be "HH:MM")
    if (!body.time) {
      return NextResponse.json(
        { error: 'Time is required when enabling auto notifications' },
        { status: 400 }
      );
    }
    
    const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
    if (!timeRegex.test(body.time)) {
      return NextResponse.json(
        { error: 'Invalid time format. Use HH:MM format (24-hour).' },
        { status: 400 }
      );
    }
    
    // Validate delivery method
    if (!body.deliveryMethod) {
      return NextResponse.json(
        { error: 'Delivery method is required when enabling auto notifications.' },
        { status: 400 }
      );
    }
    
    // Check if delivery method is supported
    const supportedMethods = ['email', 'telegram', 'twilio-call', 'twilio-sms'];
    if (!supportedMethods.includes(body.deliveryMethod)) {
      return NextResponse.json(
        { error: `Unsupported delivery method. Supported methods: ${supportedMethods.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Validate contact info
    if (!body.contactInfo) {
      return NextResponse.json(
        { error: 'Contact information is required when enabling auto notifications.' },
        { status: 400 }
      );
    }
    
    // Additional validation based on delivery method
    if (body.deliveryMethod === 'email' && !body.contactInfo.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }
    
    if ((body.deliveryMethod === 'twilio-call' || body.deliveryMethod === 'twilio-sms') && 
        !body.contactInfo.match(/^\+?[1-9]\d{1,14}$/)) {
      return NextResponse.json(
        { error: 'Please provide a valid phone number in E.164 format (e.g., +1234567890).' },
        { status: 400 }
      );
    }
    
    // Store the settings in memory
    autoNotifySettings = {
      enabled: true,
      time: body.time,
      deliveryMethod: body.deliveryMethod,
      contactInfo: body.contactInfo,
      city: body.city || 'London'
    };
    
    // Parse the time into hours and minutes for cron
    const [hours, minutes] = body.time.split(':');
    const cronExpression = `${minutes} ${hours} * * *`;
    console.log(`Scheduling auto notifications for ${cronExpression}`);
    
    // Stop existing scheduled task if there is one
    if (scheduledTask) {
      scheduledTask.stop();
      console.log('Stopped existing scheduled task');
    }
    
    // Schedule task to run at the specified time
    scheduledTask = cron.schedule(cronExpression, async () => {
      try {
        console.log(`Running scheduled task at ${new Date().toISOString()}`);
        
        // Check if required API keys are available
        if (!process.env.OPENWEATHER_API_KEY) {
          console.error('Missing OpenWeather API key, cannot fetch weather data for auto-notification');
          return;
        }
        
        // Get current weather data first for the selected city
        const city = autoNotifySettings?.city || 'London';
        console.log(`Fetching weather data for ${city}`);
        
        const weatherRes = await axios.get(
          `${process.env.APP_URL || 'http://localhost:3000'}/api/weather?city=${encodeURIComponent(city)}`
        );
        const weatherData = weatherRes.data;
        
        // Get motivational message
        console.log('Fetching motivational message');
        const motivationRes = await axios.get(
          `${process.env.APP_URL || 'http://localhost:3000'}/api/motivation`
        );
        const motivationalMessage = motivationRes.data?.quote;
        
        // Verify we still have settings
        if (!autoNotifySettings) {
          console.error('Auto notification settings lost during execution');
          return;
        }
        
        // Check required API keys for chosen delivery method
        if (
          (autoNotifySettings.deliveryMethod === 'email' && (!process.env.EMAIL_USER || !process.env.EMAIL_PASS)) ||
          (autoNotifySettings.deliveryMethod === 'telegram' && !process.env.TELEGRAM_BOT_TOKEN) ||
          ((autoNotifySettings.deliveryMethod === 'twilio-call' || autoNotifySettings.deliveryMethod === 'twilio-sms') && 
           (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN))
        ) {
          console.error(`Missing API credentials for ${autoNotifySettings.deliveryMethod}, skipping auto-notification`);
          return;
        }
        
        // Generate voice note with the weather data
        console.log('Generating voice note with current weather data');
        
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
            deliveryMethod: autoNotifySettings.deliveryMethod,
            contactInfo: autoNotifySettings.contactInfo,
            sendNow: true
          }
        );
        
        console.log('Auto-notification generated and sent successfully:', generateRes.data);
      } catch (error) {
        console.error('Failed to send auto-notification:', error);
      }
    });
    
    // Start the task
    scheduledTask.start();
    console.log('Scheduled task started');
    
    return NextResponse.json({
      success: true,
      message: `Auto notifications enabled for ${body.city || 'London'} at ${body.time} via ${body.deliveryMethod}`,
      settings: autoNotifySettings
    });
  } catch (error) {
    console.error('Error setting auto notifications:', error);
    return NextResponse.json(
      { 
        error: 'Failed to set auto notifications',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 