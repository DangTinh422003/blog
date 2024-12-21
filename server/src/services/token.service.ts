import JWT, {
  type JwtPayload,
  type PrivateKey,
  type Secret,
} from 'jsonwebtoken';

import { BadRequestError } from '@/core/error.response';

export default class TokenService {
  generateToken(
    payload: JwtPayload,
    privateKey: Secret | PrivateKey,
    expiresIn: string,
  ) {
    return JWT.sign(payload, privateKey, { expiresIn, algorithm: 'HS256' });
  }

  verifyToken<T>(token: string, privateKey: string) {
    return JWT.verify(token, privateKey) as T;
  }
}
