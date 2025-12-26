/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Image optimization utilities for web performance
 */

interface ImageOptimizationOptions {
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

/**
 * Type guard to validate image format
 */
const isValidImageFormat = (format: string): format is 'webp' | 'jpeg' | 'png' => {
  return ['webp', 'jpeg', 'png'].includes(format);
};

/**
 * Type guard to validate file extension
 */
const isValidFileExtension = (ext: string): ext is 'webp' | 'jpeg' | 'png' | 'jpg' => {
  return ['webp', 'jpeg', 'png', 'jpg'].includes(ext);
};

/**
 * Optimizes an image by resizing and compressing it
 */
export const optimizeImage = (file: File, options: ImageOptimizationOptions = {}): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    // Validate input parameters
    if (!file || !(file instanceof File)) {
      reject(new Error('Invalid file input'));
      return;
    }

    // Validate quality parameter
    if (options.quality !== undefined && (options.quality < 0 || options.quality > 1)) {
      reject(new Error('Quality must be between 0 and 1'));
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    
    img.onload = () => {
      try {
        // Calculate dimensions while maintaining aspect ratio
        let { width, height } = getImageDimensions(img, options.maxWidth, options.maxHeight);
        
        // Validate calculated dimensions
        if (width <= 0 || height <= 0) {
          reject(new Error('Invalid image dimensions'));
          return;
        }
        
        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;
        
        // Draw image on canvas
        ctx.drawImage(img, 0, 0, width, height);
        
        // Determine the format to use
        const fileExtension = getFileExtension(file.name);
        const format = options.format || convertFileExtToFileFormat(fileExtension);
        const mimeType = getMimeType(format);
        
        // Validate quality parameter
        const quality = options.quality !== undefined ? options.quality : 0.8;
        
        // Validate quality range
        if (quality < 0 || quality > 1) {
          reject(new Error('Quality must be between 0 and 1'));
          return;
        }
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Could not create optimized image'));
            }
          },
          mimeType,
          quality
        );
        
        // Clean up object URL
        URL.revokeObjectURL(img.src);
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => {
      reject(new Error('Could not load image'));
    };
  });
};

/**
 * Gets appropriate dimensions for the image based on constraints
 */
const getImageDimensions = (img: HTMLImageElement, maxWidth?: number, maxHeight?: number) => {
  let width = img.width;
  let height = img.height;
  
  // Validate input image dimensions
  if (width <= 0 || height <= 0) {
    throw new Error('Invalid image dimensions');
  }
  
  // Scale down if larger than max dimensions
  if (maxWidth && width > maxWidth) {
    const ratio = maxWidth / width;
    width = maxWidth;
    height = Math.floor(height * ratio);
  }
  
  if (maxHeight && height > maxHeight) {
    const ratio = maxHeight / height;
    height = maxHeight;
    width = Math.floor(width * ratio);
  }
  
  // Ensure minimum dimensions
  width = Math.max(1, width);
  height = Math.max(1, height);
  
  return { width, height };
};

/**
 * Converts file extension to image format
 */
const convertFileExtToFileFormat = (ext: 'webp' | 'jpeg' | 'png' | 'jpg'): 'webp' | 'jpeg' | 'png' => {
  if (ext === 'jpg') return 'jpeg';
  if (isValidImageFormat(ext)) return ext;
  return 'jpeg'; // default
};

/**
 * Determines the MIME type based on the requested format
 */
const getMimeType = (format: 'webp' | 'jpeg' | 'png'): string => {
  switch (format) {
    case 'webp':
      return 'image/webp';
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    default:
      return 'image/jpeg';
  }
};

/**
 * Gets file extension from filename
 */
const getFileExtension = (filename: string): 'webp' | 'jpeg' | 'png' | 'jpg' => {
  const ext = filename.split('.').pop()?.toLowerCase();
  
  if (!ext || !isValidFileExtension(ext)) {
    return 'jpeg'; // default
  }
  
  return ext;
};

/**
 * Generates an optimized image URL with query parameters for CDN-based optimization
 */
export const generateOptimizedImageUrl = (baseUrl: string, options: ImageOptimizationOptions = {}): string => {
  // Validate base URL
  if (!baseUrl || typeof baseUrl !== 'string') {
    throw new Error('Invalid base URL');
  }
  
  const params = new URLSearchParams();
  
  if (options.maxWidth !== undefined && options.maxWidth > 0) {
    params.append('w', Math.floor(options.maxWidth).toString());
  }
  
  if (options.maxHeight !== undefined && options.maxHeight > 0) {
    params.append('h', Math.floor(options.maxHeight).toString());
  }
  
  if (options.quality !== undefined && options.quality >= 0 && options.quality <= 1) {
    params.append('q', Math.round(options.quality * 100).toString());
  }
  
  if (options.format && isValidImageFormat(options.format)) {
    params.append('f', options.format);
  }
  
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}${params.toString()}`;
};

/**
 * Preloads an image to cache it in the browser
 */
export const preloadImage = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Validate URL
    if (!url || typeof url !== 'string') {
      reject(new Error('Invalid image URL'));
      return;
    }
    
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to preload image: ${url}`));
    img.src = url;
  });
};

/**
 * Checks if WebP is supported by the browser
 */
export const isWebPSupported = async (): Promise<boolean> => {
  // Check if canvas is supported
  if (!document.createElement('canvas').toDataURL) {
    return false;
  }

  // Create a small WebP image and check if it's supported
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    return false;
  }
  
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 1, 1);
  
  // Check if the resulting data URL contains WebP format
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

/**
 * Validates image file properties
 */
export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  if (!file) {
    return { isValid: false, error: 'No file provided' };
  }
  
  if (!(file instanceof File)) {
    return { isValid: false, error: 'Invalid file type' };
  }
  
  // Check file size (e.g., max 10MB)
  if (file.size > 10 * 1024 * 1024) {
    return { isValid: false, error: 'File size exceeds 10MB limit' };
  }
  
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type.toLowerCase())) {
    return { isValid: false, error: 'File type not supported' };
  }
  
  return { isValid: true };
};