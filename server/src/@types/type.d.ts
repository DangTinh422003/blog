import type { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      jwtDecoded?: JwtPayload;
      post?: {
        validatedQuery: {
          page: number;
          limit: number;
          order: 'asc' | 'desc';
        };
      };
    }
  }
}
