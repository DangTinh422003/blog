import { type NextFunction, type Request, type Response } from 'express';

export const handleError = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void> | void,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
