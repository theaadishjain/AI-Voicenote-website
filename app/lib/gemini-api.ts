import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with API key
export const initGeminiApi = () => {
  const apiKey = process.env.GEMINI_API_KEY || '';
  
  if (!apiKey) {
    console.error('GEMINI_API_KEY not found in environment variables');
    throw new Error('GEMINI_API_KEY is required');
  }
  
  return new GoogleGenerativeAI(apiKey);
};

// Function to generate weather update text
export const generateWeatherUpdate = async (
  weatherData: {
    temperature: number;
    description: string;
    city: string;
    humidity: number;
    windSpeed: number;
  },
  motivationalQuote: {
    quote: string;
    author: string;
  }
) => {
  try {
    const genAI = initGeminiApi();
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
      Generate a friendly morning voice note script that includes weather information and a motivational quote.
      
      Weather information:
      - City: ${weatherData.city}
      - Temperature: ${Math.round(weatherData.temperature)}°C
      - Condition: ${weatherData.description}
      - Humidity: ${weatherData.humidity}%
      - Wind Speed: ${weatherData.windSpeed} m/s
      
      Motivational Quote:
      "${motivationalQuote.quote}" - ${motivationalQuote.author}
      
      Requirements:
      - Keep it natural and conversational, as if a friendly person is speaking
      - Include a greeting with the current day
      - Summarize the weather conditions in an engaging way
      - Incorporate the motivational quote smoothly into the message
      - End with a friendly sign-off
      - Keep the total length to about 100-150 words
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error generating content with Gemini:', error);
    throw new Error('Failed to generate weather update text');
  }
}; 