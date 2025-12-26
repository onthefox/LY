/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Service layer for API calls to protect sensitive API keys
 * All calls to external APIs should go through this service
 */

export interface AttachmentData {
  base64: string;
  mimeType: string;
}

interface GeminiRequest {
  message: string;
  attachment?: AttachmentData | null;
}

interface GeminiBlogRequest {
  topic: string;
}

/**
 * Send message to Gemini through a secure backend proxy
 */
export const sendMessageToGemini = async (message: string, attachment?: AttachmentData | null): Promise<string> => {
  try {
    const requestBody: GeminiRequest = { message, attachment };

    const response = await fetch('/api/gemini/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.response || "I encountered an error processing that.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Service temporarily unavailable.";
  }
};

/**
 * Generate blog insights through a secure backend proxy
 */
export const generateBlogInsights = async (topic: string): Promise<any[]> => {
  try {
    const requestBody: GeminiBlogRequest = { topic };

    const response = await fetch('/api/gemini/research', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data.insights) ? data.insights : [];
  } catch (error) {
    console.error("Research API Error:", error);
    return [];
  }
};