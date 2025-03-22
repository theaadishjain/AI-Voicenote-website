'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function VoiceNoteControls() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- will be used in future function implementations
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<'email' | 'whatsapp'>('email');
  const [autoNotify, setAutoNotify] = useState(false);
  const [notificationTime, setNotificationTime] = useState('06:00');
  const router = useRouter();

  const handleGenerateVoice = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      await axios.get('/api/generate-voice');
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
    
    try {
      await axios.post('/api/send-voice', { method: deliveryMethod });
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
    
    try {
      await axios.post('/api/set-auto-notify', { 
        enabled: autoNotify,
        time: notificationTime 
      });
      setSuccess(`Auto notifications ${autoNotify ? 'enabled' : 'disabled'} at ${notificationTime}!`);
    } catch (err) {
      console.error('Error setting auto notify:', err);
      setError('Failed to update notification settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 text-purple-500">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold ml-2">Voice Controls</h2>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded" role="alert">
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded" role="alert">
          <p>{success}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <button
            onClick={handleGenerateVoice}
            disabled={isLoading}
            className="w-full btn-primary flex items-center justify-center"
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
          <div className="flex items-center mb-4">
            <select
              className="input-field flex-grow"
              value={deliveryMethod}
              onChange={(e) => setDeliveryMethod(e.target.value as 'email' | 'whatsapp')}
              disabled={isLoading}
            >
              <option value="email">Email</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
            <button
              onClick={handleSendVoice}
              disabled={isLoading}
              className="btn-success ml-2 flex-none flex items-center justify-center px-4 py-2"
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

      <div className="mt-6 p-5 border dark:border-gray-700 border-gray-200 rounded-lg bg-opacity-50 bg-white dark:bg-gray-800 dark:bg-opacity-50">
        <h3 className="text-lg font-medium mb-4">Auto Notifications</h3>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 items-center">
          <div className="flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox"
                className="sr-only peer"
                checked={autoNotify}
                onChange={() => setAutoNotify(!autoNotify)}
                disabled={isLoading}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {autoNotify ? 'Enabled' : 'Disabled'}
              </span>
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm min-w-20">Notification time:</label>
            <input
              type="time"
              className="input-field"
              value={notificationTime}
              onChange={(e) => setNotificationTime(e.target.value)}
              disabled={isLoading || !autoNotify}
            />
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSetAutoNotify}
            disabled={isLoading}
            className="btn-primary text-sm flex items-center"
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
  );
} 