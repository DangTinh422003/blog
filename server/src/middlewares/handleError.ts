import { type NextFunction, type Request, type Response } from 'express';

export const handleError = (
  fn: (req: Request, res: Response, next: NextFunction) => void | Promise<void>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = fn(req, res, next);
      if (result instanceof Promise) {
        result.catch(next);
      }
    } catch (error) {
      next(error);
    }
  };
};
