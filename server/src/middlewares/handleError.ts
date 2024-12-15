import { type NextFunction, type Request, type Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const handleError = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    fn(req, res, next).catch(next);
  };
};
