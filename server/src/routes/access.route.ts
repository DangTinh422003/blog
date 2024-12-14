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
  '/sign-in',
  handleError(accessValidation.signIn),
  handleError(accessController.signIn),
);
app.post(
  '/verify-otp',
  handleError(accessValidation.verifyOtp),
  handleError(accessController.verifyOtp),
);
app.post(
  '/refresh-token',
  handleError(accessValidation.refressToken),
  handleError(accessController.refressToken),
);

export default app;
