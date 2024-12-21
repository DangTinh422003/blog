import express from 'express';

import accessRouter from '@/routes/access.route';
import postRouter from '@/routes/post.route';

const router = express.Router();

router.use('/access', accessRouter);
router.use('/post', postRouter);

export default router;
