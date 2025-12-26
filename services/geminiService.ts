/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { sendMessageToGemini as apiSendMessageToGemini, generateBlogInsights as apiGenerateBlogInsights, AttachmentData } from './apiService';

/**
 * Initialize chat session - this is now handled by the backend
 */
export const initializeChat = (): void => {
  // Initialization is now handled by the backend proxy
  console.log('Chat initialization is handled by the backend proxy');
};

/**
 * Send message to Gemini through the secure backend proxy
 */
export const sendMessageToGemini = async (message: string, attachment?: AttachmentData | null): Promise<string> => {
  return await apiSendMessageToGemini(message, attachment);
};

/**
 * Generate blog insights through the secure backend proxy
 */
export const generateBlogInsights = async (topic: string): Promise<any[]> => {
  return await apiGenerateBlogInsights(topic);
};
