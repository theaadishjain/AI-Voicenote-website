import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | AI Weather Voice',
  description: 'Learn about AI Weather Voice and how it works',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">About AI Weather Voice</h1>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">What is AI Weather Voice?</h2>
            <p className="mb-4">
              AI Weather Voice is an innovative application that combines real-time weather data with 
              motivational messages, delivering them as natural-sounding voice notes through multiple channels.
            </p>
            <p>
              Our application uses advanced AI technologies to create personalized weather updates 
              and motivational content that can be delivered via email, Telegram, phone calls, or SMS.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">City Selection</h3>
                <p>
                  Search for any city worldwide to get accurate, up-to-date weather information including 
                  temperature, conditions, humidity, and wind speed.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">AI-Generated Content</h3>
                <p>
                  Our application uses Google's Gemini AI to generate contextual weather reports combined 
                  with motivational messages that adapt to the current weather conditions.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Natural Voice Synthesis</h3>
                <p>
                  Using ElevenLabs' advanced text-to-speech technology, we convert the AI-generated content 
                  into natural-sounding voice notes that feel personal and engaging.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Multiple Delivery Methods</h3>
                <p>
                  Choose how you want to receive your voice notes - via email, Telegram message, 
                  phone call, or SMS - depending on your preference.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Automatic Notifications</h3>
                <p>
                  Schedule daily weather updates at your preferred time, delivered through your 
                  chosen method, to start your day with weather information and motivation.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Delivery Methods</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">Email</h3>
                <p>
                  Receive your voice note as an audio attachment in your email, perfect for listening 
                  when you're ready and having a record of your daily updates.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Telegram</h3>
                <p>
                  Get your weather updates delivered directly to your Telegram chat, where you can 
                  listen to them instantly or save them for later.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Phone Call</h3>
                <p>
                  Receive an actual phone call that plays your weather update and motivational 
                  message, powered by Twilio's voice calling service.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">SMS</h3>
                <p>
                  Get a text message with a link to your voice note, allowing you to listen to it at 
                  your convenience while keeping your notifications simple.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
            <p className="mb-4">
              Our application is built with modern technologies to provide a seamless and reliable experience:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Next.js for the frontend and API routes</li>
              <li>Google Gemini AI for generating personalized content</li>
              <li>ElevenLabs for high-quality text-to-speech conversion</li>
              <li>OpenWeather API for accurate weather data</li>
              <li>Twilio for phone call and SMS delivery</li>
              <li>Node-cron for scheduling automatic notifications</li>
              <li>Tailwind CSS for responsive, modern UI design</li>
            </ul>
          </div>
          
          <div className="text-center">
            <Link href="/settings" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
              Configure Auto-Notifications
              <ArrowRight className="h-5 w-5 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 