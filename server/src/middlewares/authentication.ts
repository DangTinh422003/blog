import { type NextFunction, type Request, type Response } from 'express';
import { type JwtPayload } from 'jsonwebtoken';

import { GoneError, UnauthorizedError } from '@/core/error.response';
import TokenService from '@/services/token.service';

const tokenService = new TokenService();

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accessToken: string = req.cookies.accessToken;

    if (!accessToken) {
      throw new UnauthorizedError('Unauthorized, please login again');
    }

    const jwtDecoded: JwtPayload = await tokenService.verifyToken(
      accessToken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY!,
    );

    Object.assign(req, { jwtDecoded });
    next();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('jwt expired')) {
        throw new GoneError('Token expired! Need to login again');
      }

      throw new UnauthorizedError('Unauthorized, please login again');
    }
  }
};
