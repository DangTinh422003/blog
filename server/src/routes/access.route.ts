import express from 'express';

import AccessController from '@/controllers/access.controller';
import { handleError } from '@/middlewares/handleError';
import AccessValidation from '@/validations/access.validation';

const app = express();
const accessController = new AccessController();
const accessValidation = new AccessValidation();

app.post(
  '/sign-up',
  handleError(accessValidation.signUp),
  handleError(accessController.signUp),
);

app.post(
  '/verify-otp',
  handleError(accessValidation.verifyOtp),
  handleError(accessController.verifyOtp),
);

app.post('/sign-in', accessValidation.signIn, accessController.signIn);

app.post(
  '/refresh-token',
  accessValidation.refressToken,
  accessController.refressToken,
);

export default app;
