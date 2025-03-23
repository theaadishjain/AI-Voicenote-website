'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

type DeliveryMethod = 'email' | 'telegram' | 'twilio-call' | 'twilio-sms';

const AutoNotifySettings = () => {
  const [enabled, setEnabled] = useState(false);
  const [time, setTime] = useState('08:00');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('email');
  const [contactInfo, setContactInfo] = useState('');
  const [contactPlaceholder, setContactPlaceholder] = useState('Enter email address');
  const [city, setCity] = useState('London');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Fetch current settings on load
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('/api/set-auto-notify');
        const { enabled, settings } = response.data;
        
        if (enabled && settings) {
          setEnabled(true);
          setTime(settings.time);
          setDeliveryMethod(settings.deliveryMethod);
          setContactInfo(settings.contactInfo);
          setCity(settings.city || 'London');
          updateContactPlaceholder(settings.deliveryMethod);
        }
      } catch (error) {
        console.error('Failed to fetch auto-notify settings:', error);
        toast.error('Failed to load notification settings');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const updateContactPlaceholder = (method: DeliveryMethod) => {
    switch (method) {
      case 'email':
        setContactPlaceholder('Enter email address');
        break;
      case 'telegram':
        setContactPlaceholder('Enter Telegram chat ID');
        break;
      case 'twilio-call':
        setContactPlaceholder('Enter phone number (+123456789)');
        break;
      case 'twilio-sms':
        setContactPlaceholder('Enter phone number (+123456789)');
        break;
    }
  };

  const handleDeliveryMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const method = e.target.value as DeliveryMethod;
    setDeliveryMethod(method);
    updateContactPlaceholder(method);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('/api/set-auto-notify', {
        enabled,
        time,
        deliveryMethod,
        contactInfo,
        city
      });
      
      toast.success(response.data.message || 'Settings updated successfully');
      console.log('Settings updated:', response.data);
    } catch (error: any) {
      console.error('Failed to update settings:', error);
      const errorMessage = error.response?.data?.error || 'Failed to update settings';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="text-center p-4">Loading settings...</div>;
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Automatic Notifications</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={enabled}
              onChange={() => setEnabled(!enabled)}
              className="mr-2 h-5 w-5"
            />
            <span className="text-lg">Enable daily weather updates</span>
          </label>
        </div>
        
        {enabled && (
          <>
            <div className="mb-4">
              <label className="block mb-2">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2 rounded bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter city name"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-2">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 rounded bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <p className="text-sm mt-1 opacity-70">Time is in 24-hour format (HH:MM)</p>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2">Delivery Method</label>
              <select
                value={deliveryMethod}
                onChange={handleDeliveryMethodChange}
                className="w-full p-2 rounded bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="email">Email</option>
                <option value="telegram">Telegram</option>
                <option value="twilio-call">Phone Call</option>
                <option value="twilio-sms">SMS</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block mb-2">Contact Information</label>
              <input
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                className="w-full p-2 rounded bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={contactPlaceholder}
                required
              />
              <p className="text-sm mt-1 opacity-70">
                {deliveryMethod === 'email' && 'Your email address where notifications will be sent'}
                {deliveryMethod === 'telegram' && 'Your Telegram chat ID'}
                {deliveryMethod === 'twilio-call' && 'Your phone number in international format (e.g., +1234567890)'}
                {deliveryMethod === 'twilio-sms' && 'Your phone number in international format (e.g., +1234567890)'}
              </p>
            </div>
          </>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded font-medium transition duration-200 
            ${enabled 
              ? 'bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white' 
              : 'bg-red-500 hover:bg-red-600 text-white'}
            ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Updating...' : (enabled ? 'Save Settings' : 'Disable Notifications')}
        </button>
      </form>
    </div>
  );
};

export default AutoNotifySettings; 