import DOMPurify from 'dompurify';
import { z } from 'zod';

/**
 * Sanitize user input to prevent XSS attacks
 * Removes all HTML tags and dangerous content
 */
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') {
    return '';
  }
  return DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
};

/**
 * Validate cryptocurrency amount
 * Prevents invalid trades, extreme values, and non-finite numbers
 */
export const validateTradeAmount = (amount: unknown): amount is number => {
  if (typeof amount !== 'number') return false;
  if (amount <= 0) return false;
  if (amount > 1_000_000) return false; // Max reasonable single trade
  if (!Number.isFinite(amount)) return false;
  return true;
};

/**
 * Validate Ethereum-style addresses (0x...)
 */
export const validateWalletAddress = (address: string): boolean => {
  if (typeof address !== 'string') return false;
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Validation schemas using Zod
 */
export const TradeSchema = z.object({
  cryptocurrency: z.string().min(1).max(100),
  amount: z.number().positive().max(1_000_000),
  price: z.number().positive(),
  type: z.enum(['market', 'limit']),
});

export const UserInputSchema = z.object({
  searchQuery: z.string().min(1).max(100),
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
});

/**
 * Safely parse trade request with validation
 */
export const parseTradeRequest = (data: unknown) => {
  try {
    return TradeSchema.parse(data);
  } catch (error) {
    console.error('Invalid trade request:', error);
    return null;
  }
};

/**
 * Prevent CSRF by validating origin
 */
export const validateOrigin = (origin: string, allowedOrigins: string[]): boolean => {
  try {
    const url = new URL(origin);
    return allowedOrigins.includes(url.origin);
  } catch {
    return false;
  }
};

/**
 * Validate and sanitize API response before using it
 */
export const validateApiResponse = (data: unknown): boolean => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  
  // Check that response is not suspiciously large
  const jsonStr = JSON.stringify(data);
  if (jsonStr.length > 10 * 1024 * 1024) { // 10MB max
    return false;
  }
  
  return true;
};
