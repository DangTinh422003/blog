import { type Request, type Response } from 'express';
import ms from 'ms';

import AccessService from '@/services/access.service';

const accessService = new AccessService();

export default class AccessController {
  async signUp(req: Request, res: Response) {
    const { email } = req.body as { email: string };
    res.send(await accessService.signUp(email));
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

  signIn(req: Request, res: Response) {
    res.send('Sign In');
  }

  signOut(req: Request, res: Response) {
    res.send('Sign Out');
  }

  refressToken(req: Request, res: Response) {
    res.send('Refress Token');
  }
}
