'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type DeliveryMethod = 'email' | 'telegram';

export default function VoiceNoteControls() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- will be used in future function implementations
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('email');
  const [contactInfo, setContactInfo] = useState('');
  const [contactPlaceholder, setContactPlaceholder] = useState('user@example.com');
  const [autoNotify, setAutoNotify] = useState(false);
  const [notificationTime, setNotificationTime] = useState('06:00');
  const router = useRouter();

  const deliveryMethods = [
    { value: 'email', label: 'Email' },
    { value: 'telegram', label: 'Telegram' }
    // Removed WhatsApp as it's not currently supported
  ];

  // Update placeholder based on delivery method
  const handleDeliveryMethodChange = (method: DeliveryMethod) => {
    setDeliveryMethod(method);
    switch (method) {
      case 'email':
        setContactPlaceholder('user@example.com');
        break;
      case 'telegram':
        setContactPlaceholder('Chat ID (e.g., 123456789)');
        break;
    }
  };

  const handleGenerateVoice = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Get the city name from the URL search params (if available)
      const urlParams = new URLSearchParams(window.location.search);
      const city = urlParams.get('city') || 'London';
      
      // Get weather data from the weather API for the selected city
      const weatherResponse = await axios.get(`/api/weather?city=${encodeURIComponent(city)}`);
      const weatherData = weatherResponse.data;
      
      // Get motivational message
      const motivationResponse = await axios.get('/api/motivation');
      const motivationalMessage = motivationResponse.data?.quote;
      
      // Call the generate-voice API with weather data and optional motivational message
      const response = await axios.post('/api/generate-voice', {
        weatherData: {
          location: weatherData.city,
          temperature: weatherData.temperature,
          description: weatherData.description,
          humidity: weatherData.humidity,
          wind: weatherData.windSpeed
        },
        motivationalMessage
      });
      
      setSuccess('Voice generated successfully!');
      // Refresh the page to update the voice note
      router.refresh();
    } catch (err) {
      console.error('Error generating voice:', err);
      setError('Failed to generate voice. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendVoice = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // Validate contact info
    if (!contactInfo) {
      setError(`Please enter a valid ${deliveryMethod === 'email' ? 'email address' : 'chat ID'}.`);
      setIsLoading(false);
      return;
    }
    
    try {
      // First, get the audio filename
      const voiceResponse = await axios.get('/api/latest-voice');
      const { audioFilename } = voiceResponse.data;
      
      if (!audioFilename) {
        throw new Error('No voice note available. Please generate one first.');
      }
      
      // Now send the voice note with the correct parameters
      await axios.post('/api/send-voice', { 
        audioFilename,
        deliveryMethod,
        contactInfo
      });
      
      setSuccess(`Voice sent successfully via ${deliveryMethod}!`);
    } catch (err) {
      console.error('Error sending voice:', err);
      setError(`Failed to send voice via ${deliveryMethod}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetAutoNotify = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    // Validate contact info for auto notifications
    if (autoNotify && !contactInfo) {
      setError(`Please enter a valid ${deliveryMethod === 'email' ? 'email address' : 'chat ID'} for notifications.`);
      setIsLoading(false);
      return;
    }
    
    try {
      // Get the city from URL parameters or use the default
      const urlParams = new URLSearchParams(window.location.search);
      const city = urlParams.get('city') || 'London';
      
      await axios.post('/api/set-auto-notify', { 
        enabled: autoNotify,
        time: notificationTime,
        deliveryMethod,
        contactInfo,
        city // Add the city parameter
      });
      setSuccess(`Auto notifications ${autoNotify ? `enabled for ${city}` : 'disabled'} at ${notificationTime}!`);
    } catch (err) {
      console.error('Error setting auto notify:', err);
      setError('Failed to update notification settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-emerald-400/10 rounded-full"></div>
      <div className="absolute -left-12 -top-12 w-48 h-48 bg-pink-400/10 rounded-full"></div>
      
      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-pink-400 to-pink-600 text-white rounded-xl shadow-sm">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold ml-2">Voice Controls</h2>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg" role="alert">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 p-4 mb-6 rounded-lg" role="alert">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm">{success}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-8">
          <div>
            <button
              onClick={handleGenerateVoice}
              disabled={isLoading}
              className="w-full btn-primary"
            >
              {isLoading ? (
                <div className="inline-block animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full mr-2" />
              ) : (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
                </svg>
              )}
              {isLoading ? 'Generating...' : 'Generate Voice Note'}
            </button>
          </div>

          <div>
            <div className="space-y-3">
              <div className="flex items-center">
                <select
                  className="input-field flex-grow"
                  value={deliveryMethod}
                  onChange={(e) => handleDeliveryMethodChange(e.target.value as DeliveryMethod)}
                  disabled={isLoading}
                >
                  {deliveryMethods.map((method) => (
                    <option key={method.value} value={method.value}>
                      {method.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="text"
                  className="input-field flex-grow"
                  placeholder={contactPlaceholder}
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendVoice}
                  disabled={isLoading}
                  className="btn-secondary ml-2 flex-none flex items-center justify-center px-4 py-2.5"
                >
                  {isLoading ? (
                    <div className="inline-block animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full mr-2" />
                  ) : (
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
                    </svg>
                  )}
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-100 dark:border-zinc-700/50">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,4M12.5,8H11V14L15.75,16.85L16.5,15.62L12.5,13.25V8M7.88,3.39L6.6,1.86L2,5.71L3.29,7.24L7.88,3.39M22,5.72L17.4,1.86L16.11,3.39L20.71,7.25L22,5.72Z" />
            </svg>
            Auto Notifications
          </h3>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-center mb-6">
            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  className="sr-only peer"
                  checked={autoNotify}
                  onChange={() => setAutoNotify(!autoNotify)}
                  disabled={isLoading}
                />
                <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-zinc-600 peer-checked:bg-emerald-500"></div>
                <span className="ml-3 text-gray-900 dark:text-gray-300 font-medium">
                  {autoNotify ? 'Enabled' : 'Disabled'}
                </span>
              </label>
            </div>
            
            <div className="flex items-center space-x-3">
              <label className="text-gray-700 dark:text-gray-300 font-medium min-w-24">Time:</label>
              <input
                type="time"
                className="input-field flex-grow"
                value={notificationTime}
                onChange={(e) => setNotificationTime(e.target.value)}
                disabled={isLoading || !autoNotify}
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleSetAutoNotify}
              disabled={isLoading}
              className="btn-outline text-sm"
            >
              {isLoading ? (
                <div className="inline-block animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
              ) : (
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5A2,2 0 0,0 17,3ZM7,5H17V18L12,15.82L7,18V5Z" />
                </svg>
              )}
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 