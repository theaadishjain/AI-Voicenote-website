import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { sendVoiceNote } from '@/app/lib/telegram-bot';
import path from 'path';
import fs from 'fs';

// Define types for the request body
interface SendVoiceRequest {
  audioFilename: string;
  deliveryMethod: string;
  contactInfo: string;
  message?: string;
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
    const fullAudioPath = path.join(process.cwd(), 'public', audioFilename);
    
    // Check if the audio file exists
    if (!fs.existsSync(fullAudioPath)) {
      return NextResponse.json(
        { error: 'Audio file not found' },
        { status: 404 }
      );
    }

    // Get the audio URL for use in messaging
    const audioUrl = `${process.env.APP_URL || 'http://localhost:3000'}${audioFilename}`;
    
    let success = false;
    let deliveryMessage = '';

    // Route to the appropriate delivery method
    if (deliveryMethod === 'email') {
      // Send voice note via email
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
          await sendViaEmail(fullAudioPath, contactInfo, message);
          success = true;
          deliveryMessage = `Voice note sent to ${contactInfo} via email`;
        } catch (emailError) {
          console.error('Email delivery error:', emailError);
          return NextResponse.json(
            { error: `Failed to send email: ${(emailError as Error).message}` },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          { error: 'Email credentials not configured in environment variables' },
          { status: 500 }
        );
      }
    } else if (deliveryMethod === 'telegram') {
      // Send voice note via Telegram
      try {
        const caption = message || 'Your daily weather and motivation update';
        success = await sendVoiceNote(contactInfo, audioUrl, caption);
        
        if (success) {
          deliveryMessage = `Voice note sent to ${contactInfo} via Telegram`;
        } else {
          return NextResponse.json(
            { error: 'Telegram message delivery failed' },
            { status: 500 }
          );
        }
      } catch (telegramError) {
        console.error('Telegram delivery error:', telegramError);
        return NextResponse.json(
          { error: `Failed to send Telegram message: ${(telegramError as Error).message}` },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { error: `Unsupported delivery method: ${deliveryMethod}. Supported methods: email, telegram` },
        { status: 400 }
      );
    }

    // Log success and return response
    console.log(deliveryMessage);
    return NextResponse.json({ 
      success: true, 
      message: deliveryMessage
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
 * Send voice note via email using nodemailer
 * @param filePath Path to the voice file
 * @param emailAddress Recipient's email address
 * @param message Optional text message to include in the email
 */
async function sendViaEmail(filePath: string, emailAddress: string, message?: string) {
  try {
    // Validate email address format with a simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      throw new Error('Invalid email address format');
    }
    
    // Create a nodemailer transporter with Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Set up email options with voice note attachment
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailAddress,
      subject: 'Your Daily Weather & Motivation Voice Note',
      text: message || 'Please find attached your daily weather update and motivational message as a voice note.',
      attachments: [
        {
          filename: 'weather-motivation.mp3',
          path: filePath, // Path to the audio file
        },
      ],
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Email delivery failed: ${(error as Error).message}`);
  }
} 