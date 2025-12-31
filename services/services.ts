
import { GoogleGenAI, Type } from "@google/genai";

// Fix for "Cannot find name 'process'" in CI environments
declare var process: { env: { [key: string]: string | undefined } };

/**
 * Predicts the college bus ETA based on current conditions using Gemini.
 */
export const getAIEtaPrediction = async (
  currentLocation: { lat: number, lng: number },
  destination: { lat: number, lng: number },
  weather: string,
  trafficLevel: 'Low' | 'Medium' | 'High'
) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return { eta: 10, reason: "API Key missing, using default ETA." };

  const ai = new GoogleGenAI({ apiKey });
  try {
    const distanceKm = Math.sqrt(
      Math.pow(destination.lat - currentLocation.lat, 2) + 
      Math.pow(destination.lng - currentLocation.lng, 2)
    ) * 111;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Predict college bus ETA in minutes and provide a 1-sentence explanation.
      Location: ${currentLocation.lat}, ${currentLocation.lng} to ${destination.lat}, ${destination.lng}
      Calculated distance: ${distanceKm.toFixed(2)} km.
      Weather: ${weather}.
      Traffic: ${trafficLevel}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            eta: {
              type: Type.NUMBER,
              description: 'The estimated time in minutes until arrival.',
            },
            reason: {
              type: Type.STRING,
              description: 'A brief, student-friendly explanation for the prediction.',
            },
          },
          required: ["eta", "reason"],
        },
      }
    });

    const text = response.text;
    if (!text) throw new Error("AI returned empty text content");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("AI ETA Prediction Error:", error);
    return { eta: 15, reason: "Unable to calculate AI ETA, providing a standard estimate." };
  }
};

/**
 * Summarizes bus alerts into a short, friendly message.
 */
export const getSmartSummary = async (announcements: string[]) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return "Stay updated with the latest bus alerts below.";

  const ai = new GoogleGenAI({ apiKey });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Summarize these bus alerts into one friendly 20-word message for students: ${announcements.join('; ')}`,
    });
    return response.text || "Stay updated with the latest bus alerts below.";
  } catch (error) {
    console.error("AI Summary Error:", error);
    return "Stay updated with the latest bus alerts below.";
  }
};
