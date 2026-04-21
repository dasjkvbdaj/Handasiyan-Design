// src/lib/rateLimit.js

/**
 * A basic in-memory rate limiter for the frontend to prevent spamming accidental double submissions
 * Note: Real rate limiting must happen on the backend. This is just an extra UX layer.
 */

const limiters = new Map();

/**
 * Creates or gets a rate limiter for a specific action
 * @param {string} actionId - Unique identifier for the action (e.g., 'login', 'contact')
 * @param {number} maxAttempts - Maximum number of attempts allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {Object} Limiter object with check() and reset() methods
 */
export const createRateLimiter = (actionId, maxAttempts = 5, windowMs = 15 * 60 * 1000) => {
  if (!limiters.has(actionId)) {
    limiters.set(actionId, {
      attempts: 0,
      resetTime: Date.now() + windowMs
    });
  }

  return {
    /**
     * Checks if the user can proceed. Increases attempt count if under limit.
     * @returns {boolean} true if allowed, false if limit exceeded
     */
    check: () => {
      const limiter = limiters.get(actionId);
      const now = Date.now();

      // Reset window if it has passed
      if (now > limiter.resetTime) {
        limiter.attempts = 1;
        limiter.resetTime = now + windowMs;
        limiters.set(actionId, limiter);
        return true;
      }

      if (limiter.attempts >= maxAttempts) {
        return false;
      }

      limiter.attempts++;
      limiters.set(actionId, limiter);
      return true;
    },
    
    /**
     * Resets the attempt counter to 0
     */
    reset: () => {
      limiters.set(actionId, {
        attempts: 0,
        resetTime: Date.now() + windowMs
      });
    },

    /**
     * Returns remaining time in seconds if locked out
     */
    getRemainingTimeSeconds: () => {
        const limiter = limiters.get(actionId);
        const now = Date.now();
        if (now > limiter.resetTime) return 0;
        return Math.ceil((limiter.resetTime - now) / 1000);
    }
  };
};
