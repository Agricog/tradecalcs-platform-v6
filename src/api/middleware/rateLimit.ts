import { Request, Response, NextFunction } from 'express';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Create Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Rate limiter for authenticated routes: 100 requests per minute
const authRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 m'),
  analytics: true,
  prefix: 'ratelimit:auth',
});

// Rate limiter for public routes (wholesaler quote page): 20 requests per minute
const publicRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '1 m'),
  analytics: true,
  prefix: 'ratelimit:public',
});

export function rateLimit(type: 'auth' | 'public' = 'auth') {
  const limiter = type === 'auth' ? authRateLimiter : publicRateLimiter;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Use user ID for auth routes, IP for public routes
      const identifier = type === 'auth' 
        ? req.userId || req.ip || 'anonymous'
        : req.ip || 'anonymous';

      const { success, limit, reset, remaining } = await limiter.limit(identifier);

      // Set rate limit headers
      res.setHeader('X-RateLimit-Limit', limit);
      res.setHeader('X-RateLimit-Remaining', remaining);
      res.setHeader('X-RateLimit-Reset', reset);

      if (!success) {
        return res.status(429).json({
          success: false,
          error: {
            code: 'RATE_LIMITED',
            message: 'Too many requests. Please try again later.',
          },
        });
      }

      next();
    } catch (error) {
      // If rate limiting fails, allow the request but log the error
      console.error('Rate limit error:', error);
      next();
    }
  };
}
