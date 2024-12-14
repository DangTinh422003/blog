import express from 'express';

import accessRouter from '@/routes/access.route';

const router = express.Router();

router.use('/access', accessRouter);
router.use('/ping', (req, res) => {
  res.send('pong');
});

export default router;
