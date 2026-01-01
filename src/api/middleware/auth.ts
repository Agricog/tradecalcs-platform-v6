import { Request, Response, NextFunction } from 'express';

// Extend Express Request type to include auth
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    // Get the session token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        error: { code: 'UNAUTHORIZED', message: 'Missing or invalid authorization header' } 
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify token with Clerk
    // In production, you'd verify the JWT properly
    // For now, we'll decode the payload (Clerk tokens are JWTs)
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    
    if (!payload.sub) {
      return res.status(401).json({ 
        success: false, 
        error: { code: 'UNAUTHORIZED', message: 'Invalid token' } 
      });
    }

    // Attach user ID to request
    req.userId = payload.sub;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ 
      success: false, 
      error: { code: 'UNAUTHORIZED', message: 'Authentication failed' } 
    });
  }
}
