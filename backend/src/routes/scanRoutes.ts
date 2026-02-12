import express from 'express';
import { getScans, createScan, getScanById, saveScan } from '../controllers/scanController';

const router = express.Router();

router.post('/save', saveScan);
router.route('/')
    .get(getScans)
    .post(createScan);

router.route('/:id')
    .get(getScanById);

export default router;
