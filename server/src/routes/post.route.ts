import express from 'express';

import PostController from '@/controllers/post.controller';
import { isAuthenticated } from '@/middlewares/authentication';
import { handleError } from '@/middlewares/handleError';
import PostValidation from '@/validations/post.validation';

const router = express.Router();

const postController = new PostController();
const postValidation = new PostValidation();

router.use(handleError(isAuthenticated));

router.get(
  '/',
  handleError(postValidation.getPosts),
  handleError(postController.getPosts),
);
router.get('/create', handleError(postController.createPost));
router.get('/delete', handleError(postController.deletePost));
router.get('/find', handleError(postController.findPost));
router.get('/update', handleError(postController.updatePost));

export default router;
