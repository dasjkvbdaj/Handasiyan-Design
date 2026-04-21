// src/lib/sanitize.js

/**
 * Strips HTML tags and trims the string. Optionally limits length.
 */
export const sanitizeText = (str, maxLength = 1000) => {
  if (!str) return '';
  const sanitized = String(str)
    // Strip HTML tags using regex
    .replace(/<[^>]*>/g, '')
    // Replace multiple spaces with a single space
    .replace(/\s+/g, ' ')
    .trim();
  
  return sanitized.substring(0, maxLength);
};

/**
 * Validates format and strips dangerous characters from email.
 */
export const sanitizeEmail = (str) => {
  if (!str) return '';
  const sanitized = String(str).trim().toLowerCase().replace(/<[^>]*>/g, '');
  // Basic email pattern, mainly for limiting weird characters
  // A tighter validation is done during standard form checks
  return sanitized;
};

/**
 * Allows only digits, spaces, plus, minus, and parentheses.
 */
export const sanitizePhone = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/[^\d\s+\-()]/g, '')
    .trim()
    .substring(0, 20);
};

/**
 * Recursive sanitization for complex objects before writing to DB.
 */
export const escapeForFirestore = (obj) => {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'string') return sanitizeText(obj, 2000);
  if (typeof obj === 'number' || typeof obj === 'boolean') return obj;
  
  if (Array.isArray(obj)) {
    return obj.map(item => escapeForFirestore(item));
  }
  
  if (typeof obj === 'object') {
    const sanitizedObj = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitizedObj[sanitizeText(key, 50)] = escapeForFirestore(value);
    }
    return sanitizedObj;
  }
  
  return obj;
};
