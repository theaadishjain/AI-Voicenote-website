import { GoogleGenerativeAI } from '@google/generative-ai';
import { weatherData } from '@/app/types';

// Initialize the Google Generative AI SDK with the API key
export const initGeminiApi = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not found in environment variables');
  }
  return new GoogleGenerativeAI(apiKey);
};

interface MotivationalQuote {
  quote?: string;
  author?: string;
}

// Generate a weather update using Google's Gemini API
export async function generateWeatherUpdate(
  weatherData: weatherData,
  motivationalMessage?: string
): Promise<string> {
  try {
    // First try to generate using Gemini API
    return await generateWithGemini(weatherData, motivationalMessage);
  } catch (error) {
    console.error('Error using Gemini API for text generation:', error);
    console.log('Using fallback text generation method instead...');
    // Use fallback method if Gemini fails
    return generateFallbackText(weatherData, motivationalMessage);
  }
}

// Fallback text generation that doesn't require AI API
function generateFallbackText(
  weatherData: weatherData,
  motivationalMessage?: string
): string {
  const location = weatherData.city || 'your location';
  const temperature = weatherData.temperature !== undefined ? `${weatherData.temperature}°C` : 'unknown temperature';
  const description = weatherData.description || 'changing weather conditions';
  const humidity = weatherData.humidity !== undefined ? `${weatherData.humidity}%` : 'moderate';
  const windSpeed = weatherData.windSpeed !== undefined ? `${weatherData.windSpeed} km/h` : 'light';

  const weatherPart = `Weather update for ${location}: Currently it's ${temperature} with ${description}. 
  The humidity is ${humidity} and wind speed is ${windSpeed}.`;
  
  let advicePart = '';
  
  // Generate some basic advice based on the weather description
  if (description.includes('rain') || description.includes('drizzle')) {
    advicePart = "Don't forget to carry an umbrella if you're going outside today.";
  } else if (description.includes('snow')) {
    advicePart = "It's snowing, so wear warm clothes and be careful on slippery surfaces.";
  } else if (description.includes('cloud')) {
    advicePart = "It's cloudy today, so the temperature might feel cooler than it actually is.";
  } else if (description.includes('clear') || description.includes('sun')) {
    advicePart = "It's a beautiful day! Consider spending some time outdoors if possible.";
  } else if (temperature && parseInt(temperature.toString()) > 30) {
    advicePart = "It's quite hot today, so stay hydrated and try to avoid prolonged exposure to the sun.";
  } else if (temperature && parseInt(temperature.toString()) < 5) {
    advicePart = "It's very cold today, so make sure to dress in layers and keep warm.";
  } else {
    advicePart = "Whatever your plans are today, I hope the weather cooperates!";
  }

  let motivationalPart = '';
  if (motivationalMessage) {
    motivationalPart = `Here's a thought for today: ${motivationalMessage}`;
  }

  return `${weatherPart} ${advicePart} ${motivationalPart}`.trim();
}

// Generate using Gemini AI API
async function generateWithGemini(
  weatherData: weatherData,
  motivationalMessage?: string
): Promise<string> {
  const genAI = initGeminiApi();
  const geminiModel = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const location = weatherData.city;
  const temperature = weatherData.temperature;
  const description = weatherData.description;
  const humidity = weatherData.humidity;
  const windSpeed = weatherData.windSpeed;
  
  let prompt = `Create a friendly, conversational weather update for ${location} where it's currently ${temperature}°C with ${description}.`;
  
  if (humidity !== undefined) {
    prompt += ` The humidity is ${humidity}%.`;
  }
  
  if (windSpeed !== undefined) {
    prompt += ` The wind speed is ${windSpeed} km/h.`;
  }
  
  prompt += ` Add some relevant advice for the day based on these weather conditions.`;
  
  if (motivationalMessage) {
    prompt += ` Also, include this motivational quote in a natural way: "${motivationalMessage}"`;
  }
  
  prompt += ` The response should sound natural and human-like, as if it's being read aloud. 
  Keep it under 200 words and make it engaging. Don't include any headings, bullet points, or formatting.`;
  
  try {
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error('Empty response from Gemini API');
    }
    
    return text;
  } catch (error) {
    console.error('Error generating content with Gemini:', error);
    throw new Error('Failed to generate weather update content');
  }
} 