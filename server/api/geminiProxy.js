/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Gemini API Proxy Server
// This file should be part of your backend server implementation
const express = require('express');
const { GoogleGenAI, Chat, GenerateContentResponse } = require('@google/genai');

const router = express.Router();

// In a production environment, store the API key in environment variables
const API_KEY = process.env.GEMINI_API_KEY || '';

// Initialize chat session (server-side)
let chatSession = null;

const initializeChat = () => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI(API_KEY);
  
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

// Proxy endpoint for chat messages
router.post('/chat', async (req, res) => {
 const { message, attachment } = req.body;

  if (!API_KEY) {
    return res.status(500).json({ error: 'API Key missing on server' });
  }

  try {
    const chat = initializeChat();
    
    let messageContent = message;

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

    const response = await chat.sendMessage({ 
      message: messageContent 
    });
    
    res.json({ response: response.text || "I encountered an error processing that." });
 } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Service temporarily unavailable" });
  }
});

// Proxy endpoint for research
router.post('/research', async (req, res) => {
  const { topic } = req.body;

  if (!API_KEY) {
    return res.status(500).json({ error: 'API Key missing on server' });
  }

  const ai = new GoogleGenAI(API_KEY);

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
        tools: [{ googleSearch: {} }],
      }
    });

    let text = response.text;
    if (!text) {
      return res.json({ insights: [] });
    }
    
    // Clean up potential markdown formatting
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    try {
      const parsedData = JSON.parse(text);
      res.json({ insights: Array.isArray(parsedData) ? parsedData : [] });
    } catch (e) {
      console.warn("JSON parse failed, attempting regex repair on:", text);
      // Attempt to fix missing commas between key-value pairs
      const fixedText = text.replace(/("[\s\S]*?")\s*("[\w]+":)/g, '$1,$2');
      
      try {
         const parsedDataFixed = JSON.parse(fixedText);
         res.json({ insights: Array.isArray(parsedDataFixed) ? parsedDataFixed : [] });
      } catch (e2) {
         console.error("Failed to parse JSON from AI response even after repair", text);
         res.json({ insights: [] });
      }
    }
  } catch (error) {
    console.error("Research Agent Error:", error);
    res.status(500).json({ insights: [] });
  }
});

module.exports = router;