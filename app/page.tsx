import WeatherDisplay from './components/WeatherDisplay';
import MotivationalMessage from './components/MotivationalMessage';
import VoiceNoteControls from './components/VoiceNoteControls';

export default function Home() {
  return (
    <div className="py-8 px-4 sm:px-6 md:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 mb-4">
            Your Daily Voice Assistant
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Get personalized weather reports and motivational quotes delivered to you every day,
            exactly when you need them.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <WeatherDisplay />
          <MotivationalMessage />
        </div>
        
        <div className="mt-8">
          <VoiceNoteControls />
        </div>
      </div>
    </div>
  );
} 