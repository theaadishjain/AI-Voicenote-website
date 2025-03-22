import axios from 'axios';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';

// Telegram Bot API base URL
const TELEGRAM_API = 'https://api.telegram.org/bot';

/**
 * Send a text message to a specified Telegram chat
 * 
 * @param chatId - The Telegram chat ID or username where the message will be sent
 * @param text - The text content of the message (supports HTML formatting)
 * @returns Promise resolving to a boolean indicating success or failure
 */
export const sendMessage = async (chatId: string, text: string): Promise<boolean> => {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    
    if (!botToken) {
      console.error('TELEGRAM_BOT_TOKEN not found in environment variables');
      throw new Error('Telegram bot token is required');
    }
    
    await axios.post(`${TELEGRAM_API}${botToken}/sendMessage`, {
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML',
    });
    
    return true;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return false;
  }
};

/**
 * Send a voice note to a specified Telegram chat
 * 
 * @param chatId - The Telegram chat ID or username where the voice note will be sent
 * @param voiceNotePath - Path to the voice note file (relative to /public directory)
 * @param caption - Optional caption text to accompany the voice note
 * @returns Promise resolving to a boolean indicating success or failure
 */
export const sendVoiceNote = async (
  chatId: string, 
  voiceNotePath: string, 
  caption?: string
): Promise<boolean> => {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    
    if (!botToken) {
      console.error('TELEGRAM_BOT_TOKEN not found in environment variables');
      throw new Error('Telegram bot token is required');
    }
    
    // Check if the voice note exists
    const fullPath = path.join(process.cwd(), 'public', voiceNotePath.replace(/^\//, ''));
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Voice note file not found at ${fullPath}`);
    }
    
    // Create form data for multipart upload
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('voice', fs.createReadStream(fullPath));
    
    if (caption) {
      formData.append('caption', caption);
    }
    
    // Send the voice note
    await axios.post(
      `${TELEGRAM_API}${botToken}/sendVoice`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );
    
    return true;
  } catch (error) {
    console.error('Error sending Telegram voice note:', error);
    return false;
  }
}; 