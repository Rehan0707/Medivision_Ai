import express from 'express';
import { getReports, createReport, analyzeReportText, getBioAnalysis } from '../controllers/reportController';

const router = express.Router();

router.route('/')
    .get(getReports)
    .post(createReport);

router.get('/bio-analysis', getBioAnalysis);
router.post('/analyze', analyzeReportText);

export default router;
