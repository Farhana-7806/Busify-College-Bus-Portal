
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Predicts the college bus ETA based on current conditions using Gemini.
 */
export const getAIEtaPrediction = async (
  currentLocation: { lat: number, lng: number },
  destination: { lat: number, lng: number },
  weather: string,
  trafficLevel: 'Low' | 'Medium' | 'High'
) => {
  // Always initialize right before use using direct access to process.env.API_KEY.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const distanceKm = Math.sqrt(
      Math.pow(destination.lat - currentLocation.lat, 2) + 
      Math.pow(destination.lng - currentLocation.lng, 2)
    ) * 111;

    // Fix: Using 'gemini-3-pro-preview' for complex reasoning/math-based ETA prediction.
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Predict college bus ETA in minutes for a ${distanceKm.toFixed(2)}km trip. 
      Weather: ${weather}, Traffic: ${trafficLevel}. 
      Return a student-friendly 1-sentence explanation.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            eta: { type: Type.NUMBER },
            reason: { type: Type.STRING },
          },
          required: ["eta", "reason"],
        },
      }
    });

    // Access .text property directly as a getter and trim before parsing.
    const text = response.text;
    if (!text) throw new Error("AI returned empty response");
    
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("AI ETA Prediction Error:", error);
    return { eta: 15, reason: "Traffic data is currently unavailable, using standard route timing." };
  }
};

/**
 * Summarizes bus alerts into a short, friendly message.
 */
export const getSmartSummary = async (announcements: string[]) => {
  if (announcements.length === 0) return "Stay safe and check for live updates.";

  // Always initialize right before use with direct access to process.env.API_KEY.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    // Fix: Using 'gemini-3-flash-preview' for basic text summarization tasks.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Summarize these bus alerts into one 15-word friendly update: ${announcements.join('; ')}`,
    });
    // Property .text is the correct way to extract the response.
    return response.text?.trim() || "Check the alerts section for updates.";
  } catch (error) {
    console.error("AI Summary Error:", error);
    return "Check the latest campus alerts below.";
  }
};
