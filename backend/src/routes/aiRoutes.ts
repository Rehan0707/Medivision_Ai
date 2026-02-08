import express from 'express';
import { analyzeImage, explainReport } from '../controllers/aiController';

const router = express.Router();

router.post('/analyze-image', analyzeImage);
router.post('/explain-report', explainReport);

export default router;
