# AI Morning Voice Note: Daily Weather & Motivation

A web application that automatically generates and sends personalized voice notes with weather information and motivational messages.

## Features

- **Current Weather Information**: Fetches real-time weather data for the user's location
- **Daily Motivational Messages**: Provides an inspiring quote each day
- **Text-to-Speech Conversion**: Converts text to speech for audio playback
- **Multiple Delivery Methods**: Send via Email, WhatsApp, or Telegram
- **Automated Daily Notifications**: Schedule voice notes to be sent at 6 AM daily
- **Manual Trigger**: Generate and send voice notes on demand

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **APIs**: 
  - Weather data from OpenWeatherMap
  - Text-to-Speech conversion (placeholder for integration)
  - Email delivery with Nodemailer (placeholder for integration)
  - WhatsApp/Telegram integration (placeholder)
- **Automation**: Node-cron for scheduling (placeholder for implementation)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone this repository
```
git clone https://github.com/yourusername/ai-weathervoice.git
cd ai-weathervoice
```

2. Install dependencies
```
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
OPENWEATHER_API_KEY=your_openweather_api_key
APP_URL=http://localhost:3000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

4. Start the development server
```
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Current Implementation Status

This is a prototype/demo implementation with the following limitations:

- **Weather API**: Functional with OpenWeatherMap API (requires API key)
- **Voice Generation**: Currently mocked - would need integration with a TTS service
- **Email Delivery**: Currently mocked - would need proper Nodemailer setup
- **WhatsApp/Telegram**: Currently mocked - would need proper API integration
- **Scheduling**: Logic included but not fully implemented - needs proper cron setup

## Future Enhancements

- Add user accounts and authentication
- Implement actual Text-to-Speech with Google TTS, OpenAI TTS, or AWS Polly
- Set up proper email delivery with Nodemailer
- Integrate WhatsApp using Twilio API
- Create a mobile app version
- Add customizable voice options
- Implement geolocation for automatic weather detection
- Store user preferences in a database 