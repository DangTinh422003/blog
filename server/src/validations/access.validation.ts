import { type NextFunction, type Request, type Response } from 'express';
import { z } from 'zod';

import { BadRequestError, UnauthorizedError } from '@/core/error.response';
import otpModel from '@/models/otp.model';
import userModel from '@/models/user.model';

export default class AccessValidation {
  async signUp(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body as { email: string };
    const signUpSchema = z.object({
      email: z.string().email(),
    });

    const check = signUpSchema.safeParse({ email });
    if (check.error) {
      throw new BadRequestError('Invalid email');
    }

    const [isEmailRegistered, userHolder] = await Promise.all([
      otpModel.findOne({ email }).lean(),
      userModel.findOne({ email }).lean(),
    ]);

    if (isEmailRegistered || userHolder) {
      throw new BadRequestError('Email already registered');
    }

    next();
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) {
      throw new BadRequestError('Invalid email or password');
    }

    const signUpSchema = z.object({
      email: z.string().email(),
    });

    const check = signUpSchema.safeParse({ email });
    if (check.error) {
      throw new BadRequestError('Invalid email');
    }

    const userHolder = await userModel.findOne({ email }).lean();
    if (!userHolder) {
      throw new BadRequestError('Invalid email or password');
    }

    next();
  }

  verifyOtp(req: Request, res: Response, next: NextFunction) {
    const { token } = req.body as { token: string };
    if (!token) {
      throw new BadRequestError('Invalid token');
    } else {
      next();
    }
  }

  refressToken(req: Request, res: Response, next: NextFunction) {
    const refreshToken: string = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedError('Unauthorized');
    }

    next();
  }
}
