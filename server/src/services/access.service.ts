import { env } from 'node:process';

import bcrypt from 'bcrypt';
import { type JwtPayload } from 'jsonwebtoken';
import type Mail from 'nodemailer/lib/mailer';

import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from '@/core/error.response';
import { CreatedResponse, OkResponse } from '@/core/success.response';
import otpModel from '@/models/otp.model';
import userModel from '@/models/user.model';
import EmailService from '@/services/email.service';
import TokenService from '@/services/token.service';
import welcomeTemplate from '@/utils/email/welcome.template';

const tokenService = new TokenService();
const emailService = new EmailService();

export default class AccessService {
  async signUp(email: string) {
    const tokenVerify = tokenService.generateToken(
      { email },
      process.env.SIGN_UP_TOKEN_PRIVATE_KEY!,
      '60s',
    );

    await otpModel.create({
      email,
      otp: tokenVerify,
    });

    const replacedEmailTemplate = emailService.replacedEmailTemplate(
      welcomeTemplate(),
      [
        {
          key: '{{email}}',
          value: email,
        },
        {
          key: '{{token}}',
          value: tokenVerify,
        },
      ],
    );

    try {
      const transporter = emailService.initTransporter('smtp.gmail.com', {
        user: env.EMAIL_SERVICE_AUTH_USER!,
        pass: env.EMAIL_SERVICE_AUTH_PASS!,
      });

      const mailOptions: Mail.Options = {
        from: {
          name: 'Dev Blog',
          address: env.EMAIL_SERVICE_AUTH_USER!,
        },
        to: email,
        subject: 'Welcome to DevBlog, Please verify your email',
        html: replacedEmailTemplate,
      };

      await emailService.sendMail(transporter, mailOptions);

      return new OkResponse('Email sent successfully');
    } catch (error) {
      throw new InternalServerError();
    }
  }

  async signIn(email: string, password: string) {
    const user = await userModel.findOne({ email }).lean();
    if (!user) {
      throw new BadRequestError('User not found');
    }
    const { password: userPassword, ...userHolder } = user;

    if (!userHolder) {
      throw new BadRequestError('User not found');
    }

    const isMatchPwd = await bcrypt.compare(password, userPassword);
    if (!isMatchPwd) {
      throw new BadRequestError('Invalid password');
    }

    const [accessToken, refreshToken] = await Promise.all([
      tokenService.generateToken(
        userHolder,
        process.env.ACCESS_TOKEN_PRIVATE_KEY!,
        '3h',
      ),
      tokenService.generateToken(
        userHolder,
        process.env.REFRESH_TOKEN_PRIVATE_KEY!,
        '7d',
      ),
    ]);

    return new OkResponse('Login successfully', {
      user: userHolder,
      tokens: {
        accessToken,
        refreshToken,
      },
    });
  }

  async verifyOtp(token: string) {
    const decoded: JwtPayload = tokenService.verifyToken(
      token,
      process.env.SIGN_UP_TOKEN_PRIVATE_KEY!,
    );

    const email: string = decoded.email;
    if (!email) throw new BadRequestError('Invalid token ');

    const userHolder = await userModel.findOne({ email }).lean();
    if (userHolder) {
      throw new BadRequestError('Email already exists');
    }

    const SALT = 10;
    const hashedPassword = await bcrypt.hash(email, SALT);

    const { password, ...newUser } = (
      await userModel.create({ email, password: hashedPassword })
    ).toObject();

    const [accessToken, refreshToken] = await Promise.all([
      tokenService.generateToken(
        newUser,
        process.env.ACCESS_TOKEN_PRIVATE_KEY!,
        '3h',
      ),
      tokenService.generateToken(
        newUser,
        process.env.REFRESH_TOKEN_PRIVATE_KEY!,
        '7d',
      ),
    ]);

    return new CreatedResponse('User created', {
      user: newUser,
      tokens: {
        accessToken,
        refreshToken,
      },
    });
  }

  async refreshToken(refreshToken: string) {
    try {
      const { iat, exp, ...decoded }: JwtPayload = tokenService.verifyToken(
        refreshToken,
        process.env.REFRESH_TOKEN_PRIVATE_KEY!,
      );

      const [newAccessToken, newRefreshToken] = await Promise.all([
        tokenService.generateToken(
          decoded,
          process.env.ACCESS_TOKEN_PRIVATE_KEY!,
          '3h',
        ),
        tokenService.generateToken(
          decoded,
          process.env.REFRESH_TOKEN_PRIVATE_KEY!,
          '7d',
        ),
      ]);

      return new OkResponse('Refresh successful!', {
        user: decoded,
        tokens: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        },
      });
    } catch (error) {
      throw new UnauthorizedError('Invalid token');
    }
  }
}
