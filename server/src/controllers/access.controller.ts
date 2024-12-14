import { type Request, type Response } from 'express';

import AccessService from '@/services/access.service';

const accessService = new AccessService();

export default class AccessController {
  async signUp(req: Request, res: Response) {
    const { email } = req.body as { email: string };
    res.send(await accessService.signUp(email));
  }

  signIn(req: Request, res: Response) {}

  verifyOtp(req: Request, res: Response) {}

  refressToken(req: Request, res: Response) {}
}
