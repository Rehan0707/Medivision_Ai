import express from 'express';
import { getScans, createScan, getScanById } from '../controllers/scanController';

const router = express.Router();

router.route('/')
    .get(getScans)
    .post(createScan);

router.route('/:id')
    .get(getScanById);

export default router;
