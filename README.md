# AI Weather Voice Assistant

An AI-powered weather voice assistant that delivers personalized weather updates and motivational messages through multiple delivery channels.

## Features

- **Real-time Weather Data**: Get current weather information for any city in the world.
- **AI-Generated Voice**: Convert weather and motivational content into natural-sounding voice notes.
- **Multiple Delivery Methods**: Send voice notes via Email, Telegram, Phone Calls, or SMS.
- **Automatic Notifications**: Schedule daily weather updates at your preferred time.
- **Motivational Messages**: Receive AI-generated motivational quotes alongside your weather updates.
- **City Selection**: Search for any city to get its current weather data.

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-weathervoice.git
cd ai-weathervoice
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file based on `.env.example` and fill in your API keys:
- OpenWeather API for weather data
- Google Gemini AI API for text generation
- ElevenLabs API for voice synthesis
- Email credentials for email delivery
- Telegram Bot Token for Telegram delivery
- Twilio credentials for phone calls and SMS

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Delivery Methods

### Email
Sends the voice note as an audio attachment to the specified email address.

### Telegram
Sends a text message with weather information to the specified Telegram chat ID.

### Phone Call
Uses Twilio to call the specified phone number and play the voice note when the call is answered.

### SMS
Sends an SMS with a link to the voice note using Twilio.

## Automatic Notifications

You can configure automatic daily weather updates:
1. Navigate to the Settings page
2. Enable auto-notifications
3. Set your preferred time, delivery method, and city
4. Save your settings

## Technologies Used

- **Next.js**: React framework for the frontend and API routes
- **Google Gemini AI**: For generating weather updates with motivational content
- **ElevenLabs TTS**: For high-quality text-to-speech conversion
- **Twilio**: For phone call and SMS delivery
- **Node-cron**: For scheduling automatic notifications
- **Tailwind CSS**: For styling the UI

## License

MIT 