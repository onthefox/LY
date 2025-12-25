
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Sanitizes user input to prevent basic XSS injection.
 * Removes HTML tags and potentially dangerous characters.
 */
export const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, "").trim();
};

/**
 * Validates email format using standard regex.
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Simulates payload encryption for secure transport.
 * In a production environment, this would utilize a public key (RSA/ECC).
 */
export const encryptPayload = (data: Record<string, any>): string => {
  try {
    const jsonString = JSON.stringify(data);
    // Simulating encryption via Base64 for demonstration of the "encryption" phase
    return btoa(jsonString);
  } catch (e) {
    console.error("Encryption failed", e);
    return "";
  }
};
