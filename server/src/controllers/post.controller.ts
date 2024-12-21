import { type NextFunction, type Request, type Response } from 'express';

import { PostService } from '@/services/post.service';

const postService = new PostService();

export default class PostController {
  async getPosts(req: Request, res: Response, next: NextFunction) {
    const queryOption = req.post?.validatedQuery || {};
    res.send(await postService.getPosts(queryOption));
  }

  deletePost(req: Request, res: Response, next: NextFunction) {}

  updatePost(req: Request, res: Response, next: NextFunction) {}

  createPost(req: Request, res: Response, next: NextFunction) {}

  findPost(req: Request, res: Response, next: NextFunction) {}
}
