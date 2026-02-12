import express from 'express';
import { getAdminStats, getAuditLogs } from '../controllers/adminController';

const router = express.Router();

router.get('/stats', getAdminStats);
router.get('/audit', getAuditLogs);

export default router;
