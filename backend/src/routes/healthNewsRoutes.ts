import { Router } from 'express';
import { getHealthNews } from '../controllers/healthNewsController';

const router = Router();
router.get('/', getHealthNews);

export default router;
