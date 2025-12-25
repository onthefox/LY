
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are the AI Assistant for 'Long Ying Logistics' (龙盈物流).
      
      Company Info:
      - Name: Long Ying Logistics (龙盈物流).
      - Mission: Premium logistics bridge between China and Russia.
      - Services: Air freight, Trucking, Rail, Customs Clearance, Certification.
      - Key Selling Points: Speed, Security, "White" customs clearance, Dragon-speed delivery.
      - Pricing: Starts at $3.5/kg for standard trucking.
      
      Capabilities:
      - Analyze uploaded shipping documents.
      - Estimate delivery times (e.g., Moscow-Guangzhou ~15 days).
      
      Tone: Professional, polite, prestigious, efficient.
      Language: English or Russian (adapt to user).
      
      Keep responses concise.`,
    },
  });

  return chatSession;
};

interface AttachmentData {
  base64: string;
  mimeType: string;
}

export const sendMessageToGemini = async (message: string, attachment?: AttachmentData | null): Promise<string> => {
  if (!API_KEY) {
    return "API Key missing. (Offline Mode)";
  }

  try {
    const chat = initializeChat();
    
    let messageContent: string | Array<any> = message;

    if (attachment) {
      messageContent = [
        { text: message || "Please analyze this shipping document." },
        {
          inlineData: {
            mimeType: attachment.mimeType,
            data: attachment.base64
          }
        }
      ];
    }

    const response: GenerateContentResponse = await chat.sendMessage({ 
      message: messageContent 
    });
    
    return response.text || "I encountered an error processing that.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Service temporarily unavailable.";
  }
};

/**
 * AI Researcher Agent
 * Searches the web for logistics trends and formats them into blog posts.
 * NOTE: Google Search Tool cannot be combined with responseMimeType: 'application/json'.
 * We must request text and parse it manually.
 */
export const generateBlogInsights = async (topic: string): Promise<any[]> => {
  if (!API_KEY) return [];

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Research task: Analyze the latest news and trends regarding "${topic}".
      
      Context: You are the Strategic Research Agent for Long Ying Logistics, specializing in China-Russia trade.
      
      Instructions:
      1. If the topic is directly related to logistics/trade (e.g., "Tariffs", "Rail delays"), provide specific technical details.
      2. If the topic is broader (e.g., "AI Technology", "Winter Weather", "Global Economy"), explicitly analyze its impact on supply chains and cross-border logistics.
      3. Generate 3 distinct, high-value executive insights.
      4. Include a specific date if found in search.
      
      CRITICAL INSTRUCTION: Output ONLY a valid JSON array. Do not output markdown.
      Ensure strict JSON syntax. Double-check that there is a comma after every value in an object.
      
      Structure each object exactly like this:
      {
        "title": "string (Focus on the logistics impact)",
        "summary": "string (Concise executive summary)",
        "date": "string",
        "sourceName": "string",
        "sourceUrl": "The single most relevant URL string (do not list multiple)",
        "tags": ["string"]
      }`,
      config: {
        // We strictly use ONLY the tools config here. 
        // Do NOT add responseMimeType: 'application/json' as it conflicts with tools.
        tools: [{ googleSearch: {} }],
      }
    });

    let text = response.text;
    if (!text) return [];
    
    // Clean up potential markdown formatting if the model adds it despite instructions
    // This handles cases where the model wraps the JSON in ```json ... ```
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    try {
      const parsedData = JSON.parse(text);
      return Array.isArray(parsedData) ? parsedData : [];
    } catch (e) {
      console.warn("JSON parse failed, attempting regex repair on:", text);
      // Attempt to fix missing commas between key-value pairs
      // Regex looks for "value" "key": and inserts a comma
      // This catches the specific error where a comma is missing after a string value before the next key
      const fixedText = text.replace(/("[\s\S]*?")\s*("[\w]+":)/g, '$1,$2');
      
      try {
         const parsedDataFixed = JSON.parse(fixedText);
         return Array.isArray(parsedDataFixed) ? parsedDataFixed : [];
      } catch (e2) {
         console.error("Failed to parse JSON from AI response even after repair", text);
         return [];
      }
    }

  } catch (error) {
    console.error("Research Agent Error:", error);
    return [];
  }
};
