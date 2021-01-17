import { Router } from 'express';
import eventRouter from './events';

const router = Router();

router.use('/events', eventRouter);
router.use('/', (_req, res) => res.send('<h1>welcome to brainhub api</h1>'));

export default router;
