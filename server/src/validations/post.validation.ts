import { type NextFunction, type Request, type Response } from 'express';
import { z } from 'zod';

import { BadRequestError } from '@/core/error.response';

export default class PostValidation {
  getPosts(req: Request, res: Response, next: NextFunction) {
    const optionQuerySchema = z.object({
      page: z.coerce.number().int().min(1).optional(),
      limit: z.coerce.number().int().min(1).optional(),
      order: z.enum(['asc', 'desc']).optional(),
    });

    const optionQuery = optionQuerySchema.safeParse(req.query);

    if (!optionQuery.success) {
      throw new BadRequestError('Invalid query');
    }

    Object.assign(req, { post: { validatedQuery: optionQuery.data } });
    next();
  }

  deletePost(req: Request, res: Response, next: NextFunction) {
    next();
  }

  updatePost(req: Request, res: Response, next: NextFunction) {
    next();
  }

  createPost(req: Request, res: Response, next: NextFunction) {
    next();
  }

  findPost(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
