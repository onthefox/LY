
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Sanitizes user input to prevent XSS injection.
 * Removes HTML tags and potentially dangerous characters.
 */
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') {
    return '';
  }
  
  // Remove HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '');
  
  // Remove dangerous characters/sequences
  sanitized = sanitized.replace(/javascript:/gi, '');
  sanitized = sanitized.replace(/vbscript:/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=/gi, '');
  sanitized = sanitized.replace(/data:/gi, '');
  sanitized = sanitized.replace(/</gi, '');
  sanitized = sanitized.replace(/>/gi, '');
  sanitized = sanitized.replace(/&/gi, '');
  sanitized = sanitized.replace(/"/gi, '');
  sanitized = sanitized.replace(/&#x?[\dA-Fa-f]+;/gi, '');
  
  // Trim whitespace
  return sanitized.trim();
};

/**
 * Validates email format using comprehensive regex.
 */
export const validateEmail = (email: string): boolean => {
  if (typeof email !== 'string' || email.length > 254) {
    return false;
  }
  
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

/**
 * Validates a URL to ensure it has a proper format.
 */
export const validateUrl = (url: string): boolean => {
  if (typeof url !== 'string' || url.length > 2048) {
    return false;
  }
  
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch (e) {
    return false;
  }
};

/**
 * Validates that a string is not empty and contains content.
 */
export const validateNotEmpty = (value: string): boolean => {
  return typeof value === 'string' && value.trim().length > 0;
};

/**
 * Validates that a number is within a specified range.
 */
export const validateNumberRange = (value: number, min: number, max: number): boolean => {
  return typeof value === 'number' && value >= min && value <= max;
};

/**
 * Validates a phone number format (simplified).
 */
export const validatePhone = (phone: string): boolean => {
  if (typeof phone !== 'string') {
    return false;
  }
  
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Check if it has a reasonable length (10-15 digits)
  return digitsOnly.length >= 10 && digitsOnly.length <= 15;
};

/**
 * Encrypts payload with improved security measures.
 * This provides better protection than simple base64 encoding.
 * In production, use a proper encryption library or backend encryption service.
 */
export const encryptPayload = (data: Record<string, any>): string => {
  try {
    const jsonString = JSON.stringify(data);
    
    // Create a more complex transformation to provide better obfuscation
    // than simple base64 encoding
    const timestamp = Date.now();
    const combined = `${jsonString}|${timestamp}`;
    
    // Apply multiple transformation layers
    let result = combined;
    
    // Layer 1: Character code shifting
    result = result
      .split('')
      .map(char => String.fromCharCode(char.charCodeAt(0) + 10))
      .join('');
    
    // Layer 2: Base64 encoding (for transport safety)
    result = btoa(result);
    
    // Layer 3: Additional scrambling
    result = result
      .split('')
      .reverse()
      .join('');
    
    return result;
  } catch (e) {
    console.error("Encryption failed", e);
    return "";
  }
};

/**
 * Decrypts payload that was encrypted with encryptPayload.
 * This allows for decryption of encrypted payloads.
 */
export const decryptPayload = (encryptedData: string): any => {
  try {
    // Reverse the encryption steps
    let result = encryptedData;
    
    // Reverse Layer 3: Unscramble
    result = result
      .split('')
      .reverse()
      .join('');
    
    // Reverse Layer 2: Base64 decoding
    result = atob(result);
    
    // Reverse Layer 1: Character code shifting
    result = result
      .split('')
      .map(char => String.fromCharCode(char.charCodeAt(0) - 10))
      .join('');
    
    // Extract original data and timestamp
    const parts = result.split('|');
    if (parts.length < 2) {
      throw new Error("Invalid encrypted data format");
    }
    
    const jsonString = parts.slice(0, -1).join('|'); // Handle case where original data contains '|'
    
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Decryption failed", e);
    return null;
  }
};
