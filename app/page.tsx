import WeatherDisplay from './components/WeatherDisplay';
import MotivationalMessage from './components/MotivationalMessage';
import VoiceNoteControls from './components/VoiceNoteControls';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-gradient-to-br from-emerald-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-40 left-10 w-72 h-72 bg-pink-400/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          AI Weather Voice Assistant
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Get personalized weather updates and motivation delivered as voice notes
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <WeatherDisplay />
        <MotivationalMessage />
      </div>
      
      <div className="max-w-3xl mx-auto">
        <VoiceNoteControls />
      </div>
      
      <div className="mt-16 glass-card rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 gradient-text">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-emerald-400 to-emerald-600 text-white rounded-xl shadow-md mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.74,5.47C15.1,6.5 16.35,9.03 15.92,11.46C17.19,12.56 18,14.19 18,16V16.17C18.31,16.06 18.65,16 19,16A3,3 0 0,1 22,19A3,3 0 0,1 19,22H6A4,4 0 0,1 2,18A4,4 0 0,1 6,14H6.27C5,12.45 4.6,10.24 5.5,8.26C6.72,5.5 9.97,4.24 12.74,5.47M11.93,7.3C10.16,6.5 8.09,7.31 7.31,9.07C6.85,10.09 6.93,11.22 7.41,12.13C8.5,10.83 10.16,10 12,10C12.7,10 13.38,10.12 14,10.34C13.94,9.06 13.18,7.86 11.93,7.3M13.55,3.64C13,3.4 12.45,3.23 11.88,3.12L14.37,1.82L15.27,4.71C14.76,4.29 14.19,3.93 13.55,3.64M6.09,4.44C5.6,4.79 5.17,5.19 4.8,5.63L4.91,2.82L7.87,3.5C7.25,3.71 6.65,4.03 6.09,4.44M18,9.71C17.91,9.12 17.78,8.55 17.59,8L19.97,9.5L17.92,11.73C18.03,11.08 18.05,10.4 18,9.71M3.04,11.3C3.11,11.9 3.24,12.47 3.43,13L1.06,11.5L3.1,9.28C3,9.93 2.97,10.61 3.04,11.3M19,18H16V16A4,4 0 0,0 12,12A4,4 0 0,0 8,16H6A2,2 0 0,0 4,18A2,2 0 0,0 6,20H19A1,1 0 0,0 20,19A1,1 0 0,0 19,18Z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Weather Updates</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Search for any city to get real-time weather data, including temperature, humidity, and wind conditions.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-pink-400 to-pink-600 text-white rounded-xl shadow-md mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13,2.05V5.08C16.39,5.57 19,8.47 19,12C19,15.87 15.87,19 12,19C8.47,19 5.57,16.39 5.08,13H2.05C2.56,17.84 6.81,21.5 12,21.5C17.33,21.5 21.71,17.43 22,12.45C22.04,7.5 17.74,3.3 13,2.05M13,7V10.41L16.58,14L15.16,15.41L11,11.25V7H13M10,2L3,3L2,10H5C5,8.34 6.34,7 8,7H9.26L10,2M10.23,12H5C5,13.66 6.34,15 8,15H12.68L10.23,12M9.5,5L9.26,7H8C6.69,7 5.5,7.35 4.5,8C4.93,6.7 6.13,5.7 7.5,5.5L9.5,5Z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Daily Motivation</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Receive AI-generated motivational quotes tailored to your weather conditions and time of day.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-indigo-400 to-indigo-600 text-white rounded-xl shadow-md mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Voice Delivery</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get your weather and motivation delivered as natural-sounding voice notes via email or Telegram.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 