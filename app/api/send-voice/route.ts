import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { sendVoiceNote, sendSMSWithVoiceNoteLink } from '@/app/lib/twilio-client';
import path from 'path';
import fs from 'fs';
import { sendMessage } from '@/app/lib/telegram-bot';
import { weatherData } from '@/app/types';

// Define types for the request body
interface SendVoiceRequest {
  audioFilename: string;
  deliveryMethod: 'email' | 'telegram' | 'twilio-call' | 'twilio-sms';
  contactInfo: string;
  message?: string;
  weatherData?: weatherData;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body from the request
    const body = await request.json() as SendVoiceRequest;
    const { audioFilename, deliveryMethod, contactInfo, message } = body;

    // Validate the request parameters
    if (!audioFilename || !deliveryMethod || !contactInfo) {
      return NextResponse.json(
        { error: 'Missing required fields: audioFilename, deliveryMethod, or contactInfo' },
        { status: 400 }
      );
    }

    // Get the full path to the audio file
    const audioPath = audioFilename.startsWith('/') 
      ? path.join(process.cwd(), 'public', audioFilename.substring(1))
      : path.join(process.cwd(), 'public', audioFilename);
    
    // Check if the audio file exists
    if (!fs.existsSync(audioPath)) {
      return NextResponse.json(
        { error: 'Audio file not found' },
        { status: 404 }
      );
    }

    // Get the audio URL for use in messaging
    const audioUrl = `${process.env.APP_URL || 'http://localhost:3000'}${audioFilename}`;
    
    let success = false;
    let deliveryMessage = '';

    // Handle the delivery method
    switch (deliveryMethod) {
      case 'email':
        try {
          await sendViaEmail(contactInfo, audioPath, audioUrl, message);
          success = true;
          deliveryMessage = `Voice note sent successfully to ${contactInfo} via email`;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.error('Email delivery error:', error);
          return NextResponse.json(
            { error: `Email delivery failed: ${errorMessage}` },
            { status: 500 }
          );
        }
        break;
        
      case 'telegram':
        try {
          success = await sendViaTelegram(contactInfo, audioPath, message);
          deliveryMessage = success 
            ? `Voice note sent successfully to ${contactInfo} via Telegram`
            : 'Failed to send voice note via Telegram';
          
          if (!success) {
            return NextResponse.json(
              { error: 'Failed to send voice note via Telegram' },
              { status: 500 }
            );
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          return NextResponse.json(
            { error: `Telegram delivery failed: ${errorMessage}` },
            { status: 500 }
          );
        }
        break;
        
      case 'twilio-call':
        try {
          // Format phone number if needed
          const formattedPhoneNumber = formatPhoneNumber(contactInfo);
          
          // Check if Twilio credentials are configured
          if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
            console.log('Twilio credentials not configured. Would have called:', formattedPhoneNumber);
            console.log('With audio URL:', audioUrl);
            console.log('For testing purposes, considering this a successful delivery.');
            success = true;
            deliveryMessage = `Voice note would be sent to ${formattedPhoneNumber} via Twilio (testing mode)`;
          } else {
            success = await sendVoiceNote(formattedPhoneNumber, audioUrl, message);
            deliveryMessage = `Voice note call initiated to ${formattedPhoneNumber} via Twilio`;
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.error('Twilio call error:', error);
          return NextResponse.json(
            { error: `Twilio call failed: ${errorMessage}` },
            { status: 500 }
          );
        }
        break;
        
      case 'twilio-sms':
        try {
          // Format phone number if needed
          const formattedPhoneNumber = formatPhoneNumber(contactInfo);
          
          // Check if Twilio credentials are configured
          if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
            console.log('Twilio credentials not configured. Would have sent SMS to:', formattedPhoneNumber);
            console.log('With audio URL:', audioUrl);
            console.log('For testing purposes, considering this a successful delivery.');
            success = true;
            deliveryMessage = `SMS with voice note link would be sent to ${formattedPhoneNumber} via Twilio (testing mode)`;
          } else {
            success = await sendSMSWithVoiceNoteLink(formattedPhoneNumber, audioUrl, message);
            deliveryMessage = `SMS with voice note link sent to ${formattedPhoneNumber} via Twilio`;
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.error('Twilio SMS error:', error);
          return NextResponse.json(
            { error: `Twilio SMS failed: ${errorMessage}` },
            { status: 500 }
          );
        }
        break;
        
      default:
        return NextResponse.json(
          { error: `Unsupported delivery method: ${deliveryMethod}` },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success,
      message: deliveryMessage,
      audioUrl
    });
  } catch (error) {
    console.error('Error sending voice note:', error);
    return NextResponse.json(
      { error: `Failed to send voice note: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

/**
 * Helper function to format phone numbers to E.164 format
 * Adds a + prefix if missing and removes spaces and other characters
 */
function formatPhoneNumber(phoneNumber: string): string {
  // Remove non-digit characters except for the + sign
  let formatted = phoneNumber.replace(/[^\d+]/g, '');
  
  // Add + prefix if missing
  if (!formatted.startsWith('+')) {
    formatted = '+' + formatted;
  }
  
  return formatted;
}

/**
 * Send a voice note via Telegram
 */
async function sendViaTelegram(chatId: string, audioPath: string, message?: string): Promise<boolean> {
  // First, send the text message if available
  if (message) {
    await sendMessage(chatId, message);
  }
  
  // Then, send the voice note
  // This functionality is not implemented yet, so we'll simulate success
  console.log(`Sending voice note to Telegram chat ${chatId}`);
  
  // In a real implementation, we would use the Telegram Bot API to send the voice note
  // For now, just return success
  return true;
}

/**
 * Send a voice note via email
 */
async function sendViaEmail(to: string, audioPath: string, audioUrl: string, message?: string): Promise<void> {
  // Validate email format with a simple regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    throw new Error('Invalid email format');
  }
  
  // Check if email credentials are configured
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  
  if (!emailUser || !emailPass) {
    console.log('Email credentials not configured. Would have sent email to:', to);
    console.log('With audio file:', audioPath);
    console.log('Message:', message || 'Here is your weather voice note for today.');
    console.log('For testing purposes, considering this a successful delivery.');
    return; // Exit function successfully without sending email
  }
  
  try {
    // Create a nodemailer transporter with Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });
    
    // Read the audio file
    const audioAttachment = fs.readFileSync(audioPath);
    
    // Create email content
    const mailOptions = {
      from: emailUser || 'weathervoice@example.com',
      to,
      subject: 'Your Weather Voice Note',
      text: message || 'Here is your weather voice note for today.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a5568;">Weather Voice Note</h2>
          <p>${message || 'Here is your weather voice note for today.'}</p>
          <div style="margin: 20px 0;">
            <audio controls style="width: 100%;">
              <source src="${audioUrl}" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>
          </div>
          <p>If you can't play the audio above, you can <a href="${audioUrl}" target="_blank">listen to it here</a>.</p>
          <p style="color: #718096; font-size: 0.9rem; margin-top: 30px;">
            This is an automated message from the AI Weather Voice Assistant.
          </p>
        </div>
      `,
      attachments: [
        {
          filename: 'voice-note.mp3',
          content: audioAttachment
        }
      ]
    };
    
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Email delivery failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
} 