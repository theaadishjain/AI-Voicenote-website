# AI Weather Voice Assistant

A modern web application that provides personalized weather updates and motivational messages delivered as voice notes via Telegram or email.

## Features

- **Real-time Weather Updates**: Fetches current weather data based on user location
- **Motivational Messages**: Delivers AI-generated motivational quotes tailored to the weather
- **Voice Note Delivery**: Converts messages to natural-sounding voice notes
- **Multiple Delivery Methods**: Send voice notes via Telegram or email
- **Auto Notifications**: Schedule daily updates at your preferred time
- **Modern UI**: Clean, responsive design with glass-card effects and dynamic weather themes

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **AI Integration**: Google Gemini API for generating motivational content
- **Text-to-Speech**: Google Cloud TTS for natural voice conversion
- **Messaging**: Telegram Bot API for message delivery
- **Styling**: Custom CSS with glass morphism effects and dynamic themes

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Google Cloud account (for TTS)
- Gemini API access
- Telegram Bot (optional, for Telegram delivery)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ai-weathervoice.git
   cd ai-weathervoice
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file based on the `.env.example` template:
   ```
   cp .env.example .env.local
   ```

4. Fill in your API keys and credentials in the `.env.local` file

5. Start the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### API Setup

#### Google Cloud TTS
1. Create a Google Cloud account and enable the Text-to-Speech API
2. Create a service account with Text-to-Speech access permissions
3. Download the JSON credentials file
4. Set the path to this file in your `.env.local`

#### Telegram Bot
1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Create a new bot with `/newbot` command
3. Copy the API token to your `.env.local` file
4. Start a conversation with your bot to enable messaging

## Usage

1. View the current weather on the home page
2. Read the AI-generated motivational message
3. Use the Voice Note Controls to:
   - Generate a new voice message
   - Choose delivery method (Telegram or Email)
   - Set up auto-notifications at your preferred time

## Project Structure

```
├── app/
│   ├── api/                 # API routes
│   ├── components/          # React components
│   ├── lib/                 # Utility functions
│   ├── globals.css          # Global styles
│   └── page.tsx             # Home page
├── public/                  # Static assets
└── .env.example             # Environment variables template
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 