import { type NextFunction, type Request, type Response } from 'express';
import { z } from 'zod';

import { BadRequestError } from '@/core/error.response';
import otpModel from '@/models/otp.model';
import userModel from '@/models/user.model';

export default class AccessValidation {
  async signUp(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body as { email: string };
    const signUpSchema = z.object({
      email: z.string().email(),
    });

    signUpSchema.parse({ email });

    const [isEmailRegistered, userHolder] = await Promise.all([
      otpModel.findOne({ email }).lean(),
      userModel.findOne({ email }).lean(),
    ]);

    if (!isEmailRegistered && !userHolder) {
      next();
    } else {
      throw new BadRequestError('Email already registered');
    }
  }

  signIn(req: Request, res: Response, next: NextFunction) {}

  verifyOtp(req: Request, res: Response, next: NextFunction) {}

  refressToken(req: Request, res: Response, next: NextFunction) {}
}
