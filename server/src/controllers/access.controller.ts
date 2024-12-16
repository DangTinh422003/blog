import { type Request, type Response } from 'express';
import ms from 'ms';

import { OkResponse } from '@/core/success.response';
import AccessService from '@/services/access.service';

const accessService = new AccessService();

export default class AccessController {
  async signUp(req: Request, res: Response) {
    const { email } = req.body as { email: string };
    const data = await accessService.signUp(email);
    res.send(data);
  }

  async verifyOtp(req: Request, res: Response) {
    const { token } = req.body as { token: string };
    const { data } = await accessService.verifyOtp(token);

    res.cookie('accessToken', data?.tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('7 days'),
    });

    res.cookie('refreshToken', data?.tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('7 days'),
    });

    res.send({ ...data });
  }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body as { email: string; password: string };
    const { data } = await accessService.signIn(email, password);

    res.cookie('accessToken', data?.tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('7 days'),
    });

    res.cookie('refreshToken', data?.tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('7 days'),
    });

    res.send({ ...data });
  }

  signOut(req: Request, res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.send(new OkResponse('Sign out successfully'));
  }

  refressToken(req: Request, res: Response) {
    res.send('Refress Token');
  }
}
