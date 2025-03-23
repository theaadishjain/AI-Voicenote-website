import { Metadata } from 'next';
import AutoNotifySettings from '../components/AutoNotifySettings';

export const metadata: Metadata = {
  title: 'Settings | AI Weather Voice',
  description: 'Configure your weather voice notifications settings',
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Settings</h1>
        
        <div className="max-w-2xl mx-auto">
          <AutoNotifySettings />
          
          <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">About</h2>
            <p className="mb-4">
              AI Weather Voice is a service that provides personalized weather updates with 
              motivational messages delivered through various channels including email, 
              Telegram, phone calls, and SMS.
            </p>
            <p>
              Set up automatic notifications to receive daily weather updates at your 
              preferred time, delivered via your preferred method.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 