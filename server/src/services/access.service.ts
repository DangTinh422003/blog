import { env } from 'node:process';

import type Mail from 'nodemailer/lib/mailer';

import { InternalServerError } from '@/core/error.response';
import { OkResponse } from '@/core/success.response';
import otpModel from '@/models/otp.model';
import EmailService from '@/services/email.service';
import TokenService from '@/services/token.service';
import welcomeTemplate from '@/utils/email.template/welcome.template';

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

  signIn() {}

  verifyOtp() {}

  refreshToken() {}
}
