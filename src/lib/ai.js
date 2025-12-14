import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let aiClient = null;

if (API_KEY && API_KEY !== 'YOUR_API_KEY_HERE') {
  aiClient = new GoogleGenAI({ apiKey: API_KEY });
}

const MODEL_NAME = "gemini-2.5-flash";

export const generateLadderContent = async (topic) => {
  if (!aiClient) {
    console.warn("Gemini API Key is missing or invalid. Using mock data.");
    return null;
  }

  const prompt = `
    Explain the concept of "${topic}" in three distinct levels of complexity:
    1. "Kid": A simple, fun explanation using analogies (like for a 5-year-old). Use **bold** for key words.
    2. "Beginner": A structured, foundational explanation (like for a high school student). Use **bold** for terms and bullet points for lists.
    3. "Advanced": A deep, technical explanation with nuances (like for an expert). Use **bold**, bullet points, and clear paragraphs.

    Return the response ONLY as a valid JSON object with the following structure:
    {
      "kid": {
        "subtitle": "Short catchy subtitle",
        "description": "Brief overview",
        "content": "Full explanation"
      },
      "beginner": {
        "subtitle": "Short catchy subtitle",
        "description": "Brief overview",
        "content": "Full explanation"
      },
      "advanced": {
        "subtitle": "Short catchy subtitle",
        "description": "Brief overview",
        "content": "Full explanation"
      }
    }
  `;

  try {
    const response = await aiClient.models.generateContent({
        model: MODEL_NAME,
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
            responseMimeType: "application/json"
        }
    });
    
    const text = response.candidates[0].content.parts[0].text;
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    return null;
  }
};

export const chatWithAI = async (message, history = [], context = "") => {
  if (!aiClient) {
    return "I'm sorry, but I can't chat right now because the AI service isn't configured correctly. Please check your API key.";
  }

  try {
    // Manually construct the conversation history for generateContent
    const contents = history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
    }));

    // Add system instruction as the first part of the conversation or as a separate config if supported.
    // For simplicity with this SDK, we'll prepend it to the first user message or add it as context.
    // However, 2.5-flash supports system instructions. Let's try to just include it in the prompt for now to be safe.
    
    const systemPrompt = context 
        ? `System: You are the AI Tutor for "Concept Ladder", an app that explains topics in 3 levels (Kid, Beginner, Advanced). 
           Your goal is to be helpful, concise, and friendly. 
           Answer the user's question directly. 
           Do NOT explain your reasoning or offer multiple options for how you could respond. 
           Just respond as the tutor.
           
           Context: ${context}`
        : `System: You are the AI Tutor for "Concept Ladder". Be helpful, concise, and friendly. Do NOT explain your reasoning. Just respond as the tutor.`;

    // Append the new message
    contents.push({
        role: "user",
        parts: [{ text: `${systemPrompt}\n\nUser: ${message}` }]
    });

    const response = await aiClient.models.generateContent({
        model: MODEL_NAME,
        contents: contents
    });

    return response.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Chat failed:", error);
    return `Error: ${error.message || "Something went wrong"}. Please check your API key.`;
  }
};
